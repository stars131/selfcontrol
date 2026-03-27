import type { LocaleCode } from "../lib/locale";

export type RegisterFormCopy = {
  eyebrow: string;
  title: string;
  signIn: string;
  username: string;
  email: string;
  displayName: string;
  password: string;
  usernamePlaceholder: string;
  emailPlaceholder: string;
  displayNamePlaceholder: string;
  passwordPlaceholder: string;
  loading: string;
  submit: string;
  registerFailed: string;
};

export type LoginFormCopy = {
  eyebrow: string;
  title: string;
  register: string;
  account: string;
  password: string;
  accountPlaceholder: string;
  passwordPlaceholder: string;
  loading: string;
  submit: string;
  loginFailed: string;
};

const REGISTER_COPY: Record<LocaleCode, RegisterFormCopy> = {
  "zh-CN": {
    eyebrow: "访问",
    title: "创建账号",
    signIn: "登录",
    username: "用户名",
    email: "邮箱",
    displayName: "显示名称",
    password: "密码",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "请使用更长的密码",
    loading: "创建中...",
    submit: "创建账号",
    registerFailed: "注册失败",
  },
  en: {
    eyebrow: "Access",
    title: "Create Account",
    signIn: "Sign In",
    username: "Username",
    email: "Email",
    displayName: "Display name",
    password: "Password",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "Use a long password",
    loading: "Creating...",
    submit: "Create Account",
    registerFailed: "Register failed",
  },
  ja: {
    eyebrow: "アクセス",
    title: "アカウント作成",
    signIn: "ログイン",
    username: "ユーザー名",
    email: "メール",
    displayName: "表示名",
    password: "パスワード",
    usernamePlaceholder: "stars131",
    emailPlaceholder: "name@example.com",
    displayNamePlaceholder: "Stars",
    passwordPlaceholder: "長めのパスワードを使用してください",
    loading: "作成中...",
    submit: "アカウント作成",
    registerFailed: "登録に失敗しました",
  },
};

const LOGIN_COPY: Record<LocaleCode, LoginFormCopy> = {
  "zh-CN": {
    eyebrow: "访问",
    title: "登录",
    register: "注册",
    account: "用户名或邮箱",
    password: "密码",
    accountPlaceholder: "demo 或 demo@example.com",
    passwordPlaceholder: "输入密码",
    loading: "登录中...",
    submit: "登录",
    loginFailed: "登录失败",
  },
  en: {
    eyebrow: "Access",
    title: "Sign In",
    register: "Register",
    account: "Username or email",
    password: "Password",
    accountPlaceholder: "demo or demo@example.com",
    passwordPlaceholder: "password",
    loading: "Signing in...",
    submit: "Sign In",
    loginFailed: "Login failed",
  },
  ja: {
    eyebrow: "アクセス",
    title: "ログイン",
    register: "登録",
    account: "ユーザー名またはメール",
    password: "パスワード",
    accountPlaceholder: "demo または demo@example.com",
    passwordPlaceholder: "パスワード",
    loading: "ログイン中...",
    submit: "ログイン",
    loginFailed: "ログインに失敗しました",
  },
};

export function getRegisterFormCopy(locale: LocaleCode): RegisterFormCopy {
  return REGISTER_COPY[locale];
}

export function getLoginFormCopy(locale: LocaleCode): LoginFormCopy {
  return LOGIN_COPY[locale];
}
