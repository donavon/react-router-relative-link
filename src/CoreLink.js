import React from "react";
import resolvePathname from "resolve-pathname";

const ensureLeadingAndTrailingSlashes = (path) => path.replace(/^\/?/, "/").replace(/\/?$/, "/");
const removeTrailingSlash = (path) => path.replace(/\/$/, "") || "/";
const removeLeadingHash = (path) => path.replace(/^#/, "");

const determineCurrentPath = (currentPath) => {
    if (!currentPath) {
        if (global.location && global.location.hash) {
            currentPath = removeLeadingHash(global.location.hash);
        } else {
            currentPath = "/";
        }
    }
    return ensureLeadingAndTrailingSlashes(currentPath);
};

const resolvePathnameNoTrailingSlash = (path, currentPath) => removeTrailingSlash(resolvePathname(path, currentPath));

export default class CoreLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPath: determineCurrentPath(props.currentPath)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ currentPath: determineCurrentPath(nextProps.currentPath) });
    }

    render() {
        var { BaseComponent, to, ...others} = this.props;
        const currentPath = this.state.currentPath;

        if (typeof to === "string") {
            to = resolvePathnameNoTrailingSlash(to, currentPath);
        } else if (typeof to === "object" && to.pathname) {
            to.pathname = resolvePathnameNoTrailingSlash(to.pathname, currentPath);
        }
        return <BaseComponent to={to} {...others} />;
    }
}

CoreLink.propTypes = {
    currentPath: React.PropTypes.string
};
