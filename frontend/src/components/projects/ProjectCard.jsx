import React from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiCalendar,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { assetUrl } from "../../utils/assetUrl";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const {
    id,
    title = "Construction Project",
    category = "Construction",
    location = "Muzaffarpur, Bihar",
    image,
    status = "Completed",
    startDate,
    endDate,
    description,
  } = project;

  const statusStyles = {
    completed: "bg-green-50 text-green-700 border-green-100",
    ongoing: "bg-orange-50 text-orange-700 border-orange-100",
    planning: "bg-blue-50 text-blue-700 border-blue-100",
  };

  const statusClass =
    statusStyles[String(status).toLowerCase()] ||
    "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={assetUrl(image)}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70" />

        {/* Status */}
        <div
          className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusClass}`}
        >
          {String(status).toLowerCase() === "completed" ? (
            <FiCheckCircle size={13} />
          ) : (
            <FiClock size={13} />
          )}
          {String(status).replace(/\b\w/g, (letter) => letter.toUpperCase())}
        </div>

        {/* Category */}
        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#102A43] shadow-sm">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="line-clamp-1 text-xl font-bold text-[#102A43] transition-colors duration-300 group-hover:text-[#E87524]">
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <FiMapPin
            size={16}
            className="shrink-0 text-[#E87524]"
          />
          <span className="line-clamp-1">{location}</span>
        </div>

        {(startDate || endDate) && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <FiCalendar
              size={15}
              className="shrink-0 text-[#E87524]"
            />

            <span>
              {startDate || "—"}
              {endDate && ` - ${endDate}`}
            </span>
          </div>
        )}

        {description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
            {description}
          </p>
        )}

        {/* Button */}
        <Link
          to={`/projects/${id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#102A43] transition-all duration-300 group-hover:gap-3 group-hover:text-[#E87524]"
        >
          View Project
          <FiArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
