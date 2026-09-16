import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiUser,
  FiMapPin,
  FiPhone,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

const Labour = () => {
  const [search, setSearch] = useState("");

  const [labour, setLabour] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      skill: "Mason",
      experience: "8 Years",
      location: "Muzaffarpur",
      phone: "9876543201",
      availability: "Available",
    },
    {
      id: 2,
      name: "Suresh Yadav",
      skill: "Electrician",
      experience: "6 Years",
      location: "Patna",
      phone: "9876543202",
      availability: "Available",
    },
    {
      id: 3,
      name: "Raj Kumar",
      skill: "Painter",
      experience: "5 Years",
      location: "Muzaffarpur",
      phone: "9876543203",
      availability: "Busy",
    },
  ]);

  const filtered = useMemo(() => {
    return labour.filter(
      (person) =>
        person.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        person.skill
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        person.location
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [labour, search]);

  const deleteLabour = (id) => {
    if (!window.confirm("Delete this labour profile?"))
      return;

    setLabour((prev) =>
      prev.filter((person) => person.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#E87524]">
            Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
            Labour Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage available labour and skilled workers.
          </p>
        </div>

        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E87524] px-5 text-sm font-semibold text-white hover:bg-[#d9681b]">
          <FiPlus />
          Add Labour
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative max-w-lg">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={17}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search labour..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((person) => (
          <div
            key={person.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#E87524]">
                  <FiUser size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-[#102A43]">
                    {person.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {person.skill}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  person.availability === "Available"
                    ? "bg-green-50 text-green-700"
                    : "bg-orange-50 text-orange-700"
                }`}
              >
                {person.availability}
              </span>
            </div>

            <div className="mt-5 space-y-3 border-t pt-4">
              <Info
                icon={<FiMapPin />}
                text={person.location}
              />

              <Info
                icon={<FiPhone />}
                text={person.phone}
              />

              <Info
                icon={<FiUser />}
                text={`${person.experience} experience`}
              />
            </div>

            <div className="mt-5 flex gap-2">
              <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-orange-50 hover:text-[#E87524]">
                <FiEdit2 />
                Edit
              </button>

              <button
                onClick={() =>
                  deleteLabour(person.id)
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Info = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-sm text-gray-600">
    <span className="text-[#E87524]">{icon}</span>
    {text}
  </div>
);

export default Labour;