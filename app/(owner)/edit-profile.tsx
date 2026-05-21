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

export default function EditProfile() {
  const [companyName, setCompanyName] = useState("Silva Constructions");
  const [ownerName, setOwnerName] = useState("Kamal Silva");
  const [location, setLocation] = useState("Colombo");
  const [phone, setPhone] = useState("+94771234567");
  const [email, setEmail] = useState("silva@construction.lk");
  const [description, setDescription] = useState(
    "Silva Constructions has been building dream homes in Sri Lanka for over 20 years.",
  );
  const [experience, setExperience] = useState("20 years");
  const [speciality, setSpeciality] = useState("Houses & Apartments");

  const handleSave = () => {
    if (!companyName || !ownerName || !phone || !email || !location) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // We'll connect to real API later
    Alert.alert("Success", "Profile updated successfully!", [
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Logo Placeholder */}
          <TouchableOpacity style={styles.logoPicker}>
            <Text style={styles.logoEmoji}>🏗️</Text>
            <Text style={styles.logoPickerText}>Tap to change logo</Text>
          </TouchableOpacity>

          {/* Company Info */}
          <Text style={styles.sectionTitle}>Company Information</Text>

          <Text style={styles.label}>Company Name *</Text>
          <TextInput
            style={styles.input}
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="Your company name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Owner Name *</Text>
          <TextInput
            style={styles.input}
            value={ownerName}
            onChangeText={setOwnerName}
            placeholder="Your full name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Colombo"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Speciality</Text>
          <TextInput
            style={styles.input}
            value={speciality}
            onChangeText={setSpeciality}
            placeholder="e.g. Houses & Apartments"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Years of Experience</Text>
          <TextInput
            style={styles.input}
            value={experience}
            onChangeText={setExperience}
            placeholder="e.g. 10 years"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>About Your Company</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your company..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Contact Info */}
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <Text style={styles.label}>Phone *</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+94771234567"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="company@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
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
  logoPicker: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  logoEmoji: { fontSize: 48, marginBottom: 8 },
  logoPickerText: { fontSize: 14, color: "#999" },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    marginTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  saveButton: {
    backgroundColor: "#e87722",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
    marginTop: 8,
  },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
