const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    GOOGLE_AUTH: `${BASE_URL}/auth/google`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  },

  // User endpoints
  USER: {
    PROFILE: `${BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${BASE_URL}/user/profile`,
    CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,
    UPLOAD_AVATAR: `${BASE_URL}/user/avatar`,
  },

  // Event endpoints
  EVENTS: {
    GET_ALL: `${BASE_URL}/events`,
    GET_BY_ID: (id: string) => `${BASE_URL}/events/${id}`,
    GET_BY_CATEGORY: (category: string) => `${BASE_URL}/events/category/${category}`,
    SEARCH: `${BASE_URL}/events/search`,
    REGISTER: `${BASE_URL}/events/register`,
    GET_CATEGORIES: `${BASE_URL}/events/categories`,
  },

  // Registration endpoints
  REGISTRATION: {
    CREATE: `${BASE_URL}/registration`,
    GET_BY_USER: `${BASE_URL}/registration/user`,
    GET_BY_EVENT: (eventId: string) => `${BASE_URL}/registration/event/${eventId}`,
    UPDATE: (id: string) => `${BASE_URL}/registration/${id}`,
    CANCEL: (id: string) => `${BASE_URL}/registration/${id}/cancel`,
    GET_RECEIPT: (id: string) => `${BASE_URL}/registration/${id}/receipt`,
  },

  // Team endpoints
  TEAMS: {
    CREATE: `${BASE_URL}/teams`,
    GET_BY_ID: (id: string) => `${BASE_URL}/teams/${id}`,
    UPDATE: (id: string) => `${BASE_URL}/teams/${id}`,
    DELETE: (id: string) => `${BASE_URL}/teams/${id}`,
    INVITE_MEMBER: (id: string) => `${BASE_URL}/teams/${id}/invite`,
    RESPOND_INVITATION: (invitationId: string) => `${BASE_URL}/teams/invitation/${invitationId}/respond`,
    GET_INVITATIONS: `${BASE_URL}/teams/invitations`,
  },

  // Payment endpoints
  PAYMENT: {
    CREATE_ORDER: `${BASE_URL}/payment/create-order`,
    VERIFY_PAYMENT: `${BASE_URL}/payment/verify`,
    GET_TRANSACTION: (id: string) => `${BASE_URL}/payment/transaction/${id}`,
  },

  // Contact endpoints
  CONTACT: {
    SEND_MESSAGE: `${BASE_URL}/contact/send`,
    GET_COORDINATORS: `${BASE_URL}/contact/coordinators`,
  },
} as const;
