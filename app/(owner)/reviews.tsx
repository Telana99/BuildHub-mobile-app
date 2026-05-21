import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy reviews data — will come from API later
const DUMMY_REVIEWS = [
  {
    id: "1",
    userName: "Nimal Perera",
    rating: 5,
    comment:
      "Excellent work! They built our dream home exactly as we wanted. Very professional team and finished on time.",
    date: "2024-03-15",
    project: "3 Bedroom House - Colombo",
  },
  {
    id: "2",
    userName: "Sanduni Fernando",
    rating: 4,
    comment:
      "Good quality construction. Minor delays but the final result was great. Would recommend to others.",
    date: "2024-02-20",
    project: "Apartment - Nugegoda",
  },
  {
    id: "3",
    userName: "Ruwan Jayawardena",
    rating: 5,
    comment:
      "Amazing service from start to finish. The team was very helpful and transparent about costs.",
    date: "2024-01-10",
    project: "Villa - Galle",
  },
  {
    id: "4",
    userName: "Priya Wickramasinghe",
    rating: 4,
    comment:
      "Very satisfied with the work. Good attention to detail and great communication throughout.",
    date: "2023-12-05",
    project: "House - Kandy",
  },
  {
    id: "5",
    userName: "Chaminda Rathnayake",
    rating: 3,
    comment:
      "Decent work overall. Some finishing issues but they fixed them after we pointed it out.",
    date: "2023-11-18",
    project: "Commercial Building - Negombo",
  },
];

// Helper to render stars
function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text
          key={star}
          style={star <= rating ? styles.starFilled : styles.starEmpty}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

export default function Reviews() {
  // Calculate average rating
  const avgRating =
    DUMMY_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / DUMMY_REVIEWS.length;

  // Count each star rating
  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: DUMMY_REVIEWS.filter((r) => r.rating === star).length,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Rating Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryLeft}>
              <Text style={styles.avgRating}>{avgRating.toFixed(1)}</Text>
              <StarRating rating={Math.round(avgRating)} />
              <Text style={styles.totalReviews}>
                {DUMMY_REVIEWS.length} reviews
              </Text>
            </View>
            <View style={styles.summaryRight}>
              {starCounts.map(({ star, count }) => (
                <View key={star} style={styles.barRow}>
                  <Text style={styles.barLabel}>{star}★</Text>
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        { width: `${(count / DUMMY_REVIEWS.length) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.barCount}>{count}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews List */}
          <Text style={styles.sectionTitle}>All Reviews</Text>
          {DUMMY_REVIEWS.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              {/* Reviewer Info */}
              <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {review.userName.charAt(0)}
                  </Text>
                </View>
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{review.userName}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <StarRating rating={review.rating} />
              </View>

              {/* Project */}
              <Text style={styles.reviewProject}>📍 {review.project}</Text>

              {/* Comment */}
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
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
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    marginBottom: 24,
    elevation: 3,
  },
  summaryLeft: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    paddingRight: 20,
  },
  avgRating: { fontSize: 48, fontWeight: "bold", color: "#e87722" },
  totalReviews: { fontSize: 12, color: "#999", marginTop: 4 },
  summaryRight: { flex: 1, justifyContent: "center" },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  barLabel: { fontSize: 12, color: "#666", width: 20 },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  barFill: {
    height: 8,
    backgroundColor: "#e87722",
    borderRadius: 4,
  },
  barCount: { fontSize: 12, color: "#666", width: 16 },
  starsRow: { flexDirection: "row", gap: 2 },
  starFilled: { color: "#e87722", fontSize: 14 },
  starEmpty: { color: "#ddd", fontSize: 14 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  reviewCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e87722",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: { color: "white", fontWeight: "bold", fontSize: 16 },
  reviewerInfo: { flex: 1 },
  reviewerName: { fontSize: 15, fontWeight: "600", color: "#333" },
  reviewDate: { fontSize: 12, color: "#999" },
  reviewProject: { fontSize: 13, color: "#666", marginBottom: 8 },
  reviewComment: { fontSize: 14, color: "#555", lineHeight: 22 },
});
