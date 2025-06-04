/**
 * @file generate_structure.js
 * @project Cost_Manager_REST_API
 * @description Generates a visual tree of the current project directory and saves it to project_structure.txt
 */

const fs = require('fs');
const path = require('path');

const outputFile = 'project_structure.txt';
const baseDir = process.cwd();
const baseDirName = path.basename(baseDir);

/**
 * Recursively builds a visual tree structure of the directory.
 * Ignores folders like node_modules, .git, .idea
 *
 * @function buildTree
 * @param {string} dirPath - The directory path to scan
 * @param {string} prefix - Indentation prefix for nested entries
 * @returns {string[]} Array of tree lines representing the structure
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

// Log success only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    console.info(`✅ File structure saved to ${outputFile}`);
}
