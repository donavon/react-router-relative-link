import React from "react";
import resolvePathname from "resolve-pathname";

const ensureLeadingAndTrailingSlashes = (path) => path.replace(/^\/?/, "/").replace(/\/?$/, "/");
const removeTrailingSlash = (path) => path.replace(/\/$/, "") || "/";
const removeLeadingHash = (path) => path.replace(/^#/, "");

const determineCurrentPath = (currentPath) => {
    if (!currentPath) {
        if (window.location && window.location.hash) {
            currentPath = removeLeadingHash(window.location.hash);
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
        const currentPath = this.state.currentPath;
        const { BaseComponent, to, ...others} = this.props;
        delete others.currentPath; // So React 15.2 and above doesn't complain about unknown DOM properties.
        let absTo;

        if (typeof to === "string") {
            absTo = resolvePathnameNoTrailingSlash(to, currentPath);
        } else if (typeof to === "object" && to.pathname) {
            absTo = to;
            absTo.pathname = resolvePathnameNoTrailingSlash(to.pathname, currentPath);
        }
        return <BaseComponent to={absTo} {...others} />;
    }
}

CoreLink.propTypes = {
    currentPath: React.PropTypes.string
};
