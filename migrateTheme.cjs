const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Backgrounds
  content = content.replace(/\bbg-dark-950\b/g, 'bg-white dark:bg-dark-950');
  content = content.replace(/\bbg-dark-900\/98\b/g, 'bg-gray-50/98 dark:bg-dark-900/98');
  content = content.replace(/\bbg-dark-900\b/g, 'bg-gray-50 dark:bg-dark-900');
  content = content.replace(/\bbg-dark-800\/60\b/g, 'bg-white/60 dark:bg-dark-800/60');
  content = content.replace(/\bbg-dark-800\/80\b/g, 'bg-white/80 dark:bg-dark-800/80');
  content = content.replace(/\bbg-dark-800\b/g, 'bg-white dark:bg-dark-800');
  content = content.replace(/\bbg-dark-700\/60\b/g, 'bg-gray-100/60 dark:bg-dark-700/60');
  content = content.replace(/\bbg-dark-700\b/g, 'bg-gray-100 dark:bg-dark-700');
  
  // Gradients
  content = content.replace(/\bbg-dark-gradient\b/g, 'bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-dark-gradient');

  // Texts
  content = content.replace(/\btext-dark-50\b/g, 'text-gray-900 dark:text-dark-50');
  content = content.replace(/\btext-dark-100\b/g, 'text-gray-800 dark:text-dark-100');
  content = content.replace(/\btext-dark-200\b/g, 'text-gray-700 dark:text-dark-200');
  content = content.replace(/\btext-dark-300\b/g, 'text-gray-600 dark:text-dark-300');
  content = content.replace(/\btext-dark-400\b/g, 'text-gray-500 dark:text-dark-400');
  content = content.replace(/\btext-dark-500\b/g, 'text-gray-500 dark:text-dark-500');
  content = content.replace(/\btext-dark-600\b/g, 'text-gray-400 dark:text-dark-600');
  content = content.replace(/\btext-dark-800\b/g, 'text-gray-300 dark:text-dark-800');
  content = content.replace(/\btext-dark-950\b/g, 'text-white dark:text-dark-950');

  // Borders
  content = content.replace(/\bborder-dark-800\/80\b/g, 'border-gray-200/80 dark:border-dark-800/80');
  content = content.replace(/\bborder-dark-800\/60\b/g, 'border-gray-200/60 dark:border-dark-800/60');
  content = content.replace(/\bborder-dark-800\b/g, 'border-gray-200 dark:border-dark-800');
  content = content.replace(/\bborder-dark-700\/50\b/g, 'border-gray-200/50 dark:border-dark-700/50');
  content = content.replace(/\bborder-dark-700\/40\b/g, 'border-gray-200/40 dark:border-dark-700/40');
  content = content.replace(/\bborder-dark-700\b/g, 'border-gray-200 dark:border-dark-700');
  content = content.replace(/\bborder-dark-600\/40\b/g, 'border-gray-300/40 dark:border-dark-600/40');
  content = content.replace(/\bborder-dark-600\b/g, 'border-gray-300 dark:border-dark-600');

  // Shadows
  content = content.replace(/\bshadow-dark-950\/50\b/g, 'shadow-gray-200/50 dark:shadow-dark-950/50');
  content = content.replace(/\bshadow-dark-950\/60\b/g, 'shadow-gray-200/60 dark:shadow-dark-950/60');

  // Hover States
  content = content.replace(/\bhover:bg-dark-800\b/g, 'hover:bg-gray-100 dark:hover:bg-dark-800');
  content = content.replace(/\bhover:bg-dark-700\b/g, 'hover:bg-gray-200 dark:hover:bg-dark-700');
  content = content.replace(/\bhover:bg-dark-700\/60\b/g, 'hover:bg-gray-100/60 dark:hover:bg-dark-700/60');
  
  content = content.replace(/\bhover:text-dark-50\b/g, 'hover:text-gray-900 dark:hover:text-dark-50');
  content = content.replace(/\bhover:text-dark-200\b/g, 'hover:text-gray-700 dark:hover:text-dark-200');
  content = content.replace(/\bhover:text-dark-300\b/g, 'hover:text-gray-600 dark:hover:text-dark-300');

  // Group hover
  content = content.replace(/\bgroup-hover:text-dark-50\b/g, 'group-hover:text-gray-900 dark:group-hover:text-dark-50');

  // Edge cases
  content = content.replace(/\bplaceholder-dark-400\b/g, 'placeholder-gray-400 dark:placeholder-dark-400');
  content = content.replace(/\bdivide-dark-800\/60\b/g, 'divide-gray-200/60 dark:divide-dark-800/60');

  if (original !== content) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
