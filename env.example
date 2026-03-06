// Build step for Vercel "Output Directory: public"
// Copies all static files/folders into ./public so Vercel can serve them.
// Serverless functions under /api remain in project root and continue to work.
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public");

const COPY_ITEMS = [
  "assets",
  "demo",
  "index.html",
  "create.html",
  "templates.html",
  "builder.html",
  "slug.html",
  "vercel.json" // optional; harmless to keep a copy
];

function rmrf(p){
  if(!fs.existsSync(p)) return;
  fs.rmSync(p, { recursive: true, force: true });
}

function mkdirp(p){
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dst){
  mkdirp(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function copyDir(src, dst){
  mkdirp(dst);
  for(const ent of fs.readdirSync(src, { withFileTypes: true })){
    const s = path.join(src, ent.name);
    const d = path.join(dst, ent.name);
    if(ent.isDirectory()) copyDir(s, d);
    else if(ent.isFile()) copyFile(s, d);
  }
}

function exists(p){ return fs.existsSync(path.join(ROOT, p)); }

function main(){
  rmrf(OUT);
  mkdirp(OUT);

  for(const item of COPY_ITEMS){
    const src = path.join(ROOT, item);
    const dst = path.join(OUT, item);
    if(!fs.existsSync(src)) continue;

    const stat = fs.statSync(src);
    if(stat.isDirectory()) copyDir(src, dst);
    else copyFile(src, dst);
  }

  // Also copy any root-level static files if you later add them:
  // e.g. robots.txt, sitemap.xml, favicon.ico, etc.
  const extra = ["robots.txt","sitemap.xml","favicon.ico","favicon.png","manifest.json"];
  for(const item of extra){
    const src = path.join(ROOT, item);
    const dst = path.join(OUT, item);
    if(fs.existsSync(src) && fs.statSync(src).isFile()) copyFile(src, dst);
  }

  console.log("✅ Build complete. Static files copied to /public");
}

main();
