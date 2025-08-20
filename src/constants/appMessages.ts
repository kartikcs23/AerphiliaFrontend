/**
 * Application Messages for Aerophilia 2025
 * Centralized message definitions for consistency
 */

export const APP_MESSAGES = {
  // Authentication messages
  AUTH: {
    LOGIN_SUCCESS: 'Welcome back to Aerophilia 2025! 🚀',
    LOGIN_ERROR: 'Invalid email or password. Please try again.',
    REGISTER_SUCCESS: 'Account created successfully! Welcome to Aerophilia 2025! ✈️',
    REGISTER_ERROR: 'Registration failed. Please check your details and try again.',
    LOGOUT_SUCCESS: 'You have been logged out successfully.',
    GOOGLE_AUTH_ERROR: 'Google authentication failed. Please try again.',
    PASSWORD_RESET_SUCCESS: 'Password reset email sent successfully.',
    PASSWORD_RESET_ERROR: 'Failed to send password reset email.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  },

  // Registration messages
  REGISTRATION: {
    SUCCESS: 'Registration successful! Welcome aboard! 🎯',
    ERROR: 'Registration failed. Please try again.',
    PAYMENT_SUCCESS: 'Payment completed successfully! Your spot is secured! 💳',
    PAYMENT_ERROR: 'Payment failed. Please try again or contact support.',
    TEAM_CREATED: 'Team created successfully! Start inviting members! 👥',
    TEAM_INVITATION_SENT: 'Team invitation sent successfully! 📧',
    TEAM_INVITATION_ACCEPTED: 'Team invitation accepted! Welcome to the team! 🤝',
    TEAM_INVITATION_DECLINED: 'Team invitation declined.',
    ALREADY_REGISTERED: 'You are already registered for this event.',
    REGISTRATION_CLOSED: 'Registration for this event is closed.',
    EVENT_FULL: 'This event is full. Registration is no longer available.',
  },

  // Form validation messages
  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    NAME_REQUIRED: 'Name is required.',
    PHONE_REQUIRED: 'Phone number is required.',
    PHONE_INVALID: 'Please enter a valid phone number.',
    TERMS_REQUIRED: 'You must agree to the terms and conditions.',
    TEAM_NAME_REQUIRED: 'Team name is required.',
    TEAM_SIZE_INVALID: 'Team size must be within the allowed range.',
  },

  // General messages
  GENERAL: {
    LOADING: 'Loading...',
    ERROR_OCCURRED: 'An error occurred. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'The requested resource was not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    SUCCESS: 'Operation completed successfully!',
    COMING_SOON: 'This feature is coming soon! 🚀',
    UNDER_MAINTENANCE: 'This feature is under maintenance.',
  },

  // Event messages
  EVENTS: {
    LOAD_ERROR: 'Failed to load events. Please refresh the page.',
    NO_EVENTS_FOUND: 'No events found matching your criteria.',
    EVENT_DETAILS_ERROR: 'Failed to load event details.',
    CATEGORY_LOAD_ERROR: 'Failed to load event categories.',
  },

  // Contact messages
  CONTACT: {
    MESSAGE_SENT: 'Your message has been sent successfully! We\'ll get back to you soon. 📧',
    MESSAGE_ERROR: 'Failed to send message. Please try again.',
    INVALID_FORM: 'Please fill in all required fields.',
  },

  // Countdown messages
  COUNTDOWN: {
    DAYS: 'Days',
    HOURS: 'Hours', 
    MINUTES: 'Minutes',
    SECONDS: 'Seconds',
    EVENT_STARTED: 'The event has started! 🎉',
    EVENT_ENDED: 'The event has ended. Thank you for participating! 🏆',
  },
} as const;
