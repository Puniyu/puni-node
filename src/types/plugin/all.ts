import type { Accept } from '@puni/types/plugin/accept'
import type { Button } from '@puni/types/plugin/button'
import type { Command, CommandClass } from '@puni/types/plugin/command'
import type { Handler } from '@puni/types/plugin/handler'
import type { Task } from '@puni/types/plugin/task'

/**
 * 全部插件方法联合类型
 */
export type AllPluginMethods = Accept
  | Button
  | Handler
  | Task
  | Command
  | CommandClass
