import { puniPathRoot } from '@puniyu/root'
import type { Package } from '@puniyu/types/service/config/package'
import { requireFileSync } from '@puniyu/utils/fs/require'

/** puni的package.json */
export const pkg = () => requireFileSync<Package>(`${puniPathRoot}/package.json`)
