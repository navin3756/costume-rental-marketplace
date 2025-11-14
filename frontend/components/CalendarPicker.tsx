'use client';

import { useState } from 'react';

export const CalendarPicker = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="font-semibold">Booking window</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span>Start date</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span>End date</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>
      </div>
      {startDate && endDate && (
        <p className="text-sm text-slate-500">Selected {startDate} to {endDate}</p>
      )}
    </div>
  );
};
