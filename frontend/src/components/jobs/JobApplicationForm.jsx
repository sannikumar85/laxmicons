import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiFileText,
  FiUpload,
  FiX,
  FiSend,
} from "react-icons/fi";

import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

function JobApplicationForm({
  job,
  onSubmit,
  submitting = false,
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      name: previous.name || user?.name || "",
      email: previous.email || user?.email || "",
      phone: previous.phone || user?.phone || "",
    }));
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        resume:
          "Please upload a PDF or Word document.",
      }));

      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setErrors((previous) => ({
        ...previous,
        resume:
          "Resume size must be less than 5 MB.",
      }));

      event.target.value = "";
      return;
    }

    setResume(file);

    setErrors((previous) => ({
      ...previous,
      resume: "",
    }));
  };

  const removeResume = () => {
    setResume(null);
    setErrors((previous) => ({ ...previous, resume: "" }));

    const input =
      document.getElementById("resume");

    if (input) {
      input.value = "";
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !/^[6-9]\d{9}$/.test(
        formData.phone.replace(/\s/g, "")
      )
    ) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number.";
    }

    if (!resume) {
      newErrors.resume =
        "Please upload your resume.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const applicationData = {
      ...formData,
      jobId: job?.id,
      jobTitle: job?.title,
      resume,
    };

    onSubmit?.(applicationData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
    >
      {/* Job */}

      {job?.title && (
        <div className="rounded-xl bg-orange-50 p-4">

          <p className="text-[10px] font-bold uppercase tracking-wide text-orange-500">
            Applying For
          </p>

          <p className="mt-1 text-sm font-bold text-[#0F2D4A]">
            {job.title}
          </p>

        </div>
      )}

      {/* Name */}

      <FormField
        label="Full Name"
        required
        error={errors.name}
        icon={<FiUser size={17} />}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
          className={inputClass(errors.name)}
        />
      </FormField>

      {/* Email */}

      <FormField
        label="Email Address"
        required
        error={errors.email}
        icon={<FiMail size={17} />}
      >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
          className={inputClass(errors.email)}
        />
      </FormField>

      {/* Phone */}

      <FormField
        label="Phone Number"
        required
        error={errors.phone}
        icon={<FiPhone size={17} />}
      >
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          inputMode="numeric"
          autoComplete="tel"
          required
          maxLength={10}
          className={inputClass(errors.phone)}
        />
      </FormField>

      {/* Cover Letter */}

      <FormField
        label="Cover Letter"
        error={errors.coverLetter}
        icon={<FiFileText size={17} />}
      >
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          placeholder="Tell us briefly why you are interested in this position..."
          rows={5}
          className={`${inputClass(
            errors.coverLetter
          )} resize-none py-3`}
        />
      </FormField>

      {/* Resume */}

      <FormField
        label="Resume"
        required
        error={errors.resume}
        icon={<FiUpload size={17} />}
      >
        {!resume ? (
          <label
            htmlFor="resume"
            className="
              flex
              min-h-28
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-slate-300
              bg-slate-50
              px-4
              text-center
              transition
              hover:border-orange-400
              hover:bg-orange-50/40
            "
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FiUpload size={18} />
            </div>

            <p className="mt-2 text-xs font-semibold text-slate-700">
              Click to upload your resume
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              PDF or Word • Maximum 5 MB
            </p>

            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        ) : (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <FiFileText size={18} />
              </div>

              <div className="min-w-0">

                <p className="truncate text-xs font-semibold text-slate-700">
                  {resume.name}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  {formatFileSize(resume.size)}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={removeResume}
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-red-50
                text-red-500
                transition
                hover:bg-red-500
                hover:text-white
              "
              aria-label="Remove resume"
            >
              <FiX size={15} />
            </button>

          </div>
        )}
      </FormField>

      {/* Submit */}

      <Button
        type="submit"
        loading={submitting}
        disabled={submitting}
        fullWidth
        icon={<FiSend size={16} />}
      >
        Submit Application
      </Button>

      <p className="text-center text-[10px] leading-5 text-slate-400">
        By submitting this application, you confirm
        that the information provided is accurate.
      </p>

    </form>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  required = false,
  error,
  icon,
  children,
}) {
  return (
    <div>

      <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700">

        <span className="text-orange-500">
          {icon}
        </span>

        {label}

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}

      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-[11px] font-medium text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

/* =========================================================
   INPUT CLASS
========================================================= */

function inputClass(error) {
  return `
    w-full
    rounded-xl
    border
    ${
      error
        ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
        : "border-slate-200 focus:border-orange-400 focus:ring-orange-500/10"
    }
    bg-white
    px-4
    py-3
    text-sm
    text-slate-800
    placeholder:text-slate-400
    outline-none
    transition
    focus:ring-4
  `;
}

/* =========================================================
   FILE SIZE
========================================================= */

function formatFileSize(bytes) {
  if (!bytes) {
    return "0 KB";
  }

  const mb = bytes / (1024 * 1024);

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  }

  return `${Math.max(
    1,
    Math.round(bytes / 1024)
  )} KB`;
}

export default JobApplicationForm;
