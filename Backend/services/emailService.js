const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_KEY);

exports.sendWelcome = async (email)=>{

  await resend.emails.send({
    from: "AI Platform <onboarding@yourdomain.com>",
    to: email,
    subject: "Welcome — Your AI Is Ready",
    html: "<h2>Your AI dashboard is live</h2>"
  });
};
