import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendConfirmationSMS = async (userDetails, date) => {
  try {
    const message = await client.messages.create({
      body: `Hi ${userDetails.name}, your booking for ${date} is confirmed.`,
      from: process.env.TWILIO_PHONE,
      to: userDetails.phone,
    });
    console.log('SMS sent:', message.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};
