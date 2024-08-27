import axios from 'axios';
import { dynamic } from 'next/dynamic';
import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';

import styles from '../styles/index.module.css';

const fetchNewQuote = async (setQuote, setLoading) => {
	try {
		setLoading(true);
		const response = await axios.get('/api/proxy');
		setQuote(response.data);
	} catch (error) {
		console.error('Error fetching data:', error);
	} finally {
		setLoading(false);
	}
};

export default function App() {
	const [quote, setQuote] = useState(null);
	const [color, setColor] = useState(null);
	const [loading, setLoading] = useState(true);

	// Handle localStorage and initial quote loading
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Make sure this code only runs on the client
			const storedQuote = localStorage.getItem('myQuote');

			if (storedQuote) {
				setQuote(JSON.parse(storedQuote));
				setLoading(false);
				return;
			}

			// Fetch a new quote on initial load if not storedQuote
			getNewQuote();
		}
	}, []);

	// Handle updating localStorage and generating new color when quote changes
	useEffect(() => {
		if (quote) {
			if (typeof window !== 'undefined') {
				localStorage.setItem('myQuote', JSON.stringify(quote));
			}
			setColor(randomColor());
		}
	}, [quote]);

	const getNewQuote = () => {
		fetchNewQuote(setQuote, setLoading);
	};

	return (
		<div className={styles.container}>
			{loading ? (
				<p className={styles.loading} style={{ color }}>
					Loading...
				</p>
			) : (
				<>
					<h1 style={{ color }}>Random Quote Machine</h1>

					{quote ? (
						quote.map((q) => (
							<div className={styles.quoteBody} key={q.author}>
								<p className={styles.quote} style={{ color }}>
									{`"${q.quote}"`}
								</p>
								<p className={styles.author} style={{ color }}>
									{q.author}
								</p>
							</div>
						))
					) : (
						<div className={styles.quoteBody}>
							<p className={styles.quote} style={{ color }}>
								Request a quote!
							</p>
						</div>
					)}

					<button
						className={styles.btn}
						style={{ color }}
						onClick={getNewQuote}
					>
						New Quote
					</button>
				</>
			)}
		</div>
	);
}
