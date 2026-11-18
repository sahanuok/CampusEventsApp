import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEvents } from "../../context/EventsContext";

export default function TabsLayout() {
  const { bookmarkedIds } = useEvents();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1d4ed8",
        tabBarInactiveTintColor: "#64748b",
        headerStyle: { backgroundColor: "#1d4ed8" },
        headerTintColor: "#ffffff",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Events",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarBadge:
            bookmarkedIds.length > 0 ? bookmarkedIds.length : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
