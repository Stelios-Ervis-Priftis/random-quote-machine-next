import axios from 'axios';

const config = {
	method: 'get',
	maxBodyLength: Infinity,
	url: 'https://api.api-ninjas.com/v1/quotes',
	headers: {
		'X-Api-Key': 'ftW4HSzbTpFf/+DI13vgsQ==JZ0HUPHKQsFZsnld',
	},
};

export default async function handler(req, res) {
	try {
		// Await the response directly and store it in a variable
		const response = await axios.request(config);

		// Send the response data back to the client
		res.status(200).json(response.data);
	} catch (error) {
		console.error('Error fetching data:', error); // Log the error details
		res.status(500).json({
			error: 'Failed to fetch data',
			details: error.message,
		});
	}
}
