import { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { AuthShell, Brand, Caption, ErrorNote, Field, PrimaryButton, COLORS } from "../components/AuthUI";

export default function VerifyScreen() {
  const params = useLocalSearchParams(); const email = String(params.email || "");
  const [code, setCode] = useState(String(params.devCode || "")); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const { signIn } = useAuth();
  const submit = async () => {
    setError(""); if (!email) return setError("We need your email address to verify the account. Please return to registration.");
    if (!/^\d{6}$/.test(code.trim())) return setError("Enter the six-digit code from your email.");
    setBusy(true);
    try { const response = await api.verifyEmail({ email, code: code.trim() }); await signIn({ token: response.data.token, user: response.data.user }); router.replace("/home"); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  return <AuthShell image={require("../images/hero-construction.jpg")}><Brand /><Text style={heading}>Verify your email</Text><Caption>Enter the six-digit verification code sent to</Caption><Text style={emailStyle}>{email || "your email address"}</Text><View style={{ height: 22 }} /><ErrorNote>{error}</ErrorNote><Field label="Verification code" placeholder="000000" value={code} onChangeText={(v) => setCode(v.replace(/\D/g, "").slice(0, 6))} keyboardType="number-pad" maxLength={6} textContentType="oneTimeCode" /><PrimaryButton title="Verify email" onPress={submit} loading={busy} /><View style={{ height: 18 }} /><Caption>Wrong email? <Text onPress={() => router.replace("/register")} style={link}>Create account again</Text></Caption></AuthShell>;
}
const heading = { color: COLORS.navy, fontSize: 27, fontWeight: "900", textAlign: "center", marginBottom: 6 };
const emailStyle = { color: COLORS.ink, textAlign: "center", fontSize: 16, fontWeight: "800", marginTop: 5 };
const link = { color: COLORS.orange, fontWeight: "800" };
