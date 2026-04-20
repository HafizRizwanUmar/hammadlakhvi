const nodemailer = require('nodemailer');
const Meta = require('../models/Meta');

/**
 * Utility to send emails using SMTP settings stored in the database.
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    // Fetch SMTP settings from Meta collection
    const emailSettings = await Meta.findOne({ key: 'email_config' });
    
    if (!emailSettings || !emailSettings.value || !emailSettings.value.email || !emailSettings.value.password) {
      console.warn('SMTP settings not configured. Skipping email.');
      return false;
    }

    const { email, password, host = 'smtp.gmail.com', port = 587 } = emailSettings.value;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user: email,
        pass: password, // App Password for Gmail
      },
    });

    const info = await transporter.sendMail({
      from: `"Dr. Hammad Lakhvi Website" <${email}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (err) {
    console.error('Email sending failed:', err);
    return false;
  }
};

module.exports = sendEmail;
