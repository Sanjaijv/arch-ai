const fs = require('fs');
const file = 'context/current-issues.md';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
`### 1. Edge label overlap

**Status:** Open`,
`### 1. Edge label overlap

**Status:** Resolved`
);

fs.writeFileSync(file, code);
console.log("Patched current-issues.md");
