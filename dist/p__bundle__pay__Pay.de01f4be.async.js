(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"/96T":function(p,m,e){p.exports={title:"title___2GWIF",card:"card___3BSu-",qr:"qr___1mftE",info:"info___3nQ2-",price:"price___bRLMD"}},Ja8w:function(p,m,e){"use strict";e.r(m);var j=e("miYZ"),U=e("tsqr"),O=e("ODXe"),i=e("q1tI"),r=e.n(i),R=e("/96T"),c=e.n(R),T=e("95SA"),N=e("tMyG"),s=e("FfOG"),A=e("D1Df"),I=e.n(A),D=e("o0o1"),E=e.n(D),h=e("HaE+"),P=e("sy1d"),g=e("l+Xe"),M=function(){var o=Object(h.a)(E.a.mark(function n(t){return E.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,P.a.get(g.b.user_api.getPayInfo,{orderId:t});case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}},n)}));return function(t){return o.apply(this,arguments)}}(),b=function(){var o=Object(h.a)(E.a.mark(function n(t){return E.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.abrupt("return",P.a.get(g.b.user_api.checkIsPaid,{orderId:t}));case 1:case"end":return a.stop()}},n)}));return function(t){return o.apply(this,arguments)}}(),L={getPayInfo:M,checkIsPaid:b},X=m.default=function(){var o=Object(i.useState)(),n=Object(O.a)(o,2),t=n[0],y=n[1];return Object(i.useEffect)(function(){var a=s.b.location.pathname,l="/bundle/shop/pay/",u=a.substring(a.indexOf(l)+l.length);if(u===null||u===""){s.b.push("/order/my/list");return}L.getPayInfo(u).then(function(d){y(d)}).catch(function(d){s.b.push("/order/my/list");return})},[]),Object(i.useEffect)(function(){var a=s.b.location.pathname,l="/bundle/shop/pay/",u=a.substring(a.indexOf(l)+l.length),d=0,f=setInterval(function(){d++,d===20&&clearInterval(f),L.checkIsPaid(u).then(function(v){if(v){U.b.success("\u652F\u4ED8\u6210\u529F\uFF0C\u6B63\u5728\u8DF3\u8F6C\u5230\u6211\u7684\u8BA2\u5355"),clearInterval(f),s.b.push("/order/my/list");return}console.log(v)}).catch(function(v){clearInterval(f)})},5e3);return function(){clearInterval(f)}},[]),t==null?r.a.createElement(T.a,null):r.a.createElement(N.a,{title:"\u8BA2\u5355\u7ED3\u7B97"},r.a.createElement("div",{className:c.a.card},r.a.createElement("p",{className:c.a.price}," ","\u5E94\u4ED8\u91D1\u989D "+t.totalMoney*.01+"\u5143"),r.a.createElement(I.a,{value:t.payLink,size:300,fgColor:"#000000",className:c.a.qr}),r.a.createElement("p",{className:c.a.info}," ","\u6253\u5F00\u652F\u4ED8\u5B9D \u626B\u63CF\u4E8C\u7EF4\u7801\u8FDB\u884C\u652F\u4ED8")))}}}]);