import { create } from '@puniyu/core/db/sqlite/init'

/**
 * 创建Sqlite实例
 * @param path 数据库路径
 * @returns Sqlite客户端
 */
export const createSqlite = async (path: string) => {
  const client = await create(path)
  return client
}
