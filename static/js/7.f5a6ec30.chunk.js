(this.webpackJsonpplaain=this.webpackJsonpplaain||[]).push([[7],{283:function(e,t,r){},284:function(e,t,r){},296:function(e,t,r){"use strict";r.r(t);var n=r(2),c=r.n(n),s=r(7),a=r(210),i=r(0),o=r(14),u=r(11),l=r(54),b=r(90),d=(r(283),r(206)),j=r(135),p=(r(284),r(89)),v=r.n(p),O=r(6),f=r(1),h=function(e){var t=e.children,r=Object(O.g)(),n=r.length<=2,c=Object(i.useCallback)((function(){return r.goBack()}),[r]);return Object(f.jsx)("div",{className:v()("Back",{disabled:n}),onClick:c,children:t})},m=r(21),x=r(285),g=r.n(x),y=r(91),k=function(e,t){var r=e.find((function(e){return e.id===t}));if(void 0===r)throw new Error("Internal error: provider of item does not exist.");return r},w=function(e){return function(t){var r=k(e,t.provider.providerId);return{src:Object(m.e)(r,t.provider),type:"video/".concat(Object(m.k)(t)),size:Object(m.j)(t.provider)}}},P=function(e){return function(t){var r=k(e,t.provider.providerId);return{kind:"captions",label:t.name,srcLang:Object(m.b)(t),src:Object(m.e)(r,t.provider)}}},_=function(e){var t=e.id,r=e.item,n=e.startAt,c=e.onProgress,s=Object(o.c)((function(e){return Object(y.b)(e.auth)}));return Object(i.useEffect)((function(){var e=new g.a("video.PlyrPlayer#".concat(t),{debug:!1,controls:["play","progress","current-time","mute","volume","captions","settings","fullscreen"],settings:["captions","quality"],autoplay:!0,invertTime:!0,toggleInvert:!0});return e.source={type:"video",title:r.title,sources:r.sources.map(w(s)),tracks:r.captions.map(P(s))},e.on("ready",(function(){void 0!==n&&e.forward(n)})),function(){0!==e.currentTime&&c(e.currentTime),e.destroy()}}),[t,r,c,s,n]),Object(f.jsx)("video",{className:"PlyrPlayer",id:t,crossOrigin:"true",playsInline:!0,controls:!0})},N=function(e){var t=e.item,r=e.startAt,n=e.onProgress,c=Object(d.a)().t,s=Object(i.useCallback)((function(){return window.location.reload()}),[]);return Object(f.jsxs)("div",{className:"Player",children:[Object(f.jsx)(_,{item:t,startAt:r,onProgress:n,id:"player"}),Object(f.jsxs)("div",{className:"Player__content",children:[Object(f.jsxs)("div",{className:"Player__content__header",children:[Object(f.jsx)("h1",{children:t.title}),Object(f.jsx)(h,{children:Object(f.jsx)("button",{className:"secondary",children:c("Go back")})})]}),Object(f.jsxs)("div",{className:"Player__content__reload",children:[Object(f.jsx)("p",{className:"small",children:Object(f.jsxs)(j.a,{children:["The video doesn't load? Restarting may help. Please"," ",Object(f.jsx)("a",{href:"https://github.com/jonhue/plaain/issues/new",target:"_blank",rel:"noopener noreferrer",children:"report the issue"})," ","if it persists."]})}),Object(f.jsx)("button",{onClick:s,children:c("Reload")})]})]})]})},I=r(229),C=r(68),A=r(212),M=r(247),R=r(232),E=r(245),L=r(235);t.default=function(){var e=Object(o.b)(),t=Object(O.h)(),r=Object(o.c)((function(e){return{episodes:e.episodes,movies:e.movies}})),n=r.episodes,d=r.movies,j=Object(i.useState)(!1),p=Object(a.a)(j,2),v=p[0],h=p[1],m=Object(i.useMemo)((function(){var e=new URLSearchParams(t.search).get("s");if(null!==e)return Number.parseInt(e)}),[t]),x=Object(i.useMemo)((function(){var e=new URLSearchParams(t.search).get("type");if(null!==e){var r=Number.parseInt(e);return Object.values(u.a).includes(r)?r:void 0}}),[t]),g=Object(i.useCallback)((function(e,t){switch(e){case u.a.Episode:return Object(I.a)(t)(n);case u.a.Movie:return Object(A.b)(t)(d)}}),[n,d]),y=Object(L.useAsyncMemo)(Object(s.a)(c.a.mark((function r(){var n,s,a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(void 0!==x){r.next=2;break}return r.abrupt("return",h(!0));case 2:if(null!==(n=new URLSearchParams(t.search).get("id"))){r.next=5;break}return r.abrupt("return",h(!0));case 5:if(void 0!==(s=g(x,n))){r.next=8;break}return r.abrupt("return",h(!0));case 8:return r.next=10,e(Object(C.a)(Object(R.c)(s)));case 10:return a=r.sent,r.abrupt("return",a);case 12:case"end":return r.stop()}}),r)}))),[e,x,t,h]),k=Object(i.useCallback)((function(t){if(void 0!==y)switch(y.kind){case u.a.Episode:return e(Object(M.b)(y,t));case u.a.Movie:return e(Object(E.b)(y,t))}}),[e,y]);return void 0!==y&&y.sources.length>0?Object(f.jsx)(N,{item:y,startAt:m,onProgress:k}):v?Object(f.jsx)(b.a,{}):Object(f.jsx)(l.a,{})}}}]);
//# sourceMappingURL=7.f5a6ec30.chunk.js.map