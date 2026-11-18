import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1d4ed8" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Kelani Campus Events" }} />
      <Stack.Screen name="[id]" options={{ title: "Event Details" }} />
    </Stack>
  );
}
