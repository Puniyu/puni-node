import path from 'node:path'

import type { PkgInfo } from '@puni/types/plugin'
import { existsSync, requireFileSync } from '@puni/utils/fs'

/**
 * 创建插件包信息对象
 * @param type 插件类型
 * @param name 插件名称
 * @param dir 插件目录
 * @param apps 应用路径列表
 * @param allApps 所有应用目录列表
 * @param isForce 是否强制更新
 * @returns 插件信息对象
 */
export const createPkg = (
  type: PkgInfo['type'],
  name: string,
  dir: string,
  apps: string[],
  allApps: string[],
  isForce: boolean
): PkgInfo => ({
  type,
  name,
  apps,
  allApps,
  dir,
  id: -1,
  get pkgPath () {
    const file = path.join(this.dir, 'package.json')
    return existsSync(file) ? file : ''
  },
  get pkgData () {
    if (!this.pkgPath) return {}
    return requireFileSync(this.pkgPath, { force: isForce })
  }
})
