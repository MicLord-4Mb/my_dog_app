import type {AuthUser, LoginCredentials, LoginResponse} from "@/types/auth.types";

const MOCK_STORAGE_KEY_TOKEN = 'dog_app_auth_token';
const MOCK_STORAGE_KEY_USER = 'dog_app_auth_user';

export async function loginUserApi(credentials: LoginCredentials): Promise<LoginResponse> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const trEmail = credentials.email.trim().toLocaleLowerCase();

  if (!trEmail) {
    throw new Error('Email is required.');
  }

  if (!credentials.password || credentials.password.length < 8) {
    throw new Error('Password must contain at least 8 characters.');
  }

  // Test email for testing email error
  if (trEmail === 'error@dogapp.com') {
    throw new Error('Invalid email or password.');
  }

  const mockUser: AuthUser = {
    id: 'usr_dog_99',
    email: trEmail,
    firstName: trEmail.startsWith('admin') ? 'Alex' : 'Buddy',
    lastName: 'Lover',
    role: trEmail.startsWith('admin') ? 'admin' : 'user',
  };

  const mockToken = `mock_jwt_token_${Date.now()}`;

  try {
    localStorage.setItem(MOCK_STORAGE_KEY_TOKEN, mockToken);
    localStorage.setItem(MOCK_STORAGE_KEY_USER, JSON.stringify(mockUser));
  } catch {
    // fallback
  }

  return {
    token: mockToken,
    user: mockUser,
  }
};

/**
 * Some cache for session
 */
export function getStoredAuthSession(): {  token: string | null, user: AuthUser | null } {
  try {
    const token = localStorage.getItem(MOCK_STORAGE_KEY_TOKEN);
    const rawUser = localStorage.getItem(MOCK_STORAGE_KEY_USER);
    const user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function clearStoredAuthSession(): void {
  try {
    localStorage.removeItem(MOCK_STORAGE_KEY_TOKEN);
    localStorage.removeItem(MOCK_STORAGE_KEY_USER);
  } catch {
    // Ignore for now
  }
}