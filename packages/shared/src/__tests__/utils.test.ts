import { describe, it, expect } from 'vitest';
import {
  calculateAverageScore,
  normalizeScore,
  calculateConfidence,
  shouldReflect,
  formatDuration,
  exponentialBackoff,
  sanitizeTranscript,
  extractKeywords,
  calculateCorrelation,
} from '../utils';

describe('Utils', () => {
  describe('calculateAverageScore', () => {
    it('should calculate average of scores', () => {
      const scores = { technical: 8, communication: 7, problemSolving: 9 };
      expect(calculateAverageScore(scores)).toBe(8);
    });

    it('should return 0 for empty scores', () => {
      expect(calculateAverageScore({})).toBe(0);
    });

    it('should handle single score', () => {
      expect(calculateAverageScore({ only: 5 })).toBe(5);
    });
  });

  describe('normalizeScore', () => {
    it('should keep score within bounds', () => {
      expect(normalizeScore(50)).toBe(50);
    });

    it('should cap score at maximum', () => {
      expect(normalizeScore(150)).toBe(100);
    });

    it('should raise score to minimum', () => {
      expect(normalizeScore(-10)).toBe(0);
    });

    it('should use custom bounds', () => {
      expect(normalizeScore(50, 10, 90)).toBe(50);
      expect(normalizeScore(5, 10, 90)).toBe(10);
      expect(normalizeScore(95, 10, 90)).toBe(90);
    });
  });

  describe('calculateConfidence', () => {
    it('should return high confidence for consistent factors', () => {
      const factors = [0.8, 0.8, 0.8, 0.8];
      expect(calculateConfidence(factors)).toBe(1);
    });

    it('should return lower confidence for variable factors', () => {
      const factors = [0.3, 0.9, 0.2, 0.8];
      const confidence = calculateConfidence(factors);
      expect(confidence).toBeLessThan(1);
      expect(confidence).toBeGreaterThanOrEqual(0);
    });

    it('should return 0 for empty factors', () => {
      expect(calculateConfidence([])).toBe(0);
    });
  });

  describe('shouldReflect', () => {
    it('should return true when confidence below threshold', () => {
      expect(shouldReflect(0.5)).toBe(true);
    });

    it('should return false when confidence above threshold', () => {
      expect(shouldReflect(0.8)).toBe(false);
    });

    it('should return false when confidence equals threshold', () => {
      expect(shouldReflect(0.7)).toBe(false);
    });

    it('should use custom threshold', () => {
      expect(shouldReflect(0.5, 0.4)).toBe(false);
      expect(shouldReflect(0.3, 0.4)).toBe(true);
    });
  });

  describe('formatDuration', () => {
    it('should format seconds to mm:ss', () => {
      expect(formatDuration(90)).toBe('1:30');
    });

    it('should pad seconds with zero', () => {
      expect(formatDuration(65)).toBe('1:05');
    });

    it('should handle less than a minute', () => {
      expect(formatDuration(45)).toBe('0:45');
    });

    it('should handle exactly one minute', () => {
      expect(formatDuration(60)).toBe('1:00');
    });

    it('should handle zero', () => {
      expect(formatDuration(0)).toBe('0:00');
    });
  });

  describe('exponentialBackoff', () => {
    it('should increase delay exponentially', () => {
      expect(exponentialBackoff(0)).toBe(1000);
      expect(exponentialBackoff(1)).toBe(2000);
      expect(exponentialBackoff(2)).toBe(4000);
      expect(exponentialBackoff(3)).toBe(8000);
    });

    it('should cap at 30 seconds', () => {
      expect(exponentialBackoff(10)).toBe(30000);
      expect(exponentialBackoff(20)).toBe(30000);
    });

    it('should use custom base delay', () => {
      expect(exponentialBackoff(0, 500)).toBe(500);
      expect(exponentialBackoff(1, 500)).toBe(1000);
    });
  });

  describe('sanitizeTranscript', () => {
    it('should trim whitespace', () => {
      expect(sanitizeTranscript('  hello world  ')).toBe('hello world');
    });

    it('should normalize multiple spaces', () => {
      expect(sanitizeTranscript('hello    world')).toBe('hello world');
    });

    it('should remove special characters', () => {
      expect(sanitizeTranscript('hello@world#test$!')).toBe('helloworldtest!');
    });

    it('should preserve allowed punctuation', () => {
      expect(sanitizeTranscript("Hello, world! That's great.")).toBe(
        "Hello, world! That's great."
      );
    });
  });

  describe('extractKeywords', () => {
    it('should extract keywords from text', () => {
      const text =
        'JavaScript is a great programming language for building applications.';
      const keywords = extractKeywords(text, 3);
      expect(keywords.length).toBeLessThanOrEqual(3);
      expect(keywords).toContain('javascript');
    });

    it('should exclude stop words', () => {
      const text = 'The quick brown fox jumps over the lazy dog';
      const keywords = extractKeywords(text);
      expect(keywords).not.toContain('the');
      // 'over' is 4 characters and not in the stop words list, so it may be included
      expect(keywords.some(kw => ['quick', 'brown', 'jumps', 'lazy'].includes(kw))).toBe(true);
    });

    it('should handle empty text', () => {
      expect(extractKeywords('')).toEqual([]);
    });

    it('should return most frequent words first', () => {
      const text = 'React React React Vue Angular Vue';
      const keywords = extractKeywords(text, 2);
      expect(keywords[0]).toBe('react');
      // 'vue' and 'angular' both have frequency 2, order depends on insertion order in Map
      expect(['vue', 'angular']).toContain(keywords[1]);
    });
  });

  describe('calculateCorrelation', () => {
    it('should return 1 for perfect positive correlation', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [2, 4, 6, 8, 10];
      expect(calculateCorrelation(x, y)).toBeCloseTo(1, 5);
    });

    it('should return -1 for perfect negative correlation', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [10, 8, 6, 4, 2];
      expect(calculateCorrelation(x, y)).toBeCloseTo(-1, 5);
    });

    it('should return 0 for no correlation', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [3, 3, 3, 3, 3]; // constant values
      expect(calculateCorrelation(x, y)).toBe(0);
    });

    it('should return 0 for empty arrays', () => {
      expect(calculateCorrelation([], [])).toBe(0);
    });

    it('should return 0 for mismatched arrays', () => {
      expect(calculateCorrelation([1, 2, 3], [1, 2])).toBe(0);
    });

    it('should handle real world data', () => {
      // Technical scores vs hire decisions (1=hire, 0=no hire)
      const techScores = [8, 9, 5, 7, 4, 8, 6, 9];
      const outcomes = [1, 1, 0, 1, 0, 1, 0, 1];
      const correlation = calculateCorrelation(techScores, outcomes);
      // Should show positive correlation (higher scores = more hires)
      expect(correlation).toBeGreaterThan(0);
    });
  });
});
