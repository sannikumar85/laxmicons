import { useEffect, useState } from "react";
import { FiBriefcase, FiFileText, FiPhone, FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import JobList from "../../components/jobs/JobList";
import { useAuth } from "../../hooks/useAuth";
import jobService, { applyForGeneralJob } from "../../services/jobService";

const fieldClass = "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10";
const acceptedResumeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customPosition: "", coverLetter: "", phone: "" });
  const [resume, setResume] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    jobService.getJobs().then((response) => setJobs(response?.data?.jobs || [])).finally(() => setLoading(false));
  }, []);

  const updateForm = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const openForm = () => {
    if (!isAuthenticated) return navigate("/login", { state: { from: "/careers" } });
    setFeedback(null);
    setShowForm(true);
  };
  const selectResume = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!acceptedResumeTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setFeedback({ type: "error", message: "Please upload a PDF or Word resume no larger than 5 MB." });
      event.target.value = "";
      return;
    }
    setResume(file);
    setFeedback(null);
  };
  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    const data = new FormData();
    data.append("customPosition", form.customPosition.trim());
    data.append("coverLetter", form.coverLetter.trim());
    data.append("phone", form.phone.replace(/\s/g, ""));
    if (resume) data.append("resume", resume);
    try {
      await applyForGeneralJob(data);
      setShowForm(false);
      setForm({ customPosition: "", coverLetter: "", phone: "" });
      setResume(null);
      setFeedback({ type: "success", message: "Your open application has been sent to our recruitment team." });
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "We could not submit your application. Please try again." });
    } finally { setSubmitting(false); }
  };

  return <main className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6">
    <section className="rounded-3xl bg-[#102A43] px-6 py-10 text-white sm:px-10"><p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-400">Careers</p><div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Build your career with Laxmi Construction</h1><p className="mt-4 text-sm leading-6 text-white/70">Explore current vacancies or send an open application if you do not see the right role today.</p></div><button type="button" onClick={openForm} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-600"><FiBriefcase size={17} />Open application</button></div></section>
    {feedback && <div role="status" className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${feedback.type === "success" ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-red-100 bg-red-50 text-red-700"}`}>{feedback.message}</div>}
    {showForm && <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">Open application</p><h2 className="mt-1 text-2xl font-bold text-[#102A43]">Tell us where you can contribute</h2></div><button type="button" onClick={() => setShowForm(false)} disabled={submitting} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100">Cancel</button></div><form onSubmit={submit} className="mt-6 grid gap-5 md:grid-cols-2"><Field label="Desired position" icon={<FiBriefcase size={16} />}><input required name="customPosition" value={form.customPosition} onChange={updateForm} placeholder="e.g. Site Engineer" autoComplete="organization-title" className={fieldClass} /></Field><Field label="Phone number" icon={<FiPhone size={16} />}><input required type="tel" name="phone" value={form.phone} onChange={updateForm} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel" maxLength={10} className={fieldClass} /></Field><Field label="Resume" icon={<FiFileText size={16} />} required={false}><input type="file" accept=".pdf,.doc,.docx" onChange={selectResume} className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-50 file:px-3 file:py-2 file:text-xs file:font-bold file:text-orange-600 hover:file:bg-orange-100" /><p className="mt-1.5 text-xs text-slate-400">Optional. PDF or Word document, up to 5 MB.</p>{resume && <p className="mt-1 text-xs font-medium text-emerald-600">Selected: {resume.name}</p>}</Field><Field label="Why are you interested?" icon={<FiFileText size={16} />} className="md:col-span-2"><textarea required name="coverLetter" value={form.coverLetter} onChange={updateForm} rows={5} placeholder="Briefly describe your experience and the role you are seeking." className={`${fieldClass} h-auto resize-none py-3`} /></Field><div className="md:col-span-2 flex justify-end"><button type="submit" disabled={submitting} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#102A43] px-5 text-sm font-bold text-white transition hover:bg-[#0b243b] disabled:cursor-not-allowed disabled:opacity-60"><FiSend size={16} />{submitting ? "Submitting..." : "Submit application"}</button></div></form></section>}
    <section className="mt-10"><p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">Available positions</p><h2 className="mt-2 text-2xl font-bold text-[#102A43]">Find your next role</h2><div className="mt-6"><JobList jobs={jobs} loading={loading} /></div></section>
  </main>;
}

function Field({ label, icon, children, className = "", required = true }) {
  return <label className={`block ${className}`}><span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><span className="text-orange-500">{icon}</span>{label}{required && <span className="text-red-500">*</span>}</span>{children}</label>;
}
