import React, { useState } from "react";
import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiFileText,
  FiSend,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const CreateServiceRequest = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service: "",
    name: "",
    phone: "",
    location: "",
    preferredDate: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      console.log("Service Request:", formData);

      setLoading(false);
      navigate("/dashboard/service-requests");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          to="/dashboard/service-requests"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#E87524]"
        >
          <FiArrowLeft />
          Back to Requests
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-[#102A43]">
          Create Service Request
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Tell us about the service you need.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
      >
        {/* Service */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Select Service <span className="text-red-500">*</span>
          </label>

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
          >
            <option value="">Choose a service</option>
            <option value="Residential Construction">
              Residential Construction
            </option>
            <option value="Commercial Construction">
              Commercial Construction
            </option>
            <option value="Construction Consultancy">
              Construction Consultancy
            </option>
            <option value="Renovation">
              Renovation & Remodeling
            </option>
          </select>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={<FiUser />}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            icon={<FiPhone />}
            required
          />

          <Input
            label="Project Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            icon={<FiMapPin />}
            required
          />

          <Input
            label="Preferred Date"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            icon={<FiCalendar />}
            required
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Requirements
          </label>

          <div className="relative">
            <FiFileText
              className="absolute left-4 top-4 text-gray-400"
              size={17}
            />

            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={6}
              placeholder="Describe your construction requirements..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/dashboard/service-requests"
            className="flex h-11 items-center justify-center rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E87524] px-6 text-sm font-semibold text-white hover:bg-[#d9681b] disabled:opacity-60"
          >
            <FiSend />
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon,
  required,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
      {required && (
        <span className="text-red-500"> *</span>
      )}
    </label>

    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
      />
    </div>
  </div>
);

export default CreateServiceRequest;