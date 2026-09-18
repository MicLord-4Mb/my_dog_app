import React from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAppSelector } from '@/store/hooks';
import { selectFavoritesCount } from '@/features/favorites/favoritesSelectors';
import { LINKS } from '@/constants/routes';
import { Link } from 'react-router';

const STYLES = {
  container: 'w-full max-w-container-max mx-auto px-4 md:px-8 py-10',
  header: 'mb-8',
  title: 'font-headline text-3xl md:text-4xl font-extrabold text-on-surface',
  subtitle: 'text-sm text-secondary mt-1',
  profileCard: 'bg-surface-container-lowest border border-secondary-fixed/30 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6',
  avatar: 'w-24 h-24 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline text-3xl font-bold shadow-md overflow-hidden',
  infoWrapper: 'flex-1 text-center md:text-left space-y-1',
  name: 'text-2xl font-bold font-headline text-on-surface',
  email: 'text-sm text-secondary',
  badge: 'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 mt-2',
  statsRow: 'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8',
  statCard: 'bg-surface-container-low border border-secondary-fixed/20 p-5 rounded-2xl flex items-center gap-4',
  statIconWrapper: 'w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container',
  logoutButton: 'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-error/30 text-error hover:bg-error/10 font-semibold text-sm transition-colors',
};

// TODO: think about header link
export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const favoritesCount = useAppSelector(selectFavoritesCount);

  if (!user) return null;

  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <h1 className={STYLES.title}>User Account</h1>
        <p className={STYLES.subtitle}>Manage your session and preferences.</p>
      </div>

      <div className={STYLES.profileCard}>
        <div className={STYLES.avatar}>
          <span>{user.firstName[0]}</span>
        </div>

        <div className={STYLES.infoWrapper}>
          <h2 className={STYLES.name}>{user.firstName} {user.lastName}</h2>
          <p className={STYLES.email}>{user.email}</p>
          <span className={STYLES.badge}>
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            {user.role === 'admin' ? 'Curator Admin' : 'Dog Explorer Member'}
          </span>
        </div>

        <button type="button" onClick={logout} className={STYLES.logoutButton}>
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>

      <div className={STYLES.statsRow}>
        <Link to={LINKS.favorites()} className={STYLES.statCard}>
          <div className={STYLES.statIconWrapper}>
            <span className="material-symbols-outlined">favorite</span>
          </div>
          <div>
            <div className="text-2xl font-bold font-headline text-on-surface">{favoritesCount}</div>
            <div className="text-xs text-secondary font-medium">Favorite Breeds Bookmarked</div>
          </div>
        </Link>
      </div>
    </div>
  );
};