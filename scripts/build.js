const fs = require("fs/promises");
const path = require("path");

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(from, to);
    } else if (entry.isFile()) {
      await fs.copyFile(from, to);
    }
  }
}

async function applyManifestMetadata(manifestPath, pkg) {
  const raw = await fs.readFile(manifestPath, "utf8");
  const manifest = JSON.parse(raw);

  if (pkg.displayName) manifest.name = pkg.displayName;
  else if (pkg.name) manifest.name = pkg.name;
  if (pkg.description) manifest.description = pkg.description;
  if (pkg.version) manifest.version = pkg.version;

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
}

async function build() {
  const root = path.resolve(__dirname, "..");
  const distDir = path.join(root, "dist");
  const coreDir = path.join(root, "packages", "extension-core");
  const browsers = ["chrome", "firefox"];
  const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));

  for (const browser of browsers) {
    const browserDir = path.join(root, "packages", browser);
    const outDir = path.join(distDir, browser);

    await fs.rm(outDir, { recursive: true, force: true });
    await copyDir(coreDir, outDir);
    await copyDir(browserDir, outDir);

    await applyManifestMetadata(path.join(outDir, "manifest.json"), pkg);
    console.log(`Built ${browser} -> ${path.relative(root, outDir)}`);
  }
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
