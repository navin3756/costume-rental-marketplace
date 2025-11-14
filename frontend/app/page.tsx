import { FeatureGrid } from '../components/FeatureGrid';
import { ListingCard } from '../components/ListingCard';
import { CalendarPicker } from '../components/CalendarPicker';
import type { Costume } from '@crm/shared';

const featured: Costume[] = [
  {
    id: '1',
    ownerId: '1',
    title: 'Victorian Royalty',
    description: 'Hand-tailored ball gown with accessories.',
    category: 'Historical',
    tags: ['gown'],
    images: ['https://placehold.co/600x400?text=Victorian'],
    variants: [{ size: 'M', rentalPrice: 120, stock: 1 }],
    rating: 4.9,
    location: 'San Francisco'
  },
  {
    id: '2',
    ownerId: '1',
    title: 'Galactic Explorer',
    description: 'LED-lit space suit with helmet.',
    category: 'Sci-Fi',
    tags: ['space'],
    images: ['https://placehold.co/600x400?text=Galaxy'],
    variants: [{ size: 'L', rentalPrice: 95, stock: 2 }],
    rating: 4.7,
    location: 'Remote'
  }
];

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="grid gap-10 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold">
            Rent, list, and manage costumes with a single modern toolkit.
          </h1>
          <p className="text-lg text-slate-600">
            Firebase Auth, Stripe, MongoDB, and AWS S3 are pre-wired so your team can focus on
            storytelling and unforgettable events.
          </p>
          <FeatureGrid />
        </div>
        <CalendarPicker />
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Featured costumes</h2>
          <p className="text-sm text-slate-500">Powered by React Query + Zustand filters.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((costume) => (
            <ListingCard key={costume.id} costume={costume} />
          ))}
        </div>
      </div>
    </section>
  );
}
