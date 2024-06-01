const nodemailer = require("nodemailer");

const sendBookingConfirmationEmail = async (userEmail, busDetails) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "ankitsharmagh093@gmail.com",
      pass: "L74gC2kUt6Drhmds",
    },
  });

  const mailOptions = {
    from: "ankitsharmagh093@gmail.com",
    to: userEmail,
    subject: "Bus Booking Confirmation",
    text: `Dear customer, your booking for the bus ${busDetails} has been confirmed.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = {
  sendBookingConfirmationEmail,
};
