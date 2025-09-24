import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof schema>;

export default function Forgot({ navigation }: any) {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  React.useEffect(() => { register('email'); }, [register]);

  const onSubmit = async (_: FormData) => {
    await new Promise(r => setTimeout(r, 700));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F0F10', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 24 }}>Reset password</Text>
      <TextInput placeholder="Email" placeholderTextColor="#8A8F98" style={{ color: '#fff', backgroundColor: '#17181A', padding: 14, borderRadius: 12, marginBottom: 12 }} onChangeText={(t) => setValue('email', t)} keyboardType="email-address" autoCapitalize="none" />
      {errors.email && <Text style={{ color: '#EF4444', marginBottom: 8 }}>Enter a valid email</Text>}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} style={{ backgroundColor: '#FF7A00', padding: 16, borderRadius: 14, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>{isSubmitting ? 'Sending...' : 'Send Reset Link'}</Text>
      </TouchableOpacity>
    </View>
  );
}


