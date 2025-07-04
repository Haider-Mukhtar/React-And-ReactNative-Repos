import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { setToken } from '@/store/slices/global';
import { Image } from 'react-native';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.global);

  const handleLogout = async () => {
    // await AsyncStorage.removeItem('token');
    dispatch(setToken(null));
    router.replace("/(auth)/log_in");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{backgroundColor: 'lightgray', padding: 10, borderRadius: 5, marginBottom: 10, alignItems: 'center', gap: 2,}}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          resizeMode="cover"
          source={{ uri: user.image }}
          alt='user_image'
        />
        <Text style={{ color: "#000", fontWeight: "bold" }}>{user.username}</Text>
        <Text style={{ color: "#000", fontWeight: "semibold" }}>{user.email}</Text>
      </View>      
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#007AFF",
          paddingVertical: 12,
          paddingHorizontal: 20,
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})