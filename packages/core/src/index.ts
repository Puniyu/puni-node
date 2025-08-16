import path from 'node:path'

import { printStartLog } from '@puniyu/core/internal/msg'
import { initPlugin } from '@puniyu/plugin/manger/init'
import { createSqlite } from '@puniyu/core/db'
import { logger } from '@puniyu/service/logger'
import dotenv from 'dotenv'
let isStart = false
process.env.ENV_FILE ??= '.env'

const start = async () => {
  if (isStart) {
    logger.error('Puni 已经启动，请勿重复启动')
    return
  }
  isStart = true
  dotenv.config({ path: `${path.join(process.cwd(), process.env.ENV_FILE!)}` })
  printStartLog(process.env.PUNI_VERSION!)
  await createSqlite(path.join(process.cwd(), "data.db"))
}

await start()
export * from '@puniyu/types'
