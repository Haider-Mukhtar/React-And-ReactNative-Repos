import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router';
import { useLoginUserMutation } from '@/store/services/auth';
import { ActivityIndicator } from 'react-native';

const SignIn = () => {
  const [loginUserData, { isLoading }] = useLoginUserMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    
    const response = await loginUserData({
      email,
      password,
    });

    // console.log('Response :', response.data.access);
    if (response.data.data) {
      ToastAndroid.show(`Successfully Logged In`, ToastAndroid.SHORT);
      router.replace("/");
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
      <View style={{width: '100%', padding: 20}}>
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
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Log In</Text>
          }
        </TouchableOpacity>
      </View>
      
      <View>
        <Text>
          Don't have an account? {""}
          <Link
            href="/sign_up"
            style={{
              color: "#007AFF",
              fontWeight: "bold",
            }}
          >
            Sigin Up
          </Link>
        </Text>
      </View>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})