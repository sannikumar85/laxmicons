import React, { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiMail,
  FiPhone,
  FiTrash2,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import adminService from "../../services/adminService";

const ContactMessages = () => {
  const [search, setSearch] = useState("");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadMessages = async () => {
    setLoading(true);
    try { const response = await adminService.getContactMessages(); setMessages(response?.data?.messages || []); setError(""); }
    catch (requestError) { setError(requestError.message || "Unable to load messages."); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadMessages(); }, []);

  const filtered = useMemo(() => {
    return messages.filter(
      (message) =>
        message.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        message.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        message.subject
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [messages, search]);

  const markRead = (id) => {
    adminService.markContactMessageRead(id).then(loadMessages).catch((requestError) => setError(requestError.message));
  };

  const deleteMessage = (id) => {
    if (!window.confirm("Delete this message?"))
      return;

    adminService.deleteContactMessage(id).then(loadMessages).catch((requestError) => setError(requestError.message));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#E87524]">
          Communication
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#102A43]">
          Contact Messages
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage messages received through the contact form.
        </p>
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
            placeholder="Search messages..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-[#E87524] focus:bg-white"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((message) => (
          <div
            key={message.id || message._id}
            className={`rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${
              message.status === "unread"
                ? "border-orange-100"
                : "border-gray-100"
            }`}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#E87524]">
                  <FiMail />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[#102A43]">
                      {message.subject}
                    </h3>

                    {message.status === "unread" ? (
                      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-[#E87524]">
                        New
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
                        Read
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    {message.name}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-4 text-xs text-gray-400">
                    <span>{message.email}</span>
                    <span>{message.phone}</span>
                    <span>{message.createdAt ? new Date(message.createdAt).toLocaleDateString("en-IN") : "Recently"}</span>
                  </div>

                  <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">
                      {message.message || "No message content available."}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 lg:flex-col lg:items-stretch">
                {message.status === "unread" && (
                  <button
                    type="button"
                    onClick={() =>
                        markRead(message.id || message._id)
                    }
                    className="flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-600 hover:bg-green-50 hover:text-green-700"
                  >
                    <FiCheckCircle />
                    Mark Read
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    deleteMessage(message.id || message._id)
                  }
                  className="flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {loading && <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500">Loading messages...</div>}
        {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
        {!loading && !filtered.length && (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500">
            No messages found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;