const fs = require('fs-extra');
const path = require('path');

async function copyBuildFiles() {
  try {
    const clientBuildPath = path.join(__dirname, 'client', 'build');
    const serverPublicPath = path.join(__dirname, 'server', 'public');
    
    await fs.ensureDir(serverPublicPath);
    await fs.copy(clientBuildPath, serverPublicPath);
    console.log('React build copied to server public directory');
  } catch (error) {
    console.error('Error copying build files:', error);
    process.exit(1);
  }
}

copyBuildFiles();