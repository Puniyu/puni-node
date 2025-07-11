import { logger } from '@puni/service/logger'
import { Sequelize } from 'sequelize'

/**
 * 创建Sqlite数据库
 * @param path Sqlite数据库路径
 */
export const create = async (path: string) => {
  try {
    const client = new Sequelize({
      dialect: 'sqlite',
      storage: path,
      logging: false,
      pool: {
        max: 5,
        min: 1,
        idle: 10000,
        acquire: 30000
      }
    })
    await client.authenticate()

    client.addHook('afterConnect', () => {
      logger.debug(`[Sqlite] 数据库连接成功: ${path}`)
    })

    client.addHook('afterDisconnect', () => {
      logger.warn(`[Sqlite] 数据库连接断开: ${path}`)
    })
    return client
  } catch (error) {
    logger.error(`[Sqlite] 连接数据库${path}失败: ${(error as Error).message}`)
    throw error
  }
}
