!(function (e) {
    var t,
        n,
        o,
        i,
        c,
        l,
        d =
            '<svg><symbol id="icon-weixinzhifu" viewBox="0 0 1024 1024"><path d="M395.846 603.585c-3.921 1.98-7.936 2.925-12.81 2.925-10.9 0-19.791-5.85-24.764-14.625l-2.006-3.864-78.106-167.913c-0.956-1.98-0.956-3.865-0.956-5.845 0-7.83 5.928-13.68 13.863-13.68 2.965 0 5.928 0.944 8.893 2.924l91.965 64.43c6.884 3.864 14.82 6.79 23.708 6.79 4.972 0 9.85-0.945 14.822-2.926L861.71 282.479c-77.149-89.804-204.684-148.384-349.135-148.384-235.371 0-427.242 157.158-427.242 351.294 0 105.368 57.361 201.017 147.323 265.447 6.88 4.905 11.852 13.68 11.852 22.45 0 2.925-0.957 5.85-2.006 8.775-6.881 26.318-18.831 69.334-18.831 71.223-0.958 2.92-2.013 6.79-2.013 10.75 0 7.83 5.929 13.68 13.865 13.68 2.963 0 5.928-0.944 7.935-2.925l92.922-53.674c6.885-3.87 14.82-6.794 22.756-6.794 3.916 0 8.889 0.944 12.81 1.98 43.496 12.644 91.012 19.53 139.48 19.53 235.372 0 427.24-157.158 427.24-351.294 0-58.58-17.78-114.143-48.467-163.003l-491.39 280.07-2.963 1.98z" fill="#09BB07" ></path></symbol><symbol id="icon-zhifubao" viewBox="0 0 1024 1024"><path d="M902.095 652.871l-250.96-84.392s19.287-28.87 39.874-85.472c20.59-56.606 23.539-87.689 23.539-87.689l-162.454-1.339v-55.487l196.739-1.387v-39.227H552.055v-89.29h-96.358v89.294H272.133v39.227l183.564-1.304v59.513h-147.24v31.079h303.064s-3.337 25.223-14.955 56.606c-11.615 31.38-23.58 58.862-23.58 58.862s-142.3-49.804-217.285-49.804c-74.985 0-166.182 30.123-175.024 117.55-8.8 87.383 42.481 134.716 114.728 152.139 72.256 17.513 138.962-0.173 197.04-28.607 58.087-28.391 115.081-92.933 115.081-92.933l292.486 142.041c-11.932 69.3-72.067 119.914-142.387 119.844H266.37c-79.714 0.078-144.392-64.483-144.466-144.194V266.374c-0.074-79.72 64.493-144.399 144.205-144.47h491.519c79.714-0.073 144.396 64.49 144.466 144.203v386.764z m-365.76-48.895s-91.302 115.262-198.879 115.262c-107.623 0-130.218-54.767-130.218-94.155 0-39.34 22.373-82.144 113.943-88.333 91.519-6.18 215.2 67.226 215.2 67.226h-0.047z" fill="#02A9F1" ></path></symbol></svg>',
        s = (s = document.getElementsByTagName('script'))[s.length - 1].getAttribute(
            'data-injectcss',
        );
    if (s && !e.__iconfont__svg__cssinject__) {
        e.__iconfont__svg__cssinject__ = !0;
        try {
            document.write(
                '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
            );
        } catch (e) {
            console && console.log(e);
        }
    }
    function a() {
        c || ((c = !0), o());
    }
    (t = function () {
        var e, t, n, o;
        ((o = document.createElement('div')).innerHTML = d),
            (d = null),
            (n = o.getElementsByTagName('svg')[0]) &&
                (n.setAttribute('aria-hidden', 'true'),
                (n.style.position = 'absolute'),
                (n.style.width = 0),
                (n.style.height = 0),
                (n.style.overflow = 'hidden'),
                (e = n),
                (t = document.body).firstChild
                    ? ((o = e), (n = t.firstChild).parentNode.insertBefore(o, n))
                    : t.appendChild(e));
    }),
        document.addEventListener
            ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
                ? setTimeout(t, 0)
                : ((n = function () {
                      document.removeEventListener('DOMContentLoaded', n, !1), t();
                  }),
                  document.addEventListener('DOMContentLoaded', n, !1))
            : document.attachEvent &&
              ((o = t),
              (i = e.document),
              (c = !1),
              (l = function () {
                  try {
                      i.documentElement.doScroll('left');
                  } catch (e) {
                      return void setTimeout(l, 50);
                  }
                  a();
              })(),
              (i.onreadystatechange = function () {
                  'complete' == i.readyState && ((i.onreadystatechange = null), a());
              }));
})(window);
