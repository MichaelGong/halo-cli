const fs = require('fs-plus');
const path = require('path');

module.exports = function(templateJson, relativePath = '../projecttemplate.json') {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, relativePath),
      JSON.stringify(templateJson, null, 2),
      function(err) {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};
