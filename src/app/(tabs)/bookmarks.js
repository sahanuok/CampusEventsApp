import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useEvents } from "../../context/EventsContext";

export default function BookmarksScreen() {
  const router = useRouter();
  const { events, bookmarkedIds, toggleBookmark } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const savedEvents = events.filter((e) => bookmarkedIds.includes(e.id));

  const confirmRemove = () => {
    if (selectedEvent) {
      toggleBookmark(selectedEvent);
      setSelectedEvent(null);
    }
  };

  if (savedEvents.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="bookmark-outline" size={56} color="#94a3b8" />
        <Text style={styles.emptyTitle}>No Bookmarked Events Yet</Text>
        <Text style={styles.emptySubtitle}>
          Open any event from the Events tab and tap "Bookmark Event" to save it
          here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable
              style={styles.cardRow}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/(home)/[id]",
                  params: { id: item.id },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={styles.info}>
                <Text style={styles.badge}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.meta}>{item.date}</Text>
                <Text style={styles.meta}>{item.venue}</Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.removeBtn}
              onPress={() => setSelectedEvent(item)}
            >
              <Ionicons name="trash-outline" size={16} color="#dc2626" />
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />

      {/* Remove Confirmation Modal */}
      <Modal
        visible={!!selectedEvent}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedEvent(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Remove Bookmark?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to remove "{selectedEvent?.title}" from your
              bookmarks?
            </Text>
            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setSelectedEvent(null)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.confirmBtn} onPress={confirmRemove}>
                <Text style={styles.confirmText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  listContent: { padding: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#f1f5f9",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 12,
    marginBottom: 6,
  },
  emptySubtitle: { fontSize: 14, color: "#64748b", textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 14,
    padding: 12,
    elevation: 2,
  },
  cardRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  thumb: { width: 80, height: 80, borderRadius: 8, backgroundColor: "#cbd5e1" },
  info: { flex: 1 },
  badge: { color: "#1d4ed8", fontSize: 11, fontWeight: "700", marginBottom: 2 },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 2,
  },
  meta: { fontSize: 12, color: "#64748b" },
  removeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  removeText: { color: "#dc2626", fontSize: 13, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalBox: { backgroundColor: "#fff", borderRadius: 14, padding: 20 },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  modalMessage: { fontSize: 14, color: "#475569", marginBottom: 18 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
  },
  cancelText: { color: "#334155", fontWeight: "600" },
  confirmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#dc2626",
  },
  confirmText: { color: "#fff", fontWeight: "600" },
});
