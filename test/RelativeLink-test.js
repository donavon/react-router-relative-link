import React from "react";
import Link from "../src/RelativeLink";
import IndexLink from "../src/RelativeIndexLink";
import sinon from "sinon";
import { mount } from "enzyme";
import { expect } from "chai";

Link.BaseComponent = IndexLink.BaseComponent = () => null; // Use a dummy base component.

["RelativeLink", "RelativeIndexLink"].forEach( (linkType) => {
    const Component = linkType === "RelativeLink" ? Link : IndexLink;

    ["", "?beast=yes"].forEach((queryString) => {

        describe(linkType, function() {
            describe(`when the current path is "/zoo${queryString}"`, function() {
                beforeEach(() => {
                    this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                    this.currentPath = `/zoo${queryString}`;
                });
                afterEach(() => {
                    this.baseLinkSpy.restore();
                });
                it("should call the base Link once when rendered", () => {
                    mount(<Component currentPath={this.currentPath} to="lions" />);
                    expect(this.baseLinkSpy.calledOnce).to.equal(true);
                });
                it("should not pass `currentPath` to the base Link", () => {
                    mount(<Component currentPath={this.currentPath} to="lions" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.currentPath).to.equal(undefined);
                });
                it(`resolves to "/zoo/lions${queryString}" when given "lions"`, () => {
                    mount(<Component currentPath={this.currentPath} to="lions" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/zoo/lions${queryString}`);
                });
                it(`resolves to "/zoo/lions${queryString}" when given "./lions"`, () => {
                    mount(<Component currentPath={this.currentPath} to="./lions" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/zoo/lions${queryString}`);
                });
                it(`resolves to "/${queryString}" when given "/"`, () => {
                    mount(<Component currentPath={this.currentPath} to="/" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/${queryString}`);
                });
                it(`resolves to "/bar${queryString}" when given "/bar"`, () => {
                    mount(<Component currentPath={this.currentPath} to="/bar" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/bar${queryString}`);
                });
            });

            describe(`when the current path is "/zoo/lions${queryString}"`, function() {
                beforeEach(() => {
                    this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                    this.currentPath = `/zoo/lions${queryString}`;
                });
                afterEach(() => {
                    this.baseLinkSpy.restore();
                });
                it(`resolves to "/zoo/giraffes${queryString}" when given "../giraffes"`, () => {
                    mount(<Component currentPath={this.currentPath} to="../giraffes" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/zoo/giraffes${queryString}`);
                });
                it(`resolves to "/zoo/lions/mountain${queryString}" when given "../giraffes"`, () => {
                    mount(<Component currentPath={this.currentPath} to="mountain" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/zoo/lions/mountain${queryString}`);
                });
            });

            describe(`when the current path is "/${queryString}"`, function() {
                beforeEach(() => {
                    this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                    this.currentPath = `/${queryString}`;
                });
                afterEach(() => {
                    this.baseLinkSpy.restore();
                });
                it(`resolves to "/zoo${queryString}" when given "zoo"`, () => {
                    mount(<Component currentPath={this.currentPath} to="zoo" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/zoo${queryString}`);
                });
                it(`resolves to "/zoo${queryString}" when given "/zoo"`, () => {
                    mount(<Component currentPath={this.currentPath} to="/zoo" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/zoo${queryString}`);
                });
                it(`resolves to "/zoo${queryString}" when given "/zoo/"`, () => {
                    mount(<Component currentPath={this.currentPath} to="/zoo/" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/zoo${queryString}`);
                });
                it(`resolves to "/zoo${queryString}" when given "zoo/"`, () => {
                    mount(<Component currentPath={this.currentPath} to="zoo/" />);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/zoo${queryString}`);
                });
            });

            describe("when the current path is not specified", function() {
                beforeEach(() => {
                    this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                    global.location.hash = `#/foo${queryString}`;
                });
                afterEach(() => {
                    this.baseLinkSpy.restore();
                });
                it("used window.location.hash to resolve", () => {
                    mount(<Component to="bar"/>);
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/foo/bar${queryString}`);
                });
            });
            describe("when changing props", function() {
                beforeEach(() => {
                    this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                    this.currentPath = `/foo${queryString}`;
                });
                afterEach(() => {
                    this.baseLinkSpy.restore();
                });
                it("respects the new value of `currentPath`", () => {
                    const wrapper = mount(<Component currentPath={this.currentPath} to="bar" />);
                    wrapper.setProps({ currentPath:"/baz", to:"bar"});
                    const props = this.baseLinkSpy.getCall(0).args[0];
                    expect(props.to).to.equal(`/foo/bar${queryString}`);
                });
            });
        });
    });
});
