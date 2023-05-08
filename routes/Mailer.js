require("dotenv").config();
const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

router.post("/contactme", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: "tequetin9@gmail.com",
    subject: "New message from your website",
    text: `${name} (${email}) says: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "An error occurred while sending the message.",
      });
    } else {
      console.log(`Email sent: ${info.response}`);
      return res.status(200).json({
        message: "Mesage sent successfully.",
      });
    }
  });
});

module.exports = router;
