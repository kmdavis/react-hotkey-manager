# React Hotkey Manager
> Global Hotkeys for React

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

React Hotkey Manager is a Context Provider/Consumer that allows registering and unregistering global hotkeys by rendering (and later unmounting) a react component. e.g. if Component A contains Hotkeys, those hotkeys will be registered if and only if Component A is currently rendered.

## Installation

```sh
npm install react-hotkey-manager
```

## Usage

```js
import { HotkeyManager, Hotkeys } from "react-hotkey-manager";

<SomewhereNearTheTopOfYourReactStack>
    <HotkeyManager>
        <StuffInTheMiddle>
            <Hotkeys
                keys={{
                    "esc": {
                        callback: () => console.log("ESC pressed in StuffInTheMiddle"),
                    },
                }}
            />
        </StuffInTheMiddle>
        <OtherStuff>
            <Hotkeys
                keys={{
                    "esc": {
                        callback: () => console.log("ESC pressed in OtherStuff"),
                    },
                    "ctrl+c": {
                        callback: () => console.log("ctrl+c pressed");
                    }
                }}
            />
        </OtherStuff>
    </HotkeyManager>
</SomewhereNearTheTopOfYourReactStack>
```

## Development setup

```sh
npm install
npm test
```

## Release History

* 0.1.0
    * Initial public release

## Meta

Kevan Davis <kevan.davis@me.com>

Distributed under the BSD license.

[https://github.com/kmdavis/react-hotkey-manager](https://github.com/kmdavis/react-hotkey-manager/)

## Contributing

1. Fork it (<https://github.com/kmdavis/react-hotkey-manager/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/react-hotkey-manager.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-hotkey-manager
[npm-downloads]: https://img.shields.io/npm/dm/react-hotkey-manager.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/kmdavis/react-hotkey-manager/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/kmdavis/react-hotkey-manager
