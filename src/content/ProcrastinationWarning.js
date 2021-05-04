export function ProcrastinationWarning(removeInfowarning, timer, browser) {"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function i(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(t,e){t.appendChild(e)}function c(t){t.parentNode.removeChild(t)}function a(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function l(){return u(" ")}function f(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function d(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let p;function m(t){p=t}const g=[],h=[],$=[],y=[],v=Promise.resolve();let b=!1;function k(t){$.push(t)}let _=!1;const w=new Set;function x(){if(!_){_=!0;do{for(let t=0;t<g.length;t+=1){const e=g[t];m(e),E(e.$$)}for(m(null),g.length=0;h.length;)h.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];w.has(e)||(w.add(e),e())}$.length=0}while(g.length);for(;y.length;)y.pop()();b=!1,_=!1,w.clear()}}function E(t){if(null!==t.fragment){t.update(),i(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}const A=new Set;function I(t,e){-1===t.$$.dirty[0]&&(g.push(t),b||(b=!0,v.then(x)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function L(r,s,a,u,l,f,d=[-1]){const g=p;m(r);const h=r.$$={fragment:null,ctx:null,props:f,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(g?g.$$.context:s.context||[]),callbacks:n(),dirty:d,skip_bound:!1};let $=!1;if(h.ctx=a?a(r,s.props||{},((t,e,...n)=>{const i=n.length?n[0]:e;return h.ctx&&l(h.ctx[t],h.ctx[t]=i)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](i),$&&I(r,t)),e})):[],h.update(),$=!0,i(h.before_update),h.fragment=!!u&&u(h.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);h.fragment&&h.fragment.l(t),t.forEach(c)}else h.fragment&&h.fragment.c();s.intro&&((y=r.$$.fragment)&&y.i&&(A.delete(y),y.i(v))),function(t,n,r,s){const{fragment:c,on_mount:a,on_destroy:u,after_update:l}=t.$$;c&&c.m(n,r),s||k((()=>{const n=a.map(e).filter(o);u?u.push(...n):i(n),t.$$.on_mount=[]})),l.forEach(k)}(r,s.target,s.anchor,s.customElement),x()}var y,v;m(g)}function M(e){let n,r,p,m,g,h,$,y,v,b,k;return{c(){n=a("div"),r=a("div"),p=a("div"),p.innerHTML='<img id="aiki-img" src='+browser.runtime.getURL("images/AikiLogo.png")+'alt="Aiki Logo" class="svelte-igy8c6"/> \n      <h1 id="aiki-h1" class="svelte-igy8c6">Time&#39;s up!</h1>',m=l(),g=a("div"),h=a("h2"),$=u(e[2]),y=l(),v=a("button"),v.innerHTML='<p id="aiki-p" class="svelte-igy8c6">Snooze</p> \n        <small id="aiki-small" class="svelte-igy8c6">(+1 minute)</small>',d(p,"id","aiki-header-wrapper"),d(p,"class","svelte-igy8c6"),d(h,"id","aiki-h2"),d(h,"class","svelte-igy8c6"),d(v,"id","aiki-button"),d(v,"class","svelte-igy8c6"),d(g,"id","aiki-content-wrapper"),d(g,"class","svelte-igy8c6"),d(r,"id","aiki-wrapper"),d(r,"class","svelte-igy8c6"),d(n,"id","aiki-overlay"),d(n,"class","svelte-igy8c6")},m(t,i){!function(t,e,n){t.insertBefore(e,n||null)}(t,n,i),s(n,r),s(r,p),s(r,m),s(r,g),s(g,h),s(h,$),s(g,y),s(g,v),b||(k=[f(v,"click",(function(){o(e[0])&&e[0].apply(this,arguments)})),f(v,"mouseover",(function(){o(e[1].slow)&&e[1].slow.apply(this,arguments)})),f(v,"mouseout",(function(){o(e[1].hasten)&&e[1].hasten.apply(this,arguments)}))],b=!0)},p(t,[n]){e=t,4&n&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}($,e[2])},i:t,o:t,d(t){t&&c(n),b=!1,i(k)}}}function T(t,e,n){let{removeInfowarning:i}=e,{timer:o}=e,r=Math.round(o.time/1e3);return setInterval((()=>{n(2,r=Math.round(o.time/1e3))}),100),o.start(),t.$$set=t=>{"removeInfowarning"in t&&n(0,i=t.removeInfowarning),"timer"in t&&n(1,o=t.timer)},[i,o,r]}new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),L(this,t,T,M,r,{removeInfowarning:0,timer:1})}}({target:document.body,props:{removeInfowarning:removeInfowarning,timer:timer}})};
//# sourceMappingURL=bundle.js.map