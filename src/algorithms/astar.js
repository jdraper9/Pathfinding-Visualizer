// astar is just Dijkstra with heuristic

export function astar(grid, startNode, endNode) {
  // do I need this, or do I used openList?
  const visitedNodesInOrder = [];
  const openList = [];
  const closedList = [];

  startNode.g = 0;
  startNode.h = heuristic(
    startNode.col,
    startNode.row,
    endNode.col,
    endNode.row
  );
  startNode.f = startNode.g + startNode.h;
  openList.push(startNode);
  while (!!openList.length) {
    // Take from the open list current_node with lowest f value
    sortNodesByF(openList);
    const current_node = openList.shift();
    console.log('current: ');
    console.log(current_node);
    visitedNodesInOrder.push(current_node);
    if (current_node.isWall) {
      continue;
    }
    // stuck case
    if (current_node.g === Infinity);
    // success case, current_node is endNode
    if (current_node === endNode) {
      return visitedNodesInOrder;
    }
    // get current node's successors/nieghbors
    const current_neighbors = getNeighbors(current_node, grid);
    for (const neighbor of current_neighbors) {
      // set neighbor current cost
      const successor_current_cost = current_node.g + 1;
      // if neighbor is in OPEN
      if (isInList(neighbor, openList)) {
        // if neighbor g <= successor_current_cost
        if (neighbor.g <= successor_current_cost) {
          // skips into next iteration of for loop (?)
          continue;
        }
      } else if (isInList(neighbor, closedList)) {
        if (neighbor.g <= successor_current_cost) {
          continue;
        }
        // move neighbor from closed to open
      } else {
        openList.push(neighbor);
        neighbor.h = heuristic(
          neighbor.col,
          neighbor.row,
          endNode.col,
          endNode.row
        );
      }
      neighbor.g = successor_current_cost;
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.previousNode = current_node;
    }
    closedList.push(current_node);
  }
  // error
  console.log('algorithm failure');
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

function isInList(node, list) {
  var inList = false;
  for (const listItem of list) {
    if (listItem.col === node.col && listItem.row === node.row) {
      inList = true;
    }
  }
  return inList;
}

function heuristic(nodeCol, nodeRow, endCol, endRow) {
  let xOne = nodeRow;
  let xTwo = endRow;
  let yOne = nodeCol;
  let yTwo = endCol;

  let xChange = Math.abs(xTwo - xOne);
  let yChange = Math.abs(yTwo - yOne);

  return xChange + yChange;
}

function sortNodesByF(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
}
