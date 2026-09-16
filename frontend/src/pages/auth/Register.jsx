import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const submit = async (event) => {
		event.preventDefault(); setError(""); setLoading(true);
		const result = await register(form); setLoading(false);
		if (!result.success) return setError(result.message);
		navigate(`/verify-email?email=${encodeURIComponent(form.email)}`, { replace: true });
	};
	return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold text-orange-500">LAXMI CONSTRUCTION</p><h1 className="mt-3 text-3xl font-bold text-[#102A43]">Create your account</h1><p className="mt-2 text-sm text-slate-500">Request services and follow your projects in one place.</p>{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}{[["name","Full name","text"],["email","Email","email"],["phone","Phone","tel"],["password","Password","password"]].map(([name,label,type]) => <label key={name} className="mt-4 block text-sm font-semibold text-slate-700">{label}<input required minLength={name === "password" ? 6 : undefined} type={type} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4" /></label>)}<button disabled={loading} className="mt-6 h-12 w-full rounded-xl bg-orange-500 font-bold text-white hover:bg-orange-600 disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button><p className="mt-5 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-semibold text-orange-500">Sign in</Link></p></form></main>;
}
