import EventEmitter from 'node:events'

class Listeners extends EventEmitter {
  /**
	 * 添加事件监听器
	 * @param eventName 事件名称
	 * @param listener 监听器回调函数
	 */
  public on (eventName: string, listener: (...args: any[]) => void): this {
    super.on(eventName, listener)
    return this
  }

  /**
	 * 添加一次性事件监听器
	 * @param eventName 事件名称
	 * @param listener 监听器回调函数
	 */
  public once (eventName: string, listener: (...args: any[]) => void): this {
    super.once(eventName, listener)
    return this
  }

  /**
	 * 触发事件
	 * @param eventName 事件名称
	 * @param args 传递给监听器的参数
	 */
  public emit (eventName: string, ...args: any[]): boolean {
    return super.emit(eventName, ...args)
  }

  /**
	 * 移除事件监听器
	 * @param eventName 事件名称
	 * @param listener 监听器回调函数
	 */
  public off (eventName: string, listener: (...args: any[]) => void): this {
    super.off(eventName, listener)
    return this
  }
}

export const listener = new Listeners()
