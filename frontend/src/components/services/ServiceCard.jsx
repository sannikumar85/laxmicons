import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiTool,
} from "react-icons/fi";

const ServiceCard = ({ service, onRequest }) => {
  if (!service) return null;

  const {
    id,
    title = "Construction Service",
    description = "Professional construction and consultancy services.",
    image,
    icon,
    features = [],
  } = service;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FiTool size={45} className="text-gray-300" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Icon */}
        <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E87524] text-white shadow-lg">
          {icon || <FiTool size={21} />}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#102A43] transition-colors duration-300 group-hover:text-[#E87524]">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <FiCheckCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-green-600"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <Link
            to={`/services/${id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#102A43] transition-all duration-300 hover:gap-3 hover:text-[#E87524]"
          >
            View Details
            <FiArrowRight size={16} />
          </Link>

          {onRequest && (
            <button
              type="button"
              onClick={() => onRequest(service)}
              className="rounded-xl bg-[#E87524] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#d9681b] hover:shadow-md active:scale-95"
            >
              Request
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;