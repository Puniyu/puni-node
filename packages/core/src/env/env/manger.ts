import fs from 'node:fs'
import path from 'node:path'

import { listener } from '@puniyu/core/puni/listener'
import { File } from '@puniyu/env/key/event'
import { logger } from '@puniyu/service/logger'
import { requireFileSync } from '@puniyu/utils/fs/require'
import { watch } from '@puniyu/utils/fs/watch'
import dotenv from 'dotenv'
import { isEmpty, isString } from 'radashi'
/**
 * 自定义解析器
 * @param content - 内容
 * @returns 解析后的内容
 */
const parser = (content: string) => {
  const lines = content.split('\n')
  const list: { key: string, value: string, comment: string }[] = []

  /** 反序成对象 */
  const obj: Record<string, string> = {}
  lines.forEach((line, index) => {
    obj[index] = line
  })

  lines.forEach((line, index) => {
    /** 跳过非kv元素 */
    if (!line.includes('=')) return

    let comment = ''
    let [key, value] = line.split('=').map((item) => item.trim())

    /**
     * 这里包含#的用2种情况
     * 1. 写在后续的注释
     * 2. 在value中 但是被包裹在""中
     */
    if (value.includes('#')) {
      /** 提取""中的内容 */
      const data = value.match(/^".*"$/)
      if (data) {
        /** 说明在一行之中同时包含value和 #注释 */
        value = data[0]
        comment = value.replace(value, '') || ''
      } else {
        /** 如果提取不到 则说明不包含""的value 但是包含注释 */
        const arr = value.split('#').map((item) => item.trim())
        comment = arr.length > 1 ? `# ${arr[1]}` : ''
        value = arr[0]
      }
    }

    /** 如果comment为空 尝试获取上一行的 */
    if (!comment) {
      const data = obj[index - 1]?.trim()
      if (data?.startsWith('#')) comment = data
    }

    value = value?.replace(/^"|"$/g, '') || ''
    list.push({ key, value, comment: comment.replace(/\\r|\\n/g, '').trim() })
  })

  /** 返回对象 */
  const result: Record<string, { value: string; comment: string }> = {}
  list.forEach((item) => {
    result[item.key] = {
      value: item.value,
      comment: item.comment
    }
  })

  return result
}
/**
 * @description 设置环境变量
 * @param key 键
 * @param value 值
 */
export const setEnv = (key: string, value: string | number): string | number => {
  if (!isString(value) || isEmpty(value)) throw new TypeError('环境变量键名必须是非空字符串')
  process.env[key] = value + ''
  return value
}

/**
 * 写入单个或多个环境变量
 * @param data 要写入的环境变量
 * @param cwd env文件路径 默认系统.env文件
 * @param isCover 如果键已经存在 是否覆盖已有的值 默认否
 */
export const writeEnv = (
  data: { key: string, value: string, comment: string } | { key: string, value: string, comment: string }[],
  cwd?: string,
  isCover: boolean = false
) => {
  cwd ??= path.join(process.cwd(), process.env.EBV_FILE!)
  const env = getEnv(cwd)
  const result = { ...env }
  if (!Array.isArray(data)) data = [data]

  data.forEach((item) => {
    const { key, value, comment } = item
    if (!key || typeof key !== 'string') {
      logger.error('[writeEnv]', 'key 必须为字符串')
      return
    }

    if (result[key]) {
      if (!isCover) {
        logger.debug(`[writeEnv] key: ${key} 已存在 跳过`)
        return
      }
    }

    result[key] = {
      value,
      comment: comment || result?.[key]?.comment || ''
    }
  })

  const content = Object.entries(result)
    .map(([key, value]) => {
      /** 统一处理value前后的注释 */
      const val = /^".*"$/.test(value.value) ? value.value : `"${value.value}"`

      if (value.comment) {
        const comment = /^#/.test(value.comment) ? value.comment : `# ${value.comment}`
        return `${comment}\n${key}=${val}`
      }

      return `${key}=${val}`
    })
    .join('\n')

  fs.writeFileSync(cwd, content)
  dotenv.config({ path: cwd, override: true })
}

/**
 * @public 公开Api
 * @description 获取.env文件内容
 */
export const getEnv = (filePath: string = path.join(process.cwd(), process.env.EBV_FILE!)): Record<string, {
  /** 值 */
  value: string
  /** 注释 */
  comment: string
}> => {
  const data = requireFileSync<ReturnType<typeof parser>>(filePath, { parser })
  return data
}

export const initEnv = () => {
  const name = process.env.EBV_FILE!
  const file = `${process.cwd()}/${name}`
  getEnv()

  watch<ReturnType<typeof parser>>(file, (old, data) => {
    dotenv.config({ path: file, override: true })
    process.env.RUNTIME = data.RUNTIME.value as 'node' | 'pm2' | 'tsx' || 'node'
    logger.level = (process.env.LOG_LEVEL ?? 'info')

    const options = { file, old, data }
    listener.emit(File.Change, options)
    listener.emit(`${File.Change}:${name}`, options)
  }, { parser })
}
