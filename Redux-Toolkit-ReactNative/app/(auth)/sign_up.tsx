import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { useRegisterUserMutation } from '@/store/services/auth';
import { ToastAndroid } from 'react-native';

const SignUp = () => {
  const [registerUserData, { isLoading }] = useRegisterUserMutation();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!userName || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');

    console.log('Input', userName, email, password);

    const response = await registerUserData({
      username: userName,
      email: email,
      password: password,
    });

    console.log('Response :', response);
    if (response.data.data) {
        ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
        router.replace("/log_in");
        setUserName("");
        setEmail("");
        setPassword("");
    } else {
      ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    > 
      {/* Login Form */}
      <View style={{ width: '100%', padding: 20 }}>
        <TextInput
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 16,
          }}
          keyboardType="default"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 16,
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 16,
          }}
          secureTextEntry
        />
        {error ? (
          <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>
        ) : null}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#007AFF",
            paddingVertical: 12,
            alignItems: 'center',
            borderRadius: 5,
          }}
        >
          {
            isLoading ?
              <ActivityIndicator size="small" color="#FFF" />
              :
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
          }
        </TouchableOpacity>
      </View>

      <View>
        <Text>
          Already have an account? {""}
          <Link
            href="/log_in"
            style={{
              color: "#007AFF",
              fontWeight: "bold",
            }}
          >
            Log In
          </Link>
        </Text>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})