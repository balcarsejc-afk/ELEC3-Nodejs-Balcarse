// Full name: JC Argel Balcarse
// Section: IV-BSIT-A
// Activity: N3 - File Manager with fs and path
// Date: 2026-11-19

const fs = require('fs');
const path = require('path');
const filesFolder = path.join(__dirname, 'files');

// Gumawa ng storage folder kung wala pa.
if (!fs.existsSync(filesFolder)) fs.mkdirSync(filesFolder);

// First-run sample files: program mismo ang gagawa para may 3 files agad.
const starterFiles = {
  'snacks.txt': 'Mango and banana',
  'tasks.txt': 'Review JavaScript',
  'ideas.txt': 'Build a small website'
};
for (const [name, text] of Object.entries(starterFiles)) {
  const starterPath = path.join(filesFolder, name);
  if (!fs.existsSync(starterPath)) fs.writeFileSync(starterPath, text + '\\n', 'utf8');
}

// Pinapayagan lang ang simple file names para hindi makalabas sa files folder.
function getSafePath(fileName) {
  if (!fileName || path.basename(fileName) !== fileName) {
    throw new Error('File name lang ang ilagay; bawal ang folder path.');
  }
  return path.join(filesFolder, fileName);
}

const [command, fileName, ...textParts] = process.argv.slice(2);
const fullPath = fileName ? getSafePath(fileName) : null;
const content = textParts.join(' ');

try {
  if (command === 'create') {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Created:', fullPath);
  } else if (command === 'read') {
    console.log(fs.readFileSync(fullPath, 'utf8'));
  } else if (command === 'update') {
    fs.appendFileSync(fullPath, content + '\\n', 'utf8');
    console.log('Appended text to:', fullPath);
  } else if (command === 'delete') {
    fs.unlinkSync(fullPath);
    console.log('Deleted:', fullPath);
  } else if (command === 'list') {
    const names = fs.readdirSync(filesFolder);
    if (names.length === 0) console.log('Walang files sa folder.');
    names.forEach((name) => {
      const itemPath = path.join(filesFolder, name);
      if (fs.statSync(itemPath).isFile()) {
        console.log('Full path:', itemPath);
        console.log('File name:', path.basename(itemPath));
        console.log('Extension:', path.extname(itemPath) || '(none)');
        console.log('Contents:', fs.readFileSync(itemPath, 'utf8'));
        console.log('---');
      }
    });
  } else {
    console.log('Commands: create <file> <text> | read <file> | update <file> <text> | delete <file> | list');
    process.exitCode = 1;
  }
} catch (error) {
  if (error.code === 'ENOENT') console.log('File does not exist. Check the file name.');
  else console.log('File operation error:', error.message);
  process.exitCode = 1;
}
