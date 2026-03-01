import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  status: "Pending" | "In Progress" | "Completed";
}

export default function StatusBadge({ status }: Props) {
  const getStyle = () => {
    if (status === "Completed")
      return {
        border: "#16A34A",
        text: "#16A34A",
        icon: "checkmark-circle-outline",
      };

    if (status === "In Progress")
      return {
        border: "#2563EB",
        text: "#2563EB",
        icon: "sync-outline",
      };

    return {
      border: "#6B7280",
      text: "#6B7280",
      icon: "time-outline",
    };
  };

  const style = getStyle();

  return (
    <View style={[styles.badge, { borderColor: style.border }]}>
      <Ionicons
        name={style.icon as any}
        size={14}
        color={style.text}
        style={{ marginRight: 4 }}
      />
      <Text style={[styles.text, { color: style.text }]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});