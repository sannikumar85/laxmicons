const { sendMail } = require("../config/mail");

async function notifyUser({ user, subject, title, message, link }) {
  if (!user) return;
  const email = user.email || user;
  try {
    await sendMail({
      to: email,
      subject,
      text: `${title}\n\n${message}${link ? `\n\nOpen your dashboard: ${link}` : ""}`,
      html: `<h2>${title}</h2><p>${message}</p>${link ? `<p><a href="${link}">Open your dashboard</a></p>` : ""}`
    });
  } catch (error) {
    console.error("Workflow email failed:", error.message);
  }
}

module.exports = { notifyUser };