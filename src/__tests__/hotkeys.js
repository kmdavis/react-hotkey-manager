import { Hotkeys } from "../hotkeys";

describe("Hotkeys", () => {
    describe("#componentDidMount", () => {
        it("should bind hotkeys", () => {
            const fn = () => null;
            const target = {
                props: {
                    context: {
                        bind: sinon.spy(),
                        unbind: sinon.spy(),
                    },
                    keys: {
                        foo: {
                            callback: fn,
                        },
                    },
                },
            };
            Hotkeys.prototype.componentDidMount.call(target);
            expect(target.props.context.bind).to.have.been.calledWith({
                keys: "foo",
                callback: fn,
            });
            expect(target.props.context.unbind).to.not.have.been.called;
        });
    });

    describe("#componentWillUnmount", () => {
        it("should unbind hotkeys", () => {
            const fn = () => null;
            const target = {
                props: {
                    context: {
                        bind: sinon.spy(),
                        unbind: sinon.spy(),
                    },
                    keys: {
                        foo: {
                            callback: fn,
                        },
                    },
                },
            };
            Hotkeys.prototype.componentWillUnmount.call(target);
            expect(target.props.context.unbind).to.have.been.calledWith({
                keys: "foo",
                callback: fn,
            });
            expect(target.props.context.bind).to.not.have.been.called;
        });
    });

    describe("#componentDidUpdate", () => {
        it("should rebind hotkeys", () => {
            const fn1 = () => null;
            const fn2 = () => null;
            const target = {
                props: {
                    context: {
                        bind: sinon.spy(),
                        unbind: sinon.spy(),
                    },
                    keys: {
                        foo: {
                            callback: fn1,
                        },
                    },
                },
            };
            const prevProps = {
                context: {
                    bind: sinon.spy(),
                    unbind: sinon.spy(),
                },
                keys: {
                    bar: {
                        callback: fn2,
                    },
                },
            };
            Hotkeys.prototype.componentDidUpdate.call(target, prevProps);
            expect(prevProps.context.unbind).to.have.been.calledWith({
                keys: "bar",
                callback: fn2,
            });
            expect(target.props.context.bind).to.have.been.calledWith({
                keys: "foo",
                callback: fn1,
            });
        });
    });
});
