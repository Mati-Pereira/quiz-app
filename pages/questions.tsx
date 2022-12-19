import { GetStaticProps, NextPage } from 'next';
import { QuestionsProps } from '../types/questions';

const Questions = ({ data }: { data: QuestionsProps }) => {
	console.log(data);

	return <div></div>;
};

export default Questions;

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
	const data = await res.json();
	return {
		props: {
			data
		}
	};
};
