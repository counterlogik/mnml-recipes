const args = ["watch"];
const opts = { stdio: "inherit", cwd: "client/src", shell: true };
require("child_process").spawn("yarn", args, opts);
