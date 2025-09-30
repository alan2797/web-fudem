export const TOKEN_KEY = "token";
export const LOCAL_STORAGE_PREFIX = "app_";
export const RoutePaths = {
    // Public routes
    LOGIN: '/login',
    RECOVERY_ACCOUNT: '/recovery-account',
    FORGOT_USERNAME: '/forgot-username',
    BLOCKED_USER: '/blocked-user',
    FORGOT_PASSWORD: '/forgot-password',
    CHANGE_PASSWORD_TEMP: '/change-password-temp',
  
    // Private routes
    LOGIN_STEP: '/login/step',
    HOME: '/',
  
    // Catch all
    NOT_FOUND: '*',
} as const;