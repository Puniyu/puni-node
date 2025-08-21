import fs from 'node:fs'

import { type Logger, type LoggerOptions } from '@puniyu/logger/types'
import chalk from 'chalk'
import log4js, { type Configuration, type Log4js } from 'log4js'
/**
 * 创建日志记录器
 * @param options - 配置项
 */
const initLogger = (options: LoggerOptions): Log4js => {
  const config: Configuration = {
    appenders: {
      console: {
        type: 'console',
        layout: {
          type: 'pattern',
          pattern: `${chalk.magenta('[Puni]')}${chalk.gray('[%d{hh:mm:ss.SSS}]')}%[[%4.4p]%] ${options.level === 'debug' || options.level === 'trace' ? chalk.gray('[%f{3}:%l] ') : ''
            }%m`
        }
      },
      overall: {
        /** 输出到文件 */
        type: 'dateFile',
        /** 日志文件名 */
        filename: `${options.logPath}/puniyu`,
        /** 日期后缀 */
        pattern: 'yyyy-MM-dd.log',
        /** 日期后缀 */
        keepFileExt: true,
        /** 日志文件名中包含日期模式 */
        alwaysIncludePattern: true,
        /** 日志文件保留天数 */
        numBackups: options.daysToKeep ?? 14,
        /** 日期后缀分隔符 */
        fileNameSep: '.',
        /** 日志输出格式 */
        layout: {
          type: 'pattern',
          pattern: '[%d{hh:mm:ss.SSS}][%4.4p] %m'
        }
      },
      errorFile: {
        /** 输出到文件 */
        type: 'dateFile',
        /** 日志文件名 */
        filename: `${options.logPath}/error/puniyu`,
        /** 日期后缀 */
        pattern: 'yyyy-MM-dd.log',
        /** 日期后缀 */
        alwaysIncludePattern: true,
        /** 日志文件保留天数 */
        numBackups: options.daysToKeep ?? 14,
        /** 保留文件扩展名 */
        keepFileExt: true,
        /** 日期后缀分隔符 */
        fileNameSep: '.',
        /** 日志输出格式 */
        layout: {
          type: 'pattern',
          pattern: '[%d{hh:mm:ss.SSS}][%4.4p] %m'
        }
      },
      errors: {
        /** 错误日志过滤器 */
        type: 'logLevelFilter',
        /** 目标appender */
        appender: 'errorFile',
        /** 只记录错误级别及以上的日志 */
        level: 'error'
      }
    },
    categories: {
      default: {
        appenders: options.FileLogging
          ? ['console', 'overall', 'errors']
          : ['console'],
        level: options.level ?? 'info',
        enableCallStack: options.level === 'debug' || options.level === 'trace'
      }
    },
    levels: {
      handler: { value: 15000, colour: 'cyan' }
    }
  }
  return log4js.configure(config)
}

/**
 * 为logger添加自定义颜色
 * @param logger - 日志记录器
 */
const addColor = (Logger: log4js.Logger, color?: string): Logger => {
  const logger = Logger as unknown as Logger
  logger.chalk = chalk
  logger.red = chalk.red
  logger.green = chalk.green
  logger.yellow = chalk.yellow
  logger.blue = chalk.blue
  logger.magenta = chalk.magenta
  logger.cyan = chalk.cyan
  logger.white = chalk.white
  logger.gray = chalk.gray
  logger.violet = chalk.hex('#868ECC')
  logger.fnc = chalk.hex(color ?? '#FFFF00')
  logger.bot = (level, id, ...args) => {
    const logMethod = logger[level].bind(logger) ?? logger.info.bind(logger)
    return logMethod(logger.violet(`[Bot:${id}]`), ...args)
  }
  logger.adapter = (level, adapterName, ...args) => {
    const logMethod = logger[level].bind(logger) ?? logger.info.bind(logger)
    return logMethod(logger.chalk.hex('#7AC5CD')(`[Adapter][${adapterName}]`), ...args)
  }
  return logger
}

/**
 * 创建日志记录器
 * @param dir - 日志文件夹
 * @param options - 配置项
 * @returns 日志记录器
 */
export const createLogger = (options: LoggerOptions): Logger => {
  if (options.FileLogging) {
    if (!fs.existsSync(options.logPath as string)) {
      fs.mkdirSync(options.logPath as string, { recursive: true })
    }
  }
  initLogger(options)
  const logger = addColor(log4js.getLogger('default'))

  return logger
}

export * from '@puniyu/logger/types'

const logger = createLogger({
  level: 'info',
})
logger.info('Logger init success')