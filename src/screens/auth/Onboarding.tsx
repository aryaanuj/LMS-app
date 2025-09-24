import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Onboarding({ navigation }: any) {
  return (
    <LinearGradient colors={["#FF7A00", "#FF9A3D"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: '700', textAlign: 'center' }}>Learn. Practice. Excel.</Text>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginTop: 12, textAlign: 'center' }}>Beautiful LMS with modern UI and smooth animations.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 32, backgroundColor: '#0F0F10', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}


