import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COMPANIES = [
  { id: "1", name: "Silva Constructions" },
  { id: "2", name: "Perera Builders" },
  { id: "3", name: "Fernando & Sons" },
  { id: "4", name: "Jayawardena Builders" },
  { id: "5", name: "Ranasinghe Construction" },
];

export default function RateCompany() {
  const { id } = useLocalSearchParams();
  const company = COMPANIES.find((c) => c.id === id);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [projectType, setProjectType] = useState("");

  const PROJECT_TYPES = ["House", "Apartment", "Villa", "Commercial", "Other"];

  const getRatingLabel = () => {
    switch (rating) {
      case 1:
        return "Poor 😞";
      case 2:
        return "Fair 😐";
      case 3:
        return "Good 🙂";
      case 4:
        return "Very Good 😊";
      case 5:
        return "Excellent 🌟";
      default:
        return "Tap a star to rate";
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a star rating");
      return;
    }
    if (!comment) {
      Alert.alert("Error", "Please write a review comment");
      return;
    }

    // We'll connect to real API later
    Alert.alert("Thank You!", "Your review has been submitted successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  if (!company) {
    return (
      <View style={styles.centered}>
        <Text>Company not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write a Review</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Company Info */}
          <View style={styles.companyCard}>
            <Text style={styles.companyEmoji}>🏗️</Text>
            <View>
              <Text style={styles.companyName}>{company.name}</Text>
              <Text style={styles.companySubText}>Share your experience</Text>
            </View>
          </View>

          {/* Star Rating */}
          <View style={styles.ratingCard}>
            <Text style={styles.ratingTitle}>Your Rating</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  onPressIn={() => setHoveredRating(star)}
                  onPressOut={() => setHoveredRating(0)}
                >
                  <Text
                    style={[
                      styles.star,
                      star <= (hoveredRating || rating)
                        ? styles.starFilled
                        : styles.starEmpty,
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingLabel}>{getRatingLabel()}</Text>
          </View>

          {/* Project Type */}
          <Text style={styles.label}>Project Type</Text>
          <View style={styles.projectTypeRow}>
            {PROJECT_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  projectType === type && styles.typeButtonActive,
                ]}
                onPress={() => setProjectType(type)}
              >
                <Text
                  style={[
                    styles.typeText,
                    projectType === type && styles.typeTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Comment */}
          <Text style={styles.label}>Your Review</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Share your experience with this company — quality of work, professionalism, timeline..."
            placeholderTextColor="#999"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />

          {/* Tips */}
          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>💡 Review Tips</Text>
            <Text style={styles.tipText}>
              • Was the work completed on time?
            </Text>
            <Text style={styles.tipText}>
              • How was the quality of materials?
            </Text>
            <Text style={styles.tipText}>• Was the team professional?</Text>
            <Text style={styles.tipText}>• Would you recommend them?</Text>
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backText: { fontSize: 18, color: "#e87722", fontWeight: "600", width: 50 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  container: { padding: 20 },
  companyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
    elevation: 3,
  },
  companyEmoji: { fontSize: 40 },
  companyName: { fontSize: 17, fontWeight: "bold", color: "#333" },
  companySubText: { fontSize: 13, color: "#999", marginTop: 2 },
  ratingCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  starsRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  star: { fontSize: 48 },
  starFilled: { color: "#e87722" },
  starEmpty: { color: "#ddd" },
  ratingLabel: { fontSize: 16, color: "#666", fontWeight: "500" },
  label: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 10 },
  projectTypeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  typeButtonActive: {
    borderColor: "#e87722",
    backgroundColor: "#fff5ef",
  },
  typeText: { fontSize: 14, color: "#666", fontWeight: "600" },
  typeTextActive: { color: "#e87722" },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  textArea: { height: 130, paddingTop: 14 },
  tipsBox: {
    backgroundColor: "#fff5ef",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#fde0c8",
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e87722",
    marginBottom: 8,
  },
  tipText: { fontSize: 13, color: "#666", marginBottom: 4 },
  submitButton: {
    backgroundColor: "#e87722",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
