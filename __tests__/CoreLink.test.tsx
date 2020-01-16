import React from 'react';
import { mount } from 'enzyme';
import CoreLink from '../src/CoreLink';

import {
  LinkProps,
  RouteComponentProps
} from 'react-router-dom';

import {
  History,
  Location,
} from 'history';

const noop = () => null;

const Component = (
  props: LinkProps &
    RouteComponentProps &
    {
      BaseComponent: () => any;
    }
) => (
  <CoreLink
    BaseComponent={noop}
    {...props}
  />
);
const history = {} as History
const location = {} as Location

describe('CoreLink', () => {
  describe('when the current path is "/zoo"', () => {
    const match = {
      params: {},
      isExact: false,
      path: 'path',
      url: '/zoo'
    };
    let baseLinkSpy: jest.Mock<any, any>;
    beforeEach(() => {
      baseLinkSpy = jest.fn().mockImplementation(noop);
    });
    afterEach(() => {
      baseLinkSpy.mockRestore();
    });
    it('should call the base Link once when rendered', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="lions"
          {...{
            history,
            location,
          }}
        />
      );
      expect(baseLinkSpy).toHaveBeenCalledTimes(1);
    });
    it('should not pass "match" to the base Link', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="lions"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.match).toBe(undefined);
    });
    it('resolves to "/zoo/lions" when given "lions"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="lions"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo/lions');
    });
    it('resolves to "/zoo/lions" when given "./lions"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="./lions"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo/lions');
    });
    it('resolves to "/" when given "/"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="/"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/');
    });
    it('resolves to "/bar" when given "/bar"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="/bar"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/bar');
    });
  });

  describe('when the current path is "/zoo/lions"', () => {
    const match = {
      url: '/zoo/lions',
      params: {},
      isExact: false,
      path: 'path',
    };
    let baseLinkSpy: jest.Mock<any, any>
    beforeEach(() => {
      baseLinkSpy = jest.fn().mockImplementation(noop);
    });
    afterEach(() => {
      baseLinkSpy.mockRestore();
    });
    it('resolves to "/zoo/giraffes" when given "../giraffes"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="../giraffes"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo/giraffes');
    });
    it('resolves to "/zoo/lions/mountain" when given "../giraffes"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="mountain"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo/lions/mountain');
    });
    it('resolves to "/zoo" when given ".."', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to=".."
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo');
    });
    it('resolves to "/zoo/lions" when given "."', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match} 
          to="."
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo/lions');
    });
  });

  describe('when the current path is "/"', () => {
    const match = {
      params: {},
      isExact: false,
      path: 'path',
      url: '/',
    };
    let baseLinkSpy: jest.Mock<any, any>;
    beforeEach(() => {
      baseLinkSpy = jest.fn().mockImplementation(noop);
    });
    afterEach(() => {
      baseLinkSpy.mockRestore();
    });
    it('resolves to "/zoo" when given "zoo"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="zoo"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo');
    });
    it('resolves to "/zoo" when given "/zoo"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="/zoo"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo');
    });
    it('resolves to "/zoo" when given "/zoo/"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="/zoo/"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo');
    });
    it('resolves to "/zoo" when given "zoo/"', () => {
      mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="zoo/"
          {...{
            history,
            location,
          }}
        />
      );
      const props = baseLinkSpy.mock.calls[0][0];
      expect(props.to).toBe('/zoo');
    });
  });

  describe('when changing props', () => {
    const match = {
      params: {},
      isExact: false,
      path: 'path',
      url: '/foo',
    };
    let baseLinkSpy: jest.Mock<any, any>;
    beforeEach(() => {
      baseLinkSpy = jest.fn().mockImplementation(noop);
    });
    afterEach(() => {
      baseLinkSpy.mockRestore();
    });
    it('respects the new value of "match"', () => {
      const wrapper = mount(
        <Component
          BaseComponent={baseLinkSpy}
          match={match}
          to="bar"
          {...{
            history,
            location,
          }}
        />
      );
      wrapper.setProps({ match: { url: '/baz' }, to: 'bar' });
      const props = baseLinkSpy.mock.calls[1][0];
      expect(props.to).toBe('/baz/bar');
    });
  });
});
