! function() {
    "use strict";

    function b(b) {
        var c = {
            rstr2binb: function(a) {
                var b = void 0,
                    c = Array(a.length >> 2);
                for (b = 0; b < c.length; b++) c[b] = 0;
                for (b = 0; b < 8 * a.length; b += 8) c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << 24 - b % 32;
                return c
            },
            binb2rstr: function(a) {
                var b = void 0,
                    c = "";
                for (b = 0; b < 32 * a.length; b += 8) c += String.fromCharCode(a[b >> 5] >>> 24 - b % 32 & 255);
                return c
            },
            safe_add: function(a, b) {
                var c = void 0,
                    d = void 0;
                return c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16), d << 16 | 65535 & c
            },
            bit_rol: function(a, b) {
                return a << b | a >>> 32 - b
            },
            binb_sha1: function(a, b) {
                var d = void 0,
                    e = void 0,
                    f = void 0,
                    g = void 0,
                    h = void 0,
                    i = void 0,
                    j = void 0,
                    k = void 0,
                    l = void 0,
                    m = void 0,
                    n = void 0,
                    o = void 0,
                    p = void 0,
                    q = void 0;
                for (a[b >> 5] |= 128 << 24 - b % 32, a[(b + 64 >> 9 << 4) + 15] = b, i = Array(80), d = 1732584193, e = -271733879, f = -1732584194, g = 271733878, h = -1009589776, j = 0; j < a.length; j += 16) {
                    for (m = d, n = e, o = f, p = g, q = h, k = 0; k < 80; k++) k < 16 ? i[k] = a[j + k] : i[k] = c.bit_rol(i[k - 3] ^ i[k - 8] ^ i[k - 14] ^ i[k - 16], 1), l = c.safe_add(c.safe_add(c.bit_rol(d, 5), c.sha1_ft(k, e, f, g)), c.safe_add(c.safe_add(h, i[k]), c.sha1_kt(k))), h = g, g = f, f = c.bit_rol(e, 30), e = d, d = l;
                    d = c.safe_add(d, m), e = c.safe_add(e, n), f = c.safe_add(f, o), g = c.safe_add(g, p), h = c.safe_add(h, q)
                }
                return Array(d, e, f, g, h)
            },
            sha1_ft: function(a, b, c, d) {
                return a < 20 ? b & c | ~b & d : a < 40 ? b ^ c ^ d : a < 60 ? b & c | b & d | c & d : b ^ c ^ d
            },
            sha1_kt: function(a) {
                return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514
            },
            rstr_sha1: function(a) {
                return c.binb2rstr(c.binb_sha1(c.rstr2binb(a), 8 * a.length))
            },
            rstr2hex: function(a) {
                var b = void 0,
                    c = void 0,
                    d = void 0,
                    e = void 0;
                for (b = "0123456789abcdef", c = "", e = 0; e < a.length; e++) d = a.charCodeAt(e), c = c + b.charAt(d >>> 4 & 15) + b.charAt(15 & d);
                return c
            }
        };
        return globalData.pinterestSettings.sha || (console.log("setting up hash repo"), globalData.pinterestSettings.sha = {}), globalData.pinterestSettings.sha[b.str] || (globalData.pinterestSettings.sha[b.str] = c.rstr2hex(c.rstr_sha1(b.str))), globalData.pinterestSettings.sha[b.str]
    }

    function c(b) {
        var c = void 0,
            d = void 0;
        b.url = b.url || globalData.pinterestSettings.here, d = "?type=" + globalData.otherSettings.logType + "&v=" + globalData.otherSettings.ver, "grid_rendered" === b.reason && (globalData.pinterestSettings.config.via && (b.via = globalData.pinterestSettings.config.via), globalData.pinterestSettings.config.guid && (b.guid = globalData.pinterestSettings.config.guid));
        for (c in b) "extras" !== c && (d = d + "&pm" + c.charAt(0).toUpperCase() + c.slice(1) + "=" + encodeURIComponent(b[c]));
        if (b.extras)
            for (c in b.extras) b.extras[c] && b.extras[c].hasOwnProperty && (d = d + "&" + c + "=" + b.extras[c]);
        (new Image).src = globalData.otherSettings.log + d, console.log("Logging: " + d)
    }

    function d(a) {
        var d = void 0,
            e = void 0,
            f = void 0,
            g = void 0,
            h = void 0,
            i = void 0;
        for (h = !1, e = 0; e < globalData.otherSettings.nopeList.length; e += 1)
            if (a.url.match(globalData.otherSettings.nopeList[e])) return c({
                reason: "nope_list"
            }), !0;
        if (g = a.url.split("/"), g[2] && (g = g[2].split("."), g.length > 1))
            for (i = g.pop(), e = g.length - 1; e > -1; e -= 1)
                for (i = g[e] + "." + i, d = b({
                        str: i
                    }), f = globalData.otherSettings.hashList.length - 1; f > -1; f -= 1)
                    if (d.match(globalData.otherSettings.hashList[f])) return i;
        return h
    }

    function e() {
        globalData.pinterestSettings.data.close && ("function" === typeof globalData.callbackArr.extendedClose ? globalData.callbackArr.extendedClose() : globalData.pinterestSettings.config.quiet || globalData.Window.setTimeout(function() {
            globalData.Window.alert(globalData.pinterestSettings.data.close)
        }, 10))
    }

    function getElementAttribute(a) {
        var b = null;
        return a.el && a.att && (b = "undefined" !== typeof a.el[a.att] ? a.el[a.att] : a.el.getAttribute(a.att)), b
    }

    function g(a) {
        var b = void 0,
            c = void 0;
        return a = a || {}, c = function(a) {
            return a ? ("object" === ("undefined" === typeof a ? "undefined" : checkTypes(a)) && a.length && (a = a[0]), a = a.trim(), a.match(/\s/) || (a = a.split("#")[0].split("?")[0], (a.match(/^http?s:\/\//) || a.match(/\.(gif|jpeg|jpeg|png|webp)/)) && (a = ""))) : a = "", a
        }, b = c("" + globalData.Window.getSelection()), b || (a.src ? (b = c(getElementAttribute({
            el: a,
            att: "data-pin-description"
        })), b || (b = c(a.title)), b || (b = c(globalData.document.title))) : (b || (b = c(globalData.pinterestSettings.data.meta.description || globalData.pinterestSettings.data.meta.title)), b || (b = c(globalData.pinterestSettings.ogDescription)), b || (b = c(globalData.document.title), !b && a.imageless && (b = globalData.pinterestSettings.here.split("/").pop().split("#")[0].split("?")[0].split(".")[0])))), b
    }

    function h(a) {
        return a.width < 90 || a.height < 90 ? "Image dimensions are both too small." : a.width < 120 && a.height < 120 ? "One image dimension is too small." : a.width > 3 * a.height ? "Image is too wide." : a.src.match(/^https?:\/\//) ? !1 : "Image source does not begin with http."
    }

    function i(a) {
        return {
            status: "loaded",
            height: a.naturalHeight || 0,
            width: a.naturalWidth || 0,
            src: a.src
        }
    }

    function getImage(c) {
        console.log('getting image')
        var e = void 0,
            f = void 0,
            g = void 0;
        if (c.src && !d({
                url: c.src
            }) && (g = b({
                str: c.src
            }), !globalData.pinterestSettings.data.img[g])) {
            if (f = c.src.split("#")[0].split("?")[0].split(".").pop(), "svg" === f) return void(globalData.pinterestSettings.data.img[g] = {
                src: c.src,
                status: "invalid",
                reason: "SVG images are not supported on Pinterest"
            });
            e = new Image, globalData.pinterestSettings.count.imgLoading = globalData.pinterestSettings.count.imgLoading + 1, globalData.pinterestSettings.data.img[g] = {
                mod: c.mod || {},
                status: "loading"
            }, e.onerror = function(a) {
                var b = void 0;
                globalData.pinterestSettings.count.imgLoading = globalData.pinterestSettings.count.imgLoading - 1;
                for (b in globalData.pinterestSettings.data.img) globalData.pinterestSettings.data.img[b].mod && globalData.pinterestSettings.data.img[b].mod.pinMedia === c.src && delete globalData.pinterestSettings.data.img[b].mod.pinMedia;
                globalData.pinterestSettings.data.img[g].status = "error"
            }, e.onload = function() {
                console.log('e.onload thing')
                var d = void 0,
                    f = void 0,
                    j = i(e),
                    k = h(j);
                if (c.override)
                    for (d = 0; d < c.override.length; d += 1) globalData.pinterestSettings.override[c.override[d]] = !0;
                if (k) globalData.pinterestSettings.data.img[g] = {
                    status: "filtered",
                    reason: k,
                    src: c.src.substr(0, 64)
                }, c.src.length > 64 && (globalData.pinterestSettings.data.img[g].src = globalData.pinterestSettings.data.img[g].src + "...");
                else {
                    j.height > globalData.otherSettings.thumbSize && j.width > globalData.otherSettings.thumbSize && (globalData.pinterestSettings.override.imageless = !0), c.mod && (globalData.pinterestSettings.data.img[g].mod = c.mod);
                    for (d in j) j[d] && (globalData.pinterestSettings.data.img[g][d] = j[d]);
                    c.src === globalData.pinterestSettings.here && (d.description = "", globalData.pinterestSettings.override.imageless = !0), c.update ? (console.log("Image source changed from " + c.update + " to " + c.src), f = b({
                        str: c.update
                    }), globalData.pinterestSettings.data.img[f] = globalData.pinterestSettings.data.img[g], c.mod && (globalData.pinterestSettings.data.img[f].mod = c.mod), globalData.pinterestSettings.data.img[f].src = c.src, globalData.pinterestSettings.data.img[f].height = j.height, globalData.pinterestSettings.data.img[f].width = j.width, globalData.pinterestSettings.data.img[g] = globalData.pinterestSettings.data.img[f], globalData.pinterestSettings.data.img[g].status = "ok", delete globalData.pinterestSettings.data.img[f]) : globalData.pinterestSettings.data.img[g].status = "ok"
                }
                globalData.pinterestSettings.count.imgLoading = globalData.pinterestSettings.count.imgLoading - 1
            }, e.src = c.src
        }
    }

    function k(b) {
        console.log('mtstuff', b);
        var c = void 0,
            d = void 0,
            e = void 0,
            f = "?";
        globalData.pinterestSettings.doNotCall || (globalData.pinterestSettings.count.apiCalls = globalData.pinterestSettings.count.apiCalls + 1, c = globalData.callbackArr.callback.length, e = globalData.otherSettings.k + ".f.callback[" + c + "]", globalData.callbackArr.callback[c] = function(a) {
            globalData.pinterestSettings.count.apiCalls = globalData.pinterestSettings.count.apiCalls - 1, b.func(a, c);
            var d = globalData.document.getElementById(e);
            d.parentNode.removeChild(d)
        }, b.url.match(/\?/) && (f = "&"), d = globalData.document.createElement("SCRIPT"), d.id = e, d.type = "text/javascript", d.charset = "utf-8", d.src = b.url + f + "callback=" + e, globalData.document.body.appendChild(d), console.log("Calling: " + d.src))
    }

    function l() {
        var b = void 0,
            c = void 0,
            d = void 0,
            e = void 0,
            f = void 0;
        for (b = globalData.document.getElementsByTagName("IFRAME"), c = 0; c < b.length; c += 1)
            if (!b[c].getAttribute("nopin") && !b[c].getAttribute("data-pin-nopin") && (d = b[c].getAttribute("src"), d && d.match(/^(https?:|)\/\//))) {
                if (d = d.split("#")[0].split("?")[0], d.match(globalData.otherSettings.pattern.iframe.youtube)) {
                    e = d.split("/"), e[4] && (console.log("found a YouTube player: " + b[c].src), getImage({
                        src: "https://img.youtube.com/vi/" + e[4] + "/hqdefault.jpg",
                        mod: {
                            multimedia: !0,
                            url: "https://www.youtube.com/watch?v=" + e[4],
                            description: g()
                        }
                    }));
                    continue
                }
                if (d.match(globalData.otherSettings.pattern.iframe.instagram)) {
                    e = d.split("/"), e[4] && (console.log("found an Instagram embed: " + b[c].src), getImage({
                        src: "https://instagram.com/p/" + e[4] + "/media/?size=l",
                        mod: {
                            url: "https://www.instagram.com/p/" + e[4] + "/",
                            description: g()
                        }
                    }));
                    continue
                }
                if (d.match(globalData.otherSettings.pattern.iframe.vimeo)) {
                    e = "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent(b[c].src), f = function(a) {
                        a.thumbnail_url && getImage({
                            src: a.thumbnail_url.split("_")[0] + ".jpg",
                            mod: {
                                multimedia: !0,
                                url: "https://vimeo.com/" + a.video_id,
                                description: a.title
                            }
                        })
                    }, k({
                        url: e,
                        func: f
                    });
                    continue
                }
            }
        console.log(globalData.pinterestSettings.data.iframe)
    }

    function m() {
        var b = void 0,
            c = void 0,
            d = void 0,
            e = 0,
            f = void 0,
            h = function(a) {
                var b = void 0,
                    c = void 0,
                    f = void 0;
                if (a.currentSrc) {
                    if (d = {
                            description: g(a),
                            sourceOrder: e
                        }, e += 1, b = a.getAttribute("nopin") || a.getAttribute("data-pin-nopin")) return;
                    if (c = a.parentNode, "A" === c.tagName && c.href && globalData.pinterestSettings.here.split("/")[2] === c.href.split("/")[2] && (c.href.match(/(^javascript|\.gif|\.jpg|\.jpeg|\.png|\.webp)/) || (d.url = c.href)), b = a.getAttribute("data-pin-me-only"), b && (d.pinMeOnly = !0), b = a.getAttribute("data-pin-id"), b && (d.pinId = b), b = a.getAttribute("data-pin-description"), b && (d.pinDescription = b), b = a.getAttribute("data-pin-url"), b && (d.pinUrl = b), b = a.getAttribute("data-pin-media"), b ? (d.pinMedia = b, getImage(b === a.currentSrc ? {
                            src: a.currentSrc,
                            mod: d
                        } : {
                            src: b,
                            mod: d,
                            update: a.currentSrc
                        })) : getImage({
                            src: a.currentSrc,
                            mod: d
                        }), globalData.pinterestSettings.here.match(globalData.otherSettings.pattern.page.twitter) && a.currentSrc.match(globalData.otherSettings.pattern.img.twitter))
                        for (c = a.parentNode; c.tagName;) f = c.getAttribute("data-permalink-path"), f && (d.url = "https://twitter.com" + f, d.description = c.parentNode.getElementsByTagName("P")[0].textContent, c = globalData.document.body), c = c.parentNode;
                    a.currentSrc.match(globalData.otherSettings.pattern.img.youtube) && (c = a.currentSrc.split("/vi/"), c.length && (f = c[1].split("/")[0], f && getImage({
                        mod: {
                            multimedia: !0,
                            url: "https://www.youtube.com/watch?v=" + f
                        },
                        src: "https://i.ytimg.com/vi/" + f + "/hqdefault.jpg",
                        update: a.currentSrc
                    })))
                }
            };
        if (f = globalData.document.querySelectorAll("[data-pin-me-only]"), 1 === f.length) h(f[0]);
        else
            for (globalData.pinterestSettings.override.og ? console.log("og overridden") : globalData.pinterestSettings.data.meta.og && (d = {}, console.log("og found"), globalData.pinterestSettings.data.meta.og.image && ("string" === typeof globalData.pinterestSettings.data.meta.og.image ? (console.log("og:image found"), d.ogMedia = globalData.pinterestSettings.data.meta.og.image) : (globalData.pinterestSettings.data.meta.og.image[0] ? (console.log("og:image array found; using the first element"), q = globalData.pinterestSettings.data.meta.og.image[0]) : q = globalData.pinterestSettings.data.meta.og.image, "string" === typeof q ? (console.log("og:image found in object"), d.ogMedia = q) : q.secure_url && "string" === typeof q.secure_url ? (console.log("og:secure_url found"), d.ogMedia = q.secure_url) : q["~"] && "string" === typeof q["~"] && (console.log("og:~ found"), d.ogMedia = q["~"])), globalData.pinterestSettings.data.meta.og.url && ("string" === typeof globalData.pinterestSettings.data.meta.og.url ? d.ogUrl = globalData.pinterestSettings.data.meta.og.url : (console.log("More than one og:url found"), d.ogUrl = globalData.pinterestSettings.data.meta.og.url[0]), console.log("og:url found")), globalData.pinterestSettings.data.meta.og.site_name && ("string" === typeof globalData.pinterestSettings.data.meta.og.site_name ? globalData.pinterestSettings.ogSiteName = globalData.pinterestSettings.data.meta.og.site_name : (console.log("More than one og:site_name found"), globalData.pinterestSettings.ogSiteName = globalData.pinterestSettings.data.meta.og.site_name[0])), (globalData.pinterestSettings.data.meta.og.description || globalData.pinterestSettings.data.meta.og.title) && (console.log("og:title or og:description found"), d.ogDescription = globalData.pinterestSettings.data.meta.og.description || globalData.pinterestSettings.data.meta.og.title, "string" === typeof d.ogDescription ? globalData.pinterestSettings.ogDescription = d.ogDescription : (console.log("More than one og:description found"), globalData.pinterestSettings.ogDescription = d.ogDescription[0])), console.log("loading og:image"), getImage({
                    src: d.ogMedia,
                    mod: d
                }))), c = globalData.document.getElementsByTagName("IMG"), b = 0; b < c.length; b += 1) h(c[b])
    }

    function getCanonicalLink() {
        var a = void 0,
            b = void 0;
        for (a = globalData.document.getElementsByTagName("LINK"), b = 0; b < a.length; b += 1)
            if (a[b].rel && "canonical" === a[b].rel.toLowerCase() && a[b].href) {
                globalData.pinterestSettings.data.link.canonical = a[b].href, globalData.pinterestSettings.data.url = a[b].href;
                break
            }
    }

    function getMeta() {
        var b = void 0,
            c = {},
            d = [],
            e = {},
            f = document.getElementsByTagName("META"),
            g = void 0,
            h = void 0,
            i = void 0,
            k = void 0,
            l = void 0,
            m = void 0,
            n = void 0;
        for (i = 0; i < f.length; i += 1)
            if (h = f[i].getAttribute("content"), h && (g = f[i].getAttribute("property") || f[i].getAttribute("name"))) {
                if ("pinterest" === g.toLowerCase() && "nopin" === h.toLowerCase()) return f[i].getAttribute("description") || !0;
                f[i].getAttribute("data-pin-nopin") || d.push({
                    k: g,
                    v: h
                })
            }
        for (d.sort(function(a, b) {
                var c = 0;
                return a.k > b.k ? c = 1 : a.k < b.k && (c = -1), c
            }), i = 0; i < d.length; i += 1) {
            for (l = d[i].k.split(":"), n = e, k = 0; k < l.length; k += 1) "undefined" === typeof n[l[k]] && (n[l[k]] = {}), n = n[l[k]];
            m = checkTypes(n["~"]), "undefined" === m ? n["~"] = d[i].v : ("string" === m && (n["~"] = [n["~"]]), n["~"].push(d[i].v))
        }
        if (b = function(a, c, d) {
                for (var e in a) "object" === checkTypes(a[e]) ? "string" === typeof a[e][0] ? c[d] = a[e] : b(a[e], a, e) : 1 === Object.keys(a).length && (c[d] = a[e]);
                return a
            }, globalData.pinterestSettings.data.meta = b(e, null, null), c = {}, console.log("meta data found"), console.log(globalData.pinterestSettings.data.meta), globalData.pinterestSettings.data.meta.pin && (console.log("data-pin found"), globalData.pinterestSettings.data.meta.pin.url && (console.log("data-pin-url found"), c.pinUrl = globalData.pinterestSettings.data.meta.pin.url, globalData.pinterestSettings.override.link = !0), globalData.pinterestSettings.data.meta.pin.description && (console.log("data-pin-description found"), c.pinDescription = globalData.pinterestSettings.data.meta.pin.description), globalData.pinterestSettings.data.meta.pin.title && (console.log("data-pin-title found"), c.pinTitle = globalData.pinterestSettings.data.meta.pin.title), globalData.pinterestSettings.data.meta.pin.id && (console.log("data-pin-id found"), c.pinId = globalData.pinterestSettings.data.meta.pin.id, globalData.pinterestSettings.override.imageless = !0), globalData.pinterestSettings.data.meta.pin.media && (console.log("data-pin-media found"), c.pinMedia = globalData.pinterestSettings.data.meta.pin.media, console.log("loading data-pin-media"), getImage({
                src: globalData.pinterestSettings.data.meta.pin.media,
                mod: c
            }))), globalData.pinterestSettings.data.meta.instapp && globalData.pinterestSettings.data.meta.instapp.owner_user_id && globalData.pinterestSettings.data.meta.al && globalData.pinterestSettings.data.meta.al.ios && globalData.pinterestSettings.data.meta.al.ios.url && globalData.pinterestSettings.data.meta.al.ios.url.match("=") && (globalData.pinterestSettings.insta = {
                owner: globalData.pinterestSettings.data.meta.instapp.owner_user_id,
                id: globalData.pinterestSettings.data.meta.al.ios.url.split("=")[1]
            }, globalData.pinterestSettings.data.meta.instapp.hashtags && (globalData.pinterestSettings.insta.hashtags = globalData.pinterestSettings.data.meta.instapp.hashtags.toString())), globalData.pinterestSettings.data.meta.og)
            for ("object" === checkTypes(globalData.pinterestSettings.data.meta.og.image) && (globalData.pinterestSettings.data.meta.og.image = globalData.pinterestSettings.data.meta.og.image.secure_url || void 0), l = ["description", "title", "url", "image"], i = 0; i < l.length; i += 1) globalData.pinterestSettings.data.meta.og[l[i]] && "string" !== typeof globalData.pinterestSettings.data.meta.og[l[i]] && (globalData.pinterestSettings.data.meta.og[l[i]] = globalData.pinterestSettings.data.meta.og[l[i]][0])
    }

    function getJSONLD() {
        var b = document.getElementsByTagName("SCRIPT"),
            c = void 0,
            d = void 0;
        for (c = 0, d = b.length; c < d; c += 1)
            if (b[c].type && "application/ld+json" === b[c].type && b[c].innerText) try {
                globalData.pinterestSettings.data.script.push(JSON.parse(b[c].innerText))
            } catch (e) {
                console.log("Could not parse linked data."), console.log(b[c].innerText)
            }
    }

    function checkSpecialCase() {
        var b = void 0,
            c = void 0,
            d = void 0,
            e = void 0,
            f = void 0,
            h = void 0,
            i = void 0,
            k = void 0,
            l = void 0,
            m = void 0,
            n = void 0,
            o = void 0,
            p = void 0,
            q = void 0;
        if (c = !1, !c && globalData.pinterestSettings.here.match(globalData.otherSettings.pattern.page.amazonPage))
            for (b = globalData.document.getElementsByTagName("IMG"), e = 0; e < b.length; e += 1)
                if (f = b[e].getAttribute(globalData.otherSettings.pattern.att.amazonAsin), f && globalData.pinterestSettings.here.match(f)) {
                    getImage({
                        src: b[e].currentSrc,
                        override: ["imageless"],
                        mod: {
                            url: "https://www.amazon.com/dp/" + f + "/",
                            description: g(b[e])
                        }
                    }), c = !0;
                    break
                }
        if (!c && globalData.pinterestSettings.here.match(globalData.otherSettings.pattern.page.amazonProduct) && (b = globalData.document.getElementById("imgTagWrapperId"), b && (d = b.getElementsByTagName("IMG")[0], d && (getImage({
                src: d.src,
                override: ["imageless"],
                mod: {
                    url: globalData.pinterestSettings.data.link.canonical,
                    description: g(d)
                }
            }), c = !0))), !c && globalData.pinterestSettings.here.match(globalData.otherSettings.pattern.page.instagramPage)) {
            console.log("On an Instagram property");
            var r = globalData.document.title;
            if (globalData.pinterestSettings.data.meta.og && globalData.pinterestSettings.data.meta.og.title && (r = globalData.pinterestSettings.data.meta.og.title.split("Instagram: “"), r = r[1] ? r[1].substring(0, r[1].length - 1).trim() : globalData.document.title), globalData.pinterestSettings.here.match(globalData.otherSettings.pattern.page.instagramPhoto)) {
                console.log("On an Instagram photo URL");
                var s = function(a) {
                        if (e = a.getElementsByTagName("IMG"), e.length)
                            for (b = 0; b < e.length; b += 1) getImage({
                                src: e[b].currentSrc,
                                override: ["imageless"],
                                mod: {
                                    url: globalData.pinterestSettings.here.split("?")[0],
                                    description: r
                                }
                            }), c = !0
                    },
                    t = globalData.document.getElementsByTagName("ARTICLE");
                if (2 === t.length && (console.log("in main carousel"), s(t[1]), console.log(c ? "Found image in carousel." : "Found carousel but no image.")), !c) {
                    var u = globalData.document.querySelectorAll("[role=button]");
                    u.length && (s(u[1]), console.log(c ? "Found image in button." : "Found button but no image."))
                }
            } else
                for (console.log("On a non-photo Instagram page"), b = globalData.document.getElementsByTagName("IMG"), f = 0; f < b.length; f += 1) b[f].currentSrc && (e = b[f].parentNode.parentNode.parentNode, "A" === e.tagName && e.href && e.href.match(/^https?:\/\//) && getImage({
                    src: b[f].currentSrc,
                    override: ["imageless"],
                    mod: {
                        url: e.href.split("?")[0],
                        description: r
                    }
                }))
        }
        if (!c && globalData.pinterestSettings.here.match(globalData.otherSettings.pattern.page.youtubeWatch) && (d = globalData.pinterestSettings.here.split("v=")[1].split("&")[0].split("#")[0], d && (console.log("found a YouTube page: " + globalData.pinterestSettings.here), getImage({
                src: "https://img.youtube.com/vi/" + d + "/hqdefault.jpg",
                override: ["imageless"],
                mod: {
                    description: globalData.document.title,
                    multimedia: !0,
                    url: "https://www.youtube.com/watch?v=" + d
                }
            }), c = !0)), !c && globalData.pinterestSettings.here.match(globalData.otherSettings.pattern.page.youtubeMobile))
            for (b = globalData.document.getElementsByTagName("A"), f = 0; f < b.length; f += 1) b[f].href && b[f].href.match(globalData.otherSettings.pattern.link.youtubeWatch) && (d = b[f].href.split("v=")[1].split("&")[0].split("#")[0], d && (console.log("found a YouTube video: " + b[f].href), getImage({
                src: "https://img.youtube.com/vi/" + d + "/hqdefault.jpg",
                override: ["imageless"],
                mod: {
                    description: globalData.document.title,
                    multimedia: !0,
                    url: "https://www.youtube.com/watch?v=" + d
                }
            }), c = !0));
        if (!c && globalData.pinterestSettings.here.match(globalData.otherSettings.pattern.page.googleImageSearch) && (h = globalData.document.getElementById("isr_mc"))) {
            globalData.pinterestSettings.override.img = !0, globalData.pinterestSettings.override.imageless = !0;
            var v = function(b) {
                if (n = "", o = "", d = b.href.split("imgrefurl="), d[1]) try {
                    n = decodeURIComponent(d[1].split("&")[0])
                } catch (e) {
                    console.log("Could not run decodeURIComponent on " + d[1])
                }
                if (d = b.href.split("imgurl="), d[1]) try {
                    o = decodeURIComponent(d[1].split("&")[0])
                } catch (e) {
                    console.log("Could not run decodeURIComponent on " + d[1])
                }
                if (n && o) {
                    if (i = {
                            src: o,
                            mod: {
                                url: n
                            }
                        }, d = b.parentNode.getElementsByTagName("DIV"), d[2] && d[2].textContent) try {
                        m = JSON.parse(d[2].textContent), "object" === ("undefined" === typeof m ? "undefined" : checkTypes(m)) && (m.s || m.pt) && (i.mod.description = m.s || m.pt)
                    } catch (e) {
                        i.mod.description = d[2].textContent, console.log("Could not run JSON.parse on " + d[2].textContent)
                    }
                    getImage(i), c = !0
                }
            };
            if (q = globalData.document.querySelectorAll("[data-pin-me-only]"), 1 === q.length && q[0].parentNode && "A" === q[0].parentNode.tagName) v(q[0].parentNode);
            else
                for (k = h.getElementsByTagName("A"), l = 0; l < k.length; l += 1) k[l].href && (p = k[l].getElementsByTagName("IMG"), p[0] && p[0].src && v(k[l]))
        }
        return c
    }

    function checkForAndroidApp() {
        globalData.Window.JavaScriptInterface && globalData.Window.JavaScriptInterface.onPinsLoaded && (globalData.pinterestSettings.config.render = "openAndroidAppShare", globalData.Window.openAndroidAppShare = function() {
            globalData.Window.JavaScriptInterface.onPinsLoaded(JSON.stringify(globalData.pinterestSettings.data))
        }, globalData.callbackArr.extendedClose = function() {
            globalData.Window.JavaScriptInterface.onPinsLoaded(JSON.stringify({
                pinmarkletClosedReason: globalData.pinterestSettings.data.close
            }))
        }, console.log("Android app found"), globalData.pinterestSettings.extended = !0)
    }

    function checkForAdvancedBrowser() {
        var b = void 0,
            c = void 0,
            d = void 0,
            e = void 0;
        if ("undefined" !== typeof chrome ? b = chrome : "undefined" !== typeof browser && (b = browser), b && b.runtime && b.runtime.getManifest && b.runtime.sendMessage) {
            for (c = b.runtime.getManifest().version, e = c.split("."), d = 0; d < e.length; d += 1) e[d] = e[d] - 0;
            e[0] > 1 && (globalData.pinterestSettings.config.render = "openGrid", globalData.Window.openGrid = function() {
                globalData.pinterestSettings.data.config = globalData.pinterestSettings.config, globalData.pinterestSettings.data.config.k = globalData.otherSettings.k, b.runtime.sendMessage({
                    to: "background",
                    act: "populateGrid",
                    data: globalData.pinterestSettings.data
                })
            }, globalData.callbackArr.extendedClose = function() {
                b.runtime.sendMessage({
                    to: "background",
                    act: "closeGrid"
                })
            }, console.log("advanced browser extension found"), globalData.pinterestSettings.extended = !0, globalData.pinterestSettings.doNotCall = !0)
        }
    }

    function checkForIOSApp() {
        globalData.Window.webkit && globalData.Window.webkit.messageHandlers && globalData.Window.webkit.messageHandlers.pinmarkletCompletionHandler && globalData.Window.webkit.messageHandlers.pinmarkletCompletionHandler.postMessage && (globalData.pinterestSettings.config.render = "openIOSAppShare", globalData.Window.openIOSAppShare = function() {
            globalData.Window.webkit.messageHandlers.pinmarkletCompletionHandler.postMessage(globalData.pinterestSettings.data)
        }, globalData.pinterestSettings.config.quiet = !0, globalData.callbackArr.extendedClose = function() {
            globalData.Window.webkit.messageHandlers.pinmarkletCompletionHandler.postMessage({
                pinmarkletClosedReason: globalData.pinterestSettings.data.close
            })
        }, console.log("IOS app found"), globalData.pinterestSettings.extended = !0)
    }

    function handleImageless() {
        var a = void 0,
            c = void 0;
        return a = globalData.pinterestSettings.here.split("/")[2], c = function(a, b, c) {
            var d = void 0,
                e = void 0,
                f = void 0,
                g = void 0,
                h = void 0,
                i = void 0,
                j = void 0,
                k = void 0,
                l = void 0;
            switch (a /= 60, d = Math.floor(a), e = a - d, f = c * (1 - b), g = c * (1 - b * e), h = c * (1 - b * (1 - e)), d) {
                case 0:
                    i = c, j = h, k = f;
                    break;
                case 1:
                    i = g, j = c, k = f;
                    break;
                case 2:
                    i = f, j = c, k = h;
                    break;
                case 3:
                    i = f, j = g, k = c;
                    break;
                case 4:
                    i = h, j = f, k = c;
                    break;
                case 5:
                    i = c, j = f, k = g
            }
            return l = function(a) {
                return ("00" + Math.round(255 * a).toString(16)).substr(-2, 2)
            }, "#" + l(i) + l(j) + l(k)
        }, {
            description: g({
                imageless: !0
            }),
            height: globalData.otherSettings.thumbSize,
            width: globalData.otherSettings.thumbSize,
            score: globalData.otherSettings.thumbSize * globalData.otherSettings.thumbSize,
            url: globalData.pinterestSettings.here,
            siteName: globalData.pinterestSettings.ogSiteName || a,
            color: c(parseInt(b({
                str: a
            }).substr(0, 3), 16) % 360, .25, .75)
        }
    }

    function w() {
        var b = void 0,
            d = void 0,
            g = void 0,
            h = void 0,
            i = void 0;
        globalData.pinterestSettings.defaultBodyOverflow = "", "visible" === globalData.pinterestSettings.defaultBodyOverflow && (globalData.pinterestSettings.defaultBodyOverflow = ""), globalData.document.body.style.overflow = "hidden", console.log("popping the unauthed grid"), globalData.pinterestSettings.data.config = globalData.pinterestSettings.config, globalData.pinterestSettings.data.hazExtension = getElementAttribute(globalData.document.body, "data-pinterest-extension-installed"), b = JSON.stringify(globalData.pinterestSettings.data), globalData.s.grid = globalData.document.createElement("IFRAME"), globalData.s.grid.id = globalData.otherSettings.k + "_grid", globalData.s.grid.src = globalData.otherSettings.grid, globalData.s.grid.frameBorder = "0";
        for (d in globalData.otherSettings.iframeStyle) globalData.otherSettings.iframeStyle[d].hasOwnProperty && (globalData.s.grid.style[d] = globalData.otherSettings.iframeStyle[d]);
        g = function() {
            globalData.document.body.style.overflow = globalData.pinterestSettings.defaultBodyOverflow, globalData.document.body.removeAttribute(globalData.otherSettings.hazPinningNow), globalData.s.grid && globalData.s.grid.parentNode && globalData.s.grid.parentNode === globalData.document.body && globalData.document.body.removeChild(globalData.s.grid)
        }, h = (new Date).getTime(), globalData.s.grid.onload = function() {
            i = (new Date).getTime() - h, console.log("Grid render time: " + i), c({
                reason: "grid_rendered",
                time: i
            }), globalData.pinterestSettings.receiver = globalData.s.grid.contentWindow, globalData.pinterestSettings.receiver.postMessage(b, globalData.s.grid.src), globalData.Window.addEventListener("message", function(a) {
                globalData.Window.clearTimeout(globalData.pinterestSettings.renderFailed), "x" === a.data && g()
            }), globalData.s.grid.focus()
        }, globalData.document.body.setAttribute(globalData.otherSettings.hazPinningNow, !0), globalData.document.body.appendChild(globalData.s.grid), globalData.pinterestSettings.renderFailed = globalData.Window.setTimeout(function() {
            c({
                reason: "iframe_timeout"
            }), g(), globalData.pinterestSettings.data.close = globalData.pinterestSettings.config.msg.noPinnablesFound, e()
        }, globalData.otherSettings.maxWait)
    }

    function wrapUp() {
        console.log(globalData.pinterestSettings.data), c({
            reason: "scan_complete",
            time: (new Date).getTime() - globalData.pinterestSettings.time.start,
            url: globalData.document.URL
        }), globalData.pinterestSettings.data.close ? e() : globalData.pinterestSettings.config.share ? (console.log("sending results to IOS share extension"), globalData.document.body.setAttribute(globalData.pinterestSettings.config.share, JSON.stringify(globalData.pinterestSettings.data))) : "function" === typeof globalData.Window[globalData.pinterestSettings.config.render] ? (console.log("sending results to " + globalData.pinterestSettings.config.render), globalData.Window[globalData.pinterestSettings.config.render](globalData.pinterestSettings.data)) : (console.log("sending results to our default iframe grid overlay"), w())
    }

    function y() {
        var b = void 0,
            d = void 0,
            e = void 0,
            f = void 0,
            g = void 0,
            h = void 0,
            i = void 0,
            j = [],
            k = void 0,
            l = void 0;
        for (e in globalData.pinterestSettings.data.img) globalData.pinterestSettings.data.img[e].hasOwnProperty && (i = globalData.pinterestSettings.data.img[e], "ok" === i.status && (i.url = globalData.pinterestSettings.data.url, i.mod || (i.mod = {}), h = 1, f = i.height, g = i.width, g > f ? g = f : f > 3 * g && (f = 3 * g), i.mod.description && (i.description = i.mod.description), i.mod.ogDescription && (i.description = i.mod.ogDescription), i.mod.pinDescription && (i.description = i.mod.pinDescription), i.description && i.description.length > 500 && (i.description = i.description.substring(0, 500)), i.mod.url && (i.url = i.mod.url), i.mod.pinUrl && (i.url = i.mod.pinUrl), i.media = i.src, i.mod.multimedia && (h = 3 * h), (i.mod.pinUrl || i.mod.pinMedia) && (h = 4 * h), i.mod.pinMeOnly && (h = 1e6 * h), i.mod.pinId && (h = 10 * h, i.dataPinId = i.mod.pinId, i.id = i.mod.pinId, globalData.pinterestSettings.override.imageless = !0), i.width < globalData.otherSettings.thumbSize && (h /= 2), i.mod.multimedia && (globalData.pinterestSettings.override.imageless = !0, h = 2 * h), i.score = f * g * h - (i.mod.sourceOrder || 0), j.push(i)));
        globalData.pinterestSettings.override.imageless || (k = handleImageless(), globalData.pinterestSettings.data.imageless = k, j.push(k), 1 === j.length && c({
            reason: "imageless_only"
        })), j.sort(function(a, b) {
            var c = 0;
            return a.score < b.score ? c = 1 : a.score > b.score && (c = -1), c
        }), j = j.filter(function(a) {
            return a.score > j[0].score / globalData.otherSettings.quality
        }), globalData.pinterestSettings.data.thumb = j;
        var m = function(b, c) {
            globalData.pinterestSettings.data.rich || (globalData.pinterestSettings.data.rich = {}), globalData.pinterestSettings.data.rich[b] ? console.log("Ignoring duplicate rich data: " + b + " " + c) : (console.log("Adding rich data: " + b + " " + c), globalData.pinterestSettings.data.rich[b] = c)
        };
        if (globalData.pinterestSettings.data.meta && (globalData.pinterestSettings.data.meta.pin && (globalData.pinterestSettings.data.meta.pin.title && m("title", globalData.pinterestSettings.data.meta.pin.title), globalData.pinterestSettings.data.meta.pin.description && m("description", globalData.pinterestSettings.data.meta.pin.description), globalData.pinterestSettings.data.meta.pin.url && m("url", globalData.pinterestSettings.data.meta.pin.url)), globalData.pinterestSettings.data.meta.og && (globalData.pinterestSettings.data.meta.og.title && m("title", globalData.pinterestSettings.data.meta.og.title), globalData.pinterestSettings.data.meta.og.description && m("description", globalData.pinterestSettings.data.meta.og.description), globalData.pinterestSettings.data.meta.og.url && m("url", globalData.pinterestSettings.data.meta.og.url)), globalData.pinterestSettings.data.meta.description && "string" === typeof globalData.pinterestSettings.data.meta.description && m("description", globalData.pinterestSettings.data.meta.description)), document.title && "string" === typeof document.title && m("title", document.title), globalData.pinterestSettings.data.link && globalData.pinterestSettings.data.link.canonical && m("url", globalData.pinterestSettings.data.link.canonical), globalData.pinterestSettings.insta) {
            for (b = 0, d = globalData.pinterestSettings.data.script.length; b < d; b += 1) globalData.pinterestSettings.data.script[b].author && globalData.pinterestSettings.data.script[b].author.alternateName && (globalData.pinterestSettings.insta.username = globalData.pinterestSettings.data.script[b].author.alternateName);
            globalData.pinterestSettings.data.rich.instagram = globalData.pinterestSettings.insta, l = {
                reason: "insta_found",
                extras: {
                    media_id: globalData.pinterestSettings.insta.id,
                    owner_id: globalData.pinterestSettings.insta.owner,
                    username: globalData.pinterestSettings.insta.username
                }
            }, globalData.pinterestSettings.insta.hashtags && (l.extras.hashtags = globalData.pinterestSettings.insta.hashtags), c(l)
        }
        wrapUp()
    }

    function z(a) {
        var b = void 0,
            c = void 0,
            d = void 0,
            e = void 0;
        if (c = globalData.Window.navigator.language.toLowerCase(), c = c.replace(/[^a-z0-9]/g, " "), c = c.replace(/^\s+|\s+$/g, ""), c = c.replace(/\s+/g, " "), c = c.split(" "), c.length > 2)
            for (b = c.length - 1; b > -1; b -= 1) 2 !== c[b].length && c.splice(b, 1);
        d = c[0], c[1] && (e = c[0] + "-" + c[1]), globalData.otherSettings.msg[e] ? globalData.pinterestSettings.config.lang = e : globalData.otherSettings.msg[d] && (globalData.pinterestSettings.config.lang = d), globalData.pinterestSettings.config.msg = globalData.otherSettings.msg[globalData.pinterestSettings.config.lang]
    }

    function A(a) {
        "string" === typeof a && (a = globalData.document.getElementById(a)), a && a.parentNode && a.parentNode.removeChild(a)
    }

    function B(a) {
        var b = void 0,
            c = void 0,
            d = void 0,
            e = globalData.document.getElementsByTagName("SCRIPT");
        for (b = e.length - 1; b > -1; b -= 1)
            if (e[b].src.match(globalData.otherSettings.me)) {
                for (c = 0; c < globalData.otherSettings.config.length; c += 1) d = getElementAttribute({
                    el: e[b],
                    att: globalData.otherSettings.config[c]
                }), d && (globalData.pinterestSettings.config[globalData.otherSettings.config[c]] = d);
                A(e[b]);
                break
            }
    }

    function runBookmarklet() {
        var b = void 0,
            f = void 0;
        console.log("My key: " + globalData.otherSettings.k), globalData.document.body.getAttribute(globalData.otherSettings.hazPinningNow) || (globalData.Window.navigator.userAgent.match(" MSIE ") ? c({
            reason: "oldIE"
        }) : (B(), globalData.pinterestSettings.config.here ? globalData.pinterestSettings.here = globalData.pinterestSettings.config.here : globalData.pinterestSettings.here = globalData.document.URL, c({
            reason: "init"
        }), z(), "string" === typeof DATA_RESULTS_KEY && (globalData.pinterestSettings.config.share = DATA_RESULTS_KEY), globalData.pinterestSettings.extended || (checkForAndroidApp(), checkForAdvancedBrowser(), checkForIOSApp()), d({
            url: globalData.pinterestSettings.here
        }) ? (c({
            reason: "domain_not_allowed"
        }), globalData.pinterestSettings.data.close = globalData.pinterestSettings.config.msg.noPinDomain, e()) : (getJSONLD(), b = getMeta(), b ? (c({
            reason: "found_nopin_meta"
        }), b === !0 ? globalData.pinterestSettings.data.close = globalData.pinterestSettings.config.msg.noPinMeta : globalData.pinterestSettings.data.close = b, e()) : (console.log("Initing"), globalData.s = {}, globalData.pinterestSettings.data.url = globalData.pinterestSettings.here, checkSpecialCase() || (l(), globalData.pinterestSettings.override.img || m(), globalData.pinterestSettings.override.link || getCanonicalLink()), f = function() {
            globalData.pinterestSettings.count.imgLoading || globalData.pinterestSettings.count.apiCalls ? (console.log("images left to load: " + globalData.pinterestSettings.count.imgLoading), console.log("api calls outstanding: " + globalData.pinterestSettings.count.apiCalls), (new Date).getTime() < globalData.pinterestSettings.time.start + globalData.otherSettings.maxWait ? globalData.Window.setTimeout(f, 10) : (console.log("Timed out, rendering what we have."), y())) : y()
        }, globalData.Window.setTimeout(f, 100)))))
    }
    var D = ["debug", "pinMethod", "render", "via", "guid", "pinbox", "quiet", "quality", "noCancel", "noHeader", "force", "here"],
        E = [/08fb2eb6424d/, /1529ad2b2cc8/, /1847807c0ea1/, /1d1d5ffa1d50/, /20c46b653b00/, /25f7c9982cea/, /293aa4f9b3d0/, /32aa39d04eb4/, /415215dcadbf/, /540b2374abf1/, /6f145d4255cf/, /71c1f4783e6d/, /79f57d83d54a/, /820a6e7baa0f/, /85ae87da6618/, /871de03c9980/, /8c2d5961f7af/, /8de5d416e5d2/, /95fa195f8b6a/, /9e2089d8b8f2/, /a32353817e45/, /cefdc93047b7/, /dbafdf055617/, /eefa602a72ed/, /efa3a2deb839/],
        F = [/^https?:\/\/(.*?\.|)craigslist\.org\//, /^https?:\/\/(.*?\.|)chase\.com\//, /^https?:\/\/(.*?\.|)facebook\.com\//, /^https?:\/\/mail\.aol\.com\//, /^https?:\/\/(.*?\.|)atmail\.com\//, /^https?:\/\/(.*?\.|)contactoffice\.com\//, /^https?:\/\/(.*?\.|)fastmail\.fm\//, /^https?:\/\/(.*?\.|)webmail\.gandi\.net\//, /^https?:\/\/outlook\.live\.com\//, /^https?:\/\/(.*?\.|)mail\.live\.com\//, /^https?:\/\/post\.pinterest\.com\//, /^https?:\/\/mail\.ukr\.net\//, /^https?:\/\/plus\.google\.com\//, /^https?:\/\/outlook\.office\.com\//, /^https?:\/\/accounts\.google\.com\//, /^https?:\/\/myaccount\.google\.com\//, /^https?:\/\/mail\.google\.com\//, /^https?:\/\/inbox\.google\.com\//, /^https?:\/\/docs\.google\.com\//, /^https?:\/\/gmx\.com\//, /^https?:\/\/(.*?\.|)hushmail\.com\//, /^https?:\/\/(.*?\.|)laposte\.fr\//, /^https?:\/\/mail\.lycos\.com\//, /^https?:\/\/(.*?\.|)mail\.com\//, /^https?:\/\/(.*?\.|)mail\.ru\//, /^https?:\/\/(.*?\.|)opolis\.eu\//, /^https?:\/\/(.*?\.|)outlook\.com\//, /^https?:\/\/(.*?\.|)nokiamail\.com\//, /^https?:\/\/apps\.rackspace\.com\//, /^https?:\/\/mail\.rediff\.com\//, /^https?:\/\/(.*?\.|)runbox\.com\//, /^https?:\/\/mail\.sify\.com\//, /^https?:\/\/webmail\.thexyz\.com\//, /^https?:\/\/login\.yahoo\.com\//, /^https?:\/\/mail\.yahoo\.com\//, /^https?:\/\/mail\.yandex\.com\//],
        G = {
            display: "block",
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            margin: "0",
            clip: "0",
            zIndex: "2147483647"
        },
        errorStrings = {
            en: {
                noPinDomain: "Sorry, pinning is not allowed from this domain. Please contact the site operator if you have any questions.",
                noPinMeta: "Sorry, pinning is not allowed from this page. Please contact the site operator if you have any questions.",
                noPinnablesFound: "Sorry, couldn't find any pinnable things on this page."
            },
            cs: {
                noPinDomain: "Je nám líto. Z této domény není možné přidávat piny. S dotazy se obracejte na provozovatele webu.",
                noPinMeta: "Je nám líto. Z této stránky není možné přidávat piny. S dotazy se obracejte na provozovatele webu.",
                noPinnablesFound: "Je nám líto. Na této stránce jsme nenalezli žádný obsah, který by bylo možné připnout."
            },
            da: {
                noPinDomain: "Det er ikke muligt at tilføje pins fra domænet. Kontakt websitets ejer, hvis du har spørgsmål.",
                noPinMeta: "Det er ikke tilladt at sætte pins op fra denne side. Kontakt websitets ejer, hvis du har spørgsmål.",
                noPinnablesFound: "Der er ikke rigtigt noget at sætte op på denne side."
            },
            de: {
                noPinDomain: "Es tut uns leid, aber von dieser Domain kann nichts gepinnt werden. Bitte kontaktiere den Website-Betreiber, falls du weitere Fragen hast.",
                noPinMeta: "Es tut uns leid, aber von dieser Seite kann nichts gepinnt werden. Bitte kontaktiere den Website-Betreiber, falls du weitere Fragen hast.",
                noPinnablesFound: "Es tut uns leid, aber wir konnten auf dieser Seite nichts finden, was du pinnen könntest."
            },
            es: {
                noPinDomain: "Lo sentimos, no está permitido pinear desde este dominio. Ponte en contacto con el operador del sitio si tienes alguna pregunta.",
                noPinMeta: "Lo sentimos, no está permitido pinear desde esta página. Ponte en contacto con el operador del sitio si tienes alguna pregunta.",
                noPinnablesFound: "Lo sentimos, no hemos encontrado ningún elemento que se pueda pinear en esta página."
            },
            "es-mx": {
                noPinDomain: "Lamentablemente, no está permitido pinear desde este dominio. Si quieres hacer consultas, comunícate con el operador del sitio.",
                noPinMeta: "Lamentablemente, no está permitido pinear desde esta página. Si quieres hacer consultas, comunícate con el operador del sitio.",
                noPinnablesFound: "Lamentablemente, no se encontraron cosas para pinear en esta página."
            },
            el: {
                noPinDomain: "Λυπάμαι, δεν επιτρέπεται το καρφίτσωμα από αυτόν τον τομέα. Επικοινωνήστε με το διαχειριστή της ιστοσελίδας αν έχετε απορίες.",
                noPinMeta: "Λυπάμαι, δεν επιτρέπεται το καρφίτσωμα από αυτήν τη σελίδα. Επικοινωνήστε με το διαχειριστή της ιστοσελίδας αν έχετε απορίες.",
                noPinnablesFound: "Λυπάμαι, δεν ήταν δυνατή η εύρεση στοιχείων που μπορούν να καρφιτσωθούν σε αυτήν τη σελίδα."
            },
            fi: {
                noPinDomain: "Et voi tehdä Pin-lisäyksiä tästä verkkotunnuksesta. Jos sinulla on kysyttävää, ota yhteyttä sivuston ylläpitäjään.",
                noPinMeta: "Et voi tehdä Pin-lisäyksiä tältä sivulta. Jos sinulla on kysyttävää, ota yhteyttä sivuston ylläpitäjään.",
                noPinnablesFound: "Sivulta ei valitettavasti löydy sisältöä, jota voi lisätä."
            },
            fr: {
                noPinDomain: "Désolé, mais vous ne pouvez pas épingler les contenus de ce domaine. Pour toute question, veuillez contacter l'administrateur du site.",
                noPinMeta: "Désolé, mais vous ne pouvez pas épingler les contenus de cette page. Pour toute question, veuillez contacter l'administrateur du site.",
                noPinnablesFound: "Désolé, mais aucun contenu susceptible d'être épinglé n'a été trouvé sur cette page."
            },
            id: {
                noPinDomain: "Maaf, Anda tidak diizinkan mengepin dari domain ini. Hubungi operator situs jika Anda memiliki pertanyaan.",
                noPinMeta: "Maaf, Anda tidak diizinkan mengepin dari halaman ini. Silakan hubungi operator situs jika Anda memiliki pertanyaan.",
                noPinnablesFound: "Maaf, tidak ada yang bisa dipin dari halaman ini."
            },
            it: {
                noPinDomain: "Ci dispiace, ma l'aggiunta di Pin non è consentita da questo dominio. Se hai domande, contatta il gestore del sito.",
                noPinMeta: "Ci dispiace, ma l'aggiunta di Pin non è consentita da questa pagina. Se hai domande, contatta il gestore del sito.",
                noPinnablesFound: "Spiacenti, impossibile trovare immagini o video che è possibile aggiungere ai Pin in questa pagina."
            },
            hi: {
                noPinDomain: "क्षमा करें, इस डोमेन से पिन लगाने की अनुमति नहीं है। अगर आपका कोई प्रश्न हैं, तो कृपया साइट ऑपरेटर से संपर्क करें।",
                noPinMeta: "क्षमा करें, इस पेज से पिन लगाने की अनुमति नहीं है। अगर आपका कोई प्रश्न हैं, तो कृपया साइट ऑपरेटर से संपर्क करें।",
                noPinnablesFound: "क्षमा करें, इस पेज पर कोई भी पिन लगाने वाली चीज़ नहीं मिल सकी।"
            },
            hu: {
                noPinDomain: "Sajnáljuk, ebből a tartományból nem lehet pinelni. Kérjük, kérdéseiddel fordulj az oldal üzemeltetőjéhez.",
                noPinMeta: "Sajnáljuk, erről az oldalról nem lehet pinelni. Kérjük, kérdéseiddel fordulj az oldal üzemeltetőjéhez.",
                noPinnablesFound: "Sajnáljuk, ezen az oldalon nem található semmilyen pinelhető dolog."
            },
            ja: {
                noPinDomain: "し訳ありません。HTML 以外のページでピンすることはできません。画像をアップロードしようと試みている場合は、pinterest.com にアクセスしてください。",
                noPinMeta: "このページからのピンは許可されていません。ご質問がある場合は、サイト運営者にお問い合わせください。",
                noPinnablesFound: "申し訳ございません、このページでピンできるアイテムは見つかりませんでした。"
            },
            ko: {
                noPinDomain: "죄송합니다. 이 도메인에서는 핀하기가 허용되지 않습니다. 질문이 있으시면 사이트 운영자에게 문의하시기 바랍니다.",
                noPinMeta: "죄송합니다. 이 페이지에서는 핀하기가 허용되지 않습니다. 질문이 있으시면 사이트 운영자에게 문의하시기 바랍니다.",
                noPinnablesFound: "죄송합니다. 이 페이지에서 핀할 수 있는 것을 찾지 못했습니다."
            },
            ms: {
                noPinDomain: "Maaf, mengepin tidak dibenarkan dari domain ini. Sila hubungi pengendali laman jika anda ada sebarang solan.",
                noPinMeta: "Maaf, mengepin tidak dibenarkan dari halaman ini. Sila hubungi pengendali laman jika anda ada sebarang soalan.",
                noPinnablesFound: "Maaf, tidak dapat mencari sebarang imej yang boleh dipin pada halaman ini."
            },
            nb: {
                noPinDomain: "Beklager, pinning er ikke tillatt fra dette domenet. Ta kontakt med webmasteren hvis du har spørsmål.",
                noPinMeta: "Beklager, pinning er ikke tillatt fra denne siden. Ta kontakt med webmasteren hvis du har spørsmål.",
                noPinnablesFound: "Beklager, kunne ikke finne noen ting som kunne pinnes på denne siden."
            },
            nl: {
                noPinDomain: "Sorry, het is niet toegestaan om vanaf dit domein te pinnen. Neem contact op met de beheerder van deze website als je vragen hebt.",
                noPinMeta: "Sorry, het is niet toegestaan om vanaf dit domein te pinnen. Neem contact op met de beheerder van deze website als je vragen hebt.",
                noPinnablesFound: "Sorry, er is niets wat je kunt pinnen op deze pagina."
            },
            pl: {
                noPinDomain: "Niestety przypinanie z tej domeny jest niedozwolone. Skontaktuj się z operatorem witryny, jeśli masz pytania.",
                noPinMeta: "Niestety przypinanie z tej strony jest niedozwolone. Skontaktuj się z operatorem witryny, jeśli masz pytania.",
                noPinnablesFound: "Niestety na tej stronie nie ma żadnych rzeczy do przypinania."
            },
            pt: {
                noPinDomain: "Lamentamos, mas não é permitido afixar pins a partir deste domínio. Em caso de dúvidas, contacta o operador do site.",
                noPinMeta: "Lamentamos, mas não é permitido afixar pins a partir desta página. Em caso de dúvidas, contacta o operador do site.",
                noPinnablesFound: "Lamentamos, mas não foi possível encontrar nesta página nenhum conteúdo que possa ser afixado."
            },
            "pt-br": {
                noPinDomain: "Não é possível pinar a partir deste domínio. Entre em contato com o operador do site se tiver dúvidas.",
                noPinMeta: "Não é possível pinar a partir desta página. Entre em contato com o operador do site se tiver dúvidas.",
                noPinnablesFound: "Não foi possível encontrar nesta página conteúdo que possa ser pinado."
            },
            ro: {
                noPinDomain: "Ne pare rău, nu se pot adăuga Pinuri de pe acest site. Te rugăm să-l contactezi pe operatorul site-ului dacă ai întrebări.",
                noPinMeta: "Ne pare rău, nu se pot adăuga Pinuri de pe această pagină. Te rugăm să-l contactezi pe operatorul site-ului dacă ai întrebări.",
                noPinnablesFound: "Ne pare rău, nu am putut găsi conținut pentru adăugat ca Pinuri pe această pagină."
            },
            ru: {
                noPinDomain: "К сожалению, прикалывание Пинов в данном домене невозможно. Со всеми вопросами обращайтесь к администратору веб-сайта.",
                noPinMeta: "К сожалению, прикалывание Пинов с данной страницы невозможно. Со всеми вопросами обращайтесь к администратору веб-сайта.",
                noPinnablesFound: "На этой странице нет ничего, что можно было бы приколоть."
            },
            sk: {
                noPinDomain: "Prepáčte, z tejto domény si nemôžete pripínať piny. Kontaktujte prevádzkovateľa stránky, ak máte nejaké otázky.",
                noPinMeta: "Prepáčte, z tejto stránky si nemôžete pripínať piny. Kontaktujte prevádzkovateľa stránky, ak máte nejaké otázky.",
                noPinnablesFound: "Prepáčte, na tejto stránke sme nenašli nič na pripnutie."
            },
            sv: {
                noPinDomain: "Tyvärr går det inte att pinna från den här domänen. Kontakta webbplatsoperatören om du har frågor.",
                noPinMeta: "Det går inte att pinna från den här sidan. Kontakta webbplatsoperatören om du har frågor.",
                noPinnablesFound: "Det gick inte att hitta något på den här sidan som går att pinna."
            },
            th: {
                noPinDomain: "ขออภัย โดเมนนี้ไม่อนุญาตให้ปักพิน กรุณาติดต่อผู้ดูแลเว็บไซต์หากมีข้อสงสัย",
                noPinMeta: "ขออภัย เพจนี้ไม่อนุญาตให้ปักพิน กรุณาติดต่อผู้ดูแลเว็บไซต์หากมีข้อสงสัย",
                noPinnablesFound: "ขออภัย ไม่พบอะไรที่ปักพินได้ในเพจนี้"
            },
            tl: {
                noPinDomain: "Sorry, hindi allowed ang pinning sa domain na 'to. Paki-contact ang site operator kung may tanong ka.",
                noPinMeta: "Sorry, hindi allowed ang pinning mula sa page na 'to. Paki-contact ang site operator kung may tanong ka.",
                noPinnablesFound: "Sorry, walang makitang puwedeng i-pin sa page na 'to."
            },
            tr: {
                noPinDomain: "Üzgünüz, bu alan adından pinlemeye izin verilmiyor. Sorularınız varsa, lütfen site operatörüne başvurun.",
                noPinMeta: "Üzgünüz, bu sayfadan pinlemeye izin verilmiyor. Sorularınız varsa, lütfen site operatörüne başvurun.",
                noPinnablesFound: "Üzgünüz, bu sayfada pinlenebilecek bir şey bulunamadı."
            },
            uk: {
                noPinDomain: "На жаль, приколювати піни з цього домену не можна. Якщо у вас виникли запитання, зв'яжіться з оператором веб-сайту.",
                noPinMeta: "На жаль, приколювати піни з цієї сторінки не можна. Якщо у вас виникли запитання, зв'яжіться з оператором веб-сайту.",
                noPinnablesFound: "На жаль, ми не змогли знайти на цій сторінці зображень, які можна було б приколоти."
            },
            vi: {
                noPinDomain: "Rất tiếc, không cho phép ghim từ miền này. Vui lòng liên hệ người điều hành trang web nếu bạn có thắc mắc.",
                noPinMeta: "Rất tiếc, không cho phép ghim từ trang này. Vui lòng liên hệ người điều hành trang web nếu bạn có thắc mắc.",
                noPinnablesFound: "Rất tiếc, không thể tìm thấy thứ gì ghim được trên trang này."
            },
            zh: {
                noPinDomain: "抱歉，不允许从此域收藏 Pin 图。如有疑虑请联系网站运营商。",
                noPinMeta: "抱歉，不允许从此域收藏 Pin 图。如有疑虑请联系网站运营商。",
                noPinnablesFound: "抱歉，未在此页面中找到可收藏的 Pin 图。"
            },
            "zh-tw": {
                noPinDomain: "抱歉！不允許從此網域收藏釘圖。若有疑問，請聯絡網站營運商。",
                noPinMeta: "抱歉！不允許從此網頁收藏釘圖。若有疑問，請聯絡網站營運商。",
                noPinnablesFound: "抱歉！在此網頁上找不到任何可收藏釘圖的內容。"
            }
        },
        domainStrings = {
            att: {
                amazonAsin: "data-fling-asin"
            },
            iframe: {
                youtube: /^(https?:|)\/\/www\.youtube\.com\/embed\//,
                instagram: /^https?:\/\/www\.instagram\.com\/p\//,
                vimeo: /^(https?:|)\/\/player\.vimeo\.com\/video\//
            },
            img: {
                twitter: /^https?:\/\/pbs\.twimg\.com\/media\//,
                youtube: /^(https?:|)\/\/i.ytimg.com\/vi\//
            },
            link: {
                youtubeWatch: /^(https?:|)\/\/(www|m)\.youtube\.com\/watch?/
            },
            page: {
                instagramPage: /^https?:\/\/www\.instagram\.com\//,
                instagramPhoto: /^https?:\/\/www\.instagram\.com\/p\//,
                twitter: /^https?:\/\/twitter\.com\//,
                amazonPage: /^https?:\/\/www\.amazon\.com\//,
                amazonProduct: /^https?:\/\/www\.amazon\.com((\/|.*)\/dp\/)/,
                youtubeWatch: /^https?:\/\/(www|m)\.youtube\.com\/watch?/,
                youtubeMobile: /^https?:\/\/m\.youtube\.com\//,
                googleImageSearch: /^https?:\/\/www\.google\.com\/search(.*tbm=isch.*)/
            }
        },
        otherSettings = {
            ver: "2020021201",
            grid: "https://assets.pinterest.com/ext/grid.html?" + (new Date).getTime(),
            me: /\/\/assets\.pinterest\.com\/js\/pinmarklet\.js/,
            logType: "pinmarklet",
            log: "https://log.pinterest.com/",
            maxWait: 5e3,
            thumbSize: 237,
            quality: 30,
            hazPinningNow: "data-pinterest-pinmarklet-rendered",
            config: D,
            hashList: E,
            nopeList: F,
            iframeStyle: G,
            msg: errorStrings,
            pattern: domainStrings
        },
        pinterestSettings = {
            override: {},
            config: {
                debug: !1,
                pinMethod: "bookmarklet",
                domain: "www",
                lang: "en"
            },
            data: {
                img: {},
                link: {},
                meta: {},
                script: []
            },
            count: {
                imgLoading: 0,
                apiCalls: 0
            },
            time: {
                start: (new Date).getTime()
            }
        },
        callbackArr = {
            callback: []
        },
        M = "PIN_" + (new Date).getTime(),
        globalData = window[M] = {
            document: document,
            Window: window,
            pinterestSettings: pinterestSettings,
            otherSettings: otherSettings,
            callbackArr: callbackArr
        };
    globalData.otherSettings.k = M;
    var checkTypes = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(a) {
        return typeof a
    } : function(a) {
        return a && "function" === typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
    };
    runBookmarklet()
}();
