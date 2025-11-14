import Image from 'next/image';
import type { Costume } from '@crm/shared';

export const ListingCard = ({ costume }: { costume: Costume }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <Image
          src={costume.images?.[0] ?? 'https://placehold.co/600x400?text=Costume'}
          alt={costume.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{costume.title}</h3>
          {costume.rating && <span className="text-sm">⭐️ {costume.rating.toFixed(1)}</span>}
        </div>
        <p className="text-sm text-slate-500">{costume.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-brand">${costume.variants?.[0]?.rentalPrice}/day</span>
          <span className="text-slate-500">{costume.location ?? 'Remote'}</span>
        </div>
      </div>
    </div>
  );
};
