// DEMO ONLY: localStorage authentication is not secure and must not be used in production.
export const ACCOUNTS_KEY = 'bestValueBuyDemoAccounts';
export const SESSION_KEY = 'bestValueBuyDemoSession';
export const SHORTLIST_PREFIX = 'bestValueBuyShortlist:';

export function readAccounts() {
  try {
    const value = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

export function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return user && user.email ? user : null;
  } catch { return null; }
}

export function registerDemoUser({ name, email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const accounts = readAccounts();
  if (accounts.some(account => account.email === normalizedEmail)) {
    throw new Error('An account with this email already exists. Please log in.');
  }
  const account = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: String(name || '').trim(),
    email: normalizedEmail,
    // Demo only. Plain-text passwords are NOT safe for production.
    password: String(password || '')
  };
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  const user = { id: account.id, name: account.name, email: account.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('bvb-auth-change'));
  return user;
}

export function loginDemoUser({ email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const account = readAccounts().find(item => item.email === normalizedEmail && item.password === String(password || ''));
  if (!account) throw new Error('Email or password is incorrect.');
  const user = { id: account.id, name: account.name, email: account.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('bvb-auth-change'));
  return user;
}

export function logoutDemoUser() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('bvb-auth-change'));
}

export function shortlistKeyForUser(user = getCurrentUser()) {
  if (!user) return null;
  return `${SHORTLIST_PREFIX}${encodeURIComponent(user.email.toLowerCase())}`;
}

export function readUserShortlist(user = getCurrentUser()) {
  const key = shortlistKeyForUser(user);
  if (!key) return [];
  try {
    const ids = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(ids) ? ids.map(String) : [];
  } catch { return []; }
}

export function writeUserShortlist(ids, user = getCurrentUser()) {
  const key = shortlistKeyForUser(user);
  if (!key) throw new Error('Please log in to save properties.');
  localStorage.setItem(key, JSON.stringify([...new Set(ids.map(String))]));
  window.dispatchEvent(new Event('bvb-shortlist-change'));
}

export function toggleShortlist(id) {
  const user = getCurrentUser();
  if (!user) return { requiresLogin: true };
  const ids = readUserShortlist(user);
  const target = String(id);
  const isSaved = ids.includes(target);
  writeUserShortlist(isSaved ? ids.filter(value => value !== target) : [...ids, target], user);
  return { requiresLogin: false, isSaved: !isSaved };
}
