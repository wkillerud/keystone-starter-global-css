const fs = require("fs/promises");
const glob = require("tiny-glob");

async function copyJokulStyles() {
  const cssFiles = await glob("node_modules/@fremtind/jkl-*/**/*.min.css");
  for (const file of cssFiles) {
    const fileName = file.substring(file.lastIndexOf("/"));
    const destination = `./public/static/jokul/${fileName}`;
    await fs.copyFile(file, destination);

    if (fileName.endsWith("webfonts.min.css")) {
      const content = await fs.readFile(destination, "utf-8");
      const newContent = content.replace(/\/fonts\//g, "/static/jokul/");
      await fs.writeFile(destination, newContent, "utf-8");
    }
  }
}

async function copyJokulFonts() {
  const files = await glob("node_modules/@fremtind/jkl-webfonts/fonts/*");
  for (const file of files) {
    const fileName = file.substring(file.lastIndexOf("/"));
    await fs.copyFile(file, `./public/static/jokul/${fileName}`);
  }
}

copyJokulStyles();
copyJokulFonts();

console.log("Copied Jøkul assets to /public/static/jokul/");
