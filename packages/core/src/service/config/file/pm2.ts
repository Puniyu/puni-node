import { puniPathConfig } from '@puniyu/root'
import type { PM2 } from '@puniyu/types/service/config/pm2'
import { requireFileSync } from '@puniyu/utils/fs/require'

/** pm2配置 */
export const pm2 = () => requireFileSync<PM2>(`${puniPathConfig}/pm2.json`, { ex: 30 })
