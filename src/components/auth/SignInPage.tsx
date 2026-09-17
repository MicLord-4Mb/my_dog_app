import React, {useState, type SyntheticEvent} from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

const STYLES = {
  container: 'relative w-full max-w-container-max mx-auto px-4 md:px-8 py-12 md:py-20 flex items-center justify-center min-h-[calc(100vh-12rem)]',
  ambientGlow: 'absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10',
  card: 'w-full max-w-md bg-surface-container-lowest border border-secondary-fixed/30 rounded-3xl p-6 md:p-8 shadow-xl relative backdrop-blur-sm',
  headerWrapper: 'text-center space-y-2 mb-6',
  badge: 'inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20',
  title: 'font-headline text-2xl md:text-3xl font-bold text-on-surface tracking-tight',
  subtitle: 'text-xs md:text-sm text-secondary',
  form: 'space-y-4',
  fieldGroup: 'space-y-1.5 text-left',
  label: 'block text-xs font-semibold uppercase tracking-wider text-on-surface-variant',
  inputWrapper: 'relative flex items-center',
  inputIcon: 'material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none',
  input: 'w-full pl-10 pr-3 py-2.5 bg-surface border border-secondary-fixed/40 rounded-xl text-sm text-on-surface placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all',
  submitButton: 'w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-on-primary text-sm font-bold shadow-md hover:bg-primary/90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all',
  errorAlert: 'p-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-medium flex items-center gap-2',
  demoCredentialsBox: 'mt-6 pt-5 border-t border-secondary-fixed/20 text-xs text-secondary space-y-1.5 bg-surface-container-low/50 p-3.5 rounded-xl',
};

export const SignInPage: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('buddy@doggallery.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password });
      const targetPath = (location.state as { from?: { pathname: string } })?.from?.pathname || ROUTES.HOME;
      navigate(targetPath, { replace: true });
    } catch {
      // Ошибка сохраняется в Redux-стейт и отображается автоматически
    }
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.ambientGlow} />

      <div className={STYLES.card}>
        <div className={STYLES.headerWrapper}>
          <span className={STYLES.badge}>
            <span className="material-symbols-outlined text-[14px]">lock</span>
            Secure Access
          </span>
          <h1 className={STYLES.title}>Welcome Back</h1>
          <p className={STYLES.subtitle}>
            Sign in to unlock your personal dog bookmarks, notes, and profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={STYLES.form}>
          <div className={STYLES.fieldGroup}>
            <label htmlFor="email" className={STYLES.label}>Email Address</label>
            <div className={STYLES.inputWrapper}>
              <span className={STYLES.inputIcon}>mail</span>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={STYLES.input}
              />
            </div>
          </div>

          <div className={STYLES.fieldGroup}>
            <label htmlFor="password" className={STYLES.label}>Password</label>
            <div className={STYLES.inputWrapper}>
              <span className={STYLES.inputIcon}>key</span>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={STYLES.input}
              />
            </div>
          </div>

          {error && (
            <div className={STYLES.errorAlert} role="alert">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{error.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={STYLES.submitButton}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className={STYLES.demoCredentialsBox}>
          <p className="font-semibold text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-primary">info</span>
            Demo Test Accounts:
          </p>
          <p>• Standard: <code className="text-primary font-mono font-medium">buddy@doggallery.com</code> / <code className="font-mono">password123</code></p>
          <p>• Test error: <code className="text-error font-mono font-medium">error@dogapp.com</code> / <code className="font-mono">password123</code></p>
        </div>
      </div>
    </div>
  );
};
