const fs = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function runZip({ cwd, outPath }) {
  return new Promise((resolve, reject) => {
    const args = ["-r", outPath, ".", "-x", ".DS_Store"];
    const child = spawn("zip", args, { cwd, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`zip exited with code ${code}`));
    });
  });
}

async function pack(browser) {
  const root = path.resolve(__dirname, "..");
  const distDir = path.join(root, "dist", browser);
  const artifactsDir = path.join(root, "dist", "artifacts", browser);

  if (!(await exists(distDir))) {
    throw new Error(`Missing ${distDir}. Run \"npm run build\" first.`);
  }

  await fs.mkdir(artifactsDir, { recursive: true });
  const outName = `${browser}-extension.zip`;
  const outPath = path.join(artifactsDir, outName);

  await runZip({ cwd: distDir, outPath });
  console.log(`Packed ${browser} -> ${path.relative(root, outPath)}`);
}

const browser = process.argv[2];
if (!browser || (browser !== "chrome" && browser !== "firefox")) {
  console.error("Usage: node scripts/pack.js <chrome|firefox>");
  process.exit(1);
}

pack(browser).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
