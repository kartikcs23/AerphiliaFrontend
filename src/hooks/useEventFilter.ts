import { useState, useMemo } from 'react';
import type { Event, EventFilter } from '../types/Event.types';

interface UseEventFilterReturn {
  filteredEvents: Event[];
  filter: EventFilter;
  updateFilter: (newFilter: Partial<EventFilter>) => void;
  resetFilter: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DEFAULT_FILTER: EventFilter = {
  search: '',
  category: '',
  sortBy: 'date',
  sortOrder: 'asc',
};

export const useEventFilter = (events: Event[]): UseEventFilterReturn => {
  const [filter, setFilter] = useState<EventFilter>(DEFAULT_FILTER);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort events based on current filter settings
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Filter by search query
    if (filter.search || searchQuery) {
      const query = (filter.search || searchQuery).toLowerCase();
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (filter.category && filter.category !== '') {
      filtered = filtered.filter(event => event.category.id === filter.category);
    }

    // Filter by date range
    if (filter.dateRange) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= filter.dateRange!.start && eventDate <= filter.dateRange!.end;
      });
    }

    // Filter by price range
    if (filter.priceRange) {
      filtered = filtered.filter(event =>
        event.registrationFee >= filter.priceRange!.min &&
        event.registrationFee <= filter.priceRange!.max
      );
    }

    // Sort events
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filter.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'price':
          comparison = a.registrationFee - b.registrationFee;
          break;
        case 'popularity':
          comparison = b.currentParticipants - a.currentParticipants;
          break;
        default:
          comparison = 0;
      }

      return filter.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [events, filter, searchQuery]);

  // Update filter function
  const updateFilter = (newFilter: Partial<EventFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  // Reset filter function
  const resetFilter = () => {
    setFilter(DEFAULT_FILTER);
    setSearchQuery('');
  };

  return {
    filteredEvents,
    filter,
    updateFilter,
    resetFilter,
    searchQuery,
    setSearchQuery,
  };
};
