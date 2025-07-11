import type { Message } from '@puni/types/event/event/message'
import type { Notice } from '@puni/types/event/event/notice'
import type { Request } from '@puni/types/event/event/request'

/**
 * @description 所有事件类型
 */
export type Event = Message | Notice | Request

export * from '@puni/types/event/event/message'
export * from '@puni/types/event/event/notice'
export * from '@puni/types/event/event/request'
