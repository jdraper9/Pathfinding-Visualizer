import React from 'react';

const Info = props => {
  if (props.alg === 'A*') {
    return (
      <div>
        informed search algorithm. sorts partial solutions by minimizing
        indiviudal node's f values. f(n) = g(n) + h(n) combines distance from
        start and a heuristic value, determined in this case by Manhattan
        Distance or a node's distance from the finish node
      </div>
    );
  } else if (props.alg === 'dijkstra') {
    return (
      <div>
        uses data structure to store and query partial solutions sorted by
        distance from start
      </div>
    );
  } else if (props.alg === 'DFS') {
    return <div>yeet3</div>;
  } else {
    return <div>select an algorithm</div>;
  }
};

export default Info;
