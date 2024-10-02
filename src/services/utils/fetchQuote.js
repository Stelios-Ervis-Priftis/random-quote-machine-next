import axios from 'axios';

const fetchQuote = async () => {
  try {
    const { data } = await axios.get('/api/proxy');
    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};

export default fetchQuote;
