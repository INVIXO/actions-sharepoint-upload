import { SPFetchClient } from "@pnp/nodejs";
import { sp } from "@pnp/sp";
import * as path from "path";
import * as fs from "fs";

async function run() {
  console.dir(process.env);
  console.dir("hello world");
  return;

  if (process.env.SITE_URL === undefined) {
    throw new Error("Set SITE_URL");
  }

  const siteUrl = "site_url";

  sp.setup({
    sp: {
      fetchClientFactory: () => {
        return new SPFetchClient(siteUrl, "client_id", "client_secret");
      },
    },
  });

  const folder = await sp.web.getFolderByServerRelativeUrl("relative_url");

  const dir = __dirname + path.sep + ".." + path.sep + "glob" + path.sep;
  const files = fs.readdirSync(dir);
  for (const filename of files) {
    console.log("Uploading: " + filename);
    const buf = fs.readFileSync(dir + filename);
    await folder.files.add(filename, buf, true);
  }

}

run().then(() => {
  process.exit();
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
