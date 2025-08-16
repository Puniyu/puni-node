import type { Contact, Scene } from '@puniyu/types/event/contact'
import type { PrivateApplyType } from '@puniyu/types/event/content'
import type { RequestOptions } from '@puniyu/types/event/options/requset/base'
import type { Sender } from '@puniyu/types/event/sender'

/** 创建好友申请请求事件 */
export type PrivateApplyRequestOptions = RequestOptions & {
  /** 事件来源信息 */
  contact: Contact<Scene.Friend>
  /** 事件创建者信息 */
  sender: Sender<Scene.Friend>
  /** 请求内容 */
  content: PrivateApplyType
}

export type FriendRequestOptions = PrivateApplyRequestOptions
