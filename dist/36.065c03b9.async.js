(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{Zyfe:function(p,x,a){p.exports={chartCard:"chartCard___Kgmsr",chartTop:"chartTop___3MZam",chartTopMargin:"chartTopMargin___2Ofr5",chartTopHasMargin:"chartTopHasMargin___b4LlE",metaWrap:"metaWrap___3c21f",avatar:"avatar___1oAkI",meta:"meta___3OG6u",action:"action___2mvwC",total:"total___198OR",content:"content___b01fP",contentFixed:"contentFixed___28b-O",footer:"footer___1QKMU",footerMargin:"footerMargin___gdDfE"}},gOaX:function(p,x,a){p.exports={miniProgress:"miniProgress___2zRqy",progressWrap:"progressWrap___nOJre",progress:"progress___1FpG4",target:"target___376jY"}},lLnE:function(p,x,a){"use strict";a.r(x);for(var Ye=a("14J3"),ie=a("BMrR"),Ge=a("jCWc"),D=a("kPKH"),ze=a("5Dmo"),R=a("3S7+"),C=a("+YFz"),I=a("q1tI"),e=a.n(I),de=a("wd/R"),B=a.n(de),S=[],W=new Date().getTime(),$=[7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5],P=0;P<$.length;P+=1)S.push({x:B()(new Date(W+1e3*60*60*24*P)).format("YYYY-MM-DD"),y:$[P]});for(var Y=[],G=[1,6,4,8,3,7,2],M=0;M<G.length;M+=1)Y.push({x:B()(new Date(W+1e3*60*60*24*M)).format("YYYY-MM-DD"),y:G[M]});for(var z=[],b=0;b<12;b+=1)z.push({x:"".concat(b+1,"\u6708"),y:Math.floor(Math.random()*1e3)+200});for(var K=[],O=0;O<50;O+=1)K.push({index:O+1,keyword:"\u641C\u7D22\u5173\u952E\u8BCD-".concat(O),count:Math.floor(Math.random()*1e3),range:Math.floor(Math.random()*100),status:Math.floor(Math.random()*10%2)});for(var ce=[{x:"\u5BB6\u7528\u7535\u5668",y:4544},{x:"\u98DF\u7528\u9152\u6C34",y:3321},{x:"\u4E2A\u62A4\u5065\u5EB7",y:3113},{x:"\u670D\u9970\u7BB1\u5305",y:2341},{x:"\u6BCD\u5A74\u4EA7\u54C1",y:1231},{x:"\u5176\u4ED6",y:1231}],me=[{x:"\u5BB6\u7528\u7535\u5668",y:244},{x:"\u98DF\u7528\u9152\u6C34",y:321},{x:"\u4E2A\u62A4\u5065\u5EB7",y:311},{x:"\u670D\u9970\u7BB1\u5305",y:41},{x:"\u6BCD\u5A74\u4EA7\u54C1",y:121},{x:"\u5176\u4ED6",y:111}],ue=[{x:"\u5BB6\u7528\u7535\u5668",y:99},{x:"\u98DF\u7528\u9152\u6C34",y:188},{x:"\u4E2A\u62A4\u5065\u5EB7",y:344},{x:"\u670D\u9970\u7BB1\u5305",y:255},{x:"\u5176\u4ED6",y:65}],J=[],j=0;j<10;j+=1)J.push({name:"Stores ".concat(j),cvr:Math.ceil(Math.random()*9)/10});for(var Z=[],X=0;X<20;X+=1)Z.push({x:new Date().getTime()+1e3*60*30*X,y1:Math.floor(Math.random()*100)+10,y2:Math.floor(Math.random()*100)+10});var Ee=[{name:"\u4E2A\u4EBA",ref:10,koubei:8,output:4,contribute:5,hot:7},{name:"\u56E2\u961F",ref:3,koubei:9,output:6,contribute:3,hot:1},{name:"\u90E8\u95E8",ref:4,koubei:1,output:6,contribute:5,hot:7}],Q=[],he={ref:"\u5F15\u7528",koubei:"\u53E3\u7891",output:"\u4EA7\u91CF",contribute:"\u8D21\u732E",hot:"\u70ED\u5EA6"};Ee.forEach(function(d){Object.keys(d).forEach(function(t){t!=="name"&&Q.push({name:d.name,label:he[t],value:d[t]})})});var _e={visitData:S,visitData2:Y,salesData:z,searchData:K,offlineData:J,offlineChartData:Z,salesTypeData:ce,salesTypeDataOnline:me,salesTypeDataOffline:ue,radarData:Q},fe={"GET  /api/fake_chart_data":_e},ve=a("95SA"),U=a("c+yx"),Ke=a("IzEo"),pe=a("bx4M"),L=a("wx14"),ge=a("Ff2n"),V=a("rePB"),w=a("1OyB"),k=a("vuIU"),q=a("Ji7U"),ee=a("LK+K"),xe=a("TSYQ"),te=a.n(xe),Re=a("Zyfe"),m=a.n(Re),Ue=function(t){if(!t&&t!==0)return null;var o;switch(typeof t){case"undefined":o=null;break;case"function":o=e.a.createElement("div",{className:m.a.total},t());break;default:o=e.a.createElement("div",{className:m.a.total},t)}return o},ye=function(d){Object(q.a)(o,d);var t=Object(ee.a)(o);function o(){var r;Object(w.a)(this,o);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return r=t.call.apply(t,[this].concat(s)),r.renderContent=function(){var l=r.props,c=l.contentHeight,u=l.title,f=l.avatar,g=l.action,v=l.total,_=l.footer,E=l.children,y=l.loading;return y?!1:e.a.createElement("div",{className:m.a.chartCard},e.a.createElement("div",{className:te()(m.a.chartTop,Object(V.a)({},m.a.chartTopMargin,!E&&!_))},e.a.createElement("div",{className:m.a.avatar},f),e.a.createElement("div",{className:m.a.metaWrap},e.a.createElement("div",{className:m.a.meta},e.a.createElement("span",{className:m.a.title},u),e.a.createElement("span",{className:m.a.action},g)),Ue(v))),E&&e.a.createElement("div",{className:m.a.content,style:{height:c||"auto"}},e.a.createElement("div",{className:c&&m.a.contentFixed},E)),_&&e.a.createElement("div",{className:te()(m.a.footer,Object(V.a)({},m.a.footerMargin,!E))},_))},r}return Object(k.a)(o,[{key:"render",value:function(){var n=this.props,s=n.loading,i=s===void 0?!1:s,l=n.contentHeight,c=n.title,u=n.avatar,f=n.action,g=n.total,v=n.footer,_=n.children,E=Object(ge.a)(n,["loading","contentHeight","title","avatar","action","total","footer","children"]);return e.a.createElement(pe.a,Object(L.a)({loading:i,bodyStyle:{padding:"20px 24px 8px 24px"}},E),this.renderContent())}}]),o}(e.a.Component),T=ye,H=a("WWBY"),De=a("gOaX"),F=a.n(De),Ce=function(t){var o=t.targetLabel,r=t.target,n=t.color,s=n===void 0?"rgb(19, 194, 194)":n,i=t.strokeWidth,l=t.percent;return e.a.createElement("div",{className:F.a.miniProgress},e.a.createElement(R.a,{title:o}),e.a.createElement("div",{className:F.a.progressWrap},e.a.createElement("div",{className:F.a.progress,style:{backgroundColor:s||void 0,width:l?"".concat(l,"%"):void 0,height:i||void 0}})))},ae=Ce,h=a("yP6+"),Pe=a("ziKo"),N=a.n(Pe);function re(d){var t=d.style;t.height="100%";var o=parseInt("".concat(getComputedStyle(d).height),10),r=parseInt("".concat(getComputedStyle(d).paddingTop),10)+parseInt("".concat(getComputedStyle(d).paddingBottom),10);return o-r}function oe(d){if(!d)return 0;var t=d,o=re(t),r=t.parentNode;return r&&(o=re(r)),o}function Me(){return function(d){var t=function(o){Object(q.a)(n,o);var r=Object(ee.a)(n);function n(){var s;Object(w.a)(this,n);for(var i=arguments.length,l=new Array(i),c=0;c<i;c++)l[c]=arguments[c];return s=r.call.apply(r,[this].concat(l)),s.state={computedHeight:0},s.root=void 0,s.handleRoot=function(u){s.root=u},s}return Object(k.a)(n,[{key:"componentDidMount",value:function(){var i=this.props.height;if(!i){var l=oe(this.root);this.setState({computedHeight:l}),l<1&&(l=oe(this.root),this.setState({computedHeight:l}))}}},{key:"render",value:function(){var i=this.props.height,l=this.state.computedHeight,c=i||l;return e.a.createElement("div",{ref:this.handleRoot},c>0&&e.a.createElement(d,Object(L.a)({},this.props,{height:c})))}}]),n}(e.a.Component);return t}}var ne=Me,Oe=function(t){var o=t.height,r=o===void 0?0:o,n=t.forceFit,s=n===void 0?!0:n,i=t.color,l=i===void 0?"#1890FF":i,c=t.data,u=c===void 0?[]:c,f={x:{type:"cat"},y:{min:0}},g=[36,5,30,5],v=["x*y",function(E,y){return{name:E,value:y}}],_=r+54;return e.a.createElement("div",{className:N.a.miniChart,style:{height:r}},e.a.createElement("div",{className:N.a.chartContent},e.a.createElement(h.Chart,{scale:f,height:_,forceFit:s,data:u,padding:g},e.a.createElement(h.Tooltip,{showTitle:!1,crosshairs:!1}),e.a.createElement(h.Geom,{type:"interval",position:"x*y",color:l,tooltip:v}))))},Le=ne()(Oe),le=a("VTBJ"),Te=function(t){var o=t.height,r=o===void 0?1:o,n=t.data,s=n===void 0?[]:n,i=t.forceFit,l=i===void 0?!0:i,c=t.color,u=c===void 0?"rgba(24, 144, 255, 0.2)":c,f=t.borderColor,g=f===void 0?"#1089ff":f,v=t.scale,_=v===void 0?{x:{},y:{}}:v,E=t.borderWidth,y=E===void 0?2:E,be=t.line,je=t.xAxis,Xe=t.yAxis,se=t.animate,He=se===void 0?!0:se,Fe=[36,5,30,5],Ie={x:Object(le.a)({type:"cat",range:[0,1]},_.x),y:Object(le.a)({min:0},_.y)},Be=["x*y",function(We,$e){return{name:We,value:$e}}],Se=r+54;return e.a.createElement("div",{className:N.a.miniChart,style:{height:r}},e.a.createElement("div",{className:N.a.chartContent},r>0&&e.a.createElement(h.Chart,{animate:He,scale:Ie,height:Se,forceFit:l,data:s,padding:Fe},e.a.createElement(h.Axis,Object(L.a)({key:"axis-x",name:"x",label:null,line:null,tickLine:null,grid:null},je)),e.a.createElement(h.Axis,Object(L.a)({key:"axis-y",name:"y",label:null,line:null,tickLine:null,grid:null},Xe)),e.a.createElement(h.Tooltip,{showTitle:!1,crosshairs:!1}),e.a.createElement(h.Geom,{type:"area",position:"x*y",color:u,tooltip:Be,shape:"smooth",style:{fillOpacity:1}}),be?e.a.createElement(h.Geom,{type:"line",position:"x*y",shape:"smooth",color:g,size:y,tooltip:!1}):e.a.createElement("span",{style:{display:"none"}}))))},Ne=ne()(Te),A={xs:24,sm:12,md:12,lg:12,xl:6,style:{marginBottom:24}},Ae=function(t){var o=t.loading,r=t.proxyInfo;if(r===void 0)return e.a.createElement(ve.a,null);var n=fe["GET  /api/fake_chart_data"].visitData,s=function(l){var c=new Date,u=(l-c.getTime())/(1e3*60*60*24);return u>=0?u:0};return e.a.createElement(ie.a,{gutter:24},e.a.createElement(D.a,A,e.a.createElement(T,{bordered:!1,loading:o,title:"\u4F1A\u5458\u5269\u4F59\u65F6\u957F",action:e.a.createElement(R.a,{title:"Introduce"},e.a.createElement(C.a,null)),total:s(r.expireDate).toFixed(0)+" \u5929",footer:e.a.createElement(H.Field,{label:"\u5230\u671F\u65F6\u95F4",value:U.a.timestampToDateStr(r.expireDate)}),contentHeight:46},e.a.createElement(Ne,{color:"#975FE4",data:n}))),e.a.createElement(D.a,A,e.a.createElement(T,{bordered:!1,loading:o,title:"\u6D41\u91CF\u5269\u4F59",action:e.a.createElement(R.a,{title:"\u603B\u6D41\u91CF"+U.a.toDecimal2NoZero(r.totalData/(1024*1024)>0)+"GB"},e.a.createElement(C.a,null)),total:U.a.toDecimal2NoZero((r.totalData-r.usedData)/(1024*1024)>0?(r.totalData-r.usedData)/(1024*1024):0)+" GB",footer:e.a.createElement(I.Fragment,null,e.a.createElement(H.Field,{label:"\u603B\u6D41\u91CF",value:U.a.toDecimal2NoZero(r.totalData/(1024*1024))+"GB",style:{display:"inline"}})," ","\xA0\xA0",e.a.createElement(H.Field,{label:"\u91CD\u7F6E\u65E5\u671F",value:U.a.timestampToDateStr(r.nextSettleDate),style:{display:"inline"}})),contentHeight:46},e.a.createElement(ae,{percent:100-r.usedData/r.totalData*100,strokeWidth:8,target:80,color:"#13C2C2"}))),e.a.createElement(D.a,A,e.a.createElement(T,{bordered:!1,title:"\u670D\u52A1\u5668\u7B49\u7EA7",action:e.a.createElement(R.a,{title:"Introduce"},e.a.createElement(C.a,null)),loading:o,total:"VIP"+r.level,footer:"\u4E0D\u9650\u4E2A\u4EBA\u8BBE\u5907 \u4E0D\u9650\u901F",contentHeight:46},e.a.createElement(ae,{percent:78,strokeWidth:8,target:80,color:"#ffc473"}))),e.a.createElement(D.a,A,e.a.createElement(T,{loading:o,bordered:!1,title:"\u9080\u8BF7\u7528\u6237\u6570",action:e.a.createElement(R.a,{title:"Introduce"},e.a.createElement(C.a,null)),total:"0 \u4E2A",footer:e.a.createElement("div",{style:{whiteSpace:"nowrap",overflow:"hidden"}},"\u5DF2\u83B7\u5F970\u5929\u4F1A\u5458\u5956\u52B1"),contentHeight:46},e.a.createElement(Le,{color:"#1890ff",data:n}))))},Je=x.default=Ae},ziKo:function(p,x,a){p.exports={miniChart:"miniChart___WNQzH",chartContent:"chartContent___2LIig",chartLoading:"chartLoading___30IQ2"}}}]);