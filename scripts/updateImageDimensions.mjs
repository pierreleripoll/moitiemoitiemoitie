import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import imageSize from "image-size";

const spectaclesDir = path.resolve("content/spectacles");
const collectifFile = path.resolve("content/collectif.md");

function getImagePath(src) {
  if (src.startsWith("/")) {
    return path.join(process.cwd(), "public", src);
  }
  return path.join(spectaclesDir, src);
}

function sanitizeFilename(filename) {
  return filename
    .normalize("NFD") // Normalize to decompose accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/\s+/g, "_") // Replace all spaces with underscores
    .replace(/[^a-zA-Z0-9._-]/g, ""); // Remove all unwanted characters except dots and hyphens
}

async function updateImageDimensionsForPath(filePath, file) {
  const content = await fs.readFile(filePath, "utf8");
  const parsed = matter(content);
  let changed = false;

  if (Array.isArray(parsed.data.images)) {
    for (let image of parsed.data.images) {
      if (!image.width || !image.height) {
        const imgPath = getImagePath(image.src);
        try {
          const dimensions = imageSize(imgPath);
          image.width = dimensions.width;
          image.height = dimensions.height;
          changed = true;
        } catch (err) {
          console.error(
            `Error reading image ${image.src} in ${file}: ${err.message}`
          );
        }
      }

      if (image.src) {
        const oldPath = getImagePath(image.src);
        const filename = path.basename(image.src);
        const cleanFilename = sanitizeFilename(filename);

        if (filename !== cleanFilename) {
          console.log(
            "Not valid :",
            filename,
            "new file name :",
            cleanFilename
          );
          const newPath = path.join(path.dirname(oldPath), cleanFilename);
          image.src = image.src.replace(filename, cleanFilename);
          changed = true;
          try {
            await fs.rename(oldPath, newPath);
            console.log(`Renamed ${filename} -> ${cleanFilename}`);
          } catch (err) {
            console.error(`Error renaming file ${filename}: ${err.message}`);
          }
        }
      }
    }
  }

  if (changed) {
    const newContent = matter.stringify(parsed.content, parsed.data);
    await fs.writeFile(filePath, newContent, "utf8");
    console.log(`Updated ${file}`);
  }
}

async function updateImageDimensions() {
  const files = await fs.readdir(spectaclesDir);
  for (const file of files) {
    if (file.endsWith(".md")) {
      const filePath = path.join(spectaclesDir, file);
      await updateImageDimensionsForPath(filePath, file);
    }
  }
  await updateImageDimensionsForPath(collectifFile, "collectif.md");
}

updateImageDimensions().catch((err) => {
  console.error(err);
});
