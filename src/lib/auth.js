import { getServerSession } from 'next-auth';
import { query } from './supabase';

export async function getUserByEmail(email) {
  try {
    const result = await query('user.getByEmail', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getServerSession();
  
  if (!session) {
    return null;
  }

  const sql = 'SELECT id, name, email, role FROM users WHERE email = $1';
  const result = await query(sql, [session.user.email]);
  
  return result.rows[0] || null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'admin') {
    throw new Error('Forbidden');
  }
  
  return user;
}

export async function requireEditor() {
  const user = await getCurrentUser();
  
  if (!user || !['admin', 'editor'].includes(user.role)) {
    throw new Error('Forbidden');
  }
  
  return user;
} 