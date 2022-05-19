const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function (pathName, callback) {
  fs.readFile(pathName, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

const verifyEmailTemplate = (parameters) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line prefer-template
    readHTMLFile(`${path.join()}/src/template/mail/verifyEmail.html`, function (err, html) {
      const template = handlebars.compile(html);
      if (err) reject(err);
      const htmlToSend = template(parameters);
      resolve(htmlToSend);
    });
  });
};

module.exports.verifyEmailTemplate = verifyEmailTemplate;
