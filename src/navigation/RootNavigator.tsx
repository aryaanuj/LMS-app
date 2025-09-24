import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import HomeIcon from '@assets/icons/HomeIcon';
import CoursesIcon from '@assets/icons/CoursesIcon';
import ProfileIcon from '@assets/icons/ProfileIcon';
import HomeNavigator from '@navigation/HomeNavigator';
import MyCourses from '@screens/courses/MyCourses';
import Profile from '@screens/profile/Profile';
import ExamNavigator from '@navigation/ExamNavigator';
import { AuthProvider, useAuth } from '@context/AuthContext';
import { AuthNavigator } from './AuthNavigator';

const OrangeTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF7A00',
    background: '#0F0F10',
    card: '#17181A',
    text: '#FFFFFF',
    border: '#242529',
    notification: '#FF9A3D',
  },
};

function Placeholder({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 18 }}>{title}</Text>
    </View>
  );
}

const Tabs = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#17181A', borderTopColor: '#242529' },
        tabBarActiveTintColor: '#FF9A3D',
        tabBarInactiveTintColor: '#8A8F98',
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') return <HomeIcon color={color} />;
          if (route.name === 'MyCourses') return <CoursesIcon color={color} />;
          return <ProfileIcon color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeNavigator} />
      <Tabs.Screen name="MyCourses" component={MyCourses} options={{ title: 'My Courses' }} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="ExamPanel" component={ExamNavigator} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function SwitchNavigator() {
  const { user, initializing } = useAuth();
  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </View>
    );
  }
  return user ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={DrawerNavigator} />
    </Stack.Navigator>
  ) : (
    <AuthNavigator />
  );
}

export function RootNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer theme={OrangeTheme}>
        <SwitchNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}


