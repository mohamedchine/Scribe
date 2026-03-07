const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (userEmail, subject, htmlTemplate) => {
  try {
    await resend.emails.send({
      from: `Scribe Team`,
      to: userEmail,
      subject,
      html: htmlTemplate,
    });
  } catch (err) {
    console.error("couldn't send email", err);
    throw err;
  }
};

module.exports = sendEmail;