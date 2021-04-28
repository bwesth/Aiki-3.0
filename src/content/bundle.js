export function app(removeInfowarning, timer) {
  "use strict";
  function t() {}
  function e(t) {
    return t();
  }
  function n() {
    return Object.create(null);
  }
  function o(t) {
    t.forEach(e);
  }
  function r(t) {
    return "function" == typeof t;
  }
  function s(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && "object" == typeof t) || "function" == typeof t;
  }
  function i(t, e) {
    t.appendChild(e);
  }
  function c(t) {
    t.parentNode.removeChild(t);
  }
  function l(t) {
    return document.createElement(t);
  }
  function u(t) {
    return document.createTextNode(t);
  }
  function a() {
    return u(" ");
  }
  function f(t, e, n, o) {
    return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o);
  }
  function d(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  let h;
  function p(t) {
    h = t;
  }
  const m = [],
    $ = [],
    g = [],
    v = [],
    x = Promise.resolve();
  let y = !1;
  function b(t) {
    g.push(t);
  }
  let _ = !1;
  const w = new Set();
  function k() {
    if (!_) {
      _ = !0;
      do {
        for (let t = 0; t < m.length; t += 1) {
          const e = m[t];
          p(e), E(e.$$);
        }
        for (p(null), m.length = 0; $.length; ) $.pop()();
        for (let t = 0; t < g.length; t += 1) {
          const e = g[t];
          w.has(e) || (w.add(e), e());
        }
        g.length = 0;
      } while (m.length);
      for (; v.length; ) v.pop()();
      (y = !1), (_ = !1), w.clear();
    }
  }
  function E(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(b);
    }
  }
  const I = new Set();
  function A(t, e) {
    -1 === t.$$.dirty[0] &&
      (m.push(t), y || ((y = !0), x.then(k)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function M(s, i, l, u, a, f, d = [-1]) {
    const m = h;
    p(s);
    const $ = (s.$$ = {
      fragment: null,
      ctx: null,
      props: f,
      update: t,
      not_equal: a,
      bound: n(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(m ? m.$$.context : i.context || []),
      callbacks: n(),
      dirty: d,
      skip_bound: !1,
    });
    let g = !1;
    if (
      (($.ctx = l
        ? l(s, i.props || {}, (t, e, ...n) => {
            const o = n.length ? n[0] : e;
            return (
              $.ctx &&
                a($.ctx[t], ($.ctx[t] = o)) &&
                (!$.skip_bound && $.bound[t] && $.bound[t](o), g && A(s, t)),
              e
            );
          })
        : []),
      $.update(),
      (g = !0),
      o($.before_update),
      ($.fragment = !!u && u($.ctx)),
      i.target)
    ) {
      if (i.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(i.target);
        $.fragment && $.fragment.l(t), t.forEach(c);
      } else $.fragment && $.fragment.c();
      i.intro && (v = s.$$.fragment) && v.i && (I.delete(v), v.i(x)),
        (function (t, n, s, i) {
          const {
            fragment: c,
            on_mount: l,
            on_destroy: u,
            after_update: a,
          } = t.$$;
          c && c.m(n, s),
            i ||
              b(() => {
                const n = l.map(e).filter(r);
                u ? u.push(...n) : o(n), (t.$$.on_mount = []);
              }),
            a.forEach(b);
        })(s, i.target, i.anchor, i.customElement),
        k();
    }
    var v, x;
    p(m);
  }
  function j(e) {
    let n, s, h, p, m, $, g, v, x, y, b, _;
    return {
      c() {
        (n = l("div")),
          (s = l("div")),
          (h = l("hr")),
          (p = a()),
          (m = l("h1")),
          ($ = u(e[2])),
          (g = a()),
          (v = l("button")),
          (v.innerHTML =
            '<p class="svelte-6xhfle">Snooze</p> \n      <small class="svelte-6xhfle">(wait 2 minutes)</small>'),
          (x = a()),
          (y = l("hr")),
          d(h, "class", "svelte-6xhfle"),
          d(m, "class", "svelte-6xhfle"),
          d(v, "class", "svelte-6xhfle"),
          d(y, "class", "svelte-6xhfle"),
          d(s, "class", "aiki-wrapper svelte-6xhfle"),
          d(n, "class", "aiki-overlay svelte-6xhfle");
      },
      m(t, o) {
        !(function (t, e, n) {
          t.insertBefore(e, n || null);
        })(t, n, o),
          i(n, s),
          i(s, h),
          i(s, p),
          i(s, m),
          i(m, $),
          i(s, g),
          i(s, v),
          i(s, x),
          i(s, y),
          b ||
            ((_ = [
              f(v, "click", function () {
                r(e[0]) && e[0].apply(this, arguments);
              }),
              f(v, "mouseover", function () {
                r(e[1].slow) && e[1].slow.apply(this, arguments);
              }),
              f(v, "mouseout", function () {
                r(e[1].hasten) && e[1].hasten.apply(this, arguments);
              }),
            ]),
            (b = !0));
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
        t && c(n), (b = !1), o(_);
      },
    };
  }
  function L(t, e, n) {
    let { removeInfowarning: o } = e,
      { timer: r } = e,
      s = Math.round(r.time / 1e3);
    return (
      setInterval(() => {
        n(2, (s = Math.round(r.time / 1e3)));
      }, 100),
      r.start(),
      (t.$$set = (t) => {
        "removeInfowarning" in t && n(0, (o = t.removeInfowarning)),
          "timer" in t && n(1, (r = t.timer));
      }),
      [o, r, s]
    );
  }
  return new (class extends class {
    $destroy() {
      !(function (t, e) {
        const n = t.$$;
        null !== n.fragment &&
          (o(n.on_destroy),
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
      super(), M(this, t, L, j, s, { removeInfowarning: 0, timer: 1 });
    }
  })({
    target: document.body,
    props: { removeInfowarning: removeInfowarning, timer: timer },
  });
}
//# sourceMappingURL=bundle.js.map
