(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){e.exports=a(33)},19:function(e,t,a){},21:function(e,t,a){},25:function(e,t,a){},27:function(e,t,a){},29:function(e,t,a){},31:function(e,t,a){},33:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(11),c=a.n(i),s=(a(19),a(1)),o=a(2),u=a(4),l=a(3),f=a(5),d=(a(21),a(6)),v=a.n(d),h=a(7),m=a(8),g=a(9),p=(a(25),a(12)),b=a(13),w=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={};e.onSave;var n=Object(b.a)(e,["onSave"]);return a.state=n,a}return Object(f.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,Object.entries(this.state).map(function(t){return r.a.createElement("div",{className:"cell-config-field",key:t[0]},r.a.createElement("input",{type:"text",placeholder:t[0],value:t[1],onChange:function(a){return e.setState(Object(m.a)({},t[0],a.target.value))}}))}),r.a.createElement("div",{className:"cell-config-field"},r.a.createElement("button",{onClick:function(){return e.props.onSave(Object(g.a)({},e.state))}},"Save")))}}]),t}(r.a.Component),O=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).config=[],a.widgetKey="-",a}return Object(f.a)(t,e),Object(o.a)(t,[{key:"initConfig",value:function(){var e=JSON.parse(localStorage.getItem(this.widgetKey));this.state={config:this.config.reduce(function(t,a){return Object(g.a)({},t,Object(m.a)({},a,e?e[a]:""))},{}),configMode:!1,data:{}}}},{key:"componentDidMount",value:function(){var e=this;this.getData(),setInterval(function(){return e.getData()},5e3)}},{key:"saveConfig",value:function(e){localStorage.setItem(this.widgetKey,JSON.stringify(e)),this.setState(Object(g.a)({configMode:!1},e)),this.getData()}},{key:"getData",value:function(){var e=Object(h.a)(v.a.mark(function e(){return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"renderVisual",value:function(){return r.a.createElement("div",{className:"row"},"Widget")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"wrapper"},r.a.createElement("h2",null,this.widgetKey," ",r.a.createElement("span",{onClick:function(){return e.setState({configMode:!e.state.configMode})}},r.a.createElement(p.a,null))),this.state.configMode?r.a.createElement(w,Object.assign({onSave:function(t){return e.saveConfig(Object(g.a)({},t))}},this.state.config)):this.renderWidget())}}]),t}(r.a.Component),j=(a(27),function(e){return r.a.createElement("div",{className:"cell"},r.a.createElement("div",{className:"cell-title"},e.title),r.a.createElement("div",{className:"cell-body"},r.a.createElement("div",{className:"cell-indicator"},e.value)))}),y=(a(29),function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).config=["username","token"],e.widgetKey="github",e.initConfig(),e}return Object(f.a)(t,e),Object(o.a)(t,[{key:"getData",value:function(){var e=Object(h.a)(v.a.mark(function e(){var t,a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/graphql",{headers:{Authorization:"bearer ".concat(this.state.config.token)},method:"POST",body:'{"query": "query {viewer { followers {totalCount}, repositories(isFork: false, first: 100) { totalCount, edges { node { stargazers {totalCount}, name}} }}}"}'});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,this.setState({data:{followers:a.data.viewer.followers.totalCount,repositories:a.data.viewer.repositories.totalCount,starredRepositories:a.data.viewer.repositories.edges.map(function(e){return e.node.stargazers.totalCount}).reduce(function(e,t){return e+t},0)}});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"renderWidget",value:function(){return r.a.createElement("div",{className:"row"},r.a.createElement(j,{title:"Repos",value:this.state.data.repositories||0}),r.a.createElement(j,{title:"Folowers",value:this.state.data.followers||0}),r.a.createElement(j,{title:"Stars",value:this.state.data.starredRepositories||0}))}}]),t}(O)),k=(a(31),function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).config=["channel","token"],e.widgetKey="youtube",e.initConfig(),e}return Object(f.a)(t,e),Object(o.a)(t,[{key:"getData",value:function(){var e=Object(h.a)(v.a.mark(function e(){var t,a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://www.googleapis.com/youtube/v3/channels?id=".concat(this.state.config.channel,"%20&part=statistics&key=").concat(this.state.config.token));case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,this.setState({data:{views:a.items[0].statistics.viewCount,subscribers:a.items[0].statistics.subscriberCount,videos:a.items[0].statistics.videoCount}});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"renderWidget",value:function(){return r.a.createElement("div",{className:"row"},r.a.createElement(j,{title:"Views",value:this.state.data.views||0}),r.a.createElement(j,{title:"Subscribers",value:this.state.data.subscribers||0}),r.a.createElement(j,{title:"Videos",value:this.state.data.videos||0}))}}]),t}(O)),E=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(y,null),r.a.createElement(k,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,2,1]]]);
//# sourceMappingURL=main.eb56c93b.chunk.js.map