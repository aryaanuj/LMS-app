import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { courses } from '@data/courses';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F10', padding: 16 }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700', marginVertical: 8 }}>Discover Courses</Text>
      <FlatList
        data={courses}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
            style={{ flex: 1, backgroundColor: '#17181A', borderRadius: 16, marginVertical: 8, overflow: 'hidden' }}
          >
            <Image source={{ uri: item.thumbnail }} style={{ height: 120 }} />
            <View style={{ padding: 12 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }} numberOfLines={1}>{item.title}</Text>
              <Text style={{ color: '#B5B8C0', marginTop: 4 }} numberOfLines={1}>{item.instructor}</Text>
              <Text style={{ color: '#FF9A3D', marginTop: 6 }}>★ {item.rating.toFixed(1)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


