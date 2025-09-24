import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useAuth } from '@context/AuthContext';
import { getAttempts } from '@services/results';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme } from 'victory-native';

export default function Profile() {
  const { user, logout, signup } = useAuth();
  const [name, setName] = React.useState(user?.name ?? '');
  const [attempts, setAttempts] = React.useState<any[]>([]);

  React.useEffect(() => { (async () => setAttempts(await getAttempts()))(); }, []);

  const totalAttempts = attempts.length;
  const avgScore = attempts.length ? Math.round(attempts.reduce((a, b) => a + b.score / b.total, 0) / attempts.length * 100) : 0;

  const correct = attempts.reduce((a, b) => a + b.score, 0);
  const incorrect = attempts.reduce((a, b) => a + (b.total - b.score), 0);

  const handleSave = async () => {
    // mock editable settings: reusing signup to update local user
    await signup(name || user?.name || 'Learner', user?.email || '', '');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0F0F10' }} contentContainerStyle={{ padding: 24 }}>
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 16 }}>Profile</Text>
      <View style={{ backgroundColor: '#17181A', borderRadius: 14, padding: 16 }}>
        <Text style={{ color: '#B5B8C0' }}>Name</Text>
        <TextInput value={name} onChangeText={setName} placeholderTextColor="#8A8F98" style={{ color: '#fff', backgroundColor: '#1F2023', padding: 12, borderRadius: 10, marginTop: 8 }} />
        <Text style={{ color: '#B5B8C0', marginTop: 12 }}>Email</Text>
        <Text style={{ color: '#fff', marginTop: 6 }}>{user?.email}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#FF7A00', padding: 12, borderRadius: 10 }}>
            <Text style={{ color: '#fff' }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={{ backgroundColor: '#242529', padding: 12, borderRadius: 10 }}>
            <Text style={{ color: '#FF9A3D' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 12 }}>Learning analytics</Text>
      <View style={{ backgroundColor: '#17181A', borderRadius: 14, padding: 16 }}>
        <Text style={{ color: '#B5B8C0' }}>Exam performance</Text>
        <View style={{ alignItems: 'center' }}>
          <VictoryPie data={[{ x: 'Correct', y: correct }, { x: 'Incorrect', y: incorrect }]} colorScale={["#22C55E", "#EF4444"]} innerRadius={60} height={220} style={{ labels: { fill: '#fff' } }} />
        </View>
        <Text style={{ color: '#B5B8C0', marginTop: -16, textAlign: 'center' }}>Attempts: {totalAttempts} • Avg: {avgScore}%</Text>
      </View>

      <View style={{ backgroundColor: '#17181A', borderRadius: 14, padding: 16, marginTop: 16 }}>
        <Text style={{ color: '#B5B8C0' }}>Recent scores</Text>
        <VictoryChart theme={VictoryTheme.material} domainPadding={12}>
          <VictoryBar data={attempts.slice(0, 6).reverse().map((a, i, arr) => ({ x: `#${arr.length - i}`, y: Math.round((a.score/a.total)*100) }))} style={{ data: { fill: '#FF7A00' } }} />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}


