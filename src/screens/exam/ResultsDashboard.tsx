import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { getAttempts } from '@services/results';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

export default function ResultsDashboard() {
  const [attempts, setAttempts] = React.useState<any[]>([]);
  React.useEffect(() => { (async () => setAttempts(await getAttempts()))(); }, []);

  const data = attempts.slice(0, 8).reverse().map((a, idx) => ({ x: `#${attempts.length - idx}`, y: Math.round((a.score / a.total) * 100) }));

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F10', padding: 16 }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Results Dashboard</Text>
      <VictoryChart theme={VictoryTheme.material} domainPadding={16}>
        <VictoryBar data={data} style={{ data: { fill: '#FF7A00' } }} />
      </VictoryChart>
      <Text style={{ color: '#B5B8C0', marginTop: -8 }}>Last {data.length} attempts (score %)</Text>
      <FlatList
        style={{ marginTop: 16 }}
        data={attempts}
        keyExtractor={(a) => a.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#17181A', borderRadius: 12, padding: 12, marginVertical: 6 }}>
            <Text style={{ color: '#fff' }}>{new Date(item.timestamp).toLocaleString()}</Text>
            <Text style={{ color: '#B5B8C0' }}>Score: {item.score}/{item.total} • {Math.round((item.score/item.total)*100)}%</Text>
          </View>
        )}
      />
    </View>
  );
}


