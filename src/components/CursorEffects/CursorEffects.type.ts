export interface CursorEffectsProps {
  enabled?: boolean;
  trailLength?: number;
  fadeSpeed?: number;
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface TrailPoint extends CursorPosition {
  opacity: number;
  timestamp: number;
}
