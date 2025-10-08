import { lazy } from 'react';
import { RoutePaths } from '../utils/constants';
import type { RouteConfig } from '../interfaces/routes.interface';

// Lazy loading de componentes
const Login = lazy(() => import('../pages/login/login.page'));
const LoginStep = lazy(() => import('../pages/login/login-step.page'));
const RecoveryAccount = lazy(() => import('../pages/recovery-account/recovery.page'));
const ForgotUsername = lazy(() => import('../pages/recovery-account/forgot-username.page'));
const BloquedUser = lazy(() => import('../pages/recovery-account/blocked-username.page'));
const ForgotPassword = lazy(() => import('../pages/recovery-account/forgot-password.page'));
const ChangeTemporaryPassword = lazy(() => import('../pages/temporary-password/temporary-password.page'));
const HomePage = lazy(() => import('../pages/home/home.page'));

const UserList = lazy(() => import('../pages/users/user-list/user-list.page'));
const UserCreate = lazy(() => import('../pages/users/user-create/user-create.page'));
const UserEdit = lazy(() => import('../pages/users/user-edit/user-edit.page'));
const UserFilter = lazy(() => import('../pages/users/user-filter/user-filter.page'));

const PatientCreate = lazy(() => import('../pages/patients/patient-create/patient-create.page'));




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
    isRestricted: false,
    title: 'Recuperar Contraseña'
  },
  {
    path: RoutePaths.LOGIN_STEP,
    component: LoginStep,
    isPrivate: false,
    isRestricted: false,
    title: 'step de login'
  },
];

export const privateRoutes: RouteConfig[] = [

  {
    path: RoutePaths.HOME,
    component: HomePage,
    isPrivate: true,
    layout: 'main',
    title: 'Inicio'
  },
  {
    path: RoutePaths.CHANGE_PASSWORD_TEMP,
    component: ChangeTemporaryPassword,
    isPrivate: false,
    isRestricted: true,
    title: 'Cambiar Contraseña Temporal'
  },
  {
    path: RoutePaths.USERS_LIST,
    component: UserList,
    isPrivate: true,
    layout: 'main',
    title: 'Lista de Usuario'
  },
  {
    path: RoutePaths.USERS_CREATE,
    component: UserCreate,
    isPrivate: true,
    layout: 'main',
    title: 'Crear Usuario'
  },
  {
    path: RoutePaths.USERS_FILTER,
    component: UserFilter,
    isPrivate: true,
    layout: 'main',
    title: 'Busqueda de Expediente'
  },
  {
    path: RoutePaths.USERS_EDIT,
    component: UserEdit,
    isPrivate: true,
    layout: 'main',
    title: 'Edición de Usuario'
  },

  // Rutas Pacientes
  {
    path: RoutePaths.PATIENTS_CREATE,
    component: PatientCreate,
    isPrivate: true,
    layout: 'main',
    title: 'Crear Paciente'
  },
  
];

export const allRoutes = [...publicRoutes, ...privateRoutes];