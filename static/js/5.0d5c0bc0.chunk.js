(this.webpackJsonpplaain=this.webpackJsonpplaain||[]).push([[5],{351:function(e,t,c){},352:function(e,t,c){},353:function(e,t,c){},354:function(e,t,c){},357:function(e,t,c){},358:function(e,t,c){},359:function(e,t,c){},360:function(e,t,c){},362:function(e,t,c){},363:function(e,t,c){},364:function(e,t,c){},365:function(e,t,c){},366:function(e,t,c){},367:function(e,t,c){},368:function(e,t,c){},369:function(e,t,c){},370:function(e,t,c){},371:function(e,t,c){},372:function(e,t,c){},373:function(e,t,c){},374:function(e,t,c){},375:function(e,t,c){},376:function(e,t,c){},377:function(e,t,c){},379:function(e,t,c){},380:function(e,t,c){},381:function(e,t,c){},382:function(e,t,c){},383:function(e,t,c){},404:function(e,t,c){"use strict";c.r(t);c(351);var n=c(7),s=c(54),i=(c(352),c(1)),r=c(306),a=c(307),o=(c(353),c(405)),j=c(400),l=c(29),b=(c(354),c(3)),d=function(e){var t=e.url,c=e.alt;return Object(b.jsx)("img",{className:"Cover",src:t,alt:c})},u=c(50),h=c(298),O=function(e){var t=e.id,c=e.items,n=Object(h.a)().t;return Object(b.jsx)("div",{className:"HorizontalSlide",id:t,children:Object(b.jsx)(o.a,{spaceBetween:15,slidesPerView:"auto",slidesOffsetBefore:20,slidesOffsetAfter:20,grabCursor:!0,children:c.length>0?c.map((function(e,t){return Object(b.jsx)(j.a,{children:Object(b.jsx)(u.b,{to:Object(l.f)(e),children:Object(b.jsx)(d,{url:Object(l.d)(e.posterPath),alt:e.title})})},t)})):Object(b.jsx)(j.a,{children:Object(b.jsx)("h3",{children:n("Nothing found.")})})})})},f=c(355),x=c(23),m=function(e,t){var c=new f.Index({tokenize:"forward"});return e.forEach((function(e){return c.add(e.id,t(e))})),c},v=function(){var e=Object(h.a)().t,t=Object(n.h)(),c=Object(n.f)(),o=Object(i.useMemo)((function(){return new URLSearchParams(c.search).get("q")}),[c]),j=Object(x.c)((function(e){return{movies:e.movies,shows:e.shows}})),d=j.movies,u=j.shows,f=Object(i.useState)(o||""),v=Object(s.a)(f,2),p=v[0],g=v[1],y=Object(i.useMemo)((function(){return m(Object(r.e)(d),(function(e){return"".concat(e.title,";").concat(e.summary)}))}),[d]),w=Object(i.useMemo)((function(){return m(Object(a.b)(u),(function(e){return"".concat(e.title,";").concat(e.summary)}))}),[u]),_=Object(i.useMemo)((function(){return y.search(p).map((function(e){return Object(r.b)(e)(d)})).filter(l.m)}),[y,p]),N=Object(i.useMemo)((function(){return w.search(p).map((function(e){return Object(a.a)(e)(u)})).filter(l.m)}),[w,p]),k=Object(i.useCallback)((function(e){t("/app/find?".concat("q","=").concat(e.target.value),{replace:!0}),g(e.target.value)}),[t,g]);return Object(r.e)(d).length>0||Object(a.b)(u).length>0?Object(b.jsxs)("div",{className:"Find",children:[Object(b.jsx)("form",{children:Object(b.jsx)("input",{autoFocus:!0,value:p,placeholder:e("Search your library"),onChange:k})}),_&&Object.keys(_).length>0&&Object(b.jsxs)("section",{children:[Object(b.jsx)("h2",{children:e("Movies")}),Object(b.jsx)(O,{items:_,id:"movies"})]}),N&&Object.keys(N).length>0&&Object(b.jsxs)("section",{children:[Object(b.jsx)("h2",{children:e("TV shows")}),Object(b.jsx)(O,{items:N,id:"shows"})]})]}):Object(b.jsx)(n.a,{to:"/app"})},p=c(112),g=c(311),y=c(20),w=c(321),_=Object(w.a)([function(e){return Object(r.a)(e.movies)},function(e){return Object(g.a)(e.seasons)}],(function(e,t){return[].concat(Object(p.a)(e),Object(p.a)(t))})),N=Object(w.a)([function(e){return Object(r.f)(e.movies)},function(e){return Object(g.b)(e.seasons)}],(function(e,t){return[].concat(Object(p.a)(e),Object(p.a)(t))})),k=(c(357),function(e){var t=e.onIndex,c=Object(h.a)().t;return Object(b.jsxs)("div",{className:"Authenticated",children:[Object(b.jsx)("h2",{children:c("Get started")}),Object(b.jsx)("p",{children:c("You signed into a cloud service, but we didn't find any movies or TV shows.")}),Object(b.jsx)("p",{children:c("It's likely that you just have to move some of your files around and create some folders to make it work.")}),Object(b.jsx)("p",{children:c("Reference the getting started guide to learn how to organize your files so that Plaain finds them. After you're done, just re-index.")}),Object(b.jsxs)("div",{className:"Authenticated__buttons",children:[Object(b.jsx)("a",{className:"button primary",href:"https://github.com/jonhue/plaain#getting-started",target:"_blank",rel:"noopener noreferrer",children:c("Getting started")}),Object(b.jsx)("button",{onClick:t,children:c("Index")})]})]})}),P=(c(358),function(e){var t=e.inProgress,c=e.recentlyWatched,n=Object(h.a)().t;return Object(b.jsxs)("div",{className:"ForYou",children:[t.length>0&&Object(b.jsxs)("section",{children:[Object(b.jsx)("h2",{children:n("Continue watching")}),Object(b.jsx)(O,{items:t,id:"inProgress"})]}),c.length>0&&Object(b.jsxs)("section",{children:[Object(b.jsx)("h2",{children:n("Recently watched")}),Object(b.jsx)(O,{items:c,id:"recentlyWatched"})]})]})}),C=(c(359),function(e){var t=e.movies,c=e.shows,n=Object(h.a)().t;return Object(b.jsxs)("div",{className:"Setup",children:[Object(b.jsx)("h2",{children:n("Get started")}),Object(b.jsx)("p",{children:n("Here, you'll be able to find your recently watched movie or the show you didn't finish yet.")}),Object(b.jsxs)("div",{className:"Setup__buttons",children:[t.length>0&&Object(b.jsx)(u.b,{to:"/app/movies",className:"button",children:n("Discover your movies")}),c.length>0&&Object(b.jsx)(u.b,{to:"/app/shows",className:"button",children:n("Discover your shows")})]})]})}),S=(c(360),c(164)),F=function(){var e=Object(h.a)().t;return Object(b.jsxs)("div",{className:"Unauthenticated",children:[Object(b.jsx)("h2",{children:e("Get started")}),Object(b.jsx)("p",{children:e("To watch your movies and TV shows, you first have to sign in with the cloud service that hosts your media.")}),Object(b.jsx)(u.b,{to:"/app/settings",className:"button",children:e("Authenticate")}),Object(b.jsx)("p",{className:"small",children:Object(b.jsxs)(S.a,{children:["Note that Plaain may ",Object(b.jsx)("span",{className:"bold",children:"not"})," be used to stream pirated content or publicly share your private media library. You may only connect to your private cloud storage."]})})]})},M=c(334),A=c(78),T=c(104),D=function(){var e=Object(x.b)(),t=Object(x.c)((function(e){return{inProgress:Object(l.o)(_(e)),movies:Object(r.e)(e.movies),providers:Object(T.b)(e.auth),recentlyWatched:Object(l.o)(N(e)),shows:Object(a.b)(e.shows)}})),c=t.inProgress,n=t.movies,s=t.providers,o=t.recentlyWatched,j=t.shows,d=Object(i.useCallback)((function(){e(Object(A.a)(Object(M.b)(s)))}),[e,s]);return c.length>0||o.length>0?Object(b.jsx)(P,{inProgress:c,recentlyWatched:o}):0===s.length?Object(b.jsx)(F,{}):0===n.length&&0===j.length?Object(b.jsx)(k,{onIndex:d}):Object(b.jsx)(C,{movies:n,shows:j})},E=(c(362),c(103)),I=function(e){var t=e.files,c=Object(h.a)().t;return Object(b.jsxs)("div",{className:"FileList",children:[t.map((function(e,t){return Object(b.jsx)("p",{className:"small",children:e.name},t)})),0===t.length&&Object(b.jsx)("p",{className:"small",children:c("None")})]})},L=c(102),G=(c(363),function(e){var t=Object(i.useState)(e),c=Object(s.a)(t,2),n=c[0],r=c[1];return[n,Object(i.useCallback)((function(){return r((function(e){return!e}))}),[r])]}),V=function(e){var t=e.people,c=e.details,n=Object(h.a)().t,r=G(!0),a=Object(s.a)(r,2),o=a[0],j=a[1],d=Object(i.useMemo)((function(){return t.slice(0,o?10:t.length)}),[o,t]);return Object(b.jsxs)("div",{className:"PersonList",children:[t.length>0?d.map((function(e,t){return Object(b.jsxs)("p",{children:[Object(b.jsx)(u.b,{to:Object(l.f)(e),children:e.name})," \xb7"," ",Object(b.jsx)("span",{children:c(e)})]},t)})):Object(b.jsx)("p",{children:n("None")}),t.length>10&&Object(b.jsx)("span",{onClick:j,children:n(o?"Show more":"Show less")})]})},Y=c(101),U=c.n(Y),W=function(){var e=Object(h.a)().t,t=Object(n.h)(),c=Object(n.i)().id,s=Object(x.c)((function(e){return Object(r.b)(c)(e.movies)})),a=Object(i.useCallback)((function(){void 0!==s&&t("/player?id=".concat(s.id,"&type=").concat(s.kind,"&s=").concat(s.usage.progress))}),[s,t]),o=Object(i.useCallback)((function(){void 0!==s&&t("/player?id=".concat(s.id,"&type=").concat(s.kind))}),[s,t]);return void 0!==s?Object(b.jsxs)("div",{className:"Movie",children:[Object(b.jsx)(E.a,{url:Object(l.a)(s.backdropPath)}),Object(b.jsxs)("div",{className:"Movie__details",children:[Object(b.jsx)(d,{url:Object(l.d)(s.posterPath),alt:"poster"}),Object(b.jsx)("h1",{children:s.title}),Object(b.jsxs)("div",{className:"Movie__information",children:[Object(b.jsx)("p",{className:"small",children:new Date(s.releaseDate).getFullYear()}),s.duration&&Object(b.jsx)("p",{className:"small",children:Object(l.q)(e,s.duration)})]}),Object(b.jsxs)("div",{className:"Movie__actions",children:[Object(l.l)(s)&&Object(b.jsx)("button",{className:"primary",onClick:a,disabled:0===s.sources.length,children:e("Continue")}),Object(b.jsx)("button",{className:U()({primary:!Object(l.l)(s)}),onClick:o,disabled:0===s.sources.length,children:e("Watch")}),Object(b.jsx)("a",{className:"button",href:s.trailerUrl,target:"_blank",rel:"noopener noreferrer",children:e("Play trailer")})]}),Object(b.jsx)("p",{className:"Movie__overview",children:s.summary}),Object(b.jsxs)("div",{className:"Movie__people",children:[Object(b.jsxs)("div",{className:"Movie__people__cast",children:[Object(b.jsx)("h4",{children:e("Starring")}),Object(b.jsx)(V,{people:s.cast,details:function(e){return e.character}})]}),Object(b.jsxs)("div",{className:"Movie__people__crew",children:[Object(b.jsx)("h4",{children:e("Crew")}),Object(b.jsx)(V,{people:s.crew,details:function(t){return Object(l.g)(e,t.job,t.gender)}})]})]})]}),Object(b.jsx)("div",{className:"Movie__sources",children:Object(b.jsxs)("div",{children:[Object(b.jsx)("h4",{children:e("Sources")}),Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"Movie__sources__versions",children:[Object(b.jsx)("h5",{children:e("Versions")}),Object(b.jsx)(I,{files:s.sources})]}),Object(b.jsxs)("div",{className:"Movie__sources__captions",children:[Object(b.jsx)("h5",{children:e("Subtitles")}),Object(b.jsx)(I,{files:s.captions})]})]})]})})]}):Object(b.jsx)(L.a,{})},R=(c(364),c(365),function(e){var t=e.items,c=Object(h.a)().t;return Object(b.jsx)("div",{className:"ItemGrid",children:t.length>0?t.map((function(e,t){return Object(b.jsx)("div",{className:"ItemGrid__item",children:Object(b.jsx)(u.b,{to:Object(l.f)(e),children:Object(b.jsx)(d,{url:Object(l.d)(e.posterPath),alt:e.title})})},t)})):Object(b.jsx)("div",{className:"ItemGrid__item",children:Object(b.jsx)("h3",{children:c("Nothing found.")})})})}),B=(c(366),c(403)),H=c(401);B.a.use([H.a]);var z,q=function(e){var t=e.id,c=e.items,n=e.path,s=Object(h.a)().t;return Object(b.jsx)("div",{className:"VerticalSlide",id:t,children:Object(b.jsx)(o.a,{direction:"vertical",slidesPerView:"auto",grabCursor:!0,effect:"coverflow",coverflowEffect:{rotate:0,stretch:425,depth:150,modifier:1,slideShadows:!1},history:{replaceState:!0,key:n},children:c.length>0?c.map((function(e,t){return Object(b.jsx)(j.a,{"data-history":e.id,children:Object(b.jsx)(u.b,{to:Object(l.f)(e),children:Object(b.jsx)(d,{url:Object(l.d)(e.posterPath),alt:e.title})})},t)})):Object(b.jsx)(j.a,{children:Object(b.jsx)("h3",{children:s("Nothing found.")})})})})},Z=function(){var e=Object(x.c)((function(e){return Object(l.n)(Object(r.e)(e.movies),(function(e){return e.title}))}));return e.length>0?Object(b.jsxs)("div",{className:"Movies",children:[Object(b.jsx)(q,{items:e,path:"movies",id:"movies"}),Object(b.jsx)(R,{items:e})]}):Object(b.jsx)(n.a,{to:"/app"})},J=(c(367),c(42)),K=function(){return Object(b.jsxs)(J.a,{className:"zoom",width:24,height:24,children:[Object(b.jsx)("title",{children:"Find"}),Object(b.jsxs)("g",{fill:"#ffffff",children:[Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"22",x2:"15.656",y1:"22",y2:"15.656"}),Object(b.jsx)("circle",{cx:"10",cy:"10",fill:"none",r:"8",stroke:"#ffffff"})]})]})},Q=function(){return Object(b.jsxs)(J.a,{className:"popcorn",width:24,height:24,children:[Object(b.jsx)("title",{children:"For You"}),Object(b.jsxs)("g",{fill:"#ffffff",children:[Object(b.jsx)("polygon",{fill:"none",points:"21 7 3 7 5 23 19 23 21 7",stroke:"#ffffff"}),Object(b.jsx)("path",{d:"M19,5a3,3,0,0,0-3-3,2.97,2.97,0,0,0-1.47.4,2.986,2.986,0,0,0-5.06,0A2.97,2.97,0,0,0,8,2,3,3,0,0,0,5,5",fill:"none",stroke:"#ffffff"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"9",x2:"8",y1:"23",y2:"7"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"15",x2:"16",y1:"23",y2:"7"})]})]})},X=function(){return Object(b.jsxs)(J.a,{className:"movie-61",width:24,height:24,children:[Object(b.jsx)("title",{children:"Movie"}),Object(b.jsxs)("g",{fill:"#ffffff",children:[Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"1",x2:"1",y1:"1",y2:"23"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"23",x2:"23",y1:"1",y2:"23"}),Object(b.jsx)("rect",{height:"22",width:"14",fill:"none",stroke:"#ffffff",x:"5",y:"1"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"1",x2:"23",y1:"12",y2:"12"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"1",x2:"5",y1:"8",y2:"8"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"1",x2:"5",y1:"4",y2:"4"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"19",x2:"23",y1:"8",y2:"8"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"19",x2:"23",y1:"4",y2:"4"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"19",x2:"23",y1:"20",y2:"20"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"19",x2:"23",y1:"16",y2:"16"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"1",x2:"5",y1:"20",y2:"20"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"1",x2:"5",y1:"16",y2:"16"})]})]})},$=function(){return Object(b.jsxs)(J.a,{className:"settings-gear",width:24,height:24,children:[Object(b.jsx)("title",{children:"Settings"}),Object(b.jsxs)("g",{fill:"#ffffff",stroke:"#ffffff",children:[Object(b.jsx)("circle",{cx:"12",cy:"12",fill:"none",r:"3"}),Object(b.jsx)("path",{d:"M20,12a8.049,8.049,0,0,0-.188-1.713l2.714-2.055-2-3.464L17.383,6.094a7.987,7.987,0,0,0-2.961-1.719L14,1H10L9.578,4.375A7.987,7.987,0,0,0,6.617,6.094L3.474,4.768l-2,3.464,2.714,2.055a7.9,7.9,0,0,0,0,3.426L1.474,15.768l2,3.464,3.143-1.326a7.987,7.987,0,0,0,2.961,1.719L10,23h4l.422-3.375a7.987,7.987,0,0,0,2.961-1.719l3.143,1.326,2-3.464-2.714-2.055A8.049,8.049,0,0,0,20,12Z",fill:"none",stroke:"#ffffff"})]})]})},ee=function(){return Object(b.jsxs)(J.a,{className:"desktop-screen",width:24,height:24,children:[Object(b.jsx)("title",{children:"Show"}),Object(b.jsxs)("g",{fill:"#ffffff",children:[Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"12",x2:"12",y1:"22",y2:"18"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"6",x2:"18",y1:"22",y2:"22"}),Object(b.jsx)("rect",{height:"16",width:"22",fill:"none",stroke:"#ffffff",x:"1",y:"2"})]})]})},te=(c(368),function(e){var t=e.children,c=e.to,s=e.inexact,i=e.disabled,r=!!Object(n.g)({path:"".concat(c).concat(s?"/*":"")});return Object(b.jsx)(u.b,{className:U()("Tab",{active:r,disabled:i}),to:c,children:t})}),ce=function(e){var t=e.moviesDisabled,c=e.showsDisabled,n=Object(h.a)().t;return Object(b.jsx)("div",{className:"Nav",children:Object(b.jsxs)("div",{className:"Nav__wrapper",children:[Object(b.jsxs)(te,{to:"/app",children:[Object(b.jsx)(Q,{}),Object(b.jsx)("p",{children:n("For you")})]}),Object(b.jsxs)(te,{disabled:t,to:"/app/movies",inexact:!0,children:[Object(b.jsx)(X,{}),Object(b.jsx)("p",{children:n("Movies")})]}),Object(b.jsxs)(te,{disabled:c,to:"/app/shows",inexact:!0,children:[Object(b.jsx)(ee,{}),Object(b.jsx)("p",{children:n("Shows")})]}),Object(b.jsxs)(te,{disabled:t&&c,to:"/app/find",children:[Object(b.jsx)(K,{}),Object(b.jsx)("p",{children:n("Find")})]}),Object(b.jsxs)(te,{to:"/app/settings",children:[Object(b.jsx)($,{}),Object(b.jsx)("p",{children:n("Settings")})]})]})})},ne=(c(369),function(){var e=Object(h.a)().t,t=Object(n.i)().id,c=Object(x.c)((function(e){return function(e){return Object(w.a)([function(t){var c=t.movies;return Object(r.d)(e,(function(e){return e.cast}))(c)},function(t){var c=t.movies;return Object(r.d)(e,(function(e){return e.crew}))(c)},function(t){var c=t.seasons;return Object(g.f)(e,(function(e){return e.cast}))(c)},function(t){var c=t.seasons;return Object(g.f)(e,(function(e){return e.crew}))(c)}],(function(t,c,n,s){return[].concat(Object(p.a)(t),Object(p.a)(c),Object(p.a)(n),Object(p.a)(s)).reduce((function(t,c){return{kind:y.a.Person,id:e,tmdbId:c.tmdbId,name:c.name,gender:c.gender,profilePath:c.profilePath,jobs:void 0===c.job?null===t||void 0===t?void 0:t.jobs:void 0!==t&&void 0!==t.jobs?Object(p.a)(new Set([].concat(Object(p.a)(t.jobs),[c.job]))):[c.job]}}),void 0)}))}(t)(e)})),s=Object(x.c)((function(e){return{movies:c&&Object(r.c)(c.id)(e.movies),seasons:c&&Object(g.d)(c.id)(e.seasons)}})),a=s.movies,o=s.seasons,j=Object(i.useMemo)((function(){return void 0!==a&&a.length>0?a[0].backdropPath:void 0!==o&&o.length>0?o[0].showBackdropPath:void 0}),[a,o]);return void 0!==c&&void 0!==a&&void 0!==o?Object(b.jsxs)("div",{className:"Person",children:[Object(b.jsx)(E.a,{url:Object(l.a)(j)}),Object(b.jsxs)("div",{className:"Person__details",children:[Object(b.jsx)(d,{url:Object(l.d)(c.profilePath),alt:"profile"}),Object(b.jsx)("h1",{children:c.name}),c.jobs&&Object(b.jsx)("p",{children:c.jobs.map((function(t){return Object(l.g)(e,t,c.gender)})).join(", ")})]}),a.length>0&&Object(b.jsxs)("div",{className:"Person__movies",children:[Object(b.jsx)("h2",{children:e("Movies")}),Object(b.jsx)(O,{items:a,id:"movies"})]}),o.length>0&&Object(b.jsxs)("div",{className:"Person__seasons",children:[Object(b.jsx)("h2",{children:e("TV seasons")}),Object(b.jsx)(O,{items:o,id:"seasons"})]})]}):Object(b.jsx)(L.a,{})}),se=(c(370),c(371),function(e){var t=e.episode,c=e.onClick,n=Object(h.a)().t;return Object(b.jsxs)("div",{className:U()("EpisodeEntry",{disabled:0===t.sources.length}),onClick:c,children:[Object(b.jsx)("div",{className:"EpisodeEntry__number",children:t.number}),Object(b.jsxs)("div",{className:"EpisodeEntry__details",children:[Object(b.jsx)("h2",{children:t.title}),Object(b.jsxs)("p",{className:"small",children:[n("Aired")," ",new Date(t.airDate).toDateString()]}),Object(b.jsx)("p",{children:t.summary})]})]})}),ie=c(324),re=function(){var e=Object(h.a)().t,t=Object(n.h)(),c=Object(n.i)().id,r=Object(x.c)((function(e){return Object(g.c)(c)(e.seasons)})),o=Object(x.c)((function(e){return{show:r&&Object(a.a)(r.showId)(e.shows),episodes:r&&Object(l.p)(Object(ie.b)(r.id)(e.episodes),(function(e){return e.number}))}})),j=o.show,u=o.episodes,O=Object(i.useMemo)((function(){if(void 0!==r&&void 0!==u)return u.find((function(e){return e.number===r.usage.progress}))}),[r,u]),f=G(!1),m=Object(s.a)(f,2),v=m[0],p=m[1],y=Object(i.useCallback)((function(e){return function(){t("/player?id=".concat(e.id,"&type=").concat(e.kind,"&s=").concat(e.usage.progress))}}),[t]),w=Object(i.useCallback)((function(e){return function(){if(void 0!==u){var c=u.find((function(t){return t.number===e}));t("/player?id=".concat(c.id,"&type=").concat(c.kind))}}}),[u,t]);return void 0!==j&&void 0!==r&&void 0!==u?Object(b.jsxs)("div",{className:"Season",children:[Object(b.jsx)(E.a,{url:Object(l.a)(r.showBackdropPath)}),Object(b.jsxs)("div",{className:"Season__details",children:[Object(b.jsx)(d,{url:Object(l.d)(r.posterPath),alt:"poster"}),Object(b.jsxs)("h1",{children:[e("Season")," ",r.number]}),Object(b.jsxs)("div",{className:"Season__information",children:[Object(b.jsx)("p",{className:"small",children:j.title}),Object(b.jsx)("p",{className:"small",children:new Date(r.airDate).getFullYear()})]}),Object(b.jsxs)("div",{className:"Season__actions",children:[void 0!==O&&Object(b.jsxs)("button",{className:"primary",onClick:y(O),disabled:0===O.sources.length,children:[e("Continue episode")," ",O.number]}),u.length>0&&Object(b.jsx)("button",{className:U()({primary:void 0===O}),onClick:w(0),disabled:0===u[0].sources.length,children:e("Watch")}),Object(b.jsx)("a",{className:"button",id:"trailer",href:r.trailerUrl,target:"_blank",rel:"noopener noreferrer",children:e("Play trailer")})]}),Object(b.jsxs)("div",{className:"Season__episodes",children:[Object(b.jsx)("div",{className:U()("Season__episodes__list",{shown:v}),children:u.slice(0,v?u.length:0).map((function(e,t){return Object(b.jsx)(se,{episode:e,onClick:w(e.number)},t)}))}),u.length>0&&Object(b.jsx)("div",{className:"Season__episodes__toggle",onClick:p,children:e(v?"Hide episodes":"Show all episodes")})]}),Object(b.jsx)("p",{className:"Season__overview",children:r.summary}),Object(b.jsxs)("div",{className:"Season__people",children:[Object(b.jsxs)("div",{className:"Season__people__cast",children:[Object(b.jsx)("h4",{children:e("Starring")}),Object(b.jsx)(V,{people:r.cast,details:function(e){return e.character}})]}),Object(b.jsxs)("div",{className:"Season__people__crew",children:[Object(b.jsx)("h4",{children:e("Crew")}),Object(b.jsx)(V,{people:r.crew,details:function(t){return Object(l.g)(e,t.job,t.gender)}})]})]})]})]}):Object(b.jsx)(L.a,{})},ae=c(18),oe=c(6),je=(c(372),c(52)),le=function(){return Object(b.jsxs)(J.a,{className:"e-add",width:32,height:32,children:[Object(b.jsx)("title",{children:"Add"}),Object(b.jsxs)("g",{fill:"#ffffff",stroke:"#ffffff",children:[Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"16",x2:"16",y1:"2",y2:"30"}),Object(b.jsx)("line",{fill:"none",stroke:"#ffffff",x1:"30",x2:"2",y1:"16",y2:"16"})]})]})},be=c(5),de=c.n(be),ue=c(13),he=(c(373),c(10)),Oe=(c(374),c(375),function(e){var t=e.className,c=e.icon,n=e.title,s=e.onClick;return Object(b.jsx)("div",{className:U()("ProviderButton",{large:void 0!==n}),children:Object(b.jsxs)("button",{className:t,onClick:s,children:[c,n&&Object(b.jsx)("h3",{children:n})]})})}),fe=function(e){var t=e.onChoose,c=Object(h.a)().t,n=Object(i.useCallback)((function(e){return function(){return t(e)}}),[t]);return Object(b.jsxs)("div",{className:"ChooseProvider",children:[Object(b.jsx)("h2",{children:c("Add a provider")}),Object(b.jsx)("p",{children:c("Select which service you want to use to stream your movies & shows.")}),Object(b.jsx)("div",{className:"ChooseProvider__providers",children:he.a.map((function(e,t){return Object(b.jsx)(Oe,{icon:Object(l.h)(e),title:Object(l.i)(c,e),onClick:n(e)},t)}))})]})},xe=(c(376),c(377),function(){return Object(b.jsxs)(J.a,{className:"c-check",width:24,height:24,children:[Object(b.jsx)("title",{children:"Check"}),Object(b.jsx)("g",{fill:"#ffffff",children:Object(b.jsx)("path",{d:"M12,0A12,12,0,1,0,24,12,12.035,12.035,0,0,0,12,0ZM10,17.414,4.586,12,6,10.586l4,4,8-8L19.414,8Z",fill:"#ffffff"})})]})}),me=function(e){var t=e.submitCaption,c=e.provider,n=e.onSubmit,r=Object(h.a)().t,a=Object(i.useMemo)((function(){return{name:null===c||void 0===c?void 0:c.name,host:null===c||void 0===c?void 0:c.host,port:(null===c||void 0===c?void 0:c.port)||21,username:null===c||void 0===c?void 0:c.username,password:null===c||void 0===c?void 0:c.password,secure:(null===c||void 0===c?void 0:c.secure)||!0}}),[c]),o=Object(i.useState)(a),j=Object(s.a)(o,2),l=j[0],d=j[1],u=Object(i.useCallback)((function(e){var t=e.currentTarget;d((function(e){return Object(oe.a)(Object(oe.a)({},e),{},Object(ae.a)({},t.name,"checkbox"===t.type?t.checked:""===t.value?void 0:t.value))}))}),[d]),O=Object(i.useCallback)((function(e){e.preventDefault(),n({kind:he.b.FTP,name:l.name,host:l.host,port:l.port,username:l.username,password:l.password,secure:l.secure})}),[n,l]),f=Object(i.useCallback)((function(e){return void 0!==e&&""!==e}),[]),x=Object(i.useMemo)((function(){return f(l.name)&&f(l.host)&&f(l.port)&&f(l.username)&&f(l.password)}),[f,l]);return Object(i.useEffect)((function(){d(a)}),[a,d]),Object(b.jsxs)("form",{className:"FTPProviderForm",onSubmit:O,children:[Object(b.jsxs)("label",{children:[r("Name"),Object(b.jsx)("p",{className:"small",children:r("Friendly name to identify server, not used for connecting.")}),Object(b.jsxs)("div",{className:U()("FTPProviderForm__input","warn",{valid:f(l.name)}),children:[Object(b.jsx)("input",{type:"text",name:"name",value:l.name||"",onChange:u}),Object(b.jsx)(xe,{})]})]}),Object(b.jsxs)("label",{children:[r("Host"),Object(b.jsxs)("div",{className:U()("FTPProviderForm__input","warn",{valid:f(l.host)}),children:[Object(b.jsx)("input",{type:"text",name:"host",value:l.host||"",placeholder:"example.com",onChange:u}),Object(b.jsx)(xe,{})]})]}),Object(b.jsxs)("label",{children:[r("Port"),Object(b.jsxs)("div",{className:U()("FTPProviderForm__input","warn",{valid:f(l.port)}),children:[Object(b.jsx)("input",{type:"number",min:0,step:1,name:"port",value:l.port||"",onChange:u}),Object(b.jsx)(xe,{})]})]}),Object(b.jsxs)("label",{children:[r("Username"),Object(b.jsxs)("div",{className:U()("FTPProviderForm__input","warn",{valid:f(l.username)}),children:[Object(b.jsx)("input",{type:"text",name:"username",value:l.username||"",onChange:u}),Object(b.jsx)(xe,{})]})]}),Object(b.jsxs)("label",{children:[r("Password"),Object(b.jsxs)("div",{className:U()("FTPProviderForm__input","warn",{valid:f(l.password)}),children:[Object(b.jsx)("input",{type:"password",name:"password",value:l.password||"",onChange:u}),Object(b.jsx)(xe,{})]})]}),Object(b.jsxs)("div",{className:"FTPProviderForm__checkbox",children:[Object(b.jsx)("input",{type:"checkbox",name:"secure",checked:l.secure,onChange:u}),Object(b.jsxs)("label",{children:[r("Secure"),Object(b.jsx)("p",{className:"small",children:r("Explicit FTPS over TLS.")})]})]}),Object(b.jsx)("div",{className:"FTPProviderForm__actions",children:Object(b.jsx)("button",{type:"submit",disabled:!x,children:t})})]})},ve=function(e){var t=e.kind,c=e.onEnteredDetails,n=Object(h.a)().t;return Object(b.jsxs)("div",{className:"EnterDetailsProvider",children:[Object(b.jsx)("h2",{children:n("Configure your provider")}),Object(b.jsx)("p",{children:n("Plaain needs some more details to connect to your provider.")}),t===he.b.FTP?Object(b.jsx)(me,{submitCaption:n("Continue"),onSubmit:c}):null]})},pe=c(332),ge=(c(379),c(380),function(e){var t=e.submitCaption,c=e.provider,n=e.onSubmit,r=Object(h.a)().t,a=Object(i.useMemo)((function(){return{moviesPath:null===c||void 0===c?void 0:c.moviesPath,showsPath:null===c||void 0===c?void 0:c.showsPath}}),[c]),o=Object(i.useState)(a),j=Object(s.a)(o,2),l=j[0],d=j[1],u=Object(i.useCallback)((function(e){var t=e.currentTarget;d((function(e){return Object(oe.a)(Object(oe.a)({},e),{},Object(ae.a)({},t.name,""===t.value?void 0:t.value))}))}),[d]),O=Object(i.useCallback)((function(e){e.preventDefault(),n(l.moviesPath,l.showsPath)}),[n,l]),f=Object(i.useCallback)((function(e){return void 0!==e&&""!==e}),[]),x=Object(i.useCallback)((function(e){return void 0!==e&&e.startsWith("/")}),[]),m=Object(i.useMemo)((function(){return(!f(l.moviesPath)||x(l.moviesPath))&&(!f(l.showsPath)||x(l.showsPath))}),[f,x,l]);return Object(i.useEffect)((function(){d(a)}),[a,d]),Object(b.jsxs)("form",{className:"ProviderForm",onSubmit:O,children:[Object(b.jsxs)("label",{children:[r("Movies path"),Object(b.jsx)("p",{className:"small",children:r("The path from your home directory to where you keep your movies.")}),Object(b.jsxs)("div",{className:U()("ProviderForm__input",{warn:f(l.moviesPath),valid:x(l.moviesPath)}),children:[Object(b.jsx)("input",{type:"text",name:"moviesPath",value:l.moviesPath||"",placeholder:"/Plaain/movies",onChange:u}),Object(b.jsx)(xe,{})]})]}),Object(b.jsxs)("label",{children:[r("Shows path"),Object(b.jsx)("p",{className:"small",children:r("The path from your home directory to where you keep your shows.")}),Object(b.jsxs)("div",{className:U()("ProviderForm__input",{warn:f(l.showsPath),valid:x(l.showsPath)}),children:[Object(b.jsx)("input",{type:"text",name:"showsPath",value:l.showsPath||"",placeholder:"/Plaain/shows",onChange:u}),Object(b.jsx)(xe,{})]})]}),Object(b.jsx)("div",{className:"ProviderForm__actions",children:Object(b.jsx)("button",{type:"submit",disabled:!m,children:t})})]})}),ye=function(e){var t=e.onSetup,c=Object(h.a)().t;return Object(b.jsxs)("div",{className:"SetupProvider",children:[Object(b.jsx)("h2",{children:c("Setup your provider")}),Object(b.jsx)("p",{children:c("All that's left is to tell Plaain where to look for your movies and shows. You can always skip this step and come back later.")}),Object(b.jsx)(ge,{submitCaption:c("Complete"),onSubmit:t})]})},we=c(333),_e=c(113);!function(e){e[e.Choose=0]="Choose",e[e.EnterDetails=1]="EnterDetails",e[e.Setup=2]="Setup"}(z||(z={}));var Ne,ke=function(e){var t=e.isActive,c=e.onClose,n=e.onSetupAuth,r=e.onAddProvider,a=Object(we.a)(),o=Object(s.a)(a,2),j=o[0],l=o[1],d=Object(i.useMemo)((function(){return z.Choose}),[]),u=Object(i.useState)(d),h=Object(s.a)(u,2),O=h[0],f=h[1],x=Object(i.useState)(),m=Object(s.a)(x,2),v=m[0],p=m[1],g=Object(i.useState)(),y=Object(s.a)(g,2),w=y[0],_=y[1];Object(_e.b)((function(e){_(e),f(z.Setup),l()}));var N=Object(i.useCallback)((function(){c(),setTimeout((function(){f(d),p(void 0),_(void 0)}),500)}),[d,c,_,p,f]),k=Object(i.useCallback)(function(){var e=Object(ue.a)(de.a.mark((function e(t){var c;return de.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p(t),e.t0=t,e.next=e.t0===he.b.FTP?4:e.t0===he.b.OneDrive?6:12;break;case 4:return f(z.EnterDetails),e.abrupt("return");case 6:return e.next=8,n({kind:t});case 8:return c=e.sent,_(c),f(z.Setup),e.abrupt("return");case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[_,p,n,f]),P=Object(i.useCallback)(function(){var e=Object(ue.a)(de.a.mark((function e(t){var c;return de.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(t);case 2:c=e.sent,_(c),f(z.Setup);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[_,n]),C=Object(i.useCallback)((function(e,t){if(void 0!==w){var c=Object(oe.a)(Object(oe.a)({},w),{},{moviesPath:e,showsPath:t});r(c),N()}}),[w,r,N]);return Object(b.jsx)("div",{className:"AddProviderModal",children:Object(b.jsx)(pe.a,{isActive:t||j,onClose:N,children:O===z.Choose?Object(b.jsx)(fe,{onChoose:k}):O===z.EnterDetails?Object(b.jsx)(ve,{kind:v,onEnteredDetails:P}):O===z.Setup?Object(b.jsx)(ye,{onSetup:C}):null})})},Pe=c(165),Ce=c(111),Se=function(e){var t=e.onChange,c=Object(h.a)().t,n=Object(i.useCallback)((function(e){Ce.a.changeLanguage(e.target.value),t&&t(e.target.value)}),[t]);return Object(b.jsx)("div",{className:"LanguageSelector",children:Object(b.jsx)("select",{defaultValue:Ce.a.language,onChange:n,children:Pe.a.map((function(e){return Object(b.jsx)("option",{value:e,children:c(e)},e)}))})})};c(381);!function(e){e[e.Specific=0]="Specific",e[e.General=1]="General"}(Ne||(Ne={}));var Fe=function(e){var t=e.isActive,c=e.provider,n=e.onClose,r=e.onSetupAuth,a=e.onUpdateProvider,o=e.onRemoveProvider,j=Object(h.a)().t,d=Object(i.useMemo)((function(){return c.kind===he.b.FTP?Ne.Specific:Ne.General}),[c]),u=Object(i.useState)(d),O=Object(s.a)(u,2),f=O[0],x=O[1],m=Object(i.useState)(),v=Object(s.a)(m,2),p=v[0],g=v[1],y=Object(i.useCallback)((function(){n(),setTimeout((function(){x(d),g(void 0)}),500)}),[d,n,g,x]),w=Object(i.useCallback)(function(){var e=Object(ue.a)(de.a.mark((function e(t){var c;return de.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(t);case 2:c=e.sent,g(c),x(Ne.General);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[g,x]),_=Object(i.useCallback)((function(e,t){var n=void 0!==p?Object(oe.a)(Object(oe.a)({},p),{},{moviesPath:e,showsPath:t}):Object(oe.a)(Object(oe.a)({},c),{},{moviesPath:e,showsPath:t});a(n),y()}),[p,y,a,c]),N=Object(i.useCallback)((function(){window.confirm(j("Are you sure?"))&&(o(),y())}),[y,o,j]);return Object(b.jsx)("div",{className:"UpdateProviderModal",children:Object(b.jsxs)(pe.a,{isActive:t,onClose:y,children:[Object(b.jsx)("h2",{children:Object(l.i)(j,c.kind)}),Object(b.jsx)("p",{children:c.name}),f===Ne.Specific?Object(b.jsx)(b.Fragment,{children:c.kind===he.b.FTP?Object(b.jsx)(me,{submitCaption:j("Continue"),provider:c,onSubmit:w}):null}):f===Ne.General?Object(b.jsx)(ge,{submitCaption:j("Update"),provider:c,onSubmit:_}):null,Object(b.jsx)("button",{className:"secondary",onClick:N,children:j("Remove")})]})})},Me=c(62),Ae=c(91),Te=function(){var e=Object(x.b)(),t=Object(h.a)().t,c=Object(x.c)((function(e){return Object(T.b)(e.auth)})),n=Object(i.useCallback)((function(t){return e(Object(A.a)(Object(Ae.c)(t)))}),[e]),r=Object(i.useCallback)((function(t){e(Object(je.e)(t)),e(Object(A.a)(Object(M.b)([t])))}),[e]),a=Object(i.useCallback)((function(){return e(Object(A.a)(Object(M.b)(c)))}),[e,c]),o=Object(i.useCallback)((function(){return e(Object(A.a)(Object(M.a)()))}),[e]),j=Object(i.useCallback)((function(t){return function(){return e(Object(je.d)(t))}}),[e]),d=Object(we.a)(),u=Object(s.a)(d,3),O=u[0],f=u[1],m=u[2],v=Object(i.useState)(c.reduce((function(e,t,c){return Object(oe.a)(Object(oe.a)({},e),{},Object(ae.a)({},c,!1))}),{})),p=Object(s.a)(v,2),g=p[0],y=p[1],w=Object(i.useCallback)((function(e){return function(){return y((function(t){return Object(oe.a)(Object(oe.a)({},t),{},Object(ae.a)({},e,!0))}))}}),[y]),_=Object(i.useCallback)((function(e){return function(){return y((function(t){return Object(oe.a)(Object(oe.a)({},t),{},Object(ae.a)({},e,!1))}))}}),[y]);return Object(b.jsxs)("div",{className:"Settings",children:[Object(b.jsxs)("section",{className:"Settings__auth",children:[Object(b.jsx)("h2",{children:t("Authentication")}),Object(b.jsx)("p",{children:t("Sign into your cloud to add your movies and TV shows to your library.")}),Object(b.jsx)("div",{className:"Settings__auth__scroll",children:Object(b.jsxs)("div",{className:"Settings__auth__providers",children:[c.map((function(e,t){return Object(b.jsxs)("div",{className:"Settings__auth__provider",children:[Object(b.jsx)(Oe,{className:U()("primary",{warn:void 0===e.moviesPath&&void 0===e.showsPath}),icon:Object(l.h)(e.kind),onClick:w(t)}),Object(b.jsx)(Fe,{isActive:g[t],provider:e,onClose:_(t),onSetupAuth:n,onUpdateProvider:r,onRemoveProvider:j(e.id)},7)]},t)})),Object(b.jsxs)("div",{className:"Settings__auth__provider",children:[Object(b.jsx)(Oe,{icon:Object(b.jsx)(le,{}),onClick:f},5),Object(b.jsx)(ke,{isActive:O,onClose:m,onSetupAuth:n,onAddProvider:r},7)]},c.length)]})})]}),Object(b.jsxs)("section",{className:"Settings__indexing",children:[Object(b.jsx)("h2",{children:t("Indexing")}),Object(b.jsx)("p",{children:t("Index to look for new media on your linked services or fetch the latest metadata.")}),Object(b.jsxs)("div",{className:"Settings__indexing__actions",children:[Object(b.jsx)("button",{disabled:0===c.length,onClick:a,children:t("Index")}),Object(b.jsx)("button",{disabled:0===c.length,onClick:o,children:t("Update metadata")})]})]}),Object(b.jsxs)("section",{className:"Settings__language",children:[Object(b.jsx)("h2",{children:t("Language")}),Object(b.jsx)("p",{children:t("Change the display language.")}),Object(b.jsx)(Se,{onChange:o})]}),Object(b.jsxs)("section",{className:"Settings__version",children:[Object(b.jsx)("h2",{children:t("Version")}),Object(b.jsx)("p",{children:t("Plaain {{version}}.",{version:Me.d})}),Object(b.jsx)("p",{className:"small",children:Object(b.jsxs)(S.a,{children:["Plaain is"," ",Object(b.jsx)("a",{href:"https://github.com/jonhue/plaain",target:"_blank",rel:"noopener noreferrer",children:"open-source"}),". See the"," ",Object(b.jsx)("a",{href:"https://github.com/jonhue/plaain/releases",target:"_blank",rel:"noopener noreferrer",children:"changelog"}),"."]})}),Object(b.jsx)("p",{className:"small",children:Object(b.jsxs)(S.a,{children:["You are running commit"," ",Object(b.jsx)("a",{href:"https://github.com/jonhue/plaain/commit/".concat("3986cd2373fb15d63c116354cf88b3a3f1f1158c"),target:"_blank",rel:"noopener noreferrer",children:Object(l.c)("3986cd2373fb15d63c116354cf88b3a3f1f1158c")}),"."]})}),Object(b.jsx)("p",{className:"small",children:Object(b.jsxs)(S.a,{children:["Note that Plaain may ",Object(b.jsx)("span",{className:"bold",children:"not"})," be used to stream pirated content or publicly share your private media library. You may only connect to your private cloud storage."]})})]})]})},De=(c(382),function(){var e=Object(h.a)().t,t=Object(n.i)().id,c=Object(x.c)((function(e){return Object(a.a)(t)(e.shows)})),s=Object(x.c)((function(e){return c&&Object(l.p)(Object(g.e)(c.id)(e.seasons),(function(e){return e.number}))}));return void 0!==c&&void 0!==s?Object(b.jsxs)("div",{className:"Show",children:[Object(b.jsx)(E.a,{url:Object(l.a)(c.backdropPath)}),Object(b.jsxs)("div",{className:"Show__details",children:[Object(b.jsx)(d,{url:Object(l.d)(c.posterPath),alt:"poster"}),Object(b.jsx)("h1",{children:c.title}),Object(b.jsx)("div",{className:"Show__information",children:Object(b.jsxs)("p",{className:"small",children:[new Date(c.firstAirDate).getFullYear()," -"," ",new Date(c.lastAirDate).getFullYear()]})}),Object(b.jsx)("p",{className:"Show__overview",children:c.summary})]}),s.length>0&&Object(b.jsxs)("div",{className:"Show__seasons",children:[Object(b.jsx)("h2",{children:e("Seasons")}),Object(b.jsx)(O,{items:s,id:"seasons"})]})]}):Object(b.jsx)(L.a,{})}),Ee=(c(383),function(){var e=Object(x.c)((function(e){return Object(l.n)(Object(a.b)(e.shows),(function(e){return e.title}))}));return e.length>0?Object(b.jsxs)("div",{className:"Shows",children:[Object(b.jsx)(q,{items:e,path:"shows",id:"shows"}),Object(b.jsx)(R,{items:e})]}):Object(b.jsx)(n.a,{to:"/app"})});t.default=function(){var e=Object(x.c)((function(e){return{moviesCount:Object.keys(e.movies).length,showsCount:Object.keys(e.shows).length}})),t=e.moviesCount,c=e.showsCount;return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsxs)(n.d,{children:[Object(b.jsx)(n.b,{path:"/",element:Object(b.jsx)(D,{})}),Object(b.jsx)(n.b,{path:"movies/:id",element:Object(b.jsx)(W,{})}),Object(b.jsx)(n.b,{path:"movies",element:Object(b.jsx)(Z,{})}),Object(b.jsx)(n.b,{path:"shows/:id",element:Object(b.jsx)(De,{})}),Object(b.jsx)(n.b,{path:"shows",element:Object(b.jsx)(Ee,{})}),Object(b.jsx)(n.b,{path:"seasons/:id",element:Object(b.jsx)(re,{})}),Object(b.jsx)(n.b,{path:"people/:id",element:Object(b.jsx)(ne,{})}),Object(b.jsx)(n.b,{path:"settings",element:Object(b.jsx)(Te,{})}),Object(b.jsx)(n.b,{path:"find",element:Object(b.jsx)(v,{})}),Object(b.jsx)(n.b,{path:"*",element:Object(b.jsx)(L.a,{})})]}),Object(b.jsx)(ce,{moviesDisabled:0===t,showsDisabled:0===c})]})}}}]);
//# sourceMappingURL=5.0d5c0bc0.chunk.js.map