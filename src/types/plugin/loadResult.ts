import type { AllPluginMethods } from '@puni/types/plugin/all'

/**
 * 加载插件缓存类型
 */
export type LoadPluginResult = Record<string, AllPluginMethods | AllPluginMethods[]>
