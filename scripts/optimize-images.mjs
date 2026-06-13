/**
 * One-off image optimizer: converts heavy PNGs to resized WebP.
 * Usage: node scripts/optimize-images.mjs
 * Originals are deleted after successful conversion (recoverable via git).
 */
import sharp from 'sharp';
import { glob } from 'node:fs/promises';
import { stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const TARGETS = [
    // Gallery covers — cards render ~600px wide, 1200 covers retina + future hero use
    { pattern: 'public/PortadasProjects/*.png', maxWidth: 1200, quality: 80 },
    // Before/after restoration pairs — image quality is the point of the project
    { pattern: 'public/Project_AI_WorkFlow/antes_*.png', maxWidth: 1600, quality: 82 },
    { pattern: 'public/Project_AI_WorkFlow/despues_*.png', maxWidth: 1600, quality: 82 },
    // ComfyUI node graph — needs to stay readable when opened full size
    { pattern: 'public/Project_AI_WorkFlow/preview.png', maxWidth: 2400, quality: 80 },
    // Imported via Vite in project/formation pages
    { pattern: 'src/resources/projects/Project_AntigravityEDOs/antigravity_*.png', maxWidth: 1400, quality: 82 },
    { pattern: 'src/resources/projects/Project_AntigravityEDOs/architecture_diagram.png', maxWidth: 1400, quality: 82 },
    { pattern: 'src/resources/projects/Project4/grafica_*.png', maxWidth: 1400, quality: 82 },
    { pattern: 'src/resources/projects/Project4/inves.png', maxWidth: 1600, quality: 82 },
    { pattern: 'src/resources/Page_CertificationsAssets/DevConIA.png', maxWidth: 1400, quality: 82 },
    { pattern: 'src/resources/Page_CertificationsAssets/Batiz.png', maxWidth: 1000, quality: 82 },
    { pattern: 'src/resources/Page_CertificationsAssets/Project Managment & Agile Fundamentals.png', maxWidth: 1000, quality: 82 },
];

const fmt = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

let totalBefore = 0;
let totalAfter = 0;

for (const { pattern, maxWidth, quality } of TARGETS) {
    for await (const file of glob(pattern)) {
        const out = file.replace(/\.png$/i, '.webp');
        const before = (await stat(file)).size;
        await sharp(file)
            .resize({ width: maxWidth, withoutEnlargement: true })
            .webp({ quality })
            .toFile(out);
        const after = (await stat(out)).size;
        totalBefore += before;
        totalAfter += after;
        await unlink(file);
        console.log(`${path.basename(file)}  ${fmt(before)} -> ${fmt(after)}`);
    }
}

console.log(`\nTOTAL: ${fmt(totalBefore)} -> ${fmt(totalAfter)} (${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}% smaller)`);
