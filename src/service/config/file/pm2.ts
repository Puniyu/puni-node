import { puniPathConfig } from '@puni/root'
import type { PM2 } from '@puni/types/service/config/pm2'
import { requireFileSync } from '@puni/utils/fs/require'

/** pm2配置 */
export const pm2 = () => requireFileSync<PM2>(`${puniPathConfig}/pm2.json`, { ex: 30 })
