(this.webpackJsonpplaain=this.webpackJsonpplaain||[]).push([[1],{112:function(r,n,t){"use strict";t.d(n,"b",(function(){return c})),t.d(n,"e",(function(){return i})),t.d(n,"a",(function(){return o})),t.d(n,"f",(function(){return s})),t.d(n,"c",(function(){return f})),t.d(n,"d",(function(){return p}));var e=t(14),a=t(30),u=t(125),c=function(r){return function(n){return n[r]}},i=function(r){return Object.keys(r).map((function(n){return r[n]}))},o=function(r){return i(r).filter(e.j)},s=function(r){return i(r).filter((function(r){return Object(e.p)(r,a.c)}))},f=function(r){return Object(u.a)(i,(function(n){return n.filter((function(n){return n.cast.find((function(n){return n.id===r}))||n.crew.find((function(n){return n.id===r}))}))}))},p=function(r,n){return Object(u.a)(i,(function(t){return t.map(n).reduce((function(r,n){return r.concat(n)}),[]).filter((function(n){return n.id===r}))}))}},114:function(r,n,t){"use strict";t.d(n,"a",(function(){return e})),t.d(n,"b",(function(){return a}));var e=function(r){return function(n){return n[r]}},a=function(r){return Object.keys(r).map((function(n){return r[n]}))}},119:function(r,n,t){"use strict";t.d(n,"c",(function(){return c})),t.d(n,"g",(function(){return i})),t.d(n,"a",(function(){return o})),t.d(n,"b",(function(){return s})),t.d(n,"e",(function(){return f})),t.d(n,"d",(function(){return p})),t.d(n,"f",(function(){return d}));var e=t(14),a=t(30),u=t(125),c=function(r){return function(n){return n[r]}},i=function(r){return Object.keys(r).map((function(n){return r[n]}))},o=function(r){return i(r).filter(e.j)},s=function(r){return i(r).filter((function(r){return Object(e.p)(r,a.c)}))},f=function(r){return Object(u.a)(i,(function(n){return n.filter((function(n){return n.showId===r}))}))},p=function(r){return Object(u.a)(i,(function(n){return n.filter((function(n){return n.cast.find((function(n){return n.id===r}))||n.crew.find((function(n){return n.id===r}))}))}))},d=function(r,n){return Object(u.a)(i,(function(t){return t.map(n).reduce((function(r,n){return r.concat(n)}),[]).filter((function(n){return n.id===r}))}))}},128:function(r,n,t){"use strict";t.d(n,"a",(function(){return e})),t.d(n,"b",(function(){return a}));var e=function(r){return function(n){return n.providers[r]}},a=function(r){return Object.keys(r.providers).map((function(n){return r.providers[n]}))}},136:function(r,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"c",(function(){return u})),t.d(n,"b",(function(){return c}));var e=t(125),a=function(r){return function(n){return n[r]}},u=function(r){return Object.keys(r).map((function(n){return r[n]}))},c=function(r){return Object(e.a)(u,(function(n){return n.filter((function(n){return n.seasonId===r}))}))}},138:function(r,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"a",(function(){return u}));var e=t(39),a=function(r){return{type:e.b,payload:{provider:r}}},u=function(r){return{type:e.a,payload:{id:r}}}},142:function(r,n,t){"use strict";t.d(n,"b",(function(){return hr})),t.d(n,"c",(function(){return wr})),t.d(n,"a",(function(){return gr}));var e,a=t(2),u=t(110),c=t.n(u),i=t(111),o=t(136),s=t(49),f=t(113),p=t(149);!function(r){r.GET="GET"}(e||(e={}));var d,v=function(r,n,t){var e=new URL("".concat(r,"/").concat(n));if(void 0!==t)for(var a=0,u=Object.entries(t);a<u.length;a++){var c=Object(f.a)(u[a],2),i=c[0],o=c[1];e.searchParams.append(i,o)}return e},b=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e,a,u){var i,o,s;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,fetch(v(n,t,u).href,{method:e,headers:{Authorization:"Bearer ".concat(a),Accept:"application/json","Content-Type":"application/json"}});case 2:return i=r.sent,r.next=5,i.text();case 5:if(o=r.sent,s=o?JSON.parse(o):{},!i.ok){r.next=11;break}return r.abrupt("return",s);case 11:throw new p.a(i.status,i.statusText);case 12:case"end":return r.stop()}}),r)})));return function(n,t,e,a,u){return r.apply(this,arguments)}}(),l=function(r,n,t,a){return b(r,n,e.GET,t,a)},h=t(62),m="https://api.themoviedb.org/3",O="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTEwODg2ZDE5YmRjOGIyNjRiOWQ1NzBlYWY1NGU2OCIsInN1YiI6IjVjODUxMjNjYzNhMzY4NGU4ZmRjZDBjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oKPj2ZU90QLq-q5-QucujCX0FMq_dmT_5nk28TogaR8",w={language:h.a.languages[0]},j=function(){var r=Object(i.a)(c.a.mark((function r(n){var t,e;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,l(m,"search/movie",O,Object(a.a)(Object(a.a)({},w),{},{query:n}));case 2:if(t=r.sent,0!==(e=t.results).length){r.next=8;break}return r.abrupt("return",void 0);case 8:return r.abrupt("return",e[0].id);case 9:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}(),x=function(){var r=Object(i.a)(c.a.mark((function r(n){var t,e;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,l(m,"search/tv",O,Object(a.a)(Object(a.a)({},w),{},{query:n}));case 2:if(t=r.sent,0!==(e=t.results).length){r.next=8;break}return r.abrupt("return",void 0);case 8:return r.abrupt("return",e[0].id);case 9:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}(),k=function(r){return l(m,"movie/".concat(r,"/credits"),O,w)},y=function(r,n){return l(m,"tv/".concat(r,"/season/").concat(n,"/credits"),O,w)},g=function(r,n,t){return l(m,"tv/".concat(r,"/season/").concat(n,"/episode/").concat(t),O,w)},I=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e){var a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,g(e.showTmdbId,e.seasonNumber,e.number);case 2:return a=r.sent,r.abrupt("return",Object(s.a)(n,t,e,a));case 4:case"end":return r.stop()}}),r)})));return function(n,t,e){return r.apply(this,arguments)}}(),T=function(){var r=Object(i.a)(c.a.mark((function r(n){var t,e;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,a=n.tmdbId,l(m,"movie/".concat(a),O,w);case 2:return t=r.sent,r.next=5,k(n.tmdbId);case 5:return e=r.sent,r.abrupt("return",Object(s.b)(n,t,e));case 7:case"end":return r.stop()}var a}),r)})));return function(n){return r.apply(this,arguments)}}(),E=function(){var r=Object(i.a)(c.a.mark((function r(n,t){var e,a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,u=t.showTmdbId,c=t.number,l(m,"tv/".concat(u,"/season/").concat(c),O,w);case 2:return e=r.sent,r.next=5,y(t.showTmdbId,t.number);case 5:return a=r.sent,r.abrupt("return",Object(s.c)(n,t,e,a));case 7:case"end":return r.stop()}var u,c}),r)})));return function(n,t){return r.apply(this,arguments)}}(),P=function(){var r=Object(i.a)(c.a.mark((function r(n){var t;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e=n.tmdbId,l(m,"tv/".concat(e),O,w);case 2:return t=r.sent,r.abrupt("return",Object(s.d)(n,t));case 4:case"end":return r.stop()}var e}),r)})));return function(n){return r.apply(this,arguments)}}(),N=t(112),S=t(119),D=t(114),C=t(7),U=t(167),W=(t(166),t(29));!function(r){r[r.Video=0]="Video",r[r.Caption=1]="Caption"}(d||(d={}));var J=t(210),z=function(r){return J.a.init({authProvider:function(n){return n(null,r)}})},F=function(r,n){return r.api("/me/drive/root:".concat(n,":/children")).get()},G=function(r,n){return r.api("/me/drive/items/".concat(n)).get()},A=function(r,n){return r.api("/me/drive/items/".concat(n,"/children")).get()},q=t(163),R=t(44),Y=function(r,n){return"".concat(r,"@").concat(n)},V=function(r){return function(n){if(void 0!==n.file){var t,e={name:(t=n.name).split(".").shift(),extension:t.split(".").pop()},a=e.name,u=e.extension;if(void 0!==u){var c=function(r){switch(r){case"vtt":return"vtt"}}(u),i=function(r){switch(r){case R.c:return R.c;case R.a:return R.a;case R.b:return R.b;case R.d:return R.d}}(u);return void 0!==c?function(r,n,t,e,a){var u=e.id,c=e.name,i=e.size,o=e.webUrl,s=e["@microsoft.graph.downloadUrl"],f=a.mimeType;return{kind:d.Caption,type:n,id:Y(W.b.OneDrive,u),name:t,provider:{kind:W.b.OneDrive,providerId:r,id:u,fileName:c,size:i,downloadUrl:s,webUrl:o,mimeType:f}}}(r,c,a,n,n.file):void 0!==i&&void 0!==n.video?function(r,n,t,e,a,u){var c=e.id,i=e.name,o=e.size,s=e.webUrl,f=e["@microsoft.graph.downloadUrl"],p=a.mimeType,v=u.bitrate,b=u.duration,l=u.height,h=u.width,m=u.audioChannels,O=u.audioFormat,w=u.fourCC,j=u.frameRate;return{kind:d.Video,type:n,id:Y(W.b.OneDrive,c),name:t,provider:{kind:W.b.OneDrive,providerId:r,id:c,fileName:i,size:o,downloadUrl:f,webUrl:s,mimeType:p,bitrate:v,duration:b,height:l,width:h,audioChannels:m,audioFormat:O,fourCC:w,frameRate:j}}}(r,i,a,n,n.file,n.video):void 0}}}},Z=t(14),M=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e){var a,u,i;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=z(t),r.next=3,G(a,e.provider.id);case 3:if(u=r.sent,void 0===(i=V(n)(u))){r.next=9;break}return r.abrupt("return",i);case 9:throw new q.a(e);case 10:case"end":return r.stop()}}),r)})));return function(n,t,e){return r.apply(this,arguments)}}(),Q=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e){var a,u;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,A(t,e);case 2:return a=r.sent,u=a.value,r.abrupt("return",u.map(V(n)).filter(Z.k));case 5:case"end":return r.stop()}}),r)})));return function(n,t,e){return r.apply(this,arguments)}}(),B=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e){var a,u;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(void 0!==e){r.next=2;break}return r.abrupt("return",[]);case 2:return r.next=4,F(t,e);case 4:return a=r.sent,u=a.value,r.abrupt("return",Promise.all(u.map(function(){var r=Object(i.a)(c.a.mark((function r(e){return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=e.name,r.next=3,Q(n,t,e.id);case 3:return r.t1=r.sent,r.abrupt("return",{name:r.t0,files:r.t1});case 5:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}())));case 7:case"end":return r.stop()}}),r)})));return function(n,t,e){return r.apply(this,arguments)}}(),L=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e){var a,u,o;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,A(t,e);case 2:return a=r.sent,u=a.value,r.next=6,Promise.all(u.map(function(){var r=Object(i.a)(c.a.mark((function r(e){var a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a=Number.parseInt(e.name),!isNaN(a)){r.next=3;break}return r.abrupt("return");case 3:return r.t0=a,r.next=6,Q(n,t,e.id);case 6:return r.t1=r.sent,r.abrupt("return",{number:r.t0,files:r.t1});case 8:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()));case 6:return o=r.sent,r.abrupt("return",o.filter(Z.k));case 8:case"end":return r.stop()}}),r)})));return function(n,t,e){return r.apply(this,arguments)}}(),_=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e){var a,u,o;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,A(t,e);case 2:return a=r.sent,u=a.value,r.next=6,Promise.all(u.map(function(){var r=Object(i.a)(c.a.mark((function r(e){var a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a=Number.parseInt(e.name),!isNaN(a)){r.next=3;break}return r.abrupt("return");case 3:return r.t0=a,r.next=6,L(n,t,e.id);case 6:return r.t1=r.sent,r.abrupt("return",{number:r.t0,episodes:r.t1});case 8:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()));case 6:return o=r.sent,r.abrupt("return",o.filter(Z.k));case 8:case"end":return r.stop()}}),r)})));return function(n,t,e){return r.apply(this,arguments)}}(),X=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e){var a,u;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(void 0!==e){r.next=2;break}return r.abrupt("return",[]);case 2:return r.next=4,F(t,e);case 4:return a=r.sent,u=a.value,r.abrupt("return",Promise.all(u.map(function(){var r=Object(i.a)(c.a.mark((function r(e){return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=e.name,r.next=3,_(n,t,e.id);case 3:return r.t1=r.sent,r.abrupt("return",{name:r.t0,seasons:r.t1});case 5:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}())));case 7:case"end":return r.stop()}}),r)})));return function(n,t,e){return r.apply(this,arguments)}}(),K=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e,a){var u;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return u=z(t),r.next=3,B(n,u,e);case 3:return r.t0=r.sent,r.next=6,X(n,u,a);case 6:return r.t1=r.sent,r.abrupt("return",{movies:r.t0,shows:r.t1});case 8:case"end":return r.stop()}}),r)})));return function(n,t,e,a){return r.apply(this,arguments)}}(),H=function(r){return r.kind===d.Caption},$=function(r){return r.kind===d.Video},rr=function(r,n){return function(t){return{kind:C.a.Episode,number:t.number,seasonNumber:n,showTmdbId:r,sources:t.files.filter($),captions:t.files.filter(H),usage:{lastWatched:void 0,progress:void 0}}}},nr=function(r){return function(n){return{kind:C.a.Movie,tmdbId:r,sources:n.files.filter($),captions:n.files.filter(H),usage:{lastWatched:void 0,progress:void 0}}}},tr=function(r){return function(n){return{kind:C.a.Season,number:n.number,showTmdbId:r,usage:{lastWatched:void 0,progress:void 0}}}},er=function(r){return function(){return{kind:C.a.Show,tmdbId:r,usage:{lastWatched:void 0,progress:void 0}}}},ar=function(r,n){switch(r.kind){case W.b.OneDrive:return M(r.id,r.accessToken.token,n)}},ur=function(r){switch(r.kind){case W.b.OneDrive:return K(r.id,r.accessToken.token,r.moviesPath,r.showsPath)}},cr=function(r,n){return Promise.all(r.map(function(){var r=Object(i.a)(c.a.mark((function r(t){var e,a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,j(t.name);case 2:if(void 0!==(e=r.sent)){r.next=5;break}return r.abrupt("return");case 5:return a=nr(e)(t),r.next=8,n(a);case 8:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()))},ir=function(r,n,t,e){return Promise.all(r.map(function(){var r=Object(i.a)(c.a.mark((function r(a){var u,i,o;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,x(a.name);case 2:if(void 0!==(u=r.sent)){r.next=5;break}return r.abrupt("return");case 5:return i=er(u)(),r.next=8,e(i);case 8:return o=r.sent,r.next=11,or(a.seasons,o,n,t);case 11:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()))},or=function(r,n,t,e){return Promise.all(r.map(function(){var r=Object(i.a)(c.a.mark((function r(a){var u,i;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return u=tr(n.tmdbId)(a),r.next=3,e(n,u);case 3:return i=r.sent,r.next=6,sr(a.episodes,n,i,t);case 6:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()))},sr=function(r,n,t,e){return Promise.all(r.map(function(){var r=Object(i.a)(c.a.mark((function r(a){var u;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return u=rr(n.tmdbId,t.number)(a),r.next=3,e(n.id,t.id,u);case 3:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()))},fr=function(){var r=Object(i.a)(c.a.mark((function r(n,t,e,a,u){var i,o,s;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,ur(n);case 2:return i=r.sent,o=i.movies,s=i.shows,r.next=7,cr(o,e);case 7:return r.next=9,ir(s,t,a,u);case 9:case"end":return r.stop()}}),r)})));return function(n,t,e,a,u){return r.apply(this,arguments)}}(),pr=(t(164),t(128)),dr=(t(138),t(153)),vr=t(165),br=t(154),lr=t(155),hr=function(r){return function(){var n=Object(i.a)(c.a.mark((function n(t){return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all(r.map(function(){var r=Object(i.a)(c.a.mark((function r(n){var e;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t(Object(U.a)(n));case 2:return e=r.sent,r.next=5,fr(e,(function(r,n,e){return t(jr(r,n,e))}),(function(r){return t(xr(r))}),(function(r,n){return t(kr(r,n))}),(function(r){return t(yr(r))}));case 5:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()));case 2:case"end":return n.stop()}}),n)})));return function(r){return n.apply(this,arguments)}}()},mr=function(r){return function(){var n=Object(i.a)(c.a.mark((function n(t,e){var a,u,i,o,s;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(a=e(),u=a.auth,void 0!==(i=Object(pr.a)(r.provider.providerId)(u))){n.next=4;break}throw new Error("could not find provider for file");case 4:return n.next=6,t(Object(U.a)(i));case 6:return o=n.sent,n.next=9,ar(o,r);case 9:return s=n.sent,n.abrupt("return",s);case 11:case"end":return n.stop()}}),n)})));return function(r,t){return n.apply(this,arguments)}}()},Or=function(r){switch(r.kind){case C.a.Episode:return Object(dr.a)(r);case C.a.Movie:return Object(vr.a)(r)}},wr=function(r){return function(){var n=Object(i.a)(c.a.mark((function n(t){var e,u,i;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all(r.sources.map((function(r){return t(mr(r))})));case 2:return e=n.sent,n.next=5,Promise.all(r.captions.map((function(r){return t(mr(r))})));case 5:return u=n.sent,i=Object(a.a)(Object(a.a)({},r),{},{sources:e,captions:u}),Or(i),n.abrupt("return",i);case 9:case"end":return n.stop()}}),n)})));return function(r){return n.apply(this,arguments)}}()},jr=function(r,n,t){return function(){var e=Object(i.a)(c.a.mark((function e(a,u){var i,s,f,p;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=u(),s=i.episodes,e.next=3,I(r,n,t);case 3:return f=e.sent,void 0!==(p=Object(o.a)(f.id)(s))&&(f.usage=p.usage),a(Object(dr.a)(f)),e.abrupt("return",f);case 8:case"end":return e.stop()}}),e)})));return function(r,n){return e.apply(this,arguments)}}()},xr=function(r){return function(){var n=Object(i.a)(c.a.mark((function n(t,e){var a,u,i,o;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=e(),u=a.movies,n.next=3,T(r);case 3:return i=n.sent,void 0!==(o=Object(N.b)(i.id)(u))&&(i.usage=o.usage),t(Object(vr.a)(i)),n.abrupt("return",i);case 8:case"end":return n.stop()}}),n)})));return function(r,t){return n.apply(this,arguments)}}()},kr=function(r,n){return function(){var t=Object(i.a)(c.a.mark((function t(e,a){var u,i,o,s;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u=a(),i=u.seasons,t.next=3,E(r,n);case 3:return o=t.sent,void 0!==(s=Object(S.c)(o.id)(i))&&(o.usage=s.usage),e(Object(br.a)(o)),t.abrupt("return",o);case 8:case"end":return t.stop()}}),t)})));return function(r,n){return t.apply(this,arguments)}}()},yr=function(r){return function(){var n=Object(i.a)(c.a.mark((function n(t,e){var a,u,i,o;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=e(),u=a.shows,n.next=3,P(r);case 3:return i=n.sent,void 0!==(o=Object(D.a)(i.id)(u))&&(i.usage=o.usage),t(Object(lr.a)(i)),n.abrupt("return",i);case 8:case"end":return n.stop()}}),n)})));return function(r,t){return n.apply(this,arguments)}}()},gr=function(){return function(){var r=Object(i.a)(c.a.mark((function r(n){return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n(function(){var r=Object(i.a)(c.a.mark((function r(n,t){var e,a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=t(),a=e.movies,r.next=3,Promise.all(Object(N.e)(a).map(function(){var r=Object(i.a)(c.a.mark((function r(t){return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",n(xr(t)));case 1:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()));case 3:case"end":return r.stop()}}),r)})));return function(n,t){return r.apply(this,arguments)}}());case 2:return r.next=4,n(function(){var r=Object(i.a)(c.a.mark((function r(n,t){var e,a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=t(),a=e.shows,r.next=3,Promise.all(Object(D.b)(a).map(function(){var r=Object(i.a)(c.a.mark((function r(t){return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",n(yr(t)));case 1:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()));case 3:case"end":return r.stop()}}),r)})));return function(n,t){return r.apply(this,arguments)}}());case 4:return r.next=6,n(function(){var r=Object(i.a)(c.a.mark((function r(n,t){var e,a,u;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=t(),a=e.seasons,u=e.shows,r.next=3,Promise.all(Object(S.g)(a).map(function(){var r=Object(i.a)(c.a.mark((function r(t){var e;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(void 0!==(e=Object(D.a)(t.showId)(u))){r.next=3;break}throw new Error("cannot find show for season");case 3:return r.abrupt("return",n(kr(e,t)));case 4:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()));case 3:case"end":return r.stop()}}),r)})));return function(n,t){return r.apply(this,arguments)}}());case 6:return r.next=8,n(function(){var r=Object(i.a)(c.a.mark((function r(n,t){var e,a;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=t(),a=e.episodes,r.next=3,Promise.all(Object(o.c)(a).map(function(){var r=Object(i.a)(c.a.mark((function r(t){return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",n(jr(t.showId,t.seasonId,t)));case 1:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()));case 3:case"end":return r.stop()}}),r)})));return function(n,t){return r.apply(this,arguments)}}());case 8:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}()}},143:function(r,n,t){"use strict";t.d(n,"a",(function(){return d}));var e=t(110),a=t.n(e),u=t(111),c=t(61),i=t(28),o=t(149),s=t(151),f=t(163),p=t(150),d=function(r){return function(){var n=Object(u.a)(a.a.mark((function n(t){var e;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t(Object(c.b)()),n.prev=1,n.next=4,t(r);case 4:e=n.sent,n.next=10;break;case 7:n.prev=7,n.t0=n.catch(1),n.t0 instanceof Error&&t(Object(c.a)((a=n.t0)instanceof o.a?{kind:i.a.APIError,status:a.status,message:a.message}:a instanceof s.a?{kind:i.a.AuthenticationFailure,provider:a.provider}:a instanceof f.a?{kind:i.a.CannotFindFile,file:a.file}:a instanceof p.a?{kind:i.a.ProviderAlreadyExists,provider:a.provider}:{kind:i.a.GenericError,error:a}));case 10:return t(Object(c.c)()),n.abrupt("return",e);case 12:case"end":return n.stop()}var a}),n,null,[[1,7]])})));return function(r){return n.apply(this,arguments)}}()}},149:function(r,n,t){"use strict";t.d(n,"a",(function(){return o}));var e=t(54),a=t(115),u=t(116),c=t(117),i=t(124),o=function(r){Object(u.a)(t,r);var n=Object(c.a)(t);function t(r,u){var c;return Object(e.a)(this,t),(c=n.call(this,u)).status=void 0,Error.captureStackTrace&&Error.captureStackTrace(Object(a.a)(c),t),c.name="APIError",c.status=r,c}return t}(Object(i.a)(Error))},150:function(r,n,t){"use strict";t.d(n,"a",(function(){return o}));var e=t(54),a=t(115),u=t(116),c=t(117),i=t(124),o=function(r){Object(u.a)(t,r);var n=Object(c.a)(t);function t(r){var u;return Object(e.a)(this,t),(u=n.call(this)).provider=void 0,Error.captureStackTrace&&Error.captureStackTrace(Object(a.a)(u),t),u.name="ProviderAlreadyExists",u.provider=r,u}return t}(Object(i.a)(Error))},151:function(r,n,t){"use strict";t.d(n,"a",(function(){return o}));var e=t(54),a=t(115),u=t(116),c=t(117),i=t(124),o=function(r){Object(u.a)(t,r);var n=Object(c.a)(t);function t(r){var u;return Object(e.a)(this,t),(u=n.call(this)).provider=void 0,Error.captureStackTrace&&Error.captureStackTrace(Object(a.a)(u),t),u.name="AuthenticationFailure",u.provider=r,u}return t}(Object(i.a)(Error))},153:function(r,n,t){"use strict";t.d(n,"a",(function(){return a}));var e=t(45),a=function(r){return{type:e.b,payload:{episode:r}}}},154:function(r,n,t){"use strict";t.d(n,"a",(function(){return a}));var e=t(47),a=function(r){return{type:e.b,payload:{season:r}}}},155:function(r,n,t){"use strict";t.d(n,"a",(function(){return a}));var e=t(48),a=function(r){return{type:e.b,payload:{show:r}}}},163:function(r,n,t){"use strict";t.d(n,"a",(function(){return o}));var e=t(54),a=t(115),u=t(116),c=t(117),i=t(124),o=function(r){Object(u.a)(t,r);var n=Object(c.a)(t);function t(r){var u;return Object(e.a)(this,t),(u=n.call(this)).file=void 0,Error.captureStackTrace&&Error.captureStackTrace(Object(a.a)(u),t),u.name="CannotFindFileError",u.file=r,u}return t}(Object(i.a)(Error))},164:function(r,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"a",(function(){return c}));var e=t(2),a=t(165),u=function(r,n){return function(t){var u={lastWatched:(new Date).toISOString(),progress:n};t(Object(a.a)(Object(e.a)(Object(e.a)({},r),{},{usage:u})))}},c=function(r,n){return function(t){t(Object(a.a)(Object(e.a)(Object(e.a)({},r),{},{sources:r.sources.filter((function(r){return r.provider.providerId!==n})),captions:r.captions.filter((function(r){return r.provider.providerId!==n}))})))}}},165:function(r,n,t){"use strict";t.d(n,"a",(function(){return a}));var e=t(46),a=function(r){return{type:e.b,payload:{movie:r}}}},166:function(r,n,t){"use strict";t.d(n,"b",(function(){return f})),t.d(n,"a",(function(){return p}));var e=t(2),a=t(119),u=t(153),c=t(114),i=t(154),o=t(155),s=function(r,n){return function(t,a){var u={lastWatched:(new Date).toISOString(),progress:n};t(Object(i.a)(Object(e.a)(Object(e.a)({},r),{},{usage:u})));var s=a().shows,f=Object(c.a)(r.showId)(s);if(void 0===f)throw new Error("parent show of season undefined");t(function(r,n){return function(t){var a={lastWatched:(new Date).toISOString(),progress:n};t(Object(o.a)(Object(e.a)(Object(e.a)({},r),{},{usage:a})))}}(f,r.number))}},f=function(r,n){return function(t,c){var i={lastWatched:(new Date).toISOString(),progress:n};t(Object(u.a)(Object(e.a)(Object(e.a)({},r),{},{usage:i})));var o=c().seasons,f=Object(a.c)(r.seasonId)(o);if(void 0===f)throw new Error("parent season of episode undefined");t(s(f,r.number))}},p=function(r,n){return function(t){t(Object(u.a)(Object(e.a)(Object(e.a)({},r),{},{sources:r.sources.filter((function(r){return r.provider.providerId!==n})),captions:r.captions.filter((function(r){return r.provider.providerId!==n}))})))}}},167:function(r,n,t){"use strict";t.d(n,"a",(function(){return k})),t.d(n,"b",(function(){return y}));var e=t(110),a=t.n(e),u=t(2),c=t(111),i=t(29),o=t(150),s=t(151),f=t(214),p="c06abdd7-3e36-4e51-9ecf-8e304a3fe37f",d=["user.read","files.read.all"],v=function(r,n,t){return{kind:i.b.OneDrive,accessToken:{token:r,validUntil:t.toISOString()},id:(e=i.b.OneDrive,a=n,"".concat(e,"@").concat(a)),name:n};var e,a},b=function(){var r=Object(c.a)(a.a.mark((function r(n){var t,e,u,c;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.acquireTokenSilent({scopes:d});case 2:return t=r.sent,e=t.accessToken,u=t.account,c=t.expiresOn,r.abrupt("return",v(e,u.userName,c));case 7:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}(),l=function(){var r=Object(c.a)(a.a.mark((function r(n){var t,e,u,c;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.loginPopup({scopes:d,prompt:"select_account"});case 2:return r.next=4,n.acquireTokenSilent({scopes:d});case 4:return t=r.sent,e=t.accessToken,u=t.account,c=t.expiresOn,r.abrupt("return",v(e,u.userName,c));case 9:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}(),h=function(){var r=Object(c.a)(a.a.mark((function r(n,t){return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=4;break}return r.next=3,l(n);case 3:return r.abrupt("return",r.sent);case 4:return r.prev=4,r.next=7,b(n);case 7:return r.abrupt("return",r.sent);case 10:return r.prev=10,r.t0=r.catch(4),r.next=14,l(n);case 14:return r.abrupt("return",r.sent);case 15:case"end":return r.stop()}}),r,null,[[4,10]])})));return function(n,t){return r.apply(this,arguments)}}(),m=function(){var r=Object(c.a)(a.a.mark((function r(n){var t,e,u=arguments;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t=!(u.length>1&&void 0!==u[1])||u[1],!(void 0!==n&&new Date(n.accessToken.validUntil)>new Date)){r.next=3;break}return r.abrupt("return",n);case 3:return e=new f.a({auth:{clientId:p}}),r.prev=4,r.next=7,h(e,t);case 7:return r.abrupt("return",r.sent);case 10:throw r.prev=10,r.t0=r.catch(4),new s.a(i.b.OneDrive);case 13:case"end":return r.stop()}}),r,null,[[4,10]])})));return function(n){return r.apply(this,arguments)}}(),O=t(128),w=t(138),j=function(r){switch(r.kind){case i.b.OneDrive:return m(r)}},x=function(r){switch(r){case i.b.OneDrive:return m(void 0,!1)}},k=function(r){return function(){var n=Object(c.a)(a.a.mark((function n(t){var e,c;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,j(r);case 2:return e=n.sent,c=Object(u.a)(Object(u.a)({},e),{},{moviesPath:r.moviesPath,showsPath:r.showsPath}),t(Object(w.b)(c)),n.abrupt("return",c);case 6:case"end":return n.stop()}}),n)})));return function(r){return n.apply(this,arguments)}}()},y=function(r){return function(){var n=Object(c.a)(a.a.mark((function n(t,e){var u,c,i,s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x(r);case 2:if(u=n.sent,c=e(),i=c.auth,void 0===(s=Object(O.b)(i).find((function(n){return n.kind===r&&n.name===u.name})))){n.next=7;break}throw new o.a(s);case 7:return n.abrupt("return",u);case 8:case"end":return n.stop()}}),n)})));return function(r,t){return n.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=1.e7f803bd.chunk.js.map