import { supabase } from '../supabase';

export const userQueries = {
  getById: (id) => 
    supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single(),

  getByEmail: (email) => 
    supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single(),

  create: (data) =>
    supabase
      .from('users')
      .insert(data)
      .select()
      .single(),

  update: (id, data) =>
    supabase
      .from('users')
      .update(data)
      .eq('id', id)
      .select()
      .single(),

  delete: (id) =>
    supabase
      .from('users')
      .delete()
      .eq('id', id),
}; 