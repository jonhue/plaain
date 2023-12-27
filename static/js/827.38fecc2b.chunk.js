"use strict";(self.webpackChunkplaain=self.webpackChunkplaain||[]).push([[827],{2895:function(e,r,n){n.r(r),n.d(r,{default:function(){return U}});var t=n(5861),s=n(9439),i=n(4687),a=n.n(i),o=n(2791),c=n(4420),u=n(5416),l=n(6751),d=n(9462),v=n(1694),f=n.n(v),p=n(7689),h=n(184),m=function(e){var r=e.children,n=(0,p.s0)(),t=history.length<=2,s=(0,o.useCallback)((function(){return n(-1)}),[n]);return(0,h.jsx)("div",{className:f()("Back",{disabled:t}),onClick:s,children:r})},x=n(1087),g=n(206),j=n(2868),b=n.n(j),y=n(607),k=function(e,r){var n=e.find((function(e){return e.id===r}));if(void 0===n)throw new Error("Internal error: provider of item does not exist.");return n},w=function(e){return function(r){var n=k(e,r.provider.providerId);return{src:(0,g.cC)(n,r.provider),type:"video/".concat((0,g.ui)(r)),size:(0,g.EM)(r.provider)}}},P=function(e){return function(r){var n=k(e,r.provider.providerId);return{kind:"captions",label:r.name,srcLang:(0,g.oc)(r),src:(0,g.cC)(n,r.provider)}}},C=function(e){var r=e.id,n=e.item,t=e.startAt,s=e.onProgress,i=(0,p.s0)(),a=(0,c.v9)((function(e){return(0,y.X)(e.auth)}));return(0,o.useEffect)((function(){var e=!1,o=new(b())("video.PlyrPlayer#".concat(r),{debug:!1,controls:["play","progress","current-time","mute","volume","captions","settings","fullscreen"],settings:["captions","quality"],autoplay:!0,invertTime:!0,toggleInvert:!0});return o.source={type:"video",title:n.title,sources:n.sources.map(w(a)),tracks:n.captions.map(P(a))},o.on("canplay",(function(){e||void 0===t||o.duration<t||(o.forward(t),e=!0)})),o.on("ended",(function(){i((0,g.Qf)(n))})),function(){o.ended?s(0):0!==o.currentTime&&s(o.currentTime),o.destroy()}}),[r,n,i,s,a,t]),(0,h.jsx)("video",{className:"PlyrPlayer",id:r,crossOrigin:"anonymous",playsInline:!0,controls:!0})},N=n(2299),_=n(4043),I=function(e){var r=e.isActive,n=e.onClose,t=(0,N.$G)().t,s=(0,o.useCallback)((function(){return window.location.reload()}),[]);return(0,h.jsx)("div",{className:"VideoDoesNotLoadModal",children:(0,h.jsxs)(_.u,{isActive:r,onClose:n,children:[(0,h.jsx)("h2",{children:t("The video doesn't load?")}),(0,h.jsx)("p",{className:"small",children:(0,h.jsxs)(N.cC,{children:["Restarting may help. Please"," ",(0,h.jsx)("a",{href:"https://github.com/jonhue/plaain/issues/new",target:"_blank",rel:"noopener noreferrer",children:"report the issue"})," ","if it persists."]})}),(0,h.jsx)("button",{className:"small",onClick:s,children:t("Reload")})]})})},A=n(5681),M=function(e){var r=e.item,n=e.startAt,t=e.onProgress,i=(0,N.$G)().t,a=(0,A.d)(),o=(0,s.Z)(a,3),c=o[0],u=o[1],l=o[2];return(0,h.jsxs)("div",{className:"Player",children:[(0,h.jsx)(C,{item:r,startAt:n,onProgress:t,id:"player"}),(0,h.jsx)("div",{className:"Player__content",children:(0,h.jsxs)("div",{className:"Player__content__header",children:[(0,h.jsx)("h1",{children:(0,h.jsx)(x.rU,{to:(0,g.Qf)(r),children:r.title})}),(0,h.jsxs)("div",{className:"Player__content__header__actions",children:[(0,h.jsx)("a",{onClick:function(e){e.preventDefault(),u()},children:i("Video not loading?")}),(0,h.jsx)(I,{isActive:c,onClose:l}),(0,h.jsx)(m,{children:(0,h.jsx)("button",{className:"secondary small",children:i("Go back")})})]})]})})]})},S=n(2690),T=n(5939),E=n(6469),L=n(2713),R=n(6260),Z=n(1413),G=n(8899),O=n(514),U=function(){var e=(0,c.I0)(),r=(0,p.TH)(),n=(0,c.v9)((function(e){return{episodes:e.episodes,movies:e.movies}})),i=n.episodes,v=n.movies,f=(0,o.useState)(!1),m=(0,s.Z)(f,2),x=m[0],g=m[1],j=(0,o.useMemo)((function(){var e=new URLSearchParams(r.search).get("s");if(null!==e)return Number.parseInt(e)}),[r]),b=(0,o.useMemo)((function(){var e=new URLSearchParams(r.search).get("type");if(null!==e){var n=Number.parseInt(e);return Object.values(u.m).includes(n)?n:void 0}}),[r]),y=(0,o.useCallback)((function(e,r){switch(e){case u.m.Episode:return(0,S.z0)(r)(i);case u.m.Movie:return(0,E.XA)(r)(v)}}),[i,v]),k=(0,O.G)((0,t.Z)(a().mark((function n(){var t,s,i;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(void 0!==b){n.next=2;break}return n.abrupt("return",g(!0));case 2:if(null!==(t=new URLSearchParams(r.search).get("id"))){n.next=5;break}return n.abrupt("return",g(!0));case 5:if(void 0!==(s=y(b,t))){n.next=8;break}return n.abrupt("return",g(!0));case 8:return n.next=10,e((0,T.z)((0,R.Ot)(s)));case 10:return i=n.sent,n.abrupt("return",i);case 12:case"end":return n.stop()}}),n)}))),[e,b,r,g]),w=(0,o.useCallback)((function(r){if(void 0!==k)switch(k.kind){case u.m.Episode:return e((0,L.x)(k,r));case u.m.Movie:return e(function(e,r){return function(n){var t={lastWatched:(new Date).toISOString(),progress:r};n((0,G.u)((0,Z.Z)((0,Z.Z)({},e),{},{usage:t})))}}(k,r))}}),[e,k]);return void 0!==k&&k.sources.length>0?(0,h.jsx)(M,{item:k,startAt:j,onProgress:w}):x?(0,h.jsx)(d.T,{}):(0,h.jsx)(l.g,{})}}}]);
//# sourceMappingURL=827.38fecc2b.chunk.js.map