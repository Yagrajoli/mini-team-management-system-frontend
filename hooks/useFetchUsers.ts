import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { api } from '@/lib/api';
import axios from 'axios';


export const useFetchUsers = () => {
  const { setUsers, setLoading, setError } = useUserStore();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched) return;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data } = await api.get('/users');
        setUsers(data);
        setFetched(true);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [fetched, setUsers, setLoading, setError]);
};