const transporter = require("./nodemailconfig");
require("dotenv").config();

async function notifyAdminAboutRestaurantChange(user, action, details) {
  try {
    const adminEmail = process.env.EMAIL;

    const userName = user ? user.username : "Anonymous User";
    const userEmail = user ? user.email : "N/A";

    const mailOptions = {
      from: adminEmail,
      to: adminEmail,
      subject: `SR ${action} Notification`,
      text:
        `User ${userName} (${userEmail}) has requested to ${action.toLowerCase()}.\nDetails:\n` +
        `English Name: ${details.englishName}\n` +
        `Address: ${details.address}\n` +
        `Phone Number: ${details.phoneNumber}\n` +
        `Rating: ${details.rating}\n` +
        `Reason: ${details.reason}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to admin successfully.");
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
}

module.exports = { notifyAdminAboutRestaurantChange };
