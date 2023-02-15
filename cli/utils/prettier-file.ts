import { StdioPipe } from "child_process";

const { exec } = require("child_process");

export const prettierFile = (filePath: string) => {
  exec(
    `${__dirname}/../../node_modules/prettier/bin-prettier.js --write ${filePath} --trailing-comma all`,
    (error: Error, stdout: StdioPipe, stderr: StdioPipe) => {
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
