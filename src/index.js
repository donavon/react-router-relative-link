import RelativeLink from "./RelativeLink";
import Link from "react-router/lib/Link";
RelativeLink.BaseComponent = Link;

import RelativeIndexLink from "./RelativeIndexLink";
import IndexLink from "react-router/lib/IndexLink";
RelativeIndexLink.BaseComponent = IndexLink;

export { RelativeLink as Link, RelativeIndexLink as IndexLink };
