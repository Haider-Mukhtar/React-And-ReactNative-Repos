import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{
          title: "Welcome",
        }}
      />
      <Stack.Screen
        name="log_in"
        options={{
          title: "Log In",
        }}
      />
      <Stack.Screen
        name="sign_up"
        options={{
          title: "Sign Up",
        }}
      />
    </Stack>
  );
}