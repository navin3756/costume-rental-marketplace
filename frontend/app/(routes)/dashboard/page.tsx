'use client';

import { useQuery } from '@tanstack/react-query';
import api from '../../../lib/api-client';
import { useMemo } from 'react';
import type { Booking } from '@crm/shared';

type BookingResponse = Booking & { _id?: string };

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get<{ data: BookingResponse[] }>('/bookings');
      return response.data.data;
    }
  });

  const stats = useMemo(() => {
    const bookings = data ?? [];
    return {
      totalBookings: bookings.length,
      upcoming: bookings.filter((booking) => booking.status === 'confirmed').length
    };
  }, [data]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Owner dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total bookings</p>
          <p className="text-3xl font-semibold">{stats.totalBookings}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Upcoming</p>
          <p className="text-3xl font-semibold">{stats.upcoming}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Payouts</p>
          <p className="text-3xl font-semibold">$0.00</p>
        </div>
      </div>
    </section>
  );
}
