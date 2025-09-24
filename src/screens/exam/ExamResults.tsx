import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ExamStackParamList } from '@navigation/ExamNavigator';
import { VictoryPie } from 'victory-native';

export default function ExamResults() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ExamStackParamList, 'ExamResults'>>();
  const { score, total } = route.params;
  const correct = score;
  const incorrect = Math.max(total - score, 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F10', padding: 24 }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>Results</Text>
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <VictoryPie
          data={[{ x: 'Correct', y: correct }, { x: 'Incorrect', y: incorrect }]}
          colorScale={["#22C55E", "#EF4444"]}
          innerRadius={70}
          padAngle={2}
          height={260}
          style={{ labels: { fill: '#fff' } }}
        />
        <Text style={{ color: '#B5B8C0', marginTop: -24 }}>Score: {score} / {total}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.popToTop()} style={{ marginTop: 24, backgroundColor: '#FF7A00', padding: 16, borderRadius: 14, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Back to Exams</Text>
      </TouchableOpacity>
    </View>
  );
}


