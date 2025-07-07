import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="shopping-crud"
        options={{
          title: "Shopping CRUD",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-shopping-modal"
        options={{
          title: "Add Shopping Item",
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}