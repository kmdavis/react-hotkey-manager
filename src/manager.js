import Context from "./context";
import Mousetrap from "mousetrap";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class HotkeysManager extends Component {
    static propTypes = {
        children: PropTypes.node,
        renderHelp: PropTypes.func,
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        const bindings = {};

        if (nextProps.renderHelp) {
            bindings["?"] = {
                keys: "?",
                description: "Help", // TODO: intl hook
                callback: () => nextProps.renderHelp(bindings),
            };
        }

        function bind (binding) {
            if (bindings[binding.keys]) {
                console.log("HOTKEY MANAGER DETECTED DUPLICATE");
                unbind(bindings[binding.keys]);
                // TODO: how to handle duplicates / overrides?
            }
            Mousetrap.bind(binding.keys, binding.callback, binding.action);
            bindings[binding.keys] = binding;
        }

        function unbind (binding) {
            Mousetrap.unbind(binding.keys, binding.action);
            delete bindings[binding.keys];
        }

        return {
            bind,
            bindings,
            unbind,
        };
    }

    state = {
        bindings: [],
        bind () {},
        unbind () {},
    }

    componentDidMount () {
        console.log("HOTKEY MANAGER MOUNTED; BINDING");
        for (const hotkey in this.state.bindings) {
            const binding = this.state.bindings[hotkey];
            Mousetrap.bind(binding.keys, binding.callback, binding.action);
        }
    }

    componentDidUpdate (prevProps, prevState) {
        console.log("HOTKEY MANAGER UPDATED; REBINDING");
        for (const hotkey in prevState.bindings) {
            const binding = prevState.bindings[hotkey];
            Mousetrap.unbind(binding.keys, binding.action);
        }
        for (const hotkey in this.state.bindings) {
            const binding = this.state.bindings[hotkey];
            Mousetrap.bind(binding.keys, binding.callback, binding.action);
        }
    }

    componentWillUnmount () {
        console.log("HOTKEY MANAGER UNMOUNTED; UNBINDING");
        for (const hotkey in this.state.bindings) {
            const binding = this.state.bindings[hotkey];
            Mousetrap.unbind(binding.keys, binding.action);
        }
    }

    render () {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
