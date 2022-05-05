! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).styleMe = e()
}(this, (function() {
    "use strict";

    function t(t, e, r) {
        return e in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = r, t
    }

    function e(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e && (n = n.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function r(r) {
        for (var n = 1; n < arguments.length; n++) {
            var o = null != arguments[n] ? arguments[n] : {};
            n % 2 ? e(Object(o), !0).forEach((function(e) {
                t(r, e, o[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : e(Object(o)).forEach((function(t) {
                Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(o, t))
            }))
        }
        return r
    }

    function n(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
            var r = [],
                n = !0,
                o = !1,
                a = void 0;
            try {
                for (var i, c = t[Symbol.iterator](); !(n = (i = c.next()).done) && (r.push(i.value), !e || r.length !== e); n = !0);
            } catch (t) {
                o = !0, a = t
            } finally {
                try {
                    n || null == c.return || c.return()
                } finally {
                    if (o) throw a
                }
            }
            return r
        }(t, e) || function(t, e) {
            if (!t) return;
            if ("string" == typeof t) return o(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === r && t.constructor && (r = t.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(t);
            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return o(t, e)
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function o(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
        return n
    }
    var a = "shopifyapp.style.me",
        i = "https://".concat(a, "/api/shopifys/config/"),
        c = "https://".concat(a, "/api/shopifys/mappingTable/"),
        s = "product_detail_page",
        u = "product_list_page",
        l = "shopping_cart_page",
        p = "checkout_page",
        f = "search_page",
        d = "home_page";
    var y = "%[a-f0-9]{2}",
        m = new RegExp(y, "gi"),
        g = new RegExp("(" + y + ")+", "gi");

    function h(t, e) {
        try {
            return decodeURIComponent(t.join(""))
        } catch (t) {}
        if (1 === t.length) return t;
        e = e || 1;
        var r = t.slice(0, e),
            n = t.slice(e);
        return Array.prototype.concat.call([], h(r), h(n))
    }

    function v(t) {
        try {
            return decodeURIComponent(t)
        } catch (n) {
            for (var e = t.match(m), r = 1; r < e.length; r++) e = (t = h(e, r).join("")).match(m);
            return t
        }
    }
    var b = function(t) {
            if ("string" != typeof t) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof t + "`");
            try {
                return t = t.replace(/\+/g, " "), decodeURIComponent(t)
            } catch (e) {
                return function(t) {
                    for (var e = {
                            "%FE%FF": "��",
                            "%FF%FE": "��"
                        }, r = g.exec(t); r;) {
                        try {
                            e[r[0]] = decodeURIComponent(r[0])
                        } catch (t) {
                            var n = v(r[0]);
                            n !== r[0] && (e[r[0]] = n)
                        }
                        r = g.exec(t)
                    }
                    e["%C2"] = "�";
                    for (var o = Object.keys(e), a = 0; a < o.length; a++) {
                        var i = o[a];
                        t = t.replace(new RegExp(i, "g"), e[i])
                    }
                    return t
                }(t)
            }
        },
        S = (t, e) => {
            if ("string" != typeof t || "string" != typeof e) throw new TypeError("Expected the arguments to be of type `string`");
            if ("" === e) return [t];
            const r = t.indexOf(e);
            return -1 === r ? [t] : [t.slice(0, r), t.slice(r + e.length)]
        },
        O = function(t, e) {
            for (var r = {}, n = Object.keys(t), o = Array.isArray(e), a = 0; a < n.length; a++) {
                var i = n[a],
                    c = t[i];
                (o ? -1 !== e.indexOf(i) : e(i, c, t)) && (r[i] = c)
            }
            return r
        };

    function j(t, e) {
        return fetch(t, e).then((function(t) {
            return t.json()
        })).catch((function(t) {
            console.error("[Style.me] API fetch error")
        }))
    }! function(t) {
        var e = {
            exports: {}
        };
        t(e, e.exports)
    }((function(t, e) {
        const r = Symbol("encodeFragmentIdentifier");

        function n(t) {
            if ("string" != typeof t || 1 !== t.length) throw new TypeError("arrayFormatSeparator must be single character string")
        }

        function o(t, e) {
            return e.encode ? e.strict ? encodeURIComponent(t).replace(/[!'()*]/g, (t => `%${t.charCodeAt(0).toString(16).toUpperCase()}`)) : encodeURIComponent(t) : t
        }

        function a(t, e) {
            return e.decode ? b(t) : t
        }

        function i(t) {
            return Array.isArray(t) ? t.sort() : "object" == typeof t ? i(Object.keys(t)).sort(((t, e) => Number(t) - Number(e))).map((e => t[e])) : t
        }

        function c(t) {
            const e = t.indexOf("#");
            return -1 !== e && (t = t.slice(0, e)), t
        }

        function s(t) {
            const e = (t = c(t)).indexOf("?");
            return -1 === e ? "" : t.slice(e + 1)
        }

        function u(t, e) {
            return e.parseNumbers && !Number.isNaN(Number(t)) && "string" == typeof t && "" !== t.trim() ? t = Number(t) : !e.parseBooleans || null === t || "true" !== t.toLowerCase() && "false" !== t.toLowerCase() || (t = "true" === t.toLowerCase()), t
        }

        function l(t, e) {
            n((e = Object.assign({
                decode: !0,
                sort: !0,
                arrayFormat: "none",
                arrayFormatSeparator: ",",
                parseNumbers: !1,
                parseBooleans: !1
            }, e)).arrayFormatSeparator);
            const r = function(t) {
                    let e;
                    switch (t.arrayFormat) {
                        case "index":
                            return (t, r, n) => {
                                e = /\[(\d*)\]$/.exec(t), t = t.replace(/\[\d*\]$/, ""), e ? (void 0 === n[t] && (n[t] = {}), n[t][e[1]] = r) : n[t] = r
                            };
                        case "bracket":
                            return (t, r, n) => {
                                e = /(\[\])$/.exec(t), t = t.replace(/\[\]$/, ""), e ? void 0 !== n[t] ? n[t] = [].concat(n[t], r) : n[t] = [r] : n[t] = r
                            };
                        case "colon-list-separator":
                            return (t, r, n) => {
                                e = /(:list)$/.exec(t), t = t.replace(/:list$/, ""), e ? void 0 !== n[t] ? n[t] = [].concat(n[t], r) : n[t] = [r] : n[t] = r
                            };
                        case "comma":
                        case "separator":
                            return (e, r, n) => {
                                const o = "string" == typeof r && r.includes(t.arrayFormatSeparator),
                                    i = "string" == typeof r && !o && a(r, t).includes(t.arrayFormatSeparator);
                                r = i ? a(r, t) : r;
                                const c = o || i ? r.split(t.arrayFormatSeparator).map((e => a(e, t))) : null === r ? r : a(r, t);
                                n[e] = c
                            };
                        case "bracket-separator":
                            return (e, r, n) => {
                                const o = /(\[\])$/.test(e);
                                if (e = e.replace(/\[\]$/, ""), !o) return void(n[e] = r ? a(r, t) : r);
                                const i = null === r ? [] : r.split(t.arrayFormatSeparator).map((e => a(e, t)));
                                void 0 !== n[e] ? n[e] = [].concat(n[e], i) : n[e] = i
                            };
                        default:
                            return (t, e, r) => {
                                void 0 !== r[t] ? r[t] = [].concat(r[t], e) : r[t] = e
                            }
                    }
                }(e),
                o = Object.create(null);
            if ("string" != typeof t) return o;
            if (!(t = t.trim().replace(/^[?#&]/, ""))) return o;
            for (const n of t.split("&")) {
                if ("" === n) continue;
                let [t, i] = S(e.decode ? n.replace(/\+/g, " ") : n, "=");
                i = void 0 === i ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? i : a(i, e), r(a(t, e), i, o)
            }
            for (const t of Object.keys(o)) {
                const r = o[t];
                if ("object" == typeof r && null !== r)
                    for (const t of Object.keys(r)) r[t] = u(r[t], e);
                else o[t] = u(r, e)
            }
            return !1 === e.sort ? o : (!0 === e.sort ? Object.keys(o).sort() : Object.keys(o).sort(e.sort)).reduce(((t, e) => {
                const r = o[e];
                return Boolean(r) && "object" == typeof r && !Array.isArray(r) ? t[e] = i(r) : t[e] = r, t
            }), Object.create(null))
        }
        e.extract = s, e.parse = l, e.stringify = (t, e) => {
            if (!t) return "";
            n((e = Object.assign({
                encode: !0,
                strict: !0,
                arrayFormat: "none",
                arrayFormatSeparator: ","
            }, e)).arrayFormatSeparator);
            const r = r => e.skipNull && null == t[r] || e.skipEmptyString && "" === t[r],
                a = function(t) {
                    switch (t.arrayFormat) {
                        case "index":
                            return e => (r, n) => {
                                const a = r.length;
                                return void 0 === n || t.skipNull && null === n || t.skipEmptyString && "" === n ? r : null === n ? [...r, [o(e, t), "[", a, "]"].join("")] : [...r, [o(e, t), "[", o(a, t), "]=", o(n, t)].join("")]
                            };
                        case "bracket":
                            return e => (r, n) => void 0 === n || t.skipNull && null === n || t.skipEmptyString && "" === n ? r : null === n ? [...r, [o(e, t), "[]"].join("")] : [...r, [o(e, t), "[]=", o(n, t)].join("")];
                        case "colon-list-separator":
                            return e => (r, n) => void 0 === n || t.skipNull && null === n || t.skipEmptyString && "" === n ? r : null === n ? [...r, [o(e, t), ":list="].join("")] : [...r, [o(e, t), ":list=", o(n, t)].join("")];
                        case "comma":
                        case "separator":
                        case "bracket-separator": {
                            const e = "bracket-separator" === t.arrayFormat ? "[]=" : "=";
                            return r => (n, a) => void 0 === a || t.skipNull && null === a || t.skipEmptyString && "" === a ? n : (a = null === a ? "" : a, 0 === n.length ? [
                                [o(r, t), e, o(a, t)].join("")
                            ] : [
                                [n, o(a, t)].join(t.arrayFormatSeparator)
                            ])
                        }
                        default:
                            return e => (r, n) => void 0 === n || t.skipNull && null === n || t.skipEmptyString && "" === n ? r : null === n ? [...r, o(e, t)] : [...r, [o(e, t), "=", o(n, t)].join("")]
                    }
                }(e),
                i = {};
            for (const e of Object.keys(t)) r(e) || (i[e] = t[e]);
            const c = Object.keys(i);
            return !1 !== e.sort && c.sort(e.sort), c.map((r => {
                const n = t[r];
                return void 0 === n ? "" : null === n ? o(r, e) : Array.isArray(n) ? 0 === n.length && "bracket-separator" === e.arrayFormat ? o(r, e) + "[]" : n.reduce(a(r), []).join("&") : o(r, e) + "=" + o(n, e)
            })).filter((t => t.length > 0)).join("&")
        }, e.parseUrl = (t, e) => {
            e = Object.assign({
                decode: !0
            }, e);
            const [r, n] = S(t, "#");
            return Object.assign({
                url: r.split("?")[0] || "",
                query: l(s(t), e)
            }, e && e.parseFragmentIdentifier && n ? {
                fragmentIdentifier: a(n, e)
            } : {})
        }, e.stringifyUrl = (t, n) => {
            n = Object.assign({
                encode: !0,
                strict: !0,
                [r]: !0
            }, n);
            const a = c(t.url).split("?")[0] || "",
                i = e.extract(t.url),
                s = e.parse(i, {
                    sort: !1
                }),
                u = Object.assign(s, t.query);
            let l = e.stringify(u, n);
            l && (l = `?${l}`);
            let p = function(t) {
                let e = "";
                const r = t.indexOf("#");
                return -1 !== r && (e = t.slice(r)), e
            }(t.url);
            return t.fragmentIdentifier && (p = `#${n[r]?o(t.fragmentIdentifier,n):t.fragmentIdentifier}`), `${a}${l}${p}`
        }, e.pick = (t, n, o) => {
            o = Object.assign({
                parseFragmentIdentifier: !0,
                [r]: !1
            }, o);
            const {
                url: a,
                query: i,
                fragmentIdentifier: c
            } = e.parseUrl(t, o);
            return e.stringifyUrl({
                url: a,
                query: O(i, n),
                fragmentIdentifier: c
            }, o)
        }, e.exclude = (t, r, n) => {
            const o = Array.isArray(r) ? t => !r.includes(t) : (t, e) => !r(t, e);
            return e.pick(t, o, n)
        }
    }));
    var k = {
        childList: !0,
        subtree: !0
    };

    function w() {
        document.querySelectorAll(".style-me-btn-wrap").forEach((function(t) {
            return t.remove()
        })), E()
    }

    function E() {
        document.querySelectorAll("[data-retailer-recommandsize]").forEach((function(t) {
            t.querySelectorAll("*").forEach((function(t) {
                return t.remove()
            }))
        })), document.querySelectorAll("[data-retailer-recommendsize]").forEach((function(t) {
            t.querySelectorAll("*").forEach((function(t) {
                return t.remove()
            }))
        }))
    }
    var I = {
            description: null,
            message: null,
            status: null,
            statusCode: null
        },
        A = [],
        C = null;

    function F(t) {
        t.forEach((function(t) {
            return function(t) {
                var e = t.dataset,
                    r = C["".concat(e.itemId, "_").concat(e.variantId)];
                r ? r.productId ? t.dataset.retailerFldproductid = r.productId : (t.dataset.retailerSku = r.sku, t.dataset.retailerColor = r.color) : (delete t.dataset.retailerFldproductid, delete t.dataset.retailerSku, delete t.dataset.retailerColor)
            }(t)
        }))
    }

    function x(t, e) {
        t.forEach((function(t) {
            return function(t, e) {
                var r = t.dataset,
                    n = e.find((function(t) {
                        if (String(t.itemId) !== r.itemId) return !1;
                        if (!t.optionName) return !0;
                        var e = r[t.optionName.toLowerCase()];
                        return !!e && e.split("|").includes(t.optionValue)
                    }));
                n && (t.dataset.retailerFldproductid = n.productId)
            }(t, e)
        }))
    }

    function _(t) {
        if (t.mappingData && 0 !== t.mappingData.length) {
            var e, r = document.querySelectorAll(t.selector);
            if (0 !== r.length) switch (C || (e = t.mappingData, C = e.reduce((function(t, e) {
                    return t["".concat(e.itemId, "_").concat(e.variantId)] = {
                        sku: e.sku,
                        color: e.color,
                        productId: e.productId
                    }, t
                }), {})), t.config.mappingType) {
                case 1:
                    F(r);
                    break;
                case 2:
                    x(r, t.mappingData)
            }
        }
    }
    var T = {};

    function D(t) {
        var e = t.config.sdk,
            n = function(t) {
                var e = t.config,
                    r = t.currentPage,
                    n = e.configuration.pages_overwrite;
                switch (r) {
                    case s:
                        return n.product_detail_page;
                    case u:
                        return n.product_list_page;
                    case l:
                        return n.shopping_cart_page;
                    case p:
                        return n.checkout_page;
                    case f:
                        return n.search_page;
                    case d:
                        return n.home_page;
                    default:
                        return null
                }
            }(t),
            o = r({
                onAddToCartCallback: function(e, n) {
                    ! function(t, e, n) {
                        e.forEach((function(e) {
                            var o = JSON.stringify({
                                id: e.params.variant_id,
                                quantity: 1
                            });
                            fetch("/cart/add.js", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: o
                            }).then((function(n) {
                                t.cartResponses.push(n), A.push(r(r({}, I), {
                                    logData: e.logData,
                                    description: n.statusText,
                                    status: "SUCCESS",
                                    statusCode: n.status
                                }))
                            })).catch((function(n) {
                                t.cartResponses.push(n);
                                var o = JSON.parse(n.responseText);
                                A.push(r(r(r({}, I), o), {
                                    logData: e.logData,
                                    status: "FAILED",
                                    statusCode: o.status
                                })), console.error("AddToCart Error:", n)
                            })).finally((function() {
                                return n(A)
                            }))
                        }))
                    }(t, e, n)
                },
                onCheckoutCallback: function() {
                    window.location = "/cart"
                },
                integrationInterface: "shopify"
            }, n && {
                tryOnButtonStyle: JSON.parse(n)
            });
        T = r(r({}, e), o)
    }

    function N(t) {
        t.sdk = new StyleMeSDK(T), t.sdk.createTryOnButtons()
    }
    var P = !1;

    function R() {
        if (!P) {
            var t = function(t) {
                var e = history[t];
                return function() {
                    var r = e.apply(this, arguments),
                        n = new Event(t);
                    return n.arguments = arguments, window.dispatchEvent(n), r
                }
            };
            history.pushState = t("pushState"), history.replaceState = t("replaceState"), P = !0
        }
    }
    var q = {
        event: "pushState",
        match: /[&?]variant=/
    };
    var U, $ = {
        selector: "[data-item-id]",
        sdk: void 0,
        cartResponses: [],
        config: void 0,
        mappingData: void 0,
        currentPage: (U = location.pathname.split("/"), U.includes("products") ? s : U.includes("collections") ? u : U.includes("cart") ? l : U.includes("checkouts") ? p : U.includes("search") ? f : "" === U[1] ? d : ""),
        beforeInit: function() {},
        onCompleted: function() {},
        isFittingRoomOpen: function() {
            return StyleMeSDK._fittingroom.apiOpenState
        },
        observe: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                e = arguments.length > 1 ? arguments[1] : void 0,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                a = document.querySelector(t);
            if (a) {
                var i = new MutationObserver((function(t) {
                    e && e(t), !o && i.disconnect()
                }));
                i.observe(a, r(r({}, k), n))
            }
        },
        removeTryOn: w,
        removeRecommendSize: E,
        initSDK: function() {
            _($), N($)
        },
        remakeTryOn: function() {
            w(), _($), N($)
        },
        watchState: function(t, e) {
            return function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
                    n = arguments.length > 2 ? arguments[2] : void 0;
                R();
                var o = r(r({}, q), n),
                    a = o.event,
                    i = o.match;
                window.addEventListener(a, (function(r) {
                    location.href.match(i) && 0 !== document.querySelectorAll(t).length && e()
                }))
            }($.selector, t, e)
        },
        stateEvent: {
            REPLACE_STATE: "replaceState",
            PUSH_STATE: "pushState"
        },
        find: function(t, e) {
            return t && e ? styleMe.mappingData.find((function(r) {
                return r.itemId == t && r.variantId == e
            })) : t ? styleMe.mappingData.find((function(e) {
                return e.itemId == t
            })) : null
        }
    };
    return document.addEventListener("DOMContentLoaded2", (function() {
        var t = document.querySelector("#styleme_config");
        if (t) {
            var e = t.dataset.domain;
            j("".concat(i).concat(e)).then((function(t) {
                var r = t.data;
                $.config = r;
                var n = r.configuration,
                    o = r.sdk,
                    a = r.mappingType,
                    i = j("".concat(c).concat(e, "?mappingType=").concat(a)),
                    s = function(t, e, r) {
                        return new Promise((function(n) {
                            var o = document.createElement("script");
                            o.type = "text/javascript", o.src = t.sdk_version, o.async = !0, o.onload = function() {
                                return n({
                                    sdk: e,
                                    mappingType: r
                                })
                            }, document.querySelector("body").append(o)
                        }))
                    }(n, o, a);
                return Promise.all([i, s])
            })).then((function(t) {
                var e = n(t, 1)[0].data;
                $.mappingData = e, D($),
                    function(t) {
                        var e = t.config.configuration;
                        return !!e.app_status && e.pages.includes(t.currentPage)
                    }($) && ($.beforeInit(), _($), N($), $.onCompleted())
            }))
        }
    })), $
}));