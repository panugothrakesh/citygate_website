import nodemailer from 'nodemailer';

export const sendBookingEmail = async (userDetails, startDate, endDate) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userDetails.email,
    subject: 'Booking Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Booking Confirmation</h2>
        <p style="font-size: 16px; color: #555;">
          Hi <strong>${userDetails.name}</strong>,
        </p>
        <p style="font-size: 16px; color: #555;">
          Your booking for <strong>${startDate} to ${endDate}</strong> has been confirmed. We're excited to have you on board!
        </p>
        <div style="margin: 20px 0; text-align: center;">
          <a 
            href="https://citygateadventure.com" 
            style="text-decoration: none; padding: 10px 20px; background-color: #4caf50; color: white; border-radius: 5px; font-size: 16px;">
            Visit Our Website
          </a>
        </div>
        <p style="font-size: 14px; color: #777; text-align: center;">
          If you have any questions, feel free to contact us at <a href="mailto:citygateadventure@gmail.com">citygateadventure@gmail.com</a>.
        </p>
        <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
          &copy; ${new Date().getFullYear()} Citygate Adventure. All rights reserved.
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
