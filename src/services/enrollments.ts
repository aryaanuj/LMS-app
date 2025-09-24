import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@lmsapp_enrollments';

export async function getEnrollments(): Promise<Record<string, boolean>> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : {};
}

export async function isEnrolled(courseId: string): Promise<boolean> {
  const map = await getEnrollments();
  return !!map[courseId];
}

export async function toggleEnrollment(courseId: string): Promise<boolean> {
  const map = await getEnrollments();
  const next = { ...map, [courseId]: !map[courseId] };
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return !!next[courseId];
}


