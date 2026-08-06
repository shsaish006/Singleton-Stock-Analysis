const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        content = content.replace(/Singleton/g, 'Singleton');
        content = content.replace(/singleton/g, 'singleton');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (err) {
        console.error(`Failed to process ${filePath}:`, err);
    }
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (['node_modules', '.git', '.next', '.idea', 'public'].includes(file)) return;
            walkDir(fullPath);
        } else {
            if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.md') || fullPath.endsWith('.mjs') || fullPath.endsWith('.js')) {
                replaceInFile(fullPath);
            }
        }
    });
}

const targetDir = process.cwd();
walkDir(targetDir);
console.log('Done replacing!');
