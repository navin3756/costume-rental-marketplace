'use client';

import { useMemo, useState } from 'react';

type RawBenefit = {
  card: string;
  description: string;
  tags: string[];
  matchers: string[];
};

type RawBusiness = {
  name: string;
  category: string;
  address: string;
};

type DealMatch = {
  business: RawBusiness;
  benefit: RawBenefit;
};

const defaultBenefits = `Amex Platinum: 5x points at restaurants and small businesses
Amex Platinum: $200 prepaid hotel statement credit via Fine Hotels + Resorts
Chase Sapphire Preferred: 5x on travel booked through Chase Travel\u2120
Citi Premier: 3x on dining, groceries, and gas stations`;

const defaultBusinesses = `Crust Chandler | Restaurant | 10 N San Marcos Pl, Chandler
The Hidden House | Upscale Dining | 159 W Commonwealth Ave, Chandler
Crowne Plaza Phoenix Chandler Golf Resort | Hotel | One N San Marcos Pl, Chandler
Downtown Chandler Farmers Market | Groceries | Dr. A.J. Chandler Park, Chandler
Shell Express | Gas Station | 801 N Arizona Ave, Chandler`;

const keywordThemes = [
  { label: 'Dining', keywords: ['restaurant', 'dining', 'food', 'cafe', 'bistro'] },
  { label: 'Travel', keywords: ['hotel', 'resort', 'stay'] },
  { label: 'Groceries', keywords: ['grocery', 'groceries', 'market'] },
  { label: 'Gas', keywords: ['gas', 'fuel', 'station'] },
  { label: 'Small Business', keywords: ['small business', 'local'] }
];

const normalize = (value: string) => value.toLowerCase();

const parseBenefits = (raw: string): RawBenefit[] =>
  raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [cardPart, description = ''] = line.split(':');
      const card = cardPart?.trim() || 'Card';
      const normalizedDescription = normalize(description);
      const matchedThemes = keywordThemes.filter((theme) =>
        theme.keywords.some((keyword) => normalizedDescription.includes(keyword))
      );

      return {
        card,
        description: description.trim(),
        tags: matchedThemes.length ? matchedThemes.map((theme) => theme.label) : ['General'],
        matchers: matchedThemes.length
          ? matchedThemes.flatMap((theme) => theme.keywords)
          : [normalizedDescription || 'general']
      } satisfies RawBenefit;
    });

const parseBusinesses = (raw: string): RawBusiness[] =>
  raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = 'Business', category = 'Category', address = ''] = line.split('|').map((entry) => entry.trim());
      return { name, category, address } satisfies RawBusiness;
    });

const matchDeals = (benefits: RawBenefit[], businesses: RawBusiness[]): DealMatch[] => {
  const themedBenefits = benefits.flatMap((benefit) =>
    benefit.matchers.map((keyword) => ({ ...benefit, keyword }))
  );

  return businesses.flatMap((business) => {
    const normalizedCategory = normalize(business.category);
    const relevantBenefits = themedBenefits.filter((benefit) =>
      normalize(benefit.description).includes(normalize(benefit.keyword)) ||
      normalizedCategory.includes(normalize(benefit.keyword))
    );

    return relevantBenefits.map((benefit) => ({ business, benefit } satisfies DealMatch));
  });
};

export function DealMatcher() {
  const [location, setLocation] = useState('Chandler, AZ');
  const [creditCards, setCreditCards] = useState('Amex Platinum; Chase Sapphire Preferred; Citi Premier');
  const [benefitsRaw, setBenefitsRaw] = useState(defaultBenefits);
  const [businessesRaw, setBusinessesRaw] = useState(defaultBusinesses);

  const parsedBenefits = useMemo(() => parseBenefits(benefitsRaw), [benefitsRaw]);
  const parsedBusinesses = useMemo(() => parseBusinesses(businessesRaw), [businessesRaw]);
  const matches = useMemo(() => matchDeals(parsedBenefits, parsedBusinesses), [parsedBenefits, parsedBusinesses]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <label className="flex-1 space-y-2">
              <span className="text-sm font-medium text-slate-700">Current location</span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
                placeholder="City or neighborhood"
              />
            </label>
            <label className="flex-1 space-y-2">
              <span className="text-sm font-medium text-slate-700">Credit cards on file</span>
              <input
                value={creditCards}
                onChange={(event) => setCreditCards(event.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
                placeholder="Comma-separated cards"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Credit card benefits raw</span>
                <span className="text-xs text-slate-400">one per line</span>
              </div>
              <textarea
                value={benefitsRaw}
                onChange={(event) => setBenefitsRaw(event.target.value)}
                rows={6}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
              />
            </label>
            <label className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Local businesses raw</span>
                <span className="text-xs text-slate-400">name | category | address</span>
              </div>
              <textarea
                value={businessesRaw}
                onChange={(event) => setBusinessesRaw(event.target.value)}
                rows={6}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Structured deal matches</h2>
          <p className="text-sm text-slate-500">
            Parsed from your raw inputs and ready for an interactive map or list in {location}.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">{location}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{creditCards}</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {matches.map((match, index) => (
            <div key={`${match.business.name}-${index}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{match.business.name}</p>
                  <p className="text-sm text-slate-500">{match.business.address}</p>
                </div>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  {match.benefit.card}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">Deal: {match.benefit.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {match.business.category}
                </span>
                {match.benefit.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!matches.length && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            No matches yet. Add a restaurant, hotel, grocery, or gas benefit and a matching business category to see deals.
          </div>
        )}
      </div>
    </section>
  );
}
