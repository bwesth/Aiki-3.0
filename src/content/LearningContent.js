export function LearningContent (countdown, gotoOrigin, browser) {
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
  function r(t) {
    return "function" == typeof t;
  }
  function s(t, n) {
    return t != t
      ? n == n
      : t !== n || (t && "object" == typeof t) || "function" == typeof t;
  }
  const c = "undefined" != typeof window;
  let u = c ? () => window.performance.now() : () => Date.now(),
    l = c ? (t) => requestAnimationFrame(t) : t;
  const a = new Set();
  function f(t) {
    a.forEach((n) => {
      n.c(t) || (a.delete(n), n.f());
    }),
      0 !== a.size && l(f);
  }
  function d(t, n) {
    t.appendChild(n);
  }
  function p(t, n, e) {
    t.insertBefore(n, e || null);
  }
  function m(t) {
    t.parentNode.removeChild(t);
  }
  function g(t) {
    return document.createElement(t);
  }
  function $(t) {
    return document.createTextNode(t);
  }
  function h() {
    return $(" ");
  }
  function y() {
    return $("");
  }
  function b(t, n, e, o) {
    return t.addEventListener(n, e, o), () => t.removeEventListener(n, e, o);
  }
  function v(t, n, e) {
    null == e
      ? t.removeAttribute(n)
      : t.getAttribute(n) !== e && t.setAttribute(n, e);
  }
  const _ = new Set();
  let w,
    k = 0;
  function x(t, n, e, o, i, r, s, c = 0) {
    const u = 16.666 / o;
    let l = "{\n";
    for (let t = 0; t <= 1; t += u) {
      const o = n + (e - n) * r(t);
      l += 100 * t + `%{${s(o, 1 - o)}}\n`;
    }
    const a = l + `100% {${s(e, 1 - e)}}\n}`,
      f = `__svelte_${(function (t) {
        let n = 5381,
          e = t.length;
        for (; e--; ) n = ((n << 5) - n) ^ t.charCodeAt(e);
        return n >>> 0;
      })(a)}_${c}`,
      d = t.ownerDocument;
    _.add(d);
    const p =
        d.__svelte_stylesheet ||
        (d.__svelte_stylesheet = d.head.appendChild(g("style")).sheet),
      m = d.__svelte_rules || (d.__svelte_rules = {});
    m[f] ||
      ((m[f] = !0), p.insertRule(`@keyframes ${f} ${a}`, p.cssRules.length));
    const $ = t.style.animation || "";
    return (
      (t.style.animation = `${
        $ ? `${$}, ` : ""
      }${f} ${o}ms linear ${i}ms 1 both`),
      (k += 1),
      f
    );
  }
  function C(t, n) {
    const e = (t.style.animation || "").split(", "),
      o = e.filter(
        n ? (t) => t.indexOf(n) < 0 : (t) => -1 === t.indexOf("__svelte")
      ),
      i = e.length - o.length;
    i &&
      ((t.style.animation = o.join(", ")),
      (k -= i),
      k ||
        l(() => {
          k ||
            (_.forEach((t) => {
              const n = t.__svelte_stylesheet;
              let e = n.cssRules.length;
              for (; e--; ) n.deleteRule(e);
              t.__svelte_rules = {};
            }),
            _.clear());
        }));
  }
  function O(t) {
    w = t;
  }
  const E = [],
    V = [],
    A = [],
    L = [],
    z = Promise.resolve();
  let T = !1;
  function M(t) {
    A.push(t);
  }
  function N(t) {
    L.push(t);
  }
  let P = !1;
  const S = new Set();
  function j() {
    if (!P) {
      P = !0;
      do {
        for (let t = 0; t < E.length; t += 1) {
          const n = E[t];
          O(n), R(n.$$);
        }
        for (O(null), E.length = 0; V.length; ) V.pop()();
        for (let t = 0; t < A.length; t += 1) {
          const n = A[t];
          S.has(n) || (S.add(n), n());
        }
        A.length = 0;
      } while (E.length);
      for (; L.length; ) L.pop()();
      (T = !1), (P = !1), S.clear();
    }
  }
  function R(t) {
    if (null !== t.fragment) {
      t.update(), i(t.before_update);
      const n = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, n),
        t.after_update.forEach(M);
    }
  }
  let q;
  function D(t, n, e) {
    t.dispatchEvent(
      (function (t, n) {
        const e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, n), e;
      })(`${n ? "intro" : "outro"}${e}`)
    );
  }
  const H = new Set();
  let B;
  function F() {
    B = { r: 0, c: [], p: B };
  }
  function G() {
    B.r || i(B.c), (B = B.p);
  }
  function I(t, n) {
    t && t.i && (H.delete(t), t.i(n));
  }
  function J(t, n, e, o) {
    if (t && t.o) {
      if (H.has(t)) return;
      H.add(t),
        B.c.push(() => {
          H.delete(t), o && (e && t.d(1), o());
        }),
        t.o(n);
    }
  }
  const K = { duration: 0 };
  function Q(e, o, s, c) {
    let d = o(e, s),
      p = c ? 0 : 1,
      m = null,
      g = null,
      $ = null;
    function h() {
      $ && C(e, $);
    }
    function y(t, n) {
      const e = t.b - p;
      return (
        (n *= Math.abs(e)),
        {
          a: p,
          b: t.b,
          d: e,
          duration: n,
          start: t.start,
          end: t.start + n,
          group: t.group,
        }
      );
    }
    function b(o) {
      const {
          delay: r = 0,
          duration: s = 300,
          easing: c = n,
          tick: b = t,
          css: v,
        } = d || K,
        _ = { start: u() + r, b: o };
      o || ((_.group = B), (B.r += 1)),
        m || g
          ? (g = _)
          : (v && (h(), ($ = x(e, p, o, s, r, c, v))),
            o && b(0, 1),
            (m = y(_, s)),
            M(() => D(e, o, "start")),
            (function (t) {
              let n;
              0 === a.size && l(f),
                new Promise((e) => {
                  a.add((n = { c: t, f: e }));
                });
            })((t) => {
              if (
                (g &&
                  t > g.start &&
                  ((m = y(g, s)),
                  (g = null),
                  D(e, m.b, "start"),
                  v && (h(), ($ = x(e, p, m.b, m.duration, 0, c, d.css)))),
                m)
              )
                if (t >= m.end)
                  b((p = m.b), 1 - p),
                    D(e, m.b, "end"),
                    g || (m.b ? h() : --m.group.r || i(m.group.c)),
                    (m = null);
                else if (t >= m.start) {
                  const n = t - m.start;
                  (p = m.a + m.d * c(n / m.duration)), b(p, 1 - p);
                }
              return !(!m && !g);
            }));
    }
    return {
      run(t) {
        r(d)
          ? (q ||
              ((q = Promise.resolve()),
              q.then(() => {
                q = null;
              })),
            q).then(() => {
              (d = d()), b(t);
            })
          : b(t);
      },
      end() {
        h(), (m = g = null);
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
  function X(t, n, o, s) {
    const { fragment: c, on_mount: u, on_destroy: l, after_update: a } = t.$$;
    c && c.m(n, o),
      s ||
        M(() => {
          const n = u.map(e).filter(r);
          l ? l.push(...n) : i(n), (t.$$.on_mount = []);
        }),
      a.forEach(M);
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
      (E.push(t), T || ((T = !0), z.then(j)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
  }
  function tt(n, e, r, s, c, u, l = [-1]) {
    const a = w;
    O(n);
    const f = (n.$$ = {
      fragment: null,
      ctx: null,
      props: u,
      update: t,
      not_equal: c,
      bound: o(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(a ? a.$$.context : e.context || []),
      callbacks: o(),
      dirty: l,
      skip_bound: !1,
    });
    let d = !1;
    if (
      ((f.ctx = r
        ? r(n, e.props || {}, (t, e, ...o) => {
            const i = o.length ? o[0] : e;
            return (
              f.ctx &&
                c(f.ctx[t], (f.ctx[t] = i)) &&
                (!f.skip_bound && f.bound[t] && f.bound[t](i), d && Z(n, t)),
              e
            );
          })
        : []),
      f.update(),
      (d = !0),
      i(f.before_update),
      (f.fragment = !!s && s(f.ctx)),
      e.target)
    ) {
      if (e.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(e.target);
        f.fragment && f.fragment.l(t), t.forEach(m);
      } else f.fragment && f.fragment.c();
      e.intro && I(n.$$.fragment),
        X(n, e.target, e.anchor, e.customElement),
        j();
    }
    O(a);
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
    const r = +getComputedStyle(t).opacity;
    return {
      delay: e,
      duration: o,
      easing: i,
      css: (t) => "opacity: " + t * r,
    };
  }
  function ot(n) {
    let e, o, i, r, s, c, u, l, a, f;
    return {
      c() {
        (e = g("div")),
          (o = g("div")),
          (i = g("img")),
          (s = h()),
          (c = g("p")),
          (c.textContent = `${n[2]}`),
          v(i, "id", "aiki-img"),
          i.src !== (r = browser.runtime.getURL("images/AikiLogo.png")) &&
            v(i, "src", browser.runtime.getURL("images/AikiLogo.png")),
          v(i, "alt", "Aiki Logo"),
          v(i, "class", "svelte-9r98lt"),
          v(c, "id", "aiki-p"),
          v(c, "class", "svelte-9r98lt"),
          v(o, "id", "aiki-wrapper"),
          v(o, "class", "svelte-9r98lt"),
          v(e, "id", "aiki-overlay"),
          v(e, "class", "svelte-9r98lt");
      },
      m(t, r) {
        p(t, e, r),
          d(e, o),
          d(o, i),
          d(o, s),
          d(o, c),
          (l = !0),
          a || ((f = b(e, "click", n[3])), (a = !0));
      },
      p: t,
      i(t) {
        l ||
          (M(() => {
            u || (u = Q(e, et, { delay: 0, duration: 200 }, !0)), u.run(1);
          }),
          (l = !0));
      },
      o(t) {
        u || (u = Q(e, et, { delay: 0, duration: 200 }, !1)),
          u.run(0),
          (l = !1);
      },
      d(t) {
        t && m(e), t && u && u.end(), (a = !1), f();
      },
    };
  }
  function it(t) {
    let n,
      e,
      o = t[1] && ot(t);
    return {
      c() {
        o && o.c(), (n = y());
      },
      m(t, i) {
        o && o.m(t, i), p(t, n, i), (e = !0);
      },
      p(t, [e]) {
        t[1]
          ? o
            ? (o.p(t, e), 2 & e && I(o, 1))
            : ((o = ot(t)), o.c(), I(o, 1), o.m(n.parentNode, n))
          : o &&
            (F(),
            J(o, 1, 1, () => {
              o = null;
            }),
            G());
      },
      i(t) {
        e || (I(o), (e = !0));
      },
      o(t) {
        J(o), (e = !1);
      },
      d(t) {
        o && o.d(t), t && m(n);
      },
    };
  }
  function rt(t, n, e) {
    let { welcomeVisible: o } = n,
      i = !0;
    setTimeout(() => e(1, (i = !1)), 2e3);
    const r = [
      "Let's do something productive! 😊",
      "Time to learn some Python! 🖥️",
      "Time for some more learning! 👓",
      "Let's earn some break time! ⏲️",
      "That's right, it's Python time! 🐍",
      "Let's get some coding done! 🤖",
      "Python won't teach itself! 👩‍🏫",
    ];
    let s = (function () {
      let t = ((n = 0), (e = 6), Math.floor(Math.random() * (e - n)) + n);
      var n, e;
      return r[t];
    })();
    return (
      (t.$$set = (t) => {
        "welcomeVisible" in t && e(0, (o = t.welcomeVisible));
      }),
      [o, i, s, () => e(0, (o = !1))]
    );
  }
  class st extends nt {
    constructor(t) {
      super(), tt(this, t, rt, it, s, { welcomeVisible: 0 });
    }
  }
  function ct(t) {
    let n, e, o, s, c, u, l, a, f, y, _, w, k;
    return {
      c() {
        (n = g("div")),
          (e = g("div")),
          (o = g("h5")),
          (o.innerHTML = "Aiki<sup>3</sup>"),
          (s = h()),
          (c = g("div")),
          (c.innerHTML =
            '<div class="leftright svelte-1fyzfpt"></div> \n      <div class="rightleft svelte-1fyzfpt"></div>'),
          (u = h()),
          (l = g("button")),
          (a = $("Continue")),
          v(o, "class", "svelte-1fyzfpt"),
          v(c, "class", "close-container svelte-1fyzfpt"),
          v(e, "class", "aiki-header svelte-1fyzfpt"),
          (l.disabled = f = !t[2]),
          v(l, "class", "svelte-1fyzfpt"),
          v(n, "class", "aiki-overlay svelte-1fyzfpt");
      },
      m(i, f) {
        p(i, n, f),
          d(n, e),
          d(e, o),
          d(e, s),
          d(e, c),
          d(n, u),
          d(n, l),
          d(l, a),
          (_ = !0),
          w ||
            ((k = [
              b(c, "click", t[3]),
              b(l, "click", function () {
                r(t[1]) && t[1].apply(this, arguments);
              }),
            ]),
            (w = !0));
      },
      p(n, [e]) {
        (t = n), (!_ || (4 & e && f !== (f = !t[2]))) && (l.disabled = f);
      },
      i(t) {
        _ ||
          (M(() => {
            y || (y = Q(n, et, { delay: 0, duration: 200 }, !0)), y.run(1);
          }),
          (_ = !0));
      },
      o(t) {
        y || (y = Q(n, et, { delay: 0, duration: 200 }, !1)),
          y.run(0),
          (_ = !1);
      },
      d(t) {
        t && m(n), t && y && y.end(), (w = !1), i(k);
      },
    };
  }
  function ut(t, n, e) {
    let { gotoOrigin: o } = n,
      { continueVisible: i } = n,
      { canContinue: r } = n;
    return (
      (t.$$set = (t) => {
        "gotoOrigin" in t && e(1, (o = t.gotoOrigin)),
          "continueVisible" in t && e(0, (i = t.continueVisible)),
          "canContinue" in t && e(2, (r = t.canContinue));
      }),
      [
        i,
        o,
        r,
        () => {
          e(0, (i = !1));
        },
      ]
    );
  }
  class lt extends nt {
    constructor(t) {
      super(),
        tt(this, t, ut, ct, s, {
          gotoOrigin: 1,
          continueVisible: 0,
          canContinue: 2,
        });
    }
  }
  function at(t) {
    let n, e, o;
    function i(n) {
      t[5](n);
    }
    let r = {};
    return (
      void 0 !== t[1] && (r.welcomeVisible = t[1]),
      (n = new st({ props: r })),
      V.push(() => U(n, "welcomeVisible", i)),
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
            2 & o &&
            ((e = !0), (i.welcomeVisible = t[1]), N(() => (e = !1))),
            n.$set(i);
        },
        i(t) {
          o || (I(n.$$.fragment, t), (o = !0));
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
    let n, e, o, i;
    function r(n) {
      t[6](n);
    }
    function s(n) {
      t[7](n);
    }
    let c = { gotoOrigin: t[0] };
    return (
      void 0 !== t[2] && (c.continueVisible = t[2]),
      void 0 !== t[3] && (c.canContinue = t[3]),
      (n = new lt({ props: c })),
      V.push(() => U(n, "continueVisible", r)),
      V.push(() => U(n, "canContinue", s)),
      {
        c() {
          W(n.$$.fragment);
        },
        m(t, e) {
          X(n, t, e), (i = !0);
        },
        p(t, i) {
          const r = {};
          1 & i && (r.gotoOrigin = t[0]),
            !e &&
              4 & i &&
              ((e = !0), (r.continueVisible = t[2]), N(() => (e = !1))),
            !o &&
              8 & i &&
              ((o = !0), (r.canContinue = t[3]), N(() => (o = !1))),
            n.$set(r);
        },
        i(t) {
          i || (I(n.$$.fragment, t), (i = !0));
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
    let n,
      e,
      o,
      i = t[1] && at(t),
      r = t[2] && ft(t);
    return {
      c() {
        i && i.c(), (n = h()), r && r.c(), (e = y());
      },
      m(t, s) {
        i && i.m(t, s), p(t, n, s), r && r.m(t, s), p(t, e, s), (o = !0);
      },
      p(t, [o]) {
        t[1]
          ? i
            ? (i.p(t, o), 2 & o && I(i, 1))
            : ((i = at(t)), i.c(), I(i, 1), i.m(n.parentNode, n))
          : i &&
            (F(),
            J(i, 1, 1, () => {
              i = null;
            }),
            G()),
          t[2]
            ? r
              ? (r.p(t, o), 4 & o && I(r, 1))
              : ((r = ft(t)), r.c(), I(r, 1), r.m(e.parentNode, e))
            : r &&
              (F(),
              J(r, 1, 1, () => {
                r = null;
              }),
              G());
      },
      i(t) {
        o || (I(i), I(r), (o = !0));
      },
      o(t) {
        J(i), J(r), (o = !1);
      },
      d(t) {
        i && i.d(t), t && m(n), r && r.d(t), t && m(e);
      },
    };
  }
  function pt(t, n, e) {
    let { gotoOrigin: o } = n,
      { countdown: i } = n,
      r = !0,
      s = !0,
      c = !1;
    return (
      setTimeout(() => {
        e(3, (c = !0));
      }, i),
      (t.$$set = (t) => {
        "gotoOrigin" in t && e(0, (o = t.gotoOrigin)),
          "countdown" in t && e(4, (i = t.countdown));
      }),
      [
        o,
        r,
        s,
        c,
        i,
        function (t) {
          (r = t), e(1, r);
        },
        function (t) {
          (s = t), e(2, s);
        },
        function (t) {
          (c = t), e(3, c);
        },
      ]
    );
  }
  return new (class extends nt {
    constructor(t) {
      super(), tt(this, t, pt, dt, s, { gotoOrigin: 0, countdown: 4 });
    }
  })({
    target: document.body,
    props: { countdown: countdown, gotoOrigin: gotoOrigin },
  });
};
//# sourceMappingURL=bundle.js.map
