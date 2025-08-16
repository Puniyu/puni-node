import type { Accept } from '@puniyu/types/plugin/accept'
import type { Button } from '@puniyu/types/plugin/button'
import type { Command, CommandClass } from '@puniyu/types/plugin/command'
import type { Handler } from '@puniyu/types/plugin/handler'
import type { Task } from '@puniyu/types/plugin/task'

/**
 * 全部插件方法联合类型
 */
export type AllPluginMethods = Accept
  | Button
  | Handler
  | Task
  | Command
  | CommandClass
