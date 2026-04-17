import { useState, useEffect } from 'react';
import { Workshop, WorkshopStatus } from '../types';
import { getWorkshops, getWorkshopBySlug } from '../lib/workshops';
import { WORKSHOPS } from '../constants';

interface UseWorkshopsResult {
  workshops: Workshop[];
  loading: boolean;
  error: string | null;
}

export function useWorkshops(statusFilter?: WorkshopStatus): UseWorkshopsResult {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const all = await getWorkshops();
        if (cancelled) return;

        const filtered = statusFilter
          ? all.filter(w => w.status === statusFilter)
          : all;

        setWorkshops(filtered);
        setError(null);
      } catch (err: unknown) {
        if (cancelled) return;
        // Fallback to constants if Firebase is not configured
        const fallback = statusFilter
          ? WORKSHOPS.filter(w => w.status === statusFilter)
          : WORKSHOPS;
        setWorkshops(fallback);
        setError(err instanceof Error ? err.message : 'Failed to load workshops');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [statusFilter]);

  return { workshops, loading, error };
}

interface UseWorkshopResult {
  workshop: Workshop | null;
  loading: boolean;
  error: string | null;
}

export function useWorkshop(slug: string | undefined): UseWorkshopResult {
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const result = await getWorkshopBySlug(slug!);
        if (cancelled) return;
        setWorkshop(result);
        setError(null);
      } catch (err: unknown) {
        if (cancelled) return;
        // Fallback to constants
        const fallback = WORKSHOPS.find(w => w.slug === slug) ?? null;
        setWorkshop(fallback);
        setError(err instanceof Error ? err.message : 'Failed to load workshop');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { workshop, loading, error };
}
