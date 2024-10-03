import { API_BASE_URL } from '@/constants/index';
import axios from 'axios';

const handler = async (request, response) => {
  const apiConfig = {
    method: 'get',
    url: API_BASE_URL,
    headers: {
      'X-Api-Key': process.env.API_NINJAS_KEY,
    },
  };

  try {
    const { data } = await axios.request(apiConfig);
    response.status(200).json(data[0]);
  } catch (error) {
    response.status(500).json({
      error: 'Failed to fetch data',
      details: error.message,
    });
  }
};

export default handler;
