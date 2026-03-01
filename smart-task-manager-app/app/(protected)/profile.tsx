import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import Skeleton from "../../components/ui/Skeleton";
import { useTaskContext } from "../../context/TaskContext";

const STATS = [
  { key: "total",      label: "Total Tasks",  icon: "list-outline",             color: "#4f46e5", bg: "#EEF2FF" },
  { key: "completed",  label: "Completed",    icon: "checkmark-circle-outline",  color: "#10B981", bg: "#ECFDF5" },
  { key: "pending",    label: "Pending",      icon: "time-outline",              color: "#F59E0B", bg: "#FFFBEB" },
  { key: "inProgress", label: "In Progress",  icon: "sync-outline",              color: "#3B82F6", bg: "#EFF6FF" },
] as const;

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { tasks, loading } = useTaskContext();
  const total      = tasks.length;
  const completed  = tasks.filter(t => t.status === "Completed").length;
  const pending    = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;

  const statValues = { total, completed, pending, inProgress };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  return (
  <SafeAreaView style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {loading ? (
        <>
          {/* Header Skeleton */}
          <View style={styles.header}>
            <Skeleton width={36} height={36} borderRadius={10} />
            <Skeleton width={90} height={20} />
            <View style={{ width: 36 }} />
          </View>

          {/* Avatar Card Skeleton */}
          <View style={styles.avatarCard}>
            <Skeleton width={90} height={90} borderRadius={45} />
            <Skeleton
              width={140}
              height={20}
              style={{ marginTop: 16 }}
            />
            <Skeleton
              width={180}
              height={14}
              style={{ marginTop: 8 }}
            />
            <Skeleton
              width={110}
              height={24}
              borderRadius={20}
              style={{ marginTop: 14 }}
            />
          </View>

          {/* Stats Section Skeleton */}
          <View style={styles.section}>
            <Skeleton
              width={120}
              height={18}
              style={{ marginBottom: 16 }}
            />

            <View style={styles.statsGrid}>
              {[1, 2, 3, 4].map((item) => (
                <Skeleton
                  key={item}
                  height={110}
                  borderRadius={14}
                  style={{ flex: 1, minWidth: "44%" }}
                />
              ))}
            </View>
          </View>

          {/* Logout Skeleton */}
          <Skeleton height={50} borderRadius={14} />
        </>
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.75}
              onPress={() => router.push("/(protected)")}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color="#1e293b"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={{ width: 36 }} />
          </View>

          {/* Avatar Card */}
          <View style={styles.avatarCard}>
            <View style={styles.avatarCircle}>
              <Ionicons
                name="person"
                size={48}
                color="#4f46e5"
              />
            </View>
            <Text style={styles.name}>
              {user?.name || "User"}
            </Text>
            <Text style={styles.email}>
              {user?.email}
            </Text>

            <View style={styles.memberBadge}>
              <Ionicons
                name="shield-checkmark-outline"
                size={12}
                color="#4f46e5"
              />
              <Text style={styles.memberText}>
                Active Member
              </Text>
            </View>
          </View>

          {/* Task Overview */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleIcon}>
                <Ionicons
                  name="stats-chart"
                  size={14}
                  color="#4f46e5"
                />
              </View>
              <Text style={styles.sectionTitle}>
                Task Overview
              </Text>
            </View>

            <View style={styles.statsGrid}>
              {STATS.map((stat) => (
                <View
                  key={stat.key}
                  style={[
                    styles.statCard,
                    { borderTopColor: stat.color },
                  ]}
                >
                  <View
                    style={[
                      styles.statIconWrap,
                      { backgroundColor: stat.bg },
                    ]}
                  >
                    <Ionicons
                      name={stat.icon as any}
                      size={18}
                      color={stat.color}
                    />
                  </View>
                  <Text style={styles.statValue}>
                    {statValues[stat.key]}
                  </Text>
                  <Text style={styles.statLabel}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={18}
              color="#ef4444"
            />
            <Text style={styles.logoutText}>
              Logout
            </Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
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
  },

  /* ── Header ── */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 20,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.3,
  },

  /* ── Avatar Card ── */
  avatarCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#94a3b8",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 3,
    borderColor: "#c7d2fe",
  },
  name: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.4,
  },
  email: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 4,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 12,
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  memberText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4f46e5",
  },

  /* ── Section ── */
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#94a3b8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitleIcon: {
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

  /* ── Stats Grid ── */
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: "44%",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 14,
    alignItems: "flex-start",
    borderTopWidth: 3,
  },
  statIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 2,
    fontWeight: "500",
  },

  /* ── Logout ── */
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    color: "#ef4444",
    fontWeight: "700",
    fontSize: 15,
  },
});