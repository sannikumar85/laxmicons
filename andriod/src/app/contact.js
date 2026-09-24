import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import Screen from "../components/Screen";
import PageHeader from "../components/PageHeader";
import { api } from "../config/api";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactScreen() {
  const [form, setForm] = useState(initialForm); const [loading, setLoading] = useState(false);
  const update = (name, value) => setForm((current) => ({ ...current, [name]: value }));
  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) return Alert.alert("Complete the form", "Please complete all required fields.");
    setLoading(true); try { await api.sendContact(form); setForm(initialForm); Alert.alert("Message sent", "Thanks. Our team will get back to you soon."); } catch (error) { Alert.alert("Unable to send", error.message); } finally { setLoading(false); }
  };
  return <Screen><PageHeader eyebrow="Get in touch" title="Let's discuss your next project" description="Tell us what you are planning and our team will get in touch." /><View style={styles.info}><Text style={styles.infoTitle}>Laxmi Construction</Text><Text style={styles.infoText}>Muzaffarpur, Bihar, India</Text><Text style={styles.infoText}>+91 99999 99999</Text><Text style={styles.infoText}>info@laxmiconstruction.com</Text></View><View style={styles.form}>{[["name", "Full name", "default"], ["email", "Email", "email-address"], ["phone", "Phone (optional)", "phone-pad"], ["subject", "Subject", "default"]].map(([name, label, keyboardType]) => <TextInput key={name} value={form[name]} onChangeText={(value) => update(name, value)} placeholder={label} keyboardType={keyboardType} autoCapitalize={name === "email" ? "none" : "sentences"} style={styles.input} />)}<TextInput value={form.message} onChangeText={(value) => update("message", value)} placeholder="Tell us about your project" multiline style={[styles.input, styles.message]} /><Pressable disabled={loading} onPress={submit} style={({ pressed }) => [styles.button, (pressed || loading) && styles.disabled]}><Text style={styles.buttonText}>{loading ? "Sending..." : "Send message"}</Text></Pressable></View></Screen>;
}
const styles = StyleSheet.create({ info: { backgroundColor: "#102A43", borderRadius: 20, padding: 20, marginBottom: 20 }, infoTitle: { color: "#FFF", fontSize: 20, fontWeight: "800" }, infoText: { color: "#D7E2EF", marginTop: 8 }, form: { backgroundColor: "#FFF", borderRadius: 20, padding: 18, elevation: 2 }, input: { borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 12, color: "#102A43", fontSize: 16, marginBottom: 12, paddingHorizontal: 14, paddingVertical: 13 }, message: { height: 130, textAlignVertical: "top" }, button: { alignItems: "center", backgroundColor: "#E87524", borderRadius: 12, paddingVertical: 15 }, disabled: { opacity: 0.6 }, buttonText: { color: "#FFF", fontWeight: "800" } });
