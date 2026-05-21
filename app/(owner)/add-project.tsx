import { router } from "expo-router";
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

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("house");

  const CATEGORIES = [
    { id: "house", label: "🏠 House" },
    { id: "apartment", label: "🏢 Apartment" },
    { id: "villa", label: "🏡 Villa" },
    { id: "commercial", label: "🏗️ Commercial" },
  ];

  const handleSubmit = () => {
    if (!title || !description || !location) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // We'll connect to real API later
    Alert.alert("Success", "Project added successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Project</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Image Upload Placeholder */}
          <TouchableOpacity style={styles.imagePicker}>
            <Text style={styles.imagePickerEmoji}>📷</Text>
            <Text style={styles.imagePickerText}>Tap to add photos</Text>
            <Text style={styles.imagePickerSubText}>
              Add up to 5 photos of your project
            </Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.label}>Project Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Modern 3 Bedroom House in Colombo"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  category === cat.id && styles.categoryActive,
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat.id && styles.categoryTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Colombo 07"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe this project — materials used, duration, special features..."
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Project</Text>
          </TouchableOpacity>
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
  imagePicker: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    padding: 32,
    alignItems: "center",
    marginBottom: 24,
  },
  imagePickerEmoji: { fontSize: 48, marginBottom: 8 },
  imagePickerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  imagePickerSubText: { fontSize: 13, color: "#999" },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "white",
    minWidth: 90,
    alignItems: "center",
  },
  categoryActive: {
    borderColor: "#e87722",
    backgroundColor: "#fff5ef",
  },
  categoryText: { fontSize: 13, color: "#666", fontWeight: "600" },
  categoryTextActive: { color: "#e87722" },
  submitButton: {
    backgroundColor: "#e87722",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
