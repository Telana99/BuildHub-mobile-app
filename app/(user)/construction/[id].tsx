import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getConstructionById } from "../../../services/constructionService";

// const DUMMY_CONSTRUCTIONS = [
//   {
//     id: "1",
//     name: "Silva Constructions",
//     location: "Colombo",
//     rating: 4.8,
//     reviews: 124,
//     speciality: "Houses & Apartments",
//     phone: "+94771234567",
//     email: "silva@construction.lk",
//     description:
//       "Silva Constructions has been building dream homes in Sri Lanka for over 20 years. We specialize in modern houses and luxury apartments with the highest quality materials.",
//     completedProjects: 245,
//     experience: "20 years",
//     certifications: ["ISO 9001", "CIDA Grade C1"],
//   },
//   {
//     id: "2",
//     name: "Perera Builders",
//     location: "Kandy",
//     rating: 4.5,
//     reviews: 89,
//     speciality: "Commercial Buildings",
//     phone: "+94779876543",
//     email: "perera@builders.lk",
//     description:
//       "Perera Builders is a leading commercial construction company based in Kandy. We have delivered over 100 commercial projects across the hill country.",
//     completedProjects: 112,
//     experience: "15 years",
//     certifications: ["ISO 9001", "CIDA Grade C2"],
//   },
//   {
//     id: "3",
//     name: "Fernando & Sons",
//     location: "Galle",
//     rating: 4.7,
//     reviews: 203,
//     speciality: "Luxury Villas",
//     phone: "+94712345678",
//     email: "fernando@sons.lk",
//     description:
//       "Fernando & Sons is renowned for building luxury villas and high-end residences in the southern coast of Sri Lanka.",
//     completedProjects: 189,
//     experience: "25 years",
//     certifications: ["ISO 9001", "ISO 14001", "CIDA Grade C1"],
//   },
//   {
//     id: "4",
//     name: "Jayawardena Builders",
//     location: "Negombo",
//     rating: 4.3,
//     reviews: 56,
//     speciality: "Houses & Apartments",
//     phone: "+94754321098",
//     email: "jaya@builders.lk",
//     description:
//       "Jayawardena Builders focuses on affordable quality housing in the western province.",
//     completedProjects: 67,
//     experience: "8 years",
//     certifications: ["CIDA Grade C3"],
//   },
//   {
//     id: "5",
//     name: "Ranasinghe Construction",
//     location: "Matara",
//     rating: 4.6,
//     reviews: 78,
//     speciality: "Commercial Buildings",
//     phone: "+94768765432",
//     email: "rana@construction.lk",
//     description:
//       "Ranasinghe Construction delivers commercial and industrial projects across the southern province.",
//     completedProjects: 93,
//     experience: "12 years",
//     certifications: ["ISO 9001", "CIDA Grade C2"],
//   },
// ];

export default function ConstructionDetail() {
  const { id } = useLocalSearchParams();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const data = await getConstructionById(id as string);
      setCompany(data);
    } catch (err: any) {
      Alert.alert("Error", err.message);
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

  if (!company) {
    return (
      <View style={styles.centered}>
        <Text>Company not found</Text>
      </View>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${company.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${company.email}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Banner */}
        <View style={styles.imageBanner}>
          <Text style={styles.bannerEmoji}>🏗️</Text>
        </View>

        <View style={styles.container}>
          {/* Name + Location */}
          <Text style={styles.name}>{company.name}</Text>
          <Text style={styles.location}>📍 {company.location}</Text>
          <Text style={styles.speciality}>{company.speciality}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>⭐ {company.rating}</Text>
            <Text style={styles.reviewText}>({company.reviews} reviews)</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{company.completedProjects}</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{company.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{company.reviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{company.description}</Text>

          {/* Certifications */}
          <Text style={styles.sectionTitle}>Certifications</Text>
          <View style={styles.certRow}>
            {company.certifications.map((cert: string, index: number) => (
              <View key={index} style={styles.certBadge}>
                <Text style={styles.certText}>{cert}</Text>
              </View>
            ))}
          </View>

          {/* Contact */}
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity
            style={[styles.contactButton, styles.rateButton]}
            onPress={() => router.push(`/(user)/rate/${company.id}` as any)}
          >
            <Text style={styles.contactButtonText}>⭐ Rate This Company</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
            <Text style={styles.contactButtonText}>
              📞 Call {company.phone}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contactButton, styles.emailButton]}
            onPress={handleEmail}
          >
            <Text style={[styles.contactButtonText, styles.emailButtonText]}>
              ✉️ Email {company.email}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  backButton: { padding: 16 },
  backText: { fontSize: 18, color: "#e87722", fontWeight: "600" },
  imageBanner: {
    height: 200,
    backgroundColor: "#fff5ef",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerEmoji: { fontSize: 80 },
  container: { padding: 20 },
  name: { fontSize: 26, fontWeight: "bold", color: "#333", marginBottom: 4 },
  location: { fontSize: 15, color: "#666", marginBottom: 4 },
  speciality: { fontSize: 14, color: "#e87722", marginBottom: 8 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  ratingText: { fontSize: 15, fontWeight: "bold", color: "#333" },
  reviewText: { fontSize: 14, color: "#999" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  statBox: { alignItems: "center", flex: 1 },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#e87722" },
  statLabel: { fontSize: 12, color: "#999", marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 24,
    marginBottom: 24,
  },
  certRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  certBadge: {
    backgroundColor: "#fff5ef",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#e87722",
  },
  certText: { color: "#e87722", fontSize: 13, fontWeight: "600" },
  contactButton: {
    backgroundColor: "#e87722",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  contactButtonText: { color: "white", fontSize: 15, fontWeight: "600" },
  emailButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#e87722",
  },
  emailButtonText: { color: "#e87722" },
  rateButton: {
    backgroundColor: "#333",
    marginBottom: 12,
  },
});
