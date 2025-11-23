import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs-node';

export interface FaceDetectionResult {
  faceDetected: boolean;
  faceCount: number;
  confidence: number;
  boundingBoxes: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
}

/**
 * FaceDetector
 * Detects faces in webcam snapshots using TensorFlow BlazeFace
 */
export class FaceDetector {
  private model?: blazeface.BlazeFaceModel;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Loading BlazeFace model...');
    this.model = await blazeface.load();
    this.isInitialized = true;
    console.log('BlazeFace model loaded');
  }

  /**
   * Detect faces in an image buffer
   */
  async detectFaces(imageBuffer: Buffer): Promise<FaceDetectionResult> {
    if (!this.isInitialized || !this.model) {
      throw new Error('FaceDetector not initialized');
    }

    // Convert buffer to tensor
    const tensor = tf.node.decodeImage(imageBuffer, 3) as tf.Tensor3D;
    
    // Run face detection
    const predictions = await this.model.estimateFaces(tensor, false);
    
    // Cleanup
    tensor.dispose();

    const faceCount = predictions.length;
    const boundingBoxes = predictions.map(pred => {
      const [x, y] = pred.topLeft as [number, number];
      const [x2, y2] = pred.bottomRight as [number, number];
      return {
        x,
        y,
        width: x2 - x,
        height: y2 - y,
      };
    });

    return {
      faceDetected: faceCount > 0,
      faceCount,
      confidence: predictions.length > 0 ? (predictions[0].probability?.[0] || 0.5) : 0,
      boundingBoxes,
    };
  }

  /**
   * Check if face is centered and properly positioned
   */
  isFaceCentered(result: FaceDetectionResult, imageWidth: number, imageHeight: number): boolean {
    if (!result.faceDetected || result.boundingBoxes.length === 0) {
      return false;
    }

    const box = result.boundingBoxes[0];
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    const imageCenterX = imageWidth / 2;
    const imageCenterY = imageHeight / 2;

    // Check if face is within 30% of center
    const xOffset = Math.abs(centerX - imageCenterX) / imageWidth;
    const yOffset = Math.abs(centerY - imageCenterY) / imageHeight;

    return xOffset < 0.3 && yOffset < 0.3;
  }
}
