const fs = require('fs');
const path = require('path');

function copyBuildFiles() {
  try {
    const clientBuildPath = path.join(__dirname, 'client', 'build');
    const serverPublicPath = path.join(__dirname, 'server', 'public');
    
    if (!fs.existsSync(serverPublicPath)) {
      fs.mkdirSync(serverPublicPath, { recursive: true });
    }
    
    const copyRecursive = (src, dest) => {
      const stats = fs.statSync(src);
      if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(child => {
          copyRecursive(path.join(src, child), path.join(dest, child));
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };
    
    copyRecursive(clientBuildPath, serverPublicPath);
    console.log('React build copied to server public directory');
  } catch (error) {
    console.error('Error copying build files:', error);
    process.exit(1);
  }
}

copyBuildFiles();