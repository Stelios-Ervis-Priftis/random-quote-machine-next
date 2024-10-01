import { API_BASE_URL } from '@/constants/index';
import axios from 'axios';

const config = {
  method: 'get',
  url: API_BASE_URL,
  headers: {
    'X-Api-Key': process.env.API_NINJAS_KEY,
  },
};

export default async function handler(req, res) {
  try {
    const response = await axios.request(config);
    res.status(200).json(response.data[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      error: 'Failed to fetch data',
      details: error.message,
    });
  }
}
