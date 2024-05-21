// scripts/generate-hashed-urls.js for service worker
const fs = require('fs');
const path = require('path');

// Function to read hashed filenames from a directory

const getHashedFilename = (directory) => {
    const files = fs.readdirSync(directory);
    
    const hashedFile = files.find(file => file.startsWith('main.') && file.endsWith('.css')) ||  files.find(file => file.startsWith('main.') && file.endsWith('.js')) ; 
    
    
    // Update for JS files if needed
    return  hashedFile
  };


 
  // Read hashed CSS and JS filenames
  const hashedCssPath = getHashedFilename(path.join(process.cwd(), '/build/static/css/'));
  const hashedJsPath = getHashedFilename(path.join(process.cwd(), '/build/static/js/'));
  
  if (!hashedCssPath || !hashedJsPath) {
    console.error('Error: Unable to find hashed CSS or JS files.');
    process.exit(1);
  }
  const serviceWorkerPath = path.join(process.cwd(), 'public', 'service-worker.js');

  // Read the custom service worker template
  let serviceWorkerTemplate = fs.readFileSync(serviceWorkerPath, 'utf-8');
  const serviceWorkerOutputPath = path.join(process.cwd(), 'build', 'service-worker.js');

  


console.log('replaces with', hashedCssPath, hashedJsPath)
  // Replace placeholders with hashed URLs
  console.log('updating...')
  serviceWorkerTemplate = serviceWorkerTemplate
    .replace('{{HASHED_CSS_URL}}', hashedCssPath)
    .replace('{{HASHED_JS_URL}}', hashedJsPath);
  

console.log('updating...')

  // Write the updated service worker file
  fs.writeFileSync(serviceWorkerOutputPath, serviceWorkerTemplate, 'utf-8');

  console.log('Service worker updated successfully.');
