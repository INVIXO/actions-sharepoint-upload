const SPFetchClient = require("@pnp/nodejs").SPFetchClient;
const sp = require("@pnp/sp").sp;
const path = require("path");
const fs = require("fs");
const glob = require("glob");

function checkEnv(name: string) {
  if (process.env[name] === undefined) {
    throw new Error("Set " + name);
  }
}

async function run() {
  checkEnv("INPUT_SITE_URL");
  checkEnv("INPUT_CLIENT_ID");
  checkEnv("INPUT_CLIENT_SECRET");
  checkEnv("INPUT_RELATIVE_URL");
  checkEnv("INPUT_GLOB");

  const cwd = process.env.GITHUB_WORKSPACE;
  console.log("CWD: " + cwd);
  console.log("Input SITE_URL: " + process.env.INPUT_SITE_URL);
  console.log("Input CLIENT_ID: " + process.env.INPUT_CLIENT_ID);
  console.log("Input RELATIVE_URL: " + process.env.INPUT_RELATIVE_URL);
  console.log("Input GLOB: " + process.env.INPUT_GLOB);

  sp.setup({
    sp: {
      fetchClientFactory: () => {
        return new SPFetchClient(
          process.env.INPUT_SITE_URL!,
          process.env.INPUT_CLIENT_ID!,
          process.env.INPUT_CLIENT_SECRET!);
      },
    },
  });

  const folder = sp.web.getFolderByServerRelativeUrl(process.env.INPUT_RELATIVE_URL!);

  const files = glob.sync(cwd + path.sep + process.env.INPUT_GLOB!, {nodir: true})
  console.dir(files);
  if (files.length === 0) {
    console.log("No files found found");
    process.exit(1);
  }
  for (const filename of files) {
    console.log("Uploading: " + path.basename(filename));
    const buf = fs.readFileSync(filename);
    await folder.files.add(path.basename(filename), buf, true);
  }
}

run().then(() => {
  process.exit();
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
