import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return <AuthProvider><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#F8FAFC" } }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="welcome" />
    <Stack.Screen name="login" />
    <Stack.Screen name="register" />
    <Stack.Screen name="verify" />
    <Stack.Screen name="forgot-password" />
    <Stack.Screen name="home" />
    <Stack.Screen name="about" options={{ headerShown: true, title: "About us" }} />
    <Stack.Screen name="services" options={{ headerShown: true, title: "Services" }} />
    <Stack.Screen name="projects/index" options={{ headerShown: true, title: "Projects" }} />
    <Stack.Screen name="projects/[id]" options={{ headerShown: true, title: "Project details" }} />
    <Stack.Screen name="careers/index" options={{ headerShown: true, title: "Careers" }} />
    <Stack.Screen name="careers/[id]" options={{ headerShown: true, title: "Job details" }} />
    <Stack.Screen name="contact" options={{ headerShown: true, title: "Contact us" }} />
  </Stack></AuthProvider>;
}
