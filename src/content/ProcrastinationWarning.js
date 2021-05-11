export function ProcrastinationWarning(
  removeInfowarning,
  timer,
  browser,
  resolve,
  url
) {
  "use strict";
  function t() {}
  function e(t) {
    return t();
  }
  function n() {
    return Object.create(null);
  }
  function r(t) {
    t.forEach(e);
  }
  function o(t) {
    return "function" == typeof t;
  }
  function i(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && "object" == typeof t) || "function" == typeof t;
  }
  function s(t, e) {
    t.appendChild(e);
  }
  function a(t) {
    t.parentNode.removeChild(t);
  }
  function u(t) {
    return document.createElement(t);
  }
  function c(t) {
    return document.createTextNode(t);
  }
  function l() {
    return c(" ");
  }
  function f(t, e, n, r) {
    return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
  }
  function d(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  let p;
  function m(t) {
    p = t;
  }
  const h = [],
    g = [],
    $ = [],
    v = [],
    w = Promise.resolve();
  let y = !1;
  function b(t) {
    $.push(t);
  }
  let k = !1;
  const _ = new Set();
  function x() {
    if (!k) {
      k = !0;
      do {
        for (let t = 0; t < h.length; t += 1) {
          const e = h[t];
          m(e), z(e.$$);
        }
        for (m(null), h.length = 0; g.length; ) g.pop()();
        for (let t = 0; t < $.length; t += 1) {
          const e = $[t];
          _.has(e) || (_.add(e), e());
        }
        $.length = 0;
      } while (h.length);
      for (; v.length; ) v.pop()();
      (y = !1), (k = !1), _.clear();
    }
  }
  function z(t) {
    if (null !== t.fragment) {
      t.update(), r(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(b);
    }
  }
  const E = new Set();
  function A(t, e) {
    -1 === t.$$.dirty[0] &&
      (h.push(t), y || ((y = !0), w.then(x)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function I(i, s, u, c, l, f, d = [-1]) {
    const h = p;
    m(i);
    const g = (i.$$ = {
      fragment: null,
      ctx: null,
      props: f,
      update: t,
      not_equal: l,
      bound: n(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(h ? h.$$.context : s.context || []),
      callbacks: n(),
      dirty: d,
      skip_bound: !1,
    });
    let $ = !1;
    if (
      ((g.ctx = u
        ? u(i, s.props || {}, (t, e, ...n) => {
            const r = n.length ? n[0] : e;
            return (
              g.ctx &&
                l(g.ctx[t], (g.ctx[t] = r)) &&
                (!g.skip_bound && g.bound[t] && g.bound[t](r), $ && A(i, t)),
              e
            );
          })
        : []),
      g.update(),
      ($ = !0),
      r(g.before_update),
      (g.fragment = !!c && c(g.ctx)),
      s.target)
    ) {
      if (s.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(s.target);
        g.fragment && g.fragment.l(t), t.forEach(a);
      } else g.fragment && g.fragment.c();
      s.intro && (v = i.$$.fragment) && v.i && (E.delete(v), v.i(w)),
        (function (t, n, i, s) {
          const {
            fragment: a,
            on_mount: u,
            on_destroy: c,
            after_update: l,
          } = t.$$;
          a && a.m(n, i),
            s ||
              b(() => {
                const n = u.map(e).filter(o);
                c ? c.push(...n) : r(n), (t.$$.on_mount = []);
              }),
            l.forEach(b);
        })(i, s.target, s.anchor, s.customElement),
        x();
    }
    var v, w;
    m(h);
  }
  function L(e) {
    let n, i, p, m, h, g, $, v, w, y, b;
    return {
      c() {
        (n = u("div")),
          (i = u("div")),
          (p = u("div")),
          (p.innerHTML =
            '<img id="aiki-img" src=' +
            browser.runtime.getURL("images/AikiLogo.png") +
            ' alt="Aiki Logo" class="svelte-19w1zfr"/> \n      <h1 id="aiki-h1" class="svelte-19w1zfr">Time&#39;s up!</h1>'),
          (m = l()),
          (h = u("div")),
          (g = u("h2")),
          ($ = c(e[2])),
          (v = l()),
          (w = u("button")),
          (w.innerHTML =
            '<p id="aiki-p" class="svelte-19w1zfr">Snooze</p> \n        <small id="aiki-small" class="svelte-19w1zfr">(+1 minute)</small>'),
          d(p, "id", "aiki-header-wrapper"),
          d(p, "class", "svelte-19w1zfr"),
          d(g, "id", "aiki-h2"),
          d(g, "class", "svelte-19w1zfr"),
          d(w, "id", "aiki-button"),
          d(w, "class", "svelte-19w1zfr"),
          d(h, "id", "aiki-content-wrapper"),
          d(h, "class", "svelte-19w1zfr"),
          d(i, "id", "aiki-wrapper"),
          d(i, "class", "svelte-19w1zfr"),
          d(n, "id", "aiki-overlay"),
          d(n, "class", "svelte-19w1zfr");
      },
      m(t, r) {
        !(function (t, e, n) {
          t.insertBefore(e, n || null);
        })(t, n, r),
          s(n, i),
          s(i, p),
          s(i, m),
          s(i, h),
          s(h, g),
          s(g, $),
          s(h, v),
          s(h, w),
          y ||
            ((b = [
              f(w, "click", function () {
                o(e[0]) && e[0].apply(this, arguments);
              }),
              f(w, "mouseover", function () {
                o(e[1].slow) && e[1].slow.apply(this, arguments);
              }),
              f(w, "mouseout", function () {
                o(e[1].hasten) && e[1].hasten.apply(this, arguments);
              }),
            ]),
            (y = !0));
      },
      p(t, [n]) {
        (e = t),
          4 & n &&
            (function (t, e) {
              (e = "" + e), t.wholeText !== e && (t.data = e);
            })($, e[2]);
      },
      i: t,
      o: t,
      d(t) {
        t && a(n), (y = !1), r(b);
      },
    };
  }
  function M(t, e, n) {
    let { resolve: r } = e,
      { removeInfowarning: o } = e,
      { timer: i } = e,
      { url: s } = e,
      a = Math.round(i.time / 1e3);
    return (
      setInterval(() => {
        n(2, (a = Math.round(i.time / 1e3)));
      }, 100),
      i.start(r, s),
      (t.$$set = (t) => {
        "resolve" in t && n(3, (r = t.resolve)),
          "removeInfowarning" in t && n(0, (o = t.removeInfowarning)),
          "timer" in t && n(1, (i = t.timer)),
          "url" in t && n(4, (s = t.url));
      }),
      [o, i, a, r, s]
    );
  }
  return new (class extends class {
    $destroy() {
      !(function (t, e) {
        const n = t.$$;
        null !== n.fragment &&
          (r(n.on_destroy),
          n.fragment && n.fragment.d(e),
          (n.on_destroy = n.fragment = null),
          (n.ctx = []));
      })(this, 1),
        (this.$destroy = t);
    }
    $on(t, e) {
      const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        n.push(e),
        () => {
          const t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        }
      );
    }
    $set(t) {
      var e;
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  } {
    constructor(t) {
      super(),
        I(this, t, M, L, i, {
          resolve: 3,
          removeInfowarning: 0,
          timer: 1,
          url: 4,
        });
    }
  })({
    target: document.body,
    props: {
      removeInfowarning: removeInfowarning,
      timer: timer,
      resolve: resolve,
      url: url,
    },
  });
}
