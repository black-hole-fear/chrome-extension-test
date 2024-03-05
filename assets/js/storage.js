var r = Object.defineProperty;
var a = (s, e, t) =>
    e in s
        ? r(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
        : (s[e] = t);
var o = (s, e, t) => (a(s, typeof e != "symbol" ? e + "" : e, t), t);
class c {
    constructor(e, t) {
        o(this, "type");
        o(this, "data");
        (this.type = e), (this.data = t);
    }
}
function g(s) {
    return new Promise((e) => {
        chrome.storage.session.get([s], (t) => {
            e(t[s]);
        });
    });
}
function i(s) {
    return new Promise((e) => {
        chrome.storage.local.get([s], (t) => {
            e(t[s]);
        });
    });
}
function m(s, e) {
    return new Promise((t) => {
        chrome.storage.session.set({ [s]: e }, () => {
            t(e);
        });
    });
}
function u(s, e) {
    return new Promise((t) => {
        chrome.storage.local.set({ [s]: e }, () => {
            t(e);
        });
    });
}
export { c as M, u as a, i as b, g, m as s };
