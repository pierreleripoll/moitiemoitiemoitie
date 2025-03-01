import fs from "fs/promises";
import path from "path";

// Function to sanitize filenames
function sanitizeFilename(filename) {
  return filename
    .normalize("NFD") // Normalize to remove accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9._-]/g, ""); // Remove all unwanted characters except dots and hyphens
}

// Function to recursively scan directory and rename images
async function renameImagesInFolder(folderPath) {
  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(folderPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        await renameImagesInFolder(entryPath);
      } else {
        // Process files (only image types)
        const ext = path.extname(entry.name).toLowerCase();
        if (
          [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tiff"].includes(
            ext
          )
        ) {
          const sanitized = sanitizeFilename(entry.name);

          if (entry.name !== sanitized) {
            const newPath = path.join(folderPath, sanitized);

            try {
              await fs.rename(entryPath, newPath);
              console.log(`Renamed: ${entry.name} → ${sanitized}`);
            } catch (err) {
              console.error(`Error renaming ${entry.name}: ${err.message}`);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error reading folder ${folderPath}: ${err.message}`);
  }
}

// Set your target directory
const targetFolder = path.resolve("./public/uploads/"); // Change this path!

renameImagesInFolder(targetFolder).catch((err) => {
  console.error(`Error: ${err.message}`);
});
