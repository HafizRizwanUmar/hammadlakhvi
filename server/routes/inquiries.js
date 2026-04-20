const router = require('express').Router();
const Inquiry = require('../models/Inquiry');
const Meta = require('../models/Meta');
const sendEmail = require('../utils/mailer');
const auth = require('../middleware/auth');

/**
 * Public: Submit a new inquiry
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // 1. Save to Database
    const newInquiry = new Inquiry({ name, email, subject, message });
    await newInquiry.save();

    // 2. Fetch Admin settings for notification email
    const emailSettings = await Meta.findOne({ key: 'email_config' });
    const adminEmail = emailSettings?.value?.email;

    // 3. Send Notification to Admin
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `New Inquiry: ${subject}`,
        html: `
          <h3>New Website Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr />
          <p>Sent from Dr. Hammad Lakhvi Website</p>
        `
      });
    }

    // 4. Send Confirmation to User
    await sendEmail({
      to: email,
      subject: 'Thank you for your message - Dr. Hammad Lakhvi',
      html: `
        <h3>Message Received</h3>
        <p>Dear ${name},</p>
        <p>JazakAllahu Khayran for reaching out. We have received your message regarding "${subject}" and will get back to you as soon as possible, Insha'Allah.</p>
        <br />
        <p>Best regards,<br />Office of Dr. Hammad Lakhvi</p>
      `
    });

    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (err) {
    console.error('Inquiry submission error:', err);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

/**
 * Admin: Get all inquiries
 */
router.get('/', auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Admin: Mark as read/unread
 */
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Admin: Delete inquiry
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
