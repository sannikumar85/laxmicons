import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiPhone,
  FiMessageCircle,
} from "react-icons/fi";
import Button from "../common/Button";

const ProjectDetails = ({
  project,
  onContact,
}) => {
  if (!project) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-[#102A43]">
          Project Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          The project you're looking for could not be found.
        </p>

        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-[#E87524]"
        >
          <FiArrowLeft />
          Back to Projects
        </Link>
      </div>
    );
  }

  const {
    title = "Construction Project",
    category = "Construction",
    location = "Muzaffarpur, Bihar",
    image,
    status = "Completed",
    startDate,
    endDate,
    description,
    overview,
    features = [],
    scope = [],
  } = project;

  const isCompleted = status === "Completed";

  return (
    <div className="space-y-8">
      {/* Back */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-[#E87524]"
      >
        <FiArrowLeft size={17} />
        Back to Projects
      </Link>

      {/* Hero */}
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="relative h-[300px] overflow-hidden sm:h-[400px] lg:h-[500px]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
              No Project Image
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#102A43]">
                {category}
              </span>

              <span
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold ${
                  isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {isCompleted ? (
                  <FiCheckCircle size={13} />
                ) : (
                  <FiClock size={13} />
                )}
                {status}
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <FiMapPin className="text-[#E87524]" />
                {location}
              </span>

              {startDate && (
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-[#E87524]" />
                  {startDate}
                  {endDate && ` - ${endDate}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Left */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#102A43]">
              Project Overview
            </h2>

            <div className="mt-4 leading-7 text-gray-600">
              {overview || description || "Project information will be updated soon."}
            </div>
          </section>

          {/* Scope */}
          {scope.length > 0 && (
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-[#102A43]">
                Project Scope
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {scope.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
                  >
                    <FiCheckCircle
                      className="mt-0.5 shrink-0 text-green-600"
                      size={18}
                    />

                    <span className="text-sm leading-6 text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Features */}
          {features.length > 0 && (
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-[#102A43]">
                Key Features
              </h2>

              <ul className="mt-5 space-y-3">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E87524]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="h-fit space-y-5 lg:sticky lg:top-24">
          {/* Project info */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#102A43]">
              Project Information
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Category
                </p>
                <p className="mt-1 font-semibold text-gray-700">
                  {category}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Location
                </p>
                <p className="mt-1 font-semibold text-gray-700">
                  {location}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Status
                </p>
                <p className="mt-1 font-semibold text-gray-700">
                  {status}
                </p>
              </div>

              {startDate && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Start Date
                  </p>
                  <p className="mt-1 font-semibold text-gray-700">
                    {startDate}
                  </p>
                </div>
              )}

              {endDate && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Completion Date
                  </p>
                  <p className="mt-1 font-semibold text-gray-700">
                    {endDate}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Card */}
          <div className="rounded-2xl bg-[#102A43] p-6 text-white shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E87524]">
              <FiMessageCircle size={22} />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Interested in a Project?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/70">
              Contact our team to discuss your construction or consultancy
              requirements.
            </p>

            <div className="mt-5 space-y-3">
              <Button
                type="button"
                fullWidth
                icon={<FiMessageCircle size={17} />}
                onClick={onContact}
              >
                Contact Us
              </Button>

              <a
                href="tel:+919999999999"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/20 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                <FiPhone size={16} />
                Call Us
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetails;