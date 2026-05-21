import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OwnerHome() {
  // Dummy owner data — will come from real auth later
  const owner = {
    name: "Silva Constructions",
    owner: "Kamal Silva",
    location: "Colombo",
    rating: 4.8,
    reviews: 124,
    completedProjects: 245,
    profileViews: 1520,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.ownerName}>{owner.owner}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Company Card */}
          <View style={styles.companyCard}>
            <View style={styles.companyLogo}>
              <Text style={styles.companyLogoText}>🏗️</Text>
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{owner.name}</Text>
              <Text style={styles.companyLocation}>📍 {owner.location}</Text>
              <Text style={styles.companyRating}>
                ⭐ {owner.rating} ({owner.reviews} reviews)
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{owner.completedProjects}</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{owner.reviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{owner.profileViews}</Text>
              <Text style={styles.statLabel}>Profile Views</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{owner.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/(owner)/add-project" as any)}
            >
              <Text style={styles.actionEmoji}>📸</Text>
              <Text style={styles.actionText}>Add Project</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/(owner)/edit-profile" as any)}
            >
              <Text style={styles.actionEmoji}>✏️</Text>
              <Text style={styles.actionText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/(owner)/reviews" as any)}
            >
              <Text style={styles.actionEmoji}>⭐</Text>
              <Text style={styles.actionText}>View Reviews</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/(owner)/certifications" as any)}
            >
              <Text style={styles.actionEmoji}>📜</Text>
              <Text style={styles.actionText}>Certifications</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Projects */}
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <View style={styles.emptyProjects}>
            <Text style={styles.emptyEmoji}>📂</Text>
            <Text style={styles.emptyText}>No projects yet</Text>
            <Text style={styles.emptySubText}>
              Tap "Add Project" to share your work
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/(owner)/add-project" as any)}
            >
              <Text style={styles.addButtonText}>+ Add Your First Project</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: { fontSize: 14, color: "#666" },
  ownerName: { fontSize: 22, fontWeight: "bold", color: "#333" },
  logoutButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  logoutText: { color: "#666", fontSize: 14 },
  companyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
  },
  companyLogo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#fff5ef",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  companyLogoText: { fontSize: 32 },
  companyInfo: { flex: 1 },
  companyName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  companyLocation: { fontSize: 14, color: "#666", marginTop: 2 },
  companyRating: { fontSize: 14, color: "#e87722", marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
    justifyContent: "space-between",
  },
  statBox: { alignItems: "center", flex: 1 },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#e87722" },
  statLabel: { fontSize: 11, color: "#999", marginTop: 4, textAlign: "center" },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "47%",
    elevation: 3,
  },
  actionEmoji: { fontSize: 32, marginBottom: 8 },
  actionText: { fontSize: 14, fontWeight: "600", color: "#333" },
  emptyProjects: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    elevation: 3,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#e87722",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  addButtonText: { color: "white", fontWeight: "600", fontSize: 14 },
});
