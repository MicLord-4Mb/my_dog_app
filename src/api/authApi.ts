import type {AuthUser, LoginCredentials, LoginResponse} from "@/types/auth.types";

const MOCK_STORAGE_KEY_TOKEN = 'dog_app_auth_token';
const MOCK_STORAGE_KEY_USER = 'dog_app_auth_user';

/**
 * Simulates an API call to authenticate a user.
 * It uses a hardcoded mock delay and stores a mock token in local storage.
 *
 * @param {LoginCredentials} credentials - The email and password to authenticate.
 * @returns {Promise<LoginResponse>} A promise that resolves to the login response.
 * @throws {Error} If validation fails or mock error conditions are met.
 */
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
    // fallback if localStorage is disabled
  }

  return {
    token: mockToken,
    user: mockUser,
  }
}

/**
 * Retrieves the currently stored authentication session from local storage.
 *
 * @returns An object containing the token and user if available, otherwise null values.
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

/**
 * Clears the stored authentication session from local storage.
 */
export function clearStoredAuthSession(): void {
  try {
    localStorage.removeItem(MOCK_STORAGE_KEY_TOKEN);
    localStorage.removeItem(MOCK_STORAGE_KEY_USER);
  } catch {
    // Ignore error if localStorage is inaccessible
  }
}