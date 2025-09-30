import { lazy } from 'react';
import { RoutePaths } from '../utils/constants';
import type { RouteConfig } from '../interfaces/routes.interface';

// Lazy loading de componentes
const Login = lazy(() => import('../pages/login/login.page'));
const LoginStep = lazy(() => import('../pages/login/login-step.page'));
const RecoveryAccount = lazy(() => import('../pages/recovery-account/recovery.page'));
const ForgotUsername = lazy(() => import('../pages/recovery-account/forgot-username.page'));
const BloquedUser = lazy(() => import('../pages/recovery-account/bloqued-user.page'));
const ForgotPassword = lazy(() => import('../pages/recovery-account/forgot-password.page'));
const ChangeTemporaryPassword = lazy(() => import('../pages/temporary-password/temporary-password.page'));
const HomePage = lazy(() => import('../pages/home/home.page'));

export const publicRoutes: RouteConfig[] = [
  {
    path: RoutePaths.LOGIN,
    component: Login,
    isPrivate: false,
    isRestricted: true,
    title: 'Iniciar Sesión'
  },
  {
    path: RoutePaths.RECOVERY_ACCOUNT,
    component: RecoveryAccount,
    isPrivate: false,
    isRestricted: true,
    title: 'Recuperar Cuenta'
  },
  {
    path: RoutePaths.FORGOT_USERNAME,
    component: ForgotUsername,
    isPrivate: false,
    isRestricted: true,
    title: 'Recuperar Usuario'
  },
  {
    path: RoutePaths.BLOCKED_USER,
    component: BloquedUser,
    isPrivate: false,
    isRestricted: false,
    title: 'Usuario Bloqueado'
  },
  {
    path: RoutePaths.FORGOT_PASSWORD,
    component: ForgotPassword,
    isPrivate: false,
    isRestricted: true,
    title: 'Recuperar Contraseña'
  },
  {
    path: RoutePaths.CHANGE_PASSWORD_TEMP,
    component: ChangeTemporaryPassword,
    isPrivate: false,
    isRestricted: true,
    title: 'Cambiar Contraseña Temporal'
  }
];

export const privateRoutes: RouteConfig[] = [
  {
    path: RoutePaths.LOGIN_STEP,
    component: LoginStep,
    isPrivate: true,
    layout: 'none',
    title: 'Paso de Login',
    meta: {
      requiresEmailVerification: true
    }
  },
  {
    path: RoutePaths.HOME,
    component: HomePage,
    isPrivate: true,
    layout: 'main',
    title: 'Inicio'
  }
];

export const allRoutes = [...publicRoutes, ...privateRoutes];