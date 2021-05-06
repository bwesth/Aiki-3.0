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
  function e(t) {
    return t();
  }
  function o() {
    return Object.create(null);
  }
  function i(t) {
    t.forEach(e);
  }
  function s(t) {
    return "function" == typeof t;
  }
  function c(t, n) {
    return t != t
      ? n == n
      : t !== n || (t && "object" == typeof t) || "function" == typeof t;
  }
  const r = "undefined" != typeof window;
  let l = r ? () => window.performance.now() : () => Date.now(),
    u = r ? (t) => requestAnimationFrame(t) : t;
  const a = new Set();
  function d(t) {
    a.forEach((n) => {
      n.c(t) || (a.delete(n), n.f());
    }),
      0 !== a.size && u(d);
  }
  function f(t, n) {
    t.appendChild(n);
  }
  function g(t, n, e) {
    t.insertBefore(n, e || null);
  }
  function m(t) {
    t.parentNode.removeChild(t);
  }
  function p(t) {
    return document.createElement(t);
  }
  function $(t) {
    return document.createTextNode(t);
  }
  function h() {
    return $(" ");
  }
  function b() {
    return $("");
  }
  function v(t, n, e, o) {
    return t.addEventListener(n, e, o), () => t.removeEventListener(n, e, o);
  }
  function y(t, n, e) {
    null == e
      ? t.removeAttribute(n)
      : t.getAttribute(n) !== e && t.setAttribute(n, e);
  }
  const _ = new Set();
  let k,
    w = 0;
  function x(t, n, e, o, i, s, c, r = 0) {
    const l = 16.666 / o;
    let u = "{\n";
    for (let t = 0; t <= 1; t += l) {
      const o = n + (e - n) * s(t);
      u += 100 * t + `%{${c(o, 1 - o)}}\n`;
    }
    const a = u + `100% {${c(e, 1 - e)}}\n}`,
      d = `__svelte_${(function (t) {
        let n = 5381,
          e = t.length;
        for (; e--; ) n = ((n << 5) - n) ^ t.charCodeAt(e);
        return n >>> 0;
      })(a)}_${r}`,
      f = t.ownerDocument;
    _.add(f);
    const g =
        f.__svelte_stylesheet ||
        (f.__svelte_stylesheet = f.head.appendChild(p("style")).sheet),
      m = f.__svelte_rules || (f.__svelte_rules = {});
    m[d] ||
      ((m[d] = !0), g.insertRule(`@keyframes ${d} ${a}`, g.cssRules.length));
    const $ = t.style.animation || "";
    return (
      (t.style.animation = `${
        $ ? `${$}, ` : ""
      }${d} ${o}ms linear ${i}ms 1 both`),
      (w += 1),
      d
    );
  }
  function V(t, n) {
    const e = (t.style.animation || "").split(", "),
      o = e.filter(
        n ? (t) => t.indexOf(n) < 0 : (t) => -1 === t.indexOf("__svelte")
      ),
      i = e.length - o.length;
    i &&
      ((t.style.animation = o.join(", ")),
      (w -= i),
      w ||
        u(() => {
          w ||
            (_.forEach((t) => {
              const n = t.__svelte_stylesheet;
              let e = n.cssRules.length;
              for (; e--; ) n.deleteRule(e);
              t.__svelte_rules = {};
            }),
            _.clear());
        }));
  }
  function C(t) {
    k = t;
  }
  const j = [],
    O = [],
    E = [],
    A = [],
    L = Promise.resolve();
  let I = !1;
  function z(t) {
    E.push(t);
  }
  function T(t) {
    A.push(t);
  }
  let M = !1;
  const N = new Set();
  function P() {
    if (!M) {
      M = !0;
      do {
        for (let t = 0; t < j.length; t += 1) {
          const n = j[t];
          C(n), S(n.$$);
        }
        for (C(null), j.length = 0; O.length; ) O.pop()();
        for (let t = 0; t < E.length; t += 1) {
          const n = E[t];
          N.has(n) || (N.add(n), n());
        }
        E.length = 0;
      } while (j.length);
      for (; A.length; ) A.pop()();
      (I = !1), (M = !1), N.clear();
    }
  }
  function S(t) {
    if (null !== t.fragment) {
      t.update(), i(t.before_update);
      const n = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, n),
        t.after_update.forEach(z);
    }
  }
  let R;
  function q(t, n, e) {
    t.dispatchEvent(
      (function (t, n) {
        const e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, n), e;
      })(`${n ? "intro" : "outro"}${e}`)
    );
  }
  const D = new Set();
  let H;
  function B() {
    H = { r: 0, c: [], p: H };
  }
  function F() {
    H.r || i(H.c), (H = H.p);
  }
  function G(t, n) {
    t && t.i && (D.delete(t), t.i(n));
  }
  function J(t, n, e, o) {
    if (t && t.o) {
      if (D.has(t)) return;
      D.add(t),
        H.c.push(() => {
          D.delete(t), o && (e && t.d(1), o());
        }),
        t.o(n);
    }
  }
  const K = { duration: 0 };
  function Q(e, o, c, r) {
    let f = o(e, c),
      g = r ? 0 : 1,
      m = null,
      p = null,
      $ = null;
    function h() {
      $ && V(e, $);
    }
    function b(t, n) {
      const e = t.b - g;
      return (
        (n *= Math.abs(e)),
        {
          a: g,
          b: t.b,
          d: e,
          duration: n,
          start: t.start,
          end: t.start + n,
          group: t.group,
        }
      );
    }
    function v(o) {
      const {
          delay: s = 0,
          duration: c = 300,
          easing: r = n,
          tick: v = t,
          css: y,
        } = f || K,
        _ = { start: l() + s, b: o };
      o || ((_.group = H), (H.r += 1)),
        m || p
          ? (p = _)
          : (y && (h(), ($ = x(e, g, o, c, s, r, y))),
            o && v(0, 1),
            (m = b(_, c)),
            z(() => q(e, o, "start")),
            (function (t) {
              let n;
              0 === a.size && u(d),
                new Promise((e) => {
                  a.add((n = { c: t, f: e }));
                });
            })((t) => {
              if (
                (p &&
                  t > p.start &&
                  ((m = b(p, c)),
                  (p = null),
                  q(e, m.b, "start"),
                  y && (h(), ($ = x(e, g, m.b, m.duration, 0, r, f.css)))),
                m)
              )
                if (t >= m.end)
                  v((g = m.b), 1 - g),
                    q(e, m.b, "end"),
                    p || (m.b ? h() : --m.group.r || i(m.group.c)),
                    (m = null);
                else if (t >= m.start) {
                  const n = t - m.start;
                  (g = m.a + m.d * r(n / m.duration)), v(g, 1 - g);
                }
              return !(!m && !p);
            }));
    }
    return {
      run(t) {
        s(f)
          ? (R ||
              ((R = Promise.resolve()),
              R.then(() => {
                R = null;
              })),
            R).then(() => {
              (f = f()), v(t);
            })
          : v(t);
      },
      end() {
        h(), (m = p = null);
      },
    };
  }
  function U(t, n, e) {
    const o = t.$$.props[n];
    void 0 !== o && ((t.$$.bound[o] = e), e(t.$$.ctx[o]));
  }
  function W(t) {
    t && t.c();
  }
  function X(t, n, o, c) {
    const { fragment: r, on_mount: l, on_destroy: u, after_update: a } = t.$$;
    r && r.m(n, o),
      c ||
        z(() => {
          const n = l.map(e).filter(s);
          u ? u.push(...n) : i(n), (t.$$.on_mount = []);
        }),
      a.forEach(z);
  }
  function Y(t, n) {
    const e = t.$$;
    null !== e.fragment &&
      (i(e.on_destroy),
      e.fragment && e.fragment.d(n),
      (e.on_destroy = e.fragment = null),
      (e.ctx = []));
  }
  function Z(t, n) {
    -1 === t.$$.dirty[0] &&
      (j.push(t), I || ((I = !0), L.then(P)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
  }
  function tt(n, e, s, c, r, l, u = [-1]) {
    const a = k;
    C(n);
    const d = (n.$$ = {
      fragment: null,
      ctx: null,
      props: l,
      update: t,
      not_equal: r,
      bound: o(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(a ? a.$$.context : e.context || []),
      callbacks: o(),
      dirty: u,
      skip_bound: !1,
    });
    let f = !1;
    if (
      ((d.ctx = s
        ? s(n, e.props || {}, (t, e, ...o) => {
            const i = o.length ? o[0] : e;
            return (
              d.ctx &&
                r(d.ctx[t], (d.ctx[t] = i)) &&
                (!d.skip_bound && d.bound[t] && d.bound[t](i), f && Z(n, t)),
              e
            );
          })
        : []),
      d.update(),
      (f = !0),
      i(d.before_update),
      (d.fragment = !!c && c(d.ctx)),
      e.target)
    ) {
      if (e.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(e.target);
        d.fragment && d.fragment.l(t), t.forEach(m);
      } else d.fragment && d.fragment.c();
      e.intro && G(n.$$.fragment),
        X(n, e.target, e.anchor, e.customElement),
        P();
    }
    C(a);
  }
  class nt {
    $destroy() {
      Y(this, 1), (this.$destroy = t);
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
  function et(t, { delay: e = 0, duration: o = 400, easing: i = n } = {}) {
    const s = +getComputedStyle(t).opacity;
    return {
      delay: e,
      duration: o,
      easing: i,
      css: (t) => "opacity: " + t * s,
    };
  }
  function ot(n) {
    let e, o, i, s, c, r, l, u, a, d;
    return {
      c() {
        (e = p("div")),
          (o = p("div")),
          (i = p("img")),
          (c = h()),
          (r = p("p")),
          (r.textContent = `${n[2]}`),
          y(i, "id", "aiki-img"),
          i.src !== (s = browser.runtime.getURL("images/AikiLogo.png")) &&
            y(i, "src", browser.runtime.getURL("images/AikiLogo.png")),
          y(i, "alt", "Aiki Logo"),
          y(i, "class", "svelte-9r98lt"),
          y(r, "id", "aiki-p"),
          y(r, "class", "svelte-9r98lt"),
          y(o, "id", "aiki-wrapper"),
          y(o, "class", "svelte-9r98lt"),
          y(e, "id", "aiki-overlay"),
          y(e, "class", "svelte-9r98lt");
      },
      m(t, s) {
        g(t, e, s),
          f(e, o),
          f(o, i),
          f(o, c),
          f(o, r),
          (u = !0),
          a || ((d = v(e, "click", n[3])), (a = !0));
      },
      p: t,
      i(t) {
        u ||
          (z(() => {
            l || (l = Q(e, et, { delay: 0, duration: 200 }, !0)), l.run(1);
          }),
          (u = !0));
      },
      o(t) {
        l || (l = Q(e, et, { delay: 0, duration: 200 }, !1)),
          l.run(0),
          (u = !1);
      },
      d(t) {
        t && m(e), t && l && l.end(), (a = !1), d();
      },
    };
  }
  function it(t) {
    let n,
      e,
      o = t[1] && ot(t);
    return {
      c() {
        o && o.c(), (n = b());
      },
      m(t, i) {
        o && o.m(t, i), g(t, n, i), (e = !0);
      },
      p(t, [e]) {
        t[1]
          ? o
            ? (o.p(t, e), 2 & e && G(o, 1))
            : ((o = ot(t)), o.c(), G(o, 1), o.m(n.parentNode, n))
          : o &&
            (B(),
            J(o, 1, 1, () => {
              o = null;
            }),
            F());
      },
      i(t) {
        e || (G(o), (e = !0));
      },
      o(t) {
        J(o), (e = !1);
      },
      d(t) {
        o && o.d(t), t && m(n);
      },
    };
  }
  function st(t, n, e) {
    let { welcomeVisible: o } = n,
      i = !0;
    setTimeout(() => e(1, (i = !1)), 2e3);
    const s = [
      "Let's do something productive! 😊",
      "Time to learn some Python! 🖥️",
      "Time for some more learning! 👓",
      "Let's earn some break time! ⏲️",
      "That's right, it's Python time! 🐍",
      "Let's get some coding done! 🤖",
      "Python won't teach itself! 👩‍🏫",
    ];
    let c = (function () {
      let t = ((n = 0), (e = 6), Math.floor(Math.random() * (e - n)) + n);
      var n, e;
      return s[t];
    })();
    return (
      (t.$$set = (t) => {
        "welcomeVisible" in t && e(0, (o = t.welcomeVisible));
      }),
      [o, i, c, () => e(0, (o = !1))]
    );
  }
  class ct extends nt {
    constructor(t) {
      super(), tt(this, t, st, it, c, { welcomeVisible: 0 });
    }
  }
  function rt(t) {
    let n, e, o, c, r, l, u, a, d, $, b, _, k, w, x, V;
    return {
      c() {
        (n = p("div")),
          (e = p("div")),
          (o = p("img")),
          (r = h()),
          (l = p("h5")),
          (l.innerHTML = "Aiki<sup>3</sup>"),
          (u = h()),
          (a = p("div")),
          (a.innerHTML =
            '<div class="leftright svelte-1kgoz3"></div> \n      <div class="rightleft svelte-1kgoz3"></div>'),
          (d = h()),
          ($ = p("button")),
          (b = p("p")),
          (b.textContent = "Continue"),
          y(o, "class", "aiki-img svelte-1kgoz3"),
          o.src !== (c = browser.runtime.getURL("images/AikiLogo.png")) &&
            y(o, "src", browser.runtime.getURL("images/AikiLogo.png")),
          y(o, "alt", "Aiki Logo"),
          y(l, "class", "svelte-1kgoz3"),
          y(a, "class", "close-container svelte-1kgoz3"),
          y(e, "class", "aiki-header svelte-1kgoz3"),
          y(b, "class", "aiki-p svelte-1kgoz3"),
          ($.disabled = _ = !t[1]),
          y($, "class", "svelte-1kgoz3"),
          y(n, "class", "aiki-overlay svelte-1kgoz3");
      },
      m(i, c) {
        g(i, n, c),
          f(n, e),
          f(e, o),
          f(e, r),
          f(e, l),
          f(e, u),
          f(e, a),
          f(n, d),
          f(n, $),
          f($, b),
          (w = !0),
          x ||
            ((V = [
              v(a, "click", t[2]),
              v($, "click", function () {
                s(t[0]) && t[0].apply(this, arguments);
              }),
            ]),
            (x = !0));
      },
      p(n, [e]) {
        (t = n), (!w || (2 & e && _ !== (_ = !t[1]))) && ($.disabled = _);
      },
      i(t) {
        w ||
          (z(() => {
            k || (k = Q(n, et, { delay: 0, duration: 200 }, !0)), k.run(1);
          }),
          (w = !0));
      },
      o(t) {
        k || (k = Q(n, et, { delay: 0, duration: 200 }, !1)),
          k.run(0),
          (w = !1);
      },
      d(t) {
        t && m(n), t && k && k.end(), (x = !1), i(V);
      },
    };
  }
  function lt(t, n, e) {
    let { gotoOrigin: o } = n,
      { continueVisible: i } = n,
      { canContinue: s } = n,
      { endInjection: c } = n;
    return (
      (t.$$set = (t) => {
        "gotoOrigin" in t && e(0, (o = t.gotoOrigin)),
          "continueVisible" in t && e(3, (i = t.continueVisible)),
          "canContinue" in t && e(1, (s = t.canContinue)),
          "endInjection" in t && e(4, (c = t.endInjection));
      }),
      [
        o,
        s,
        function () {
          e(3, (i = !1)), c();
        },
        i,
        c,
      ]
    );
  }
  class ut extends nt {
    constructor(t) {
      super(),
        tt(this, t, lt, rt, c, {
          gotoOrigin: 0,
          continueVisible: 3,
          canContinue: 1,
          endInjection: 4,
        });
    }
  }
  function at(t) {
    let n, e, o;
    function i(n) {
      t[6](n);
    }
    let s = {};
    return (
      void 0 !== t[0] && (s.welcomeVisible = t[0]),
      (n = new ct({ props: s })),
      O.push(() => U(n, "welcomeVisible", i)),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, e) {
          X(n, t, e), (o = !0);
        },
        p(t, o) {
          const i = {};
          !e &&
            1 & o &&
            ((e = !0), (i.welcomeVisible = t[0]), T(() => (e = !1))),
            n.$set(i);
        },
        i(t) {
          o || (G(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          J(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          Y(n, t);
        },
      }
    );
  }
  function dt(t) {
    let n, e, o, i;
    function s(n) {
      t[7](n);
    }
    function c(n) {
      t[8](n);
    }
    let r = { gotoOrigin: t[1], endInjection: t[2] };
    return (
      void 0 !== t[3] && (r.continueVisible = t[3]),
      void 0 !== t[4] && (r.canContinue = t[4]),
      (n = new ut({ props: r })),
      O.push(() => U(n, "continueVisible", s)),
      O.push(() => U(n, "canContinue", c)),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, e) {
          X(n, t, e), (i = !0);
        },
        p(t, i) {
          const s = {};
          2 & i && (s.gotoOrigin = t[1]),
            4 & i && (s.endInjection = t[2]),
            !e &&
              8 & i &&
              ((e = !0), (s.continueVisible = t[3]), T(() => (e = !1))),
            !o &&
              16 & i &&
              ((o = !0), (s.canContinue = t[4]), T(() => (o = !1))),
            n.$set(s);
        },
        i(t) {
          i || (G(n.$$.fragment, t), (i = !0));
        },
        o(t) {
          J(n.$$.fragment, t), (i = !1);
        },
        d(t) {
          Y(n, t);
        },
      }
    );
  }
  function ft(t) {
    let n,
      e,
      o,
      i = t[0] && at(t),
      s = t[3] && dt(t);
    return {
      c() {
        i && i.c(), (n = h()), s && s.c(), (e = b());
      },
      m(t, c) {
        i && i.m(t, c), g(t, n, c), s && s.m(t, c), g(t, e, c), (o = !0);
      },
      p(t, [o]) {
        t[0]
          ? i
            ? (i.p(t, o), 1 & o && G(i, 1))
            : ((i = at(t)), i.c(), G(i, 1), i.m(n.parentNode, n))
          : i &&
            (B(),
            J(i, 1, 1, () => {
              i = null;
            }),
            F()),
          t[3]
            ? s
              ? (s.p(t, o), 8 & o && G(s, 1))
              : ((s = dt(t)), s.c(), G(s, 1), s.m(e.parentNode, e))
            : s &&
              (B(),
              J(s, 1, 1, () => {
                s = null;
              }),
              F());
      },
      i(t) {
        o || (G(i), G(s), (o = !0));
      },
      o(t) {
        J(i), J(s), (o = !1);
      },
      d(t) {
        i && i.d(t), t && m(n), s && s.d(t), t && m(e);
      },
    };
  }
  function gt(t, n, e) {
    let { gotoOrigin: o } = n,
      { countdown: i } = n,
      { endInjection: s } = n,
      { welcomeVisible: c } = n,
      r = !0,
      l = !1;
    return (
      setTimeout(() => {
        e(4, (l = !0));
      }, i),
      (t.$$set = (t) => {
        "gotoOrigin" in t && e(1, (o = t.gotoOrigin)),
          "countdown" in t && e(5, (i = t.countdown)),
          "endInjection" in t && e(2, (s = t.endInjection)),
          "welcomeVisible" in t && e(0, (c = t.welcomeVisible));
      }),
      [
        c,
        o,
        s,
        r,
        l,
        i,
        function (t) {
          (c = t), e(0, c);
        },
        function (t) {
          (r = t), e(3, r);
        },
        function (t) {
          (l = t), e(4, l);
        },
      ]
    );
  }
  return new (class extends nt {
    constructor(t) {
      super(),
        tt(this, t, gt, ft, c, {
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
}
//# sourceMappingURL=bundle.js.map
