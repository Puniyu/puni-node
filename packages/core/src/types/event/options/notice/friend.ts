import type { Contact, Scene } from '@puniyu/types/event/contact'
import type { FriendDecreaseType, FriendIncreaseType } from '@puniyu/types/event/content'
import type { NoticeOptions } from '@puniyu/types/event/options/notice/base'
import type { Sender } from '@puniyu/types/event/sender'

/** 创建好友增加通知事件 */
export type FriendIncreaseOptions = Omit<NoticeOptions, 'subEvent'> & {
  /** 事件来源信息 */
  contact: Contact<Scene.Friend>
  /** 事件创建者信息 */
  sender: Sender<Scene.Friend>
  /** 请求内容 */
  content: FriendIncreaseType
}

/** 创建好友减少通知事件 */
export type FriendDecreaseOptions = Omit<NoticeOptions, 'subEvent'> & {
  /** 事件来源信息 */
  contact: Contact<Scene.Friend>
  /** 事件创建者信息 */
  sender: Sender<Scene.Friend>
  /** 请求内容 */
  content: FriendDecreaseType
}
