const { exec } = require("child_process");

module.exports.prettierFile = (filePath) => {
  exec(
    `${__dirname}/../../node_modules/prettier/bin-prettier.js --write ${filePath} --trailing-comma all`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        if (stderr.indexOf("[warn] ") > -1) return;
        console.log(stderr);
        return;
      }
      console.log(stdout);
    },
  );
};
