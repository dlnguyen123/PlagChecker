//v133 Copyright (c) 2008-2017 33Across Inc. All Rights Reserved

Tynt = window.Tynt || [];
(function() {
    var d = window,
        h = document,
        f = {
            distro: "IDS",
            id: "IDS-" + (new Date).getTime()
        };
    Tynt.IDSL = !0;
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    });
    var e = {
            _maxRef: 600,
            _idMacro: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            init: function() {
                this._icUrl = f.protocol + (Tynt.e || "") + "ic.tynt.com";
                this._debUrl = f.protocol + (Tynt.e || "") + "de.tynt.com/deb/v2";
                this._sicUrl = f.protocol + (Tynt.e || "") + "cdn-sic.33across.com/1/javascripts/sic.js";
                this._apUrl = f.protocol + (Tynt.e || "") + "cdn-ap.33across.com/javascripts/ap.js"
            },
            newEle: function(a,
            b, c, g) {
                g = g || window;
                a = g.document.createElement(a);
                b && this.extend(a, b);
                c && this.extend(a.style, c);
                return a
            },
            injectScript: function(a, b, c) {
                b = b || window;
                a = this.newEle("script", {
                    async: "async",
                    type: "text/javascript",
                    src: a
                }, null, b);
                this.insertEle(a, c || b.document.getElementsByTagName("script")[0])
            },
            injectSicScript: function(a) {
                this.injectScript(this._sicUrl, window, a)
            },
            injectApolloScript: function() {
                this.injectScript(this._apUrl)
            },
            injectSicIframe: function(a, b, c) {
                var g = {
                    width: a.width + "px",
                    height: a.height + "px",
                    border: "0 none",
                    margin: "0"
                };
                c && this.extend(g, c);
                c = this.newEle("iframe", {
                    src: "about:blank",
                    frameBorder: "0",
                    frameSpacing: "0",
                    scrolling: "no"
                }, g);
                this.insertEle(c, b);
                a.iframeId = this.eleId(c);
                a.sicWindow = c.contentWindow;
                a = c.contentWindow.document;
                a.open();
                a.write('<!DOCTYPE html><html><head><style type="text/css">*{margin:0;padding:0;}</style></head><body><script type="text/javascript">window.Tynt = window.parent.Tynt;\x3c/script><script type="text/javascript" src="' + this._sicUrl + '">\x3c/script></body></html>');
                a.close()
            },
            insertEle: function(a, b) {
                b ? "script" == b.tagName.toLowerCase() ? b.parentNode.insertBefore(a, b) : b.appendChild(a) : document.body.appendChild(a)
            },
            eleId: function(a) {
                var b = a.id;
                b || (b = "x33x" + Date.now(), a.id = b);
                return b
            },
            _imgs: [],
            injectPixel: function(a, b, c) {
                var g;
                try {
                    g = h.createElement("img")
                } catch (d) {
                    g = document.createElement("img")
                }
                g && (this._imgs.push(g), b && (g.onload = b), c && (g.onerror = c), g.src = a)
            },
            newImage: function(a) {
                var b = new Image(1, 1);
                b ? (this._imgs.push(b), b.onload = function() {
                    e.log("Image onload for " + this.src)
                },
                b.onerror = function() {
                    e.log("ERROR: Image onerror for " + this.src)
                }, b.src = a) : this.log("ERROR: new Image failed for " + a)
            },
            sovrnReport: function() {
                var a = "&tc=" + this.countIds("s!sovrn") + "&ts=" + Date.now();
                this.log("s! report");
                this.newImage(this._icUrl + "/b/s?id=" + this.tyntIds() + "&sovrn=5121t1&lm=" + f.type + "&dc=" + d._33Across.state.deDone + a + "&pvts=" + d._33Across.pvTs);
                this.newImage(f.protocol + "ce.lijit.com/merge?pid=5121&3pid=1" + a)
            },
            docUrl: function() {
                var a = this.getLink("canonical");
                a || (a = this.getMeta("property",
                "og:url", "name", "original-source"));
                if (a) {
                    if (0 != a.indexOf("http")) {
                        var b = f.protocol + d.location.host + d.location.pathname,
                            c = h.getElementsByTagName("base")[0];
                        c && (c = c.getAttribute("href")) && (b = c);
                        "/" == a.charAt(0) ? (c = b.indexOf("/", 9), -1 < c && (b = b.slice(0, c))) : (c = b.lastIndexOf("/"), b = 9 < c ? b.slice(0, c + 1) : b + "/");
                        a = b + a
                    }
                    return a
                }
                return ""
            },
            getMeta: function(a, b, c, g) {
                var d,
                    e = null,
                    f = null,
                    k = h.getElementsByTagName("meta");
                for (d = 0; d < k.length; ++d)
                    e || k[d].getAttribute(a) !== b ? c && !f && k[d].getAttribute(c) === g && (f = k[d].getAttribute("content") ||
                    null) : e = k[d].getAttribute("content") || null;
                return e || f
            },
            getLink: function(a, b) {
                var c,
                    g,
                    d = h.getElementsByTagName("link");
                for (c = 0; c < d.length; ++c)
                    if (g = d[c].getAttribute("rel"), d[c].getAttribute("href") && g && (!b && 0 <= g.indexOf(a) || b && g == a))
                        return d[c].href;
                return null
            },
            extend: function(a, b) {
                var c,
                    d;
                for (c = 1; c < arguments.length; ++c)
                    for (d in arguments[c])
                        arguments[c].hasOwnProperty(d) && (a[d] = arguments[c][d]);
                return a
            },
            isArray: function(a) {
                return "undefined" != typeof a && "[object Array]" === Object.prototype.toString.call(a)
            },
            inArray: function(a, b) {
                return 0 <= this.indexOf(a, b)
            },
            toArray: function(a, b) {
                return Array.prototype.slice.call(a, b || 0)
            },
            indexOf: function(a, b) {
                if (a.indexOf)
                    return a.indexOf(b);
                for (var c = 0; c < a.length; ++c)
                    if (a[c] === b)
                        return c;
                return -1
            },
            unique: function(a) {
                var b,
                    c = {},
                    d = [];
                for (b = 0; b < a.length; ++b)
                    c[a[b]] || (c[a[b]] = !0, d.push(a[b]));
                return d
            },
            iframeType: function() {
                var a = this.iframeEle(),
                    b = u;
                if (a)
                    a.id && 0 <= a.id.search(/google_ads?_i?frame/) ? (b = v, e.clog("In same-origin iframe from DFP")) : (b = q, e.clog("In same-origin iframe"));
                else
                    try {
                        window != window.top ? "undefined" != typeof window.$sf ? (b = r, e.clog("In SafeFrame")) : (b = p, e.clog("In cross-origin iframe")) : e.clog("In top window")
                    } catch (c) {
                        b = p, e.clog("iframeType: " + c.message)
                    }
                return b
            },
            iframeEle: function(a) {
                var b = null;
                a = a || window;
                try {
                    b = a.frameElement
                } catch (c) {}
                return b
            },
            iframeTop: function() {
                var a = window,
                    b = null;
                try {
                    for (; a != window.top;)
                        b = a, a = a.parent
                } catch (c) {
                    return null
                }
                return b ? this.iframeEle(b) : null
            },
            getTopWin: function() {
                var a = window;
                try {
                    for (; a.parent !== a && a.parent.document;)
                        a =
                        a.parent
                } catch (b) {}
                return a
            },
            jsonDecode: function(a) {
                if ("function" !== typeof Array.prototype.toJSON)
                    return JSON.stringify(a);
                var b = Array.prototype.toJSON;
                delete Array.prototype.toJSON;
                a = JSON.stringify(a);
                Array.prototype.toJSON = b;
                return a
            },
            getCookie: function(a, b) {
                for (var c = b + "=", d = a.split(";"), e = 0; e < d.length; e++) {
                    for (var f = d[e]; " " == f.charAt(0);)
                        f = f.substring(1, f.length);
                    if (0 === f.indexOf(c))
                        return f.substring(c.length, f.length)
                }
                return null
            },
            trim: function(a) {
                return a.replace(/^\s+|\s+$/g, "")
            },
            trunc: function(a,
            b) {
                var c,
                    d;
                if (!a || a.length <= b)
                    return a;
                c = a.substring(0, b);
                for (d = 1; 3 >= d; ++d)
                    if ("%" == c.charAt(c.length - d))
                        return c.substring(0, c.length - d);
                return c
            },
            tyntIds: function() {
                return this.unique(Tynt).join("~")
            },
            getPubId: function() {
                for (var a = null, b = 0; b < Tynt.length; ++b)
                    if ("string" === typeof Tynt[b] && 22 == Tynt[b].length && 0 > Tynt[b].indexOf("!")) {
                        a = Tynt[b];
                        break
                    }
                return a
            },
            countIds: function(a) {
                var b,
                    c = 0;
                for (b = 0; b < Tynt.length; ++b)
                    Tynt[b] === a && ++c;
                return c
            },
            _log: function(a) {
                "undefined" == typeof Tynt.debug && 0 < d.location.search.indexOf("__tcdebugmode=1") &&
                d.console && d.console.log && (Tynt.debug = 1);
                1 === Tynt.debug && (a.unshift("[TC]"), d.console.log.apply(d.console, a))
            },
            log: function() {
                f.type == p || f.type == r ? this.clog.apply(this, arguments) : this._log(this.toArray(arguments))
            },
            clog: function() {
                var a = this.toArray(arguments);
                a.unshift(f.id);
                this._log(a)
            },
            callIc: function() {
                var a,
                    b,
                    c,
                    g,
                    l,
                    m,
                    n,
                    k;
                if (!d._33Across.state.icDone) {
                    d._33Across.state.icDone = w;
                    b = this.getCookie(h.cookie, "tracertraffic");
                    a = d.location.hash;
                    a = /tynt=/.test(a) ? a.match(/tynt=?([^?&$#]*)/)[1] : !1;
                    g =
                    c = this._icUrl + "/b/p?id=" + this.tyntIds() + (b ? "&et=" + b : "") + (a ? "&a=" + a : "") + ("string" == typeof Tynt.b ? "&b=" + Tynt.b : "") + "&lm=" + f.type + "&ts=" + Date.now();
                    (a = this.getMeta("property", "og:image:url", "property", "og:image")) && (g += "&img=" + encodeURIComponent(this.trunc(a, 250)));
                    l = g;
                    (a = this.getMeta("property", "og:title")) && a != h.title && (l += "&ct=" + encodeURIComponent(this.trunc(a, 200)));
                    m = l;
                    h.referrer && (a = this.trunc(h.referrer, this._maxRef), m += "&r=" + encodeURIComponent(a));
                    n = m;
                    if (a = h.title || d.location.hostname)
                        a = this.trim(this.trunc(a,
                        200)), n += "&t=" + encodeURIComponent(a);
                    k = n;
                    if (a = this.docUrl())
                        a = this.trunc(a, 400), k += "&cu=" + encodeURIComponent(a);
                    b = k;
                    if (a = this.getLink("amphtml", !0))
                        a = this.trunc(a, 250), b += "&ah=" + encodeURIComponent(a);
                    e.callIc.rsp = function() {
                        d._33Across.state.icDone = t
                    };
                    e.clog("Calling IC");
                    this.injectPixel(b, e.callIc.rsp, function() {
                        e.injectPixel(k, e.callIc.rsp, function() {
                            e.injectPixel(n, e.callIc.rsp, function() {
                                e.injectPixel(m, e.callIc.rsp, function() {
                                    e.injectPixel(l, e.callIc.rsp, function() {
                                        e.injectPixel(g, e.callIc.rsp,
                                        function() {
                                            e.injectPixel(c, e.callIc.rsp)
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            },
            callDeb: function(a, b) {
                !1 === d._33Across.state.deDone ? d._33Across.state.deDone = 0 : !0 === d._33Across.state.deDone && (d._33Across.state.deDone = 1);
                if (!d._33Across.state.deDone || a)
                    "undefined" == typeof b && (b = 5), 0 == b || d._33Across.state.icDone == t ? (++d._33Across.state.deDone, e.clog("Calling DEB " + d._33Across.state.deDone + (0 == b ? " on IC timeout" : "")), this.injectScript(this._debUrl + "?id=" + this.tyntIds() + "&dn=" + f.distro + "&cc=" + d._33Across.state.deDone + "&r=" + encodeURIComponent(this.trunc(h.referrer,
                    this._maxRef)), d)) : setTimeout(function() {
                        e.callDeb(a, b - 1)
                    }, 50)
            }
        },
        w = 1,
        t = 2,
        u = 0,
        p = 3,
        r = 4,
        q = 5,
        v = 6;
    f.type = e.iframeType();
    f.type >= q && (d = e.getTopWin(), h = d.document);
    d._33Across || (d._33Across = {});
    d._33Across.state || (d._33Across.state = {
        icDone: 0,
        deDone: 0,
        ivDone: !1
    });
    "https:" === d.location.protocol ? (f.isSecure = !0, f.protocol = "https://") : (f.isSecure = !1, f.protocol = "http://");
    e.init();
    d._33Across.pvTs || (d._33Across.pvTs = Date.now());
    e.callIc();
    e.callDeb(null == e.getPubId());
    e.sovrnReport()
})();

