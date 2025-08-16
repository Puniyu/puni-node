import type { BaseEventOptions, EventParent } from '@puniyu/types/event/options/base'
import type { Sender } from '@puniyu/types/event/sender'

/** 通知事件: 创建通知事件类所需参数类型 */
export type NoticeOptions = Omit<BaseEventOptions<EventParent.Notice>, 'event' | 'sender'> & {
  sender: Sender
}
