import { useState } from "react";

import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiFileText,
  FiSend,
} from "react-icons/fi";

import Button from "../common/Button";

function LabourRequestForm({
  labour,
  onSubmit,
  submitting = false,
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    location: "",
    workersRequired: "1",
    startDate: "",
    duration: "",
    requirements: "",
  });

  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName =
        "Name is required.";
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
        "Enter a valid 10-digit phone number.";
    }

    if (!formData.location.trim()) {
      newErrors.location =
        "Project location is required.";
    }

    if (!formData.startDate) {
      newErrors.startDate =
        "Start date is required.";
    }

    if (
      !formData.workersRequired ||
      Number(formData.workersRequired) < 1
    ) {
      newErrors.workersRequired =
        "Enter at least 1 worker.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const requestData = {
      ...formData,
      labourId: labour?.id,
      labourName: labour?.name,
      skill: labour?.skill,
      workersRequired: Number(
        formData.workersRequired
      ),
    };

    onSubmit?.(requestData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
    >

      {/* Selected Worker */}

      {labour && (
        <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-4">

          {labour.image ? (
            <img
              src={labour.image}
              alt={labour.name}
              className="h-12 w-12 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-orange-500">
              <FiUser size={20} />
            </div>
          )}

          <div>

            <p className="text-[10px] font-bold uppercase tracking-wide text-orange-500">
              Selected Worker
            </p>

            <p className="mt-1 text-sm font-bold text-[#0F2D4A]">
              {labour.name}
            </p>

            <p className="text-xs text-slate-500">
              {labour.skill}
            </p>

          </div>

        </div>
      )}

      {/* Name */}

      <FormField
        label="Your Name"
        required
        error={errors.customerName}
        icon={<FiUser size={16} />}
      >
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
          className={inputClass(
            errors.customerName
          )}
        />
      </FormField>

      {/* Phone */}

      <FormField
        label="Phone Number"
        required
        error={errors.phone}
        icon={<FiPhone size={16} />}
      >
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          inputMode="numeric"
          maxLength={10}
          autoComplete="tel"
          className={inputClass(
            errors.phone
          )}
        />
      </FormField>

      {/* Location */}

      <FormField
        label="Project Location"
        required
        error={errors.location}
        icon={<FiMapPin size={16} />}
      >
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City / Area / Site location"
          className={inputClass(
            errors.location
          )}
        />
      </FormField>

      {/* Workers + Start Date */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        <FormField
          label="Workers Required"
          required
          error={errors.workersRequired}
          icon={<FiUsers size={16} />}
        >
          <input
            type="number"
            name="workersRequired"
            value={formData.workersRequired}
            onChange={handleChange}
            min="1"
            max="100"
            className={inputClass(
              errors.workersRequired
            )}
          />
        </FormField>

        <FormField
          label="Start Date"
          required
          error={errors.startDate}
          icon={<FiCalendar size={16} />}
        >
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            min={getTodayDate()}
            className={inputClass(
              errors.startDate
            )}
          />
        </FormField>

      </div>

      {/* Duration */}

      <FormField
        label="Expected Duration"
        icon={<FiCalendar size={16} />}
      >
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className={inputClass()}
        >
          <option value="">
            Select duration
          </option>

          <option value="1-7 days">
            1–7 Days
          </option>

          <option value="1-4 weeks">
            1–4 Weeks
          </option>

          <option value="1-3 months">
            1–3 Months
          </option>

          <option value="3+ months">
            3+ Months
          </option>

        </select>
      </FormField>

      {/* Requirements */}

      <FormField
        label="Additional Requirements"
        icon={<FiFileText size={16} />}
      >
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your work requirements..."
          className={`${inputClass()} resize-none`}
        />
      </FormField>

      {/* Submit */}

      <Button
        type="submit"
        fullWidth
        loading={submitting}
        disabled={submitting}
        icon={<FiSend size={16} />}
      >
        Send Labour Request
      </Button>

      <p className="text-center text-[10px] leading-5 text-slate-400">
        Our team will review your request and
        contact you regarding worker availability.
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
    text-slate-700
    outline-none
    transition
    focus:ring-4
  `;
}

/* =========================================================
   TODAY
========================================================= */

function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default LabourRequestForm;