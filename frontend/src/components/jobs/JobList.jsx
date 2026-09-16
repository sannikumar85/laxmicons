import { FiBriefcase } from "react-icons/fi";
import JobCard from "./JobCard";
import EmptyState from "../common/EmptyState";

function JobList({
  jobs = [],
  loading = false,
  onApply,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {[1, 2, 3, 4, 5, 6].map((item) => (
          <JobSkeleton key={item} />
        ))}

      </div>
    );
  }

  if (!jobs.length) {
    return (
      <EmptyState
        icon={<FiBriefcase size={27} />}
        title="No jobs available"
        description="There are currently no open positions. Please check again later."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {jobs.map((job) => (
        <JobCard
          key={job.id || job._id}
          job={job}
          onApply={onApply}
        />
      ))}

    </div>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function JobSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex justify-between">

        <div className="h-12 w-12 rounded-xl bg-slate-100" />

        <div className="h-6 w-14 rounded-full bg-slate-100" />

      </div>

      <div className="mt-5 h-5 w-3/4 rounded bg-slate-100" />

      <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />

      <div className="mt-6 space-y-3">

        <div className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="h-4 w-1/2 rounded bg-slate-100" />
        <div className="h-4 w-3/5 rounded bg-slate-100" />

      </div>

      <div className="mt-6 h-px bg-slate-100" />

      <div className="mt-5 flex justify-between">

        <div className="h-4 w-20 rounded bg-slate-100" />

        <div className="h-10 w-24 rounded-xl bg-slate-100" />

      </div>

    </div>
  );
}

export default JobList;