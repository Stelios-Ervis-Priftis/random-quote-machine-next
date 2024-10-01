import { useQuery } from '@tanstack/react-query';

import { initialQuoteData } from '@/constants/index';
import fetchQuote from '@/services/quoteService';

export default function useQuote() {
  return useQuery({
    queryKey: ['quote'],
    queryFn: fetchQuote,
    initialData: initialQuoteData,
    retry: 1,
    enabled: false,
  });
}
