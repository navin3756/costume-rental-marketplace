const features = [
  {
    title: 'Verified renters & owners',
    description: 'Firebase authentication keeps every interaction safe.'
  },
  {
    title: 'Powerful search',
    description: 'React Query keeps filters, pagination, and results in sync.'
  },
  {
    title: 'Secure payments',
    description: 'Stripe handles deposits, holds, and refunds automatically.'
  },
  {
    title: 'Calendar bookings',
    description: 'Avoid double bookings with availability windows synced to MongoDB.'
  }
];

export const FeatureGrid = () => (
  <div className="grid gap-6 md:grid-cols-2">
    {features.map((feature) => (
      <div key={feature.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">{feature.title}</h3>
        <p className="text-sm text-slate-500">{feature.description}</p>
      </div>
    ))}
  </div>
);
