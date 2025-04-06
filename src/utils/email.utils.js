import Mailgen from "mailgen";
import nodemailer from "nodemailer";

export const sendEmail = async (option) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      // Appears in header & footer of e-mails
      name: 'Task manager',
      link: 'https://mailgen.js/'
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    }
  });

  // Generate an HTML email with the provided contents
  var emailBody = mailGenerator.generate(option.mailGenContent);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  var emailText = mailGenerator.generatePlaintext(option.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    },
  });


  const mailOptions = {
    from: process.env.MAILTRAP_USER,
    to: option.email,
    subject: option.subject,
    html: emailBody,
    text: emailText
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }

}

export const emailVerificationMailGenContent = (username, verficationUrl) => {
  return {
    body: {
      name: username,
      intro: 'Please click the button below to verify your email address:',
      action: {
        instructions: 'To verify your email address, click the button below:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Verify Email Address',
          link: verficationUrl
        }
      },
      outro: 'If you did not request this, you can safely ignore this email.'
    }
  }
}


export const resetPasswordMailGenContent = (username, resetPasswordUrl) => {
  return {
    body: {
      name: username,
      intro: 'Please click the button below to reset your password:',
      action: {
        instructions: 'To reset your password, click the button below:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Reset Password',
          link: resetPasswordUrl
        }
      },
      outro: 'If you did not request this, you can safely ignore this email.'
    }
  }
}


// sendEmail({
//   email: user.email,
//   subject: 'Email Verification',
//   mailGenContent: emailVerificationMailGenContent('username', 'http://localhost:3000/verify-email')
// })