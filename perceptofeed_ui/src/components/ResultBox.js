import React from 'react';

function ResultBox({ result }) {
  return (
    <div className="result-box">
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default ResultBox;
