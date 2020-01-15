import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import RelativeLink from './RelativeLink';

describe('RelativeLink', () => {
  it('should not cause errors', () => {
    const spy = jest.spyOn(global.console, 'error');
    mount(
      <StaticRouter context={{}}>
        <RelativeLink to="foo" />
      </StaticRouter>
    );

    expect(spy.mock.calls.length).toBe(0);
    spy.mockRestore();
  });
});
