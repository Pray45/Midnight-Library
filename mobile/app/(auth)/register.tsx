import { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
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
      <Text className="mb-2 ml-3 text-lg font-medium text-black">{label}</Text>
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

export default function RegisterRoute() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const register = useAuthStore((state) => state.register);
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

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
    if (!name || !password || !email) {
      alert('Please enter your name, email and password');
      return;
    }

    try {
      await register({ name, email, password });
    } catch (e) {
      // Error is already handled by the store
      console.error('Register error:', e);
    }
  };
  return (
    <PageTransition className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1 bg-background"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Image
            className="h-[42%] w-full"
            source={require('../../assets/login.png')}
            resizeMode="cover"
          />

          <View className={`flex-1 px-6 ${keyboardOpen ? 'mt-10' : 'mt-2'}`}>
            <Text className="text-4xl font-bold text-black">Create New Account</Text>

            <View className="mt-8">
              <Field
                val={name}
                onChangeText={setName}
                label="First Name"
                placeholder="Enter your name"
              />
              <Field
                val={email}
                onChangeText={setEmail}
                label="Email Address"
                placeholder="Enter your email"
              />
              <Field
                val={password}
                onChangeText={setPassword}
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
              />

              <Pressable onPress={onSubmit} className="mt-6 rounded-2xl bg-black px-4 py-4">
                <Text className="text-center text-xl font-bold text-white">
                  {loading ? 'Registering...' : 'Register'}
                </Text>
              </Pressable>
              {error ? (
                <Text className="mt-4 text-center text-base text-red-600">{error}</Text>
              ) : null}

              <View className="mt-6 flex-row justify-center">
                <Text className="text-base text-black/70">Already have an account? </Text>
                <Pressable onPress={() => router.replace('/(auth)')}>
                  <Text className="text-base font-bold text-orange-600">Login</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageTransition>
  );
}
