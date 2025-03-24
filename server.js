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
// require("dotenv").config(); // Load environment variables from .env file
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ Secure CORS - Replace with your actual frontend URL
// const corsOptions = {
//   origin: "https://mirohit.github.io", // Allow only your site
//   methods: ["POST"],
//   allowedHeaders: ["Content-Type"],
// };
// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// // ✅ Use environment variables for security
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Store in .env
//     pass: process.env.EMAIL_PASS, // Store in .env (App Password)
//   },
// });

// // ✅ Contact Form Route
// app.post("/send", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required!" });
//     }

//     const mailOptions = {
//       from: `"${name}" <${process.env.EMAIL_USER}>`, // Prevents spoofing
//       to: process.env.EMAIL_USER, // Your email
//       subject: "New Contact Form Submission",
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent:", info.response);

//     res.json({ success: true, message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("❌ Email error:", error);
//     res.status(500).json({ error: "Failed to send email. Please try again." });
//   }
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
