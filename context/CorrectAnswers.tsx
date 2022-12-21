import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface AnswerProps {
	CorrectAnswer: number;
	setCorrectAnswer: Dispatch<SetStateAction<number>>;
}

const AnswerContext = createContext<AnswerProps>({
	CorrectAnswer: 0,
	setCorrectAnswer: () => {}
});

export function AnswerProvider({ children }: { children: ReactNode }) {
	const [CorrectAnswer, setCorrectAnswer] = useState(0);
	return (
		<AnswerContext.Provider value={{ CorrectAnswer, setCorrectAnswer }}>
			{children}
		</AnswerContext.Provider>
	);
}

export const useCorrectAnswer = () => useContext(AnswerContext);
