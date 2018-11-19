import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cursor from './index.js';

function render() {
  return TestRenderer.create(
    <Cursor>
      {(position) => (
        `Current position: ${position}`
      )}
    </Cursor>
  );
}

test('is receives keyboard events', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.props.tabIndex).toEqual('0');
});

test('renders the default state', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.children.length).toEqual(1);
  expect(root.children[0]).toEqual('Current position: -1');
});

test('increments its position', () => {
  const renderer = render();

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowRight' });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0');

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowRight' });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 1');
});

test('decrements its position', () => {
  const renderer = render();

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowLeft' });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: -2');

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowLeft' });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: -3');
});
