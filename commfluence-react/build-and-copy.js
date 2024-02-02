const { execSync } = require('child_process');
const { copySync } = require('fs-extra');
const path = require('path');

const buildCommand = 'react-scripts build';
const targetDir = path.resolve(__dirname, '../commfluence/public');

// Run the build command
execSync(buildCommand, { stdio: 'inherit' });

// Copy build output to target directory
copySync(path.join(__dirname, 'build'), targetDir, { overwrite: true });

console.log('Build files copied to target directory.');
