import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import CustomButton from "../../components/ui/CustomButton";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      Alert.alert("Error", "Enter a valid email address");
      return;
    }
    try {
      setLoading(true);
      await login(email.trim(), password);
    } catch (error: any) {
      Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* Hero / Header */}
      <View style={styles.heroSection}>
        <View style={styles.logoWrap}>
          <Feather name="log-in" size={32} color="#2563eb" />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login in to continue managing your tasks</Text>
      </View>

      {/* Form Card */}
      <View style={styles.card}>

        {/* Email */}
        <Text style={styles.fieldLabel}>Email Address</Text>
        <View style={[styles.inputContainer, emailFocused && styles.inputFocused]}>
          <View style={styles.inputIconWrap}>
            <Feather name="mail" size={15} color={emailFocused ? "#4f46e5" : "#94a3b8"} />
          </View>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#cbd5e1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        {/* Password */}
        <Text style={styles.fieldLabel}>Password</Text>
        <View style={[styles.inputContainer, passwordFocused && styles.inputFocused]}>
          <View style={styles.inputIconWrap}>
            <Feather name="lock" size={15} color={passwordFocused ? "#4f46e5" : "#94a3b8"} />
          </View>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#cbd5e1"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text.length === 0) setShowPassword(false);
            }}
            secureTextEntry={!showPassword}
            style={styles.input}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          {password.length > 0 && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
              activeOpacity={0.7}
            >
              <Feather name={showPassword ? "eye-off" : "eye"} size={15} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Submit */}
        <View style={styles.buttonWrapper}>
          <CustomButton
            title={loading ? "Signing in..." : "Login"}
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </View>

      {/* Register Link */}
      <TouchableOpacity
        style={styles.registerRow}
        activeOpacity={0.7}
        onPress={() => router.push("/(auth)/register")}
      >
        <Text style={styles.registerText}>Don't have an account? </Text>
        <Text style={styles.registerLink}>Register</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
  },

  /* ── Hero ── */
  heroSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#4f46e5",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  appName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4f46e5",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
  },

  /* ── Form Card ── */
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#94a3b8",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  /* ── Field Label ── */
  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.1,
    marginBottom: 8,
    marginTop: 4,
  },

  /* ── Input ── */
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  inputFocused: {
    borderColor: "#4f46e5",
    backgroundColor: "#FAFBFF",
  },
  inputIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#0f172a",
    paddingVertical: 10,
  },
  eyeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  /* ── Button ── */
  buttonWrapper: {
    marginTop: 4,
  },

  /* ── Register ── */
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  registerLink: {
    fontSize: 14,
    color: "#4f46e5",
    fontWeight: "700",
  },
});