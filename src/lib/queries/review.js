import { supabase } from '../supabase';

export const reviewQueries = {
  getAll: () => 
    supabase
      .from('reviews')
      .select(`
        *,
        user:users(nickname)
      `)
      .order('created_at', { ascending: false }),

  getById: (id) => 
    supabase
      .from('reviews')
      .select(`
        *,
        user:users(nickname)
      `)
      .eq('id', id)
      .single(),

  create: (data) =>
    supabase
      .from('reviews')
      .insert(data)
      .select()
      .single(),

  update: (id, data) =>
    supabase
      .from('reviews')
      .update(data)
      .eq('id', id)
      .select()
      .single(),

  delete: (id) =>
    supabase
      .from('reviews')
      .delete()
      .eq('id', id),
}; 