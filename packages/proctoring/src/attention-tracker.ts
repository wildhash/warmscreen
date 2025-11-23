import { FaceDetectionResult } from './face-detection';

export interface AttentionMetrics {
  attentionScore: number; // 0-1
  lookAwayCount: number;
  avgLookAwayDuration: number;
  totalLookAwayTime: number;
}

/**
 * AttentionTracker
 * Tracks candidate attention during interview using face detection
 */
export class AttentionTracker {
  private snapshots: Array<{
    timestamp: number;
    faceDetected: boolean;
    faceCentered: boolean;
  }> = [];

  private lookAwayStart?: number;
  private lookAwayDurations: number[] = [];

  /**
   * Record a snapshot
   */
  recordSnapshot(
    faceDetectionResult: FaceDetectionResult,
    faceCentered: boolean
  ): void {
    const timestamp = Date.now();
    const faceDetected = faceDetectionResult.faceDetected;

    this.snapshots.push({
      timestamp,
      faceDetected,
      faceCentered,
    });

    // Track look-away periods
    if (!faceDetected || !faceCentered) {
      if (!this.lookAwayStart) {
        this.lookAwayStart = timestamp;
      }
    } else {
      if (this.lookAwayStart) {
        const duration = timestamp - this.lookAwayStart;
        this.lookAwayDurations.push(duration);
        this.lookAwayStart = undefined;
      }
    }
  }

  /**
   * Calculate attention metrics
   */
  getAttentionMetrics(): AttentionMetrics {
    if (this.snapshots.length === 0) {
      return {
        attentionScore: 0,
        lookAwayCount: 0,
        avgLookAwayDuration: 0,
        totalLookAwayTime: 0,
      };
    }

    const attentiveSnapshots = this.snapshots.filter(
      s => s.faceDetected && s.faceCentered
    ).length;

    const attentionScore = attentiveSnapshots / this.snapshots.length;

    const totalLookAwayTime = this.lookAwayDurations.reduce((sum, d) => sum + d, 0);
    const avgLookAwayDuration = this.lookAwayDurations.length > 0
      ? totalLookAwayTime / this.lookAwayDurations.length
      : 0;

    return {
      attentionScore,
      lookAwayCount: this.lookAwayDurations.length,
      avgLookAwayDuration: avgLookAwayDuration / 1000, // Convert to seconds
      totalLookAwayTime: totalLookAwayTime / 1000,
    };
  }

  /**
   * Clear tracking data
   */
  clear(): void {
    this.snapshots = [];
    this.lookAwayDurations = [];
    this.lookAwayStart = undefined;
  }

  /**
   * Get snapshot history
   */
  getSnapshots() {
    return this.snapshots;
  }
}
