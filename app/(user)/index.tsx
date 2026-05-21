import { router } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Temporary fake data — we'll replace with real API data later
const DUMMY_CONSTRUCTIONS = [
  {
    id: "1",
    name: "Silva Constructions",
    location: "Colombo",
    rating: 4.8,
    reviews: 124,
    speciality: "Houses & Apartments",
  },
  {
    id: "2",
    name: "Perera Builders",
    location: "Kandy",
    rating: 4.5,
    reviews: 89,
    speciality: "Commercial Buildings",
  },
  {
    id: "3",
    name: "Fernando & Sons",
    location: "Galle",
    rating: 4.7,
    reviews: 203,
    speciality: "Luxury Villas",
  },
  {
    id: "4",
    name: "Jayawardena Builders",
    location: "Negombo",
    rating: 4.3,
    reviews: 56,
    speciality: "Houses & Apartments",
  },
  {
    id: "5",
    name: "Ranasinghe Construction",
    location: "Matara",
    rating: 4.6,
    reviews: 78,
    speciality: "Commercial Buildings",
  },
];

export default function UserHome() {
  const [search, setSearch] = useState("");

  // Filter constructions based on search
  const filtered = DUMMY_CONSTRUCTIONS.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ConstructionConnect</Text>
          <Text style={styles.headerSubtitle}>
            Find your perfect builder in Sri Lanka
          </Text>
        </View>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or city..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />

        {/* Results Count */}
        <Text style={styles.resultsText}>
          {filtered.length} companies found
        </Text>

        {/* Construction List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push(`/(user)/construction/${item.id}` as any)
              }
            >
              {/* Image Placeholder */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>🏗️</Text>
              </View>

              {/* Card Content */}
              <View style={styles.cardContent}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardLocation}>📍 {item.location}</Text>
                <Text style={styles.cardSpeciality}>{item.speciality}</Text>

                {/* Rating */}
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                  <Text style={styles.reviewText}>
                    ({item.reviews} reviews)
                  </Text>
                </View>
              </View>

              {/* Arrow */}
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e87722",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#fff5ef",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  imagePlaceholderText: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  cardLocation: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  cardSpeciality: {
    fontSize: 13,
    color: "#e87722",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  reviewText: {
    fontSize: 12,
    color: "#999",
  },
  arrow: {
    fontSize: 24,
    color: "#ccc",
    marginLeft: 8,
  },
});
