import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import imageSize from "image-size";

// Adjust this path to point to your spectacles markdown folder
const spectaclesDir = path.resolve("content/spectacles");
const collectifFile = path.resolve("content/collectif.md");
// Helper to determine the image file path. Assuming images with leading "/" are in public/
function getImagePath(src) {
  if (src.startsWith("/")) {
    return path.join(process.cwd(), "public", src);
  }
  // Else assume relative to the current markdown file folder
  return path.join(spectaclesDir, src);
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
      updateImageDimensionsForPath(filePath, file);
    }
  }
  console.log(collectifFile);
  await updateImageDimensionsForPath(collectifFile, collectifFile);
}

updateImageDimensions().catch((err) => {
  console.error(err);
});
