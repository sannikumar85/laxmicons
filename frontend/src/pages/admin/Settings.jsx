import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiBell,
  FiSave,
} from "react-icons/fi";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@laxmiconstruction.com",
    phone: "9876543213",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    serviceRequests: true,
    jobApplications: true,
    contactMessages: true,
    projectUpdates: true,
  });

  const [saved, setSaved] = useState(false);

  const updateProfile = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updatePassword = (e) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveSettings = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);

    console.log({
      profile,
      password,
      notifications,
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#E87524]">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
          Settings
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your admin account and notification preferences.
        </p>
      </div>

      {saved && (
        <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          Settings saved successfully.
        </div>
      )}

      <form
        onSubmit={saveSettings}
        className="space-y-6"
      >
        {/* Profile */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]">
              <FiUser />
            </div>

            <div>
              <h2 className="font-bold text-[#102A43]">
                Admin Profile
              </h2>

              <p className="text-xs text-gray-500">
                Update your basic account information.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Input
              label="Name"
              icon={<FiUser />}
              name="name"
              value={profile.name}
              onChange={updateProfile}
            />

            <Input
              label="Email"
              icon={<FiMail />}
              name="email"
              type="email"
              value={profile.email}
              onChange={updateProfile}
            />

            <Input
              label="Phone"
              icon={<FiPhone />}
              name="phone"
              value={profile.phone}
              onChange={updateProfile}
            />
          </div>
        </section>

        {/* Password */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]">
              <FiLock />
            </div>

            <div>
              <h2 className="font-bold text-[#102A43]">
                Change Password
              </h2>

              <p className="text-xs text-gray-500">
                Keep your admin account secure.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <Input
              label="Current Password"
              icon={<FiLock />}
              name="current"
              type="password"
              value={password.current}
              onChange={updatePassword}
            />

            <Input
              label="New Password"
              icon={<FiLock />}
              name="newPassword"
              type="password"
              value={password.newPassword}
              onChange={updatePassword}
            />

            <Input
              label="Confirm New Password"
              icon={<FiLock />}
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={updatePassword}
            />
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]">
              <FiBell />
            </div>

            <div>
              <h2 className="font-bold text-[#102A43]">
                Notifications
              </h2>

              <p className="text-xs text-gray-500">
                Choose which admin notifications you want.
              </p>
            </div>
          </div>

          <div className="mt-5 divide-y divide-gray-100">
            <Toggle
              label="Service Requests"
              description="Get notified about new service requests."
              checked={notifications.serviceRequests}
              onChange={() =>
                setNotifications((prev) => ({
                  ...prev,
                  serviceRequests:
                    !prev.serviceRequests,
                }))
              }
            />

            <Toggle
              label="Job Applications"
              description="Get notified when candidates apply."
              checked={notifications.jobApplications}
              onChange={() =>
                setNotifications((prev) => ({
                  ...prev,
                  jobApplications:
                    !prev.jobApplications,
                }))
              }
            />

            <Toggle
              label="Contact Messages"
              description="Get notified about new messages."
              checked={notifications.contactMessages}
              onChange={() =>
                setNotifications((prev) => ({
                  ...prev,
                  contactMessages:
                    !prev.contactMessages,
                }))
              }
            />

            <Toggle
              label="Project Updates"
              description="Receive important project updates."
              checked={notifications.projectUpdates}
              onChange={() =>
                setNotifications((prev) => ({
                  ...prev,
                  projectUpdates:
                    !prev.projectUpdates,
                }))
              }
            />
          </div>
        </section>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex h-12 items-center gap-2 rounded-xl bg-[#E87524] px-7 text-sm font-semibold text-white shadow-sm hover:bg-[#d9681b] hover:shadow-md"
          >
            <FiSave />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({
  label,
  icon,
  name,
  type = "text",
  value,
  onChange,
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

const Toggle = ({
  label,
  description,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between gap-5 py-4">
    <div>
      <p className="text-sm font-semibold text-gray-700">
        {label}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>
    </div>

    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked
          ? "bg-[#E87524]"
          : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked
            ? "translate-x-6"
            : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

export default Settings;