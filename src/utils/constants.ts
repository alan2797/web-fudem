export const TOKEN_KEY = "token";
export const LOCAL_STORAGE_PREFIX = "app_";
export const RoutePaths = {
    // Public routes
    LOGIN: '/login',
    RECOVERY_ACCOUNT: '/recovery-account',
    FORGOT_USERNAME: '/forgot-username',
    BLOCKED_USER: '/blocked-user',
    FORGOT_PASSWORD: '/forgot-password',
    CHANGE_PASSWORD_TEMP: '/change-temp-password',
    LOGIN_STEP: '/login/step',
  
    // Private routes
    HOME: '/',

     // Users routes
    USERS_LIST: '/users/list',
    USERS_CREATE: '/users/create',
    USERS_EDIT: '/users/edit',
    USERS_FILTER: '/users/filter',

    // Patients routes
    PATIENTS_LIST: '/patients/list',
    PATIENTS_CREATE: '/patients/create',
    PATIENTS_EDIT: '/patients/edit',
    PATIENTS_EXPEDIENT: '/patients/expedient',
  
    // Catch all
    NOT_FOUND: '*',
} as const;