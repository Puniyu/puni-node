import { puniPathConfig } from '@puniyu/root'
import type { Redis } from '@puniyu/types/service/config/redis'
import { requireFileSync } from '@puniyu/utils/fs/require'

/** redis配置 */
export const redis = () => requireFileSync<Redis>(`${puniPathConfig}/redis.json`, { ex: 30 })
