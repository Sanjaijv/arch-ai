const fs = require('fs');
const file = 'components/editor/edges/canvas-edge.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
`  const rawStagger = isParallel 
    ? (index - (total - 1) / 2) * 40
    : (edgeIndex % 5) * 30 - 60;`,
`  // Only stagger the path for parallel edges to separate routing tracks.
  // For other edges, keep them centered to prevent the path and labels from being pushed into nodes.
  const rawStagger = isParallel 
    ? (index - (total - 1) / 2) * 40
    : 0;`
);

fs.writeFileSync(file, code);
console.log("Patched rawStagger");
