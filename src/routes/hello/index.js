import React from 'react';
import Hello from './Hello';

export const path = '/hello';
export const action = async (state) => {
  const title = 'Hello there friend!';
  state.context.onSetTitle(title);
  return <Hello title={title} />;
};