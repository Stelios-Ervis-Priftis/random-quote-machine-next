import { useQuery } from '@tanstack/react-query';

import { initialQuoteData, QUERY_QUOTE_KEY } from '@/constants/index';
import fetchQuote from '@/services/utils/fetchQuote';

const useQuote = () =>
  useQuery({
    queryKey: [QUERY_QUOTE_KEY],
    queryFn: fetchQuote,
    initialData: initialQuoteData,
    retry: 1,
    enabled: false,
  });

export default useQuote;
