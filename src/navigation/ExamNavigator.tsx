import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExamHome from '@screens/exam/ExamHome';
import ExamRunner from '@screens/exam/ExamRunner';
import ExamResults from '@screens/exam/ExamResults';
import ResultsDashboard from '@screens/exam/ResultsDashboard';

export type ExamStackParamList = {
  ExamHome: undefined;
  ExamRunner: undefined;
  ExamResults: { score: number; total: number };
  ResultsDashboard: undefined;
};

const Stack = createNativeStackNavigator<ExamStackParamList>();

export default function ExamNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExamHome" component={ExamHome} />
      <Stack.Screen name="ExamRunner" component={ExamRunner} />
      <Stack.Screen name="ExamResults" component={ExamResults} />
      <Stack.Screen name="ResultsDashboard" component={ResultsDashboard} />
    </Stack.Navigator>
  );
}


