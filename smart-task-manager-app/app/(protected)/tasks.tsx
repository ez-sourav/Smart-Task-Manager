import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTasks } from "../../hooks/useTask";
import API from "../../services/api";
import TaskCard from "../../components/task/TaskCard";
import SearchBar from "../../components/home/SearchBar";
import FilterSection from "../../components/home/FilterSection";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Skeleton from "../../components/ui/Skeleton";
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { ScrollView } from "react-native";

export default function Tasks() {
  const [isOffline, setIsOffline] = useState(false);
  const { tasks, loading, fetchTasks } = useTasks();
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const statusOptions = ["All", "Pending", "In Progress", "Completed"];
  const priorityOptions = ["All", "Low", "Medium", "High"];

  const getStatusIcon = (status: string) => {
    if (status === "Pending") return "time-outline";
    if (status === "In Progress") return "sync-outline";
    if (status === "Completed") return "checkmark-circle-outline";
    return "apps-outline";
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "Low") return "arrow-down-outline";
    if (priority === "Medium") return "remove-outline";
    if (priority === "High") return "arrow-up-outline";
    return "apps-outline";
  };

  const handleDelete = (id: string) => {
    if (isOffline) {
      Alert.alert("Offline", "You cannot delete tasks while offline.");
      return;
    }

    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await API.delete(`/tasks/${id}`);
            fetchTasks();
          } catch (error: any) {
            Alert.alert(
              "Error",
              error.response?.data?.message || "Failed to delete",
            );
          }
        },
      },
    ]);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const isFiltering =
    search.length > 0 || statusFilter !== "All" || priorityFilter !== "All";

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        {loading ? (
          <>
            <Skeleton width={36} height={36} borderRadius={10} />
            <Skeleton width={120} height={24} />
            <View style={{ width: 36 }} />
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back-outline" size={20} color="#1e293b" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <Text style={styles.pageTitle}>All Tasks</Text>
            </View>

            <View style={{ width: 36 }} />
          </>
        )}
      </View>

      {isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline-outline" size={16} color="#b91c1c" />
          <Text style={styles.offlineText}>
            You are offline. Showing saved data.
          </Text>
        </View>
      )}
      {/* Top Section */}
      <View style={styles.topSection}>
        {loading ? (
          <>
            <Skeleton
              height={40}
              borderRadius={10}
              style={{ marginBottom: 12 }}
            />
            <Skeleton
              height={60}
              borderRadius={12}
              style={{ marginBottom: 12 }}
            />
            <Skeleton height={60} borderRadius={12} />
          </>
        ) : (
          <>
            <SearchBar value={search} onChange={setSearch} />

            <FilterSection
              title="Status"
              icon="filter"
              options={statusOptions}
              selected={statusFilter}
              onSelect={setStatusFilter}
              getIcon={getStatusIcon}
            />

            <FilterSection
              title="Priority"
              icon="flag"
              options={priorityOptions}
              selected={priorityFilter}
              onSelect={setPriorityFilter}
              getIcon={getPriorityIcon}
            />
          </>
        )}
      </View>

      {/* Subtle divider */}
      <View style={styles.divider} />
      {/* Result Count */}
      {loading ? (
        <Skeleton width={140} height={16} style={{ marginBottom: 8 }} />
      ) : (
        <Text style={styles.resultText}>
          {isFiltering
            ? `${filteredTasks.length} ${
                filteredTasks.length === 1 ? "task" : "tasks"
              } found`
            : `${tasks.length} ${
                tasks.length === 1 ? "total task" : "total tasks"
              }`}
        </Text>
      )}
      {/* Task List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {filteredTasks.map((item) => (
          <TaskCard
            key={item._id}
            task={item}
            onDelete={handleDelete}
            isOffline={isOffline}
          />
        ))}

        {filteredTasks.length === 0 && (
          <EmptyState
            message={tasks.length === 0 ? "No tasks yet" : "No tasks found"}
            subMessage={
              tasks.length === 0
                ? "Start by creating your first task."
                : isFiltering
                  ? "Try changing filters."
                  : ""
            }
          />
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, isOffline && { backgroundColor: "#94a3b8" }]}
        disabled={isOffline}
        onPress={() => {
          if (isOffline) {
            Alert.alert("Offline", "You cannot create tasks while offline.");
            return;
          }
          router.push("/(protected)/create-task");
        }}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
  },

  /* ── Header ── */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 14,
    paddingVertical: 4,
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
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.4,
  },
  countBadge: {
    backgroundColor: "#4f46e5",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
  },
  countText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },

  /* ── Filters ── */
  topSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
    shadowColor: "#94a3b8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 10,
  },

  /* ── List ── */
  list: {
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 130,
  },
  resultText: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 6,
  },
  /* ── FAB ── */
  fab: {
    position: "absolute",
    bottom: 32,
    right: 20,
    backgroundColor: "#4f46e5",
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  offlineBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fee2e2",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  offlineText: {
    color: "#b91c1c",
    fontSize: 13,
    fontWeight: "600",
  },
});
