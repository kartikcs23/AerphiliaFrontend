export interface BackgroundEffectsProps {
  intensity?: 'low' | 'medium' | 'high';
  enableParallax?: boolean;
  enableAurora?: boolean;
  enableStars?: boolean;
  enableClouds?: boolean;
}

export interface StarProps {
  x: number;
  y: number;
  size: number;
  twinkleDelay: number;
}

export interface CloudProps {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  speed: number;
}

export interface AuroraProps {
  colors: string[];
  intensity: number;
  movement: boolean;
}
