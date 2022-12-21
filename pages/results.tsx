import Link from 'next/link';
import { useCorrectAnswer } from '../context/CorrectAnswers';

const Results = () => {
	const { CorrectAnswer } = useCorrectAnswer();
	if (0 <= CorrectAnswer && CorrectAnswer <= 4) {
		return (
			<div className="flex flex-col justify-center items-center h-screen max-w-2xl mx-auto gap-5">
				<h1 className="text-6xl font-bold">Results</h1>
				<p className="text-xl">
					<strong>{CorrectAnswer}</strong> of 10
				</p>
				<p className="text-xl">Unfortunately, your knowledge is not very good</p>
				<img src="./sad.svg" alt="emoji" className="w-20" />
				<Link href="/">
					<button className="mt-10 px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out disabled:hidden">
						Try Again
					</button>
				</Link>
			</div>
		);
	}
	if (5 < CorrectAnswer && CorrectAnswer <= 7) {
		return (
			<div className="flex flex-col justify-center items-center h-screen max-w-2xl mx-auto gap-5">
				<h1 className="text-6xl font-bold">Results</h1>
				<p className="text-xl">
					<strong>{CorrectAnswer}</strong> of 10
				</p>
				<p className="text-xl">Congratulations you did well, but you can do better</p>
				<img src="./smile.svg" alt="emoji" />
				<Link href="/">
					<button className="mt-10 px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out disabled:hidden">
						Try Again
					</button>
				</Link>
			</div>
		);
	}
	if (8 < CorrectAnswer && CorrectAnswer <= 10) {
		return (
			<div className="flex flex-col justify-center items-center h-screen max-w-2xl mx-auto gap-5">
				<h1 className="text-6xl font-bold">Results</h1>
				<p className="text-3xl">
					<strong>{CorrectAnswer}</strong> of 10
				</p>
				<p className="text-xl">Congratulations, you know your stuff, even better than I imagined</p>
				<img src="./shocked.svg" alt="emoji" />
				<Link href="/">
					<button className="mt-10 px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out disabled:hidden">
						Try Again
					</button>
				</Link>
			</div>
		);
	}
	return;
};

export default Results;
