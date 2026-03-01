import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Redirect } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/ui/Loader";

export default function Landing() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) return <Loader message="Checking authentication..." />;
  if (user) return <Redirect href="/(protected)" />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Logo */}
        <View style={styles.logoWrap}>
          <Ionicons name="analytics-outline" size={36} color="#4f46e5" />
        </View>
        {/* Hero Text */}
        <Text style={styles.title}>Smart Task{"\n"}Manager</Text>
        <Text style={styles.subtitle}>Organize smarter. Achieve more.</Text>

        {/* Features Card */}
        <View style={styles.featuresCard}>
          <Feature icon="time-outline"            color="#F59E0B" bg="#FFFBEB" text="Track task progress easily"       />
          <Feature icon="flag-outline"             color="#3B82F6" bg="#EFF6FF" text="Manage priorities efficiently"   />
          <Feature icon="flash-outline"            color="#10B981" bg="#ECFDF5" text="Stay productive every day"       />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => router.push("/(auth)/login")}
          >
            <View style={styles.btnIconWrap}>
              <Ionicons name="log-in-outline" size={18} color="#4f46e5" />
            </View>
            <Text style={styles.primaryButtonText}>Login</Text>
            <Ionicons name="arrow-forward" size={16} color="#4f46e5" style={{ opacity: 0.7 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={() => router.push("/(auth)/register")}
          >
            <View style={styles.btnIconWrapSecondary}>
              <Ionicons name="person-add-outline" size={18} color="#4f46e5" />
            </View>
            <Text style={styles.secondaryButtonText}>Create Account</Text>
            <Ionicons name="arrow-forward" size={16} color="#4f46e5" style={{ opacity: 0.5 }} />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

function Feature({
  icon,
  color,
  bg,
  text,
}: {
  icon: string;
  color: string;
  bg: string;
  text: string;
}) {
  return (
    <View style={styles.featureRow}>
      <View style={[styles.featureIconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon as any} size={16} color={color} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
      <View style={[styles.featureDot, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  /* ── Logo ── */
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#4f46e5",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  /* ── Hero Text ── */
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
    letterSpacing: -0.8,
    lineHeight: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },

  /* ── Features Card ── */
  featuresCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 32,
    gap: 10,
    shadowColor: "#94a3b8",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.5,
  },

  /* ── Buttons ── */
  buttonContainer: {
    width: "100%",
    gap: 14,
  },

  primaryButton: {
    backgroundColor: "#EEF2FF",   // Soft brand background
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#4f46e5",       // Same brand border
    shadowColor: "#4f46e5",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  secondaryButton: {
    backgroundColor: "#EEF2FF",  
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#4f46e5",       
    shadowColor: "#4f46e5",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  btnIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  btnIconWrapSecondary: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButtonText: {
    flex: 1,
    color: "#4f46e5",
    fontWeight: "700",
    fontSize: 15,
  },

  secondaryButtonText: {
    flex: 1,
    color: "#4f46e5",
    fontWeight: "700",
    fontSize: 15,
  },
});