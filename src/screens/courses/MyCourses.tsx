import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { courses } from '@data/courses';
import { getEnrollments } from '@services/enrollments';

export default function MyCourses() {
  const [enrolledIds, setEnrolledIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    const unsubscribe = () => {};
    (async () => {
      const map = await getEnrollments();
      setEnrolledIds(Object.keys(map).filter(k => map[k]));
    })();
    return unsubscribe;
  }, []);

  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id));

  if (enrolledCourses.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0F0F10', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>No enrolled courses</Text>
        <Text style={{ color: '#B5B8C0', marginTop: 8, textAlign: 'center' }}>Enroll from Home to start learning.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F10', padding: 16 }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 8 }}>My Courses</Text>
      <FlatList
        data={enrolledCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', backgroundColor: '#17181A', borderRadius: 14, marginVertical: 8, overflow: 'hidden' }}>
            <Image source={{ uri: item.thumbnail }} style={{ width: 120, height: 90 }} />
            <View style={{ flex: 1, padding: 12, justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }} numberOfLines={1}>{item.title}</Text>
              <Text style={{ color: '#B5B8C0', marginTop: 4 }} numberOfLines={1}>{item.instructor}</Text>
              <View style={{ height: 8, backgroundColor: '#242529', borderRadius: 8, marginTop: 8, overflow: 'hidden' }}>
                <View style={{ width: '12%', height: 8, backgroundColor: '#FF7A00' }} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}


