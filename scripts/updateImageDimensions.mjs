import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import imageSize from "image-size";
import * as thumbhash from "thumbhash";
import sharp from "sharp";

const spectaclesDir = path.resolve("content/spectacles");
const collectifFile = path.resolve("content/collectif.md");

function getImagePath(src) {
  if (src.startsWith("/")) {
    return path.join(process.cwd(), "public", src);
  }
  return path.join(spectaclesDir, src);
}

async function generateThumbhash(imagePath) {
  try {
    const imageBuffer = await sharp(imagePath).resize(100).toBuffer();

    // Extract RGB and alpha data from the image
    const { data: imageData, info } = await sharp(imageBuffer)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    // Create thumbhash
    const hash = thumbhash.rgbaToThumbHash(info.width, info.height, imageData);
    console.log(`Thumbhash ${imagePath}`);
    console.log(info.width, info.height, info.width / info.height, hash);
    // Return as base64 string for storage in markdown
    return {
      hash: Buffer.from(hash).toString("base64"),
      ratio: info.width / info.height,
    };
  } catch (err) {
    console.error(`Error generating thumbhash: ${err.message}`);
    return null;
  }
}

async function updateImageDimensionsForPath(filePath, file) {
  const content = await fs.readFile(filePath, "utf8");
  const parsed = matter(content);
  let changed = false;

  if (Array.isArray(parsed.data.images)) {
    for (let image of parsed.data.images) {
      const imgPath = getImagePath(image.src);
      let updateNeeded = false;

      // Check if dimensions need to be updated
      if (true || !image.width || !image.height) {
        try {
          const dimensions = imageSize(imgPath);
          image.width = dimensions.width;
          image.height = dimensions.height;
          image.ratio = dimensions.width / dimensions.height;
          updateNeeded = true;
          // console.log(`Updated dimensions for ${image.src} in ${file}`);
          console.log(
            dimensions.width,
            dimensions.height,
            dimensions.width / dimensions.height
          );
          changed = true;
        } catch (err) {
          console.error(
            `Error reading image dimensions ${image.src} in ${file}: ${err.message}`
          );
        }
      }

      // Check if thumbhash needs to be generated
      if (true || !image.thumbhash) {
        try {
          const { hash, ratio } = await generateThumbhash(imgPath);
          if (hash) {
            image.thumbhash = hash;
            updateNeeded = true;
            changed = true;
          }
        } catch (err) {
          console.error(
            `Error generating thumbhash for ${image.src} in ${file}: ${err.message}`
          );
        }
      }

      if (updateNeeded) {
        console.log(`Updated info for ${image.src} in ${file}`);
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
