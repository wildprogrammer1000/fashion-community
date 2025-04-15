import { supabase } from '../supabase';

export const magazineQueries = {
  getAll: () => 
    supabase
      .from('magazines')
      .select(`
        *,
        user:users(nickname)
      `)
      .order('created_at', { ascending: false }),

  getById: (id) => 
    supabase
      .from('magazines')
      .select(`
        *,
        user:users(nickname)
      `)
      .eq('id', id)
      .single(),

  create: (data) =>
    supabase
      .from('magazines')
      .insert(data)
      .select()
      .single(),

  update: (id, data) =>
    supabase
      .from('magazines')
      .update(data)
      .eq('id', id)
      .select()
      .single(),

  delete: (id) =>
    supabase
      .from('magazines')
      .delete()
      .eq('id', id),
}; 