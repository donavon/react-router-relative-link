import RelativeLink from "./RelativeLink";
import { Link } from "react-router";
RelativeLink.BaseComponent = Link;

import RelativeIndexLink from "./RelativeIndexLink";
import { IndexLink } from "react-router";
RelativeIndexLink.BaseComponent = IndexLink;

export { RelativeLink as Link, RelativeIndexLink as IndexLink };
