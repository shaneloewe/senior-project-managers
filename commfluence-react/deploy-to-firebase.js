const { execSync } = require('child_process');
const { copySync } = require('fs-extra'); // You might need to npm install fs-extra

const buildCommand = 'npm run build';
const firebasePublicDir = 'C:\\Users\\hubb2447\\Documents\\commfluence\\senior-project-managers\\commfluence\\public';

// Build the React app
execSync(buildCommand, { stdio: 'inherit' });

// Clear existing files in Firebase public directory
execSync(`rd /s /q "${firebasePublicDir}" && mkdir "${firebasePublicDir}"`);

// Copy build output to Firebase public directory
copySync('./build', firebasePublicDir, { overwrite: true });

console.log('Build files copied to Firebase public directory.');
