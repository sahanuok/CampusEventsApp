import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    AppState,
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useEvents } from "../../../context/EventsContext";

const CATEGORIES = ["All", "Tech", "Cultural", "Sports", "Academic"];

export default function EventsScreen() {
  const router = useRouter();
  const { events, isBookmarked } = useEvents();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // AppState tracking (Background -> Foreground)
  const appState = useRef(AppState.currentState);
  const [appStatusMessage, setAppStatusMessage] = useState(
    "App State: Active (Live Feed)",
  );
  const [returnCount, setReturnCount] = useState(0);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        const now = new Date().toLocaleTimeString();
        setReturnCount((c) => c + 1);
        setAppStatusMessage(`Welcome back! Refreshed at ${now}`);
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((item) => item.category === selectedCategory);

  const renderEventCard = ({ item }) => {
    const saved = isBookmarked(item.id);
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/(home)/[id]",
            params: { id: item.id },
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <View style={styles.rowBetween}>
            <Text style={styles.badge}>{item.category}</Text>
            {saved && <Ionicons name="bookmark" size={20} color="#1d4ed8" />}
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.metaText}>
            {item.date} • {item.time}
          </Text>
          <Text style={styles.venueText}>{item.venue}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* AppState Status Banner */}
      <View style={styles.statusBanner}>
        <Ionicons name="pulse-outline" size={16} color="#1e40af" />
        <Text style={styles.statusText}>
          {appStatusMessage}{" "}
          {returnCount > 0 ? `(Resumed ${returnCount}x)` : ""}
        </Text>
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <Text style={styles.showingText}>
          Showing:{" "}
          <Text style={{ fontWeight: "bold" }}>{selectedCategory}</Text> (
          {filteredEvents.length})
        </Text>
        <Pressable
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter" size={16} color="#fff" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </Pressable>
      </View>

      {/* Events FlatList */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContent}
      />

      {/* Category Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Category</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryOption,
                  selectedCategory === category && styles.categorySelected,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setFilterModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.categoryOptionText,
                    selectedCategory === category &&
                      styles.categorySelectedText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.closeButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
  },
  statusText: { color: "#1e3a8a", fontSize: 12, fontWeight: "600", flex: 1 },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  showingText: { fontSize: 14, color: "#334155" },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  filterButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  listContent: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  cardImage: { width: "100%", height: 150, backgroundColor: "#cbd5e1" },
  cardBody: { padding: 14 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  badge: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  metaText: { fontSize: 13, color: "#475569", marginBottom: 2 },
  venueText: { fontSize: 13, color: "#64748b" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 14,
    textAlign: "center",
  },
  categoryOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f8fafc",
  },
  categorySelected: { backgroundColor: "#1d4ed8" },
  categoryOptionText: { fontSize: 15, color: "#1e293b", textAlign: "center" },
  categorySelectedText: { color: "#fff", fontWeight: "bold" },
  closeButton: {
    marginTop: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  closeButtonText: { color: "#64748b", fontWeight: "600", fontSize: 15 },
});
