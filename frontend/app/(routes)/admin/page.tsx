'use client';

import { useQuery } from '@tanstack/react-query';
import api from '../../../lib/api-client';

export default function AdminPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const response = await api.get('/admin/overview');
      return response.data.data;
    }
  });

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Admin overview</h1>
      {isLoading ? (
        <p>Loading metrics...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          {Object.entries(data ?? {}).map(([key, value]) => (
            <div key={key} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{key}</p>
              <p className="text-2xl font-semibold">{value as number}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
