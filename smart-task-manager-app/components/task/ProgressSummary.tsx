import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Skeleton from "../ui/Skeleton";

interface Props {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  loading?: boolean;
}

export default function ProgressSummary({
  total,
  pending,
  inProgress,
  completed,
  loading = false,
}: Props) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

 if (loading) {
  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <Skeleton width={120} height={16} />
        <Skeleton width={80} height={14} />
      </View>

      <View style={styles.barBackground}>
        <Skeleton height={14} borderRadius={20} />
      </View>

      <View style={styles.cardRow}>
        <Skeleton height={80} style={{ flex: 1, marginHorizontal: 4 }} />
        <Skeleton height={80} style={{ flex: 1, marginHorizontal: 4 }} />
        <Skeleton height={80} style={{ flex: 1, marginHorizontal: 4 }} />
      </View>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <Text style={styles.title}>Overall Progress</Text>
        <Text style={styles.percent}>{percentage}% completed</Text>
      </View>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%` },
          ]}
        />
      </View>

      <View style={styles.cardRow}>
        <View style={[styles.card, { backgroundColor: "#fff7ed" }]}>
          <Ionicons name="time-outline" size={18} color="#f97316" />
          <Text style={styles.cardNumber}>{pending}</Text>
          <Text style={styles.cardLabel}>Pending</Text>
        </View>

        <View style={[styles.card, { backgroundColor: "#eff6ff" }]}>
          <Ionicons name="sync-outline" size={18} color="#3b82f6" />
          <Text style={styles.cardNumber}>{inProgress}</Text>
          <Text style={styles.cardLabel}>In Progress</Text>
        </View>

        <View style={[styles.card, { backgroundColor: "#ecfdf5" }]}>
          <Ionicons name="checkmark-circle-outline" size={18} color="#16a34a" />
          <Text style={[styles.cardNumber, { color: "#16a34a" }]}>
            {completed}
          </Text>
          <Text style={styles.cardLabel}>Completed</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },

  percent: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4f46e5",
  },

  barBackground: {
    height: 14,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
  },

  barFill: {
    height: "100%",
    backgroundColor: "#4f46e5",
    borderRadius: 20,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  card: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 14,
    alignItems: "center",
  },

  cardNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 4,
  },

  cardLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },

  /* Skeleton Styles */
  skeletonTitle: {
    width: 120,
    height: 16,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
  },

  skeletonPercent: {
    width: 80,
    height: 14,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
  },

  skeletonCard: {
    height: 80,
    backgroundColor: "#e2e8f0",
  },
});