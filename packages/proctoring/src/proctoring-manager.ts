import { FaceDetector } from './face-detection';
import { AttentionTracker } from './attention-tracker';
import { ProctoringSnapshot, ProctoringFlag } from '@warmscreen/shared';
import sharp from 'sharp';

export interface ProctoringConfig {
  snapshotInterval: number; // milliseconds
  minFaceConfidence: number;
  maxLookAwayTime: number; // seconds
}

/**
 * ProctoringManager
 * Manages webcam proctoring during interviews
 */
export class ProctoringManager {
  private faceDetector: FaceDetector;
  private attentionTracker: AttentionTracker;
  private config: ProctoringConfig;
  private isActive = false;
  private snapshotTimer?: NodeJS.Timeout;
  private snapshots: ProctoringSnapshot[] = [];
  private imageWidth = 640;
  private imageHeight = 480;

  constructor(config?: Partial<ProctoringConfig>) {
    this.config = {
      snapshotInterval: 5000, // 5 seconds
      minFaceConfidence: 0.5,
      maxLookAwayTime: 10, // 10 seconds
      ...config,
    };
    this.faceDetector = new FaceDetector();
    this.attentionTracker = new AttentionTracker();
  }

  /**
   * Initialize proctoring system
   */
  async initialize(): Promise<void> {
    await this.faceDetector.initialize();
  }

  /**
   * Start proctoring session
   */
  async startProctoring(): Promise<void> {
    if (this.isActive) {
      throw new Error('Proctoring already active');
    }

    this.isActive = true;
    console.log('Proctoring started');
  }

  /**
   * Stop proctoring session
   */
  stopProctoring(): void {
    this.isActive = false;
    if (this.snapshotTimer) {
      clearInterval(this.snapshotTimer);
      this.snapshotTimer = undefined;
    }
    console.log('Proctoring stopped');
  }

  /**
   * Process a webcam snapshot
   */
  async processSnapshot(imageBuffer: Buffer, imageUrl: string): Promise<ProctoringSnapshot> {
    // Get image dimensions
    const metadata = await sharp(imageBuffer).metadata();
    this.imageWidth = metadata.width || 640;
    this.imageHeight = metadata.height || 480;

    // Detect faces
    const detection = await this.faceDetector.detectFaces(imageBuffer);
    
    // Check if face is centered
    const faceCentered = this.faceDetector.isFaceCentered(
      detection,
      this.imageWidth,
      this.imageHeight
    );

    // Record for attention tracking
    this.attentionTracker.recordSnapshot(detection, faceCentered);

    // Generate flags
    const flags = this.generateFlags(detection, faceCentered);

    // Get attention metrics
    const metrics = this.attentionTracker.getAttentionMetrics();

    const snapshot: ProctoringSnapshot = {
      timestamp: Date.now(),
      imageUrl,
      flags,
      faceDetected: detection.faceDetected,
      attention: metrics.attentionScore,
    };

    this.snapshots.push(snapshot);

    return snapshot;
  }

  /**
   * Generate proctoring flags based on detection results
   */
  private generateFlags(
    detection: any,
    faceCentered: boolean
  ): ProctoringFlag[] {
    const flags: ProctoringFlag[] = [];
    const timestamp = Date.now();

    // Multiple faces detected
    if (detection.faceCount > 1) {
      flags.push({
        type: 'MULTIPLE_FACES',
        severity: 'HIGH',
        timestamp,
        description: `${detection.faceCount} faces detected`,
      });
    }

    // No face detected
    if (!detection.faceDetected) {
      flags.push({
        type: 'NO_FACE',
        severity: 'MEDIUM',
        timestamp,
        description: 'No face detected in frame',
      });
    }

    // Face not centered (looking away)
    if (detection.faceDetected && !faceCentered) {
      flags.push({
        type: 'LOOKING_AWAY',
        severity: 'LOW',
        timestamp,
        description: 'Candidate looking away from camera',
      });
    }

    return flags;
  }

  /**
   * Get all snapshots
   */
  getSnapshots(): ProctoringSnapshot[] {
    return this.snapshots;
  }

  /**
   * Get attention metrics
   */
  getAttentionMetrics() {
    return this.attentionTracker.getAttentionMetrics();
  }

  /**
   * Get proctoring summary
   */
  getSummary(): {
    totalSnapshots: number;
    flags: {
      total: number;
      byType: Record<string, number>;
      bySeverity: Record<string, number>;
    };
    attentionMetrics: any;
  } {
    const allFlags = this.snapshots.flatMap(s => s.flags);
    
    const flagsByType: Record<string, number> = {};
    const flagsBySeverity: Record<string, number> = {};

    allFlags.forEach(flag => {
      flagsByType[flag.type] = (flagsByType[flag.type] || 0) + 1;
      flagsBySeverity[flag.severity] = (flagsBySeverity[flag.severity] || 0) + 1;
    });

    return {
      totalSnapshots: this.snapshots.length,
      flags: {
        total: allFlags.length,
        byType: flagsByType,
        bySeverity: flagsBySeverity,
      },
      attentionMetrics: this.attentionTracker.getAttentionMetrics(),
    };
  }

  /**
   * Clear all data
   */
  clear(): void {
    this.snapshots = [];
    this.attentionTracker.clear();
  }
}
