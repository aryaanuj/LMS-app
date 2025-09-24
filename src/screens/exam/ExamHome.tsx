import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ExamHome() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F10', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>Test Series</Text>
      <Text style={{ color: '#B5B8C0', marginTop: 8 }}>Multi-section mock exam with timer and navigation.</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ExamRunner')} style={{ marginTop: 24, backgroundColor: '#FF7A00', padding: 16, borderRadius: 14, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Start Exam</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ExamResults', { score: 0, total: 0 })} style={{ marginTop: 12, backgroundColor: '#17181A', padding: 16, borderRadius: 14, alignItems: 'center' }}>
        <Text style={{ color: '#FF9A3D', fontSize: 16 }}>View Last Results</Text>
      </TouchableOpacity>
    </View>
  );
}


