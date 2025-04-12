// src/types/extended-cache.interface.ts

import { Cache as BaseCache } from 'cache-manager'

export interface Cache extends BaseCache {
	clear: () => Promise<boolean>
}
