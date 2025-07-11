import { cache } from '@puni/plugin/system/cache'
import { requireFileSync } from '@puni/utils/fs/require'

/**
 * 传入插件名称 返回插件根目录、路径、package.json等信息
 * @param name - 插件名称
 */
export const getPluginInfo = (name: string) => {
  const list = Object.values(cache.index)
  const plugin = list.find((item) => item.name === name)
  if (!plugin) return null

  const info = {
    get pkg () {
      if (!plugin.pkgPath) return null
      return requireFileSync(plugin.pkgPath)
    }
  }

  return Object.assign(plugin, info)
}

/**
 * 传入一个名称 判断是否为插件
 * @param name - 插件名称
 */
export const isPlugin = (name: string) => {
  return !!getPluginInfo(name)
}
