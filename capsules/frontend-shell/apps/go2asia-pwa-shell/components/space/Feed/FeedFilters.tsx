'use client';

import { Chip } from '@go2asia/ui';
import type { FeedFilter } from '../types';
import { FEED_FILTER_LABELS } from '../types';

interface FeedFiltersProps {
  active: FeedFilter;
  onChange: (filter: FeedFilter) => void;
}

const FILTERS: FeedFilter[] = ['my', 'friends', 'groups', 'trending', 'saved', 'following'];

export function FeedFilters({ active, onChange }: FeedFiltersProps) {
  return (
    <div className="sticky top-16 z-40 bg-white border-b border-slate-200">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map((filter) => (
            <Chip
              key={filter}
              selected={active === filter}
              onClick={() => onChange(filter)}
              size="md"
            >
              {FEED_FILTER_LABELS[filter]}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

