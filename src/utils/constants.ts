// Aviation-themed constants for Aerophilia 2025
export const AVIATION_CONSTANTS = {
  // Animation Durations (in seconds)
  LOADER_DURATION: 4.5,
  JET_TAKEOFF_DURATION: 2.8,
  CONTRAIL_FORMATION_DURATION: 1.5,
  TURBINE_SPIN_DURATION: 0.8,
  
  // Theme Colors (Aviation Inspired)
  COLORS: {
    PRIMARY: {
      SKY_BLUE: '#0EA5E9',
      JET_BLACK: '#0F0F23',
      CONTRAIL_WHITE: '#FAFAFA',
      NEON_CYAN: '#06D6A0',
      AFTERBURNER_ORANGE: '#F77F00',
      COCKPIT_GREEN: '#10B981',
      WARNING_RED: '#EF4444',
    },
    GRADIENTS: {
      SKY: 'linear-gradient(180deg, #0F0F23 0%, #1E293B 30%, #334155 100%)',
      CONTRAIL: 'linear-gradient(90deg, transparent 0%, #FAFAFA 50%, transparent 100%)',
      AFTERBURNER: 'linear-gradient(45deg, #F77F00 0%, #FF6B6B 100%)',
      COCKPIT_HUD: 'linear-gradient(135deg, #06D6A0 0%, #0EA5E9 100%)',
      AURORA: 'linear-gradient(45deg, #8B5CF6 0%, #06D6A0 50%, #0EA5E9 100%)',
    }
  },
  
  // Sound Effects URLs (add these later)
  SOUNDS: {
    JET_ENGINE: '/sounds/jet-engine.mp3',
    TAKEOFF: '/sounds/takeoff.mp3',
    WHOOSH: '/sounds/whoosh.mp3',
    BEEP: '/sounds/cockpit-beep.mp3',
  },
  
  // Animation Easing
  EASING: {
    JET_SMOOTH: [0.25, 0.1, 0.25, 1],
    TURBINE: [0.4, 0.0, 0.2, 1],
    CONTRAIL: [0.0, 0.0, 0.2, 1],
    COCKPIT: [0.4, 0.0, 0.6, 1],
  },
  
  // Event Information
  EVENT: {
    NAME: 'Aerophilia 2025',
    TAGLINE: 'Where Aviation Dreams Take Flight',
    DATE: 'March 15-17, 2025',
    VENUE: 'Sahyadri College of Engineering',
    THEME: 'Next-Gen Aviation Excellence',
  },
  
  // Navigation Items
  NAV_ITEMS: [
    { label: 'Home', href: '/', icon: 'plane' },
    { label: 'Events', href: '/events', icon: 'calendar' },
    { label: 'Gallery', href: '/gallery', icon: 'camera' },
    { label: 'Sponsors', href: '/sponsors', icon: 'handshake' },
    { label: 'Team', href: '/team', icon: 'users' },
    { label: 'Contact', href: '/contact', icon: 'mail' },
  ],
  
  // Breakpoints
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  }
} as const;

// Export individual sections for convenience
export const { PRIMARY, GRADIENTS } = AVIATION_CONSTANTS.COLORS;
export const { EASING } = AVIATION_CONSTANTS;
export const { EVENT } = AVIATION_CONSTANTS;
