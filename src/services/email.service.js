const nodemailer = require('nodemailer');
const moment = require('moment');
const dynamicTemplate = require('../template');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((err) =>{
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env')
      logger.info(err)
    });
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html, userFullName) => {
  const msg = {  subject, html, priority: 'high',
  from: config.email.from,
  to, 
  envelope: {
    from: 'Codespace aldipee.com <itsme@aldipee.com>',
    to: `${userFullName} <${to}>`,
  } 
};
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token, user) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${config.host}/api/v1/auth/verify-email?token=${token}`;
  const html = await dynamicTemplate.verifyEmailTemplate({
    username: user.name,
    dateJoin: user.createdAt ? moment(user.createdAt).format('DD MMMM YYYY') : moment().format('DD MMMM YYYY'),
    verifyLink: verificationEmailUrl,
  });

  await sendEmail(to, subject, html, user.name);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
