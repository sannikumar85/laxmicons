import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jobService from "../../services/jobService";
import JobDetailsView from "../../components/jobs/JobDetails";
import JobApplicationForm from "../../components/jobs/JobApplicationForm";
import { useAuth } from "../../hooks/useAuth";
export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    jobService.getJobById(id).then((response) => setJob(response?.data?.job)).catch(() => setJob(null));
  }, [id]);

  const openApplication = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/jobs/${id}` } });
      return;
    }
    setFeedback(null);
    setShowForm(true);
  };

  const apply = async (data) => {
    setSubmitting(true);
    setFeedback(null);
    const formData = new FormData();
    formData.append("applicantName", data.name.trim());
    formData.append("email", data.email.trim());
    formData.append("phone", data.phone.replace(/\s/g, ""));
    formData.append("coverLetter", data.coverLetter.trim());
    formData.append("resume", data.resume);

    try {
      await jobService.applyForJobWithResume(id, formData);
      setShowForm(false);
      setFeedback({ type: "success", message: "Your application has been submitted successfully." });
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "We could not submit your application. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6">
      <JobDetailsView job={job} onApply={openApplication} />

      {feedback && (
        <div role="status" className={`mt-5 rounded-xl border px-4 py-3 text-sm font-medium ${feedback.type === "success" ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-red-100 bg-red-50 text-red-700"}`}>
          {feedback.message}
        </div>
      )}

      {showForm && job && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">Application</p>
              <h2 className="mt-1 text-2xl font-bold text-[#102A43]">Apply for {job.title}</h2>
              <p className="mt-2 text-sm text-slate-500">Complete the form below. Required fields are marked with an asterisk.</p>
            </div>
            <button type="button" onClick={() => setShowForm(false)} disabled={submitting} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50">Cancel</button>
          </div>
          <JobApplicationForm job={job} onSubmit={apply} submitting={submitting} />
        </section>
      )}
    </div>
  );
}
