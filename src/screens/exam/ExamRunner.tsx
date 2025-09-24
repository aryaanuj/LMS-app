import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { sampleExam } from '@data/exams';
import { useNavigation } from '@react-navigation/native';
import { saveAttempt } from '@services/results';

export default function ExamRunner() {
  const navigation = useNavigation<any>();
  const [sectionIdx, setSectionIdx] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(sampleExam.durationMin * 60);
  const [answers, setAnswers] = React.useState<Record<string, any>>({});

  const finishAndSave = React.useCallback(async () => {
    const total = sampleExam.sections.reduce((acc, s) => acc + s.questions.length, 0);
    const score = Object.keys(answers).length; // demo: count answered as score
    await saveAttempt({
      id: `${Date.now()}`,
      examId: sampleExam.id,
      timestamp: Date.now(),
      score,
      total,
      sectionScores: {},
      durationSec: sampleExam.durationMin * 60 - timeLeft,
    });
    navigation.replace('ExamResults', { score, total });
  }, [answers, navigation, timeLeft]);

  React.useEffect(() => {
    const t = setInterval(() => setTimeLeft(prev => {
      if (prev <= 1) { clearInterval(t); finishAndSave(); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [finishAndSave]);

  const section = sampleExam.sections[sectionIdx];
  const mm = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const ss = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F10' }}>
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: '#17181A' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>{sampleExam.title}</Text>
        <Text style={{ color: '#FF9A3D', fontSize: 16 }}>{mm}:{ss}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ borderBottomWidth: 1, borderBottomColor: '#242529' }} contentContainerStyle={{ paddingHorizontal: 8 }}>
        {sampleExam.sections.map((s, i) => (
          <TouchableOpacity key={s.id} onPress={() => setSectionIdx(i)} style={{ paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 2, borderBottomColor: i === sectionIdx ? '#FF7A00' : 'transparent' }}>
            <Text style={{ color: i === sectionIdx ? '#FF9A3D' : '#B5B8C0' }}>{s.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: 96, borderRightWidth: 1, borderRightColor: '#242529' }}>
          <FlatList
            data={section.questions}
            keyExtractor={(q) => q.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
            renderItem={({ item, index }) => {
              const answered = answers[item.id] != null;
              return (
                <TouchableOpacity onPress={() => {}} style={{ width: 40, height: 40, borderRadius: 8, marginVertical: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: answered ? '#22C55E' : '#17181A' }}>
                  <Text style={{ color: answered ? '#0F0F10' : '#fff' }}>{index + 1}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={{ flex: 1, padding: 16 }}>
          {section.questions.map((q, idx) => (
            <View key={q.id} style={{ backgroundColor: '#17181A', borderRadius: 12, padding: 14, marginBottom: 12 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{idx + 1}. {q.text}</Text>
              {q.type === 'single' || q.type === 'multiple' ? (
                <View style={{ marginTop: 8 }}>
                  {'options' in q && q.options.map(o => (
                    <TouchableOpacity key={o.id} onPress={() => setAnswers(a => ({ ...a, [q.id]: q.type === 'single' ? o.id : [o.id] }))} style={{ paddingVertical: 10 }}>
                      <Text style={{ color: '#B5B8C0' }}>• {o.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : q.type === 'truefalse' ? (
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                  <TouchableOpacity onPress={() => setAnswers(a => ({ ...a, [q.id]: true }))} style={{ backgroundColor: '#242529', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: '#fff' }}>True</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setAnswers(a => ({ ...a, [q.id]: false }))} style={{ backgroundColor: '#242529', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: '#fff' }}>False</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={{ color: '#8A8F98', marginTop: 8 }}>Answer input UI omitted for brevity</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderTopWidth: 1, borderTopColor: '#242529' }}>
        <TouchableOpacity onPress={() => setSectionIdx(Math.max(0, sectionIdx - 1))} style={{ backgroundColor: '#17181A', padding: 14, borderRadius: 12 }}>
          <Text style={{ color: '#fff' }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSectionIdx(Math.min(sampleExam.sections.length - 1, sectionIdx + 1))} style={{ backgroundColor: '#17181A', padding: 14, borderRadius: 12 }}>
          <Text style={{ color: '#fff' }}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={finishAndSave} style={{ backgroundColor: '#FF7A00', padding: 14, borderRadius: 12 }}>
          <Text style={{ color: '#fff' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


