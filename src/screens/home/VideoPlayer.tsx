import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '@navigation/HomeNavigator';

const SPEEDS = [0.75, 1.0, 1.25, 1.5, 2.0] as const;

export default function VideoPlayer() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<HomeStackParamList, 'VideoPlayer'>>();
  const { title, videoUrl } = route.params;
  const [rateIdx, setRateIdx] = React.useState(1);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, backgroundColor: '#111' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: '#FF9A3D', fontSize: 16 }}>Back</Text></TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 16, marginLeft: 12 }} numberOfLines={1}>{title}</Text>
      </View>
      <Video
        source={{ uri: videoUrl }}
        style={{ width: '100%', height: 240, backgroundColor: '#000' }}
        controls
        resizeMode="contain"
        rate={SPEEDS[rateIdx]}
        posterResizeMode="contain"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <TouchableOpacity onPress={() => setRateIdx((rateIdx + 1) % SPEEDS.length)} style={{ backgroundColor: '#17181A', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 }}>
          <Text style={{ color: '#fff' }}>Speed: {SPEEDS[rateIdx]}x</Text>
        </TouchableOpacity>
        <Text style={{ color: '#8A8F98' }}>Use full-screen from player controls</Text>
      </View>
    </View>
  );
}


