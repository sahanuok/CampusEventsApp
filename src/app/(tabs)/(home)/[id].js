import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useEvents } from "../../../context/EventsContext";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { events, isBookmarked, toggleBookmark, triggerLocalNotification } =
    useEvents();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Event not found.</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const saved = isBookmarked(event.id);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.bannerImage} />

      <View style={styles.content}>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLine}>Date: {event.date}</Text>
          <Text style={styles.infoLine}>Time: {event.time}</Text>
          <Text style={styles.infoLine}>Venue: {event.venue}</Text>
          <Text style={styles.infoLine}>Organizer: {event.organizer}</Text>
        </View>

        <Text style={styles.sectionTitle}>About This Event</Text>
        <Text style={styles.description}>{event.description}</Text>

        <Pressable
          style={[styles.primaryButton, saved && styles.savedButton]}
          onPress={() => toggleBookmark(event)}
        >
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={20}
            color="#fff"
          />
          <Text style={styles.primaryButtonText}>
            {saved ? "Remove Bookmark" : "Bookmark Event"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.reminderButton}
          onPress={() =>
            triggerLocalNotification(
              "Event Reminder Set!",
              `Reminder active for "${event.title}" at ${event.venue}.`,
            )
          }
        >
          <Ionicons name="notifications-outline" size={20} color="#1d4ed8" />
          <Text style={styles.reminderButtonText}>
            Send Reminder Notification
          </Text>
        </Pressable>

        <Pressable style={styles.backLink} onPress={() => router.back()}>
          <Text style={styles.backLinkText}>← Back to Events</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFound: { fontSize: 16, marginBottom: 12, color: "#334155" },
  backBtn: { backgroundColor: "#1d4ed8", padding: 12, borderRadius: 8 },
  backBtnText: { color: "#fff", fontWeight: "bold" },
  bannerImage: { width: "100%", height: 220, backgroundColor: "#cbd5e1" },
  content: { padding: 20 },
  category: {
    alignSelf: "flex-start",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: "700",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 14,
  },
  infoBox: {
    backgroundColor: "#f8fafc",
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  infoLine: { fontSize: 14, color: "#334155", marginBottom: 6 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475569",
    marginBottom: 24,
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#1d4ed8",
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  savedButton: { backgroundColor: "#dc2626" },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  reminderButton: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#1d4ed8",
    paddingVertical: 13,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  reminderButtonText: { color: "#1d4ed8", fontSize: 15, fontWeight: "600" },
  backLink: { alignItems: "center", paddingVertical: 10 },
  backLinkText: { color: "#64748b", fontSize: 15, fontWeight: "600" },
});
