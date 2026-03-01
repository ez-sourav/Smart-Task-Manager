import { Stack } from "expo-router";
import { AuthProvider } from "../hooks/useAuth";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </>
    </AuthProvider>
  );
}