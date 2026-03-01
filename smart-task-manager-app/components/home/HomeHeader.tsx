import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Props {
  username: string;
}

export default function HomeHeader({ username }: Props) {
  const router = useRouter();

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const greetingIcon =
    hour < 12 ? "sunny-outline" : hour < 18 ? "partly-sunny-outline" : "moon-outline";

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.greetingRow}>
          <Ionicons name={greetingIcon} size={15} color="#F59E0B" style={styles.greetingIcon} />
          <Text style={styles.greetingLabel}>{greeting}</Text>
        </View>
        <Text style={styles.title}>
          Hey, <Text style={styles.name}>{username} </Text>
        </Text>
        <Text style={styles.subtitle}>Let's stay productive today</Text>
      </View>

      <TouchableOpacity
        style={styles.profileBtn}
        activeOpacity={0.75}
        onPress={() => router.push("/(protected)/profile")}
      >
        <Ionicons name="person-outline" size={20} color="#4f46e5" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  left: {
    flex: 1,
  },

  /* ── Greeting pill row ── */
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },
  greetingIcon: {
    marginTop: 1,
  },
  greetingLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F59E0B",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  /* ── Name / subtitle ── */
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  name: {
    color: "#4f46e5",
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 3,
    letterSpacing: 0.1,
  },

  /* ── Profile button ── */
  profileBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});