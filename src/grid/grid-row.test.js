import React from 'react';
import TestRenderer from 'react-test-renderer';

import GridRow from './grid-row.js';

function render(props) {
  return TestRenderer.create((
    <GridRow {...props}>
      <div>I am the first cell</div>
      <div>I am the second cell</div>
    </GridRow>
  ));
}

test('renders the default state', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.children.length).toStrictEqual(2);
  expect(root.children[0].props.active).toStrictEqual(false);
  expect(root.children[1].props.active).toStrictEqual(false);
  expect(root.props.className).toStrictEqual(undefined);
  expect(root.props.role).toStrictEqual('row');
  expect(root.props.style.display).toStrictEqual('flex');
  expect(root.props.style.flexDirection).toStrictEqual('row');
});

test('has a className property', () => {
  const renderer = render({ className: 'part-of-the-api' });
  const root = renderer.toJSON();

  expect(root.props.className).toStrictEqual('part-of-the-api');
});

describe('active property and cellIndex property', () => {
  it('deactivates all cells', () => {
    const renderer = render({ active: false, cellIndex: -1 });
    const root = renderer.toJSON();

    expect(root.children[0].props.active).toStrictEqual(false);
    expect(root.children[1].props.active).toStrictEqual(false);
  });

  it('activates the first cell', () => {
    const renderer = render({ active: true, cellIndex: 0 });
    const root = renderer.toJSON();

    expect(root.children[0].props.active).toStrictEqual(true);
    expect(root.children[1].props.active).toStrictEqual(false);
  });

  it('activates the second cell', () => {
    const renderer = render({ active: true, cellIndex: 1 });
    const root = renderer.toJSON();

    expect(root.children[0].props.active).toStrictEqual(false);
    expect(root.children[1].props.active).toStrictEqual(true);
  });
});
