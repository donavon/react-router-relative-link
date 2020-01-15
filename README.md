# This uses react router version 5

Please use original package if you need version 4 or if it has been updated to use version 5

https://www.npmjs.com/package/react-router-relative-link

# react-router-relative-link
[![Build Status](https://travis-ci.org/donavon/react-router-relative-link.svg?branch=master)](https://travis-ci.org/donavon/react-router-relative-link)

TL;DR

* A wrapper around react-router's `<Link />` and `<NavLink />` that allows relative paths.
* **Now supports `react-router-dom` version 4!**

## Install
```
> npm i react-router-relative-link --save
```

## Usage
To use `react-router-relative-link`, simply `import` it (ES6) as `Link` in place of `react-router-dom`
then dot and dot-dot to your heart's content.

So in your code, replace this:
```js
import { Link } from "react-router-dom";
```
with the following and you're good to go!
```js
import { Link } from "react-router-relative-link";
```

Here is a real world example. Notice that you don't need to know that you are at the base base `/zoo`, just like everywhere else in web land.

```js
import { Link } from "react-router-relative-link";

export default class MyZoo extends React.Component {
    render() {
        return (
            <p>Welcome to the Lions Den at /zoo/lions</p>
            <Link to="..">Back to the Zoo Entrance</Link>
            <Link to="../giraffes">Visit the Giraffes</Link>
            <Link to="../monkeys">Visit the Monkeys</Link>
            <Link to="mountain">Visit the Mountain Lions</Link>
        );
    }
}
```

`react-router-relative-link` support passing `to` as a string or as an object with a `pathname` property, just like `react-router`.

It also works with both `Link` and with `NavLink`.

