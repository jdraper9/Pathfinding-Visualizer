// void search(Node root) {
//   if (root == null) return;
//   visit(root);
//   root.visited = true;
//   for each (Node n in root.adjacent) {
//     if (n.visited == false) {
//       search(n);
//     }
//   }
// }

export function dfs(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const s = [];
  s.push(startNode);

  while (!!s.length) {
    const v = s.pop();
    if (v.isWall) {
      continue;
    }
    if (v === endNode) {
      return visitedNodesInOrder;
    }
    visitedNodesInOrder.push(v);
    v.isVisited = true;
    const neighbors = getNeighbors(v, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.previousNode = v;
        s.push(neighbor);
      }
    }
  }
  return [];
}

function getNeighbors(node, grid) {
  const neighbors = [];
  // destructure col and row from node
  const { col, row } = node;
  // if below first row, add node above
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // if above bottom row, add node below
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // if to right of first column, add node to left
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // add node to right
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // of these neighbors, only return the unvisited ones
  return neighbors;
}
