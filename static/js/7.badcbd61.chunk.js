(this.webpackJsonpplaain=this.webpackJsonpplaain||[]).push([[7],{214:function(e,t,r){},215:function(e,t,r){},227:function(e,t,r){"use strict";r.r(t);var n=r(3),c=r.n(n),s=r(7),a=r(138),i=r(0),o=r(14),u=r(11),l=r(46),b=r(73),j=(r(214),r(134)),d=r(99),O=(r(215),r(72)),p=r.n(O),v=r(5),h=r(1),f=function(e){var t=e.children,r=Object(v.g)(),n=r.length<=2,c=Object(i.useCallback)((function(){return r.goBack()}),[r]);return Object(h.jsx)("div",{className:p()("Back",{disabled:n}),onClick:c,children:t})},m=r(21),g=r(216),x=r.n(g),y=function(e){return{src:Object(m.e)(e.provider),type:"video/".concat(Object(m.k)(e)),size:Object(m.j)(e.provider)}},k=function(e){return{kind:"captions",label:e.name,srcLang:Object(m.b)(e),src:Object(m.e)(e.provider)}},P=function(e){var t=e.id,r=e.item,n=e.startAt,c=e.onProgress;return Object(i.useEffect)((function(){var e=new x.a("video.PlyrPlayer#".concat(t),{debug:!1,controls:["play","progress","current-time","mute","volume","captions","settings","fullscreen"],settings:["captions","quality"],autoplay:!0,invertTime:!0,toggleInvert:!0});return e.source={type:"video",title:r.title,sources:r.sources.map(y),tracks:r.captions.map(k)},e.on("ready",(function(){void 0!==n&&e.forward(n)})),function(){0!==e.currentTime&&c(e.currentTime),e.destroy()}}),[t,r,c,n]),Object(h.jsx)("video",{className:"PlyrPlayer",id:t,crossOrigin:"true",playsInline:!0,controls:!0})},w=function(e){var t=e.item,r=e.startAt,n=e.onProgress,c=Object(j.a)().t,s=Object(i.useCallback)((function(){return window.location.reload()}),[]);return Object(h.jsxs)("div",{className:"Player",children:[Object(h.jsx)(P,{item:t,startAt:r,onProgress:n,id:"player"}),Object(h.jsxs)("div",{className:"Player__content",children:[Object(h.jsxs)("div",{className:"Player__content__header",children:[Object(h.jsx)("h1",{children:t.title}),Object(h.jsx)(f,{children:Object(h.jsx)("button",{className:"secondary",children:c("Go back")})})]}),Object(h.jsxs)("div",{className:"Player__content__reload",children:[Object(h.jsx)("p",{className:"small",children:Object(h.jsxs)(d.a,{children:["The video doesn't load? Restarting may help. Please"," ",Object(h.jsx)("a",{href:"https://github.com/jonhue/plaain/issues/new",target:"_blank",rel:"noopener noreferrer",children:"report the issue"})," ","if it persists."]})}),Object(h.jsx)("button",{onClick:s,children:c("Reload")})]})]})]})},_=r(157),N=r(58),C=r(140),A=r(177),M=r(161),R=r(175),I=r(164);t.default=function(){var e=Object(o.b)(),t=Object(v.h)(),r=Object(o.c)((function(e){return{episodes:e.episodes,movies:e.movies}})),n=r.episodes,j=r.movies,d=Object(i.useState)(!1),O=Object(a.a)(d,2),p=O[0],f=O[1],m=Object(i.useMemo)((function(){var e=new URLSearchParams(t.search).get("s");if(null!==e)return Number.parseInt(e)}),[t]),g=Object(i.useMemo)((function(){var e=new URLSearchParams(t.search).get("type");if(null!==e){var r=Number.parseInt(e);return Object.values(u.a).includes(r)?r:void 0}}),[t]),x=Object(i.useCallback)((function(e,t){switch(e){case u.a.Episode:return Object(_.a)(t)(n);case u.a.Movie:return Object(C.b)(t)(j)}}),[n,j]),y=Object(I.useAsyncMemo)(Object(s.a)(c.a.mark((function r(){var n,s,a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(void 0!==g){r.next=2;break}return r.abrupt("return",f(!0));case 2:if(null!==(n=new URLSearchParams(t.search).get("id"))){r.next=5;break}return r.abrupt("return",f(!0));case 5:if(void 0!==(s=x(g,n))){r.next=8;break}return r.abrupt("return",f(!0));case 8:return r.next=10,e(Object(N.a)(Object(M.c)(s)));case 10:return a=r.sent,r.abrupt("return",a);case 12:case"end":return r.stop()}}),r)}))),[e,g,t,f]),k=Object(i.useCallback)((function(t){if(void 0!==y)switch(y.kind){case u.a.Episode:return e(Object(A.b)(y,t));case u.a.Movie:return e(Object(R.b)(y,t))}}),[e,y]);return void 0!==y&&y.sources.length>0?Object(h.jsx)(w,{item:y,startAt:m,onProgress:k}):p?Object(h.jsx)(b.a,{}):Object(h.jsx)(l.a,{})}}}]);
//# sourceMappingURL=7.badcbd61.chunk.js.map