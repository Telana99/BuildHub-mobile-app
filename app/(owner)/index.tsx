import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getMyConstruction } from "../../services/constructionService";
import { clearAuthData } from "../../services/storage";

export default function OwnerHome() {
  const [construction, setConstruction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchMyProfile();
    }, []),
  );

  const fetchMyProfile = async () => {
    try {
      setLoading(true);
      const data = await getMyConstruction();
      setConstruction(data);
    } catch (err: any) {
      // No profile found → go to setup
      if (err.message === "No profile found") {
        router.replace("/(owner)/setup-profile" as any);
      } else {
        Alert.alert("Error", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e87722" />
      </View>
    );
  }

  if (!construction) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.ownerName}>{construction.ownerName}</Text>
            </View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                await clearAuthData();
                router.replace("/(auth)/login");
              }}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Company Card */}
          <View style={styles.companyCard}>
            <View style={styles.companyLogo}>
              <Text style={styles.companyLogoText}>🏗️</Text>
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{construction.companyName}</Text>
              <Text style={styles.companyLocation}>
                📍 {construction.location}
              </Text>
              <Text style={styles.companyRating}>
                ⭐ {construction.averageRating} ({construction.totalReviews}{" "}
                reviews)
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {construction.projects.length}
              </Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{construction.totalReviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {construction.averageRating}
              </Text>
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
              onPress={() =>
                router.push({
                  pathname: "/(owner)/edit-profile" as any,
                  params: { id: construction._id },
                })
              }
            >
              <Text style={styles.actionEmoji}>✏️</Text>
              <Text style={styles.actionText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                router.push({
                  pathname: "/(owner)/reviews" as any,
                  params: { id: construction._id },
                })
              }
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
          {construction.projects.length === 0 ? (
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
                <Text style={styles.addButtonText}>
                  + Add Your First Project
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            construction.projects.map((project: any, index: number) => (
              <View key={index} style={styles.projectCard}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectLocation}>
                  📍 {project.location}
                </Text>
                <Text style={styles.projectCategory}>{project.category}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
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
  projectCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  projectTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  projectLocation: { fontSize: 13, color: "#666", marginTop: 4 },
  projectCategory: { fontSize: 13, color: "#e87722", marginTop: 4 },
});
