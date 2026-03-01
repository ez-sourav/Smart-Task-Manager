import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  message?: string;
  subMessage?: string;
  buttonText?: string;
  onPress?: () => void;
}

export default function EmptyState({
  message = "No tasks yet",
  subMessage = "Create your first task to get started.",
  buttonText,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Feather name="inbox" size={36} color="#9ca3af" />
      </View>

      <Text style={styles.title}>{message}</Text>

      {subMessage && (
        <Text style={styles.subtitle}>{subMessage}</Text>
      )}

      {buttonText && onPress && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    paddingHorizontal: 30,
  },
  iconWrapper: {
    backgroundColor: "#f3f4f6",
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});