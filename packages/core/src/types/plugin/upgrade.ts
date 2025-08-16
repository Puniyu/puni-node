import { exec as execChild } from 'node:child_process'
/** 更新npm插件参数 */
export interface NpmUpdateOptions {
  /** 标签 默认 `latest` */
  tag?: string
  /** 指定源 */
  registry?: string
  /** 超时时间(秒) 默认30秒 */
  timeout?: number
}

/** 更新命令参数类型 */
export type ExecOptions = Parameters<typeof execChild>[1]

/** 获取git仓库远程分支列表返回类型 */
export interface GitRemoteBranches {
  /** 分支名称 */
  branch: string
  /** 短哈希 */
  short: string
  /** 长哈希 */
  hash: string
}
