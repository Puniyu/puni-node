/** Git Pull 选项接口 */
export interface GitPullOptions {
  /** 是否强制拉取 使用后将本地分支强制与远程分支同步 */
  force?: boolean
  /** 超时， */
  timeout?: number
}

/** Git Pull 返回类型 */
export interface GitPullResult {
  /** 是否成功 */
  status: boolean
  /** 更新详情 */
  hash: {
    /** 更新前哈希 */
    before: string | null
    /** 更新后哈希 */
    after: string | null
  }
  /** 更新信息 */
  data: string
}
