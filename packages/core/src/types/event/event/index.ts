import type { Message } from '@puniyu/types/event/event/message'
import type { Notice } from '@puniyu/types/event/event/notice'
import type { Request } from '@puniyu/types/event/event/request'

/**
 * @description 所有事件类型
 */
export type Event = Message | Notice | Request

export * from '@puniyu/types/event/event/message'
export * from '@puniyu/types/event/event/notice'
export * from '@puniyu/types/event/event/request'
