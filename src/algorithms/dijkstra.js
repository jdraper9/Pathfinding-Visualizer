// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

// receives grid, start and finish from visualizeDijkstra function, returns visitedNodesInOrder
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  // single array of all nodes
  const unvisitedNodes = getAllNodes(grid);
  // while unvisited nodes remain, ... !![].length true if nonempty
  while (!!unvisitedNodes.length) {
    // sorts array of unvisited nodes by smallest to largest distance
    sortNodesByDistance(unvisitedNodes);
    // pop closest node off unvisited nodes. At first, closestNode is startNode, since dist is 0
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // Node becomes visited
    closestNode.isVisited = true;
    // pushes nodes in order algorithm sees them, starting with first node
    visitedNodesInOrder.push(closestNode);
    // if final node, return array of nodes visited in order
    if (closestNode === finishNode) return visitedNodesInOrder;
    // update unvisited neighbor nodes with distance of currentNode + 1
    // ie on startNode, update surrounding 4 to distance of 1, then loop. Now there are 4 unvisited nodes with distance 1.
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

// // sorts array of unvisited nodes by smallest to largest distance
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  // for every unvisited neighbor, update distance to 1 + current distance, and previous node to current node.
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    // this allows us to go back
    neighbor.previousNode = node;
  }
}

// returns a node's 4 neighbors
function getUnvisitedNeighbors(node, grid) {
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
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

// return single array of all nodes, row by row
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  // until previousNode is null
  while (currentNode !== null) {
    // start end node, adds to array
    nodesInShortestPathOrder.unshift(currentNode);
    // switch to previousNode (defined in node object properties, initialized to null and assigned after algorithm)
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
