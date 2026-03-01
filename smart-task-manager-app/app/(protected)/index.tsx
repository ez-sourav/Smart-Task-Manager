import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { useTasks } from "../../hooks/useTask";
import ProgressSummary from "../../components/task/ProgressSummary";
import HomeHeader from "../../components/home/HomeHeader";
import { Ionicons } from "@expo/vector-icons";
import Skeleton from "../../components/ui/Skeleton";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "#F59E0B",
  "In Progress": "#3B82F6",
  Completed: "#10B981",
};

const STATUS_BG: Record<string, string> = {
  Pending: "#FFFBEB",
  "In Progress": "#EFF6FF",
  Completed: "#ECFDF5",
};

export default function Index() {
  const [isOffline, setIsOffline] = useState(false);
  const { user } = useAuth();
  const { tasks, loading,fetchTasks  } = useTasks();
  const router = useRouter(); useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );
  useEffect(() => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    setIsOffline(!state.isConnected);
  });

  return () => unsubscribe();
}, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeHeader username={user?.name || "User"} />
        {isOffline && (
  <View style={styles.offlineBanner}>
    <Ionicons name="cloud-offline-outline" size={16} color="#b91c1c" />
    <Text style={styles.offlineText}>
      You are offline. Showing saved data.
    </Text>
  </View>
)}

        {/* Progress Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardTitleIcon}>
              <Ionicons name="stats-chart" size={15} color="#4f46e5" />
            </View>
            <Text style={styles.sectionTitle}>Progress Overview</Text>
          </View>

          <ProgressSummary
            total={totalTasks}
            pending={pendingTasks}
            inProgress={inProgressTasks}
            completed={completedTasks}
            loading={loading}
          />
        </View>

        {/* View Tasks Button */}
      
        {loading ? (
          <Skeleton height={56} borderRadius={14} style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => router.push("/(protected)/tasks")}
          >
            <View style={styles.buttonIcon}>
              <Ionicons name="list-outline" size={18} color="#4f46e5" />
            </View>
            <Text style={styles.buttonText}>View All Tasks</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color="#fff"
              style={styles.buttonArrow}
            />
          </TouchableOpacity>
        )}

        {/* Recent Tasks */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Tasks</Text>
            {!loading && tasks.length > 0 && (
              <TouchableOpacity
                onPress={() => router.push("/(protected)/tasks")}
              >
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            <>
              <Skeleton
                height={70}
                borderRadius={14}
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                height={70}
                borderRadius={14}
                style={{ marginBottom: 10 }}
              />
              <Skeleton
                height={70}
                borderRadius={14}
                style={{ marginBottom: 10 }}
              />
            </>
          ) : tasks.length === 0 ? (
            <View style={styles.emptyCard}>
             <Ionicons name="clipboard-outline" size={48} color="#4f46e5" />
              <Text style={styles.emptyTitle}>No tasks yet</Text>
              <Text style={styles.emptySubtext}>
                Start by creating your first task
              </Text>
            </View>
          ) : (
            <ScrollView
              style={tasks.length > 4 ? styles.recentScrollLimit : undefined}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
            >
              {[...tasks]
                .reverse()
                .slice(0, 4)
                .map((task) => (
                  <TouchableOpacity
                    key={task._id}
                    activeOpacity={0.8}
                    style={styles.recentCard}
                    onPress={() => router.push("/(protected)/tasks")}
                  >
                    {/* Left accent */}
                    <View
                      style={[
                        styles.recentAccent,
                        {
                          backgroundColor:
                            STATUS_COLORS[task.status] ?? "#CBD5E1",
                        },
                      ]}
                    />

                    <View style={{ flex: 1 }}>
                      <Text style={styles.recentTaskTitle} numberOfLines={1}>
                        {task.title}
                      </Text>
                      <View style={styles.statusRow}>
                        <View
                          style={[
                            styles.statusDot,
                            {
                              backgroundColor:
                                STATUS_COLORS[task.status] ?? "#CBD5E1",
                            },
                          ]}
                        />
                        <Text
                          style={[
                            styles.recentTaskStatus,
                            { color: STATUS_COLORS[task.status] ?? "#94a3b8" },
                          ]}
                        >
                          {task.status}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.chevronWrap,
                        {
                          backgroundColor: STATUS_BG[task.status] ?? "#F8FAFC",
                        },
                      ]}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={14}
                        color={STATUS_COLORS[task.status] ?? "#94a3b8"}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
  activeOpacity={0.8}
  style={[
    styles.fab,
    isOffline && { backgroundColor: "#94a3b8" }
  ]}
  disabled={isOffline}
  onPress={() => {
    if (isOffline) {
      alert("You are offline. Cannot create task.");
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  /* ── Progress Card ── */
  card: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 18,
    shadowColor: "#94a3b8",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  cardTitleIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.3,
  },

  emptyIcon: {
  marginBottom: 12,
  alignSelf: "center",
},
  /* ── View All Button ── */
  button: {
    marginTop: 20,
    backgroundColor: "#4f46e5",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "#4f46e5",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  buttonIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    flex: 1,
    letterSpacing: -0.2,
  },
  buttonArrow: {
    opacity: 0.8,
  },


  offlineBanner: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  backgroundColor: "#fee2e2",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 12,
  marginTop: 12,
},
offlineText: {
  color: "#b91c1c",
  fontSize: 13,
  fontWeight: "600",
},
  /* ── Recent Tasks ── */
  recentSection: {
    marginTop: 28,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  recentTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 13,
    color: "#4f46e5",
    fontWeight: "600",
  },
  recentScrollLimit: {
    maxHeight: 260,
  },

  recentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginBottom: 10,
    overflow: "hidden",
    shadowColor: "#94a3b8",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    paddingRight: 14,
    paddingVertical: 14,
  },
  recentAccent: {
    width: 4,
    alignSelf: "stretch",
    borderRadius: 4,
    marginRight: 14,
    marginLeft: 0,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  recentTaskTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    letterSpacing: -0.1,
  },
  recentTaskStatus: {
    fontSize: 12,
    fontWeight: "600",
  },
  chevronWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  /* ── Empty State ── */
  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    shadowColor: "#94a3b8",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
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
  skeletonRecentCard: {
    height: 70,
    backgroundColor: "#e2e8f0",
    borderRadius: 14,
    marginBottom: 10,
  },
});
