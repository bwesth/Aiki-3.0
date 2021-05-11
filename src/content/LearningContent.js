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
  function i() {
    return Object.create(null);
  }
  function o(t) {
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
  function m(t, n, e) {
    t.insertBefore(n, e || null);
  }
  function g(t) {
    t.parentNode.removeChild(t);
  }
  function p(t) {
    return document.createElement(t);
  }
  function h(t) {
    return document.createTextNode(t);
  }
  function $() {
    return h(" ");
  }
  function b() {
    return h("");
  }
  function v(t, n, e, i) {
    return t.addEventListener(n, e, i), () => t.removeEventListener(n, e, i);
  }
  function y(t, n, e) {
    null == e
      ? t.removeAttribute(n)
      : t.getAttribute(n) !== e && t.setAttribute(n, e);
  }
  const _ = new Set();
  let k,
    w = 0;
  function j(t, n, e, i, o, s, c, r = 0) {
    const l = 16.666 / i;
    let u = "{\n";
    for (let t = 0; t <= 1; t += l) {
      const i = n + (e - n) * s(t);
      u += 100 * t + `%{${c(i, 1 - i)}}\n`;
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
    const m =
        f.__svelte_stylesheet ||
        (f.__svelte_stylesheet = f.head.appendChild(p("style")).sheet),
      g = f.__svelte_rules || (f.__svelte_rules = {});
    g[d] ||
      ((g[d] = !0), m.insertRule(`@keyframes ${d} ${a}`, m.cssRules.length));
    const h = t.style.animation || "";
    return (
      (t.style.animation = `${
        h ? `${h}, ` : ""
      }${d} ${i}ms linear ${o}ms 1 both`),
      (w += 1),
      d
    );
  }
  function x(t, n) {
    const e = (t.style.animation || "").split(", "),
      i = e.filter(
        n ? (t) => t.indexOf(n) < 0 : (t) => -1 === t.indexOf("__svelte")
      ),
      o = e.length - i.length;
    o &&
      ((t.style.animation = i.join(", ")),
      (w -= o),
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
  function V(t) {
    k = t;
  }
  const C = [],
    O = [],
    E = [],
    A = [],
    L = Promise.resolve();
  let I = !1;
  function q(t) {
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
        for (let t = 0; t < C.length; t += 1) {
          const n = C[t];
          V(n), S(n.$$);
        }
        for (V(null), C.length = 0; O.length; ) O.pop()();
        for (let t = 0; t < E.length; t += 1) {
          const n = E[t];
          N.has(n) || (N.add(n), n());
        }
        E.length = 0;
      } while (C.length);
      for (; A.length; ) A.pop()();
      (I = !1), (M = !1), N.clear();
    }
  }
  function S(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update);
      const n = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, n),
        t.after_update.forEach(q);
    }
  }
  let R;
  function z(t, n, e) {
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
    H.r || o(H.c), (H = H.p);
  }
  function G(t, n) {
    t && t.i && (D.delete(t), t.i(n));
  }
  function J(t, n, e, i) {
    if (t && t.o) {
      if (D.has(t)) return;
      D.add(t),
        H.c.push(() => {
          D.delete(t), i && (e && t.d(1), i());
        }),
        t.o(n);
    }
  }
  const K = { duration: 0 };
  function Q(e, i, c, r) {
    let f = i(e, c),
      m = r ? 0 : 1,
      g = null,
      p = null,
      h = null;
    function $() {
      h && x(e, h);
    }
    function b(t, n) {
      const e = t.b - m;
      return (
        (n *= Math.abs(e)),
        {
          a: m,
          b: t.b,
          d: e,
          duration: n,
          start: t.start,
          end: t.start + n,
          group: t.group,
        }
      );
    }
    function v(i) {
      const {
          delay: s = 0,
          duration: c = 300,
          easing: r = n,
          tick: v = t,
          css: y,
        } = f || K,
        _ = { start: l() + s, b: i };
      i || ((_.group = H), (H.r += 1)),
        g || p
          ? (p = _)
          : (y && ($(), (h = j(e, m, i, c, s, r, y))),
            i && v(0, 1),
            (g = b(_, c)),
            q(() => z(e, i, "start")),
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
                  ((g = b(p, c)),
                  (p = null),
                  z(e, g.b, "start"),
                  y && ($(), (h = j(e, m, g.b, g.duration, 0, r, f.css)))),
                g)
              )
                if (t >= g.end)
                  v((m = g.b), 1 - m),
                    z(e, g.b, "end"),
                    p || (g.b ? $() : --g.group.r || o(g.group.c)),
                    (g = null);
                else if (t >= g.start) {
                  const n = t - g.start;
                  (m = g.a + g.d * r(n / g.duration)), v(m, 1 - m);
                }
              return !(!g && !p);
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
        $(), (g = p = null);
      },
    };
  }
  function U(t, n, e) {
    const i = t.$$.props[n];
    void 0 !== i && ((t.$$.bound[i] = e), e(t.$$.ctx[i]));
  }
  function W(t) {
    t && t.c();
  }
  function X(t, n, i, c) {
    const { fragment: r, on_mount: l, on_destroy: u, after_update: a } = t.$$;
    r && r.m(n, i),
      c ||
        q(() => {
          const n = l.map(e).filter(s);
          u ? u.push(...n) : o(n), (t.$$.on_mount = []);
        }),
      a.forEach(q);
  }
  function Y(t, n) {
    const e = t.$$;
    null !== e.fragment &&
      (o(e.on_destroy),
      e.fragment && e.fragment.d(n),
      (e.on_destroy = e.fragment = null),
      (e.ctx = []));
  }
  function Z(t, n) {
    -1 === t.$$.dirty[0] &&
      (C.push(t), I || ((I = !0), L.then(P)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
  }
  function tt(n, e, s, c, r, l, u = [-1]) {
    const a = k;
    V(n);
    const d = (n.$$ = {
      fragment: null,
      ctx: null,
      props: l,
      update: t,
      not_equal: r,
      bound: i(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(a ? a.$$.context : e.context || []),
      callbacks: i(),
      dirty: u,
      skip_bound: !1,
    });
    let f = !1;
    if (
      ((d.ctx = s
        ? s(n, e.props || {}, (t, e, ...i) => {
            const o = i.length ? i[0] : e;
            return (
              d.ctx &&
                r(d.ctx[t], (d.ctx[t] = o)) &&
                (!d.skip_bound && d.bound[t] && d.bound[t](o), f && Z(n, t)),
              e
            );
          })
        : []),
      d.update(),
      (f = !0),
      o(d.before_update),
      (d.fragment = !!c && c(d.ctx)),
      e.target)
    ) {
      if (e.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(e.target);
        d.fragment && d.fragment.l(t), t.forEach(g);
      } else d.fragment && d.fragment.c();
      e.intro && G(n.$$.fragment),
        X(n, e.target, e.anchor, e.customElement),
        P();
    }
    V(a);
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
  function et(t, { delay: e = 0, duration: i = 400, easing: o = n } = {}) {
    const s = +getComputedStyle(t).opacity;
    return {
      delay: e,
      duration: i,
      easing: o,
      css: (t) => "opacity: " + t * s,
    };
  }
  function it(n) {
    let e, i, o, s, c, r, l, u, a, d;
    return {
      c() {
        (e = p("div")),
          (i = p("div")),
          (o = p("img")),
          (c = $()),
          (r = p("p")),
          (r.textContent = `${n[2]}`),
          y(o, "id", "aiki-img"),
          o.src !== (s = browser.runtime.getURL("images/AikiLogo.png")) &&
            y(o, "src", browser.runtime.getURL("images/AikiLogo.png")),
          y(o, "alt", "Aiki Logo"),
          y(o, "class", "svelte-tkxhh1"),
          y(r, "id", "aiki-p"),
          y(r, "class", "svelte-tkxhh1"),
          y(i, "id", "aiki-wrapper"),
          y(i, "class", "svelte-tkxhh1"),
          y(e, "id", "aiki-overlay"),
          y(e, "class", "svelte-tkxhh1");
      },
      m(t, s) {
        m(t, e, s),
          f(e, i),
          f(i, o),
          f(i, c),
          f(i, r),
          (u = !0),
          a || ((d = v(e, "click", n[3])), (a = !0));
      },
      p: t,
      i(t) {
        u ||
          (q(() => {
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
        t && g(e), t && l && l.end(), (a = !1), d();
      },
    };
  }
  function ot(t) {
    let n,
      e,
      i = t[1] && it(t);
    return {
      c() {
        i && i.c(), (n = b());
      },
      m(t, o) {
        i && i.m(t, o), m(t, n, o), (e = !0);
      },
      p(t, [e]) {
        t[1]
          ? i
            ? (i.p(t, e), 2 & e && G(i, 1))
            : ((i = it(t)), i.c(), G(i, 1), i.m(n.parentNode, n))
          : i &&
            (B(),
            J(i, 1, 1, () => {
              i = null;
            }),
            F());
      },
      i(t) {
        e || (G(i), (e = !0));
      },
      o(t) {
        J(i), (e = !1);
      },
      d(t) {
        i && i.d(t), t && g(n);
      },
    };
  }
  function st(t, n, e) {
    let { welcomeVisible: i } = n,
      o = !0;
    setTimeout(() => e(1, (o = !1)), 2e3);
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
        "welcomeVisible" in t && e(0, (i = t.welcomeVisible));
      }),
      [i, o, c, () => e(0, (i = !1))]
    );
  }
  class ct extends nt {
    constructor(t) {
      super(), tt(this, t, st, ot, c, { welcomeVisible: 0 });
    }
  }
  function rt(t) {
    let n, e, i, s, c, r, l, u, a, d, h, b, _, k, w, j;
    return {
      c() {
        (n = p("div")),
          (e = p("div")),
          (i = p("img")),
          (c = $()),
          (r = p("h5")),
          (r.innerHTML = "Aiki<sup>3</sup>"),
          (l = $()),
          (u = p("div")),
          (u.innerHTML =
            '<div id="aiki-leftright" class="svelte-1jmla3q"></div> \n      <div id="aiki-rightleft" class="svelte-1jmla3q"></div>'),
          (a = $()),
          (d = p("button")),
          (h = p("p")),
          (h.textContent = "Continue"),
          y(i, "id", "aiki-img"),
          i.src !== (s = browser.runtime.getURL("images/AikiLogo.png")) &&
            y(i, "src", browser.runtime.getURL("images/AikiLogo.png")),
          y(i, "alt", "Aiki Logo"),
          y(i, "class", "svelte-1jmla3q"),
          y(r, "id", "aiki-h5"),
          y(r, "class", "svelte-1jmla3q"),
          y(u, "id", "aiki-close-container"),
          y(u, "class", "svelte-1jmla3q"),
          y(e, "id", "aiki-header"),
          y(e, "class", "svelte-1jmla3q"),
          y(h, "id", "aiki-p"),
          y(h, "class", "svelte-1jmla3q"),
          y(d, "id", "aiki-button"),
          (d.disabled = b = !t[1]),
          y(d, "class", "svelte-1jmla3q"),
          y(n, "id", "aiki-overlay"),
          y(n, "class", "svelte-1jmla3q");
      },
      m(o, s) {
        m(o, n, s),
          f(n, e),
          f(e, i),
          f(e, c),
          f(e, r),
          f(e, l),
          f(e, u),
          f(n, a),
          f(n, d),
          f(d, h),
          (k = !0),
          w || ((j = [v(u, "click", t[2]), v(d, "click", t[5])]), (w = !0));
      },
      p(t, [n]) {
        (!k || (2 & n && b !== (b = !t[1]))) && (d.disabled = b);
      },
      i(t) {
        k ||
          (q(() => {
            _ || (_ = Q(n, et, { delay: 0, duration: 200 }, !0)), _.run(1);
          }),
          (k = !0));
      },
      o(t) {
        _ || (_ = Q(n, et, { delay: 0, duration: 200 }, !1)),
          _.run(0),
          (k = !1);
      },
      d(t) {
        t && g(n), t && _ && _.end(), (w = !1), o(j);
      },
    };
  }
  function lt(t, n, e) {
    let { gotoOrigin: i } = n,
      { continueVisible: o } = n,
      { canContinue: s } = n,
      { endInjection: c } = n;
    return (
      (t.$$set = (t) => {
        "gotoOrigin" in t && e(0, (i = t.gotoOrigin)),
          "continueVisible" in t && e(3, (o = t.continueVisible)),
          "canContinue" in t && e(1, (s = t.canContinue)),
          "endInjection" in t && e(4, (c = t.endInjection));
      }),
      [
        i,
        s,
        function () {
          e(3, (o = !1)), c();
        },
        o,
        c,
        () => i("injected"),
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
    let n, e, i;
    function o(n) {
      t[6](n);
    }
    let s = {};
    return (
      void 0 !== t[0] && (s.welcomeVisible = t[0]),
      (n = new ct({ props: s })),
      O.push(() => U(n, "welcomeVisible", o)),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, e) {
          X(n, t, e), (i = !0);
        },
        p(t, i) {
          const o = {};
          !e &&
            1 & i &&
            ((e = !0), (o.welcomeVisible = t[0]), T(() => (e = !1))),
            n.$set(o);
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
  function dt(t) {
    let n, e, i, o;
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
          X(n, t, e), (o = !0);
        },
        p(t, o) {
          const s = {};
          2 & o && (s.gotoOrigin = t[1]),
            4 & o && (s.endInjection = t[2]),
            !e &&
              8 & o &&
              ((e = !0), (s.continueVisible = t[3]), T(() => (e = !1))),
            !i &&
              16 & o &&
              ((i = !0), (s.canContinue = t[4]), T(() => (i = !1))),
            n.$set(s);
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
  function ft(t) {
    let n,
      e,
      i,
      o = t[0] && at(t),
      s = t[3] && dt(t);
    return {
      c() {
        o && o.c(), (n = $()), s && s.c(), (e = b());
      },
      m(t, c) {
        o && o.m(t, c), m(t, n, c), s && s.m(t, c), m(t, e, c), (i = !0);
      },
      p(t, [i]) {
        t[0]
          ? o
            ? (o.p(t, i), 1 & i && G(o, 1))
            : ((o = at(t)), o.c(), G(o, 1), o.m(n.parentNode, n))
          : o &&
            (B(),
            J(o, 1, 1, () => {
              o = null;
            }),
            F()),
          t[3]
            ? s
              ? (s.p(t, i), 8 & i && G(s, 1))
              : ((s = dt(t)), s.c(), G(s, 1), s.m(e.parentNode, e))
            : s &&
              (B(),
              J(s, 1, 1, () => {
                s = null;
              }),
              F());
      },
      i(t) {
        i || (G(o), G(s), (i = !0));
      },
      o(t) {
        J(o), J(s), (i = !1);
      },
      d(t) {
        o && o.d(t), t && g(n), s && s.d(t), t && g(e);
      },
    };
  }
  function mt(t, n, e) {
    let { gotoOrigin: i } = n,
      { countdown: o } = n,
      { endInjection: s } = n,
      { welcomeVisible: c } = n,
      r = !0,
      l = !1;
    return (
      setTimeout(() => {
        e(4, (l = !0));
      }, o),
      (t.$$set = (t) => {
        "gotoOrigin" in t && e(1, (i = t.gotoOrigin)),
          "countdown" in t && e(5, (o = t.countdown)),
          "endInjection" in t && e(2, (s = t.endInjection)),
          "welcomeVisible" in t && e(0, (c = t.welcomeVisible));
      }),
      [
        c,
        i,
        s,
        r,
        l,
        o,
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
        tt(this, t, mt, ft, c, {
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
