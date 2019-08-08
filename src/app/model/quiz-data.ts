export interface QuizData {
  id: number;
  question: string;
  answers: [];
  correctAnswer: number;
  userAnswer?: string;
}
