'use client';

import { useQuery } from '@tanstack/react-query';
import api from '../../../lib/api-client';
import type { Booking } from '@crm/shared';

type BookingResponse = Booking & { _id?: string };

const fetchBookings = async () => {
  const { data } = await api.get<{ data: BookingResponse[] }>('/bookings');
  return data.data.map((booking) => ({
    ...booking,
    id: booking.id ?? booking._id ?? Math.random().toString(36).slice(2)
  }));
};

export default function BookingsPage() {
  const { data: bookings = [] } = useQuery({ queryKey: ['bookings'], queryFn: fetchBookings });

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Upcoming rentals</h1>
      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-semibold">Costume #{booking.costumeId}</p>
            <p className="text-sm text-slate-500">
              {booking.startDate} → {booking.endDate}
            </p>
            <p className="text-sm text-slate-500">Status: {booking.status}</p>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-sm text-slate-500">No bookings yet.</p>}
      </div>
    </section>
  );
}
