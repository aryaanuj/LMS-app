export type QuestionOption = { id: string; text: string };
export type Question =
  | { id: string; type: 'single'; text: string; options: QuestionOption[]; answer?: string }
  | { id: string; type: 'multiple'; text: string; options: QuestionOption[]; answer?: string[] }
  | { id: string; type: 'truefalse'; text: string; answer?: boolean }
  | { id: string; type: 'fill'; text: string; answer?: string }
  | { id: string; type: 'short'; text: string; answer?: string };

export type ExamSection = { id: string; title: string; questions: Question[] };
export type Exam = { id: string; title: string; durationMin: number; sections: ExamSection[] };

export const sampleExam: Exam = {
  id: 'e1',
  title: 'Mock Aptitude Test',
  durationMin: 30,
  sections: [
    {
      id: 's1',
      title: 'Quant',
      questions: [
        { id: 'q1', type: 'single', text: '2 + 2 = ?', options: [
          { id: 'o1', text: '3' }, { id: 'o2', text: '4' }, { id: 'o3', text: '5' }
        ] },
        { id: 'q2', type: 'truefalse', text: '5 is prime' },
      ],
    },
    {
      id: 's2',
      title: 'Reasoning',
      questions: [
        { id: 'q3', type: 'multiple', text: 'Select even numbers', options: [
          { id: 'o1', text: '1' }, { id: 'o2', text: '2' }, { id: 'o3', text: '4' }
        ] },
        { id: 'q4', type: 'fill', text: 'Sky is ___' },
      ],
    },
    {
      id: 's3',
      title: 'English',
      questions: [
        { id: 'q5', type: 'short', text: 'Define noun' },
      ],
    },
  ],
};


