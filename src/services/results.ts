import AsyncStorage from '@react-native-async-storage/async-storage';

export type ExamAttempt = {
  id: string;
  examId: string;
  timestamp: number;
  score: number;
  total: number;
  sectionScores: Record<string, number>;
  durationSec: number;
};

const KEY = '@lmsapp_exam_attempts';

export async function saveAttempt(attempt: ExamAttempt): Promise<void> {
  const raw = (await AsyncStorage.getItem(KEY)) ?? '[]';
  const arr = JSON.parse(raw) as ExamAttempt[];
  arr.unshift(attempt);
  await AsyncStorage.setItem(KEY, JSON.stringify(arr.slice(0, 50)));
}

export async function getAttempts(examId?: string): Promise<ExamAttempt[]> {
  const raw = (await AsyncStorage.getItem(KEY)) ?? '[]';
  const arr = JSON.parse(raw) as ExamAttempt[];
  return examId ? arr.filter(a => a.examId === examId) : arr;
}


