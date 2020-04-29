import { SPFetchClient } from "@pnp/nodejs";
import { sp } from "@pnp/sp";
import * as path from "path";
import * as fs from "fs";
import * as glob from "glob";

function checkEnv(name: string) {
  if (process.env[name] === undefined) {
    throw new Error("Set " + name);
  }
}

async function run() {
  console.log("CWD: " + process.cwd());

  checkEnv("INPUT_SITE_URL");
  checkEnv("INPUT_CLIENT_ID");
  checkEnv("INPUT_CLIENT_SECRET");
  checkEnv("INPUT_RELATIVE_URL");
  checkEnv("INPUT_GLOB");

  console.dir(process.env.INPUT_SITE_URL);
  console.dir(process.env.INPUT_CLIENT_ID);
  console.dir(process.env.INPUT_CLIENT_SECRET);
  console.dir(process.env.INPUT_RELATIVE_URL);
  console.dir(process.env.INPUT_GLOB);

/*
  sp.setup({
    sp: {
      fetchClientFactory: () => {
        return new SPFetchClient(
          process.env.INPUT_SITE_URL,
          process.env.INPUT_CLIENT_ID,
          process.env.INPUT_CLIENT_SECRET);
      },
    },
  });

  const folder = await sp.web.getFolderByServerRelativeUrl(process.env.INPUT_RELATIVE_URL);
*/

  const files = glob.sync(process.env.INPUT_GLOB, {nodir: true})
  console.dir(files);
  for (const filename of files) {
    console.log("Uploading: " + filename);
    const buf = fs.readFileSync(process.cwd() + path.sep + filename);
//    await folder.files.add(filename, buf, true);
  }

}

run().then(() => {
  process.exit();
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
