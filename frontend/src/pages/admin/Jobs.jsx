import React, { useEffect, useMemo, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiBriefcase,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import jobService from "../../services/jobService";

const Jobs = () => {
  const [search, setSearch] = useState("");

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", department: "", location: "", type: "Full Time", experience: "", salary: "", description: "", status: "open" });
  useEffect(() => {
    Promise.all([jobService.getJobs({ status: "all" }), jobService.getAllJobApplications()])
      .then(([jobsResponse, applicationsResponse]) => {
        setJobs(jobsResponse?.data?.jobs || []);
        setApplications(applicationsResponse?.data?.applications || []);
      })
      .catch((requestError) => setError(requestError.message || "Unable to load recruitment data."))
      .finally(() => setLoading(false));
  }, []);
  /* const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Site Engineer",
      department: "Construction",
      location: "Muzaffarpur",
      type: "Full Time",
      experience: "2-4 Years",
      status: "Active",
    },
    {
      id: 2,
      title: "Civil Supervisor",
      department: "Site Operations",
      location: "Patna",
      type: "Full Time",
      experience: "3-5 Years",
      status: "Active",
    },
    {
      id: 3,
      title: "Project Coordinator",
      department: "Management",
      location: "Muzaffarpur",
      type: "Full Time",
      experience: "1-3 Years",
      status: "Closed",
    },
  ]); */

  const filtered = useMemo(() => {
    return jobs.filter(
      (job) =>
        job.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        job.department
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        job.location
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [jobs, search]);

  const applicationCount = (jobId) => applications.filter((application) => application.job?._id === jobId || application.job === jobId).length;

  const deleteJob = (id) => {
    if (!window.confirm("Delete this job?")) return;

    jobService.deleteJob(id).then(() => setJobs((prev) => prev.filter((job) => (job.id || job._id) !== id))).catch((requestError) => setError(requestError.message));
  };
  const create = async (event) => {
    event.preventDefault();
    try { const response = await jobService.createJob(form); setJobs((previous) => [response.data.job, ...previous]); setForm({ title: "", department: "", location: "", type: "Full Time", experience: "", salary: "", description: "", status: "open" }); setShowForm(false); }
    catch (requestError) { setError(requestError.message || "Unable to create job."); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#E87524]">
            Recruitment
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
            Jobs
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create and manage career opportunities.
          </p>
        </div>

        <button onClick={() => setShowForm((previous) => !previous)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E87524] px-5 text-sm font-semibold text-white hover:bg-[#d9681b]">
          <FiPlus />
          Add Job
        </button>
      </div>

      {showForm && <form onSubmit={create} className="grid gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:grid-cols-2"><input required placeholder="Job title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="h-11 rounded-xl border px-3 text-sm"/><input placeholder="Department" value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} className="h-11 rounded-xl border px-3 text-sm"/><input placeholder="Location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="h-11 rounded-xl border px-3 text-sm"/><input placeholder="Experience" value={form.experience} onChange={(event) => setForm({ ...form, experience: event.target.value })} className="h-11 rounded-xl border px-3 text-sm"/><input placeholder="Salary" value={form.salary} onChange={(event) => setForm({ ...form, salary: event.target.value })} className="h-11 rounded-xl border px-3 text-sm"/><select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="h-11 rounded-xl border px-3 text-sm"><option>Full Time</option><option>Part Time</option><option>Contract</option><option>Internship</option></select><textarea placeholder="Job description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-24 rounded-xl border p-3 text-sm sm:col-span-2"/><button className="h-11 rounded-xl bg-[#102A43] px-5 text-sm font-semibold text-white sm:col-span-2">Publish job</button></form>}

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]"><FiUsers size={20} /></div>
            <div><h2 className="font-bold text-[#102A43]">Received Applications</h2><p className="mt-0.5 text-sm text-gray-500">{loading ? "Loading received applications..." : `${applications.length} application${applications.length === 1 ? "" : "s"} received across all jobs.`}</p></div>
          </div>
          <Link to="/admin/job-applications" className="inline-flex h-10 items-center justify-center rounded-xl bg-[#102A43] px-4 text-sm font-semibold text-white hover:bg-[#0b243b]">Review applications</Link>
        </div>
      </section>

      {error && <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative max-w-lg">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={17}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Position
                </th>

                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Department
                </th>

                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Location
                </th>

                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Experience
                </th>

                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs uppercase text-gray-500">
                  Applications
                </th>

                <th className="px-5 py-4 text-right text-xs uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((job) => (
                <tr key={job.id || job._id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#E87524]">
                        <FiBriefcase />
                      </div>

                      <div>
                        <p className="font-semibold text-[#102A43]">
                          {job.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {job.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {job.department}
                  </td>

                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin className="text-[#E87524]" />
                      {job.location}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {job.experience}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        job.status === "open"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Link to="/admin/job-applications" className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-[#E87524] hover:bg-orange-100">
                      <FiUsers size={15} />
                      {applicationCount(job.id || job._id)} received
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-orange-50 hover:text-[#E87524]">
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() =>
                          deleteJob(job.id || job._id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
