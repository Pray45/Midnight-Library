import { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../zustand/authStore';
import PageTransition from 'components/PageTransition';

function Field({
  label,
  placeholder,
  secureTextEntry,
  val,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  val: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View className="my-2 space-y-2">
      <Text className="mb-2 ml-3 text-xl font-medium text-black">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        value={val}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className="rounded-2xl border border-white/10 bg-[#FFE3BF] px-4 py-4 text-base text-black"
      />
    </View>
  );
}

export default function AuthRoute() {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      router.replace('/(tabs)');
    }
  }, [loggedIn]);

  const onSubmit = async () => {
    if (!password || !email) {
      alert('Please enter your email and password');
      return;
    }

    try {
      await login({ email, password });
    } catch (e) {
      // Error is already handled by the store
      console.error('Login error:', e);
    }
  };

  return (
    <PageTransition className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1 bg-background"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Image className="h-3/5 w-full" source={require('../../assets/login.png')} />

          <View className={`flex-1 justify-center px-6 ${keyboardOpen ? 'mt-20' : ''}`}>
            <Field label="Email" val={email} onChangeText={setEmail} placeholder="you@example.com" />

            <Field
              label="Password"
              val={password}
              onChangeText={setPassword}
              placeholder="Your password"
              secureTextEntry
            />

            <Pressable onPress={onSubmit} className="mt-5 rounded-2xl bg-black px-4 py-4">
              <Text className="text-center text-xl font-bold text-white">
                {loading ? 'Signing in...' : 'Sign in'}
              </Text>
            </Pressable>
            {error ? <Text className="mt-4 text-center text-base text-red-600">{error}</Text> : null}
            <View className="mt-6 flex-row justify-center">
              <Text className="text-base text-black/70">Dont have an account? </Text>
              <Pressable onPress={() => router.replace('/(auth)/register')}>
                <Text className="text-base font-bold text-orange-600">Register</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageTransition>
  );
}
