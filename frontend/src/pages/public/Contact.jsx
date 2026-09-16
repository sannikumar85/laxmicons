import { useState } from "react";
import api from "../../services/api";

export default function Contact() {
	const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
	const [state, setState] = useState({ loading: false, error: "", success: "" });
	const submit = async (event) => {
		event.preventDefault();
		setState({ loading: true, error: "", success: "" });
		try {
			await api.post("/contact", form);
			setForm({ name: "", email: "", phone: "", subject: "", message: "" });
			setState({ loading: false, error: "", success: "Thanks—your message has been sent." });
		} catch (error) { setState({ loading: false, error: error.message, success: "" }); }
	};
	return <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6"><p className="text-sm font-semibold text-orange-500">Get in touch</p><h1 className="mt-2 text-4xl font-bold text-[#102A43]">Let’s discuss your next project</h1><div className="mt-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div className="rounded-2xl bg-[#102A43] p-7 text-white"><h2 className="text-2xl font-bold">Laxmi Construction</h2><p className="mt-4 leading-7 text-white/70">Muzaffarpur, Bihar, India</p><p className="mt-3 text-white/70">+91 99999 99999</p><p className="mt-2 text-white/70">info@laxmiconstruction.com</p></div><form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">{state.error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}{state.success && <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{state.success}</p>}<div className="grid gap-4 sm:grid-cols-2">{[["name","Name","text"],["email","Email","email"],["phone","Phone","tel"],["subject","Subject","text"]].map(([name,label,type])=><label key={name} className="text-sm font-semibold text-slate-700">{label}<input required={name !== "phone"} type={type} value={form[name]} onChange={e=>setForm({...form,[name]:e.target.value})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3" /></label>)}</div><label className="mt-4 block text-sm font-semibold text-slate-700">Message<textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 p-3" /></label><button disabled={state.loading} className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white disabled:opacity-60">{state.loading ? "Sending..." : "Send message"}</button></form></div></div>;
}
