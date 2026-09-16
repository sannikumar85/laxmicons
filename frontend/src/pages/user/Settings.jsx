import React, { useState } from "react";
import {
  FiLock,
  FiBell,
  FiShield,
  FiSave,
} from "react-icons/fi";

const Settings = () => {
  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    projectUpdates: true,
    serviceUpdates: true,
    jobUpdates: true,
    emailNotifications: true,
  });

  const [saved, setSaved] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveSettings = (e) => {
    e.preventDefault();

    console.log({
      password,
      preferences,
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#E87524]">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
          Settings
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage security and notification preferences.
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
        {/* Password */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]">
              <FiLock />
            </div>

            <div>
              <h2 className="font-bold text-[#102A43]">
                Password & Security
              </h2>

              <p className="text-xs text-gray-500">
                Update your account password.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <Input
              label="Current Password"
              name="current"
              type="password"
              value={password.current}
              onChange={handlePasswordChange}
            />

            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={password.newPassword}
              onChange={handlePasswordChange}
            />

            <Input
              label="Confirm New Password"
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={handlePasswordChange}
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
                Choose which updates you want to receive.
              </p>
            </div>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            <Toggle
              label="Project Updates"
              description="Receive updates about your projects."
              checked={preferences.projectUpdates}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  projectUpdates:
                    !prev.projectUpdates,
                }))
              }
            />

            <Toggle
              label="Service Updates"
              description="Receive updates about your service requests."
              checked={preferences.serviceUpdates}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  serviceUpdates:
                    !prev.serviceUpdates,
                }))
              }
            />

            <Toggle
              label="Job Updates"
              description="Receive updates about your job applications."
              checked={preferences.jobUpdates}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  jobUpdates: !prev.jobUpdates,
                }))
              }
            />

            <Toggle
              label="Email Notifications"
              description="Receive important updates through email."
              checked={preferences.emailNotifications}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  emailNotifications:
                    !prev.emailNotifications,
                }))
              }
            />
          </div>
        </section>

        {/* Privacy */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]">
              <FiShield />
            </div>

            <div>
              <h2 className="font-bold text-[#102A43]">
                Privacy & Security
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your account information is used to provide project,
                service and communication features.
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex h-11 items-center gap-2 rounded-xl bg-[#E87524] px-6 text-sm font-semibold text-white hover:bg-[#d9681b]"
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
  name,
  type,
  value,
  onChange,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-[#E87524] focus:bg-white focus:ring-2 focus:ring-orange-100"
    />
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
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#E87524]" : "bg-gray-200"
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