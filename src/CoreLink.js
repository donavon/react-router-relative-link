import React from "react";
import resolvePathname from "resolve-pathname";

const ensureLeadingAndTrailingSlashes = (path) => path.replace(/^\/?/, "/").replace(/\/?$/, "/");
const removeTrailingSlash = (path) => path.replace(/\/$/, "") || "/";
const removeLeadingHash = (path) => path.replace(/^#/, "");
const removeQuery = (path) => path.split("?")[0];
const extractQuery = (path) => path.split("?")[1];

const determineCurrentPath = (currentPath) => {
    if (!currentPath) {
        if (global.location && global.location.hash) {
            currentPath = removeLeadingHash(global.location.hash);
        } else {
            currentPath = "/";
        }
    }
    return currentPath;
};

const extractCurrentPath = (currentPath) => {
    return ensureLeadingAndTrailingSlashes(removeQuery(determineCurrentPath(currentPath)));
};

const extractCurrentQuery = (currentPath) => {
    return extractQuery(determineCurrentPath(currentPath));
};

const resolvePathnameNoTrailingSlash = (path, currentPath) => removeTrailingSlash(resolvePathname(path, currentPath));

export default class CoreLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPath: extractCurrentPath(props.currentPath),
            currentQuery: extractCurrentQuery(props.currentPath)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPath: extractCurrentPath(nextProps.currentPath),
            currentQuery: extractCurrentQuery(nextProps.currentPath)
        });
    }

    render() {
        const { currentPath, currentQuery } = this.state;
        const { BaseComponent, to, ...others} = this.props;
        delete others.currentPath; // So React 15.2 and above doesn't complain about unknown DOM properties.
        delete others.currentQuery; // So React 15.2 and above doesn't complain about unknown DOM properties.
        let absTo;

        if (typeof to === "string") {
            absTo = resolvePathnameNoTrailingSlash(to, currentPath) + (currentQuery ? `?${currentQuery}` : "");
        } else if (typeof to === "object" && to.pathname) {
            absTo = to;
            absTo.pathname = resolvePathnameNoTrailingSlash(to.pathname, currentPath);
            absTo.query = absTo.query || currentQuery;
        }
        return <BaseComponent to={absTo} {...others} />;
    }
}

CoreLink.propTypes = {
    currentPath: React.PropTypes.string
};
