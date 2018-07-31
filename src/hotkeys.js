import Context from "./context";
import PropTypes from "prop-types";
import React, { Component } from "react";

export class Hotkeys extends Component {
    static propTypes = {
        context: PropTypes.shape({
            bind: PropTypes.func,
            unbind: PropTypes.func,
        }),
        keys: PropTypes.object,
    }

    componentDidMount () {
        console.log("HOTKEYS MOUNTED; BINDING");
        for (const keys in this.props.keys) {
            this.props.context.bind(Object.assign({ keys }, this.props.keys[keys]));
        }
    }

    componentDidUpdate (prevProps, prevState) {
        console.log("HOTKEYS UPDATED; REBINDING");
        for (const keys in prevProps.keys) {
            prevProps.context.unbind(Object.assign({ keys }, prevProps.keys[keys]));
        }
        for (const keys in this.props.keys) {
            this.props.context.bind(Object.assign({ keys }, this.props.keys[keys]));
        }
    }

    componentWillUnmount () {
        console.log("HOTKEYS UNMOUNTED; UNBINDING");
        for (const keys in this.props.keys) {
            this.props.context.unbind(Object.assign({ keys }, this.props.keys[keys]));
        }
    }

    render () {
        return null;
    }
}

export default props => (
    <Context.Consumer>
        {context => <Hotkeys context={context} {...props} />}
    </Context.Consumer>
);