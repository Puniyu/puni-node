export interface Env {
  /** 日志等级 */
  LOG_LEVEL: string
  /** 日志保留天数 */
  LOG_DAYS_TO_KEEP: string
  /** 日志文件最大大小 如果此项大于0则启用日志分割 */
  LOG_MAX_LOG_SIZE: string
  /** 运行器 "node" | "pm2" | "tsx" */
  RUNTIME: 'node' | 'pm2' | 'tsx'
  /** ffmpeg路径 */
  FFMPEG_PATH: string
  /** ffprobe路径 */
  FFPROBE_PATH: string
  /** ffplay路径 */
  FFPLAY_PATH: string
  /** tsx监察者模式 */
  TSX_WATCH: string
}
