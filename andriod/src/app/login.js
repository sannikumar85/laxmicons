import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { AuthShell, Brand, Caption, ErrorNote, Field, PrimaryButton, COLORS } from "../components/AuthUI";

export default function LoginScreen() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const { signIn } = useAuth();
  const { next } = useLocalSearchParams();
  const submit = async () => {
    setError(""); if (!email.trim() || !password) return setError("Enter your email address and password.");
    setBusy(true);
    try { const response = await api.login({ email: email.trim().toLowerCase(), password }); await signIn({ token: response.data.token, user: response.data.user }); router.replace(typeof next === "string" && next.startsWith("/") ? next : "/home"); }
    catch (e) { setError(e.message); if (e.message.toLowerCase().includes("verify your email")) router.push({ pathname: "/verify", params: { email: email.trim().toLowerCase() } }); }
    finally { setBusy(false); }
  };
  return <AuthShell image={require("../images/hero-construction.jpg")}><Brand /><Text style={heading}>Welcome back</Text><Caption>Sign in to stay on top of your construction journey.</Caption><View style={{ height: 26 }} /><ErrorNote>{error}</ErrorNote><Field label="Email address" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" returnKeyType="next" /><Field label="Password" placeholder="Your password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" onSubmitEditing={submit} /><Pressable onPress={() => router.push("/forgot-password")} style={{ alignSelf: "flex-end", marginBottom: 16 }}><Text style={link}>Forgot password?</Text></Pressable><PrimaryButton title="Sign in" onPress={submit} loading={busy} /><View style={{ height: 22 }} /><Caption>New to Laxmi Construction? <Text onPress={() => router.replace("/register")} style={link}>Create account</Text></Caption></AuthShell>;
}
const heading = { color: COLORS.navy, fontSize: 28, fontWeight: "900", textAlign: "center", marginBottom: 6 };
const link = { color: COLORS.orange, fontWeight: "800" };

