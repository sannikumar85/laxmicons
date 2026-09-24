import { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { api } from "../config/api";
import { AuthShell, Brand, Caption, ErrorNote, Field, PrimaryButton, COLORS } from "../components/AuthUI";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState(""); const [code, setCode] = useState(""); const [password, setPassword] = useState(""); const [stage, setStage] = useState(0); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [message, setMessage] = useState("");
  const submit = async () => {
    setError(""); setMessage("");
    if (stage === 0) {
      if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Enter a valid email address.");
      setBusy(true); try { const response = await api.forgotPassword({ email: email.trim().toLowerCase() }); const returned = response.data?.verificationCode || response.data?.resetUrl?.match(/reset-password\/([^/?#]+)/)?.[1]; if (returned) { setCode(returned); setStage(1); setMessage("Enter a new password to finish resetting your account."); } else { setMessage("If your account exists, a reset code has been sent to your email."); setStage(1); } } catch (e) { setError(e.message); } finally { setBusy(false); }
      return;
    }
    if (!code.trim()) return setError("Enter the reset code from your email.");
    if (password.length < 6) return setError("Your new password must be at least 6 characters.");
    setBusy(true); try { await api.resetPassword(code.trim(), password); setMessage("Password updated. You can sign in now."); setTimeout(() => router.replace("/login"), 900); } catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  return <AuthShell><Brand compact /><Text style={heading}>Reset password</Text><Caption>We’ll email you a secure code to restore account access.</Caption><View style={{ height: 22 }} /><ErrorNote>{error}</ErrorNote>{message ? <Text style={notice}>{message}</Text> : null}<Field label="Email address" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={stage === 0} />{stage === 1 ? <><Field label="Reset code" placeholder="Six-digit code" value={code} onChangeText={setCode} autoCapitalize="none" /><Field label="New password" placeholder="At least 6 characters" value={password} onChangeText={setPassword} secureTextEntry /></> : null}<PrimaryButton title={stage === 0 ? "Send reset code" : "Update password"} onPress={submit} loading={busy} /><Text onPress={() => router.replace("/login")} style={link}>Back to sign in</Text></AuthShell>;
}
const heading = { color: COLORS.navy, fontSize: 27, fontWeight: "900", textAlign: "center", marginBottom: 6 };
const notice = { color: "#276749", backgroundColor: "#EAF8F0", padding: 12, borderRadius: 12, fontSize: 13, lineHeight: 19, marginBottom: 12 };
const link = { textAlign: "center", color: COLORS.navy, fontWeight: "700", marginTop: 22 };
