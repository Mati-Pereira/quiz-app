import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Index() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className="flex flex-col items-center justify-center h-screen max-w-2xl gap-10 px-6 mx-auto text-center md:px-0">
			<h1 className="text-6xl font-bold">Hi, how are you?</h1>
			<p className="text-xl ">
				This is a question website, you will answer 10 questions of a varieties of subjects and see if
				your knolegde is on point
			</p>
			<Link href="/questions" className="transition-transform active:scale-95 ">
				<button className="p-4 font-semibold rounded bg-slate-600 text-slate-300">
					Click here to start and good luck!
				</button>
			</Link>
		</motion.div>
	);
}
