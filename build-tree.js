// build-tree.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'files'); // Adjust if needed
const OUTPUT = path.join(__dirname, 'tree.json');

function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.map(entry => {
    const relPath = path.join(base, entry.name);
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return {
        name: entry.name,
        children: walk(fullPath, relPath)
      };
    } else {
      return {
        name: entry.name,
        path: relPath.replace(/\\/g, '/') // normalize Windows paths
      };
    }
  });
}

const tree = walk(ROOT);
fs.writeFileSync(OUTPUT, JSON.stringify(tree, null, 2));
console.log('✅ tree.json generated');
