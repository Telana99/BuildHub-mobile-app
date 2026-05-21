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

const DUMMY_CERTIFICATIONS = [
  {
    id: "1",
    name: "ISO 9001",
    issuer: "International Organization for Standardization",
    year: "2020",
    expiry: "2025",
  },
  {
    id: "2",
    name: "CIDA Grade C1",
    issuer: "Construction Industry Development Authority",
    year: "2018",
    expiry: "2026",
  },
  {
    id: "3",
    name: "ISO 14001",
    issuer: "International Organization for Standardization",
    year: "2021",
    expiry: "2026",
  },
];

export default function Certifications() {
  const [certifications, setCertifications] = useState(DUMMY_CERTIFICATIONS);
  const [showForm, setShowForm] = useState(false);
  const [certName, setCertName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [year, setYear] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleAdd = () => {
    if (!certName || !issuer || !year) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const newCert = {
      id: Date.now().toString(),
      name: certName,
      issuer,
      year,
      expiry,
    };

    setCertifications([...certifications, newCert]);
    setCertName("");
    setIssuer("");
    setYear("");
    setExpiry("");
    setShowForm(false);
    Alert.alert("Success", "Certification added!");
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Certification",
      "Are you sure you want to remove this certification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setCertifications(certifications.filter((c) => c.id !== id)),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certifications</Text>
        <TouchableOpacity onPress={() => setShowForm(!showForm)}>
          <Text style={styles.addText}>{showForm ? "Cancel" : "+ Add"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Add Form */}
          {showForm && (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Add New Certification</Text>

              <Text style={styles.label}>Certification Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. ISO 9001"
                placeholderTextColor="#999"
                value={certName}
                onChangeText={setCertName}
              />

              <Text style={styles.label}>Issuing Organization *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. CIDA"
                placeholderTextColor="#999"
                value={issuer}
                onChangeText={setIssuer}
              />

              <Text style={styles.label}>Year Obtained *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2022"
                placeholderTextColor="#999"
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Expiry Year</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2027"
                placeholderTextColor="#999"
                value={expiry}
                onChangeText={setExpiry}
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
                <Text style={styles.submitButtonText}>Add Certification</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Certifications List */}
          <Text style={styles.sectionTitle}>
            Your Certifications ({certifications.length})
          </Text>

          {certifications.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>📜</Text>
              <Text style={styles.emptyText}>No certifications yet</Text>
              <Text style={styles.emptySubText}>
                Tap "+ Add" to add your first certification
              </Text>
            </View>
          )}

          {certifications.map((cert) => (
            <View key={cert.id} style={styles.certCard}>
              <View style={styles.certLeft}>
                <View style={styles.certBadge}>
                  <Text style={styles.certBadgeText}>📜</Text>
                </View>
              </View>
              <View style={styles.certInfo}>
                <Text style={styles.certName}>{cert.name}</Text>
                <Text style={styles.certIssuer}>{cert.issuer}</Text>
                <View style={styles.certDates}>
                  <Text style={styles.certDate}>Obtained: {cert.year}</Text>
                  {cert.expiry ? (
                    <Text style={styles.certDate}>
                      {" "}
                      · Expires: {cert.expiry}
                    </Text>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(cert.id)}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
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
  addText: {
    fontSize: 16,
    color: "#e87722",
    fontWeight: "600",
    width: 60,
    textAlign: "right",
  },
  container: { padding: 20 },
  formCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 6 },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 14,
  },
  submitButton: {
    backgroundColor: "#e87722",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  submitButtonText: { color: "white", fontSize: 15, fontWeight: "bold" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  emptyBox: {
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
  emptySubText: { fontSize: 14, color: "#999", textAlign: "center" },
  certCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  certLeft: { marginRight: 12 },
  certBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff5ef",
    alignItems: "center",
    justifyContent: "center",
  },
  certBadgeText: { fontSize: 24 },
  certInfo: { flex: 1 },
  certName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  certIssuer: { fontSize: 13, color: "#666", marginTop: 2 },
  certDates: { flexDirection: "row", marginTop: 4 },
  certDate: { fontSize: 12, color: "#999" },
  deleteButton: { padding: 8 },
  deleteText: { fontSize: 20 },
});
