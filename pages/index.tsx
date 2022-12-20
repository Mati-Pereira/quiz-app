import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Index() {
	return (
		<div className="flex flex-col items-center justify-center h-screen max-w-2xl gap-10 mx-auto text-center">
			<motion.h1
				initial={{
					opacity: 0,
					translateX: -100
				}}
				animate={{
					opacity: 1,
					translateX: 0
				}}
				transition={{
					duration: 1
				}}
				className="text-6xl font-bold">
				Hi, how are you?
			</motion.h1>
			<motion.p
				initial={{
					opacity: 0,
					translateX: 100
				}}
				animate={{
					opacity: 1,
					translateX: 0
				}}
				transition={{
					duration: 1
				}}
				className="text-xl ">
				This is a question website, you will answer 10 questions of a varieties of subjects and see if your knolegde is on point
			</motion.p>
			<Link href="/questions" className="transition-transform active:scale-95 ">
				<motion.button
					initial={{
						opacity: 0,
						translateX: -100
					}}
					animate={{
						opacity: 1,
						translateX: 0
					}}
					transition={{
						duration: 1
					}}
					className="p-4 font-semibold rounded bg-slate-600 text-slate-300">
					Click here to start and good luck!
				</motion.button>
			</Link>
		</div>
	);
}
