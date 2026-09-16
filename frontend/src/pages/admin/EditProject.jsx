import React, { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiSave,
} from "react-icons/fi";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Residential",
    location: "",
    status: "Ongoing",
    startDate: "",
    endDate: "",
    description: "",
    overview: "",
  });

  useEffect(() => {
    // Temporary mock data.
    // Later fetch project using id from backend.

    setFormData({
      title: "Modern Residential Building",
      category: "Residential",
      location: "Muzaffarpur, Bihar",
      status: "Completed",
      startDate: "2025-01-10",
      endDate: "2025-12-20",
      description:
        "Modern residential construction project.",
      overview:
        "Complete residential construction with professional planning and project management.",
    });
  }, [id]);

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
      console.log("Updated Project:", {
        id,
        ...formData,
      });

      setLoading(false);
      navigate("/admin/projects");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#E87524]"
        >
          <FiArrowLeft />
          Back to Projects
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-[#102A43]">
          Edit Project
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Update project information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              "Residential",
              "Commercial",
              "Renovation",
              "Infrastructure",
              "Consultancy",
            ]}
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              "Upcoming",
              "Ongoing",
              "Completed",
            ]}
          />

          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />

          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <TextArea
            label="Short Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <TextArea
            label="Project Overview"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/projects"
            className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E87524] px-6 text-sm font-semibold text-white hover:bg-[#d9681b] disabled:opacity-60"
          >
            <FiSave />
            {loading ? "Updating..." : "Update Project"}
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
  required,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
      {required && (
        <span className="text-red-500"> *</span>
      )}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
    />
  </div>
);

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
    </label>

    <select
      name={name}
      value={value}
      onChange={onChange}
      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const TextArea = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
    </label>

    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#E87524] focus:bg-white"
    />
  </div>
);

export default EditProject;