export interface Quizdata {
    id: number;
    question: string;
    answers: [];
    correctAnswer: number;
    userAnswer?: string;
}
