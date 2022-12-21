import React from 'react';
import { AnswerProvider } from '../context/CorrectAnswers';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { Ring } from '@uiball/loaders';

export default function App({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		const start = () => {
			console.log('start');
			setLoading(true);
		};
		const end = () => {
			console.log('findished');
			setLoading(false);
		};
		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);
		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, []);
	return (
		<AnswerProvider>
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<Ring size={70} lineWeight={5} speed={2} color="black" />
				</div>
			) : (
				<Component {...pageProps} />
			)}
		</AnswerProvider>
	);
}
