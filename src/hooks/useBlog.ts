import { useState, useEffect } from 'react';
import { supabase, type Blog } from '../lib/supabase';

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setBlogs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }

  return { blogs, loading, error };
}

export function useBlogById(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchBlog();
  }, [id]);

  async function fetchBlog() {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      setBlog(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  }

  return { blog, loading, error };
}
