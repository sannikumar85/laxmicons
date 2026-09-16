import React, { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiFileText,
  FiSend,
  FiX,
} from "react-icons/fi";

import Button from "../common/Button";

const ServiceRequestForm = ({
  service,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    location: "",
    preferredDate: "",
    requirements: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please select a preferred date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit?.({
      ...formData,
      serviceId: service?.id || service?._id,
      serviceName: service?.title,
    });
  };

  const inputClass = (field) =>
    `h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 focus:border-[#E87524] focus:ring-[#E87524]/10"
    }`;

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#E87524]">
            Service Request
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#102A43]">
            {service?.title || "Request a Service"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Fill in your details and our team will contact you.
          </p>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-5"
      >
        {/* Name + Phone */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiUser
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`${inputClass(
                  "customerName"
                )} pl-11`}
              />
            </div>

            {errors.customerName && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.customerName}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiPhone
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                className={`${inputClass("phone")} pl-11`}
              />
            </div>

            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>

          <div className="relative">
            <FiMail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`${inputClass("email")} pl-11`}
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Location + Date */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Project Location{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiMapPin
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Area"
                className={`${inputClass("location")} pl-11`}
              />
            </div>

            {errors.location && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.location}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Preferred Date{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiCalendar
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`${inputClass(
                  "preferredDate"
                )} pl-11`}
              />
            </div>

            {errors.preferredDate && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.preferredDate}
              </p>
            )}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Requirements / Message
          </label>

          <div className="relative">
            <FiFileText
              size={17}
              className="absolute left-4 top-4 text-gray-400"
            />

            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your construction or consultancy requirements..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-[#E87524]/10"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="h-12 rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-600 transition-all duration-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            icon={<FiSend size={17} />}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceRequestForm;