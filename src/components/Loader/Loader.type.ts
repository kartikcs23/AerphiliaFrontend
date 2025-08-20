export interface LoaderProps {
  onComplete: () => void;
  duration?: number;
}

export interface JetAnimationState {
  phase: 'startup' | 'taxiing' | 'takeoff' | 'flight' | 'complete';
  progress: number;
}

export interface TurbineProps {
  isSpinning: boolean;
  speed?: number;
  size?: number;
}

export interface ContrailProps {
  opacity: number;
  length: number;
  delay?: number;
}
