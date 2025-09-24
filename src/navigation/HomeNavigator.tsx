import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/home/Home';
import CourseDetails from '@screens/home/CourseDetails';
import VideoPlayer from '@screens/home/VideoPlayer';

export type HomeStackParamList = {
  Home: undefined;
  CourseDetails: { courseId: string };
  VideoPlayer: { title: string; videoUrl: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
}


