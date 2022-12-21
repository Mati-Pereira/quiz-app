import { GetServerSideProps } from 'next';
import { QuestionsProps, Result } from '../types/questions';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useCorrectAnswer } from '../context/CorrectAnswers';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';

const Questions = ({ data }: { data: QuestionsProps }) => {
	const { setCorrectAnswer } = useCorrectAnswer();
	const [NQuestion, setNQuestion] = useState(0);
	const [Alternative, setAlternative] = useState('');
	const actualQuestion: Result = data.results[NQuestion];
	const alternatives = [actualQuestion.correct_answer, ...actualQuestion.incorrect_answers];
	const router = useRouter();
	console.log(actualQuestion.correct_answer);

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
			initial={{
				opacity: 0
			}}
			animate={{
				opacity: 1
			}}
			transition={{
				duration: 1
			}}
			className="px-6 md:px-0 flex flex-col justify-center items-center h-screen max-w-2xl mx-auto gap-5">
			<h1 className="text-4xl mb-10">{parse(actualQuestion.question)}</h1>
			{randomAlternatives.map((alternative, index) => {
				return (
					<ul key={index} className="w-full flex gap-4 items-center">
						<input
							className="h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-slate-600 checked:border-slate-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
	const res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
	const data = await res.json();
	return {
		props: {
			data
		}
	};
};

export default Questions;
