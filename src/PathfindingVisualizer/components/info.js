import React from 'react';

const Info = (props) => {
  if (props.alg === 'A*') {
    return (
      <div>
        Informed search algorithm. Sorts partial solutions by minimizing
        indiviudal node's f values, where f(n) = g(n) + h(n) combines distance
        from start and a heuristic value, determined in this case by Manhattan
        Distance or a node's distance from the finish node. Time complexity is
        O(b^d), with b = branching factor, d = depth.
      </div>
    );
  } else if (props.alg === 'dijkstra') {
    return (
      <div>
        Similar to A* but does not use a heuristic function. Uses a data
        structure for storing and querying partial solutions sorted only by
        distance from the start. In some fields such as AI, Dijkstra's algorithm
        is known as uniform cost search. Time complexity is O(|V| + |E|*log|V|),
        with V = #nodes and E = #edges.
      </div>
    );
  } else if (props.alg === 'DFS') {
    return (
      <div>
        Depth First Search. Traverses each node until target is found. Less
        efficient than an informed search such as A* or Dijkstra's
      </div>
    );
  } else {
    return (
      <div>
        click and drag to create walls, then select an algorithm and hit play
      </div>
    );
  }
};

export default Info;
