import React from "react";
import ServiceCard from "./ServiceCard";
import EmptyState from "../common/EmptyState";

const ServiceList = ({
  services = [],
  loading = false,
  onRequest,
}) => {
  /* Loading Skeleton */
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="h-56 animate-pulse bg-gray-200" />

            <div className="space-y-4 p-6">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />

              <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* Empty */
  if (!services.length) {
    return (
      <EmptyState
        title="No Services Available"
        message="Our services will be updated soon. Please check again later."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id || service._id}
          service={{
            ...service,
            id: service.id || service._id,
          }}
          onRequest={onRequest}
        />
      ))}
    </div>
  );
};

export default ServiceList;