import axios from 'axios';

const fetchQuote = async () => {
  const { data } = await axios.get('/api/proxy');
  return data;
};

export default fetchQuote;
