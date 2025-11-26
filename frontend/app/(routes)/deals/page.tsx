import { DealMatcher } from '../../../components/DealMatcher';

export default function DealsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Offer automation</p>
        <h1 className="text-4xl font-semibold">Credit card deals mapped to local businesses</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Paste raw credit card perks and nearby merchant details to instantly create structured deals.
          The matcher tags each benefit, pairs it with a relevant business, and outputs tiles ready for a
          map or list experience.
        </p>
      </div>

      <DealMatcher />
    </section>
  );
}
