/**
 * useApi Hook for Aerophilia 2025
 * Custom hook for handling API calls with loading states and error handling
 */

import { useState, useEffect, useCallback } from 'react';

// Types for useApi hook
export interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (params?: any) => Promise<void>;
  refetch: () => Promise<void>;
}

interface UseApiOptions {
  immediate?: boolean; // Whether to fetch data immediately on mount
  dependencies?: any[]; // Dependencies for refetching
}

function useApi<T>(
  url: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  options: UseApiOptions = {}
): UseApiResponse<T> {
  const { immediate = true, dependencies = [] } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (body?: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Add auth token if available
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result: T = await response.json();
      setData(result);
    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred';
      setError(errorMessage);
      console.error('API Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  // Refetch function (same as fetchData but without parameters)
  const refetch = useCallback(() => fetchData(), [fetchData]);

  // Fetch data immediately for GET requests if immediate is true
  useEffect(() => {
    if (method === 'GET' && immediate) {
      fetchData();
    }
  }, [fetchData, method, immediate, ...dependencies]);

  return { data, loading, error, fetchData, refetch };
}

export default useApi;
