const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohitsurchavan4102@gmail.com", // Replace with your Gmail address
    pass: "xampacgkuwmcsnte", // Use an App Password instead of your Gmail password
  },
});

// Route to handle form submission
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const mailOptions = {
    from: email,
    to: "rohitsurchavan4102@gmail.com", // Your email to receive form submissions
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
    console.log("Email sent:", info.response);
    res.json({ success: true, message: "Message sent successfully!" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
