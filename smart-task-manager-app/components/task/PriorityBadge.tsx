import { View, Text, StyleSheet } from "react-native";

interface Props {
  priority: "Low" | "Medium" | "High";
}
 
export default function PriorityBadge({ priority }: Props) {
  const getStyle = () => {
    if (priority === "High")
      return {
        bg: "#FEE2E2",
        text: "#B91C1C",
        
      };

    if (priority === "Medium")
      return {
        bg: "#FEF3C7",
        text: "#B45309",
      };

    return {
      bg: "#DCFCE7",
      text: "#166534",
      
    };
  };

  const style = getStyle();

  return (
    <View style={[styles.badge, { backgroundColor: style.bg }]}>
      <Text style={[styles.text, { color: style.text }]}>
        {priority}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});