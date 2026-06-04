import { useEffect, useState } from 'react';
import { servicesApi } from '@/api/servicesApi';
import type { Service } from '@/types/service';

export function useServicesTree() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    servicesApi
      .getTree()
      .then(setServices)
      .catch(() => setError('Failed to load services'))
      .finally(() => setIsLoading(false));
  }, []);

  return { services, isLoading, error };
}

export function useServicesFlat() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = () => {
    setIsLoading(true);
    servicesApi
      .getFlat()
      .then(setServices)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  return { services, isLoading, refresh };
}
