import Redis from 'ioredis';
import type { FastifyBaseLogger } from 'fastify';

let redisClient: Redis | null = null;
let isConnected = false;

export interface RedisConfig {
  url?: string;
  logger?: FastifyBaseLogger;
}

/**
 * Initialize Redis client with connection handling
 */
export function createRedisClient(config: RedisConfig): Redis | null {
  const { url, logger } = config;

  if (!url) {
    logger?.info('Redis URL not configured, caching disabled');
    return null;
  }

  try {
    const client = new Redis(url, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 3) {
          logger?.warn('Redis connection failed after 3 retries, disabling cache');
          return null; // Stop retrying
        }
        const delay = Math.min(times * 200, 2000);
        return delay;
      },
      lazyConnect: true,
    });

    client.on('connect', () => {
      isConnected = true;
      logger?.info('Redis connected successfully');
    });

    client.on('ready', () => {
      isConnected = true;
      logger?.info('Redis client ready');
    });

    client.on('error', (err) => {
      isConnected = false;
      logger?.warn({ err: err.message }, 'Redis connection error');
    });

    client.on('close', () => {
      isConnected = false;
      logger?.info('Redis connection closed');
    });

    client.on('reconnecting', () => {
      logger?.info('Redis reconnecting...');
    });

    redisClient = client;
    return client;
  } catch (err) {
    logger?.warn({ err }, 'Failed to create Redis client');
    return null;
  }
}

/**
 * Get the Redis client instance
 */
export function getRedisClient(): Redis | null {
  return redisClient;
}

/**
 * Check if Redis is connected
 */
export function isRedisConnected(): boolean {
  return isConnected && redisClient !== null;
}

/**
 * Connect to Redis (if client exists)
 */
export async function connectRedis(logger?: FastifyBaseLogger): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.connect();
    } catch (err) {
      logger?.warn({ err }, 'Failed to connect to Redis');
    }
  }
}

/**
 * Gracefully disconnect Redis
 */
export async function disconnectRedis(logger?: FastifyBaseLogger): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.quit();
      redisClient = null;
      isConnected = false;
      logger?.info('Redis disconnected gracefully');
    } catch (err) {
      logger?.warn({ err }, 'Error disconnecting Redis');
      // Force disconnect
      redisClient?.disconnect();
      redisClient = null;
      isConnected = false;
    }
  }
}

export type { Redis };
