import path from 'node:path'

import { getModuleType, isDev } from '@puni/env'
import { findPkgByFile, pkgCache, pkgLoadModule, pkgSort } from '@puni/plugin/manger/load'
import { pkgRemoveModule } from '@puni/plugin/manger/uninstall'
import { cache } from '@puni/plugin/system/cache'
import { logger } from '@puni/service/logger'
import { formatPath } from '@puni/utils/fs/path'
import type { FSWatcher } from 'chokidar'
import chokidar from 'chokidar'

/**
 * 监听插件变化的watcher
 */
export let watcher: FSWatcher

/**
 * 初始化插件热重载
 */
export const initPluginHmr = async (
) => {
  /**
   * 监听的目录
   * @description 这里的目录全部都是apps目录
   */
  const watchDirs = new Set<string>()

  Object.values(cache.index).forEach((pkg) => {
    if (!isDev() && pkg.type !== 'app') return
    pkg.allApps.forEach(dir => watchDirs.add(dir))
  })

  watcher = chokidar.watch(Array.from(watchDirs), {
    ignoreInitial: true,
    ignored: /(^|[/\\])\../
  })

  watcher
    .on('add', file => handleFileChange(file, 'add'))
    .on('change', file => handleFileChange(file, 'change'))
    .on('unlink', file => handleFileChange(file, 'unlink'))

  /** 打印相对路径 */
  const relativePaths = Array.from(watchDirs).map(dir => {
    return path.relative(process.cwd(), dir).replace(/\\/g, '/')
  })

  watchDirs.clear()
  relativePaths.length
    ? logger.info(`\n[Hmr] ${logger.magenta('正在监听文件夹')}:\n  ${relativePaths.join('\n  ')}`)
    : logger.info('[Hmr] 当前监听的插件列表为空')
  return Promise.resolve()
}

/**
 * 处理文件变化
 * @param file 文件路径
 * @param action 操作类型
 */
const handleFileChange = async (file: string, action: 'add' | 'change' | 'unlink') => {
  /** 文件后缀 */
  const ext = path.extname(file)
  const exts = getModuleType()
  if (!exts.includes(ext)) return

  const absPath = formatPath(file)
  const pkg = findPkgByFile(absPath)
  if (!pkg) return

  /** 相对路径 */
  const relativePath = path.relative(process.cwd(), file).replace(/\\/g, '/')
  logger.debug(`[Hmr][${pkg.name}] 文件${action}: ${relativePath}`)

  if (action === 'unlink') {
    pkgRemoveModule(absPath)
    logger.info(`[Hmr][${pkg.name}] 已卸载: ${path.basename(file)}`)
    return
  }

  if (action === 'change') {
    pkgRemoveModule(absPath)
  }

  try {
    const result = await pkgLoadModule(pkg.name, absPath, true)
    pkgCache(result, pkg, absPath)
    pkgSort()

    const actionText = action === 'add' ? '新增插件' : '重载完成'
    logger.info(`[Hmr][${pkg.name}] ${actionText}: ${path.basename(file)}`)
  } catch (error) {
    logger.error(`[Hmr][${pkg.name}] 加载失败: \n${error}`)
  }
}
