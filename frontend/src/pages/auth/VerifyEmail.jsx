import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setVerifiedSession } = useAuth();
  const [email, setEmail] = useState(params.get("email") || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const submit = async (event) => { event.preventDefault(); try { const response = await authService.verifyEmail(email, code); setVerifiedSession(response.data.user, response.data.token); navigate("/dashboard"); } catch (error) { setMessage(error.message); } };
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm"><p className="text-sm font-semibold text-orange-500">LAXMI CONSTRUCTION</p><h1 className="mt-3 text-2xl font-bold text-[#102A43]">Verify your email</h1><p className="mt-2 text-sm text-slate-500">Enter the six-digit code sent to your email.</p>{message && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="mt-6 h-12 w-full rounded-xl border border-slate-200 px-4"/><input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="6-digit code" className="mt-4 h-12 w-full rounded-xl border border-slate-200 px-4 tracking-[.4em]"/><button className="mt-5 h-12 w-full rounded-xl bg-orange-500 font-semibold text-white">Verify email</button><Link to="/login" className="mt-5 block text-center text-sm font-semibold text-orange-500">Back to login</Link></form></main>;
}