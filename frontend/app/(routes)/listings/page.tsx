'use client';

import { useQuery } from '@tanstack/react-query';
import api from '../../../lib/api-client';
import { ListingCard } from '../../../components/ListingCard';
import { useFilters } from '../../../store/useFilters';
import type { Costume } from '@crm/shared';

type CostumeResponse = Costume & { _id?: string };

const fetchCostumes = async (query: string, category: string) => {
  const { data } = await api.get<{ data: CostumeResponse[] }>('/costumes', {
    params: { q: query, category }
  });
  const fallbackId = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  return data.data.map((costume) => ({
    ...costume,
    id: costume.id ?? costume._id ?? fallbackId()
  }));
};

export default function ListingsPage() {
  const { query, category, setQuery, setCategory } = useFilters();
  const { data: costumes = [], isLoading } = useQuery({
    queryKey: ['costumes', query, category],
    queryFn: () => fetchCostumes(query, category)
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search costumes"
          className="flex-1 rounded-md border border-slate-200 px-3 py-2"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-md border border-slate-200 px-3 py-2"
        >
          <option value="all">All categories</option>
          <option value="historical">Historical</option>
          <option value="sci-fi">Sci-Fi</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading listings...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {costumes.map((costume) => (
            <ListingCard key={costume.id} costume={costume} />
          ))}
        </div>
      )}
    </section>
  );
}
