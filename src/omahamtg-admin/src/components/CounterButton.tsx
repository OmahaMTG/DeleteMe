import React, { useState } from 'react';
export const CounterButton = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    console.log('counting');
    setCount(current => ++current);
  };

  return <button onClick={increment}>Count = {count}</button>;
};
