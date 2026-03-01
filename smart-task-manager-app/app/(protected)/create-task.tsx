import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../../services/api";
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";

const STATUS_OPTIONS = [
  { label: "Pending",     icon: "time-outline",             color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
  { label: "In Progress", icon: "sync-outline",             color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
  { label: "Completed",   icon: "checkmark-circle-outline", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
] as const;

const PRIORITY_OPTIONS = [
  { label: "Low",    icon: "arrow-down-outline", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
  { label: "Medium", icon: "remove-outline",     color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
  { label: "High",   icon: "arrow-up-outline",   color: "#EF4444", bg: "#FEF2F2", border: "#FECACA" },
] as const;

export default function CreateTask() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Error", "Description is required");
      return;
    }
    try {
      setLoading(true);
      await API.post("/tasks", { title, description, status, priority });
      Alert.alert("Success", "Task created");
      router.replace("/(protected)");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.75}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#1e293b" />
          </TouchableOpacity>
          <View style={{ width: 36 }} />
        </View>

        {/* Title */}
        <View style={styles.pageTitleRow}>
          <View style={styles.pageTitleIcon}>
            <Ionicons name="add-circle-outline" size={18} color="#4f46e5" />
          </View>
          <Text style={styles.pageTitle}>Create Task</Text>
        </View>

        {/* Inputs Card */}
        <View style={styles.card}>
          <CustomInput
            label="Task Title"
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
          />
          <CustomInput
            label="Description"
            placeholder="Enter task details..."
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Feather name="filter" size={13} color="#4f46e5" />
            </View>
            <Text style={styles.sectionTitle}>Status</Text>
          </View>

          <View style={styles.optionRow}>
            {STATUS_OPTIONS.map((item) => {
              const selected = status === item.label;
              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.75}
                  onPress={() => setStatus(item.label)}
                  style={[
                    styles.optionItem,
                    selected
                      ? { backgroundColor: item.bg, borderColor: item.border }
                      : styles.optionItemDefault,
                  ]}
                >
                  <View style={[
                    styles.optionIconWrap,
                    { backgroundColor: selected ? item.color + "22" : "#F1F5F9" }
                  ]}>
                    <Ionicons
                      name={item.icon as any}
                      size={15}
                      color={selected ? item.color : "#94a3b8"}
                    />
                  </View>
                  <Text style={[
                    styles.optionText,
                    { color: selected ? item.color : "#64748b" },
                    selected && styles.optionTextSelected,
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Priority Card */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Feather name="flag" size={13} color="#4f46e5" />
            </View>
            <Text style={styles.sectionTitle}>Priority</Text>
          </View>

          <View style={styles.optionRow}>
            {PRIORITY_OPTIONS.map((item) => {
              const selected = priority === item.label;
              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.75}
                  onPress={() => setPriority(item.label)}
                  style={[
                    styles.optionItem,
                    selected
                      ? { backgroundColor: item.bg, borderColor: item.border }
                      : styles.optionItemDefault,
                  ]}
                >
                  <View style={[
                    styles.optionIconWrap,
                    { backgroundColor: selected ? item.color + "22" : "#F1F5F9" }
                  ]}>
                    <Ionicons
                      name={item.icon as any}
                      size={15}
                      color={selected ? item.color : "#94a3b8"}
                    />
                  </View>
                  <Text style={[
                    styles.optionText,
                    { color: selected ? item.color : "#64748b" },
                    selected && styles.optionTextSelected,
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Submit */}
        <View style={styles.buttonWrapper}>
          <CustomButton title="Create Task" loading={loading} onPress={handleCreate} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 30,
  },

  /* ── Header ── */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 4,
  },

  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#94a3b8",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  /* ── Page Title ── */
  pageTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },

  pageTitleIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.3,
  },

  /* ── Card ── */
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#94a3b8",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  /* ── Section Header ── */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },

  sectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.2,
  },

  /* ── Option Pills ── */
  optionRow: {
    flexDirection: "row",
    gap: 8,
  },

  optionItem: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
    gap: 5,
  },

  optionItemDefault: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
  },

  optionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },

  optionText: {
    fontSize: 11.5,
    fontWeight: "600",
    textAlign: "center",
  },

  optionTextSelected: {
    fontWeight: "700",
  },

  /* ── Button ── */
  buttonWrapper: {
    marginTop: 2,
  },
});