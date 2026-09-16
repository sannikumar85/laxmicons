// ========================================
// DATE OBJECT
// ========================================

const toDate = (date) => {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};


// ========================================
// FORMAT DATE
// Example: 18 Sep 2026
// ========================================

export const formatDate = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(parsedDate);
};


// ========================================
// LONG DATE
// Example: 18 September 2026
// ========================================

export const formatLongDate = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(parsedDate);
};


// ========================================
// DATE + TIME
// Example: 18 Sep 2026, 10:30 AM
// ========================================

export const formatDateTime = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  ).format(parsedDate);
};


// ========================================
// TIME ONLY
// ========================================

export const formatTime = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  ).format(parsedDate);
};


// ========================================
// INPUT DATE FORMAT
// Example: 2026-09-18
// ========================================

export const formatDateForInput = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "";
  }

  const year =
    parsedDate.getFullYear();

  const month = String(
    parsedDate.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    parsedDate.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


// ========================================
// TODAY
// ========================================

export const getToday = () => {
  return formatDateForInput(
    new Date()
  );
};


// ========================================
// RELATIVE TIME
// Example:
// 5 minutes ago
// 2 hours ago
// Yesterday
// ========================================

export const getRelativeTime = (
  date
) => {
  const parsedDate = toDate(date);

  if (!parsedDate) {
    return "—";
  }

  const now = new Date();

  const difference =
    now.getTime() -
    parsedDate.getTime();

  const seconds = Math.floor(
    difference / 1000
  );

  const minutes = Math.floor(
    seconds / 60
  );

  const hours = Math.floor(
    minutes / 60
  );

  const days = Math.floor(
    hours / 24
  );

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ago`;
  }

  if (hours < 24) {
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return formatDate(parsedDate);
};


// ========================================
// DATE RANGE
// ========================================

export const formatDateRange = (
  startDate,
  endDate
) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (start === "—" && end === "—") {
    return "—";
  }

  if (end === "—") {
    return start;
  }

  if (start === "—") {
    return end;
  }

  return `${start} - ${end}`;
};