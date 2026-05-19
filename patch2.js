const fs = require('fs');
const file = 'components/editor/edges/canvas-edge.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
`  const [edgePath, labelX, labelY] = getSmoothStepPath({`,
`  const [edgePath, centerX, centerY] = getSmoothStepPath({`
);

code = code.replace(
`    centerX: (sourceX + targetX) / 2 + pathStaggerX,
    centerY: (sourceY + targetY) / 2 + pathStaggerY,
  });`,
`    centerX: (sourceX + targetX) / 2 + pathStaggerX,
    centerY: (sourceY + targetY) / 2 + pathStaggerY,
  });

  // For non-parallel edges, apply a slight offset to the label position itself
  // to prevent labels of crossing edges from stacking exactly on top of each other.
  // We offset along the line by alternating the position slightly.
  const labelSlide = !isParallel ? ((edgeIndex % 3) - 1) * 25 : 0; // -25, 0, or 25
  
  // Approximate the direction of the middle segment to slide the label along the path
  const isHorizontalMiddle = sourcePosition === "top" || sourcePosition === "bottom";
  
  const labelX = centerX + (isHorizontalMiddle ? labelSlide : 0);
  const labelY = centerY + (!isHorizontalMiddle ? labelSlide : 0);`
);

fs.writeFileSync(file, code);
console.log("Patched labelX/labelY");
