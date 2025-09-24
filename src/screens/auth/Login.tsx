import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@context/AuthContext';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function Login({ navigation }: any) {
  const { login } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F10', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 24 }}>Welcome back</Text>
      <TextInput placeholder="Email" placeholderTextColor="#8A8F98" style={{ color: '#fff', backgroundColor: '#17181A', padding: 14, borderRadius: 12, marginBottom: 12 }} onChangeText={(t) => setValue('email', t)} keyboardType="email-address" autoCapitalize="none" />
      {errors.email && <Text style={{ color: '#EF4444', marginBottom: 8 }}>Enter a valid email</Text>}
      <TextInput placeholder="Password" placeholderTextColor="#8A8F98" style={{ color: '#fff', backgroundColor: '#17181A', padding: 14, borderRadius: 12, marginBottom: 12 }} onChangeText={(t) => setValue('password', t)} secureTextEntry />
      {errors.password && <Text style={{ color: '#EF4444', marginBottom: 8 }}>Min 6 characters</Text>}
      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={{ color: '#FF9A3D', textAlign: 'right', marginBottom: 20 }}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} style={{ backgroundColor: '#FF7A00', padding: 16, borderRadius: 14, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>{isSubmitting ? 'Signing in...' : 'Sign In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#B5B8C0', textAlign: 'center' }}>New here? <Text style={{ color: '#FF9A3D' }}>Create account</Text></Text>
      </TouchableOpacity>
    </View>
  );
}


