import type { Contact, Scene } from '@puniyu/types/event/contact'
import type { ReceiveLikeType } from '@puniyu/types/event/content'
import type { NoticeOptions } from '@puniyu/types/event/options/notice/base'
import type { Sender } from '@puniyu/types/event/sender'

/** 创建收到点赞通知事件 */
export type ReceiveLikeOptions = Omit<NoticeOptions, 'subEvent'> & {
  /** 事件来源信息 */
  contact: Contact<Scene.Friend>
  /** 事件创建者信息 */
  sender: Sender<Scene.Friend>
  /** 请求内容 */
  content: ReceiveLikeType
}
