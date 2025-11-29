import type { Redis } from './redis';
import { isRedisConnected, getRedisClient } from './redis';
import type { FastifyBaseLogger } from 'fastify';

/**
 * Cache key prefixes and conventions
 */
export const CacheKeys = {
  // Interview keys
  INTERVIEWS_LIST: 'interviews:list',
  interview: (id: string) => `interviews:${id}`,

  // Question keys
  questionsList: (position?: string, category?: string) =>
    `questions:list:${position || 'all'}:${category || 'all'}`,
  question: (id: string) => `questions:${id}`,

  // Agent keys
  AGENTS_PERFORMANCE: 'agents:performance',
  AGENTS_PATTERNS: 'agents:patterns',
} as const;

/**
 * Default TTL values in seconds
 */
export const CacheTTL = {
  SHORT: 30, // 30 seconds - for frequently changing data
  MEDIUM: 60, // 1 minute - for moderately changing data
  LONG: 120, // 2 minutes - for questions lists
  EXTENDED: 300, // 5 minutes - for individual questions
} as const;

let logger: FastifyBaseLogger | undefined;

/**
 * Initialize the cache service with a logger
 */
export function initCache(log?: FastifyBaseLogger): void {
  logger = log;
}

/**
 * Get a cached value
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  if (!isRedisConnected()) {
    return null;
  }

  try {
    const client = getRedisClient();
    if (!client) return null;

    const data = await client.get(key);
    if (!data) return null;

    return JSON.parse(data) as T;
  } catch (err) {
    logger?.warn({ err, key }, 'Cache get error');
    return null;
  }
}

/**
 * Set a cached value with optional TTL
 */
export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds?: number
): Promise<void> {
  if (!isRedisConnected()) {
    return;
  }

  try {
    const client = getRedisClient();
    if (!client) return;

    const serialized = JSON.stringify(value);

    if (ttlSeconds && ttlSeconds > 0) {
      await client.setex(key, ttlSeconds, serialized);
    } else {
      await client.set(key, serialized);
    }
  } catch (err) {
    logger?.warn({ err, key }, 'Cache set error');
  }
}

/**
 * Delete a cached value
 */
export async function cacheDel(key: string): Promise<void> {
  if (!isRedisConnected()) {
    return;
  }

  try {
    const client = getRedisClient();
    if (!client) return;

    await client.del(key);
  } catch (err) {
    logger?.warn({ err, key }, 'Cache delete error');
  }
}

/**
 * Invalidate all keys matching a pattern
 * Uses SCAN to avoid blocking Redis
 */
export async function cacheInvalidatePattern(pattern: string): Promise<void> {
  if (!isRedisConnected()) {
    return;
  }

  try {
    const client = getRedisClient();
    if (!client) return;

    let cursor = '0';
    const keysToDelete: string[] = [];

    do {
      const [newCursor, keys] = await client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = newCursor;
      keysToDelete.push(...keys);
    } while (cursor !== '0');

    if (keysToDelete.length > 0) {
      // Use pipeline for batch delete
      const pipeline = client.pipeline();
      keysToDelete.forEach((key) => pipeline.del(key));
      await pipeline.exec();

      logger?.debug({ pattern, count: keysToDelete.length }, 'Cache keys invalidated');
    }
  } catch (err) {
    logger?.warn({ err, pattern }, 'Cache invalidate pattern error');
  }
}

/**
 * Helper function to get cached data or fetch from source
 */
export async function cacheGetOrSet<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds?: number
): Promise<T> {
  // Try to get from cache first
  const cached = await cacheGet<T>(key);
  if (cached !== null) {
    logger?.debug({ key }, 'Cache hit');
    return cached;
  }

  // Fetch fresh data
  logger?.debug({ key }, 'Cache miss');
  const data = await fetchFn();

  // Cache the result (non-blocking)
  cacheSet(key, data, ttlSeconds).catch(() => {
    // Ignore cache set errors
  });

  return data;
}
