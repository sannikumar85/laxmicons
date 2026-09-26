import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return <AuthProvider><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#F8FAFC" } }}>
    <Stack.Screen name="index" /><Stack.Screen name="welcome" /><Stack.Screen name="login" /><Stack.Screen name="register" /><Stack.Screen name="verify" /><Stack.Screen name="forgot-password" /><Stack.Screen name="home" />
    <Stack.Screen name="dashboard" /><Stack.Screen name="service-request" /><Stack.Screen name="service-requests" /><Stack.Screen name="labour" /><Stack.Screen name="labour-requests" /><Stack.Screen name="profile" /><Stack.Screen name="my-projects" /><Stack.Screen name="my-applications" /><Stack.Screen name="notifications" /><Stack.Screen name="settings" />
    <Stack.Screen name="about" /><Stack.Screen name="services" /><Stack.Screen name="projects/index" /><Stack.Screen name="projects/[id]" /><Stack.Screen name="careers/index" /><Stack.Screen name="careers/[id]" /><Stack.Screen name="contact" />
    <Stack.Screen name="admin/index" /><Stack.Screen name="admin/service-requests" /><Stack.Screen name="admin/labour-requests" /><Stack.Screen name="admin/jobs" /><Stack.Screen name="admin/applications" /><Stack.Screen name="admin/projects" /><Stack.Screen name="admin/users" /><Stack.Screen name="admin/contact" /><Stack.Screen name="admin/settings" />
  </Stack></AuthProvider>;
}
