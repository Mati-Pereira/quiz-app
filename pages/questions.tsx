import { GetServerSideProps } from 'next';
import { QuestionsProps, Result } from '../types/questions';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useCorrectAnswer } from '../context/CorrectAnswers';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';

const Questions = ({ data }: { data: Result[] }) => {
	const { setCorrectAnswer } = useCorrectAnswer();
	const [NQuestion, setNQuestion] = useState(0);
	const [Alternative, setAlternative] = useState('');
	const actualQuestion: Result = data[NQuestion];
	const alternatives = [actualQuestion.correct_answer, ...actualQuestion.incorrect_answers];
	const router = useRouter();

	let randomAlternatives = useMemo(() => alternatives.sort(() => Math.random() - 0.5), [NQuestion]);

	const handleNext = () => {
		setNQuestion((prev) => prev + 1);
		if (parse(actualQuestion.correct_answer) === Alternative) {
			setCorrectAnswer((prev) => prev + 1);
		}
	};

	const handleResults = () => {
		if (parse(actualQuestion.correct_answer) === Alternative) {
			setCorrectAnswer((prev) => prev + 1);
		}
		router.push('/results');
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className="flex flex-col items-center justify-center h-screen max-w-2xl gap-5 px-6 mx-auto md:px-0">
			<h1 className="mb-10 text-4xl">{parse(actualQuestion.question)}</h1>
			{randomAlternatives.map((alternative, index) => {
				return (
					<ul key={index} className="flex items-center w-full gap-4">
						<input
							className="float-left w-6 h-6 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm cursor-pointer checked:bg-slate-600 checked:border-slate-600 focus:outline-none"
							type="checkbox"
							value={alternative}
							checked={Alternative === alternative}
							onChange={() => setAlternative(alternative)}
						/>
						<span>{parse(alternative)}</span>
					</ul>
				);
			})}
			{!(NQuestion === 9) ? (
				<button
					onClick={handleNext}
					className="mt-10 px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out disabled:hidden">
					Next
				</button>
			) : (
				<button
					onClick={handleResults}
					className="mt-10 px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out disabled:hidden">
					Results
				</button>
			)}
		</motion.div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res1 = await fetch(
		'https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple&category=10'
	);
	const res2 = await fetch(
		'https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple&category=15'
	);
	const res3 = await fetch(
		'https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple&category=32'
	);
	const data1 = await res1.json();
	const data2 = await res2.json();
	const data3 = await res3.json();
	const data = [...data1.results, ...data2.results, ...data3.results];
	return {
		props: {
			data
		}
	};
};

export default Questions;
