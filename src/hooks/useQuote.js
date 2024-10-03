import { useQuery } from '@tanstack/react-query';

import { initialQuoteData, QUERY_QUOTE_KEY } from '@/constants/index';
import fetchRandomQuote from '@/services/utils/fetchRandomQuote';

const useQuote = () =>
  useQuery({
    queryKey: [QUERY_QUOTE_KEY],
    queryFn: fetchRandomQuote,
    initialData: initialQuoteData,
    retry: 1,
    enabled: false,
  });

export default useQuote;
