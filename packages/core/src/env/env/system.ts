import { remove } from 'radashi'
const platform = process.platform

/**
 * @description 是否为Windows
 */
export const isWin = () => platform === 'win32'
/**
 * @description 是否为Mac
 */
export const isMac = () => platform === 'darwin'
/**
 * @description 是否为Linux
 */
export const isLinux = () => platform === 'linux'
/**
 * @description 是否为开发环境
 */
export const isDev = () => process.env.NODE_ENV === 'development'
/**
 * @description 是否为监察者模式
 */
export const isWatch = () => typeof process.env.TSX_WATCH === 'string'
/**
 * @description 是否为Node直接运行
 */
export const isNode = () => process.env.RUNTIME === 'node'
/**
 * @description 是否为Tsx运行环境
 */
export const isTsx = () => process.env.RUNTIME === 'tsx'
/**
 * @description 是否为Pm2运行环境
 */
export const isPm2 = () => process.env.RUNTIME === 'pm2'
/**
 * @description 是否只允许运行js
 */
export const isJs = () => !isTsx()
/**
 * @description 是否允许直接运行Ts
 */
export const isTs = () => isTsx()
/**
 * @description 是否为生产环境
 */
export const isProd = () => !isDev()

/**
 * @description 获取当前环境可加载的模块后缀类型
 */
export const getModuleType = () => {
  const moduleType = ['.ts', '.js', '.cts', '.mts', '.mjs', '.cjs']
  return isTs()
    ? moduleType
    : remove(moduleType, (item: string) => item.endsWith('.ts') || item.endsWith('.cts') || item.endsWith('.mts'))
}
