import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import StatusBadge from "../task/StatusBadge";
import PriorityBadge from "../task/PriorityBadge";
import IconButton from "../task/IconButton";

interface Props {
  task: any;
  onDelete: (id: string) => void;
  isOffline?: boolean;
}

const PRIORITY_ACCENT: Record<string, string> = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#10B981",
};

export default function TaskCard({ task, onDelete, isOffline }: Props) {
  const router = useRouter();
  const accentColor =
    PRIORITY_ACCENT[task.priority?.toLowerCase()] ?? "#CBD5E1";

  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {task.title}
        </Text>
        <PriorityBadge priority={task.priority} />
      </View>

      {/* Description */}
      {task.description ? (
        <Text style={styles.description} numberOfLines={3}>
          {task.description}
        </Text>
      ) : null}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Footer */}
      <View style={styles.footer}>
        <StatusBadge status={task.status} />

        <View style={styles.actions}>
          <IconButton
            icon="edit-2"
            color={isOffline ? "#94A3B8" : "#4F46E5"}
            backgroundColor="#EEF2FF"
            onPress={() => {
              if (isOffline) return;

              router.push({
                pathname: "/(protected)/edit-task",
                params: { id: task._id },
              });
            }}
          />

          <IconButton
            icon="trash-2"
            color={isOffline ? "#94A3B8" : "#DC2626"}
            backgroundColor="#FEF2F2"
            onPress={() => {
              if (isOffline) return;
              onDelete(task._id);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#64748B",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
    lineHeight: 22,
  },
  description: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 13.5,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginTop: 14,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 6,
  },
});
