export function LearningContent(
  countdown,
  shouldShowWelcome,
  gotoOrigin,
  endInjection,
  browser
) {
    "use strict";
    function t() {}
    const n = (t) => t;
    function e(t, n) {
      for (const e in n) t[e] = n[e];
      return t;
    }
    function r(t) {
      return t();
    }
    function i() {
      return Object.create(null);
    }
    function o(t) {
      t.forEach(r);
    }
    function a(t) {
      return "function" == typeof t;
    }
    function s(t, n) {
      return t != t
        ? n == n
        : t !== n || (t && "object" == typeof t) || "function" == typeof t;
    }
    function u(t) {
      const n = {};
      for (const e in t) "$" !== e[0] && (n[e] = t[e]);
      return n;
    }
    const l = "undefined" != typeof window;
    let c = l ? () => window.performance.now() : () => Date.now(),
      f = l ? (t) => requestAnimationFrame(t) : t;
    const p = new Set();
    function d(t) {
      p.forEach((n) => {
        n.c(t) || (p.delete(n), n.f());
      }),
        0 !== p.size && f(d);
    }
    function h(t, n) {
      t.appendChild(n);
    }
    function v(t, n, e) {
      t.insertBefore(n, e || null);
    }
    function g(t) {
      t.parentNode.removeChild(t);
    }
    function m(t) {
      return document.createElement(t);
    }
    function b(t) {
      return document.createTextNode(t);
    }
    function x() {
      return b(" ");
    }
    function y() {
      return b("");
    }
    function E(t, n, e, r) {
      return t.addEventListener(n, e, r), () => t.removeEventListener(n, e, r);
    }
    function S(t, n, e) {
      null == e
        ? t.removeAttribute(n)
        : t.getAttribute(n) !== e && t.setAttribute(n, e);
    }
    function w(t, n) {
      const e = document.createEvent("CustomEvent");
      return e.initCustomEvent(t, !1, !1, n), e;
    }
    const M = new Set();
    let C,
      D = 0;
    function R(t, n, e, r, i, o, a, s = 0) {
      const u = 16.666 / r;
      let l = "{\n";
      for (let t = 0; t <= 1; t += u) {
        const r = n + (e - n) * o(t);
        l += 100 * t + `%{${a(r, 1 - r)}}\n`;
      }
      const c = l + `100% {${a(e, 1 - e)}}\n}`,
        f = `__svelte_${(function (t) {
          let n = 5381,
            e = t.length;
          for (; e--; ) n = ((n << 5) - n) ^ t.charCodeAt(e);
          return n >>> 0;
        })(c)}_${s}`,
        p = t.ownerDocument;
      M.add(p);
      const d =
          p.__svelte_stylesheet ||
          (p.__svelte_stylesheet = p.head.appendChild(m("style")).sheet),
        h = p.__svelte_rules || (p.__svelte_rules = {});
      h[f] ||
        ((h[f] = !0), d.insertRule(`@keyframes ${f} ${c}`, d.cssRules.length));
      const v = t.style.animation || "";
      return (
        (t.style.animation = `${
          v ? `${v}, ` : ""
        }${f} ${r}ms linear ${i}ms 1 both`),
        (D += 1),
        f
      );
    }
    function O(t, n) {
      const e = (t.style.animation || "").split(", "),
        r = e.filter(
          n ? (t) => t.indexOf(n) < 0 : (t) => -1 === t.indexOf("__svelte")
        ),
        i = e.length - r.length;
      i &&
        ((t.style.animation = r.join(", ")),
        (D -= i),
        D ||
          f(() => {
            D ||
              (M.forEach((t) => {
                const n = t.__svelte_stylesheet;
                let e = n.cssRules.length;
                for (; e--; ) n.deleteRule(e);
                t.__svelte_rules = {};
              }),
              M.clear());
          }));
    }
    function P(t) {
      C = t;
    }
    function z() {
      if (!C) throw new Error("Function called outside component initialization");
      return C;
    }
    function G(t) {
      z().$$.on_mount.push(t);
    }
    const B = [],
      T = [],
      _ = [],
      k = [],
      A = Promise.resolve();
    let I = !1;
    function j() {
      I || ((I = !0), A.then($));
    }
    function N(t) {
      _.push(t);
    }
    function F(t) {
      k.push(t);
    }
    let Y = !1;
    const X = new Set();
    function $() {
      if (!Y) {
        Y = !0;
        do {
          for (let t = 0; t < B.length; t += 1) {
            const n = B[t];
            P(n), q(n.$$);
          }
          for (P(null), B.length = 0; T.length; ) T.pop()();
          for (let t = 0; t < _.length; t += 1) {
            const n = _[t];
            X.has(n) || (X.add(n), n());
          }
          _.length = 0;
        } while (B.length);
        for (; k.length; ) k.pop()();
        (I = !1), (Y = !1), X.clear();
      }
    }
    function q(t) {
      if (null !== t.fragment) {
        t.update(), o(t.before_update);
        const n = t.dirty;
        (t.dirty = [-1]),
          t.fragment && t.fragment.p(t.ctx, n),
          t.after_update.forEach(N);
      }
    }
    let L;
    function V(t, n, e) {
      t.dispatchEvent(w(`${n ? "intro" : "outro"}${e}`));
    }
    const W = new Set();
    let H;
    function U() {
      H = { r: 0, c: [], p: H };
    }
    function Z() {
      H.r || o(H.c), (H = H.p);
    }
    function K(t, n) {
      t && t.i && (W.delete(t), t.i(n));
    }
    function J(t, n, e, r) {
      if (t && t.o) {
        if (W.has(t)) return;
        W.add(t),
          H.c.push(() => {
            W.delete(t), r && (e && t.d(1), r());
          }),
          t.o(n);
      }
    }
    const Q = { duration: 0 };
    function tt(e, r, i, s) {
      let u = r(e, i),
        l = s ? 0 : 1,
        h = null,
        v = null,
        g = null;
      function m() {
        g && O(e, g);
      }
      function b(t, n) {
        const e = t.b - l;
        return (
          (n *= Math.abs(e)),
          {
            a: l,
            b: t.b,
            d: e,
            duration: n,
            start: t.start,
            end: t.start + n,
            group: t.group,
          }
        );
      }
      function x(r) {
        const {
            delay: i = 0,
            duration: a = 300,
            easing: s = n,
            tick: x = t,
            css: y,
          } = u || Q,
          E = { start: c() + i, b: r };
        r || ((E.group = H), (H.r += 1)),
          h || v
            ? (v = E)
            : (y && (m(), (g = R(e, l, r, a, i, s, y))),
              r && x(0, 1),
              (h = b(E, a)),
              N(() => V(e, r, "start")),
              (function (t) {
                let n;
                0 === p.size && f(d),
                  new Promise((e) => {
                    p.add((n = { c: t, f: e }));
                  });
              })((t) => {
                if (
                  (v &&
                    t > v.start &&
                    ((h = b(v, a)),
                    (v = null),
                    V(e, h.b, "start"),
                    y && (m(), (g = R(e, l, h.b, h.duration, 0, s, u.css)))),
                  h)
                )
                  if (t >= h.end)
                    x((l = h.b), 1 - l),
                      V(e, h.b, "end"),
                      v || (h.b ? m() : --h.group.r || o(h.group.c)),
                      (h = null);
                  else if (t >= h.start) {
                    const n = t - h.start;
                    (l = h.a + h.d * s(n / h.duration)), x(l, 1 - l);
                  }
                return !(!h && !v);
              }));
      }
      return {
        run(t) {
          a(u)
            ? (L ||
                ((L = Promise.resolve()),
                L.then(() => {
                  L = null;
                })),
              L).then(() => {
                (u = u()), x(t);
              })
            : x(t);
        },
        end() {
          m(), (h = v = null);
        },
      };
    }
    function nt(t, n, e) {
      const r = t.$$.props[n];
      void 0 !== r && ((t.$$.bound[r] = e), e(t.$$.ctx[r]));
    }
    function et(t) {
      t && t.c();
    }
    function rt(t, n, e, i) {
      const { fragment: s, on_mount: u, on_destroy: l, after_update: c } = t.$$;
      s && s.m(n, e),
        i ||
          N(() => {
            const n = u.map(r).filter(a);
            l ? l.push(...n) : o(n), (t.$$.on_mount = []);
          }),
        c.forEach(N);
    }
    function it(t, n) {
      const e = t.$$;
      null !== e.fragment &&
        (o(e.on_destroy),
        e.fragment && e.fragment.d(n),
        (e.on_destroy = e.fragment = null),
        (e.ctx = []));
    }
    function ot(n, e, r, a, s, u, l = [-1]) {
      const c = C;
      P(n);
      const f = (n.$$ = {
        fragment: null,
        ctx: null,
        props: u,
        update: t,
        not_equal: s,
        bound: i(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(c ? c.$$.context : e.context || []),
        callbacks: i(),
        dirty: l,
        skip_bound: !1,
      });
      let p = !1;
      if (
        ((f.ctx = r
          ? r(n, e.props || {}, (t, e, ...r) => {
              const i = r.length ? r[0] : e;
              return (
                f.ctx &&
                  s(f.ctx[t], (f.ctx[t] = i)) &&
                  (!f.skip_bound && f.bound[t] && f.bound[t](i),
                  p &&
                    (function (t, n) {
                      -1 === t.$$.dirty[0] &&
                        (B.push(t), j(), t.$$.dirty.fill(0)),
                        (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
                    })(n, t)),
                e
              );
            })
          : []),
        f.update(),
        (p = !0),
        o(f.before_update),
        (f.fragment = !!a && a(f.ctx)),
        e.target)
      ) {
        if (e.hydrate) {
          const t = (function (t) {
            return Array.from(t.childNodes);
          })(e.target);
          f.fragment && f.fragment.l(t), t.forEach(g);
        } else f.fragment && f.fragment.c();
        e.intro && K(n.$$.fragment),
          rt(n, e.target, e.anchor, e.customElement),
          $();
      }
      P(c);
    }
    class at {
      $destroy() {
        it(this, 1), (this.$destroy = t);
      }
      $on(t, n) {
        const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return (
          e.push(n),
          () => {
            const t = e.indexOf(n);
            -1 !== t && e.splice(t, 1);
          }
        );
      }
      $set(t) {
        var n;
        this.$$set &&
          ((n = t), 0 !== Object.keys(n).length) &&
          ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
      }
    }
    function st(t, { delay: e = 0, duration: r = 400, easing: i = n } = {}) {
      const o = +getComputedStyle(t).opacity;
      return {
        delay: e,
        duration: r,
        easing: i,
        css: (t) => "opacity: " + t * o,
      };
    }
    function ut(n) {
      let e, r, i, o, a, s, u, l, c, f;
      return {
        c() {
          (e = m("div")),
            (r = m("div")),
            (i = m("img")),
            (a = x()),
            (s = m("p")),
            (s.textContent = `${n[2]}`),
            S(i, "id", "aiki-img"),
            i.src !== (o = browser.runtime.getURL("images/AikiLogo.png")) &&
              S(i, "src", browser.runtime.getURL("images/AikiLogo.png")),
            S(i, "alt", "Aiki Logo"),
            S(i, "class", "svelte-tkxhh1"),
            S(s, "id", "aiki-p"),
            S(s, "class", "svelte-tkxhh1"),
            S(r, "id", "aiki-wrapper"),
            S(r, "class", "svelte-tkxhh1"),
            S(e, "id", "aiki-overlay"),
            S(e, "class", "svelte-tkxhh1");
        },
        m(t, o) {
          v(t, e, o),
            h(e, r),
            h(r, i),
            h(r, a),
            h(r, s),
            (l = !0),
            c || ((f = E(e, "click", n[3])), (c = !0));
        },
        p: t,
        i(t) {
          l ||
            (N(() => {
              u || (u = tt(e, st, { delay: 0, duration: 200 }, !0)), u.run(1);
            }),
            (l = !0));
        },
        o(t) {
          u || (u = tt(e, st, { delay: 0, duration: 200 }, !1)),
            u.run(0),
            (l = !1);
        },
        d(t) {
          t && g(e), t && u && u.end(), (c = !1), f();
        },
      };
    }
    function lt(t) {
      let n,
        e,
        r = t[1] && ut(t);
      return {
        c() {
          r && r.c(), (n = y());
        },
        m(t, i) {
          r && r.m(t, i), v(t, n, i), (e = !0);
        },
        p(t, [e]) {
          t[1]
            ? r
              ? (r.p(t, e), 2 & e && K(r, 1))
              : ((r = ut(t)), r.c(), K(r, 1), r.m(n.parentNode, n))
            : r &&
              (U(),
              J(r, 1, 1, () => {
                r = null;
              }),
              Z());
        },
        i(t) {
          e || (K(r), (e = !0));
        },
        o(t) {
          J(r), (e = !1);
        },
        d(t) {
          r && r.d(t), t && g(n);
        },
      };
    }
    function ct(t, n, e) {
      let { welcomeVisible: r } = n,
        i = !0;
      setTimeout(() => e(1, (i = !1)), 2e3);
      const o = [
        "Let's do something productive! 😊",
        "Time to learn some Python! 🖥️",
        "Time for some more learning! 👓",
        "Let's earn some break time! ⏲️",
        "That's right, it's Python time! 🐍",
        "Let's get some coding done! 🤖",
        "Python won't teach itself! 👩‍🏫",
      ];
      let a = (function () {
        let t = ((n = 0), (e = 6), Math.floor(Math.random() * (e - n)) + n);
        var n, e;
        return o[t];
      })();
      return (
        (t.$$set = (t) => {
          "welcomeVisible" in t && e(0, (r = t.welcomeVisible));
        }),
        [r, i, a, () => e(0, (r = !1))]
      );
    }
    class ft extends at {
      constructor(t) {
        super(), ot(this, t, ct, lt, s, { welcomeVisible: 0 });
      }
    }
    function pt(t) {
      for (var n = [], e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
      return n
        .map(function (n) {
          return n
            .split(" ")
            .map(function (n) {
              return n ? "" + t + n : "";
            })
            .join(" ");
        })
        .join(" ");
    }
    function dt(t, n) {
      return function (e) {
        e && (t[n] = e);
      };
    }
    function ht(t, n, e) {
      return function (r) {
        r && (t[n][e] = r);
      };
    }
    function vt(t, n) {
      return function (e) {
        var r = e.prototype;
        t.forEach(function (t) {
          n(r, t);
        });
      };
    }
    var gt = (function () {
        function t() {
          (this.keys = []), (this.values = []);
        }
        var n = t.prototype;
        return (
          (n.get = function (t) {
            return this.values[this.keys.indexOf(t)];
          }),
          (n.set = function (t, n) {
            var e = this.keys,
              r = this.values,
              i = e.indexOf(t),
              o = -1 === i ? e.length : i;
            (e[o] = t), (r[o] = n);
          }),
          t
        );
      })(),
      mt = (function () {
        function t() {
          this.object = {};
        }
        var n = t.prototype;
        return (
          (n.get = function (t) {
            return this.object[t];
          }),
          (n.set = function (t, n) {
            this.object[t] = n;
          }),
          t
        );
      })(),
      bt = "function" == typeof Map,
      xt = (function () {
        function t() {}
        var n = t.prototype;
        return (
          (n.connect = function (t, n) {
            (this.prev = t),
              (this.next = n),
              t && (t.next = this),
              n && (n.prev = this);
          }),
          (n.disconnect = function () {
            var t = this.prev,
              n = this.next;
            t && (t.next = n), n && (n.prev = t);
          }),
          (n.getIndex = function () {
            for (var t = this, n = -1; t; ) (t = t.prev), ++n;
            return n;
          }),
          t
        );
      })();
    var yt = (function () {
      function t(t, n, e, r, i, o, a, s) {
        (this.prevList = t),
          (this.list = n),
          (this.added = e),
          (this.removed = r),
          (this.changed = i),
          (this.maintained = o),
          (this.changedBeforeAdded = a),
          (this.fixed = s);
      }
      var n = t.prototype;
      return (
        Object.defineProperty(n, "ordered", {
          get: function () {
            return this.cacheOrdered || this.caculateOrdered(), this.cacheOrdered;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(n, "pureChanged", {
          get: function () {
            return (
              this.cachePureChanged || this.caculateOrdered(),
              this.cachePureChanged
            );
          },
          enumerable: !0,
          configurable: !0,
        }),
        (n.caculateOrdered = function () {
          var t = (function (t, n) {
              var e = [],
                r = [];
              return (
                t.forEach(function (t) {
                  var n = t[0],
                    i = t[1],
                    o = new xt();
                  (e[n] = o), (r[i] = o);
                }),
                e.forEach(function (t, n) {
                  t.connect(e[n - 1]);
                }),
                t
                  .filter(function (t, e) {
                    return !n[e];
                  })
                  .map(function (t, n) {
                    var i = t[0],
                      o = t[1];
                    if (i === o) return [0, 0];
                    var a = e[i],
                      s = r[o - 1],
                      u = a.getIndex();
                    return (
                      a.disconnect(),
                      s ? a.connect(s, s.next) : a.connect(void 0, e[0]),
                      [u, a.getIndex()]
                    );
                  })
              );
            })(this.changedBeforeAdded, this.fixed),
            n = this.changed,
            e = [];
          (this.cacheOrdered = t.filter(function (t, r) {
            var i = t[0],
              o = t[1],
              a = n[r],
              s = a[0],
              u = a[1];
            if (i !== o) return e.push([s, u]), !0;
          })),
            (this.cachePureChanged = e);
        }),
        t
      );
    })();
    function Et(t, n, e) {
      var r = bt ? Map : e ? mt : gt,
        i =
          e ||
          function (t) {
            return t;
          },
        o = [],
        a = [],
        s = [],
        u = t.map(i),
        l = n.map(i),
        c = new r(),
        f = new r(),
        p = [],
        d = [],
        h = {},
        v = [],
        g = 0,
        m = 0;
      return (
        u.forEach(function (t, n) {
          c.set(t, n);
        }),
        l.forEach(function (t, n) {
          f.set(t, n);
        }),
        u.forEach(function (t, n) {
          var e = f.get(t);
          void 0 === e ? (++m, a.push(n)) : (h[e] = m);
        }),
        l.forEach(function (t, n) {
          var e = c.get(t);
          void 0 === e
            ? (o.push(n), ++g)
            : (s.push([e, n]),
              (m = h[n] || 0),
              p.push([e - m, n - g]),
              d.push(n === e),
              e !== n && v.push([e, n]));
        }),
        a.reverse(),
        new yt(t, n, o, a, v, s, p, d)
      );
    }
    var St = (function () {
        function t(t, n) {
          void 0 === t && (t = []),
            (this.findKeyCallback = n),
            (this.list = [].slice.call(t));
        }
        return (
          (t.prototype.update = function (t) {
            var n = [].slice.call(t),
              e = Et(this.list, n, this.findKeyCallback);
            return (this.list = n), e;
          }),
          t
        );
      })(),
      wt = ['"', "'", '\\"', "\\'"],
      Mt = 1e-7,
      Ct = {
        cm: function (t) {
          return (96 * t) / 2.54;
        },
        mm: function (t) {
          return (96 * t) / 254;
        },
        in: function (t) {
          return 96 * t;
        },
        pt: function (t) {
          return (96 * t) / 72;
        },
        pc: function (t) {
          return (96 * t) / 6;
        },
        "%": function (t, n) {
          return (t * n) / 100;
        },
        vw: function (t, n) {
          return void 0 === n && (n = window.innerWidth), (t / 100) * n;
        },
        vh: function (t, n) {
          return void 0 === n && (n = window.innerHeight), (t / 100) * n;
        },
        vmax: function (t, n) {
          return (
            void 0 === n && (n = Math.max(window.innerWidth, window.innerHeight)),
            (t / 100) * n
          );
        },
        vmin: function (t, n) {
          return (
            void 0 === n && (n = Math.min(window.innerWidth, window.innerHeight)),
            (t / 100) * n
          );
        },
      };
    function Dt(t) {
      return void 0 === t;
    }
    function Rt(t) {
      return t && "object" == typeof t;
    }
    function Ot(t) {
      return Array.isArray(t);
    }
    function Pt(t) {
      return "string" == typeof t;
    }
    function zt(t) {
      return "function" == typeof t;
    }
    function Gt(t, n, e, r) {
      for (var i = e; i < r; ++i) {
        var o = n[i].trim();
        if (o === t) return i;
        var a = i;
        if (
          ("(" === o
            ? (a = Gt(")", n, i + 1, r))
            : wt.indexOf(o) > -1 && (a = Gt(o, n, i + 1, r)),
          -1 === a)
        )
          break;
        i = a;
      }
      return -1;
    }
    function Bt(t, n) {
      for (
        var e = new RegExp(
            "(\\s*" + (n || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)",
            "g"
          ),
          r = t.split(e).filter(Boolean),
          i = r.length,
          o = [],
          a = [],
          s = 0;
        s < i;
        ++s
      ) {
        var u = r[s].trim(),
          l = s;
        if ("(" === u) l = Gt(")", r, s + 1, i);
        else {
          if (")" === u) throw new Error("invalid format");
          if (wt.indexOf(u) > -1) l = Gt(u, r, s + 1, i);
          else if (u === n) {
            a.length && (o.push(a.join("")), (a = []));
            continue;
          }
        }
        -1 === l && (l = i - 1), a.push(r.slice(s, l + 1).join("")), (s = l);
      }
      return a.length && o.push(a.join("")), o;
    }
    function Tt(t) {
      return Bt(t, "");
    }
    function _t(t) {
      return Bt(t, ",");
    }
    function kt(t) {
      var n = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(t);
      return !n || n.length < 4
        ? {}
        : { prefix: n[1], value: n[2], suffix: n[3] };
    }
    function At(t) {
      var n = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(t);
      if (!n) return { prefix: "", unit: "", value: NaN };
      var e = n[1],
        r = n[2];
      return { prefix: e, unit: n[3], value: parseFloat(r) };
    }
    function It(t) {
      return t.replace(/[\s-_]([a-z])/g, function (t, n) {
        return n.toUpperCase();
      });
    }
    function jt(t, n) {
      return (
        void 0 === n && (n = "-"),
        t.replace(/([a-z])([A-Z])/g, function (t, e, r) {
          return "" + e + n + r.toLowerCase();
        })
      );
    }
    function Nt() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    function Ft(t, n, e) {
      void 0 === e && (e = -1);
      for (var r = t.length, i = 0; i < r; ++i) if (n(t[i], i, t)) return i;
      return e;
    }
    function Yt(t) {
      if (Object.keys) return Object.keys(t);
      var n = [];
      for (var e in n) n.push(e);
      return n;
    }
    function Xt(t, n) {
      var e = At(t),
        r = e.value,
        i = e.unit;
      if (Rt(n)) {
        var o = n[i];
        if (o) {
          if (zt(o)) return o(r);
          if (Ct[i]) return Ct[i](r, o);
        }
      } else if ("%" === i) return (r * n) / 100;
      return Ct[i] ? Ct[i](r) : r;
    }
    function $t(t, n) {
      return n ? Math.round(t / n) * n : t;
    }
    function qt(t, n, e) {
      return (
        [
          [$t(n[0], Mt), $t((n[0] * t[1]) / t[0], Mt)],
          [$t((n[1] * t[0]) / t[1], Mt), $t(n[1], Mt)],
        ].filter(function (t) {
          return t.every(function (t, r) {
            return e ? t <= n[r] : t >= n[r];
          });
        })[0] || t
      );
    }
    function Lt(t, n, e, r) {
      if (!r)
        return t.map(function (t, r) {
          return (function (t, n, e) {
            return Math.max(n, Math.min(t, e));
          })(t, n[r], e[r]);
        });
      var i = t[0],
        o = t[1],
        a = qt(t, n, !1),
        s = a[0],
        u = a[1],
        l = qt(t, e, !0),
        c = l[0],
        f = l[1];
      return (
        i < s || o < u
          ? ((i = s), (o = u))
          : (i > c || o > f) && ((i = c), (o = f)),
        [i, o]
      );
    }
    function Vt(t) {
      for (var n = t.length, e = 0, r = n - 1; r >= 0; --r) e += t[r];
      return n ? e / n : 0;
    }
    function Wt(t, n) {
      var e = n[0] - t[0],
        r = n[1] - t[1],
        i = Math.atan2(r, e);
      return i >= 0 ? i : i + 2 * Math.PI;
    }
    function Ht(t) {
      var n = (function (t) {
          return [0, 1].map(function (n) {
            return Vt(
              t.map(function (t) {
                return t[n];
              })
            );
          });
        })(t),
        e = Wt(n, t[0]),
        r = Wt(n, t[1]);
      return (e < r && r - e < Math.PI) || (e > r && r - e < -Math.PI) ? 1 : -1;
    }
    function Ut(t, n) {
      return Math.sqrt(
        Math.pow((n ? n[0] : 0) - t[0], 2) + Math.pow((n ? n[1] : 0) - t[1], 2)
      );
    }
    function Zt(t, n) {
      return t.classList
        ? t.classList.contains(n)
        : !!t.className.match(new RegExp("(\\s|^)" + n + "(\\s|$)"));
    }
    function Kt(t, n, e, r) {
      t.addEventListener(n, e, r);
    }
    function Jt(t, n, e) {
      t.removeEventListener(n, e);
    }
    /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
  
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
  
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */ var Qt = function (
      t,
      n
    ) {
      return (Qt =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, n) {
            t.__proto__ = n;
          }) ||
        function (t, n) {
          for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
        })(t, n);
    };
    function tn(t, n) {
      function e() {
        this.constructor = t;
      }
      Qt(t, n),
        (t.prototype =
          null === n ? Object.create(n) : ((e.prototype = n.prototype), new e()));
    }
    var nn = function () {
      return (nn =
        Object.assign ||
        function (t) {
          for (var n, e = 1, r = arguments.length; e < r; e++)
            for (var i in (n = arguments[e]))
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          return t;
        }).apply(this, arguments);
    };
    function en(t, n) {
      var e = {};
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) &&
          n.indexOf(r) < 0 &&
          (e[r] = t[r]);
      if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
          n.indexOf(r[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
            (e[r[i]] = t[r[i]]);
      }
      return e;
    }
    function rn(t, n) {
      if (t === n) return !1;
      for (var e in t) if (!(e in n)) return !0;
      for (var e in n) if (t[e] !== n[e]) return !0;
      return !1;
    }
    function on(t, n) {
      var e = Object.keys(t),
        r = Object.keys(n),
        i = Et(e, r, function (t) {
          return t;
        }),
        o = {},
        a = {},
        s = {};
      return (
        i.added.forEach(function (t) {
          var e = r[t];
          o[e] = n[e];
        }),
        i.removed.forEach(function (n) {
          var r = e[n];
          a[r] = t[r];
        }),
        i.maintained.forEach(function (r) {
          var i = r[0],
            o = e[i],
            a = [t[o], n[o]];
          t[o] !== n[o] && (s[o] = a);
        }),
        { added: o, removed: a, changed: s }
      );
    }
    function an(t) {
      t.forEach(function (t) {
        t();
      });
    }
    function sn(t) {
      var n = 0;
      return t.map(function (t) {
        return null == t ? "$compat" + ++n : "" + t;
      });
    }
    function un(t, n, e, r) {
      return Pt(t) || "number" == typeof t
        ? new vn("text_" + t, n, e, r, null, {})
        : new ("string" == typeof t.type
            ? gn
            : t.type.prototype.render
            ? En
            : xn)(t.type, n, e, r, t.ref, t.props);
    }
    function ln(t) {
      var n = [];
      return (
        t.forEach(function (t) {
          n = n.concat(Ot(t) ? ln(t) : t);
        }),
        n
      );
    }
    function cn(t) {
      var n = t.className,
        e = en(t, ["className"]);
      return null != n && (e.class = n), delete e.style, delete e.children, e;
    }
    function fn(t, n) {
      if (!n) return t;
      for (var e in n) Dt(t[e]) && (t[e] = n[e]);
      return t;
    }
    function pn(t, n) {
      for (var e = [], r = 2; r < arguments.length; r++) e[r - 2] = arguments[r];
      var i = n || {},
        o = i.key,
        a = i.ref,
        s = en(i, ["key", "ref"]);
      return {
        type: t,
        key: o,
        ref: a,
        props: nn(nn({}, s), {
          children: ln(e).filter(function (t) {
            return null != t && !1 !== t;
          }),
        }),
      };
    }
    var dn = (function () {
      function t(t, n, e, r, i, o) {
        void 0 === o && (o = {}),
          (this.type = t),
          (this.key = n),
          (this.index = e),
          (this.container = r),
          (this.ref = i),
          (this.props = o),
          (this._providers = []);
      }
      var n = t.prototype;
      return (
        (n._should = function (t, n) {
          return !0;
        }),
        (n._update = function (t, n, e, r) {
          if (this.base && !Pt(n) && !r && !this._should(n.props, e)) return !1;
          (this.original = n), this._setState(e);
          var i = this.props;
          return (
            Pt(n) || ((this.props = n.props), (this.ref = n.ref)),
            this._render(t, this.base ? i : {}, e),
            !0
          );
        }),
        (n._mounted = function () {
          var t = this.ref;
          t && t(this.base);
        }),
        (n._setState = function (t) {}),
        (n._updated = function () {
          var t = this.ref;
          t && t(this.base);
        }),
        (n._destroy = function () {
          var t = this.ref;
          t && t(null);
        }),
        t
      );
    })();
    function hn(t) {
      var n = {},
        e = {};
      for (var r in t)
        0 === r.indexOf("on")
          ? (e[r.replace("on", "").toLowerCase()] = t[r])
          : (n[r] = t[r]);
      return { attributes: n, events: e };
    }
    var vn = (function (t) {
        function n() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        tn(n, t);
        var e = n.prototype;
        return (
          (e._render = function (t) {
            var n = this,
              e = !this.base;
            return (
              e &&
                (this.base = document.createTextNode(
                  this.type.replace("text_", "")
                )),
              t.push(function () {
                e ? n._mounted() : n._updated();
              }),
              !0
            );
          }),
          (e._unmount = function () {
            this.base.parentNode.removeChild(this.base);
          }),
          n
        );
      })(dn),
      gn = (function (t) {
        function n() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return (n.events = {}), n;
        }
        tn(n, t);
        var e = n.prototype;
        return (
          (e.addEventListener = function (t, n) {
            var e = this.events;
            (e[t] = function (t) {
              (t.nativeEvent = t), n(t);
            }),
              this.base.addEventListener(t, e[t]);
          }),
          (e.removeEventListener = function (t) {
            var n = this.events;
            this.base.removeEventListener(t, n[t]), delete n[t];
          }),
          (e._should = function (t) {
            return rn(this.props, t);
          }),
          (e._render = function (t, n) {
            var e = this,
              r = !this.base;
            r &&
              (this.base =
                this.props.portalContainer || document.createElement(this.type)),
              Dn(this, this._providers, this.props.children, t, null);
            var i = this.base,
              o = hn(n),
              a = o.attributes,
              s = o.events,
              u = hn(this.props),
              l = u.attributes,
              c = u.events;
            return (
              (function (t, n, e) {
                var r = on(t, n),
                  i = r.added,
                  o = r.removed,
                  a = r.changed;
                for (var s in i) e.setAttribute(s, i[s]);
                for (var s in a) e.setAttribute(s, a[s][1]);
                for (var s in o) e.removeAttribute(s);
              })(cn(a), cn(l), i),
              (function (t, n, e) {
                var r = on(t, n),
                  i = r.added,
                  o = r.removed,
                  a = r.changed;
                for (var s in o) e.removeEventListener(s);
                for (var s in i) e.addEventListener(s, i[s]);
                for (var s in a)
                  e.removeEventListener(s), e.addEventListener(s, a[s][1]);
                for (var s in o) e.removeEventListener(s);
              })(s, c, this),
              (function (t, n, e) {
                var r = e.style,
                  i = on(t, n),
                  o = i.added,
                  a = i.removed,
                  s = i.changed;
                for (var u in o) {
                  var l = jt(u, "-");
                  r.setProperty ? r.setProperty(l, o[u]) : (r[l] = o[u]);
                }
                for (var u in s)
                  (l = jt(u, "-")),
                    r.setProperty ? r.setProperty(l, s[u][1]) : (r[l] = s[u][1]);
                for (var u in a)
                  (l = jt(u, "-")),
                    r.removeProperty ? r.removeProperty(l) : (r[l] = "");
              })(n.style || {}, this.props.style || {}, i),
              t.push(function () {
                r ? e._mounted() : e._updated();
              }),
              !0
            );
          }),
          (e._unmount = function () {
            var t = this.events,
              n = this.base;
            for (var e in t) n.removeEventListener(e, t[e]);
            this._providers.forEach(function (t) {
              t._unmount();
            }),
              (this.events = {}),
              this.props.portalContainer || n.parentNode.removeChild(n);
          }),
          n
        );
      })(dn);
    function mn(t) {
      if (!t) return null;
      var n = t.base;
      return n instanceof Node ? n : mn(t.container);
    }
    function bn(t) {
      if (!t) return null;
      if (t instanceof Node) return t;
      var n = t._provider._providers;
      return n.length ? bn(n[0].base) : null;
    }
    var xn = (function (t) {
        function n() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        tn(n, t);
        var e = n.prototype;
        return (
          (e._render = function (t) {
            var n = this.type(this.props);
            return Dn(this, this._providers, n ? [n] : [], t), !0;
          }),
          (e._unmount = function () {
            this._providers.forEach(function (t) {
              t._unmount();
            });
          }),
          n
        );
      })(dn),
      yn = (function (t) {
        function n(n) {
          var e = t.call(this, "container", "container", 0, null) || this;
          return (e.base = n), e;
        }
        tn(n, t);
        var e = n.prototype;
        return (
          (e._render = function () {
            return !0;
          }),
          (e._unmount = function () {}),
          n
        );
      })(dn),
      En = (function (t) {
        function n(n, e, r, i, o, a) {
          return (
            void 0 === a && (a = {}),
            t.call(this, n, e, r, i, o, fn(a, n.defaultProps)) || this
          );
        }
        tn(n, t);
        var e = n.prototype;
        return (
          (e._should = function (t, n) {
            return this.base.shouldComponentUpdate(
              fn(t, this.type.defaultProps),
              n || this.base.state
            );
          }),
          (e._render = function (t, n, e) {
            var r = this;
            this.props = fn(this.props, this.type.defaultProps);
            var i = !this.base;
            i
              ? ((this.base = new this.type(this.props)),
                (this.base._provider = this))
              : (this.base.props = this.props);
            var o = this.base,
              a = o.state,
              s = o.render();
            s &&
              s.props &&
              !s.props.children.length &&
              (s.props.children = this.props.children),
              Dn(this, this._providers, s ? [s] : [], t, e, null),
              t.push(function () {
                i
                  ? (r._mounted(), o.componentDidMount())
                  : (r._updated(), o.componentDidUpdate(n, a));
              });
          }),
          (e._setState = function (t) {
            t && (this.base.state = t);
          }),
          (e._unmount = function () {
            this._providers.forEach(function (t) {
              t._unmount();
            }),
              this.base.componentWillUnmount();
          }),
          n
        );
      })(dn),
      Sn = (function () {
        function t(t) {
          void 0 === t && (t = {}), (this.props = t), (this.state = {});
        }
        var n = t.prototype;
        return (
          (n.shouldComponentUpdate = function (t, n) {
            return !0;
          }),
          (n.render = function () {
            return null;
          }),
          (n.setState = function (t, n, e) {
            var r = [],
              i = this._provider;
            Dn(i.container, [i], [i.original], r, nn(nn({}, this.state), t), e) &&
              (n && r.push(n), an(r));
          }),
          (n.forceUpdate = function (t) {
            this.setState(this.state, t, !0);
          }),
          (n.componentDidMount = function () {}),
          (n.componentDidUpdate = function (t, n) {}),
          (n.componentWillUnmount = function () {}),
          t
        );
      })(),
      wn = (function (t) {
        function n() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          tn(n, t),
          (n.prototype.shouldComponentUpdate = function (t, n) {
            return rn(this.props, t) || rn(this.state, n);
          }),
          n
        );
      })(Sn),
      Mn = (function (t) {
        function n() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        tn(n, t);
        var e = n.prototype;
        return (
          (e.componentDidMount = function () {
            var t = this.props,
              n = t.element,
              e = t.container;
            (this._portalProvider = new yn(e)), Rn(n, e, this._portalProvider);
          }),
          (e.componentDidUpdate = function () {
            var t = this.props;
            Rn(t.element, t.container, this._portalProvider);
          }),
          (e.componentWillUnmount = function () {
            Rn(null, this.props.container, this._portalProvider),
              (this._portalProvider = null);
          }),
          n
        );
      })(wn);
    function Cn(t, n, e) {
      var r = e.map(function (t) {
          return Pt(t) ? null : t.key;
        }),
        i = Et(
          sn(
            n.map(function (t) {
              return t.key;
            })
          ),
          sn(r),
          function (t) {
            return t;
          }
        );
      i.removed.forEach(function (t) {
        n.splice(t, 1)[0]._unmount();
      }),
        i.ordered.forEach(function (t) {
          var e = t[0],
            r = t[1],
            i = n.splice(e, 1)[0];
          n.splice(r, 0, i);
          var o = bn(i.base),
            a = bn(n[r + 1] && n[r + 1].base);
          o && o.parentNode.insertBefore(o, a);
        }),
        i.added.forEach(function (i) {
          n.splice(i, 0, un(e[i], r[i], i, t));
        });
      var o = i.maintained.filter(function (i) {
        i[0];
        var o = i[1],
          a = e[o],
          s = n[o];
        return (Pt(a) ? "text_" + a : a.type) !== s.type
          ? (s._unmount(), n.splice(o, 1, un(a, r[o], o, t)), !0)
          : ((s.index = o), !1);
      });
      return (function () {
        for (var t = 0, n = 0, e = arguments.length; n < e; n++)
          t += arguments[n].length;
        var r = Array(t),
          i = 0;
        for (n = 0; n < e; n++)
          for (var o = arguments[n], a = 0, s = o.length; a < s; a++, i++)
            r[i] = o[a];
        return r;
      })(
        i.added,
        o.map(function (t) {
          return t[0], t[1];
        })
      );
    }
    function Dn(t, n, e, r, i, o) {
      var a = Cn(t, n, e),
        s = n.filter(function (t, n) {
          return t._update(r, e[n], i, o);
        }),
        u = mn(t);
      return (
        u &&
          a.reverse().forEach(function (e) {
            var r = n[e],
              i = bn(r.base);
            if (i && u !== i && !i.parentNode) {
              var o = (function (t, n) {
                for (
                  var e = t._providers, r = e.length, i = n.index + 1;
                  i < r;
                  ++i
                ) {
                  var o = bn(e[i].base);
                  if (o) return o;
                }
                return null;
              })(t, r);
              u.insertBefore(i, o);
            }
          }),
        s.length > 0
      );
    }
    function Rn(t, n, e) {
      void 0 === e && (e = n.__REACT_COMPAT__);
      var r = !!e;
      return (
        e || (e = new yn(n)),
        (function (t, n, e) {
          var r = [];
          Dn(t, t._providers, n, r, e), an(r);
        })(e, t ? [t] : []),
        r || (n.__REACT_COMPAT__ = e),
        e
      );
    }
    function On(t, n, e) {
      var r = n.__REACT_COMPAT__;
      t && !r && (n.innerHTML = ""), Rn(t, n, r), e && e();
    }
    function Pn(t, n) {
      for (var e = t.length, r = 0; r < e; ++r) if (n(t[r], r)) return !0;
      return !1;
    }
    function zn(t, n) {
      for (var e = t.length, r = 0; r < e; ++r) if (n(t[r], r)) return t[r];
      return null;
    }
    function Gn(t, n) {
      try {
        return new RegExp(t, "g").exec(n);
      } catch (t) {
        return null;
      }
    }
    function Bn(t) {
      return t.replace(/_/g, ".");
    }
    function Tn(t, n) {
      var e = null,
        r = "-1";
      return (
        Pn(t, function (t) {
          var i = Gn("(" + t.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", n);
          return (
            !(!i || t.brand) &&
            ((e = t),
            (r = i[3] || "-1"),
            t.versionAlias
              ? (r = t.versionAlias)
              : t.versionTest &&
                (r =
                  (function (t, n) {
                    var e = Gn("(" + t + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", n);
                    return e ? e[3] : "";
                  })(t.versionTest.toLowerCase(), n) || r),
            (r = Bn(r)),
            !0)
          );
        }),
        { preset: e, version: r }
      );
    }
    function _n(t, n) {
      var e = { brand: "", version: "-1" };
      return (
        Pn(t, function (t) {
          var r = kn(n, t);
          return (
            !!r &&
            ((e.brand = t.id),
            (e.version = t.versionAlias || r.version),
            "-1" !== e.version)
          );
        }),
        e
      );
    }
    function kn(t, n) {
      return zn(t, function (t) {
        var e = t.brand;
        return Gn("" + n.test, e.toLowerCase());
      });
    }
    var An = [
        { test: "phantomjs", id: "phantomjs" },
        { test: "whale", id: "whale" },
        { test: "edgios|edge|edg", id: "edge" },
        {
          test: "msie|trident|windows phone",
          id: "ie",
          versionTest: "iemobile|msie|rv",
        },
        { test: "miuibrowser", id: "miui browser" },
        { test: "samsungbrowser", id: "samsung internet" },
        { test: "samsung", id: "samsung internet", versionTest: "version" },
        { test: "chrome|crios", id: "chrome" },
        { test: "firefox|fxios", id: "firefox" },
        { test: "android", id: "android browser", versionTest: "version" },
        { test: "safari|iphone|ipad|ipod", id: "safari", versionTest: "version" },
      ],
      In = [
        {
          test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
          id: "chrome",
          versionTest: "chrome",
        },
        { test: "chromium", id: "chrome" },
        { test: "whale", id: "chrome", versionAlias: "-1", brand: !0 },
      ],
      jn = [
        { test: "applewebkit", id: "webkit", versionTest: "applewebkit|safari" },
      ],
      Nn = [
        { test: "(?=(iphone|ipad))(?!(.*version))", id: "webview" },
        {
          test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
          id: "webview",
        },
        { test: "webview", id: "webview" },
      ],
      Fn = [
        { test: "windows phone", id: "windows phone" },
        { test: "windows 2000", id: "window", versionAlias: "5.0" },
        { test: "windows nt", id: "window" },
        { test: "iphone|ipad|ipod", id: "ios", versionTest: "iphone os|cpu os" },
        { test: "mac os x", id: "mac" },
        { test: "android", id: "android" },
        { test: "tizen", id: "tizen" },
        { test: "webos|web0s", id: "webos" },
      ];
    function Yn(t) {
      var n = (function (t) {
          var n = t;
          if (void 0 === n) {
            if ("undefined" == typeof navigator || !navigator) return "";
            n = navigator.userAgent || "";
          }
          return n.toLowerCase();
        })(t),
        e = !!/mobi/g.exec(n),
        r = {
          name: "unknown",
          version: "-1",
          majorVersion: -1,
          webview: !!Tn(Nn, n).preset,
          chromium: !1,
          chromiumVersion: "-1",
          webkit: !1,
          webkitVersion: "-1",
        },
        i = { name: "unknown", version: "-1", majorVersion: -1 },
        o = Tn(An, n),
        a = o.preset,
        s = o.version,
        u = Tn(Fn, n),
        l = u.preset,
        c = u.version,
        f = Tn(In, n);
      if (
        ((r.chromium = !!f.preset), (r.chromiumVersion = f.version), !r.chromium)
      ) {
        var p = Tn(jn, n);
        (r.webkit = !!p.preset), (r.webkitVersion = p.version);
      }
      return (
        l &&
          ((i.name = l.id), (i.version = c), (i.majorVersion = parseInt(c, 10))),
        a &&
          ((r.name = a.id),
          (r.version = s),
          r.webview &&
            "ios" === i.name &&
            "safari" !== r.name &&
            (r.webview = !1)),
        (r.majorVersion = parseInt(r.version, 10)),
        { browser: r, os: i, isMobile: e, isHints: !1 }
      );
    }
    function Xn(t, n, e, r, i, o) {
      for (var a = 0; a < i; ++a) {
        var s = e + a * i,
          u = r + a * i;
        (t[s] += t[u] * o), (n[s] += n[u] * o);
      }
    }
    function $n(t, n, e, r, i) {
      for (var o = 0; o < i; ++o) {
        var a = e + o * i,
          s = r + o * i,
          u = t[a],
          l = n[a];
        (t[a] = t[s]), (t[s] = u), (n[a] = n[s]), (n[s] = l);
      }
    }
    function qn(t, n, e, r, i) {
      for (var o = 0; o < r; ++o) {
        var a = e + o * r;
        (t[a] /= i), (n[a] /= i);
      }
    }
    function Ln(t, n, e) {
      void 0 === e && (e = Math.sqrt(t.length));
      for (var r = t.slice(), i = 0; i < e; ++i)
        (r[i * e + n - 1] = 0), (r[(n - 1) * e + i] = 0);
      return (r[(n - 1) * (e + 1)] = 1), r;
    }
    function Vn(t, n) {
      void 0 === n && (n = Math.sqrt(t.length));
      for (var e = t.slice(), r = le(n), i = 0; i < n; ++i) {
        var o = n * i + i;
        if (!$t(e[o], Mt))
          for (var a = i + 1; a < n; ++a)
            if (e[n * i + a]) {
              $n(e, r, i, a, n);
              break;
            }
        if (!$t(e[o], Mt)) return [];
        qn(e, r, i, n, e[o]);
        for (a = 0; a < n; ++a) {
          var s = a,
            u = e[a + i * n];
          $t(u, Mt) && i !== a && Xn(e, r, s, i, n, -u);
        }
      }
      return r;
    }
    function Wn(t, n) {
      for (var e = t.slice(), r = t.length; r < n - 1; ++r) e[r] = 0;
      return (e[n - 1] = 1), e;
    }
    function Hn(t, n, e) {
      if ((void 0 === n && (n = Math.sqrt(t.length)), n === e)) return t;
      for (var r = le(e), i = Math.min(n, e), o = 0; o < i - 1; ++o) {
        for (var a = 0; a < i - 1; ++a) r[o * e + a] = t[o * n + a];
        (r[(o + 1) * e - 1] = t[(o + 1) * n - 1]),
          (r[(e - 1) * e + o] = t[(n - 1) * n + o]);
      }
      return (r[e * e - 1] = t[n * n - 1]), r;
    }
    function Un(t) {
      for (var n = [], e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
      var r = le(t);
      return (
        n.forEach(function (n) {
          r = Zn(r, n, t);
        }),
        r
      );
    }
    function Zn(t, n, e) {
      void 0 === e && (e = Math.sqrt(t.length));
      var r = [],
        i = t.length / e,
        o = n.length / i;
      if (!i) return n;
      if (!o) return t;
      for (var a = 0; a < e; ++a)
        for (var s = 0; s < o; ++s) {
          r[s * e + a] = 0;
          for (var u = 0; u < i; ++u) r[s * e + a] += t[u * e + a] * n[s * i + u];
        }
      return r;
    }
    function Kn(t, n) {
      for (var e = Math.min(t.length, n.length), r = t.slice(), i = 0; i < e; ++i)
        r[i] = r[i] + n[i];
      return r;
    }
    function Jn(t, n) {
      for (var e = Math.min(t.length, n.length), r = t.slice(), i = 0; i < e; ++i)
        r[i] = r[i] - n[i];
      return r;
    }
    function Qn(t, n) {
      return (
        void 0 === n && (n = 9 === t.length),
        n ? [t[0], t[1], t[3], t[4], t[6], t[7]] : t
      );
    }
    function te(t, n, e) {
      void 0 === e && (e = n.length);
      var r = Zn(t, n, e),
        i = r[e - 1];
      return r.map(function (t) {
        return t / i;
      });
    }
    function ne(t, n) {
      return Zn(
        t,
        [
          1,
          0,
          0,
          0,
          0,
          Math.cos(n),
          Math.sin(n),
          0,
          0,
          -Math.sin(n),
          Math.cos(n),
          0,
          0,
          0,
          0,
          1,
        ],
        4
      );
    }
    function ee(t, n) {
      return Zn(
        t,
        [
          Math.cos(n),
          0,
          -Math.sin(n),
          0,
          0,
          1,
          0,
          0,
          Math.sin(n),
          0,
          Math.cos(n),
          0,
          0,
          0,
          0,
          1,
        ],
        4
      );
    }
    function re(t, n) {
      return Zn(t, ue(n, 4));
    }
    function ie(t, n) {
      var e = n[0],
        r = void 0 === e ? 1 : e,
        i = n[1],
        o = void 0 === i ? 1 : i,
        a = n[2];
      return Zn(
        t,
        [r, 0, 0, 0, 0, o, 0, 0, 0, 0, void 0 === a ? 1 : a, 0, 0, 0, 0, 1],
        4
      );
    }
    function oe(t, n) {
      return te(ue(n, 3), Wn(t, 3));
    }
    function ae(t, n) {
      var e = n[0],
        r = void 0 === e ? 0 : e,
        i = n[1],
        o = void 0 === i ? 0 : i,
        a = n[2];
      return Zn(
        t,
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, r, o, void 0 === a ? 0 : a, 1],
        4
      );
    }
    function se(t, n) {
      return Zn(t, n, 4);
    }
    function ue(t, n) {
      var e = Math.cos(t),
        r = Math.sin(t),
        i = le(n);
      return (i[0] = e), (i[1] = r), (i[n] = -r), (i[n + 1] = e), i;
    }
    function le(t) {
      for (var n = t * t, e = [], r = 0; r < n; ++r) e[r] = r % (t + 1) ? 0 : 1;
      return e;
    }
    function ce(t, n) {
      for (var e = le(n), r = Math.min(t.length, n - 1), i = 0; i < r; ++i)
        e[(n + 1) * i] = t[i];
      return e;
    }
    function fe(t, n) {
      for (var e = le(n), r = Math.min(t.length, n - 1), i = 0; i < r; ++i)
        e[n * (n - 1) + i] = t[i];
      return e;
    }
    function pe(t, n, e, r, i, o, a, s) {
      var u = t[0],
        l = t[1],
        c = n[0],
        f = n[1],
        p = e[0],
        d = e[1],
        h = r[0],
        v = r[1],
        g = i[0],
        m = i[1],
        b = o[0],
        x = o[1],
        y = a[0],
        E = a[1],
        S = s[0],
        w = s[1],
        M = Vn(
          [
            u,
            0,
            c,
            0,
            p,
            0,
            h,
            0,
            l,
            0,
            f,
            0,
            d,
            0,
            v,
            0,
            1,
            0,
            1,
            0,
            1,
            0,
            1,
            0,
            0,
            u,
            0,
            c,
            0,
            p,
            0,
            h,
            0,
            l,
            0,
            f,
            0,
            d,
            0,
            v,
            0,
            1,
            0,
            1,
            0,
            1,
            0,
            1,
            -g * u,
            -m * u,
            -b * c,
            -x * c,
            -y * p,
            -E * p,
            -S * h,
            -w * h,
            -g * l,
            -m * l,
            -b * f,
            -x * f,
            -y * d,
            -E * d,
            -S * v,
            -w * v,
          ],
          8
        );
      if (!M.length) return [];
      var C = Zn(M, [g, m, b, x, y, E, S, w], 8);
      return (
        (C[8] = 1),
        Hn(
          (function (t, n) {
            void 0 === n && (n = Math.sqrt(t.length));
            for (var e = [], r = 0; r < n; ++r)
              for (var i = 0; i < n; ++i) e[i * n + r] = t[n * r + i];
            return e;
          })(C),
          3,
          4
        )
      );
    }
    function de(t) {
      var n = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      return (
        t.forEach(function (t) {
          var e = t.matrixFunction,
            r = t.functionValue;
          e && (n = e(n, r));
        }),
        n
      );
    }
    function he(t) {
      return (Ot(t) ? t : Tt(t)).map(function (t) {
        var n = kt(t),
          e = n.prefix,
          r = n.value,
          i = null,
          o = e,
          a = "";
        if ("translate" === e || "translateX" === e || "translate3d" === e) {
          var s = _t(r).map(function (t) {
              return parseFloat(t);
            }),
            u = s[0],
            l = s[1],
            c = void 0 === l ? 0 : l,
            f = s[2];
          (i = ae), (a = [u, c, void 0 === f ? 0 : f]);
        } else if ("translateY" === e) {
          (i = ae), (a = [0, (c = parseFloat(r)), 0]);
        } else if ("translateZ" === e) {
          (i = ae), (a = [0, 0, parseFloat(r)]);
        } else if ("scale" === e || "scale3d" === e) {
          var p = _t(r).map(function (t) {
              return parseFloat(t);
            }),
            d = p[0],
            h = p[1],
            v = void 0 === h ? d : h,
            g = p[2];
          (i = ie), (a = [d, v, void 0 === g ? 1 : g]);
        } else if ("scaleX" === e) {
          (i = ie), (a = [(d = parseFloat(r)), 1, 1]);
        } else if ("scaleY" === e) {
          (i = ie), (a = [1, (v = parseFloat(r)), 1]);
        } else if ("scaleZ" === e) {
          (i = ie), (a = [1, 1, parseFloat(r)]);
        } else if (
          "rotate" === e ||
          "rotateZ" === e ||
          "rotateX" === e ||
          "rotateY" === e
        ) {
          var m = At(r),
            b = m.unit,
            x = m.value;
          "rotate" === e || "rotateZ" === e
            ? ((o = "rotateZ"), (i = re))
            : "rotateX" === e
            ? (i = ne)
            : "rotateY" === e && (i = ee),
            (a = "rad" === b ? x : (x * Math.PI) / 180);
        } else if ("matrix3d" === e)
          (i = se),
            (a = _t(r).map(function (t) {
              return parseFloat(t);
            }));
        else if ("matrix" === e) {
          var y = _t(r).map(function (t) {
            return parseFloat(t);
          });
          (i = se),
            (a = [
              y[0],
              y[1],
              0,
              0,
              y[2],
              y[3],
              0,
              0,
              0,
              0,
              1,
              0,
              y[4],
              y[5],
              0,
              1,
            ]);
        } else o = "";
        return {
          name: e,
          functionName: o,
          value: r,
          matrixFunction: i,
          functionValue: a,
        };
      });
    }
    /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */ function ve(
      t
    ) {
      return t.length < 3
        ? 0
        : Math.abs(
            (function (t) {
              for (var n = 0, e = t.length - 1; e >= 0; --e) n += t[e];
              return n;
            })(
              t.map(function (n, e) {
                var r = t[e + 1] || t[0];
                return n[0] * r[1] - r[0] * n[1];
              })
            )
          ) / 2;
    }
    function ge(t, n) {
      var e = n.width,
        r = n.height,
        i = n.left,
        o = n.top,
        a = me(t),
        s = a.minX,
        u = a.minY,
        l = a.maxX,
        c = a.maxY,
        f = e / (l - s),
        p = r / (c - u);
      return t.map(function (t) {
        return [i + (t[0] - s) * f, o + (t[1] - u) * p];
      });
    }
    function me(t) {
      var n = t.map(function (t) {
          return t[0];
        }),
        e = t.map(function (t) {
          return t[1];
        });
      return {
        minX: Math.min.apply(Math, n),
        minY: Math.min.apply(Math, e),
        maxX: Math.max.apply(Math, n),
        maxY: Math.max.apply(Math, e),
      };
    }
    function be(t, n, e) {
      var r = t[0],
        i = t[1],
        o = me(n),
        a = o.minX,
        s = o.minY,
        u = o.maxX,
        l = o.maxY,
        c = [
          [a, i],
          [u, i],
        ],
        f = [
          [r, s],
          [r, l],
        ],
        p = xe(c[0], c[1]),
        d = xe(f[0], f[1]),
        h = Se(n),
        v = [],
        g = [];
      return (
        h.forEach(function (t) {
          var n = xe(t[0], t[1]),
            e = Ee(ye(p, n), [c, t]),
            o = Ee(ye(d, n), [f, t]);
          (1 === e.length && t[0][1] === i) || v.push.apply(v, e),
            (1 === o.length && t[0][0] === r) || g.push.apply(g, o),
            n[0] || v.push.apply(v, e),
            n[1] || g.push.apply(g, o);
        }),
        (!e &&
          (Ft(v, function (t) {
            return t[0] === r;
          }) > -1 ||
            Ft(g, function (t) {
              return t[1] === i;
            }) > -1)) ||
          !!(
            v.filter(function (t) {
              return t[0] > r;
            }).length % 2 &&
            g.filter(function (t) {
              return t[1] > i;
            }).length % 2
          )
      );
    }
    function xe(t, n) {
      var e = t[0],
        r = t[1],
        i = n[0],
        o = n[1];
      if (e === i && r === o) return [0, 0, 0];
      if (e === i) return [1, 0, -e];
      if (r === o) return [0, 1, -r];
      var a = (i - e) / (r - o);
      return [1, a, -e - a * r];
    }
    function ye(t, n) {
      var e,
        r,
        i = t[0],
        o = t[1],
        a = t[2],
        s = n[0],
        u = n[1],
        l = n[2],
        c = 0 === i && 0 === s,
        f = 0 === o && 0 === u;
      if (c && f) return [];
      if (c) {
        var p = -a / o;
        return p !== -l / u
          ? []
          : [
              [-1 / 0, p],
              [1 / 0, p],
            ];
      }
      if (f) {
        var d = -a / i;
        return d !== -l / s
          ? []
          : [
              [d, -1 / 0],
              [d, 1 / 0],
            ];
      }
      return 0 === i
        ? [[(e = -(u * (r = -a / o) + l) / s), r]]
        : 0 === s
        ? [[(e = -(o * (r = -l / u) + a) / i), r]]
        : 0 === o
        ? [[(e = -a / i), (r = -(s * e + l) / u)]]
        : 0 === u
        ? [[(e = -l / s), (r = -(i * e + a) / o)]]
        : [[(e = (o * l - u * a) / (u * i - o * s)), (r = -(i * e + a) / o)]];
    }
    function Ee(t, n) {
      var e = n.map(function (t) {
        return [0, 1].map(function (n) {
          return [Math.min(t[0][n], t[1][n]), Math.max(t[0][n], t[1][n])];
        });
      });
      if (2 === t.length) {
        var r = t[0],
          i = r[0],
          o = r[1];
        if (i === t[1][0]) {
          var a = Math.max.apply(
              Math,
              e.map(function (t) {
                return t[1][0];
              })
            ),
            s = Math.min.apply(
              Math,
              e.map(function (t) {
                return t[1][1];
              })
            );
          return a > s
            ? []
            : [
                [i, a],
                [i, s],
              ];
        }
        if (o === t[1][1]) {
          var u = Math.max.apply(
              Math,
              e.map(function (t) {
                return t[0][0];
              })
            ),
            l = Math.min.apply(
              Math,
              e.map(function (t) {
                return t[0][1];
              })
            );
          return u > l
            ? []
            : [
                [u, o],
                [l, o],
              ];
        }
      }
      return t.filter(function (t) {
        return e.every(function (n) {
          return (
            n[0][0] <= t[0] &&
            t[0] <= n[0][1] &&
            n[1][0] <= t[1] &&
            t[1] <= n[1][1]
          );
        });
      });
    }
    function Se(t) {
      return (function () {
        for (var t = 0, n = 0, e = arguments.length; n < e; n++)
          t += arguments[n].length;
        var r = Array(t),
          i = 0;
        for (n = 0; n < e; n++)
          for (var o = arguments[n], a = 0, s = o.length; a < s; a++, i++)
            r[i] = o[a];
        return r;
      })(t.slice(1), [t[0]]).map(function (n, e) {
        return [t[e], n];
      });
    }
    function we(t, n) {
      return ve(
        (function (t, n) {
          var e = t.slice(),
            r = n.slice();
          -1 === Ht(e) && e.reverse(), -1 === Ht(r) && r.reverse();
          var i = Se(e),
            o = Se(r),
            a = i.map(function (t) {
              return xe(t[0], t[1]);
            }),
            s = o.map(function (t) {
              return xe(t[0], t[1]);
            }),
            u = [];
          a.forEach(function (t, n) {
            var e = i[n],
              a = [];
            s.forEach(function (r, i) {
              var s = Ee(ye(t, r), [e, o[i]]);
              a.push.apply(
                a,
                s.map(function (t) {
                  return { index1: n, index2: i, pos: t };
                })
              );
            }),
              a.sort(function (t, n) {
                return Ut(e[0], t.pos) - Ut(e[0], n.pos);
              }),
              u.push.apply(u, a),
              be(e[1], r) && u.push({ index1: n, index2: -1, pos: e[1] });
          }),
            o.forEach(function (t, n) {
              if (be(t[1], e)) {
                var r = !1,
                  i = Ft(u, function (t) {
                    return t.index2 === n ? ((r = !0), !1) : !!r;
                  });
                -1 === i &&
                  ((r = !1),
                  (i = Ft(u, function (t) {
                    var e = t.index1,
                      i = t.index2;
                    return -1 === e && i + 1 === n ? ((r = !0), !1) : !!r;
                  }))),
                  -1 === i
                    ? u.push({ index1: -1, index2: n, pos: t[1] })
                    : u.splice(i, 0, { index1: -1, index2: n, pos: t[1] });
              }
            });
          var l = u.map(function (t) {
              return t.pos;
            }),
            c = {};
          return l.filter(function (t) {
            var n = t[0] + "x" + t[1];
            return !c[n] && ((c[n] = !0), !0);
          });
        })(t, n)
      );
    }
    /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
  
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
  
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */ var Me = function (
      t,
      n
    ) {
      return (Me =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, n) {
            t.__proto__ = n;
          }) ||
        function (t, n) {
          for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
        })(t, n);
    };
    var Ce,
      De =
        "function" == typeof Map
          ? void 0
          : ((Ce = 0),
            function (t) {
              return t.__DIFF_KEY__ || (t.__DIFF_KEY__ = ++Ce);
            }),
      Re = (function (t) {
        function n(n) {
          return void 0 === n && (n = []), t.call(this, n, De) || this;
        }
        return (
          (function (t, n) {
            function e() {
              this.constructor = t;
            }
            Me(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((e.prototype = n.prototype), new e()));
          })(n, t),
          n
        );
      })(St);
    /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */
    var Oe = function () {
      return (Oe =
        Object.assign ||
        function (t) {
          for (var n, e = 1, r = arguments.length; e < r; e++)
            for (var i in (n = arguments[e]))
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          return t;
        }).apply(this, arguments);
    };
    var Pe = (function () {
        function t() {
          this._events = {};
        }
        var n = t.prototype;
        return (
          (n.on = function (t, n) {
            if (Rt(t)) for (var e in t) this.on(e, t[e]);
            else this._addEvent(t, n, {});
            return this;
          }),
          (n.off = function (t, n) {
            if (t)
              if (Rt(t)) for (var e in t) this.off(e);
              else if (n) {
                var r = this._events[t];
                if (r) {
                  var i = Ft(r, function (t) {
                    return t.listener === n;
                  });
                  i > -1 && r.splice(i, 1);
                }
              } else this._events[t] = [];
            else this._events = {};
            return this;
          }),
          (n.once = function (t, n) {
            var e = this;
            return (
              n && this._addEvent(t, n, { once: !0 }),
              new Promise(function (n) {
                e._addEvent(t, n, { once: !0 });
              })
            );
          }),
          (n.emit = function (t, n) {
            var e = this;
            void 0 === n && (n = {});
            var r = this._events[t];
            if (!t || !r) return !0;
            var i = !1;
            return (
              (n.eventType = t),
              (n.stop = function () {
                i = !0;
              }),
              (n.currentTarget = this),
              (function () {
                for (var t = 0, n = 0, e = arguments.length; n < e; n++)
                  t += arguments[n].length;
                var r = Array(t),
                  i = 0;
                for (n = 0; n < e; n++)
                  for (var o = arguments[n], a = 0, s = o.length; a < s; a++, i++)
                    r[i] = o[a];
                return r;
              })(r).forEach(function (r) {
                r.listener(n), r.once && e.off(t, r.listener);
              }),
              !i
            );
          }),
          (n.trigger = function (t, n) {
            return void 0 === n && (n = {}), this.emit(t, n);
          }),
          (n._addEvent = function (t, n, e) {
            var r = this._events;
            (r[t] = r[t] || []), r[t].push(Oe({ listener: n }, e));
          }),
          t
        );
      })(),
      ze = function (t, n) {
        return (ze =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, n) {
              t.__proto__ = n;
            }) ||
          function (t, n) {
            for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
          })(t, n);
      };
    /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
  
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
  
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */ function Ge(
      t
    ) {
      var n = t.container;
      return [n.scrollLeft, n.scrollTop];
    }
    var Be = (function (t) {
        function n() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return (
            (n.startRect = null),
            (n.startPos = []),
            (n.prevTime = 0),
            (n.timer = 0),
            n
          );
        }
        !(function (t, n) {
          function e() {
            this.constructor = t;
          }
          ze(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((e.prototype = n.prototype), new e()));
        })(n, t);
        var e = n.prototype;
        return (
          (e.dragStart = function (t, n) {
            var e = n.container,
              r = 0,
              i = 0,
              o = 0,
              a = 0;
            if (e === document.body)
              (o = window.innerWidth), (a = window.innerHeight);
            else {
              var s = e.getBoundingClientRect();
              (r = s.top), (i = s.left), (o = s.width), (a = s.height);
            }
            (this.startPos = [t.clientX, t.clientY]),
              (this.startRect = { top: r, left: i, width: o, height: a });
          }),
          (e.drag = function (t, n) {
            var e = this,
              r = t.clientX,
              i = t.clientY,
              o = n.container,
              a = n.threshold,
              s = void 0 === a ? 0 : a,
              u = n.throttleTime,
              l = void 0 === u ? 0 : u,
              c = n.getScrollPosition,
              f = void 0 === c ? Ge : c,
              p = this.startRect,
              d = this.startPos,
              h = Nt(),
              v = Math.max(l + this.prevTime - h, 0),
              g = [0, 0];
            if (
              (p.top > i - s
                ? (d[1] > p.top || i < d[1]) && (g[1] = -1)
                : p.top + p.height < i + s &&
                  (d[1] < p.top + p.height || i > d[1]) &&
                  (g[1] = 1),
              p.left > r - s
                ? (d[0] > p.left || r < d[0]) && (g[0] = -1)
                : p.left + p.width < r + s &&
                  (d[0] < p.left + p.width || r > d[0]) &&
                  (g[0] = 1),
              clearTimeout(this.timer),
              !g[0] && !g[1])
            )
              return !1;
            if (v > 0)
              return (
                (this.timer = window.setTimeout(function () {
                  e.drag(t, n);
                }, v)),
                !1
              );
            this.prevTime = h;
            var m = f({ container: o, direction: g });
            this.trigger("scroll", { container: o, direction: g, inputEvent: t });
            var b = f({ container: o, direction: g }),
              x = b[0] - m[0],
              y = b[1] - m[1];
            return (
              !(!x && !y) &&
              (this.trigger("move", {
                offsetX: g[0] ? x : 0,
                offsetY: g[1] ? y : 0,
                inputEvent: t,
              }),
              l &&
                (this.timer = window.setTimeout(function () {
                  e.drag(t, n);
                }, l)),
              !0)
            );
          }),
          (e.dragEnd = function () {
            clearTimeout(this.timer);
          }),
          n
        );
      })(Pe),
      Te = function (t, n) {
        return (Te =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, n) {
              t.__proto__ = n;
            }) ||
          function (t, n) {
            for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
          })(t, n);
      };
    /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
  
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
  
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */ var _e = function () {
      return (_e =
        Object.assign ||
        function (t) {
          for (var n, e = 1, r = arguments.length; e < r; e++)
            for (var i in (n = arguments[e]))
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          return t;
        }).apply(this, arguments);
    };
    function ke(t) {
      return (
        180 *
        ((n = [t[0].clientX, t[0].clientY]),
        (e = [t[1].clientX, t[1].clientY]),
        (r = e[0] - n[0]),
        (i = e[1] - n[1]),
        ((o = Math.atan2(i, r)) >= 0 ? o : o + 2 * Math.PI) / Math.PI)
      );
      var n, e, r, i, o;
    }
    function Ae(t) {
      return t.touches
        ? (function (t) {
            for (var n = Math.min(t.length, 2), e = [], r = 0; r < n; ++r)
              e.push(Ne(t[r]));
            return e;
          })(t.touches)
        : [Ne(t)];
    }
    function Ie(t, n, e) {
      var r = e.length,
        i = Fe(t, r),
        o = i.clientX,
        a = i.clientY,
        s = i.originalClientX,
        u = i.originalClientY,
        l = Fe(n, r),
        c = l.clientX,
        f = l.clientY,
        p = Fe(e, r);
      return {
        clientX: s,
        clientY: u,
        deltaX: o - c,
        deltaY: a - f,
        distX: o - p.clientX,
        distY: a - p.clientY,
      };
    }
    function je(t) {
      return Math.sqrt(
        Math.pow(t[0].clientX - t[1].clientX, 2) +
          Math.pow(t[0].clientY - t[1].clientY, 2)
      );
    }
    function Ne(t) {
      return { clientX: t.clientX, clientY: t.clientY };
    }
    function Fe(t, n) {
      void 0 === n && (n = t.length);
      for (
        var e = {
            clientX: 0,
            clientY: 0,
            originalClientX: 0,
            originalClientY: 0,
          },
          r = 0;
        r < n;
        ++r
      ) {
        var i = t[r];
        (e.originalClientX +=
          "originalClientX" in i ? i.originalClientX : i.clientX),
          (e.originalClientY +=
            "originalClientY" in i ? i.originalClientY : i.clientY),
          (e.clientX += i.clientX),
          (e.clientY += i.clientY);
      }
      return n
        ? {
            clientX: e.clientX / n,
            clientY: e.clientY / n,
            originalClientX: e.originalClientX / n,
            originalClientY: e.originalClientY / n,
          }
        : e;
    }
    var Ye = (function () {
        function t(t) {
          (this.prevClients = []),
            (this.startClients = []),
            (this.movement = 0),
            (this.length = 0),
            (this.startClients = t),
            (this.prevClients = t),
            (this.length = t.length);
        }
        var n = t.prototype;
        return (
          (n.addClients = function (t) {
            void 0 === t && (t = this.prevClients);
            var n = this.getPosition(t),
              e = n.deltaX,
              r = n.deltaY;
            return (
              (this.movement += Math.sqrt(e * e + r * r)),
              (this.prevClients = t),
              n
            );
          }),
          (n.getAngle = function (t) {
            return void 0 === t && (t = this.prevClients), ke(t);
          }),
          (n.getRotation = function (t) {
            return (
              void 0 === t && (t = this.prevClients),
              ke(t) - ke(this.startClients)
            );
          }),
          (n.getPosition = function (t) {
            return Ie(t || this.prevClients, this.prevClients, this.startClients);
          }),
          (n.getPositions = function (t) {
            void 0 === t && (t = this.prevClients);
            var n = this.prevClients;
            return this.startClients.map(function (e, r) {
              return Ie([t[r]], [n[r]], [e]);
            });
          }),
          (n.getMovement = function (t) {
            var n = this.movement;
            if (!t) return n;
            var e = Fe(t, this.length),
              r = Fe(this.prevClients, this.length),
              i = e.clientX - r.clientX,
              o = e.clientY - r.clientY;
            return Math.sqrt(i * i + o * o) + n;
          }),
          (n.getDistance = function (t) {
            return void 0 === t && (t = this.prevClients), je(t);
          }),
          (n.getScale = function (t) {
            return (
              void 0 === t && (t = this.prevClients),
              je(t) / je(this.startClients)
            );
          }),
          (n.move = function (t, n) {
            this.startClients.forEach(function (e) {
              (e.clientX -= t), (e.clientY -= n);
            }),
              this.prevClients.forEach(function (e) {
                (e.clientX -= t), (e.clientY -= n);
              });
          }),
          t
        );
      })(),
      Xe = ["textarea", "input"],
      $e = (function (t) {
        function n(n, e) {
          void 0 === e && (e = {});
          var r = t.call(this) || this;
          (r.options = {}),
            (r.flag = !1),
            (r.pinchFlag = !1),
            (r.datas = {}),
            (r.isDrag = !1),
            (r.isPinch = !1),
            (r.isMouse = !1),
            (r.isTouch = !1),
            (r.clientStores = []),
            (r.targets = []),
            (r.prevTime = 0),
            (r.doubleFlag = !1),
            (r.onDragStart = function (t, n) {
              if ((void 0 === n && (n = !0), r.flag || !1 !== t.cancelable)) {
                var e = r.options,
                  i = e.container,
                  o = e.pinchOutside,
                  a = e.preventRightClick,
                  s = e.preventDefault,
                  u = e.checkInput,
                  l = r.isTouch,
                  c = !r.flag;
                if (c) {
                  var f = document.activeElement,
                    p = t.target,
                    d = p.tagName.toLowerCase(),
                    h = Xe.indexOf(d) > -1,
                    v = p.isContentEditable;
                  if (h || v) {
                    if (u || f === p) return !1;
                    if (f && v && f.isContentEditable && f.contains(p)) return !1;
                  } else if ((s || "touchstart" === t.type) && f) {
                    var g = f.tagName;
                    (f.isContentEditable || Xe.indexOf(g) > -1) && f.blur();
                  }
                  if (
                    ((r.clientStores = [new Ye(Ae(t))]),
                    (r.flag = !0),
                    (r.isDrag = !1),
                    (r.datas = {}),
                    a && (3 === t.which || 2 === t.button))
                  )
                    return r.initDrag(), !1;
                  (r.doubleFlag = Nt() - r.prevTime < 200),
                    !1 ===
                      r.emit(
                        "dragStart",
                        _e(
                          {
                            datas: r.datas,
                            inputEvent: t,
                            isTrusted: n,
                            isDouble: r.doubleFlag,
                          },
                          r.getCurrentStore().getPosition()
                        )
                      ) && r.initDrag(),
                    r.flag && s && t.preventDefault();
                }
                if (!r.flag) return !1;
                var m = 0;
                if (
                  (c &&
                    l &&
                    o &&
                    (m = setTimeout(function () {
                      Kt(i, "touchstart", r.onDragStart, { passive: !1 });
                    })),
                  !c && l && o && Jt(i, "touchstart", r.onDragStart),
                  r.flag &&
                    (function (t) {
                      return t.touches && t.touches.length >= 2;
                    })(t))
                ) {
                  if (
                    (clearTimeout(m),
                    c && t.touches.length !== t.changedTouches.length)
                  )
                    return;
                  r.pinchFlag || r.onPinchStart(t);
                }
              }
            }),
            (r.onDrag = function (t, n) {
              if (r.flag) {
                var e = Ae(t),
                  i = r.moveClients(e, t, !1);
                (r.pinchFlag || i.deltaX || i.deltaY) &&
                  r.emit("drag", _e({}, i, { isScroll: !!n, inputEvent: t })),
                  r.pinchFlag && r.onPinch(t, e),
                  r.getCurrentStore().addClients(e);
              }
            }),
            (r.onDragEnd = function (t) {
              if (r.flag) {
                var n = r.options,
                  e = n.pinchOutside,
                  i = n.container;
                r.isTouch && e && Jt(i, "touchstart", r.onDragStart),
                  (r.flag = !1);
                var o = r.getCurrentStore().getPosition(),
                  a = Nt(),
                  s = !r.isDrag && r.doubleFlag;
                (r.prevTime = r.isDrag || s ? 0 : a),
                  r.emit(
                    "dragEnd",
                    _e(
                      {
                        datas: r.datas,
                        isDouble: s,
                        isDrag: r.isDrag,
                        inputEvent: t,
                      },
                      o
                    )
                  ),
                  r.pinchFlag && r.onPinchEnd(t),
                  (r.clientStores = []);
              }
            }),
            (r.onBlur = function () {
              r.onDragEnd();
            });
          var i = [].concat(n);
          r.options = _e(
            {
              checkInput: !1,
              container: i.length > 1 ? window : i[0],
              preventRightClick: !0,
              preventDefault: !0,
              checkWindowBlur: !1,
              pinchThreshold: 0,
              events: ["touch", "mouse"],
            },
            e
          );
          var o = r.options,
            a = o.container,
            s = o.events,
            u = o.checkWindowBlur;
          if (
            ((r.isTouch = s.indexOf("touch") > -1),
            (r.isMouse = s.indexOf("mouse") > -1),
            (r.targets = i),
            r.isMouse &&
              (i.forEach(function (t) {
                Kt(t, "mousedown", r.onDragStart);
              }),
              Kt(a, "mousemove", r.onDrag),
              Kt(a, "mouseup", r.onDragEnd),
              Kt(a, "contextmenu", r.onDragEnd)),
            u && Kt(window, "blur", r.onBlur),
            r.isTouch)
          ) {
            var l = { passive: !1 };
            i.forEach(function (t) {
              Kt(t, "touchstart", r.onDragStart, l);
            }),
              Kt(a, "touchmove", r.onDrag, l),
              Kt(a, "touchend", r.onDragEnd, l),
              Kt(a, "touchcancel", r.onDragEnd, l);
          }
          return r;
        }
        !(function (t, n) {
          function e() {
            this.constructor = t;
          }
          Te(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((e.prototype = n.prototype), new e()));
        })(n, t);
        var e = n.prototype;
        return (
          (e.getMovement = function (t) {
            return (
              this.getCurrentStore().getMovement(t) +
              this.clientStores.slice(1).reduce(function (t, n) {
                return t + n.movement;
              }, 0)
            );
          }),
          (e.isDragging = function () {
            return this.isDrag;
          }),
          (e.isFlag = function () {
            return this.flag;
          }),
          (e.isPinchFlag = function () {
            return this.pinchFlag;
          }),
          (e.isDoubleFlag = function () {
            return this.doubleFlag;
          }),
          (e.isPinching = function () {
            return this.isPinch;
          }),
          (e.scrollBy = function (t, n, e, r) {
            void 0 === r && (r = !0),
              this.flag &&
                (this.clientStores[0].move(t, n), r && this.onDrag(e, !0));
          }),
          (e.move = function (t, n) {
            var e = t[0],
              r = t[1],
              i = this.getCurrentStore().prevClients;
            return this.moveClients(
              i.map(function (t) {
                var n = t.clientX,
                  i = t.clientY;
                return {
                  clientX: n + e,
                  clientY: i + r,
                  originalClientX: n,
                  originalClientY: i,
                };
              }),
              n,
              !0
            );
          }),
          (e.triggerDragStart = function (t) {
            this.onDragStart(t, !1);
          }),
          (e.setEventDatas = function (t) {
            var n = this.datas;
            for (var e in t) n[e] = t[e];
            return this;
          }),
          (e.getEventDatas = function () {
            return this.datas;
          }),
          (e.unset = function () {
            var t = this,
              n = this.targets,
              e = this.options.container;
            this.off(),
              Jt(window, "blur", this.onBlur),
              this.isMouse &&
                (n.forEach(function (n) {
                  Jt(n, "mousedown", t.onDragStart);
                }),
                Jt(e, "mousemove", this.onDrag),
                Jt(e, "mouseup", this.onDragEnd),
                Jt(e, "contextmenu", this.onDragEnd)),
              this.isTouch &&
                (n.forEach(function (n) {
                  Jt(n, "touchstart", t.onDragStart);
                }),
                Jt(e, "touchstart", this.onDragStart),
                Jt(e, "touchmove", this.onDrag),
                Jt(e, "touchend", this.onDragEnd),
                Jt(e, "touchcancel", this.onDragEnd));
          }),
          (e.onPinchStart = function (t) {
            var n = this.options.pinchThreshold;
            if (!(this.isDrag && this.getMovement() > n)) {
              var e = new Ye(Ae(t));
              (this.pinchFlag = !0),
                this.clientStores.splice(0, 0, e),
                !1 ===
                  this.emit(
                    "pinchStart",
                    _e(
                      {
                        datas: this.datas,
                        angle: e.getAngle(),
                        touches: this.getCurrentStore().getPositions(),
                      },
                      e.getPosition(),
                      { inputEvent: t }
                    )
                  ) && (this.pinchFlag = !1);
            }
          }),
          (e.onPinch = function (t, n) {
            if (this.flag && this.pinchFlag && !(n.length < 2)) {
              var e = this.getCurrentStore();
              (this.isPinch = !0),
                this.emit(
                  "pinch",
                  _e(
                    {
                      datas: this.datas,
                      movement: this.getMovement(n),
                      angle: e.getAngle(n),
                      rotation: e.getRotation(n),
                      touches: e.getPositions(n),
                      scale: e.getScale(n),
                      distance: e.getDistance(n),
                    },
                    e.getPosition(n),
                    { inputEvent: t }
                  )
                );
            }
          }),
          (e.onPinchEnd = function (t) {
            if (this.pinchFlag) {
              var n = this.isPinch;
              (this.isPinch = !1), (this.pinchFlag = !1);
              var e = this.getCurrentStore();
              this.emit(
                "pinchEnd",
                _e(
                  { datas: this.datas, isPinch: n, touches: e.getPositions() },
                  e.getPosition(),
                  { inputEvent: t }
                )
              ),
                (this.isPinch = !1),
                (this.pinchFlag = !1);
            }
          }),
          (e.initDrag = function () {
            (this.clientStores = []),
              (this.pinchFlag = !1),
              (this.doubleFlag = !1),
              (this.prevTime = 0),
              (this.flag = !1);
          }),
          (e.getCurrentStore = function () {
            return this.clientStores[0];
          }),
          (e.moveClients = function (t, n, e) {
            var r = this.getCurrentStore()[e ? "addClients" : "getPosition"](t);
            return (
              (this.isDrag = !0),
              _e({ datas: this.datas }, r, {
                movement: this.getMovement(t),
                isDrag: this.isDrag,
                isPinch: this.isPinch,
                isScroll: !1,
                inputEvent: n,
              })
            );
          }),
          n
        );
      })(Pe);
    var qe = function (t) {
      for (var n = 5381, e = t.length; e; ) n = (33 * n) ^ t.charCodeAt(--e);
      return n >>> 0;
    };
    function Le(t, n, e, r) {
      var i = document.createElement("style");
      return (
        i.setAttribute("type", "text/css"),
        i.setAttribute("data-styled-id", t),
        e.nonce && i.setAttribute("nonce", e.nonce),
        (i.innerHTML = (function (t, n, e) {
          return e.original
            ? n
            : n.replace(/([^};{\s}][^};{]*|^\s*){/gm, function (n, e) {
                var r = e.trim();
                return (
                  (r ? _t(r) : [""])
                    .map(function (n) {
                      var e = n.trim();
                      return 0 === e.indexOf("@")
                        ? e
                        : e.indexOf(":global") > -1
                        ? e.replace(/\:global/g, "")
                        : e.indexOf(":host") > -1
                        ? "" + e.replace(/\:host/g, "." + t)
                        : e
                        ? "." + t + " " + e
                        : "." + t;
                    })
                    .join(", ") + " {"
                );
              });
        })(t, n, e)),
        (r || document.head || document.body).appendChild(i),
        i
      );
    }
    function Ve(t) {
      var n,
        e = "rCS" + qe(t).toString(36),
        r = 0;
      return {
        className: e,
        inject: function (i, o) {
          void 0 === o && (o = {});
          var a,
            s = (function (t) {
              if (t && t.getRootNode) {
                var n = t.getRootNode();
                if (11 === n.nodeType) return n;
              }
            })(i),
            u = 0 === r;
          return (
            (s || u) && (a = Le(e, t, o, s)),
            u && (n = a),
            s || ++r,
            {
              destroy: function () {
                s
                  ? (i.removeChild(a), (a = null))
                  : (r > 0 && --r,
                    0 === r && n && (n.parentNode.removeChild(n), (n = null)));
              },
            }
          );
        },
      };
    }
    /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
  
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
  
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */ var We = function (
      t,
      n
    ) {
      return (We =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, n) {
            t.__proto__ = n;
          }) ||
        function (t, n) {
          for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
        })(t, n);
    };
    function He(t, n) {
      function e() {
        this.constructor = t;
      }
      We(t, n),
        (t.prototype =
          null === n ? Object.create(n) : ((e.prototype = n.prototype), new e()));
    }
    var Ue = function () {
      return (Ue =
        Object.assign ||
        function (t) {
          for (var n, e = 1, r = arguments.length; e < r; e++)
            for (var i in (n = arguments[e]))
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          return t;
        }).apply(this, arguments);
    };
    var Ze = (function (t) {
      function n() {
        var n = (null !== t && t.apply(this, arguments)) || this;
        return (n.injectResult = null), (n.tag = "div"), n;
      }
      He(n, t);
      var e = n.prototype;
      return (
        (e.render = function () {
          var t = this.props,
            n = t.className,
            e = void 0 === n ? "" : n;
          t.cspNonce;
          var r = t.portalContainer,
            i = (function (t, n) {
              var e = {};
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) &&
                  n.indexOf(r) < 0 &&
                  (e[r] = t[r]);
              if (
                null != t &&
                "function" == typeof Object.getOwnPropertySymbols
              ) {
                var i = 0;
                for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
                  n.indexOf(r[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
                    (e[r[i]] = t[r[i]]);
              }
              return e;
            })(t, ["className", "cspNonce", "portalContainer"]),
            o = this.injector.className,
            a = this.tag,
            s = {};
          return (
            "simple-1.1.0".indexOf("simple") > -1 &&
              r &&
              (s = { portalContainer: r }),
            pn(
              a,
              Ue(
                {
                  ref: dt(this, "element"),
                  "data-styled-id": o,
                  className: e + " " + o,
                },
                s,
                i
              )
            )
          );
        }),
        (e.componentDidMount = function () {
          this.injectResult = this.injector.inject(this.element, {
            nonce: this.props.cspNonce,
          });
        }),
        (e.componentWillUnmount = function () {
          this.injectResult.destroy(), (this.injectResult = null);
        }),
        (e.getElement = function () {
          return this.element;
        }),
        n
      );
    })(Sn);
    function Ke(t, n) {
      var e = Ve(n);
      return (function (n) {
        function r() {
          var r = (null !== n && n.apply(this, arguments)) || this;
          return (r.injector = e), (r.tag = t), r;
        }
        return He(r, n), r;
      })(Ze);
    }
    /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */ var Je = function (
      t,
      n
    ) {
      return (Je =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, n) {
            t.__proto__ = n;
          }) ||
        function (t, n) {
          for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
        })(t, n);
    };
    function Qe(t, n) {
      function e() {
        this.constructor = t;
      }
      Je(t, n),
        (t.prototype =
          null === n ? Object.create(n) : ((e.prototype = n.prototype), new e()));
    }
    var tr = function () {
      return (tr =
        Object.assign ||
        function (t) {
          for (var n, e = 1, r = arguments.length; e < r; e++)
            for (var i in (n = arguments[e]))
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          return t;
        }).apply(this, arguments);
    };
    function nr() {
      for (var t = 0, n = 0, e = arguments.length; n < e; n++)
        t += arguments[n].length;
      var r = Array(t),
        i = 0;
      for (n = 0; n < e; n++)
        for (var o = arguments[n], a = 0, s = o.length; a < s; a++, i++)
          r[i] = o[a];
      return r;
    }
    function er(t, n) {
      return (
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' +
        32 * t +
        'px" height="' +
        32 * t +
        'px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(' +
        n +
        'deg);transform-origin: 16px 16px"></path></svg>'
      );
    }
    var rr,
      ir,
      or = (void 0 === rr &&
      (function () {
        if (
          "undefined" == typeof navigator ||
          !navigator ||
          !navigator.userAgentData
        )
          return !1;
        var t = navigator.userAgentData,
          n = t.brands || t.uaList;
        return !(!n || !n.length);
      })()
        ? (function (t) {
            var n = navigator.userAgentData,
              e = (n.uaList || n.brands).slice(),
              r = n.mobile || !1,
              i = e[0],
              o = {
                name: i.brand,
                version: i.version,
                majorVersion: -1,
                webkit: !1,
                webkitVersion: "-1",
                chromium: !1,
                chromiumVersion: "-1",
                webview: !!_n(Nn, e).brand,
              },
              a = { name: "unknown", version: "-1", majorVersion: -1 };
            o.webkit =
              !o.chromium &&
              Pn(jn, function (t) {
                return kn(e, t);
              });
            var s = _n(In, e);
            if (
              ((o.chromium = !!s.brand),
              (o.chromiumVersion = s.version),
              !o.chromium)
            ) {
              var u = _n(jn, e);
              (o.webkit = !!u.brand), (o.webkitVersion = u.version);
            }
            if (t) {
              var l = t.platform.toLowerCase(),
                c = zn(Fn, function (t) {
                  return new RegExp("" + t.test, "g").exec(l);
                });
              (a.name = c ? c.id : l), (a.version = t.platformVersion);
            }
            var f = _n(An, e);
            return (
              f.brand &&
                ((o.name = f.brand),
                (o.version = t ? t.uaFullVersion : f.version)),
              "Linux armv8l" === navigator.platform
                ? (a.name = "android")
                : o.webkit && (a.name = r ? "ios" : "mac"),
              "ios" === a.name && o.webview && (o.version = "-1"),
              (a.version = Bn(a.version)),
              (o.version = Bn(o.version)),
              (a.majorVersion = parseInt(a.version, 10)),
              (o.majorVersion = parseInt(o.version, 10)),
              { browser: o, os: a, isMobile: r, isHints: !0 }
            );
          })()
        : Yn(rr)
      ).browser.webkit,
      ar =
        or &&
        !!(ir = /applewebkit\/([^\s]+)/g.exec(
          navigator.userAgent.toLowerCase()
        )) &&
        parseFloat(ir[1]) < 605,
      sr = "moveable-",
      ur =
        "\n{\n\tposition: absolute;\n\twidth: 1px;\n\theight: 1px;\n\tleft: 0;\n\ttop: 0;\n    z-index: 3000;\n    --moveable-color: #4af;\n    --zoom: 1;\n    --zoompx: 1px;\n    will-change: transform;\n}\n.control-box {\n    z-index: 0;\n}\n.line, .control {\n    position: absolute;\n\tleft: 0;\n    top: 0;\n    will-change: transform;\n}\n.control {\n\twidth: 14px;\n\theight: 14px;\n\tborder-radius: 50%;\n\tborder: 2px solid #fff;\n\tbox-sizing: border-box;\n    background: #4af;\n    background: var(--moveable-color);\n\tmargin-top: -7px;\n    margin-left: -7px;\n    border: 2px solid #fff;\n    z-index: 10;\n}\n.padding {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: 100px;\n    height: 100px;\n    transform-origin: 0 0;\n}\n.line {\n\twidth: 1px;\n    height: 1px;\n    background: #4af;\n    background: var(--moveable-color);\n\ttransform-origin: 0px 50%;\n}\n.line.dashed {\n    box-sizing: border-box;\n    background: transparent;\n}\n.line.dashed.horizontal {\n    border-top: 1px dashed #4af;\n    border-top-color: #4af;\n    border-top-color: var(--moveable-color);\n}\n.line.dashed.vertical {\n    border-left: 1px dashed #4af;\n    border-left-color: #4af;\n    border-left-color: var(--moveable-color);\n}\n.line.vertical {\n    transform: translateX(-50%);\n}\n.line.horizontal {\n    transform: translateY(-50%);\n}\n.line.vertical.bold {\n    width: 2px;\n}\n.line.horizontal.bold {\n    height: 2px;\n}\n\n.control.origin {\n\tborder-color: #f55;\n\tbackground: #fff;\n\twidth: 12px;\n\theight: 12px;\n\tmargin-top: -6px;\n    margin-left: -6px;\n\tpointer-events: none;\n}\n" +
        [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165]
          .map(function (t) {
            return (
              '\n.direction[data-rotation="' +
              t +
              '"] {\n\t' +
              (function (t) {
                var n = er(1, t),
                  e = er(2, t),
                  r = (45 * Math.round(t / 45)) % 180,
                  i = "ns-resize";
                return (
                  135 === r
                    ? (i = "nwse-resize")
                    : 45 === r
                    ? (i = "nesw-resize")
                    : 90 === r && (i = "ew-resize"),
                  "cursor:" +
                    i +
                    ";cursor: url('" +
                    n +
                    "') 16 16, " +
                    i +
                    ";cursor: -webkit-image-set(url('" +
                    n +
                    "') 1x, url('" +
                    e +
                    "') 2x) 16 16, " +
                    i +
                    ";"
                );
              })(t) +
              "\n}\n"
            );
          })
          .join("\n") +
        "\n.group {\n    z-index: -1;\n}\n.area {\n    position: absolute;\n}\n.area-pieces {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: none;\n}\n.area.avoid, .area.pass {\n    pointer-events: none;\n}\n.area.avoid+.area-pieces {\n    display: block;\n}\n.area-piece {\n    position: absolute;\n}\n\n" +
        (ar
          ? ':global svg *:before {\n\tcontent:"";\n\ttransform-origin: inherit;\n}'
          : "") +
        "\n",
      lr = [
        [0, 1, 2],
        [1, 0, 3],
        [2, 0, 3],
        [3, 1, 2],
      ],
      cr = 1e-7,
      fr = 1e-9,
      pr = Math.pow(10, 10),
      dr = -pr,
      hr = ["n", "w", "s", "e", "nw", "ne", "sw", "se"],
      vr = {
        n: [0, 1],
        s: [2, 3],
        w: [2, 0],
        e: [1, 3],
        nw: [0],
        ne: [1],
        sw: [2],
        se: [3],
      },
      gr = { n: 0, s: 180, w: 270, e: 90, nw: 315, ne: 45, sw: 225, se: 135 },
      mr = [
        "isMoveableElement",
        "updateRect",
        "updateTarget",
        "destroy",
        "dragStart",
        "isInside",
        "hitTest",
        "setState",
        "getRect",
        "request",
        "isDragging",
        "getManager",
      ];
    function br() {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      return pt.apply(void 0, nr([sr], t));
    }
    function xr(t, n, e) {
      return Un(
        n,
        fe(e, n),
        t,
        fe(
          e.map(function (t) {
            return -t;
          }),
          n
        )
      );
    }
    function yr(t) {
      return Er(Qr(t, ":before")).map(function (n, e) {
        var r = At(n),
          i = r.value,
          o = r.unit;
        return (
          i *
          (function (t, n, e) {
            return "%" === n
              ? Pr(t.ownerSVGElement)[e ? "width" : "height"] / 100
              : 1;
          })(t, o, 0 === e)
        );
      });
    }
    function Er(t) {
      var n = t.transformOrigin;
      return n ? n.split(" ") : ["0", "0"];
    }
    function Sr(t, n, e) {
      for (
        var r = document.body,
          i = !t || e ? t : t.parentElement,
          o = t === n || i === n,
          a = "relative";
        i && i !== r;
  
      ) {
        n === i && (o = !0);
        var s = Qr(i),
          u = s.transform;
        if (
          ((a = s.position),
          "svg" === i.tagName.toLowerCase() ||
            "static" !== a ||
            (u && "none" !== u))
        )
          break;
        (i = i.parentElement), (a = "relative");
      }
      return {
        isStatic: "static" === a,
        isEnd: o || !i || i === r,
        offsetParent: i || r,
      };
    }
    function wr(t, n, e, r) {
      var i,
        o = t.tagName.toLowerCase(),
        a = t.offsetLeft,
        s = t.offsetTop;
      if (r) {
        var u = (n || document.documentElement).getBoundingClientRect();
        (a -= u.left), (s -= u.top);
      }
      var l,
        c,
        f = Dt(a),
        p = !f;
      return (
        p || "svg" === o
          ? (c = (l = Er(e).map(function (t) {
              return parseFloat(t);
            })).slice())
          : ((c = (l = ar
              ? yr(t)
              : Er(e).map(function (t) {
                  return parseFloat(t);
                })).slice()),
            (p = !0),
            (a = (i = (function (t, n) {
              if (!t.getBBox) return [0, 0];
              var e = t.getBBox(),
                r = Pr(t.ownerSVGElement),
                i = e.x - r.x,
                o = e.y - r.y;
              return [i, o, n[0] - i, n[1] - o];
            })(t, l))[0]),
            (s = i[1]),
            (l[0] = i[2]),
            (l[1] = i[3])),
        {
          tagName: o,
          isSVG: f,
          hasOffset: p,
          offset: [a || 0, s || 0],
          origin: l,
          targetOrigin: c,
        }
      );
    }
    function Mr(t, n, e) {
      void 0 === e && (e = window.getComputedStyle(t));
      var r = window.getComputedStyle(document.body),
        i = r.position;
      if (!(n || (i && "static" !== i))) return [0, 0];
      var o = parseInt(r.marginLeft, 10),
        a = parseInt(r.marginTop, 10);
      return (
        "absolute" === e.position &&
          (("auto" === e.top && "auto" === e.bottom) || (a = 0),
          ("auto" === e.left && "auto" === e.right) || (o = 0)),
        [o, a]
      );
    }
    function Cr(t) {
      t.forEach(function (t) {
        var n = t.matrix;
        n && (t.matrix = Hn(n, 3, 4));
      });
    }
    function Dr(t, n) {
      for (
        var e,
          r,
          i,
          o,
          a,
          s,
          u = t,
          l = [],
          c = !1,
          f = !1,
          p = 3,
          d = Sr(n, n, !0).offsetParent;
        u && !c;
  
      ) {
        var h = Qr(u),
          v = h.position,
          g = "fixed" === v,
          m =
            ((s = h.transform),
            (o =
              s && "none" !== s
                ? Rt(s)
                  ? s
                  : kt(s)
                      .value.split(/s*,\s*/g)
                      .map(function (t) {
                        return parseFloat(t);
                      })
                : [1, 0, 0, 1, 0, 0]),
            void 0 === (a = void 0) && (a = 6 === o.length),
            a ? [o[0], o[1], 0, o[2], o[3], 0, o[4], o[5], 1] : o),
          b = m.length;
        f || 16 !== b || ((f = !0), (p = 4), Cr(l)),
          f && 9 === b && (m = Hn(m, 3, 4));
        var x = wr(u, n, h, g),
          y = x.tagName,
          E = x.hasOffset,
          S = x.isSVG,
          w = x.origin,
          M = x.targetOrigin,
          C = x.offset,
          D = C[0],
          R = C[1];
        "svg" === y && i
          ? (l.push({ type: "target", target: u, matrix: zr(u, p) }),
            l.push({ type: "offset", target: u, matrix: le(p) }))
          : "g" === y && t !== u && ((D = 0), (R = 0));
        var O = Sr(u, n),
          P = O.offsetParent,
          z = O.isEnd,
          G = O.isStatic;
        or &&
          E &&
          !S &&
          G &&
          ("relative" === v || "static" === v) &&
          ((D -= P.offsetLeft), (R -= P.offsetTop), (c = c || z));
        var B = 0,
          T = 0;
        if (
          (E && d !== P && ((B = P.clientLeft), (T = P.clientTop)),
          E && P === document.body)
        ) {
          var _ = Mr(u, !1, h);
          (D += _[0]), (R += _[1]);
        }
        if (
          (l.push({ type: "target", target: u, matrix: xr(m, p, w) }),
          E
            ? l.push({
                type: "offset",
                target: u,
                matrix: fe([D - u.scrollLeft + B, R - u.scrollTop + T], p),
              })
            : l.push({ type: "offset", target: u, origin: w }),
          i || (i = m),
          e || (e = w),
          r || (r = M),
          c || g)
        )
          break;
        (u = P), (c = z);
      }
      return (
        i || (i = le(p)),
        e || (e = [0, 0]),
        r || (r = [0, 0]),
        {
          offsetContainer: d,
          matrixes: l,
          targetMatrix: i,
          transformOrigin: e,
          targetOrigin: r,
          is3d: f,
        }
      );
    }
    function Rr(t, n, e, r) {
      var i;
      void 0 === e && (e = n);
      var o = 0,
        a = 0,
        s = 0,
        u = {};
      if (t) {
        var l = Qr(t);
        (o = t.offsetWidth),
          (a = t.offsetHeight),
          Dt(o) && ((o = (i = Fr(t, l, !0))[0]), (a = i[1]));
      }
      if (t) {
        var c = (function (t, n, e, r) {
            void 0 === e && (e = n);
            var i = Dr(t, n),
              o = i.matrixes,
              a = i.is3d,
              s = i.targetMatrix,
              u = i.transformOrigin,
              l = i.targetOrigin,
              c = Dr(i.offsetContainer, e),
              f = c.matrixes,
              p = c.is3d,
              d = r || p || a,
              h = d ? 4 : 3,
              v = "svg" !== t.tagName.toLowerCase() && "ownerSVGElement" in t,
              g = n || document.body,
              m = s,
              b = le(h),
              x = le(h),
              y = le(h),
              E = le(h),
              S = o.length,
              w = Sr(g, g, !0).offsetParent;
            f.reverse(), o.reverse(), !a && d && ((m = Hn(m, 3, 4)), Cr(o));
            !p && d && Cr(f);
            f.forEach(function (t) {
              x = Zn(x, t.matrix, h);
            }),
              o.forEach(function (t, n) {
                if (
                  (S - 2 === n && (y = b.slice()),
                  S - 1 === n && (E = b.slice()),
                  !t.matrix)
                ) {
                  var e = (function (t, n, e, r, i) {
                    var o,
                      a = t.target,
                      s = t.origin,
                      u = n.matrix,
                      l = Fr(a, void 0, !0),
                      c = l[0],
                      f = l[1],
                      p = e.getBoundingClientRect(),
                      d = [0, 0];
                    e === document.body && (d = Mr(a, !0));
                    var h = a.getBoundingClientRect(),
                      v =
                        h.left -
                        p.left +
                        e.scrollLeft -
                        (e.clientLeft || 0) +
                        d[0],
                      g = h.top - p.top + e.scrollTop - (e.clientTop || 0) + d[1],
                      m = h.width,
                      b = h.height,
                      x = Un(r, i, u),
                      y = _r(x, c, f, r),
                      E = y.left,
                      S = y.top,
                      w = y.width,
                      M = y.height,
                      C = Gr(x, s, r),
                      D = Jn(C, [E, S]),
                      R = [v + (D[0] * m) / w, g + (D[1] * b) / M],
                      O = [0, 0],
                      P = 0;
                    for (; ++P < 10; ) {
                      var z = Vn(i, r);
                      (o = Jn(Gr(z, R, r), Gr(z, C, r))),
                        (O[0] = o[0]),
                        (O[1] = o[1]);
                      var G = _r(Un(r, i, fe(O, r), u), c, f, r),
                        B = G.left - v,
                        T = G.top - g;
                      if (Math.abs(B) < 2 && Math.abs(T) < 2) break;
                      (R[0] -= B), (R[1] -= T);
                    }
                    return O.map(function (t) {
                      return Math.round(t);
                    });
                  })(t, o[n + 1], w, h, Zn(x, b, h));
                  t.matrix = fe(e, h);
                }
                b = Zn(b, t.matrix, h);
              });
            var M = !v && a;
            m || (m = le(M ? 4 : 3));
            var C = Or(v && 16 === m.length ? Hn(m, 4, 3) : m, M);
            return {
              rootMatrix: (x = Ln(x, h, h)),
              beforeMatrix: y,
              offsetMatrix: E,
              allMatrix: b,
              targetMatrix: m,
              targetTransform: C,
              transformOrigin: u,
              targetOrigin: l,
              is3d: d,
            };
          })(t, n, e, r),
          f = kr(c.allMatrix, c.transformOrigin, o, a);
        u = tr(tr({}, c), f);
        var p = kr(c.allMatrix, [50, 50], 100, 100);
        s = Yr([p.pos1, p.pos2], p.direction);
      }
      var d = r ? 4 : 3;
      return tr(
        {
          width: o,
          height: a,
          rotation: s,
          rootMatrix: le(d),
          beforeMatrix: le(d),
          offsetMatrix: le(d),
          allMatrix: le(d),
          targetMatrix: le(d),
          targetTransform: "",
          transformOrigin: [0, 0],
          targetOrigin: [0, 0],
          is3d: !!r,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          origin: [0, 0],
          pos1: [0, 0],
          pos2: [0, 0],
          pos3: [0, 0],
          pos4: [0, 0],
          direction: 1,
        },
        u
      );
    }
    function Or(t, n) {
      return (
        void 0 === n && (n = t.length > 9),
        (n ? "matrix3d" : "matrix") + "(" + Qn(t, !n).join(",") + ")"
      );
    }
    function Pr(t) {
      var n = t.clientWidth,
        e = t.clientHeight;
      if (!t)
        return {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          clientWidth: n,
          clientHeight: e,
        };
      var r = t.viewBox,
        i = (r && r.baseVal) || { x: 0, y: 0, width: 0, height: 0 };
      return {
        x: i.x,
        y: i.y,
        width: i.width || n,
        height: i.height || e,
        clientWidth: n,
        clientHeight: e,
      };
    }
    function zr(t, n) {
      var e = Pr(t),
        r = e.width,
        i = e.height,
        o = e.clientWidth,
        a = e.clientHeight,
        s = o / r,
        u = a / i,
        l = t.preserveAspectRatio.baseVal,
        c = l.align,
        f = l.meetOrSlice,
        p = [0, 0],
        d = [s, u],
        h = [0, 0];
      if (1 !== c) {
        var v = (c - 2) % 3,
          g = Math.floor((c - 2) / 3);
        (p[0] = (r * v) / 2), (p[1] = (i * g) / 2);
        var m = 2 === f ? Math.max(u, s) : Math.min(s, u);
        (d[0] = m),
          (d[1] = m),
          (h[0] = ((o - r) / 2) * v),
          (h[1] = ((a - i) / 2) * g);
      }
      var b = ce(d, n);
      return (b[n * (n - 1)] = h[0]), (b[n * (n - 1) + 1] = h[1]), xr(b, n, p);
    }
    function Gr(t, n, e) {
      return te(t, Wn(n, e), e);
    }
    function Br(t, n, e, r) {
      return [
        [0, 0],
        [n, 0],
        [0, e],
        [n, e],
      ].map(function (n) {
        return Gr(t, n, r);
      });
    }
    function Tr(t) {
      var n = t.map(function (t) {
          return t[0];
        }),
        e = t.map(function (t) {
          return t[1];
        }),
        r = Math.min.apply(Math, n),
        i = Math.min.apply(Math, e),
        o = Math.max.apply(Math, n),
        a = Math.max.apply(Math, e);
      return {
        left: r,
        top: i,
        right: o,
        bottom: a,
        width: o - r,
        height: a - i,
      };
    }
    function _r(t, n, e, r) {
      return Tr(Br(t, n, e, r));
    }
    function kr(t, n, e, r) {
      var i = 16 === t.length ? 4 : 3,
        o = Br(t, e, r, i),
        a = o[0],
        s = a[0],
        u = a[1],
        l = o[1],
        c = l[0],
        f = l[1],
        p = o[2],
        d = p[0],
        h = p[1],
        v = o[3],
        g = v[0],
        m = v[1],
        b = Gr(t, n, i),
        x = b[0],
        y = b[1],
        E = Math.min(s, c, d, g),
        S = Math.min(u, f, h, m),
        w = Math.max(s, c, d, g);
      return (
        (s = s - E || 0),
        {
          left: E,
          top: S,
          right: w,
          bottom: Math.max(u, f, h, m),
          origin: [(x = x - E || 0), (y = y - S || 0)],
          pos1: [s, (u = u - S || 0)],
          pos2: [(c = c - E || 0), (f = f - S || 0)],
          pos3: [(d = d - E || 0), (h = h - S || 0)],
          pos4: [(g = g - E || 0), (m = m - S || 0)],
          direction: Ht(o),
        }
      );
    }
    function Ar(t) {
      return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    }
    function Ir(t, n) {
      return Ar([n[0] - t[0], n[1] - t[1]]);
    }
    function jr(t, n, e, r) {
      void 0 === e && (e = 1), void 0 === r && (r = Wt(t, n));
      var i = Ir(t, n);
      return {
        transform:
          "translateY(-50%) translate(" +
          t[0] +
          "px, " +
          t[1] +
          "px) rotate(" +
          r +
          "rad) scaleY(" +
          e +
          ")",
        width: i + "px",
      };
    }
    function Nr(t, n) {
      for (var e = [], r = 2; r < arguments.length; r++) e[r - 2] = arguments[r];
      var i = e.length,
        o =
          e.reduce(function (t, n) {
            return t + n[0];
          }, 0) / i,
        a =
          e.reduce(function (t, n) {
            return t + n[1];
          }, 0) / i;
      return {
        transform:
          "translateZ(0px) translate(" +
          o +
          "px, " +
          a +
          "px) rotate(" +
          t +
          "rad) scale(" +
          n +
          ")",
      };
    }
    function Fr(t, n, e, r) {
      void 0 === n && (n = window.getComputedStyle(t)),
        void 0 === r && (r = e || "border-box" === n.boxSizing);
      var i = t.offsetWidth,
        o = t.offsetHeight,
        a = !Dt(i);
      if ((e || r) && a) return [i, o];
      if (!a && "svg" !== t.tagName.toLowerCase()) {
        var s = t.getBBox();
        return [s.width, s.height];
      }
      return (
        (i = t.clientWidth),
        (o = t.clientHeight),
        e || r
          ? [
              i +
                (parseFloat(n.borderLeftWidth) || 0) +
                (parseFloat(n.borderRightWidth) || 0),
              o +
                (parseFloat(n.borderTopWidth) || 0) +
                (parseFloat(n.borderBottomWidth) || 0),
            ]
          : [
              i -
                (parseFloat(n.paddingLeft) || 0) -
                (parseFloat(n.paddingRight) || 0),
              o -
                (parseFloat(n.paddingTop) || 0) -
                (parseFloat(n.paddingBottom) || 0),
            ]
      );
    }
    function Yr(t, n) {
      return Wt(n > 0 ? t[0] : t[1], n > 0 ? t[1] : t[0]);
    }
    function Xr(t, n, e, r, i) {
      var o = 1,
        a = [0, 0],
        s = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: 0,
          height: 0,
          clientLeft: 0,
          clientTop: 0,
          clientWidth: 0,
          clientHeight: 0,
          scrollWidth: 0,
          scrollHeight: 0,
        },
        u = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: 0,
          height: 0,
          clientLeft: 0,
          clientTop: 0,
          clientWidth: 0,
          clientHeight: 0,
          scrollWidth: 0,
          scrollHeight: 0,
        },
        l = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: 0,
          height: 0,
          clientLeft: 0,
          clientTop: 0,
          clientWidth: 0,
          clientHeight: 0,
          scrollWidth: 0,
          scrollHeight: 0,
        },
        c = Rr(n, e, i, !1);
      if (n) {
        var f = c.is3d ? 4 : 3,
          p = kr(
            c.offsetMatrix,
            Kn(
              c.transformOrigin,
              (function (t, n) {
                void 0 === n && (n = Math.sqrt(t.length));
                for (var e = [], r = t[n * n - 1], i = 0; i < n - 1; ++i)
                  e[i] = t[n * (n - 1) + i] / r;
                return (e[n - 1] = 0), e;
              })(c.targetMatrix, f)
            ),
            c.width,
            c.height
          );
        (o = p.direction),
          (a = Kn(p.origin, [p.left - c.left, p.top - c.top])),
          (s = $r(n)),
          (u = $r(Sr(r, r, !0).offsetParent || document.body, !0)),
          t && (l = $r(t));
      }
      return tr(
        {
          targetClientRect: s,
          containerClientRect: u,
          moveableClientRect: l,
          beforeDirection: o,
          beforeOrigin: a,
          originalBeforeOrigin: a,
          target: n,
        },
        c
      );
    }
    function $r(t, n) {
      var e = 0,
        r = 0,
        i = 0,
        o = 0;
      if (t === document.body || t === document.documentElement)
        (i = window.innerWidth),
          (o = window.innerHeight),
          (e = -(
            document.documentElement.scrollLeft || document.body.scrollLeft
          )),
          (r = -(document.documentElement.scrollTop || document.body.scrollTop));
      else {
        var a = t.getBoundingClientRect();
        (e = a.left), (r = a.top), (i = a.width), (o = a.height);
      }
      var s = {
        left: e,
        right: e + i,
        top: r,
        bottom: r + o,
        width: i,
        height: o,
      };
      return (
        n &&
          ((s.clientLeft = t.clientLeft),
          (s.clientTop = t.clientTop),
          (s.clientWidth = t.clientWidth),
          (s.clientHeight = t.clientHeight),
          (s.scrollWidth = t.scrollWidth),
          (s.scrollHeight = t.scrollHeight),
          (s.overflow = "visible" !== Qr(t).overflow)),
        s
      );
    }
    function qr(t) {
      if (t) {
        var n = t.getAttribute("data-direction");
        if (n) {
          var e = [0, 0];
          return (
            n.indexOf("w") > -1 && (e[0] = -1),
            n.indexOf("e") > -1 && (e[0] = 1),
            n.indexOf("n") > -1 && (e[1] = -1),
            n.indexOf("s") > -1 && (e[1] = 1),
            e
          );
        }
      }
    }
    function Lr(t, n) {
      return [Kn(n, t[0]), Kn(n, t[1]), Kn(n, t[2]), Kn(n, t[3])];
    }
    function Vr(t) {
      var n = t.left,
        e = t.top;
      return Lr([t.pos1, t.pos2, t.pos3, t.pos4], [n, e]);
    }
    function Wr(t, n) {
      return n ? Math.round(t / n) * n : t;
    }
    function Hr(t, n) {
      return (
        t.forEach(function (e, r) {
          t[r] = Wr(t[r], n);
        }),
        t
      );
    }
    function Ur(t, n) {
      t[n] && (t[n].unset(), (t[n] = null));
    }
    function Zr(t, n, e) {
      var r = n.datas;
      r.datas || (r.datas = {});
      var i = tr(tr({}, e), {
        target: t.state.target,
        clientX: n.clientX,
        clientY: n.clientY,
        inputEvent: n.inputEvent,
        currentTarget: t,
        moveable: t,
        datas: r.datas,
      });
      return r.isStartEvent ? (r.lastEvent = i) : (r.isStartEvent = !0), i;
    }
    function Kr(t, n, e) {
      var r = n.datas,
        i = "isDrag" in e ? e.isDrag : n.isDrag;
      return (
        r.datas || (r.datas = {}),
        tr(tr({ isDrag: i }, e), {
          moveable: t,
          target: t.state.target,
          clientX: n.clientX,
          clientY: n.clientY,
          inputEvent: n.inputEvent,
          currentTarget: t,
          lastEvent: r.lastEvent,
          isDouble: n.isDouble,
          datas: r.datas,
        })
      );
    }
    function Jr(t, n, e, r) {
      return t.triggerEvent(n, e, r);
    }
    function Qr(t, n) {
      return window.getComputedStyle(t, n);
    }
    function ti(t, n, e) {
      var r = {},
        i = {};
      return t.filter(function (t) {
        var o = t.name;
        if (
          r[o] ||
          !n.some(function (n) {
            return t[n];
          })
        )
          return !1;
        if (!e && t.ableGroup) {
          if (i[t.ableGroup]) return !1;
          i[t.ableGroup] = !0;
        }
        return (r[o] = !0), !0;
      });
    }
    function ni(t, n) {
      return t === n || (null == t && null == n);
    }
    function ei(t, n) {
      var e = [],
        r = [];
      return (
        t.forEach(function (i, o) {
          var a = n(i, o, t),
            s = r.indexOf(a),
            u = e[s] || [];
          -1 === s && (r.push(a), e.push(u)), u.push(i);
        }),
        e
      );
    }
    function ri(t) {
      return t.reduce(function (t, n) {
        return t.concat(n);
      }, []);
    }
    function ii() {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      return (
        t.sort(function (t, n) {
          return Math.abs(n) - Math.abs(t);
        }),
        t[0]
      );
    }
    function oi(t, n, e) {
      return te(Vn(t, e), Wn(n, e), e);
    }
    function ai(t, n) {
      var e,
        r = t.is3d ? 4 : 3;
      return (
        (e = oi(t.rootMatrix, [n.distX, n.distY], r)),
        (n.distX = e[0]),
        (n.distY = e[1]),
        n
      );
    }
    function si(t, n, e, r, i) {
      return Jn(Gr(t, Kn(e, n), i), r);
    }
    function ui(t, n, e) {
      return e ? (t / n) * 100 + "%" : t + "px";
    }
    function li(t) {
      return Math.abs(t) <= cr ? 0 : t;
    }
    function ci(t) {
      return t.isRequest
        ? ("resizable" === t.requestAble || "scalable" === t.requestAble) &&
            t.parentDirection
        : Zt(t.inputEvent.target, br("direction"));
    }
    function fi(t) {
      var n = {};
      for (var e in t) n[t[e]] = e;
      return n;
    }
    function pi(t, n) {
      return t
        ? Pt(t)
          ? n
            ? document.querySelector(t)
            : t
          : zt(t)
          ? t()
          : "current" in t
          ? t.current
          : t
        : null;
    }
    function di(t, n) {
      return t
        ? ((e = t) && Rt(e) && (Ot(e) || "length" in e)
            ? [].slice.call(t)
            : [t]
          ).reduce(function (t, e) {
            return Pt(e) && n
              ? nr(t, [].slice.call(document.querySelectorAll(e)))
              : (t.push(pi(e, n)), t);
          }, [])
        : [];
      var e;
    }
    function hi(t, n) {
      return (function (t, n) {
        var e,
          r = t.direction,
          i = t.classNames,
          o = t.size,
          a = t.pos,
          s = t.zoom,
          u = t.key,
          l = "horizontal" === r,
          c = l ? "Y" : "X";
        return n.createElement("div", {
          key: u,
          className: i.join(" "),
          style:
            ((e = {}),
            (e[l ? "width" : "height"] = "" + o),
            (e.transform =
              "translate(" +
              a[0] +
              ", " +
              a[1] +
              ") translate" +
              c +
              "(-50%) scale" +
              c +
              "(" +
              s +
              ")"),
            e),
        });
      })(
        tr(tr({}, t), {
          classNames: nr(
            [br("line", "guideline", t.direction)],
            t.classNames
          ).filter(function (t) {
            return t;
          }),
          size: t.size || t.sizeValue + "px",
          pos:
            t.pos ||
            t.posValue.map(function (t) {
              return t + "px";
            }),
        }),
        n
      );
    }
    var vi = {
      name: "pinchable",
      updateRect: !0,
      props: { pinchable: Boolean },
      events: {
        onPinchStart: "pinchStart",
        onPinch: "pinch",
        onPinchEnd: "pinchEnd",
        onPinchGroupStart: "pinchGroupStart",
        onPinchGroup: "pinchGroup",
        onPinchGroupEnd: "pinchGroupEnd",
      },
      dragStart: function () {
        return !0;
      },
      pinchStart: function (t, n) {
        var e = n.datas,
          r = n.targets,
          i = n.angle,
          o = n.originalDatas,
          a = t.props,
          s = a.pinchable,
          u = a.ables;
        if (!s) return !1;
        var l = "onPinch" + (r ? "Group" : "") + "Start",
          c = "drag" + (r ? "Group" : "") + "ControlStart",
          f = (!0 === s
            ? t.controlAbles
            : u.filter(function (t) {
                return s.indexOf(t.name) > -1;
              })
          ).filter(function (t) {
            return t.canPinch && t[c];
          }),
          p = Zr(t, n, {});
        r && (p.targets = r);
        var d = Jr(t, l, p);
        (e.isPinch = !1 !== d), (e.ables = f);
        var h = e.isPinch;
        return (
          !!h &&
          (f.forEach(function (e) {
            if (((o[e.name] = o[e.name] || {}), e[c])) {
              var r = tr(tr({}, n), {
                datas: o[e.name],
                parentRotate: i,
                isPinch: !0,
              });
              e[c](t, r);
            }
          }),
          (t.state.snapRenderInfo = { request: n.isRequest, direction: [0, 0] }),
          h)
        );
      },
      pinch: function (t, n) {
        var e = n.datas,
          r = n.scale,
          i = n.distance,
          o = n.originalDatas,
          a = n.inputEvent,
          s = n.targets,
          u = n.angle;
        if (e.isPinch) {
          var l = i * (1 - 1 / r),
            c = Zr(t, n, {});
          s && (c.targets = s), Jr(t, "onPinch" + (s ? "Group" : ""), c);
          var f = e.ables,
            p = "drag" + (s ? "Group" : "") + "Control";
          return (
            f.forEach(function (e) {
              e[p] &&
                e[p](
                  t,
                  tr(tr({}, n), {
                    datas: o[e.name],
                    inputEvent: a,
                    parentDistance: l,
                    parentRotate: u,
                    isPinch: !0,
                  })
                );
            }),
            c
          );
        }
      },
      pinchEnd: function (t, n) {
        var e = n.datas,
          r = n.isPinch,
          i = n.inputEvent,
          o = n.targets,
          a = n.originalDatas;
        if (e.isPinch) {
          var s = "onPinch" + (o ? "Group" : "") + "End",
            u = Kr(t, n, { isDrag: r });
          o && (u.targets = o), Jr(t, s, u);
          var l = e.ables,
            c = "drag" + (o ? "Group" : "") + "ControlEnd";
          return (
            l.forEach(function (e) {
              e[c] &&
                e[c](
                  t,
                  tr(tr({}, n), {
                    isDrag: r,
                    datas: a[e.name],
                    inputEvent: i,
                    isPinch: !0,
                  })
                );
            }),
            r
          );
        }
      },
      pinchGroupStart: function (t, n) {
        return this.pinchStart(t, tr(tr({}, n), { targets: t.props.targets }));
      },
      pinchGroup: function (t, n) {
        return this.pinch(t, tr(tr({}, n), { targets: t.props.targets }));
      },
      pinchGroupEnd: function (t, n) {
        return this.pinchEnd(t, tr(tr({}, n), { targets: t.props.targets }));
      },
    };
    function gi(t, n, e, r, i) {
      var o = n.gesto.move(e, t.inputEvent),
        a = o.originalDatas || o.datas,
        s = a.draggable || (a.draggable = {});
      return tr(tr({}, i ? ai(n, o) : o), {
        isDrag: !0,
        isPinch: !!r,
        parentEvent: !0,
        datas: s,
        originalDatas: t.originalDatas,
      });
    }
    var mi = (function () {
      function t() {
        (this.prevX = 0),
          (this.prevY = 0),
          (this.startX = 0),
          (this.startY = 0),
          (this.isDrag = !1),
          (this.isFlag = !1),
          (this.datas = { draggable: {} });
      }
      var n = t.prototype;
      return (
        (n.dragStart = function (t, n) {
          (this.isDrag = !1), (this.isFlag = !1);
          var e = n.originalDatas;
          return (
            (this.datas = e),
            e.draggable || (e.draggable = {}),
            tr(tr({}, this.move(t, n.inputEvent)), { type: "dragstart" })
          );
        }),
        (n.drag = function (t, n) {
          return this.move([t[0] - this.prevX, t[1] - this.prevY], n);
        }),
        (n.move = function (t, n) {
          var e, r;
          return (
            this.isFlag
              ? ((e = this.prevX + t[0]),
                (r = this.prevY + t[1]),
                (this.isDrag = !0))
              : ((this.prevX = t[0]),
                (this.prevY = t[1]),
                (this.startX = t[0]),
                (this.startY = t[1]),
                (e = t[0]),
                (r = t[1]),
                (this.isFlag = !0)),
            (this.prevX = e),
            (this.prevY = r),
            {
              type: "drag",
              clientX: e,
              clientY: r,
              inputEvent: n,
              isDrag: this.isDrag,
              distX: e - this.startX,
              distY: r - this.startY,
              deltaX: t[0],
              deltaY: t[1],
              datas: this.datas.draggable,
              originalDatas: this.datas,
              parentEvent: !0,
              parentGesto: this,
            }
          );
        }),
        t
      );
    })();
    function bi(t, n, e) {
      var r = e.originalDatas;
      r.groupable = r.groupable || {};
      var i = r.groupable;
      i.childDatas = i.childDatas || [];
      var o = i.childDatas;
      return t.moveables.map(function (t, r) {
        return (
          (o[r] = o[r] || {}),
          (o[r][n] = o[r][n] || {}),
          tr(tr({}, e), { datas: o[r][n], originalDatas: o[r] })
        );
      });
    }
    function xi(t, n, e, r, i, o) {
      var a = !!e.match(/Start$/g),
        s = !!e.match(/End$/g),
        u = i.isPinch,
        l = i.datas,
        c = bi(t, n.name, i),
        f = t.moveables,
        p = c.map(function (t, i) {
          var c = f[i],
            p = t;
          a
            ? (p = new mi().dragStart(r, t))
            : (c.state.gesto || (c.state.gesto = l.childGestos[i]),
              (p = gi(t, c.state, r, u, o)));
          var d = n[e](c, tr(tr({}, p), { parentFlag: !0 }));
          return s && (c.state.gesto = null), d;
        });
      return (
        a &&
          (l.childGestos = f.map(function (t) {
            return t.state.gesto;
          })),
        p
      );
    }
    function yi(t, n, e, r, i, o) {
      void 0 === i &&
        (i = function (t, n) {
          return n;
        });
      var a = !!e.match(/End$/g),
        s = bi(t, n.name, r),
        u = t.moveables;
      return s.map(function (t, r) {
        var s,
          l = u[r];
        s = i(l, t);
        var c = n[e](l, tr(tr({}, s), { parentFlag: !0 }));
        return c && o && o(l, t, c, r), a && (l.state.gesto = null), c;
      });
    }
    function Ei(t, n) {
      var e = n.clientX,
        r = n.clientY,
        i = n.datas,
        o = t.state,
        a = o.moveableClientRect,
        s = o.rootMatrix,
        u = o.is3d,
        l = o.pos1,
        c = Jn(oi(s, [e - a.left, r - a.top], u ? 4 : 3), l),
        f = Oi({ datas: i, distX: c[0], distY: c[1] });
      return [f[0], f[1]];
    }
    function Si(t, n) {
      var e = n.datas,
        r = t.state,
        i = r.allMatrix,
        o = r.beforeMatrix,
        a = r.is3d,
        s = r.left,
        u = r.top,
        l = r.origin,
        c = r.offsetMatrix,
        f = r.targetMatrix,
        p = r.transformOrigin,
        d = a ? 4 : 3;
      (e.is3d = a),
        (e.matrix = i),
        (e.targetMatrix = f),
        (e.beforeMatrix = o),
        (e.offsetMatrix = c),
        (e.transformOrigin = p),
        (e.inverseMatrix = Vn(i, d)),
        (e.inverseBeforeMatrix = Vn(o, d)),
        (e.absoluteOrigin = Wn(Kn([s, u], l), d)),
        (e.startDragBeforeDist = te(e.inverseBeforeMatrix, e.absoluteOrigin, d)),
        (e.startDragDist = te(e.inverseMatrix, e.absoluteOrigin, d));
    }
    function wi(t, n) {
      var e = t.datas,
        r = t.originalDatas.beforeRenderable,
        i = e.transformIndex,
        o = r.nextTransforms,
        a = r.nextTransformAppendedIndexes,
        s =
          -1 === i
            ? o.length
            : i +
              a.filter(function (t) {
                return t < i;
              }).length,
        u = (function (t, n) {
          var e = t.slice(0, n < 0 ? void 0 : n),
            r = t.slice(0, n < 0 ? void 0 : n + 1),
            i = t[n] || "",
            o = n < 0 ? [] : t.slice(n),
            a = n < 0 ? [] : t.slice(n + 1),
            s = he(e),
            u = he(r),
            l = he([i]),
            c = he(o),
            f = he(a),
            p = de(s),
            d = de(u),
            h = de(c),
            v = de(f),
            g = Zn(p, h, 4);
          return {
            transforms: t,
            beforeFunctionMatrix: p,
            beforeFunctionMatrix2: d,
            targetFunctionMatrix: de(l),
            afterFunctionMatrix: h,
            afterFunctionMatrix2: v,
            allFunctionMatrix: g,
            beforeFunctions: s,
            beforeFunctions2: u,
            targetFunction: l[0],
            afterFunctions: c,
            afterFunctions2: f,
            beforeFunctionTexts: e,
            beforeFunctionTexts2: r,
            targetFunctionText: i,
            afterFunctionTexts: o,
            afterFunctionTexts2: a,
          };
        })(o, s),
        l = u.targetFunction,
        c = "rotate" === n ? "rotateZ" : n;
      (e.beforeFunctionTexts = u.beforeFunctionTexts),
        (e.afterFunctionTexts = u.afterFunctionTexts),
        (e.beforeTransform = u.beforeFunctionMatrix),
        (e.beforeTransform2 = u.beforeFunctionMatrix2),
        (e.targetTansform = u.targetFunctionMatrix),
        (e.afterTransform = u.afterFunctionMatrix),
        (e.afterTransform2 = u.afterFunctionMatrix2),
        (e.targetAllTransform = u.allFunctionMatrix),
        l.functionName === c
          ? (e.afterFunctionTexts.splice(0, 1), (e.isAppendTransform = !1))
          : ((e.isAppendTransform = !0),
            (r.nextTransformAppendedIndexes = nr(a, [s])));
    }
    function Mi(t, n, e) {
      return (
        t.beforeFunctionTexts.join(" ") +
        " " +
        (t.isAppendTransform ? e : n) +
        " " +
        t.afterFunctionTexts.join(" ")
      );
    }
    function Ci(t) {
      var n = t.datas,
        e = Ri({ datas: n, distX: t.distX, distY: t.distY });
      return te(
        Di(
          n,
          (function (t, n) {
            for (var e = le(n), r = 0; r < n - 1; ++r)
              e[n * (n - 1) + r] = t[r] || 0;
            return e;
          })([e[0], e[1]], 4)
        ),
        Wn([0, 0, 0], 4),
        4
      );
    }
    function Di(t, n, e) {
      var r = t.beforeTransform,
        i = t.afterTransform,
        o = t.beforeTransform2,
        a = t.afterTransform2,
        s = t.targetAllTransform,
        u = e ? Zn(s, n, 4) : Zn(n, s, 4),
        l = Zn(Vn(e ? o : r, 4), u, 4);
      return Zn(l, Vn(e ? a : i, 4), 4);
    }
    function Ri(t) {
      var n = t.datas,
        e = t.distX,
        r = t.distY,
        i = n.inverseBeforeMatrix,
        o = n.is3d,
        a = n.startDragBeforeDist,
        s = o ? 4 : 3;
      return Jn(te(i, Kn(n.absoluteOrigin, [e, r]), s), a);
    }
    function Oi(t, n) {
      var e = t.datas,
        r = t.distX,
        i = t.distY,
        o = e.inverseBeforeMatrix,
        a = e.inverseMatrix,
        s = e.is3d,
        u = e.startDragBeforeDist,
        l = e.startDragDist,
        c = s ? 4 : 3;
      return Jn(te(n ? o : a, Kn(e.absoluteOrigin, [r, i]), c), n ? u : l);
    }
    function Pi(t) {
      var n = [];
      return (
        t[1] >= 0 && (t[0] >= 0 && n.push(3), t[0] <= 0 && n.push(2)),
        t[1] <= 0 && (t[0] >= 0 && n.push(1), t[0] <= 0 && n.push(0)),
        n
      );
    }
    function zi(t, n) {
      return Pi(n).map(function (n) {
        return t[n];
      });
    }
    function Gi(t, n) {
      var e = zi(t, n);
      return [
        Vt(
          e.map(function (t) {
            return t[0];
          })
        ),
        Vt(
          e.map(function (t) {
            return t[1];
          })
        ),
      ];
    }
    function Bi(t, n, e, r) {
      return Zn(t, xr(n, r, e), r);
    }
    function Ti(t, n, e) {
      var r = t.transformOrigin,
        i = t.offsetMatrix,
        o = t.is3d,
        a = n.beforeTransform,
        s = n.afterTransform,
        u = o ? 4 : 3;
      return Bi(
        i,
        Hn(
          Zn(
            Zn(
              a,
              (function (t) {
                return de(he(t));
              })([e]),
              4
            ),
            s,
            4
          ),
          4,
          u
        ),
        r,
        u
      );
    }
    function _i(t) {
      var n = t.originalDatas.beforeRenderable;
      return {
        setTransform: function (e, r) {
          void 0 === r && (r = -1),
            (n.startTransforms = Ot(e) ? e : Tt(e)),
            Ai(t, r);
        },
        setTransformIndex: function (n) {
          Ai(t, n);
        },
      };
    }
    function ki(t) {
      Ai(t, -1);
    }
    function Ai(t, n) {
      var e = t.originalDatas.beforeRenderable,
        r = t.datas;
      if (((r.transformIndex = n), -1 !== n)) {
        var i = e.startTransforms[n];
        if (i) {
          var o = he([i]);
          r.startValue = o[0].functionValue;
        }
      }
    }
    function Ii(t, n) {
      t.originalDatas.beforeRenderable.nextTransforms = Tt(n);
    }
    function ji(t, n, e, r, i) {
      return (
        Ii(i, n), { transform: n, drag: Lo.drag(t, gi(i, t.state, e, r, !1)) }
      );
    }
    function Ni(t, n, e, r, i) {
      var o = t.state,
        a = o.left,
        s = o.top,
        u = t.props.groupable,
        l = u ? a : 0,
        c = u ? s : 0,
        f = Jn(r, Yi(t, e, Ti(t.state, i, n)));
      return Jn(f, [l, c]);
    }
    function Fi(t) {
      var n = t.state,
        e = n.width,
        r = n.height,
        i = n.transformOrigin;
      return [i[0] / (e / 2) - 1, i[1] / (r / 2) - 1];
    }
    function Yi(t, n, e) {
      void 0 === e && (e = t.state.allMatrix);
      var r = t.state,
        i = r.width,
        o = r.height,
        a = r.is3d ? 4 : 3;
      return Gr(e, [(i / 2) * (1 + n[0]), (o / 2) * (1 + n[1])], a);
    }
    function Xi(t, n, e, r, i, o) {
      var a = t.props.groupable,
        s = t.state,
        u = s.transformOrigin,
        l = s.targetMatrix,
        c = s.offsetMatrix,
        f = s.is3d,
        p = s.width,
        d = s.height,
        h = s.left,
        v = s.top,
        g = f ? 4 : 3,
        m = a ? h : 0,
        b = a ? v : 0;
      return Jn(
        (function (t, n, e, r, i, o) {
          var a = Gi(Br(n, e, r, i), o);
          return [t[0] - a[0], t[1] - a[1]];
        })(
          i,
          Bi(
            c,
            l,
            (function (t, n, e, r, i, o) {
              return (
                void 0 === r && (r = n),
                void 0 === i && (i = e),
                void 0 === o && (o = [0, 0]),
                t
                  ? t.map(function (t, a) {
                      var s = At(t),
                        u = s.value,
                        l = s.unit,
                        c = a ? i : r,
                        f = a ? e : n;
                      return "%" === t || isNaN(u)
                        ? f * (c ? o[a] / c : 0)
                        : "%" !== l
                        ? u
                        : (f * u) / 100;
                    })
                  : o
              );
            })(o, n, e, p, d, u),
            g
          ),
          n,
          e,
          g,
          r
        ),
        [m, b]
      );
    }
    function $i(t, n) {
      return Gi(Vr(t.state), n);
    }
    function qi(t, n, e) {
      var r = Gr(t, [n.clientLeft, n.clientTop], e);
      return [n.left + r[0], n.top + r[1]];
    }
    function Li(t, n, e, r, i, o) {
      var a = i[0],
        s = i[1],
        u = o[0],
        l = o[1],
        c = [],
        f = r ? 0 : 1,
        p = "vertical" === n ? "horizontal" : "vertical",
        d = ei(
          t.filter(function (t) {
            return t.type === n;
          }),
          function (t) {
            return t.element;
          }
        )
          .map(function (t) {
            return t[0];
          })
          .filter(function (t) {
            var n = t.pos,
              e = t.sizes;
            return n[f] <= l && u <= n[f] + e[f];
          });
      return (
        d.forEach(function (t) {
          var n = t.pos[r],
            i = n + t.sizes[r];
          d.forEach(function (t) {
            var o = t.pos,
              u = t.sizes,
              l = t.element,
              f = t.className,
              h = o[r],
              v = h + u[r],
              g = 0,
              m = 0,
              b = !0;
            if (i <= h) a < (g = v - (m = i - h)) - e && (b = !1);
            else {
              if (!(v <= n)) return;
              s > (g = h - (m = n - v)) + e && (b = !1);
            }
            if (
              (b &&
                c.push({
                  pos: "vertical" === p ? [g, o[1]] : [o[0], g],
                  element: l,
                  sizes: u,
                  size: 0,
                  type: p,
                  gap: m,
                  className: f,
                  gapGuidelines: d,
                }),
              i <= a && s <= h)
            ) {
              var x = (h + i - (s - a)) / 2;
              Wr(a - (x - e), 0.1) >= 0 &&
                c.push({
                  pos: "vertical" === p ? [x, o[1]] : [o[0], x],
                  className: f,
                  element: l,
                  sizes: u,
                  size: 0,
                  type: p,
                  gap: i - a,
                  gapGuidelines: d,
                });
            }
          });
        }),
        c
      );
    }
    function Vi(t, n, e, r, i, o, a) {
      return (
        void 0 === o && (o = 0),
        void 0 === a && (a = 0),
        r &&
          r.forEach(function (e) {
            t.push({ type: "horizontal", pos: [0, Wr(e - a, 0.1)], size: n });
          }),
        i &&
          i.forEach(function (n) {
            t.push({ type: "vertical", pos: [Wr(n - o, 0.1), 0], size: e });
          }),
        t
      );
    }
    function Wi(t, n) {
      var e = [];
      if (!n.length) return e;
      var r = t.state,
        i = t.props.snapCenter,
        o = r.containerClientRect,
        a = r.targetClientRect,
        s = a.top,
        u = a.left,
        l = r.rootMatrix,
        c = r.is3d ? 4 : 3,
        f = qi(l, o, c),
        p = f[0],
        d = f[1],
        h = me(Vr(r)),
        v = Jn([h.minX, h.minY], oi(l, [u - p, s - d], c)).map(function (t) {
          return (n = t), Math.round(n % 1 == -0.5 ? n - 1 : n);
          var n;
        }),
        g = v[0],
        m = v[1];
      return (
        n.forEach(function (t) {
          var n = t.element,
            r = t.top,
            o = t.left,
            a = t.right,
            s = t.bottom,
            u = t.className,
            f = n.getBoundingClientRect(),
            h = f.left - p,
            v = f.top - d,
            b = v + f.height,
            x = h + f.width,
            y = oi(l, [h, v], c),
            E = y[0],
            S = y[1],
            w = oi(l, [x, b], c),
            M = w[0],
            C = w[1],
            D = M - E,
            R = C - S,
            O = [D, R];
          !1 !== r &&
            e.push({
              type: "vertical",
              element: n,
              pos: [Wr(E + g, 0.1), S],
              size: R,
              sizes: O,
              className: u,
            }),
            !1 !== s &&
              e.push({
                type: "vertical",
                element: n,
                pos: [Wr(M + g, 0.1), S],
                size: R,
                sizes: O,
                className: u,
              }),
            !1 !== o &&
              e.push({
                type: "horizontal",
                element: n,
                pos: [E, Wr(S + m, 0.1)],
                size: D,
                sizes: O,
                className: u,
              }),
            !1 !== a &&
              e.push({
                type: "horizontal",
                element: n,
                pos: [E, Wr(C + m, 0.1)],
                size: D,
                sizes: O,
                className: u,
              }),
            i &&
              (e.push({
                type: "vertical",
                element: n,
                pos: [Wr((E + M) / 2 + g, 0.1), S],
                size: R,
                sizes: O,
                center: !0,
                className: u,
              }),
              e.push({
                type: "horizontal",
                element: n,
                pos: [E, Wr((S + C) / 2 + m, 0.1)],
                size: D,
                sizes: O,
                center: !0,
                className: u,
              }));
        }),
        e
      );
    }
    function Hi(t, n, e) {
      void 0 === e && (e = []);
      var r = [],
        i = t.state;
      if (n && i.guidelines && i.guidelines.length) return r;
      var o = t.props.elementGuidelines,
        a = void 0 === o ? [] : o;
      if (!a.length) return r;
      var s = i.elementGuidelineValues || [],
        u = a.map(function (t) {
          return "parentElement" in t ? { element: t } : t;
        });
      i.elementGuidelineValues = u;
      var l,
        c,
        f =
          ((l = s.map(function (t) {
            return t.element;
          })),
          (c = u.map(function (t) {
            return t.element;
          })),
          Et(l, c, De)),
        p = f.added,
        d = f.removed.map(function (t) {
          return s[t].element;
        }),
        h = Wi(
          t,
          p
            .map(function (t) {
              return u[t];
            })
            .filter(function (t) {
              return (t.refresh && n) || (!t.refresh && !n);
            })
        );
      return nr(
        e.filter(function (t) {
          return -1 === d.indexOf(t.element);
        }),
        h
      );
    }
    function Ui(t) {
      var n = t.state,
        e = n.staticGuidelines,
        r = n.containerClientRect,
        i = r.scrollHeight,
        o = r.scrollWidth,
        a = r.clientHeight,
        s = r.clientWidth,
        u = r.overflow,
        l = r.clientLeft,
        c = r.clientTop,
        f = t.props,
        p = f.snapHorizontal,
        d = void 0 === p || p,
        h = f.snapVertical,
        v = void 0 === h || h,
        g = f.snapGap,
        m = void 0 === g || g,
        b = f.verticalGuidelines,
        x = f.horizontalGuidelines,
        y = f.snapThreshold,
        E = void 0 === y ? 5 : y,
        S = nr(e, Hi(t, !0));
      if (m) {
        var w = Tr(Vr(t.state)),
          M = w.top,
          C = w.left,
          D = w.bottom,
          R = w.right,
          O = e.filter(function (t) {
            return t.element;
          });
        S.push.apply(
          S,
          nr(
            Li(O, "horizontal", E, 0, [C, R], [M, D]),
            Li(O, "vertical", E, 1, [M, D], [C, R])
          )
        );
      }
      return Vi(S, u ? o : s, u ? i : a, d && x, v && b, l, c), S;
    }
    function Zi(t, n, e, r, i) {
      var o = t.props,
        a = o.snapElement,
        s = void 0 === a || a,
        u = (function () {
          for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
          for (var e = t.length - 1, r = 0; r < e; ++r) {
            var i = t[r];
            if (!Dt(i)) return i;
          }
          return t[e];
        })(i, o.snapThreshold, 5);
      return Ki(t.state.guidelines, n, e, {
        snapThreshold: u,
        snapCenter: r,
        snapElement: s,
      });
    }
    function Ki(t, n, e, r) {
      return {
        vertical: to(t, "vertical", n, r),
        horizontal: to(t, "horizontal", e, r),
      };
    }
    function Ji(t, n, e, r) {
      var i = t.props.snapCenter && e,
        o = ["left", "right"],
        a = ["top", "bottom"];
      return (
        i && (o.push("center"), a.push("middle")),
        (o = o.filter(function (t) {
          return t in n;
        })),
        (a = a.filter(function (t) {
          return t in n;
        })),
        Zi(
          t,
          o.map(function (t) {
            return n[t];
          }),
          a.map(function (t) {
            return n[t];
          }),
          i,
          r
        )
      );
    }
    function Qi(t) {
      var n = t.isSnap;
      if (!n) return { isSnap: !1, offset: 0, dist: -1, pos: 0, guideline: null };
      var e = t.posInfos[0],
        r = e.guidelineInfos[0],
        i = r.offset,
        o = r.dist,
        a = r.guideline;
      return { isSnap: n, offset: i, dist: o, pos: e.pos, guideline: a };
    }
    function to(t, n, e, r) {
      var i = void 0 === r ? {} : r,
        o = i.snapThreshold,
        a = void 0 === o ? 5 : o,
        s = i.snapElement,
        u = i.snapCenter;
      if (!t || !t.length) return { isSnap: !1, index: -1, posInfos: [] };
      var l = "vertical" === n ? 0 : 1,
        c = e
          .map(function (e, r) {
            var i = t
              .map(function (t) {
                var n = t.pos,
                  r = e - n[l];
                return { offset: r, dist: Math.abs(r), guideline: t };
              })
              .filter(function (t) {
                var e = t.guideline,
                  r = t.dist,
                  i = e.type,
                  o = e.center,
                  l = e.element;
                return !((!s && l) || (!u && o) || i !== n || r > a);
              })
              .sort(function (t, n) {
                return t.dist - n.dist;
              });
            return { pos: e, index: r, guidelineInfos: i };
          })
          .filter(function (t) {
            return t.guidelineInfos.length > 0;
          })
          .sort(function (t, n) {
            return t.guidelineInfos[0].dist - n.guidelineInfos[0].dist;
          }),
        f = c.length > 0;
      return { isSnap: f, index: f ? c[0].index : -1, posInfos: c };
    }
    function no(t, n) {
      var e = Math.abs(t.offset),
        r = Math.abs(n.offset);
      return t.isBound && n.isBound
        ? r - e
        : t.isBound
        ? -1
        : n.isBound
        ? 1
        : t.isSnap && n.isSnap
        ? r - e
        : t.isSnap
        ? -1
        : n.isSnap || e < cr
        ? 1
        : r < cr
        ? -1
        : e - r;
    }
    function eo(t, n) {
      return t.slice().sort(function (t, e) {
        var r = t.sign[n],
          i = e.sign[n],
          o = t.offset[n],
          a = e.offset[n];
        return r
          ? i
            ? no(
                { isBound: t.isBound, isSnap: t.isSnap, offset: o },
                { isBound: e.isBound, isSnap: e.isSnap, offset: a }
              )
            : -1
          : 1;
      })[0];
    }
    function ro(t, n) {
      var e = Vt([n[0][0], n[1][0]]),
        r = Vt([n[0][1], n[1][1]]);
      return { vertical: e <= t[0], horizontal: r <= t[1] };
    }
    function io(t, n) {
      var e,
        r,
        i = n[0],
        o = n[1],
        a = o[0] - i[0],
        s = o[1] - i[1];
      if ((Math.abs(a) < cr && (a = 0), Math.abs(s) < cr && (s = 0), a))
        if (s) {
          (e = (s / a) * (t[0] - i[0]) + i[1]), (r = t[1]);
        } else (e = i[1]), (r = t[1]);
      else (e = i[0]), (r = t[0]);
      return e - r;
    }
    function oo(t, n, e) {
      void 0 === e && (e = cr);
      var r = io(t[0], n) <= 0;
      return t.slice(1).every(function (t) {
        var i = io(t, n);
        return i <= 0 === r || Math.abs(i) <= e;
      });
    }
    function ao(t, n, e, r, i) {
      return (
        void 0 === i && (i = 0),
        (r && n - i <= t) || (!r && t <= e + i)
          ? { isBound: !0, offset: r ? n - t : e - t }
          : { isBound: !1, offset: 0 }
      );
    }
    function so(t, n, e, r, i) {
      var o = t[0],
        a = t[1],
        s = n[0],
        u = n[1],
        l = li(a[1] - o[1]),
        c = li(a[0] - o[0]),
        f = li(u[1] - s[1]);
      if (!li(u[0] - s[0])) {
        if (i && !l) return { isBound: !1, offset: 0 };
        if (c) return ao((l / c) * (s[0] - o[0]) + o[1], s[1], u[1], e, r);
        var p = s[0] - o[0];
        return { isBound: (d = Math.abs(p) <= (r || 0)), offset: d ? p : 0 };
      }
      if (!f) {
        if (i && !c) return { isBound: !1, offset: 0 };
        if (l) return ao((s[1] - o[1]) / (l / c) + o[0], s[0], u[0], e, r);
        var d;
        p = s[1] - o[1];
        return { isBound: (d = Math.abs(p) <= (r || 0)), offset: d ? p : 0 };
      }
      return { isBound: !1, offset: 0 };
    }
    function uo(t, n, e, r) {
      return n.map(function (n) {
        var i = n[0],
          o = n[1],
          a = n[2],
          s = (function (t, n, e) {
            var r = t.props.innerBounds;
            if (!r)
              return {
                isAllBound: !1,
                isBound: !1,
                isVerticalBound: !1,
                isHorizontalBound: !1,
                offset: [0, 0],
              };
            var i = r.left,
              o = r.top,
              a = r.width,
              s = r.height,
              u = [
                [i, o],
                [i, o + s],
              ],
              l = [
                [i, o],
                [i + a, o],
              ],
              c = [
                [i + a, o],
                [i + a, o + s],
              ],
              f = [
                [i, o + s],
                [i + a, o + s],
              ],
              p = ro(e, n),
              d = p.horizontal,
              h = p.vertical;
            if (oo([e, [i, o], [i + a, o], [i, o + s], [i + a, o + s]], n))
              return {
                isAllBound: !1,
                isBound: !1,
                isVerticalBound: !1,
                isHorizontalBound: !1,
                offset: [0, 0],
              };
            var v = so(n, l, h),
              g = so(n, f, h),
              m = so(n, u, d),
              b = so(n, c, d),
              x = v.isBound && g.isBound,
              y = v.isBound || g.isBound,
              E = m.isBound && b.isBound,
              S = m.isBound || b.isBound,
              w = ii(v.offset, g.offset),
              M = ii(m.offset, b.offset),
              C = [0, 0],
              D = !1,
              R = !1;
            return (
              Math.abs(M) < Math.abs(w)
                ? ((C = [w, 0]), (D = y), (R = x))
                : ((C = [0, M]), (D = S), (R = E)),
              {
                isAllBound: R,
                isVerticalBound: y,
                isHorizontalBound: S,
                isBound: D,
                offset: C,
              }
            );
          })(t, [o, a], e),
          u = s.isBound,
          l = s.offset,
          c = s.isVerticalBound,
          f = s.isHorizontalBound,
          p = Oi({ datas: r, distX: l[0], distY: l[1] }).map(function (t, n) {
            return t * (i[n] ? 2 / i[n] : 0);
          });
        return {
          sign: i,
          isBound: u,
          isVerticalBound: c,
          isHorizontalBound: f,
          isSnap: !1,
          offset: p,
        };
      });
    }
    function lo(t, n, e) {
      var r,
        i = uo(
          t,
          co(n, [0, 0], !1).map(function (t) {
            var n = t[0],
              e = t[1],
              r = t[2];
            return [
              n.map(function (t) {
                return 2 * Math.abs(t);
              }),
              e,
              r,
            ];
          }),
          Gi(n, [0, 0]),
          e
        ),
        o = eo(i, 0),
        a = eo(i, 1),
        s = 0,
        u = 0,
        l = o.isVerticalBound || a.isVerticalBound,
        c = o.isHorizontalBound || a.isHorizontalBound;
      return (
        (l || c) &&
          ((s = (r = (function (t, n) {
            var e = t.datas,
              r = t.distX,
              i = t.distY,
              o = e.beforeMatrix,
              a = e.matrix,
              s = e.is3d,
              u = e.startDragBeforeDist,
              l = e.startDragDist,
              c = e.absoluteOrigin,
              f = s ? 4 : 3;
            return Jn(te(n ? o : a, Kn(n ? u : l, [r, i]), f), c);
          })({ datas: e, distX: -o.offset[0], distY: -a.offset[1] }))[0]),
          (u = r[1])),
        {
          vertical: { isBound: l, offset: s },
          horizontal: { isBound: c, offset: u },
        }
      );
    }
    function co(t, n, e) {
      return (function (t, n) {
        var e = [],
          r = t[0],
          i = t[1];
        return (
          r && i
            ? e.push([[0, 2 * i], t, [-r, i]], [[2 * r, 0], t, [r, -i]])
            : r
            ? (e.push([
                [2 * r, 0],
                [r, 1],
                [r, -1],
              ]),
              n &&
                e.push(
                  [
                    [0, -1],
                    [r, -1],
                    [-r, -1],
                  ],
                  [
                    [0, 1],
                    [r, 1],
                    [-r, 1],
                  ]
                ))
            : i
            ? (e.push([
                [0, 2 * i],
                [1, i],
                [-1, i],
              ]),
              n &&
                e.push(
                  [
                    [-1, 0],
                    [-1, i],
                    [-1, -i],
                  ],
                  [
                    [1, 0],
                    [1, i],
                    [1, -i],
                  ]
                ))
            : e.push(
                [
                  [-1, 0],
                  [-1, -1],
                  [-1, 1],
                ],
                [
                  [1, 0],
                  [1, -1],
                  [1, 1],
                ],
                [
                  [0, -1],
                  [-1, -1],
                  [1, -1],
                ],
                [
                  [0, 1],
                  [-1, 1],
                  [1, 1],
                ]
              ),
          e
        );
      })(n, e).map(function (n) {
        var e = n[0],
          r = n[1],
          i = n[2];
        return [e, Gi(t, r), Gi(t, i)];
      });
    }
    function fo(t, n, e, r) {
      var i = r
          ? t.map(function (t) {
              return oe(t, r);
            })
          : t,
        o = nr([e], n);
      return [
        [i[0], i[1]],
        [i[1], i[3]],
        [i[3], i[2]],
        [i[2], i[0]],
      ].some(function (t) {
        return !oo(o, t);
      });
    }
    function po(t, n, e, r, i) {
      var o = t.props.innerBounds,
        a = (i * Math.PI) / 180;
      if (!o) return [];
      var s = o.left,
        u = o.top,
        l = o.width,
        c = o.height,
        f = s - r[0],
        p = s + l - r[0],
        d = u - r[1],
        h = u + c - r[1],
        v = [
          [f, d],
          [p, d],
          [f, h],
          [p, h],
        ],
        g = Gi(e, [0, 0]);
      if (!fo(e, v, g, 0)) return [];
      var m = [],
        b = v.map(function (t) {
          return [Ar(t), Wt([0, 0], t)];
        });
      return (
        [
          [e[0], e[1]],
          [e[1], e[3]],
          [e[3], e[2]],
          [e[2], e[0]],
        ].forEach(function (t) {
          var e = Wt(
              [0, 0],
              (function (t) {
                var n = t[0],
                  e = t[1],
                  r = e[0] - n[0],
                  i = e[1] - n[1];
                if (!r) return [n[0], 0];
                if (!i) return [0, n[1]];
                var o = i / r,
                  a = -o * n[0] + n[1];
                return [-a / (o + 1 / o), a / (o * o + 1)];
              })(t)
            ),
            r = (function (t) {
              var n = t[0],
                e = t[1],
                r = e[0] - n[0],
                i = e[1] - n[1];
              if (!r) return Math.abs(n[0]);
              if (!i) return Math.abs(n[1]);
              var o = i / r;
              return Math.abs((-o * n[0] + n[1]) / Math.sqrt(Math.pow(o, 2) + 1));
            })(t);
          m.push.apply(
            m,
            b
              .filter(function (t) {
                var n = t[0];
                return n && r <= n;
              })
              .map(function (t) {
                var n = t[0],
                  i = t[1],
                  o = Math.acos(n ? r / n : 0);
                return [a + (i + o) - e, a + (i - o) - e];
              })
              .reduce(function (t, n) {
                return t.push.apply(t, n), t;
              }, [])
              .filter(function (t) {
                return !fo(n, v, g, t);
              })
              .map(function (t) {
                return Wr((180 * t) / Math.PI, cr);
              })
          );
        }),
        m
      );
    }
    function ho(t, n, e) {
      var r = t || {},
        i = r.left,
        o = void 0 === i ? -1 / 0 : i,
        a = r.top,
        s = void 0 === a ? -1 / 0 : a,
        u = r.right,
        l = void 0 === u ? 1 / 0 : u,
        c = r.bottom,
        f = { left: o, top: s, right: l, bottom: void 0 === c ? 1 / 0 : c };
      return { vertical: vo(f, n, !0), horizontal: vo(f, e, !1) };
    }
    function vo(t, n, e) {
      var r = t[e ? "left" : "top"],
        i = t[e ? "right" : "bottom"],
        o = Math.min.apply(Math, n),
        a = Math.max.apply(Math, n),
        s = [];
      return (
        r + 1 > o && s.push({ isBound: !0, offset: o - r, pos: r }),
        i - 1 < a && s.push({ isBound: !0, offset: a - i, pos: i }),
        s.length || s.push({ isBound: !1, offset: 0, pos: 0 }),
        s.sort(function (t, n) {
          return Math.abs(n.offset) - Math.abs(t.offset);
        })
      );
    }
    function go(t, n, e) {
      return (e
        ? t.map(function (t) {
            return oe(t, e);
          })
        : t
      ).some(function (t) {
        return (
          (t[0] < n.left && Math.abs(t[0] - n.left) > 0.1) ||
          (t[0] > n.right && Math.abs(t[0] - n.right) > 0.1) ||
          (t[1] < n.top && Math.abs(t[1] - n.top) > 0.1) ||
          (t[1] > n.bottom && Math.abs(t[1] - n.bottom) > 0.1)
        );
      });
    }
    function mo(t, n, e, r, i) {
      var o = t.props.bounds,
        a = (i * Math.PI) / 180;
      if (!o) return [];
      var s = o.left,
        u = void 0 === s ? -1 / 0 : s,
        l = o.top,
        c = void 0 === l ? -1 / 0 : l,
        f = o.right,
        p = void 0 === f ? 1 / 0 : f,
        d = o.bottom,
        h = void 0 === d ? 1 / 0 : d,
        v = u - r[0],
        g = p - r[0],
        m = c - r[1],
        b = h - r[1],
        x = { left: v, top: m, right: g, bottom: b };
      if (!go(e, x, 0)) return [];
      var y = [];
      return (
        [
          [v, 0],
          [g, 0],
          [m, 1],
          [b, 1],
        ].forEach(function (t) {
          var r = t[0],
            i = t[1];
          e.forEach(function (t) {
            var e = Wt([0, 0], t);
            y.push.apply(
              y,
              (function (t, n, e) {
                var r = Ar(t),
                  i = Math.sqrt(r * r - n * n) || 0;
                return [i, -i]
                  .sort(function (n, r) {
                    return (
                      Math.abs(n - t[e ? 0 : 1]) - Math.abs(r - t[e ? 0 : 1])
                    );
                  })
                  .map(function (t) {
                    return Wt([0, 0], e ? [t, n] : [n, t]);
                  });
              })(t, r, i)
                .map(function (t) {
                  return a + t - e;
                })
                .filter(function (t) {
                  return !go(n, x, t);
                })
                .map(function (t) {
                  return Wr((180 * t) / Math.PI, cr);
                })
            );
          });
        }),
        y
      );
    }
    var bo = {
      horizontal: ["left", "top", "width", "Y", "X"],
      vertical: ["top", "left", "height", "X", "Y"],
    };
    function xo(t) {
      var n = t.state;
      (n.guidelines && n.guidelines.length) ||
        ((n.elementGuidelineValues = []),
        (n.staticGuidelines = Hi(t, !1)),
        (n.guidelines = Ui(t)),
        (n.enableSnap = !0));
    }
    function yo(t, n) {
      var e = t.props,
        r = e.snappable,
        i = e.bounds,
        o = e.innerBounds,
        a = e.verticalGuidelines,
        s = e.horizontalGuidelines,
        u = t.state,
        l = u.guidelines,
        c = u.enableSnap;
      return (
        !(!r || !c || (n && !0 !== r && r.indexOf(n) < 0)) &&
        !!(i || o || (l && l.length) || (a && a.length) || (s && s.length))
      );
    }
    function Eo(t, n, e, r, i) {
      var o = (function (t, n, e, r) {
        var i = n[0] - t[0],
          o = n[1] - t[1];
        Math.abs(i) < cr && (i = 0);
        Math.abs(o) < cr && (o = 0);
        if (!i) return r ? [0, 0] : [0, e];
        if (!o) return r ? [e, 0] : [0, 0];
        var a = o / i,
          s = t[1] - a * t[0];
        return r
          ? [e, a * (n[0] + e) + s - n[1]]
          : [(n[1] + e - s) / a - n[0], e];
      })(t, n, e, r);
      if (!o) return [0, 0];
      var a = Oi({ datas: i, distX: o[0], distY: o[1] });
      return [a[0], a[1]];
    }
    function So(t, n, e, r, i, o) {
      var a = Br(t, n, e, o ? 4 : 3);
      return Lr(
        a,
        Jn(
          r,
          (function (t, n) {
            return Gi(
              t,
              n.map(function (t) {
                return -t;
              })
            );
          })(a, i)
        )
      );
    }
    function wo(t, n) {
      return t.isBound ? t.offset : n.isSnap ? n.offset : 0;
    }
    function Mo(t, n) {
      return t.isBound ? t.offset : n.isSnap ? Qi(n).offset : 0;
    }
    function Co(t, n, e, r) {
      var i = (function (t, n, e) {
          var r = t.props.bounds || {},
            i = r.left,
            o = void 0 === i ? -1 / 0 : i,
            a = r.top,
            s = void 0 === a ? -1 / 0 : a,
            u = r.right,
            l = void 0 === u ? 1 / 0 : u,
            c = r.bottom,
            f = void 0 === c ? 1 / 0 : c,
            p = e[0],
            d = e[1],
            h = Jn(e, n),
            v = h[0],
            g = h[1];
          Math.abs(v) < cr && (v = 0), Math.abs(g) < cr && (g = 0);
          var m = g > 0,
            b = v > 0,
            x = { isBound: !1, offset: 0, pos: 0 },
            y = { isBound: !1, offset: 0, pos: 0 };
          if (0 === v && 0 === g) return { vertical: x, horizontal: y };
          if (0 === v)
            m
              ? f < d && ((y.pos = f), (y.offset = d - f))
              : s > d && ((y.pos = s), (y.offset = d - s));
          else if (0 === g)
            b
              ? l < p && ((x.pos = l), (x.offset = p - l))
              : o > p && ((x.pos = o), (x.offset = p - o));
          else {
            var E = g / v,
              S = e[1] - E * p,
              w = 0,
              M = 0,
              C = !1;
            b && l <= p
              ? ((w = E * l + S), (M = l), (C = !0))
              : !b && p <= o && ((w = E * o + S), (M = o), (C = !0)),
              C && (w < s || w > f) && (C = !1),
              C ||
                (m && f <= d
                  ? ((M = ((w = f) - S) / E), (C = !0))
                  : !m && d <= s && ((M = ((w = s) - S) / E), (C = !0))),
              C &&
                ((x.isBound = !0),
                (x.pos = M),
                (x.offset = p - M),
                (y.isBound = !0),
                (y.pos = w),
                (y.offset = d - w));
          }
          return { vertical: x, horizontal: y };
        })(t, n, e),
        o = i.horizontal,
        a = i.vertical,
        s = r
          ? { horizontal: { isSnap: !1 }, vertical: { isSnap: !1 } }
          : (function (t, n, e) {
              var r = e[0],
                i = e[1],
                o = n[0],
                a = n[1],
                s = Jn(e, n),
                u = s[0],
                l = s[1],
                c = l > 0,
                f = u > 0;
              (u = li(u)), (l = li(l));
              var p = { isSnap: !1, offset: 0, pos: 0 },
                d = { isSnap: !1, offset: 0, pos: 0 };
              if (0 === u && 0 === l) return { vertical: p, horizontal: d };
              var h = Zi(t, u ? [r] : [], l ? [i] : []),
                v = h.vertical,
                g = h.horizontal;
              v.posInfos.filter(function (t) {
                var n = t.pos;
                return f ? n >= o : n <= o;
              }),
                g.posInfos.filter(function (t) {
                  var n = t.pos;
                  return c ? n >= a : n <= a;
                }),
                (v.isSnap = v.posInfos.length > 0),
                (g.isSnap = g.posInfos.length > 0);
              var m = Qi(v),
                b = m.isSnap,
                x = m.guideline,
                y = Qi(g),
                E = y.isSnap,
                S = y.guideline,
                w = E ? S.pos[1] : 0,
                M = b ? x.pos[0] : 0;
              if (0 === u)
                E &&
                  ((d.isSnap = !0), (d.pos = S.pos[1]), (d.offset = i - d.pos));
              else if (0 === l)
                b && ((p.isSnap = !0), (p.pos = M), (p.offset = r - M));
              else {
                var C = l / u,
                  D = e[1] - C * r,
                  R = 0,
                  O = 0,
                  P = !1;
                b
                  ? ((R = C * (O = M) + D), (P = !0))
                  : E && ((O = ((R = w) - D) / C), (P = !0)),
                  P &&
                    ((p.isSnap = !0),
                    (p.pos = O),
                    (p.offset = r - O),
                    (d.isSnap = !0),
                    (d.pos = R),
                    (d.offset = i - R));
              }
              return { vertical: p, horizontal: d };
            })(t, n, e),
        u = s.horizontal,
        l = s.vertical,
        c = wo(o, u),
        f = wo(a, l),
        p = Math.abs(c),
        d = Math.abs(f);
      return {
        horizontal: { isBound: o.isBound, isSnap: u.isSnap, offset: c, dist: p },
        vertical: { isBound: a.isBound, isSnap: l.isSnap, offset: f, dist: d },
      };
    }
    function Do(t, n, e, r) {
      void 0 === r && (r = e);
      var i = ho(
          t.props.bounds,
          r.map(function (t) {
            return t[0];
          }),
          r.map(function (t) {
            return t[1];
          })
        ),
        o = i.horizontal,
        a = i.vertical,
        s = n
          ? {
              horizontal: { isSnap: !1, index: -1 },
              vertical: { isSnap: !1, index: -1 },
            }
          : Zi(
              t,
              e.map(function (t) {
                return t[0];
              }),
              e.map(function (t) {
                return t[1];
              }),
              t.props.snapCenter
            ),
        u = s.horizontal,
        l = s.vertical,
        c = Mo(o[0], u),
        f = Mo(a[0], l),
        p = Math.abs(c),
        d = Math.abs(f);
      return {
        horizontal: {
          isBound: o[0].isBound,
          isSnap: u.isSnap,
          snapIndex: u.index,
          offset: c,
          dist: p,
          bounds: o,
          snap: u,
        },
        vertical: {
          isBound: a[0].isBound,
          isSnap: l.isSnap,
          snapIndex: l.index,
          offset: f,
          dist: d,
          bounds: a,
          snap: l,
        },
      };
    }
    function Ro(t, n, e, r, i) {
      void 0 === i && (i = {});
      var o = ho(n, e, r),
        a = o.horizontal,
        s = o.vertical,
        u = i.isRequest
          ? {
              horizontal: { isSnap: !1, index: -1 },
              vertical: { isSnap: !1, index: -1 },
            }
          : Ki(t, e, r, i),
        l = u.horizontal,
        c = u.vertical,
        f = Mo(a[0], l),
        p = Mo(s[0], c),
        d = Math.abs(f),
        h = Math.abs(p);
      return {
        horizontal: {
          isBound: a[0].isBound,
          isSnap: l.isSnap,
          snapIndex: l.index,
          offset: f,
          dist: d,
          bounds: a,
          snap: l,
        },
        vertical: {
          isBound: s[0].isBound,
          isSnap: c.isSnap,
          snapIndex: c.index,
          offset: p,
          dist: h,
          bounds: s,
          snap: c,
        },
      };
    }
    function Oo(t) {
      return t ? t / Math.abs(t) : 0;
    }
    function Po(t, n, e, r, i, o) {
      return e.map(function (e) {
        var a = e[0],
          s = e[1],
          u = Gi(n, a),
          l = Gi(n, s),
          c = r ? Co(t, u, l, i) : Do(t, i, [l]),
          f = c.horizontal,
          p = f.offset,
          d = f.isBound,
          h = f.isSnap,
          v = c.vertical,
          g = v.offset,
          m = v.isBound,
          b = v.isSnap,
          x = Jn(s, a);
        if (!g && !p)
          return { isBound: m || d, isSnap: b || h, sign: x, offset: [0, 0] };
        var y = (function (t, n, e, r) {
          var i = (Wt(t, n) / Math.PI) * 180,
            o = e.vertical,
            a = o.isBound,
            s = o.isSnap,
            u = o.dist,
            l = e.horizontal,
            c = l.isBound,
            f = l.isSnap,
            p = i % 180,
            d = p < 3 || p > 177,
            h = p > 87 && p < 93;
          return l.dist < u && (a || (s && !h && (!r || !d)))
            ? "vertical"
            : !c && (!f || d || (r && h))
            ? ""
            : "horizontal";
        })(u, l, c, r);
        if (!y) return { sign: x, isBound: !1, isSnap: !1, offset: [0, 0] };
        var E = "vertical" === y,
          S = Eo(u, l, -(E ? g : p), E, o).map(function (t, n) {
            return t * (x[n] ? 2 / x[n] : 0);
          });
        return { sign: x, isBound: E ? m : d, isSnap: E ? b : h, offset: S };
      });
    }
    function zo(t, n, e, r, i, o) {
      var a = (function (t, n) {
          var e = [],
            r = [-t[0], -t[1]];
          return (
            t[0] && t[1]
              ? (e.push([r, [t[0], -t[1]]], [r, [-t[0], t[1]]]),
                n && e.push([r, t]))
              : t[0]
              ? n
                ? e.push(
                    [r, [r[0], -1]],
                    [r, [r[0], 1]],
                    [r, [t[0], -1]],
                    [r, t],
                    [r, [t[0], 1]]
                  )
                : e.push(
                    [
                      [r[0], -1],
                      [t[0], -1],
                    ],
                    [
                      [r[0], 0],
                      [t[0], 0],
                    ],
                    [
                      [r[0], 1],
                      [t[0], 1],
                    ]
                  )
              : t[1]
              ? n
                ? e.push(
                    [r, [-1, r[1]]],
                    [r, [1, r[1]]],
                    [r, [-1, t[1]]],
                    [r, [1, t[1]]],
                    [r, t]
                  )
                : e.push(
                    [
                      [-1, r[1]],
                      [-1, t[1]],
                    ],
                    [
                      [0, r[1]],
                      [0, t[1]],
                    ],
                    [
                      [1, r[1]],
                      [1, t[1]],
                    ]
                  )
              : e.push(
                  [r, [1, 0]],
                  [r, [-1, 0]],
                  [r, [0, -1]],
                  [r, [0, 1]],
                  [
                    [1, 0],
                    [1, -1],
                  ],
                  [
                    [1, 0],
                    [1, 1],
                  ],
                  [
                    [0, 1],
                    [1, 1],
                  ],
                  [
                    [0, 1],
                    [-1, 1],
                  ],
                  [
                    [-1, 0],
                    [-1, -1],
                  ],
                  [
                    [-1, 0],
                    [-1, 1],
                  ],
                  [
                    [0, -1],
                    [1, -1],
                  ],
                  [
                    [0, -1],
                    [-1, -1],
                  ]
                ),
            e
          );
        })(e, r),
        s = co(n, e, r),
        u = nr(Po(t, n, a, r, i, o), uo(t, s, Gi(n, [0, 0]), o)),
        l = eo(u, 0),
        c = eo(u, 1);
      return {
        width: { isBound: l.isBound, offset: l.offset[0] },
        height: { isBound: c.isBound, offset: c.offset[1] },
      };
    }
    function Go(t, n, e, r, i, o, a, s) {
      for (
        var u = Vr(t.state), l = t.props.keepRatio, c = 0, f = 0, p = 0;
        p < 2;
        ++p
      ) {
        var d = zo(t, n(c, f), i, l, a, s),
          h = d.width,
          v = d.height,
          g = h.isBound,
          m = v.isBound,
          b = h.offset,
          x = v.offset;
        if ((1 === p && (g || (b = 0), m || (x = 0)), 0 === p && a && !g && !m))
          return [0, 0];
        if (l) {
          var y = Math.abs(b) * (e ? 1 / e : 1),
            E = Math.abs(x) * (r ? 1 / r : 1);
          (g && m ? y < E : m || (!g && y < E))
            ? (b = (e * x) / r)
            : (x = (r * b) / e);
        }
        (c += b), (f += x);
      }
      if (i[0] && i[1]) {
        var S = (function (t, n, e, r, i) {
            var o = [-e[0], -e[1]],
              a = t.state,
              s = a.width,
              u = a.height,
              l = t.props.bounds,
              c = 1 / 0,
              f = 1 / 0;
            if (l) {
              var p = [
                  [e[0], -e[1]],
                  [-e[0], e[1]],
                ],
                d = l.left,
                h = void 0 === d ? -1 / 0 : d,
                v = l.top,
                g = void 0 === v ? -1 / 0 : v,
                m = l.right,
                b = void 0 === m ? 1 / 0 : m,
                x = l.bottom,
                y = void 0 === x ? 1 / 0 : x;
              p.forEach(function (t) {
                var e = t[0] !== o[0],
                  a = t[1] !== o[1],
                  l = Gi(n, t),
                  p = Oo(t[1] - o[1]),
                  d = Oo(t[0] - o[0]),
                  v = (360 * Wt(r, l)) / Math.PI;
                if (a) {
                  var m = l.slice();
                  (Math.abs(v - 360) < 2 || Math.abs(v - 180) < 2) &&
                    (m[1] = r[1]);
                  var x = Eo(r, m, (r[1] < l[1] ? y : g) - l[1], !1, i)[1];
                  isNaN(x) || (f = u + p * x);
                }
                if (e) {
                  (m = l.slice()),
                    (Math.abs(v - 90) < 2 || Math.abs(v - 270) < 2) &&
                      (m[0] = r[0]);
                  var E = Eo(r, m, (r[0] < l[0] ? b : h) - l[0], !0, i)[0];
                  isNaN(E) || (c = s + d * E);
                }
              });
            }
            return { maxWidth: c, maxHeight: f };
          })(t, u, i, o, s),
          w = S.maxWidth,
          M = S.maxHeight,
          C = (function (t, n, e, r, i, o, a, s, u) {
            var l = Do(t, s, [Gi(n, a)]),
              c = l.horizontal.offset,
              f = l.vertical.offset;
            if (f || c) {
              var p = Oi({ datas: u, distX: -f, distY: -c }),
                d = p[0],
                h = p[1];
              return [
                Math.min(i || 1 / 0, e + a[0] * d) - e,
                Math.min(o || 1 / 0, r + a[1] * h) - r,
              ];
            }
            return [0, 0];
          })(t, n(c, f), e + c, r + f, w, M, i, a, s);
        (c += b = C[0]), (f += x = C[1]);
      }
      return [c, f];
    }
    function Bo(t, n, e, r) {
      if (!yo(t, "rotatable")) return r;
      var i = n.pos1,
        o = n.pos2,
        a = n.pos3,
        s = n.pos4,
        u = (r * Math.PI) / 180,
        l = [i, o, a, s].map(function (t) {
          return Jn(t, e);
        }),
        c = l.map(function (t) {
          return oe(t, u);
        }),
        f = nr(mo(t, l, c, e, r), po(t, l, c, e, r));
      return (
        f.sort(function (t, n) {
          return Math.abs(t - r) - Math.abs(n - r);
        }),
        f.length ? f[0] : r
      );
    }
    function To(t, n, e, r, i) {
      var o = i.width,
        a = i.height,
        s = i.fixedPosition;
      if (!yo(t, "scalable")) return [0, 0];
      var u = i.is3d,
        l = Go(
          t,
          function (t, r) {
            return So(
              (function (t, n) {
                var e = t.transformOrigin,
                  r = t.offsetMatrix,
                  i = t.is3d ? 4 : 3;
                return Bi(r, Zn(t.targetMatrix, ce(n, i), i), e, i);
              })(i, Kn(n, [t / o, r / a])),
              o,
              a,
              s,
              e,
              u
            );
          },
          o,
          a,
          e,
          s,
          r,
          i
        );
      return [l[0] / o, l[1] / a];
    }
    function _o(t, n, e, r, i, o) {
      if (!yo(t, "draggable"))
        return [
          { isSnap: !1, isBound: !1, offset: 0 },
          { isSnap: !1, isBound: !1, offset: 0 },
        ];
      var a = Lr(o.absolutePoses, [n, e]),
        s = Tr(a),
        u = s.left,
        l = s.right,
        c = s.top,
        f = s.bottom,
        p = [
          [u, c],
          [l, c],
          [u, f],
          [l, f],
        ];
      t.props.snapCenter && p.push([(u + l) / 2, (c + f) / 2]);
      var d = Do(t, i, p, a),
        h = d.vertical,
        v = d.horizontal,
        g = lo(t, a, o),
        m = g.vertical,
        b = g.horizontal,
        x = h.isSnap,
        y = v.isSnap,
        E = h.isBound || m.isBound,
        S = v.isBound || b.isBound,
        w = (function (t, n, e, r, i) {
          var o = n[0],
            a = n[1],
            s = e[0],
            u = e[1],
            l = r[0],
            c = r[1],
            f = i[0],
            p = i[1],
            d = -f,
            h = -p;
          if (t && o && a) {
            (d = 0), (h = 0);
            var v = [];
            if (
              (s && u
                ? v.push([0, p], [f, 0])
                : s
                ? v.push([f, 0])
                : u
                ? v.push([0, p])
                : l && c
                ? v.push([0, p], [f, 0])
                : l
                ? v.push([f, 0])
                : c && v.push([0, p]),
              v.length)
            ) {
              v.sort(function (t, n) {
                return Ar(Jn([o, a], t)) - Ar(Jn([o, a], n));
              });
              var g = v[0];
              if (g[0] && Math.abs(o) > cr)
                (d = -g[0]), (h = (a * Math.abs(o + d)) / Math.abs(o) - a);
              else if (g[1] && Math.abs(a) > cr) {
                var m = a;
                (h = -g[1]), (d = (o * Math.abs(a + h)) / Math.abs(m) - o);
              }
              if (t && u && s)
                if (Math.abs(d) > cr && Math.abs(d) < Math.abs(f))
                  (d *= b = Math.abs(f) / Math.abs(d)), (h *= b);
                else if (Math.abs(h) > cr && Math.abs(h) < Math.abs(p)) {
                  var b;
                  (d *= b = Math.abs(p) / Math.abs(h)), (h *= b);
                } else (d = ii(-f, d)), (h = ii(-p, h));
            }
          } else (d = o || s ? -f : 0), (h = a || u ? -p : 0);
          return [d, h];
        })(
          r,
          [n, e],
          [E, S],
          [x, y],
          [ii(h.offset, m.offset), ii(v.offset, b.offset)]
        );
      return [
        { isBound: E, isSnap: x, offset: w[0] },
        { isBound: S, isSnap: y, offset: w[1] },
      ];
    }
    function ko(t) {
      var n = [];
      return (
        t.forEach(function (t) {
          t.guidelineInfos.forEach(function (t) {
            var e = t.guideline;
            n.indexOf(e) > -1 || n.push(e);
          });
        }),
        n
      );
    }
    function Ao(t, n, e, r) {
      var i = t - e,
        o = i < 0 ? i + n : r;
      return { size: (i < 0 ? 0 : i) - o, pos: o };
    }
    function Io(t, n, e, r) {
      var i = [],
        o = ei(
          t.filter(function (t) {
            var n = t.element,
              e = t.gap;
            return n && !e;
          }),
          function (t) {
            var e = t.element,
              o = t.pos,
              a = o[r],
              s = (Math.min(0, a - n) < 0 ? -1 : 1) + "_" + o[r ? 0 : 1],
              u = (function (t, n, e) {
                var r = Ft(t, n);
                return r > -1 ? t[r] : e;
              })(i, function (t) {
                var n = t[0],
                  r = t[1];
                return e === n && a === r;
              });
            return u ? u[2] : (i.push([e, a, s]), s);
          }
        );
      return (
        o.forEach(function (t) {
          t.sort(function (t, i) {
            return (
              Ao(t.pos[r], t.size, n, e).size - Ao(i.pos[r], t.size, n, e).size ||
              t.pos[r ? 0 : 1] - i.pos[r ? 0 : 1]
            );
          });
        }),
        o
      );
    }
    function jo(t, n, e, r, i, o, a, s, u, l, c, f) {
      var p = t.props,
        d = p.zoom,
        h = p.isDisplaySnapDigit,
        v = void 0 === h || h,
        g = bo[n],
        m = g[0],
        b = g[1],
        x = g[2],
        y = g[4];
      return ri(
        e.map(function (t, e) {
          var p = !0;
          return t.map(function (t, h) {
            var g,
              E = t.pos,
              S = t.size,
              w = Ao(E[l], S, i, o),
              M = w.pos,
              C = w.size;
            if (C < s) return null;
            var D = p;
            p = !1;
            var R = v && D ? parseFloat(C.toFixed(u)) : 0;
            return f.createElement(
              "div",
              {
                key: n + "LinkGuideline" + e + "-" + h,
                className: br("guideline-group", n),
                style:
                  ((g = {}),
                  (g[m] = r + M + "px"),
                  (g[b] = -a + E[l ? 0 : 1] + "px"),
                  (g[x] = C + "px"),
                  g),
              },
              hi(
                {
                  direction: n,
                  classNames: [br("dashed")],
                  size: "100%",
                  posValue: [0, 0],
                  sizeValue: C,
                  zoom: d,
                },
                f
              ),
              f.createElement(
                "div",
                {
                  className: br("size-value"),
                  style: {
                    transform: "translate" + y + "(-50%) scale(" + d + ")",
                  },
                },
                R > 0 ? c(R) : ""
              )
            );
          });
        })
      );
    }
    function No(t, n, e, r, i, o, a, s) {
      var u = t.props.zoom;
      return e.map(function (t, e) {
        var l = t.type,
          c = t.pos,
          f = [0, 0];
        return (
          (f[a] = r),
          (f[a ? 0 : 1] = -i + c),
          hi(
            {
              key: n + "TargetGuideline" + e,
              classNames: [br("target", "bold", l)],
              posValue: f,
              sizeValue: o,
              zoom: u,
              direction: n,
            },
            s
          )
        );
      });
    }
    function Fo(t, n, e, r, i) {
      var o = t.props.zoom;
      return e.map(function (t, e) {
        var a = t.pos,
          s = t.size,
          u = t.element,
          l = [-r[0] + a[0], -r[1] + a[1]];
        return hi(
          {
            key: n + "Guideline" + e,
            classNames: u ? [br("bold")] : [],
            direction: n,
            posValue: l,
            sizeValue: s,
            zoom: o,
          },
          i
        );
      });
    }
    function Yo(t, n, e, r) {
      var i = t.filter(function (t) {
          var e = t.element,
            r = t.gap,
            i = t.type;
          return e && r && i === n;
        }),
        o = "vertical" === n ? [0, 1] : [1, 0],
        a = o[0],
        s = o[1];
      return ri(
        i.map(function (t) {
          var n = t.pos,
            i = t.gap,
            o = t.gapGuidelines,
            u = t.sizes,
            l = (function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              return (
                t.sort(function (t, n) {
                  return Math.abs(t) - Math.abs(n);
                }),
                t[0]
              );
            })(n[s] + u[s] - e[s], n[s] - e[s] - r[s]),
            c = Math.min(u[s], r[s]);
          l > 0 && l > c
            ? (l = 2 * (l - c / 2))
            : l < 0 && l < -c && (l = 2 * (l + c / 2));
          var f = (l > 0 ? 0 : r[s]) + l / 2;
          return nr(
            (function (t, n, e, r, i, o, a) {
              var s = Math.abs(o),
                u = i[n] + (o > 0 ? r[0] : 0);
              return t
                .filter(function (t) {
                  return t.pos[n] <= e[n];
                })
                .sort(function (t, e) {
                  var r = t.pos;
                  return e.pos[n] - r[n];
                })
                .filter(function (t) {
                  var e = t.pos,
                    r = t.sizes,
                    i = e[n];
                  return Wr(i + r[n], 1e-4) === Wr(u - s, 1e-4) && ((u = i), !0);
                })
                .map(function (t) {
                  var r = -e[n] + t.pos[n] + t.sizes[n];
                  return tr(tr({}, t), {
                    gap: o,
                    renderPos: n ? [a, r] : [r, a],
                  });
                });
            })(o, a, e, r, n, i, f),
            (function (t, n, e, r, i, o, a) {
              var s = Math.abs(o),
                u = i[n] + (o < 0 ? r[n] : 0);
              return t
                .filter(function (t) {
                  return t.pos[n] > e[n];
                })
                .sort(function (t, e) {
                  var r = t.pos,
                    i = e.pos;
                  return r[n] - i[n];
                })
                .filter(function (t) {
                  var e = t.pos,
                    r = t.sizes,
                    i = e[n];
                  return Wr(i, 1e-4) === Wr(u + s, 1e-4) && ((u = i + r[n]), !0);
                })
                .map(function (t) {
                  var r = -e[n] + t.pos[n] - s;
                  return tr(tr({}, t), {
                    gap: o,
                    renderPos: n ? [a, r] : [r, a],
                  });
                });
            })(o, a, e, r, n, i, f)
          );
        })
      );
    }
    function Xo(t, n, e, r, i) {
      var o = t.props,
        a = o.snapDigit,
        s = void 0 === a ? 0 : a,
        u = o.isDisplaySnapDigit,
        l = void 0 === u || u,
        c = o.zoom,
        f = "horizontal" === n ? "X" : "Y",
        p = "horizontal" === n ? "width" : "height";
      return e.map(function (t, e) {
        var o,
          a = t.renderPos,
          u = t.gap,
          d = t.className,
          h = Math.abs(u),
          v = l ? parseFloat(h.toFixed(s)) : 0;
        return i.createElement(
          "div",
          {
            key: n + "GapGuideline" + e,
            className: br("guideline-group", n),
            style:
              ((o = { left: a[0] + "px", top: a[1] + "px" }),
              (o[p] = h + "px"),
              o),
          },
          hi(
            {
              direction: n,
              classNames: [br("gap"), d],
              size: "100%",
              posValue: [0, 0],
              sizeValue: h,
              zoom: c,
            },
            i
          ),
          i.createElement(
            "div",
            {
              className: br("size-value", "gap"),
              style: { transform: "translate" + f + "(-50%) scale(" + c + ")" },
            },
            v > 0 ? r(v) : ""
          )
        );
      });
    }
    function $o(t, n, e, r, i, o) {
      var a = ho(o || t.props.bounds, n, e),
        s = a.vertical,
        u = a.horizontal;
      s.forEach(function (t) {
        t.isBound && r.push({ type: "bounds", pos: t.pos });
      }),
        u.forEach(function (t) {
          t.isBound && i.push({ type: "bounds", pos: t.pos });
        });
      var l = (function (t) {
          var n = t.props.innerBounds;
          if (!n) return { vertical: [], horizontal: [] };
          var e = t.getRect(),
            r = e.pos1,
            i = e.pos2,
            o = e.pos3,
            a = e.pos4,
            s = Gi([r, i, o, a], [0, 0]),
            u = n.left,
            l = n.top,
            c = n.width,
            f = n.height,
            p = [
              [u, l],
              [u, l + f],
            ],
            d = [
              [u, l],
              [u + c, l],
            ],
            h = [
              [u + c, l],
              [u + c, l + f],
            ],
            v = [
              [u, l + f],
              [u + c, l + f],
            ],
            g = [],
            m = [],
            b = { top: !1, bottom: !1, left: !1, right: !1 };
          return (
            [
              [r, i],
              [i, a],
              [a, o],
              [o, r],
            ].forEach(function (t) {
              var n = ro(s, t),
                e = n.horizontal,
                r = n.vertical,
                i = so(t, d, r, 1, !0),
                o = so(t, v, r, 1, !0),
                a = so(t, p, e, 1, !0),
                x = so(t, h, e, 1, !0);
              i.isBound && !b.top && (g.push(l), (b.top = !0)),
                o.isBound && !b.bottom && (g.push(l + f), (b.bottom = !0)),
                a.isBound && !b.left && (m.push(u), (b.left = !0)),
                x.isBound && !b.right && (m.push(u + c), (b.right = !0));
            }),
            { horizontal: g, vertical: m }
          );
        })(t),
        c = l.vertical,
        f = l.horizontal;
      c.forEach(function (t) {
        Ft(r, function (n) {
          var e = n.type,
            r = n.pos;
          return "bounds" === e && r === t;
        }) >= 0 || r.push({ type: "bounds", pos: t });
      }),
        f.forEach(function (t) {
          Ft(i, function (n) {
            var e = n.type,
              r = n.pos;
            return "bounds" === e && r === t;
          }) >= 0 || i.push({ type: "bounds", pos: t });
        });
    }
    var qo = {
        name: "snappable",
        props: {
          snappable: [Boolean, Array],
          snapCenter: Boolean,
          snapHorizontal: Boolean,
          snapVertical: Boolean,
          snapElement: Boolean,
          snapGap: Boolean,
          isDisplaySnapDigit: Boolean,
          snapDigit: Number,
          snapThreshold: Number,
          horizontalGuidelines: Array,
          verticalGuidelines: Array,
          elementGuidelines: Array,
          bounds: Object,
          innerBounds: Object,
          snapDistFormat: Function,
        },
        events: { onSnap: "snap" },
        css: [
          ":host {\n    --bounds-color: #d66;\n}\n.guideline {\n    pointer-events: none;\n    z-index: 2;\n}\n.guideline.bounds {\n    background: #d66;\n    background: var(--bounds-color);\n}\n.guideline-group {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.guideline-group .size-value {\n    position: absolute;\n    color: #f55;\n    font-size: 12px;\n    font-weight: bold;\n}\n.guideline-group.horizontal .size-value {\n    transform-origin: 50% 100%;\n    transform: translateX(-50%);\n    left: 50%;\n    bottom: 5px;\n}\n.guideline-group.vertical .size-value {\n    transform-origin: 0% 50%;\n    top: 50%;\n    transform: translateY(-50%);\n    left: 5px;\n}\n.guideline.gap {\n    background: #f55;\n}\n.size-value.gap {\n    color: #f55;\n}\n",
        ],
        render: function (t, n) {
          var e = t.state,
            r = e.top,
            i = e.left,
            o = e.pos1,
            a = e.pos2,
            s = e.pos3,
            u = e.pos4,
            l = e.snapRenderInfo,
            c = e.targetClientRect,
            f = e.containerClientRect,
            p = e.is3d,
            d = e.rootMatrix;
          if (!l || !yo(t, "")) return [];
          var h = p ? 4 : 3,
            v = Math.min(o[0], a[0], s[0], u[0]),
            g = Math.min(o[1], a[1], s[1], u[1]),
            m = qi(d, f, h),
            b = oi(d, [c.left - m[0], c.top - m[1]], h),
            x = b[0],
            y = b[1],
            E = t.props,
            S = E.snapThreshold,
            w = void 0 === S ? 5 : S,
            M = E.snapDigit,
            C = void 0 === M ? 0 : M,
            D = E.snapDistFormat,
            R =
              void 0 === D
                ? function (t) {
                    return t;
                  }
                : D,
            O = l.externalPoses || [],
            P = Vr(t.state),
            z = [],
            G = [],
            B = [],
            T = [],
            _ = [],
            k = Tr(P),
            A = k.width,
            I = k.height,
            j = k.top,
            N = k.left,
            F = k.bottom,
            Y = k.right,
            X = O.length > 0,
            $ = X ? Tr(O) : {};
          if (!l.request) {
            if (
              (l.direction &&
                _.push(
                  (function (t, n, e) {
                    var r = [];
                    if (e[0] && e[1])
                      r = [e, [-e[0], e[1]], [e[0], -e[1]]].map(function (t) {
                        return Gi(n, t);
                      });
                    else if (e[0] || e[1])
                      t.props.keepRatio
                        ? (r = [[-1, -1], [-1, 1], [1, -1], [1, 1], e].map(
                            function (t) {
                              return Gi(n, t);
                            }
                          ))
                        : (r = zi(n, e)).length > 1 &&
                          r.push([
                            (r[0][0] + r[1][0]) / 2,
                            (r[0][1] + r[1][1]) / 2,
                          ]);
                    else
                      for (
                        var i = [n[0], n[1], n[3], n[2], n[0]], o = 0;
                        o < 4;
                        ++o
                      )
                        r.push(i[o]),
                          r.push([
                            (i[o][0] + i[o + 1][0]) / 2,
                            (i[o][1] + i[o + 1][1]) / 2,
                          ]);
                    return Zi(
                      t,
                      r.map(function (t) {
                        return t[0];
                      }),
                      r.map(function (t) {
                        return t[1];
                      }),
                      !0,
                      1
                    );
                  })(t, P, l.direction)
                ),
              l.snap)
            ) {
              var q = Tr(P);
              l.center &&
                ((q.middle = (q.top + q.bottom) / 2),
                (q.center = (q.left + q.right) / 2)),
                _.push(Ji(t, q, !0, 1));
            }
            X &&
              (l.center &&
                (($.middle = ($.top + $.bottom) / 2),
                ($.center = ($.left + $.right) / 2)),
              _.push(Ji(t, $, !0, 1))),
              _.forEach(function (t) {
                var n = t.vertical.posInfos,
                  e = t.horizontal.posInfos;
                z.push.apply(
                  z,
                  n.map(function (t) {
                    return { type: "snap", pos: t.pos };
                  })
                ),
                  G.push.apply(
                    G,
                    e.map(function (t) {
                      return { type: "snap", pos: t.pos };
                    })
                  ),
                  B.push.apply(B, ko(n)),
                  T.push.apply(T, ko(e));
              });
          }
          $o(t, [N, Y], [j, F], z, G),
            X &&
              $o(t, [$.left, $.right], [$.top, $.bottom], z, G, l.externalBounds);
          var L = Io(T, x, A, 0),
            V = Io(B, y, I, 1),
            W = Yo(B, "vertical", [i, r], [A, I]),
            H = Yo(T, "horizontal", [i, r], [A, I]),
            U = nr(B, T);
          return (
            Jr(
              t,
              "onSnap",
              {
                guidelines: U.filter(function (t) {
                  return !t.element;
                }),
                elements: ei(
                  U.filter(function (t) {
                    return t.element;
                  }),
                  function (t) {
                    return t.element;
                  }
                ),
                gaps: nr(H, W),
              },
              !0
            ),
            nr(
              Xo(t, "vertical", H, R, n),
              Xo(t, "horizontal", W, R, n),
              jo(t, "horizontal", L, v, x, A, r, w, C, 0, R, n),
              jo(t, "vertical", V, g, y, I, i, w, C, 1, R, n),
              No(t, "horizontal", G, v, r, A, 0, n),
              No(t, "vertical", z, g, i, I, 1, n),
              Fo(t, "horizontal", T, [i, r], n),
              Fo(t, "vertical", B, [i, r], n)
            )
          );
        },
        dragStart: function (t, n) {
          (t.state.snapRenderInfo = {
            request: n.isRequest,
            snap: !0,
            center: !0,
          }),
            xo(t);
        },
        drag: function (t) {
          var n = t.state;
          (n.staticGuidelines = Hi(t, !1, n.staticGuidelines)),
            (n.guidelines = Ui(t));
        },
        pinchStart: function (t) {
          this.unset(t);
        },
        dragEnd: function (t) {
          this.unset(t);
        },
        dragControlCondition: function (t, n) {
          return (
            !(!ci(t) && !ta(t, n)) ||
            (!t.isRequest && t.inputEvent
              ? Zt(t.inputEvent.target, br("snap-control"))
              : void 0)
          );
        },
        dragControlStart: function (t) {
          (t.state.snapRenderInfo = null), xo(t);
        },
        dragControl: function (t) {
          this.drag(t);
        },
        dragControlEnd: function (t) {
          this.unset(t);
        },
        dragGroupStart: function (t, n) {
          this.dragStart(t, n);
        },
        dragGroup: function (t) {
          this.drag(t);
        },
        dragGroupEnd: function (t) {
          this.unset(t);
        },
        dragGroupControlStart: function (t) {
          (t.state.snapRenderInfo = null), xo(t);
        },
        dragGroupControl: function (t) {
          this.drag(t);
        },
        dragGroupControlEnd: function (t) {
          this.unset(t);
        },
        unset: function (t) {
          var n = t.state;
          (n.enableSnap = !1),
            (n.staticGuidelines = []),
            (n.guidelines = []),
            (n.snapRenderInfo = null);
        },
      },
      Lo = {
        name: "draggable",
        props: {
          draggable: Boolean,
          throttleDrag: Number,
          throttleDragRotate: Number,
          startDragRotate: Number,
          edgeDraggable: Boolean,
        },
        events: {
          onDragStart: "dragStart",
          onDrag: "drag",
          onDragEnd: "dragEnd",
          onDragGroupStart: "dragGroupStart",
          onDragGroup: "dragGroup",
          onDragGroupEnd: "dragGroupEnd",
        },
        render: function (t, n) {
          var e = t.props,
            r = e.throttleDragRotate,
            i = e.zoom,
            o = t.state,
            a = o.dragInfo,
            s = o.beforeOrigin;
          if (!r || !a) return [];
          var u = a.dist;
          if (!u[0] && !u[1]) return [];
          var l = Ar(u),
            c = Wt(u, [0, 0]);
          return [
            n.createElement("div", {
              className: br("line", "horizontal", "dragline", "dashed"),
              key: "dragRotateGuideline",
              style: {
                width: l + "px",
                transform:
                  "translate(" +
                  s[0] +
                  "px, " +
                  s[1] +
                  "px) rotate(" +
                  c +
                  "rad) scaleY(" +
                  i +
                  ")",
              },
            }),
          ];
        },
        dragStart: function (t, n) {
          var e = n.datas,
            r = n.parentEvent,
            i = n.parentGesto,
            o = t.state,
            a = o.target;
          if (o.gesto) return !1;
          o.gesto = i || t.targetGesto;
          var s = window.getComputedStyle(a);
          (e.datas = {}),
            (e.left = parseFloat(s.left || "") || 0),
            (e.top = parseFloat(s.top || "") || 0),
            (e.bottom = parseFloat(s.bottom || "") || 0),
            (e.right = parseFloat(s.right || "") || 0),
            (e.startValue = [0, 0]),
            Si(t, n),
            ki(n),
            (function (t, n) {
              n.absolutePoses = Vr(t.state);
            })(t, e),
            (e.prevDist = [0, 0]),
            (e.prevBeforeDist = [0, 0]),
            (e.isDrag = !1);
          var u = Zr(
            t,
            n,
            tr(
              {
                set: function (t) {
                  e.startValue = t;
                },
              },
              _i(n)
            )
          );
          return (
            !1 !== (r || Jr(t, "onDragStart", u))
              ? ((e.isDrag = !0),
                (t.state.dragInfo = { startRect: t.getRect(), dist: [0, 0] }))
              : ((o.gesto = null), (e.isPinch = !1)),
            !!e.isDrag && u
          );
        },
        drag: function (t, n) {
          wi(n, "translate");
          var e = n.datas,
            r = n.parentEvent,
            i = n.parentFlag,
            o = n.isPinch,
            a = n.isRequest,
            s = n.distX,
            u = n.distY,
            l = e.isDrag,
            c = e.prevDist,
            f = e.prevBeforeDist,
            p = e.startValue;
          if (l) {
            var d = t.props,
              h = d.parentMoveable,
              v = r ? 0 : d.throttleDrag || 0,
              g = r ? 0 : d.throttleDragRotate || 0,
              m = !1,
              b = 0;
            if (!r && g > 0 && (s || u)) {
              var x = d.startDragRotate || 0,
                y = Wr(x + (180 * Wt([0, 0], [s, u])) / Math.PI, g) - x,
                E = u * Math.abs(Math.cos(((y - 90) / 180) * Math.PI)),
                S = Ar([s * Math.abs(Math.cos((y / 180) * Math.PI)), E]);
              (b = (y * Math.PI) / 180),
                (s = S * Math.cos(b)),
                (u = S * Math.sin(b));
            }
            if (!o && !r && !i && (!g || s || u)) {
              var w = _o(t, s, u, g, a, e),
                M = w[0],
                C = w[1],
                D = M.isSnap,
                R = M.isBound,
                O = M.offset,
                P = C.isSnap,
                z = C.isBound;
              (m = D || P || R || z), (s += O), (u += C.offset);
            }
            (e.passDeltaX = s - (e.passDistX || 0)),
              (e.passDeltaY = u - (e.passDistY || 0)),
              (e.passDistX = s),
              (e.passDistY = u);
            var G = Kn(Ri({ datas: e, distX: s, distY: u }), p),
              B = Kn(Ci({ datas: e, distX: s, distY: u }), p);
            g || m || (Hr(B, v), Hr(G, v));
            var T = Jn(G, p),
              _ = Jn(B, p),
              k = Jn(_, c),
              A = Jn(T, f);
            (e.prevDist = _), (e.prevBeforeDist = T);
            var I = e.left + T[0],
              j = e.top + T[1],
              N = e.right - T[0],
              F = e.bottom - T[1],
              Y = Mi(
                e,
                "translate(" + B[0] + "px, " + B[1] + "px)",
                "translate(" + _[0] + "px, " + _[1] + "px)"
              );
            if (
              ((t.state.dragInfo.dist = r ? [0, 0] : _),
              r ||
                h ||
                !k.every(function (t) {
                  return !t;
                }) ||
                !A.some(function (t) {
                  return !t;
                }))
            ) {
              var X = t.state,
                $ = Zr(t, n, {
                  transform: Y,
                  dist: _,
                  delta: k,
                  translate: B,
                  beforeDist: T,
                  beforeDelta: A,
                  beforeTranslate: G,
                  left: I,
                  top: j,
                  right: N,
                  bottom: F,
                  width: X.width,
                  height: X.height,
                  isPinch: o,
                });
              return !r && Jr(t, "onDrag", $), $;
            }
          }
        },
        dragEnd: function (t, n) {
          var e = n.parentEvent,
            r = n.datas,
            i = n.isDrag;
          if (((t.state.gesto = null), (t.state.dragInfo = null), r.isDrag))
            return (r.isDrag = !1), !e && Jr(t, "onDragEnd", Kr(t, n, {})), i;
        },
        dragGroupStart: function (t, n) {
          var e = n.datas,
            r = n.clientX,
            i = n.clientY,
            o = this.dragStart(t, n);
          if (!o) return !1;
          var a = xi(t, this, "dragStart", [r || 0, i || 0], n, !1),
            s = Jr(
              t,
              "onDragGroupStart",
              tr(tr({}, o), { targets: t.props.targets, events: a })
            );
          return (e.isDrag = !1 !== s), !!e.isDrag && o;
        },
        dragGroup: function (t, n) {
          if (n.datas.isDrag) {
            var e = this.drag(t, n),
              r = n.datas,
              i = xi(t, this, "drag", [r.passDeltaX, r.passDeltaY], n, !1);
            if (e) {
              var o = tr({ targets: t.props.targets, events: i }, e);
              return Jr(t, "onDragGroup", o), o;
            }
          }
        },
        dragGroupEnd: function (t, n) {
          var e = n.isDrag;
          if (n.datas.isDrag)
            return (
              this.dragEnd(t, n),
              xi(t, this, "dragEnd", [0, 0], n, !1),
              Jr(t, "onDragGroupEnd", Kr(t, n, { targets: t.props.targets })),
              e
            );
        },
        request: function (t) {
          var n = {},
            e = t.getRect(),
            r = 0,
            i = 0;
          return {
            isControl: !1,
            requestStart: function () {
              return { datas: n };
            },
            request: function (t) {
              return (
                "x" in t ? (r = t.x - e.left) : "deltaX" in t && (r += t.deltaX),
                "y" in t ? (i = t.y - e.top) : "deltaY" in t && (i += t.deltaY),
                { datas: n, distX: r, distY: i }
              );
            },
            requestEnd: function () {
              return { datas: n, isDrag: !0 };
            },
          };
        },
        unset: function (t) {
          t.state.dragInfo = null;
        },
      };
    function Vo(t, n, e) {
      var r = t.state,
        i = r.renderPoses,
        o = r.rotation,
        a = r.direction,
        s = t.props,
        u = s.renderDirections,
        l = void 0 === u ? n : u,
        c = s.zoom,
        f = {};
      if (!l) return [];
      var p = a > 0 ? 1 : -1,
        d = !0 === l ? hr : l,
        h = (o / Math.PI) * 180;
      return (
        d.forEach(function (t) {
          f[t] = !0;
        }),
        d.map(function (t) {
          var n = vr[t];
          if (!n || !f[t]) return null;
          var r = (Wr(h, 15) + p * gr[t] + 720) % 180;
          return e.createElement("div", {
            className: br("control", "direction", t),
            "data-rotation": r,
            "data-direction": t,
            key: "direction-" + t,
            style: Nr.apply(
              void 0,
              nr(
                [o, c],
                n.map(function (t) {
                  return i[t];
                })
              )
            ),
          });
        })
      );
    }
    function Wo(t, n, e, r, i, o) {
      for (var a = [], s = 6; s < arguments.length; s++) a[s - 6] = arguments[s];
      var u = Wt(e, r),
        l = n ? Wr((u / Math.PI) * 180, 15) % 180 : -1;
      return t.createElement("div", {
        key: "line" + o,
        className: br.apply(void 0, nr(["line", "direction", n], a)),
        "data-rotation": l,
        "data-line-index": o,
        "data-direction": n,
        style: jr(e, r, i, u),
      });
    }
    function Ho(t, n) {
      return Vo(t, hr, n);
    }
    function Uo(t, n) {
      return Vo(t, ["nw", "ne", "sw", "se"], n);
    }
    function Zo(t, n, e, r, i, o) {
      var a = t.state.is3d ? 4 : 3,
        s = Gr(t.state.rootMatrix, i, a),
        u = Kn([o.left, o.top], s);
      (n.startAbsoluteOrigin = u),
        (n.prevDeg = (Wt(u, [e, r]) / Math.PI) * 180),
        (n.prevSnapDeg = n.prevDeg),
        (n.startDeg = n.prevDeg),
        (n.loop = 0);
    }
    function Ko(t, n, e, r, i, o) {
      var a = e.prevDeg,
        s = Bo(t, n, e.origin, r);
      return (e.prevDeg = s), [s - a, s, o + s];
    }
    function Jo(t, n, e, r, i, o, a, s) {
      var u = e.prevDeg,
        l = e.prevSnapDeg,
        c = e.startDeg,
        f = e.loop;
      u > r && u > 270 && r < 90
        ? ++e.loop
        : u < r && u < 90 && r > 270 && --e.loop;
      var p = e.loop,
        d = 360 * f + l - c + o,
        h = 360 * p + r - c + o;
      e.prevDeg = h - 360 * p + c - o;
      var v = i * ((h = Wr(h, a)) - o);
      return (
        s && (h = (v = Bo(t, n, e.origin, v)) / i + o),
        (e.prevSnapDeg = h - 360 * p + c - o),
        [i * (h - d), v, o + v]
      );
    }
    function Qo(t, n, e, r, i, o, a, s) {
      return Jo(
        t,
        n,
        e,
        (Wt(e.startAbsoluteOrigin, [i, o]) / Math.PI) * 180,
        r,
        a,
        s,
        !0
      );
    }
    function ta(t, n) {
      if (t.isRequest) return "rotatable" === t.requestAble;
      var e = t.inputEvent.target;
      if (Zt(e, br("rotation-control"))) return !0;
      var r = n.props.rotationTarget;
      return (
        !!r &&
        di(r, !0).some(function (t) {
          return !!t && (e === t || e.contains(t));
        })
      );
    }
    var na = {
        name: "rotatable",
        canPinch: !0,
        props: {
          rotatable: Boolean,
          rotationPosition: String,
          throttleRotate: Number,
          renderDirections: Object,
          rotationTarget: Object,
        },
        events: {
          onRotateStart: "rotateStart",
          onRotate: "rotate",
          onRotateEnd: "rotateEnd",
          onRotateGroupStart: "rotateGroupStart",
          onRotateGroup: "rotateGroup",
          onRotateGroupEnd: "rotateGroupEnd",
        },
        css: [
          ".rotation {\n            position: absolute;\n            height: 40px;\n            width: 1px;\n            transform-origin: 50% 100%;\n            height: calc(40px * var(--zoom));\n            top: auto;\n            left: 0;\n            bottom: 100%;\n            will-change: transform;\n        }\n        .rotation .rotation-line {\n            display: block;\n            width: 100%;\n            height: 100%;\n            transform-origin: 50% 50%;\n        }\n        .rotation .rotation-control {\n            border-color: #4af;\n            border-color: var(--moveable-color);\n            background:#fff;\n            cursor: alias;\n        }",
        ],
        render: function (t, n) {
          var e = t.props,
            r = e.rotatable,
            i = e.rotationPosition,
            o = e.zoom,
            a = e.renderDirections,
            s = t.state,
            u = s.renderPoses,
            l = s.direction;
          if (!r) return null;
          var c = (function (t, n, e) {
              var r = n[0],
                i = n[1],
                o = n[2],
                a = n[3];
              if ("none" !== t) {
                var s = (t || "top").split("-"),
                  u = s[0],
                  l = s[1],
                  c = [r, i];
                "left" === u
                  ? (c = [o, r])
                  : "right" === u
                  ? (c = [i, a])
                  : "bottom" === u && (c = [a, o]);
                var f = [(c[0][0] + c[1][0]) / 2, (c[0][1] + c[1][1]) / 2],
                  p = Yr(c, e);
                if (l) {
                  var d = "top" === l || "left" === l,
                    h = "bottom" === u || "left" === u;
                  f = c[(d && !h) || (!d && h) ? 0 : 1];
                }
                return [f, p];
              }
            })(i, u, l),
            f = [];
          if (c) {
            var p = c[0],
              d = c[1];
            f.push(
              n.createElement(
                "div",
                {
                  key: "rotation",
                  className: br("rotation"),
                  style: {
                    transform:
                      "translate(-50%) translate(" +
                      p[0] +
                      "px, " +
                      p[1] +
                      "px) rotate(" +
                      d +
                      "rad)",
                  },
                },
                n.createElement("div", {
                  className: br("line rotation-line"),
                  style: { transform: "scaleX(" + o + ")" },
                }),
                n.createElement("div", {
                  className: br("control rotation-control"),
                  style: { transform: "translate(0.5px) scale(" + o + ")" },
                })
              )
            );
          }
          return a && f.push.apply(f, Vo(t, [], n)), f;
        },
        dragControlCondition: ta,
        dragControlStart: function (t, n) {
          var e = n.datas,
            r = n.clientX,
            i = n.clientY,
            o = n.parentRotate,
            a = n.parentFlag,
            s = n.isPinch,
            u = n.isRequest,
            l = t.state,
            c = l.target,
            f = l.left,
            p = l.top,
            d = l.origin,
            h = l.beforeOrigin,
            v = l.direction,
            g = l.beforeDirection,
            m = l.targetTransform,
            b = l.moveableClientRect;
          if (!u && !c) return !1;
          var x = t.getRect();
          if (
            ((e.rect = x),
            (e.transform = m),
            (e.left = f),
            (e.top = p),
            (e.fixedPosition = Yi(t, Fi(t))),
            (e.absoluteInfo = { origin: x.origin, startValue: x.rotation }),
            Zo(t, e.absoluteInfo, r, i, d, b),
            u || s || a)
          ) {
            var y = o || 0;
            (e.beforeInfo = {
              origin: x.beforeOrigin,
              prevDeg: y,
              startDeg: y,
              prevSnapDeg: y,
              loop: 0,
            }),
              (e.afterInfo = {
                origin: x.origin,
                prevDeg: y,
                startDeg: y,
                prevSnapDeg: y,
                loop: 0,
              });
          } else
            (e.beforeInfo = { origin: x.beforeOrigin }),
              (e.afterInfo = { origin: x.origin }),
              Zo(t, e.beforeInfo, r, i, h, b),
              Zo(t, e.afterInfo, r, i, d, b);
          (e.direction = v),
            (e.beforeDirection = g),
            (e.startValue = 0),
            (e.datas = {}),
            ki(n);
          var E = Zr(
              t,
              n,
              tr(
                tr(
                  {
                    set: function (t) {
                      e.startValue = (t * Math.PI) / 180;
                    },
                  },
                  _i(n)
                ),
                { dragStart: Lo.dragStart(t, new mi().dragStart([0, 0], n)) }
              )
            ),
            S = Jr(t, "onRotateStart", E);
          return (
            (e.isRotate = !1 !== S),
            (t.state.snapRenderInfo = { request: n.isRequest }),
            !!e.isRotate && E
          );
        },
        dragControl: function (t, n) {
          var e,
            r,
            i,
            o,
            a,
            s,
            u,
            l,
            c,
            f = n.datas,
            p = n.clientX,
            d = n.clientY,
            h = n.parentRotate,
            v = n.parentFlag,
            g = n.isPinch,
            m = n.groupDelta,
            b = f.beforeDirection,
            x = f.beforeInfo,
            y = f.afterInfo,
            E = f.absoluteInfo,
            S = f.isRotate,
            w = f.startValue,
            M = f.rect;
          if (S) {
            wi(n, "rotate");
            var C,
              D,
              R,
              O,
              P,
              z,
              G,
              B,
              T,
              _ =
                b *
                (function (t) {
                  return kr(t.datas.beforeTransform, [50, 50], 100, 100)
                    .direction;
                })(n),
              k = t.props,
              A = k.throttleRotate,
              I = void 0 === A ? 0 : A,
              j = k.parentMoveable,
              N = (180 / Math.PI) * w,
              F = E.startValue;
            if (!v && "parentDist" in n) {
              var Y = n.parentDist;
              (C = (e = Ko(t, M, y, Y, 0, N))[0]),
                (D = e[1]),
                (R = e[2]),
                (O = (r = Ko(t, M, x, Y, 0, N))[0]),
                (P = r[1]),
                (z = r[2]),
                (G = (i = Ko(t, M, E, Y, 0, F))[0]),
                (B = i[1]),
                (T = i[2]);
            } else
              g || v
                ? ((C = (o = Jo(t, M, y, h, _, N, I))[0]),
                  (D = o[1]),
                  (R = o[2]),
                  (O = (a = Jo(t, M, x, h, b, N, I))[0]),
                  (P = a[1]),
                  (z = a[2]),
                  (G = (s = Jo(t, M, E, h, _, F, I))[0]),
                  (B = s[1]),
                  (T = s[2]))
                : ((C = (u = Qo(t, M, y, _, p, d, N, I))[0]),
                  (D = u[1]),
                  (R = u[2]),
                  (O = (l = Qo(t, M, x, b, p, d, N, I))[0]),
                  (P = l[1]),
                  (z = l[2]),
                  (G = (c = Qo(t, M, E, _, p, d, F, I))[0]),
                  (B = c[1]),
                  (T = c[2]));
            if (G || C || O || j) {
              var X = Mi(f, "rotate(" + R + "deg)", "rotate(" + D + "deg)"),
                $ = (function (t, n, e, r) {
                  return Ni(t, "rotate(" + n + "deg)", Fi(t), e, r);
                })(t, D, f.fixedPosition, f),
                q = Jn(Kn(m || [0, 0], $), f.prevInverseDist || [0, 0]);
              f.prevInverseDist = $;
              var L = Zr(
                t,
                n,
                tr(
                  {
                    delta: C,
                    dist: D,
                    rotate: R,
                    beforeDist: P,
                    beforeDelta: O,
                    beforeRotate: z,
                    absoluteDist: B,
                    absoluteDelta: G,
                    absoluteRotate: T,
                    isPinch: !!g,
                  },
                  ji(t, X, q, g, n)
                )
              );
              return Jr(t, "onRotate", L), L;
            }
          }
        },
        dragControlEnd: function (t, n) {
          var e = n.datas,
            r = n.isDrag;
          return (
            !!e.isRotate &&
            ((e.isRotate = !1), Jr(t, "onRotateEnd", Kr(t, n, {})), r)
          );
        },
        dragGroupControlCondition: ta,
        dragGroupControlStart: function (t, n) {
          var e = n.datas,
            r = t.state,
            i = r.left,
            o = r.top,
            a = r.beforeOrigin,
            s = this.dragControlStart(t, n);
          if (!s) return !1;
          s.set(e.beforeDirection * t.rotation);
          var u = yi(t, this, "dragControlStart", n, function (t, n) {
              var e = t.state,
                r = e.left,
                s = e.top,
                u = e.beforeOrigin,
                l = Kn(Jn([r, s], [i, o]), Jn(u, a));
              return (
                (n.datas.groupClient = l), tr(tr({}, n), { parentRotate: 0 })
              );
            }),
            l = Jr(
              t,
              "onRotateGroupStart",
              tr(tr({}, s), { targets: t.props.targets, events: u })
            );
          return (e.isRotate = !1 !== l), !!e.isRotate && s;
        },
        dragGroupControl: function (t, n) {
          var e = n.datas;
          if (e.isRotate) {
            var r = this.dragControl(t, n);
            if (r) {
              var i = e.beforeDirection,
                o = r.beforeDist,
                a = (r.beforeDelta / 180) * Math.PI,
                s = yi(t, this, "dragControl", n, function (t, n) {
                  var e = n.datas.groupClient,
                    r = e[0],
                    s = e[1],
                    u = oe([r, s], a * i),
                    l = u[0],
                    c = u[1],
                    f = [l - r, c - s];
                  return (
                    (n.datas.groupClient = [l, c]),
                    tr(tr({}, n), { parentRotate: o, groupDelta: f })
                  );
                });
              t.rotation = i * r.beforeRotate;
              var u = tr(
                {
                  targets: t.props.targets,
                  events: s,
                  set: function (n) {
                    t.rotation = n;
                  },
                },
                r
              );
              return Jr(t, "onRotateGroup", u), u;
            }
          }
        },
        dragGroupControlEnd: function (t, n) {
          var e = n.isDrag;
          if (n.datas.isRotate)
            return (
              this.dragControlEnd(t, n),
              yi(t, this, "dragControlEnd", n),
              Jr(t, "onRotateGroupEnd", Kr(t, n, { targets: t.props.targets })),
              e
            );
        },
        request: function (t) {
          var n = {},
            e = 0,
            r = t.getRotation();
          return {
            isControl: !0,
            requestStart: function () {
              return { datas: n };
            },
            request: function (t) {
              return (
                "deltaRotate" in t
                  ? (e += t.deltaRotate)
                  : "rotate" in t && (e = t.rotate - r),
                { datas: n, parentDist: e }
              );
            },
            requestEnd: function () {
              return { datas: n, isDrag: !0 };
            },
          };
        },
      },
      ea = {
        name: "resizable",
        ableGroup: "size",
        updateRect: !0,
        canPinch: !0,
        props: {
          resizable: Boolean,
          throttleResize: Number,
          renderDirections: Array,
          keepRatio: Boolean,
        },
        events: {
          onResizeStart: "resizeStart",
          onResize: "resize",
          onResizeEnd: "resizeEnd",
          onResizeGroupStart: "resizeGroupStart",
          onResizeGroup: "resizeGroup",
          onResizeGroupEnd: "resizeGroupEnd",
        },
        render: function (t, n) {
          var e = t.props,
            r = e.resizable,
            i = e.edge;
          if (r) return i ? Uo(t, n) : Ho(t, n);
        },
        dragControlCondition: ci,
        dragControlStart: function (t, n) {
          var e,
            r = n.inputEvent,
            i = n.isPinch,
            o = n.parentDirection,
            a = n.datas,
            s = n.parentFlag,
            u = o || (i ? [0, 0] : qr(r.target)),
            l = t.state,
            c = l.target,
            f = l.width,
            p = l.height;
          if (!u || !c) return !1;
          !i && Si(t, n),
            (a.datas = {}),
            (a.direction = u),
            (a.startOffsetWidth = f),
            (a.startOffsetHeight = p),
            (a.prevWidth = 0),
            (a.prevHeight = 0),
            (e = (function (t) {
              var n = window.getComputedStyle(t);
              return [parseFloat(n.width), parseFloat(n.height)];
            })(c)),
            (a.startWidth = e[0]),
            (a.startHeight = e[1]);
          var d = [Math.max(0, f - a.startWidth), Math.max(0, p - a.startHeight)];
          if (((a.minSize = d), (a.maxSize = [1 / 0, 1 / 0]), !s)) {
            var h = window.getComputedStyle(c),
              v = h.position,
              g = h.minWidth,
              m = h.minHeight,
              b = h.maxWidth,
              x = h.maxHeight,
              y = "static" === v || "relative" === v,
              E = y ? c.parentElement : c.offsetParent,
              S = f,
              w = p;
            if (E && ((S = E.clientWidth), (w = E.clientHeight), y)) {
              var M = window.getComputedStyle(E);
              (S -= parseFloat(M.paddingLeft) || 0),
                (w -= parseFloat(M.paddingTop) || 0);
            }
            (a.minSize = Kn([Xt(g, S) || 0, Xt(m, w) || 0], d)),
              (a.maxSize = Kn([Xt(b, S) || 1 / 0, Xt(x, w) || 1 / 0], d));
          }
          var C = t.props.transformOrigin || "% %";
          function D(t) {
            a.ratio = t && isFinite(t) ? t : 0;
          }
          function R(n) {
            (a.fixedDirection = n), (a.fixedPosition = $i(t, n));
          }
          (a.transformOrigin = C && Pt(C) ? C.split(" ") : C),
            (a.isWidth = (!u[0] && !u[1]) || u[0] || !u[1]),
            D(f / p),
            R([-u[0], -u[1]]);
          var O = Zr(t, n, {
            direction: u,
            set: function (t) {
              var n = t[0],
                e = t[1];
              (a.startWidth = n), (a.startHeight = e);
            },
            setMin: function (t) {
              a.minSize = t;
            },
            setMax: function (t) {
              a.maxSize = [t[0] || 1 / 0, t[1] || 1 / 0];
            },
            setRatio: D,
            setFixedDirection: R,
            setOrigin: function (t) {
              a.transformOrigin = t;
            },
            dragStart: Lo.dragStart(t, new mi().dragStart([0, 0], n)),
          });
          return (
            !1 !== Jr(t, "onResizeStart", O) &&
              ((a.isResize = !0),
              (t.state.snapRenderInfo = { request: n.isRequest, direction: u })),
            !!a.isResize && O
          );
        },
        dragControl: function (t, n) {
          var e,
            r = n.datas,
            i = n.distX,
            o = n.distY,
            a = n.parentFlag,
            s = n.isPinch,
            u = n.parentDistance,
            l = n.parentScale,
            c = n.parentKeepRatio,
            f = n.dragClient,
            p = n.parentDist,
            d = n.isRequest,
            h = r.isResize,
            v = r.transformOrigin,
            g = r.fixedDirection,
            m = r.startWidth,
            b = r.startHeight,
            x = r.prevWidth,
            y = r.prevHeight,
            E = r.minSize,
            S = r.maxSize,
            w = r.ratio,
            M = r.isWidth,
            C = r.startOffsetWidth,
            D = r.startOffsetHeight;
          if (h) {
            var R = t.props,
              O = R.throttleResize,
              P = void 0 === O ? 0 : O,
              z = R.parentMoveable,
              G = R.snapThreshold,
              B = void 0 === G ? 5 : G,
              T = r.direction,
              _ = T,
              k = 0,
              A = 0;
            T[0] || T[1] || (_ = [1, 1]);
            var I = w && (t.props.keepRatio || c),
              j = f;
            if ((f || (j = !a && s ? $i(t, [0, 0]) : r.fixedPosition), p))
              (k = p[0]), (A = p[1]), I && (k ? A || (A = k / w) : (k = A * w));
            else if (l) (k = (l[0] - 1) * C), (A = (l[1] - 1) * D);
            else if (s) u && ((k = u), (A = (u * D) / C));
            else {
              var N = Oi({ datas: r, distX: i, distY: o });
              if (((k = _[0] * N[0]), (A = _[1] * N[1]), I && C && D)) {
                var F = Wt([0, 0], N),
                  Y = Wt([0, 0], _),
                  X = Ar([k, A]),
                  $ = Math.cos(F - Y) * X;
                if (_[0])
                  if (_[1]) {
                    var q = 2 * _[0] * C,
                      L = 2 * _[1] * D,
                      V = Ar([q + N[0], L + N[1]]) - Ar([q, L]),
                      W = Wt([0, 0], [w, 1]);
                    (k = Math.cos(W) * V), (A = Math.sin(W) * V);
                  } else A = (k = $) * w;
                else k = (A = $) / w;
              } else if (!I) {
                var H = nr(T);
                C || (N[0] < 0 ? (H[0] = -1) : N[0] > 0 && (H[0] = 1)),
                  D || (N[1] < 0 ? (H[1] = -1) : N[1] > 0 && (H[1] = 1)),
                  (T = H),
                  (k = (_ = H)[0] * N[0]),
                  (A = _[1] * N[1]);
              }
            }
            var U = _[0] || I ? Math.max(C + k, cr) : C,
              Z = _[1] || I ? Math.max(D + A, cr) : D;
            I && C && D && (M ? (Z = U / w) : (U = Z * w));
            var K = [0, 0];
            if (
              (s ||
                (K = (function (t, n, e, r, i, o, a) {
                  if (!yo(t, "resizable")) return [0, 0];
                  var s = t.state,
                    u = s.allMatrix,
                    l = s.is3d;
                  return Go(
                    t,
                    function (t, o) {
                      return So(u, n + t, e + o, i, r, l);
                    },
                    n,
                    e,
                    r,
                    i,
                    o,
                    a
                  );
                })(t, U, Z, T, j, d, r)),
              p && (!p[0] && (K[0] = 0), !p[1] && (K[1] = 0)),
              I)
            ) {
              _[0] &&
                _[1] &&
                K[0] &&
                K[1] &&
                (Math.abs(K[0]) > Math.abs(K[1]) ? (K[1] = 0) : (K[0] = 0));
              var J = !K[0] && !K[1];
              J && (M ? (U = Wr(U, P)) : (Z = Wr(Z, P))),
                (_[0] && !_[1]) || (K[0] && !K[1]) || (J && M)
                  ? (Z = (U += K[0]) / w)
                  : ((!_[0] && _[1]) || (!K[0] && K[1]) || (J && !M)) &&
                    (U = (Z += K[1]) * w);
            } else
              C + k < -B && (K[0] = 0),
                C + A < -B && (K[1] = 0),
                (U += K[0]),
                (Z += K[1]),
                K[0] || (U = Wr(U, P)),
                K[1] || (Z = Wr(Z, P));
            (U = (e = Lt([U, Z], E, S, I))[0]), (Z = e[1]);
            var Q = [
              (k = (U = Math.round(U)) - C) - x,
              (A = (Z = Math.round(Z)) - D) - y,
            ];
            (r.prevWidth = k), (r.prevHeight = A);
            var tt = Xi(t, U, Z, g, j, v);
            if (
              z ||
              !Q.every(function (t) {
                return !t;
              }) ||
              !tt.every(function (t) {
                return !t;
              })
            ) {
              var nt = Zr(t, n, {
                width: m + k,
                height: b + A,
                offsetWidth: U,
                offsetHeight: Z,
                direction: T,
                dist: [k, A],
                delta: Q,
                isPinch: !!s,
                drag: Lo.drag(t, gi(n, t.state, tt, !!s, !1)),
              });
              return Jr(t, "onResize", nt), nt;
            }
          }
        },
        dragControlAfter: function (t, n) {
          var e = n.datas,
            r = e.isResize,
            i = e.startOffsetWidth,
            o = e.startOffsetHeight,
            a = e.prevWidth,
            s = e.prevHeight;
          if (r) {
            var u = t.state,
              l = u.width - (i + a),
              c = u.height - (o + s),
              f = Math.abs(l) > 3,
              p = Math.abs(c) > 3;
            return (
              f &&
                ((e.startWidth += l),
                (e.startOffsetWidth += l),
                (e.prevWidth += l)),
              p &&
                ((e.startHeight += c),
                (e.startOffsetHeight += c),
                (e.prevHeight += c)),
              f || p ? (this.dragControl(t, n), !0) : void 0
            );
          }
        },
        dragControlEnd: function (t, n) {
          var e = n.datas,
            r = n.isDrag;
          return (
            !!e.isResize &&
            ((e.isResize = !1), Jr(t, "onResizeEnd", Kr(t, n, {})), r)
          );
        },
        dragGroupControlCondition: ci,
        dragGroupControlStart: function (t, n) {
          var e = n.datas,
            r = this.dragControlStart(t, n);
          if (!r) return !1;
          var i = bi(t, "resizable", n);
          function o(n, r) {
            var i = e.fixedDirection,
              o = e.fixedPosition,
              a = $i(n, i),
              s = te(
                ue((-t.rotation / 180) * Math.PI, 3),
                [a[0] - o[0], a[1] - o[1], 1],
                3
              ),
              u = s[0],
              l = s[1];
            return (r.datas.originalX = u), (r.datas.originalY = l), r;
          }
          var a = yi(t, this, "dragControlStart", n, function (t, n) {
              return o(t, n);
            }),
            s = tr(tr({}, r), {
              targets: t.props.targets,
              events: a,
              setFixedDirection: function (n) {
                r.setFixedDirection(n),
                  a.forEach(function (e, r) {
                    e.setFixedDirection(n), o(t.moveables[r], i[r]);
                  });
              },
            }),
            u = Jr(t, "onResizeGroupStart", s);
          return (e.isResize = !1 !== u), !!e.isResize && r;
        },
        dragGroupControl: function (t, n) {
          var e = n.datas;
          if (e.isResize) {
            var r = this.dragControl(t, n);
            if (r) {
              var i = r.offsetWidth,
                o = r.offsetHeight,
                a = r.dist,
                s = t.props.keepRatio,
                u = [i / (i - a[0]), o / (o - a[1])],
                l = e.fixedPosition,
                c = yi(t, this, "dragControl", n, function (n, e) {
                  var r = te(
                      ue((t.rotation / 180) * Math.PI, 3),
                      [e.datas.originalX * u[0], e.datas.originalY * u[1], 1],
                      3
                    ),
                    i = r[0],
                    o = r[1];
                  return tr(tr({}, e), {
                    parentDist: null,
                    parentScale: u,
                    dragClient: Kn(l, [i, o]),
                    parentKeepRatio: s,
                  });
                }),
                f = tr({ targets: t.props.targets, events: c }, r);
              return Jr(t, "onResizeGroup", f), f;
            }
          }
        },
        dragGroupControlEnd: function (t, n) {
          var e = n.isDrag;
          if (n.datas.isResize)
            return (
              this.dragControlEnd(t, n),
              yi(t, this, "dragControlEnd", n),
              Jr(t, "onResizeGroupEnd", Kr(t, n, { targets: t.props.targets })),
              e
            );
        },
        request: function (t) {
          var n = {},
            e = 0,
            r = 0,
            i = t.getRect();
          return {
            isControl: !0,
            requestStart: function (t) {
              return { datas: n, parentDirection: t.direction || [1, 1] };
            },
            request: function (t) {
              return (
                "offsetWidth" in t
                  ? (e = t.offsetWidth - i.offsetWidth)
                  : "deltaWidth" in t && (e += t.deltaWidth),
                "offsetHeight" in t
                  ? (r = t.offsetHeight - i.offsetHeight)
                  : "deltaHeight" in t && (r += t.deltaHeight),
                { datas: n, parentDist: [e, r] }
              );
            },
            requestEnd: function () {
              return { datas: n, isDrag: !0 };
            },
          };
        },
      },
      ra = {
        name: "scalable",
        ableGroup: "size",
        canPinch: !0,
        props: {
          scalable: Boolean,
          throttleScale: Number,
          renderDirections: String,
          keepRatio: Boolean,
        },
        events: {
          onScaleStart: "scaleStart",
          onScale: "scale",
          onScaleEnd: "scaleEnd",
          onScaleGroupStart: "scaleGroupStart",
          onScaleGroup: "scaleGroup",
          onScaleGroupEnd: "scaleGroupEnd",
        },
        render: function (t, n) {
          var e = t.props,
            r = e.resizable,
            i = e.scalable,
            o = e.edge;
          if (!r && i) return o ? Uo(t, n) : Ho(t, n);
        },
        dragControlCondition: ci,
        dragControlStart: function (t, n) {
          var e = n.datas,
            r = n.isPinch,
            i = n.inputEvent,
            o = n.parentDirection || (r ? [0, 0] : qr(i.target)),
            a = t.state,
            s = a.width,
            u = a.height,
            l = a.targetTransform,
            c = a.target,
            f = a.pos1,
            p = a.pos2,
            d = a.pos4;
          if (!o || !c) return !1;
          r || Si(t, n),
            ki(n),
            (e.datas = {}),
            (e.transform = l),
            (e.prevDist = [1, 1]),
            (e.direction = o),
            (e.width = s),
            (e.height = u),
            (e.startValue = [1, 1]);
          var h = (!o[0] && !o[1]) || o[0] || !o[1];
          function v(t) {
            e.ratio = t && isFinite(t) ? t : 0;
          }
          function g(n) {
            (e.fixedDirection = n), (e.fixedPosition = $i(t, n));
          }
          (e.isWidth = h), v(Ut(f, p) / Ut(p, d)), g([-o[0], -o[1]]);
          var m = Zr(
            t,
            n,
            tr(
              tr(
                {
                  direction: o,
                  set: function (t) {
                    e.startValue = t;
                  },
                  setRatio: v,
                  setFixedDirection: g,
                },
                _i(n)
              ),
              { dragStart: Lo.dragStart(t, new mi().dragStart([0, 0], n)) }
            )
          );
          return (
            !1 !== Jr(t, "onScaleStart", m) &&
              ((e.isScale = !0),
              (t.state.snapRenderInfo = { request: n.isRequest, direction: o })),
            !!e.isScale && m
          );
        },
        dragControl: function (t, n) {
          wi(n, "scale");
          var e = n.datas,
            r = n.distX,
            i = n.distY,
            o = n.parentScale,
            a = n.parentDistance,
            s = n.parentKeepRatio,
            u = n.parentFlag,
            l = n.isPinch,
            c = n.dragClient,
            f = n.parentDist,
            p = n.isRequest,
            d = e.prevDist,
            h = e.direction,
            v = e.width,
            g = e.height,
            m = e.isScale,
            b = e.startValue,
            x = e.isWidth,
            y = e.ratio,
            E = e.fixedDirection;
          if (!m) return !1;
          var S = t.props,
            w = S.throttleScale,
            M = S.parentMoveable,
            C = h;
          h[0] || h[1] || (C = [1, 1]);
          var D = y && (t.props.keepRatio || s),
            R = t.state,
            O = 1,
            P = 1,
            z = c;
          if ((c || (z = !u && l ? $i(t, [0, 0]) : e.fixedPosition), f))
            (O = (v + f[0]) / v), (P = (g + f[1]) / g);
          else if (o) (O = o[0]), (P = o[1]);
          else if (l) a && ((O = (v + a) / v), (P = (g + (a * g) / v) / g));
          else {
            var G = Oi({ datas: e, distX: r, distY: i }),
              B = C[0] * G[0],
              T = C[1] * G[1];
            if (D && v && g) {
              var _ = Wt([0, 0], G),
                k = Wt([0, 0], C),
                A = Ar([B, T]),
                I = Math.cos(_ - k) * A;
              C[0] ? (T = C[1] ? B * y : (B = I) * y) : (B = (T = I) / y);
            }
            (O = (v + B) / v), (P = (g + T) / g);
          }
          (O = C[0] || D ? O * b[0] : b[0]),
            (P = C[1] || D ? P * b[1] : b[1]),
            0 === O && (O = (d[0] > 0 ? 1 : -1) * fr),
            0 === P && (P = (d[1] > 0 ? 1 : -1) * fr);
          var j = [O / b[0], P / b[1]],
            N = [O, P];
          if (!l && t.props.groupable) {
            var F = (R.snapRenderInfo || {}).direction;
            Ot(F) &&
              (F[0] || F[1]) &&
              (R.snapRenderInfo = { direction: h, request: n.isRequest });
          }
          var Y = [0, 0];
          if ((l || (Y = To(t, j, h, p, e)), D)) {
            C[0] &&
              C[1] &&
              Y[0] &&
              Y[1] &&
              (Math.abs(Y[0]) > Math.abs(Y[1]) ? (Y[1] = 0) : (Y[0] = 0));
            var X = !Y[0] && !Y[1];
            if (
              (X &&
                (x
                  ? (j[0] = Wr(j[0] * b[0], w) / b[0])
                  : (j[1] = Wr(j[1] * b[1], w) / b[1])),
              (C[0] && !C[1]) || (Y[0] && !Y[1]) || (X && x))
            ) {
              j[0] += Y[0];
              var $ = (v * j[0] * b[0]) / y;
              j[1] = $ / g / b[1];
            } else if ((!C[0] && C[1]) || (!Y[0] && Y[1]) || (X && !x)) {
              j[1] += Y[1];
              var q = g * j[1] * b[1] * y;
              j[0] = q / v / b[0];
            }
          } else
            (j[0] += Y[0]),
              (j[1] += Y[1]),
              Y[0] || (j[0] = Wr(j[0] * b[0], w) / b[0]),
              Y[1] || (j[1] = Wr(j[1] * b[1], w) / b[1]);
          0 === j[0] && (j[0] = (d[0] > 0 ? 1 : -1) * fr),
            0 === j[1] && (j[1] = (d[1] > 0 ? 1 : -1) * fr);
          var L,
            V,
            W = [j[0] / d[0], j[1] / d[1]];
          (V = b), (N = [(L = j)[0] * V[0], L[1] * V[1]]);
          var H = (function (t, n, e, r, i) {
              return Ni(t, "scale(" + n.join(", ") + ")", e, r, i);
            })(t, j, E, z, e),
            U = Jn(H, e.prevInverseDist || [0, 0]);
          if (
            ((e.prevDist = j),
            (e.prevInverseDist = H),
            O === d[0] &&
              P === d[1] &&
              U.every(function (t) {
                return !t;
              }) &&
              !M)
          )
            return !1;
          var Z = Mi(
              e,
              "scale(" + N.join(", ") + ")",
              "scale(" + j.join(", ") + ")"
            ),
            K = Zr(
              t,
              n,
              tr(
                {
                  offsetWidth: v,
                  offsetHeight: g,
                  direction: h,
                  scale: N,
                  dist: j,
                  delta: W,
                  isPinch: !!l,
                },
                ji(t, Z, U, l, n)
              )
            );
          return Jr(t, "onScale", K), K;
        },
        dragControlEnd: function (t, n) {
          var e = n.datas,
            r = n.isDrag;
          return (
            !!e.isScale &&
            ((e.isScale = !1), Jr(t, "onScaleEnd", Kr(t, n, {})), r)
          );
        },
        dragGroupControlCondition: ci,
        dragGroupControlStart: function (t, n) {
          var e = n.datas,
            r = this.dragControlStart(t, n);
          if (!r) return !1;
          var i = bi(t, "resizable", n);
          function o(n, r) {
            var i = e.fixedDirection,
              o = e.fixedPosition,
              a = $i(n, i),
              s = te(
                ue((-t.rotation / 180) * Math.PI, 3),
                [a[0] - o[0], a[1] - o[1], 1],
                3
              ),
              u = s[0],
              l = s[1];
            return (r.datas.originalX = u), (r.datas.originalY = l), r;
          }
          e.moveableScale = t.scale;
          var a = yi(t, this, "dragControlStart", n, function (t, n) {
              return o(t, n);
            }),
            s = tr(tr({}, r), {
              targets: t.props.targets,
              events: a,
              setFixedDirection: function (n) {
                r.setFixedDirection(n),
                  a.forEach(function (e, r) {
                    e.setFixedDirection(n), o(t.moveables[r], i[r]);
                  });
              },
            }),
            u = Jr(t, "onScaleGroupStart", s);
          return (e.isScale = !1 !== u), !!e.isScale && s;
        },
        dragGroupControl: function (t, n) {
          var e = n.datas;
          if (e.isScale) {
            var r = this.dragControl(t, n);
            if (r) {
              var i = e.moveableScale;
              t.scale = [r.scale[0] * i[0], r.scale[1] * i[1]];
              var o = t.props.keepRatio,
                a = r.dist,
                s = r.scale,
                u = e.fixedPosition,
                l = yi(t, this, "dragControl", n, function (n, e) {
                  var r = te(
                      ue((t.rotation / 180) * Math.PI, 3),
                      [e.datas.originalX * a[0], e.datas.originalY * a[1], 1],
                      3
                    ),
                    i = r[0],
                    l = r[1];
                  return tr(tr({}, e), {
                    parentDist: null,
                    parentScale: s,
                    parentKeepRatio: o,
                    dragClient: Kn(u, [i, l]),
                  });
                }),
                c = tr({ targets: t.props.targets, events: l }, r);
              return Jr(t, "onScaleGroup", c), c;
            }
          }
        },
        dragGroupControlEnd: function (t, n) {
          var e = n.isDrag;
          if (n.datas.isScale)
            return (
              this.dragControlEnd(t, n),
              yi(t, this, "dragControlEnd", n),
              Jr(t, "onScaleGroupEnd", Kr(t, n, { targets: t.props.targets })),
              e
            );
        },
        request: function () {
          var t = {},
            n = 0,
            e = 0;
          return {
            isControl: !0,
            requestStart: function (n) {
              return { datas: t, parentDirection: n.direction || [1, 1] };
            },
            request: function (r) {
              return (
                (n += r.deltaWidth),
                (e += r.deltaHeight),
                { datas: t, parentDist: [n, e] }
              );
            },
            requestEnd: function () {
              return { datas: t, isDrag: !0 };
            },
          };
        },
      };
    function ia(t, n) {
      return t.map(function (t, e) {
        return (r = t), (i = n[e]), (r * (a = 2) + i * (o = 1)) / (o + a);
        var r, i, o, a;
      });
    }
    function oa(t, n, e) {
      var r = Wt(t, n),
        i = Wt(t, e) - r;
      return i >= 0 ? i : i + 2 * Math.PI;
    }
    var aa = {
        name: "warpable",
        ableGroup: "size",
        props: { warpable: Boolean, renderDirections: Array },
        events: {
          onWarpStart: "warpStart",
          onWarp: "warp",
          onWarpEnd: "warpEnd",
        },
        render: function (t, n) {
          var e = t.props,
            r = e.resizable,
            i = e.scalable,
            o = e.warpable,
            a = e.zoom;
          if (r || i || !o) return [];
          var s = t.state,
            u = s.pos1,
            l = s.pos2,
            c = s.pos3,
            f = s.pos4,
            p = ia(u, l),
            d = ia(l, u),
            h = ia(u, c),
            v = ia(c, u),
            g = ia(c, f),
            m = ia(f, c),
            b = ia(l, f),
            x = ia(f, l);
          return nr(
            [
              n.createElement("div", {
                className: br("line"),
                key: "middeLine1",
                style: jr(p, g, a),
              }),
              n.createElement("div", {
                className: br("line"),
                key: "middeLine2",
                style: jr(d, m, a),
              }),
              n.createElement("div", {
                className: br("line"),
                key: "middeLine3",
                style: jr(h, b, a),
              }),
              n.createElement("div", {
                className: br("line"),
                key: "middeLine4",
                style: jr(v, x, a),
              }),
            ],
            Ho(t, n)
          );
        },
        dragControlCondition: function (t) {
          return !t.isRequest && Zt(t.inputEvent.target, br("direction"));
        },
        dragControlStart: function (t, n) {
          var e = n.datas,
            r = n.inputEvent,
            i = t.props.target,
            o = qr(r.target);
          if (!o || !i) return !1;
          var a = t.state,
            s = a.transformOrigin,
            u = a.is3d,
            l = a.targetTransform,
            c = a.targetMatrix,
            f = a.width,
            p = a.height,
            d = a.left,
            h = a.top;
          return (
            (e.datas = {}),
            (e.targetTransform = l),
            (e.warpTargetMatrix = u ? c : Hn(c, 3, 4)),
            (e.targetInverseMatrix = Ln(Vn(e.warpTargetMatrix, 4), 3, 4)),
            (e.direction = o),
            (e.left = d),
            (e.top = h),
            Si(t, n),
            ki(n),
            (e.poses = [
              [0, 0],
              [f, 0],
              [0, p],
              [f, p],
            ].map(function (t) {
              return Jn(t, s);
            })),
            (e.nextPoses = e.poses.map(function (t) {
              var n = t[0],
                r = t[1];
              return te(e.warpTargetMatrix, [n, r, 0, 1], 4);
            })),
            (e.startValue = le(4)),
            (e.prevMatrix = le(4)),
            (e.absolutePoses = Vr(a)),
            (e.posIndexes = Pi(o)),
            (a.snapRenderInfo = { request: n.isRequest, direction: o }),
            !1 !==
              Jr(
                t,
                "onWarpStart",
                Zr(
                  t,
                  n,
                  tr(
                    {
                      set: function (t) {
                        e.startValue = t;
                      },
                    },
                    _i(n)
                  )
                )
              ) && (e.isWarp = !0),
            e.isWarp
          );
        },
        dragControl: function (t, n) {
          var e = n.datas,
            r = n.isRequest,
            i = n.distX,
            o = n.distY,
            a = e.targetInverseMatrix,
            s = e.prevMatrix,
            u = e.isWarp,
            l = e.startValue,
            c = e.poses,
            f = e.posIndexes,
            p = e.absolutePoses;
          if (!u) return !1;
          if ((wi(n, "matrix3d"), yo(t, "warpable"))) {
            var d = f.map(function (t) {
              return p[t];
            });
            d.length > 1 &&
              d.push([(d[0][0] + d[1][0]) / 2, (d[0][1] + d[1][1]) / 2]);
            var h = Do(
                t,
                r,
                d.map(function (t) {
                  return [t[0] + i, t[1] + o];
                })
              ),
              v = h.horizontal,
              g = h.vertical;
            (o -= v.offset), (i -= g.offset);
          }
          var m = Oi({ datas: e, distX: i, distY: o }, !0),
            b = e.nextPoses.slice();
          if (
            (f.forEach(function (t) {
              b[t] = Kn(b[t], m);
            }),
            !lr.every(function (t) {
              return (
                (n = t.map(function (t) {
                  return c[t];
                })),
                (e = t.map(function (t) {
                  return b[t];
                })),
                (r = oa(n[0], n[1], n[2])),
                (i = oa(e[0], e[1], e[2])),
                (o = Math.PI),
                !((r >= o && i <= o) || (r <= o && i >= o))
              );
              var n, e, r, i, o;
            }))
          )
            return !1;
          var x = pe(c[0], c[2], c[1], c[3], b[0], b[2], b[1], b[3]);
          if (!x.length) return !1;
          var y = Di(e, Zn(a, x, 4), !0),
            E = Zn(Vn(s, 4), y, 4);
          e.prevMatrix = y;
          var S = Zn(l, y, 4),
            w = Mi(
              e,
              "matrix3d(" + S.join(", ") + ")",
              "matrix3d(" + y.join(", ") + ")"
            );
          return (
            Ii(n, w),
            Jr(
              t,
              "onWarp",
              Zr(t, n, {
                delta: E,
                matrix: S,
                dist: y,
                multiply: Zn,
                transform: w,
              })
            ),
            !0
          );
        },
        dragControlEnd: function (t, n) {
          var e = n.datas,
            r = n.isDrag;
          return (
            !!e.isWarp && ((e.isWarp = !1), Jr(t, "onWarpEnd", Kr(t, n, {})), r)
          );
        },
      },
      sa = br("area-pieces"),
      ua = br("area-piece"),
      la = br("avoid");
    function ca(t) {
      var n = t.areaElement,
        e = t.state,
        r = e.width,
        i = e.height;
      !(function (t, n) {
        if (t.classList) t.classList.remove(n);
        else {
          var e = new RegExp("(\\s|^)" + n + "(\\s|$)");
          t.className = t.className.replace(e, " ");
        }
      })(n, la),
        (n.style.cssText +=
          "left: 0px; top: 0px; width: " + r + "px; height: " + i + "px");
    }
    function fa(t) {
      return t.createElement(
        "div",
        { key: "area_pieces", className: sa },
        t.createElement("div", { className: ua }),
        t.createElement("div", { className: ua }),
        t.createElement("div", { className: ua }),
        t.createElement("div", { className: ua })
      );
    }
    var pa = {
        name: "dragArea",
        props: { dragArea: Boolean, passDragArea: Boolean },
        events: { onClick: "click", onClickGroup: "clickGroup" },
        render: function (t, n) {
          var e = t.props,
            r = e.target,
            i = e.dragArea,
            o = e.groupable,
            a = e.passDragArea,
            s = t.state,
            u = s.width,
            l = s.height,
            c = s.renderPoses,
            f = a ? br("area", "pass") : br("area");
          if (o)
            return [
              n.createElement("div", {
                key: "area",
                ref: dt(t, "areaElement"),
                className: f,
              }),
              fa(n),
            ];
          if (!r || !i) return [];
          var p = pe([0, 0], [u, 0], [0, l], [u, l], c[0], c[1], c[2], c[3]),
            d = p.length ? Or(p, !0) : "none";
          return [
            n.createElement("div", {
              key: "area",
              ref: dt(t, "areaElement"),
              className: f,
              style: {
                top: "0px",
                left: "0px",
                width: u + "px",
                height: l + "px",
                transformOrigin: "0 0",
                transform: d,
              },
            }),
            fa(n),
          ];
        },
        dragStart: function (t, n) {
          var e = n.datas,
            r = n.clientX,
            i = n.clientY;
          if (!n.inputEvent) return !1;
          e.isDragArea = !1;
          var o = t.areaElement,
            a = t.state,
            s = a.moveableClientRect,
            u = a.renderPoses,
            l = a.rootMatrix,
            c = a.is3d,
            f = s.left,
            p = s.top,
            d = Tr(u),
            h = d.left,
            v = d.top,
            g = d.width,
            m = d.height,
            b = oi(l, [r - f, i - p], c ? 4 : 3),
            x = b[0],
            y = b[1],
            E = [
              { left: h, top: v, width: g, height: (y -= v) - 10 },
              { left: h, top: v, width: (x -= h) - 10, height: m },
              { left: h, top: v + y + 10, width: g, height: m - y - 10 },
              { left: h + x + 10, top: v, width: g - x - 10, height: m },
            ],
            S = [].slice.call(o.nextElementSibling.children);
          E.forEach(function (t, n) {
            S[n].style.cssText =
              "left: " +
              t.left +
              "px;top: " +
              t.top +
              "px; width: " +
              t.width +
              "px; height: " +
              t.height +
              "px;";
          }),
            (function (t, n) {
              t.classList ? t.classList.add(n) : (t.className += " " + n);
            })(o, la);
        },
        drag: function (t, n) {
          var e = n.datas;
          if (!n.inputEvent) return !1;
          e.isDragArea || ((e.isDragArea = !0), ca(t));
        },
        dragEnd: function (t, n) {
          var e = n.inputEvent,
            r = n.datas;
          if (!e) return !1;
          r.isDragArea || ca(t);
        },
        dragGroupStart: function (t, n) {
          return this.dragStart(t, n);
        },
        dragGroup: function (t, n) {
          return this.drag(t, n);
        },
        dragGroupEnd: function (t, n) {
          return this.dragEnd(t, n);
        },
        unset: function (t) {
          ca(t);
        },
      },
      da = {
        name: "origin",
        props: { origin: Boolean },
        events: {},
        render: function (t, n) {
          var e = t.props.zoom,
            r = t.state,
            i = r.beforeOrigin,
            o = r.rotation;
          return [
            n.createElement("div", {
              className: br("control", "origin"),
              style: Nr(o, e, i),
              key: "beforeOrigin",
            }),
          ];
        },
      };
    function ha(t) {
      var n = t.scrollContainer;
      return [n.scrollLeft, n.scrollTop];
    }
    var va = {
        name: "scrollable",
        canPinch: !0,
        props: {
          scrollable: Boolean,
          scrollContainer: Object,
          scrollThreshold: Number,
          getScrollPosition: Function,
        },
        events: { onScroll: "scroll", onScrollGroup: "scrollGroup" },
        dragStart: function (t, n) {
          var e = t.props.scrollContainer,
            r = void 0 === e ? t.getContainer() : e,
            i = new Be(),
            o = pi(r, !0);
          n.datas.dragScroll = i;
          var a = n.isControl ? "controlGesto" : "targetGesto",
            s = n.targets;
          i
            .on("scroll", function (e) {
              var r = e.container,
                i = e.direction,
                o = Zr(t, n, { scrollContainer: r, direction: i }),
                a = s ? "onScrollGroup" : "onScroll";
              s && (o.targets = s), Jr(t, a, o);
            })
            .on("move", function (e) {
              var r = e.offsetX,
                i = e.offsetY;
              t[a].scrollBy(r, i, n.inputEvent, !1);
            }),
            i.dragStart(n, { container: o });
        },
        checkScroll: function (t, n) {
          var e = n.datas.dragScroll;
          if (e) {
            var r = t.props,
              i = r.scrollContainer,
              o = void 0 === i ? t.getContainer() : i,
              a = r.scrollThreshold,
              s = void 0 === a ? 0 : a,
              u = r.getScrollPosition,
              l = void 0 === u ? ha : u;
            return (
              e.drag(n, {
                container: o,
                threshold: s,
                getScrollPosition: function (t) {
                  return l({
                    scrollContainer: t.container,
                    direction: t.direction,
                  });
                },
              }),
              !0
            );
          }
        },
        drag: function (t, n) {
          return this.checkScroll(t, n);
        },
        dragEnd: function (t, n) {
          n.datas.dragScroll.dragEnd(), (n.datas.dragScroll = null);
        },
        dragControlStart: function (t, n) {
          return this.dragStart(t, tr(tr({}, n), { isControl: !0 }));
        },
        dragControl: function (t, n) {
          return this.drag(t, n);
        },
        dragControlEnd: function (t, n) {
          return this.dragEnd(t, n);
        },
        dragGroupStart: function (t, n) {
          return this.dragStart(t, tr(tr({}, n), { targets: t.props.targets }));
        },
        dragGroup: function (t, n) {
          return this.drag(t, tr(tr({}, n), { targets: t.props.targets }));
        },
        dragGroupEnd: function (t, n) {
          return this.dragEnd(t, tr(tr({}, n), { targets: t.props.targets }));
        },
        dragGroupControlStart: function (t, n) {
          return this.dragStart(
            t,
            tr(tr({}, n), { targets: t.props.targets, isControl: !0 })
          );
        },
        dragGroupContro: function (t, n) {
          return this.drag(t, tr(tr({}, n), { targets: t.props.targets }));
        },
        dragGroupControEnd: function (t, n) {
          return this.dragEnd(t, tr(tr({}, n), { targets: t.props.targets }));
        },
      },
      ga = {
        name: "",
        props: {
          target: Object,
          dragTarget: Object,
          container: Object,
          portalContainer: Object,
          rootContainer: Object,
          zoom: Number,
          transformOrigin: Array,
          edge: Boolean,
          ables: Array,
          className: String,
          pinchThreshold: Number,
          pinchOutside: Boolean,
          triggerAblesSimultaneously: Boolean,
          checkInput: Boolean,
          cspNonce: String,
          translateZ: Number,
          props: Object,
        },
        events: {},
      },
      ma = {
        name: "padding",
        props: { padding: Object },
        events: {},
        render: function (t, n) {
          var e = t.props;
          if (e.dragArea) return [];
          var r = e.padding || {},
            i = r.left,
            o = void 0 === i ? 0 : i,
            a = r.top,
            s = void 0 === a ? 0 : a,
            u = r.right,
            l = void 0 === u ? 0 : u,
            c = r.bottom,
            f = void 0 === c ? 0 : c,
            p = t.state,
            d = p.renderPoses,
            h = [p.pos1, p.pos2, p.pos3, p.pos4],
            v = [];
          return (
            o > 0 && v.push([0, 2]),
            s > 0 && v.push([0, 1]),
            l > 0 && v.push([1, 3]),
            f > 0 && v.push([2, 3]),
            v.map(function (t, e) {
              var r = t[0],
                i = t[1],
                o = pe(
                  [0, 0],
                  [100, 0],
                  [0, 100],
                  [100, 100],
                  h[r],
                  h[i],
                  d[r],
                  d[i]
                );
              if (o.length)
                return n.createElement("div", {
                  key: "padding" + e,
                  className: br("padding"),
                  style: { transform: Or(o, !0) },
                });
            })
          );
        },
      },
      ba = ["nw", "ne", "se", "sw"];
    function xa(t, n) {
      var e = t[0] + t[1],
        r = e > n ? n / e : 1;
      return (t[0] *= r), (t[1] = n - t[1] * r), t;
    }
    var ya = [1, 2, 5, 6],
      Ea = [0, 3, 4, 7],
      Sa = [1, -1, -1, 1],
      wa = [1, 1, -1, -1];
    function Ma(t, n, e, r, i, o, a, s, u) {
      void 0 === o && (o = 0),
        void 0 === a && (a = 0),
        void 0 === s && (s = r),
        void 0 === u && (u = i);
      var l = [],
        c = !1,
        f = t.map(function (t, f) {
          var p = n[f],
            d = p.horizontal,
            h = p.vertical;
          if ((h && !c && ((c = !0), l.push("/")), c)) {
            var v = Math.max(0, 1 === h ? t[1] - a : u - t[1]);
            return l.push(ui(v, i, e)), v;
          }
          v = Math.max(0, 1 === d ? t[0] - o : s - t[0]);
          return l.push(ui(v, r, e)), v;
        });
      return { styles: l, raws: f };
    }
    function Ca(t) {
      for (var n = [0, 0], e = [0, 0], r = t.length, i = 0; i < r; ++i) {
        var o = t[i];
        o.sub &&
          (o.horizontal &&
            (0 === n[1] && (n[0] = i), (n[1] = i - n[0] + 1), (e[0] = i + 1)),
          o.vertical && (0 === e[1] && (e[0] = i), (e[1] = i - e[0] + 1)));
      }
      return { horizontalRange: n, verticalRange: e };
    }
    function Da(t, n, e, r, i, o) {
      var a, s, u, l;
      void 0 === o && (o = [0, 0]);
      var c = t.indexOf("/"),
        f = (c > -1 ? t.slice(0, c) : t).length,
        p = t.slice(0, f),
        d = t.slice(f + 1),
        h = p[0],
        v = void 0 === h ? "0px" : h,
        g = p[1],
        m = void 0 === g ? v : g,
        b = p[2],
        x = void 0 === b ? v : b,
        y = p[3],
        E = void 0 === y ? m : y,
        S = d[0],
        w = void 0 === S ? v : S,
        M = d[1],
        C = void 0 === M ? w : M,
        D = d[2],
        R = void 0 === D ? w : D,
        O = d[3],
        P = void 0 === O ? C : O,
        z = [v, m, x, E].map(function (t) {
          return Xt(t, n);
        }),
        G = [w, C, R, P].map(function (t) {
          return Xt(t, e);
        }),
        B = z.slice(),
        T = G.slice();
      (a = xa([B[0], B[1]], n)),
        (B[0] = a[0]),
        (B[1] = a[1]),
        (s = xa([B[3], B[2]], n)),
        (B[3] = s[0]),
        (B[2] = s[1]),
        (u = xa([T[0], T[3]], e)),
        (T[0] = u[0]),
        (T[3] = u[1]),
        (l = xa([T[1], T[2]], e)),
        (T[1] = l[0]),
        (T[2] = l[1]);
      var _ = B.slice(0, Math.max(o[0], p.length)),
        k = T.slice(0, Math.max(o[1], d.length));
      return nr(
        _.map(function (t, n) {
          var o = ba[n];
          return {
            horizontal: Sa[n],
            vertical: 0,
            pos: [r + t, i + (-1 === wa[n] ? e : 0)],
            sub: !0,
            raw: z[n],
            direction: o,
          };
        }),
        k.map(function (t, e) {
          var o = ba[e];
          return {
            horizontal: 0,
            vertical: wa[e],
            pos: [r + (-1 === Sa[e] ? n : 0), i + t],
            sub: !0,
            raw: G[e],
            direction: o,
          };
        })
      );
    }
    function Ra(t, n, e, r, i) {
      void 0 === i && (i = n.length);
      var o = Ca(t.slice(r)),
        a = o.horizontalRange,
        s = o.verticalRange,
        u = e - r,
        l = 0;
      if (0 === u) l = i;
      else if (u > 0 && u < a[1]) l = a[1] - u;
      else {
        if (!(u >= s[0])) return;
        l = s[0] + s[1] - u;
      }
      t.splice(e, l), n.splice(e, l);
    }
    function Oa(t, n, e, r, i, o, a, s, u, l, c) {
      void 0 === l && (l = 0), void 0 === c && (c = 0);
      var f = Ca(t.slice(e)),
        p = f.horizontalRange,
        d = f.verticalRange;
      if (r > -1)
        for (var h = 1 === Sa[r] ? o - l : s - o, v = p[1]; v <= r; ++v) {
          var g = 1 === wa[v] ? c : u,
            m = 0;
          if (
            (r === v
              ? (m = o)
              : 0 === v
              ? (m = l + h)
              : -1 === Sa[v] && (m = s - (n[e][0] - l)),
            t.splice(e + v, 0, { horizontal: Sa[v], vertical: 0, pos: [m, g] }),
            n.splice(e + v, 0, [m, g]),
            0 === v)
          )
            break;
        }
      else if (i > -1) {
        var b = 1 === wa[i] ? a - c : u - a;
        if (0 === p[1] && 0 === d[1]) {
          var x = [l + b, c];
          t.push({ horizontal: Sa[0], vertical: 0, pos: x }), n.push(x);
        }
        var y = d[0];
        for (v = d[1]; v <= i; ++v) {
          (m = 1 === Sa[v] ? l : s), (g = 0);
          if (
            (i === v
              ? (g = a)
              : 0 === v
              ? (g = c + b)
              : 1 === wa[v]
              ? (g = n[e + y][1])
              : -1 === wa[v] && (g = u - (n[e + y][1] - c)),
            t.push({ horizontal: 0, vertical: wa[v], pos: [m, g] }),
            n.push([m, g]),
            0 === v)
          )
            break;
        }
      }
    }
    function Pa(t, n) {
      return (
        void 0 === n &&
          (n = t.map(function (t) {
            return t.raw;
          })),
        {
          horizontals: t
            .map(function (t, e) {
              return t.horizontal ? n[e] : null;
            })
            .filter(function (t) {
              return null != t;
            }),
          verticals: t
            .map(function (t, e) {
              return t.vertical ? n[e] : null;
            })
            .filter(function (t) {
              return null != t;
            }),
        }
      );
    }
    var za = [
        [0, -1, "n"],
        [1, 0, "e"],
      ],
      Ga = [
        [-1, -1, "nw"],
        [0, -1, "n"],
        [1, -1, "ne"],
        [1, 0, "e"],
        [1, 1, "se"],
        [0, 1, "s"],
        [-1, 1, "sw"],
        [-1, 0, "w"],
      ];
    function Ba(t, n, e) {
      var r = t.props.clipRelative,
        i = t.state,
        o = i.width,
        a = i.height,
        s = n,
        u = s.type,
        l = s.poses,
        c = "rect" === u,
        f = "circle" === u;
      if ("polygon" === u)
        return e.map(function (t) {
          return ui(t[0], o, r) + " " + ui(t[1], a, r);
        });
      if (c || "inset" === u) {
        var p = e[1][1],
          d = e[3][0],
          h = e[7][0],
          v = e[5][1];
        if (c)
          return [p, d, v, h].map(function (t) {
            return t + "px";
          });
        var g = [p, o - d, a - v, h].map(function (t, n) {
          return ui(t, n % 2 ? o : a, r);
        });
        if (e.length > 8) {
          var m = Jn(e[4], e[0]),
            b = m[0],
            x = m[1];
          g.push.apply(
            g,
            nr(["round"], Ma(e.slice(8), l.slice(8), r, b, x, h, p, d, v).styles)
          );
        }
        return g;
      }
      if (f || "ellipse" === u) {
        var y = e[0],
          E = ui(
            Math.abs(e[1][1] - y[1]),
            f ? Math.sqrt((o * o + a * a) / 2) : a,
            r
          );
        return (
          (g = f ? [E] : [ui(Math.abs(e[2][0] - y[0]), o, r), E]).push(
            "at",
            ui(y[0], o, r),
            ui(y[1], a, r)
          ),
          g
        );
      }
    }
    function Ta(t, n, e, r) {
      var i = [r, (r + n) / 2, n],
        o = [t, (t + e) / 2, e];
      return Ga.map(function (t) {
        var n = t[0],
          e = t[1],
          r = t[2],
          a = i[n + 1],
          s = o[e + 1];
        return {
          vertical: Math.abs(e),
          horizontal: Math.abs(n),
          direction: r,
          pos: [a, s],
        };
      });
    }
    function _a(t, n, e, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p = i;
      if (!p) {
        var d = getComputedStyle(t),
          h = d.clipPath;
        p = "none" !== h ? h : d.clip;
      }
      if ((p && "none" !== p && "auto" !== p) || (p = r)) {
        var v = kt(p),
          g = v.prefix,
          m = void 0 === g ? p : g,
          b = v.value,
          x = void 0 === b ? "" : b,
          y = "circle" === m,
          E = " ";
        if ("polygon" === m)
          return (
            (E = ","),
            {
              type: m,
              clipText: p,
              poses: (G = (D = _t(x || "0% 0%, 100% 0%, 100% 100%, 0% 100%")).map(
                function (t) {
                  var r = t.split(" "),
                    i = r[0],
                    o = r[1];
                  return {
                    vertical: 1,
                    horizontal: 1,
                    pos: [Xt(i, n), Xt(o, e)],
                  };
                }
              )),
              splitter: E,
            }
          );
        if (y || "ellipse" === m) {
          var S = "",
            w = "",
            M = 0,
            C = 0,
            D = Tt(x);
          if (y) {
            var R;
            (R = void 0 === (o = D[0]) ? "50%" : o),
              (S = void 0 === (a = D[2]) ? "50%" : a),
              (w = void 0 === (s = D[3]) ? "50%" : s),
              (M = Xt(R, Math.sqrt((n * n + e * e) / 2))),
              (C = M);
          } else {
            var O, P;
            (O = void 0 === (u = D[0]) ? "50%" : u),
              (P = void 0 === (l = D[1]) ? "50%" : l),
              (S = void 0 === (c = D[3]) ? "50%" : c),
              (w = void 0 === (f = D[4]) ? "50%" : f),
              (M = Xt(O, n)),
              (C = Xt(P, e));
          }
          var z = [Xt(S, n), Xt(w, e)],
            G = nr(
              [{ vertical: 1, horizontal: 1, pos: z, direction: "nesw" }],
              za.slice(0, y ? 1 : 2).map(function (t) {
                return {
                  vertical: Math.abs(t[1]),
                  horizontal: t[0],
                  direction: t[2],
                  sub: !0,
                  pos: [z[0] + t[0] * M, z[1] + t[1] * C],
                };
              })
            );
          return {
            type: m,
            clipText: p,
            radiusX: M,
            radiusY: C,
            left: z[0] - M,
            top: z[1] - C,
            poses: G,
            splitter: E,
          };
        }
        if ("inset" === m) {
          var B = (D = Tt(x || "0 0 0 0")).indexOf("round"),
            T = (B > -1 ? D.slice(0, B) : D).length,
            _ = D.slice(T + 1),
            k = D.slice(0, T),
            A = k[0],
            I = k[1],
            j = void 0 === I ? A : I,
            N = k[2],
            F = void 0 === N ? A : N,
            Y = k[3],
            X = void 0 === Y ? j : Y,
            $ = [A, F].map(function (t) {
              return Xt(t, e);
            }),
            q = $[0],
            L = $[1],
            V = [X, j].map(function (t) {
              return Xt(t, n);
            }),
            W = V[0],
            H = V[1],
            U = n - H,
            Z = e - L,
            K = Da(_, U - W, Z - q, W, q);
          return {
            type: "inset",
            clipText: p,
            poses: (G = nr(Ta(q, U, Z, W), K)),
            top: q,
            left: W,
            right: U,
            bottom: Z,
            radius: _,
            splitter: E,
          };
        }
        if ("rect" === m) {
          E = ",";
          var J = (D = _t(x || "0px, " + n + "px, " + e + "px, 0px")).map(
            function (t) {
              return At(t).value;
            }
          );
          return {
            type: "rect",
            clipText: p,
            poses: (G = Ta((q = J[0]), (H = J[1]), (L = J[2]), (W = J[3]))),
            top: q,
            right: H,
            bottom: L,
            left: W,
            values: D,
            splitter: E,
          };
        }
      }
    }
    var ka = {
        name: "clippable",
        props: {
          clippable: Boolean,
          defaultClipPath: String,
          customClipPath: String,
          clipRelative: Boolean,
          clipArea: Boolean,
          dragWithClip: Boolean,
          clipTargetBounds: Boolean,
          clipVerticalGuidelines: Array,
          clipHorizontalGuidelines: Array,
          clipSnapThreshold: Boolean,
        },
        events: {
          onClipStart: "clipStart",
          onClip: "clip",
          onClipEnd: "clipEnd",
        },
        css: [
          ".control.clip-control {\n    background: #6d6;\n    cursor: pointer;\n}\n.control.clip-control.clip-radius {\n    background: #d66;\n}\n.line.clip-line {\n    background: #6e6;\n    cursor: move;\n    z-index: 1;\n}\n.clip-area {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.clip-ellipse {\n    position: absolute;\n    cursor: move;\n    border: 1px solid #6d6;\n    border: var(--zoompx) solid #6d6;\n    border-radius: 50%;\n    transform-origin: 0px 0px;\n}",
          ":host {\n    --bounds-color: #d66;\n}",
          ".guideline {\n    pointer-events: none;\n    z-index: 2;\n}",
          ".line.guideline.bounds {\n    background: #d66;\n    background: var(--bounds-color);\n}",
        ],
        render: function (t, n) {
          var e = t.props,
            r = e.customClipPath,
            i = e.defaultClipPath,
            o = e.clipArea,
            a = e.zoom,
            s = t.state,
            u = s.target,
            l = s.width,
            c = s.height,
            f = s.allMatrix,
            p = s.is3d,
            d = s.left,
            h = s.top,
            v = s.pos1,
            g = s.pos2,
            m = s.pos3,
            b = s.pos4,
            x = s.clipPathState,
            y = s.snapBoundInfos;
          if (!u) return [];
          var E = _a(u, l, c, i || "inset", x || r);
          if (!E) return [];
          var S = p ? 4 : 3,
            w = E.type,
            M = E.poses.map(function (t) {
              var n = Gr(f, t.pos, S);
              return [n[0] - d, n[1] - h];
            }),
            C = [],
            D = [],
            R = "rect" === w,
            O = "inset" === w,
            P = "polygon" === w;
          if (R || O || P) {
            var z = O ? M.slice(0, 8) : M;
            D = z.map(function (t, e) {
              var r = 0 === e ? z[z.length - 1] : z[e - 1],
                i = Wt(r, t),
                o = Ir(r, t);
              return n.createElement("div", {
                key: "clipLine" + e,
                className: br("line", "clip-line", "snap-control"),
                "data-clip-index": e,
                style: {
                  width: o + "px",
                  transform:
                    "translate(" +
                    r[0] +
                    "px, " +
                    r[1] +
                    "px) rotate(" +
                    i +
                    "rad) scaleY(" +
                    a +
                    ")",
                },
              });
            });
          }
          if (
            ((C = M.map(function (t, e) {
              return n.createElement("div", {
                key: "clipControl" + e,
                className: br("control", "clip-control", "snap-control"),
                "data-clip-index": e,
                style: {
                  transform:
                    "translate(" + t[0] + "px, " + t[1] + "px) scale(" + a + ")",
                },
              });
            })),
            O &&
              C.push.apply(
                C,
                M.slice(8).map(function (t, e) {
                  return n.createElement("div", {
                    key: "clipRadiusControl" + e,
                    className: br(
                      "control",
                      "clip-control",
                      "clip-radius",
                      "snap-control"
                    ),
                    "data-clip-index": 8 + e,
                    style: {
                      transform:
                        "translate(" +
                        t[0] +
                        "px, " +
                        t[1] +
                        "px) scale(" +
                        a +
                        ")",
                    },
                  });
                })
              ),
            "circle" === w || "ellipse" === w)
          ) {
            var G = E.left,
              B = E.top,
              T = E.radiusX,
              _ = E.radiusY,
              k = Jn(Gr(f, [G, B], S), Gr(f, [0, 0], S)),
              A = k[0],
              I = k[1],
              j = "none";
            if (!o) {
              for (
                var N = Math.max(10, T / 5, _ / 5), F = [], Y = 0;
                Y <= N;
                ++Y
              ) {
                var X = ((2 * Math.PI) / N) * Y;
                F.push([T + (T - a) * Math.cos(X), _ + (_ - a) * Math.sin(X)]);
              }
              F.push([T, -2]),
                F.push([-2, -2]),
                F.push([-2, 2 * _ + 2]),
                F.push([2 * T + 2, 2 * _ + 2]),
                F.push([2 * T + 2, -2]),
                F.push([T, -2]),
                (j =
                  "polygon(" +
                  F.map(function (t) {
                    return t[0] + "px " + t[1] + "px";
                  }).join(", ") +
                  ")");
            }
            C.push(
              n.createElement("div", {
                key: "clipEllipse",
                className: br("clip-ellipse", "snap-control"),
                style: {
                  width: 2 * T + "px",
                  height: 2 * _ + "px",
                  clipPath: j,
                  transform:
                    "translate(" + (-d + A) + "px, " + (-h + I) + "px) " + Or(f),
                },
              })
            );
          }
          if (o) {
            var $ = Tr(nr([v, g, m, b], M)),
              q = $.width,
              L = $.height,
              V = $.left,
              W = $.top;
            if (P || R || O) {
              F = O ? M.slice(0, 8) : M;
              C.push(
                n.createElement("div", {
                  key: "clipArea",
                  className: br("clip-area", "snap-control"),
                  style: {
                    width: q + "px",
                    height: L + "px",
                    transform: "translate(" + V + "px, " + W + "px)",
                    clipPath:
                      "polygon(" +
                      F.map(function (t) {
                        return t[0] - V + "px " + (t[1] - W) + "px";
                      }).join(", ") +
                      ")",
                  },
                })
              );
            }
          }
          return (
            y &&
              ["vertical", "horizontal"].forEach(function (t) {
                var e = y[t],
                  r = "horizontal" === t;
                e.isSnap &&
                  D.push.apply(
                    D,
                    e.snap.posInfos.map(function (e, i) {
                      var o = e.pos,
                        s = Jn(Gr(f, r ? [0, o] : [o, 0], S), [d, h]),
                        u = Jn(Gr(f, r ? [l, o] : [o, c], S), [d, h]);
                      return Wo(
                        n,
                        "",
                        s,
                        u,
                        a,
                        "clip" + t + "snap" + i,
                        "guideline"
                      );
                    })
                  ),
                  e.isBound &&
                    D.push.apply(
                      D,
                      e.bounds.map(function (e, i) {
                        var o = e.pos,
                          s = Jn(Gr(f, r ? [0, o] : [o, 0], S), [d, h]),
                          u = Jn(Gr(f, r ? [l, o] : [o, c], S), [d, h]);
                        return Wo(
                          n,
                          "",
                          s,
                          u,
                          a,
                          "clip" + t + "bounds" + i,
                          "guideline",
                          "bounds",
                          "bold"
                        );
                      })
                    );
              }),
            nr(C, D)
          );
        },
        dragControlCondition: function (t) {
          return (
            t.inputEvent &&
            (t.inputEvent.target.getAttribute("class") || "").indexOf("clip") > -1
          );
        },
        dragStart: function (t, n) {
          var e = t.props.dragWithClip;
          return !(void 0 === e || e) && this.dragControlStart(t, n);
        },
        drag: function (t, n) {
          return this.dragControl(t, n);
        },
        dragEnd: function (t, n) {
          return this.dragControlEnd(t, n);
        },
        dragControlStart: function (t, n) {
          var e = t.state,
            r = t.props,
            i = r.defaultClipPath,
            o = r.customClipPath,
            a = e.target,
            s = e.width,
            u = e.height,
            l = n.inputEvent ? n.inputEvent.target : null,
            c = l ? l.getAttribute("class") : "",
            f = n.datas,
            p = _a(a, s, u, i || "inset", o);
          if (!p) return !1;
          var d = p.clipText;
          return !1 ===
            Jr(
              t,
              "onClipStart",
              Zr(t, n, {
                clipType: p.type,
                clipStyle: d,
                poses: p.poses.map(function (t) {
                  return t.pos;
                }),
              })
            )
            ? ((f.isClipStart = !1), !1)
            : ((f.isControl = c.indexOf("clip-control") > -1),
              (f.isLine = c.indexOf("clip-line") > -1),
              (f.isArea =
                c.indexOf("clip-area") > -1 || c.indexOf("clip-ellipse") > -1),
              (f.index = l
                ? parseInt(l.getAttribute("data-clip-index"), 10)
                : -1),
              (f.clipPath = p),
              (f.isClipStart = !0),
              (e.clipPathState = d),
              Si(t, n),
              !0);
        },
        dragControl: function (t, n) {
          var e = n.datas,
            r = n.originalDatas;
          if (!e.isClipStart) return !1;
          var i = (r && r.draggable) || {},
            o = e,
            a = o.isControl,
            s = o.isLine,
            u = o.isArea,
            l = o.index,
            c = o.clipPath;
          if (!c) return !1;
          var f = i.isDrag ? i.prevDist : Oi(n),
            p = f[0],
            d = f[1],
            h = t.props,
            v = t.state,
            g = v.width,
            m = v.height,
            b = !u && !a && !s,
            x = c.type,
            y = c.poses,
            E = c.splitter,
            S = y.map(function (t) {
              return t.pos;
            });
          b && ((p = -p), (d = -d));
          var w = !a || "nesw" === y[l].direction,
            M = "inset" === x || "rect" === x,
            C = y.map(function () {
              return [0, 0];
            });
          if (a && !w) {
            var D = y[l],
              R = D.horizontal,
              O = D.vertical,
              P = [p * Math.abs(R), d * Math.abs(O)];
            C = (function (t, n, e, r) {
              var i = t[n],
                o = i.direction,
                a = i.sub,
                s = t.map(function () {
                  return [0, 0];
                }),
                u = o ? o.split("") : [];
              if (r && n < 8) {
                var l = u.filter(function (t) {
                    return "w" === t || "e" === t;
                  })[0],
                  c = u.filter(function (t) {
                    return "n" === t || "s" === t;
                  })[0];
                (s[n] = e),
                  t.forEach(function (t, n) {
                    var r = t.direction;
                    r &&
                      (r.indexOf(l) > -1 && (s[n][0] = e[0]),
                      r.indexOf(c) > -1 && (s[n][1] = e[1]));
                  }),
                  l && ((s[1][0] = e[0] / 2), (s[5][0] = e[0] / 2)),
                  c && ((s[3][1] = e[1] / 2), (s[7][1] = e[1] / 2));
              } else
                o && !a
                  ? u.forEach(function (n) {
                      var r = "n" === n || "s" === n;
                      t.forEach(function (t, i) {
                        var o = t.direction,
                          a = t.horizontal,
                          u = t.vertical;
                        o &&
                          -1 !== o.indexOf(n) &&
                          (s[i] = [r || !a ? 0 : e[0], r && u ? e[1] : 0]);
                      });
                    })
                  : (s[n] = e);
              return s;
            })(y, l, P, M);
          } else
            w &&
              (C = S.map(function () {
                return [p, d];
              }));
          var z = S.map(function (t, n) {
              return Kn(t, C[n]);
            }),
            G = nr(z);
          v.snapBoundInfos = null;
          var B = "circle" === c.type,
            T = "ellipse" === c.type;
          if (B || T) {
            var _ = Tr(z),
              k = Math.abs(_.bottom - _.top),
              A = Math.abs(T ? _.right - _.left : k),
              I = z[0][1] + k,
              j = z[0][0] - A,
              N = z[0][0] + A;
            B && (G.push([N, _.bottom]), C.push([1, 0])),
              G.push([_.left, I]),
              C.push([0, 1]),
              G.push([j, _.bottom]),
              C.push([1, 0]);
          }
          var F = Vi(
              [],
              g,
              m,
              (h.clipHorizontalGuidelines || []).map(function (t) {
                return Xt("" + t, m);
              }),
              (h.clipVerticalGuidelines || []).map(function (t) {
                return Xt("" + t, g);
              })
            ),
            Y = [],
            X = [];
          if (B || T) (Y = [G[4][0], G[2][0]]), (X = [G[1][1], G[3][1]]);
          else if (M) {
            var $ = [G[0], G[2], G[4], G[6]],
              q = [C[0], C[2], C[4], C[6]];
            (Y = $.filter(function (t, n) {
              return q[n][0];
            }).map(function (t) {
              return t[0];
            })),
              (X = $.filter(function (t, n) {
                return q[n][1];
              }).map(function (t) {
                return t[1];
              }));
          } else
            (Y = G.filter(function (t, n) {
              return C[n][0];
            }).map(function (t) {
              return t[0];
            })),
              (X = G.filter(function (t, n) {
                return C[n][1];
              }).map(function (t) {
                return t[1];
              }));
          for (
            var L = function (t) {
                var n = Ro(
                    F,
                    h.clipTargetBounds && {
                      left: 0,
                      top: 0,
                      right: g,
                      bottom: m,
                    },
                    Y,
                    X,
                    { snapThreshold: 5 }
                  ),
                  e = n.horizontal,
                  r = n.vertical,
                  i = e.offset,
                  o = r.offset;
                if ((!T && !B) || 0 !== C[0][0] || 0 !== C[0][1])
                  return (
                    G.forEach(function (t, n) {
                      var e = C[n];
                      e[0] && (t[0] -= o), e[1] && (t[1] -= i);
                    }),
                    "break"
                  );
                var a = Tr(z),
                  s = a.bottom - a.top,
                  u = T ? a.right - a.left : s;
                (u -= r.isBound ? Math.abs(o) : 0 === r.snapIndex ? -o : o),
                  (s -= e.isBound ? Math.abs(i) : 0 === e.snapIndex ? -i : i),
                  B && (u = s = no(r, e) > 0 ? s : u);
                var l = G[0];
                (G[1][1] = l[1] - s),
                  (G[2][0] = l[0] + u),
                  (G[3][1] = l[1] + s),
                  (G[4][0] = l[0] - u);
              },
              V = 0;
            V < 2;
            ++V
          ) {
            if ("break" === L()) break;
          }
          var W = Ba(t, c, z),
            H = x + "(" + W.join(E) + ")";
          if (((v.clipPathState = H), B || T))
            (Y = [G[4][0], G[2][0]]), (X = [G[1][1], G[3][1]]);
          else if (M) {
            $ = [G[0], G[2], G[4], G[6]];
            (Y = $.map(function (t) {
              return t[0];
            })),
              (X = $.map(function (t) {
                return t[1];
              }));
          } else
            (Y = G.map(function (t) {
              return t[0];
            })),
              (X = G.map(function (t) {
                return t[1];
              }));
          return (
            (v.snapBoundInfos = Ro(
              F,
              h.clipTargetBounds && { left: 0, top: 0, right: g, bottom: m },
              Y,
              X,
              { snapThreshold: 1 }
            )),
            Jr(
              t,
              "onClip",
              Zr(t, n, {
                clipEventType: "changed",
                clipType: x,
                poses: z,
                clipStyle: H,
                clipStyles: W,
                distX: p,
                distY: d,
              })
            ),
            !0
          );
        },
        dragControlEnd: function (t, n) {
          this.unset(t);
          var e = n.isDrag,
            r = n.datas,
            i = n.isDouble,
            o = r.isLine,
            a = r.isClipStart,
            s = r.isControl;
          return (
            !!a &&
            (Jr(t, "onClipEnd", Kr(t, n, {})),
            i &&
              (s
                ? (function (t, n) {
                    var e = n.datas,
                      r = e.clipPath,
                      i = e.index,
                      o = r,
                      a = o.type,
                      s = o.poses,
                      u = o.splitter,
                      l = s.map(function (t) {
                        return t.pos;
                      }),
                      c = l.length;
                    if ("polygon" === a) s.splice(i, 1), l.splice(i, 1);
                    else {
                      if ("inset" !== a) return;
                      if (i < 8) return;
                      if ((Ra(s, l, i, 8, c), c === s.length)) return;
                    }
                    var f = Ba(t, r, l);
                    Jr(
                      t,
                      "onClip",
                      Zr(t, n, {
                        clipEventType: "removed",
                        clipType: a,
                        poses: l,
                        clipStyles: f,
                        clipStyle: a + "(" + f.join(u) + ")",
                        distX: 0,
                        distY: 0,
                      })
                    );
                  })(t, n)
                : o &&
                  (function (t, n) {
                    var e = Ei(t, n),
                      r = e[0],
                      i = e[1],
                      o = n.datas,
                      a = o.clipPath,
                      s = o.index,
                      u = a,
                      l = u.type,
                      c = u.poses,
                      f = u.splitter,
                      p = c.map(function (t) {
                        return t.pos;
                      });
                    if ("polygon" === l) p.splice(s, 0, [r, i]);
                    else {
                      if ("inset" !== l) return;
                      var d = ya.indexOf(s),
                        h = Ea.indexOf(s),
                        v = c.length;
                      if (
                        (Oa(
                          c,
                          p,
                          8,
                          d,
                          h,
                          r,
                          i,
                          p[4][0],
                          p[4][1],
                          p[0][0],
                          p[0][1]
                        ),
                        v === c.length)
                      )
                        return;
                    }
                    var g = Ba(t, a, p);
                    Jr(
                      t,
                      "onClip",
                      Zr(t, n, {
                        clipEventType: "added",
                        clipType: l,
                        poses: p,
                        clipStyles: g,
                        clipStyle: l + "(" + g.join(f) + ")",
                        distX: 0,
                        distY: 0,
                      })
                    );
                  })(t, n)),
            i || e)
          );
        },
        unset: function (t) {
          (t.state.clipPathState = ""), (t.state.snapBoundInfos = null);
        },
      },
      Aa = {
        name: "originDraggable",
        props: { originDraggable: Boolean, originRelative: Boolean },
        events: {
          onDragOriginStart: "dragOriginStart",
          onDragOrigin: "dragOrigin",
          onDragOriginEnd: "dragOriginEnd",
        },
        css: [
          ":host[data-able-origindraggable] .control.origin {\n    pointer-events: auto;\n}",
        ],
        dragControlCondition: function (t) {
          return t.isRequest
            ? "originDraggable" === t.requestAble
            : Zt(t.inputEvent.target, br("origin"));
        },
        dragControlStart: function (t, n) {
          var e = n.datas;
          Si(t, n);
          var r = Zr(t, n, {
              dragStart: Lo.dragStart(t, new mi().dragStart([0, 0], n)),
            }),
            i = Jr(t, "onDragOriginStart", r);
          return (
            (e.startOrigin = t.state.transformOrigin),
            (e.startTargetOrigin = t.state.targetOrigin),
            (e.prevOrigin = [0, 0]),
            (e.isDragOrigin = !0),
            !1 === i ? ((e.isDragOrigin = !1), !1) : r
          );
        },
        dragControl: function (t, n) {
          var e = n.datas,
            r = n.isPinch,
            i = n.isRequest;
          if (!e.isDragOrigin) return !1;
          var o = Oi(n),
            a = o[0],
            s = o[1],
            u = t.state,
            l = u.width,
            c = u.height,
            f = u.offsetMatrix,
            p = u.targetMatrix,
            d = u.is3d,
            h = t.props.originRelative,
            v = void 0 === h || h,
            g = d ? 4 : 3,
            m = [a, s];
          if (i) {
            var b = n.distOrigin;
            (b[0] || b[1]) && (m = b);
          }
          var x = Kn(e.startOrigin, m),
            y = Kn(e.startTargetOrigin, m),
            E = Jn(m, e.prevOrigin),
            S = Bi(f, p, x, g),
            w = t.getRect(),
            M = Tr(Br(S, l, c, g)),
            C = [w.left - M.left, w.top - M.top];
          e.prevOrigin = m;
          var D = Zr(t, n, {
            width: l,
            height: c,
            origin: x,
            dist: m,
            delta: E,
            transformOrigin: [ui(y[0], l, v), ui(y[1], c, v)].join(" "),
            drag: Lo.drag(t, gi(n, t.state, C, !!r, !1)),
          });
          return Jr(t, "onDragOrigin", D), D;
        },
        dragControlEnd: function (t, n) {
          return (
            !!n.datas.isDragOrigin && (Jr(t, "onDragOriginEnd", Kr(t, n, {})), !0)
          );
        },
        dragGroupControlCondition: function (t) {
          return this.dragControlCondition(t);
        },
        dragGroupControlStart: function (t, n) {
          return !!this.dragControlStart(t, n);
        },
        dragGroupControl: function (t, n) {
          var e = this.dragControl(t, n);
          return !!e && ((t.transformOrigin = e.transformOrigin), !0);
        },
        request: function (t) {
          var n = {},
            e = t.getRect(),
            r = 0,
            i = 0,
            o = e.transformOrigin,
            a = [0, 0];
          return {
            isControl: !0,
            requestStart: function () {
              return { datas: n };
            },
            request: function (t) {
              return (
                "deltaOrigin" in t
                  ? ((a[0] += t.deltaOrigin[0]), (a[1] += t.deltaOrigin[1]))
                  : "origin" in t
                  ? ((a[0] = t.origin[0] - o[0]), (a[1] = t.origin[1] - o[1]))
                  : ("x" in t
                      ? (r = t.x - e.left)
                      : "deltaX" in t && (r += t.deltaX),
                    "y" in t
                      ? (i = t.y - e.top)
                      : "deltaY" in t && (i += t.deltaY)),
                { datas: n, distX: r, distY: i, distOrigin: a }
              );
            },
            requestEnd: function () {
              return { datas: n, isDrag: !0 };
            },
          };
        },
      };
    function Ia(t, n, e, r, i) {
      var o;
      void 0 === r && (r = [0, 0]);
      if (i) o = i;
      else {
        var a = window.getComputedStyle(t);
        o = (a && a.borderRadius) || "";
      }
      return Da(!o || (!i && "0px" === o) ? [] : Tt(o), n, e, 0, 0, r);
    }
    function ja(t, n, e, r, i, o) {
      var a = t.state,
        s = a.width,
        u = a.height,
        l = Ma(o, i, t.props.roundRelative, s, u),
        c = l.raws,
        f = l.styles,
        p = Pa(i, c),
        d = p.horizontals,
        h = p.verticals,
        v = f.join(" ");
      (a.borderRadiusState = v),
        Jr(
          t,
          "onRound",
          Zr(t, n, {
            horizontals: d,
            verticals: h,
            borderRadius: v,
            width: s,
            height: u,
            delta: r,
            dist: e,
          })
        );
    }
    var Na = {
        name: "roundable",
        props: {
          roundable: Boolean,
          roundRelative: Boolean,
          minRoundControls: Array,
          maxRoundControls: Array,
          roundClickable: Boolean,
        },
        events: {
          onRoundStart: "roundStart",
          onRound: "round",
          onRoundEnd: "roundEnd",
        },
        css: [
          ".control.border-radius {\n    background: #d66;\n    cursor: pointer;\n}",
          ":host[data-able-roundable] .line.direction {\n    cursor: pointer;\n}",
        ],
        render: function (t, n) {
          var e = t.state,
            r = e.target,
            i = e.width,
            o = e.height,
            a = e.allMatrix,
            s = e.is3d,
            u = e.left,
            l = e.top,
            c = e.borderRadiusState,
            f = t.props,
            p = f.minRoundControls,
            d = void 0 === p ? [0, 0] : p,
            h = f.maxRoundControls,
            v = void 0 === h ? [4, 4] : h,
            g = f.zoom;
          if (!r) return null;
          var m = s ? 4 : 3,
            b = Ia(r, i, o, d, c);
          if (!b) return null;
          var x = 0,
            y = 0;
          return b.map(function (t, e) {
            (y += Math.abs(t.horizontal)), (x += Math.abs(t.vertical));
            var r = Jn(Gr(a, t.pos, m), [u, l]),
              i = t.vertical ? x <= v[1] : y <= v[0];
            return n.createElement("div", {
              key: "borderRadiusControl" + e,
              className: br("control", "border-radius"),
              "data-radius-index": e,
              style: {
                display: i ? "block" : "none",
                transform:
                  "translate(" + r[0] + "px, " + r[1] + "px) scale(" + g + ")",
              },
            });
          });
        },
        dragControlCondition: function (t) {
          if (!t.inputEvent || t.isRequest) return !1;
          var n = t.inputEvent.target.getAttribute("class") || "";
          return (
            n.indexOf("border-radius") > -1 ||
            (n.indexOf("moveable-line") > -1 &&
              n.indexOf("moveable-direction") > -1)
          );
        },
        dragControlStart: function (t, n) {
          var e = n.inputEvent,
            r = n.datas,
            i = e.target,
            o = i.getAttribute("class") || "",
            a = o.indexOf("border-radius") > -1,
            s =
              o.indexOf("moveable-line") > -1 &&
              o.indexOf("moveable-direction") > -1,
            u = a ? parseInt(i.getAttribute("data-radius-index"), 10) : -1,
            l = s ? parseInt(i.getAttribute("data-line-index"), 10) : -1;
          if (!a && !s) return !1;
          if (!1 === Jr(t, "onRoundStart", Zr(t, n, {}))) return !1;
          (r.lineIndex = l),
            (r.controlIndex = u),
            (r.isControl = a),
            (r.isLine = s),
            Si(t, n);
          var c = t.props,
            f = c.roundRelative,
            p = c.minRoundControls,
            d = void 0 === p ? [0, 0] : p,
            h = t.state,
            v = h.target,
            g = h.width,
            m = h.height;
          (r.isRound = !0), (r.prevDist = [0, 0]);
          var b = Ia(v, g, m, d) || [];
          return (
            (r.controlPoses = b),
            (h.borderRadiusState = Ma(
              b.map(function (t) {
                return t.pos;
              }),
              b,
              f,
              g,
              m
            ).styles.join(" ")),
            !0
          );
        },
        dragControl: function (t, n) {
          var e = n.datas;
          if (!e.isRound || !e.isControl || !e.controlPoses.length) return !1;
          var r = e.controlIndex,
            i = e.controlPoses,
            o = Oi(n),
            a = o[0],
            s = o[1],
            u = [a, s],
            l = Jn(u, e.prevDist),
            c = t.props.maxRoundControls,
            f = void 0 === c ? [4, 4] : c,
            p = t.state,
            d = p.width,
            h = p.height,
            v = i[r],
            g = v.vertical,
            m = v.horizontal,
            b = i.map(function (t) {
              var n = t.horizontal,
                e = t.vertical,
                r = [n * m * u[0], e * g * u[1]];
              if (n) {
                if (1 === f[0]) return r;
                if (f[0] < 4 && n !== m) return r;
              } else {
                if (0 === f[1]) return (r[1] = ((e * m * u[0]) / d) * h), r;
                if (g) {
                  if (1 === f[1]) return r;
                  if (f[1] < 4 && e !== g) return r;
                }
              }
              return [0, 0];
            });
          b[r] = u;
          var x = i.map(function (t, n) {
            return Kn(t.pos, b[n]);
          });
          return (e.prevDist = [a, s]), ja(t, n, u, l, i, x), !0;
        },
        dragControlEnd: function (t, n) {
          var e = t.state;
          e.borderRadiusState = "";
          var r = n.datas,
            i = n.isDouble;
          if (!r.isRound) return !1;
          var o = e.width,
            a = e.height,
            s = r.isControl,
            u = r.controlIndex,
            l = r.isLine,
            c = r.lineIndex,
            f = r.controlPoses,
            p = f.map(function (t) {
              return t.pos;
            }),
            d = p.length,
            h = t.props.roundClickable;
          if (i && (void 0 === h || h)) {
            if (s) Ra(f, p, u, 0);
            else if (l) {
              var v = Ei(t, n);
              !(function (t, n, e, r, i, o, a) {
                var s = Pa(t),
                  u = s.horizontals,
                  l = s.verticals,
                  c = u.length,
                  f = l.length,
                  p = -1,
                  d = -1;
                0 === e
                  ? 0 === c
                    ? (p = 0)
                    : 1 === c && (p = 1)
                  : 3 === e && (c <= 2 ? (p = 2) : c <= 3 && (p = 3)),
                  2 === e
                    ? 0 === f
                      ? (d = 0)
                      : f < 4 && (d = 3)
                    : 1 === e && (f <= 1 ? (d = 1) : f <= 2 && (d = 2)),
                  Oa(t, n, 0, p, d, r, i, o, a);
              })(f, p, c, v[0], v[1], o, a);
            }
            d !== f.length && ja(t, n, [0, 0], [0, 0], f, p);
          }
          return (
            Jr(t, "onRoundEnd", Kr(t, n, {})), (e.borderRadiusState = ""), !0
          );
        },
        unset: function (t) {
          t.state.borderRadiusState = "";
        },
      },
      Fa = {
        isPinch: !0,
        name: "beforeRenderable",
        props: {},
        events: {
          onBeforeRenderStart: "beforeRenderStart",
          onBeforeRender: "beforeRender",
          onBeforeRenderEnd: "beforeRenderEnd",
          onBeforeRenderGroupStart: "beforeRenderGroupStart",
          onBeforeRenderGroup: "beforeRenderGroup",
          onBeforeRenderGroupEnd: "beforeRenderGroupEnd",
        },
        setTransform: function (t, n) {
          var e = t.state,
            r = e.is3d,
            i = e.targetMatrix,
            o = r ? "matrix3d(" + i.join(",") + ")" : "matrix(" + Qn(i, !0) + ")";
          n.datas.startTransforms = [o];
        },
        resetTransform: function (t, n) {
          (n.datas.nextTransforms = n.datas.startTransforms),
            (n.datas.nextTransformAppendedIndexes = []);
        },
        fillDragStartParams: function (t, n) {
          return Zr(t, n, {
            setTransform: function (t) {
              n.datas.startTransforms = Ot(t) ? t : Tt(t);
            },
            isPinch: !!n.isPinch,
          });
        },
        fillDragParams: function (t, n) {
          return Zr(t, n, { isPinch: !!n.isPinch });
        },
        dragStart: function (t, n) {
          this.setTransform(t, n),
            Jr(t, "onBeforeRenderStart", this.fillDragStartParams(t, n));
        },
        drag: function (t, n) {
          this.resetTransform(t, n),
            Jr(t, "onBeforeRender", Zr(t, n, { isPinch: !!n.isPinch }));
        },
        dragEnd: function (t, n) {
          Jr(
            t,
            "onBeforeRenderEnd",
            Zr(t, n, { isPinch: !!n.isPinch, isDrag: n.isDrag })
          );
        },
        dragGroupStart: function (t, n) {
          var e = this;
          this.dragStart(t, n);
          var r = bi(t, "beforeRenderable", n),
            i = t.moveables,
            o = r.map(function (t, n) {
              var r = i[n];
              return e.setTransform(r, t), e.fillDragStartParams(r, t);
            });
          Jr(
            t,
            "onBeforeRenderGroupStart",
            Zr(t, n, {
              isPinch: !!n.isPinch,
              targets: t.props.targets,
              setTransform: function () {},
              events: o,
            })
          );
        },
        dragGroup: function (t, n) {
          var e = this;
          this.drag(t, n);
          var r = bi(t, "beforeRenderable", n),
            i = t.moveables,
            o = r.map(function (t, n) {
              var r = i[n];
              return e.resetTransform(r, t), e.fillDragParams(r, t);
            });
          Jr(
            t,
            "onBeforeRenderGroup",
            Zr(t, n, {
              isPinch: !!n.isPinch,
              targets: t.props.targets,
              events: o,
            })
          );
        },
        dragGroupEnd: function (t, n) {
          this.dragEnd(t, n),
            Jr(
              t,
              "onBeforeRenderGroupEnd",
              Zr(t, n, {
                isPinch: !!n.isPinch,
                isDrag: n.isDrag,
                targets: t.props.targets,
              })
            );
        },
        dragControlStart: function (t, n) {
          return this.dragStart(t, n);
        },
        dragControl: function (t, n) {
          return this.drag(t, n);
        },
        dragControlEnd: function (t, n) {
          return this.dragEnd(t, n);
        },
        dragGroupControlStart: function (t, n) {
          return this.dragGroupStart(t, n);
        },
        dragGroupControl: function (t, n) {
          return this.dragGroup(t, n);
        },
        dragGroupControlEnd: function (t, n) {
          return this.dragGroupEnd(t, n);
        },
      },
      Ya = {
        name: "Renderable",
        props: {},
        events: {
          onRenderStart: "renderStart",
          onRender: "render",
          onRenderEnd: "renderEnd",
          onRenderGroupStart: "renderGroupStart",
          onRenderGroup: "renderGroup",
          onRenderGroupEnd: "renderGroupEnd",
        },
        dragStart: function (t, n) {
          Jr(t, "onRenderStart", Zr(t, n, { isPinch: !!n.isPinch }));
        },
        drag: function (t, n) {
          Jr(t, "onRender", Zr(t, n, { isPinch: !!n.isPinch }));
        },
        dragEnd: function (t, n) {
          Jr(
            t,
            "onRenderEnd",
            Zr(t, n, { isPinch: !!n.isPinch, isDrag: n.isDrag })
          );
        },
        dragGroupStart: function (t, n) {
          Jr(
            t,
            "onRenderGroupStart",
            Zr(t, n, { isPinch: !!n.isPinch, targets: t.props.targets })
          );
        },
        dragGroup: function (t, n) {
          Jr(
            t,
            "onRenderGroup",
            Zr(t, n, { isPinch: !!n.isPinch, targets: t.props.targets })
          );
        },
        dragGroupEnd: function (t, n) {
          Jr(
            t,
            "onRenderGroupEnd",
            Zr(t, n, {
              isPinch: !!n.isPinch,
              isDrag: n.isDrag,
              targets: t.props.targets,
            })
          );
        },
        dragControlStart: function (t, n) {
          return this.dragStart(t, n);
        },
        dragControl: function (t, n) {
          return this.drag(t, n);
        },
        dragControlEnd: function (t, n) {
          return this.dragEnd(t, n);
        },
        dragGroupControlStart: function (t, n) {
          return this.dragGroupStart(t, n);
        },
        dragGroupControl: function (t, n) {
          return this.dragGroup(t, n);
        },
        dragGroupControlEnd: function (t, n) {
          return this.dragGroupEnd(t, n);
        },
      };
    function Xa(t, n, e, r, i, o, a) {
      var s = "Start" === i,
        u = t.state.target,
        l = o.isRequest;
      if (
        !u ||
        (s &&
          r.indexOf("Control") > -1 &&
          !l &&
          t.areaElement === o.inputEvent.target)
      )
        return !1;
      var c = "" + e + r + i,
        f = "" + e + r + "Condition",
        p = "End" === i,
        d = i.indexOf("After") > -1,
        h =
          s &&
          (!t.targetGesto ||
            !t.controlGesto ||
            !t.targetGesto.isFlag() ||
            !t.controlGesto.isFlag());
      h && t.updateRect(i, !0, !1), "" !== i || d || l || ai(t.state, o);
      var v = r.indexOf("Group") > -1,
        g = nr([Fa], t[n].slice(), [Ya]);
      if (l) {
        var m = o.requestAble;
        g.some(function (t) {
          return t.name === m;
        }) ||
          g.push.apply(
            g,
            t.props.ables.filter(function (t) {
              return t.name === m;
            })
          );
      }
      if (!g.length) return !1;
      var b = g.filter(function (t) {
          return t[c];
        }),
        x = o.datas;
      h &&
        b.forEach(function (n) {
          n.unset && n.unset(t);
        });
      var y,
        E = o.inputEvent;
      p && E && (y = document.elementFromPoint(o.clientX, o.clientY) || E.target);
      var S = b.filter(function (n) {
          var e = n.name,
            r = x[e] || (x[e] = {});
          return (
            s && (r.isEventStart = !n[f] || n[f](o, t)),
            !!r.isEventStart &&
              n[c](
                t,
                tr(tr({}, o), { datas: r, originalDatas: x, inputTarget: y })
              )
          );
        }),
        w = S.length,
        M = s && b.length && !w;
      return (
        (p || M) &&
          ((t.state.gesto = null),
          t.moveables &&
            t.moveables.forEach(function (t) {
              t.state.gesto = null;
            })),
        h &&
          M &&
          b.forEach(function (n) {
            n.unset && n.unset(t);
          }),
        !t.isUnmounted &&
          !M &&
          (((!s && w && !a) || p) &&
            (S.some(function (t) {
              return t.updateRect;
            }) && !v
              ? t.updateRect(i, !1, !1)
              : t.updateRect(i, !0, !1),
            t.forceUpdate()),
          s || p || d || !w || a || Xa(t, n, e, r, i + "After", o),
          !0)
      );
    }
    function $a(t, n, e) {
      var r = t.controlBox.getElement(),
        i = [];
      i.push(r), (t.props.dragArea && !t.props.dragTarget) || i.push(n);
      var o = function (n) {
        var e = n.inputEvent.target;
        return (
          e === t.areaElement ||
          !t.isMoveableElement(e) ||
          Zt(e, "moveable-area") ||
          Zt(e, "moveable-padding")
        );
      };
      return qa(t, i, "targetAbles", e, { dragStart: o, pinchStart: o });
    }
    function qa(t, n, e, r, i) {
      void 0 === i && (i = {});
      var o = t.props,
        a = o.pinchOutside,
        s = o.pinchThreshold,
        u = { container: window, pinchThreshold: s, pinchOutside: a },
        l = new $e(n, u);
      return (
        ["drag", "pinch"].forEach(function (n) {
          ["Start", "", "End"].forEach(function (o) {
            l.on("" + n + o, function (a) {
              var s = a.eventType;
              !i[s] || i[s](a) ? Xa(t, e, n, r, o, a) || a.stop() : a.stop();
            });
          });
        }),
        l
      );
    }
    var La = (function () {
        function t(t, n, e) {
          var r = this;
          (this.target = t),
            (this.moveable = n),
            (this.eventName = e),
            (this.ables = []),
            (this.onEvent = function (t) {
              var n = r.eventName,
                e = r.moveable;
              r.ables.forEach(function (r) {
                r[n]({ inputEvent: t }, e);
              });
            }),
            this.target.addEventListener(
              this.eventName.toLowerCase(),
              this.onEvent
            );
        }
        var n = t.prototype;
        return (
          (n.setAbles = function (t) {
            this.ables = t;
          }),
          (n.destroy = function () {
            this.target.removeEventListener(
              this.eventName.toLowerCase(),
              this.onEvent
            ),
              (this.target = null),
              (this.moveable = null);
          }),
          t
        );
      })(),
      Va = (function (t) {
        function n() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return (
            (n.state = tr(
              {
                container: null,
                target: null,
                gesto: null,
                renderPoses: [
                  [0, 0],
                  [0, 0],
                  [0, 0],
                  [0, 0],
                ],
              },
              Xr(null)
            )),
            (n.enabledAbles = []),
            (n.targetAbles = []),
            (n.controlAbles = []),
            (n.rotation = 0),
            (n.scale = [1, 1]),
            (n.isUnmounted = !1),
            (n.events = { mouseEnter: null, mouseLeave: null }),
            n
          );
        }
        Qe(n, t);
        var e = n.prototype;
        return (
          (e.render = function () {
            var t = this.props,
              n = this.state,
              e = t.edge,
              r = t.parentPosition,
              i = t.className,
              o = t.target,
              a = t.zoom,
              s = t.cspNonce,
              u = t.translateZ,
              l = t.cssStyled,
              c = t.portalContainer;
            this.checkUpdate(), this.updateRenderPoses();
            var f = r || { left: 0, top: 0 },
              p = f.left,
              d = f.top,
              h = n.left,
              v = n.top,
              g = n.target,
              m = n.direction,
              b = n.renderPoses,
              x = t.targets,
              y = ((x && x.length) || o) && g,
              E = this.isDragging(),
              S = {},
              w = { createElement: pn };
            return (
              this.getEnabledAbles().forEach(function (t) {
                S["data-able-" + t.name.toLowerCase()] = !0;
              }),
              pn(
                l,
                tr(
                  {
                    cspNonce: s,
                    ref: dt(this, "controlBox"),
                    className:
                      br(
                        "control-box",
                        -1 === m ? "reverse" : "",
                        E ? "dragging" : ""
                      ) +
                      " " +
                      i,
                  },
                  S,
                  {
                    portalContainer: c,
                    style: {
                      position: "absolute",
                      display: y ? "block" : "none",
                      transform:
                        "translate3d(" +
                        (h - p) +
                        "px, " +
                        (v - d) +
                        "px, " +
                        u +
                        ")",
                      "--zoom": a,
                      "--zoompx": a + "px",
                    },
                  }
                ),
                this.renderAbles(),
                Wo(w, e ? "n" : "", b[0], b[1], a, 0),
                Wo(w, e ? "e" : "", b[1], b[3], a, 1),
                Wo(w, e ? "w" : "", b[0], b[2], a, 2),
                Wo(w, e ? "s" : "", b[2], b[3], a, 3)
              )
            );
          }),
          (e.componentDidMount = function () {
            this.controlBox.getElement();
            var t = this.props,
              n = t.parentMoveable,
              e = t.container,
              r = t.wrapperMoveable;
            this.updateEvent(t),
              this.updateNativeEvents(t),
              e || n || r || this.updateRect("", !1, !0),
              this.updateCheckInput();
          }),
          (e.componentDidUpdate = function (t) {
            this.updateNativeEvents(t),
              this.updateEvent(t),
              this.updateCheckInput();
          }),
          (e.componentWillUnmount = function () {
            (this.isUnmounted = !0),
              Ur(this, "targetGesto"),
              Ur(this, "controlGesto");
            var t = this.events;
            for (var n in t) {
              var e = t[n];
              e && e.destroy();
            }
          }),
          (e.getContainer = function () {
            var t = this.props,
              n = t.parentMoveable,
              e = t.wrapperMoveable;
            return (
              t.container ||
              (e && e.getContainer()) ||
              (n && n.getContainer()) ||
              this.controlBox.getElement().parentElement
            );
          }),
          (e.isMoveableElement = function (t) {
            return t && (t.getAttribute("class") || "").indexOf(sr) > -1;
          }),
          (e.dragStart = function (t) {
            return this.targetGesto && this.targetGesto.triggerDragStart(t), this;
          }),
          (e.hitTest = function (t) {
            var n,
              e = this.state,
              r = e.target,
              i = e.pos1,
              o = e.pos2,
              a = e.pos3,
              s = e.pos4,
              u = e.targetClientRect;
            if (!r) return 0;
            if (t instanceof Element) {
              var l = t.getBoundingClientRect();
              n = { left: l.left, top: l.top, width: l.width, height: l.height };
            } else n = tr({ width: 0, height: 0 }, t);
            var c = n.left,
              f = n.top,
              p = n.width,
              d = n.height,
              h = ge([i, o, s, a], u),
              v = we(h, [
                [c, f],
                [c + p, f],
                [c + p, f + d],
                [c, f + d],
              ]),
              g = ve(h);
            return v && g ? Math.min(100, (v / g) * 100) : 0;
          }),
          (e.isInside = function (t, n) {
            var e = this.state,
              r = e.target,
              i = e.pos1,
              o = e.pos2,
              a = e.pos3,
              s = e.pos4,
              u = e.targetClientRect;
            return !!r && be([t, n], ge([i, o, s, a], u));
          }),
          (e.updateRect = function (t, n, e) {
            void 0 === e && (e = !0);
            var r = this.props,
              i = r.parentMoveable,
              o = this.state.target || this.props.target,
              a = this.getContainer(),
              s = i ? i.props.rootContainer : r.rootContainer;
            this.updateState(
              Xr(
                this.controlBox && this.controlBox.getElement(),
                o,
                a,
                a,
                s || a
              ),
              !i && e
            );
          }),
          (e.isTargetChanged = function (t, n) {
            var e = this.props,
              r = e.dragTarget || e.target,
              i = t.dragTarget || t.target,
              o = e.dragArea,
              a = t.dragArea;
            return (!o && i !== r) || ((n || o) && a !== o);
          }),
          (e.updateNativeEvents = function (t) {
            var n = this,
              e = this.props.dragArea ? this.areaElement : this.state.target,
              r = this.events,
              i = Yt(r);
            if (this.isTargetChanged(t))
              for (var o in r) {
                var a = r[o];
                a && a.destroy(), (r[o] = null);
              }
            if (e) {
              var s = this.enabledAbles;
              i.forEach(function (t) {
                var i = ti(s, [t]),
                  o = i.length > 0,
                  a = r[t];
                o
                  ? (a || ((a = new La(e, n, t)), (r[t] = a)), a.setAbles(i))
                  : a && (a.destroy(), (r[t] = null));
              });
            }
          }),
          (e.updateEvent = function (t) {
            var n = this.controlBox.getElement(),
              e = this.targetAbles.length,
              r = this.controlAbles.length,
              i = this.props,
              o = i.dragTarget || i.target,
              a = this.isTargetChanged(t, !0),
              s = (!e && this.targetGesto) || a;
            s && (Ur(this, "targetGesto"), this.updateState({ gesto: null })),
              r || Ur(this, "controlGesto"),
              o && e && !this.targetGesto && (this.targetGesto = $a(this, o, "")),
              !this.controlGesto &&
                r &&
                (this.controlGesto = qa(this, n, "controlAbles", "Control")),
              s && this.unsetAbles();
          }),
          (e.isDragging = function () {
            return (
              (!!this.targetGesto && this.targetGesto.isFlag()) ||
              (!!this.controlGesto && this.controlGesto.isFlag())
            );
          }),
          (e.updateTarget = function (t) {
            this.updateRect(t, !0);
          }),
          (e.getRect = function () {
            var t = this.state,
              n = Vr(this.state),
              e = n[0],
              r = n[1],
              i = n[2],
              o = n[3],
              a = Tr(n),
              s = t.width,
              u = t.height,
              l = a.width,
              c = a.height,
              f = a.left,
              p = a.top,
              d = [t.left, t.top],
              h = Kn(d, t.origin);
            return {
              width: l,
              height: c,
              left: f,
              top: p,
              pos1: e,
              pos2: r,
              pos3: i,
              pos4: o,
              offsetWidth: s,
              offsetHeight: u,
              beforeOrigin: Kn(d, t.beforeOrigin),
              origin: h,
              transformOrigin: t.transformOrigin,
              rotation: this.getRotation(),
            };
          }),
          (e.getManager = function () {
            return this;
          }),
          (e.getRotation = function () {
            var t = this.state;
            return (function (t, n, e) {
              var r = (Wt(t, n) / Math.PI) * 180;
              return (r = e >= 0 ? r : 180 - r) >= 0 ? r : 360 + r;
            })(t.pos1, t.pos2, t.direction);
          }),
          (e.request = function (t, n, e) {
            void 0 === n && (n = {});
            var r = this.props,
              i = r.ables,
              o = r.groupable,
              a = i.filter(function (n) {
                return n.name === t;
              })[0];
            if (this.isDragging() || !a || !a.request)
              return {
                request: function () {
                  return this;
                },
                requestEnd: function () {
                  return this;
                },
              };
            var s = this,
              u = a.request(this),
              l = e || n.isInstant,
              c = u.isControl ? "controlAbles" : "targetAbles",
              f = (o ? "Group" : "") + (u.isControl ? "Control" : ""),
              p = {
                request: function (n) {
                  return (
                    Xa(
                      s,
                      c,
                      "drag",
                      f,
                      "",
                      tr(tr({}, u.request(n)), { requestAble: t, isRequest: !0 }),
                      l
                    ),
                    this
                  );
                },
                requestEnd: function () {
                  return (
                    Xa(
                      s,
                      c,
                      "drag",
                      f,
                      "End",
                      tr(tr({}, u.requestEnd()), {
                        requestAble: t,
                        isRequest: !0,
                      }),
                      l
                    ),
                    this
                  );
                },
              };
            return (
              Xa(
                s,
                c,
                "drag",
                f,
                "Start",
                tr(tr({}, u.requestStart(n)), { requestAble: t, isRequest: !0 }),
                l
              ),
              l ? p.request(n).requestEnd() : p
            );
          }),
          (e.destroy = function () {
            this.componentWillUnmount();
          }),
          (e.updateRenderPoses = function () {
            var t = this.state,
              n = this.props,
              e = t.originalBeforeOrigin,
              r = t.transformOrigin,
              i = t.allMatrix,
              o = t.is3d,
              a = t.pos1,
              s = t.pos2,
              u = t.pos3,
              l = t.pos4,
              c = t.left,
              f = t.top,
              p = n.padding || {},
              d = p.left,
              h = void 0 === d ? 0 : d,
              v = p.top,
              g = void 0 === v ? 0 : v,
              m = p.bottom,
              b = void 0 === m ? 0 : m,
              x = p.right,
              y = void 0 === x ? 0 : x,
              E = o ? 4 : 3,
              S = n.groupable ? e : Kn(e, [c, f]);
            t.renderPoses = [
              Kn(a, si(i, [-h, -g], r, S, E)),
              Kn(s, si(i, [y, -g], r, S, E)),
              Kn(u, si(i, [-h, b], r, S, E)),
              Kn(l, si(i, [y, b], r, S, E)),
            ];
          }),
          (e.checkUpdate = function () {
            var t = this.props,
              n = t.target,
              e = t.container,
              r = t.parentMoveable,
              i = this.state,
              o = i.target,
              a = i.container;
            (o || n) &&
              (this.updateAbles(),
              (!ni(o, n) || !ni(a, e)) &&
                (this.updateState({ target: n, container: e }),
                r || (!e && !this.controlBox) || this.updateRect("End", !1, !1)));
          }),
          (e.triggerEvent = function (t, n) {
            var e = this.props[t];
            return e && e(n);
          }),
          (e.useCSS = function (t, n) {
            var e = this.props.customStyledMap,
              r = t + n;
            return e[r] || (e[r] = Ke(t, n)), e[r];
          }),
          (e.unsetAbles = function () {
            var t = this;
            this.targetAbles.filter(function (n) {
              return !!n.unset && (n.unset(t), !0);
            }).length && this.forceUpdate();
          }),
          (e.updateAbles = function (t, n) {
            void 0 === t && (t = this.props.ables), void 0 === n && (n = "");
            var e = this.props,
              r = e.triggerAblesSimultaneously,
              i = t.filter(function (t) {
                return t && (t.always || e[t.name]);
              }),
              o = "drag" + n + "ControlStart",
              a = ti(i, ["drag" + n + "Start", "pinch" + n + "Start"], r),
              s = ti(i, [o], r);
            (this.enabledAbles = i),
              (this.targetAbles = a),
              (this.controlAbles = s);
          }),
          (e.updateState = function (t, n) {
            if (n) this.setState(t);
            else {
              var e = this.state;
              for (var r in t) e[r] = t[r];
            }
          }),
          (e.getEnabledAbles = function () {
            var t = this.props;
            return t.ables.filter(function (n) {
              return n && t[n.name];
            });
          }),
          (e.renderAbles = function () {
            var t,
              n,
              e,
              r,
              i = this,
              o = this.props.triggerAblesSimultaneously,
              a = { createElement: pn };
            return ((t = ri(
              ti(this.getEnabledAbles(), ["render"], o).map(function (t) {
                return (0, t.render)(i, a) || [];
              })
            ).filter(function (t) {
              return t;
            })),
            (n = function (t) {
              return t.key;
            }),
            (e = []),
            (r = {}),
            t.forEach(function (i, o) {
              var a = n(i, o, t),
                s = r[a];
              s || ((s = []), (r[a] = s), e.push(s)), s.push(i);
            }),
            e).map(function (t) {
              return t[0];
            });
          }),
          (e.updateCheckInput = function () {
            this.targetGesto &&
              (this.targetGesto.options.checkInput = this.props.checkInput);
          }),
          (n.defaultProps = {
            target: null,
            dragTarget: null,
            container: null,
            rootContainer: null,
            origin: !0,
            edge: !1,
            parentMoveable: null,
            wrapperMoveable: null,
            parentPosition: null,
            portalContainer: null,
            ables: [],
            pinchThreshold: 20,
            dragArea: !1,
            passDragArea: !1,
            transformOrigin: "",
            className: "",
            zoom: 1,
            triggerAblesSimultaneously: !1,
            padding: {},
            pinchOutside: !0,
            checkInput: !1,
            groupable: !1,
            cspNonce: "",
            translateZ: 0,
            cssStyled: null,
            customStyledMap: {},
            props: {},
          }),
          n
        );
      })(wn),
      Wa = {
        name: "groupable",
        props: {
          defaultGroupRotate: Number,
          defaultGroupOrigin: String,
          groupable: Boolean,
        },
        events: {},
        render: function (t, n) {
          var e = t.props.targets || [];
          t.moveables = [];
          var r = t.state,
            i = { left: r.left, top: r.top };
          return e.map(function (e, r) {
            return n.createElement(Va, {
              key: "moveable" + r,
              ref: ht(t, "moveables", r),
              target: e,
              origin: !1,
              cssStyled: t.props.cssStyled,
              customStyledMap: t.props.customStyledMap,
              parentMoveable: t,
              parentPosition: i,
            });
          });
        },
      };
    function Ha(t) {
      var n = t.originalDatas.draggable;
      return (
        n || ((t.originalDatas.draggable = {}), (n = t.originalDatas.draggable)),
        tr(tr({}, t), { datas: n })
      );
    }
    var Ua = {
        name: "edgeDraggable",
        props: { edgeDraggable: Boolean },
        events: {},
        dragControlCondition: function (t, n) {
          if (!n.props.edgeDraggable || !t.inputEvent) return !1;
          var e = t.inputEvent.target;
          return Zt(e, br("direction")) && Zt(e, br("line"));
        },
        dragControlStart: function (t, n) {
          return Lo.dragStart(t, Ha(n));
        },
        dragControl: function (t, n) {
          return Lo.drag(t, Ha(n));
        },
        dragControlEnd: function (t, n) {
          return Lo.dragEnd(t, Ha(n));
        },
        dragGroupControlCondition: function (t, n) {
          if (!n.props.edgeDraggable || !t.inputEvent) return !1;
          var e = t.inputEvent.target;
          return Zt(e, br("direction")) && Zt(e, br("line"));
        },
        dragGroupControlStart: function (t, n) {
          return Lo.dragGroupStart(t, Ha(n));
        },
        dragGroupControl: function (t, n) {
          return Lo.dragGroup(t, Ha(n));
        },
        dragGroupControlEnd: function (t, n) {
          return Lo.dragGroupEnd(t, Ha(n));
        },
        unset: function (t) {
          t.state.dragInfo = null;
        },
      },
      Za = {
        name: "individualGroupable",
        props: { individualGroupable: Boolean },
        events: {},
      },
      Ka = [
        Fa,
        ga,
        qo,
        vi,
        Lo,
        Ua,
        na,
        ea,
        ra,
        aa,
        va,
        ma,
        da,
        Aa,
        ka,
        Na,
        Wa,
        Za,
        {
          name: "clickable",
          props: {},
          events: { onClick: "click", onClickGroup: "clickGroup" },
          always: !0,
          dragStart: function () {},
          dragGroupStart: function (t, n) {
            n.datas.inputTarget = n.inputEvent && n.inputEvent.target;
          },
          dragEnd: function (t, n) {
            var e = t.state.target,
              r = n.inputEvent,
              i = n.inputTarget;
            if (r && i && !n.isDrag && !t.isMoveableElement(i)) {
              var o = e.contains(i);
              Jr(
                t,
                "onClick",
                Zr(t, n, {
                  isDouble: n.isDouble,
                  inputTarget: i,
                  isTarget: e === i,
                  containsTarget: o,
                })
              );
            }
          },
          dragGroupEnd: function (t, n) {
            var e = n.inputEvent,
              r = n.inputTarget;
            if (
              e &&
              r &&
              !n.isDrag &&
              !t.isMoveableElement(r) &&
              n.datas.inputTarget !== r
            ) {
              var i = t.props.targets,
                o = i.indexOf(r),
                a = o > -1,
                s = !1;
              -1 === o &&
                (s =
                  (o = Ft(i, function (t) {
                    return t.contains(r);
                  })) > -1),
                Jr(
                  t,
                  "onClickGroup",
                  Zr(t, n, {
                    isDouble: n.isDouble,
                    targets: i,
                    inputTarget: r,
                    targetIndex: o,
                    isTarget: a,
                    containsTarget: s,
                  })
                );
            }
          },
        },
        pa,
        Ya,
      ],
      Ja = Ka.reduce(function (t, n) {
        return tr(tr({}, t), n.events);
      }, {}),
      Qa = Ka.reduce(function (t, n) {
        return tr(tr({}, t), n.props);
      }, {}),
      ts = fi(Ja),
      ns = Object.keys(ts),
      es = Object.keys(Qa);
    function rs(t, n) {
      return Math.max.apply(
        Math,
        t.map(function (t) {
          var e = t[0],
            r = t[1],
            i = t[2],
            o = t[3];
          return Math.max(e[n], r[n], i[n], o[n]);
        })
      );
    }
    function is(t, n) {
      return Math.min.apply(
        Math,
        t.map(function (t) {
          var e = t[0],
            r = t[1],
            i = t[2],
            o = t[3];
          return Math.min(e[n], r[n], i[n], o[n]);
        })
      );
    }
    var os = (function (t) {
        function n() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return (
            (n.differ = new Re()),
            (n.moveables = []),
            (n.transformOrigin = "50% 50%"),
            n
          );
        }
        Qe(n, t);
        var e = n.prototype;
        return (
          (e.updateEvent = function (t) {
            var n = this.state,
              e = this.props,
              r = t.dragTarget || n.target,
              i = e.dragTarget || this.areaElement;
            r !== i &&
              (Ur(this, "targetGesto"),
              Ur(this, "controlGesto"),
              (n.target = null)),
              n.target ||
                ((n.target = this.areaElement),
                (this.controlBox.getElement().style.display = "block"),
                (this.targetGesto = $a(this, i, "Group")),
                (this.controlGesto = qa(
                  this,
                  this.controlBox.getElement(),
                  "controlAbles",
                  "GroupControl"
                )));
            var o = !ni(t.container, e.container);
            o && (n.container = e.container);
            var a = this.differ.update(e.targets),
              s = a.added,
              u = a.changed,
              l = a.removed;
            (o || s.length || u.length || l.length) && this.updateRect();
          }),
          (e.checkUpdate = function () {
            this.updateAbles();
          }),
          (e.updateRect = function (t, n, e) {
            if ((void 0 === e && (e = !0), this.controlBox)) {
              this.moveables.forEach(function (n) {
                n.updateRect(t, !1, !1);
              });
              var r = this.state,
                i = this.props,
                o = r.target || i.target;
              (!n || ("" !== t && i.updateGroup)) &&
                ((this.rotation = i.defaultGroupRotate),
                (this.transformOrigin = i.defaultGroupOrigin || "50% 50%"),
                (this.scale = [1, 1]));
              var a = this.rotation,
                s = this.scale,
                u = (function (t, n) {
                  if (!t.length) return [0, 0, 0, 0];
                  var e = t.map(function (t) {
                      return Vr(t.state);
                    }),
                    r = pr,
                    i = pr,
                    o = 0,
                    a = 0,
                    s = Wr(n, cr);
                  if (s % 90) {
                    var u = (s / 180) * Math.PI,
                      l = Math.tan(u),
                      c = -1 / l,
                      f = [dr, pr],
                      p = [dr, pr];
                    e.forEach(function (t) {
                      t.forEach(function (t) {
                        var n = t[1] - l * t[0],
                          e = t[1] - c * t[0];
                        (f[0] = Math.max(f[0], n)),
                          (f[1] = Math.min(f[1], n)),
                          (p[0] = Math.max(p[0], e)),
                          (p[1] = Math.min(p[1], e));
                      });
                    }),
                      f.forEach(function (t) {
                        p.forEach(function (n) {
                          var e = (n - t) / (l - c),
                            o = l * e + t;
                          (r = Math.min(r, e)), (i = Math.min(i, o));
                        });
                      });
                    var d = e.map(function (t) {
                      var n = t[0],
                        e = t[1],
                        r = t[2],
                        i = t[3];
                      return [oe(n, -u), oe(e, -u), oe(r, -u), oe(i, -u)];
                    });
                    (o = rs(d, 0) - is(d, 0)), (a = rs(d, 1) - is(d, 1));
                  } else if (
                    ((r = is(e, 0)),
                    (i = is(e, 1)),
                    (o = rs(e, 0) - r),
                    (a = rs(e, 1) - i),
                    s % 180)
                  ) {
                    var h = o;
                    (o = a), (a = h);
                  }
                  return [r, i, o, a];
                })(this.moveables, a),
                l = u[0],
                c = u[1],
                f = u[2],
                p = u[3],
                d =
                  "rotate(" +
                  a +
                  "deg) scale(" +
                  (s[0] >= 0 ? 1 : -1) +
                  ", " +
                  (s[1] >= 0 ? 1 : -1) +
                  ")";
              (o.style.cssText +=
                "left:0px;top:0px; transform-origin: " +
                this.transformOrigin +
                "; width:" +
                f +
                "px; height:" +
                p +
                "px;transform:" +
                d),
                (r.width = f),
                (r.height = p);
              var h = this.getContainer(),
                v = Xr(
                  this.controlBox.getElement(),
                  o,
                  this.controlBox.getElement(),
                  this.getContainer(),
                  this.props.rootContainer || h
                ),
                g = [v.left, v.top],
                m = Vr(v),
                b = m[0],
                x = m[1],
                y = m[2],
                E = m[3],
                S = me([b, x, y, E]),
                w = [S.minX, S.minY];
              (v.pos1 = Jn(b, w)),
                (v.pos2 = Jn(x, w)),
                (v.pos3 = Jn(y, w)),
                (v.pos4 = Jn(E, w)),
                (v.left = l - v.left + w[0]),
                (v.top = c - v.top + w[1]),
                (v.origin = Jn(Kn(g, v.origin), w)),
                (v.beforeOrigin = Jn(Kn(g, v.beforeOrigin), w)),
                (v.originalBeforeOrigin = Kn(g, v.originalBeforeOrigin));
              var M = v.targetClientRect,
                C = s[0] * s[1] > 0 ? 1 : -1;
              (M.top += v.top - r.top),
                (M.left += v.left - r.left),
                (o.style.transform =
                  "translate(" + -w[0] + "px, " + -w[1] + "px) " + d),
                this.updateState(
                  tr(tr({}, v), { direction: C, beforeDirection: C }),
                  e
                );
            }
          }),
          (e.getRect = function () {
            return tr(tr({}, t.prototype.getRect.call(this)), {
              children: this.moveables.map(function (t) {
                return t.getRect();
              }),
            });
          }),
          (e.triggerEvent = function (n, e, r) {
            if (r || n.indexOf("Group") > -1)
              return t.prototype.triggerEvent.call(this, n, e);
          }),
          (e.updateAbles = function () {
            t.prototype.updateAbles.call(
              this,
              nr(this.props.ables, [Wa]),
              "Group"
            );
          }),
          (n.defaultProps = tr(tr({}, Va.defaultProps), {
            transformOrigin: ["50%", "50%"],
            groupable: !0,
            dragArea: !0,
            keepRatio: !0,
            targets: [],
            defaultGroupRotate: 0,
            defaultGroupOrigin: "50% 50%",
          })),
          n
        );
      })(Va),
      as = (function (t) {
        function n() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return (n.moveables = []), n;
        }
        Qe(n, t);
        var e = n.prototype;
        return (
          (e.render = function () {
            var t = this,
              n = this.props,
              e = n.cspNonce,
              r = n.cssStyled,
              i = n.targets;
            return pn(
              r,
              {
                cspNonce: e,
                ref: dt(this, "controlBox"),
                className: br("control-box"),
              },
              i.map(function (n, e) {
                return pn(
                  Va,
                  tr(
                    { key: "moveable" + e, ref: ht(t, "moveables", e) },
                    t.props,
                    { target: n, wrapperMoveable: t }
                  )
                );
              })
            );
          }),
          (e.componentDidUpdate = function () {}),
          (e.updateRect = function (t, n, e) {
            void 0 === e && (e = !0),
              this.moveables.forEach(function (r) {
                r.updateRect(t, n, e);
              });
          }),
          (e.getRect = function () {
            return tr(tr({}, t.prototype.getRect.call(this)), {
              children: this.moveables.map(function (t) {
                return t.getRect();
              }),
            });
          }),
          (e.request = function () {
            return {
              request: function () {
                return this;
              },
              requestEnd: function () {
                return this;
              },
            };
          }),
          (e.dragStart = function () {
            return this;
          }),
          (e.hitTest = function () {
            return 0;
          }),
          (e.isInside = function () {
            return !1;
          }),
          (e.isDragging = function () {
            return !1;
          }),
          (e.updateRenderPoses = function () {}),
          (e.updateEvent = function () {}),
          (e.checkUpdate = function () {}),
          (e.triggerEvent = function () {}),
          (e.updateAbles = function () {}),
          n
        );
      })(Va),
      ss = (function (t) {
        function n() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return Qe(n, t), (n.defaultAbles = Ka), n;
      })(
        (function (t) {
          function n() {
            var n = (null !== t && t.apply(this, arguments)) || this;
            return (n.refTargets = []), (n.selectorMap = {}), n;
          }
          Qe(n, t);
          var e,
            r,
            i = n.prototype;
          return (
            (n.makeStyled = function () {
              var t = {};
              this.getTotalAbles().forEach(function (n) {
                var e = n.css;
                e &&
                  e.forEach(function (n) {
                    t[n] = !0;
                  });
              });
              var n = Yt(t).join("\n");
              this.defaultStyled = Ke(
                "div",
                (function (t, n) {
                  return n.replace(/([^}{]*){/gm, function (n, e) {
                    return e.replace(/\.([^{,\s\d.]+)/g, "." + t + "$1") + "{";
                  });
                })(sr, ur + n)
              );
            }),
            (n.getTotalAbles = function () {
              return nr([ga, Wa, Za, pa], this.defaultAbles);
            }),
            (i.render = function () {
              var t = this.constructor;
              t.defaultStyled || t.makeStyled();
              var n = this.props,
                e = n.ables,
                r = n.props,
                i = (function (t, n) {
                  var e = {};
                  for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) &&
                      n.indexOf(r) < 0 &&
                      (e[r] = t[r]);
                  if (
                    null != t &&
                    "function" == typeof Object.getOwnPropertySymbols
                  ) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
                      n.indexOf(r[i]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
                        (e[r[i]] = t[r[i]]);
                  }
                  return e;
                })(n, ["ables", "props"]),
                o = di(i.target || i.targets),
                a = (function (t, n) {
                  var e = [];
                  return (
                    t.forEach(function (t) {
                      t && (Pt(t) ? n[t] && e.push.apply(e, n[t]) : e.push(t));
                    }),
                    e
                  );
                })(o, this.selectorMap);
              this.refTargets = o;
              var s = a.length > 1,
                u = nr(t.getTotalAbles(), e || []),
                l = tr(tr(tr({}, i), r || {}), {
                  ables: u,
                  cssStyled: t.defaultStyled,
                  customStyledMap: t.customStyledMap,
                });
              return s
                ? i.individualGroupable
                  ? pn(
                      as,
                      tr(
                        { key: "individual-group", ref: dt(this, "moveable") },
                        l,
                        { target: null, targets: a }
                      )
                    )
                  : pn(
                      os,
                      tr({ key: "group", ref: dt(this, "moveable") }, l, {
                        target: null,
                        targets: a,
                      })
                    )
                : pn(
                    Va,
                    tr({ key: "single", ref: dt(this, "moveable") }, l, {
                      target: a[0],
                    })
                  );
            }),
            (i.componentDidMount = function () {
              this.updateRefs();
            }),
            (i.componentDidUpdate = function () {
              this.updateRefs();
            }),
            (i.updateRefs = function (t) {
              var n = di(this.props.target || this.props.targets),
                e = this.refTargets.some(function (t, e) {
                  var r = n[e];
                  return !(!t && !r) && t !== r;
                }),
                r = t ? {} : this.selectorMap,
                i = {};
              this.refTargets.forEach(function (t) {
                Pt(t) &&
                  (r[t]
                    ? (i[t] = r[t])
                    : ((e = !0),
                      (i[t] = [].slice.call(document.querySelectorAll(t)))));
              }),
                (this.selectorMap = i),
                e && this.forceUpdate();
            }),
            (i.getManager = function () {
              return this.moveable;
            }),
            (n.defaultAbles = []),
            (n.customStyledMap = {}),
            (n.defaultStyled = null),
            (function (t, n, e, r) {
              var i,
                o = arguments.length,
                a =
                  o < 3
                    ? n
                    : null === r
                    ? (r = Object.getOwnPropertyDescriptor(n, e))
                    : r;
              if (
                "object" == typeof Reflect &&
                "function" == typeof Reflect.decorate
              )
                a = Reflect.decorate(t, n, e, r);
              else
                for (var s = t.length - 1; s >= 0; s--)
                  (i = t[s]) &&
                    (a = (o < 3 ? i(a) : o > 3 ? i(n, e, a) : i(n, e)) || a);
              o > 3 && a && Object.defineProperty(n, e, a);
            })(
              [
                ((e = mr),
                void 0 === r && (r = {}),
                function (t, n) {
                  e.forEach(function (e) {
                    var i = r[e] || e;
                    t[i] ||
                      (t[i] = function () {
                        for (var t, r = [], i = 0; i < arguments.length; i++)
                          r[i] = arguments[i];
                        var o = (t = this[n])[e].apply(t, r);
                        return o === this[n] ? this : o;
                      });
                  });
                }),
              ],
              n.prototype,
              "moveable",
              void 0
            ),
            n
          );
        })(wn)
      ),
      us = function (t, n) {
        return (us =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, n) {
              t.__proto__ = n;
            }) ||
          function (t, n) {
            for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
          })(t, n);
      };
    function ls(t, n) {
      function e() {
        this.constructor = t;
      }
      us(t, n),
        (t.prototype =
          null === n ? Object.create(n) : ((e.prototype = n.prototype), new e()));
    }
    var cs = function () {
      return (cs =
        Object.assign ||
        function (t) {
          for (var n, e = 1, r = arguments.length; e < r; e++)
            for (var i in (n = arguments[e]))
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          return t;
        }).apply(this, arguments);
    };
    var fs = (function (t) {
        function n(n) {
          var e = t.call(this, n) || this;
          return (e.state = {}), (e.state = e.props), e;
        }
        return (
          ls(n, t),
          (n.prototype.render = function () {
            return (
              (t = pn(ss, cs({ ref: dt(this, "moveable") }, this.state))),
              (n = this.state.parentElement),
              pn(Mn, { element: t, container: n })
            );
            var t, n;
          }),
          n
        );
      })(Sn),
      ps = es,
      ds = mr,
      hs = ns,
      vs = function () {
        return (vs =
          Object.assign ||
          function (t) {
            for (var n, e = 1, r = arguments.length; e < r; e++)
              for (var i in (n = arguments[e]))
                Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
            return t;
          }).apply(this, arguments);
      };
    var gs = (function (t) {
      function n() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return ls(n, t), n;
    })(
      (function (t) {
        function n(n, e) {
          void 0 === e && (e = {});
          var r = t.call(this) || this;
          r.tempElement = document.createElement("div");
          var i = cs({ container: n || document.body }, e),
            o = {};
          hs.forEach(function (t) {
            o[It("on " + t)] = function (n) {
              return r.trigger(t, n);
            };
          }),
            On(
              pn(fs, cs({ ref: dt(r, "innerMoveable"), parentElement: n }, i, o)),
              r.tempElement
            );
          var a = i.target;
          return Ot(a) && a.length > 1 && r.updateRect(), r;
        }
        ls(n, t);
        var e = n.prototype;
        return (
          (e.setState = function (t, n) {
            this.innerMoveable.setState(t, n);
          }),
          (e.destroy = function () {
            On(null, this.tempElement),
              this.off(),
              (this.tempElement = null),
              (this.innerMoveable = null);
          }),
          (e.getMoveable = function () {
            return this.innerMoveable.moveable;
          }),
          (n = (function (t, n, e, r) {
            var i,
              o = arguments.length,
              a =
                o < 3
                  ? n
                  : null === r
                  ? (r = Object.getOwnPropertyDescriptor(n, e))
                  : r;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              a = Reflect.decorate(t, n, e, r);
            else
              for (var s = t.length - 1; s >= 0; s--)
                (i = t[s]) &&
                  (a = (o < 3 ? i(a) : o > 3 ? i(n, e, a) : i(n, e)) || a);
            return o > 3 && a && Object.defineProperty(n, e, a), a;
          })(
            [
              vt(ds, function (t, n) {
                t[n] ||
                  (t[n] = function () {
                    for (var t = [], e = 0; e < arguments.length; e++)
                      t[e] = arguments[e];
                    var r = this.getMoveable();
                    if (r && r[n]) return r[n].apply(r, t);
                  });
              }),
              vt(ps, function (t, n) {
                Object.defineProperty(t, n, {
                  get: function () {
                    return this.getMoveable().props[n];
                  },
                  set: function (t) {
                    var e;
                    this.setState((((e = {})[n] = t), e));
                  },
                  enumerable: !0,
                  configurable: !0,
                });
              }),
            ],
            n
          ))
        );
      })(
        (function () {
          function t() {
            this._events = {};
          }
          var n = t.prototype;
          return (
            (n.on = function (t, n) {
              if (Rt(t)) for (var e in t) this.on(e, t[e]);
              else this._addEvent(t, n, {});
              return this;
            }),
            (n.off = function (t, n) {
              if (t)
                if (Rt(t)) for (var e in t) this.off(e);
                else if (n) {
                  var r = this._events[t];
                  if (r) {
                    var i = Ft(r, function (t) {
                      return t.listener === n;
                    });
                    i > -1 && r.splice(i, 1);
                  }
                } else this._events[t] = [];
              else this._events = {};
              return this;
            }),
            (n.once = function (t, n) {
              var e = this;
              return (
                n && this._addEvent(t, n, { once: !0 }),
                new Promise(function (n) {
                  e._addEvent(t, n, { once: !0 });
                })
              );
            }),
            (n.emit = function (t, n) {
              var e = this;
              void 0 === n && (n = {});
              var r = this._events[t];
              if (!t || !r) return !0;
              var i = !1;
              return (
                (n.eventType = t),
                (n.stop = function () {
                  i = !0;
                }),
                (n.currentTarget = this),
                (function () {
                  for (var t = 0, n = 0, e = arguments.length; n < e; n++)
                    t += arguments[n].length;
                  var r = Array(t),
                    i = 0;
                  for (n = 0; n < e; n++)
                    for (
                      var o = arguments[n], a = 0, s = o.length;
                      a < s;
                      a++, i++
                    )
                      r[i] = o[a];
                  return r;
                })(r).forEach(function (r) {
                  r.listener(n), r.once && e.off(t, r.listener);
                }),
                !i
              );
            }),
            (n.trigger = function (t, n) {
              return void 0 === n && (n = {}), this.emit(t, n);
            }),
            (n._addEvent = function (t, n, e) {
              var r = this._events;
              (r[t] = r[t] || []), r[t].push(vs({ listener: n }, e));
            }),
            t
          );
        })()
      )
    );
    function ms(t, n, r) {
      const i = (function () {
        const t = z();
        return (n, e) => {
          const r = t.$$.callbacks[n];
          if (r) {
            const i = w(n, e);
            r.slice().forEach((n) => {
              n.call(t, i);
            });
          }
        };
      })();
      let o,
        a,
        s = {};
      var l;
      return (
        (l = () => {
          const t = n;
          (s = {}),
            ps.forEach((n) => {
              n in t && (s[n] = t[n]);
            }),
            (o = s.container || n.container || document.body),
            a &&
              (j(), A).then(() => {
                a.setState({ ...s, container: o, parentElement: o });
              });
        }),
        z().$$.before_update.push(l),
        G(() => {
          (a = new gs(o || document.body, s)),
            hs.forEach((t) => {
              const e = It(`on ${t}`);
              a.on(t, (r) => {
                const o = n[e] && n[e](r),
                  a = i(t, r);
                return Dt(o) ? (Dt(a) ? void 0 : a) : o;
              });
            });
        }),
        (function (t) {
          z().$$.on_destroy.push(t);
        })(() => {
          a.destroy();
        }),
        (t.$set = (t) => {
          r(5, (n = e(e({}, n), u(t))));
        }),
        (n = u(n)),
        [
          function () {
            return a;
          },
        ]
      );
    }
    class bs extends at {
      constructor(t) {
        super(), ot(this, t, ms, null, s, { getInstance: 0 });
      }
      get getInstance() {
        return this.$$.ctx[0];
      }
    }
    var xs = (() => {
      const t = bs.prototype;
      return (
        ds.forEach((n) => {
          t[n] = function (...t) {
            const e = this.getInstance(),
              r = e[n](...t);
            return r === e ? this : r;
          };
        }),
        bs
      );
    })();
    function ys(t) {
      let n,
        e,
        r,
        i,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        y,
        w,
        M,
        C,
        D,
        R,
        O,
        P,
        z,
        G,
        B = t[1] ? "Ready" : "Wait";
      return (
        (O = new xs({
          props: {
            target: t[2],
            className: "moveable",
            draggable: !0,
            throttleDrag: 0,
            zoom: 1,
            origin: !0,
          },
        })),
        O.$on("dragStart", t[9]),
        O.$on("drag", t[10]),
        O.$on("render", t[11]),
        {
          c() {
            (n = m("div")),
              (e = m("div")),
              (r = m("img")),
              (a = x()),
              (s = m("h5")),
              (s.innerHTML = "Aiki<sup>3</sup>"),
              (u = x()),
              (l = m("div")),
              (l.innerHTML =
                '<div id="aiki-leftright" class="svelte-1qhk935"></div> \n      <div id="aiki-rightleft" class="svelte-1qhk935"></div>'),
              (c = x()),
              (f = m("button")),
              (p = m("p")),
              (p.textContent = "Continue"),
              (d = x()),
              (y = m("p")),
              (w = m("code")),
              (M = b(B)),
              (R = x()),
              et(O.$$.fragment),
              S(r, "id", "aiki-img"),
              r.src !== (i = browser.runtime.getURL("images/AikiLogo.png")) &&
                S(r, "src", browser.runtime.getURL("images/AikiLogo.png")),
              S(r, "alt", "Aiki Logo"),
              S(r, "class", "svelte-1qhk935"),
              S(s, "id", "aiki-h5"),
              S(s, "class", "svelte-1qhk935"),
              S(l, "id", "aiki-close-container"),
              S(l, "class", "svelte-1qhk935"),
              S(e, "id", "aiki-header"),
              S(e, "class", "svelte-1qhk935"),
              S(p, "class", "svelte-1qhk935"),
              S(w, "class", "svelte-1qhk935"),
              S(y, "class", "svelte-1qhk935"),
              S(f, "id", "aiki-button"),
              (f.disabled = C = !t[1]),
              S(f, "class", "svelte-1qhk935"),
              S(n, "class", "aiki-overlay svelte-1qhk935");
          },
          m(i, o) {
            v(i, n, o),
              h(n, e),
              h(e, r),
              h(e, a),
              h(e, s),
              h(e, u),
              h(e, l),
              h(n, c),
              h(n, f),
              h(f, p),
              h(f, d),
              h(f, y),
              h(y, w),
              h(w, M),
              t[8](n),
              v(i, R, o),
              rt(O, i, o),
              (P = !0),
              z || ((G = [E(l, "click", t[4]), E(f, "click", t[7])]), (z = !0));
          },
          p(t, [n]) {
            (!P || 2 & n) &&
              B !== (B = t[1] ? "Ready" : "Wait") &&
              (function (t, n) {
                (n = "" + n), t.wholeText !== n && (t.data = n);
              })(M, B),
              (!P || (2 & n && C !== (C = !t[1]))) && (f.disabled = C);
            const e = {};
            4 & n && (e.target = t[2]), O.$set(e);
          },
          i(t) {
            P ||
              (N(() => {
                D || (D = tt(n, st, { delay: 0, duration: 200 }, !0)), D.run(1);
              }),
              K(O.$$.fragment, t),
              (P = !0));
          },
          o(t) {
            D || (D = tt(n, st, { delay: 0, duration: 200 }, !1)),
              D.run(0),
              J(O.$$.fragment, t),
              (P = !1);
          },
          d(e) {
            e && g(n),
              t[8](null),
              e && D && D.end(),
              e && g(R),
              it(O, e),
              (z = !1),
              o(G);
          },
        }
      );
    }
    function Es(t, n, e) {
      let r,
        i = { translate: [0, 0], rotate: 0, transformOrigin: "50% 50%" },
        { gotoOrigin: o } = n,
        { continueVisible: a } = n,
        { canContinue: s } = n,
        { endInjection: u } = n;
      G(() => {
        document.querySelector(".moveable-control-box").style.visibility =
          "hidden";
      });
      return (
        (t.$$set = (t) => {
          "gotoOrigin" in t && e(0, (o = t.gotoOrigin)),
            "continueVisible" in t && e(5, (a = t.continueVisible)),
            "canContinue" in t && e(1, (s = t.canContinue)),
            "endInjection" in t && e(6, (u = t.endInjection));
        }),
        [
          o,
          s,
          r,
          i,
          function () {
            e(5, (a = !1)), u();
          },
          a,
          u,
          () => o("injected"),
          function (t) {
            T[t ? "unshift" : "push"](() => {
              (r = t), e(2, r);
            });
          },
          ({ detail: t }) => {
            t.set(i.translate);
          },
          ({ detail: t }) => {
            e(3, (i.translate = t.beforeTranslate), i);
          },
          ({ detail: t }) => {
            const { translate: n, rotate: e, transformOrigin: r } = i;
            (t.target.style.transformOrigin = r),
              (t.target.style.transform = `translate(${n[0]}px, ${n[1]}px) rotate(${e}deg)`);
          },
        ]
      );
    }
    class Ss extends at {
      constructor(t) {
        super(),
          ot(this, t, Es, ys, s, {
            gotoOrigin: 0,
            continueVisible: 5,
            canContinue: 1,
            endInjection: 6,
          });
      }
    }
    function ws(t) {
      let n, e, r;
      function i(n) {
        t[6](n);
      }
      let o = {};
      return (
        void 0 !== t[0] && (o.welcomeVisible = t[0]),
        (n = new ft({ props: o })),
        T.push(() => nt(n, "welcomeVisible", i)),
        {
          c() {
            et(n.$$.fragment);
          },
          m(t, e) {
            rt(n, t, e), (r = !0);
          },
          p(t, r) {
            const i = {};
            !e &&
              1 & r &&
              ((e = !0), (i.welcomeVisible = t[0]), F(() => (e = !1))),
              n.$set(i);
          },
          i(t) {
            r || (K(n.$$.fragment, t), (r = !0));
          },
          o(t) {
            J(n.$$.fragment, t), (r = !1);
          },
          d(t) {
            it(n, t);
          },
        }
      );
    }
    function Ms(t) {
      let n, e, r, i;
      function o(n) {
        t[7](n);
      }
      function a(n) {
        t[8](n);
      }
      let s = { gotoOrigin: t[1], endInjection: t[2] };
      return (
        void 0 !== t[3] && (s.continueVisible = t[3]),
        void 0 !== t[4] && (s.canContinue = t[4]),
        (n = new Ss({ props: s })),
        T.push(() => nt(n, "continueVisible", o)),
        T.push(() => nt(n, "canContinue", a)),
        {
          c() {
            et(n.$$.fragment);
          },
          m(t, e) {
            rt(n, t, e), (i = !0);
          },
          p(t, i) {
            const o = {};
            2 & i && (o.gotoOrigin = t[1]),
              4 & i && (o.endInjection = t[2]),
              !e &&
                8 & i &&
                ((e = !0), (o.continueVisible = t[3]), F(() => (e = !1))),
              !r &&
                16 & i &&
                ((r = !0), (o.canContinue = t[4]), F(() => (r = !1))),
              n.$set(o);
          },
          i(t) {
            i || (K(n.$$.fragment, t), (i = !0));
          },
          o(t) {
            J(n.$$.fragment, t), (i = !1);
          },
          d(t) {
            it(n, t);
          },
        }
      );
    }
    function Cs(t) {
      let n,
        e,
        r,
        i = t[0] && ws(t),
        o = t[3] && Ms(t);
      return {
        c() {
          i && i.c(), (n = x()), o && o.c(), (e = y());
        },
        m(t, a) {
          i && i.m(t, a), v(t, n, a), o && o.m(t, a), v(t, e, a), (r = !0);
        },
        p(t, [r]) {
          t[0]
            ? i
              ? (i.p(t, r), 1 & r && K(i, 1))
              : ((i = ws(t)), i.c(), K(i, 1), i.m(n.parentNode, n))
            : i &&
              (U(),
              J(i, 1, 1, () => {
                i = null;
              }),
              Z()),
            t[3]
              ? o
                ? (o.p(t, r), 8 & r && K(o, 1))
                : ((o = Ms(t)), o.c(), K(o, 1), o.m(e.parentNode, e))
              : o &&
                (U(),
                J(o, 1, 1, () => {
                  o = null;
                }),
                Z());
        },
        i(t) {
          r || (K(i), K(o), (r = !0));
        },
        o(t) {
          J(i), J(o), (r = !1);
        },
        d(t) {
          i && i.d(t), t && g(n), o && o.d(t), t && g(e);
        },
      };
    }
    function Ds(t, n, e) {
      let { gotoOrigin: r } = n,
        { countdown: i } = n,
        { endInjection: o } = n,
        { welcomeVisible: a } = n,
        s = !0,
        u = !1;
      return (
        setTimeout(() => {
          e(4, (u = !0));
        }, i),
        (t.$$set = (t) => {
          "gotoOrigin" in t && e(1, (r = t.gotoOrigin)),
            "countdown" in t && e(5, (i = t.countdown)),
            "endInjection" in t && e(2, (o = t.endInjection)),
            "welcomeVisible" in t && e(0, (a = t.welcomeVisible));
        }),
        [
          a,
          r,
          o,
          s,
          u,
          i,
          function (t) {
            (a = t), e(0, a);
          },
          function (t) {
            (s = t), e(3, s);
          },
          function (t) {
            (u = t), e(4, u);
          },
        ]
      );
    }
    return new (class extends at {
      constructor(t) {
        super(),
          ot(this, t, Ds, Cs, s, {
            gotoOrigin: 1,
            countdown: 5,
            endInjection: 2,
            welcomeVisible: 0,
          });
      }
    })({
      target: document.body,
      props: {
        countdown: countdown,
        welcomeVisible: shouldShowWelcome,
        gotoOrigin: gotoOrigin,
        endInjection: endInjection,
      },
    });
  };
  //# sourceMappingURL=bundle.js.map
  