import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const submit = async (event) => {
		event.preventDefault();
		setError("");
		setLoading(true);
		const result = await login(form);
		setLoading(false);
		if (!result.success) return setError(result.message);
		navigate(location.state?.from || (result.user.role === "admin" ? "/admin" : "/dashboard"), { replace: true });
	};

	return <AuthForm title="Welcome back" subtitle="Sign in to manage your construction journey." form={form} setForm={setForm} error={error} loading={loading} onSubmit={submit} submitLabel="Sign in" footer={<Link to="/register" className="font-semibold text-orange-500">Create an account</Link>} />;
}

function AuthForm({ title, subtitle, form, setForm, error, loading, onSubmit, submitLabel, footer }) {
	return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12"><form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold text-orange-500">LAXMI CONSTRUCTION</p><h1 className="mt-3 text-3xl font-bold text-[#102A43]">{title}</h1><p className="mt-2 text-sm text-slate-500">{subtitle}</p>{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<label className="mt-6 block text-sm font-semibold text-slate-700">Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4" /></label><label className="mt-4 block text-sm font-semibold text-slate-700">Password<input required minLength={6} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4" /></label><button disabled={loading} className="mt-6 h-12 w-full rounded-xl bg-orange-500 font-bold text-white hover:bg-orange-600 disabled:opacity-60">{loading ? "Please wait..." : submitLabel}</button><p className="mt-5 text-center text-sm text-slate-500">{footer}</p></form></main>;
}
