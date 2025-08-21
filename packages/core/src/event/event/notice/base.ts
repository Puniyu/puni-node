import { BaseEvent } from '@puniyu/event/base'
import { EventParent, NoticeEventSub, NoticeOptions } from '@puniyu/types/event'

/**
 * @description 通知事件基类
 * @class NoticeBase
 */
export abstract class NoticeBase extends BaseEvent<EventParent.Notice> {
  #event: EventParent.Notice
  #subEvent: NoticeEventSub
  /** 通知内容str */
  tips: string
  /** 事件内容 */
  content: unknown

  constructor({
    subEvent,
    eventId,
    rawEvent,
    time,
    contact,
    sender,
    srcReply,
    bot
  }: NoticeOptions) {
    super({
      subEvent,
      eventId,
      rawEvent,
      time,
      contact,
      sender,
      srcReply,
      bot,
      event: EventParent.Notice
    })

    this.#event = EventParent.Notice
    this.#subEvent = subEvent

    this.tips = ''
  }

  get event() {
    return this.#event
  }

  get subEvent() {
    return this.#subEvent
  }
}
