import { useEffect, useState } from 'react';
import { lawyersApi } from '@/api/lawyersApi';
import type { Lawyer } from '@/types/lawyer';

export function useLawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    lawyersApi
      .getAll()
      .then(setLawyers)
      .catch(() => setError('Failed to load lawyers'))
      .finally(() => setIsLoading(false));
  }, []);

  return { lawyers, isLoading, error };
}

export function useLawyerBySlug(slug: string) {
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    lawyersApi
      .getBySlug(slug)
      .then(setLawyer)
      .catch(() => setError('Lawyer not found'))
      .finally(() => setIsLoading(false));
  }, [slug]);

  return { lawyer, isLoading, error };
}
