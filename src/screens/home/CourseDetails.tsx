import React from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import { courses } from '@data/courses';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@navigation/HomeNavigator';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { toggleEnrollment, isEnrolled } from '@services/enrollments';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CourseDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<HomeStackParamList, 'CourseDetails'>>();
  const course = courses.find(c => c.id === route.params.courseId)!;
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [enrolled, setEnrolled] = React.useState<boolean>(false);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    (async () => setEnrolled(await isEnrolled(course.id)))();
  }, [course.id]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const onToggleEnroll = async () => {
    scale.value = withSpring(0.95, {}, () => { scale.value = withSpring(1); });
    const next = await toggleEnrollment(course.id);
    setEnrolled(next);
  };

  const onToggleUnit = (unitId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0F0F10' }} contentContainerStyle={{ paddingBottom: 24 }}>
      <Image source={{ uri: course.thumbnail }} style={{ height: 220 }} />
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>{course.title}</Text>
        <Text style={{ color: '#B5B8C0', marginTop: 4 }}>{course.instructor} • ★ {course.rating.toFixed(1)}</Text>
        <Animated.View style={[{ marginTop: 16 }, animStyle]}>
          <TouchableOpacity onPress={onToggleEnroll} style={{ backgroundColor: enrolled ? '#22C55E' : '#FF7A00', padding: 14, borderRadius: 14, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>{enrolled ? 'Enrolled' : 'Enroll'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        {course.units.map(unit => (
          <View key={unit.id} style={{ backgroundColor: '#17181A', borderRadius: 14, marginBottom: 12, overflow: 'hidden' }}>
            <TouchableOpacity onPress={() => onToggleUnit(unit.id)} style={{ padding: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{unit.title}</Text>
              <Text style={{ color: '#FF9A3D' }}>{expanded[unit.id] ? '−' : '+'}</Text>
            </TouchableOpacity>
            {expanded[unit.id] && (
              <View style={{ paddingBottom: 8 }}>
                {unit.lessons.map(lesson => (
                  <TouchableOpacity key={lesson.id} disabled={!!lesson.locked && !enrolled}
                    onPress={() => navigation.navigate('VideoPlayer', { title: lesson.title, videoUrl: lesson.videoUrl || '' })}
                    style={{ paddingHorizontal: 14, paddingVertical: 10, opacity: lesson.locked && !enrolled ? 0.5 : 1 }}>
                    <Text style={{ color: '#fff' }}>{lesson.title} • {lesson.durationMin}m {lesson.locked ? '🔒' : ''}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


