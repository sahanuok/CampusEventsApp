import * as Notifications from "expo-notifications";
import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { EVENTS } from "../data/events";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events] = useState(EVENTS);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  useEffect(() => {
    async function setupNotifications() {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Campus Events",
          importance: Notifications.AndroidImportance.MAX,
        });
      }
      await Notifications.requestPermissionsAsync();
    }
    setupNotifications();
  }, []);

  const triggerLocalNotification = async (title, body) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
        },
        trigger: null,
      });
    } catch (error) {
      console.log("Notification error:", error);
    }
  };

  const toggleBookmark = async (event) => {
    const alreadySaved = bookmarkedIds.includes(event.id);
    if (alreadySaved) {
      setBookmarkedIds((prev) => prev.filter((id) => id !== event.id));
    } else {
      setBookmarkedIds((prev) => [...prev, event.id]);
      await triggerLocalNotification(
        "Event Bookmarked!",
        `"${event.title}" on ${event.date} has been saved to your bookmarks.`,
      );
    }
  };

  const isBookmarked = (id) => bookmarkedIds.includes(id);

  return (
    <EventsContext.Provider
      value={{
        events,
        bookmarkedIds,
        toggleBookmark,
        isBookmarked,
        triggerLocalNotification,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
