// Scans src/content for YAML files and writes their names to src/content/index.json

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../src/content');
const indexFile = path.join(contentDir, 'index.json');

fs.readdir(contentDir, (err, files) => {
  if (err) {
    console.error('Error reading content directory:', err);
    process.exit(1);
  }
  const yamlFiles = files.filter(
    (f) => f.endsWith('.yaml') || f.endsWith('.yml')
  );
  fs.writeFile(indexFile, JSON.stringify(yamlFiles, null, 2), (err) => {
    if (err) {
      console.error('Error writing index file:', err);
      process.exit(1);
    }
    console.log('Content index generated:', indexFile);
  });
});
