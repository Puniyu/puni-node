import path from 'node:path'

import { printStartLog } from '@puni/core/internal/msg'
import { initPlugin } from '@puni/plugin/manger/init'
import { logger } from '@puni/service/logger'
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
  await initPlugin()
}

await start()
export * from '@puni/types'
