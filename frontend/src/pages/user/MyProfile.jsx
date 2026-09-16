import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCamera,
  FiSave,
} from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

const MyProfile = () => {
  const { user } = useAuth();
  const { profile, updateProfile, loading } = useUser();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    city: profile?.city || "",
    state: profile?.state || "",
    bio: profile?.bio || "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateProfile(formData);

    if (result?.success) {
      setMessage("Profile updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 2500);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#E87524]">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your personal information.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      >
        {/* Profile Header */}
        <div className="bg-[#102A43] p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-white ring-4 ring-white/10">
                <FiUser size={36} />
              </div>

              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#E87524] text-white shadow-md"
              >
                <FiCamera size={14} />
              </button>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white">
                {user?.name || "User"}
              </h2>

              <p className="mt-1 text-sm text-white/60">
                {user?.email || "user@example.com"}
              </p>

              <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                Customer
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              icon={<FiUser />}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              icon={<FiMail />}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              icon={<FiPhone />}
            />

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              icon={<FiMapPin />}
            />

            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              icon={<FiMapPin />}
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Enter your address"
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              About You
            </label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us something about yourself..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 items-center gap-2 rounded-xl bg-[#E87524] px-6 text-sm font-semibold text-white transition hover:bg-[#d9681b] disabled:opacity-60"
            >
              <FiSave />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
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
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
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
        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-orange-100"
      />
    </div>
  </div>
);

export default MyProfile;