import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { TaskProvider } from "../../context/TaskContext";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <TaskProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TaskProvider>
  );
}