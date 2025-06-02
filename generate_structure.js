const fs = require('fs');
const path = require('path');

const outputFile = 'project_structure.txt';
const baseDir = process.cwd();
const baseDirName = path.basename(baseDir);

/**
 * Recursively builds a visual tree structure of the directory.
 * Ignores folders like node_modules, .git, .idea
 * @param {string} dirPath - Directory path to scan
 * @param {string} prefix - Indentation prefix
 * @returns {string[]} Array of tree lines
 */
function buildTree(dirPath, prefix = '') {
    const IGNORE = ['node_modules', '.git', '.idea'];

    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(entry => !IGNORE.includes(entry.name));

    const lines = [];

    entries.forEach((entry, index) => {
        const isLast = index === entries.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        const fullPath = path.join(dirPath, entry.name);

        lines.push(`${prefix}${connector}${entry.name}`);

        if (entry.isDirectory()) {
            const nextPrefix = prefix + (isLast ? '    ' : '│   ');
            lines.push(...buildTree(fullPath, nextPrefix));
        }
    });

    return lines;
}

// Build and save the file structure
const treeLines = [`📁 ${baseDirName}`, ...buildTree(baseDir)];
fs.writeFileSync(outputFile, treeLines.join('\n'), 'utf-8');

console.log(`✅ File structure saved to ${outputFile}`);
