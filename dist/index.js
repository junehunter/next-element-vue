import { getCurrentInstance, inject, ref, computed, unref, isRef, defineComponent, createVNode, Fragment, reactive, createTextVNode, resolveComponent, Teleport, isVNode, onUnmounted, provide, watch, markRaw, watchEffect, h, onMounted, toRaw, render, nextTick } from "vue";

import { localeContextKey as localeContextKey$1, ElMessage, ElTooltip, ElScrollbar, ElDivider, ElColorPicker, ElSwitch, ElDropdown, ElIcon, ElDropdownMenu, ElDropdownItem, ElDrawer, ElMenuItem, ElSubMenu, ElMenu, ElContainer, ElCol, ElFormItem, ElInput, ElSelect, ElOption, ElDatePicker, ElInputNumber, ElForm, ElRow, ElButton, ElTable, ElTableColumn, ElCheckbox, ElMessageBox, ElPagination, ElDialog, ElTag, ElRadioGroup, ElRadio, ElUpload, ElImageViewer, ElImage, ElTreeSelect, ElTimeSelect, ElCheckboxGroup, ElEmpty } from "element-plus";

import { useDateFormat, useNow, useFullscreen } from "@vueuse/core";

import * as tf from "@tensorflow/tfjs";

import { MoonNight, Sunny, ArrowDown, Setting, Close, Back, Right, Search, Delete, DArrowLeft, DArrowRight, ArrowUp, Plus, Refresh, Tools, EditPen, View, FullScreen, Picture, InfoFilled, Camera } from "@element-plus/icons-vue";

import videojs from "video.js";

import "video.js/dist/video-js.css";

import zhCN from "video.js/dist/lang/zh-CN.json";

import En from "video.js/dist/lang/en.json";

import zhTW from "video.js/dist/lang/zh-TW.json";

const defaultNamespace = "next", _bem = (namespace, block, blockSuffix, element, modifier) => {
    let cls = `${namespace}-${block}`;
    return blockSuffix && (cls += `-${blockSuffix}`), element && (cls += `__${element}`), 
    modifier && (cls += `--${modifier}`), cls;
}, namespaceContextKey = Symbol("namespaceContextKey"), useGetDerivedNamespace = namespaceOverrides => {
    const derivedNamespace = namespaceOverrides || (getCurrentInstance() ? inject(namespaceContextKey, ref("next")) : ref("next"));
    return computed((() => unref(derivedNamespace) || "next"));
}, useNamespace = (block, namespaceOverrides) => {
    const namespace = useGetDerivedNamespace(namespaceOverrides);
    return {
        namespace: namespace,
        b: (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", ""),
        e: element => element ? _bem(namespace.value, block, "", element, "") : "",
        m: modifier => modifier ? _bem(namespace.value, block, "", "", modifier) : "",
        be: (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "",
        em: (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "",
        bm: (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "",
        bem: (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "",
        bf: (...arg) => {
            let cls = `${namespace.value}-${block}`;
            for (const key in arg) {
                const val = arg[key];
                val && (cls += "-" + val);
            }
            return cls;
        },
        is: (name, ...args) => {
            const state = !(args.length >= 1) || args[0];
            return name && state ? `is-${name}` : "";
        },
        cssVar: object => {
            const styles = {};
            for (const key in object) object[key] && (styles[`--${namespace.value}-${key}`] = object[key]);
            return styles;
        },
        cssVarName: name => `--${namespace.value}-${name}`,
        cssVarBlock: object => {
            const styles = {};
            for (const key in object) object[key] && (styles[`--${namespace.value}-${block}-${key}`] = object[key]);
            return styles;
        },
        cssVarBlockName: name => `--${namespace.value}-${block}-${name}`
    };
};

var freeGlobal = "object" == typeof global && global && global.Object === Object && global, freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")(), Symbol$1 = root.Symbol, objectProto$e = Object.prototype, hasOwnProperty$b = objectProto$e.hasOwnProperty, nativeObjectToString$1 = objectProto$e.toString, symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;

var nativeObjectToString = Object.prototype.toString;

var nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;

function baseGetTag(value) {
    return null == value ? void 0 === value ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? function(value) {
        var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
        try {
            value[symToStringTag$1] = void 0;
            var unmasked = !0;
        } catch (e) {}
        var result = nativeObjectToString$1.call(value);
        return unmasked && (isOwn ? value[symToStringTag$1] = tag : delete value[symToStringTag$1]), 
        result;
    }(value) : function(value) {
        return nativeObjectToString.call(value);
    }(value);
}

function isObjectLike(value) {
    return null != value && "object" == typeof value;
}

var symbolTag$1 = "[object Symbol]";

function isSymbol(value) {
    return "symbol" == typeof value || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
}

var isArray = Array.isArray, INFINITY$1 = 1 / 0, symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;

function baseToString(value) {
    if ("string" == typeof value) return value;
    if (isArray(value)) return function(array, iteratee) {
        for (var index = -1, length = null == array ? 0 : array.length, result = Array(length); ++index < length; ) result[index] = iteratee(array[index], index, array);
        return result;
    }(value, baseToString) + "";
    if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
    var result = value + "";
    return "0" == result && 1 / value == -INFINITY$1 ? "-0" : result;
}

function isObject(value) {
    var type = typeof value;
    return null != value && ("object" == type || "function" == type);
}

function identity(value) {
    return value;
}

var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";

function isFunction(value) {
    if (!isObject(value)) return !1;
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var uid, coreJsData = root["__core-js_shared__"], maskSrcKey = (uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "")) ? "Symbol(src)_1." + uid : "";

var funcToString$2 = Function.prototype.toString;

function toSource(func) {
    if (null != func) {
        try {
            return funcToString$2.call(func);
        } catch (e) {}
        try {
            return func + "";
        } catch (e) {}
    }
    return "";
}

var reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto$1 = Function.prototype, objectProto$c = Object.prototype, funcToString$1 = funcProto$1.toString, hasOwnProperty$a = objectProto$c.hasOwnProperty, reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$a).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

function baseIsNative(value) {
    return !(!isObject(value) || (func = value, maskSrcKey && maskSrcKey in func)) && (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
    var func;
}

function getNative(object, key) {
    var value = function(object, key) {
        return null == object ? void 0 : object[key];
    }(object, key);
    return baseIsNative(value) ? value : void 0;
}

var WeakMap = getNative(root, "WeakMap"), objectCreate = Object.create, baseCreate = function() {
    function object() {}
    return function(proto) {
        if (!isObject(proto)) return {};
        if (objectCreate) return objectCreate(proto);
        object.prototype = proto;
        var result = new object;
        return object.prototype = void 0, result;
    };
}();

var nativeNow = Date.now;

var func, count, lastCalled, defineProperty = function() {
    try {
        var func = getNative(Object, "defineProperty");
        return func({}, "", {}), func;
    } catch (e) {}
}(), baseSetToString = defineProperty ? function(func, string) {
    return defineProperty(func, "toString", {
        configurable: !0,
        enumerable: !1,
        value: (value = string, function() {
            return value;
        }),
        writable: !0
    });
    var value;
} : identity, setToString = (func = baseSetToString, count = 0, lastCalled = 0, 
function() {
    var stamp = nativeNow(), remaining = 16 - (stamp - lastCalled);
    if (lastCalled = stamp, remaining > 0) {
        if (++count >= 800) return arguments[0];
    } else count = 0;
    return func.apply(void 0, arguments);
}), MAX_SAFE_INTEGER$1 = 9007199254740991, reIsUint = /^(?:0|[1-9]\d*)$/;

function isIndex(value, length) {
    var type = typeof value;
    return !!(length = null == length ? MAX_SAFE_INTEGER$1 : length) && ("number" == type || "symbol" != type && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

function baseAssignValue(object, key, value) {
    "__proto__" == key && defineProperty ? defineProperty(object, key, {
        configurable: !0,
        enumerable: !0,
        value: value,
        writable: !0
    }) : object[key] = value;
}

function eq(value, other) {
    return value === other || value != value && other != other;
}

var hasOwnProperty$9 = Object.prototype.hasOwnProperty;

function assignValue(object, key, value) {
    var objValue = object[key];
    hasOwnProperty$9.call(object, key) && eq(objValue, value) && (void 0 !== value || key in object) || baseAssignValue(object, key, value);
}

var nativeMax = Math.max;

function baseRest(func, start) {
    return setToString(function(func, start, transform) {
        return start = nativeMax(void 0 === start ? func.length - 1 : start, 0), function() {
            for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length; ) array[index] = args[start + index];
            index = -1;
            for (var otherArgs = Array(start + 1); ++index < start; ) otherArgs[index] = args[index];
            return otherArgs[start] = transform(array), function(func, thisArg, args) {
                switch (args.length) {
                  case 0:
                    return func.call(thisArg);

                  case 1:
                    return func.call(thisArg, args[0]);

                  case 2:
                    return func.call(thisArg, args[0], args[1]);

                  case 3:
                    return func.call(thisArg, args[0], args[1], args[2]);
                }
                return func.apply(thisArg, args);
            }(func, this, otherArgs);
        };
    }(func, start, identity), func + "");
}

var MAX_SAFE_INTEGER = 9007199254740991;

function isLength(value) {
    return "number" == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

function isArrayLike(value) {
    return null != value && isLength(value.length) && !isFunction(value);
}

function createAssigner(assigner) {
    return baseRest((function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        for (customizer = assigner.length > 3 && "function" == typeof customizer ? (length--, 
        customizer) : void 0, guard && function(value, index, object) {
            if (!isObject(object)) return !1;
            var type = typeof index;
            return !!("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) && eq(object[index], value);
        }(sources[0], sources[1], guard) && (customizer = length < 3 ? void 0 : customizer, 
        length = 1), object = Object(object); ++index < length; ) {
            var source = sources[index];
            source && assigner(object, source, index, customizer);
        }
        return object;
    }));
}

var objectProto$a = Object.prototype;

function isPrototype(value) {
    var Ctor = value && value.constructor;
    return value === ("function" == typeof Ctor && Ctor.prototype || objectProto$a);
}

function baseIsArguments(value) {
    return isObjectLike(value) && "[object Arguments]" == baseGetTag(value);
}

var objectProto$9 = Object.prototype, hasOwnProperty$8 = objectProto$9.hasOwnProperty, propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable, isArguments$1 = baseIsArguments(function() {
    return arguments;
}()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};

var freeExports$2 = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule$2 = freeExports$2 && "object" == typeof module && module && !module.nodeType && module, Buffer$1 = freeModule$2 && freeModule$2.exports === freeExports$2 ? root.Buffer : void 0, isBuffer = (Buffer$1 ? Buffer$1.isBuffer : void 0) || function() {
    return !1;
}, typedArrayTags = {};

typedArrayTags["[object Float32Array]"] = typedArrayTags["[object Float64Array]"] = typedArrayTags["[object Int8Array]"] = typedArrayTags["[object Int16Array]"] = typedArrayTags["[object Int32Array]"] = typedArrayTags["[object Uint8Array]"] = typedArrayTags["[object Uint8ClampedArray]"] = typedArrayTags["[object Uint16Array]"] = typedArrayTags["[object Uint32Array]"] = !0, 
typedArrayTags["[object Arguments]"] = typedArrayTags["[object Array]"] = typedArrayTags["[object ArrayBuffer]"] = typedArrayTags["[object Boolean]"] = typedArrayTags["[object DataView]"] = typedArrayTags["[object Date]"] = typedArrayTags["[object Error]"] = typedArrayTags["[object Function]"] = typedArrayTags["[object Map]"] = typedArrayTags["[object Number]"] = typedArrayTags["[object Object]"] = typedArrayTags["[object RegExp]"] = typedArrayTags["[object Set]"] = typedArrayTags["[object String]"] = typedArrayTags["[object WeakMap]"] = !1;

var freeExports$1 = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule$1 = freeExports$1 && "object" == typeof module && module && !module.nodeType && module, freeProcess = freeModule$1 && freeModule$1.exports === freeExports$1 && freeGlobal.process, nodeUtil = function() {
    try {
        var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
        return types || freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {}
}(), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? function(func) {
    return function(value) {
        return func(value);
    };
}(nodeIsTypedArray) : function(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}, hasOwnProperty$7 = Object.prototype.hasOwnProperty;

function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? function(n, iteratee) {
        for (var index = -1, result = Array(n); ++index < n; ) result[index] = iteratee(index);
        return result;
    }(value.length, String) : [], length = result.length;
    for (var key in value) !inherited && !hasOwnProperty$7.call(value, key) || skipIndexes && ("length" == key || isBuff && ("offset" == key || "parent" == key) || isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || isIndex(key, length)) || result.push(key);
    return result;
}

function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}

var nativeKeys = overArg(Object.keys, Object), hasOwnProperty$6 = Object.prototype.hasOwnProperty;

function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : function(object) {
        if (!isPrototype(object)) return nativeKeys(object);
        var result = [];
        for (var key in Object(object)) hasOwnProperty$6.call(object, key) && "constructor" != key && result.push(key);
        return result;
    }(object);
}

var hasOwnProperty$5 = Object.prototype.hasOwnProperty;

function baseKeysIn(object) {
    if (!isObject(object)) return function(object) {
        var result = [];
        if (null != object) for (var key in Object(object)) result.push(key);
        return result;
    }(object);
    var isProto = isPrototype(object), result = [];
    for (var key in object) ("constructor" != key || !isProto && hasOwnProperty$5.call(object, key)) && result.push(key);
    return result;
}

function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, !0) : baseKeysIn(object);
}

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;

var nativeCreate = getNative(Object, "create");

var hasOwnProperty$4 = Object.prototype.hasOwnProperty;

var hasOwnProperty$3 = Object.prototype.hasOwnProperty;

function Hash(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

function assocIndexOf(array, key) {
    for (var length = array.length; length--; ) if (eq(array[length][0], key)) return length;
    return -1;
}

Hash.prototype.clear = function() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
}, Hash.prototype.delete = function(key) {
    var result = this.has(key) && delete this.__data__[key];
    return this.size -= result ? 1 : 0, result;
}, Hash.prototype.get = function(key) {
    var data = this.__data__;
    if (nativeCreate) {
        var result = data[key];
        return "__lodash_hash_undefined__" === result ? void 0 : result;
    }
    return hasOwnProperty$4.call(data, key) ? data[key] : void 0;
}, Hash.prototype.has = function(key) {
    var data = this.__data__;
    return nativeCreate ? void 0 !== data[key] : hasOwnProperty$3.call(data, key);
}, Hash.prototype.set = function(key, value) {
    var data = this.__data__;
    return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && void 0 === value ? "__lodash_hash_undefined__" : value, 
    this;
};

var splice = Array.prototype.splice;

function ListCache(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

ListCache.prototype.clear = function() {
    this.__data__ = [], this.size = 0;
}, ListCache.prototype.delete = function(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return !(index < 0) && (index == data.length - 1 ? data.pop() : splice.call(data, index, 1), 
    --this.size, !0);
}, ListCache.prototype.get = function(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
}, ListCache.prototype.has = function(key) {
    return assocIndexOf(this.__data__, key) > -1;
}, ListCache.prototype.set = function(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? (++this.size, data.push([ key, value ])) : data[index][1] = value, 
    this;
};

var Map$1 = getNative(root, "Map");

function getMapData(map, key) {
    var value, type, data = map.__data__;
    return ("string" == (type = typeof (value = key)) || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value) ? data["string" == typeof key ? "string" : "hash"] : data.map;
}

function MapCache(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

MapCache.prototype.clear = function() {
    this.size = 0, this.__data__ = {
        hash: new Hash,
        map: new (Map$1 || ListCache),
        string: new Hash
    };
}, MapCache.prototype.delete = function(key) {
    var result = getMapData(this, key).delete(key);
    return this.size -= result ? 1 : 0, result;
}, MapCache.prototype.get = function(key) {
    return getMapData(this, key).get(key);
}, MapCache.prototype.has = function(key) {
    return getMapData(this, key).has(key);
}, MapCache.prototype.set = function(key, value) {
    var data = getMapData(this, key), size = data.size;
    return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
};

var FUNC_ERROR_TEXT = "Expected a function";

function memoize(func, resolver) {
    if ("function" != typeof func || null != resolver && "function" != typeof resolver) throw new TypeError(FUNC_ERROR_TEXT);
    var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) return cache.get(key);
        var result = func.apply(this, args);
        return memoized.cache = cache.set(key, result) || cache, result;
    };
    return memoized.cache = new (memoize.Cache || MapCache), memoized;
}

memoize.Cache = MapCache;

var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = function(func) {
    var result = memoize(func, (function(key) {
        return 500 === cache.size && cache.clear(), key;
    })), cache = result.cache;
    return result;
}((function(string) {
    var result = [];
    return 46 === string.charCodeAt(0) && result.push(""), string.replace(rePropName, (function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    })), result;
}));

function castPath(value, object) {
    return isArray(value) ? value : function(value, object) {
        if (isArray(value)) return !1;
        var type = typeof value;
        return !("number" != type && "symbol" != type && "boolean" != type && null != value && !isSymbol(value)) || reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object);
    }(value, object) ? [ value ] : stringToPath(function(value) {
        return null == value ? "" : baseToString(value);
    }(value));
}

var INFINITY = 1 / 0;

function toKey(value) {
    if ("string" == typeof value || isSymbol(value)) return value;
    var result = value + "";
    return "0" == result && 1 / value == -INFINITY ? "-0" : result;
}

function get(object, path, defaultValue) {
    var result = null == object ? void 0 : function(object, path) {
        for (var index = 0, length = (path = castPath(path, object)).length; null != object && index < length; ) object = object[toKey(path[index++])];
        return index && index == length ? object : void 0;
    }(object, path);
    return void 0 === result ? defaultValue : result;
}

var getPrototype = overArg(Object.getPrototypeOf, Object), objectTag$2 = "[object Object]", funcProto = Function.prototype, objectProto$3 = Object.prototype, funcToString = funcProto.toString, hasOwnProperty$2 = objectProto$3.hasOwnProperty, objectCtorString = funcToString.call(Object);

function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
}

Stack.prototype.clear = function() {
    this.__data__ = new ListCache, this.size = 0;
}, Stack.prototype.delete = function(key) {
    var data = this.__data__, result = data.delete(key);
    return this.size = data.size, result;
}, Stack.prototype.get = function(key) {
    return this.__data__.get(key);
}, Stack.prototype.has = function(key) {
    return this.__data__.has(key);
}, Stack.prototype.set = function(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map$1 || pairs.length < 199) return pairs.push([ key, value ]), this.size = ++data.size, 
        this;
        data = this.__data__ = new MapCache(pairs);
    }
    return data.set(key, value), this.size = data.size, this;
};

var freeExports = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;

var propertyIsEnumerable = Object.prototype.propertyIsEnumerable, nativeGetSymbols = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols ? function(object) {
    return null == object ? [] : (object = Object(object), function(array, predicate) {
        for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
            var value = array[index];
            predicate(value, index, array) && (result[resIndex++] = value);
        }
        return result;
    }(nativeGetSymbols(object), (function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
    })));
} : function() {
    return [];
}, getSymbols$1 = getSymbols;

function getAllKeys(object) {
    return function(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : function(array, values) {
            for (var index = -1, length = values.length, offset = array.length; ++index < length; ) array[offset + index] = values[index];
            return array;
        }(result, symbolsFunc(object));
    }(object, keys, getSymbols$1);
}

var DataView$1 = getNative(root, "DataView"), Promise$1 = getNative(root, "Promise"), Set = getNative(root, "Set"), dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap), getTag = baseGetTag;

(DataView$1 && "[object DataView]" != getTag(new DataView$1(new ArrayBuffer(1))) || Map$1 && "[object Map]" != getTag(new Map$1) || Promise$1 && "[object Promise]" != getTag(Promise$1.resolve()) || Set && "[object Set]" != getTag(new Set) || WeakMap && "[object WeakMap]" != getTag(new WeakMap)) && (getTag = function(value) {
    var result = baseGetTag(value), Ctor = "[object Object]" == result ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) switch (ctorString) {
      case dataViewCtorString:
        return "[object DataView]";

      case mapCtorString:
        return "[object Map]";

      case promiseCtorString:
        return "[object Promise]";

      case setCtorString:
        return "[object Set]";

      case weakMapCtorString:
        return "[object WeakMap]";
    }
    return result;
});

var getTag$1 = getTag, Uint8Array$2 = root.Uint8Array;

function cloneTypedArray(typedArray, isDeep) {
    var arrayBuffer, result, buffer = isDeep ? (arrayBuffer = typedArray.buffer, result = new arrayBuffer.constructor(arrayBuffer.byteLength), 
    new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer)), result) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

function SetCache(values) {
    var index = -1, length = null == values ? 0 : values.length;
    for (this.__data__ = new MapCache; ++index < length; ) this.add(values[index]);
}

function arraySome(array, predicate) {
    for (var index = -1, length = null == array ? 0 : array.length; ++index < length; ) if (predicate(array[index], index, array)) return !0;
    return !1;
}

SetCache.prototype.add = SetCache.prototype.push = function(value) {
    return this.__data__.set(value, "__lodash_hash_undefined__"), this;
}, SetCache.prototype.has = function(value) {
    return this.__data__.has(value);
};

var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) return !1;
    var arrStacked = stack.get(array), othStacked = stack.get(other);
    if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
    var index = -1, result = !0, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache : void 0;
    for (stack.set(array, other), stack.set(other, array); ++index < arrLength; ) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        if (void 0 !== compared) {
            if (compared) continue;
            result = !1;
            break;
        }
        if (seen) {
            if (!arraySome(other, (function(othValue, othIndex) {
                if (key = othIndex, !seen.has(key) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
                var key;
            }))) {
                result = !1;
                break;
            }
        } else if (arrValue !== othValue && !equalFunc(arrValue, othValue, bitmask, customizer, stack)) {
            result = !1;
            break;
        }
    }
    return stack.delete(array), stack.delete(other), result;
}

function mapToArray(map) {
    var index = -1, result = Array(map.size);
    return map.forEach((function(value, key) {
        result[++index] = [ key, value ];
    })), result;
}

function setToArray(set) {
    var index = -1, result = Array(set.size);
    return set.forEach((function(value) {
        result[++index] = value;
    })), result;
}

var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2, boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;

var COMPARE_PARTIAL_FLAG$1 = 1, hasOwnProperty$1 = Object.prototype.hasOwnProperty;

var COMPARE_PARTIAL_FLAG = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", hasOwnProperty = Object.prototype.hasOwnProperty;

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other), objIsObj = (objTag = objTag == argsTag ? objectTag : objTag) == objectTag, othIsObj = (othTag = othTag == argsTag ? objectTag : othTag) == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) return !1;
        objIsArr = !0, objIsObj = !1;
    }
    if (isSameTag && !objIsObj) return stack || (stack = new Stack), objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : function(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return !1;
            object = object.buffer, other = other.buffer;

          case arrayBufferTag:
            return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array$2(object), new Uint8Array$2(other)));

          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);

          case errorTag:
            return object.name == other.name && object.message == other.message;

          case regexpTag:
          case stringTag$1:
            return object == other + "";

          case mapTag:
            var convert = mapToArray;

          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
            if (convert || (convert = setToArray), object.size != other.size && !isPartial) return !1;
            var stacked = stack.get(object);
            if (stacked) return stacked == other;
            bitmask |= COMPARE_UNORDERED_FLAG, stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            return stack.delete(object), result;

          case symbolTag:
            if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
        return !1;
    }(object, other, objTag, bitmask, customizer, equalFunc, stack);
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            return stack || (stack = new Stack), equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
    }
    return !!isSameTag && (stack || (stack = new Stack), function(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length;
        if (objLength != getAllKeys(other).length && !isPartial) return !1;
        for (var index = objLength; index--; ) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) return !1;
        }
        var objStacked = stack.get(object), othStacked = stack.get(other);
        if (objStacked && othStacked) return objStacked == other && othStacked == object;
        var result = !0;
        stack.set(object, other), stack.set(other, object);
        for (var skipCtor = isPartial; ++index < objLength; ) {
            var objValue = object[key = objProps[index]], othValue = other[key];
            if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            if (!(void 0 === compared ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result = !1;
                break;
            }
            skipCtor || (skipCtor = "constructor" == key);
        }
        if (result && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            objCtor == othCtor || !("constructor" in object) || !("constructor" in other) || "function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor || (result = !1);
        }
        return stack.delete(object), stack.delete(other), result;
    }(object, other, bitmask, customizer, equalFunc, stack));
}

function baseIsEqual(value, other, bitmask, customizer, stack) {
    return value === other || (null == value || null == other || !isObjectLike(value) && !isObjectLike(other) ? value != value && other != other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack));
}

var fromRight, baseFor = function(object, iteratee, keysFunc) {
    for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--; ) {
        var key = props[fromRight ? length : ++index];
        if (!1 === iteratee(iterable[key], key, iterable)) break;
    }
    return object;
};

function assignMergeValue(object, key, value) {
    (void 0 !== value && !eq(object[key], value) || void 0 === value && !(key in object)) && baseAssignValue(object, key, value);
}

function safeGet(object, key) {
    if (("constructor" !== key || "function" != typeof object[key]) && "__proto__" != key) return object[key];
}

function toPlainObject(value) {
    return function(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        for (var index = -1, length = props.length; ++index < length; ) {
            var key = props[index], newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
            void 0 === newValue && (newValue = source[key]), isNew ? baseAssignValue(object, key, newValue) : assignValue(object, key, newValue);
        }
        return object;
    }(value, keysIn(value));
}

function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
    if (stacked) assignMergeValue(object, key, stacked); else {
        var value, newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0, isCommon = void 0 === newValue;
        if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue, isArr || isBuff || isTyped ? isArray(objValue) ? newValue = objValue : isObjectLike(value = objValue) && isArrayLike(value) ? newValue = function(source, array) {
                var index = -1, length = source.length;
                for (array || (array = Array(length)); ++index < length; ) array[index] = source[index];
                return array;
            }(objValue) : isBuff ? (isCommon = !1, newValue = function(buffer, isDeep) {
                if (isDeep) return buffer.slice();
                var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
                return buffer.copy(result), result;
            }(srcValue, !0)) : isTyped ? (isCommon = !1, newValue = cloneTypedArray(srcValue, !0)) : newValue = [] : function(value) {
                if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) return !1;
                var proto = getPrototype(value);
                if (null === proto) return !0;
                var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
                return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
            }(srcValue) || isArguments$1(srcValue) ? (newValue = objValue, isArguments$1(objValue) ? newValue = toPlainObject(objValue) : isObject(objValue) && !isFunction(objValue) || (newValue = function(object) {
                return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate(getPrototype(object));
            }(srcValue))) : isCommon = !1;
        }
        isCommon && (stack.set(srcValue, newValue), mergeFunc(newValue, srcValue, srcIndex, customizer, stack), 
        stack.delete(srcValue)), assignMergeValue(object, key, newValue);
    }
}

function baseMerge(object, source, srcIndex, customizer, stack) {
    object !== source && baseFor(source, (function(srcValue, key) {
        if (stack || (stack = new Stack), isObject(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack); else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
            void 0 === newValue && (newValue = srcValue), assignMergeValue(object, key, newValue);
        }
    }), keysIn);
}

var mergeWith = createAssigner((function(object, source, srcIndex, customizer) {
    baseMerge(object, source, srcIndex, customizer);
}));

var merge = createAssigner((function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
})), merge$1 = merge, zhcnLocale = {
    name: "zh-cn",
    next: {
        loading: "加载中...",
        table: {
            search: "查询",
            clear: "清空",
            add: "新增",
            delete: "删除",
            batchDelete: "批量删除",
            export: "导出",
            edit: "编辑",
            view: "查看",
            unfoldSearch: "展开搜索",
            foldSearch: "收起搜索",
            notData: "暂无数据",
            operation: "操作",
            selection: "选择",
            selectionAll: "全选",
            setting: {
                title: "设置列",
                label: "列名",
                hide: "隐藏",
                filter: "筛选",
                sort: "排序"
            },
            message: {
                tip: "提示",
                batchDeleteTip: "您确定要批量删除吗?",
                cancelBatchDelete: "取消批量删除操作",
                deleteTip: "您确定要删除该数据吗?",
                cancelDelete: "取消删除操作",
                confirmButtonText: "确 定",
                cancelButtonText: "取 消"
            }
        },
        form: {
            input: "请输入",
            select: "请选择",
            requiredInput: " 必填",
            requiredSelect: " 必选",
            submit: "提 交",
            cancel: "取 消",
            reset: "重 置",
            confirm: "确 定",
            tableSelect: " 选择",
            selectFile: "选择文件"
        },
        date: {
            oneWeekAge: "一周以前",
            oneMonthAge: "一个月以前",
            threeMonthsAge: "三个月以前",
            oneYearAge: "一年以前",
            threeYearsAge: "三年以前",
            rangeSeparator: "至",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间"
        },
        layout: {
            home: "首页",
            personal: "个人中心",
            logOut: "退出登录",
            tabsOther: "关闭其他",
            tabsLeft: "关闭左侧",
            tabsRight: "关闭右侧",
            tabsAll: "关闭全部",
            systemSetting: "系统配置"
        }
    }
}, enLocale = {
    name: "en",
    next: {
        loading: "loading...",
        table: {
            search: "search",
            clear: "clear",
            add: "add",
            delete: "del",
            batchDelete: "batch delete",
            export: "export",
            edit: "edit",
            view: "view",
            unfoldSearch: "unfold search",
            foldSearch: "fold search",
            notData: "not data",
            operation: "operations",
            selection: "selection",
            selectionAll: "select all",
            setting: {
                title: "column setting",
                label: "column name",
                hide: "hide",
                filter: "filter",
                sort: "srot"
            },
            message: {
                tip: "tip",
                batchDeleteTip: "Are you sure you want to delete them in bulk ?",
                cancelBatchDelete: "Cancel batch deletion",
                deleteTip: "Are you sure you want to delete this data ?",
                cancelDelete: "Cancel delete",
                confirmButtonText: "OK",
                cancelButtonText: "Cancel"
            }
        },
        form: {
            input: "please input ",
            select: "please select ",
            requiredInput: " required",
            requiredSelect: " required",
            submit: "Submit",
            cancel: "Cancel",
            reset: "reset",
            confirm: "confirm",
            tableSelect: " select",
            selectFile: "select file"
        },
        date: {
            oneWeekAge: "one week age",
            oneMonthAge: "one month age",
            threeMonthsAge: "three months age",
            oneYearAge: "one year age",
            threeYearsAge: "three years age",
            rangeSeparator: "to",
            startPlaceholder: "start time",
            endPlaceholder: "end time"
        },
        layout: {
            home: "Home",
            personal: "Personal",
            logOut: "LogOut",
            tabsOther: "close other",
            tabsLeft: "close left",
            tabsRight: "close right",
            tabsAll: "close all",
            systemSetting: "system setting"
        }
    }
}, zhtwLocale = {
    name: "zh-tw",
    next: {
        loading: "加載中...",
        table: {
            search: "查詢",
            clear: "清空",
            add: "新增",
            delete: "刪除",
            batchDelete: "批量刪除",
            export: "導出",
            edit: "編輯",
            view: "查看",
            unfoldSearch: "展開搜索",
            foldSearch: "收起搜索",
            notData: "暫無數據",
            operation: "操作",
            selection: "选择",
            selectionAll: "全选",
            setting: {
                title: "設置列",
                label: "列名",
                hide: "隱藏",
                filter: "篩選",
                sort: "排序"
            },
            message: {
                tip: "提示",
                batchDeleteTip: "您確定要批量刪除嗎?",
                cancelBatchDelete: "取消批量刪除操作",
                deleteTip: "您确定要删除该数据吗?",
                cancelDelete: "取消删除操作",
                confirmButtonText: "確 定",
                cancelButtonText: "取 消"
            }
        },
        form: {
            input: "請輸入",
            select: "請選擇",
            requiredInput: " 必填",
            requiredSelect: " 必選",
            submit: "提 交",
            cancel: "取 消",
            reset: "重 置",
            confirm: "确 定",
            tableSelect: " 選擇",
            selectFile: "選擇文件"
        },
        date: {
            oneWeekAge: "一周以前",
            oneMonthAge: "一个月以前",
            threeMonthsAge: "三个月以前",
            oneYearAge: "一年以前",
            threeYearsAge: "三年以前",
            rangeSeparator: "至",
            startPlaceholder: "開始時間",
            endPlaceholder: "結束時間"
        },
        layout: {
            home: "首頁",
            personal: "個人中心",
            logOut: "退出登錄",
            tabsOther: "關閉其他",
            tabsLeft: "關閉左側",
            tabsRight: "關閉右側",
            tabsAll: "關閉全部",
            systemSetting: "系統配置"
        }
    }
};

const localeLang = {
    [zhcnLocale.name]: {
        ...zhcnLocale
    },
    [enLocale.name]: {
        ...enLocale
    },
    [zhtwLocale.name]: {
        ...zhtwLocale
    }
}, translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, ((_, key) => `${option?.[key] ?? `{${key}}`}`)), buildTranslator = locale => (path, option) => translate(path, option, unref(locale)), buildLocaleContext = locale => {
    const lang = computed((() => unref(locale).name)), localeRef = isRef(locale) ? locale : ref(locale), nextLang = localeLang[lang.value] || localeLang["zh-cn"];
    return localeRef.value.next = nextLang.next, {
        lang: lang,
        locale: localeRef,
        t: buildTranslator(locale)
    };
}, localeContextKey = localeContextKey$1, useLocale = localeOverrides => {
    const locale = localeOverrides || inject(localeContextKey, ref());
    return buildLocaleContext(computed((() => locale?.value || zhcnLocale)));
}, useLanguage = (locale, lang) => {
    const localeRef = isRef(locale) ? locale : ref(locale), nextLang = localeLang[lang] || localeLang["zh-cn"];
    localeRef.value.name = lang, localeRef.value.next = nextLang.next;
};

function useChangeColor() {
    return {
        hexToRgb: str => {
            let hexs = "";
            if (!/^\#?[0-9A-Fa-f]{6}$/.test(str)) return ElMessage.warning("输入错误的hex"), "";
            hexs = (str = str.replace("#", "")).match(/../g);
            for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
            return hexs;
        },
        rgbToHex: (r, g, b) => {
            let reg = /^\d{1,3}$/;
            if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return ElMessage.warning("输入错误的rgb颜色值"), 
            "";
            let hexs = [ r.toString(16), g.toString(16), b.toString(16) ];
            for (let i = 0; i < 3; i++) 1 == hexs[i].length && (hexs[i] = `0${hexs[i]}`);
            return `#${hexs.join("")}`;
        },
        getDarkColor: (color, level) => {
            if (!/^\#?[0-9A-Fa-f]{6}$/.test(color)) return ElMessage.warning("输入错误的hex颜色值"), 
            "";
            let rgb = useChangeColor().hexToRgb(color);
            for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level));
            return useChangeColor().rgbToHex(rgb[0], rgb[1], rgb[2]);
        },
        getLightColor: (color, level) => {
            if (!/^\#?[0-9A-Fa-f]{6}$/.test(color)) return ElMessage.warning("输入错误的hex颜色值"), 
            "";
            let rgb = useChangeColor().hexToRgb(color);
            for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
            return useChangeColor().rgbToHex(rgb[0], rgb[1], rgb[2]);
        }
    };
}

const {getLightColor: getLightColor$4} = useChangeColor(), nextUseCssVar = (cssvar, value) => {
    document.documentElement.style.setProperty(cssvar, value);
}, nextUseCssTheme = (cssvar, value) => {
    nextUseCssVar(cssvar, value);
    for (let i = 1; i < 10; i++) nextUseCssVar(cssvar + "-light-" + i, getLightColor$4(value, i / 10));
    nextUseCssVar(`${cssvar}-dark-2`, value);
}, updateThemeColor = color => {
    color && nextUseCssTheme("--el-color-primary", color);
}, themeColorCssEnum = {
    themeColor: "--el-color-primary",
    headerBarColor: "--next-layout-bg-color",
    headerBarFontColor: "--next-layout-font-color"
}, updateThemeColorCssVar = conf => {
    for (const key in themeColorCssEnum) {
        const cssVar = themeColorCssEnum[key];
        conf[key] && nextUseCssTheme(cssVar, conf[key]);
    }
    const body = document.documentElement;
    conf.isDark ? body.setAttribute("data-theme", "dark") : body.setAttribute("data-theme", "");
}, detectVideoFrame = async (video, model, ctx, tf, classNames, classInput = [], detect_ctx, success) => {
    const {videoWidth: videoWidth, videoHeight: videoHeight} = video;
    if (!videoWidth || !videoHeight) return;
    let [modelWeight, modelHeight] = model.inputs[0].shape.slice(1, 3), input = tf.tidy((() => tf.image.resizeBilinear(tf.browser.fromPixels(video), [ modelWeight, modelHeight ]).div(255).expandDims(0)));
    ctx.clearRect(0, 0, videoWidth, videoHeight), detect_ctx.clearRect(0, 0, videoWidth, videoHeight), 
    await model.executeAsync(input).then((async res => {
        let [boxes, scores, classes, valid_detections] = res;
        for (let i = 0; i < valid_detections.dataSync()[0]; ++i) {
            let [x0, y0, x1, y1] = boxes.dataSync().slice(4 * i, 4 * (i + 1));
            x0 = x0 < 0 || x0 > 1 ? parseInt(x0) : x0, x1 = x1 < 0 || x1 > 1 ? parseInt(x1) : x1, 
            y0 = y0 < 0 || y0 > 1 ? parseInt(y0) : y0, y1 = y1 < 0 || y1 > 1 ? parseInt(y1) : y1, 
            x0 = Math.round(Math.abs(x0) * videoWidth), x1 = Math.round(Math.abs(x1) * videoWidth), 
            y0 = Math.round(Math.abs(y0) * videoHeight), y1 = Math.round(Math.abs(y1) * videoHeight);
            const width = x1 - x0, height = y1 - y0, left = x0, top = y0;
            let cls = classes.dataSync()[i], score = scores.dataSync()[i].toFixed(2);
            const drawOutcome = (name, score, ctx) => {
                const color = `#${(1 << 24 | Math.floor(256 * Math.random()) << 16 | Math.floor(256 * Math.random()) << 8 | Math.floor(256 * Math.random())).toString(16).slice(1)}`;
                ctx.strokeStyle = color, ctx.lineWidth = 2, ctx.beginPath(), ctx.rect(left, top, width, height), 
                ctx.stroke(), ctx.font = "bold 16px Arial", ctx.fillStyle = color, ctx.fillText(`${name} ${score}`, left + 10, top < 20 ? 20 : top - 10);
            };
            if (classInput?.length) for (let k = 0; k < classInput.length; k++) {
                const item = classInput[k];
                if (item.cls == cls && Number(score) > item.score) {
                    const target = classNames.find((o => o.value == cls));
                    if (target) {
                        const name = target.label;
                        drawOutcome(name, score, await drawVideoFrame(video, detect_ctx)), drawOutcome(name, score, ctx), 
                        success && success(name, score);
                    }
                }
            } else if (score > .5) {
                const target = classNames.find((o => o.value == cls));
                if (target) {
                    drawOutcome(target.label || "", score, ctx);
                }
            }
        }
        input.dispose(), tf.dispose(res);
    }));
}, drawVideoFrame = (videoElement, ctx) => {
    const width = videoElement.videoWidth, height = videoElement.videoHeight, mediaRatio = width / height, canvasRatio = width / height, sw = width, sh = height;
    let dx, dy, dw, dh;
    return mediaRatio > canvasRatio ? (dw = width, dh = width / mediaRatio, dx = 0, 
    dy = Math.round((height - dh) / 2)) : mediaRatio === canvasRatio ? (dw = width, 
    dh = height, dx = 0, dy = 0) : mediaRatio < canvasRatio && (dw = height * mediaRatio, 
    dh = height, dx = Math.round((width - dw) / 2), dy = 0), ctx.drawImage(videoElement, 0, 0, sw, sh, dx, dy, dw, dh), 
    ctx;
}, useDetectVideo = () => ({
    detectVideoFrameImage: ({container: container, video: video, modelUrl: modelUrl, classNames: classNames, classInput: classInput = []}, success, error) => modelUrl ? classNames ? void tf.loadGraphModel(modelUrl).then((model => {
        const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
        canvas.style.position = "absolute", canvas.style.zIndex = "99", canvas.style.pointerEvents = "none", 
        container && container.appendChild(canvas);
        const detectCanvas = document.createElement("canvas"), detect_ctx = detectCanvas.getContext("2d");
        video.ontimeupdate = e => {
            const {clientWidth: clientWidth, clientHeight: clientHeight} = e.target, {videoWidth: videoWidth, videoHeight: videoHeight, offsetTop: offsetTop, offsetLeft: offsetLeft} = video;
            canvas.width = videoWidth, canvas.height = videoHeight, canvas.style.top = offsetTop + "px", 
            canvas.style.left = offsetLeft + "px", canvas.style.width = clientWidth + "px", 
            canvas.style.height = clientHeight + "px", detectCanvas.width = videoWidth, detectCanvas.height = videoHeight, 
            detectCanvas.style.width = clientWidth + "px", detectCanvas.style.height = clientHeight + "px", 
            detectVideoFrame(video, model, ctx, tf, classNames, classInput, detect_ctx, ((name, score) => {
                const type = "image/png";
                let imageDataURL = canvas.toDataURL(type, .92).replace(type, "image/octet-stream");
                imageDataURL = imageDataURL.replace(/^data:image\/[^;]+/, "data:application/octet-stream");
                const detectImage = detectCanvas.toDataURL(type, .92);
                success && success({
                    name: name,
                    score: score,
                    detectImage: detectImage,
                    detectCanvas: detectCanvas
                }, {
                    canvas: canvas,
                    imageDataURL: imageDataURL
                });
            }));
        };
    })) : (error && error("模型类别不能未空"), !1) : (error && error("模型文件地址不能为空"), !1)
}), withInstall = (main, extra) => {
    if (main.install = app => {
        for (const comp of [ main, ...Object.values(extra ?? {}) ]) app.component(comp.name, comp);
    }, extra) for (const [key, comp] of Object.entries(extra)) main[key] = comp;
    return main;
}, slots_config_headerMenu = "header-menu", slots_config_headerToolsPrefix = "header-tools-prefix", slots_config_headerToolsSuffix = "header-tools-suffix";

var defaultConfig$2 = {
    logo: "",
    title: "Next Element Vue",
    userName: "Admin",
    language: "zh-cn",
    languageDropdown: [ {
        value: "zh-cn",
        label: "简体中文"
    }, {
        value: "en",
        label: "English"
    }, {
        value: "zh-tw",
        label: "繁體中文"
    } ],
    userDropdown: [ {
        value: "/",
        label: "next.layout.home"
    }, {
        value: "/personal",
        label: "next.layout.personal"
    }, {
        value: "logOut",
        label: "next.layout.logOut",
        divided: !0
    } ],
    showTabs: !0,
    activeTab: "/",
    tabs: [],
    menuTree: [],
    menuRouter: !0,
    menuMode: "horizontal",
    setting: {
        layout: "transverse",
        themeColor: "#c71585",
        headerBarColor: "#282c34",
        headerBarFontColor: "#FFFFFF",
        isHeaderBarColorGradual: !1,
        asidebarColor: "#282c34",
        asidebarFontColor: "#ffffff",
        isAsidebarColorGradual: !1,
        isDark: !1
    }
};

const ns$h = useNamespace("text-ellipsis");

const NextTextEllipsis = withInstall(defineComponent({
    name: "NextTextEllipsis",
    props: {
        content: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        width: {
            type: [ String, Number ],
            default: ""
        },
        placement: {
            type: String,
            default: "top"
        },
        textAlign: {
            type: String,
            default: "left"
        },
        class: {
            type: String,
            default: ""
        }
    },
    setup(props, {slots: slots}) {
        const isTip = ref(!1), setWidth = computed((() => {
            const width = props.width;
            let style = {
                textAlign: props.textAlign
            };
            return width && ("string" == typeof width ? style.width = width : "number" == typeof width && (style.width = width + "px")), 
            style;
        })), ellipsisRef = ref(), onMouseenter = () => {
            try {
                const dom = ellipsisRef.value;
                dom && dom.scrollWidth && dom.scrollWidth > dom.offsetWidth ? isTip.value = !0 : isTip.value = !1;
            } catch (err) {
                isTip.value = !1;
            }
        };
        return () => createVNode(Fragment, null, [ createVNode("div", {
            class: [ ns$h.b(), props.class ],
            style: setWidth.value,
            onMouseenter: onMouseenter
        }, [ isTip.value ? createVNode(ElTooltip, {
            effect: "dark",
            content: props.content,
            placement: props.placement,
            disabled: props.disabled
        }, {
            default: () => [ createVNode("span", {
                class: ns$h.e("text"),
                ref: ellipsisRef
            }, [ slots.default ? slots.default() : props.content ]) ]
        }) : createVNode("span", {
            class: ns$h.e("text"),
            ref: ellipsisRef
        }, [ slots.default ? slots.default() : props.content ]) ]) ]);
    }
}));

var LogoView = defineComponent({
    setup() {
        const ns = inject("__ns__", {}), _options = inject("options", {}), {t: t} = useLocale();
        return () => createVNode(Fragment, null, [ createVNode("div", {
            class: ns.bf("header", "logo")
        }, [ _options.logo && createVNode("img", {
            class: ns.be("header-logo", "img"),
            src: _options.logo,
            alt: "logo"
        }, null), _options.title && createVNode("p", {
            class: ns.be("header-logo", "title")
        }, [ createVNode(NextTextEllipsis, {
            content: t(_options.title)
        }, null) ]) ]) ]);
    }
}), LayoutSetting = defineComponent({
    setup() {},
    render() {
        const _slots = inject("__slots__", {}), _ns = inject("__ns__", {}), _config = inject("options", {}), _updateOptions = inject("updateOptions", null), settingConfig = reactive({
            ..._config.setting
        }), _changeUpdateOptions = () => {
            const options = {
                ..._config,
                setting: {
                    ...settingConfig
                }
            };
            _updateOptions(options);
        }, _onChangeThemeColor = color => {
            if (!color) return ElMessage({
                type: "warning",
                message: "主题颜色不能为空"
            }), !1;
            settingConfig.themeColor = color, nextUseCssTheme("--el-color-primary", color), 
            _changeUpdateOptions();
        }, _onChangeSwitchDark = () => {
            const body = document.documentElement;
            settingConfig.isDark ? body.setAttribute("data-theme", "dark") : body.setAttribute("data-theme", ""), 
            _changeUpdateOptions();
        }, _onChangeColor = (color, key, cssvar) => {
            settingConfig[key] = color, nextUseCssVar(cssvar, color), _changeUpdateOptions();
        }, layouts = [ {
            type: "defaults",
            text: "默认"
        }, {
            type: "classic",
            text: "经典"
        }, {
            type: "transverse",
            text: "横向"
        }, {
            type: "columns",
            text: "分栏"
        } ];
        return createVNode(ElScrollbar, null, {
            default: () => [ createVNode(ElDivider, {
                "border-style": "dashed"
            }, {
                default: () => [ createTextVNode("全局主题") ]
            }), createVNode("div", {
                class: _ns.b("config-bar-item")
            }, [ createVNode("span", {
                class: _ns.be("config-bar-item", "label")
            }, [ createTextVNode("主题颜色") ]), createVNode("div", {
                class: _ns.be("config-bar-item", "value")
            }, [ createVNode(ElColorPicker, {
                modelValue: settingConfig.themeColor,
                "onUpdate:modelValue": $event => settingConfig.themeColor = $event,
                predefine: [ "#409eff", "#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585", "#FB07A0" ],
                onChange: _onChangeThemeColor
            }, null) ]) ]), createVNode("div", {
                class: _ns.b("config-bar-item")
            }, [ createVNode("span", {
                class: _ns.be("config-bar-item", "label")
            }, [ createTextVNode("暗黑模式") ]), createVNode("div", {
                class: _ns.be("config-bar-item", "value")
            }, [ createVNode(ElSwitch, {
                modelValue: settingConfig.isDark,
                "onUpdate:modelValue": $event => settingConfig.isDark = $event,
                "inline-prompt": !0,
                size: "large",
                "active-icon": MoonNight,
                "inactive-icon": Sunny,
                "active-color": "#1f1f1f",
                "inactive-color": "#dcdfe6",
                onChange: _onChangeSwitchDark
            }, null) ]) ]), createVNode("div", {
                class: _ns.b("config-bar-item")
            }, [ createVNode("span", {
                class: _ns.be("config-bar-item", "label")
            }, [ createTextVNode("顶栏背景颜色") ]), createVNode("div", {
                class: _ns.be("config-bar-item", "value")
            }, [ createVNode(ElColorPicker, {
                modelValue: settingConfig.headerBarColor,
                "onUpdate:modelValue": $event => settingConfig.headerBarColor = $event,
                predefine: [ "#282c34", "#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585", "#FB07A0" ],
                onChange: color => _onChangeColor(color, "headerBarColor", "--next-layout-bg-color")
            }, null) ]) ]), createVNode("div", {
                class: _ns.b("config-bar-item")
            }, [ createVNode("span", {
                class: _ns.be("config-bar-item", "label")
            }, [ createTextVNode("顶栏字体颜色") ]), createVNode("div", {
                class: _ns.be("config-bar-item", "value")
            }, [ createVNode(ElColorPicker, {
                modelValue: settingConfig.headerBarFontColor,
                "onUpdate:modelValue": $event => settingConfig.headerBarFontColor = $event,
                predefine: [ "#282c34", "#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585", "#FB07A0" ],
                onChange: color => _onChangeColor(color, "headerBarFontColor", "--next-layout-font-color")
            }, null) ]) ]), createVNode("div", {
                class: _ns.b("config-bar-item")
            }, [ createVNode("span", {
                class: _ns.be("config-bar-item", "label")
            }, [ createTextVNode("顶栏背景渐变") ]), createVNode("div", {
                class: _ns.be("config-bar-item", "value")
            }, [ createVNode(resolveComponent("el-switch"), {
                modelValue: settingConfig.isHeaderBarColorGradual,
                "onUpdate:modelValue": $event => settingConfig.isHeaderBarColorGradual = $event,
                onChange: _changeUpdateOptions
            }, null) ]) ]), createVNode(ElDivider, {
                "border-style": "dashed"
            }, {
                default: () => [ createTextVNode("布局方式") ]
            }), createVNode("ul", {
                class: _ns.b("config-bar-layout")
            }, [ layouts.map((item => createVNode("li", {
                class: [ _ns.be("config-bar-layout", item.type), _ns.is("active", settingConfig.layout === item.type) ],
                onClick: event => ((event, layout) => {
                    event.stopPropagation(), settingConfig.layout = layout.type, _changeUpdateOptions();
                })(event, item)
            }, [ createVNode("div", {
                class: "layout-wrap"
            }, [ createVNode("div", {
                class: "layout-box"
            }, [ createVNode("p", {
                class: "layout-text"
            }, [ item.text ]) ]) ]), createVNode("aside", null, null) ]))) ]), createVNode("div", {
                class: _ns.b("config-bar-item"),
                style: {
                    "margin-top": "20px"
                }
            }, [ createVNode("span", {
                class: _ns.be("config-bar-item", "label")
            }, [ createTextVNode("是否显示标签栏") ]), createVNode("div", {
                class: _ns.be("config-bar-item", "value")
            }, [ createVNode(resolveComponent("el-switch"), {
                modelValue: _config.showTabs,
                "onUpdate:modelValue": $event => _config.showTabs = $event
            }, null) ]) ]), _slots.setting?.() ]
        });
    }
});

function _isSlot$8(s) {
    return "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s);
}

var HeaderTools = defineComponent({
    setup() {
        const locale = inject(localeContextKey, ref()), config = inject("options", {}), {t: t} = useLocale(), {toggle: toggle, isFullscreen: isFullscreen} = useFullscreen(), language = ref(computed((() => config.language)).value), settingDrawer = ref(!1);
        return {
            locale: locale,
            config: config,
            t: t,
            toggle: toggle,
            isFullscreen: isFullscreen,
            language: language,
            settingDrawer: settingDrawer
        };
    },
    render() {
        const _ns = inject("__ns__", {}), _config = this.config, _emit = inject("__emit__", {}), slots = this.$slots, _t = this.t, isFullscreen = this.isFullscreen, profile_url = _config.profile, _userDropdown = _config.userDropdown, _languageDropdown = _config.languageDropdown, _closeSettingDrawer = () => {
            this.settingDrawer = !1;
        };
        return createVNode(Fragment, null, [ createVNode("ul", {
            class: _ns.b("header-tools")
        }, [ slots[slots_config_headerToolsPrefix]?.(), createVNode("li", null, [ createVNode(ElDropdown, {
            "show-timeout": 70,
            "hide-timeout": 50,
            trigger: "click",
            onCommand: command => {
                this.language = command, _emit("changeLanguage", command), _config.onChangeLanguage && _config.onChangeLanguage(command);
            }
        }, {
            default: () => createVNode("div", null, [ createVNode(ElIcon, {
                size: 16
            }, {
                default: () => [ createVNode("svg", {
                    class: "icon",
                    viewBox: "0 0 1070 1024",
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "p-id": "1855",
                    width: "128",
                    height: "128"
                }, [ createVNode("path", {
                    d: "M232.58156522 358.13286957C244.86956522 394.4626087 265.17147826 425.984 293.48730435 453.76556522c24.04173913-26.17878261 42.2066087-58.23443478 53.96034782-95.63269565H232.58156522z",
                    "p-id": "1856"
                }, null), createVNode("path", {
                    d: "M981.61530435 143.36h-448.77913044L507.19165217 6.05495652h-416.72347826c-45.94643478 0-83.34469565 37.39826087-83.34469565 83.34469565v708.42991305c0 45.94643478 37.39826087 83.34469565 83.34469565 83.34469565h379.85947826l-30.45286956 137.30504348h541.74052174c45.94643478 0 83.34469565-37.39826087 83.34469565-83.34469565V226.70469565c0-45.94643478-37.39826087-83.34469565-83.34469565-83.34469565zM415.83304348 564.35756522c-49.152-18.16486957-89.75582609-41.13808696-122.34573913-67.85113044-34.19269565 30.45286957-76.93356522 52.89182609-126.61982609 66.7826087l-17.09634783-28.31582609c48.61773913-12.82226087 89.22156522-32.05565217 121.2772174-59.30295652-33.12417391-33.65843478-56.0973913-72.65947826-68.91965218-117.00313044h-46.48069565v-32.05565217H276.92521739c-7.47965217-13.89078261-17.09634783-27.24730435-28.31582609-40.06956522l32.05565218-11.75373913c11.21947826 14.42504348 21.37043478 31.5213913 30.45286956 51.28904348h115.9346087v32.05565218h-46.48069565c-14.95930435 45.94643478-36.32973913 84.41321739-64.64556522 115.40034782 31.5213913 25.11026087 71.05669565 45.94643478 117.5373913 63.04278261l-17.63060869 27.78156522z m607.45460869 370.24278261c0 22.97321739-18.69913043 41.67234783-41.67234782 41.67234782H492.23234783l20.83617391-95.63269565h156.53843478l-89.22156522-497.39686957-0.53426087 2.67130435-3.73982608-19.76765217 1.06852174 0.53426087-32.58991305-181.64869565H982.14956522c22.97321739 0 41.67234783 18.69913043 41.67234782 41.67234782v707.89565218z",
                    "p-id": "1857"
                }, null), createVNode("path", {
                    d: "M684.56626087 541.38434783h114.86608696v-30.45286957h-114.86608696V450.02573913h122.34573913v-30.45286956h-158.14121739v219.04695652h162.94956522V608.16695652h-127.15408696v-66.78260869z m239.88313043-65.71408696c-9.61669565 0-18.16486957 1.60278261-26.1787826 5.87686956-7.47965217 3.73982609-14.95930435 9.61669565-20.83617392 17.09634783V479.94434783h-34.72695652v158.67547826h34.72695652v-95.63269566c1.06852174-12.82226087 5.3426087-22.43895652 12.82226087-29.38434782 6.41113043-5.87686957 13.89078261-9.08243478 22.43895652-9.08243478 24.04173913 0 35.79547826 12.82226087 35.79547826 39.00104347v94.56417392h34.72695653v-97.76973913c1.06852174-43.27513043-19.2333913-64.64556522-58.76869566-64.64556522z",
                    "p-id": "1858"
                }, null) ]) ]
            }) ]),
            dropdown: () => {
                let _slot;
                return createVNode(ElDropdownMenu, null, _isSlot$8(_slot = _languageDropdown.map((item => createVNode(ElDropdownItem, {
                    command: item.value,
                    disabled: this.language === item.value
                }, {
                    default: () => [ item.label ]
                })))) ? _slot : {
                    default: () => [ _slot ]
                });
            }
        }) ]), createVNode("li", null, [ createVNode("span", {
            style: {
                display: "inline-block",
                lineHeight: 1
            },
            onClick: this.toggle
        }, [ createVNode(ElIcon, {
            size: 16
        }, {
            default: () => [ isFullscreen ? createVNode("svg", {
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "2676",
                width: "128",
                height: "128"
            }, [ createVNode("path", {
                d: "M749.248 704H864a32 32 0 1 0 0-64H672a32 32 0 0 0-32 32v192a32 32 0 1 0 64 0v-114.752l137.36 137.36a32 32 0 1 0 45.232-45.264L749.248 704zM320 749.248V864a32 32 0 1 0 64 0V672a32 32 0 0 0-32-32H160a32 32 0 1 0 0 64h114.752l-137.36 137.36a32 32 0 1 0 45.264 45.232L320 749.248zM749.248 320H864a32 32 0 1 1 0 64H672a32 32 0 0 1-32-32V160a32 32 0 1 1 64 0v114.752l137.36-137.36a32 32 0 1 1 45.232 45.264L749.248 320zM320 274.752V160a32 32 0 1 1 64 0v192a32 32 0 0 1-32 32H160a32 32 0 1 1 0-64h114.752l-137.36-137.36a32 32 0 1 1 45.264-45.232L320 274.752z",
                "p-id": "2677"
            }, null) ]) : createVNode("svg", {
                class: "icon",
                viewBox: "0 0 1024 1024",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "p-id": "2522",
                width: "128",
                height: "128"
            }, [ createVNode("path", {
                d: "M237.248 192H352a32 32 0 1 0 0-64H160a32 32 0 0 0-32 32v192a32 32 0 1 0 64 0v-114.752l137.36 137.36a32 32 0 1 0 45.232-45.264L237.248 192zM832 237.248V352a32 32 0 1 0 64 0V160a32 32 0 0 0-32-32H672a32 32 0 1 0 0 64h114.752l-137.36 137.36a32 32 0 1 0 45.264 45.232L832 237.248zM237.248 832H352a32 32 0 1 1 0 64H160a32 32 0 0 1-32-32V672a32 32 0 1 1 64 0v114.752l137.36-137.36a32 32 0 1 1 45.232 45.264L237.248 832zM832 786.752V672a32 32 0 1 1 64 0v192a32 32 0 0 1-32 32H672a32 32 0 1 1 0-64h114.752l-137.36-137.36a32 32 0 1 1 45.264-45.232L832 786.752z",
                "p-id": "2523"
            }, null) ]) ]
        }) ]) ]), slots[slots_config_headerToolsSuffix]?.(), createVNode("li", null, [ createVNode(ElDropdown, {
            "show-timeout": 70,
            "hide-timeout": 80,
            onCommand: command => {
                _emit("changeUserDropdown", command), _config.onChangeUserDropdown && _config.onChangeUserDropdown(command);
            }
        }, {
            default: () => createVNode("span", {
                class: _ns.be("header-tools", "user")
            }, [ profile_url ? createVNode("img", {
                class: "user-photo",
                src: profile_url
            }, null) : null, createVNode("span", null, [ _config.userName ]), createVNode(ElIcon, {
                class: "el-icon--right"
            }, {
                default: () => [ createVNode(ArrowDown, null, null) ]
            }) ]),
            dropdown: () => createVNode(ElDropdownMenu, null, {
                default: () => [ _userDropdown?.map((item => {
                    let _slot2;
                    return createVNode(ElDropdownItem, {
                        command: item.value,
                        divided: !!item.divided
                    }, _isSlot$8(_slot2 = _t(item.label)) ? _slot2 : {
                        default: () => [ _slot2 ]
                    });
                })) ]
            })
        }) ]), createVNode("li", null, [ createVNode("span", {
            style: {
                display: "inline-block",
                lineHeight: 1
            },
            onClick: () => {
                this.settingDrawer = !0;
            }
        }, [ createVNode(ElIcon, {
            size: 16
        }, {
            default: () => [ createVNode(Setting, null, null) ]
        }) ]) ]) ]), createVNode(Teleport, {
            to: "body"
        }, {
            default: () => [ createVNode(ElDrawer, {
                modelValue: this.settingDrawer,
                "onUpdate:modelValue": $event => this.settingDrawer = $event,
                title: this.t("next.layout.systemSetting"),
                direction: "rtl",
                size: "380px",
                class: _ns.be("drawer", "setting"),
                "destroy-on-close": !0,
                beforeClose: _closeSettingDrawer
            }, {
                default: () => [ createVNode(LayoutSetting, null, null) ]
            }) ]
        }) ]);
    }
});

const {getLightColor: getLightColor$3} = useChangeColor();

var Header$3 = defineComponent({
    setup: () => ({
        ns: inject("ns", {})
    }),
    render() {
        const slots = this.$slots, _ns = this.ns, _config = inject("options", {}), headerStyle = computed((() => {
            const {isHeaderBarColorGradual: isHeaderBarColorGradual, headerBarColor: color} = _config.setting;
            return isHeaderBarColorGradual ? {
                background: `linear-gradient(to bottom , ${color}, ${getLightColor$3(color, .5)})`
            } : "";
        }));
        return createVNode("header", {
            class: _ns.b("header"),
            style: headerStyle.value
        }, [ createVNode(LogoView, null, null), createVNode("div", {
            class: _ns.bf("header", "right")
        }, [ createVNode(HeaderTools, null, {
            default: () => [ slots[slots_config_headerToolsPrefix]?.(), slots[slots_config_headerToolsSuffix]?.() ]
        }) ]) ]);
    }
});

function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
}

var collectionUtils = {
    exports: {}
};

(collectionUtils.exports = {}).forEach = function(collection, callback) {
    for (var i = 0; i < collection.length; i++) {
        var result = callback(collection[i]);
        if (result) return result;
    }
};

var collectionUtilsExports = collectionUtils.exports, browserDetector$2 = {
    exports: {}
}, detector = browserDetector$2.exports = {};

detector.isIE = function(version) {
    return (-1 !== (agent = navigator.userAgent.toLowerCase()).indexOf("msie") || -1 !== agent.indexOf("trident") || -1 !== agent.indexOf(" edge/")) && (!version || version === function() {
        var v = 3, div = document.createElement("div"), all = div.getElementsByTagName("i");
        do {
            div.innerHTML = "\x3c!--[if gt IE " + ++v + "]><i></i><![endif]--\x3e";
        } while (all[0]);
        return v > 4 ? v : undefined;
    }());
    var agent;
}, detector.isLegacyOpera = function() {
    return !!window.opera;
};

var browserDetectorExports = browserDetector$2.exports, utils$2 = {
    exports: {}
};

(utils$2.exports = {}).getOption = function(options, name, defaultValue) {
    var value = options[name];
    if (null == value && void 0 !== defaultValue) return defaultValue;
    return value;
};

var utils = utils$2.exports;

function Batch() {
    var batch = {}, size = 0, topLevel = 0, bottomLevel = 0;
    return {
        add: function(level, fn) {
            fn || (fn = level, level = 0), level > topLevel ? topLevel = level : level < bottomLevel && (bottomLevel = level), 
            batch[level] || (batch[level] = []), batch[level].push(fn), size++;
        },
        process: function() {
            for (var level = bottomLevel; level <= topLevel; level++) for (var fns = batch[level], i = 0; i < fns.length; i++) {
                (0, fns[i])();
            }
        },
        size: function() {
            return size;
        }
    };
}

var prop = "_erd";

function getState(element) {
    return element[prop];
}

var stateHandler$1 = {
    initState: function(element) {
        return element[prop] = {}, getState(element);
    },
    getState: getState,
    cleanState: function(element) {
        delete element[prop];
    }
}, browserDetector$1 = browserDetectorExports, forEach$1 = collectionUtilsExports.forEach, forEach = collectionUtilsExports.forEach, elementUtilsMaker = function(options) {
    var getState = options.stateHandler.getState;
    return {
        isDetectable: function(element) {
            var state = getState(element);
            return state && !!state.isDetectable;
        },
        markAsDetectable: function(element) {
            getState(element).isDetectable = !0;
        },
        isBusy: function(element) {
            return !!getState(element).busy;
        },
        markBusy: function(element, busy) {
            getState(element).busy = !!busy;
        }
    };
}, listenerHandlerMaker = function(idHandler) {
    var eventListeners = {};
    function getListeners(element) {
        var id = idHandler.get(element);
        return void 0 === id ? [] : eventListeners[id] || [];
    }
    return {
        get: getListeners,
        add: function(element, listener) {
            var id = idHandler.get(element);
            eventListeners[id] || (eventListeners[id] = []), eventListeners[id].push(listener);
        },
        removeListener: function(element, listener) {
            for (var listeners = getListeners(element), i = 0, len = listeners.length; i < len; ++i) if (listeners[i] === listener) {
                listeners.splice(i, 1);
                break;
            }
        },
        removeAllListeners: function(element) {
            var listeners = getListeners(element);
            listeners && (listeners.length = 0);
        }
    };
}, idGeneratorMaker = function() {
    var idCount = 1;
    return {
        generate: function() {
            return idCount++;
        }
    };
}, idHandlerMaker = function(options) {
    var idGenerator = options.idGenerator, getState = options.stateHandler.getState;
    return {
        get: function(element) {
            var state = getState(element);
            return state && void 0 !== state.id ? state.id : null;
        },
        set: function(element) {
            var state = getState(element);
            if (!state) throw new Error("setId required the element to have a resize detection state.");
            var id = idGenerator.generate();
            return state.id = id, id;
        }
    };
}, reporterMaker = function(quiet) {
    function noop() {}
    var reporter = {
        log: noop,
        warn: noop,
        error: noop
    };
    if (!quiet && window.console) {
        var attachFunction = function(reporter, name) {
            reporter[name] = function() {
                var f = console[name];
                if (f.apply) f.apply(console, arguments); else for (var i = 0; i < arguments.length; i++) f(arguments[i]);
            };
        };
        attachFunction(reporter, "log"), attachFunction(reporter, "warn"), attachFunction(reporter, "error");
    }
    return reporter;
}, browserDetector = browserDetectorExports, batchProcessorMaker = function(options) {
    var reporter = (options = options || {}).reporter, asyncProcess = utils.getOption(options, "async", !0), autoProcess = utils.getOption(options, "auto", !0);
    autoProcess && !asyncProcess && (reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), 
    asyncProcess = !0);
    var asyncFrameHandler, batch = Batch(), isProcessing = !1;
    function processBatch() {
        for (isProcessing = !0; batch.size(); ) {
            var processingBatch = batch;
            batch = Batch(), processingBatch.process();
        }
        isProcessing = !1;
    }
    function processBatchAsync() {
        var fn;
        fn = processBatch, asyncFrameHandler = setTimeout(fn, 0);
    }
    return {
        add: function(level, fn) {
            !isProcessing && autoProcess && asyncProcess && 0 === batch.size() && processBatchAsync(), 
            batch.add(level, fn);
        },
        force: function(localAsyncProcess) {
            isProcessing || (void 0 === localAsyncProcess && (localAsyncProcess = asyncProcess), 
            asyncFrameHandler && (clearTimeout(asyncFrameHandler), asyncFrameHandler = null), 
            localAsyncProcess ? processBatchAsync() : processBatch());
        }
    };
}, stateHandler = stateHandler$1, objectStrategyMaker = function(options) {
    var reporter = (options = options || {}).reporter, batchProcessor = options.batchProcessor, getState = options.stateHandler.getState;
    if (!reporter) throw new Error("Missing required dependency: reporter.");
    function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";
        return (rules.join(seperator) + seperator).trim();
    }
    function getObject(element) {
        return getState(element).object;
    }
    return {
        makeDetectable: function(options, element, callback) {
            callback || (callback = element, element = options, options = null), (options = options || {}).debug, 
            browserDetector$1.isIE(8) ? callback(element) : function(element, callback) {
                var OBJECT_STYLE = buildCssTextString([ "display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none" ]), positionCheckPerformed = !1, style = window.getComputedStyle(element), width = element.offsetWidth, height = element.offsetHeight;
                function mutateDom() {
                    function alterPositionStyles() {
                        if ("static" === style.position) {
                            element.style.setProperty("position", "relative", options.important ? "important" : "");
                            var removeRelativeStyles = function(reporter, element, style, property) {
                                var value = style[property];
                                "auto" !== value && "0" !== function(value) {
                                    return value.replace(/[^-\d\.]/g, "");
                                }(value) && (reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element), 
                                element.style.setProperty(property, "0", options.important ? "important" : ""));
                            };
                            removeRelativeStyles(reporter, element, style, "top"), removeRelativeStyles(reporter, element, style, "right"), 
                            removeRelativeStyles(reporter, element, style, "bottom"), removeRelativeStyles(reporter, element, style, "left");
                        }
                    }
                    "" !== style.position && (alterPositionStyles(), positionCheckPerformed = !0);
                    var object = document.createElement("object");
                    object.style.cssText = OBJECT_STYLE, object.tabIndex = -1, object.type = "text/html", 
                    object.setAttribute("aria-hidden", "true"), object.onload = function() {
                        positionCheckPerformed || alterPositionStyles(), function getDocument(element, callback) {
                            if (!element.contentDocument) {
                                var state = getState(element);
                                return state.checkForObjectDocumentTimeoutId && window.clearTimeout(state.checkForObjectDocumentTimeoutId), 
                                void (state.checkForObjectDocumentTimeoutId = setTimeout((function() {
                                    state.checkForObjectDocumentTimeoutId = 0, getDocument(element, callback);
                                }), 100));
                            }
                            callback(element.contentDocument);
                        }(this, (function(objectDocument) {
                            callback(element);
                        }));
                    }, browserDetector$1.isIE() || (object.data = "about:blank"), getState(element) && (element.appendChild(object), 
                    getState(element).object = object, browserDetector$1.isIE() && (object.data = "about:blank"));
                }
                getState(element).startSize = {
                    width: width,
                    height: height
                }, batchProcessor ? batchProcessor.add(mutateDom) : mutateDom();
            }(element, callback);
        },
        addListener: function(element, listener) {
            function listenerProxy() {
                listener(element);
            }
            if (browserDetector$1.isIE(8)) getState(element).object = {
                proxy: listenerProxy
            }, element.attachEvent("onresize", listenerProxy); else {
                var object = getObject(element);
                if (!object) throw new Error("Element is not detectable by this strategy.");
                object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
            }
        },
        uninstall: function(element) {
            if (getState(element)) {
                var object = getObject(element);
                object && (browserDetector$1.isIE(8) ? element.detachEvent("onresize", object.proxy) : element.removeChild(object), 
                getState(element).checkForObjectDocumentTimeoutId && window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId), 
                delete getState(element).object);
            }
        }
    };
}, scrollStrategyMaker = function(options) {
    var reporter = (options = options || {}).reporter, batchProcessor = options.batchProcessor, getState = options.stateHandler.getState;
    options.stateHandler.hasState;
    var idHandler = options.idHandler;
    if (!batchProcessor) throw new Error("Missing required dependency: batchProcessor");
    if (!reporter) throw new Error("Missing required dependency: reporter.");
    var scrollbarSizes = function() {
        var child = document.createElement("div");
        child.style.cssText = buildCssTextString([ "position: absolute", "width: 1000px", "height: 1000px", "visibility: hidden", "margin: 0", "padding: 0" ]);
        var container = document.createElement("div");
        container.style.cssText = buildCssTextString([ "position: absolute", "width: 500px", "height: 500px", "overflow: scroll", "visibility: none", "top: -1500px", "left: -1500px", "visibility: hidden", "margin: 0", "padding: 0" ]), 
        container.appendChild(child), document.body.insertBefore(container, document.body.firstChild);
        var widthSize = 500 - container.clientWidth, heightSize = 500 - container.clientHeight;
        return document.body.removeChild(container), {
            width: widthSize,
            height: heightSize
        };
    }(), detectionContainerClass = "erd_scroll_detection_container";
    function initDocument(targetDocument) {
        !function(targetDocument, styleId, containerClass) {
            function injectStyle(style, method) {
                method = method || function(element) {
                    targetDocument.head.appendChild(element);
                };
                var styleElement = targetDocument.createElement("style");
                return styleElement.innerHTML = style, styleElement.id = styleId, method(styleElement), 
                styleElement;
            }
            if (!targetDocument.getElementById(styleId)) {
                var containerAnimationClass = containerClass + "_animation", containerAnimationActiveClass = containerClass + "_animation_active", style = "/* Created by the element-resize-detector library. */\n";
                style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString([ "display: none" ]) + " }\n\n", 
                style += "." + containerAnimationActiveClass + " { " + buildCssTextString([ "-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass ]) + " }\n", 
                style += "@-webkit-keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n", 
                injectStyle(style += "@keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }");
            }
        }(targetDocument, "erd_scroll_detection_scrollbar_style", detectionContainerClass);
    }
    function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";
        return (rules.join(seperator) + seperator).trim();
    }
    function addEvent(el, name, cb) {
        if (el.addEventListener) el.addEventListener(name, cb); else {
            if (!el.attachEvent) return reporter.error("[scroll] Don't know how to add event listeners.");
            el.attachEvent("on" + name, cb);
        }
    }
    function removeEvent(el, name, cb) {
        if (el.removeEventListener) el.removeEventListener(name, cb); else {
            if (!el.detachEvent) return reporter.error("[scroll] Don't know how to remove event listeners.");
            el.detachEvent("on" + name, cb);
        }
    }
    function getExpandElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
    }
    function getShrinkElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
    }
    return initDocument(window.document), {
        makeDetectable: function(options, element, callback) {
            function debug() {
                if (options.debug) {
                    var args = Array.prototype.slice.call(arguments);
                    if (args.unshift(idHandler.get(element), "Scroll: "), reporter.log.apply) reporter.log.apply(null, args); else for (var i = 0; i < args.length; i++) reporter.log(args[i]);
                }
            }
            function isUnrendered(element) {
                var container = getState(element).container.childNodes[0], style = window.getComputedStyle(container);
                return !style.width || -1 === style.width.indexOf("px");
            }
            function getStyle() {
                var elementStyle = window.getComputedStyle(element), style = {};
                return style.position = elementStyle.position, style.width = element.offsetWidth, 
                style.height = element.offsetHeight, style.top = elementStyle.top, style.right = elementStyle.right, 
                style.bottom = elementStyle.bottom, style.left = elementStyle.left, style.widthCSS = elementStyle.width, 
                style.heightCSS = elementStyle.height, style;
            }
            function storeStyle() {
                if (debug("storeStyle invoked."), getState(element)) {
                    var style = getStyle();
                    getState(element).style = style;
                } else debug("Aborting because element has been uninstalled");
            }
            function storeCurrentSize(element, width, height) {
                getState(element).lastWidth = width, getState(element).lastHeight = height;
            }
            function getWidthOffset() {
                return 2 * scrollbarSizes.width + 1;
            }
            function getHeightOffset() {
                return 2 * scrollbarSizes.height + 1;
            }
            function getExpandWidth(width) {
                return width + 10 + getWidthOffset();
            }
            function getExpandHeight(height) {
                return height + 10 + getHeightOffset();
            }
            function positionScrollbars(element, width, height) {
                var expand = getExpandElement(element), shrink = getShrinkElement(element), expandWidth = getExpandWidth(width), expandHeight = getExpandHeight(height), shrinkWidth = function(width) {
                    return 2 * width + getWidthOffset();
                }(width), shrinkHeight = function(height) {
                    return 2 * height + getHeightOffset();
                }(height);
                expand.scrollLeft = expandWidth, expand.scrollTop = expandHeight, shrink.scrollLeft = shrinkWidth, 
                shrink.scrollTop = shrinkHeight;
            }
            function injectContainerElement() {
                var container = getState(element).container;
                if (!container) {
                    (container = document.createElement("div")).className = detectionContainerClass, 
                    container.style.cssText = buildCssTextString([ "visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0" ]), 
                    getState(element).container = container, function(element) {
                        element.className += " " + detectionContainerClass + "_animation_active";
                    }(container), element.appendChild(container);
                    var onAnimationStart = function() {
                        getState(element).onRendered && getState(element).onRendered();
                    };
                    addEvent(container, "animationstart", onAnimationStart), getState(element).onAnimationStart = onAnimationStart;
                }
                return container;
            }
            function injectScrollElements() {
                if (debug("Injecting elements"), getState(element)) {
                    !function() {
                        var style = getState(element).style;
                        if ("static" === style.position) {
                            element.style.setProperty("position", "relative", options.important ? "important" : "");
                            var removeRelativeStyles = function(reporter, element, style, property) {
                                var value = style[property];
                                "auto" !== value && "0" !== function(value) {
                                    return value.replace(/[^-\d\.]/g, "");
                                }(value) && (reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element), 
                                element.style[property] = 0);
                            };
                            removeRelativeStyles(reporter, element, style, "top"), removeRelativeStyles(reporter, element, style, "right"), 
                            removeRelativeStyles(reporter, element, style, "bottom"), removeRelativeStyles(reporter, element, style, "left");
                        }
                    }();
                    var rootContainer = getState(element).container;
                    rootContainer || (rootContainer = injectContainerElement());
                    var left, top, bottom, right, scrollbarWidth = scrollbarSizes.width, scrollbarHeight = scrollbarSizes.height, containerContainerStyle = buildCssTextString([ "position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px" ]), containerStyle = buildCssTextString([ "position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden" ].concat([ "left: " + (left = (left = -(1 + scrollbarWidth)) ? left + "px" : "0"), "top: " + (top = (top = -(1 + scrollbarHeight)) ? top + "px" : "0"), "right: " + (right = (right = -scrollbarWidth) ? right + "px" : "0"), "bottom: " + (bottom = (bottom = -scrollbarHeight) ? bottom + "px" : "0") ])), expandStyle = buildCssTextString([ "position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%" ]), shrinkStyle = buildCssTextString([ "position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%" ]), expandChildStyle = buildCssTextString([ "position: absolute", "left: 0", "top: 0" ]), shrinkChildStyle = buildCssTextString([ "position: absolute", "width: 200%", "height: 200%" ]), containerContainer = document.createElement("div"), container = document.createElement("div"), expand = document.createElement("div"), expandChild = document.createElement("div"), shrink = document.createElement("div"), shrinkChild = document.createElement("div");
                    containerContainer.dir = "ltr", containerContainer.style.cssText = containerContainerStyle, 
                    containerContainer.className = detectionContainerClass, container.className = detectionContainerClass, 
                    container.style.cssText = containerStyle, expand.style.cssText = expandStyle, expandChild.style.cssText = expandChildStyle, 
                    shrink.style.cssText = shrinkStyle, shrinkChild.style.cssText = shrinkChildStyle, 
                    expand.appendChild(expandChild), shrink.appendChild(shrinkChild), container.appendChild(expand), 
                    container.appendChild(shrink), containerContainer.appendChild(container), rootContainer.appendChild(containerContainer), 
                    addEvent(expand, "scroll", onExpandScroll), addEvent(shrink, "scroll", onShrinkScroll), 
                    getState(element).onExpandScroll = onExpandScroll, getState(element).onShrinkScroll = onShrinkScroll;
                } else debug("Aborting because element has been uninstalled");
                function onExpandScroll() {
                    var state = getState(element);
                    state && state.onExpand ? state.onExpand() : debug("Aborting expand scroll handler: element has been uninstalled");
                }
                function onShrinkScroll() {
                    var state = getState(element);
                    state && state.onShrink ? state.onShrink() : debug("Aborting shrink scroll handler: element has been uninstalled");
                }
            }
            function registerListenersAndPositionElements() {
                function updateChildSizes(element, width, height) {
                    var expandChild = function(element) {
                        return getExpandElement(element).childNodes[0];
                    }(element), expandWidth = getExpandWidth(width), expandHeight = getExpandHeight(height);
                    expandChild.style.setProperty("width", expandWidth + "px", options.important ? "important" : ""), 
                    expandChild.style.setProperty("height", expandHeight + "px", options.important ? "important" : "");
                }
                function updateDetectorElements(done) {
                    var width = element.offsetWidth, height = element.offsetHeight, sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;
                    debug("Storing current size", width, height), storeCurrentSize(element, width, height), 
                    batchProcessor.add(0, (function() {
                        if (sizeChanged) if (getState(element)) if (areElementsInjected()) {
                            if (options.debug) {
                                var w = element.offsetWidth, h = element.offsetHeight;
                                w === width && h === height || reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
                            }
                            updateChildSizes(element, width, height);
                        } else debug("Aborting because element container has not been initialized"); else debug("Aborting because element has been uninstalled");
                    })), batchProcessor.add(1, (function() {
                        getState(element) ? areElementsInjected() ? positionScrollbars(element, width, height) : debug("Aborting because element container has not been initialized") : debug("Aborting because element has been uninstalled");
                    })), sizeChanged && done && batchProcessor.add(2, (function() {
                        getState(element) ? areElementsInjected() ? done() : debug("Aborting because element container has not been initialized") : debug("Aborting because element has been uninstalled");
                    }));
                }
                function areElementsInjected() {
                    return !!getState(element).container;
                }
                function notifyListenersIfNeeded() {
                    debug("notifyListenersIfNeeded invoked");
                    var state = getState(element);
                    return void 0 === getState(element).lastNotifiedWidth && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height ? debug("Not notifying: Size is the same as the start size, and there has been no notification yet.") : state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight ? debug("Not notifying: Size already notified") : (debug("Current size not notified, notifying..."), 
                    state.lastNotifiedWidth = state.lastWidth, state.lastNotifiedHeight = state.lastHeight, 
                    void forEach$1(getState(element).listeners, (function(listener) {
                        listener(element);
                    })));
                }
                function handleScroll() {
                    debug("Scroll detected."), isUnrendered(element) ? debug("Scroll event fired while unrendered. Ignoring...") : updateDetectorElements(notifyListenersIfNeeded);
                }
                if (debug("registerListenersAndPositionElements invoked."), getState(element)) {
                    getState(element).onRendered = function() {
                        if (debug("startanimation triggered."), isUnrendered(element)) debug("Ignoring since element is still unrendered..."); else {
                            debug("Element rendered.");
                            var expand = getExpandElement(element), shrink = getShrinkElement(element);
                            0 !== expand.scrollLeft && 0 !== expand.scrollTop && 0 !== shrink.scrollLeft && 0 !== shrink.scrollTop || (debug("Scrollbars out of sync. Updating detector elements..."), 
                            updateDetectorElements(notifyListenersIfNeeded));
                        }
                    }, getState(element).onExpand = handleScroll, getState(element).onShrink = handleScroll;
                    var style = getState(element).style;
                    updateChildSizes(element, style.width, style.height);
                } else debug("Aborting because element has been uninstalled");
            }
            function finalizeDomMutation() {
                if (debug("finalizeDomMutation invoked."), getState(element)) {
                    var style = getState(element).style;
                    storeCurrentSize(element, style.width, style.height), positionScrollbars(element, style.width, style.height);
                } else debug("Aborting because element has been uninstalled");
            }
            function ready() {
                callback(element);
            }
            function install() {
                var style;
                debug("Installing..."), getState(element).listeners = [], style = getStyle(), getState(element).startSize = {
                    width: style.width,
                    height: style.height
                }, debug("Element start size", getState(element).startSize), batchProcessor.add(0, storeStyle), 
                batchProcessor.add(1, injectScrollElements), batchProcessor.add(2, registerListenersAndPositionElements), 
                batchProcessor.add(3, finalizeDomMutation), batchProcessor.add(4, ready);
            }
            callback || (callback = element, element = options, options = null), options = options || {}, 
            debug("Making detectable..."), !function(element) {
                return !function(element) {
                    var isInShadowRoot = element.getRootNode && element.getRootNode().contains(element);
                    return element === element.ownerDocument.body || element.ownerDocument.body.contains(element) || isInShadowRoot;
                }(element) || null === window.getComputedStyle(element);
            }(element) ? install() : (debug("Element is detached"), injectContainerElement(), 
            debug("Waiting until element is attached..."), getState(element).onRendered = function() {
                debug("Element is now attached"), install();
            });
        },
        addListener: function(element, listener) {
            if (!getState(element).listeners.push) throw new Error("Cannot add listener to an element that is not detectable.");
            getState(element).listeners.push(listener);
        },
        uninstall: function(element) {
            var state = getState(element);
            state && (state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll), 
            state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll), 
            state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart), 
            state.container && element.removeChild(state.container));
        },
        initDocument: initDocument
    };
};

function isCollection(obj) {
    return Array.isArray(obj) || void 0 !== obj.length;
}

function toArray(collection) {
    if (Array.isArray(collection)) return collection;
    var array = [];
    return forEach(collection, (function(obj) {
        array.push(obj);
    })), array;
}

function isElement(obj) {
    return obj && 1 === obj.nodeType;
}

var elementResizeDetector = function(options) {
    var idHandler;
    if ((options = options || {}).idHandler) idHandler = {
        get: function(element) {
            return options.idHandler.get(element, !0);
        },
        set: options.idHandler.set
    }; else {
        var idGenerator = idGeneratorMaker(), defaultIdHandler = idHandlerMaker({
            idGenerator: idGenerator,
            stateHandler: stateHandler
        });
        idHandler = defaultIdHandler;
    }
    var reporter = options.reporter;
    reporter || (reporter = reporterMaker(!1 === reporter));
    var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({
        reporter: reporter
    })), globalOptions = {};
    globalOptions.callOnAdd = !!getOption(options, "callOnAdd", !0), globalOptions.debug = !!getOption(options, "debug", !1);
    var detectionStrategy, eventListenerHandler = listenerHandlerMaker(idHandler), elementUtils = elementUtilsMaker({
        stateHandler: stateHandler
    }), desiredStrategy = getOption(options, "strategy", "object"), importantCssRules = getOption(options, "important", !1), strategyOptions = {
        reporter: reporter,
        batchProcessor: batchProcessor,
        stateHandler: stateHandler,
        idHandler: idHandler,
        important: importantCssRules
    };
    if ("scroll" === desiredStrategy && (browserDetector.isLegacyOpera() ? (reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), 
    desiredStrategy = "object") : browserDetector.isIE(9) && (reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), 
    desiredStrategy = "object")), "scroll" === desiredStrategy) detectionStrategy = scrollStrategyMaker(strategyOptions); else {
        if ("object" !== desiredStrategy) throw new Error("Invalid strategy name: " + desiredStrategy);
        detectionStrategy = objectStrategyMaker(strategyOptions);
    }
    var onReadyCallbacks = {};
    return {
        listenTo: function(options, elements, listener) {
            function onResizeCallback(element) {
                var listeners = eventListenerHandler.get(element);
                forEach(listeners, (function(listener) {
                    listener(element);
                }));
            }
            function addListener(callOnAdd, element, listener) {
                eventListenerHandler.add(element, listener), callOnAdd && listener(element);
            }
            if (listener || (listener = elements, elements = options, options = {}), !elements) throw new Error("At least one element required.");
            if (!listener) throw new Error("Listener required.");
            if (isElement(elements)) elements = [ elements ]; else {
                if (!isCollection(elements)) return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
                elements = toArray(elements);
            }
            var elementsReady = 0, callOnAdd = getOption(options, "callOnAdd", globalOptions.callOnAdd), onReadyCallback = getOption(options, "onReady", (function() {})), debug = getOption(options, "debug", globalOptions.debug);
            forEach(elements, (function(element) {
                stateHandler.getState(element) || (stateHandler.initState(element), idHandler.set(element));
                var id = idHandler.get(element);
                if (debug && reporter.log("Attaching listener to element", id, element), !elementUtils.isDetectable(element)) return debug && reporter.log(id, "Not detectable."), 
                elementUtils.isBusy(element) ? (debug && reporter.log(id, "System busy making it detectable"), 
                addListener(callOnAdd, element, listener), onReadyCallbacks[id] = onReadyCallbacks[id] || [], 
                void onReadyCallbacks[id].push((function() {
                    ++elementsReady === elements.length && onReadyCallback();
                }))) : (debug && reporter.log(id, "Making detectable..."), elementUtils.markBusy(element, !0), 
                detectionStrategy.makeDetectable({
                    debug: debug,
                    important: importantCssRules
                }, element, (function(element) {
                    if (debug && reporter.log(id, "onElementDetectable"), stateHandler.getState(element)) {
                        elementUtils.markAsDetectable(element), elementUtils.markBusy(element, !1), detectionStrategy.addListener(element, onResizeCallback), 
                        addListener(callOnAdd, element, listener);
                        var state = stateHandler.getState(element);
                        if (state && state.startSize) {
                            var width = element.offsetWidth, height = element.offsetHeight;
                            state.startSize.width === width && state.startSize.height === height || onResizeCallback(element);
                        }
                        onReadyCallbacks[id] && forEach(onReadyCallbacks[id], (function(callback) {
                            callback();
                        }));
                    } else debug && reporter.log(id, "Element uninstalled before being detectable.");
                    delete onReadyCallbacks[id], ++elementsReady === elements.length && onReadyCallback();
                })));
                debug && reporter.log(id, "Already detecable, adding listener."), addListener(callOnAdd, element, listener), 
                elementsReady++;
            })), elementsReady === elements.length && onReadyCallback();
        },
        removeListener: eventListenerHandler.removeListener,
        removeAllListeners: eventListenerHandler.removeAllListeners,
        uninstall: function(elements) {
            if (!elements) return reporter.error("At least one element is required.");
            if (isElement(elements)) elements = [ elements ]; else {
                if (!isCollection(elements)) return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
                elements = toArray(elements);
            }
            forEach(elements, (function(element) {
                eventListenerHandler.removeAllListeners(element), detectionStrategy.uninstall(element), 
                stateHandler.cleanState(element);
            }));
        },
        initDocument: function(targetDocument) {
            detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
        }
    };
};

function getOption(options, name, defaultValue) {
    var value = options[name];
    return null == value && void 0 !== defaultValue ? defaultValue : value;
}

var elementResizeDetectorMaker = getDefaultExportFromCjs(elementResizeDetector);

const elementResize = (el, cb) => {
    const erd = elementResizeDetectorMaker();
    let timer = null;
    erd.listenTo(el, (() => {
        null !== timer && clearTimeout(timer), timer = setTimeout((() => {
            cb && cb(el), clearTimeout(timer);
        }), 200);
    })), onUnmounted((() => {
        erd.removeListener(el, (() => {}));
    }));
}, deepClone = source => {
    if (null == source) return source;
    let target;
    if ("object" == typeof source) {
        target = Array.isArray(source) ? [] : {};
        for (let key in source) "object" == typeof source[key] ? target[key] = deepClone(source[key]) : target[key] = source[key];
    } else target = source;
    return target;
}, arrayObjNoRepeat = (arr, property) => {
    const result = [], uniqueMap = new Map;
    for (const item of arr) {
        const key = item[property];
        uniqueMap.has(key) || (uniqueMap.set(key, !0), result.push(item));
    }
    return result;
}, isValueExist = value => null != value && ("string" == typeof value ? "" !== value.trim() : !1 !== value), valueExist = (...arg) => {
    let exist = null;
    for (let i = 0; i < arg.length; i++) {
        const val = arg[i];
        if (null != val) {
            exist = val;
            break;
        }
    }
    return exist;
}, shareObjectProperty = (target, source, key) => (Object.defineProperty(target, key, {
    get: () => source[key]
}), {
    target: target,
    source: source
});

var MenuItemTitle = defineComponent({
    props: {
        meta: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const _ns = inject("ns", {}), {t: t} = useLocale(), meta = props.meta;
        return () => createVNode(Fragment, null, [ createVNode("span", {
            class: _ns.be("item", "icon")
        }, [ meta.icon ? createVNode("i", {
            class: meta.icon
        }, null) : createVNode("svg", {
            class: "icon",
            viewBox: "0 0 1024 1024",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "p-id": "19771",
            width: "32",
            height: "32"
        }, [ createVNode("path", {
            d: "M512 958.8C265.6 958.8 65.2 758.4 65.2 512S265.6 65.2 512 65.2 958.8 265.6 958.8 512 758.4 958.8 512 958.8z m0-832c-212.4 0-385.2 172.8-385.2 385.2S299.6 897.2 512 897.2 897.2 724.4 897.2 512 724.4 126.8 512 126.8z",
            "p-id": "19772"
        }, null), createVNode("path", {
            d: "M512 512m-169.5 0a169.5 169.5 0 1 0 339 0 169.5 169.5 0 1 0-339 0Z",
            "p-id": "19773"
        }, null) ]) ]), createVNode("span", {
            class: _ns.be("item", "title")
        }, [ t(meta.title) ]) ]);
    }
});

const NextMenuItem = defineComponent({
    name: "NextMenuItem",
    props: {
        menuData: {
            type: Array,
            required: !0
        }
    },
    setup(props) {
        const _ns = inject("ns", {}), menuTree = computed((() => props.menuData)).value;
        return () => createVNode(Fragment, null, [ createVNode(Fragment, null, [ menuTree.map((item => item.children?.length ? valueExist(item.meta?.isHide, !1) ? null : createVNode(ElSubMenu, {
            "popper-class": _ns.b("popper"),
            index: item.path || item.id,
            teleported: !0
        }, {
            title: () => createVNode(MenuItemTitle, {
                meta: item.meta
            }, null),
            default: () => createVNode(NextMenuItem, {
                menuData: item.children
            }, null)
        }) : valueExist(item.meta?.isHide, !1) ? null : createVNode(ElMenuItem, {
            index: item.path
        }, {
            default: () => [ createVNode(MenuItemTitle, {
                meta: item.meta
            }, null) ]
        }))) ]) ]);
    }
}), ns$g = useNamespace("menu");

const NextMenu = withInstall(defineComponent({
    name: "NextMenu",
    props: {
        className: {
            type: String,
            default: ""
        },
        style: {
            type: Object,
            default: () => ({})
        },
        router: {
            type: Boolean,
            default: !0
        },
        mode: {
            type: String,
            values: [ "horizontal", "vertical" ],
            default: "horizontal"
        },
        menuTree: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        provide("ns", ns$g);
        const router = getCurrentInstance().appContext.config.globalProperties.$router, currentPath = router.currentRoute?.value.fullPath, activePath = ref(currentPath);
        watch((() => router.currentRoute?.value), (to => {
            activePath.value = to.fullPath;
        }));
        return () => createVNode(Fragment, null, [ createVNode(ElMenu, {
            class: [ ns$g.b(), props.className ],
            style: props.style,
            defaultActive: activePath.value,
            router: props.router,
            mode: props.mode,
            ellipsis: !0
        }, {
            default: () => [ createVNode(Fragment, null, [ props.menuTree.map((item => item.children?.length ? valueExist(item.meta?.isHide, !1) ? null : createVNode(ElSubMenu, {
                "popper-class": ns$g.b("popper"),
                index: item.path || item.id,
                teleported: !0
            }, {
                title: () => createVNode(MenuItemTitle, {
                    meta: item.meta
                }, null),
                default: () => createVNode(NextMenuItem, {
                    menuData: item.children
                }, null)
            }) : valueExist(item.meta?.isHide, !1) ? null : createVNode(ElMenuItem, {
                "popper-class": ns$g.b("popper"),
                index: item.path
            }, {
                default: () => [ createVNode(MenuItemTitle, {
                    meta: item.meta
                }, null) ]
            }))) ]) ]
        }) ]);
    }
}));

var Sidebar$2 = defineComponent({
    setup: () => ({
        ns: inject("ns", {})
    }),
    render() {
        const slots = this.$slots, _ns = this.ns, _config = inject("options", {});
        return createVNode("aside", {
            class: _ns.b("sidebar")
        }, [ createVNode(ElScrollbar, null, {
            default: () => [ slots[slots_config_headerMenu] ? slots[slots_config_headerMenu]() : createVNode(NextMenu, {
                mode: "vertical",
                menuTree: _config.menuTree
            }, null) ]
        }) ]);
    }
});

const ns$f = useNamespace("layout-defaults");

var defaults = defineComponent({
    props: {},
    setup: () => (provide("ns", ns$f), {}),
    render() {
        const slots = this.$slots, _config = inject("options", {}), _emit = inject("__emit__", {});
        slots.menu;
        const isTabs = ref(!!slots.tabs);
        return void 0 === slots.tabs && _config.showTabs && (isTabs.value = !0), createVNode(ElContainer, {
            class: ns$f.b()
        }, {
            default: () => [ createVNode(Sidebar$2, null, null), createVNode("div", {
                class: [ ns$f.b("content") ]
            }, [ createVNode(Header$3, null, null), _config.showTabs ? slots.tabs ? slots.tabs?.() : createVNode(NextTabs, {
                tabs: _config.tabs,
                activeTab: _config.activeTab,
                onChange: (...arg) => _emit("tabsChange", ...arg),
                onSelect: (...arg) => _emit("tabsSelect", ...arg),
                onClose: (...arg) => _emit("tabsClose", ...arg)
            }, null) : null, createVNode("main", {
                class: [ ns$f.bf("main"), ns$f.is("layout-tabs", isTabs.value) ]
            }, [ slots.default?.() ]) ]) ]
        });
    }
});

const {getLightColor: getLightColor$2} = useChangeColor();

var Header$2 = defineComponent({
    setup(props, {slots: slots}) {
        const _ns = inject("ns", {}), _config = inject("options", {}), headerStyle = computed((() => {
            const {isHeaderBarColorGradual: isHeaderBarColorGradual, headerBarColor: color} = _config.setting;
            return isHeaderBarColorGradual ? {
                background: `linear-gradient(to bottom , ${color}, ${getLightColor$2(color, .5)})`
            } : "";
        }));
        return () => createVNode(Fragment, null, [ createVNode("header", {
            class: _ns.b("header"),
            style: headerStyle.value
        }, [ createVNode(LogoView, null, null), createVNode("div", {
            class: _ns.bf("header", "menu")
        }, [ slots[slots_config_headerMenu] ? slots[slots_config_headerMenu]() : createVNode(NextMenu, {
            menuTree: _config.menuTree,
            router: _config.menuRouter,
            mode: _config.menuMode
        }, null) ]), createVNode("div", {
            class: _ns.bf("header", "right")
        }, [ createVNode(HeaderTools, null, {
            default: () => [ slots[slots_config_headerToolsPrefix]?.(), slots[slots_config_headerToolsSuffix]?.() ]
        }) ]) ]) ]);
    }
});

const ns$e = useNamespace("layout-transverse");

var transverse = defineComponent({
    props: {},
    setup: () => (provide("ns", ns$e), {}),
    render() {
        const slots = this.$slots, _config = inject("options", {}), _emit = inject("__emit__", {}), __slots_header = {};
        slots[slots_config_headerMenu] && (__slots_header[slots_config_headerMenu] = () => slots[slots_config_headerMenu]()), 
        slots[slots_config_headerToolsPrefix] && (__slots_header[slots_config_headerToolsPrefix] = () => slots[slots_config_headerToolsPrefix]()), 
        slots[slots_config_headerToolsSuffix] && (__slots_header[slots_config_headerToolsSuffix] = () => slots[slots_config_headerToolsSuffix]());
        const isTabs = ref(!!slots.tabs);
        return void 0 === slots.tabs && _config.showTabs && (isTabs.value = !0), createVNode(Fragment, null, [ createVNode(Header$2, null, (s = __slots_header, 
        "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s) ? __slots_header : {
            default: () => [ __slots_header ]
        })), _config.showTabs ? slots.tabs ? slots.tabs?.() : createVNode(NextTabs, {
            tabs: _config.tabs,
            activeTab: _config.activeTab,
            onChange: (...arg) => _emit("tabsChange", ...arg),
            onSelect: (...arg) => _emit("tabsSelect", ...arg),
            onClose: (...arg) => _emit("tabsClose", ...arg)
        }, null) : null, createVNode("main", {
            class: [ ns$e.b("main"), ns$e.is("layout-tabs", isTabs.value) ]
        }, [ slots.default?.() ]) ]);
        var s;
    }
});

const {getLightColor: getLightColor$1} = useChangeColor();

var Header$1 = defineComponent({
    setup(props, {slots: slots}) {
        const _ns = inject("ns", {}), _config = inject("options", {}), headerStyle = computed((() => {
            const {isHeaderBarColorGradual: isHeaderBarColorGradual, headerBarColor: color} = _config.setting;
            return isHeaderBarColorGradual ? {
                background: `linear-gradient(to bottom , ${color}, ${getLightColor$1(color, .5)})`
            } : "";
        }));
        return () => createVNode(Fragment, null, [ createVNode("header", {
            class: _ns.b("header"),
            style: headerStyle.value
        }, [ createVNode(LogoView, null, null), createVNode("div", {
            class: _ns.bf("header", "menu")
        }, null), createVNode("div", {
            class: _ns.bf("header", "right")
        }, [ createVNode(HeaderTools, null, {
            default: () => [ slots[slots_config_headerToolsPrefix]?.(), slots[slots_config_headerToolsSuffix]?.() ]
        }) ]) ]) ]);
    }
}), Sidebar$1 = defineComponent({
    setup: () => ({
        ns: inject("ns", {})
    }),
    render() {
        const slots = this.$slots, _ns = this.ns, _config = inject("options", {});
        return createVNode("aside", {
            class: _ns.b("sidebar")
        }, [ slots[slots_config_headerMenu] ? slots[slots_config_headerMenu]() : createVNode(NextMenu, {
            mode: "vertical",
            menuTree: _config.menuTree
        }, null) ]);
    }
});

const ns$d = useNamespace("layout-columns");

var columns = defineComponent({
    props: {},
    setup: () => (provide("ns", ns$d), {}),
    render() {
        const slots = this.$slots, _config = inject("options", {}), _emit = inject("__emit__", {}), __slots_header = {};
        slots[slots_config_headerMenu] && (__slots_header[slots_config_headerMenu] = () => slots[slots_config_headerMenu]()), 
        slots[slots_config_headerToolsPrefix] && (__slots_header[slots_config_headerToolsPrefix] = () => slots[slots_config_headerToolsPrefix]()), 
        slots[slots_config_headerToolsSuffix] && (__slots_header[slots_config_headerToolsSuffix] = () => slots[slots_config_headerToolsSuffix]());
        const isTabs = ref(!!slots.tabs);
        return void 0 === slots.tabs && _config.showTabs && (isTabs.value = !0), createVNode(ElContainer, {
            class: ns$d.b()
        }, {
            default: () => {
                return [ createVNode(Sidebar$1, null, null), createVNode("div", {
                    class: [ ns$d.b("content") ]
                }, [ createVNode(Header$1, null, (s = __slots_header, "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s) ? __slots_header : {
                    default: () => [ __slots_header ]
                })), _config.showTabs ? slots.tabs ? slots.tabs?.() : createVNode(NextTabs, {
                    tabs: _config.tabs,
                    activeTab: _config.activeTab,
                    onChange: (...arg) => _emit("tabsChange", ...arg),
                    onSelect: (...arg) => _emit("tabsSelect", ...arg),
                    onClose: (...arg) => _emit("tabsClose", ...arg)
                }, null) : null, createVNode("main", {
                    class: [ ns$d.bf("main"), ns$d.is("layout-tabs", isTabs.value) ]
                }, [ slots.default?.() ]) ]) ];
                var s;
            }
        });
    }
});

const {getLightColor: getLightColor} = useChangeColor();

var Header = defineComponent({
    setup(props, {slots: slots}) {
        const _ns = inject("ns", {}), _config = inject("options", {}), headerStyle = computed((() => {
            const {isHeaderBarColorGradual: isHeaderBarColorGradual, headerBarColor: color} = _config.setting;
            return isHeaderBarColorGradual ? {
                background: `linear-gradient(to bottom , ${color}, ${getLightColor(color, .5)})`
            } : "";
        }));
        return () => createVNode(Fragment, null, [ createVNode("header", {
            class: _ns.b("header"),
            style: headerStyle.value
        }, [ createVNode(LogoView, null, null), createVNode("div", {
            class: _ns.bf("header", "menu")
        }, [ slots[slots_config_headerMenu]?.() ]), createVNode("div", {
            class: _ns.bf("header", "right")
        }, [ createVNode(HeaderTools, null, {
            default: () => [ slots[slots_config_headerToolsPrefix]?.(), slots[slots_config_headerToolsSuffix]?.() ]
        }) ]) ]) ]);
    }
}), Sidebar = defineComponent({
    setup: () => ({
        ns: inject("ns", {})
    }),
    render() {
        const slots = this.$slots, _ns = this.ns, _config = inject("options", {});
        return createVNode("aside", {
            class: _ns.b("sidebar")
        }, [ createVNode(ElScrollbar, null, {
            default: () => [ slots[slots_config_headerMenu] ? slots[slots_config_headerMenu]() : createVNode(NextMenu, {
                mode: "vertical",
                menuTree: _config.menuTree
            }, null) ]
        }) ]);
    }
});

const ns$c = useNamespace("layout-classic");

var classic = defineComponent({
    props: {},
    setup: () => (provide("ns", ns$c), {
        ns: ns$c
    }),
    render() {
        const slots = this.$slots, _config = inject("options", {}), _emit = inject("__emit__", {});
        slots.menu;
        const isTabs = ref(!!slots.tabs);
        return void 0 === slots.tabs && _config.showTabs && (isTabs.value = !0), createVNode(Fragment, null, [ createVNode(Header, null, null), createVNode("div", {
            class: [ ns$c.b("content"), ns$c.is("layout-tabs", isTabs.value) ]
        }, [ createVNode(Sidebar, null, null), createVNode("div", {
            class: ns$c.b("container")
        }, [ _config.showTabs ? slots.tabs ? slots.tabs?.() : createVNode(NextTabs, {
            tabs: _config.tabs,
            activeTab: _config.activeTab,
            onChange: (...arg) => _emit("tabsChange", ...arg),
            onSelect: (...arg) => _emit("tabsSelect", ...arg),
            onClose: (...arg) => _emit("tabsClose", ...arg)
        }, null) : null, createVNode("main", {
            class: [ ns$c.b("main") ]
        }, [ slots.default?.() ]) ]) ]) ]);
    }
});

const ns$b = useNamespace("layout"), layouts = {
    defaults: markRaw(defaults),
    transverse: markRaw(transverse),
    columns: markRaw(columns),
    classic: markRaw(classic)
}, customizerCoverArray = (objValue, srcValue) => {
    if (Array.isArray(objValue)) return srcValue;
};

const NextLayout = withInstall(defineComponent({
    name: "NextLayout",
    props: {
        className: {
            type: String,
            default: ""
        },
        style: {
            type: Object,
            default: () => ({})
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    emits: [ "changeLanguage", "changeUserDropdown", "changeOptions", "tabsChange", "tabsSelect", "tabsClose" ],
    setup(props, {slots: slots, emit: emit}) {
        const _config = ref(mergeWith(defaultConfig$2, props.options, customizerCoverArray));
        provide("options", _config.value), provide("__ns__", ns$b), provide("__emit__", emit), 
        provide("__slots__", slots);
        const updateOptions = cfg => {
            _config.value = mergeWith(_config.value, cfg, customizerCoverArray), updateThemeColorCssVar(_config.value?.setting), 
            emit("changeOptions", _config.value);
        };
        return provide("updateOptions", updateOptions), watch((() => props.options), (cfg => {
            updateOptions(cfg);
        }), {
            deep: !0,
            immediate: !0
        }), {
            options: _config.value,
            updateOptions: updateOptions
        };
    },
    render() {
        const props = this.$props, slots = this.$slots, layout = this.options.setting?.layout || "transverse", activeLayout = ref(layouts[layout]);
        watchEffect((() => {
            activeLayout.value = layouts[layout], activeLayout.value || (activeLayout.value = layouts.transverse);
        }));
        const _activeSlots = {};
        for (const key in slots) Object.prototype.hasOwnProperty.call(slots, key) && (_activeSlots[key] = () => slots[key]?.());
        return createVNode("div", {
            class: [ ns$b.b(), props.className ],
            style: props.style
        }, [ h(activeLayout.value, {}, {
            ..._activeSlots
        }) ]);
    }
})), ns$a = useNamespace("tabs");

var Element$6 = defineComponent({
    name: "NextTabs",
    props: {
        activeTab: {
            type: [ String, Number ],
            default: "/"
        },
        tabs: {
            type: Array,
            default: () => []
        }
    },
    emits: [ "change", "select", "close" ],
    setup(props, {emit: emit}) {
        const {t: t} = useLocale(), router = getCurrentInstance().appContext.config.globalProperties.$router, _activeTab = computed((() => router.currentRoute.value.fullPath)), _tabs = computed((() => props.tabs)), defaultIndex = _tabs.value?.findIndex((v => v.path === _activeTab.value));
        if (defaultIndex < 0) {
            const tab = _tabs.value[0];
            tab && tab.path && router.replace({
                path: tab.path
            });
        }
        const activeIndex = ref(defaultIndex), tabsView = ref(_tabs.value), onChange = command => {
            const active = _activeTab.value, len = tabsView.value.length, i = tabsView.value.findIndex((v => v.path === active));
            switch (command) {
              case "other":
                i > -1 && (activeIndex.value = 1, tabsView.value = [ tabsView.value[0], tabsView.value[i] ]);
                break;

              case "left":
                if (i > -1) {
                    const rightTags = tabsView.value.slice(i);
                    rightTags.unshift(tabsView.value[0]), tabsView.value = rightTags, activeIndex.value = 1;
                }
                break;

              case "right":
                if (i > -1 && i < len - 1) {
                    const leftTags = tabsView.value.slice(0, i + 1);
                    tabsView.value = leftTags;
                }
                break;

              case "all":
                const homeTag = tabsView.value[0];
                activeIndex.value = 0, tabsView.value = [ homeTag ], onClickTabItem(null, homeTag, activeIndex.value);
            }
            emit("change", activeIndex.value, tabsView.value, command);
        }, onClickTabItem = (event, tab, index) => {
            event?.stopPropagation(), activeIndex.value = index;
            let to = {
                path: tab.path,
                query: tab.query,
                params: tab.params
            };
            router.push(to), emit("select", tab, index);
        };
        watch((() => router.currentRoute?.value), (to => {
            const {tagTitle: tagTitle} = to.query, activeRoute = {
                name: to.name,
                title: tagTitle || to.meta?.title,
                path: to.path,
                meta: to.meta,
                params: to.params,
                query: to.query
            }, i = tabsView.value.findIndex((v => v.path === to.path));
            i > -1 ? (activeIndex.value = i, tabsView.value[i] = activeRoute) : (activeIndex.value = tabsView.value.length, 
            tabsView.value.push(activeRoute)), emit("change", activeIndex.value, tabsView.value, "add");
        }));
        const renderContent = () => createVNode("nav", {
            class: ns$a.b()
        }, [ createVNode(ElScrollbar, null, {
            default: () => [ createVNode("ul", {
                class: ns$a.b("list")
            }, [ tabsView.value.map(((tab, index) => tab ? createVNode("li", {
                class: [ "tab-item", ns$a.is("active", activeIndex.value === index) ],
                onClick: event => onClickTabItem(event, tab, index)
            }, [ createVNode("i", {
                class: [ "tab-icon", tab.meta?.icon ]
            }, null), createVNode("span", null, [ t(tab.title) ]), tab.meta?.isAffix || "/" === tab.path ? null : createVNode("span", {
                onClick: event => ((event, tab, index) => {
                    event.stopPropagation();
                    const active = _activeTab.value;
                    if (active === tab.path) {
                        const prevTag = tabsView.value[index - 1];
                        router.push({
                            path: prevTag.path,
                            query: prevTag.query || {},
                            params: prevTag.params || {}
                        }), emit("close", prevTag, tabsView.value);
                    }
                    tabsView.value.splice(index, 1);
                    const i = tabsView.value.findIndex((v => v.path === active)) || 0;
                    activeIndex.value = i > -1 ? i : 0, emit("change", activeIndex.value, tabsView.value, "close");
                })(event, tab, index)
            }, [ createVNode(ElIcon, {
                class: "tab-close"
            }, {
                default: () => [ createVNode(Close, null, null) ]
            }) ]) ]) : null)) ]) ]
        }), createVNode(ElDropdown, {
            "show-timeout": 80,
            "hide-timeout": 80,
            onCommand: onChange
        }, {
            default: () => createVNode("span", {
                class: ns$a.b("tab-more")
            }, [ createVNode("i", {
                class: [ ns$a.be("tab-more", "box"), ns$a.be("tab-more", "top") ]
            }, null), createVNode("i", {
                class: [ ns$a.be("tab-more", "box"), ns$a.be("tab-more", "bottom") ]
            }, null) ]),
            dropdown: () => createVNode(ElDropdownMenu, null, {
                default: () => [ createVNode(ElDropdownItem, {
                    command: "other"
                }, {
                    default: () => [ createVNode(ElIcon, null, {
                        default: () => [ createVNode(Close, null, null) ]
                    }), createVNode("span", null, [ t("next.layout.tabsOther") ]) ]
                }), createVNode(ElDropdownItem, {
                    command: "left"
                }, {
                    default: () => [ createVNode(ElIcon, null, {
                        default: () => [ createVNode(Back, null, null) ]
                    }), createVNode("span", null, [ t("next.layout.tabsLeft") ]) ]
                }), createVNode(ElDropdownItem, {
                    command: "right"
                }, {
                    default: () => [ createVNode(ElIcon, null, {
                        default: () => [ createVNode(Right, null, null) ]
                    }), createVNode("span", null, [ t("next.layout.tabsRight") ]) ]
                }), createVNode(ElDropdownItem, {
                    command: "all"
                }, {
                    default: () => [ createVNode(ElIcon, null, {
                        default: () => [ createVNode(Close, null, null) ]
                    }), createVNode("span", null, [ t("next.layout.tabsAll") ]) ]
                }) ]
            })
        }) ]);
        return () => createVNode(Fragment, null, [ renderContent() ]);
    }
});

const NextTabs = withInstall(Element$6), ns$9 = useNamespace("container");

const NextContainer = withInstall(defineComponent({
    name: "NextContainer",
    props: {
        className: {
            type: String,
            default: ""
        },
        style: {
            type: Object,
            default: () => ({})
        },
        scrollbar: {
            type: Boolean,
            default: !1
        },
        padding: {
            type: [ Boolean, String, Number ],
            default: !0
        },
        card: {
            type: Boolean,
            default: !1
        }
    },
    setup(props, {slots: slots}) {
        const styles = computed((() => {
            let style = {};
            const padding = props.padding;
            return "boolean" == typeof padding ? style = padding ? {
                padding: "15px"
            } : {} : "string" == typeof padding ? style = {
                padding: padding
            } : "number" == typeof padding && (style = {
                padding: padding + "px"
            }), style;
        }));
        return () => props.scrollbar ? createVNode(ElScrollbar, {
            class: [ ns$9.b(), props.className ],
            style: props.style
        }, {
            default: () => [ slots.default?.() ]
        }) : createVNode("div", {
            class: [ ns$9.b(), props.className ],
            style: {
                ...styles.value,
                ...props.style
            }
        }, [ props.card ? createVNode("div", {
            class: ns$9.b("card")
        }, [ slots.default?.() ]) : slots.default?.() ]);
    }
}));

var defaultPropsConfig = {
    className: {
        type: String,
        default: ""
    },
    style: {
        type: Object,
        default: () => ({})
    },
    options: {
        type: Object,
        default: () => ({})
    },
    loading: {
        type: Boolean,
        default: !1
    },
    data: {
        type: Array,
        default: () => []
    },
    page: {
        type: Object,
        default: () => ({
            pageIndex: 1,
            pageSize: 10,
            total: 0
        })
    },
    rowStyle: {
        type: Function,
        default: void 0
    },
    rowClassName: {
        type: Function,
        default: void 0
    },
    cellStyle: {
        type: Function,
        default: void 0
    },
    cellClassName: {
        type: Function,
        default: void 0
    },
    headerRowStyle: {
        type: Function,
        default: void 0
    },
    headerRowClassName: {
        type: Function,
        default: void 0
    },
    headerCellStyle: {
        type: Function,
        default: void 0
    },
    headerCellClassName: {
        type: Function,
        default: void 0
    },
    spanMethod: {
        type: Function,
        default: void 0
    }
};

const header_menu_slots_key = [ "menu-left-prefix", "menu-left-suffix", "menu-right-prefix", "menu-right-suffix" ], operation_column_slots_key = [ "operation-column-prefix", "operation-column-suffix" ];

var defaultConfig$1 = {
    initLoadData: !0,
    defaultContentHeight: 300,
    fullscreenchangeContentHeight: !1,
    rowKey: "id",
    size: "default",
    fit: !0,
    stripe: !0,
    border: !0,
    index: !0,
    selection: !0,
    headerAlign: "center",
    cellAlign: "center",
    columnMinWidth: "100px",
    columns: [],
    showSearchForm: !0,
    showHeaderMenu: !0,
    showSearchLabel: !0,
    searchSpan: 4,
    searchGutter: 20,
    searchLabelWidth: "5em",
    searchColumnMinWidth: 300,
    searchColumns: [],
    addBtn: !0,
    viewBtn: !0,
    delBtn: !0,
    editBtn: !0,
    batchDelBtn: !1,
    refreshBtn: !0,
    settingBtn: !0,
    operations: !0,
    operationsWidth: 260,
    operationsBtnPlain: !1,
    operationsBtnText: !0,
    operationsBtnSize: "small",
    addBtnText: "",
    isPagination: !0,
    dialogTitle: "",
    dialogWidth: "60%",
    dialogFullscreen: !1,
    closeOnClickModal: !1,
    formColumns: [],
    formLabelWidth: "5em",
    formSpan: 12,
    formColumnMinWidth: 350
};

const columnSlotName = prop => "column-" + prop, searchFormSlotName = prop => "search-" + prop, formSlotName = prop => "form-" + prop, ns$8 = useNamespace("spin-loading");

var SpinLoading = defineComponent({
    name: "NextSpinLoading",
    props: {
        className: {
            type: String,
            default: ""
        },
        style: {
            type: Object,
            default: () => ({})
        },
        loading: {
            type: Boolean,
            default: !1
        },
        tip: {
            type: String,
            default: ""
        }
    },
    setup() {
        const {t: t} = useLocale();
        return {
            t: t
        };
    },
    render() {
        const _t = this.t, slots = this.$slots, props = this.$props, loadingText = props.tip || _t("next.loading");
        return createVNode("div", {
            class: [ ns$8.b(), props.className ],
            style: props.style
        }, [ props.loading ? createVNode("div", {
            class: ns$8.b("mask")
        }, [ createVNode("span", {
            class: ns$8.b("mask-dot")
        }, [ createVNode("i", {
            class: ns$8.be("mask", "dot-item")
        }, null), createVNode("i", {
            class: ns$8.be("mask", "dot-item")
        }, null), createVNode("i", {
            class: ns$8.be("mask", "dot-item")
        }, null), createVNode("i", {
            class: ns$8.be("mask", "dot-item")
        }, null) ]), createVNode("span", {
            class: ns$8.be("mask", "text")
        }, [ loadingText ]) ]) : null, slots.default?.() ]);
    }
}), SearchColumn = defineComponent({
    name: "SearchColumn",
    props: {
        searchSpan: {
            type: Number,
            default: 4
        },
        columns: {
            type: Array,
            default: () => []
        },
        formParams: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, {slots: slots}) {
        const _options = inject("options", {}), options = isRef(_options) ? unref(_options) : _options, {t: t} = useLocale(), ns = inject("ns", {}), columns = ref(props.columns);
        watch((() => props.columns), (() => {
            columns.value = props.columns;
        }), {
            deep: !0
        });
        const formParams = reactive(props.formParams), _defaultDisabledDate = time => time.getTime() > Date.now(), _defaultShortcuts = [ {
            text: t("next.date.oneWeekAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 6048e5), [ start, end ];
            }
        }, {
            text: t("next.date.oneMonthAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 2592e6), [ start, end ];
            }
        }, {
            text: t("next.date.threeMonthsAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 7776e6), [ start, end ];
            }
        }, {
            text: t("next.date.oneYearAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 31536e6), [ start, end ];
            }
        }, {
            text: t("next.date.threeYearsAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 94608e6), [ start, end ];
            }
        } ], _onChangeNumberRange = (value, key) => {
            formParams.value[key] = value;
        }, renderColItemContent = col => {
            const _disabled = valueExist(col.searchDisabled, col.disabled, !1);
            if (slots[searchFormSlotName(col.prop)]) return slots[searchFormSlotName(col.prop)]({
                column: col
            });
            if ("input" === col.type || !col.type) {
                const placeholder = t("next.form.input") + (col.searchPlaceholder || col.searchLabel || col.label);
                return createVNode(ElInput, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    clearable: !0,
                    disabled: _disabled,
                    placeholder: placeholder
                }, {
                    prefix: col.prefix ? () => col.prefix(formParams, col) : null,
                    suffix: col.suffix ? () => col.suffix(formParams, col) : null,
                    prepend: col.prepend ? () => col.prepend(formParams, col) : null,
                    append: col.append ? () => col.append(formParams, col) : null
                });
            }
            if ("inputInteger" === col.type) {
                const placeholder = t("next.form.input") + (col.searchPlaceholder || col.searchLabel || col.label);
                return createVNode(ElInput, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    clearable: !0,
                    disabled: _disabled,
                    placeholder: placeholder,
                    onInput: e => ((val, key) => {
                        const value = val.replace(/\D/g, "");
                        formParams.value[key] = value;
                    })(e, col.prop)
                }, {
                    prefix: col.prefix ? () => col.prefix(formParams, col) : null,
                    suffix: col.suffix ? () => col.suffix(formParams, col) : null,
                    prepend: col.prepend ? () => col.prepend(formParams, col) : null,
                    append: col.append ? () => col.append(formParams, col) : null
                });
            }
            if ("inputNumber" === col.type) {
                const placeholder = t("next.form.input") + (col.searchPlaceholder || col.searchLabel || col.label);
                return createVNode(ElInput, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    clearable: !0,
                    disabled: _disabled,
                    placeholder: placeholder,
                    onInput: e => ((val, key) => {
                        let value = val;
                        value = value.replace(/[^0-9\.]/g, ""), value = value.replace(/^\./, "0."), value = value.replace(/\.{2,}/g, "."), 
                        value = value.replace(".", "DUMMY"), value = value.replace(/\./g, ""), value = value.replace("DUMMY", "."), 
                        formParams.value[key] = value;
                    })(e, col.prop)
                }, {
                    prefix: col.prefix ? () => col.prefix(formParams, col) : null,
                    suffix: col.suffix ? () => col.suffix(formParams, col) : null,
                    prepend: col.prepend ? () => col.prepend(formParams, col) : null,
                    append: col.append ? () => col.append(formParams, col) : null
                });
            }
            if ("select" === col.type) {
                const placeholder = t("next.form.select") + (col.searchPlaceholder || col.searchLabel || col.label);
                return createVNode(ElSelect, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    clearable: !0,
                    disabled: _disabled,
                    placeholder: placeholder,
                    multiple: col.searchMultiple || !1,
                    "collapse-tags": !0,
                    "collapse-tags-tooltip": !0
                }, {
                    default: () => [ col.dicData && col.dicData.map((item => createVNode(ElOption, {
                        value: item.value,
                        label: item.label
                    }, null))) ]
                });
            }
            if ("date" === col.type) {
                const placeholder = t("next.form.select") + (col.searchPlaceholder || col.searchLabel || col.label);
                return createVNode(ElDatePicker, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    type: "date",
                    "value-format": col.searchFormat || "YYYY-MM-DD",
                    format: col.searchFormat || "YYYY-MM-DD",
                    clearable: !0,
                    "disabled-date": col.searchDisabledDate || _defaultDisabledDate,
                    disabled: _disabled,
                    placeholder: placeholder,
                    editable: col.searchEditable || !1
                }, null);
            }
            if ("datetimerange" === col.type) return createVNode(ElDatePicker, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                type: "datetimerange",
                "value-format": col.searchFormat || "YYYY-MM-DD HH:mm:ss",
                format: col.searchFormat || "YYYY-MM-DD HH:mm:ss",
                clearable: !0,
                "range-separator": t("next.date.rangeSeparator"),
                "start-placeholder": t("next.date.startPlaceholder"),
                "end-placeholder": t("next.date.endPlaceholder"),
                "disabled-date": col.searchDisabledDate || _defaultDisabledDate,
                disabled: _disabled,
                editable: col.searchEditable || !1,
                shortcuts: col.searchShortcuts || _defaultShortcuts
            }, null);
            if ("numberRange" === col.type) {
                const value = formParams[col.prop], startNumber = ref(value[0]), endNumber = ref(value[1]), minNumber = ref(col.searchMin), maxNumber = ref(col.searchMax), controls = ref(!0), onChangeStart = num => {
                    startNumber.value = num, _onChangeNumberRange([ startNumber.value, endNumber.value ], col.prop);
                }, onChangeEnd = num => {
                    endNumber.value = num, _onChangeNumberRange([ startNumber.value, endNumber.value ], col.prop);
                };
                return createVNode("div", {
                    class: ns.b("header-search-item-number-range")
                }, [ createVNode(ElInputNumber, {
                    modelValue: startNumber.value,
                    "onUpdate:modelValue": $event => startNumber.value = $event,
                    min: minNumber.value,
                    max: maxNumber.value,
                    controls: controls.value,
                    onChange: onChangeStart
                }, null), createVNode("span", {
                    class: "number-range-division"
                }, [ t("next.date.rangeSeparator") ]), createVNode(ElInputNumber, {
                    modelValue: endNumber.value,
                    "onUpdate:modelValue": $event => endNumber.value = $event,
                    min: minNumber.value,
                    max: maxNumber.value,
                    controls: controls.value,
                    onChange: onChangeEnd
                }, null) ]);
            }
            return "treeSelect" === col.type ? createVNode(NextTreeSelect, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                disabled: col.disabled,
                column: col,
                formParams: formParams
            }, null) : void 0;
        };
        return () => createVNode(Fragment, null, [ createVNode(Fragment, null, [ columns.value.map((col => !col.hide && createVNode(ElCol, {
            span: props.searchSpan,
            class: ns.b("header-search-item")
        }, {
            default: () => [ createVNode(ElFormItem, null, {
                label: () => col.label && valueExist(options.showSearchLabel, !0) ? createVNode(NextTextEllipsis, {
                    width: options.searchLabelWidth,
                    content: col.label,
                    textAlign: "right"
                }, null) : null,
                default: () => renderColItemContent(col)
            }) ]
        }))) ]) ]);
    }
});

function _isSlot$5(s) {
    return "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s);
}

var HeaderSearch = defineComponent({
    name: "HeaderSearch",
    props: {
        columns: {
            type: Array,
            default: () => []
        }
    },
    emits: [ "confirmSearch", "clearSearch", "zoomResize" ],
    setup(props, {emit: emit, slots: slots}) {
        const _options = inject("options", {}), options = isRef(_options) ? unref(_options) : _options, ns = inject("ns", {}), {t: t} = useLocale(), searchFormSlots = inject("searchFormSlots"), searchFrom_slots = {};
        searchFormSlots.value.forEach((slotName => {
            searchFrom_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        }));
        const searchParams = reactive({}), columns = ref(props.columns), _initSearchFormParams = () => {
            columns.value.forEach((col => {
                searchParams[col.prop] = "", isValueExist(col.defaultValue) && (searchParams[col.prop] = col.defaultValue);
            }));
        };
        _initSearchFormParams();
        const onConfirmSearch = () => {
            emit("confirmSearch", searchParams);
        }, onClearSearch = () => {
            _initSearchFormParams(), onConfirmSearch(), emit("clearSearch");
        }, searchSpan = ref(options.searchSpan), columnsLength = columns.value.length, sliceIndex = ref(columnsLength), showColumns = ref(columns.value), moreColumns = ref([]), isColumnMinWidth = ref(!1), {proxy: proxy} = getCurrentInstance();
        onMounted((() => {
            const tableSearchFormEl = proxy.$refs.tableSearchForm?.$el;
            tableSearchFormEl && elementResize(tableSearchFormEl, (el => {
                (el => {
                    const formWidth = el.clientWidth, minWidth = options.searchColumnMinWidth;
                    let span = Math.floor(formWidth / minWidth);
                    searchSpan.value = Math.ceil(24 / span);
                    const remainder = 24 % searchSpan.value;
                    if (remainder && (searchSpan.value = remainder, span = 24 / searchSpan.value), sliceIndex.value = span, 
                    columnsLength >= sliceIndex.value) {
                        const index = sliceIndex.value - 1;
                        showColumns.value = columns.value.slice(0, index), moreColumns.value = columns.value.slice(index);
                    } else showColumns.value = columns.value, moreColumns.value = [];
                    const columnWidth = Math.floor(formWidth / span);
                    isColumnMinWidth.value = columnWidth < minWidth;
                })(el), emit("zoomResize");
            }));
        }));
        const isExpand = ref(!1), onSwitchExpand = () => {
            isExpand.value = !isExpand.value;
        };
        return () => createVNode(Fragment, null, [ columns.value.length ? createVNode(ElForm, {
            ref: "tableSearchForm",
            inline: !0,
            size: options.size,
            model: searchParams,
            class: ns.b("header")
        }, {
            default: () => [ createVNode(ElRow, {
                gutter: options.searchGutter,
                class: ns.b("header-search")
            }, {
                default: () => [ createVNode(SearchColumn, {
                    searchSpan: searchSpan.value,
                    columns: showColumns.value,
                    formParams: searchParams
                }, _isSlot$5(searchFrom_slots) ? searchFrom_slots : {
                    default: () => [ searchFrom_slots ]
                }), isExpand.value ? createVNode(SearchColumn, {
                    searchSpan: searchSpan.value,
                    columns: moreColumns.value,
                    formParams: searchParams
                }, _isSlot$5(searchFrom_slots) ? searchFrom_slots : {
                    default: () => [ searchFrom_slots ]
                }) : null, createVNode(ElCol, {
                    span: searchSpan.value,
                    class: ns.b("header-search-btns")
                }, {
                    default: () => [ createVNode(ElFormItem, null, {
                        default: () => [ createVNode(ElButton, {
                            type: "primary",
                            onClick: onConfirmSearch
                        }, {
                            icon: () => createVNode(ElIcon, null, {
                                default: () => [ createVNode(Search, null, null) ]
                            }),
                            default: () => t("next.table.search")
                        }), createVNode(ElButton, {
                            onClick: onClearSearch
                        }, {
                            icon: () => createVNode(ElIcon, null, {
                                default: () => [ createVNode(Delete, null, null) ]
                            }),
                            default: () => t("next.table.clear")
                        }), moreColumns.value.length ? isColumnMinWidth.value ? createVNode(ElButton, {
                            type: "primary",
                            text: !0,
                            bg: !0,
                            circle: !0,
                            class: ns.b("header-search-expandBtn"),
                            onClick: onSwitchExpand
                        }, {
                            icon: () => isExpand.value ? createVNode(DArrowLeft, null, null) : createVNode(DArrowRight, null, null)
                        }) : createVNode(ElButton, {
                            type: "primary",
                            text: !0,
                            bg: !0,
                            class: ns.b("header-search-expandBtn"),
                            onClick: onSwitchExpand
                        }, {
                            icon: () => isExpand.value ? createVNode(ElIcon, null, {
                                default: () => [ createVNode(ArrowUp, null, null) ]
                            }) : createVNode(ElIcon, null, {
                                default: () => [ createVNode(ArrowDown, null, null) ]
                            }),
                            default: () => isExpand.value ? t("next.table.foldSearch") : t("next.table.unfoldSearch")
                        }) : null ]
                    }) ]
                }) ]
            }) ]
        }) : null ]);
    }
}), DrawerSetting = defineComponent({
    name: "DrawerSetting",
    setup: () => ({
        visible: ref(!1)
    }),
    render() {
        const _options = inject("options", {}), options = isRef(_options) ? unref(_options) : _options, columns = ref(options.columns), {t: t} = useLocale(), ns = inject("ns", {});
        return createVNode(ElDrawer, {
            modelValue: this.visible,
            "onUpdate:modelValue": $event => this.visible = $event,
            title: t("next.table.setting.title"),
            "append-to-body": !0,
            size: "450px",
            class: ns.b("setting-drawer")
        }, {
            default: () => [ createVNode(ElScrollbar, {
                class: ns.be("setting-drawer", "container")
            }, {
                default: () => [ createVNode(ElTable, {
                    data: columns.value,
                    border: !0,
                    style: {
                        width: "100%"
                    }
                }, {
                    default: () => [ createVNode(ElTableColumn, {
                        prop: "label",
                        label: t("next.table.setting.label"),
                        align: "center"
                    }, {
                        default: ({row: row}) => createVNode(NextTextEllipsis, {
                            content: t(row.label)
                        }, null)
                    }), createVNode(ElTableColumn, {
                        prop: "hide",
                        label: t("next.table.setting.hide"),
                        align: "center",
                        width: "70px"
                    }, {
                        default: ({row: row}) => createVNode(ElCheckbox, {
                            modelValue: row.hide,
                            "onUpdate:modelValue": $event => row.hide = $event
                        }, null)
                    }), createVNode(ElTableColumn, {
                        prop: "filter",
                        label: t("next.table.setting.filter"),
                        align: "center",
                        width: "70px"
                    }, {
                        default: ({row: row}) => createVNode(ElCheckbox, {
                            modelValue: row.filter,
                            "onUpdate:modelValue": $event => row.filter = $event
                        }, null)
                    }), createVNode(ElTableColumn, {
                        prop: "sort",
                        label: t("next.table.setting.sort"),
                        align: "center",
                        width: "70px"
                    }, {
                        default: ({row: row}) => createVNode(ElCheckbox, {
                            modelValue: row.sortable,
                            "onUpdate:modelValue": $event => row.sortable = $event
                        }, null)
                    }) ]
                }) ]
            }) ]
        });
    }
}), HeaderMenu = defineComponent({
    name: "HeaderMenu",
    setup: () => ({}),
    emits: [ "clickAdd", "clickRefresh", "deleteRows" ],
    render() {
        const _options = inject("options", {}), options = isRef(_options) ? unref(_options) : _options, {t: t} = useLocale(), ns = inject("ns", {}), multipleSelection = inject("multipleSelection"), multipleSelectionLength = computed((() => multipleSelection.value.length)), drawerSettingRef = ref();
        return createVNode("div", {
            class: ns.b("header-menu")
        }, [ createVNode("div", {
            class: ns.b("header-menu-left")
        }, [ this.$slots["menu-left-prefix"]?.(), options.addBtn && createVNode(ElButton, {
            type: "primary",
            onClick: () => {
                this.$emit("clickAdd");
            }
        }, {
            icon: () => createVNode(ElIcon, null, {
                default: () => [ createVNode(Plus, null, null) ]
            }),
            default: () => t("next.table.add")
        }), options.batchDelBtn && createVNode(ElButton, {
            type: "danger",
            disabled: !multipleSelectionLength.value,
            onClick: () => {
                const selection = unref(toRaw(multipleSelection.value.map((row => toRaw(row)))));
                ElMessageBox.confirm(t("next.table.message.batchDeleteTip"), t("next.table.message.tip"), {
                    type: "warning",
                    showClose: !1,
                    center: !1,
                    confirmButtonText: t("next.table.message.confirmButtonText"),
                    cancelButtonText: t("next.table.message.cancelButtonText")
                }).then((() => {
                    this.$emit("deleteRows", selection);
                })).catch((() => {
                    ElMessage({
                        type: "info",
                        message: t("next.table.message.cancelBatchDelete")
                    });
                }));
            }
        }, {
            icon: () => createVNode(ElIcon, null, {
                default: () => [ createVNode(Delete, null, null) ]
            }),
            default: () => t("next.table.batchDelete")
        }), this.$slots["menu-left-suffix"]?.() ]), createVNode("div", {
            class: ns.b("header-menu-right")
        }, [ this.$slots["menu-right-prefix"]?.(), options.refreshBtn && createVNode(ElButton, {
            circle: !0,
            onClick: () => {
                this.$emit("clickRefresh");
            }
        }, {
            icon: () => createVNode(ElIcon, null, {
                default: () => [ createVNode(Refresh, null, null) ]
            })
        }), options.settingBtn && createVNode(ElButton, {
            circle: !0,
            onClick: () => {
                drawerSettingRef.value.visible = !0;
            }
        }, {
            icon: () => createVNode(ElIcon, null, {
                default: () => [ createVNode(Tools, null, null) ]
            })
        }), this.$slots["menu-right-suffix"]?.() ]), createVNode(DrawerSetting, {
            ref: drawerSettingRef
        }, null) ]);
    }
});

const TableColumnDynamic = defineComponent({
    name: "TableColumnDynamic",
    props: {
        columnOption: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, {slots: slots}) {
        const columnSlots = inject("columnSlots"), column_slots = {};
        columnSlots.value.forEach((slotName => {
            column_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        }));
        const _options = inject("options", {}), options = isRef(_options) ? unref(_options) : _options, columnOption = props.columnOption, _dicKey = valueExist(columnOption.dicKey, "value"), _formatterColumnValue = (value, dicData) => {
            const item = dicData.find((o => o[_dicKey] == value));
            return item ? item.label : value;
        }, renderCustomItem = (row, $index) => {
            if (columnOption.children?.length > 0) return createVNode(Fragment, null, [ columnOption.children.map((column => {
                return createVNode(TableColumnDynamic, {
                    columnOption: column
                }, "function" == typeof (s = column_slots) || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s) ? column_slots : {
                    default: () => [ column_slots ]
                });
                var s;
            })) ]);
            if (slots[columnSlotName(columnOption.prop)]) return slots[columnSlotName(columnOption.prop)]({
                row: row,
                index: $index
            });
            if (columnOption.dicData?.length > 0) {
                const loopDicData = list => {
                    const temp = [];
                    return list.forEach((node => {
                        const item = {
                            ...node
                        };
                        if (item.children) {
                            const child = loopDicData(item.children);
                            temp.push(...child), delete item.children;
                        }
                        temp.push(item);
                    })), temp;
                }, mergeDicData = loopDicData(columnOption.dicData);
                return createVNode("span", null, [ _formatterColumnValue(row[columnOption.prop], mergeDicData) ]);
            }
            return null;
        };
        return () => createVNode(Fragment, null, [ !columnOption.hide && createVNode(ElTableColumn, {
            prop: columnOption.prop,
            label: columnOption.label,
            headerAlign: columnOption.headerAlign || options.headerAlign,
            align: columnOption.align || options.cellAlign,
            minWidth: columnOption.minWidth || options.columnMinWidth || "auto",
            width: columnOption.width || "auto",
            fixed: columnOption.fixed,
            sortable: columnOption.sortable || !1,
            formatter: columnOption.formatter || null,
            showOverflowTooltip: valueExist(columnOption.showOverflowTooltip, !0)
        }, {
            default: ({row: row, $index: $index}) => renderCustomItem(row, $index)
        }) ]);
    }
});

var TableColumnOperations = defineComponent({
    name: "TableColumnOperations",
    emits: [ "editRow", "viewRow", "deleteRow" ],
    setup(props, {emit: emit, slots: slots}) {
        const _options = inject("options"), options = isRef(_options) ? unref(_options) : _options, {t: t} = useLocale(), operationsShowText = computed((() => {
            const {operationsBtnPlain: operationsBtnPlain, operationsBtnText: operationsBtnText} = options;
            return operationsBtnText || operationsBtnPlain;
        })), renderContent = () => {
            const btnText = options.operationsBtnText, btnPlain = options.operationsBtnPlain, btnSize = options.operationsBtnSize;
            return createVNode(ElTableColumn, {
                fixed: "right",
                label: t("next.table.operation"),
                width: options.operationsWidth,
                headerAlign: options.headerAlign,
                align: options.cellAlign
            }, {
                default: scoped => createVNode(Fragment, null, [ slots["operation-column-prefix"]?.(scoped, {
                    text: btnText,
                    plain: btnPlain,
                    size: btnSize
                }), options.editBtn ? createVNode(ElTooltip, {
                    enterable: !1,
                    effect: "dark",
                    content: t("next.table.edit"),
                    placement: "top",
                    disabled: operationsShowText.value
                }, {
                    default: () => [ createVNode(ElButton, {
                        text: btnText,
                        plain: btnPlain,
                        class: operationsShowText.value ? "" : "operations-btn",
                        size: btnSize,
                        type: "primary",
                        onClick: () => (scoped => {
                            emit("editRow", scoped);
                        })(scoped)
                    }, {
                        icon: () => createVNode(ElIcon, null, {
                            default: () => [ createVNode(EditPen, null, null) ]
                        }),
                        default: () => t("next.table.edit")
                    }) ]
                }) : null, options.viewBtn ? createVNode(ElTooltip, {
                    enterable: !1,
                    effect: "dark",
                    content: t("next.table.view"),
                    placement: "top",
                    disabled: operationsShowText.value
                }, {
                    default: () => [ createVNode(ElButton, {
                        text: btnText,
                        plain: btnPlain,
                        class: operationsShowText.value ? "" : "operations-btn",
                        size: btnSize,
                        type: "primary",
                        onClick: () => (scoped => {
                            emit("viewRow", scoped);
                        })(scoped)
                    }, {
                        icon: () => createVNode(ElIcon, null, {
                            default: () => [ createVNode(View, null, null) ]
                        }),
                        default: () => t("next.table.view")
                    }) ]
                }) : null, options.delBtn ? createVNode(ElTooltip, {
                    enterable: !1,
                    effect: "dark",
                    content: t("next.table.delete"),
                    placement: "top",
                    disabled: operationsShowText.value
                }, {
                    default: () => [ createVNode(ElButton, {
                        text: btnText,
                        plain: btnPlain,
                        class: operationsShowText.value ? "" : "operations-btn",
                        size: btnSize,
                        type: "danger",
                        onClick: () => (scoped => {
                            ElMessageBox.confirm(t("next.table.message.deleteTip"), t("next.table.message.tip"), {
                                type: "warning",
                                showClose: !1,
                                center: !1,
                                confirmButtonText: t("next.table.message.confirmButtonText"),
                                cancelButtonText: t("next.table.message.cancelButtonText")
                            }).then((() => {
                                emit("deleteRow", scoped);
                            })).catch((() => {
                                ElMessage({
                                    type: "info",
                                    message: t("next.table.message.cancelDelete")
                                });
                            }));
                        })(scoped)
                    }, {
                        icon: () => createVNode(ElIcon, null, {
                            default: () => [ createVNode(Delete, null, null) ]
                        }),
                        default: () => t("next.table.delete")
                    }) ]
                }) : null, slots["operation-column-suffix"]?.(scoped, {
                    text: btnText,
                    plain: btnPlain,
                    size: btnSize
                }) ])
            });
        };
        return () => createVNode(Fragment, null, [ renderContent() ]);
    }
}), FooterPagination = defineComponent({
    name: "FooterPagination",
    props: {
        page: {
            type: Object,
            default: () => {}
        }
    },
    emits: [ "change" ],
    setup(props, {emit: emit}) {
        const _options = inject("options", {}), options = isRef(_options) ? unref(_options) : _options, page = props.page, handleCurrentChange = index => {
            page.pageIndex = index, emit("change", page);
        }, handleSizeChange = size => {
            page.pageSize = size, emit("change", page);
        };
        return () => createVNode(Fragment, null, [ createVNode(ElPagination, {
            currentPage: page.pageIndex,
            "onUpdate:currentPage": $event => page.pageIndex = $event,
            pageSize: page.pageSize,
            "onUpdate:pageSize": $event => page.pageSize = $event,
            total: page.total,
            small: "small" === options.size,
            layout: "total, sizes, prev, pager, next, jumper",
            "page-sizes": valueExist(page.pageSizes, [ 10, 20, 30, 40, 50, 100 ]),
            "onCurrent-change": handleCurrentChange,
            "onSize-change": handleSizeChange
        }, null) ]);
    }
});

const ns$7 = useNamespace("dialog");

var NextDialog$1 = defineComponent({
    name: "NextDialog",
    props: {
        modelValue: {
            type: Boolean,
            default: !1
        },
        title: {
            type: String,
            default: ""
        },
        fullscreen: {
            type: Boolean,
            default: !1
        },
        fullscreenBtn: {
            type: Boolean,
            default: !0
        },
        width: {
            type: [ String, Number ],
            default: "50%"
        },
        closeOnClickModal: {
            type: Boolean,
            default: !0
        },
        appendToBody: {
            type: Boolean,
            default: !1
        },
        draggable: {
            type: Boolean,
            default: !0
        },
        zoomSize: {
            type: Boolean,
            default: !0
        },
        destroyOnClose: {
            type: Boolean,
            default: !0
        },
        modal: {
            type: Boolean,
            default: !0
        },
        top: {
            type: String,
            default: "15vh"
        }
    },
    emits: [ "close" ],
    setup(props, {emit: emit, slots: slots}) {
        const visible = ref(props.modelValue);
        watch((() => props.modelValue), (value => {
            visible.value = value;
        }));
        const onClose = () => {
            visible.value = !1, emit("close");
        }, isFullscreen = ref(props.fullscreen);
        return () => createVNode(Fragment, null, [ createVNode(ElDialog, {
            modelValue: visible.value,
            "onUpdate:modelValue": $event => visible.value = $event,
            class: ns$7.b(),
            title: props.title,
            appendToBody: props.appendToBody,
            "destroy-on-close": !0,
            fullscreen: isFullscreen.value,
            "lock-scroll": !0,
            modal: props.modal,
            "show-close": !1,
            closeOnClickModal: props.closeOnClickModal,
            width: props.width,
            top: props.top,
            draggable: props.draggable,
            destroyOnClose: props.destroyOnClose,
            onClose: onClose
        }, {
            default: () => [ slots.default?.() ],
            header: ({close: close, titleId: titleId, titleClass: titleClass}) => createVNode("div", {
                class: ns$7.b("header")
            }, [ createVNode("h4", {
                id: titleId,
                class: titleClass
            }, [ props.title ]), createVNode("div", {
                class: ns$7.e("header-right")
            }, [ props.fullscreenBtn && createVNode("span", {
                class: "icon-fullscreen",
                onClick: () => isFullscreen.value = !isFullscreen.value
            }, [ createVNode(ElIcon, null, {
                default: () => [ createVNode(FullScreen, null, null) ]
            }) ]), createVNode("span", {
                class: "icon-close",
                onClick: close
            }, [ createVNode(ElIcon, {
                size: "18"
            }, {
                default: () => [ createVNode(Close, null, null) ]
            }) ]) ]) ])
        }) ]);
    }
});

const tableSelectConfig = {
    selection: !1,
    selectType: "radio",
    addBtn: !1,
    viewBtn: !1,
    delBtn: !1,
    editBtn: !1,
    batchDelBtn: !1,
    dialogWidth: "60%",
    dialogFullscreen: !1,
    closeOnClickModal: !1,
    refreshBtn: !0,
    settingBtn: !0,
    operations: !1
};

var defaultConfig = {
    size: "default",
    colSpan: 8,
    labelWidth: "6em",
    columnMinWidth: 350,
    columns: [],
    formDatum: {},
    tableSelectConfig: tableSelectConfig,
    isEditing: !0,
    showResetBtn: !0,
    showFooter: !0
};

const ns$6 = useNamespace("form");

var NumberRangePicker = defineComponent({
    name: "NumberRangePicker",
    props: {
        modelValue: {
            type: [ Array, String, Number, Boolean, Object ],
            default: function() {
                return [ null, null ];
            }
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        disabled: {
            type: Boolean,
            default: !1
        }
    },
    emits: [ "change" ],
    setup(props, {emit: emit}) {
        const disabled = props.disabled, {t: t} = useLocale(), startNumber = ref(Array.isArray(props.modelValue) && props.modelValue[0] || 0), endNumber = ref(Array.isArray(props.modelValue) && props.modelValue[1] || 0), minNumber = ref(props.min), maxNumber = ref(props.max), onChangeStart = num => {
            startNumber.value = num, emit("change", [ startNumber.value, endNumber.value ]);
        }, onChangeEnd = num => {
            endNumber.value = num, emit("change", [ startNumber.value, endNumber.value ]);
        }, controls = ref(!0), numberRangeRef = ref();
        onMounted((() => {
            const element = numberRangeRef.value;
            elementResize(element, (el => {
                const width = el.clientWidth;
                controls.value = width > 200;
            }));
        }));
        return () => createVNode(Fragment, null, [ createVNode("div", {
            ref: numberRangeRef,
            class: ns$6.e("number-range")
        }, [ createVNode(ElInputNumber, {
            modelValue: startNumber.value,
            "onUpdate:modelValue": $event => startNumber.value = $event,
            min: minNumber.value,
            max: maxNumber.value,
            controls: controls.value,
            disabled: disabled,
            onChange: onChangeStart
        }, null), createVNode("span", {
            class: ns$6.em("number-range", "division")
        }, [ t("next.date.rangeSeparator") ]), createVNode(ElInputNumber, {
            modelValue: endNumber.value,
            "onUpdate:modelValue": $event => endNumber.value = $event,
            min: minNumber.value,
            max: maxNumber.value,
            controls: controls.value,
            disabled: disabled,
            onChange: onChangeEnd
        }, null) ]) ]);
    }
});

const NextDialog = withInstall(NextDialog$1);

function _isSlot$3(s) {
    return "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s);
}

const ns$5 = useNamespace("form"), InputTableSelect = defineComponent({
    name: "InputTableSelect",
    props: {
        modelValue: {
            type: [ Array, String, Number, Boolean, Object ],
            default: function() {
                return [];
            }
        },
        column: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        formParams: {
            type: Object,
            default: () => ({})
        },
        placeholder: {
            type: String,
            default: ""
        }
    },
    emits: [ "select" ],
    setup(props, {emit: emit}) {
        const {t: t} = useLocale(), _disabled = props.disabled, _column = props.column, _placeholder = _column.placeholder || t("next.form.select") + _column.label, _tableDefaultConfig = deepClone(defaultConfig$1), _tableSelectConfig = deepClone(tableSelectConfig), _options = merge$1(_tableDefaultConfig, _tableSelectConfig, _column.tableSelect), tableSelectDialog = reactive({
            visible: !1,
            title: _column.label + t("next.form.tableSelect"),
            dialogWidth: _options.dialogWidth
        }), onClickTableDialog = () => {
            tableSelectDialog.visible = !0;
        }, onCloseTableDialog = () => {
            tableSelectDialog.visible = !1;
        }, tableReactive = reactive({
            loading: !1,
            page: {
                pageIndex: 1,
                pageSize: 20,
                total: 0
            },
            data: []
        }), onConfirmSearch = searchParams => {
            tableReactive.loading = !0, _options.loadData?.(searchParams, tableReactive.page, (res => {
                tableReactive.data = res.data || [], tableReactive.page.total = res.total || 0, 
                tableReactive.loading = !1;
            }));
        }, multipleSelection = ref([]);
        _column.tableSelectDefaultValue?.(props.formParams, _column, (rows => {
            rows?.length && (_column.tableSelectRows = rows, multipleSelection.value = rows);
        }));
        const sinleSelection = ref(""), _disabledSelect = computed((() => "radio" === _options.selectType ? !sinleSelection.value : 0 === multipleSelection.value.length)), isSelected = row => multipleSelection.value.includes(row), onResetTableSelect = () => {
            multipleSelection.value = [], sinleSelection.value = "";
        }, {value: propsValue, label: propsLabel} = _column.tableSelectProps || {
            value: "id",
            label: "name"
        }, onConfirmSelect = () => {
            const rows = toRaw(multipleSelection.value), _rows = arrayObjNoRepeat(rows, propsValue);
            onCloseTableDialog(), emit("select", _rows);
        }, onClickAddEdit = (row, tableFormParams) => {
            _column.addEditData?.(row, tableFormParams);
        }, renderSelectTypeContent = (row, index) => {
            const rowKey = _options.rowKey, value = valueExist(row[rowKey], index);
            return "checkbox" === _options.selectType ? createVNode(ElCheckbox, {
                modelValue: isSelected(toRaw(row)),
                onChange: event => ((event, row) => {
                    if (event) multipleSelection.value.push(row); else {
                        const index = multipleSelection.value.indexOf(row);
                        -1 !== index && multipleSelection.value.splice(index, 1);
                    }
                })(event, toRaw(row))
            }, null) : createVNode(ElRadio, {
                label: value,
                onChange: () => {
                    sinleSelection.value = value, multipleSelection.value = [ row ];
                }
            }, null);
        }, tags = ref([]), tagsMore = ref([]), _updateTags = () => {
            const rows = arrayObjNoRepeat(multipleSelection.value, propsValue).map((row => ({
                value: row[propsValue || "value"],
                label: row[propsLabel || "label"]
            })));
            rows.length > 1 ? (tags.value = rows.splice(0, 1), tagsMore.value = rows) : (tags.value = rows, 
            tagsMore.value = []);
        };
        watch((() => _column.tableSelectRows), (() => {
            _updateTags();
        }), {
            deep: !0,
            immediate: !0
        });
        const _onCloseTag = (tag, i) => {
            const rows = toRaw(multipleSelection.value);
            rows.splice(i, 1), multipleSelection.value = rows, _updateTags(), emit("select", rows);
        }, renderContent = () => {
            let _slot, _slot2;
            return createVNode(Fragment, null, [ createVNode("div", {
                class: [ "el-input", ns$5.e("input-table"), ns$5.is("disabled", _disabled) ]
            }, [ createVNode("div", {
                class: "el-input__wrapper"
            }, [ tags?.value.length ? createVNode("span", {
                class: ns$5.em("input-table", "value")
            }, [ tags.value.map(((tag, index) => createVNode(ElTag, {
                closable: !_disabled,
                onClose: () => _onCloseTag(0, index)
            }, {
                default: () => [ tag.label ]
            }))), tagsMore?.value?.length ? createVNode(ElTooltip, {
                "popper-class": ns$5.e("tooltip-tags"),
                placement: "bottom",
                effect: "light"
            }, {
                default: () => createVNode(ElTag, null, {
                    default: () => [ createTextVNode("+ "), tagsMore.value.length ]
                }),
                content: () => tagsMore.value.map(((tag, index) => createVNode(ElTag, {
                    closable: !_disabled,
                    onClose: () => _onCloseTag(0, index + 1)
                }, {
                    default: () => [ tag.label ]
                })))
            }) : null ]) : createVNode("span", {
                class: ns$5.em("input-table", "placeholder")
            }, [ _placeholder ]) ]), createVNode(ElButton, {
                type: "primary",
                class: ns$5.em("input-table", "append"),
                disabled: _disabled,
                icon: Search,
                onClick: onClickTableDialog
            }, null) ]), createVNode(NextDialog, {
                modelValue: tableSelectDialog.visible,
                "onUpdate:modelValue": $event => tableSelectDialog.visible = $event,
                title: tableSelectDialog.title,
                closeOnClickModal: _options.closeOnClickModal,
                width: _options.dialogWidth,
                modal: !1,
                onClose: onCloseTableDialog
            }, {
                default: () => [ createVNode("div", {
                    class: ns$5.em("input-table", "content")
                }, [ createVNode(ElRadioGroup, {
                    modelValue: sinleSelection.value
                }, {
                    default: () => [ createVNode(NextCrudTable, {
                        options: _options,
                        loading: tableReactive.loading,
                        data: tableReactive.data,
                        page: tableReactive.page,
                        "onConfirm-search": onConfirmSearch,
                        "onClick-add-edit": onClickAddEdit
                    }, {
                        default: () => [ createVNode(ElTableColumn, {
                            fixed: "left",
                            label: t("next.table.selection"),
                            width: 55,
                            headerAlign: _options.headerAlign,
                            align: _options.cellAlign
                        }, {
                            default: ({row: row, $index: $index}) => renderSelectTypeContent(row, $index)
                        }) ]
                    }) ]
                }) ]), createVNode("div", {
                    class: ns$5.em("input-table", "footer")
                }, [ createVNode(ElButton, {
                    onClick: onResetTableSelect
                }, _isSlot$3(_slot = t("next.form.reset")) ? _slot : {
                    default: () => [ _slot ]
                }), createVNode(ElButton, {
                    type: "primary",
                    disabled: _disabledSelect.value,
                    onClick: onConfirmSelect
                }, _isSlot$3(_slot2 = t("next.form.confirm")) ? _slot2 : {
                    default: () => [ _slot2 ]
                }) ]) ]
            }) ]);
        };
        return () => createVNode(Fragment, null, [ renderContent() ]);
    }
}), ns$4 = useNamespace("form");

var UploadImage = defineComponent({
    name: "UploadImage",
    props: {
        className: {
            type: String,
            default: ""
        },
        style: {
            type: Object,
            default: () => ({})
        },
        modelValue: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        listType: {
            type: String,
            values: [ "text", "picture", "picture-card" ],
            default: "picture-card"
        },
        accept: {
            type: String,
            default: "image/*"
        }
    },
    emits: [ "change" ],
    setup(props) {
        const {appContext: appContext} = getCurrentInstance(), {t: t} = useLocale();
        return {
            t: t,
            appContext: appContext,
            defaultPreviewSrcList: deepClone(props.modelValue),
            uploadfilesPreview: ref([])
        };
    },
    render() {
        const slots = this.$slots, props = this.$props, emit = this.$emit, _t = this.t, _disabled = props.disabled, uploadfilesPreview = this.uploadfilesPreview;
        let previewImagesContainer = null;
        return createVNode(Fragment, null, [ (() => {
            const value = this.defaultPreviewSrcList;
            let urls = [];
            return "string" == typeof value ? urls = [ value ] : "[object Array]" === Object.prototype.toString.call(value) && (urls = value), 
            urls = urls.filter((url => !!url)), urls.length ? createVNode(ElImage, {
                class: ns$4.e("preview-image"),
                src: urls[0],
                previewSrcList: urls,
                "preview-teleported": !0,
                fit: "cover",
                style: {
                    width: "146px",
                    height: "146px"
                }
            }, {
                default: () => createVNode(ElIcon, null, {
                    default: () => [ createVNode(Picture, null, null) ]
                })
            }) : null;
        })(), _disabled ? null : createVNode(ElUpload, {
            class: [ ns$4.b("upload-image"), props.className ],
            style: props.style,
            "list-type": props.listType,
            "auto-upload": !1,
            "on-preview": uploadFile => {
                const body = document.getElementsByTagName("body")[0], initial = uploadfilesPreview.value.findIndex((file => file.url === uploadFile.url)) || 0;
                previewImagesContainer && (render(null, previewImagesContainer), body.removeChild(previewImagesContainer)), 
                previewImagesContainer = document.createElement("div"), body.appendChild(previewImagesContainer);
                const previewComponent = createVNode({
                    render: () => h(Teleport, {
                        to: "body"
                    }, [ h(ElImageViewer, {
                        initialIndex: initial,
                        "url-list": uploadfilesPreview.value.map((file => file.url)),
                        onClose: () => {
                            render(null, previewImagesContainer);
                        }
                    }) ])
                });
                previewImagesContainer.appContext = this.appContext, render(previewComponent, previewImagesContainer);
            },
            onChange: (uploadfile, uploadfiles) => {
                uploadfilesPreview.value = uploadfiles, emit("change", uploadfile, uploadfiles);
            }
        }, {
            trigger: () => slots.default ? slots.default() : "picture-card" === props.listType ? createVNode(ElIcon, null, {
                default: () => [ createVNode(Plus, null, null) ]
            }) : createVNode(ElButton, {
                link: !0,
                text: !0,
                type: "primary"
            }, {
                default: () => [ createVNode(ElIcon, null, {
                    default: () => [ createVNode(Plus, null, null) ]
                }), createVNode("em", null, [ _t("next.form.selectFile") ]) ]
            })
        }) ]);
    }
}), treeSelect = defineComponent({
    name: "NextTreeSelect",
    props: {
        modelValue: {
            type: [ Number, String, Boolean, Object, Array ],
            default: ""
        },
        column: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        formParams: {
            type: Object,
            default: () => ({})
        }
    },
    emits: [ "change", "node-click", "node-contextmenu", "check", "check-change", "node-expand", "node-collapse", "current-change" ],
    setup(props, {emit: emit, expose: expose}) {
        const {t: t} = useLocale(), _modelValue = ref(props.modelValue);
        watch((() => props.modelValue), (val => {
            _modelValue.value = val;
        }));
        const _column = props.column, valueKey = valueExist(_column.treeSelectProps?.value, _column.nodeKey, "id"), _formParams = props.formParams, _defaultProps = {
            label: "label",
            children: "children"
        }, placeholder = _column.placeholder || t("next.form.select") + _column.label, onChange = val => {
            props.formParams[_column.prop] = val, _modelValue.value = val, emit("change", val);
        }, onClearValue = () => {
            props.formParams[_column.prop] = "", _modelValue.value = "";
        }, onNodeClick = (item, node) => {
            emit("node-click", item, node, _formParams);
            const val = item[valueKey];
            _column.treeSelectNodeClick?.(item, node, _formParams), onChange(val);
        }, onNodeContextmenu = (...arg) => {
            emit("node-contextmenu", ...arg), _column.treeSelectNodeContextmenu?.(...arg);
        }, onCheck = (item, checkedNode) => {
            emit("check", item, checkedNode, _formParams), _column.treeSelectCheck?.(item, checkedNode, _formParams);
            const {checkedKeys: checkedKeys} = checkedNode;
            onChange(checkedKeys);
        }, onCheckChange = (...arg) => {
            emit("check-change", ...arg), _column.treeSelecCheckChange?.(...arg, _formParams);
        }, onNodeExpand = (...arg) => {
            emit("node-expand", ...arg), _column.treeSelecNodeExpand?.(...arg);
        }, onNodeCollapse = (...arg) => {
            emit("node-collapse", ...arg), _column.treeSelecNodeCollapse?.(...arg);
        }, onCurrentChange = (...arg) => {
            emit("current-change", ...arg), _column.treeSelecCurrentChange?.(...arg);
        }, treeSelectRef = ref(), getInstance = () => treeSelectRef.value;
        _column.loadInstance && _column.loadInstance(getInstance()), expose({
            getInstance: getInstance,
            onClearValue: onClearValue
        });
        return () => createVNode(Fragment, null, [ createVNode(ElTreeSelect, {
            ref: treeSelectRef,
            modelValue: _modelValue.value,
            "onUpdate:modelValue": $event => _modelValue.value = $event,
            placeholder: placeholder,
            data: valueExist(_column.dicData, []),
            "node-key": valueExist(_column.nodeKey, "id"),
            filterable: valueExist(_column.filterable, !0),
            "show-checkbox": valueExist(_column.showCheckbox, !1),
            "leaf-only": valueExist(_column.leafOnly, !1),
            "render-after-expand": valueExist(_column.renderAfterExpand, !0),
            "check-strictly": valueExist(_column.checkStrictly, !1),
            disabled: valueExist(props.disabled, !1),
            clearable: valueExist(_column.clearable, !0),
            accordion: valueExist(_column.accordion, !1),
            multiple: valueExist(_column.multiple, !1),
            "collapse-tags": !0,
            "collapse-tags-tooltip": !0,
            props: valueExist(_column.treeSelectProps, _defaultProps),
            "value-key": valueKey,
            "onNode-click": onNodeClick,
            "onNode-contextmenu": onNodeContextmenu,
            onCheck: onCheck,
            "onCheck-change": onCheckChange,
            "onNode-expand": onNodeExpand,
            "onNode-collapse": onNodeCollapse,
            "onCurrent-change": onCurrentChange,
            onClear: onClearValue
        }, null) ]);
    }
});

function _isSlot$2(s) {
    return "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s);
}

const ns$3 = useNamespace("form");

var Element$4 = defineComponent({
    name: "NextForm",
    props: {
        options: {
            type: Object,
            default: () => ({})
        },
        columns: {
            type: Array,
            default: () => []
        },
        formDatum: {
            type: Object,
            default: () => ({})
        }
    },
    emits: [ "submit", "close" ],
    setup(props, {slots: slots, emit: emit, expose: expose}) {
        const _config = deepClone(defaultConfig), options = reactive(merge$1(_config, props.options)), _isEditing = computed((() => "boolean" != typeof options.isEditing || options.isEditing)), {t: t} = useLocale(), colSpan = ref(options.colSpan), formDatum = reactive(props.formDatum) || {}, formParams = reactive(merge$1({}, formDatum)), _formColumns = ref([]), formRules = reactive({});
        watch((() => [ props.columns, props.formDatum ]), (() => {
            (() => {
                const columns = props.columns;
                _formColumns.value = columns;
                for (let i = 0; i < columns.length; i++) {
                    const col = columns[i], value = formDatum[col.prop];
                    isValueExist(value) ? formParams[col.prop] = value : formParams[col.prop] = isValueExist(col.defaultValue) ? col.defaultValue : "";
                    const rules = [], {label: label} = col;
                    col.required && rules.push({
                        required: !0,
                        message: label + t("next.form.requiredInput"),
                        trigger: [ "blur", "change" ]
                    }), col.rules?.length && rules.push(...col.rules), formRules[col.prop] = rules, 
                    !col.dicData?.length && col.loadDicData && col.loadDicData(col, (data => {
                        data?.length && (col.dicData = data);
                    })), "boolean" == typeof col.disabled && col.disabled || (col.disabled = !_isEditing.value);
                }
            })();
        }), {
            deep: !0,
            immediate: !0
        });
        const formColumns = arrayObjNoRepeat(_formColumns.value, "prop");
        onMounted((() => {
            const formEl = ruleFormRef.value?.$el;
            let timer = null;
            elementResize(formEl, (el => {
                null !== timer && clearTimeout(timer), timer = setTimeout((() => {
                    colSpan.value = ((el, minWidth = 350) => {
                        const el_width = el.clientWidth;
                        let span = Math.floor(el_width / minWidth);
                        return span > 4 && (span = 4), Math.ceil(24 / span);
                    })(el, options.columnMinWidth), clearTimeout(timer);
                }), 200);
            }));
        }));
        const ruleFormRef = ref(), submitLoading = ref(!1), onSubmitAddEdit = async () => {
            const formInstance = ruleFormRef.value;
            formInstance && await formInstance.validate(((valid, fields) => {
                if (valid) {
                    const params = toRaw(formParams);
                    submitLoading.value = !0, emit("submit", params, (() => {
                        submitLoading.value = !1, emit("close");
                    }), (() => {
                        submitLoading.value = !1;
                    }));
                } else console.error("error submit!", fields);
            }));
        }, onResetForm = () => {
            const formInstance = ruleFormRef.value;
            formInstance && (formInstance.resetFields(), submitLoading.value = !1);
        }, _defaultDisabledDate = time => time.getTime() > Date.now(), _defaultShortcuts = [ {
            text: t("next.date.oneWeekAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 6048e5), [ start, end ];
            }
        }, {
            text: t("next.date.oneMonthAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 2592e6), [ start, end ];
            }
        }, {
            text: t("next.date.threeMonthsAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 7776e6), [ start, end ];
            }
        }, {
            text: t("next.date.oneYearAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 31536e6), [ start, end ];
            }
        }, {
            text: t("next.date.threeYearsAge"),
            value: () => {
                const end = new Date, start = new Date;
                return start.setTime(start.getTime() - 94608e6), [ start, end ];
            }
        } ], renderFormItem = col => {
            if (slots[formSlotName(col.prop)]) return slots[formSlotName(col.prop)]({
                column: col,
                formParams: formParams
            });
            if ("input" === col.type || !col.type) {
                const placeholder = col.placeholder || t("next.form.input") + col.label;
                return createVNode(ElInput, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    clearable: !0,
                    readonly: valueExist(col.readonly, !1),
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onChange: event => col.onChange?.(event, col, formParams, formColumns)
                }, {
                    prefix: col.prefix ? () => col.prefix(formParams, col) : null,
                    suffix: col.suffix ? () => col.suffix(formParams, col) : null,
                    prepend: col.prepend ? () => col.prepend(formParams, col) : null,
                    append: col.append ? () => col.append(formParams, col) : null
                });
            }
            if ("inputInteger" === col.type) {
                const placeholder = col.placeholder || t("next.form.input") + col.label;
                return createVNode(ElInput, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    clearable: !0,
                    readonly: valueExist(col.readonly, !1),
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onInput: event => ((event, key) => {
                        const value = event.replace(/\D/g, "");
                        formParams[key] = value ? Number(value) : "";
                    })(event, col.prop),
                    onChange: event => col.onChange?.(event, col, formParams, formColumns)
                }, {
                    prefix: col.prefix ? () => col.prefix(formParams, col) : null,
                    suffix: col.suffix ? () => col.suffix(formParams, col) : null,
                    prepend: col.prepend ? () => col.prepend(formParams, col) : null,
                    append: col.append ? () => col.append(formParams, col) : null
                });
            }
            if ("inputNumber" === col.type) {
                const placeholder = col.placeholder || t("next.form.input") + col.label;
                return createVNode(ElInput, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    clearable: !0,
                    readonly: valueExist(col.readonly, !1),
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onInput: event => ((val, key) => {
                        let value = val;
                        value = value.replace(/[^0-9\.]/g, ""), value = value.replace(/^\./, "0."), value = value.replace(/\.{2,}/g, "."), 
                        value = value.replace(".", "DUMMY"), value = value.replace(/\./g, ""), value = value.replace("DUMMY", "."), 
                        formParams[key] = Number(value);
                    })(event, col.prop),
                    onChange: event => col.onChange?.(event, col, formParams, formColumns)
                }, {
                    prefix: col.prefix ? () => col.prefix(formParams, col) : null,
                    suffix: col.suffix ? () => col.suffix(formParams, col) : null,
                    prepend: col.prepend ? () => col.prepend(formParams, col) : null,
                    append: col.append ? () => col.append(formParams, col) : null
                });
            }
            if ("textarea" === col.type) {
                const placeholder = col.placeholder || t("next.form.input") + col.label;
                return createVNode(ElInput, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    type: "textarea",
                    clearable: !0,
                    readonly: valueExist(col.readonly, !1),
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onChange: event => col.onChange?.(event, col, formParams, formColumns)
                }, {
                    prefix: col.prefix ? () => col.prefix(formParams, col) : null,
                    suffix: col.suffix ? () => col.suffix(formParams, col) : null,
                    prepend: col.prepend ? () => col.prepend(formParams, col) : null,
                    append: col.append ? () => col.append(formParams, col) : null
                });
            }
            if ("select" === col.type) {
                const placeholder = col.placeholder || t("next.form.select") + col.label;
                return createVNode(ElSelect, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    placeholder: placeholder,
                    clearable: !0,
                    disabled: col.disabled,
                    multiple: valueExist(col.multiple, !1),
                    "collapse-tags-tooltip": !0,
                    onChange: event => col.onChange?.(event, col, formParams, formColumns)
                }, {
                    default: () => [ col.dicData && col.dicData.map((item => createVNode(ElOption, {
                        key: item.value,
                        value: item.value,
                        label: item.label,
                        disabled: valueExist(item.disabled, !1)
                    }, null))) ]
                });
            }
            if ("time" === col.type) {
                const placeholder = col.placeholder || t("next.form.select") + col.label;
                return createVNode(ElTimeSelect, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    start: "00:00",
                    step: "00:30",
                    end: "23:59",
                    editable: !1,
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onChange: event => col.onChange?.(event, col, formParams, formColumns)
                }, {
                    prefix: () => col.prefix ? col.prefix(formParams, col) : null,
                    suffix: () => col.suffix ? col.suffix(formParams, col) : null
                });
            }
            if ("radio" === col.type) return createVNode(ElRadioGroup, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                disabled: col.disabled,
                onChange: event => col.onChange?.(event, col, formParams, formColumns)
            }, {
                default: () => [ col.dicData && col.dicData.map((item => createVNode(ElRadio, {
                    key: item.value,
                    label: item.value,
                    disabled: valueExist(item.disabled, !1)
                }, {
                    default: () => [ item.label ]
                }))) ]
            });
            if ("checkbox" === col.type) return isValueExist(formParams[col.prop]) || (formParams[col.prop] = []), 
            createVNode(ElCheckboxGroup, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                disabled: col.disabled,
                onChange: event => col.onChange?.(event, col, formParams, formColumns)
            }, {
                default: () => [ col.dicData && col.dicData.map((item => createVNode(ElCheckbox, {
                    key: item.value,
                    label: item.value,
                    disabled: valueExist(item.disabled, !1)
                }, {
                    default: () => [ item.label ]
                }))) ]
            });
            if ("date" === col.type) {
                const placeholder = col.placeholder || t("next.form.select") + col.label;
                return createVNode(ElDatePicker, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": [ $event => formParams[col.prop] = $event, event => col.onChange?.(event, col, formParams, formColumns) ],
                    placeholder: placeholder,
                    type: "date",
                    valueFormat: col.format || "YYYY-MM-DD",
                    format: col.format || "YYYY-MM-DD",
                    clearable: !0,
                    disabledDate: col.disabledDate || _defaultDisabledDate,
                    disabled: col.disabled,
                    editable: col.editable
                }, null);
            }
            if ("datetime" === col.type) {
                const placeholder = col.placeholder || t("next.form.select") + col.label;
                return createVNode(ElDatePicker, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": [ $event => formParams[col.prop] = $event, event => col.onChange?.(event, col, formParams, formColumns) ],
                    placeholder: placeholder,
                    type: "datetime",
                    valueFormat: col.format || "YYYY-MM-DD HH:mm:ss",
                    format: col.format || "YYYY-MM-DD HH:mm:ss",
                    clearable: !0,
                    disabledDate: col.disabledDate || _defaultDisabledDate,
                    disabled: col.disabled,
                    editable: col.editable
                }, null);
            }
            if ("datetimerange" === col.type) {
                const placeholder = col.placeholder || t("next.form.select") + col.label;
                return createVNode(ElDatePicker, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": [ $event => formParams[col.prop] = $event, event => col.onChange?.(event, col, formParams, formColumns) ],
                    placeholder: placeholder,
                    type: "datetimerange",
                    valueFormat: col.format || "YYYY-MM-DD HH:mm:ss",
                    format: col.format || "YYYY-MM-DD HH:mm:ss",
                    clearable: !0,
                    "range-separator": t("next.date.rangeSeparator"),
                    "start-placeholder": t("next.date.startPlaceholder"),
                    "end-placeholder": t("next.date.endPlaceholder"),
                    disabledDate: col.disabledDate || _defaultDisabledDate,
                    disabled: col.disabled,
                    editable: col.editable,
                    shortcuts: col.shortcuts || _defaultShortcuts
                }, null);
            }
            return "numberRange" === col.type ? createVNode(NumberRangePicker, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                disabled: col.disabled,
                onChange: event => {
                    return value = event, key = col.prop, Array.isArray(formParams[key]) || (formParams[key] = []), 
                    void (formParams[key] = Number(value));
                    var value, key;
                }
            }, null) : "inputTableSelect" === col.type ? createVNode(InputTableSelect, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                formParams: formParams,
                column: col,
                disabled: col.disabled,
                onSelect: rows => ((rows, col) => {
                    rows && (col.tableSelectRows = rows);
                    const {value: value} = col.tableSelectProps || {};
                    formParams[col.prop] = rows.map((row => row[value || "value"])), col.onTableSelect?.(formParams, rows, col);
                })(rows, col)
            }, null) : "uploadImage" === col.type ? createVNode(UploadImage, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                disabled: col.disabled,
                onChange: (...arg) => col.onChange?.(...arg, col, formParams, formColumns)
            }, null) : "treeSelect" === col.type ? createVNode(treeSelect, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                disabled: col.disabled,
                column: col,
                formParams: formParams
            }, null) : void 0;
        };
        expose({
            formParams: toRaw(formParams),
            ruleFormRef: ruleFormRef,
            formColumns: formColumns,
            getFormInstance: () => ruleFormRef.value,
            getFormParams: () => toRaw(formParams)
        });
        const renderContent = () => {
            let _slot, _slot2, _slot3;
            return createVNode(ElForm, {
                ref: ruleFormRef,
                class: ns$3.b(),
                inline: !1,
                model: formParams,
                size: options.size
            }, {
                default: () => [ createVNode(ElRow, {
                    gutter: 20
                }, _isSlot$2(_slot = formColumns.map((column => !column.hide && createVNode(ElCol, {
                    span: valueExist(column.span, colSpan.value)
                }, {
                    default: () => [ createVNode(ElFormItem, {
                        prop: column.prop,
                        required: column.required,
                        rules: formRules[column.prop],
                        style: {
                            "--form-label-width": valueExist(options.formLabelWidth, options.labelWidth)
                        }
                    }, {
                        label: () => column.label ? createVNode(Fragment, null, [ createVNode(NextTextEllipsis, {
                            content: t(column.label),
                            class: ns$3.e("item-label")
                        }, null), column.tip ? createVNode(ElTooltip, {
                            effect: "dark",
                            content: column.tip,
                            placement: "top"
                        }, {
                            default: () => [ createVNode(ElIcon, {
                                style: {
                                    "margin-left": "5px"
                                },
                                color: "#f3d19e"
                            }, {
                                default: () => [ createVNode(InfoFilled, null, null) ]
                            }) ]
                        }) : null ]) : null,
                        default: () => renderFormItem(column)
                    }) ]
                })))) ? _slot : {
                    default: () => [ _slot ]
                }), _isEditing.value && options.showFooter ? createVNode("div", {
                    class: ns$3.e("footer")
                }, [ createVNode(ElButton, {
                    type: "primary",
                    loading: submitLoading.value,
                    onClick: onSubmitAddEdit
                }, _isSlot$2(_slot2 = t("next.form.submit")) ? _slot2 : {
                    default: () => [ _slot2 ]
                }), options.showResetBtn ? createVNode(ElButton, {
                    onClick: onResetForm
                }, _isSlot$2(_slot3 = t("next.form.reset")) ? _slot3 : {
                    default: () => [ _slot3 ]
                }) : null ]) : null ]
            });
        };
        return () => createVNode(Fragment, null, [ renderContent() ]);
    }
});

const NextTreeSelect = withInstall(treeSelect), NextForm = withInstall(Element$4);

var AddEditForm = defineComponent({
    name: "AddEditForm",
    props: {
        formDatum: {
            type: Object,
            default: () => ({})
        },
        isEditing: {
            type: Boolean,
            default: !0
        },
        columns: {
            type: Array,
            default: () => []
        }
    },
    emits: [ "close", "submit" ],
    setup(props, {slots: slots, emit: emit, expose: expose}) {
        const addEditFormSlots = inject("addEditFormSlots"), form_slots = {};
        addEditFormSlots.value.forEach((slotName => {
            form_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        }));
        const _options = inject("options", {}), options = deepClone(isRef(_options) ? unref(_options) : _options);
        options.columnMinWidth = options.formColumnMinWidth, options.isEditing = props.isEditing;
        const formRef = ref(), formDatum = deepClone(isRef(props.formDatum) ? unref(props.formDatum) : props.formDatum), _columns = deepClone(props.columns).map((col => (col.hide = valueExist(col.formHide, col.hide, !1), 
        col))), onSubmit = (...arg) => {
            emit("submit", ...arg);
        };
        expose({
            getFormExpose: () => ({
                formParams: formRef.value?.formParams,
                formColumns: formRef.value?.formColumns
            })
        });
        const renderContent = () => {
            return createVNode(NextForm, {
                ref: formRef,
                options: options,
                columns: _columns,
                formDatum: formDatum,
                onClose: () => emit("close"),
                onSubmit: onSubmit
            }, "function" == typeof (s = form_slots) || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s) ? form_slots : {
                default: () => [ form_slots ]
            });
            var s;
        };
        return () => createVNode(Fragment, null, [ renderContent() ]);
    }
});

function _isSlot(s) {
    return "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s);
}

const ns$2 = useNamespace("crud-table");

var Element$3 = defineComponent({
    name: "NextCrudTable",
    props: defaultPropsConfig,
    emits: [ "confirm-search", "clear-search", "change-pagination", "selection-change", "row-click", "row-contextmenu", "row-dblclick", "cell-click", "cell-dblclick", "cell-contextmenu", "cell-mouse-enter", "cell-mouse-leave", "expand-change", "click-add-edit", "close-add-edit", "view-add-edit", "delete-rows", "delete-row", "submit-form" ],
    setup(props, {emit: emit, slots: slots, expose: expose}) {
        const _config = deepClone(defaultConfig$1), _options = computed((() => {
            const cfg = unref(props.options);
            return merge$1(_config, cfg);
        })), options = unref(_options);
        provide("options", computed((() => _options.value))), provide("ns", ns$2);
        const {t: t} = useLocale(), _columns = ref(options.columns), _searchColumns = ref([]), _formColumns = ref([]), _updateColumnsAll = ops => {
            ((options, cb) => {
                const _columns = reactive(options.columns), _loadDicData = col => {
                    !col.dicData?.length && col.loadDicData && col.loadDicData(col, (data => {
                        data?.length && (col.dicData = data);
                    }));
                }, loopTableColumns = list => {
                    let cols = [];
                    return list.forEach((col => {
                        _loadDicData(col), cols.push(col), col.children?.length && (cols.push(...loopTableColumns(col.children)), 
                        col.children && delete col.children);
                    })), cols;
                }, evenTableColumns = loopTableColumns(_columns), formColumns = options.formColumns.map((col => (_loadDicData(col), 
                col))), _formColumns = evenTableColumns.concat(formColumns).map((col => {
                    const item = {
                        prop: col.prop,
                        label: valueExist(col.formLabel, col.label, ""),
                        type: valueExist(col.formType, col.type, ""),
                        defaultValue: valueExist(col.formDefaultValue, col.defaultValue, ""),
                        placeholder: valueExist(col.formPlaceholder, ""),
                        required: valueExist(col.formRequired, col.required, !1),
                        sort: valueExist(col.formSort, col.sort, null),
                        prefix: valueExist(col.formPrefix, col.prefix, null),
                        suffix: valueExist(col.formSuffix, col.suffix, null),
                        prepend: valueExist(col.formPrepend, col.prepend, null),
                        append: valueExist(col.formAppend, col.append, null),
                        hide: valueExist(col.formHide, col.hide, !1),
                        disabled: valueExist(col.formDisabled, col.disabled, !1),
                        clearable: valueExist(col.formClearable, col.clearable, !1),
                        readonly: valueExist(col.formReadonly, col.readonly, !1),
                        tip: valueExist(col.formTip, col.tip, null),
                        rules: valueExist(col.formRules, col.rules, null),
                        span: valueExist(col.formSpan, col.span, null),
                        multiple: valueExist(col.formMultiple, col.multiple, !1),
                        dicData: valueExist(col.formDicData, col.dicData, []),
                        loadDicData: valueExist(col.formLoadDicData, col.loadDicData, null),
                        onChange: valueExist(col.onChangeForm, col.onChange, null),
                        tableSelect: valueExist(col.tableSelect, {}),
                        tableSelectRows: valueExist(col.tableSelectRows, []),
                        tableSelectProps: valueExist(col.tableSelectProps, null),
                        tableSelectDefaultValue: valueExist(col.tableSelectDefaultValue, null),
                        onTableSelect: valueExist(col.onTableSelect, null),
                        filterable: valueExist(col.filterable, !1),
                        nodeKey: valueExist(col.formNodeKey, col.nodeKey),
                        accordion: valueExist(col.formAccordion, col.accordion, !1),
                        leafOnly: valueExist(col.formLeafOnly, col.leafOnly, !1),
                        showCheckbox: valueExist(col.formShowCheckboxn, col.showCheckbox, !1),
                        checkStrictly: valueExist(col.formCheckStrictly, col.checkStrictly, !1),
                        renderAfterExpand: valueExist(col.formRenderAfterExpand, col.renderAfterExpand, !1),
                        treeSelectProps: valueExist(col.formTreeSelectProps, col.treeSelectProps, null),
                        treeSelectNodeClick: valueExist(col.treeSelectNodeClickForm, col.treeSelectNodeClick, null),
                        treeSelectNodeContextmenu: valueExist(col.treeSelectNodeContextmenuForm, col.treeSelectNodeContextmenu, null),
                        treeSelectCheck: valueExist(col.treeSelectCheckForm, col.treeSelectCheck, null),
                        treeSelecCheckChange: valueExist(col.treeSelecCheckChangeForm, col.treeSelecCheckChange, null),
                        treeSelecNodeExpand: valueExist(col.treeSelecNodeExpandForm, col.treeSelecNodeExpand, null),
                        treeSelecNodeCollapse: valueExist(col.treeSelecNodeCollapseForm, col.treeSelecNodeCollapse, null),
                        treeSelecCurrentChange: valueExist(col.treeSelecCurrentChangeForm, col.treeSelecCurrentChange, null)
                    };
                    return !col.dicData?.length && col.loadDicData && shareObjectProperty(item, col, "dicData"), 
                    item;
                })).filter((o => o.sort && o.prop)).sort(((a, b) => a.sort - b.sort)), _formatSearchColumn = (col, index) => {
                    const item = {
                        prop: col.prop,
                        type: valueExist(col.searchType, col.type),
                        label: valueExist(col.searchLabel, col.label),
                        defaultValue: valueExist(col.searchDefaultValue, col.defaultValue, null),
                        placeholder: valueExist(col.searchPlaceholder, col.placeholder, null),
                        dicData: valueExist(col.searchDicData, col.dicData, []),
                        loadDicData: valueExist(col.searchLoadDicData, col.loadDicData, null),
                        disabled: valueExist(col.searchDisabled, col.disabled, !1),
                        readonly: valueExist(col.searchReadonly, col.readonly, !1),
                        prefix: valueExist(col.searchPrefix, col.prefix, null),
                        suffix: valueExist(col.searchSuffix, col.suffix, null),
                        prepend: valueExist(col.searchPrepend, col.prepend, null),
                        append: valueExist(col.searchAppend, col.append, null),
                        hide: valueExist(col.searchHide, !1),
                        sort: valueExist(col.searchSort, col.sort, index),
                        nodeKey: valueExist(col.searchNodeKey, col.nodeKey),
                        accordion: valueExist(col.searchAccordion, col.accordion, !1),
                        leafOnly: valueExist(col.searchLeafOnly, col.leafOnly, !1),
                        showCheckbox: valueExist(col.searchShowCheckboxn, col.showCheckbox, !1),
                        checkStrictly: valueExist(col.searchCheckStrictly, col.checkStrictly, !1),
                        renderAfterExpand: valueExist(col.searchRenderAfterExpand, col.renderAfterExpand, !1),
                        treeSelectProps: valueExist(col.searchTreeSelectProps, col.treeSelectProps, null),
                        treeSelectNodeClick: valueExist(col.treeSelectNodeClickSearch, col.treeSelectNodeClick, null),
                        treeSelectNodeContextmenu: valueExist(col.treeSelectNodeContextmenuSearch, col.treeSelectNodeContextmenu, null),
                        treeSelectCheck: valueExist(col.treeSelectCheckSearch, col.treeSelectCheck, null),
                        treeSelecCheckChange: valueExist(col.treeSelecCheckChangeSearch, col.treeSelecCheckChange, null),
                        treeSelecNodeExpand: valueExist(col.treeSelecNodeExpandSearch, col.treeSelecNodeExpand, null),
                        treeSelecNodeCollapse: valueExist(col.treeSelecNodeCollapseSearch, col.treeSelecNodeCollapse, null),
                        treeSelecCurrentChange: valueExist(col.treeSelecCurrentChangeSearch, col.treeSelecCurrentChange, null)
                    };
                    return !col.dicData?.length && col.loadDicData && shareObjectProperty(item, col, "dicData"), 
                    item;
                }, initSearchColumns = options.searchColumns.map(((col, index) => (_loadDicData(col), 
                _formatSearchColumn(col, index)))), initSearchColumnsLength = initSearchColumns.length, mergeSearchColumns = initSearchColumns.concat((list => {
                    let cols = [];
                    return list.forEach(((col, index) => {
                        col.searchType && cols.push(_formatSearchColumn(col, index + initSearchColumnsLength));
                    })), cols;
                })(evenTableColumns)), _searchColumns = arrayObjNoRepeat(mergeSearchColumns.sort(((a, b) => a.sort - b.sort)), "prop");
                cb && cb({
                    formColumns: _formColumns,
                    searchColumns: _searchColumns,
                    columns: _columns
                });
            })(ops, (({formColumns: formColumns, searchColumns: searchColumns, columns: columns}) => {
                _searchColumns.value = searchColumns, _formColumns.value = formColumns, _columns.value = columns;
            }));
        }, tableData = ref(props.data), _searchFormParams = ref((() => {
            const list = _searchColumns.value;
            let params = {};
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                isValueExist(item.defaultValue) && (params[item.prop] = item.defaultValue);
            }
            return params;
        })()), onConfirmSearch = searchParams => {
            const params = deepClone(toRaw(searchParams));
            baseIsEqual(_searchFormParams.value, params) || (props.page.pageIndex = 1, _searchFormParams.value = params), 
            emit("confirm-search", params);
        }, onClearSearch = () => {
            emit("clear-search");
        }, onClickRefresh = () => {
            onConfirmSearch(_searchFormParams.value);
        };
        watch((() => props.data), (list => {
            tableData.value = list;
        }), {
            immediate: !0
        }), watch((() => _options), (ops => {
            _updateColumnsAll(ops.value);
        }), {
            deep: !0,
            immediate: !0
        });
        const tableContentHeight = ref(options.defaultContentHeight), crudTableRef = ref(), headerRef = ref(), tableRef = ref(), footerRef = ref(), addEditFormRef = ref(null), updateTableContentHeight = () => {
            nextTick((() => {
                const contentHeight = (crudTableRef.value?.clientHeight || 0) - ((headerRef.value?.clientHeight || 0) + (footerRef.value?.clientHeight || 0));
                tableContentHeight.value = contentHeight;
            }));
        }, fullscreenChangeListener = event => {
            "F11" !== event.key && "fullscreenchange" !== event.type || updateTableContentHeight();
        };
        onMounted((() => {
            elementResize(crudTableRef.value, (() => {
                updateTableContentHeight();
            })), options.initLoadData && onConfirmSearch(_searchFormParams.value), options.fullscreenchangeContentHeight && (document.addEventListener("fullscreenchange", fullscreenChangeListener), 
            document.addEventListener("keydown", fullscreenChangeListener));
        })), onUnmounted((() => {
            options.fullscreenchangeContentHeight && (document.removeEventListener("fullscreenchange", fullscreenChangeListener), 
            document.removeEventListener("keydown", fullscreenChangeListener));
        }));
        const onChangePagination = page => {
            props.page.pageIndex = page.pageIndex, props.page.pageSize = page.pageSize, emit("change-pagination", page), 
            onConfirmSearch(_searchFormParams.value);
        }, multipleSelection = ref([]), onSelectionChange = val => {
            multipleSelection.value = val, emit("selection-change", multipleSelection.value);
        };
        provide("multipleSelection", multipleSelection);
        const addEditDialog = reactive({
            visible: !1,
            title: t("next.table.add"),
            rowInfo: {},
            isEditing: !0
        }), onClickHeaderAdd = (row = {}) => {
            const {dialogTitle: dialogTitle} = options;
            addEditDialog.isEditing = !0, addEditDialog.title = dialogTitle + " " + t("next.table.add"), 
            addEditDialog.rowInfo = row, emit("click-add-edit", row), nextTick((() => {
                addEditDialog.visible = !0;
            }));
        }, onClickDeleteRows = rows => {
            emit("delete-rows", rows, (() => {
                onClickRefresh();
            }));
        }, onClickDeleteRow = scoped => {
            emit("delete-row", scoped, (() => {
                onClickRefresh();
            }));
        }, onClickRowEdit = scoped => {
            const {dialogTitle: dialogTitle} = options;
            addEditDialog.isEditing = !0, addEditDialog.title = dialogTitle + " " + t("next.table.edit"), 
            addEditDialog.rowInfo = scoped.row, emit("click-add-edit", scoped.row), nextTick((() => {
                addEditDialog.visible = !0;
            }));
        }, onClickRowView = scoped => {
            const {dialogTitle: dialogTitle} = options;
            addEditDialog.isEditing = !1, addEditDialog.title = dialogTitle + " " + t("next.table.view"), 
            addEditDialog.rowInfo = scoped.row, emit("view-add-edit", scoped.row), nextTick((() => {
                addEditDialog.visible = !0;
            }));
        }, onCloseAddEditDialog = () => {
            addEditDialog.visible = !1, addEditDialog.title = "", addEditDialog.rowInfo = {}, 
            emit("close-add-edit");
        }, onSubmitAddEditDialog = (...arg) => {
            emit("submit-form", ...arg);
        }, columnSlots = ref([]), searchFormSlots = ref([]), addEditFormSlots = ref([]);
        for (const key in slots) key.includes("column-") ? columnSlots.value.push(key) : key.includes("search-") ? searchFormSlots.value.push(key) : key.includes("form-") && addEditFormSlots.value.push(key);
        provide("columnSlots", columnSlots), provide("searchFormSlots", searchFormSlots), 
        provide("addEditFormSlots", addEditFormSlots);
        const _customRowIndex = index => {
            const {pageIndex: pageIndex, pageSize: pageSize} = props.page;
            return (pageIndex - 1) * pageSize + (index + 1);
        }, _sortNumberMinWidth = computed((() => {
            const {total: total} = props.page, tempElement = document.createElement("span");
            tempElement.innerText = total, tempElement.style.visibility = "hidden", document.body.appendChild(tempElement);
            const width = tempElement.getBoundingClientRect().width, minWidth = Math.ceil(width) + 25;
            return document.body.removeChild(tempElement), minWidth > 50 ? minWidth : 50;
        })), searchFrom_slots = {};
        searchFormSlots.value.forEach((slotName => {
            searchFrom_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        }));
        const column_slots = {};
        columnSlots.value.forEach((slotName => {
            column_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        }));
        const addEditForm_slots = {};
        addEditFormSlots.value.forEach((slotName => {
            addEditForm_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        }));
        const headerMenu_solts = {};
        header_menu_slots_key.forEach((slotName => {
            headerMenu_solts[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        }));
        const operation_column_slots = {};
        operation_column_slots_key.forEach((slotName => {
            operation_column_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        }));
        expose({
            onClickRowAdd: onClickHeaderAdd,
            columns: _columns.value,
            getFormExpose: () => addEditFormRef.value?.getFormExpose(),
            updateColumns: ops => {
                _updateColumnsAll(ops);
            }
        });
        return () => createVNode(Fragment, null, [ createVNode(Fragment, null, [ createVNode("div", {
            ref: crudTableRef,
            class: [ ns$2.b(), props.className ],
            style: props.style
        }, [ options.showSearchForm || options.showHeaderMenu ? createVNode("header", {
            ref: headerRef,
            class: ns$2.b("header")
        }, [ options.showSearchForm && createVNode(HeaderSearch, {
            columns: _searchColumns.value,
            onZoomResize: updateTableContentHeight,
            onConfirmSearch: onConfirmSearch,
            onClearSearch: onClearSearch
        }, _isSlot(searchFrom_slots) ? searchFrom_slots : {
            default: () => [ searchFrom_slots ]
        }), options.showHeaderMenu && createVNode(HeaderMenu, {
            onClickAdd: onClickHeaderAdd,
            onDeleteRows: onClickDeleteRows,
            onClickRefresh: onClickRefresh
        }, _isSlot(headerMenu_solts) ? headerMenu_solts : {
            default: () => [ headerMenu_solts ]
        }), slots["table-head-tip"]?.() ]) : null, createVNode(SpinLoading, {
            loading: props.loading
        }, {
            default: () => [ createVNode("div", {
                ref: tableRef,
                class: ns$2.b("content")
            }, [ createVNode(ElTable, {
                data: tableData.value,
                height: tableContentHeight.value,
                rowKey: options.rowKey,
                border: options.border,
                stripe: options.stripe,
                fit: options.fit,
                size: options.size,
                "row-style": options.rowStyle,
                "row-class-name": options.rowClassName,
                "cell-style": options.cellStyle,
                "cell-class-name": options.cellClassName,
                "header-row-style": options.headerRowStyle,
                "header-row-class-name": options.headerRowClassName,
                "header-cell-style": options.headerCellStyle,
                "header-cell-class-name": options.headerCellClassName,
                "span-method": props.spanMethod,
                "onSelection-change": onSelectionChange,
                "onRow-click": (...arg) => emit("row-click", ...arg),
                "onRow-contextmenu": (...arg) => emit("row-contextmenu", ...arg),
                "onRow-dblclick": (...arg) => emit("row-dblclick", ...arg),
                "onCell-click": (...arg) => emit("cell-click", ...arg),
                "onCell-dblclick": (...arg) => emit("cell-dblclick", ...arg),
                "onCell-contextmenu": (...arg) => emit("cell-contextmenu", ...arg),
                "onCell-mouse-enter": (...arg) => emit("cell-mouse-enter", ...arg),
                "onCell-mouse-leave": (...arg) => emit("cell-mouse-leave", ...arg),
                "onExpand-change": (...arg) => emit("expand-change", ...arg)
            }, {
                default: () => [ options.index ? createVNode(ElTableColumn, {
                    type: "index",
                    label: "#",
                    width: _sortNumberMinWidth.value,
                    index: _customRowIndex,
                    fixed: "left",
                    headerAlign: options.headerAlign,
                    align: options.cellAlign
                }, null) : null, options.selection ? createVNode(ElTableColumn, {
                    type: "selection",
                    fixed: "left",
                    label: t("next.table.selectionAll"),
                    width: 55,
                    headerAlign: options.headerAlign,
                    align: options.cellAlign
                }, null) : null, slots.default?.(), _columns.value.map((col => createVNode(TableColumnDynamic, {
                    columnOption: col,
                    key: col.prop
                }, _isSlot(column_slots) ? column_slots : {
                    default: () => [ column_slots ]
                }))), options.operations ? createVNode(TableColumnOperations, {
                    onEditRow: onClickRowEdit,
                    onViewRow: onClickRowView,
                    onDeleteRow: onClickDeleteRow
                }, _isSlot(operation_column_slots) ? operation_column_slots : {
                    default: () => [ operation_column_slots ]
                }) : null ],
                empty: () => createVNode(ElEmpty, {
                    imageSize: tableContentHeight.value > 220 ? 100 : 50,
                    description: t("next.table.notData")
                }, null)
            }) ]) ]
        }), options.isPagination ? createVNode("div", {
            ref: footerRef,
            class: ns$2.b("footer")
        }, [ createVNode(FooterPagination, {
            page: props.page,
            onChange: onChangePagination
        }, null), slots["table-footer-tip"]?.() ]) : null, createVNode(NextDialog$1, {
            modelValue: addEditDialog.visible,
            "onUpdate:modelValue": $event => addEditDialog.visible = $event,
            title: addEditDialog.title,
            width: options.dialogWidth,
            fullscreen: options.dialogFullscreen,
            closeOnClickModal: options.closeOnClickModal,
            onClose: onCloseAddEditDialog
        }, {
            default: () => createVNode(AddEditForm, {
                ref: addEditFormRef,
                formDatum: addEditDialog.rowInfo,
                columns: _formColumns.value,
                isEditing: addEditDialog.isEditing,
                onClose: onCloseAddEditDialog,
                onSubmit: onSubmitAddEditDialog
            }, _isSlot(addEditForm_slots) ? addEditForm_slots : {
                default: () => [ addEditForm_slots ]
            })
        }) ]) ]) ]);
    }
});

const NextCrudTable = withInstall(Element$3), NextSpinLoading = withInstall(SpinLoading), ns$1 = useNamespace("upload");

const NextUpload = withInstall(defineComponent({
    name: "NextUpload",
    props: {
        className: {
            type: String,
            default: ""
        },
        style: {
            type: Object,
            default: () => ({})
        },
        listType: {
            type: String,
            values: [ "text", "picture", "picture-card" ],
            default: "picture-card"
        },
        accept: {
            type: String,
            default: "image/*"
        }
    },
    emits: [ "change" ],
    setup() {
        const {appContext: appContext} = getCurrentInstance(), {t: t} = useLocale();
        return {
            t: t,
            appContext: appContext
        };
    },
    render() {
        const slots = this.$slots, props = this.$props, emit = this.$emit, _t = this.t, uploadfilesPreview = ref([]), body = document.getElementsByTagName("body")[0];
        let previewImagesContainer = null;
        return createVNode(ElUpload, {
            class: [ ns$1.b(), props.className ],
            style: props.style,
            "list-type": props.listType,
            "auto-upload": !1,
            "on-preview": uploadFile => {
                const initial = uploadfilesPreview.value.findIndex((file => file.url === uploadFile.url)) || 0;
                previewImagesContainer && (render(null, previewImagesContainer), body.removeChild(previewImagesContainer)), 
                previewImagesContainer = document.createElement("div"), body.appendChild(previewImagesContainer);
                const previewComponent = createVNode({
                    render: () => h(Teleport, {
                        to: "body"
                    }, [ h(ElImageViewer, {
                        initialIndex: initial,
                        "url-list": uploadfilesPreview.value.map((file => file.url)),
                        onClose: () => {
                            render(null, previewImagesContainer);
                        }
                    }) ])
                });
                previewImagesContainer.appContext = this.appContext, render(previewComponent, previewImagesContainer);
            },
            onChange: (uploadfile, uploadfiles) => {
                uploadfilesPreview.value = uploadfiles, emit("change", uploadfile, uploadfiles);
            }
        }, {
            trigger: () => slots.default ? slots.default() : "picture-card" === props.listType ? createVNode(ElIcon, null, {
                default: () => [ createVNode(Plus, null, null) ]
            }) : createVNode(ElButton, {
                link: !0,
                text: !0,
                type: "primary"
            }, {
                default: () => [ createVNode(ElIcon, null, {
                    default: () => [ createVNode(Plus, null, null) ]
                }), createVNode("em", null, [ _t("next.form.selectFile") ]) ]
            })
        });
    }
}));

var mpegts = {
    exports: {}
};

window, mpegts.exports = function(e) {
    var t = {};
    function i(n) {
        if (t[n]) return t[n].exports;
        var a = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(a.exports, a, a.exports, i), a.l = !0, a.exports;
    }
    return i.m = e, i.c = t, i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        });
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var a in e) i.d(n, a, function(t) {
            return e[t];
        }.bind(null, a));
        return n;
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return i.d(t, "a", t), t;
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, i.p = "", i(i.s = 14);
}([ function(e, t, i) {
    var n = i(6), a = i.n(n), r = function() {
        function e() {}
        return e.e = function(t, i) {
            t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
            var n = "[" + t + "] > " + i;
            e.ENABLE_CALLBACK && e.emitter.emit("log", "error", n), e.ENABLE_ERROR && (console.error ? console.error(n) : console.warn ? console.warn(n) : console.log(n));
        }, e.i = function(t, i) {
            t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
            var n = "[" + t + "] > " + i;
            e.ENABLE_CALLBACK && e.emitter.emit("log", "info", n), e.ENABLE_INFO && (console.info ? console.info(n) : console.log(n));
        }, e.w = function(t, i) {
            t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
            var n = "[" + t + "] > " + i;
            e.ENABLE_CALLBACK && e.emitter.emit("log", "warn", n), e.ENABLE_WARN && (console.warn ? console.warn(n) : console.log(n));
        }, e.d = function(t, i) {
            t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
            var n = "[" + t + "] > " + i;
            e.ENABLE_CALLBACK && e.emitter.emit("log", "debug", n), e.ENABLE_DEBUG && (console.debug ? console.debug(n) : console.log(n));
        }, e.v = function(t, i) {
            t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
            var n = "[" + t + "] > " + i;
            e.ENABLE_CALLBACK && e.emitter.emit("log", "verbose", n), e.ENABLE_VERBOSE && console.log(n);
        }, e;
    }();
    r.GLOBAL_TAG = "mpegts.js", r.FORCE_GLOBAL_TAG = !1, r.ENABLE_ERROR = !0, r.ENABLE_INFO = !0, 
    r.ENABLE_WARN = !0, r.ENABLE_DEBUG = !0, r.ENABLE_VERBOSE = !0, r.ENABLE_CALLBACK = !1, 
    r.emitter = new a.a, t.a = r;
}, function(e, t, i) {
    t.a = {
        IO_ERROR: "io_error",
        DEMUX_ERROR: "demux_error",
        INIT_SEGMENT: "init_segment",
        MEDIA_SEGMENT: "media_segment",
        LOADING_COMPLETE: "loading_complete",
        RECOVERED_EARLY_EOF: "recovered_early_eof",
        MEDIA_INFO: "media_info",
        METADATA_ARRIVED: "metadata_arrived",
        SCRIPTDATA_ARRIVED: "scriptdata_arrived",
        TIMED_ID3_METADATA_ARRIVED: "timed_id3_metadata_arrived",
        SMPTE2038_METADATA_ARRIVED: "smpte2038_metadata_arrived",
        SCTE35_METADATA_ARRIVED: "scte35_metadata_arrived",
        PES_PRIVATE_DATA_DESCRIPTOR: "pes_private_data_descriptor",
        PES_PRIVATE_DATA_ARRIVED: "pes_private_data_arrived",
        STATISTICS_INFO: "statistics_info",
        RECOMMEND_SEEKPOINT: "recommend_seekpoint"
    };
}, function(e, t, i) {
    i.d(t, "c", (function() {
        return a;
    })), i.d(t, "b", (function() {
        return r;
    })), i.d(t, "a", (function() {
        return s;
    }));
    var n = i(3), a = {
        kIdle: 0,
        kConnecting: 1,
        kBuffering: 2,
        kError: 3,
        kComplete: 4
    }, r = {
        OK: "OK",
        EXCEPTION: "Exception",
        HTTP_STATUS_CODE_INVALID: "HttpStatusCodeInvalid",
        CONNECTING_TIMEOUT: "ConnectingTimeout",
        EARLY_EOF: "EarlyEof",
        UNRECOVERABLE_EARLY_EOF: "UnrecoverableEarlyEof"
    }, s = function() {
        function e(e) {
            this._type = e || "undefined", this._status = a.kIdle, this._needStash = !1, this._onContentLengthKnown = null, 
            this._onURLRedirect = null, this._onDataArrival = null, this._onError = null, this._onComplete = null;
        }
        return e.prototype.destroy = function() {
            this._status = a.kIdle, this._onContentLengthKnown = null, this._onURLRedirect = null, 
            this._onDataArrival = null, this._onError = null, this._onComplete = null;
        }, e.prototype.isWorking = function() {
            return this._status === a.kConnecting || this._status === a.kBuffering;
        }, Object.defineProperty(e.prototype, "type", {
            get: function() {
                return this._type;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "status", {
            get: function() {
                return this._status;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "needStashBuffer", {
            get: function() {
                return this._needStash;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onContentLengthKnown", {
            get: function() {
                return this._onContentLengthKnown;
            },
            set: function(e) {
                this._onContentLengthKnown = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onURLRedirect", {
            get: function() {
                return this._onURLRedirect;
            },
            set: function(e) {
                this._onURLRedirect = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onDataArrival", {
            get: function() {
                return this._onDataArrival;
            },
            set: function(e) {
                this._onDataArrival = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onError", {
            get: function() {
                return this._onError;
            },
            set: function(e) {
                this._onError = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onComplete", {
            get: function() {
                return this._onComplete;
            },
            set: function(e) {
                this._onComplete = e;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.open = function(e, t) {
            throw new n.c("Unimplemented abstract function!");
        }, e.prototype.abort = function() {
            throw new n.c("Unimplemented abstract function!");
        }, e;
    }();
}, function(e, t, i) {
    i.d(t, "d", (function() {
        return r;
    })), i.d(t, "a", (function() {
        return s;
    })), i.d(t, "b", (function() {
        return o;
    })), i.d(t, "c", (function() {
        return d;
    }));
    var n, a = (n = function(e, t) {
        return (n = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(e, t) {
            e.__proto__ = t;
        } || function(e, t) {
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
        })(e, t);
    }, function(e, t) {
        function i() {
            this.constructor = e;
        }
        n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, 
        new i);
    }), r = function() {
        function e(e) {
            this._message = e;
        }
        return Object.defineProperty(e.prototype, "name", {
            get: function() {
                return "RuntimeException";
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "message", {
            get: function() {
                return this._message;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.toString = function() {
            return this.name + ": " + this.message;
        }, e;
    }(), s = function(e) {
        function t(t) {
            return e.call(this, t) || this;
        }
        return a(t, e), Object.defineProperty(t.prototype, "name", {
            get: function() {
                return "IllegalStateException";
            },
            enumerable: !1,
            configurable: !0
        }), t;
    }(r), o = function(e) {
        function t(t) {
            return e.call(this, t) || this;
        }
        return a(t, e), Object.defineProperty(t.prototype, "name", {
            get: function() {
                return "InvalidArgumentException";
            },
            enumerable: !1,
            configurable: !0
        }), t;
    }(r), d = function(e) {
        function t(t) {
            return e.call(this, t) || this;
        }
        return a(t, e), Object.defineProperty(t.prototype, "name", {
            get: function() {
                return "NotImplementedException";
            },
            enumerable: !1,
            configurable: !0
        }), t;
    }(r);
}, function(e, t, i) {
    var n = {};
    !function() {
        var e = self.navigator.userAgent.toLowerCase(), t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(firefox)[ \/]([\w.]+)/.exec(e) || [], i = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(android)/.exec(e) || /(windows)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || [], a = {
            browser: t[5] || t[3] || t[1] || "",
            version: t[2] || t[4] || "0",
            majorVersion: t[4] || t[2] || "0",
            platform: i[0] || ""
        }, r = {};
        if (a.browser) {
            r[a.browser] = !0;
            var s = a.majorVersion.split(".");
            r.version = {
                major: parseInt(a.majorVersion, 10),
                string: a.version
            }, s.length > 1 && (r.version.minor = parseInt(s[1], 10)), s.length > 2 && (r.version.build = parseInt(s[2], 10));
        }
        for (var o in a.platform && (r[a.platform] = !0), (r.chrome || r.opr || r.safari) && (r.webkit = !0), 
        (r.rv || r.iemobile) && (r.rv && delete r.rv, a.browser = "msie", r.msie = !0), 
        r.edge && (delete r.edge, a.browser = "msedge", r.msedge = !0), r.opr && (a.browser = "opera", 
        r.opera = !0), r.safari && r.android && (a.browser = "android", r.android = !0), 
        r.name = a.browser, r.platform = a.platform, n) n.hasOwnProperty(o) && delete n[o];
        Object.assign(n, r);
    }(), t.a = n;
}, function(e, t, i) {
    t.a = {
        OK: "OK",
        FORMAT_ERROR: "FormatError",
        FORMAT_UNSUPPORTED: "FormatUnsupported",
        CODEC_UNSUPPORTED: "CodecUnsupported"
    };
}, function(e, t, i) {
    var n, a = "object" == typeof Reflect ? Reflect : null, r = a && "function" == typeof a.apply ? a.apply : function(e, t, i) {
        return Function.prototype.apply.call(e, t, i);
    };
    n = a && "function" == typeof a.ownKeys ? a.ownKeys : Object.getOwnPropertySymbols ? function(e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
    } : function(e) {
        return Object.getOwnPropertyNames(e);
    };
    var s = Number.isNaN || function(e) {
        return e != e;
    };
    function o() {
        o.init.call(this);
    }
    e.exports = o, e.exports.once = function(e, t) {
        return new Promise((function(i, n) {
            function a(i) {
                e.removeListener(t, r), n(i);
            }
            function r() {
                "function" == typeof e.removeListener && e.removeListener("error", a), i([].slice.call(arguments));
            }
            g(e, t, r, {
                once: !0
            }), "error" !== t && function(e, t, i) {
                "function" == typeof e.on && g(e, "error", t, i);
            }(e, a, {
                once: !0
            });
        }));
    }, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, 
    o.prototype._maxListeners = void 0;
    var d = 10;
    function _(e) {
        if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
    }
    function h(e) {
        return void 0 === e._maxListeners ? o.defaultMaxListeners : e._maxListeners;
    }
    function c(e, t, i, n) {
        var a, r, s, o;
        if (_(i), void 0 === (r = e._events) ? (r = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== r.newListener && (e.emit("newListener", t, i.listener ? i.listener : i), 
        r = e._events), s = r[t]), void 0 === s) s = r[t] = i, ++e._eventsCount; else if ("function" == typeof s ? s = r[t] = n ? [ i, s ] : [ s, i ] : n ? s.unshift(i) : s.push(i), 
        (a = h(e)) > 0 && s.length > a && !s.warned) {
            s.warned = !0;
            var d = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            d.name = "MaxListenersExceededWarning", d.emitter = e, d.type = t, d.count = s.length, 
            o = d, console && console.warn && console.warn(o);
        }
        return e;
    }
    function u() {
        if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 
        0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
    }
    function l(e, t, i) {
        var n = {
            fired: !1,
            wrapFn: void 0,
            target: e,
            type: t,
            listener: i
        }, a = u.bind(n);
        return a.listener = i, n.wrapFn = a, a;
    }
    function f(e, t, i) {
        var n = e._events;
        if (void 0 === n) return [];
        var a = n[t];
        return void 0 === a ? [] : "function" == typeof a ? i ? [ a.listener || a ] : [ a ] : i ? function(e) {
            for (var t = new Array(e.length), i = 0; i < t.length; ++i) t[i] = e[i].listener || e[i];
            return t;
        }(a) : m(a, a.length);
    }
    function p(e) {
        var t = this._events;
        if (void 0 !== t) {
            var i = t[e];
            if ("function" == typeof i) return 1;
            if (void 0 !== i) return i.length;
        }
        return 0;
    }
    function m(e, t) {
        for (var i = new Array(t), n = 0; n < t; ++n) i[n] = e[n];
        return i;
    }
    function g(e, t, i, n) {
        if ("function" == typeof e.on) n.once ? e.once(t, i) : e.on(t, i); else {
            if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
            e.addEventListener(t, (function a(r) {
                n.once && e.removeEventListener(t, a), i(r);
            }));
        }
    }
    Object.defineProperty(o, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return d;
        },
        set: function(e) {
            if ("number" != typeof e || e < 0 || s(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
            d = e;
        }
    }), o.init = function() {
        void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), 
        this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    }, o.prototype.setMaxListeners = function(e) {
        if ("number" != typeof e || e < 0 || s(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e, this;
    }, o.prototype.getMaxListeners = function() {
        return h(this);
    }, o.prototype.emit = function(e) {
        for (var t = [], i = 1; i < arguments.length; i++) t.push(arguments[i]);
        var n = "error" === e, a = this._events;
        if (void 0 !== a) n = n && void 0 === a.error; else if (!n) return !1;
        if (n) {
            var s;
            if (t.length > 0 && (s = t[0]), s instanceof Error) throw s;
            var o = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
            throw o.context = s, o;
        }
        var d = a[e];
        if (void 0 === d) return !1;
        if ("function" == typeof d) r(d, this, t); else {
            var _ = d.length, h = m(d, _);
            for (i = 0; i < _; ++i) r(h[i], this, t);
        }
        return !0;
    }, o.prototype.addListener = function(e, t) {
        return c(this, e, t, !1);
    }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(e, t) {
        return c(this, e, t, !0);
    }, o.prototype.once = function(e, t) {
        return _(t), this.on(e, l(this, e, t)), this;
    }, o.prototype.prependOnceListener = function(e, t) {
        return _(t), this.prependListener(e, l(this, e, t)), this;
    }, o.prototype.removeListener = function(e, t) {
        var i, n, a, r, s;
        if (_(t), void 0 === (n = this._events)) return this;
        if (void 0 === (i = n[e])) return this;
        if (i === t || i.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[e], 
        n.removeListener && this.emit("removeListener", e, i.listener || t)); else if ("function" != typeof i) {
            for (a = -1, r = i.length - 1; r >= 0; r--) if (i[r] === t || i[r].listener === t) {
                s = i[r].listener, a = r;
                break;
            }
            if (a < 0) return this;
            0 === a ? i.shift() : function(e, t) {
                for (;t + 1 < e.length; t++) e[t] = e[t + 1];
                e.pop();
            }(i, a), 1 === i.length && (n[e] = i[0]), void 0 !== n.removeListener && this.emit("removeListener", e, s || t);
        }
        return this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(e) {
        var t, i, n;
        if (void 0 === (i = this._events)) return this;
        if (void 0 === i.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), 
        this._eventsCount = 0) : void 0 !== i[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete i[e]), 
        this;
        if (0 === arguments.length) {
            var a, r = Object.keys(i);
            for (n = 0; n < r.length; ++n) "removeListener" !== (a = r[n]) && this.removeAllListeners(a);
            return this.removeAllListeners("removeListener"), this._events = Object.create(null), 
            this._eventsCount = 0, this;
        }
        if ("function" == typeof (t = i[e])) this.removeListener(e, t); else if (void 0 !== t) for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
        return this;
    }, o.prototype.listeners = function(e) {
        return f(this, e, !0);
    }, o.prototype.rawListeners = function(e) {
        return f(this, e, !1);
    }, o.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : p.call(e, t);
    }, o.prototype.listenerCount = p, o.prototype.eventNames = function() {
        return this._eventsCount > 0 ? n(this._events) : [];
    };
}, function(e, t, i) {
    i.d(t, "d", (function() {
        return n;
    })), i.d(t, "b", (function() {
        return a;
    })), i.d(t, "a", (function() {
        return r;
    })), i.d(t, "c", (function() {
        return s;
    }));
    var n = function(e, t, i, n, a) {
        this.dts = e, this.pts = t, this.duration = i, this.originalDts = n, this.isSyncPoint = a, 
        this.fileposition = null;
    }, a = function() {
        function e() {
            this.beginDts = 0, this.endDts = 0, this.beginPts = 0, this.endPts = 0, this.originalBeginDts = 0, 
            this.originalEndDts = 0, this.syncPoints = [], this.firstSample = null, this.lastSample = null;
        }
        return e.prototype.appendSyncPoint = function(e) {
            e.isSyncPoint = !0, this.syncPoints.push(e);
        }, e;
    }(), r = function() {
        function e() {
            this._list = [];
        }
        return e.prototype.clear = function() {
            this._list = [];
        }, e.prototype.appendArray = function(e) {
            var t = this._list;
            0 !== e.length && (t.length > 0 && e[0].originalDts < t[t.length - 1].originalDts && this.clear(), 
            Array.prototype.push.apply(t, e));
        }, e.prototype.getLastSyncPointBeforeDts = function(e) {
            if (0 == this._list.length) return null;
            var t = this._list, i = 0, n = t.length - 1, a = 0, r = 0, s = n;
            for (e < t[0].dts && (i = 0, r = s + 1); r <= s; ) {
                if ((a = r + Math.floor((s - r) / 2)) === n || e >= t[a].dts && e < t[a + 1].dts) {
                    i = a;
                    break;
                }
                t[a].dts < e ? r = a + 1 : s = a - 1;
            }
            return this._list[i];
        }, e;
    }(), s = function() {
        function e(e) {
            this._type = e, this._list = [], this._lastAppendLocation = -1;
        }
        return Object.defineProperty(e.prototype, "type", {
            get: function() {
                return this._type;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "length", {
            get: function() {
                return this._list.length;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.isEmpty = function() {
            return 0 === this._list.length;
        }, e.prototype.clear = function() {
            this._list = [], this._lastAppendLocation = -1;
        }, e.prototype._searchNearestSegmentBefore = function(e) {
            var t = this._list;
            if (0 === t.length) return -2;
            var i = t.length - 1, n = 0, a = 0, r = i, s = 0;
            if (e < t[0].originalBeginDts) return -1;
            for (;a <= r; ) {
                if ((n = a + Math.floor((r - a) / 2)) === i || e > t[n].lastSample.originalDts && e < t[n + 1].originalBeginDts) {
                    s = n;
                    break;
                }
                t[n].originalBeginDts < e ? a = n + 1 : r = n - 1;
            }
            return s;
        }, e.prototype._searchNearestSegmentAfter = function(e) {
            return this._searchNearestSegmentBefore(e) + 1;
        }, e.prototype.append = function(e) {
            var t = this._list, i = e, n = this._lastAppendLocation, a = 0;
            -1 !== n && n < t.length && i.originalBeginDts >= t[n].lastSample.originalDts && (n === t.length - 1 || n < t.length - 1 && i.originalBeginDts < t[n + 1].originalBeginDts) ? a = n + 1 : t.length > 0 && (a = this._searchNearestSegmentBefore(i.originalBeginDts) + 1), 
            this._lastAppendLocation = a, this._list.splice(a, 0, i);
        }, e.prototype.getLastSegmentBefore = function(e) {
            var t = this._searchNearestSegmentBefore(e);
            return t >= 0 ? this._list[t] : null;
        }, e.prototype.getLastSampleBefore = function(e) {
            var t = this.getLastSegmentBefore(e);
            return null != t ? t.lastSample : null;
        }, e.prototype.getLastSyncPointBefore = function(e) {
            for (var t = this._searchNearestSegmentBefore(e), i = this._list[t].syncPoints; 0 === i.length && t > 0; ) t--, 
            i = this._list[t].syncPoints;
            return i.length > 0 ? i[i.length - 1] : null;
        }, e;
    }();
}, function(e, t, i) {
    var n = function() {
        function e() {
            this.mimeType = null, this.duration = null, this.hasAudio = null, this.hasVideo = null, 
            this.audioCodec = null, this.videoCodec = null, this.audioDataRate = null, this.videoDataRate = null, 
            this.audioSampleRate = null, this.audioChannelCount = null, this.width = null, this.height = null, 
            this.fps = null, this.profile = null, this.level = null, this.refFrames = null, 
            this.chromaFormat = null, this.sarNum = null, this.sarDen = null, this.metadata = null, 
            this.segments = null, this.segmentCount = null, this.hasKeyframesIndex = null, this.keyframesIndex = null;
        }
        return e.prototype.isComplete = function() {
            var e = !1 === this.hasAudio || !0 === this.hasAudio && null != this.audioCodec && null != this.audioSampleRate && null != this.audioChannelCount, t = !1 === this.hasVideo || !0 === this.hasVideo && null != this.videoCodec && null != this.width && null != this.height && null != this.fps && null != this.profile && null != this.level && null != this.refFrames && null != this.chromaFormat && null != this.sarNum && null != this.sarDen;
            return null != this.mimeType && e && t;
        }, e.prototype.isSeekable = function() {
            return !0 === this.hasKeyframesIndex;
        }, e.prototype.getNearestKeyframe = function(e) {
            if (null == this.keyframesIndex) return null;
            var t = this.keyframesIndex, i = this._search(t.times, e);
            return {
                index: i,
                milliseconds: t.times[i],
                fileposition: t.filepositions[i]
            };
        }, e.prototype._search = function(e, t) {
            var i = 0, n = e.length - 1, a = 0, r = 0, s = n;
            for (t < e[0] && (i = 0, r = s + 1); r <= s; ) {
                if ((a = r + Math.floor((s - r) / 2)) === n || t >= e[a] && t < e[a + 1]) {
                    i = a;
                    break;
                }
                e[a] < t ? r = a + 1 : s = a - 1;
            }
            return i;
        }, e;
    }();
    t.a = n;
}, function(e, t, i) {
    var n = i(6), a = i.n(n), r = i(0), s = function() {
        function e() {}
        return Object.defineProperty(e, "forceGlobalTag", {
            get: function() {
                return r.a.FORCE_GLOBAL_TAG;
            },
            set: function(t) {
                r.a.FORCE_GLOBAL_TAG = t, e._notifyChange();
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e, "globalTag", {
            get: function() {
                return r.a.GLOBAL_TAG;
            },
            set: function(t) {
                r.a.GLOBAL_TAG = t, e._notifyChange();
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e, "enableAll", {
            get: function() {
                return r.a.ENABLE_VERBOSE && r.a.ENABLE_DEBUG && r.a.ENABLE_INFO && r.a.ENABLE_WARN && r.a.ENABLE_ERROR;
            },
            set: function(t) {
                r.a.ENABLE_VERBOSE = t, r.a.ENABLE_DEBUG = t, r.a.ENABLE_INFO = t, r.a.ENABLE_WARN = t, 
                r.a.ENABLE_ERROR = t, e._notifyChange();
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e, "enableDebug", {
            get: function() {
                return r.a.ENABLE_DEBUG;
            },
            set: function(t) {
                r.a.ENABLE_DEBUG = t, e._notifyChange();
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e, "enableVerbose", {
            get: function() {
                return r.a.ENABLE_VERBOSE;
            },
            set: function(t) {
                r.a.ENABLE_VERBOSE = t, e._notifyChange();
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e, "enableInfo", {
            get: function() {
                return r.a.ENABLE_INFO;
            },
            set: function(t) {
                r.a.ENABLE_INFO = t, e._notifyChange();
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e, "enableWarn", {
            get: function() {
                return r.a.ENABLE_WARN;
            },
            set: function(t) {
                r.a.ENABLE_WARN = t, e._notifyChange();
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e, "enableError", {
            get: function() {
                return r.a.ENABLE_ERROR;
            },
            set: function(t) {
                r.a.ENABLE_ERROR = t, e._notifyChange();
            },
            enumerable: !1,
            configurable: !0
        }), e.getConfig = function() {
            return {
                globalTag: r.a.GLOBAL_TAG,
                forceGlobalTag: r.a.FORCE_GLOBAL_TAG,
                enableVerbose: r.a.ENABLE_VERBOSE,
                enableDebug: r.a.ENABLE_DEBUG,
                enableInfo: r.a.ENABLE_INFO,
                enableWarn: r.a.ENABLE_WARN,
                enableError: r.a.ENABLE_ERROR,
                enableCallback: r.a.ENABLE_CALLBACK
            };
        }, e.applyConfig = function(e) {
            r.a.GLOBAL_TAG = e.globalTag, r.a.FORCE_GLOBAL_TAG = e.forceGlobalTag, r.a.ENABLE_VERBOSE = e.enableVerbose, 
            r.a.ENABLE_DEBUG = e.enableDebug, r.a.ENABLE_INFO = e.enableInfo, r.a.ENABLE_WARN = e.enableWarn, 
            r.a.ENABLE_ERROR = e.enableError, r.a.ENABLE_CALLBACK = e.enableCallback;
        }, e._notifyChange = function() {
            var t = e.emitter;
            if (t.listenerCount("change") > 0) {
                var i = e.getConfig();
                t.emit("change", i);
            }
        }, e.registerListener = function(t) {
            e.emitter.addListener("change", t);
        }, e.removeListener = function(t) {
            e.emitter.removeListener("change", t);
        }, e.addLogListener = function(t) {
            r.a.emitter.addListener("log", t), r.a.emitter.listenerCount("log") > 0 && (r.a.ENABLE_CALLBACK = !0, 
            e._notifyChange());
        }, e.removeLogListener = function(t) {
            r.a.emitter.removeListener("log", t), 0 === r.a.emitter.listenerCount("log") && (r.a.ENABLE_CALLBACK = !1, 
            e._notifyChange());
        }, e;
    }();
    s.emitter = new a.a, t.a = s;
}, function(e, t, i) {
    var n = i(6), a = i.n(n), r = i(0), s = i(4), o = i(8);
    function d(e, t, i) {
        var n = e;
        if (t + i < n.length) {
            for (;i--; ) if (128 != (192 & n[++t])) return !1;
            return !0;
        }
        return !1;
    }
    var _, h = function(e) {
        for (var t = [], i = e, n = 0, a = e.length; n < a; ) if (i[n] < 128) t.push(String.fromCharCode(i[n])), 
        ++n; else {
            if (i[n] < 192) ; else if (i[n] < 224) {
                if (d(i, n, 1) && (r = (31 & i[n]) << 6 | 63 & i[n + 1]) >= 128) {
                    t.push(String.fromCharCode(65535 & r)), n += 2;
                    continue;
                }
            } else if (i[n] < 240) {
                if (d(i, n, 2) && (r = (15 & i[n]) << 12 | (63 & i[n + 1]) << 6 | 63 & i[n + 2]) >= 2048 && 55296 != (63488 & r)) {
                    t.push(String.fromCharCode(65535 & r)), n += 3;
                    continue;
                }
            } else if (i[n] < 248) {
                var r;
                if (d(i, n, 3) && (r = (7 & i[n]) << 18 | (63 & i[n + 1]) << 12 | (63 & i[n + 2]) << 6 | 63 & i[n + 3]) > 65536 && r < 1114112) {
                    r -= 65536, t.push(String.fromCharCode(r >>> 10 | 55296)), t.push(String.fromCharCode(1023 & r | 56320)), 
                    n += 4;
                    continue;
                }
            }
            t.push(String.fromCharCode(65533)), ++n;
        }
        return t.join("");
    }, c = i(3), u = (_ = new ArrayBuffer(2), new DataView(_).setInt16(0, 256, !0), 
    256 === new Int16Array(_)[0]), l = function() {
        function e() {}
        return e.parseScriptData = function(t, i, n) {
            var a = {};
            try {
                var s = e.parseValue(t, i, n), o = e.parseValue(t, i + s.size, n - s.size);
                a[s.data] = o.data;
            } catch (e) {
                r.a.e("AMF", e.toString());
            }
            return a;
        }, e.parseObject = function(t, i, n) {
            if (n < 3) throw new c.a("Data not enough when parse ScriptDataObject");
            var a = e.parseString(t, i, n), r = e.parseValue(t, i + a.size, n - a.size), s = r.objectEnd;
            return {
                data: {
                    name: a.data,
                    value: r.data
                },
                size: a.size + r.size,
                objectEnd: s
            };
        }, e.parseVariable = function(t, i, n) {
            return e.parseObject(t, i, n);
        }, e.parseString = function(e, t, i) {
            if (i < 2) throw new c.a("Data not enough when parse String");
            var n = new DataView(e, t, i).getUint16(0, !u);
            return {
                data: n > 0 ? h(new Uint8Array(e, t + 2, n)) : "",
                size: 2 + n
            };
        }, e.parseLongString = function(e, t, i) {
            if (i < 4) throw new c.a("Data not enough when parse LongString");
            var n = new DataView(e, t, i).getUint32(0, !u);
            return {
                data: n > 0 ? h(new Uint8Array(e, t + 4, n)) : "",
                size: 4 + n
            };
        }, e.parseDate = function(e, t, i) {
            if (i < 10) throw new c.a("Data size invalid when parse Date");
            var n = new DataView(e, t, i), a = n.getFloat64(0, !u), r = n.getInt16(8, !u);
            return {
                data: new Date(a += 60 * r * 1e3),
                size: 10
            };
        }, e.parseValue = function(t, i, n) {
            if (n < 1) throw new c.a("Data not enough when parse Value");
            var a, s = new DataView(t, i, n), o = 1, d = s.getUint8(0), _ = !1;
            try {
                switch (d) {
                  case 0:
                    a = s.getFloat64(1, !u), o += 8;
                    break;

                  case 1:
                    a = !!s.getUint8(1), o += 1;
                    break;

                  case 2:
                    var h = e.parseString(t, i + 1, n - 1);
                    a = h.data, o += h.size;
                    break;

                  case 3:
                    a = {};
                    var l = 0;
                    for (9 == (16777215 & s.getUint32(n - 4, !u)) && (l = 3); o < n - 4; ) {
                        var f = e.parseObject(t, i + o, n - o - l);
                        if (f.objectEnd) break;
                        a[f.data.name] = f.data.value, o += f.size;
                    }
                    o <= n - 3 && 9 == (16777215 & s.getUint32(o - 1, !u)) && (o += 3);
                    break;

                  case 8:
                    for (a = {}, o += 4, l = 0, 9 == (16777215 & s.getUint32(n - 4, !u)) && (l = 3); o < n - 8; ) {
                        var p = e.parseVariable(t, i + o, n - o - l);
                        if (p.objectEnd) break;
                        a[p.data.name] = p.data.value, o += p.size;
                    }
                    o <= n - 3 && 9 == (16777215 & s.getUint32(o - 1, !u)) && (o += 3);
                    break;

                  case 9:
                    a = void 0, o = 1, _ = !0;
                    break;

                  case 10:
                    a = [];
                    var m = s.getUint32(1, !u);
                    o += 4;
                    for (var g = 0; g < m; g++) {
                        var v = e.parseValue(t, i + o, n - o);
                        a.push(v.data), o += v.size;
                    }
                    break;

                  case 11:
                    var y = e.parseDate(t, i + 1, n - 1);
                    a = y.data, o += y.size;
                    break;

                  case 12:
                    var b = e.parseString(t, i + 1, n - 1);
                    a = b.data, o += b.size;
                    break;

                  default:
                    o = n, r.a.w("AMF", "Unsupported AMF value type " + d);
                }
            } catch (e) {
                r.a.e("AMF", e.toString());
            }
            return {
                data: a,
                size: o,
                objectEnd: _
            };
        }, e;
    }(), f = function() {
        function e(e) {
            this.TAG = "ExpGolomb", this._buffer = e, this._buffer_index = 0, this._total_bytes = e.byteLength, 
            this._total_bits = 8 * e.byteLength, this._current_word = 0, this._current_word_bits_left = 0;
        }
        return e.prototype.destroy = function() {
            this._buffer = null;
        }, e.prototype._fillCurrentWord = function() {
            var e = this._total_bytes - this._buffer_index;
            if (e <= 0) throw new c.a("ExpGolomb: _fillCurrentWord() but no bytes available");
            var t = Math.min(4, e), i = new Uint8Array(4);
            i.set(this._buffer.subarray(this._buffer_index, this._buffer_index + t)), this._current_word = new DataView(i.buffer).getUint32(0, !1), 
            this._buffer_index += t, this._current_word_bits_left = 8 * t;
        }, e.prototype.readBits = function(e) {
            if (e > 32) throw new c.b("ExpGolomb: readBits() bits exceeded max 32bits!");
            if (e <= this._current_word_bits_left) {
                var t = this._current_word >>> 32 - e;
                return this._current_word <<= e, this._current_word_bits_left -= e, t;
            }
            var i = this._current_word_bits_left ? this._current_word : 0;
            i >>>= 32 - this._current_word_bits_left;
            var n = e - this._current_word_bits_left;
            this._fillCurrentWord();
            var a = Math.min(n, this._current_word_bits_left), r = this._current_word >>> 32 - a;
            return this._current_word <<= a, this._current_word_bits_left -= a, i << a | r;
        }, e.prototype.readBool = function() {
            return 1 === this.readBits(1);
        }, e.prototype.readByte = function() {
            return this.readBits(8);
        }, e.prototype._skipLeadingZero = function() {
            var e;
            for (e = 0; e < this._current_word_bits_left; e++) if (0 != (this._current_word & 2147483648 >>> e)) return this._current_word <<= e, 
            this._current_word_bits_left -= e, e;
            return this._fillCurrentWord(), e + this._skipLeadingZero();
        }, e.prototype.readUEG = function() {
            var e = this._skipLeadingZero();
            return this.readBits(e + 1) - 1;
        }, e.prototype.readSEG = function() {
            var e = this.readUEG();
            return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1);
        }, e;
    }(), p = function() {
        function e() {}
        return e._ebsp2rbsp = function(e) {
            for (var t = e, i = t.byteLength, n = new Uint8Array(i), a = 0, r = 0; r < i; r++) r >= 2 && 3 === t[r] && 0 === t[r - 1] && 0 === t[r - 2] || (n[a] = t[r], 
            a++);
            return new Uint8Array(n.buffer, 0, a);
        }, e.parseSPS = function(t) {
            for (var i = t.subarray(1, 4), n = "avc1.", a = 0; a < 3; a++) {
                var r = i[a].toString(16);
                r.length < 2 && (r = "0" + r), n += r;
            }
            var s = e._ebsp2rbsp(t), o = new f(s);
            o.readByte();
            var d = o.readByte();
            o.readByte();
            var _ = o.readByte();
            o.readUEG();
            var h = e.getProfileString(d), c = e.getLevelString(_), u = 1, l = 420, p = 8, m = 8;
            if ((100 === d || 110 === d || 122 === d || 244 === d || 44 === d || 83 === d || 86 === d || 118 === d || 128 === d || 138 === d || 144 === d) && (3 === (u = o.readUEG()) && o.readBits(1), 
            u <= 3 && (l = [ 0, 420, 422, 444 ][u]), p = o.readUEG() + 8, m = o.readUEG() + 8, 
            o.readBits(1), o.readBool())) for (var g = 3 !== u ? 8 : 12, v = 0; v < g; v++) o.readBool() && (v < 6 ? e._skipScalingList(o, 16) : e._skipScalingList(o, 64));
            o.readUEG();
            var y = o.readUEG();
            if (0 === y) o.readUEG(); else if (1 === y) {
                o.readBits(1), o.readSEG(), o.readSEG();
                var b = o.readUEG();
                for (v = 0; v < b; v++) o.readSEG();
            }
            var S = o.readUEG();
            o.readBits(1);
            var E = o.readUEG(), A = o.readUEG(), R = o.readBits(1);
            0 === R && o.readBits(1), o.readBits(1);
            var T = 0, L = 0, w = 0, k = 0;
            o.readBool() && (T = o.readUEG(), L = o.readUEG(), w = o.readUEG(), k = o.readUEG());
            var D = 1, C = 1, B = 0, I = !0, O = 0, P = 0;
            if (o.readBool()) {
                if (o.readBool()) {
                    var M = o.readByte();
                    M > 0 && M < 16 ? (D = [ 1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2 ][M - 1], 
                    C = [ 1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1 ][M - 1]) : 255 === M && (D = o.readByte() << 8 | o.readByte(), 
                    C = o.readByte() << 8 | o.readByte());
                }
                if (o.readBool() && o.readBool(), o.readBool() && (o.readBits(4), o.readBool() && o.readBits(24)), 
                o.readBool() && (o.readUEG(), o.readUEG()), o.readBool()) {
                    var x = o.readBits(32), U = o.readBits(32);
                    I = o.readBool(), B = (O = U) / (P = 2 * x);
                }
            }
            var N = 1;
            1 === D && 1 === C || (N = D / C);
            var G = 0, V = 0;
            0 === u ? (G = 1, V = 2 - R) : (G = 3 === u ? 1 : 2, V = (1 === u ? 2 : 1) * (2 - R));
            var F = 16 * (E + 1), j = 16 * (A + 1) * (2 - R);
            F -= (T + L) * G, j -= (w + k) * V;
            var z = Math.ceil(F * N);
            return o.destroy(), o = null, {
                codec_mimetype: n,
                profile_idc: d,
                level_idc: _,
                profile_string: h,
                level_string: c,
                chroma_format_idc: u,
                bit_depth: p,
                bit_depth_luma: p,
                bit_depth_chroma: m,
                ref_frames: S,
                chroma_format: l,
                chroma_format_string: e.getChromaFormatString(l),
                frame_rate: {
                    fixed: I,
                    fps: B,
                    fps_den: P,
                    fps_num: O
                },
                sar_ratio: {
                    width: D,
                    height: C
                },
                codec_size: {
                    width: F,
                    height: j
                },
                present_size: {
                    width: z,
                    height: j
                }
            };
        }, e._skipScalingList = function(e, t) {
            for (var i = 8, n = 8, a = 0; a < t; a++) 0 !== n && (n = (i + e.readSEG() + 256) % 256), 
            i = 0 === n ? i : n;
        }, e.getProfileString = function(e) {
            switch (e) {
              case 66:
                return "Baseline";

              case 77:
                return "Main";

              case 88:
                return "Extended";

              case 100:
                return "High";

              case 110:
                return "High10";

              case 122:
                return "High422";

              case 244:
                return "High444";

              default:
                return "Unknown";
            }
        }, e.getLevelString = function(e) {
            return (e / 10).toFixed(1);
        }, e.getChromaFormatString = function(e) {
            switch (e) {
              case 420:
                return "4:2:0";

              case 422:
                return "4:2:2";

              case 444:
                return "4:4:4";

              default:
                return "Unknown";
            }
        }, e;
    }(), m = i(5), g = function() {
        function e() {}
        return e._ebsp2rbsp = function(e) {
            for (var t = e, i = t.byteLength, n = new Uint8Array(i), a = 0, r = 0; r < i; r++) r >= 2 && 3 === t[r] && 0 === t[r - 1] && 0 === t[r - 2] || (n[a] = t[r], 
            a++);
            return new Uint8Array(n.buffer, 0, a);
        }, e.parseVPS = function(t) {
            var i = e._ebsp2rbsp(t), n = new f(i);
            return n.readByte(), n.readByte(), n.readBits(4), n.readBits(2), n.readBits(6), 
            {
                num_temporal_layers: n.readBits(3) + 1,
                temporal_id_nested: n.readBool()
            };
        }, e.parseSPS = function(t) {
            var i = e._ebsp2rbsp(t), n = new f(i);
            n.readByte(), n.readByte();
            for (var a = 0, r = 0, s = 0, o = 0, d = (n.readBits(4), n.readBits(3)), _ = (n.readBool(), 
            n.readBits(2)), h = n.readBool(), c = n.readBits(5), u = n.readByte(), l = n.readByte(), p = n.readByte(), m = n.readByte(), g = n.readByte(), v = n.readByte(), y = n.readByte(), b = n.readByte(), S = n.readByte(), E = n.readByte(), A = n.readByte(), R = [], T = [], L = 0; L < d; L++) R.push(n.readBool()), 
            T.push(n.readBool());
            if (d > 0) for (L = d; L < 8; L++) n.readBits(2);
            for (L = 0; L < d; L++) R[L] && (n.readByte(), n.readByte(), n.readByte(), n.readByte(), 
            n.readByte(), n.readByte(), n.readByte(), n.readByte(), n.readByte(), n.readByte(), 
            n.readByte()), T[L] && n.readByte();
            n.readUEG();
            var w = n.readUEG();
            3 == w && n.readBits(1);
            var k = n.readUEG(), D = n.readUEG();
            n.readBool() && (a += n.readUEG(), r += n.readUEG(), s += n.readUEG(), o += n.readUEG());
            var C = n.readUEG(), B = n.readUEG(), I = n.readUEG();
            for (L = n.readBool() ? 0 : d; L <= d; L++) n.readUEG(), n.readUEG(), n.readUEG();
            if (n.readUEG(), n.readUEG(), n.readUEG(), n.readUEG(), n.readUEG(), n.readUEG(), 
            n.readBool() && n.readBool()) for (var O = 0; O < 4; O++) for (var P = 0; P < (3 === O ? 2 : 6); P++) if (n.readBool()) {
                var M = Math.min(64, 1 << 4 + (O << 1));
                for (O > 1 && n.readSEG(), L = 0; L < M; L++) n.readSEG();
            } else n.readUEG();
            n.readBool(), n.readBool(), n.readBool() && (n.readByte(), n.readUEG(), n.readUEG(), 
            n.readBool());
            var x = n.readUEG(), U = 0;
            for (L = 0; L < x; L++) {
                var N = !1;
                if (0 !== L && (N = n.readBool()), N) {
                    L === x && n.readUEG(), n.readBool(), n.readUEG();
                    for (var G = 0, V = 0; V <= U; V++) {
                        var F = n.readBool(), j = !1;
                        F || (j = n.readBool()), (F || j) && G++;
                    }
                    U = G;
                } else {
                    var z = n.readUEG(), H = n.readUEG();
                    for (U = z + H, V = 0; V < z; V++) n.readUEG(), n.readBool();
                    for (V = 0; V < H; V++) n.readUEG(), n.readBool();
                }
            }
            if (n.readBool()) {
                var q = n.readUEG();
                for (L = 0; L < q; L++) {
                    for (V = 0; V < I + 4; V++) n.readBits(1);
                    n.readBits(1);
                }
            }
            var K = 0, W = 1, X = 1, Y = !1, J = 1, Z = 1;
            if (n.readBool(), n.readBool(), n.readBool()) {
                if (n.readBool()) {
                    var Q = n.readByte();
                    Q > 0 && Q <= 16 ? (W = [ 1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2 ][Q - 1], 
                    X = [ 1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1 ][Q - 1]) : 255 === Q && (W = n.readBits(16), 
                    X = n.readBits(16));
                }
                if (n.readBool() && n.readBool(), n.readBool() && (n.readBits(3), n.readBool(), 
                n.readBool() && (n.readByte(), n.readByte(), n.readByte())), n.readBool() && (n.readUEG(), 
                n.readUEG()), n.readBool(), n.readBool(), n.readBool(), n.readBool() && (n.readUEG(), 
                n.readUEG(), n.readUEG(), n.readUEG()), n.readBool() && (J = n.readBits(32), Z = n.readBits(32), 
                n.readBool() && (n.readUEG(), n.readBool()))) {
                    var $ = !1, ee = !1, te = !1;
                    for ($ = n.readBool(), ee = n.readBool(), ($ || ee) && ((te = n.readBool()) && (n.readByte(), 
                    n.readBits(5), n.readBool(), n.readBits(5)), n.readBits(4), n.readBits(4), te && n.readBits(4), 
                    n.readBits(5), n.readBits(5), n.readBits(5)), L = 0; L <= d; L++) {
                        var ie = n.readBool();
                        Y = ie;
                        var ne = !1, ae = 1;
                        ie || (ne = n.readBool());
                        var re = !1;
                        if (ne ? n.readSEG() : re = n.readBool(), re || (ae = n.readUEG() + 1), $) for (V = 0; V < ae; V++) n.readUEG(), 
                        n.readUEG(), te && (n.readUEG(), n.readUEG());
                        if (ee) for (V = 0; V < ae; V++) n.readUEG(), n.readUEG(), te && (n.readUEG(), n.readUEG());
                    }
                }
                n.readBool() && (n.readBool(), n.readBool(), n.readBool(), K = n.readUEG(), n.readUEG(), 
                n.readUEG(), n.readUEG(), n.readUEG());
            }
            n.readBool();
            var se = "hvc1." + c + ".1.L" + A + ".B0", oe = k - (a + r) * (1 === w || 2 === w ? 2 : 1), de = D - (s + o) * (1 === w ? 2 : 1), _e = 1;
            return 1 !== W && 1 !== X && (_e = W / X), n.destroy(), n = null, {
                codec_mimetype: se,
                level_string: e.getLevelString(A),
                profile_idc: c,
                bit_depth: C + 8,
                ref_frames: 1,
                chroma_format: w,
                chroma_format_string: e.getChromaFormatString(w),
                general_level_idc: A,
                general_profile_space: _,
                general_tier_flag: h,
                general_profile_idc: c,
                general_profile_compatibility_flags_1: u,
                general_profile_compatibility_flags_2: l,
                general_profile_compatibility_flags_3: p,
                general_profile_compatibility_flags_4: m,
                general_constraint_indicator_flags_1: g,
                general_constraint_indicator_flags_2: v,
                general_constraint_indicator_flags_3: y,
                general_constraint_indicator_flags_4: b,
                general_constraint_indicator_flags_5: S,
                general_constraint_indicator_flags_6: E,
                min_spatial_segmentation_idc: K,
                constant_frame_rate: 0,
                chroma_format_idc: w,
                bit_depth_luma_minus8: C,
                bit_depth_chroma_minus8: B,
                frame_rate: {
                    fixed: Y,
                    fps: Z / J,
                    fps_den: J,
                    fps_num: Z
                },
                sar_ratio: {
                    width: W,
                    height: X
                },
                codec_size: {
                    width: oe,
                    height: de
                },
                present_size: {
                    width: oe * _e,
                    height: de
                }
            };
        }, e.parsePPS = function(t) {
            var i = e._ebsp2rbsp(t), n = new f(i);
            n.readByte(), n.readByte(), n.readUEG(), n.readUEG(), n.readBool(), n.readBool(), 
            n.readBits(3), n.readBool(), n.readBool(), n.readUEG(), n.readUEG(), n.readSEG(), 
            n.readBool(), n.readBool(), n.readBool() && n.readUEG(), n.readSEG(), n.readSEG(), 
            n.readBool(), n.readBool(), n.readBool(), n.readBool();
            var a = n.readBool(), r = n.readBool(), s = 1;
            return r && a ? s = 0 : r ? s = 3 : a && (s = 2), {
                parallelismType: s
            };
        }, e.getChromaFormatString = function(e) {
            switch (e) {
              case 0:
                return "4:0:0";

              case 1:
                return "4:2:0";

              case 2:
                return "4:2:2";

              case 3:
                return "4:4:4";

              default:
                return "Unknown";
            }
        }, e.getProfileString = function(e) {
            switch (e) {
              case 1:
                return "Main";

              case 2:
                return "Main10";

              case 3:
                return "MainSP";

              case 4:
                return "Rext";

              case 9:
                return "SCC";

              default:
                return "Unknown";
            }
        }, e.getLevelString = function(e) {
            return (e / 30).toFixed(1);
        }, e;
    }();
    function v(e) {
        return e.byteOffset % 2 == 0 && e.byteLength % 2 == 0;
    }
    function y(e) {
        return e.byteOffset % 4 == 0 && e.byteLength % 4 == 0;
    }
    function b(e, t) {
        for (var i = 0; i < e.length; i++) if (e[i] !== t[i]) return !1;
        return !0;
    }
    var E, S = function(e, t) {
        return e.byteLength === t.byteLength && (y(e) && y(t) ? function(e, t) {
            return b(new Uint32Array(e.buffer, e.byteOffset, e.byteLength / 4), new Uint32Array(t.buffer, t.byteOffset, t.byteLength / 4));
        }(e, t) : v(e) && v(t) ? function(e, t) {
            return b(new Uint16Array(e.buffer, e.byteOffset, e.byteLength / 2), new Uint16Array(t.buffer, t.byteOffset, t.byteLength / 2));
        }(e, t) : function(e, t) {
            return b(e, t);
        }(e, t));
    }, A = function() {
        function e(e, t) {
            this.TAG = "FLVDemuxer", this._config = t, this._onError = null, this._onMediaInfo = null, 
            this._onMetaDataArrived = null, this._onScriptDataArrived = null, this._onTrackMetadata = null, 
            this._onDataAvailable = null, this._dataOffset = e.dataOffset, this._firstParse = !0, 
            this._dispatch = !1, this._hasAudio = e.hasAudioTrack, this._hasVideo = e.hasVideoTrack, 
            this._hasAudioFlagOverrided = !1, this._hasVideoFlagOverrided = !1, this._audioInitialMetadataDispatched = !1, 
            this._videoInitialMetadataDispatched = !1, this._mediaInfo = new o.a, this._mediaInfo.hasAudio = this._hasAudio, 
            this._mediaInfo.hasVideo = this._hasVideo, this._metadata = null, this._audioMetadata = null, 
            this._videoMetadata = null, this._naluLengthSize = 4, this._timestampBase = 0, this._timescale = 1e3, 
            this._duration = 0, this._durationOverrided = !1, this._referenceFrameRate = {
                fixed: !0,
                fps: 23.976,
                fps_num: 23976,
                fps_den: 1e3
            }, this._flvSoundRateTable = [ 5500, 11025, 22050, 44100, 48e3 ], this._mpegSamplingRates = [ 96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350 ], 
            this._mpegAudioV10SampleRateTable = [ 44100, 48e3, 32e3, 0 ], this._mpegAudioV20SampleRateTable = [ 22050, 24e3, 16e3, 0 ], 
            this._mpegAudioV25SampleRateTable = [ 11025, 12e3, 8e3, 0 ], this._mpegAudioL1BitRateTable = [ 0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1 ], 
            this._mpegAudioL2BitRateTable = [ 0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1 ], 
            this._mpegAudioL3BitRateTable = [ 0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1 ], 
            this._videoTrack = {
                type: "video",
                id: 1,
                sequenceNumber: 0,
                samples: [],
                length: 0
            }, this._audioTrack = {
                type: "audio",
                id: 2,
                sequenceNumber: 0,
                samples: [],
                length: 0
            }, this._littleEndian = function() {
                var e = new ArrayBuffer(2);
                return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];
            }();
        }
        return e.prototype.destroy = function() {
            this._mediaInfo = null, this._metadata = null, this._audioMetadata = null, this._videoMetadata = null, 
            this._videoTrack = null, this._audioTrack = null, this._onError = null, this._onMediaInfo = null, 
            this._onMetaDataArrived = null, this._onScriptDataArrived = null, this._onTrackMetadata = null, 
            this._onDataAvailable = null;
        }, e.probe = function(e) {
            var t = new Uint8Array(e);
            if (t.byteLength < 9) return {
                needMoreData: !0
            };
            var i = {
                match: !1
            };
            if (70 !== t[0] || 76 !== t[1] || 86 !== t[2] || 1 !== t[3]) return i;
            var n, a, r = (4 & t[4]) >>> 2 != 0, s = 0 != (1 & t[4]), o = (n = t)[a = 5] << 24 | n[a + 1] << 16 | n[a + 2] << 8 | n[a + 3];
            return o < 9 ? i : {
                match: !0,
                consumed: o,
                dataOffset: o,
                hasAudioTrack: r,
                hasVideoTrack: s
            };
        }, e.prototype.bindDataSource = function(e) {
            return e.onDataArrival = this.parseChunks.bind(this), this;
        }, Object.defineProperty(e.prototype, "onTrackMetadata", {
            get: function() {
                return this._onTrackMetadata;
            },
            set: function(e) {
                this._onTrackMetadata = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onMediaInfo", {
            get: function() {
                return this._onMediaInfo;
            },
            set: function(e) {
                this._onMediaInfo = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onMetaDataArrived", {
            get: function() {
                return this._onMetaDataArrived;
            },
            set: function(e) {
                this._onMetaDataArrived = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onScriptDataArrived", {
            get: function() {
                return this._onScriptDataArrived;
            },
            set: function(e) {
                this._onScriptDataArrived = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onError", {
            get: function() {
                return this._onError;
            },
            set: function(e) {
                this._onError = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onDataAvailable", {
            get: function() {
                return this._onDataAvailable;
            },
            set: function(e) {
                this._onDataAvailable = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "timestampBase", {
            get: function() {
                return this._timestampBase;
            },
            set: function(e) {
                this._timestampBase = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "overridedDuration", {
            get: function() {
                return this._duration;
            },
            set: function(e) {
                this._durationOverrided = !0, this._duration = e, this._mediaInfo.duration = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "overridedHasAudio", {
            set: function(e) {
                this._hasAudioFlagOverrided = !0, this._hasAudio = e, this._mediaInfo.hasAudio = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "overridedHasVideo", {
            set: function(e) {
                this._hasVideoFlagOverrided = !0, this._hasVideo = e, this._mediaInfo.hasVideo = e;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.resetMediaInfo = function() {
            this._mediaInfo = new o.a;
        }, e.prototype._isInitialMetadataDispatched = function() {
            return this._hasAudio && this._hasVideo ? this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched : this._hasAudio && !this._hasVideo ? this._audioInitialMetadataDispatched : !(this._hasAudio || !this._hasVideo) && this._videoInitialMetadataDispatched;
        }, e.prototype.parseChunks = function(t, i) {
            if (!(this._onError && this._onMediaInfo && this._onTrackMetadata && this._onDataAvailable)) throw new c.a("Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified");
            var n = 0, a = this._littleEndian;
            if (0 === i) {
                if (!(t.byteLength > 13)) return 0;
                n = e.probe(t).dataOffset;
            }
            for (this._firstParse && (this._firstParse = !1, i + n !== this._dataOffset && r.a.w(this.TAG, "First time parsing but chunk byteStart invalid!"), 
            0 !== (s = new DataView(t, n)).getUint32(0, !a) && r.a.w(this.TAG, "PrevTagSize0 !== 0 !!!"), 
            n += 4); n < t.byteLength; ) {
                this._dispatch = !0;
                var s = new DataView(t, n);
                if (n + 11 + 4 > t.byteLength) break;
                var o = s.getUint8(0), d = 16777215 & s.getUint32(0, !a);
                if (n + 11 + d + 4 > t.byteLength) break;
                if (8 === o || 9 === o || 18 === o) {
                    var _ = s.getUint8(4), h = s.getUint8(5), u = s.getUint8(6) | h << 8 | _ << 16 | s.getUint8(7) << 24;
                    0 != (16777215 & s.getUint32(7, !a)) && r.a.w(this.TAG, "Meet tag which has StreamID != 0!");
                    var l = n + 11;
                    switch (o) {
                      case 8:
                        this._parseAudioData(t, l, d, u);
                        break;

                      case 9:
                        this._parseVideoData(t, l, d, u, i + n);
                        break;

                      case 18:
                        this._parseScriptData(t, l, d);
                    }
                    var f = s.getUint32(11 + d, !a);
                    f !== 11 + d && r.a.w(this.TAG, "Invalid PrevTagSize " + f), n += 11 + d + 4;
                } else r.a.w(this.TAG, "Unsupported tag type " + o + ", skipped"), n += 11 + d + 4;
            }
            return this._isInitialMetadataDispatched() && this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack), 
            n;
        }, e.prototype._parseScriptData = function(e, t, i) {
            var n = l.parseScriptData(e, t, i);
            if (n.hasOwnProperty("onMetaData")) {
                if (null == n.onMetaData || "object" != typeof n.onMetaData) return void r.a.w(this.TAG, "Invalid onMetaData structure!");
                this._metadata && r.a.w(this.TAG, "Found another onMetaData tag!"), this._metadata = n;
                var a = this._metadata.onMetaData;
                if (this._onMetaDataArrived && this._onMetaDataArrived(Object.assign({}, a)), "boolean" == typeof a.hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = a.hasAudio, 
                this._mediaInfo.hasAudio = this._hasAudio), "boolean" == typeof a.hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = a.hasVideo, 
                this._mediaInfo.hasVideo = this._hasVideo), "number" == typeof a.audiodatarate && (this._mediaInfo.audioDataRate = a.audiodatarate), 
                "number" == typeof a.videodatarate && (this._mediaInfo.videoDataRate = a.videodatarate), 
                "number" == typeof a.width && (this._mediaInfo.width = a.width), "number" == typeof a.height && (this._mediaInfo.height = a.height), 
                "number" == typeof a.duration) {
                    if (!this._durationOverrided) {
                        var s = Math.floor(a.duration * this._timescale);
                        this._duration = s, this._mediaInfo.duration = s;
                    }
                } else this._mediaInfo.duration = 0;
                if ("number" == typeof a.framerate) {
                    var o = Math.floor(1e3 * a.framerate);
                    if (o > 0) {
                        var d = o / 1e3;
                        this._referenceFrameRate.fixed = !0, this._referenceFrameRate.fps = d, this._referenceFrameRate.fps_num = o, 
                        this._referenceFrameRate.fps_den = 1e3, this._mediaInfo.fps = d;
                    }
                }
                if ("object" == typeof a.keyframes) {
                    this._mediaInfo.hasKeyframesIndex = !0;
                    var _ = a.keyframes;
                    this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(_), a.keyframes = null;
                } else this._mediaInfo.hasKeyframesIndex = !1;
                this._dispatch = !1, this._mediaInfo.metadata = a, r.a.v(this.TAG, "Parsed onMetaData"), 
                this._mediaInfo.isComplete() && this._onMediaInfo(this._mediaInfo);
            }
            Object.keys(n).length > 0 && this._onScriptDataArrived && this._onScriptDataArrived(Object.assign({}, n));
        }, e.prototype._parseKeyframesIndex = function(e) {
            for (var t = [], i = [], n = 1; n < e.times.length; n++) {
                var a = this._timestampBase + Math.floor(1e3 * e.times[n]);
                t.push(a), i.push(e.filepositions[n]);
            }
            return {
                times: t,
                filepositions: i
            };
        }, e.prototype._parseAudioData = function(e, t, i, n) {
            if (i <= 1) r.a.w(this.TAG, "Flv: Invalid audio packet, missing SoundData payload!"); else if (!0 !== this._hasAudioFlagOverrided || !1 !== this._hasAudio) {
                this._littleEndian;
                var a = new DataView(e, t, i).getUint8(0), s = a >>> 4;
                if (2 === s || 10 === s) {
                    var o = 0, d = (12 & a) >>> 2;
                    if (d >= 0 && d <= 4) {
                        o = this._flvSoundRateTable[d];
                        var _ = 1 & a, h = this._audioMetadata, c = this._audioTrack;
                        if (h || (!1 === this._hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = !0, 
                        this._mediaInfo.hasAudio = !0), (h = this._audioMetadata = {}).type = "audio", h.id = c.id, 
                        h.timescale = this._timescale, h.duration = this._duration, h.audioSampleRate = o, 
                        h.channelCount = 0 === _ ? 1 : 2), 10 === s) {
                            var u = this._parseAACAudioData(e, t + 1, i - 1);
                            if (null == u) return;
                            if (0 === u.packetType) {
                                if (h.config) {
                                    if (S(u.data.config, h.config)) return;
                                    r.a.w(this.TAG, "AudioSpecificConfig has been changed, re-generate initialization segment");
                                }
                                var l = u.data;
                                h.audioSampleRate = l.samplingRate, h.channelCount = l.channelCount, h.codec = l.codec, 
                                h.originalCodec = l.originalCodec, h.config = l.config, h.refSampleDuration = 1024 / h.audioSampleRate * h.timescale, 
                                r.a.v(this.TAG, "Parsed AudioSpecificConfig"), this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._audioInitialMetadataDispatched = !0, 
                                this._dispatch = !1, this._onTrackMetadata("audio", h), (g = this._mediaInfo).audioCodec = h.originalCodec, 
                                g.audioSampleRate = h.audioSampleRate, g.audioChannelCount = h.channelCount, g.hasVideo ? null != g.videoCodec && (g.mimeType = 'video/x-flv; codecs="' + g.videoCodec + "," + g.audioCodec + '"') : g.mimeType = 'video/x-flv; codecs="' + g.audioCodec + '"', 
                                g.isComplete() && this._onMediaInfo(g);
                            } else if (1 === u.packetType) {
                                var f = this._timestampBase + n, p = {
                                    unit: u.data,
                                    length: u.data.byteLength,
                                    dts: f,
                                    pts: f
                                };
                                c.samples.push(p), c.length += u.data.length;
                            } else r.a.e(this.TAG, "Flv: Unsupported AAC data type " + u.packetType);
                        } else if (2 === s) {
                            if (!h.codec) {
                                var g;
                                if (null == (l = this._parseMP3AudioData(e, t + 1, i - 1, !0))) return;
                                h.audioSampleRate = l.samplingRate, h.channelCount = l.channelCount, h.codec = l.codec, 
                                h.originalCodec = l.originalCodec, h.refSampleDuration = 1152 / h.audioSampleRate * h.timescale, 
                                r.a.v(this.TAG, "Parsed MPEG Audio Frame Header"), this._audioInitialMetadataDispatched = !0, 
                                this._onTrackMetadata("audio", h), (g = this._mediaInfo).audioCodec = h.codec, g.audioSampleRate = h.audioSampleRate, 
                                g.audioChannelCount = h.channelCount, g.audioDataRate = l.bitRate, g.hasVideo ? null != g.videoCodec && (g.mimeType = 'video/x-flv; codecs="' + g.videoCodec + "," + g.audioCodec + '"') : g.mimeType = 'video/x-flv; codecs="' + g.audioCodec + '"', 
                                g.isComplete() && this._onMediaInfo(g);
                            }
                            var v = this._parseMP3AudioData(e, t + 1, i - 1, !1);
                            if (null == v) return;
                            f = this._timestampBase + n;
                            var y = {
                                unit: v,
                                length: v.byteLength,
                                dts: f,
                                pts: f
                            };
                            c.samples.push(y), c.length += v.length;
                        }
                    } else this._onError(m.a.FORMAT_ERROR, "Flv: Invalid audio sample rate idx: " + d);
                } else this._onError(m.a.CODEC_UNSUPPORTED, "Flv: Unsupported audio codec idx: " + s);
            }
        }, e.prototype._parseAACAudioData = function(e, t, i) {
            if (!(i <= 1)) {
                var n = {}, a = new Uint8Array(e, t, i);
                return n.packetType = a[0], 0 === a[0] ? n.data = this._parseAACAudioSpecificConfig(e, t + 1, i - 1) : n.data = a.subarray(1), 
                n;
            }
            r.a.w(this.TAG, "Flv: Invalid AAC packet, missing AACPacketType or/and Data!");
        }, e.prototype._parseAACAudioSpecificConfig = function(e, t, i) {
            var n, a, r = new Uint8Array(e, t, i), s = null, o = 0, d = null;
            if (o = n = r[0] >>> 3, (a = (7 & r[0]) << 1 | r[1] >>> 7) < 0 || a >= this._mpegSamplingRates.length) this._onError(m.a.FORMAT_ERROR, "Flv: AAC invalid sampling frequency index!"); else {
                var _ = this._mpegSamplingRates[a], h = (120 & r[1]) >>> 3;
                if (!(h < 0 || h >= 8)) {
                    5 === o && (d = (7 & r[1]) << 1 | r[2] >>> 7, r[2]);
                    var c = self.navigator.userAgent.toLowerCase();
                    return -1 !== c.indexOf("firefox") ? a >= 6 ? (o = 5, s = new Array(4), d = a - 3) : (o = 2, 
                    s = new Array(2), d = a) : -1 !== c.indexOf("android") ? (o = 2, s = new Array(2), 
                    d = a) : (o = 5, d = a, s = new Array(4), a >= 6 ? d = a - 3 : 1 === h && (o = 2, 
                    s = new Array(2), d = a)), s[0] = o << 3, s[0] |= (15 & a) >>> 1, s[1] = (15 & a) << 7, 
                    s[1] |= (15 & h) << 3, 5 === o && (s[1] |= (15 & d) >>> 1, s[2] = (1 & d) << 7, 
                    s[2] |= 8, s[3] = 0), {
                        config: s,
                        samplingRate: _,
                        channelCount: h,
                        codec: "mp4a.40." + o,
                        originalCodec: "mp4a.40." + n
                    };
                }
                this._onError(m.a.FORMAT_ERROR, "Flv: AAC invalid channel configuration");
            }
        }, e.prototype._parseMP3AudioData = function(e, t, i, n) {
            if (!(i < 4)) {
                this._littleEndian;
                var a = new Uint8Array(e, t, i), s = null;
                if (n) {
                    if (255 !== a[0]) return;
                    var o = a[1] >>> 3 & 3, d = (6 & a[1]) >> 1, _ = (240 & a[2]) >>> 4, h = (12 & a[2]) >>> 2, c = 3 != (a[3] >>> 6 & 3) ? 2 : 1, u = 0, l = 0;
                    switch (o) {
                      case 0:
                        u = this._mpegAudioV25SampleRateTable[h];
                        break;

                      case 2:
                        u = this._mpegAudioV20SampleRateTable[h];
                        break;

                      case 3:
                        u = this._mpegAudioV10SampleRateTable[h];
                    }
                    switch (d) {
                      case 1:
                        _ < this._mpegAudioL3BitRateTable.length && (l = this._mpegAudioL3BitRateTable[_]);
                        break;

                      case 2:
                        _ < this._mpegAudioL2BitRateTable.length && (l = this._mpegAudioL2BitRateTable[_]);
                        break;

                      case 3:
                        _ < this._mpegAudioL1BitRateTable.length && (l = this._mpegAudioL1BitRateTable[_]);
                    }
                    s = {
                        bitRate: l,
                        samplingRate: u,
                        channelCount: c,
                        codec: "mp3",
                        originalCodec: "mp3"
                    };
                } else s = a;
                return s;
            }
            r.a.w(this.TAG, "Flv: Invalid MP3 packet, header missing!");
        }, e.prototype._parseVideoData = function(e, t, i, n, a) {
            if (i <= 1) r.a.w(this.TAG, "Flv: Invalid video packet, missing VideoData payload!"); else if (!0 !== this._hasVideoFlagOverrided || !1 !== this._hasVideo) {
                var s = new Uint8Array(e, t, i)[0], o = (112 & s) >>> 4;
                if (0 != (128 & s)) {
                    var d = 15 & s, _ = String.fromCharCode.apply(String, new Uint8Array(e, t, i).slice(1, 5));
                    if ("hvc1" !== _) return void this._onError(m.a.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + _);
                    this._parseEnhancedHEVCVideoPacket(e, t + 5, i - 5, n, a, o, d);
                } else {
                    var h = 15 & s;
                    if (7 === h) this._parseAVCVideoPacket(e, t + 1, i - 1, n, a, o); else {
                        if (12 !== h) return void this._onError(m.a.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + h);
                        this._parseHEVCVideoPacket(e, t + 1, i - 1, n, a, o);
                    }
                }
            }
        }, e.prototype._parseAVCVideoPacket = function(e, t, i, n, a, s) {
            if (i < 4) r.a.w(this.TAG, "Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime"); else {
                var o = this._littleEndian, d = new DataView(e, t, i), _ = d.getUint8(0), h = (16777215 & d.getUint32(0, !o)) << 8 >> 8;
                if (0 === _) this._parseAVCDecoderConfigurationRecord(e, t + 4, i - 4); else if (1 === _) this._parseAVCVideoData(e, t + 4, i - 4, n, a, s, h); else if (2 !== _) return void this._onError(m.a.FORMAT_ERROR, "Flv: Invalid video packet type " + _);
            }
        }, e.prototype._parseHEVCVideoPacket = function(e, t, i, n, a, s) {
            if (i < 4) r.a.w(this.TAG, "Flv: Invalid HEVC packet, missing HEVCPacketType or/and CompositionTime"); else {
                var o = this._littleEndian, d = new DataView(e, t, i), _ = d.getUint8(0), h = (16777215 & d.getUint32(0, !o)) << 8 >> 8;
                if (0 === _) this._parseHEVCDecoderConfigurationRecord(e, t + 4, i - 4); else if (1 === _) this._parseHEVCVideoData(e, t + 4, i - 4, n, a, s, h); else if (2 !== _) return void this._onError(m.a.FORMAT_ERROR, "Flv: Invalid video packet type " + _);
            }
        }, e.prototype._parseEnhancedHEVCVideoPacket = function(e, t, i, n, a, s, o) {
            if (i < 4) r.a.w(this.TAG, "Flv: Invalid HEVC packet, missing HEVCPacketType or/and CompositionTime"); else {
                var d = this._littleEndian, _ = new DataView(e, t, i);
                if (0 === o) this._parseHEVCDecoderConfigurationRecord(e, t, i); else if (1 === o) {
                    var h = (4294967040 & _.getUint32(0, !d)) >> 8;
                    this._parseHEVCVideoData(e, t + 3, i - 3, n, a, s, h);
                } else if (3 === o) this._parseHEVCVideoData(e, t, i, n, a, s, 0); else if (2 !== o) return void this._onError(m.a.FORMAT_ERROR, "Flv: Invalid video packet type " + o);
            }
        }, e.prototype._parseAVCDecoderConfigurationRecord = function(e, t, i) {
            if (i < 7) r.a.w(this.TAG, "Flv: Invalid AVCDecoderConfigurationRecord, lack of data!"); else {
                var n = this._videoMetadata, a = this._videoTrack, s = this._littleEndian, o = new DataView(e, t, i);
                if (n) {
                    if (void 0 !== n.avcc) {
                        var d = new Uint8Array(e, t, i);
                        if (S(d, n.avcc)) return;
                        r.a.w(this.TAG, "AVCDecoderConfigurationRecord has been changed, re-generate initialization segment");
                    }
                } else !1 === this._hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = !0, 
                this._mediaInfo.hasVideo = !0), (n = this._videoMetadata = {}).type = "video", n.id = a.id, 
                n.timescale = this._timescale, n.duration = this._duration;
                var _ = o.getUint8(0), h = o.getUint8(1);
                if (o.getUint8(2), o.getUint8(3), 1 === _ && 0 !== h) if (this._naluLengthSize = 1 + (3 & o.getUint8(4)), 
                3 === this._naluLengthSize || 4 === this._naluLengthSize) {
                    var c = 31 & o.getUint8(5);
                    if (0 !== c) {
                        c > 1 && r.a.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: SPS Count = " + c);
                        for (var u = 6, l = 0; l < c; l++) {
                            var f = o.getUint16(u, !s);
                            if (u += 2, 0 !== f) {
                                var g = new Uint8Array(e, t + u, f);
                                u += f;
                                var v = p.parseSPS(g);
                                if (0 === l) {
                                    n.codecWidth = v.codec_size.width, n.codecHeight = v.codec_size.height, n.presentWidth = v.present_size.width, 
                                    n.presentHeight = v.present_size.height, n.profile = v.profile_string, n.level = v.level_string, 
                                    n.bitDepth = v.bit_depth, n.chromaFormat = v.chroma_format, n.sarRatio = v.sar_ratio, 
                                    n.frameRate = v.frame_rate, !1 !== v.frame_rate.fixed && 0 !== v.frame_rate.fps_num && 0 !== v.frame_rate.fps_den || (n.frameRate = this._referenceFrameRate);
                                    var y = n.frameRate.fps_den, b = n.frameRate.fps_num;
                                    n.refSampleDuration = n.timescale * (y / b);
                                    for (var E = g.subarray(1, 4), A = "avc1.", R = 0; R < 3; R++) {
                                        var T = E[R].toString(16);
                                        T.length < 2 && (T = "0" + T), A += T;
                                    }
                                    n.codec = A;
                                    var L = this._mediaInfo;
                                    L.width = n.codecWidth, L.height = n.codecHeight, L.fps = n.frameRate.fps, L.profile = n.profile, 
                                    L.level = n.level, L.refFrames = v.ref_frames, L.chromaFormat = v.chroma_format_string, 
                                    L.sarNum = n.sarRatio.width, L.sarDen = n.sarRatio.height, L.videoCodec = A, L.hasAudio ? null != L.audioCodec && (L.mimeType = 'video/x-flv; codecs="' + L.videoCodec + "," + L.audioCodec + '"') : L.mimeType = 'video/x-flv; codecs="' + L.videoCodec + '"', 
                                    L.isComplete() && this._onMediaInfo(L);
                                }
                            }
                        }
                        var w = o.getUint8(u);
                        if (0 !== w) {
                            for (w > 1 && r.a.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: PPS Count = " + w), 
                            u++, l = 0; l < w; l++) f = o.getUint16(u, !s), u += 2, 0 !== f && (u += f);
                            n.avcc = new Uint8Array(i), n.avcc.set(new Uint8Array(e, t, i), 0), r.a.v(this.TAG, "Parsed AVCDecoderConfigurationRecord"), 
                            this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._videoInitialMetadataDispatched = !0, 
                            this._dispatch = !1, this._onTrackMetadata("video", n);
                        } else this._onError(m.a.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No PPS");
                    } else this._onError(m.a.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No SPS");
                } else this._onError(m.a.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1)); else this._onError(m.a.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord");
            }
        }, e.prototype._parseHEVCDecoderConfigurationRecord = function(e, t, i) {
            if (i < 22) r.a.w(this.TAG, "Flv: Invalid HEVCDecoderConfigurationRecord, lack of data!"); else {
                var n = this._videoMetadata, a = this._videoTrack, s = this._littleEndian, o = new DataView(e, t, i);
                if (n) {
                    if (void 0 !== n.hvcc) {
                        var d = new Uint8Array(e, t, i);
                        if (S(d, n.hvcc)) return;
                        r.a.w(this.TAG, "HEVCDecoderConfigurationRecord has been changed, re-generate initialization segment");
                    }
                } else !1 === this._hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = !0, 
                this._mediaInfo.hasVideo = !0), (n = this._videoMetadata = {}).type = "video", n.id = a.id, 
                n.timescale = this._timescale, n.duration = this._duration;
                var _ = o.getUint8(0), h = 31 & o.getUint8(1);
                if (1 === _ && 0 !== h) if (this._naluLengthSize = 1 + (3 & o.getUint8(21)), 3 === this._naluLengthSize || 4 === this._naluLengthSize) {
                    for (var c = o.getUint8(22), u = 0, l = 23; u < c; u++) {
                        var f = 63 & o.getUint8(l + 0), p = o.getUint16(l + 1, !s);
                        l += 3;
                        for (var v = 0; v < p; v++) {
                            var y = o.getUint16(l + 0, !s);
                            if (0 === v) if (33 === f) {
                                l += 2;
                                var b = new Uint8Array(e, t + l, y), E = g.parseSPS(b);
                                n.codecWidth = E.codec_size.width, n.codecHeight = E.codec_size.height, n.presentWidth = E.present_size.width, 
                                n.presentHeight = E.present_size.height, n.profile = E.profile_string, n.level = E.level_string, 
                                n.bitDepth = E.bit_depth, n.chromaFormat = E.chroma_format, n.sarRatio = E.sar_ratio, 
                                n.frameRate = E.frame_rate, !1 !== E.frame_rate.fixed && 0 !== E.frame_rate.fps_num && 0 !== E.frame_rate.fps_den || (n.frameRate = this._referenceFrameRate);
                                var A = n.frameRate.fps_den, R = n.frameRate.fps_num;
                                n.refSampleDuration = n.timescale * (A / R), n.codec = E.codec_mimetype;
                                var T = this._mediaInfo;
                                T.width = n.codecWidth, T.height = n.codecHeight, T.fps = n.frameRate.fps, T.profile = n.profile, 
                                T.level = n.level, T.refFrames = E.ref_frames, T.chromaFormat = E.chroma_format_string, 
                                T.sarNum = n.sarRatio.width, T.sarDen = n.sarRatio.height, T.videoCodec = E.codec_mimetype, 
                                T.hasAudio ? null != T.audioCodec && (T.mimeType = 'video/x-flv; codecs="' + T.videoCodec + "," + T.audioCodec + '"') : T.mimeType = 'video/x-flv; codecs="' + T.videoCodec + '"', 
                                T.isComplete() && this._onMediaInfo(T), l += y;
                            } else l += 2 + y; else l += 2 + y;
                        }
                    }
                    n.hvcc = new Uint8Array(i), n.hvcc.set(new Uint8Array(e, t, i), 0), r.a.v(this.TAG, "Parsed HEVCDecoderConfigurationRecord"), 
                    this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._videoInitialMetadataDispatched = !0, 
                    this._dispatch = !1, this._onTrackMetadata("video", n);
                } else this._onError(m.a.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1)); else this._onError(m.a.FORMAT_ERROR, "Flv: Invalid HEVCDecoderConfigurationRecord");
            }
        }, e.prototype._parseAVCVideoData = function(e, t, i, n, a, s, o) {
            for (var d = this._littleEndian, _ = new DataView(e, t, i), h = [], c = 0, u = 0, l = this._naluLengthSize, f = this._timestampBase + n, p = 1 === s; u < i; ) {
                if (u + 4 >= i) {
                    r.a.w(this.TAG, "Malformed Nalu near timestamp " + f + ", offset = " + u + ", dataSize = " + i);
                    break;
                }
                var m = _.getUint32(u, !d);
                if (3 === l && (m >>>= 8), m > i - l) return void r.a.w(this.TAG, "Malformed Nalus near timestamp " + f + ", NaluSize > DataSize!");
                var g = 31 & _.getUint8(u + l);
                5 === g && (p = !0);
                var v = new Uint8Array(e, t + u, l + m), y = {
                    type: g,
                    data: v
                };
                h.push(y), c += v.byteLength, u += l + m;
            }
            if (h.length) {
                var b = this._videoTrack, S = {
                    units: h,
                    length: c,
                    isKeyframe: p,
                    dts: f,
                    cts: o,
                    pts: f + o
                };
                p && (S.fileposition = a), b.samples.push(S), b.length += c;
            }
        }, e.prototype._parseHEVCVideoData = function(e, t, i, n, a, s, o) {
            for (var d = this._littleEndian, _ = new DataView(e, t, i), h = [], c = 0, u = 0, l = this._naluLengthSize, f = this._timestampBase + n, p = 1 === s; u < i; ) {
                if (u + 4 >= i) {
                    r.a.w(this.TAG, "Malformed Nalu near timestamp " + f + ", offset = " + u + ", dataSize = " + i);
                    break;
                }
                var m = _.getUint32(u, !d);
                if (3 === l && (m >>>= 8), m > i - l) return void r.a.w(this.TAG, "Malformed Nalus near timestamp " + f + ", NaluSize > DataSize!");
                var g = 31 & _.getUint8(u + l);
                19 !== g && 20 !== g || (p = !0);
                var v = new Uint8Array(e, t + u, l + m), y = {
                    type: g,
                    data: v
                };
                h.push(y), c += v.byteLength, u += l + m;
            }
            if (h.length) {
                var b = this._videoTrack, S = {
                    units: h,
                    length: c,
                    isKeyframe: p,
                    dts: f,
                    cts: o,
                    pts: f + o
                };
                p && (S.fileposition = a), b.samples.push(S), b.length += c;
            }
        }, e;
    }(), R = function() {
        function e() {}
        return e.prototype.destroy = function() {
            this.onError = null, this.onMediaInfo = null, this.onMetaDataArrived = null, this.onTrackMetadata = null, 
            this.onDataAvailable = null, this.onTimedID3Metadata = null, this.onSMPTE2038Metadata = null, 
            this.onSCTE35Metadata = null, this.onPESPrivateData = null, this.onPESPrivateDataDescriptor = null;
        }, e;
    }(), T = function() {
        this.program_pmt_pid = {};
    };
    !function(e) {
        e[e.kMPEG1Audio = 3] = "kMPEG1Audio", e[e.kMPEG2Audio = 4] = "kMPEG2Audio", e[e.kPESPrivateData = 6] = "kPESPrivateData", 
        e[e.kADTSAAC = 15] = "kADTSAAC", e[e.kLOASAAC = 17] = "kLOASAAC", e[e.kAC3 = 129] = "kAC3", 
        e[e.kID3 = 21] = "kID3", e[e.kSCTE35 = 134] = "kSCTE35", e[e.kH264 = 27] = "kH264", 
        e[e.kH265 = 36] = "kH265";
    }(E || (E = {}));
    var L, w = function() {
        this.pid_stream_type = {}, this.common_pids = {
            h264: void 0,
            h265: void 0,
            adts_aac: void 0,
            loas_aac: void 0,
            opus: void 0,
            ac3: void 0,
            mp3: void 0
        }, this.pes_private_data_pids = {}, this.timed_id3_pids = {}, this.scte_35_pids = {}, 
        this.smpte2038_pids = {};
    }, k = function() {}, D = function() {}, C = function() {
        this.slices = [], this.total_length = 0, this.expected_length = 0, this.file_position = 0;
    };
    !function(e) {
        e[e.kUnspecified = 0] = "kUnspecified", e[e.kSliceNonIDR = 1] = "kSliceNonIDR", 
        e[e.kSliceDPA = 2] = "kSliceDPA", e[e.kSliceDPB = 3] = "kSliceDPB", e[e.kSliceDPC = 4] = "kSliceDPC", 
        e[e.kSliceIDR = 5] = "kSliceIDR", e[e.kSliceSEI = 6] = "kSliceSEI", e[e.kSliceSPS = 7] = "kSliceSPS", 
        e[e.kSlicePPS = 8] = "kSlicePPS", e[e.kSliceAUD = 9] = "kSliceAUD", e[e.kEndOfSequence = 10] = "kEndOfSequence", 
        e[e.kEndOfStream = 11] = "kEndOfStream", e[e.kFiller = 12] = "kFiller", e[e.kSPSExt = 13] = "kSPSExt", 
        e[e.kReserved0 = 14] = "kReserved0";
    }(L || (L = {}));
    var B, I, O = function() {}, P = function(e) {
        var t = e.data.byteLength;
        this.type = e.type, this.data = new Uint8Array(4 + t), new DataView(this.data.buffer).setUint32(0, t), 
        this.data.set(e.data, 4);
    }, M = function() {
        function e(e) {
            this.TAG = "H264AnnexBParser", this.current_startcode_offset_ = 0, this.eof_flag_ = !1, 
            this.data_ = e, this.current_startcode_offset_ = this.findNextStartCodeOffset(0), 
            this.eof_flag_ && r.a.e(this.TAG, "Could not find H264 startcode until payload end!");
        }
        return e.prototype.findNextStartCodeOffset = function(e) {
            for (var t = e, i = this.data_; ;) {
                if (t + 3 >= i.byteLength) return this.eof_flag_ = !0, i.byteLength;
                var n = i[t + 0] << 24 | i[t + 1] << 16 | i[t + 2] << 8 | i[t + 3], a = i[t + 0] << 16 | i[t + 1] << 8 | i[t + 2];
                if (1 === n || 1 === a) return t;
                t++;
            }
        }, e.prototype.readNextNaluPayload = function() {
            for (var e = this.data_, t = null; null == t && !this.eof_flag_; ) {
                var i = this.current_startcode_offset_, n = 31 & e[i += 1 == (e[i] << 24 | e[i + 1] << 16 | e[i + 2] << 8 | e[i + 3]) ? 4 : 3], a = (128 & e[i]) >>> 7, r = this.findNextStartCodeOffset(i);
                if (this.current_startcode_offset_ = r, !(n >= L.kReserved0) && 0 === a) {
                    var s = e.subarray(i, r);
                    (t = new O).type = n, t.data = s;
                }
            }
            return t;
        }, e;
    }(), x = function() {
        function e(e, t, i) {
            var n = 8 + e.byteLength + 1 + 2 + t.byteLength, a = !1;
            66 !== e[3] && 77 !== e[3] && 88 !== e[3] && (a = !0, n += 4);
            var r = this.data = new Uint8Array(n);
            r[0] = 1, r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = 255, r[5] = 225;
            var s = e.byteLength;
            r[6] = s >>> 8, r[7] = 255 & s;
            var o = 8;
            r.set(e, 8), r[o += s] = 1;
            var d = t.byteLength;
            r[o + 1] = d >>> 8, r[o + 2] = 255 & d, r.set(t, o + 3), o += 3 + d, a && (r[o] = 252 | i.chroma_format_idc, 
            r[o + 1] = 248 | i.bit_depth_luma - 8, r[o + 2] = 248 | i.bit_depth_chroma - 8, 
            r[o + 3] = 0, o += 4);
        }
        return e.prototype.getData = function() {
            return this.data;
        }, e;
    }();
    !function(e) {
        e[e.kNull = 0] = "kNull", e[e.kAACMain = 1] = "kAACMain", e[e.kAAC_LC = 2] = "kAAC_LC", 
        e[e.kAAC_SSR = 3] = "kAAC_SSR", e[e.kAAC_LTP = 4] = "kAAC_LTP", e[e.kAAC_SBR = 5] = "kAAC_SBR", 
        e[e.kAAC_Scalable = 6] = "kAAC_Scalable", e[e.kLayer1 = 32] = "kLayer1", e[e.kLayer2 = 33] = "kLayer2", 
        e[e.kLayer3 = 34] = "kLayer3";
    }(B || (B = {})), function(e) {
        e[e.k96000Hz = 0] = "k96000Hz", e[e.k88200Hz = 1] = "k88200Hz", e[e.k64000Hz = 2] = "k64000Hz", 
        e[e.k48000Hz = 3] = "k48000Hz", e[e.k44100Hz = 4] = "k44100Hz", e[e.k32000Hz = 5] = "k32000Hz", 
        e[e.k24000Hz = 6] = "k24000Hz", e[e.k22050Hz = 7] = "k22050Hz", e[e.k16000Hz = 8] = "k16000Hz", 
        e[e.k12000Hz = 9] = "k12000Hz", e[e.k11025Hz = 10] = "k11025Hz", e[e.k8000Hz = 11] = "k8000Hz", 
        e[e.k7350Hz = 12] = "k7350Hz";
    }(I || (I = {}));
    var U, N, G = [ 96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350 ], V = (U = function(e, t) {
        return (U = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(e, t) {
            e.__proto__ = t;
        } || function(e, t) {
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
        })(e, t);
    }, function(e, t) {
        function i() {
            this.constructor = e;
        }
        U(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, 
        new i);
    }), F = function() {}, j = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this;
        }
        return V(t, e), t;
    }(F), z = function() {
        function e(e) {
            this.TAG = "AACADTSParser", this.data_ = e, this.current_syncword_offset_ = this.findNextSyncwordOffset(0), 
            this.eof_flag_ && r.a.e(this.TAG, "Could not found ADTS syncword until payload end");
        }
        return e.prototype.findNextSyncwordOffset = function(e) {
            for (var t = e, i = this.data_; ;) {
                if (t + 7 >= i.byteLength) return this.eof_flag_ = !0, i.byteLength;
                if (4095 == (i[t + 0] << 8 | i[t + 1]) >>> 4) return t;
                t++;
            }
        }, e.prototype.readNextAACFrame = function() {
            for (var e = this.data_, t = null; null == t && !this.eof_flag_; ) {
                var i = this.current_syncword_offset_, n = (8 & e[i + 1]) >>> 3, a = (6 & e[i + 1]) >>> 1, r = 1 & e[i + 1], s = (192 & e[i + 2]) >>> 6, o = (60 & e[i + 2]) >>> 2, d = (1 & e[i + 2]) << 2 | (192 & e[i + 3]) >>> 6, _ = (3 & e[i + 3]) << 11 | e[i + 4] << 3 | (224 & e[i + 5]) >>> 5;
                if (e[i + 6], i + _ > this.data_.byteLength) {
                    this.eof_flag_ = !0, this.has_last_incomplete_data = !0;
                    break;
                }
                var h = 1 === r ? 7 : 9, c = _ - h;
                i += h;
                var u = this.findNextSyncwordOffset(i + c);
                if (this.current_syncword_offset_ = u, (0 === n || 1 === n) && 0 === a) {
                    var l = e.subarray(i, i + c);
                    (t = new F).audio_object_type = s + 1, t.sampling_freq_index = o, t.sampling_frequency = G[o], 
                    t.channel_config = d, t.data = l;
                }
            }
            return t;
        }, e.prototype.hasIncompleteData = function() {
            return this.has_last_incomplete_data;
        }, e.prototype.getIncompleteData = function() {
            return this.has_last_incomplete_data ? this.data_.subarray(this.current_syncword_offset_) : null;
        }, e;
    }(), H = function() {
        function e(e) {
            this.TAG = "AACLOASParser", this.data_ = e, this.current_syncword_offset_ = this.findNextSyncwordOffset(0), 
            this.eof_flag_ && r.a.e(this.TAG, "Could not found LOAS syncword until payload end");
        }
        return e.prototype.findNextSyncwordOffset = function(e) {
            for (var t = e, i = this.data_; ;) {
                if (t + 1 >= i.byteLength) return this.eof_flag_ = !0, i.byteLength;
                if (695 == (i[t + 0] << 3 | i[t + 1] >>> 5)) return t;
                t++;
            }
        }, e.prototype.getLATMValue = function(e) {
            for (var t = e.readBits(2), i = 0, n = 0; n <= t; n++) i <<= 8, i |= e.readByte();
            return i;
        }, e.prototype.readNextAACFrame = function(e) {
            for (var t = this.data_, i = null; null == i && !this.eof_flag_; ) {
                var n = this.current_syncword_offset_, a = (31 & t[n + 1]) << 8 | t[n + 2];
                if (n + 3 + a >= this.data_.byteLength) {
                    this.eof_flag_ = !0, this.has_last_incomplete_data = !0;
                    break;
                }
                var s = new f(t.subarray(n + 3, n + 3 + a)), o = null;
                if (s.readBool()) {
                    if (null == e) {
                        r.a.w(this.TAG, "StreamMuxConfig Missing"), this.current_syncword_offset_ = this.findNextSyncwordOffset(n + 3 + a), 
                        s.destroy();
                        continue;
                    }
                    o = e;
                } else {
                    var d = s.readBool();
                    if (d && s.readBool()) {
                        r.a.e(this.TAG, "audioMuxVersionA is Not Supported"), s.destroy();
                        break;
                    }
                    if (d && this.getLATMValue(s), !s.readBool()) {
                        r.a.e(this.TAG, "allStreamsSameTimeFraming zero is Not Supported"), s.destroy();
                        break;
                    }
                    if (0 !== s.readBits(6)) {
                        r.a.e(this.TAG, "more than 2 numSubFrames Not Supported"), s.destroy();
                        break;
                    }
                    if (0 !== s.readBits(4)) {
                        r.a.e(this.TAG, "more than 2 numProgram Not Supported"), s.destroy();
                        break;
                    }
                    if (0 !== s.readBits(3)) {
                        r.a.e(this.TAG, "more than 2 numLayer Not Supported"), s.destroy();
                        break;
                    }
                    var _ = d ? this.getLATMValue(s) : 0, h = s.readBits(5);
                    _ -= 5;
                    var c = s.readBits(4);
                    _ -= 4;
                    var u = s.readBits(4);
                    _ -= 4, s.readBits(3), (_ -= 3) > 0 && s.readBits(_);
                    var l = s.readBits(3);
                    if (0 !== l) {
                        r.a.e(this.TAG, "frameLengthType = " + l + ". Only frameLengthType = 0 Supported"), 
                        s.destroy();
                        break;
                    }
                    s.readByte();
                    var p = s.readBool();
                    if (p) if (d) this.getLATMValue(s); else {
                        for (var m = 0; ;) {
                            m <<= 8;
                            var g = s.readBool();
                            if (m += s.readByte(), !g) break;
                        }
                        console.log(m);
                    }
                    s.readBool() && s.readByte(), (o = new j).audio_object_type = h, o.sampling_freq_index = c, 
                    o.sampling_frequency = G[o.sampling_freq_index], o.channel_config = u, o.other_data_present = p;
                }
                for (var v = 0; ;) {
                    var y = s.readByte();
                    if (v += y, 255 !== y) break;
                }
                for (var b = new Uint8Array(v), S = 0; S < v; S++) b[S] = s.readByte();
                (i = new j).audio_object_type = o.audio_object_type, i.sampling_freq_index = o.sampling_freq_index, 
                i.sampling_frequency = G[o.sampling_freq_index], i.channel_config = o.channel_config, 
                i.other_data_present = o.other_data_present, i.data = b, this.current_syncword_offset_ = this.findNextSyncwordOffset(n + 3 + a);
            }
            return i;
        }, e.prototype.hasIncompleteData = function() {
            return this.has_last_incomplete_data;
        }, e.prototype.getIncompleteData = function() {
            return this.has_last_incomplete_data ? this.data_.subarray(this.current_syncword_offset_) : null;
        }, e;
    }(), q = function(e) {
        var t = null, i = e.audio_object_type, n = e.audio_object_type, a = e.sampling_freq_index, r = e.channel_config, s = 0, o = navigator.userAgent.toLowerCase();
        -1 !== o.indexOf("firefox") ? a >= 6 ? (n = 5, t = new Array(4), s = a - 3) : (n = 2, 
        t = new Array(2), s = a) : -1 !== o.indexOf("android") ? (n = 2, t = new Array(2), 
        s = a) : (n = 5, s = a, t = new Array(4), a >= 6 ? s = a - 3 : 1 === r && (n = 2, 
        t = new Array(2), s = a)), t[0] = n << 3, t[0] |= (15 & a) >>> 1, t[1] = (15 & a) << 7, 
        t[1] |= (15 & r) << 3, 5 === n && (t[1] |= (15 & s) >>> 1, t[2] = (1 & s) << 7, 
        t[2] |= 8, t[3] = 0), this.config = t, this.sampling_rate = G[a], this.channel_count = r, 
        this.codec_mimetype = "mp4a.40." + n, this.original_codec_mimetype = "mp4a.40." + i;
    }, K = function() {}, W = function() {};
    !function(e) {
        e[e.kSpliceNull = 0] = "kSpliceNull", e[e.kSpliceSchedule = 4] = "kSpliceSchedule", 
        e[e.kSpliceInsert = 5] = "kSpliceInsert", e[e.kTimeSignal = 6] = "kTimeSignal", 
        e[e.kBandwidthReservation = 7] = "kBandwidthReservation", e[e.kPrivateCommand = 255] = "kPrivateCommand";
    }(N || (N = {}));
    var X, Y = function(e) {
        var t = e.readBool();
        return t ? (e.readBits(6), {
            time_specified_flag: t,
            pts_time: 4 * e.readBits(31) + e.readBits(2)
        }) : (e.readBits(7), {
            time_specified_flag: t
        });
    }, J = function(e) {
        var t = e.readBool();
        return e.readBits(6), {
            auto_return: t,
            duration: 4 * e.readBits(31) + e.readBits(2)
        };
    }, Z = function(e, t) {
        var i = t.readBits(8);
        return e ? {
            component_tag: i
        } : {
            component_tag: i,
            splice_time: Y(t)
        };
    }, Q = function(e) {
        return {
            component_tag: e.readBits(8),
            utc_splice_time: e.readBits(32)
        };
    }, $ = function(e) {
        var t = e.readBits(32), i = e.readBool();
        e.readBits(7);
        var n = {
            splice_event_id: t,
            splice_event_cancel_indicator: i
        };
        if (i) return n;
        if (n.out_of_network_indicator = e.readBool(), n.program_splice_flag = e.readBool(), 
        n.duration_flag = e.readBool(), e.readBits(5), n.program_splice_flag) n.utc_splice_time = e.readBits(32); else {
            n.component_count = e.readBits(8), n.components = [];
            for (var a = 0; a < n.component_count; a++) n.components.push(Q(e));
        }
        return n.duration_flag && (n.break_duration = J(e)), n.unique_program_id = e.readBits(16), 
        n.avail_num = e.readBits(8), n.avails_expected = e.readBits(8), n;
    }, ee = function(e, t, i, n) {
        return {
            descriptor_tag: e,
            descriptor_length: t,
            identifier: i,
            provider_avail_id: n.readBits(32)
        };
    }, te = function(e, t, i, n) {
        var a = n.readBits(8), r = n.readBits(3);
        n.readBits(5);
        for (var s = "", o = 0; o < r; o++) s += String.fromCharCode(n.readBits(8));
        return {
            descriptor_tag: e,
            descriptor_length: t,
            identifier: i,
            preroll: a,
            dtmf_count: r,
            DTMF_char: s
        };
    }, ie = function(e) {
        var t = e.readBits(8);
        return e.readBits(7), {
            component_tag: t,
            pts_offset: 4 * e.readBits(31) + e.readBits(2)
        };
    }, ne = function(e, t, i, n) {
        var a = n.readBits(32), r = n.readBool();
        n.readBits(7);
        var s = {
            descriptor_tag: e,
            descriptor_length: t,
            identifier: i,
            segmentation_event_id: a,
            segmentation_event_cancel_indicator: r
        };
        if (r) return s;
        if (s.program_segmentation_flag = n.readBool(), s.segmentation_duration_flag = n.readBool(), 
        s.delivery_not_restricted_flag = n.readBool(), s.delivery_not_restricted_flag ? n.readBits(5) : (s.web_delivery_allowed_flag = n.readBool(), 
        s.no_regional_blackout_flag = n.readBool(), s.archive_allowed_flag = n.readBool(), 
        s.device_restrictions = n.readBits(2)), !s.program_segmentation_flag) {
            s.component_count = n.readBits(8), s.components = [];
            for (var o = 0; o < s.component_count; o++) s.components.push(ie(n));
        }
        s.segmentation_duration_flag && (s.segmentation_duration = n.readBits(40)), s.segmentation_upid_type = n.readBits(8), 
        s.segmentation_upid_length = n.readBits(8);
        var d = new Uint8Array(s.segmentation_upid_length);
        for (o = 0; o < s.segmentation_upid_length; o++) d[o] = n.readBits(8);
        return s.segmentation_upid = d.buffer, s.segmentation_type_id = n.readBits(8), s.segment_num = n.readBits(8), 
        s.segments_expected = n.readBits(8), 52 !== s.segmentation_type_id && 54 !== s.segmentation_type_id && 56 !== s.segmentation_type_id && 58 !== s.segmentation_type_id || (s.sub_segment_num = n.readBits(8), 
        s.sub_segments_expected = n.readBits(8)), s;
    }, ae = function(e, t, i, n) {
        return {
            descriptor_tag: e,
            descriptor_length: t,
            identifier: i,
            TAI_seconds: n.readBits(48),
            TAI_ns: n.readBits(32),
            UTC_offset: n.readBits(16)
        };
    }, re = function(e) {
        return {
            component_tag: e.readBits(8),
            ISO_code: String.fromCharCode(e.readBits(8), e.readBits(8), e.readBits(8)),
            Bit_Stream_Mode: e.readBits(3),
            Num_Channels: e.readBits(4),
            Full_Srvc_Audio: e.readBool()
        };
    }, se = function(e, t, i, n) {
        for (var a = n.readBits(4), r = [], s = 0; s < a; s++) r.push(re(n));
        return {
            descriptor_tag: e,
            descriptor_length: t,
            identifier: i,
            audio_count: a,
            components: r
        };
    }, oe = function(e) {
        var t = new f(e), i = t.readBits(8), n = t.readBool(), a = t.readBool();
        t.readBits(2);
        var r = t.readBits(12), s = t.readBits(8), o = t.readBool(), d = t.readBits(6), _ = 4 * t.readBits(31) + t.readBits(2), h = t.readBits(8), c = t.readBits(12), u = t.readBits(12), l = t.readBits(8), p = null;
        l === N.kSpliceNull ? p = {} : l === N.kSpliceSchedule ? p = function(e) {
            for (var t = e.readBits(8), i = [], n = 0; n < t; n++) i.push($(e));
            return {
                splice_count: t,
                events: i
            };
        }(t) : l === N.kSpliceInsert ? p = function(e) {
            var t = e.readBits(32), i = e.readBool();
            e.readBits(7);
            var n = {
                splice_event_id: t,
                splice_event_cancel_indicator: i
            };
            if (i) return n;
            if (n.out_of_network_indicator = e.readBool(), n.program_splice_flag = e.readBool(), 
            n.duration_flag = e.readBool(), n.splice_immediate_flag = e.readBool(), e.readBits(4), 
            n.program_splice_flag && !n.splice_immediate_flag && (n.splice_time = Y(e)), !n.program_splice_flag) {
                n.component_count = e.readBits(8), n.components = [];
                for (var a = 0; a < n.component_count; a++) n.components.push(Z(n.splice_immediate_flag, e));
            }
            return n.duration_flag && (n.break_duration = J(e)), n.unique_program_id = e.readBits(16), 
            n.avail_num = e.readBits(8), n.avails_expected = e.readBits(8), n;
        }(t) : l === N.kTimeSignal ? p = function(e) {
            return {
                splice_time: Y(e)
            };
        }(t) : l === N.kBandwidthReservation ? p = {} : l === N.kPrivateCommand ? p = function(e, t) {
            for (var i = String.fromCharCode(t.readBits(8), t.readBits(8), t.readBits(8), t.readBits(8)), n = new Uint8Array(e - 4), a = 0; a < e - 4; a++) n[a] = t.readBits(8);
            return {
                identifier: i,
                private_data: n.buffer
            };
        }(u, t) : t.readBits(8 * u);
        for (var m = [], g = t.readBits(16), v = 0; v < g; ) {
            var y = t.readBits(8), b = t.readBits(8), S = String.fromCharCode(t.readBits(8), t.readBits(8), t.readBits(8), t.readBits(8));
            0 === y ? m.push(ee(y, b, S, t)) : 1 === y ? m.push(te(y, b, S, t)) : 2 === y ? m.push(ne(y, b, S, t)) : 3 === y ? m.push(ae(y, b, S, t)) : 4 === y ? m.push(se(y, b, S, t)) : t.readBits(8 * (b - 4)), 
            v += 2 + b;
        }
        var E = {
            table_id: i,
            section_syntax_indicator: n,
            private_indicator: a,
            section_length: r,
            protocol_version: s,
            encrypted_packet: o,
            encryption_algorithm: d,
            pts_adjustment: _,
            cw_index: h,
            tier: c,
            splice_command_length: u,
            splice_command_type: l,
            splice_command: p,
            descriptor_loop_length: g,
            splice_descriptors: m,
            E_CRC32: o ? t.readBits(32) : void 0,
            CRC32: t.readBits(32)
        };
        if (l === N.kSpliceInsert) {
            var A = p;
            if (A.splice_event_cancel_indicator) return {
                splice_command_type: l,
                detail: E,
                data: e
            };
            if (A.program_splice_flag && !A.splice_immediate_flag) {
                var R = A.duration_flag ? A.break_duration.auto_return : void 0, T = A.duration_flag ? A.break_duration.duration / 90 : void 0;
                return A.splice_time.time_specified_flag ? {
                    splice_command_type: l,
                    pts: (_ + A.splice_time.pts_time) % Math.pow(2, 33),
                    auto_return: R,
                    duraiton: T,
                    detail: E,
                    data: e
                } : {
                    splice_command_type: l,
                    auto_return: R,
                    duraiton: T,
                    detail: E,
                    data: e
                };
            }
            return {
                splice_command_type: l,
                auto_return: R = A.duration_flag ? A.break_duration.auto_return : void 0,
                duraiton: T = A.duration_flag ? A.break_duration.duration / 90 : void 0,
                detail: E,
                data: e
            };
        }
        if (l === N.kTimeSignal) {
            var L = p;
            return L.splice_time.time_specified_flag ? {
                splice_command_type: l,
                pts: (_ + L.splice_time.pts_time) % Math.pow(2, 33),
                detail: E,
                data: e
            } : {
                splice_command_type: l,
                detail: E,
                data: e
            };
        }
        return {
            splice_command_type: l,
            detail: E,
            data: e
        };
    };
    !function(e) {
        e[e.kSliceIDR_W_RADL = 19] = "kSliceIDR_W_RADL", e[e.kSliceIDR_N_LP = 20] = "kSliceIDR_N_LP", 
        e[e.kSliceCRA_NUT = 21] = "kSliceCRA_NUT", e[e.kSliceVPS = 32] = "kSliceVPS", e[e.kSliceSPS = 33] = "kSliceSPS", 
        e[e.kSlicePPS = 34] = "kSlicePPS", e[e.kSliceAUD = 35] = "kSliceAUD";
    }(X || (X = {}));
    var de = function() {}, _e = function(e) {
        var t = e.data.byteLength;
        this.type = e.type, this.data = new Uint8Array(4 + t), new DataView(this.data.buffer).setUint32(0, t), 
        this.data.set(e.data, 4);
    }, he = function() {
        function e(e) {
            this.TAG = "H265AnnexBParser", this.current_startcode_offset_ = 0, this.eof_flag_ = !1, 
            this.data_ = e, this.current_startcode_offset_ = this.findNextStartCodeOffset(0), 
            this.eof_flag_ && r.a.e(this.TAG, "Could not find H265 startcode until payload end!");
        }
        return e.prototype.findNextStartCodeOffset = function(e) {
            for (var t = e, i = this.data_; ;) {
                if (t + 3 >= i.byteLength) return this.eof_flag_ = !0, i.byteLength;
                var n = i[t + 0] << 24 | i[t + 1] << 16 | i[t + 2] << 8 | i[t + 3], a = i[t + 0] << 16 | i[t + 1] << 8 | i[t + 2];
                if (1 === n || 1 === a) return t;
                t++;
            }
        }, e.prototype.readNextNaluPayload = function() {
            for (var e = this.data_, t = null; null == t && !this.eof_flag_; ) {
                var i = this.current_startcode_offset_, n = e[i += 1 == (e[i] << 24 | e[i + 1] << 16 | e[i + 2] << 8 | e[i + 3]) ? 4 : 3] >> 1 & 63, a = (128 & e[i]) >>> 7, r = this.findNextStartCodeOffset(i);
                if (this.current_startcode_offset_ = r, 0 === a) {
                    var s = e.subarray(i, r);
                    (t = new de).type = n, t.data = s;
                }
            }
            return t;
        }, e;
    }(), ce = function() {
        function e(e, t, i, n) {
            var a = 23 + (5 + e.byteLength) + (5 + t.byteLength) + (5 + i.byteLength), r = this.data = new Uint8Array(a);
            r[0] = 1, r[1] = (3 & n.general_profile_space) << 6 | (n.general_tier_flag ? 1 : 0) << 5 | 31 & n.general_profile_idc, 
            r[2] = n.general_profile_compatibility_flags_1, r[3] = n.general_profile_compatibility_flags_2, 
            r[4] = n.general_profile_compatibility_flags_3, r[5] = n.general_profile_compatibility_flags_4, 
            r[6] = n.general_constraint_indicator_flags_1, r[7] = n.general_constraint_indicator_flags_2, 
            r[8] = n.general_constraint_indicator_flags_3, r[9] = n.general_constraint_indicator_flags_4, 
            r[10] = n.general_constraint_indicator_flags_5, r[11] = n.general_constraint_indicator_flags_6, 
            r[12] = n.general_level_idc, r[13] = 240 | (3840 & n.min_spatial_segmentation_idc) >> 8, 
            r[14] = 255 & n.min_spatial_segmentation_idc, r[15] = 252 | 3 & n.parallelismType, 
            r[16] = 252 | 3 & n.chroma_format_idc, r[17] = 248 | 7 & n.bit_depth_luma_minus8, 
            r[18] = 248 | 7 & n.bit_depth_chroma_minus8, r[19] = 0, r[20] = 0, r[21] = (3 & n.constant_frame_rate) << 6 | (7 & n.num_temporal_layers) << 3 | (n.temporal_id_nested ? 1 : 0) << 2 | 3, 
            r[22] = 3, r[23] = 128 | X.kSliceVPS, r[24] = 0, r[25] = 1, r[26] = (65280 & e.byteLength) >> 8, 
            r[27] = (255 & e.byteLength) >> 0, r.set(e, 28), r[23 + (5 + e.byteLength) + 0] = 128 | X.kSliceSPS, 
            r[23 + (5 + e.byteLength) + 1] = 0, r[23 + (5 + e.byteLength) + 2] = 1, r[23 + (5 + e.byteLength) + 3] = (65280 & t.byteLength) >> 8, 
            r[23 + (5 + e.byteLength) + 4] = (255 & t.byteLength) >> 0, r.set(t, 23 + (5 + e.byteLength) + 5), 
            r[23 + (5 + e.byteLength + 5 + t.byteLength) + 0] = 128 | X.kSlicePPS, r[23 + (5 + e.byteLength + 5 + t.byteLength) + 1] = 0, 
            r[23 + (5 + e.byteLength + 5 + t.byteLength) + 2] = 1, r[23 + (5 + e.byteLength + 5 + t.byteLength) + 3] = (65280 & i.byteLength) >> 8, 
            r[23 + (5 + e.byteLength + 5 + t.byteLength) + 4] = (255 & i.byteLength) >> 0, r.set(i, 23 + (5 + e.byteLength + 5 + t.byteLength) + 5);
        }
        return e.prototype.getData = function() {
            return this.data;
        }, e;
    }(), ue = function() {}, le = function() {}, fe = function() {}, pe = [ [ 64, 64, 80, 80, 96, 96, 112, 112, 128, 128, 160, 160, 192, 192, 224, 224, 256, 256, 320, 320, 384, 384, 448, 448, 512, 512, 640, 640, 768, 768, 896, 896, 1024, 1024, 1152, 1152, 1280, 1280 ], [ 69, 70, 87, 88, 104, 105, 121, 122, 139, 140, 174, 175, 208, 209, 243, 244, 278, 279, 348, 349, 417, 418, 487, 488, 557, 558, 696, 697, 835, 836, 975, 976, 1114, 1115, 1253, 1254, 1393, 1394 ], [ 96, 96, 120, 120, 144, 144, 168, 168, 192, 192, 240, 240, 288, 288, 336, 336, 384, 384, 480, 480, 576, 576, 672, 672, 768, 768, 960, 960, 1152, 1152, 1344, 1344, 1536, 1536, 1728, 1728, 1920, 1920 ] ], me = function() {
        function e(e) {
            this.TAG = "AC3Parser", this.data_ = e, this.current_syncword_offset_ = this.findNextSyncwordOffset(0), 
            this.eof_flag_ && r.a.e(this.TAG, "Could not found AC3 syncword until payload end");
        }
        return e.prototype.findNextSyncwordOffset = function(e) {
            for (var t = e, i = this.data_; ;) {
                if (t + 7 >= i.byteLength) return this.eof_flag_ = !0, i.byteLength;
                if (2935 == (i[t + 0] << 8 | i[t + 1] << 0)) return t;
                t++;
            }
        }, e.prototype.readNextAC3Frame = function() {
            for (var e = this.data_, t = null; null == t && !this.eof_flag_; ) {
                var i = this.current_syncword_offset_, n = e[i + 4] >> 6, a = [ 48e3, 44200, 33e3 ][n], r = 63 & e[i + 4], s = 2 * pe[n][r];
                if (i + s > this.data_.byteLength) {
                    this.eof_flag_ = !0, this.has_last_incomplete_data = !0;
                    break;
                }
                var o = this.findNextSyncwordOffset(i + s);
                this.current_syncword_offset_ = o;
                var d = e[i + 5] >> 3, _ = 7 & e[i + 5], h = e[i + 6] >> 5, c = 0;
                0 != (1 & h) && 1 !== h && (c += 2), 0 != (4 & h) && (c += 2), 2 === h && (c += 2);
                var u = (e[i + 6] << 8 | e[i + 7] << 0) >> 12 - c & 1, l = [ 2, 1, 2, 3, 3, 4, 4, 5 ][h] + u;
                (t = new fe).sampling_frequency = a, t.channel_count = l, t.channel_mode = h, t.bit_stream_identification = d, 
                t.low_frequency_effects_channel_on = u, t.bit_stream_mode = _, t.frame_size_code = r, 
                t.data = e.subarray(i, i + s);
            }
            return t;
        }, e.prototype.hasIncompleteData = function() {
            return this.has_last_incomplete_data;
        }, e.prototype.getIncompleteData = function() {
            return this.has_last_incomplete_data ? this.data_.subarray(this.current_syncword_offset_) : null;
        }, e;
    }(), ge = function(e) {
        var t;
        t = [ e.sampling_rate_code << 6 | e.bit_stream_identification << 1 | e.bit_stream_mode >> 2, (3 & e.bit_stream_mode) << 6 | e.channel_mode << 3 | e.low_frequency_effects_channel_on << 2 | e.frame_size_code >> 4, e.frame_size_code << 4 & 224 ], 
        this.config = t, this.sampling_rate = e.sampling_frequency, this.bit_stream_identification = e.bit_stream_identification, 
        this.bit_stream_mode = e.bit_stream_mode, this.low_frequency_effects_channel_on = e.low_frequency_effects_channel_on, 
        this.channel_count = e.channel_count, this.channel_mode = e.channel_mode, this.codec_mimetype = "ac-3", 
        this.original_codec_mimetype = "ac-3";
    }, ve = function() {
        var e = function(t, i) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e, t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
            })(t, i);
        };
        return function(t, i) {
            function n() {
                this.constructor = t;
            }
            e(t, i), t.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, 
            new n);
        };
    }(), ye = function() {
        return (ye = Object.assign || function(e) {
            for (var t, i = 1, n = arguments.length; i < n; i++) for (var a in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e;
        }).apply(this, arguments);
    }, be = function(e) {
        function t(t, i) {
            var n = e.call(this) || this;
            return n.TAG = "TSDemuxer", n.first_parse_ = !0, n.media_info_ = new o.a, n.timescale_ = 90, 
            n.duration_ = 0, n.current_pmt_pid_ = -1, n.program_pmt_map_ = {}, n.pes_slice_queues_ = {}, 
            n.section_slice_queues_ = {}, n.video_metadata_ = {
                vps: void 0,
                sps: void 0,
                pps: void 0,
                details: void 0
            }, n.audio_metadata_ = {
                codec: void 0,
                audio_object_type: void 0,
                sampling_freq_index: void 0,
                sampling_frequency: void 0,
                channel_config: void 0
            }, n.aac_last_sample_pts_ = void 0, n.aac_last_incomplete_data_ = null, n.has_video_ = !1, 
            n.has_audio_ = !1, n.video_init_segment_dispatched_ = !1, n.audio_init_segment_dispatched_ = !1, 
            n.video_metadata_changed_ = !1, n.audio_metadata_changed_ = !1, n.loas_previous_frame = null, 
            n.video_track_ = {
                type: "video",
                id: 1,
                sequenceNumber: 0,
                samples: [],
                length: 0
            }, n.audio_track_ = {
                type: "audio",
                id: 2,
                sequenceNumber: 0,
                samples: [],
                length: 0
            }, n.ts_packet_size_ = t.ts_packet_size, n.sync_offset_ = t.sync_offset, n.config_ = i, 
            n;
        }
        return ve(t, e), t.prototype.destroy = function() {
            this.media_info_ = null, this.pes_slice_queues_ = null, this.section_slice_queues_ = null, 
            this.video_metadata_ = null, this.audio_metadata_ = null, this.aac_last_incomplete_data_ = null, 
            this.video_track_ = null, this.audio_track_ = null, e.prototype.destroy.call(this);
        }, t.probe = function(e) {
            var t = new Uint8Array(e), i = -1, n = 188;
            if (t.byteLength <= 3 * n) return {
                needMoreData: !0
            };
            for (;-1 === i; ) {
                for (var a = Math.min(1e3, t.byteLength - 3 * n), s = 0; s < a; ) {
                    if (71 === t[s] && 71 === t[s + n] && 71 === t[s + 2 * n]) {
                        i = s;
                        break;
                    }
                    s++;
                }
                if (-1 === i) if (188 === n) n = 192; else {
                    if (192 !== n) break;
                    n = 204;
                }
            }
            return -1 === i ? {
                match: !1
            } : (192 === n && i >= 4 ? (r.a.v("TSDemuxer", "ts_packet_size = 192, m2ts mode"), 
            i -= 4) : 204 === n && r.a.v("TSDemuxer", "ts_packet_size = 204, RS encoded MPEG2-TS stream"), 
            {
                match: !0,
                consumed: 0,
                ts_packet_size: n,
                sync_offset: i
            });
        }, t.prototype.bindDataSource = function(e) {
            return e.onDataArrival = this.parseChunks.bind(this), this;
        }, t.prototype.resetMediaInfo = function() {
            this.media_info_ = new o.a;
        }, t.prototype.parseChunks = function(e, t) {
            if (!(this.onError && this.onMediaInfo && this.onTrackMetadata && this.onDataAvailable)) throw new c.a("onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified");
            var i = 0;
            for (this.first_parse_ && (this.first_parse_ = !1, i = this.sync_offset_); i + this.ts_packet_size_ <= e.byteLength; ) {
                var n = t + i;
                192 === this.ts_packet_size_ && (i += 4);
                var a = new Uint8Array(e, i, 188), s = a[0];
                if (71 !== s) {
                    r.a.e(this.TAG, "sync_byte = " + s + ", not 0x47");
                    break;
                }
                var o = (64 & a[1]) >>> 6, d = (a[1], (31 & a[1]) << 8 | a[2]), _ = (48 & a[3]) >>> 4, h = 15 & a[3], u = {}, l = 4;
                if (2 == _ || 3 == _) {
                    var f = a[4];
                    if (5 + f === 188) {
                        i += 188, 204 === this.ts_packet_size_ && (i += 16);
                        continue;
                    }
                    f > 0 && (u = this.parseAdaptationField(e, i + 4, 1 + f)), l = 5 + f;
                }
                if (1 == _ || 3 == _) if (0 === d || d === this.current_pmt_pid_ || null != this.pmt_ && this.pmt_.pid_stream_type[d] === E.kSCTE35) {
                    var p = 188 - l;
                    this.handleSectionSlice(e, i + l, p, {
                        pid: d,
                        file_position: n,
                        payload_unit_start_indicator: o,
                        continuity_conunter: h,
                        random_access_indicator: u.random_access_indicator
                    });
                } else if (null != this.pmt_ && null != this.pmt_.pid_stream_type[d]) {
                    p = 188 - l;
                    var m = this.pmt_.pid_stream_type[d];
                    d !== this.pmt_.common_pids.h264 && d !== this.pmt_.common_pids.h265 && d !== this.pmt_.common_pids.adts_aac && d !== this.pmt_.common_pids.loas_aac && d !== this.pmt_.common_pids.ac3 && d !== this.pmt_.common_pids.opus && d !== this.pmt_.common_pids.mp3 && !0 !== this.pmt_.pes_private_data_pids[d] && !0 !== this.pmt_.timed_id3_pids[d] || this.handlePESSlice(e, i + l, p, {
                        pid: d,
                        stream_type: m,
                        file_position: n,
                        payload_unit_start_indicator: o,
                        continuity_conunter: h,
                        random_access_indicator: u.random_access_indicator
                    });
                }
                i += 188, 204 === this.ts_packet_size_ && (i += 16);
            }
            return this.dispatchAudioVideoMediaSegment(), i;
        }, t.prototype.parseAdaptationField = function(e, t, i) {
            var n = new Uint8Array(e, t, i), a = n[0];
            return a > 0 ? a > 183 ? (r.a.w(this.TAG, "Illegal adaptation_field_length: " + a), 
            {}) : {
                discontinuity_indicator: (128 & n[1]) >>> 7,
                random_access_indicator: (64 & n[1]) >>> 6,
                elementary_stream_priority_indicator: (32 & n[1]) >>> 5
            } : {};
        }, t.prototype.handleSectionSlice = function(e, t, i, n) {
            var a = new Uint8Array(e, t, i), r = this.section_slice_queues_[n.pid];
            if (n.payload_unit_start_indicator) {
                var s = a[0];
                if (null != r && 0 !== r.total_length) {
                    var o = new Uint8Array(e, t + 1, Math.min(i, s));
                    r.slices.push(o), r.total_length += o.byteLength, r.total_length === r.expected_length ? this.emitSectionSlices(r, n) : this.clearSlices(r, n);
                }
                for (var d = 1 + s; d < a.byteLength && 255 !== a[d + 0]; ) {
                    var _ = (15 & a[d + 1]) << 8 | a[d + 2];
                    this.section_slice_queues_[n.pid] = new C, (r = this.section_slice_queues_[n.pid]).expected_length = _ + 3, 
                    r.file_position = n.file_position, r.random_access_indicator = n.random_access_indicator, 
                    o = new Uint8Array(e, t + d, Math.min(i - d, r.expected_length - r.total_length)), 
                    r.slices.push(o), r.total_length += o.byteLength, r.total_length === r.expected_length ? this.emitSectionSlices(r, n) : r.total_length >= r.expected_length && this.clearSlices(r, n), 
                    d += o.byteLength;
                }
            } else null != r && 0 !== r.total_length && (o = new Uint8Array(e, t, Math.min(i, r.expected_length - r.total_length)), 
            r.slices.push(o), r.total_length += o.byteLength, r.total_length === r.expected_length ? this.emitSectionSlices(r, n) : r.total_length >= r.expected_length && this.clearSlices(r, n));
        }, t.prototype.handlePESSlice = function(e, t, i, n) {
            var a = new Uint8Array(e, t, i), s = a[0] << 16 | a[1] << 8 | a[2], o = (a[3], a[4] << 8 | a[5]);
            if (n.payload_unit_start_indicator) {
                if (1 !== s) return void r.a.e(this.TAG, "handlePESSlice: packet_start_code_prefix should be 1 but with value " + s);
                var d = this.pes_slice_queues_[n.pid];
                d && (0 === d.expected_length || d.expected_length === d.total_length ? this.emitPESSlices(d, n) : this.clearSlices(d, n)), 
                this.pes_slice_queues_[n.pid] = new C, this.pes_slice_queues_[n.pid].file_position = n.file_position, 
                this.pes_slice_queues_[n.pid].random_access_indicator = n.random_access_indicator;
            }
            if (null != this.pes_slice_queues_[n.pid]) {
                var _ = this.pes_slice_queues_[n.pid];
                _.slices.push(a), n.payload_unit_start_indicator && (_.expected_length = 0 === o ? 0 : o + 6), 
                _.total_length += a.byteLength, _.expected_length > 0 && _.expected_length === _.total_length ? this.emitPESSlices(_, n) : _.expected_length > 0 && _.expected_length < _.total_length && this.clearSlices(_, n);
            }
        }, t.prototype.emitSectionSlices = function(e, t) {
            for (var i = new Uint8Array(e.total_length), n = 0, a = 0; n < e.slices.length; n++) {
                var r = e.slices[n];
                i.set(r, a), a += r.byteLength;
            }
            e.slices = [], e.expected_length = -1, e.total_length = 0;
            var s = new D;
            s.pid = t.pid, s.data = i, s.file_position = e.file_position, s.random_access_indicator = e.random_access_indicator, 
            this.parseSection(s);
        }, t.prototype.emitPESSlices = function(e, t) {
            for (var i = new Uint8Array(e.total_length), n = 0, a = 0; n < e.slices.length; n++) {
                var r = e.slices[n];
                i.set(r, a), a += r.byteLength;
            }
            e.slices = [], e.expected_length = -1, e.total_length = 0;
            var s = new k;
            s.pid = t.pid, s.data = i, s.stream_type = t.stream_type, s.file_position = e.file_position, 
            s.random_access_indicator = e.random_access_indicator, this.parsePES(s);
        }, t.prototype.clearSlices = function(e, t) {
            e.slices = [], e.expected_length = -1, e.total_length = 0;
        }, t.prototype.parseSection = function(e) {
            var t = e.data, i = e.pid;
            0 === i ? this.parsePAT(t) : i === this.current_pmt_pid_ ? this.parsePMT(t) : null != this.pmt_ && this.pmt_.scte_35_pids[i] && this.parseSCTE35(t);
        }, t.prototype.parsePES = function(e) {
            var t = e.data, i = t[0] << 16 | t[1] << 8 | t[2], n = t[3], a = t[4] << 8 | t[5];
            if (1 === i) if (188 !== n && 190 !== n && 191 !== n && 240 !== n && 241 !== n && 255 !== n && 242 !== n && 248 !== n) {
                t[6];
                var s = (192 & t[7]) >>> 6, o = t[8], d = void 0, _ = void 0;
                2 !== s && 3 !== s || (d = 536870912 * (14 & t[9]) + 4194304 * (255 & t[10]) + 16384 * (254 & t[11]) + 128 * (255 & t[12]) + (254 & t[13]) / 2, 
                _ = 3 === s ? 536870912 * (14 & t[14]) + 4194304 * (255 & t[15]) + 16384 * (254 & t[16]) + 128 * (255 & t[17]) + (254 & t[18]) / 2 : d);
                var h = 9 + o, c = void 0;
                if (0 !== a) {
                    if (a < 3 + o) return void r.a.v(this.TAG, "Malformed PES: PES_packet_length < 3 + PES_header_data_length");
                    c = a - 3 - o;
                } else c = t.byteLength - h;
                var u = t.subarray(h, h + c);
                switch (e.stream_type) {
                  case E.kMPEG1Audio:
                  case E.kMPEG2Audio:
                    this.parseMP3Payload(u, d);
                    break;

                  case E.kPESPrivateData:
                    this.pmt_.common_pids.opus === e.pid ? this.parseOpusPayload(u, d) : this.pmt_.common_pids.ac3 === e.pid ? this.parseAC3Payload(u, d) : this.pmt_.smpte2038_pids[e.pid] ? this.parseSMPTE2038MetadataPayload(u, d, _, e.pid, n) : this.parsePESPrivateDataPayload(u, d, _, e.pid, n);
                    break;

                  case E.kADTSAAC:
                    this.parseADTSAACPayload(u, d);
                    break;

                  case E.kLOASAAC:
                    this.parseLOASAACPayload(u, d);
                    break;

                  case E.kAC3:
                    this.parseAC3Payload(u, d);
                    break;

                  case E.kID3:
                    this.parseTimedID3MetadataPayload(u, d, _, e.pid, n);
                    break;

                  case E.kH264:
                    this.parseH264Payload(u, d, _, e.file_position, e.random_access_indicator);
                    break;

                  case E.kH265:
                    this.parseH265Payload(u, d, _, e.file_position, e.random_access_indicator);
                }
            } else 188 !== n && 191 !== n && 240 !== n && 241 !== n && 255 !== n && 242 !== n && 248 !== n || e.stream_type !== E.kPESPrivateData || (h = 6, 
            c = void 0, c = 0 !== a ? a : t.byteLength - h, u = t.subarray(h, h + c), this.parsePESPrivateDataPayload(u, void 0, void 0, e.pid, n)); else r.a.e(this.TAG, "parsePES: packet_start_code_prefix should be 1 but with value " + i);
        }, t.prototype.parsePAT = function(e) {
            var t = e[0];
            if (0 === t) {
                var i = (15 & e[1]) << 8 | e[2], n = (e[3], e[4], (62 & e[5]) >>> 1), a = 1 & e[5], s = e[6], o = (e[7], 
                null);
                if (1 === a && 0 === s) (o = new T).version_number = n; else if (null == (o = this.pat_)) return;
                for (var d = i - 5 - 4, _ = -1, h = -1, c = 8; c < 8 + d; c += 4) {
                    var u = e[c] << 8 | e[c + 1], l = (31 & e[c + 2]) << 8 | e[c + 3];
                    0 === u ? o.network_pid = l : (o.program_pmt_pid[u] = l, -1 === _ && (_ = u), -1 === h && (h = l));
                }
                1 === a && 0 === s && (null == this.pat_ && r.a.v(this.TAG, "Parsed first PAT: " + JSON.stringify(o)), 
                this.pat_ = o, this.current_program_ = _, this.current_pmt_pid_ = h);
            } else r.a.e(this.TAG, "parsePAT: table_id " + t + " is not corresponded to PAT!");
        }, t.prototype.parsePMT = function(e) {
            var t = e[0];
            if (2 === t) {
                var i = (15 & e[1]) << 8 | e[2], n = e[3] << 8 | e[4], a = (62 & e[5]) >>> 1, s = 1 & e[5], o = e[6], d = (e[7], 
                null);
                if (1 === s && 0 === o) (d = new w).program_number = n, d.version_number = a, this.program_pmt_map_[n] = d; else if (null == (d = this.program_pmt_map_[n])) return;
                e[8], e[9];
                for (var _ = (15 & e[10]) << 8 | e[11], h = 12 + _, c = i - 9 - _ - 4, u = h; u < h + c; ) {
                    var l = e[u], f = (31 & e[u + 1]) << 8 | e[u + 2], p = (15 & e[u + 3]) << 8 | e[u + 4];
                    d.pid_stream_type[f] = l;
                    var m = d.common_pids.h264 || d.common_pids.h265, g = d.common_pids.adts_aac || d.common_pids.loas_aac || d.common_pids.ac3 || d.common_pids.opus || d.common_pids.mp3;
                    if (l !== E.kH264 || m) if (l !== E.kH265 || m) if (l !== E.kADTSAAC || g) if (l !== E.kLOASAAC || g) if (l !== E.kAC3 || g) if (l !== E.kMPEG1Audio && l !== E.kMPEG2Audio || g) if (l === E.kPESPrivateData) {
                        if (d.pes_private_data_pids[f] = !0, p > 0) {
                            for (var v = u + 5; v < u + 5 + p; ) {
                                var y = e[v + 0], b = e[v + 1];
                                if (5 === y) {
                                    var S = String.fromCharCode.apply(String, Array.from(e.subarray(v + 2, v + 2 + b)));
                                    "VANC" === S ? d.smpte2038_pids[f] = !0 : "Opus" === S && (d.common_pids.opus = f);
                                } else if (127 === y && f === d.common_pids.opus) {
                                    var A = null;
                                    if (128 === e[v + 2] && (A = e[v + 3]), null == A) {
                                        r.a.e(this.TAG, "Not Supported Opus channel count.");
                                        continue;
                                    }
                                    var R = {
                                        codec: "opus",
                                        channel_count: 0 == (15 & A) ? 2 : 15 & A,
                                        channel_config_code: A,
                                        sample_rate: 48e3
                                    }, T = {
                                        codec: "opus",
                                        meta: R
                                    };
                                    0 == this.audio_init_segment_dispatched_ ? (this.audio_metadata_ = R, this.dispatchAudioInitSegment(T)) : this.detectAudioMetadataChange(T) && (this.dispatchAudioMediaSegment(), 
                                    this.dispatchAudioInitSegment(T));
                                }
                                v += 2 + b;
                            }
                            var L = e.subarray(u + 5, u + 5 + p);
                            this.dispatchPESPrivateDataDescriptor(f, l, L);
                        }
                    } else l === E.kID3 ? d.timed_id3_pids[f] = !0 : l === E.kSCTE35 && (d.scte_35_pids[f] = !0); else d.common_pids.mp3 = f; else d.common_pids.ac3 = f; else d.common_pids.loas_aac = f; else d.common_pids.adts_aac = f; else d.common_pids.h265 = f; else d.common_pids.h264 = f;
                    u += 5 + p;
                }
                n === this.current_program_ && (null == this.pmt_ && r.a.v(this.TAG, "Parsed first PMT: " + JSON.stringify(d)), 
                this.pmt_ = d, (d.common_pids.h264 || d.common_pids.h265) && (this.has_video_ = !0), 
                (d.common_pids.adts_aac || d.common_pids.loas_aac || d.common_pids.ac3 || d.common_pids.opus || d.common_pids.mp3) && (this.has_audio_ = !0));
            } else r.a.e(this.TAG, "parsePMT: table_id " + t + " is not corresponded to PMT!");
        }, t.prototype.parseSCTE35 = function(e) {
            var t = oe(e);
            if (null != t.pts) {
                var i = Math.floor(t.pts / this.timescale_);
                t.pts = i;
            } else t.nearest_pts = this.aac_last_sample_pts_;
            this.onSCTE35Metadata && this.onSCTE35Metadata(t);
        }, t.prototype.parseH264Payload = function(e, t, i, n, a) {
            for (var s = new M(e), o = null, d = [], _ = 0, h = !1; null != (o = s.readNextNaluPayload()); ) {
                var c = new P(o);
                if (c.type === L.kSliceSPS) {
                    var u = p.parseSPS(o.data);
                    this.video_init_segment_dispatched_ ? !0 === this.detectVideoMetadataChange(c, u) && (r.a.v(this.TAG, "H264: Critical h264 metadata has been changed, attempt to re-generate InitSegment"), 
                    this.video_metadata_changed_ = !0, this.video_metadata_ = {
                        vps: void 0,
                        sps: c,
                        pps: void 0,
                        details: u
                    }) : (this.video_metadata_.sps = c, this.video_metadata_.details = u);
                } else c.type === L.kSlicePPS ? this.video_init_segment_dispatched_ && !this.video_metadata_changed_ || (this.video_metadata_.pps = c, 
                this.video_metadata_.sps && this.video_metadata_.pps && (this.video_metadata_changed_ && this.dispatchVideoMediaSegment(), 
                this.dispatchVideoInitSegment())) : (c.type === L.kSliceIDR || c.type === L.kSliceNonIDR && 1 === a) && (h = !0);
                this.video_init_segment_dispatched_ && (d.push(c), _ += c.data.byteLength);
            }
            var l = Math.floor(t / this.timescale_), f = Math.floor(i / this.timescale_);
            if (d.length) {
                var m = this.video_track_, g = {
                    units: d,
                    length: _,
                    isKeyframe: h,
                    dts: f,
                    pts: l,
                    cts: l - f,
                    file_position: n
                };
                m.samples.push(g), m.length += _;
            }
        }, t.prototype.parseH265Payload = function(e, t, i, n, a) {
            for (var s = new he(e), o = null, d = [], _ = 0, h = !1; null != (o = s.readNextNaluPayload()); ) {
                var c = new _e(o);
                if (c.type === X.kSliceVPS) {
                    if (!this.video_init_segment_dispatched_) {
                        var u = g.parseVPS(o.data);
                        this.video_metadata_.vps = c, this.video_metadata_.details = ye(ye({}, this.video_metadata_.details), u);
                    }
                } else c.type === X.kSliceSPS ? (u = g.parseSPS(o.data), this.video_init_segment_dispatched_ ? !0 === this.detectVideoMetadataChange(c, u) && (r.a.v(this.TAG, "H265: Critical h265 metadata has been changed, attempt to re-generate InitSegment"), 
                this.video_metadata_changed_ = !0, this.video_metadata_ = {
                    vps: void 0,
                    sps: c,
                    pps: void 0,
                    details: u
                }) : (this.video_metadata_.sps = c, this.video_metadata_.details = ye(ye({}, this.video_metadata_.details), u))) : c.type === X.kSlicePPS ? this.video_init_segment_dispatched_ && !this.video_metadata_changed_ || (u = g.parsePPS(o.data), 
                this.video_metadata_.pps = c, this.video_metadata_.details = ye(ye({}, this.video_metadata_.details), u), 
                this.video_metadata_.vps && this.video_metadata_.sps && this.video_metadata_.pps && (this.video_metadata_changed_ && this.dispatchVideoMediaSegment(), 
                this.dispatchVideoInitSegment())) : c.type !== X.kSliceIDR_W_RADL && c.type !== X.kSliceIDR_N_LP && c.type !== X.kSliceCRA_NUT || (h = !0);
                this.video_init_segment_dispatched_ && (d.push(c), _ += c.data.byteLength);
            }
            var l = Math.floor(t / this.timescale_), f = Math.floor(i / this.timescale_);
            if (d.length) {
                var p = this.video_track_, m = {
                    units: d,
                    length: _,
                    isKeyframe: h,
                    dts: f,
                    pts: l,
                    cts: l - f,
                    file_position: n
                };
                p.samples.push(m), p.length += _;
            }
        }, t.prototype.detectVideoMetadataChange = function(e, t) {
            if (t.codec_mimetype !== this.video_metadata_.details.codec_mimetype) return r.a.v(this.TAG, "Video: Codec mimeType changed from " + this.video_metadata_.details.codec_mimetype + " to " + t.codec_mimetype), 
            !0;
            if (t.codec_size.width !== this.video_metadata_.details.codec_size.width || t.codec_size.height !== this.video_metadata_.details.codec_size.height) {
                var i = this.video_metadata_.details.codec_size, n = t.codec_size;
                return r.a.v(this.TAG, "Video: Coded Resolution changed from " + i.width + "x" + i.height + " to " + n.width + "x" + n.height), 
                !0;
            }
            return t.present_size.width !== this.video_metadata_.details.present_size.width && (r.a.v(this.TAG, "Video: Present resolution width changed from " + this.video_metadata_.details.present_size.width + " to " + t.present_size.width), 
            !0);
        }, t.prototype.isInitSegmentDispatched = function() {
            return this.has_video_ && this.has_audio_ ? this.video_init_segment_dispatched_ && this.audio_init_segment_dispatched_ : this.has_video_ && !this.has_audio_ ? this.video_init_segment_dispatched_ : !(this.has_video_ || !this.has_audio_) && this.audio_init_segment_dispatched_;
        }, t.prototype.dispatchVideoInitSegment = function() {
            var e = this.video_metadata_.details, t = {
                type: "video"
            };
            t.id = this.video_track_.id, t.timescale = 1e3, t.duration = this.duration_, t.codecWidth = e.codec_size.width, 
            t.codecHeight = e.codec_size.height, t.presentWidth = e.present_size.width, t.presentHeight = e.present_size.height, 
            t.profile = e.profile_string, t.level = e.level_string, t.bitDepth = e.bit_depth, 
            t.chromaFormat = e.chroma_format, t.sarRatio = e.sar_ratio, t.frameRate = e.frame_rate;
            var i = t.frameRate.fps_den, n = t.frameRate.fps_num;
            if (t.refSampleDuration = i / n * 1e3, t.codec = e.codec_mimetype, this.video_metadata_.vps) {
                var a = this.video_metadata_.vps.data.subarray(4), s = this.video_metadata_.sps.data.subarray(4), o = this.video_metadata_.pps.data.subarray(4), d = new ce(a, s, o, e);
                t.hvcc = d.getData(), 0 == this.video_init_segment_dispatched_ && r.a.v(this.TAG, "Generated first HEVCDecoderConfigurationRecord for mimeType: " + t.codec);
            } else {
                s = this.video_metadata_.sps.data.subarray(4), o = this.video_metadata_.pps.data.subarray(4);
                var _ = new x(s, o, e);
                t.avcc = _.getData(), 0 == this.video_init_segment_dispatched_ && r.a.v(this.TAG, "Generated first AVCDecoderConfigurationRecord for mimeType: " + t.codec);
            }
            this.onTrackMetadata("video", t), this.video_init_segment_dispatched_ = !0, this.video_metadata_changed_ = !1;
            var h = this.media_info_;
            h.hasVideo = !0, h.width = t.codecWidth, h.height = t.codecHeight, h.fps = t.frameRate.fps, 
            h.profile = t.profile, h.level = t.level, h.refFrames = e.ref_frames, h.chromaFormat = e.chroma_format_string, 
            h.sarNum = t.sarRatio.width, h.sarDen = t.sarRatio.height, h.videoCodec = t.codec, 
            h.hasAudio && h.audioCodec ? h.mimeType = 'video/mp2t; codecs="' + h.videoCodec + "," + h.audioCodec + '"' : h.mimeType = 'video/mp2t; codecs="' + h.videoCodec + '"', 
            h.isComplete() && this.onMediaInfo(h);
        }, t.prototype.dispatchVideoMediaSegment = function() {
            this.isInitSegmentDispatched() && this.video_track_.length && this.onDataAvailable(null, this.video_track_);
        }, t.prototype.dispatchAudioMediaSegment = function() {
            this.isInitSegmentDispatched() && this.audio_track_.length && this.onDataAvailable(this.audio_track_, null);
        }, t.prototype.dispatchAudioVideoMediaSegment = function() {
            this.isInitSegmentDispatched() && (this.audio_track_.length || this.video_track_.length) && this.onDataAvailable(this.audio_track_, this.video_track_);
        }, t.prototype.parseADTSAACPayload = function(e, t) {
            if (!this.has_video_ || this.video_init_segment_dispatched_) {
                if (this.aac_last_incomplete_data_) {
                    var i = new Uint8Array(e.byteLength + this.aac_last_incomplete_data_.byteLength);
                    i.set(this.aac_last_incomplete_data_, 0), i.set(e, this.aac_last_incomplete_data_.byteLength), 
                    e = i;
                }
                var n, a;
                if (null != t && (a = t / this.timescale_), "aac" === this.audio_metadata_.codec) {
                    if (null == t && null != this.aac_last_sample_pts_) n = 1024 / this.audio_metadata_.sampling_frequency * 1e3, 
                    a = this.aac_last_sample_pts_ + n; else if (null == t) return void r.a.w(this.TAG, "AAC: Unknown pts");
                    if (this.aac_last_incomplete_data_ && this.aac_last_sample_pts_) {
                        n = 1024 / this.audio_metadata_.sampling_frequency * 1e3;
                        var s = this.aac_last_sample_pts_ + n;
                        Math.abs(s - a) > 1 && (r.a.w(this.TAG, "AAC: Detected pts overlapped, expected: " + s + "ms, PES pts: " + a + "ms"), 
                        a = s);
                    }
                }
                for (var o, d = new z(e), _ = null, h = a; null != (_ = d.readNextAACFrame()); ) {
                    n = 1024 / _.sampling_frequency * 1e3;
                    var c = {
                        codec: "aac",
                        data: _
                    };
                    0 == this.audio_init_segment_dispatched_ ? (this.audio_metadata_ = {
                        codec: "aac",
                        audio_object_type: _.audio_object_type,
                        sampling_freq_index: _.sampling_freq_index,
                        sampling_frequency: _.sampling_frequency,
                        channel_config: _.channel_config
                    }, this.dispatchAudioInitSegment(c)) : this.detectAudioMetadataChange(c) && (this.dispatchAudioMediaSegment(), 
                    this.dispatchAudioInitSegment(c)), o = h;
                    var u = Math.floor(h), l = {
                        unit: _.data,
                        length: _.data.byteLength,
                        pts: u,
                        dts: u
                    };
                    this.audio_track_.samples.push(l), this.audio_track_.length += _.data.byteLength, 
                    h += n;
                }
                d.hasIncompleteData() && (this.aac_last_incomplete_data_ = d.getIncompleteData()), 
                o && (this.aac_last_sample_pts_ = o);
            }
        }, t.prototype.parseLOASAACPayload = function(e, t) {
            var i;
            if (!this.has_video_ || this.video_init_segment_dispatched_) {
                if (this.aac_last_incomplete_data_) {
                    var n = new Uint8Array(e.byteLength + this.aac_last_incomplete_data_.byteLength);
                    n.set(this.aac_last_incomplete_data_, 0), n.set(e, this.aac_last_incomplete_data_.byteLength), 
                    e = n;
                }
                var a, s;
                if (null != t && (s = t / this.timescale_), "aac" === this.audio_metadata_.codec) {
                    if (null == t && null != this.aac_last_sample_pts_) a = 1024 / this.audio_metadata_.sampling_frequency * 1e3, 
                    s = this.aac_last_sample_pts_ + a; else if (null == t) return void r.a.w(this.TAG, "AAC: Unknown pts");
                    if (this.aac_last_incomplete_data_ && this.aac_last_sample_pts_) {
                        a = 1024 / this.audio_metadata_.sampling_frequency * 1e3;
                        var o = this.aac_last_sample_pts_ + a;
                        Math.abs(o - s) > 1 && (r.a.w(this.TAG, "AAC: Detected pts overlapped, expected: " + o + "ms, PES pts: " + s + "ms"), 
                        s = o);
                    }
                }
                for (var d, _ = new H(e), h = null, c = s; null != (h = _.readNextAACFrame(null !== (i = this.loas_previous_frame) && void 0 !== i ? i : void 0)); ) {
                    this.loas_previous_frame = h, a = 1024 / h.sampling_frequency * 1e3;
                    var u = {
                        codec: "aac",
                        data: h
                    };
                    0 == this.audio_init_segment_dispatched_ ? (this.audio_metadata_ = {
                        codec: "aac",
                        audio_object_type: h.audio_object_type,
                        sampling_freq_index: h.sampling_freq_index,
                        sampling_frequency: h.sampling_frequency,
                        channel_config: h.channel_config
                    }, this.dispatchAudioInitSegment(u)) : this.detectAudioMetadataChange(u) && (this.dispatchAudioMediaSegment(), 
                    this.dispatchAudioInitSegment(u)), d = c;
                    var l = Math.floor(c), f = {
                        unit: h.data,
                        length: h.data.byteLength,
                        pts: l,
                        dts: l
                    };
                    this.audio_track_.samples.push(f), this.audio_track_.length += h.data.byteLength, 
                    c += a;
                }
                _.hasIncompleteData() && (this.aac_last_incomplete_data_ = _.getIncompleteData()), 
                d && (this.aac_last_sample_pts_ = d);
            }
        }, t.prototype.parseAC3Payload = function(e, t) {
            if (!this.has_video_ || this.video_init_segment_dispatched_) {
                var i, n;
                if (null != t && (n = t / this.timescale_), "ac-3" === this.audio_metadata_.codec) if (null == t && null != this.aac_last_sample_pts_) i = 1536 / this.audio_metadata_.sampling_frequency * 1e3, 
                n = this.aac_last_sample_pts_ + i; else if (null == t) return void r.a.w(this.TAG, "Opus: Unknown pts");
                for (var a, s = new me(e), o = null, d = n; null != (o = s.readNextAC3Frame()); ) {
                    i = 1536 / o.sampling_frequency * 1e3;
                    var _ = {
                        codec: "ac-3",
                        data: o
                    };
                    0 == this.audio_init_segment_dispatched_ ? (this.audio_metadata_ = {
                        codec: "ac-3",
                        sampling_frequency: o.sampling_frequency,
                        bit_stream_identification: o.bit_stream_identification,
                        bit_stream_mode: o.bit_stream_mode,
                        low_frequency_effects_channel_on: o.low_frequency_effects_channel_on,
                        channel_mode: o.channel_mode
                    }, console.log(JSON.stringify(this.audio_metadata_)), this.dispatchAudioInitSegment(_)) : this.detectAudioMetadataChange(_) && (this.dispatchAudioMediaSegment(), 
                    this.dispatchAudioInitSegment(_)), a = d;
                    var h = Math.floor(d), c = {
                        unit: o.data,
                        length: o.data.byteLength,
                        pts: h,
                        dts: h
                    };
                    this.audio_track_.samples.push(c), this.audio_track_.length += o.data.byteLength, 
                    d += i;
                }
                a && (this.aac_last_sample_pts_ = a);
            }
        }, t.prototype.parseOpusPayload = function(e, t) {
            if (!this.has_video_ || this.video_init_segment_dispatched_) {
                var i, n;
                if (null != t && (n = t / this.timescale_), "opus" === this.audio_metadata_.codec) if (null == t && null != this.aac_last_sample_pts_) i = 20, 
                n = this.aac_last_sample_pts_ + i; else if (null == t) return void r.a.w(this.TAG, "Opus: Unknown pts");
                for (var a, s = n, o = 0; o < e.length; ) {
                    i = 20;
                    for (var d = 0 != (16 & e[o + 1]), _ = 0 != (8 & e[o + 1]), h = o + 2, c = 0; 255 === e[h]; ) c += 255, 
                    h += 1;
                    c += e[h], h += 1, h += d ? 2 : 0, h += _ ? 2 : 0, a = s;
                    var u = Math.floor(s), l = e.slice(h, h + c), f = {
                        unit: l,
                        length: l.byteLength,
                        pts: u,
                        dts: u
                    };
                    this.audio_track_.samples.push(f), this.audio_track_.length += l.byteLength, s += i, 
                    o = h + c;
                }
                a && (this.aac_last_sample_pts_ = a);
            }
        }, t.prototype.parseMP3Payload = function(e, t) {
            if (!this.has_video_ || this.video_init_segment_dispatched_) {
                var i = [ 0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1 ], n = [ 0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1 ], a = [ 0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1 ], r = e[1] >>> 3 & 3, s = (6 & e[1]) >> 1, o = (240 & e[2]) >>> 4, d = (12 & e[2]) >>> 2, _ = 3 != (e[3] >>> 6 & 3) ? 2 : 1, h = 0, c = 34;
                switch (r) {
                  case 0:
                    h = [ 11025, 12e3, 8e3, 0 ][d];
                    break;

                  case 2:
                    h = [ 22050, 24e3, 16e3, 0 ][d];
                    break;

                  case 3:
                    h = [ 44100, 48e3, 32e3, 0 ][d];
                }
                switch (s) {
                  case 1:
                    c = 34, o < a.length && a[o];
                    break;

                  case 2:
                    c = 33, o < n.length && n[o];
                    break;

                  case 3:
                    c = 32, o < i.length && i[o];
                }
                var u = new le;
                u.object_type = c, u.sample_rate = h, u.channel_count = _, u.data = e;
                var l = {
                    codec: "mp3",
                    data: u
                };
                0 == this.audio_init_segment_dispatched_ ? (this.audio_metadata_ = {
                    codec: "mp3",
                    object_type: c,
                    sample_rate: h,
                    channel_count: _
                }, this.dispatchAudioInitSegment(l)) : this.detectAudioMetadataChange(l) && (this.dispatchAudioMediaSegment(), 
                this.dispatchAudioInitSegment(l));
                var f = {
                    unit: e,
                    length: e.byteLength,
                    pts: t / this.timescale_,
                    dts: t / this.timescale_
                };
                this.audio_track_.samples.push(f), this.audio_track_.length += e.byteLength;
            }
        }, t.prototype.detectAudioMetadataChange = function(e) {
            if (e.codec !== this.audio_metadata_.codec) return r.a.v(this.TAG, "Audio: Audio Codecs changed from " + this.audio_metadata_.codec + " to " + e.codec), 
            !0;
            if ("aac" === e.codec && "aac" === this.audio_metadata_.codec) {
                if ((t = e.data).audio_object_type !== this.audio_metadata_.audio_object_type) return r.a.v(this.TAG, "AAC: AudioObjectType changed from " + this.audio_metadata_.audio_object_type + " to " + t.audio_object_type), 
                !0;
                if (t.sampling_freq_index !== this.audio_metadata_.sampling_freq_index) return r.a.v(this.TAG, "AAC: SamplingFrequencyIndex changed from " + this.audio_metadata_.sampling_freq_index + " to " + t.sampling_freq_index), 
                !0;
                if (t.channel_config !== this.audio_metadata_.channel_config) return r.a.v(this.TAG, "AAC: Channel configuration changed from " + this.audio_metadata_.channel_config + " to " + t.channel_config), 
                !0;
            } else if ("ac-3" === e.codec && "ac-3" === this.audio_metadata_.codec) {
                var t;
                if ((t = e.data).sampling_frequency !== this.audio_metadata_.sampling_frequency) return r.a.v(this.TAG, "AC3: Sampling Frequency changed from " + this.audio_metadata_.sampling_frequency + " to " + t.sampling_frequency), 
                !0;
                if (t.bit_stream_identification !== this.audio_metadata_.bit_stream_identification) return r.a.v(this.TAG, "AC3: Bit Stream Identification changed from " + this.audio_metadata_.bit_stream_identification + " to " + t.bit_stream_identification), 
                !0;
                if (t.bit_stream_mode !== this.audio_metadata_.bit_stream_mode) return r.a.v(this.TAG, "AC3: BitStream Mode changed from " + this.audio_metadata_.bit_stream_mode + " to " + t.bit_stream_mode), 
                !0;
                if (t.channel_mode !== this.audio_metadata_.channel_mode) return r.a.v(this.TAG, "AC3: Channel Mode changed from " + this.audio_metadata_.channel_mode + " to " + t.channel_mode), 
                !0;
                if (t.low_frequency_effects_channel_on !== this.audio_metadata_.low_frequency_effects_channel_on) return r.a.v(this.TAG, "AC3: Low Frequency Effects Channel On changed from " + this.audio_metadata_.low_frequency_effects_channel_on + " to " + t.low_frequency_effects_channel_on), 
                !0;
            } else if ("opus" === e.codec && "opus" === this.audio_metadata_.codec) {
                if ((i = e.meta).sample_rate !== this.audio_metadata_.sample_rate) return r.a.v(this.TAG, "Opus: SamplingFrequencyIndex changed from " + this.audio_metadata_.sample_rate + " to " + i.sample_rate), 
                !0;
                if (i.channel_count !== this.audio_metadata_.channel_count) return r.a.v(this.TAG, "Opus: Channel count changed from " + this.audio_metadata_.channel_count + " to " + i.channel_count), 
                !0;
            } else if ("mp3" === e.codec && "mp3" === this.audio_metadata_.codec) {
                var i;
                if ((i = e.data).object_type !== this.audio_metadata_.object_type) return r.a.v(this.TAG, "MP3: AudioObjectType changed from " + this.audio_metadata_.object_type + " to " + i.object_type), 
                !0;
                if (i.sample_rate !== this.audio_metadata_.sample_rate) return r.a.v(this.TAG, "MP3: SamplingFrequencyIndex changed from " + this.audio_metadata_.sample_rate + " to " + i.sample_rate), 
                !0;
                if (i.channel_count !== this.audio_metadata_.channel_count) return r.a.v(this.TAG, "MP3: Channel count changed from " + this.audio_metadata_.channel_count + " to " + i.channel_count), 
                !0;
            }
            return !1;
        }, t.prototype.dispatchAudioInitSegment = function(e) {
            var t = {
                type: "audio"
            };
            if (t.id = this.audio_track_.id, t.timescale = 1e3, t.duration = this.duration_, 
            "aac" === this.audio_metadata_.codec) {
                var i = "aac" === e.codec ? e.data : null, n = new q(i);
                t.audioSampleRate = n.sampling_rate, t.channelCount = n.channel_count, t.codec = n.codec_mimetype, 
                t.originalCodec = n.original_codec_mimetype, t.config = n.config, t.refSampleDuration = 1024 / t.audioSampleRate * t.timescale;
            } else if ("ac-3" === this.audio_metadata_.codec) {
                var a = "ac-3" === e.codec ? e.data : null, s = new ge(a);
                t.audioSampleRate = s.sampling_rate, t.channelCount = s.channel_count, t.codec = s.codec_mimetype, 
                t.originalCodec = s.original_codec_mimetype, t.config = s.config, t.refSampleDuration = 1536 / t.audioSampleRate * t.timescale;
            } else "opus" === this.audio_metadata_.codec ? (t.audioSampleRate = this.audio_metadata_.sample_rate, 
            t.channelCount = this.audio_metadata_.channel_count, t.channelConfigCode = this.audio_metadata_.channel_config_code, 
            t.codec = "opus", t.originalCodec = "opus", t.config = void 0, t.refSampleDuration = 20) : "mp3" === this.audio_metadata_.codec && (t.audioSampleRate = this.audio_metadata_.sample_rate, 
            t.channelCount = this.audio_metadata_.channel_count, t.codec = "mp3", t.originalCodec = "mp3", 
            t.config = void 0);
            0 == this.audio_init_segment_dispatched_ && r.a.v(this.TAG, "Generated first AudioSpecificConfig for mimeType: " + t.codec), 
            this.onTrackMetadata("audio", t), this.audio_init_segment_dispatched_ = !0, this.video_metadata_changed_ = !1;
            var o = this.media_info_;
            o.hasAudio = !0, o.audioCodec = t.originalCodec, o.audioSampleRate = t.audioSampleRate, 
            o.audioChannelCount = t.channelCount, o.hasVideo && o.videoCodec ? o.mimeType = 'video/mp2t; codecs="' + o.videoCodec + "," + o.audioCodec + '"' : o.mimeType = 'video/mp2t; codecs="' + o.audioCodec + '"', 
            o.isComplete() && this.onMediaInfo(o);
        }, t.prototype.dispatchPESPrivateDataDescriptor = function(e, t, i) {
            var n = new W;
            n.pid = e, n.stream_type = t, n.descriptor = i, this.onPESPrivateDataDescriptor && this.onPESPrivateDataDescriptor(n);
        }, t.prototype.parsePESPrivateDataPayload = function(e, t, i, n, a) {
            var r = new K;
            if (r.pid = n, r.stream_id = a, r.len = e.byteLength, r.data = e, null != t) {
                var s = Math.floor(t / this.timescale_);
                r.pts = s;
            } else r.nearest_pts = this.aac_last_sample_pts_;
            if (null != i) {
                var o = Math.floor(i / this.timescale_);
                r.dts = o;
            }
            this.onPESPrivateData && this.onPESPrivateData(r);
        }, t.prototype.parseTimedID3MetadataPayload = function(e, t, i, n, a) {
            var r = new K;
            if (r.pid = n, r.stream_id = a, r.len = e.byteLength, r.data = e, null != t) {
                var s = Math.floor(t / this.timescale_);
                r.pts = s;
            }
            if (null != i) {
                var o = Math.floor(i / this.timescale_);
                r.dts = o;
            }
            this.onTimedID3Metadata && this.onTimedID3Metadata(r);
        }, t.prototype.parseSMPTE2038MetadataPayload = function(e, t, i, n, a) {
            var r = new ue;
            if (r.pid = n, r.stream_id = a, r.len = e.byteLength, r.data = e, null != t) {
                var s = Math.floor(t / this.timescale_);
                r.pts = s;
            }
            if (r.nearest_pts = this.aac_last_sample_pts_, null != i) {
                var o = Math.floor(i / this.timescale_);
                r.dts = o;
            }
            r.ancillaries = function(e) {
                for (var t = new f(e), i = 0, n = []; i += 6, 0 === t.readBits(6); ) {
                    var a = t.readBool();
                    i += 1;
                    var r = t.readBits(11);
                    i += 11;
                    var s = t.readBits(12);
                    i += 12;
                    var o = 255 & t.readBits(10);
                    i += 10;
                    var d = 255 & t.readBits(10);
                    i += 10;
                    var _ = 255 & t.readBits(10);
                    i += 10;
                    for (var h = new Uint8Array(_), c = 0; c < _; c++) {
                        var u = 255 & t.readBits(10);
                        i += 10, h[c] = u;
                    }
                    t.readBits(10), i += 10;
                    var l = "User Defined";
                    65 === o ? 7 === d && (l = "SCTE-104") : 95 === o ? 220 === d ? l = "ARIB STD-B37 (1SEG)" : 221 === d ? l = "ARIB STD-B37 (ANALOG)" : 222 === d ? l = "ARIB STD-B37 (SD)" : 223 === d && (l = "ARIB STD-B37 (HD)") : 97 === o && (1 === d ? l = "EIA-708" : 2 === d && (l = "EIA-608")), 
                    n.push({
                        yc_indicator: a,
                        line_number: r,
                        horizontal_offset: s,
                        did: o,
                        sdid: d,
                        user_data: h,
                        description: l,
                        information: {}
                    }), t.readBits(8 - (i - Math.floor(i / 8)) % 8), i += (8 - (i - Math.floor(i / 8))) % 8;
                }
                return t.destroy(), t = null, n;
            }(e), this.onSMPTE2038Metadata && this.onSMPTE2038Metadata(r);
        }, t;
    }(R), Se = function() {
        for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
        var n = Array(e), a = 0;
        for (t = 0; t < i; t++) for (var r = arguments[t], s = 0, o = r.length; s < o; s++, 
        a++) n[a] = r[s];
        return n;
    }, Ee = function() {
        function e() {}
        return e.init = function() {
            for (var t in e.types = {
                avc1: [],
                avcC: [],
                btrt: [],
                dinf: [],
                dref: [],
                esds: [],
                ftyp: [],
                hdlr: [],
                hvc1: [],
                hvcC: [],
                mdat: [],
                mdhd: [],
                mdia: [],
                mfhd: [],
                minf: [],
                moof: [],
                moov: [],
                mp4a: [],
                mvex: [],
                mvhd: [],
                sdtp: [],
                stbl: [],
                stco: [],
                stsc: [],
                stsd: [],
                stsz: [],
                stts: [],
                tfdt: [],
                tfhd: [],
                traf: [],
                trak: [],
                trun: [],
                trex: [],
                tkhd: [],
                vmhd: [],
                smhd: [],
                ".mp3": [],
                Opus: [],
                dOps: [],
                "ac-3": [],
                dac3: []
            }, e.types) e.types.hasOwnProperty(t) && (e.types[t] = [ t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3) ]);
            var i = e.constants = {};
            i.FTYP = new Uint8Array([ 105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49 ]), 
            i.STSD_PREFIX = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1 ]), i.STTS = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]), 
            i.STSC = i.STCO = i.STTS, i.STSZ = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]), 
            i.HDLR_VIDEO = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0 ]), 
            i.HDLR_AUDIO = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0 ]), 
            i.DREF = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1 ]), 
            i.SMHD = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]), i.VMHD = new Uint8Array([ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ]);
        }, e.box = function(e) {
            for (var t = 8, i = null, n = Array.prototype.slice.call(arguments, 1), a = n.length, r = 0; r < a; r++) t += n[r].byteLength;
            (i = new Uint8Array(t))[0] = t >>> 24 & 255, i[1] = t >>> 16 & 255, i[2] = t >>> 8 & 255, 
            i[3] = 255 & t, i.set(e, 4);
            var s = 8;
            for (r = 0; r < a; r++) i.set(n[r], s), s += n[r].byteLength;
            return i;
        }, e.generateInitSegment = function(t) {
            var i = e.box(e.types.ftyp, e.constants.FTYP), n = e.moov(t), a = new Uint8Array(i.byteLength + n.byteLength);
            return a.set(i, 0), a.set(n, i.byteLength), a;
        }, e.moov = function(t) {
            var i = e.mvhd(t.timescale, t.duration), n = e.trak(t), a = e.mvex(t);
            return e.box(e.types.moov, i, n, a);
        }, e.mvhd = function(t, i) {
            return e.box(e.types.mvhd, new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255 ]));
        }, e.trak = function(t) {
            return e.box(e.types.trak, e.tkhd(t), e.mdia(t));
        }, e.tkhd = function(t) {
            var i = t.id, n = t.duration, a = t.presentWidth, r = t.presentHeight;
            return e.box(e.types.tkhd, new Uint8Array([ 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >>> 8 & 255, 255 & a, 0, 0, r >>> 8 & 255, 255 & r, 0, 0 ]));
        }, e.mdia = function(t) {
            return e.box(e.types.mdia, e.mdhd(t), e.hdlr(t), e.minf(t));
        }, e.mdhd = function(t) {
            var i = t.timescale, n = t.duration;
            return e.box(e.types.mdhd, new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 85, 196, 0, 0 ]));
        }, e.hdlr = function(t) {
            var i = null;
            return i = "audio" === t.type ? e.constants.HDLR_AUDIO : e.constants.HDLR_VIDEO, 
            e.box(e.types.hdlr, i);
        }, e.minf = function(t) {
            var i = null;
            return i = "audio" === t.type ? e.box(e.types.smhd, e.constants.SMHD) : e.box(e.types.vmhd, e.constants.VMHD), 
            e.box(e.types.minf, i, e.dinf(), e.stbl(t));
        }, e.dinf = function() {
            return e.box(e.types.dinf, e.box(e.types.dref, e.constants.DREF));
        }, e.stbl = function(t) {
            return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.constants.STTS), e.box(e.types.stsc, e.constants.STSC), e.box(e.types.stsz, e.constants.STSZ), e.box(e.types.stco, e.constants.STCO));
        }, e.stsd = function(t) {
            return "audio" === t.type ? "mp3" === t.codec ? e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp3(t)) : "ac-3" === t.codec ? e.box(e.types.stsd, e.constants.STSD_PREFIX, e.ac3(t)) : "opus" === t.codec ? e.box(e.types.stsd, e.constants.STSD_PREFIX, e.Opus(t)) : e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp4a(t)) : "video" === t.type && t.codec.startsWith("hvc1") ? e.box(e.types.stsd, e.constants.STSD_PREFIX, e.hvc1(t)) : e.box(e.types.stsd, e.constants.STSD_PREFIX, e.avc1(t));
        }, e.mp3 = function(t) {
            var i = t.channelCount, n = t.audioSampleRate, a = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0 ]);
            return e.box(e.types[".mp3"], a);
        }, e.mp4a = function(t) {
            var i = t.channelCount, n = t.audioSampleRate, a = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0 ]);
            return e.box(e.types.mp4a, a, e.esds(t));
        }, e.ac3 = function(t) {
            var i = t.channelCount, n = t.audioSampleRate, a = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0 ]);
            return e.box(e.types["ac-3"], a, e.box(e.types.dac3, new Uint8Array(t.config)));
        }, e.esds = function(t) {
            var i = t.config || [], n = i.length, a = new Uint8Array([ 0, 0, 0, 0, 3, 23 + n, 0, 1, 0, 4, 15 + n, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5 ].concat([ n ]).concat(i).concat([ 6, 1, 2 ]));
            return e.box(e.types.esds, a);
        }, e.Opus = function(t) {
            var i = t.channelCount, n = t.audioSampleRate, a = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0 ]);
            return e.box(e.types.Opus, a, e.dOps(t));
        }, e.dOps = function(t) {
            var i = t.channelCount, n = t.channelConfigCode, a = t.audioSampleRate;
            if (t.config) return e.box(e.types.dOps, s);
            var r = [];
            switch (n) {
              case 1:
              case 2:
                r = [ 0 ];
                break;

              case 0:
                r = [ 255, 1, 1, 0, 1 ];
                break;

              case 128:
                r = [ 255, 2, 0, 0, 1 ];
                break;

              case 3:
                r = [ 1, 2, 1, 0, 2, 1 ];
                break;

              case 4:
                r = [ 1, 2, 2, 0, 1, 2, 3 ];
                break;

              case 5:
                r = [ 1, 3, 2, 0, 4, 1, 2, 3 ];
                break;

              case 6:
                r = [ 1, 4, 2, 0, 4, 1, 2, 3, 5 ];
                break;

              case 7:
                r = [ 1, 4, 2, 0, 4, 1, 2, 3, 5, 6 ];
                break;

              case 8:
                r = [ 1, 5, 3, 0, 6, 1, 2, 3, 4, 5, 7 ];
                break;

              case 130:
                r = [ 1, 1, 2, 0, 1 ];
                break;

              case 131:
                r = [ 1, 1, 3, 0, 1, 2 ];
                break;

              case 132:
                r = [ 1, 1, 4, 0, 1, 2, 3 ];
                break;

              case 133:
                r = [ 1, 1, 5, 0, 1, 2, 3, 4 ];
                break;

              case 134:
                r = [ 1, 1, 6, 0, 1, 2, 3, 4, 5 ];
                break;

              case 135:
                r = [ 1, 1, 7, 0, 1, 2, 3, 4, 5, 6 ];
                break;

              case 136:
                r = [ 1, 1, 8, 0, 1, 2, 3, 4, 5, 6, 7 ];
            }
            var s = new Uint8Array(Se([ 0, i, 0, 0, a >>> 24 & 255, a >>> 17 & 255, a >>> 8 & 255, a >>> 0 & 255, 0, 0 ], r));
            return e.box(e.types.dOps, s);
        }, e.avc1 = function(t) {
            var i = t.avcc, n = t.codecWidth, a = t.codecHeight, r = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, a >>> 8 & 255, 255 & a, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 10, 120, 113, 113, 47, 102, 108, 118, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255 ]);
            return e.box(e.types.avc1, r, e.box(e.types.avcC, i));
        }, e.hvc1 = function(t) {
            var i = t.hvcc, n = t.codecWidth, a = t.codecHeight, r = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, a >>> 8 & 255, 255 & a, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 10, 120, 113, 113, 47, 102, 108, 118, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255 ]);
            return e.box(e.types.hvc1, r, e.box(e.types.hvcC, i));
        }, e.mvex = function(t) {
            return e.box(e.types.mvex, e.trex(t));
        }, e.trex = function(t) {
            var i = t.id, n = new Uint8Array([ 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ]);
            return e.box(e.types.trex, n);
        }, e.moof = function(t, i) {
            return e.box(e.types.moof, e.mfhd(t.sequenceNumber), e.traf(t, i));
        }, e.mfhd = function(t) {
            var i = new Uint8Array([ 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t ]);
            return e.box(e.types.mfhd, i);
        }, e.traf = function(t, i) {
            var n = t.id, a = e.box(e.types.tfhd, new Uint8Array([ 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n ])), r = e.box(e.types.tfdt, new Uint8Array([ 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i ])), s = e.sdtp(t), o = e.trun(t, s.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
            return e.box(e.types.traf, a, r, o, s);
        }, e.sdtp = function(t) {
            for (var i = t.samples || [], n = i.length, a = new Uint8Array(4 + n), r = 0; r < n; r++) {
                var s = i[r].flags;
                a[r + 4] = s.isLeading << 6 | s.dependsOn << 4 | s.isDependedOn << 2 | s.hasRedundancy;
            }
            return e.box(e.types.sdtp, a);
        }, e.trun = function(t, i) {
            var n = t.samples || [], a = n.length, r = 12 + 16 * a, s = new Uint8Array(r);
            i += 8 + r, s.set([ 0, 0, 15, 1, a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, 255 & a, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i ], 0);
            for (var o = 0; o < a; o++) {
                var d = n[o].duration, _ = n[o].size, h = n[o].flags, c = n[o].cts;
                s.set([ d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, _ >>> 24 & 255, _ >>> 16 & 255, _ >>> 8 & 255, 255 & _, h.isLeading << 2 | h.dependsOn, h.isDependedOn << 6 | h.hasRedundancy << 4 | h.isNonSync, 0, 0, c >>> 24 & 255, c >>> 16 & 255, c >>> 8 & 255, 255 & c ], 12 + 16 * o);
            }
            return e.box(e.types.trun, s);
        }, e.mdat = function(t) {
            return e.box(e.types.mdat, t);
        }, e;
    }();
    Ee.init();
    var Ae = Ee, Re = function() {
        function e() {}
        return e.getSilentFrame = function(e, t) {
            if ("mp4a.40.2" === e) {
                if (1 === t) return new Uint8Array([ 0, 200, 0, 128, 35, 128 ]);
                if (2 === t) return new Uint8Array([ 33, 0, 73, 144, 2, 25, 0, 35, 128 ]);
                if (3 === t) return new Uint8Array([ 0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142 ]);
                if (4 === t) return new Uint8Array([ 0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56 ]);
                if (5 === t) return new Uint8Array([ 0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56 ]);
                if (6 === t) return new Uint8Array([ 0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224 ]);
            } else {
                if (1 === t) return new Uint8Array([ 1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94 ]);
                if (2 === t) return new Uint8Array([ 1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94 ]);
                if (3 === t) return new Uint8Array([ 1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94 ]);
            }
            return null;
        }, e;
    }(), Te = i(7), Le = function() {
        function e(e) {
            this.TAG = "MP4Remuxer", this._config = e, this._isLive = !0 === e.isLive, this._dtsBase = -1, 
            this._dtsBaseInited = !1, this._audioDtsBase = 1 / 0, this._videoDtsBase = 1 / 0, 
            this._audioNextDts = void 0, this._videoNextDts = void 0, this._audioStashedLastSample = null, 
            this._videoStashedLastSample = null, this._audioMeta = null, this._videoMeta = null, 
            this._audioSegmentInfoList = new Te.c("audio"), this._videoSegmentInfoList = new Te.c("video"), 
            this._onInitSegment = null, this._onMediaSegment = null, this._forceFirstIDR = !(!s.a.chrome || !(s.a.version.major < 50 || 50 === s.a.version.major && s.a.version.build < 2661)), 
            this._fillSilentAfterSeek = s.a.msedge || s.a.msie, this._mp3UseMpegAudio = !s.a.firefox, 
            this._fillAudioTimestampGap = this._config.fixAudioTimestampGap;
        }
        return e.prototype.destroy = function() {
            this._dtsBase = -1, this._dtsBaseInited = !1, this._audioMeta = null, this._videoMeta = null, 
            this._audioSegmentInfoList.clear(), this._audioSegmentInfoList = null, this._videoSegmentInfoList.clear(), 
            this._videoSegmentInfoList = null, this._onInitSegment = null, this._onMediaSegment = null;
        }, e.prototype.bindDataSource = function(e) {
            return e.onDataAvailable = this.remux.bind(this), e.onTrackMetadata = this._onTrackMetadataReceived.bind(this), 
            this;
        }, Object.defineProperty(e.prototype, "onInitSegment", {
            get: function() {
                return this._onInitSegment;
            },
            set: function(e) {
                this._onInitSegment = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onMediaSegment", {
            get: function() {
                return this._onMediaSegment;
            },
            set: function(e) {
                this._onMediaSegment = e;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.insertDiscontinuity = function() {
            this._audioNextDts = this._videoNextDts = void 0;
        }, e.prototype.seek = function(e) {
            this._audioStashedLastSample = null, this._videoStashedLastSample = null, this._videoSegmentInfoList.clear(), 
            this._audioSegmentInfoList.clear();
        }, e.prototype.remux = function(e, t) {
            if (!this._onMediaSegment) throw new c.a("MP4Remuxer: onMediaSegment callback must be specificed!");
            this._dtsBaseInited || this._calculateDtsBase(e, t), t && this._remuxVideo(t), e && this._remuxAudio(e);
        }, e.prototype._onTrackMetadataReceived = function(e, t) {
            var i = null, n = "mp4", a = t.codec;
            if ("audio" === e) this._audioMeta = t, "mp3" === t.codec && this._mp3UseMpegAudio ? (n = "mpeg", 
            a = "", i = new Uint8Array) : i = Ae.generateInitSegment(t); else {
                if ("video" !== e) return;
                this._videoMeta = t, i = Ae.generateInitSegment(t);
            }
            if (!this._onInitSegment) throw new c.a("MP4Remuxer: onInitSegment callback must be specified!");
            this._onInitSegment(e, {
                type: e,
                data: i.buffer,
                codec: a,
                container: e + "/" + n,
                mediaDuration: t.duration
            });
        }, e.prototype._calculateDtsBase = function(e, t) {
            this._dtsBaseInited || (e && e.samples && e.samples.length && (this._audioDtsBase = e.samples[0].dts), 
            t && t.samples && t.samples.length && (this._videoDtsBase = t.samples[0].dts), this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase), 
            this._dtsBaseInited = !0);
        }, e.prototype.getTimestampBase = function() {
            if (this._dtsBaseInited) return this._dtsBase;
        }, e.prototype.flushStashedSamples = function() {
            var e = this._videoStashedLastSample, t = this._audioStashedLastSample, i = {
                type: "video",
                id: 1,
                sequenceNumber: 0,
                samples: [],
                length: 0
            };
            null != e && (i.samples.push(e), i.length = e.length);
            var n = {
                type: "audio",
                id: 2,
                sequenceNumber: 0,
                samples: [],
                length: 0
            };
            null != t && (n.samples.push(t), n.length = t.length), this._videoStashedLastSample = null, 
            this._audioStashedLastSample = null, this._remuxVideo(i, !0), this._remuxAudio(n, !0);
        }, e.prototype._remuxAudio = function(e, t) {
            if (null != this._audioMeta) {
                var i, n = e, a = n.samples, o = void 0, d = -1, _ = this._audioMeta.refSampleDuration, h = "mp3" === this._audioMeta.codec && this._mp3UseMpegAudio, c = this._dtsBaseInited && void 0 === this._audioNextDts, u = !1;
                if (a && 0 !== a.length && (1 !== a.length || t)) {
                    var l = 0, f = null, p = 0;
                    h ? (l = 0, p = n.length) : (l = 8, p = 8 + n.length);
                    var m = null;
                    if (a.length > 1 && (p -= (m = a.pop()).length), null != this._audioStashedLastSample) {
                        var g = this._audioStashedLastSample;
                        this._audioStashedLastSample = null, a.unshift(g), p += g.length;
                    }
                    null != m && (this._audioStashedLastSample = m);
                    var v = a[0].dts - this._dtsBase;
                    if (this._audioNextDts) o = v - this._audioNextDts; else if (this._audioSegmentInfoList.isEmpty()) o = 0, 
                    this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty() && "mp3" !== this._audioMeta.originalCodec && (u = !0); else {
                        var y = this._audioSegmentInfoList.getLastSampleBefore(v);
                        if (null != y) {
                            var b = v - (y.originalDts + y.duration);
                            b <= 3 && (b = 0), o = v - (y.dts + y.duration + b);
                        } else o = 0;
                    }
                    if (u) {
                        var S = v - o, E = this._videoSegmentInfoList.getLastSegmentBefore(v);
                        if (null != E && E.beginDts < S) {
                            if (O = Re.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount)) {
                                var A = E.beginDts, R = S - E.beginDts;
                                r.a.v(this.TAG, "InsertPrefixSilentAudio: dts: " + A + ", duration: " + R), a.unshift({
                                    unit: O,
                                    dts: A,
                                    pts: A
                                }), p += O.byteLength;
                            }
                        } else u = !1;
                    }
                    for (var T = [], L = 0; L < a.length; L++) {
                        var w = (g = a[L]).unit, k = g.dts - this._dtsBase, D = (A = k, !1), C = null, B = 0;
                        if (!(k < -.001)) {
                            if ("mp3" !== this._audioMeta.codec) {
                                var I = k;
                                if (this._audioNextDts && (I = this._audioNextDts), (o = k - I) <= -3 * _) {
                                    r.a.w(this.TAG, "Dropping 1 audio frame (originalDts: " + k + " ms ,curRefDts: " + I + " ms)  due to dtsCorrection: " + o + " ms overlap.");
                                    continue;
                                }
                                if (o >= 3 * _ && this._fillAudioTimestampGap && !s.a.safari) {
                                    D = !0;
                                    var O, P = Math.floor(o / _);
                                    r.a.w(this.TAG, "Large audio timestamp gap detected, may cause AV sync to drift. Silent frames will be generated to avoid unsync.\noriginalDts: " + k + " ms, curRefDts: " + I + " ms, dtsCorrection: " + Math.round(o) + " ms, generate: " + P + " frames"), 
                                    A = Math.floor(I), B = Math.floor(I + _) - A, null == (O = Re.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount)) && (r.a.w(this.TAG, "Unable to generate silent frame for " + this._audioMeta.originalCodec + " with " + this._audioMeta.channelCount + " channels, repeat last frame"), 
                                    O = w), C = [];
                                    for (var M = 0; M < P; M++) {
                                        I += _;
                                        var x = Math.floor(I), U = Math.floor(I + _) - x, N = {
                                            dts: x,
                                            pts: x,
                                            cts: 0,
                                            unit: O,
                                            size: O.byteLength,
                                            duration: U,
                                            originalDts: k,
                                            flags: {
                                                isLeading: 0,
                                                dependsOn: 1,
                                                isDependedOn: 0,
                                                hasRedundancy: 0
                                            }
                                        };
                                        C.push(N), p += N.size;
                                    }
                                    this._audioNextDts = I + _;
                                } else A = Math.floor(I), B = Math.floor(I + _) - A, this._audioNextDts = I + _;
                            } else A = k - o, B = L !== a.length - 1 ? a[L + 1].dts - this._dtsBase - o - A : null != m ? m.dts - this._dtsBase - o - A : T.length >= 1 ? T[T.length - 1].duration : Math.floor(_), 
                            this._audioNextDts = A + B;
                            -1 === d && (d = A), T.push({
                                dts: A,
                                pts: A,
                                cts: 0,
                                unit: g.unit,
                                size: g.unit.byteLength,
                                duration: B,
                                originalDts: k,
                                flags: {
                                    isLeading: 0,
                                    dependsOn: 1,
                                    isDependedOn: 0,
                                    hasRedundancy: 0
                                }
                            }), D && T.push.apply(T, C);
                        }
                    }
                    if (0 === T.length) return n.samples = [], void (n.length = 0);
                    for (h ? f = new Uint8Array(p) : ((f = new Uint8Array(p))[0] = p >>> 24 & 255, f[1] = p >>> 16 & 255, 
                    f[2] = p >>> 8 & 255, f[3] = 255 & p, f.set(Ae.types.mdat, 4)), L = 0; L < T.length; L++) w = T[L].unit, 
                    f.set(w, l), l += w.byteLength;
                    var G = T[T.length - 1];
                    i = G.dts + G.duration;
                    var V = new Te.b;
                    V.beginDts = d, V.endDts = i, V.beginPts = d, V.endPts = i, V.originalBeginDts = T[0].originalDts, 
                    V.originalEndDts = G.originalDts + G.duration, V.firstSample = new Te.d(T[0].dts, T[0].pts, T[0].duration, T[0].originalDts, !1), 
                    V.lastSample = new Te.d(G.dts, G.pts, G.duration, G.originalDts, !1), this._isLive || this._audioSegmentInfoList.append(V), 
                    n.samples = T, n.sequenceNumber++;
                    var F = null;
                    F = h ? new Uint8Array : Ae.moof(n, d), n.samples = [], n.length = 0;
                    var j = {
                        type: "audio",
                        data: this._mergeBoxes(F, f).buffer,
                        sampleCount: T.length,
                        info: V
                    };
                    h && c && (j.timestampOffset = d), this._onMediaSegment("audio", j);
                }
            }
        }, e.prototype._remuxVideo = function(e, t) {
            if (null != this._videoMeta) {
                var i, n, a = e, r = a.samples, s = void 0, o = -1, d = -1;
                if (r && 0 !== r.length && (1 !== r.length || t)) {
                    var _ = 8, h = null, c = 8 + e.length, u = null;
                    if (r.length > 1 && (c -= (u = r.pop()).length), null != this._videoStashedLastSample) {
                        var l = this._videoStashedLastSample;
                        this._videoStashedLastSample = null, r.unshift(l), c += l.length;
                    }
                    null != u && (this._videoStashedLastSample = u);
                    var f = r[0].dts - this._dtsBase;
                    if (this._videoNextDts) s = f - this._videoNextDts; else if (this._videoSegmentInfoList.isEmpty()) s = 0; else {
                        var p = this._videoSegmentInfoList.getLastSampleBefore(f);
                        if (null != p) {
                            var m = f - (p.originalDts + p.duration);
                            m <= 3 && (m = 0), s = f - (p.dts + p.duration + m);
                        } else s = 0;
                    }
                    for (var g = new Te.b, v = [], y = 0; y < r.length; y++) {
                        var b = (l = r[y]).dts - this._dtsBase, S = l.isKeyframe, E = b - s, A = l.cts, R = E + A;
                        -1 === o && (o = E, d = R);
                        var T = 0;
                        if (T = y !== r.length - 1 ? r[y + 1].dts - this._dtsBase - s - E : null != u ? u.dts - this._dtsBase - s - E : v.length >= 1 ? v[v.length - 1].duration : Math.floor(this._videoMeta.refSampleDuration), 
                        S) {
                            var L = new Te.d(E, R, T, l.dts, !0);
                            L.fileposition = l.fileposition, g.appendSyncPoint(L);
                        }
                        v.push({
                            dts: E,
                            pts: R,
                            cts: A,
                            units: l.units,
                            size: l.length,
                            isKeyframe: S,
                            duration: T,
                            originalDts: b,
                            flags: {
                                isLeading: 0,
                                dependsOn: S ? 2 : 1,
                                isDependedOn: S ? 1 : 0,
                                hasRedundancy: 0,
                                isNonSync: S ? 0 : 1
                            }
                        });
                    }
                    for ((h = new Uint8Array(c))[0] = c >>> 24 & 255, h[1] = c >>> 16 & 255, h[2] = c >>> 8 & 255, 
                    h[3] = 255 & c, h.set(Ae.types.mdat, 4), y = 0; y < v.length; y++) for (var w = v[y].units; w.length; ) {
                        var k = w.shift().data;
                        h.set(k, _), _ += k.byteLength;
                    }
                    var D = v[v.length - 1];
                    if (i = D.dts + D.duration, n = D.pts + D.duration, this._videoNextDts = i, g.beginDts = o, 
                    g.endDts = i, g.beginPts = d, g.endPts = n, g.originalBeginDts = v[0].originalDts, 
                    g.originalEndDts = D.originalDts + D.duration, g.firstSample = new Te.d(v[0].dts, v[0].pts, v[0].duration, v[0].originalDts, v[0].isKeyframe), 
                    g.lastSample = new Te.d(D.dts, D.pts, D.duration, D.originalDts, D.isKeyframe), 
                    this._isLive || this._videoSegmentInfoList.append(g), a.samples = v, a.sequenceNumber++, 
                    this._forceFirstIDR) {
                        var C = v[0].flags;
                        C.dependsOn = 2, C.isNonSync = 0;
                    }
                    var B = Ae.moof(a, o);
                    a.samples = [], a.length = 0, this._onMediaSegment("video", {
                        type: "video",
                        data: this._mergeBoxes(B, h).buffer,
                        sampleCount: v.length,
                        info: g
                    });
                }
            }
        }, e.prototype._mergeBoxes = function(e, t) {
            var i = new Uint8Array(e.byteLength + t.byteLength);
            return i.set(e, 0), i.set(t, e.byteLength), i;
        }, e;
    }(), we = i(11), ke = i(1), De = function() {
        function e(e, t) {
            this.TAG = "TransmuxingController", this._emitter = new a.a, this._config = t, e.segments || (e.segments = [ {
                duration: e.duration,
                filesize: e.filesize,
                url: e.url
            } ]), "boolean" != typeof e.cors && (e.cors = !0), "boolean" != typeof e.withCredentials && (e.withCredentials = !1), 
            this._mediaDataSource = e, this._currentSegmentIndex = 0;
            var i = 0;
            this._mediaDataSource.segments.forEach((function(n) {
                n.timestampBase = i, i += n.duration, n.cors = e.cors, n.withCredentials = e.withCredentials, 
                t.referrerPolicy && (n.referrerPolicy = t.referrerPolicy);
            })), isNaN(i) || this._mediaDataSource.duration === i || (this._mediaDataSource.duration = i), 
            this._mediaInfo = null, this._demuxer = null, this._remuxer = null, this._ioctl = null, 
            this._pendingSeekTime = null, this._pendingResolveSeekPoint = null, this._statisticsReporter = null;
        }
        return e.prototype.destroy = function() {
            this._mediaInfo = null, this._mediaDataSource = null, this._statisticsReporter && this._disableStatisticsReporter(), 
            this._ioctl && (this._ioctl.destroy(), this._ioctl = null), this._demuxer && (this._demuxer.destroy(), 
            this._demuxer = null), this._remuxer && (this._remuxer.destroy(), this._remuxer = null), 
            this._emitter.removeAllListeners(), this._emitter = null;
        }, e.prototype.on = function(e, t) {
            this._emitter.addListener(e, t);
        }, e.prototype.off = function(e, t) {
            this._emitter.removeListener(e, t);
        }, e.prototype.start = function() {
            this._loadSegment(0), this._enableStatisticsReporter();
        }, e.prototype._loadSegment = function(e, t) {
            this._currentSegmentIndex = e;
            var i = this._mediaDataSource.segments[e], n = this._ioctl = new we.a(i, this._config, e);
            n.onError = this._onIOException.bind(this), n.onSeeked = this._onIOSeeked.bind(this), 
            n.onComplete = this._onIOComplete.bind(this), n.onRedirect = this._onIORedirect.bind(this), 
            n.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this), t ? this._demuxer.bindDataSource(this._ioctl) : n.onDataArrival = this._onInitChunkArrival.bind(this), 
            n.open(t);
        }, e.prototype.stop = function() {
            this._internalAbort(), this._disableStatisticsReporter();
        }, e.prototype._internalAbort = function() {
            this._ioctl && (this._ioctl.destroy(), this._ioctl = null);
        }, e.prototype.pause = function() {
            this._ioctl && this._ioctl.isWorking() && (this._ioctl.pause(), this._disableStatisticsReporter());
        }, e.prototype.resume = function() {
            this._ioctl && this._ioctl.isPaused() && (this._ioctl.resume(), this._enableStatisticsReporter());
        }, e.prototype.seek = function(e) {
            if (null != this._mediaInfo && this._mediaInfo.isSeekable()) {
                var t = this._searchSegmentIndexContains(e);
                if (t === this._currentSegmentIndex) {
                    var i = this._mediaInfo.segments[t];
                    if (null == i) this._pendingSeekTime = e; else {
                        var n = i.getNearestKeyframe(e);
                        this._remuxer.seek(n.milliseconds), this._ioctl.seek(n.fileposition), this._pendingResolveSeekPoint = n.milliseconds;
                    }
                } else {
                    var a = this._mediaInfo.segments[t];
                    null == a ? (this._pendingSeekTime = e, this._internalAbort(), this._remuxer.seek(), 
                    this._remuxer.insertDiscontinuity(), this._loadSegment(t)) : (n = a.getNearestKeyframe(e), 
                    this._internalAbort(), this._remuxer.seek(e), this._remuxer.insertDiscontinuity(), 
                    this._demuxer.resetMediaInfo(), this._demuxer.timestampBase = this._mediaDataSource.segments[t].timestampBase, 
                    this._loadSegment(t, n.fileposition), this._pendingResolveSeekPoint = n.milliseconds, 
                    this._reportSegmentMediaInfo(t));
                }
                this._enableStatisticsReporter();
            }
        }, e.prototype._searchSegmentIndexContains = function(e) {
            for (var t = this._mediaDataSource.segments, i = t.length - 1, n = 0; n < t.length; n++) if (e < t[n].timestampBase) {
                i = n - 1;
                break;
            }
            return i;
        }, e.prototype._onInitChunkArrival = function(e, t) {
            var i = this, n = 0;
            if (t > 0) this._demuxer.bindDataSource(this._ioctl), this._demuxer.timestampBase = this._mediaDataSource.segments[this._currentSegmentIndex].timestampBase, 
            n = this._demuxer.parseChunks(e, t); else {
                var a = null;
                (a = A.probe(e)).match && (this._setupFLVDemuxerRemuxer(a), n = this._demuxer.parseChunks(e, t)), 
                a.match || a.needMoreData || (a = be.probe(e)).match && (this._setupTSDemuxerRemuxer(a), 
                n = this._demuxer.parseChunks(e, t)), a.match || a.needMoreData || (a = null, r.a.e(this.TAG, "Non MPEG-TS/FLV, Unsupported media type!"), 
                Promise.resolve().then((function() {
                    i._internalAbort();
                })), this._emitter.emit(ke.a.DEMUX_ERROR, m.a.FORMAT_UNSUPPORTED, "Non MPEG-TS/FLV, Unsupported media type!"));
            }
            return n;
        }, e.prototype._setupFLVDemuxerRemuxer = function(e) {
            this._demuxer = new A(e, this._config), this._remuxer || (this._remuxer = new Le(this._config));
            var t = this._mediaDataSource;
            null == t.duration || isNaN(t.duration) || (this._demuxer.overridedDuration = t.duration), 
            "boolean" == typeof t.hasAudio && (this._demuxer.overridedHasAudio = t.hasAudio), 
            "boolean" == typeof t.hasVideo && (this._demuxer.overridedHasVideo = t.hasVideo), 
            this._demuxer.timestampBase = t.segments[this._currentSegmentIndex].timestampBase, 
            this._demuxer.onError = this._onDemuxException.bind(this), this._demuxer.onMediaInfo = this._onMediaInfo.bind(this), 
            this._demuxer.onMetaDataArrived = this._onMetaDataArrived.bind(this), this._demuxer.onScriptDataArrived = this._onScriptDataArrived.bind(this), 
            this._remuxer.bindDataSource(this._demuxer.bindDataSource(this._ioctl)), this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this), 
            this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this);
        }, e.prototype._setupTSDemuxerRemuxer = function(e) {
            var t = this._demuxer = new be(e, this._config);
            this._remuxer || (this._remuxer = new Le(this._config)), t.onError = this._onDemuxException.bind(this), 
            t.onMediaInfo = this._onMediaInfo.bind(this), t.onMetaDataArrived = this._onMetaDataArrived.bind(this), 
            t.onTimedID3Metadata = this._onTimedID3Metadata.bind(this), t.onSMPTE2038Metadata = this._onSMPTE2038Metadata.bind(this), 
            t.onSCTE35Metadata = this._onSCTE35Metadata.bind(this), t.onPESPrivateDataDescriptor = this._onPESPrivateDataDescriptor.bind(this), 
            t.onPESPrivateData = this._onPESPrivateData.bind(this), this._remuxer.bindDataSource(this._demuxer), 
            this._demuxer.bindDataSource(this._ioctl), this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this), 
            this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this);
        }, e.prototype._onMediaInfo = function(e) {
            var t = this;
            null == this._mediaInfo && (this._mediaInfo = Object.assign({}, e), this._mediaInfo.keyframesIndex = null, 
            this._mediaInfo.segments = [], this._mediaInfo.segmentCount = this._mediaDataSource.segments.length, 
            Object.setPrototypeOf(this._mediaInfo, o.a.prototype));
            var i = Object.assign({}, e);
            Object.setPrototypeOf(i, o.a.prototype), this._mediaInfo.segments[this._currentSegmentIndex] = i, 
            this._reportSegmentMediaInfo(this._currentSegmentIndex), null != this._pendingSeekTime && Promise.resolve().then((function() {
                var e = t._pendingSeekTime;
                t._pendingSeekTime = null, t.seek(e);
            }));
        }, e.prototype._onMetaDataArrived = function(e) {
            this._emitter.emit(ke.a.METADATA_ARRIVED, e);
        }, e.prototype._onScriptDataArrived = function(e) {
            this._emitter.emit(ke.a.SCRIPTDATA_ARRIVED, e);
        }, e.prototype._onTimedID3Metadata = function(e) {
            var t = this._remuxer.getTimestampBase();
            null != t && (null != e.pts && (e.pts -= t), null != e.dts && (e.dts -= t), this._emitter.emit(ke.a.TIMED_ID3_METADATA_ARRIVED, e));
        }, e.prototype._onSMPTE2038Metadata = function(e) {
            var t = this._remuxer.getTimestampBase();
            null != t && (null != e.pts && (e.pts -= t), null != e.dts && (e.dts -= t), null != e.nearest_pts && (e.nearest_pts -= t), 
            this._emitter.emit(ke.a.SMPTE2038_METADATA_ARRIVED, e));
        }, e.prototype._onSCTE35Metadata = function(e) {
            var t = this._remuxer.getTimestampBase();
            null != t && (null != e.pts && (e.pts -= t), null != e.nearest_pts && (e.nearest_pts -= t), 
            this._emitter.emit(ke.a.SCTE35_METADATA_ARRIVED, e));
        }, e.prototype._onPESPrivateDataDescriptor = function(e) {
            this._emitter.emit(ke.a.PES_PRIVATE_DATA_DESCRIPTOR, e);
        }, e.prototype._onPESPrivateData = function(e) {
            var t = this._remuxer.getTimestampBase();
            null != t && (null != e.pts && (e.pts -= t), null != e.nearest_pts && (e.nearest_pts -= t), 
            null != e.dts && (e.dts -= t), this._emitter.emit(ke.a.PES_PRIVATE_DATA_ARRIVED, e));
        }, e.prototype._onIOSeeked = function() {
            this._remuxer.insertDiscontinuity();
        }, e.prototype._onIOComplete = function(e) {
            var t = e + 1;
            t < this._mediaDataSource.segments.length ? (this._internalAbort(), this._remuxer && this._remuxer.flushStashedSamples(), 
            this._loadSegment(t)) : (this._remuxer && this._remuxer.flushStashedSamples(), this._emitter.emit(ke.a.LOADING_COMPLETE), 
            this._disableStatisticsReporter());
        }, e.prototype._onIORedirect = function(e) {
            var t = this._ioctl.extraData;
            this._mediaDataSource.segments[t].redirectedURL = e;
        }, e.prototype._onIORecoveredEarlyEof = function() {
            this._emitter.emit(ke.a.RECOVERED_EARLY_EOF);
        }, e.prototype._onIOException = function(e, t) {
            r.a.e(this.TAG, "IOException: type = " + e + ", code = " + t.code + ", msg = " + t.msg), 
            this._emitter.emit(ke.a.IO_ERROR, e, t), this._disableStatisticsReporter();
        }, e.prototype._onDemuxException = function(e, t) {
            r.a.e(this.TAG, "DemuxException: type = " + e + ", info = " + t), this._emitter.emit(ke.a.DEMUX_ERROR, e, t);
        }, e.prototype._onRemuxerInitSegmentArrival = function(e, t) {
            this._emitter.emit(ke.a.INIT_SEGMENT, e, t);
        }, e.prototype._onRemuxerMediaSegmentArrival = function(e, t) {
            if (null == this._pendingSeekTime && (this._emitter.emit(ke.a.MEDIA_SEGMENT, e, t), 
            null != this._pendingResolveSeekPoint && "video" === e)) {
                var i = t.info.syncPoints, n = this._pendingResolveSeekPoint;
                this._pendingResolveSeekPoint = null, s.a.safari && i.length > 0 && i[0].originalDts === n && (n = i[0].pts), 
                this._emitter.emit(ke.a.RECOMMEND_SEEKPOINT, n);
            }
        }, e.prototype._enableStatisticsReporter = function() {
            null == this._statisticsReporter && (this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval));
        }, e.prototype._disableStatisticsReporter = function() {
            this._statisticsReporter && (self.clearInterval(this._statisticsReporter), this._statisticsReporter = null);
        }, e.prototype._reportSegmentMediaInfo = function(e) {
            var t = this._mediaInfo.segments[e], i = Object.assign({}, t);
            i.duration = this._mediaInfo.duration, i.segmentCount = this._mediaInfo.segmentCount, 
            delete i.segments, delete i.keyframesIndex, this._emitter.emit(ke.a.MEDIA_INFO, i);
        }, e.prototype._reportStatisticsInfo = function() {
            var e = {};
            e.url = this._ioctl.currentURL, e.hasRedirect = this._ioctl.hasRedirect, e.hasRedirect && (e.redirectedURL = this._ioctl.currentRedirectedURL), 
            e.speed = this._ioctl.currentSpeed, e.loaderType = this._ioctl.loaderType, e.currentSegmentIndex = this._currentSegmentIndex, 
            e.totalSegmentCount = this._mediaDataSource.segments.length, this._emitter.emit(ke.a.STATISTICS_INFO, e);
        }, e;
    }();
    t.a = De;
}, function(e, t, i) {
    var n, a = i(0), r = function() {
        function e() {
            this._firstCheckpoint = 0, this._lastCheckpoint = 0, this._intervalBytes = 0, this._totalBytes = 0, 
            this._lastSecondBytes = 0, self.performance && self.performance.now ? this._now = self.performance.now.bind(self.performance) : this._now = Date.now;
        }
        return e.prototype.reset = function() {
            this._firstCheckpoint = this._lastCheckpoint = 0, this._totalBytes = this._intervalBytes = 0, 
            this._lastSecondBytes = 0;
        }, e.prototype.addBytes = function(e) {
            0 === this._firstCheckpoint ? (this._firstCheckpoint = this._now(), this._lastCheckpoint = this._firstCheckpoint, 
            this._intervalBytes += e, this._totalBytes += e) : this._now() - this._lastCheckpoint < 1e3 ? (this._intervalBytes += e, 
            this._totalBytes += e) : (this._lastSecondBytes = this._intervalBytes, this._intervalBytes = e, 
            this._totalBytes += e, this._lastCheckpoint = this._now());
        }, Object.defineProperty(e.prototype, "currentKBps", {
            get: function() {
                this.addBytes(0);
                var e = (this._now() - this._lastCheckpoint) / 1e3;
                return 0 == e && (e = 1), this._intervalBytes / e / 1024;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "lastSecondKBps", {
            get: function() {
                return this.addBytes(0), 0 !== this._lastSecondBytes ? this._lastSecondBytes / 1024 : this._now() - this._lastCheckpoint >= 500 ? this.currentKBps : 0;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "averageKBps", {
            get: function() {
                var e = (this._now() - this._firstCheckpoint) / 1e3;
                return this._totalBytes / e / 1024;
            },
            enumerable: !1,
            configurable: !0
        }), e;
    }(), s = i(2), o = i(4), d = i(3), _ = (n = function(e, t) {
        return (n = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(e, t) {
            e.__proto__ = t;
        } || function(e, t) {
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
        })(e, t);
    }, function(e, t) {
        function i() {
            this.constructor = e;
        }
        n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, 
        new i);
    }), h = function(e) {
        function t(t, i) {
            var n = e.call(this, "fetch-stream-loader") || this;
            return n.TAG = "FetchStreamLoader", n._seekHandler = t, n._config = i, n._needStash = !0, 
            n._requestAbort = !1, n._abortController = null, n._contentLength = null, n._receivedLength = 0, 
            n;
        }
        return _(t, e), t.isSupported = function() {
            try {
                var e = o.a.msedge && o.a.version.minor >= 15048, t = !o.a.msedge || e;
                return self.fetch && self.ReadableStream && t;
            } catch (e) {
                return !1;
            }
        }, t.prototype.destroy = function() {
            this.isWorking() && this.abort(), e.prototype.destroy.call(this);
        }, t.prototype.open = function(e, t) {
            var i = this;
            this._dataSource = e, this._range = t;
            var n = e.url;
            this._config.reuseRedirectedURL && null != e.redirectedURL && (n = e.redirectedURL);
            var a = this._seekHandler.getConfig(n, t), r = new self.Headers;
            if ("object" == typeof a.headers) {
                var o = a.headers;
                for (var _ in o) o.hasOwnProperty(_) && r.append(_, o[_]);
            }
            var h = {
                method: "GET",
                headers: r,
                mode: "cors",
                cache: "default",
                referrerPolicy: "no-referrer-when-downgrade"
            };
            if ("object" == typeof this._config.headers) for (var _ in this._config.headers) r.append(_, this._config.headers[_]);
            !1 === e.cors && (h.mode = "same-origin"), e.withCredentials && (h.credentials = "include"), 
            e.referrerPolicy && (h.referrerPolicy = e.referrerPolicy), self.AbortController && (this._abortController = new self.AbortController, 
            h.signal = this._abortController.signal), this._status = s.c.kConnecting, self.fetch(a.url, h).then((function(e) {
                if (i._requestAbort) return i._status = s.c.kIdle, void e.body.cancel();
                if (e.ok && e.status >= 200 && e.status <= 299) {
                    if (e.url !== a.url && i._onURLRedirect) {
                        var t = i._seekHandler.removeURLParameters(e.url);
                        i._onURLRedirect(t);
                    }
                    var n = e.headers.get("Content-Length");
                    return null != n && (i._contentLength = parseInt(n), 0 !== i._contentLength && i._onContentLengthKnown && i._onContentLengthKnown(i._contentLength)), 
                    i._pump.call(i, e.body.getReader());
                }
                if (i._status = s.c.kError, !i._onError) throw new d.d("FetchStreamLoader: Http code invalid, " + e.status + " " + e.statusText);
                i._onError(s.b.HTTP_STATUS_CODE_INVALID, {
                    code: e.status,
                    msg: e.statusText
                });
            })).catch((function(e) {
                if (!i._abortController || !i._abortController.signal.aborted) {
                    if (i._status = s.c.kError, !i._onError) throw e;
                    i._onError(s.b.EXCEPTION, {
                        code: -1,
                        msg: e.message
                    });
                }
            }));
        }, t.prototype.abort = function() {
            if (this._requestAbort = !0, (this._status !== s.c.kBuffering || !o.a.chrome) && this._abortController) try {
                this._abortController.abort();
            } catch (e) {}
        }, t.prototype._pump = function(e) {
            var t = this;
            return e.read().then((function(i) {
                if (i.done) if (null !== t._contentLength && t._receivedLength < t._contentLength) {
                    t._status = s.c.kError;
                    var n = s.b.EARLY_EOF, a = {
                        code: -1,
                        msg: "Fetch stream meet Early-EOF"
                    };
                    if (!t._onError) throw new d.d(a.msg);
                    t._onError(n, a);
                } else t._status = s.c.kComplete, t._onComplete && t._onComplete(t._range.from, t._range.from + t._receivedLength - 1); else {
                    if (t._abortController && t._abortController.signal.aborted) return void (t._status = s.c.kComplete);
                    if (!0 === t._requestAbort) return t._status = s.c.kComplete, e.cancel();
                    t._status = s.c.kBuffering;
                    var r = i.value.buffer, o = t._range.from + t._receivedLength;
                    t._receivedLength += r.byteLength, t._onDataArrival && t._onDataArrival(r, o, t._receivedLength), 
                    t._pump(e);
                }
            })).catch((function(e) {
                if (t._abortController && t._abortController.signal.aborted) t._status = s.c.kComplete; else if (11 !== e.code || !o.a.msedge) {
                    t._status = s.c.kError;
                    var i = 0, n = null;
                    if (19 !== e.code && "network error" !== e.message || !(null === t._contentLength || null !== t._contentLength && t._receivedLength < t._contentLength) ? (i = s.b.EXCEPTION, 
                    n = {
                        code: e.code,
                        msg: e.message
                    }) : (i = s.b.EARLY_EOF, n = {
                        code: e.code,
                        msg: "Fetch stream meet Early-EOF"
                    }), !t._onError) throw new d.d(n.msg);
                    t._onError(i, n);
                }
            }));
        }, t;
    }(s.a), c = function() {
        var e = function(t, i) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e, t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
            })(t, i);
        };
        return function(t, i) {
            function n() {
                this.constructor = t;
            }
            e(t, i), t.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, 
            new n);
        };
    }(), u = function(e) {
        function t(t, i) {
            var n = e.call(this, "xhr-moz-chunked-loader") || this;
            return n.TAG = "MozChunkedLoader", n._seekHandler = t, n._config = i, n._needStash = !0, 
            n._xhr = null, n._requestAbort = !1, n._contentLength = null, n._receivedLength = 0, 
            n;
        }
        return c(t, e), t.isSupported = function() {
            try {
                var e = new XMLHttpRequest;
                return e.open("GET", "https://example.com", !0), e.responseType = "moz-chunked-arraybuffer", 
                "moz-chunked-arraybuffer" === e.responseType;
            } catch (e) {
                return a.a.w("MozChunkedLoader", e.message), !1;
            }
        }, t.prototype.destroy = function() {
            this.isWorking() && this.abort(), this._xhr && (this._xhr.onreadystatechange = null, 
            this._xhr.onprogress = null, this._xhr.onloadend = null, this._xhr.onerror = null, 
            this._xhr = null), e.prototype.destroy.call(this);
        }, t.prototype.open = function(e, t) {
            this._dataSource = e, this._range = t;
            var i = e.url;
            this._config.reuseRedirectedURL && null != e.redirectedURL && (i = e.redirectedURL);
            var n = this._seekHandler.getConfig(i, t);
            this._requestURL = n.url;
            var a = this._xhr = new XMLHttpRequest;
            if (a.open("GET", n.url, !0), a.responseType = "moz-chunked-arraybuffer", a.onreadystatechange = this._onReadyStateChange.bind(this), 
            a.onprogress = this._onProgress.bind(this), a.onloadend = this._onLoadEnd.bind(this), 
            a.onerror = this._onXhrError.bind(this), e.withCredentials && (a.withCredentials = !0), 
            "object" == typeof n.headers) {
                var r = n.headers;
                for (var o in r) r.hasOwnProperty(o) && a.setRequestHeader(o, r[o]);
            }
            if ("object" == typeof this._config.headers) for (var o in r = this._config.headers) r.hasOwnProperty(o) && a.setRequestHeader(o, r[o]);
            this._status = s.c.kConnecting, a.send();
        }, t.prototype.abort = function() {
            this._requestAbort = !0, this._xhr && this._xhr.abort(), this._status = s.c.kComplete;
        }, t.prototype._onReadyStateChange = function(e) {
            var t = e.target;
            if (2 === t.readyState) {
                if (null != t.responseURL && t.responseURL !== this._requestURL && this._onURLRedirect) {
                    var i = this._seekHandler.removeURLParameters(t.responseURL);
                    this._onURLRedirect(i);
                }
                if (0 !== t.status && (t.status < 200 || t.status > 299)) {
                    if (this._status = s.c.kError, !this._onError) throw new d.d("MozChunkedLoader: Http code invalid, " + t.status + " " + t.statusText);
                    this._onError(s.b.HTTP_STATUS_CODE_INVALID, {
                        code: t.status,
                        msg: t.statusText
                    });
                } else this._status = s.c.kBuffering;
            }
        }, t.prototype._onProgress = function(e) {
            if (this._status !== s.c.kError) {
                null === this._contentLength && null !== e.total && 0 !== e.total && (this._contentLength = e.total, 
                this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength));
                var t = e.target.response, i = this._range.from + this._receivedLength;
                this._receivedLength += t.byteLength, this._onDataArrival && this._onDataArrival(t, i, this._receivedLength);
            }
        }, t.prototype._onLoadEnd = function(e) {
            !0 !== this._requestAbort ? this._status !== s.c.kError && (this._status = s.c.kComplete, 
            this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1)) : this._requestAbort = !1;
        }, t.prototype._onXhrError = function(e) {
            this._status = s.c.kError;
            var t = 0, i = null;
            if (this._contentLength && e.loaded < this._contentLength ? (t = s.b.EARLY_EOF, 
            i = {
                code: -1,
                msg: "Moz-Chunked stream meet Early-Eof"
            }) : (t = s.b.EXCEPTION, i = {
                code: -1,
                msg: e.constructor.name + " " + e.type
            }), !this._onError) throw new d.d(i.msg);
            this._onError(t, i);
        }, t;
    }(s.a), l = function() {
        var e = function(t, i) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e, t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
            })(t, i);
        };
        return function(t, i) {
            function n() {
                this.constructor = t;
            }
            e(t, i), t.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, 
            new n);
        };
    }(), f = function(e) {
        function t(t, i) {
            var n = e.call(this, "xhr-range-loader") || this;
            return n.TAG = "RangeLoader", n._seekHandler = t, n._config = i, n._needStash = !1, 
            n._chunkSizeKBList = [ 128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 5120, 6144, 7168, 8192 ], 
            n._currentChunkSizeKB = 384, n._currentSpeedNormalized = 0, n._zeroSpeedChunkCount = 0, 
            n._xhr = null, n._speedSampler = new r, n._requestAbort = !1, n._waitForTotalLength = !1, 
            n._totalLengthReceived = !1, n._currentRequestURL = null, n._currentRedirectedURL = null, 
            n._currentRequestRange = null, n._totalLength = null, n._contentLength = null, n._receivedLength = 0, 
            n._lastTimeLoaded = 0, n;
        }
        return l(t, e), t.isSupported = function() {
            try {
                var e = new XMLHttpRequest;
                return e.open("GET", "https://example.com", !0), e.responseType = "arraybuffer", 
                "arraybuffer" === e.responseType;
            } catch (e) {
                return a.a.w("RangeLoader", e.message), !1;
            }
        }, t.prototype.destroy = function() {
            this.isWorking() && this.abort(), this._xhr && (this._xhr.onreadystatechange = null, 
            this._xhr.onprogress = null, this._xhr.onload = null, this._xhr.onerror = null, 
            this._xhr = null), e.prototype.destroy.call(this);
        }, Object.defineProperty(t.prototype, "currentSpeed", {
            get: function() {
                return this._speedSampler.lastSecondKBps;
            },
            enumerable: !1,
            configurable: !0
        }), t.prototype.open = function(e, t) {
            this._dataSource = e, this._range = t, this._status = s.c.kConnecting;
            var i = !1;
            null != this._dataSource.filesize && 0 !== this._dataSource.filesize && (i = !0, 
            this._totalLength = this._dataSource.filesize), this._totalLengthReceived || i ? this._openSubRange() : (this._waitForTotalLength = !0, 
            this._internalOpen(this._dataSource, {
                from: 0,
                to: -1
            }));
        }, t.prototype._openSubRange = function() {
            var e = 1024 * this._currentChunkSizeKB, t = this._range.from + this._receivedLength, i = t + e;
            null != this._contentLength && i - this._range.from >= this._contentLength && (i = this._range.from + this._contentLength - 1), 
            this._currentRequestRange = {
                from: t,
                to: i
            }, this._internalOpen(this._dataSource, this._currentRequestRange);
        }, t.prototype._internalOpen = function(e, t) {
            this._lastTimeLoaded = 0;
            var i = e.url;
            this._config.reuseRedirectedURL && (null != this._currentRedirectedURL ? i = this._currentRedirectedURL : null != e.redirectedURL && (i = e.redirectedURL));
            var n = this._seekHandler.getConfig(i, t);
            this._currentRequestURL = n.url;
            var a = this._xhr = new XMLHttpRequest;
            if (a.open("GET", n.url, !0), a.responseType = "arraybuffer", a.onreadystatechange = this._onReadyStateChange.bind(this), 
            a.onprogress = this._onProgress.bind(this), a.onload = this._onLoad.bind(this), 
            a.onerror = this._onXhrError.bind(this), e.withCredentials && (a.withCredentials = !0), 
            "object" == typeof n.headers) {
                var r = n.headers;
                for (var s in r) r.hasOwnProperty(s) && a.setRequestHeader(s, r[s]);
            }
            if ("object" == typeof this._config.headers) for (var s in r = this._config.headers) r.hasOwnProperty(s) && a.setRequestHeader(s, r[s]);
            a.send();
        }, t.prototype.abort = function() {
            this._requestAbort = !0, this._internalAbort(), this._status = s.c.kComplete;
        }, t.prototype._internalAbort = function() {
            this._xhr && (this._xhr.onreadystatechange = null, this._xhr.onprogress = null, 
            this._xhr.onload = null, this._xhr.onerror = null, this._xhr.abort(), this._xhr = null);
        }, t.prototype._onReadyStateChange = function(e) {
            var t = e.target;
            if (2 === t.readyState) {
                if (null != t.responseURL) {
                    var i = this._seekHandler.removeURLParameters(t.responseURL);
                    t.responseURL !== this._currentRequestURL && i !== this._currentRedirectedURL && (this._currentRedirectedURL = i, 
                    this._onURLRedirect && this._onURLRedirect(i));
                }
                if (t.status >= 200 && t.status <= 299) {
                    if (this._waitForTotalLength) return;
                    this._status = s.c.kBuffering;
                } else {
                    if (this._status = s.c.kError, !this._onError) throw new d.d("RangeLoader: Http code invalid, " + t.status + " " + t.statusText);
                    this._onError(s.b.HTTP_STATUS_CODE_INVALID, {
                        code: t.status,
                        msg: t.statusText
                    });
                }
            }
        }, t.prototype._onProgress = function(e) {
            if (this._status !== s.c.kError) {
                if (null === this._contentLength) {
                    var t = !1;
                    if (this._waitForTotalLength) {
                        this._waitForTotalLength = !1, this._totalLengthReceived = !0, t = !0;
                        var i = e.total;
                        this._internalAbort(), null != i & 0 !== i && (this._totalLength = i);
                    }
                    if (-1 === this._range.to ? this._contentLength = this._totalLength - this._range.from : this._contentLength = this._range.to - this._range.from + 1, 
                    t) return void this._openSubRange();
                    this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength);
                }
                var n = e.loaded - this._lastTimeLoaded;
                this._lastTimeLoaded = e.loaded, this._speedSampler.addBytes(n);
            }
        }, t.prototype._normalizeSpeed = function(e) {
            var t = this._chunkSizeKBList, i = t.length - 1, n = 0, a = 0, r = i;
            if (e < t[0]) return t[0];
            for (;a <= r; ) {
                if ((n = a + Math.floor((r - a) / 2)) === i || e >= t[n] && e < t[n + 1]) return t[n];
                t[n] < e ? a = n + 1 : r = n - 1;
            }
        }, t.prototype._onLoad = function(e) {
            if (this._status !== s.c.kError) if (this._waitForTotalLength) this._waitForTotalLength = !1; else {
                this._lastTimeLoaded = 0;
                var t = this._speedSampler.lastSecondKBps;
                if (0 === t && (this._zeroSpeedChunkCount++, this._zeroSpeedChunkCount >= 3 && (t = this._speedSampler.currentKBps)), 
                0 !== t) {
                    var i = this._normalizeSpeed(t);
                    this._currentSpeedNormalized !== i && (this._currentSpeedNormalized = i, this._currentChunkSizeKB = i);
                }
                var n = e.target.response, a = this._range.from + this._receivedLength;
                this._receivedLength += n.byteLength;
                var r = !1;
                null != this._contentLength && this._receivedLength < this._contentLength ? this._openSubRange() : r = !0, 
                this._onDataArrival && this._onDataArrival(n, a, this._receivedLength), r && (this._status = s.c.kComplete, 
                this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1));
            }
        }, t.prototype._onXhrError = function(e) {
            this._status = s.c.kError;
            var t = 0, i = null;
            if (this._contentLength && this._receivedLength > 0 && this._receivedLength < this._contentLength ? (t = s.b.EARLY_EOF, 
            i = {
                code: -1,
                msg: "RangeLoader meet Early-Eof"
            }) : (t = s.b.EXCEPTION, i = {
                code: -1,
                msg: e.constructor.name + " " + e.type
            }), !this._onError) throw new d.d(i.msg);
            this._onError(t, i);
        }, t;
    }(s.a), p = function() {
        var e = function(t, i) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e, t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
            })(t, i);
        };
        return function(t, i) {
            function n() {
                this.constructor = t;
            }
            e(t, i), t.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, 
            new n);
        };
    }(), m = function(e) {
        function t() {
            var t = e.call(this, "websocket-loader") || this;
            return t.TAG = "WebSocketLoader", t._needStash = !0, t._ws = null, t._requestAbort = !1, 
            t._receivedLength = 0, t;
        }
        return p(t, e), t.isSupported = function() {
            try {
                return void 0 !== self.WebSocket;
            } catch (e) {
                return !1;
            }
        }, t.prototype.destroy = function() {
            this._ws && this.abort(), e.prototype.destroy.call(this);
        }, t.prototype.open = function(e) {
            try {
                var t = this._ws = new self.WebSocket(e.url);
                t.binaryType = "arraybuffer", t.onopen = this._onWebSocketOpen.bind(this), t.onclose = this._onWebSocketClose.bind(this), 
                t.onmessage = this._onWebSocketMessage.bind(this), t.onerror = this._onWebSocketError.bind(this), 
                this._status = s.c.kConnecting;
            } catch (e) {
                this._status = s.c.kError;
                var i = {
                    code: e.code,
                    msg: e.message
                };
                if (!this._onError) throw new d.d(i.msg);
                this._onError(s.b.EXCEPTION, i);
            }
        }, t.prototype.abort = function() {
            var e = this._ws;
            !e || 0 !== e.readyState && 1 !== e.readyState || (this._requestAbort = !0, e.close()), 
            this._ws = null, this._status = s.c.kComplete;
        }, t.prototype._onWebSocketOpen = function(e) {
            this._status = s.c.kBuffering;
        }, t.prototype._onWebSocketClose = function(e) {
            !0 !== this._requestAbort ? (this._status = s.c.kComplete, this._onComplete && this._onComplete(0, this._receivedLength - 1)) : this._requestAbort = !1;
        }, t.prototype._onWebSocketMessage = function(e) {
            var t = this;
            if (e.data instanceof ArrayBuffer) this._dispatchArrayBuffer(e.data); else if (e.data instanceof Blob) {
                var i = new FileReader;
                i.onload = function() {
                    t._dispatchArrayBuffer(i.result);
                }, i.readAsArrayBuffer(e.data);
            } else {
                this._status = s.c.kError;
                var n = {
                    code: -1,
                    msg: "Unsupported WebSocket message type: " + e.data.constructor.name
                };
                if (!this._onError) throw new d.d(n.msg);
                this._onError(s.b.EXCEPTION, n);
            }
        }, t.prototype._dispatchArrayBuffer = function(e) {
            var t = e, i = this._receivedLength;
            this._receivedLength += t.byteLength, this._onDataArrival && this._onDataArrival(t, i, this._receivedLength);
        }, t.prototype._onWebSocketError = function(e) {
            this._status = s.c.kError;
            var t = {
                code: e.code,
                msg: e.message
            };
            if (!this._onError) throw new d.d(t.msg);
            this._onError(s.b.EXCEPTION, t);
        }, t;
    }(s.a), g = function() {
        function e(e) {
            this._zeroStart = e || !1;
        }
        return e.prototype.getConfig = function(e, t) {
            var i = {};
            if (0 !== t.from || -1 !== t.to) {
                var n = void 0;
                n = -1 !== t.to ? "bytes=" + t.from.toString() + "-" + t.to.toString() : "bytes=" + t.from.toString() + "-", 
                i.Range = n;
            } else this._zeroStart && (i.Range = "bytes=0-");
            return {
                url: e,
                headers: i
            };
        }, e.prototype.removeURLParameters = function(e) {
            return e;
        }, e;
    }(), v = function() {
        function e(e, t) {
            this._startName = e, this._endName = t;
        }
        return e.prototype.getConfig = function(e, t) {
            var i = e;
            if (0 !== t.from || -1 !== t.to) {
                var n = !0;
                -1 === i.indexOf("?") && (i += "?", n = !1), n && (i += "&"), i += this._startName + "=" + t.from.toString(), 
                -1 !== t.to && (i += "&" + this._endName + "=" + t.to.toString());
            }
            return {
                url: i,
                headers: {}
            };
        }, e.prototype.removeURLParameters = function(e) {
            var t = e.split("?")[0], i = void 0, n = e.indexOf("?");
            -1 !== n && (i = e.substring(n + 1));
            var a = "";
            if (null != i && i.length > 0) for (var r = i.split("&"), s = 0; s < r.length; s++) {
                var o = r[s].split("="), d = s > 0;
                o[0] !== this._startName && o[0] !== this._endName && (d && (a += "&"), a += r[s]);
            }
            return 0 === a.length ? t : t + "?" + a;
        }, e;
    }(), y = function() {
        function e(e, t, i) {
            this.TAG = "IOController", this._config = t, this._extraData = i, this._stashInitialSize = 65536, 
            null != t.stashInitialSize && t.stashInitialSize > 0 && (this._stashInitialSize = t.stashInitialSize), 
            this._stashUsed = 0, this._stashSize = this._stashInitialSize, this._bufferSize = 3145728, 
            this._stashBuffer = new ArrayBuffer(this._bufferSize), this._stashByteStart = 0, 
            this._enableStash = !0, !1 === t.enableStashBuffer && (this._enableStash = !1), 
            this._loader = null, this._loaderClass = null, this._seekHandler = null, this._dataSource = e, 
            this._isWebSocketURL = /wss?:\/\/(.+?)/.test(e.url), this._refTotalLength = e.filesize ? e.filesize : null, 
            this._totalLength = this._refTotalLength, this._fullRequestFlag = !1, this._currentRange = null, 
            this._redirectedURL = null, this._speedNormalized = 0, this._speedSampler = new r, 
            this._speedNormalizeList = [ 32, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096 ], 
            this._isEarlyEofReconnecting = !1, this._paused = !1, this._resumeFrom = 0, this._onDataArrival = null, 
            this._onSeeked = null, this._onError = null, this._onComplete = null, this._onRedirect = null, 
            this._onRecoveredEarlyEof = null, this._selectSeekHandler(), this._selectLoader(), 
            this._createLoader();
        }
        return e.prototype.destroy = function() {
            this._loader.isWorking() && this._loader.abort(), this._loader.destroy(), this._loader = null, 
            this._loaderClass = null, this._dataSource = null, this._stashBuffer = null, this._stashUsed = this._stashSize = this._bufferSize = this._stashByteStart = 0, 
            this._currentRange = null, this._speedSampler = null, this._isEarlyEofReconnecting = !1, 
            this._onDataArrival = null, this._onSeeked = null, this._onError = null, this._onComplete = null, 
            this._onRedirect = null, this._onRecoveredEarlyEof = null, this._extraData = null;
        }, e.prototype.isWorking = function() {
            return this._loader && this._loader.isWorking() && !this._paused;
        }, e.prototype.isPaused = function() {
            return this._paused;
        }, Object.defineProperty(e.prototype, "status", {
            get: function() {
                return this._loader.status;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "extraData", {
            get: function() {
                return this._extraData;
            },
            set: function(e) {
                this._extraData = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onDataArrival", {
            get: function() {
                return this._onDataArrival;
            },
            set: function(e) {
                this._onDataArrival = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onSeeked", {
            get: function() {
                return this._onSeeked;
            },
            set: function(e) {
                this._onSeeked = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onError", {
            get: function() {
                return this._onError;
            },
            set: function(e) {
                this._onError = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onComplete", {
            get: function() {
                return this._onComplete;
            },
            set: function(e) {
                this._onComplete = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onRedirect", {
            get: function() {
                return this._onRedirect;
            },
            set: function(e) {
                this._onRedirect = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onRecoveredEarlyEof", {
            get: function() {
                return this._onRecoveredEarlyEof;
            },
            set: function(e) {
                this._onRecoveredEarlyEof = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "currentURL", {
            get: function() {
                return this._dataSource.url;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "hasRedirect", {
            get: function() {
                return null != this._redirectedURL || null != this._dataSource.redirectedURL;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "currentRedirectedURL", {
            get: function() {
                return this._redirectedURL || this._dataSource.redirectedURL;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "currentSpeed", {
            get: function() {
                return this._loaderClass === f ? this._loader.currentSpeed : this._speedSampler.lastSecondKBps;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "loaderType", {
            get: function() {
                return this._loader.type;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype._selectSeekHandler = function() {
            var e = this._config;
            if ("range" === e.seekType) this._seekHandler = new g(this._config.rangeLoadZeroStart); else if ("param" === e.seekType) {
                var t = e.seekParamStart || "bstart", i = e.seekParamEnd || "bend";
                this._seekHandler = new v(t, i);
            } else {
                if ("custom" !== e.seekType) throw new d.b("Invalid seekType in config: " + e.seekType);
                if ("function" != typeof e.customSeekHandler) throw new d.b("Custom seekType specified in config but invalid customSeekHandler!");
                this._seekHandler = new e.customSeekHandler;
            }
        }, e.prototype._selectLoader = function() {
            if (null != this._config.customLoader) this._loaderClass = this._config.customLoader; else if (this._isWebSocketURL) this._loaderClass = m; else if (h.isSupported()) this._loaderClass = h; else if (u.isSupported()) this._loaderClass = u; else {
                if (!f.isSupported()) throw new d.d("Your browser doesn't support xhr with arraybuffer responseType!");
                this._loaderClass = f;
            }
        }, e.prototype._createLoader = function() {
            this._loader = new this._loaderClass(this._seekHandler, this._config), !1 === this._loader.needStashBuffer && (this._enableStash = !1), 
            this._loader.onContentLengthKnown = this._onContentLengthKnown.bind(this), this._loader.onURLRedirect = this._onURLRedirect.bind(this), 
            this._loader.onDataArrival = this._onLoaderChunkArrival.bind(this), this._loader.onComplete = this._onLoaderComplete.bind(this), 
            this._loader.onError = this._onLoaderError.bind(this);
        }, e.prototype.open = function(e) {
            this._currentRange = {
                from: 0,
                to: -1
            }, e && (this._currentRange.from = e), this._speedSampler.reset(), e || (this._fullRequestFlag = !0), 
            this._loader.open(this._dataSource, Object.assign({}, this._currentRange));
        }, e.prototype.abort = function() {
            this._loader.abort(), this._paused && (this._paused = !1, this._resumeFrom = 0);
        }, e.prototype.pause = function() {
            this.isWorking() && (this._loader.abort(), 0 !== this._stashUsed ? (this._resumeFrom = this._stashByteStart, 
            this._currentRange.to = this._stashByteStart - 1) : this._resumeFrom = this._currentRange.to + 1, 
            this._stashUsed = 0, this._stashByteStart = 0, this._paused = !0);
        }, e.prototype.resume = function() {
            if (this._paused) {
                this._paused = !1;
                var e = this._resumeFrom;
                this._resumeFrom = 0, this._internalSeek(e, !0);
            }
        }, e.prototype.seek = function(e) {
            this._paused = !1, this._stashUsed = 0, this._stashByteStart = 0, this._internalSeek(e, !0);
        }, e.prototype._internalSeek = function(e, t) {
            this._loader.isWorking() && this._loader.abort(), this._flushStashBuffer(t), this._loader.destroy(), 
            this._loader = null;
            var i = {
                from: e,
                to: -1
            };
            this._currentRange = {
                from: i.from,
                to: -1
            }, this._speedSampler.reset(), this._stashSize = this._stashInitialSize, this._createLoader(), 
            this._loader.open(this._dataSource, i), this._onSeeked && this._onSeeked();
        }, e.prototype.updateUrl = function(e) {
            if (!e || "string" != typeof e || 0 === e.length) throw new d.b("Url must be a non-empty string!");
            this._dataSource.url = e;
        }, e.prototype._expandBuffer = function(e) {
            for (var t = this._stashSize; t + 1048576 < e; ) t *= 2;
            if ((t += 1048576) !== this._bufferSize) {
                var i = new ArrayBuffer(t);
                if (this._stashUsed > 0) {
                    var n = new Uint8Array(this._stashBuffer, 0, this._stashUsed);
                    new Uint8Array(i, 0, t).set(n, 0);
                }
                this._stashBuffer = i, this._bufferSize = t;
            }
        }, e.prototype._normalizeSpeed = function(e) {
            var t = this._speedNormalizeList, i = t.length - 1, n = 0, a = 0, r = i;
            if (e < t[0]) return t[0];
            for (;a <= r; ) {
                if ((n = a + Math.floor((r - a) / 2)) === i || e >= t[n] && e < t[n + 1]) return t[n];
                t[n] < e ? a = n + 1 : r = n - 1;
            }
        }, e.prototype._adjustStashSize = function(e) {
            var t = 0;
            (t = this._config.isLive ? e / 8 : e < 512 ? e : e >= 512 && e <= 1024 ? Math.floor(1.5 * e) : 2 * e) > 8192 && (t = 8192);
            var i = 1024 * t + 1048576;
            this._bufferSize < i && this._expandBuffer(i), this._stashSize = 1024 * t;
        }, e.prototype._dispatchChunks = function(e, t) {
            return this._currentRange.to = t + e.byteLength - 1, this._onDataArrival(e, t);
        }, e.prototype._onURLRedirect = function(e) {
            this._redirectedURL = e, this._onRedirect && this._onRedirect(e);
        }, e.prototype._onContentLengthKnown = function(e) {
            e && this._fullRequestFlag && (this._totalLength = e, this._fullRequestFlag = !1);
        }, e.prototype._onLoaderChunkArrival = function(e, t, i) {
            if (!this._onDataArrival) throw new d.a("IOController: No existing consumer (onDataArrival) callback!");
            if (!this._paused) {
                this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1, this._onRecoveredEarlyEof && this._onRecoveredEarlyEof()), 
                this._speedSampler.addBytes(e.byteLength);
                var n = this._speedSampler.lastSecondKBps;
                if (0 !== n) {
                    var a = this._normalizeSpeed(n);
                    this._speedNormalized !== a && (this._speedNormalized = a, this._adjustStashSize(a));
                }
                if (this._enableStash) if (0 === this._stashUsed && 0 === this._stashByteStart && (this._stashByteStart = t), 
                this._stashUsed + e.byteLength <= this._stashSize) (o = new Uint8Array(this._stashBuffer, 0, this._stashSize)).set(new Uint8Array(e), this._stashUsed), 
                this._stashUsed += e.byteLength; else if (o = new Uint8Array(this._stashBuffer, 0, this._bufferSize), 
                this._stashUsed > 0) {
                    var r = this._stashBuffer.slice(0, this._stashUsed);
                    (_ = this._dispatchChunks(r, this._stashByteStart)) < r.byteLength ? _ > 0 && (h = new Uint8Array(r, _), 
                    o.set(h, 0), this._stashUsed = h.byteLength, this._stashByteStart += _) : (this._stashUsed = 0, 
                    this._stashByteStart += _), this._stashUsed + e.byteLength > this._bufferSize && (this._expandBuffer(this._stashUsed + e.byteLength), 
                    o = new Uint8Array(this._stashBuffer, 0, this._bufferSize)), o.set(new Uint8Array(e), this._stashUsed), 
                    this._stashUsed += e.byteLength;
                } else (_ = this._dispatchChunks(e, t)) < e.byteLength && ((s = e.byteLength - _) > this._bufferSize && (this._expandBuffer(s), 
                o = new Uint8Array(this._stashBuffer, 0, this._bufferSize)), o.set(new Uint8Array(e, _), 0), 
                this._stashUsed += s, this._stashByteStart = t + _); else if (0 === this._stashUsed) {
                    var s;
                    (_ = this._dispatchChunks(e, t)) < e.byteLength && ((s = e.byteLength - _) > this._bufferSize && this._expandBuffer(s), 
                    (o = new Uint8Array(this._stashBuffer, 0, this._bufferSize)).set(new Uint8Array(e, _), 0), 
                    this._stashUsed += s, this._stashByteStart = t + _);
                } else {
                    var o, _;
                    if (this._stashUsed + e.byteLength > this._bufferSize && this._expandBuffer(this._stashUsed + e.byteLength), 
                    (o = new Uint8Array(this._stashBuffer, 0, this._bufferSize)).set(new Uint8Array(e), this._stashUsed), 
                    this._stashUsed += e.byteLength, (_ = this._dispatchChunks(this._stashBuffer.slice(0, this._stashUsed), this._stashByteStart)) < this._stashUsed && _ > 0) {
                        var h = new Uint8Array(this._stashBuffer, _);
                        o.set(h, 0);
                    }
                    this._stashUsed -= _, this._stashByteStart += _;
                }
            }
        }, e.prototype._flushStashBuffer = function(e) {
            if (this._stashUsed > 0) {
                var t = this._stashBuffer.slice(0, this._stashUsed), i = this._dispatchChunks(t, this._stashByteStart), n = t.byteLength - i;
                if (i < t.byteLength) {
                    if (!e) {
                        if (i > 0) {
                            var r = new Uint8Array(this._stashBuffer, 0, this._bufferSize), s = new Uint8Array(t, i);
                            r.set(s, 0), this._stashUsed = s.byteLength, this._stashByteStart += i;
                        }
                        return 0;
                    }
                    a.a.w(this.TAG, n + " bytes unconsumed data remain when flush buffer, dropped");
                }
                return this._stashUsed = 0, this._stashByteStart = 0, n;
            }
            return 0;
        }, e.prototype._onLoaderComplete = function(e, t) {
            this._flushStashBuffer(!0), this._onComplete && this._onComplete(this._extraData);
        }, e.prototype._onLoaderError = function(e, t) {
            switch (a.a.e(this.TAG, "Loader error, code = " + t.code + ", msg = " + t.msg), 
            this._flushStashBuffer(!1), this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1, 
            e = s.b.UNRECOVERABLE_EARLY_EOF), e) {
              case s.b.EARLY_EOF:
                if (!this._config.isLive && this._totalLength) {
                    var i = this._currentRange.to + 1;
                    return void (i < this._totalLength && (a.a.w(this.TAG, "Connection lost, trying reconnect..."), 
                    this._isEarlyEofReconnecting = !0, this._internalSeek(i, !1)));
                }
                e = s.b.UNRECOVERABLE_EARLY_EOF;

              case s.b.UNRECOVERABLE_EARLY_EOF:
              case s.b.CONNECTING_TIMEOUT:
              case s.b.HTTP_STATUS_CODE_INVALID:
              case s.b.EXCEPTION:
            }
            if (!this._onError) throw new d.d("IOException: " + t.msg);
            this._onError(e, t);
        }, e;
    }();
    t.a = y;
}, function(e, t, i) {
    var n = function() {
        function e() {}
        return e.install = function() {
            Object.setPrototypeOf = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            }, Object.assign = Object.assign || function(e) {
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                for (var t = Object(e), i = 1; i < arguments.length; i++) {
                    var n = arguments[i];
                    if (null != n) for (var a in n) n.hasOwnProperty(a) && (t[a] = n[a]);
                }
                return t;
            }, "function" != typeof self.Promise && i(15).polyfill();
        }, e;
    }();
    n.install(), t.a = n;
}, function(e, t, i) {
    function n(e) {
        var t = {};
        function i(n) {
            if (t[n]) return t[n].exports;
            var a = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(a.exports, a, a.exports, i), a.l = !0, a.exports;
        }
        i.m = e, i.c = t, i.i = function(e) {
            return e;
        }, i.d = function(e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: n
            });
        }, i.r = function(e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, i.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return i.d(t, "a", t), t;
        }, i.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, i.p = "/", i.oe = function(e) {
            throw console.error(e), e;
        };
        var n = i(i.s = ENTRY_MODULE);
        return n.default || n;
    }
    function a(e) {
        return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
    }
    function r(e, t, n) {
        var r = {};
        r[n] = [];
        var s = t.toString(), o = s.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
        if (!o) return r;
        for (var d, _ = o[1], h = new RegExp("(\\\\n|\\W)" + a(_) + "\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)", "g"); d = h.exec(s); ) "dll-reference" !== d[3] && r[n].push(d[3]);
        for (h = new RegExp("\\(" + a(_) + '\\("(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))"\\)\\)\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)', "g"); d = h.exec(s); ) e[d[2]] || (r[n].push(d[1]), 
        e[d[2]] = i(d[1]).m), r[d[2]] = r[d[2]] || [], r[d[2]].push(d[4]);
        for (var c, u = Object.keys(r), l = 0; l < u.length; l++) for (var f = 0; f < r[u[l]].length; f++) c = r[u[l]][f], 
        isNaN(1 * c) || (r[u[l]][f] = 1 * r[u[l]][f]);
        return r;
    }
    function s(e) {
        return Object.keys(e).reduce((function(t, i) {
            return t || e[i].length > 0;
        }), !1);
    }
    e.exports = function(e, t) {
        t = t || {};
        var a = {
            main: i.m
        }, o = t.all ? {
            main: Object.keys(a.main)
        } : function(e, t) {
            for (var i = {
                main: [ t ]
            }, n = {
                main: []
            }, a = {
                main: {}
            }; s(i); ) for (var o = Object.keys(i), d = 0; d < o.length; d++) {
                var _ = o[d], h = i[_].pop();
                if (a[_] = a[_] || {}, !a[_][h] && e[_][h]) {
                    a[_][h] = !0, n[_] = n[_] || [], n[_].push(h);
                    for (var c = r(e, e[_][h], _), u = Object.keys(c), l = 0; l < u.length; l++) i[u[l]] = i[u[l]] || [], 
                    i[u[l]] = i[u[l]].concat(c[u[l]]);
                }
            }
            return n;
        }(a, e), d = "";
        Object.keys(o).filter((function(e) {
            return "main" !== e;
        })).forEach((function(e) {
            for (var t = 0; o[e][t]; ) t++;
            o[e].push(t), a[e][t] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", 
            d = d + "var " + e + " = (" + n.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + o[e].map((function(t) {
                return JSON.stringify(t) + ": " + a[e][t].toString();
            })).join(",") + "});\n";
        })), d = d + "new ((" + n.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + o.main.map((function(e) {
            return JSON.stringify(e) + ": " + a.main[e].toString();
        })).join(",") + "}))(self);";
        var _ = new window.Blob([ d ], {
            type: "text/javascript"
        });
        if (t.bare) return _;
        var h = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(_), c = new window.Worker(h);
        return c.objectURL = h, c;
    };
}, function(e, t, i) {
    e.exports = i(19).default;
}, function(e, t, i) {
    (function(t, i) {
        var n;
        n = function() {
            function e(e) {
                return "function" == typeof e;
            }
            var n = Array.isArray ? Array.isArray : function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            }, a = 0, r = void 0, s = void 0, o = function(e, t) {
                f[a] = e, f[a + 1] = t, 2 === (a += 2) && (s ? s(p) : b());
            }, d = "undefined" != typeof window ? window : void 0, _ = d || {}, h = _.MutationObserver || _.WebKitMutationObserver, c = "undefined" == typeof self && void 0 !== t && "[object process]" === {}.toString.call(t), u = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;
            function l() {
                var e = setTimeout;
                return function() {
                    return e(p, 1);
                };
            }
            var f = new Array(1e3);
            function p() {
                for (var e = 0; e < a; e += 2) (0, f[e])(f[e + 1]), f[e] = void 0, f[e + 1] = void 0;
                a = 0;
            }
            var m, g, v, y, b = void 0;
            function S(e, t) {
                var i = this, n = new this.constructor(R);
                void 0 === n[A] && P(n);
                var a = i._state;
                if (a) {
                    var r = arguments[a - 1];
                    o((function() {
                        return I(a, n, r, i._result);
                    }));
                } else C(i, n, e, t);
                return n;
            }
            function E(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(R);
                return L(t, e), t;
            }
            c ? b = function() {
                return t.nextTick(p);
            } : h ? (g = 0, v = new h(p), y = document.createTextNode(""), v.observe(y, {
                characterData: !0
            }), b = function() {
                y.data = g = ++g % 2;
            }) : u ? ((m = new MessageChannel).port1.onmessage = p, b = function() {
                return m.port2.postMessage(0);
            }) : b = void 0 === d ? function() {
                try {
                    var e = Function("return this")().require("vertx");
                    return void 0 !== (r = e.runOnLoop || e.runOnContext) ? function() {
                        r(p);
                    } : l();
                } catch (e) {
                    return l();
                }
            }() : l();
            var A = Math.random().toString(36).substring(2);
            function R() {}
            function T(t, i, n) {
                i.constructor === t.constructor && n === S && i.constructor.resolve === E ? function(e, t) {
                    1 === t._state ? k(e, t._result) : 2 === t._state ? D(e, t._result) : C(t, void 0, (function(t) {
                        return L(e, t);
                    }), (function(t) {
                        return D(e, t);
                    }));
                }(t, i) : void 0 === n ? k(t, i) : e(n) ? function(e, t, i) {
                    o((function(e) {
                        var n = !1, a = function(e, t, i, n) {
                            try {
                                e.call(t, i, n);
                            } catch (e) {
                                return e;
                            }
                        }(i, t, (function(i) {
                            n || (n = !0, t !== i ? L(e, i) : k(e, i));
                        }), (function(t) {
                            n || (n = !0, D(e, t));
                        }), e._label);
                        !n && a && (n = !0, D(e, a));
                    }), e);
                }(t, i, n) : k(t, i);
            }
            function L(e, t) {
                if (e === t) D(e, new TypeError("You cannot resolve a promise with itself")); else if (a = typeof (n = t), 
                null === n || "object" !== a && "function" !== a) k(e, t); else {
                    var i = void 0;
                    try {
                        i = t.then;
                    } catch (t) {
                        return void D(e, t);
                    }
                    T(e, t, i);
                }
                var n, a;
            }
            function w(e) {
                e._onerror && e._onerror(e._result), B(e);
            }
            function k(e, t) {
                void 0 === e._state && (e._result = t, e._state = 1, 0 !== e._subscribers.length && o(B, e));
            }
            function D(e, t) {
                void 0 === e._state && (e._state = 2, e._result = t, o(w, e));
            }
            function C(e, t, i, n) {
                var a = e._subscribers, r = a.length;
                e._onerror = null, a[r] = t, a[r + 1] = i, a[r + 2] = n, 0 === r && e._state && o(B, e);
            }
            function B(e) {
                var t = e._subscribers, i = e._state;
                if (0 !== t.length) {
                    for (var n = void 0, a = void 0, r = e._result, s = 0; s < t.length; s += 3) n = t[s], 
                    a = t[s + i], n ? I(i, n, a, r) : a(r);
                    e._subscribers.length = 0;
                }
            }
            function I(t, i, n, a) {
                var r = e(n), s = void 0, o = void 0, d = !0;
                if (r) {
                    try {
                        s = n(a);
                    } catch (e) {
                        d = !1, o = e;
                    }
                    if (i === s) return void D(i, new TypeError("A promises callback cannot return that same promise."));
                } else s = a;
                void 0 !== i._state || (r && d ? L(i, s) : !1 === d ? D(i, o) : 1 === t ? k(i, s) : 2 === t && D(i, s));
            }
            var O = 0;
            function P(e) {
                e[A] = O++, e._state = void 0, e._result = void 0, e._subscribers = [];
            }
            var M = function() {
                function e(e, t) {
                    this._instanceConstructor = e, this.promise = new e(R), this.promise[A] || P(this.promise), 
                    n(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 
                    0 === this.length ? k(this.promise, this._result) : (this.length = this.length || 0, 
                    this._enumerate(t), 0 === this._remaining && k(this.promise, this._result))) : D(this.promise, new Error("Array Methods must be provided an Array"));
                }
                return e.prototype._enumerate = function(e) {
                    for (var t = 0; void 0 === this._state && t < e.length; t++) this._eachEntry(e[t], t);
                }, e.prototype._eachEntry = function(e, t) {
                    var i = this._instanceConstructor, n = i.resolve;
                    if (n === E) {
                        var a = void 0, r = void 0, s = !1;
                        try {
                            a = e.then;
                        } catch (e) {
                            s = !0, r = e;
                        }
                        if (a === S && void 0 !== e._state) this._settledAt(e._state, t, e._result); else if ("function" != typeof a) this._remaining--, 
                        this._result[t] = e; else if (i === x) {
                            var o = new i(R);
                            s ? D(o, r) : T(o, e, a), this._willSettleAt(o, t);
                        } else this._willSettleAt(new i((function(t) {
                            return t(e);
                        })), t);
                    } else this._willSettleAt(n(e), t);
                }, e.prototype._settledAt = function(e, t, i) {
                    var n = this.promise;
                    void 0 === n._state && (this._remaining--, 2 === e ? D(n, i) : this._result[t] = i), 
                    0 === this._remaining && k(n, this._result);
                }, e.prototype._willSettleAt = function(e, t) {
                    var i = this;
                    C(e, void 0, (function(e) {
                        return i._settledAt(1, t, e);
                    }), (function(e) {
                        return i._settledAt(2, t, e);
                    }));
                }, e;
            }(), x = function() {
                function t(e) {
                    this[A] = O++, this._result = this._state = void 0, this._subscribers = [], R !== e && ("function" != typeof e && function() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                    }(), this instanceof t ? function(e, t) {
                        try {
                            t((function(t) {
                                L(e, t);
                            }), (function(t) {
                                D(e, t);
                            }));
                        } catch (t) {
                            D(e, t);
                        }
                    }(this, e) : function() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    }());
                }
                return t.prototype.catch = function(e) {
                    return this.then(null, e);
                }, t.prototype.finally = function(t) {
                    var i = this.constructor;
                    return e(t) ? this.then((function(e) {
                        return i.resolve(t()).then((function() {
                            return e;
                        }));
                    }), (function(e) {
                        return i.resolve(t()).then((function() {
                            throw e;
                        }));
                    })) : this.then(t, t);
                }, t;
            }();
            return x.prototype.then = S, x.all = function(e) {
                return new M(this, e).promise;
            }, x.race = function(e) {
                var t = this;
                return n(e) ? new t((function(i, n) {
                    for (var a = e.length, r = 0; r < a; r++) t.resolve(e[r]).then(i, n);
                })) : new t((function(e, t) {
                    return t(new TypeError("You must pass an array to race."));
                }));
            }, x.resolve = E, x.reject = function(e) {
                var t = new this(R);
                return D(t, e), t;
            }, x._setScheduler = function(e) {
                s = e;
            }, x._setAsap = function(e) {
                o = e;
            }, x._asap = o, x.polyfill = function() {
                var e = void 0;
                if (void 0 !== i) e = i; else if ("undefined" != typeof self) e = self; else try {
                    e = Function("return this")();
                } catch (e) {
                    throw new Error("polyfill failed because global object is unavailable in this environment");
                }
                var t = e.Promise;
                if (t) {
                    var n = null;
                    try {
                        n = Object.prototype.toString.call(t.resolve());
                    } catch (e) {}
                    if ("[object Promise]" === n && !t.cast) return;
                }
                e.Promise = x;
            }, x.Promise = x, x;
        }, e.exports = n();
    }).call(this, i(16), i(17));
}, function(e, t) {
    var i, n, a = e.exports = {};
    function r() {
        throw new Error("setTimeout has not been defined");
    }
    function s() {
        throw new Error("clearTimeout has not been defined");
    }
    function o(e) {
        if (i === setTimeout) return setTimeout(e, 0);
        if ((i === r || !i) && setTimeout) return i = setTimeout, setTimeout(e, 0);
        try {
            return i(e, 0);
        } catch (t) {
            try {
                return i.call(null, e, 0);
            } catch (t) {
                return i.call(this, e, 0);
            }
        }
    }
    !function() {
        try {
            i = "function" == typeof setTimeout ? setTimeout : r;
        } catch (e) {
            i = r;
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (e) {
            n = s;
        }
    }();
    var d, _ = [], h = !1, c = -1;
    function u() {
        h && d && (h = !1, d.length ? _ = d.concat(_) : c = -1, _.length && l());
    }
    function l() {
        if (!h) {
            var e = o(u);
            h = !0;
            for (var t = _.length; t; ) {
                for (d = _, _ = []; ++c < t; ) d && d[c].run();
                c = -1, t = _.length;
            }
            d = null, h = !1, function(e) {
                if (n === clearTimeout) return clearTimeout(e);
                if ((n === s || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                try {
                    n(e);
                } catch (t) {
                    try {
                        return n.call(null, e);
                    } catch (t) {
                        return n.call(this, e);
                    }
                }
            }(e);
        }
    }
    function f(e, t) {
        this.fun = e, this.array = t;
    }
    function p() {}
    a.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
        _.push(new f(e, t)), 1 !== _.length || h || o(l);
    }, f.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", 
    a.versions = {}, a.on = p, a.addListener = p, a.once = p, a.off = p, a.removeListener = p, 
    a.removeAllListeners = p, a.emit = p, a.prependListener = p, a.prependOnceListener = p, 
    a.listeners = function(e) {
        return [];
    }, a.binding = function(e) {
        throw new Error("process.binding is not supported");
    }, a.cwd = function() {
        return "/";
    }, a.chdir = function(e) {
        throw new Error("process.chdir is not supported");
    }, a.umask = function() {
        return 0;
    };
}, function(e, t) {
    var i;
    i = function() {
        return this;
    }();
    try {
        i = i || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (i = window);
    }
    e.exports = i;
}, function(e, t, i) {
    i.r(t);
    var n = i(9), a = i(12), r = i(10), s = i(1);
    t.default = function(e) {
        var t = null, i = function(t, i) {
            e.postMessage({
                msg: "logcat_callback",
                data: {
                    type: t,
                    logcat: i
                }
            });
        }.bind(this);
        function o(t, i) {
            var n = {
                msg: s.a.INIT_SEGMENT,
                data: {
                    type: t,
                    data: i
                }
            };
            e.postMessage(n, [ i.data ]);
        }
        function d(t, i) {
            var n = {
                msg: s.a.MEDIA_SEGMENT,
                data: {
                    type: t,
                    data: i
                }
            };
            e.postMessage(n, [ i.data ]);
        }
        function _() {
            var t = {
                msg: s.a.LOADING_COMPLETE
            };
            e.postMessage(t);
        }
        function h() {
            var t = {
                msg: s.a.RECOVERED_EARLY_EOF
            };
            e.postMessage(t);
        }
        function c(t) {
            var i = {
                msg: s.a.MEDIA_INFO,
                data: t
            };
            e.postMessage(i);
        }
        function u(t) {
            var i = {
                msg: s.a.METADATA_ARRIVED,
                data: t
            };
            e.postMessage(i);
        }
        function l(t) {
            var i = {
                msg: s.a.SCRIPTDATA_ARRIVED,
                data: t
            };
            e.postMessage(i);
        }
        function f(t) {
            var i = {
                msg: s.a.TIMED_ID3_METADATA_ARRIVED,
                data: t
            };
            e.postMessage(i);
        }
        function p(t) {
            var i = {
                msg: s.a.SMPTE2038_METADATA_ARRIVED,
                data: t
            };
            e.postMessage(i);
        }
        function m(t) {
            var i = {
                msg: s.a.SCTE35_METADATA_ARRIVED,
                data: t
            };
            e.postMessage(i);
        }
        function g(t) {
            var i = {
                msg: s.a.PES_PRIVATE_DATA_DESCRIPTOR,
                data: t
            };
            e.postMessage(i);
        }
        function v(t) {
            var i = {
                msg: s.a.PES_PRIVATE_DATA_ARRIVED,
                data: t
            };
            e.postMessage(i);
        }
        function y(t) {
            var i = {
                msg: s.a.STATISTICS_INFO,
                data: t
            };
            e.postMessage(i);
        }
        function b(t, i) {
            e.postMessage({
                msg: s.a.IO_ERROR,
                data: {
                    type: t,
                    info: i
                }
            });
        }
        function S(t, i) {
            e.postMessage({
                msg: s.a.DEMUX_ERROR,
                data: {
                    type: t,
                    info: i
                }
            });
        }
        function E(t) {
            e.postMessage({
                msg: s.a.RECOMMEND_SEEKPOINT,
                data: t
            });
        }
        a.a.install(), e.addEventListener("message", (function(a) {
            switch (a.data.cmd) {
              case "init":
                (t = new r.a(a.data.param[0], a.data.param[1])).on(s.a.IO_ERROR, b.bind(this)), 
                t.on(s.a.DEMUX_ERROR, S.bind(this)), t.on(s.a.INIT_SEGMENT, o.bind(this)), t.on(s.a.MEDIA_SEGMENT, d.bind(this)), 
                t.on(s.a.LOADING_COMPLETE, _.bind(this)), t.on(s.a.RECOVERED_EARLY_EOF, h.bind(this)), 
                t.on(s.a.MEDIA_INFO, c.bind(this)), t.on(s.a.METADATA_ARRIVED, u.bind(this)), t.on(s.a.SCRIPTDATA_ARRIVED, l.bind(this)), 
                t.on(s.a.TIMED_ID3_METADATA_ARRIVED, f.bind(this)), t.on(s.a.SMPTE2038_METADATA_ARRIVED, p.bind(this)), 
                t.on(s.a.SCTE35_METADATA_ARRIVED, m.bind(this)), t.on(s.a.PES_PRIVATE_DATA_DESCRIPTOR, g.bind(this)), 
                t.on(s.a.PES_PRIVATE_DATA_ARRIVED, v.bind(this)), t.on(s.a.STATISTICS_INFO, y.bind(this)), 
                t.on(s.a.RECOMMEND_SEEKPOINT, E.bind(this));
                break;

              case "destroy":
                t && (t.destroy(), t = null), e.postMessage({
                    msg: "destroyed"
                });
                break;

              case "start":
                t.start();
                break;

              case "stop":
                t.stop();
                break;

              case "seek":
                t.seek(a.data.param);
                break;

              case "pause":
                t.pause();
                break;

              case "resume":
                t.resume();
                break;

              case "logging_config":
                var A = a.data.param;
                n.a.applyConfig(A), !0 === A.enableCallback ? n.a.addLogListener(i) : n.a.removeLogListener(i);
            }
        }));
    };
}, function(e, t, i) {
    i.r(t);
    var n = i(12), a = i(11), r = {
        enableWorker: !1,
        enableStashBuffer: !0,
        stashInitialSize: void 0,
        isLive: !1,
        liveBufferLatencyChasing: !1,
        liveBufferLatencyMaxLatency: 1.5,
        liveBufferLatencyMinRemain: .5,
        lazyLoad: !0,
        lazyLoadMaxDuration: 180,
        lazyLoadRecoverDuration: 30,
        deferLoadAfterSourceOpen: !0,
        autoCleanupMaxBackwardDuration: 180,
        autoCleanupMinBackwardDuration: 120,
        statisticsInfoReportInterval: 600,
        fixAudioTimestampGap: !0,
        accurateSeek: !1,
        seekType: "range",
        seekParamStart: "bstart",
        seekParamEnd: "bend",
        rangeLoadZeroStart: !1,
        customSeekHandler: void 0,
        reuseRedirectedURL: !1,
        headers: void 0,
        customLoader: void 0
    };
    function s() {
        return Object.assign({}, r);
    }
    var o = function() {
        function e() {}
        return e.supportMSEH264Playback = function() {
            return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
        }, e.supportMSEH265Playback = function() {
            return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="hvc1.1.6.L93.B0"');
        }, e.supportNetworkStreamIO = function() {
            var e = new a.a({}, s()), t = e.loaderType;
            return e.destroy(), "fetch-stream-loader" == t || "xhr-moz-chunked-loader" == t;
        }, e.getNetworkLoaderTypeName = function() {
            var e = new a.a({}, s()), t = e.loaderType;
            return e.destroy(), t;
        }, e.supportNativeMediaPlayback = function(t) {
            null == e.videoElement && (e.videoElement = window.document.createElement("video"));
            var i = e.videoElement.canPlayType(t);
            return "probably" === i || "maybe" == i;
        }, e.getFeatureList = function() {
            var t = {
                msePlayback: !1,
                mseLivePlayback: !1,
                mseH265Playback: !1,
                networkStreamIO: !1,
                networkLoaderName: "",
                nativeMP4H264Playback: !1,
                nativeMP4H265Playback: !1,
                nativeWebmVP8Playback: !1,
                nativeWebmVP9Playback: !1
            };
            return t.msePlayback = e.supportMSEH264Playback(), t.networkStreamIO = e.supportNetworkStreamIO(), 
            t.networkLoaderName = e.getNetworkLoaderTypeName(), t.mseLivePlayback = t.msePlayback && t.networkStreamIO, 
            t.mseH265Playback = e.supportMSEH265Playback(), t.nativeMP4H264Playback = e.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"'), 
            t.nativeMP4H265Playback = e.supportNativeMediaPlayback('video/mp4; codecs="hvc1.1.6.L93.B0"'), 
            t.nativeWebmVP8Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"'), 
            t.nativeWebmVP9Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp9"'), 
            t;
        }, e;
    }(), d = i(2), _ = i(6), h = i.n(_), c = i(0), u = i(4), l = {
        ERROR: "error",
        LOADING_COMPLETE: "loading_complete",
        RECOVERED_EARLY_EOF: "recovered_early_eof",
        MEDIA_INFO: "media_info",
        METADATA_ARRIVED: "metadata_arrived",
        SCRIPTDATA_ARRIVED: "scriptdata_arrived",
        TIMED_ID3_METADATA_ARRIVED: "timed_id3_metadata_arrived",
        SMPTE2038_METADATA_ARRIVED: "smpte2038_metadata_arrived",
        SCTE35_METADATA_ARRIVED: "scte35_metadata_arrived",
        PES_PRIVATE_DATA_DESCRIPTOR: "pes_private_data_descriptor",
        PES_PRIVATE_DATA_ARRIVED: "pes_private_data_arrived",
        STATISTICS_INFO: "statistics_info"
    }, f = i(13), p = i.n(f), m = i(9), g = i(10), v = i(1), y = i(8), b = function() {
        function e(e, t) {
            if (this.TAG = "Transmuxer", this._emitter = new h.a, t.enableWorker && "undefined" != typeof Worker) try {
                this._worker = p()(18), this._workerDestroying = !1, this._worker.addEventListener("message", this._onWorkerMessage.bind(this)), 
                this._worker.postMessage({
                    cmd: "init",
                    param: [ e, t ]
                }), this.e = {
                    onLoggingConfigChanged: this._onLoggingConfigChanged.bind(this)
                }, m.a.registerListener(this.e.onLoggingConfigChanged), this._worker.postMessage({
                    cmd: "logging_config",
                    param: m.a.getConfig()
                });
            } catch (i) {
                c.a.e(this.TAG, "Error while initialize transmuxing worker, fallback to inline transmuxing"), 
                this._worker = null, this._controller = new g.a(e, t);
            } else this._controller = new g.a(e, t);
            if (this._controller) {
                var i = this._controller;
                i.on(v.a.IO_ERROR, this._onIOError.bind(this)), i.on(v.a.DEMUX_ERROR, this._onDemuxError.bind(this)), 
                i.on(v.a.INIT_SEGMENT, this._onInitSegment.bind(this)), i.on(v.a.MEDIA_SEGMENT, this._onMediaSegment.bind(this)), 
                i.on(v.a.LOADING_COMPLETE, this._onLoadingComplete.bind(this)), i.on(v.a.RECOVERED_EARLY_EOF, this._onRecoveredEarlyEof.bind(this)), 
                i.on(v.a.MEDIA_INFO, this._onMediaInfo.bind(this)), i.on(v.a.METADATA_ARRIVED, this._onMetaDataArrived.bind(this)), 
                i.on(v.a.SCRIPTDATA_ARRIVED, this._onScriptDataArrived.bind(this)), i.on(v.a.TIMED_ID3_METADATA_ARRIVED, this._onTimedID3MetadataArrived.bind(this)), 
                i.on(v.a.SMPTE2038_METADATA_ARRIVED, this._onSMPTE2038MetadataArrived.bind(this)), 
                i.on(v.a.SCTE35_METADATA_ARRIVED, this._onSCTE35MetadataArrived.bind(this)), i.on(v.a.PES_PRIVATE_DATA_DESCRIPTOR, this._onPESPrivateDataDescriptor.bind(this)), 
                i.on(v.a.PES_PRIVATE_DATA_ARRIVED, this._onPESPrivateDataArrived.bind(this)), i.on(v.a.STATISTICS_INFO, this._onStatisticsInfo.bind(this)), 
                i.on(v.a.RECOMMEND_SEEKPOINT, this._onRecommendSeekpoint.bind(this));
            }
        }
        return e.prototype.destroy = function() {
            this._worker ? this._workerDestroying || (this._workerDestroying = !0, this._worker.postMessage({
                cmd: "destroy"
            }), m.a.removeListener(this.e.onLoggingConfigChanged), this.e = null) : (this._controller.destroy(), 
            this._controller = null), this._emitter.removeAllListeners(), this._emitter = null;
        }, e.prototype.on = function(e, t) {
            this._emitter.addListener(e, t);
        }, e.prototype.off = function(e, t) {
            this._emitter.removeListener(e, t);
        }, e.prototype.hasWorker = function() {
            return null != this._worker;
        }, e.prototype.open = function() {
            this._worker ? this._worker.postMessage({
                cmd: "start"
            }) : this._controller.start();
        }, e.prototype.close = function() {
            this._worker ? this._worker.postMessage({
                cmd: "stop"
            }) : this._controller.stop();
        }, e.prototype.seek = function(e) {
            this._worker ? this._worker.postMessage({
                cmd: "seek",
                param: e
            }) : this._controller.seek(e);
        }, e.prototype.pause = function() {
            this._worker ? this._worker.postMessage({
                cmd: "pause"
            }) : this._controller.pause();
        }, e.prototype.resume = function() {
            this._worker ? this._worker.postMessage({
                cmd: "resume"
            }) : this._controller.resume();
        }, e.prototype._onInitSegment = function(e, t) {
            var i = this;
            Promise.resolve().then((function() {
                i._emitter.emit(v.a.INIT_SEGMENT, e, t);
            }));
        }, e.prototype._onMediaSegment = function(e, t) {
            var i = this;
            Promise.resolve().then((function() {
                i._emitter.emit(v.a.MEDIA_SEGMENT, e, t);
            }));
        }, e.prototype._onLoadingComplete = function() {
            var e = this;
            Promise.resolve().then((function() {
                e._emitter.emit(v.a.LOADING_COMPLETE);
            }));
        }, e.prototype._onRecoveredEarlyEof = function() {
            var e = this;
            Promise.resolve().then((function() {
                e._emitter.emit(v.a.RECOVERED_EARLY_EOF);
            }));
        }, e.prototype._onMediaInfo = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.MEDIA_INFO, e);
            }));
        }, e.prototype._onMetaDataArrived = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.METADATA_ARRIVED, e);
            }));
        }, e.prototype._onScriptDataArrived = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.SCRIPTDATA_ARRIVED, e);
            }));
        }, e.prototype._onTimedID3MetadataArrived = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.TIMED_ID3_METADATA_ARRIVED, e);
            }));
        }, e.prototype._onSMPTE2038MetadataArrived = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.SMPTE2038_METADATA_ARRIVED, e);
            }));
        }, e.prototype._onSCTE35MetadataArrived = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.SCTE35_METADATA_ARRIVED, e);
            }));
        }, e.prototype._onPESPrivateDataDescriptor = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.PES_PRIVATE_DATA_DESCRIPTOR, e);
            }));
        }, e.prototype._onPESPrivateDataArrived = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.PES_PRIVATE_DATA_ARRIVED, e);
            }));
        }, e.prototype._onStatisticsInfo = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.STATISTICS_INFO, e);
            }));
        }, e.prototype._onIOError = function(e, t) {
            var i = this;
            Promise.resolve().then((function() {
                i._emitter.emit(v.a.IO_ERROR, e, t);
            }));
        }, e.prototype._onDemuxError = function(e, t) {
            var i = this;
            Promise.resolve().then((function() {
                i._emitter.emit(v.a.DEMUX_ERROR, e, t);
            }));
        }, e.prototype._onRecommendSeekpoint = function(e) {
            var t = this;
            Promise.resolve().then((function() {
                t._emitter.emit(v.a.RECOMMEND_SEEKPOINT, e);
            }));
        }, e.prototype._onLoggingConfigChanged = function(e) {
            this._worker && this._worker.postMessage({
                cmd: "logging_config",
                param: e
            });
        }, e.prototype._onWorkerMessage = function(e) {
            var t = e.data, i = t.data;
            if ("destroyed" === t.msg || this._workerDestroying) return this._workerDestroying = !1, 
            this._worker.terminate(), void (this._worker = null);
            switch (t.msg) {
              case v.a.INIT_SEGMENT:
              case v.a.MEDIA_SEGMENT:
                this._emitter.emit(t.msg, i.type, i.data);
                break;

              case v.a.LOADING_COMPLETE:
              case v.a.RECOVERED_EARLY_EOF:
                this._emitter.emit(t.msg);
                break;

              case v.a.MEDIA_INFO:
                Object.setPrototypeOf(i, y.a.prototype), this._emitter.emit(t.msg, i);
                break;

              case v.a.METADATA_ARRIVED:
              case v.a.SCRIPTDATA_ARRIVED:
              case v.a.TIMED_ID3_METADATA_ARRIVED:
              case v.a.SMPTE2038_METADATA_ARRIVED:
              case v.a.SCTE35_METADATA_ARRIVED:
              case v.a.PES_PRIVATE_DATA_DESCRIPTOR:
              case v.a.PES_PRIVATE_DATA_ARRIVED:
              case v.a.STATISTICS_INFO:
                this._emitter.emit(t.msg, i);
                break;

              case v.a.IO_ERROR:
              case v.a.DEMUX_ERROR:
                this._emitter.emit(t.msg, i.type, i.info);
                break;

              case v.a.RECOMMEND_SEEKPOINT:
                this._emitter.emit(t.msg, i);
                break;

              case "logcat_callback":
                c.a.emitter.emit("log", i.type, i.logcat);
            }
        }, e;
    }(), S = {
        ERROR: "error",
        SOURCE_OPEN: "source_open",
        UPDATE_END: "update_end",
        BUFFER_FULL: "buffer_full"
    }, E = i(7), A = i(3), R = function() {
        function e(e) {
            this.TAG = "MSEController", this._config = e, this._emitter = new h.a, this._config.isLive && null == this._config.autoCleanupSourceBuffer && (this._config.autoCleanupSourceBuffer = !0), 
            this.e = {
                onSourceOpen: this._onSourceOpen.bind(this),
                onSourceEnded: this._onSourceEnded.bind(this),
                onSourceClose: this._onSourceClose.bind(this),
                onSourceBufferError: this._onSourceBufferError.bind(this),
                onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
            }, this._mediaSource = null, this._mediaSourceObjectURL = null, this._mediaElement = null, 
            this._isBufferFull = !1, this._hasPendingEos = !1, this._requireSetMediaDuration = !1, 
            this._pendingMediaDuration = 0, this._pendingSourceBufferInit = [], this._mimeTypes = {
                video: null,
                audio: null
            }, this._sourceBuffers = {
                video: null,
                audio: null
            }, this._lastInitSegments = {
                video: null,
                audio: null
            }, this._pendingSegments = {
                video: [],
                audio: []
            }, this._pendingRemoveRanges = {
                video: [],
                audio: []
            }, this._idrList = new E.a;
        }
        return e.prototype.destroy = function() {
            (this._mediaElement || this._mediaSource) && this.detachMediaElement(), this.e = null, 
            this._emitter.removeAllListeners(), this._emitter = null;
        }, e.prototype.on = function(e, t) {
            this._emitter.addListener(e, t);
        }, e.prototype.off = function(e, t) {
            this._emitter.removeListener(e, t);
        }, e.prototype.attachMediaElement = function(e) {
            if (this._mediaSource) throw new A.a("MediaSource has been attached to an HTMLMediaElement!");
            var t = this._mediaSource = new window.MediaSource;
            t.addEventListener("sourceopen", this.e.onSourceOpen), t.addEventListener("sourceended", this.e.onSourceEnded), 
            t.addEventListener("sourceclose", this.e.onSourceClose), this._mediaElement = e, 
            this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource), e.src = this._mediaSourceObjectURL;
        }, e.prototype.detachMediaElement = function() {
            if (this._mediaSource) {
                var e = this._mediaSource;
                for (var t in this._sourceBuffers) {
                    var i = this._pendingSegments[t];
                    i.splice(0, i.length), this._pendingSegments[t] = null, this._pendingRemoveRanges[t] = null, 
                    this._lastInitSegments[t] = null;
                    var n = this._sourceBuffers[t];
                    if (n) {
                        if ("closed" !== e.readyState) {
                            try {
                                e.removeSourceBuffer(n);
                            } catch (e) {
                                c.a.e(this.TAG, e.message);
                            }
                            n.removeEventListener("error", this.e.onSourceBufferError), n.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd);
                        }
                        this._mimeTypes[t] = null, this._sourceBuffers[t] = null;
                    }
                }
                if ("open" === e.readyState) try {
                    e.endOfStream();
                } catch (e) {
                    c.a.e(this.TAG, e.message);
                }
                e.removeEventListener("sourceopen", this.e.onSourceOpen), e.removeEventListener("sourceended", this.e.onSourceEnded), 
                e.removeEventListener("sourceclose", this.e.onSourceClose), this._pendingSourceBufferInit = [], 
                this._isBufferFull = !1, this._idrList.clear(), this._mediaSource = null;
            }
            this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src"), 
            this._mediaElement = null), this._mediaSourceObjectURL && (window.URL.revokeObjectURL(this._mediaSourceObjectURL), 
            this._mediaSourceObjectURL = null);
        }, e.prototype.appendInitSegment = function(e, t) {
            if (!this._mediaSource || "open" !== this._mediaSource.readyState) return this._pendingSourceBufferInit.push(e), 
            void this._pendingSegments[e.type].push(e);
            var i = e, n = "" + i.container;
            i.codec && i.codec.length > 0 && (n += ";codecs=" + i.codec);
            var a = !1;
            if (c.a.v(this.TAG, "Received Initialization Segment, mimeType: " + n), this._lastInitSegments[i.type] = i, 
            n !== this._mimeTypes[i.type]) {
                if (this._mimeTypes[i.type]) c.a.v(this.TAG, "Notice: " + i.type + " mimeType changed, origin: " + this._mimeTypes[i.type] + ", target: " + n); else {
                    a = !0;
                    try {
                        var r = this._sourceBuffers[i.type] = this._mediaSource.addSourceBuffer(n);
                        r.addEventListener("error", this.e.onSourceBufferError), r.addEventListener("updateend", this.e.onSourceBufferUpdateEnd);
                    } catch (e) {
                        return c.a.e(this.TAG, e.message), void this._emitter.emit(S.ERROR, {
                            code: e.code,
                            msg: e.message
                        });
                    }
                }
                this._mimeTypes[i.type] = n;
            }
            t || this._pendingSegments[i.type].push(i), a || this._sourceBuffers[i.type] && !this._sourceBuffers[i.type].updating && this._doAppendSegments(), 
            u.a.safari && "audio/mpeg" === i.container && i.mediaDuration > 0 && (this._requireSetMediaDuration = !0, 
            this._pendingMediaDuration = i.mediaDuration / 1e3, this._updateMediaSourceDuration());
        }, e.prototype.appendMediaSegment = function(e) {
            var t = e;
            this._pendingSegments[t.type].push(t), this._config.autoCleanupSourceBuffer && this._needCleanupSourceBuffer() && this._doCleanupSourceBuffer();
            var i = this._sourceBuffers[t.type];
            !i || i.updating || this._hasPendingRemoveRanges() || this._doAppendSegments();
        }, e.prototype.seek = function(e) {
            for (var t in this._sourceBuffers) if (this._sourceBuffers[t]) {
                var i = this._sourceBuffers[t];
                if ("open" === this._mediaSource.readyState) try {
                    i.abort();
                } catch (e) {
                    c.a.e(this.TAG, e.message);
                }
                this._idrList.clear();
                var n = this._pendingSegments[t];
                if (n.splice(0, n.length), "closed" !== this._mediaSource.readyState) {
                    for (var a = 0; a < i.buffered.length; a++) {
                        var r = i.buffered.start(a), s = i.buffered.end(a);
                        this._pendingRemoveRanges[t].push({
                            start: r,
                            end: s
                        });
                    }
                    if (i.updating || this._doRemoveRanges(), u.a.safari) {
                        var o = this._lastInitSegments[t];
                        o && (this._pendingSegments[t].push(o), i.updating || this._doAppendSegments());
                    }
                }
            }
        }, e.prototype.endOfStream = function() {
            var e = this._mediaSource, t = this._sourceBuffers;
            e && "open" === e.readyState ? t.video && t.video.updating || t.audio && t.audio.updating ? this._hasPendingEos = !0 : (this._hasPendingEos = !1, 
            e.endOfStream()) : e && "closed" === e.readyState && this._hasPendingSegments() && (this._hasPendingEos = !0);
        }, e.prototype.getNearestKeyframe = function(e) {
            return this._idrList.getLastSyncPointBeforeDts(e);
        }, e.prototype._needCleanupSourceBuffer = function() {
            if (!this._config.autoCleanupSourceBuffer) return !1;
            var e = this._mediaElement.currentTime;
            for (var t in this._sourceBuffers) {
                var i = this._sourceBuffers[t];
                if (i) {
                    var n = i.buffered;
                    if (n.length >= 1 && e - n.start(0) >= this._config.autoCleanupMaxBackwardDuration) return !0;
                }
            }
            return !1;
        }, e.prototype._doCleanupSourceBuffer = function() {
            var e = this._mediaElement.currentTime;
            for (var t in this._sourceBuffers) {
                var i = this._sourceBuffers[t];
                if (i) {
                    for (var n = i.buffered, a = !1, r = 0; r < n.length; r++) {
                        var s = n.start(r), o = n.end(r);
                        if (s <= e && e < o + 3) {
                            if (e - s >= this._config.autoCleanupMaxBackwardDuration) {
                                a = !0;
                                var d = e - this._config.autoCleanupMinBackwardDuration;
                                this._pendingRemoveRanges[t].push({
                                    start: s,
                                    end: d
                                });
                            }
                        } else o < e && (a = !0, this._pendingRemoveRanges[t].push({
                            start: s,
                            end: o
                        }));
                    }
                    a && !i.updating && this._doRemoveRanges();
                }
            }
        }, e.prototype._updateMediaSourceDuration = function() {
            var e = this._sourceBuffers;
            if (0 !== this._mediaElement.readyState && "open" === this._mediaSource.readyState && !(e.video && e.video.updating || e.audio && e.audio.updating)) {
                var t = this._mediaSource.duration, i = this._pendingMediaDuration;
                i > 0 && (isNaN(t) || i > t) && (c.a.v(this.TAG, "Update MediaSource duration from " + t + " to " + i), 
                this._mediaSource.duration = i), this._requireSetMediaDuration = !1, this._pendingMediaDuration = 0;
            }
        }, e.prototype._doRemoveRanges = function() {
            for (var e in this._pendingRemoveRanges) if (this._sourceBuffers[e] && !this._sourceBuffers[e].updating) for (var t = this._sourceBuffers[e], i = this._pendingRemoveRanges[e]; i.length && !t.updating; ) {
                var n = i.shift();
                t.remove(n.start, n.end);
            }
        }, e.prototype._doAppendSegments = function() {
            var e = this._pendingSegments;
            for (var t in e) if (this._sourceBuffers[t] && !this._sourceBuffers[t].updating && e[t].length > 0) {
                var i = e[t].shift();
                if (i.timestampOffset) {
                    var n = this._sourceBuffers[t].timestampOffset, a = i.timestampOffset / 1e3;
                    Math.abs(n - a) > .1 && (c.a.v(this.TAG, "Update MPEG audio timestampOffset from " + n + " to " + a), 
                    this._sourceBuffers[t].timestampOffset = a), delete i.timestampOffset;
                }
                if (!i.data || 0 === i.data.byteLength) continue;
                try {
                    this._sourceBuffers[t].appendBuffer(i.data), this._isBufferFull = !1, "video" === t && i.hasOwnProperty("info") && this._idrList.appendArray(i.info.syncPoints);
                } catch (e) {
                    this._pendingSegments[t].unshift(i), 22 === e.code ? (this._isBufferFull || this._emitter.emit(S.BUFFER_FULL), 
                    this._isBufferFull = !0) : (c.a.e(this.TAG, e.message), this._emitter.emit(S.ERROR, {
                        code: e.code,
                        msg: e.message
                    }));
                }
            }
        }, e.prototype._onSourceOpen = function() {
            if (c.a.v(this.TAG, "MediaSource onSourceOpen"), this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), 
            this._pendingSourceBufferInit.length > 0) for (var e = this._pendingSourceBufferInit; e.length; ) {
                var t = e.shift();
                this.appendInitSegment(t, !0);
            }
            this._hasPendingSegments() && this._doAppendSegments(), this._emitter.emit(S.SOURCE_OPEN);
        }, e.prototype._onSourceEnded = function() {
            c.a.v(this.TAG, "MediaSource onSourceEnded");
        }, e.prototype._onSourceClose = function() {
            c.a.v(this.TAG, "MediaSource onSourceClose"), this._mediaSource && null != this.e && (this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), 
            this._mediaSource.removeEventListener("sourceended", this.e.onSourceEnded), this._mediaSource.removeEventListener("sourceclose", this.e.onSourceClose));
        }, e.prototype._hasPendingSegments = function() {
            var e = this._pendingSegments;
            return e.video.length > 0 || e.audio.length > 0;
        }, e.prototype._hasPendingRemoveRanges = function() {
            var e = this._pendingRemoveRanges;
            return e.video.length > 0 || e.audio.length > 0;
        }, e.prototype._onSourceBufferUpdateEnd = function() {
            this._requireSetMediaDuration ? this._updateMediaSourceDuration() : this._hasPendingRemoveRanges() ? this._doRemoveRanges() : this._hasPendingSegments() ? this._doAppendSegments() : this._hasPendingEos && this.endOfStream(), 
            this._emitter.emit(S.UPDATE_END);
        }, e.prototype._onSourceBufferError = function(e) {
            c.a.e(this.TAG, "SourceBuffer Error: " + e);
        }, e;
    }(), T = i(5), L = {
        NETWORK_ERROR: "NetworkError",
        MEDIA_ERROR: "MediaError",
        OTHER_ERROR: "OtherError"
    }, w = {
        NETWORK_EXCEPTION: d.b.EXCEPTION,
        NETWORK_STATUS_CODE_INVALID: d.b.HTTP_STATUS_CODE_INVALID,
        NETWORK_TIMEOUT: d.b.CONNECTING_TIMEOUT,
        NETWORK_UNRECOVERABLE_EARLY_EOF: d.b.UNRECOVERABLE_EARLY_EOF,
        MEDIA_MSE_ERROR: "MediaMSEError",
        MEDIA_FORMAT_ERROR: T.a.FORMAT_ERROR,
        MEDIA_FORMAT_UNSUPPORTED: T.a.FORMAT_UNSUPPORTED,
        MEDIA_CODEC_UNSUPPORTED: T.a.CODEC_UNSUPPORTED
    }, k = function() {
        function e(e, t) {
            this.TAG = "MSEPlayer", this._type = "MSEPlayer", this._emitter = new h.a, this._config = s(), 
            "object" == typeof t && Object.assign(this._config, t);
            var i = e.type.toLowerCase();
            if ("mse" !== i && "mpegts" !== i && "m2ts" !== i && "flv" !== i) throw new A.b("MSEPlayer requires an mpegts/m2ts/flv MediaDataSource input!");
            !0 === e.isLive && (this._config.isLive = !0), this.e = {
                onvLoadedMetadata: this._onvLoadedMetadata.bind(this),
                onvSeeking: this._onvSeeking.bind(this),
                onvCanPlay: this._onvCanPlay.bind(this),
                onvStalled: this._onvStalled.bind(this),
                onvProgress: this._onvProgress.bind(this)
            }, self.performance && self.performance.now ? this._now = self.performance.now.bind(self.performance) : this._now = Date.now, 
            this._pendingSeekTime = null, this._requestSetTime = !1, this._seekpointRecord = null, 
            this._progressChecker = null, this._mediaDataSource = e, this._mediaElement = null, 
            this._msectl = null, this._transmuxer = null, this._mseSourceOpened = !1, this._hasPendingLoad = !1, 
            this._receivedCanPlay = !1, this._mediaInfo = null, this._statisticsInfo = null;
            var n = u.a.chrome && (u.a.version.major < 50 || 50 === u.a.version.major && u.a.version.build < 2661);
            this._alwaysSeekKeyframe = !!(n || u.a.msedge || u.a.msie), this._alwaysSeekKeyframe && (this._config.accurateSeek = !1);
        }
        return e.prototype.destroy = function() {
            null != this._progressChecker && (window.clearInterval(this._progressChecker), this._progressChecker = null), 
            this._transmuxer && this.unload(), this._mediaElement && this.detachMediaElement(), 
            this.e = null, this._mediaDataSource = null, this._emitter.removeAllListeners(), 
            this._emitter = null;
        }, e.prototype.on = function(e, t) {
            var i = this;
            e === l.MEDIA_INFO ? null != this._mediaInfo && Promise.resolve().then((function() {
                i._emitter.emit(l.MEDIA_INFO, i.mediaInfo);
            })) : e === l.STATISTICS_INFO && null != this._statisticsInfo && Promise.resolve().then((function() {
                i._emitter.emit(l.STATISTICS_INFO, i.statisticsInfo);
            })), this._emitter.addListener(e, t);
        }, e.prototype.off = function(e, t) {
            this._emitter.removeListener(e, t);
        }, e.prototype.attachMediaElement = function(e) {
            var t = this;
            if (this._mediaElement = e, e.addEventListener("loadedmetadata", this.e.onvLoadedMetadata), 
            e.addEventListener("seeking", this.e.onvSeeking), e.addEventListener("canplay", this.e.onvCanPlay), 
            e.addEventListener("stalled", this.e.onvStalled), e.addEventListener("progress", this.e.onvProgress), 
            this._msectl = new R(this._config), this._msectl.on(S.UPDATE_END, this._onmseUpdateEnd.bind(this)), 
            this._msectl.on(S.BUFFER_FULL, this._onmseBufferFull.bind(this)), this._msectl.on(S.SOURCE_OPEN, (function() {
                t._mseSourceOpened = !0, t._hasPendingLoad && (t._hasPendingLoad = !1, t.load());
            })), this._msectl.on(S.ERROR, (function(e) {
                t._emitter.emit(l.ERROR, L.MEDIA_ERROR, w.MEDIA_MSE_ERROR, e);
            })), this._msectl.attachMediaElement(e), null != this._pendingSeekTime) try {
                e.currentTime = this._pendingSeekTime, this._pendingSeekTime = null;
            } catch (e) {}
        }, e.prototype.detachMediaElement = function() {
            this._mediaElement && (this._msectl.detachMediaElement(), this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata), 
            this._mediaElement.removeEventListener("seeking", this.e.onvSeeking), this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay), 
            this._mediaElement.removeEventListener("stalled", this.e.onvStalled), this._mediaElement.removeEventListener("progress", this.e.onvProgress), 
            this._mediaElement = null), this._msectl && (this._msectl.destroy(), this._msectl = null);
        }, e.prototype.load = function() {
            var e = this;
            if (!this._mediaElement) throw new A.a("HTMLMediaElement must be attached before load()!");
            if (this._transmuxer) throw new A.a("MSEPlayer.load() has been called, please call unload() first!");
            this._hasPendingLoad || (this._config.deferLoadAfterSourceOpen && !1 === this._mseSourceOpened ? this._hasPendingLoad = !0 : (this._mediaElement.readyState > 0 && (this._requestSetTime = !0, 
            this._mediaElement.currentTime = 0), this._transmuxer = new b(this._mediaDataSource, this._config), 
            this._transmuxer.on(v.a.INIT_SEGMENT, (function(t, i) {
                e._msectl.appendInitSegment(i);
            })), this._transmuxer.on(v.a.MEDIA_SEGMENT, (function(t, i) {
                if (e._msectl.appendMediaSegment(i), e._config.lazyLoad && !e._config.isLive) {
                    var n = e._mediaElement.currentTime;
                    i.info.endDts >= 1e3 * (n + e._config.lazyLoadMaxDuration) && null == e._progressChecker && (c.a.v(e.TAG, "Maximum buffering duration exceeded, suspend transmuxing task"), 
                    e._suspendTransmuxer());
                }
            })), this._transmuxer.on(v.a.LOADING_COMPLETE, (function() {
                e._msectl.endOfStream(), e._emitter.emit(l.LOADING_COMPLETE);
            })), this._transmuxer.on(v.a.RECOVERED_EARLY_EOF, (function() {
                e._emitter.emit(l.RECOVERED_EARLY_EOF);
            })), this._transmuxer.on(v.a.IO_ERROR, (function(t, i) {
                e._emitter.emit(l.ERROR, L.NETWORK_ERROR, t, i);
            })), this._transmuxer.on(v.a.DEMUX_ERROR, (function(t, i) {
                e._emitter.emit(l.ERROR, L.MEDIA_ERROR, t, {
                    code: -1,
                    msg: i
                });
            })), this._transmuxer.on(v.a.MEDIA_INFO, (function(t) {
                e._mediaInfo = t, e._emitter.emit(l.MEDIA_INFO, Object.assign({}, t));
            })), this._transmuxer.on(v.a.METADATA_ARRIVED, (function(t) {
                e._emitter.emit(l.METADATA_ARRIVED, t);
            })), this._transmuxer.on(v.a.SCRIPTDATA_ARRIVED, (function(t) {
                e._emitter.emit(l.SCRIPTDATA_ARRIVED, t);
            })), this._transmuxer.on(v.a.TIMED_ID3_METADATA_ARRIVED, (function(t) {
                e._emitter.emit(l.TIMED_ID3_METADATA_ARRIVED, t);
            })), this._transmuxer.on(v.a.SMPTE2038_METADATA_ARRIVED, (function(t) {
                e._emitter.emit(l.SMPTE2038_METADATA_ARRIVED, t);
            })), this._transmuxer.on(v.a.SCTE35_METADATA_ARRIVED, (function(t) {
                e._emitter.emit(l.SCTE35_METADATA_ARRIVED, t);
            })), this._transmuxer.on(v.a.PES_PRIVATE_DATA_DESCRIPTOR, (function(t) {
                e._emitter.emit(l.PES_PRIVATE_DATA_DESCRIPTOR, t);
            })), this._transmuxer.on(v.a.PES_PRIVATE_DATA_ARRIVED, (function(t) {
                e._emitter.emit(l.PES_PRIVATE_DATA_ARRIVED, t);
            })), this._transmuxer.on(v.a.STATISTICS_INFO, (function(t) {
                e._statisticsInfo = e._fillStatisticsInfo(t), e._emitter.emit(l.STATISTICS_INFO, Object.assign({}, e._statisticsInfo));
            })), this._transmuxer.on(v.a.RECOMMEND_SEEKPOINT, (function(t) {
                e._mediaElement && !e._config.accurateSeek && (e._requestSetTime = !0, e._mediaElement.currentTime = t / 1e3);
            })), this._transmuxer.open()));
        }, e.prototype.unload = function() {
            this._mediaElement && this._mediaElement.pause(), this._msectl && this._msectl.seek(0), 
            this._transmuxer && (this._transmuxer.close(), this._transmuxer.destroy(), this._transmuxer = null);
        }, e.prototype.play = function() {
            return this._mediaElement.play();
        }, e.prototype.pause = function() {
            this._mediaElement.pause();
        }, Object.defineProperty(e.prototype, "type", {
            get: function() {
                return this._type;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "buffered", {
            get: function() {
                return this._mediaElement.buffered;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "duration", {
            get: function() {
                return this._mediaElement.duration;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "volume", {
            get: function() {
                return this._mediaElement.volume;
            },
            set: function(e) {
                this._mediaElement.volume = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "muted", {
            get: function() {
                return this._mediaElement.muted;
            },
            set: function(e) {
                this._mediaElement.muted = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "currentTime", {
            get: function() {
                return this._mediaElement ? this._mediaElement.currentTime : 0;
            },
            set: function(e) {
                this._mediaElement ? this._internalSeek(e) : this._pendingSeekTime = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "mediaInfo", {
            get: function() {
                return Object.assign({}, this._mediaInfo);
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "statisticsInfo", {
            get: function() {
                return null == this._statisticsInfo && (this._statisticsInfo = {}), this._statisticsInfo = this._fillStatisticsInfo(this._statisticsInfo), 
                Object.assign({}, this._statisticsInfo);
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype._fillStatisticsInfo = function(e) {
            if (e.playerType = this._type, !(this._mediaElement instanceof HTMLVideoElement)) return e;
            var t = !0, i = 0, n = 0;
            if (this._mediaElement.getVideoPlaybackQuality) {
                var a = this._mediaElement.getVideoPlaybackQuality();
                i = a.totalVideoFrames, n = a.droppedVideoFrames;
            } else null != this._mediaElement.webkitDecodedFrameCount ? (i = this._mediaElement.webkitDecodedFrameCount, 
            n = this._mediaElement.webkitDroppedFrameCount) : t = !1;
            return t && (e.decodedFrames = i, e.droppedFrames = n), e;
        }, e.prototype._onmseUpdateEnd = function() {
            var e = this._mediaElement.buffered, t = this._mediaElement.currentTime;
            if (this._config.isLive && this._config.liveBufferLatencyChasing && e.length > 0 && !this._mediaElement.paused) {
                var i = e.end(e.length - 1);
                if (i > this._config.liveBufferLatencyMaxLatency && i - t > this._config.liveBufferLatencyMaxLatency) {
                    var n = i - this._config.liveBufferLatencyMinRemain;
                    this.currentTime = n;
                }
            }
            if (this._config.lazyLoad && !this._config.isLive) {
                for (var a = 0, r = 0; r < e.length; r++) {
                    var s = e.start(r), o = e.end(r);
                    if (s <= t && t < o) {
                        a = o;
                        break;
                    }
                }
                a >= t + this._config.lazyLoadMaxDuration && null == this._progressChecker && (c.a.v(this.TAG, "Maximum buffering duration exceeded, suspend transmuxing task"), 
                this._suspendTransmuxer());
            }
        }, e.prototype._onmseBufferFull = function() {
            c.a.v(this.TAG, "MSE SourceBuffer is full, suspend transmuxing task"), null == this._progressChecker && this._suspendTransmuxer();
        }, e.prototype._suspendTransmuxer = function() {
            this._transmuxer && (this._transmuxer.pause(), null == this._progressChecker && (this._progressChecker = window.setInterval(this._checkProgressAndResume.bind(this), 1e3)));
        }, e.prototype._checkProgressAndResume = function() {
            for (var e = this._mediaElement.currentTime, t = this._mediaElement.buffered, i = !1, n = 0; n < t.length; n++) {
                var a = t.start(n), r = t.end(n);
                if (e >= a && e < r) {
                    e >= r - this._config.lazyLoadRecoverDuration && (i = !0);
                    break;
                }
            }
            i && (window.clearInterval(this._progressChecker), this._progressChecker = null, 
            i && (c.a.v(this.TAG, "Continue loading from paused position"), this._transmuxer.resume()));
        }, e.prototype._isTimepointBuffered = function(e) {
            for (var t = this._mediaElement.buffered, i = 0; i < t.length; i++) {
                var n = t.start(i), a = t.end(i);
                if (e >= n && e < a) return !0;
            }
            return !1;
        }, e.prototype._internalSeek = function(e) {
            var t = this._isTimepointBuffered(e), i = !1, n = 0;
            if (e < 1 && this._mediaElement.buffered.length > 0) {
                var a = this._mediaElement.buffered.start(0);
                (a < 1 && e < a || u.a.safari) && (i = !0, n = u.a.safari ? .1 : a);
            }
            if (i) this._requestSetTime = !0, this._mediaElement.currentTime = n; else if (t) {
                if (this._alwaysSeekKeyframe) {
                    var r = this._msectl.getNearestKeyframe(Math.floor(1e3 * e));
                    this._requestSetTime = !0, this._mediaElement.currentTime = null != r ? r.dts / 1e3 : e;
                } else this._requestSetTime = !0, this._mediaElement.currentTime = e;
                null != this._progressChecker && this._checkProgressAndResume();
            } else null != this._progressChecker && (window.clearInterval(this._progressChecker), 
            this._progressChecker = null), this._msectl.seek(e), this._transmuxer.seek(Math.floor(1e3 * e)), 
            this._config.accurateSeek && (this._requestSetTime = !0, this._mediaElement.currentTime = e);
        }, e.prototype._checkAndApplyUnbufferedSeekpoint = function() {
            if (this._seekpointRecord) if (this._seekpointRecord.recordTime <= this._now() - 100) {
                var e = this._mediaElement.currentTime;
                this._seekpointRecord = null, this._isTimepointBuffered(e) || (null != this._progressChecker && (window.clearTimeout(this._progressChecker), 
                this._progressChecker = null), this._msectl.seek(e), this._transmuxer.seek(Math.floor(1e3 * e)), 
                this._config.accurateSeek && (this._requestSetTime = !0, this._mediaElement.currentTime = e));
            } else window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50);
        }, e.prototype._checkAndResumeStuckPlayback = function(e) {
            var t = this._mediaElement;
            if (e || !this._receivedCanPlay || t.readyState < 2) {
                var i = t.buffered;
                i.length > 0 && t.currentTime < i.start(0) && (c.a.w(this.TAG, "Playback seems stuck at " + t.currentTime + ", seek to " + i.start(0)), 
                this._requestSetTime = !0, this._mediaElement.currentTime = i.start(0), this._mediaElement.removeEventListener("progress", this.e.onvProgress));
            } else this._mediaElement.removeEventListener("progress", this.e.onvProgress);
        }, e.prototype._onvLoadedMetadata = function(e) {
            null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime, 
            this._pendingSeekTime = null);
        }, e.prototype._onvSeeking = function(e) {
            var t = this._mediaElement.currentTime, i = this._mediaElement.buffered;
            if (this._requestSetTime) this._requestSetTime = !1; else {
                if (t < 1 && i.length > 0) {
                    var n = i.start(0);
                    if (n < 1 && t < n || u.a.safari) return this._requestSetTime = !0, void (this._mediaElement.currentTime = u.a.safari ? .1 : n);
                }
                if (this._isTimepointBuffered(t)) {
                    if (this._alwaysSeekKeyframe) {
                        var a = this._msectl.getNearestKeyframe(Math.floor(1e3 * t));
                        null != a && (this._requestSetTime = !0, this._mediaElement.currentTime = a.dts / 1e3);
                    }
                    null != this._progressChecker && this._checkProgressAndResume();
                } else this._seekpointRecord = {
                    seekPoint: t,
                    recordTime: this._now()
                }, window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50);
            }
        }, e.prototype._onvCanPlay = function(e) {
            this._receivedCanPlay = !0, this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay);
        }, e.prototype._onvStalled = function(e) {
            this._checkAndResumeStuckPlayback(!0);
        }, e.prototype._onvProgress = function(e) {
            this._checkAndResumeStuckPlayback();
        }, e;
    }(), D = function() {
        function e(e, t) {
            this.TAG = "NativePlayer", this._type = "NativePlayer", this._emitter = new h.a, 
            this._config = s(), "object" == typeof t && Object.assign(this._config, t);
            var i = e.type.toLowerCase();
            if ("mse" === i || "mpegts" === i || "m2ts" === i || "flv" === i) throw new A.b("NativePlayer does't support mse/mpegts/m2ts/flv MediaDataSource input!");
            if (e.hasOwnProperty("segments")) throw new A.b("NativePlayer(" + e.type + ") doesn't support multipart playback!");
            this.e = {
                onvLoadedMetadata: this._onvLoadedMetadata.bind(this)
            }, this._pendingSeekTime = null, this._statisticsReporter = null, this._mediaDataSource = e, 
            this._mediaElement = null;
        }
        return e.prototype.destroy = function() {
            this._mediaElement && (this.unload(), this.detachMediaElement()), this.e = null, 
            this._mediaDataSource = null, this._emitter.removeAllListeners(), this._emitter = null;
        }, e.prototype.on = function(e, t) {
            var i = this;
            e === l.MEDIA_INFO ? null != this._mediaElement && 0 !== this._mediaElement.readyState && Promise.resolve().then((function() {
                i._emitter.emit(l.MEDIA_INFO, i.mediaInfo);
            })) : e === l.STATISTICS_INFO && null != this._mediaElement && 0 !== this._mediaElement.readyState && Promise.resolve().then((function() {
                i._emitter.emit(l.STATISTICS_INFO, i.statisticsInfo);
            })), this._emitter.addListener(e, t);
        }, e.prototype.off = function(e, t) {
            this._emitter.removeListener(e, t);
        }, e.prototype.attachMediaElement = function(e) {
            if (this._mediaElement = e, e.addEventListener("loadedmetadata", this.e.onvLoadedMetadata), 
            null != this._pendingSeekTime) try {
                e.currentTime = this._pendingSeekTime, this._pendingSeekTime = null;
            } catch (e) {}
        }, e.prototype.detachMediaElement = function() {
            this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src"), 
            this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata), 
            this._mediaElement = null), null != this._statisticsReporter && (window.clearInterval(this._statisticsReporter), 
            this._statisticsReporter = null);
        }, e.prototype.load = function() {
            if (!this._mediaElement) throw new A.a("HTMLMediaElement must be attached before load()!");
            this._mediaElement.src = this._mediaDataSource.url, this._mediaElement.readyState > 0 && (this._mediaElement.currentTime = 0), 
            this._mediaElement.preload = "auto", this._mediaElement.load(), this._statisticsReporter = window.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval);
        }, e.prototype.unload = function() {
            this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src")), 
            null != this._statisticsReporter && (window.clearInterval(this._statisticsReporter), 
            this._statisticsReporter = null);
        }, e.prototype.play = function() {
            return this._mediaElement.play();
        }, e.prototype.pause = function() {
            this._mediaElement.pause();
        }, Object.defineProperty(e.prototype, "type", {
            get: function() {
                return this._type;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "buffered", {
            get: function() {
                return this._mediaElement.buffered;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "duration", {
            get: function() {
                return this._mediaElement.duration;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "volume", {
            get: function() {
                return this._mediaElement.volume;
            },
            set: function(e) {
                this._mediaElement.volume = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "muted", {
            get: function() {
                return this._mediaElement.muted;
            },
            set: function(e) {
                this._mediaElement.muted = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "currentTime", {
            get: function() {
                return this._mediaElement ? this._mediaElement.currentTime : 0;
            },
            set: function(e) {
                this._mediaElement ? this._mediaElement.currentTime = e : this._pendingSeekTime = e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "mediaInfo", {
            get: function() {
                var e = {
                    mimeType: (this._mediaElement instanceof HTMLAudioElement ? "audio/" : "video/") + this._mediaDataSource.type
                };
                return this._mediaElement && (e.duration = Math.floor(1e3 * this._mediaElement.duration), 
                this._mediaElement instanceof HTMLVideoElement && (e.width = this._mediaElement.videoWidth, 
                e.height = this._mediaElement.videoHeight)), e;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "statisticsInfo", {
            get: function() {
                var e = {
                    playerType: this._type,
                    url: this._mediaDataSource.url
                };
                if (!(this._mediaElement instanceof HTMLVideoElement)) return e;
                var t = !0, i = 0, n = 0;
                if (this._mediaElement.getVideoPlaybackQuality) {
                    var a = this._mediaElement.getVideoPlaybackQuality();
                    i = a.totalVideoFrames, n = a.droppedVideoFrames;
                } else null != this._mediaElement.webkitDecodedFrameCount ? (i = this._mediaElement.webkitDecodedFrameCount, 
                n = this._mediaElement.webkitDroppedFrameCount) : t = !1;
                return t && (e.decodedFrames = i, e.droppedFrames = n), e;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype._onvLoadedMetadata = function(e) {
            null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime, 
            this._pendingSeekTime = null), this._emitter.emit(l.MEDIA_INFO, this.mediaInfo);
        }, e.prototype._reportStatisticsInfo = function() {
            this._emitter.emit(l.STATISTICS_INFO, this.statisticsInfo);
        }, e;
    }();
    n.a.install();
    var C = {
        createPlayer: function(e, t) {
            var i = e;
            if (null == i || "object" != typeof i) throw new A.b("MediaDataSource must be an javascript object!");
            if (!i.hasOwnProperty("type")) throw new A.b("MediaDataSource must has type field to indicate video file type!");
            switch (i.type) {
              case "mse":
              case "mpegts":
              case "m2ts":
              case "flv":
                return new k(i, t);

              default:
                return new D(i, t);
            }
        },
        isSupported: function() {
            return o.supportMSEH264Playback();
        },
        getFeatureList: function() {
            return o.getFeatureList();
        }
    };
    C.BaseLoader = d.a, C.LoaderStatus = d.c, C.LoaderErrors = d.b, C.Events = l, C.ErrorTypes = L, 
    C.ErrorDetails = w, C.MSEPlayer = k, C.NativePlayer = D, C.LoggingControl = m.a, 
    Object.defineProperty(C, "version", {
        enumerable: !0,
        get: function() {
            return "1.7.3";
        }
    }), t.default = C;
} ]);

var Mpegts = getDefaultExportFromCjs(mpegts.exports);

const ns = useNamespace("video-player");

var Element$1 = defineComponent({
    name: "NextVideoPlayer",
    props: {
        className: {
            type: String,
            default: ""
        },
        style: {
            type: Object,
            default: () => ({})
        },
        type: {
            type: String,
            default: "mp4",
            values: [ "mp4", "m3u8", "flv", "mpegts" ]
        },
        src: {
            type: String,
            default: ""
        },
        tensorflow: {
            type: Object
        }
    },
    emits: [ "loaded", "play", "error", "detector" ],
    setup(props, {emit: emit, expose: expose}) {
        const {lang: lang} = useLocale(), localeLang = {
            "zh-cn": zhCN,
            en: En,
            "zh-tw": zhTW
        };
        localeLang[lang.value] ? videojs.addLanguage("zh-CN", localeLang[lang.value]) : videojs.addLanguage("zh-CN", zhCN);
        const videoSrc = toRaw(props.src), videoBoxRef = ref(), videoElement = ref(), player = ref(), playerFlv = ref(), playerMpgets = ref(), modelRef = ref(null), detectFrameCanvas = ref(null), _createScreenshotBtn = container => {
            const screenshotBtn = createVNode({
                render: () => h("span", {
                    class: "screemshot-btn",
                    onClick: () => ((player, detectFrameCanvas) => {
                        const time = useDateFormat(useNow(), "YYYY-MM-DD_HH-mm-ss").value, videoElement = player.el().getElementsByTagName("video")[0], canvas = document.createElement("canvas"), width = videoElement.videoWidth, height = videoElement.videoHeight;
                        canvas.width = width, canvas.height = height;
                        const ctx = canvas.getContext("2d"), mediaRatio = width / height, canvasRatio = canvas.width / canvas.height, sw = width, sh = height;
                        let dx, dy, dw, dh;
                        mediaRatio > canvasRatio ? (dw = canvas.width, dh = canvas.width / mediaRatio, dx = 0, 
                        dy = Math.round((canvas.height - dh) / 2)) : mediaRatio === canvasRatio ? (dw = canvas.width, 
                        dh = canvas.height, dx = 0, dy = 0) : mediaRatio < canvasRatio && (dw = canvas.height * mediaRatio, 
                        dh = canvas.height, dx = Math.round((canvas.width - dw) / 2), dy = 0), ctx.drawImage(videoElement, 0, 0, sw, sh, dx, dy, dw, dh), 
                        detectFrameCanvas && ctx.drawImage(detectFrameCanvas, 0, 0);
                        let imageDataURL = canvas.toDataURL("image/png", .92).replace("image/png", "image/octet-stream");
                        imageDataURL = imageDataURL.replace(/^data:image\/[^;]+/, "data:application/octet-stream");
                        const downloadLink = document.createElement("a");
                        downloadLink.href = imageDataURL, downloadLink.download = time + "_screenshot.png", 
                        downloadLink.click();
                    })(player.value, detectFrameCanvas.value)
                }, [ h(ElIcon, {
                    color: "#FFFFFF",
                    size: "22px"
                }, {
                    default: () => h(Camera)
                }) ])
            });
            player.value.on("loadedmetadata", (() => {
                render(screenshotBtn, container);
            }));
        }, _loadModelDetectFrame = (container, video) => {
            if (!props.tensorflow) return;
            const {modelUrl: modelUrl, classNames: classNames} = props.tensorflow;
            if (!modelUrl) throw new Error("模型文件地址不能未空！");
            if (!classNames || !classNames.length) throw new Error("模型类别不能未空！");
            container.innerHTML = "", tf.loadGraphModel(modelUrl).then((model => {
                const canvas = document.createElement("canvas");
                canvas.className = ns.b("recongition"), container.appendChild(canvas);
                const ctx = canvas.getContext("2d"), detect_ctx = document.createElement("canvas").getContext("2d");
                video.ontimeupdate = () => {
                    const {videoWidth: videoWidth, videoHeight: videoHeight, offsetTop: offsetTop, offsetLeft: offsetLeft} = video;
                    canvas.width = videoWidth, canvas.height = videoHeight, canvas.style.top = offsetTop + "px", 
                    canvas.style.left = offsetLeft + "px", detectVideoFrame(video, model, ctx, tf, classNames, [], detect_ctx);
                }, modelRef.value = model, detectFrameCanvas.value = canvas;
            }));
        };
        onUnmounted((() => {
            modelRef.value && (tf.dispose(), modelRef.value.dispose(), modelRef.value = null), 
            player.value && (player.value.mse && (player.value.mse.endOfStream(), player.value.mse.unload(), 
            player.value.mse = null), player.value.pause(), player.value.dispose(), player.value = null), 
            playerFlv.value && (playerFlv.value.pause(), playerFlv.value.unload(), playerFlv.value.detachMediaElement(), 
            playerFlv.value.destroy(), playerFlv.value = null), playerMpgets.value && (playerMpgets.value.pause(), 
            playerMpgets.value.unload(), playerMpgets.value.detachMediaElement(), playerMpgets.value.destroy(), 
            playerMpgets.value = null), videoBoxRef.value && render(null, videoBoxRef.value);
        }));
        const switchVideo = url => {
            if (!url) return (() => {
                const container = videoBoxRef.value, video = document.createElement("video");
                video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                video.setAttribute("muted", "true"), videoElement.value = video, container.appendChild(video), 
                player.value = videojs(video, {
                    techOrder: [ "html5" ],
                    controls: !0,
                    fluid: !0,
                    preload: "auto",
                    language: "zh-CN",
                    sources: []
                });
                const canvasContainer = document.createElement("div");
                container.children[0].appendChild(canvasContainer), player.value.on("play", (() => {
                    emit("play", video, container), _loadModelDetectFrame(canvasContainer, video);
                })), _createScreenshotBtn(container), emit("loaded", {
                    player: player.value,
                    video: video
                });
            })(), !1;
            const type = props.type;
            "m3u8" === type ? (url => {
                const container = videoBoxRef.value, video = document.createElement("video");
                video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                video.setAttribute("muted", "true"), videoElement.value = video, container.appendChild(video);
                const options = {
                    techOrder: [ "html5" ],
                    flvjs: {
                        mediaDataSource: {
                            cors: !0,
                            withCredentials: !1
                        }
                    },
                    controls: !0,
                    fluid: !0,
                    preload: "auto",
                    language: "zh-CN",
                    sources: [ {
                        src: url,
                        type: "application/x-mpegURL"
                    } ]
                };
                player.value = videojs(video, options);
                const canvasContainer = document.createElement("div");
                container.children[0].appendChild(canvasContainer), player.value.on("play", (() => {
                    emit("play", video, container), _loadModelDetectFrame(canvasContainer, video);
                })), _createScreenshotBtn(container), emit("loaded", {
                    player: player.value,
                    video: video
                });
            })(url) : "mp4" === type ? (url => {
                const container = videoBoxRef.value, video = document.createElement("video");
                video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                video.setAttribute("muted", "true"), videoElement.value = video, container.appendChild(video);
                const options = {
                    techOrder: [ "html5" ],
                    controls: !0,
                    fluid: !0,
                    preload: "auto",
                    language: "zh-CN",
                    sources: [ {
                        src: url,
                        type: "video/mp4"
                    } ]
                };
                player.value = videojs(video, options);
                const canvasContainer = document.createElement("div");
                container.children[0].appendChild(canvasContainer), player.value.on("play", (() => {
                    emit("play", video, container), _loadModelDetectFrame(canvasContainer, video);
                })), _createScreenshotBtn(container), emit("loaded", {
                    player: player.value,
                    video: video
                });
            })(url) : "mpegts" === type ? (url => {
                const mpegts = window.mpegts || Mpegts;
                if (mpegts && mpegts.getFeatureList().mseLivePlayback) {
                    const container = videoBoxRef.value, video = document.createElement("video");
                    video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                    video.setAttribute("muted", "true"), videoElement.value = video, container.appendChild(video);
                    const defaultOptions = {
                        controls: !0,
                        autoplay: !0,
                        fluid: !0,
                        muted: !0,
                        liveui: !0,
                        preload: "auto",
                        language: "zh-CN"
                    };
                    player.value = videojs(video, defaultOptions), playerMpgets.value = mpegts.createPlayer({
                        enableWorker: !0,
                        type: "flv",
                        isLive: !0,
                        url: url
                    }), playerMpgets.value.attachMediaElement(video), playerMpgets.value.load(), playerMpgets.value.play(), 
                    playerMpgets.value.on("error", (() => {
                        emit("error", video);
                    })), _createScreenshotBtn(container);
                    const canvasContainer = document.createElement("div");
                    container.children[0].appendChild(canvasContainer), playerMpgets.value.on("metadata_arrived", (() => {
                        emit("play", video, container), _loadModelDetectFrame(canvasContainer, video);
                    })), emit("loaded", {
                        player: player.value,
                        video: video
                    });
                }
            })(url) : "flv" === type && (url => {
                const container = videoBoxRef.value, video = document.createElement("video");
                video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                video.setAttribute("muted", "true"), videoElement.value = video, container.appendChild(video);
                const options = {
                    techOrder: [ "html5" ],
                    flvjs: {
                        mediaDataSource: {
                            cors: !0,
                            withCredentials: !1
                        }
                    },
                    controls: !0,
                    fluid: !0,
                    preload: "auto",
                    language: "zh-CN",
                    sources: [ {
                        src: url,
                        type: "video/x-flv"
                    } ]
                };
                player.value = videojs(video, options);
                const canvasContainer = document.createElement("div");
                container.children[0].appendChild(canvasContainer), player.value.on("play", (() => {
                    emit("play", video, container), _loadModelDetectFrame(canvasContainer, video);
                })), _createScreenshotBtn(container), emit("loaded", {
                    player: player.value,
                    video: video
                });
            })(url);
        };
        onMounted((() => {
            nextTick((() => {
                switchVideo(videoSrc);
            }));
        }));
        expose({
            getElement: () => {
                const container = videoBoxRef.value, palyerContainer = container.children[0];
                return {
                    videoElement: videoElement.value,
                    container: container,
                    palyerContainer: palyerContainer
                };
            }
        });
        return () => createVNode(Fragment, null, [ createVNode("div", {
            ref: videoBoxRef,
            class: [ ns.b(), props.className ],
            style: props.style
        }, null) ]);
    }
});

const NextVideoPlayer = withInstall(Element$1);

const NextDragResize = withInstall(defineComponent({
    name: "NextDragResize",
    props: {},
    setup: () => () => createVNode(Fragment, null, [ createVNode(Fragment, null, null) ])
}));

var components = Object.freeze({
    __proto__: null,
    NextContainer: NextContainer,
    NextCrudTable: NextCrudTable,
    NextDialog: NextDialog,
    NextDragResize: NextDragResize,
    NextForm: NextForm,
    NextLayout: NextLayout,
    NextMenu: NextMenu,
    NextSpinLoading: NextSpinLoading,
    NextTabs: NextTabs,
    NextTextEllipsis: NextTextEllipsis,
    NextTreeSelect: NextTreeSelect,
    NextUpload: NextUpload,
    NextVideoPlayer: NextVideoPlayer
});

const zoomDialog = app => {
    app.directive("zoom", {
        mounted(el, binding) {
            if (!binding.value) return !1;
            const zoomDomBindData = "string" == typeof (value = binding.value) || !isArray(value) && isObjectLike(value) && "[object String]" == baseGetTag(value) ? [ binding.value, ".el-dialog__body", !1, !0 ] : binding.value;
            var value;
            zoomDomBindData[1] = zoomDomBindData[1] ? zoomDomBindData[1] : ".el-dialog__body", 
            zoomDomBindData[2] = void 0 !== zoomDomBindData[2] && zoomDomBindData[2], zoomDomBindData[3] = void 0 === zoomDomBindData[3] || zoomDomBindData[3], 
            nextTick((() => {
                const zoomDom = document.querySelector(zoomDomBindData[1]), zoomDomBox = document.querySelector(zoomDomBindData[0]), zoomHandleEl = document.createElement("div");
                zoomHandleEl.className = "dialog-zoom", zoomHandleEl.onmouseenter = () => {
                    zoomHandleEl.onmousedown = e => {
                        const x = e.clientX, y = e.clientY, zoomDomWidth = zoomDom.offsetWidth, zoomDomHeight = zoomDom.offsetHeight, zoomDomBoxWidth = zoomDomBox.offsetWidth, zoomDomBoxHeight = zoomDomBox.offsetHeight;
                        document.onmousemove = e => {
                            e.preventDefault();
                            const w = zoomDomWidth + 2 * (e.clientX - x), h = zoomDomHeight + (e.clientY - y);
                            if (zoomDom.style.width = `${w}px`, zoomDom.style.height = `${h}px`, zoomDomBindData[2]) {
                                const boxH = zoomDomBoxHeight + (e.clientY - y);
                                zoomDomBox.style.height = `${boxH}px`;
                            }
                            if (zoomDomBindData[3]) {
                                const boxW = zoomDomBoxWidth + 2 * (e.clientX - x);
                                zoomDomBox.style.width = `${boxW}px`;
                            }
                        }, document.onmouseup = function() {
                            document.onmousemove = null, document.onmouseup = null;
                        };
                    };
                }, zoomDomBox.appendChild(zoomHandleEl);
            }));
        }
    });
}, version = "0.1.19", install = function(app) {
    Object.keys(components).forEach((key => {
        const component = components[key];
        app.component(component.name, component);
    })), (app => {
        zoomDialog(app);
    })(app);
};

var index = {
    version: "0.1.19",
    install: install
};

export { NextContainer, NextCrudTable, NextDialog, NextDragResize, NextForm, NextLayout, NextMenu, NextSpinLoading, NextTabs, NextTextEllipsis, NextTreeSelect, NextUpload, NextVideoPlayer, buildLocaleContext, buildTranslator, index as default, defaultNamespace, install, localeContextKey, localeLang, namespaceContextKey, nextUseCssTheme, nextUseCssVar, translate, updateThemeColor, updateThemeColorCssVar, useDetectVideo, useGetDerivedNamespace, useLanguage, useLocale, useNamespace, version };
