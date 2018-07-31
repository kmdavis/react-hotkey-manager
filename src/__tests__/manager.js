import HotkeysManager from "../manager";
import Mousetrap from "mousetrap";

describe("HotkeysManager", () => {
    describe(".getDerivedStateFromProps", () => {
        describe("#bind", () => {
            it("should bind", sinon.test(function () {
                this.stub(Mousetrap, "bind");
                const context = HotkeysManager.getDerivedStateFromProps({});
                const binding = {
                    keys: "foo",
                    callback: () => {},
                };
                context.bind(binding);
                expect(Mousetrap.bind).to.have.been.calledWith("foo", binding.callback, undefined);
                expect(context.bindings.foo).to.equal(binding);
            }));
        });

        describe("#unbind", () => {
            it("should unbind", sinon.test(function () {
                this.stub(Mousetrap, "unbind");
                const context = HotkeysManager.getDerivedStateFromProps({});
                const binding = {
                    keys: "foo",
                    callback: () => {},
                };
                context.bindings["foo"] = binding
                context.unbind(binding);
                expect(Mousetrap.unbind).to.have.been.calledWith("foo", undefined);
                expect(context.bindings.foo).to.be.undefined;
            }));
        });

        it("should return a context", () => {
            const context = HotkeysManager.getDerivedStateFromProps({});
            expect(context).to.have.keys("bind", "bindings", "unbind");
            expect(context.bind).to.be.a("function");
            expect(context.bindings).to.be.an("object");
            expect(context.unbind).to.be.a("function");
        });

        it("should include a renderHelp binding", () => {
            const context = HotkeysManager.getDerivedStateFromProps({
                renderHelp: () => null,
            });
            expect(context.bindings["?"]).to.contain({
                keys: "?",
                description: "Help",
            });
        });
    });

    describe("#componentDidMount", () => {
        it("should bind", sinon.test(function () {
            this.stub(Mousetrap, "bind");
            const target = {
                state: {
                    bindings: {
                        foo: {
                            keys: "foo",
                            callback: () => {},
                        },
                    },
                },
            };
            HotkeysManager.prototype.componentDidMount.call(target);
            expect(Mousetrap.bind).to.have.been
                .calledWith("foo", target.state.bindings.foo.callback, undefined);
        }));
    });

    describe("#componentDidUpdate", () => {
        it("should rebind", sinon.test(function () {
            this.stub(Mousetrap, "bind");
            this.stub(Mousetrap, "unbind");
            const target = {
                state: {
                    bindings: {
                        foo: {
                            keys: "foo",
                            callback: () => {},
                        },
                    },
                },
            };
            const prevState = {
                bindings: {
                    bar: {
                        keys: "bar",
                        callback: () => {},
                    }
                }
            }
            HotkeysManager.prototype.componentDidUpdate.call(target, {}, prevState);
            expect(Mousetrap.unbind).to.have.been.calledWith("bar", undefined);
            expect(Mousetrap.bind).to.have.been
                .calledWith("foo", target.state.bindings.foo.callback, undefined);
        }));
    });

    describe("#componentWillUnmount", () => {
        it("should unbind", sinon.test(function () {
            this.stub(Mousetrap, "unbind");
            const target = {
                state: {
                    bindings: {
                        foo: {
                            keys: "foo",
                            callback: () => {},
                        },
                    },
                },
            };
            HotkeysManager.prototype.componentWillUnmount.call(target);
            expect(Mousetrap.unbind).to.have.been.calledWith("foo", undefined);
        }));
    });
});
