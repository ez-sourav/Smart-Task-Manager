import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../../services/api";
import CustomInput from "../../components/ui/CustomInput";
import CustomButton from "../../components/ui/CustomButton";
import Skeleton from "../../components/ui/Skeleton";

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

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
const [pageLoading, setPageLoading] = useState(true); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
  try {
    setPageLoading(true);
    const res = await API.get(`/tasks/${id}`);
    const task = res.data.data;

    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    }
  } catch (error) {
    Alert.alert("Error", "Failed to load task");
  } finally {
    setPageLoading(false);
  }
};

  const handleUpdate = async () => {
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
      await API.put(`/tasks/${id}`, { title, description, status, priority });
      Alert.alert("Success", "Task updated");
      router.replace("/(protected)");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
  <SafeAreaView style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {pageLoading ? (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Skeleton width={36} height={36} borderRadius={10} />
            <View style={{ width: 36 }} />
          </View>

          {/* Title */}
          <View style={{ marginBottom: 20 }}>
            <Skeleton width={160} height={28} />
          </View>

          {/* Inputs */}
          <View style={styles.card}>
            <Skeleton
              height={50}
              borderRadius={10}
              style={{ marginBottom: 14 }}
            />
            <Skeleton height={80} borderRadius={10} />
          </View>

          {/* Status */}
          <View style={styles.card}>
            <Skeleton
              width={100}
              height={18}
              style={{ marginBottom: 14 }}
            />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Skeleton height={60} style={{ flex: 1 }} />
              <Skeleton height={60} style={{ flex: 1 }} />
              <Skeleton height={60} style={{ flex: 1 }} />
            </View>
          </View>

          {/* Priority */}
          <View style={styles.card}>
            <Skeleton
              width={100}
              height={18}
              style={{ marginBottom: 14 }}
            />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Skeleton height={60} style={{ flex: 1 }} />
              <Skeleton height={60} style={{ flex: 1 }} />
              <Skeleton height={60} style={{ flex: 1 }} />
            </View>
          </View>

          {/* Button */}
          <Skeleton height={55} borderRadius={14} />
        </>
      ) : (
        <>
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

          {/* Page Title */}
          <View style={styles.pageTitleRow}>
            <View style={styles.pageTitleIcon}>
              <Ionicons
                name="create-outline"
                size={18}
                color="#4f46e5"
              />
            </View>
            <Text style={styles.pageTitle}>Edit Task</Text>
          </View>

          {/* Inputs */}
          <View style={styles.card}>
            <CustomInput
              label="Task Title"
              value={title}
              onChangeText={setTitle}
            />
            <CustomInput
              label="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          {/* Status */}
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
                        ? {
                            backgroundColor: item.bg,
                            borderColor: item.border,
                          }
                        : styles.optionItemDefault,
                    ]}
                  >
                    <View
                      style={[
                        styles.optionIconWrap,
                        {
                          backgroundColor: selected
                            ? item.color + "22"
                            : "#F1F5F9",
                        },
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={15}
                        color={selected ? item.color : "#94a3b8"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: selected
                            ? item.color
                            : "#64748b",
                        },
                        selected && styles.optionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Priority */}
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
                        ? {
                            backgroundColor: item.bg,
                            borderColor: item.border,
                          }
                        : styles.optionItemDefault,
                    ]}
                  >
                    <View
                      style={[
                        styles.optionIconWrap,
                        {
                          backgroundColor: selected
                            ? item.color + "22"
                            : "#F1F5F9",
                        },
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={15}
                        color={selected ? item.color : "#94a3b8"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: selected
                            ? item.color
                            : "#64748b",
                        },
                        selected && styles.optionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Button */}
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Update Task"
              loading={loading}
              onPress={handleUpdate}
            />
          </View>
        </>
      )}
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  /* ── Header ── */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 6,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#94a3b8",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  /* ── Page Title ── */
  pageTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  pageTitleIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.4,
  },

  /* ── Card ── */
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#94a3b8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  /* ── Section Header ── */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  sectionIcon: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 15,
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
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
    gap: 6,
  },
  optionItemDefault: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
  },
  optionIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  optionTextSelected: {
    fontWeight: "700",
  },

  /* ── Button ── */
  buttonWrapper: {
    marginTop: 6,
  },
});