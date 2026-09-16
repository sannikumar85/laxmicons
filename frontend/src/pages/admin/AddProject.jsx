import React, { useState } from "react";
import {
  FiArrowLeft,
  FiSave,
  FiImage,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";

const AddProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    status: "planning",
    startDate: "",
    endDate: "",
    description: "",
    overview: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append("image", image);
      await projectService.createProjectWithImage(data);
      navigate("/admin/projects");
    } catch (error) { window.alert(error.message || "Unable to create project."); }
    finally { setLoading(false); }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#E87524]"
        >
          <FiArrowLeft />
          Back to Projects
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-[#102A43]">
          Add New Project
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Add project details that will be displayed on the website.
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
            placeholder="e.g. Modern Residential Building"
            required
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
            >
              <option value="">Select Category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Renovation">Renovation</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Consultancy">Consultancy</option>
            </select>
          </div>

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Muzaffarpur, Bihar"
            required
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
            >
              <option value="planning">Planning</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

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

        {/* Image */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Project Image
          </label>

          <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-5 transition-all hover:border-[#E87524] hover:bg-orange-50/30">
            <FiImage
              size={30}
              className="text-gray-400"
            />

            <p className="mt-2 text-sm font-semibold text-gray-600">
              {image
                ? image.name
                : "Click to upload project image"}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              JPG, PNG or WEBP
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <div className="mt-6">
          <TextArea
            label="Short Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short project description..."
          />
        </div>

        <div className="mt-5">
          <TextArea
            label="Project Overview"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            placeholder="Describe the complete project..."
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
            {loading ? "Saving..." : "Save Project"}
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
  placeholder,
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
      placeholder={placeholder}
      required={required}
      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition-all focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-orange-100"
    />
  </div>
);

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
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
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-orange-100"
    />
  </div>
);

export default AddProject;