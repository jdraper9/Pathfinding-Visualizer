import React, { Component } from 'react';
// import code for individual node in grid
import Node from './Node/Node';
// import algorithm code, and after algorithm runs return shortest path
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { astar } from '../algorithms/astar';
import { dfs } from '../algorithms/dfs';

import './PathfindingVisualizer.css';

// constants initializing start and end position
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      selectedAlgorithm: null,
      algoHasRun: false
    };
  }

  // after component renders, setState grid -> getInitialGrid(), returned by getInitialGrid function
  componentDidMount() {
    const grid = getInitialGrid();
    // state grid is an array of of javascript objects, not components. Components are rendered in render().
    this.setState({ grid });
  }

  // ------- click and drag wall

  // event of starting wall from click
  handleMouseDown(row, col) {
    // at position from argument, return a new grid with node at position updated
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    // update state with new grid and mouseIsPressed= true
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  //  -----------

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      // if last node visited by path, animate shortest path
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 25 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 25 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  // initiates solution when button is clicked
  visualizeDijkstra() {
    // grab grid from state
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    // visitedNodes returned
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    // return shortest path
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    //
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAStar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
  }

  selectA() {
    this.setState({ selectedAlgorithm: 'A*' });
  }

  selectDijkstra() {
    this.setState({ selectedAlgorithm: 'dijkstra' });
  }

  selectDFS() {
    this.setState({ selectedAlgorithm: 'DFS' });
  }

  runSelected() {
    const { selectedAlgorithm, algoHasRun } = this.state;
    if (!algoHasRun) {
      if (selectedAlgorithm === 'dijkstra') {
        this.visualizeDijkstra();
      } else if (selectedAlgorithm === 'A*') {
        this.visualizeAStar();
      } else if (selectedAlgorithm === 'DFS') {
        this.visualizeDFS();
      }
    }
    this.setState({ algoHasRun: true });
  }

  render() {
    // grab grid and mouseIsPressed from state
    const { grid, mouseIsPressed, selectedAlgorithm } = this.state;

    return (
      <>
        <div className="ui container">
          <h2 className="ui header custom-class">
            {selectedAlgorithm && (
              <i className="play icon" onClick={() => this.runSelected()}></i>
            )}
            <i
              className="redo icon"
              onClick={() => window.location.reload(false)}
            ></i>
            <div className="content">
              Pathfinding Algorithm Visualizer
              <div className="sub header">select an algorithm</div>
              <div className="sub header">click and drag to create walls</div>
            </div>
          </h2>
          <div className="ui three item menu">
            <button className="item" onClick={() => this.selectA()}>
              A*
            </button>
            <button className="item" onClick={() => this.selectDijkstra()}>
              Dijkstra's
            </button>
            <button className="item" onClick={() => this.selectDFS()}>
              DFS
            </button>
          </div>
        </div>
        {/*  --- grid --- */}
        <div className="grid">
          {/* row is row itself, rowId is id of row */}
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/*  --- grid --- */}
      </>
    );
  }
}

// called when component mounts. Creates first grid
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      // create a node at x_11 .... x_1_50 and push it into currentRow.
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// create individual nodes JS OBJECT PROPERTIES HERE
const createNode = (col, row) => {
  return {
    col,
    row,
    // if position matches start, this is true
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    // if "" finish, this is true
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    // a* properties
    g: Infinity,
    h: Infinity,
    f: Infinity
  };
};

// mark one position as walled
const getNewGridWithWallToggled = (grid, row, col) => {
  // returns new grid object
  const newGrid = grid.slice();
  // find position indicated by arguments, grab that node [node object at that position]
  const node = newGrid[row][col];
  // create new Node with property isWall: true
  const newNode = {
    ...node,
    // !node.isWall -> node.isWall = true
    isWall: !node.isWall
  };
  // update node at position to newNode within new Grid object
  newGrid[row][col] = newNode;
  // return new Grid object
  return newGrid;
};
