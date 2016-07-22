import React from "react";
import Link from "../src/RelativeLink";
import IndexLink from "../src/RelativeIndexLink";
import sinon from "sinon";
import { mount } from "enzyme";
import { expect } from "chai";

Link.BaseComponent = IndexLink.BaseComponent = () => null; // Use a dummy base component.

["RelativeLink", "RelativeIndexLink"].forEach( (linkType) => {
    const Component = linkType === "RelativeLink" ? Link : IndexLink;

    describe(linkType, function() {
        describe("when the current path is `/zoo`", function() {
            beforeEach(() => {
                this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                this.currentPath = "/zoo";
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
            it("resolves to `/zoo/lions` when given `lions`", () => {
                mount(<Component currentPath={this.currentPath} to="lions" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/zoo/lions");
            });
            it("resolves to `/zoo/lions` when given `./lions`", () => {
                mount(<Component currentPath={this.currentPath} to="./lions" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/zoo/lions");
            });
            it("resolves to `/` when given `/`", () => {
                mount(<Component currentPath={this.currentPath} to="/" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/");
            });
            it("resolves to `/bar` when given `/bar`", () => {
                mount(<Component currentPath={this.currentPath} to="/bar" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/bar");
            });
        });

        describe("when the current path is `/zoo/lions`", function() {
            beforeEach(() => {
                this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                this.currentPath = "/zoo/lions";
            });
            afterEach(() => {
                this.baseLinkSpy.restore();
            });
            it("resolves to `/zoo/giraffes` when given `../giraffes`", () => {
                mount(<Component currentPath={this.currentPath} to="../giraffes" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/zoo/giraffes");
            });
            it("resolves to `/zoo/lions/mountain` when given `../giraffes`", () => {
                mount(<Component currentPath={this.currentPath} to="mountain" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/zoo/lions/mountain");
            });
        });

        describe("when the current path is `/`", function() {
            beforeEach(() => {
                this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                this.currentPath = "/";
            });
            afterEach(() => {
                this.baseLinkSpy.restore();
            });
            it("resolves to `/zoo` when given `zoo`", () => {
                mount(<Component currentPath={this.currentPath} to="zoo" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/zoo");
            });
            it("resolves to `/zoo` when given `/zoo`", () => {
                mount(<Component currentPath={this.currentPath} to="/zoo" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/zoo");
            });
            it("resolves to `/zoo` when given `/zoo/`", () => {
                mount(<Component currentPath={this.currentPath} to="/zoo/" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/zoo");
            });
            it("resolves to `/zoo` when given `zoo/`", () => {
                mount(<Component currentPath={this.currentPath} to="zoo/" />);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/zoo");
            });
        });

        describe("when the current path is not specified", function() {
            beforeEach(() => {
                this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                global.location.hash = "#/foo";
            });
            afterEach(() => {
                this.baseLinkSpy.restore();
            });
            it("used window.location.hash to resolve", () => {
                mount(<Component to="bar"/>);
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/foo/bar");
            });
        });
        describe("when changing props", function() {
            beforeEach(() => {
                this.baseLinkSpy = sinon.spy(Component, "BaseComponent");
                this.currentPath = "/foo";
            });
            afterEach(() => {
                this.baseLinkSpy.restore();
            });
            it("respects the new value of `currentPath`", () => {
                const wrapper = mount(<Component currentPath={this.currentPath} to="bar" />);
                wrapper.setProps({ currentPath:"/baz", to:"bar"});
                const props = this.baseLinkSpy.getCall(0).args[0];
                expect(props.to).to.equal("/foo/bar");
            });
        });
    });
});
