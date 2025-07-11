/** 框架加载事件 */
export enum Load {
  /** 适配器加载事件 */
  Adapter = 'load:adapter',
  /** 渲染器加载事件 */
  Render = 'load:render',
  /** 插件加载事件 */
  Plugin = 'load:plugin'
}
/** 事件调用 */
export const enum EventType {
  /** 事件调用计数 */
  EVENT = 'puni:event:fnc',
  /** 收到消息 */
  RECV_MSG = 'puni:msg:recv',
  /** 发送消息 */
  SEND_MSG = 'puni:msg:send',
}
/** 文件变动事件 */
export enum File {
  /** 文件变动 */
  Change = 'puni:file:change',
}
/** Bot上线事件 也就是初始化完成了... */
export const ONLINE = 'online'
