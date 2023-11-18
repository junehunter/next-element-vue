import { getCurrentInstance, inject, ref, computed, unref, isRef, defineComponent, createVNode, Fragment, openBlock, createElementBlock, createElementVNode, reactive, createTextVNode, resolveComponent, Teleport, isVNode, provide, watch, markRaw, watchEffect, h, onUnmounted, onMounted, toRaw, nextTick, render } from "vue";

import { localeContextKey as localeContextKey$1, ElMessage, ElTooltip, ElScrollbar, ElDivider, ElColorPicker, ElSwitch, ElDropdown, ElIcon, ElDropdownMenu, ElDropdownItem, ElDrawer, ElMenuItem, ElSubMenu, ElMenu, ElContainer, ElCol, ElFormItem, ElInput, ElSelect, ElOption, ElDatePicker, ElInputNumber, ElForm, ElRow, ElButton, ElTable, ElTableColumn, ElCheckbox, ElMessageBox, ElPagination, ElDialog, ElRadioGroup, ElRadio, ElTimeSelect, ElEmpty, ElUpload, ElImageViewer } from "element-plus";

import { useFullscreen, useDateFormat, useNow } from "@vueuse/core";

import videojs from "video.js";

import "video.js/dist/video-js.css";

import zhCN from "video.js/dist/lang/zh-CN.json";

import En from "video.js/dist/lang/en.json";

import zhTW from "video.js/dist/lang/zh-TW.json";

import * as tf from "@tensorflow/tfjs";

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

var freeGlobal$1 = "object" == typeof global && global && global.Object === Object && global, freeSelf = "object" == typeof self && self && self.Object === Object && self, root$1 = freeGlobal$1 || freeSelf || Function("return this")(), Symbol$2 = root$1.Symbol, objectProto$e = Object.prototype, hasOwnProperty$b = objectProto$e.hasOwnProperty, nativeObjectToString$1 = objectProto$e.toString, symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;

var nativeObjectToString = Object.prototype.toString;

var nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;

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

var isArray$1 = Array.isArray, INFINITY$1 = 1 / 0, symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;

function baseToString(value) {
    if ("string" == typeof value) return value;
    if (isArray$1(value)) return function(array, iteratee) {
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

var uid, coreJsData$1 = root$1["__core-js_shared__"], maskSrcKey = (uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "")) ? "Symbol(src)_1." + uid : "";

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

var WeakMap$1 = getNative(root$1, "WeakMap"), objectCreate = Object.create, baseCreate = function() {
    function object() {}
    return function(proto) {
        if (!isObject(proto)) return {};
        if (objectCreate) return objectCreate(proto);
        object.prototype = proto;
        var result = new object;
        return object.prototype = void 0, result;
    };
}(), baseCreate$1 = baseCreate;

var nativeNow = Date.now;

var func, count, lastCalled, defineProperty = function() {
    try {
        var func = getNative(Object, "defineProperty");
        return func({}, "", {}), func;
    } catch (e) {}
}(), defineProperty$1 = defineProperty, baseSetToString = defineProperty$1 ? function(func, string) {
    return defineProperty$1(func, "toString", {
        configurable: !0,
        enumerable: !1,
        value: (value = string, function() {
            return value;
        }),
        writable: !0
    });
    var value;
} : identity, setToString$1 = (func = baseSetToString, count = 0, lastCalled = 0, 
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
    "__proto__" == key && defineProperty$1 ? defineProperty$1(object, key, {
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
    return setToString$1(function(func, start, transform) {
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

var freeExports$2 = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule$2 = freeExports$2 && "object" == typeof module && module && !module.nodeType && module, Buffer$1 = freeModule$2 && freeModule$2.exports === freeExports$2 ? root$1.Buffer : void 0, isBuffer$1 = (Buffer$1 ? Buffer$1.isBuffer : void 0) || function() {
    return !1;
}, typedArrayTags = {};

typedArrayTags["[object Float32Array]"] = typedArrayTags["[object Float64Array]"] = typedArrayTags["[object Int8Array]"] = typedArrayTags["[object Int16Array]"] = typedArrayTags["[object Int32Array]"] = typedArrayTags["[object Uint8Array]"] = typedArrayTags["[object Uint8ClampedArray]"] = typedArrayTags["[object Uint16Array]"] = typedArrayTags["[object Uint32Array]"] = !0, 
typedArrayTags["[object Arguments]"] = typedArrayTags["[object Array]"] = typedArrayTags["[object ArrayBuffer]"] = typedArrayTags["[object Boolean]"] = typedArrayTags["[object DataView]"] = typedArrayTags["[object Date]"] = typedArrayTags["[object Error]"] = typedArrayTags["[object Function]"] = typedArrayTags["[object Map]"] = typedArrayTags["[object Number]"] = typedArrayTags["[object Object]"] = typedArrayTags["[object RegExp]"] = typedArrayTags["[object Set]"] = typedArrayTags["[object String]"] = typedArrayTags["[object WeakMap]"] = !1;

var freeExports$1 = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule$1 = freeExports$1 && "object" == typeof module && module && !module.nodeType && module, freeProcess = freeModule$1 && freeModule$1.exports === freeExports$1 && freeGlobal$1.process, nodeUtil = function() {
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
}, isTypedArray$1 = isTypedArray, hasOwnProperty$7 = Object.prototype.hasOwnProperty;

function arrayLikeKeys(value, inherited) {
    var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? function(n, iteratee) {
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

var nativeKeys$1 = overArg(Object.keys, Object), hasOwnProperty$6 = Object.prototype.hasOwnProperty;

function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : function(object) {
        if (!isPrototype(object)) return nativeKeys$1(object);
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

var nativeCreate$1 = getNative(Object, "create");

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
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {}, this.size = 0;
}, Hash.prototype.delete = function(key) {
    var result = this.has(key) && delete this.__data__[key];
    return this.size -= result ? 1 : 0, result;
}, Hash.prototype.get = function(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
        var result = data[key];
        return "__lodash_hash_undefined__" === result ? void 0 : result;
    }
    return hasOwnProperty$4.call(data, key) ? data[key] : void 0;
}, Hash.prototype.has = function(key) {
    var data = this.__data__;
    return nativeCreate$1 ? void 0 !== data[key] : hasOwnProperty$3.call(data, key);
}, Hash.prototype.set = function(key, value) {
    var data = this.__data__;
    return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate$1 && void 0 === value ? "__lodash_hash_undefined__" : value, 
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

var Map$2 = getNative(root$1, "Map");

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
        map: new (Map$2 || ListCache),
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
})), stringToPath$1 = stringToPath;

function castPath(value, object) {
    return isArray$1(value) ? value : function(value, object) {
        if (isArray$1(value)) return !1;
        var type = typeof value;
        return !("number" != type && "symbol" != type && "boolean" != type && null != value && !isSymbol(value)) || reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object);
    }(value, object) ? [ value ] : stringToPath$1(function(value) {
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

var getPrototype$1 = overArg(Object.getPrototypeOf, Object), objectTag$2 = "[object Object]", funcProto = Function.prototype, objectProto$3 = Object.prototype, funcToString = funcProto.toString, hasOwnProperty$2 = objectProto$3.hasOwnProperty, objectCtorString = funcToString.call(Object);

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
        if (!Map$2 || pairs.length < 199) return pairs.push([ key, value ]), this.size = ++data.size, 
        this;
        data = this.__data__ = new MapCache(pairs);
    }
    return data.set(key, value), this.size = data.size, this;
};

var freeExports = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, Buffer = freeModule && freeModule.exports === freeExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;

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
        return isArray$1(object) ? result : function(array, values) {
            for (var index = -1, length = values.length, offset = array.length; ++index < length; ) array[offset + index] = values[index];
            return array;
        }(result, symbolsFunc(object));
    }(object, keys, getSymbols$1);
}

var DataView$1 = getNative(root$1, "DataView"), Promise$2 = getNative(root$1, "Promise"), Set$1 = getNative(root$1, "Set"), dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1), getTag = baseGetTag;

(DataView$1 && "[object DataView]" != getTag(new DataView$1(new ArrayBuffer(1))) || Map$2 && "[object Map]" != getTag(new Map$2) || Promise$2 && "[object Promise]" != getTag(Promise$2.resolve()) || Set$1 && "[object Set]" != getTag(new Set$1) || WeakMap$1 && "[object WeakMap]" != getTag(new WeakMap$1)) && (getTag = function(value) {
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

var getTag$1 = getTag, Uint8Array$1 = root$1.Uint8Array;

function cloneTypedArray(typedArray, isDeep) {
    var arrayBuffer, result, buffer = isDeep ? (arrayBuffer = typedArray.buffer, result = new arrayBuffer.constructor(arrayBuffer.byteLength), 
    new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer)), result) : typedArray.buffer;
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

var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2, boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;

var COMPARE_PARTIAL_FLAG$1 = 1, hasOwnProperty$1 = Object.prototype.hasOwnProperty;

var COMPARE_PARTIAL_FLAG = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", hasOwnProperty = Object.prototype.hasOwnProperty;

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other), objIsObj = (objTag = objTag == argsTag ? objectTag : objTag) == objectTag, othIsObj = (othTag = othTag == argsTag ? objectTag : othTag) == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer$1(object)) {
        if (!isBuffer$1(other)) return !1;
        objIsArr = !0, objIsObj = !1;
    }
    if (isSameTag && !objIsObj) return stack || (stack = new Stack), objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : function(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return !1;
            object = object.buffer, other = other.buffer;

          case arrayBufferTag:
            return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other)));

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
}, baseFor$1 = baseFor;

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
            var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
            newValue = srcValue, isArr || isBuff || isTyped ? isArray$1(objValue) ? newValue = objValue : isObjectLike(value = objValue) && isArrayLike(value) ? newValue = function(source, array) {
                var index = -1, length = source.length;
                for (array || (array = Array(length)); ++index < length; ) array[index] = source[index];
                return array;
            }(objValue) : isBuff ? (isCommon = !1, newValue = function(buffer, isDeep) {
                if (isDeep) return buffer.slice();
                var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
                return buffer.copy(result), result;
            }(srcValue, !0)) : isTyped ? (isCommon = !1, newValue = cloneTypedArray(srcValue, !0)) : newValue = [] : function(value) {
                if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) return !1;
                var proto = getPrototype$1(value);
                if (null === proto) return !0;
                var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
                return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
            }(srcValue) || isArguments$1(srcValue) ? (newValue = objValue, isArguments$1(objValue) ? newValue = toPlainObject(objValue) : isObject(objValue) && !isFunction(objValue) || (newValue = function(object) {
                return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate$1(getPrototype$1(object));
            }(srcValue))) : isCommon = !1;
        }
        isCommon && (stack.set(srcValue, newValue), mergeFunc(newValue, srcValue, srcIndex, customizer, stack), 
        stack.delete(srcValue)), assignMergeValue(object, key, newValue);
    }
}

function baseMerge(object, source, srcIndex, customizer, stack) {
    object !== source && baseFor$1(source, (function(srcValue, key) {
        if (stack || (stack = new Stack), isObject(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack); else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
            void 0 === newValue && (newValue = srcValue), assignMergeValue(object, key, newValue);
        }
    }), keysIn);
}

var assigner, merge = (assigner = function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
}, baseRest((function(object, sources) {
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
}))), merge$1 = merge, zhcnLocale = {
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
}, withInstall = (main, extra) => {
    if (main.install = app => {
        for (const comp of [ main, ...Object.values(extra ?? {}) ]) app.component(comp.name, comp);
    }, extra) for (const [key, comp] of Object.entries(extra)) main[key] = comp;
    return main;
}, slots_config_headerMenu = "header-menu", slots_config_headerToolsPrefix = "header-tools-prefix", slots_config_headerToolsSuffix = "header-tools-suffix";

var defaultConfig$2 = {
    logo: "",
    title: "Next Element Vue",
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

const ns$g = useNamespace("text-ellipsis");

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
            class: [ ns$g.b(), props.class ],
            style: setWidth.value,
            onMouseenter: onMouseenter
        }, [ isTip.value ? createVNode(ElTooltip, {
            effect: "dark",
            content: props.content,
            placement: props.placement,
            disabled: props.disabled
        }, {
            default: () => [ createVNode("span", {
                class: ns$g.e("text"),
                ref: ellipsisRef
            }, [ slots.default ? slots.default() : props.content ]) ]
        }) : createVNode("span", {
            class: ns$g.e("text"),
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
}), export_helper_default = (sfc, props) => {
    let target = sfc.__vccOpts || sfc;
    for (let [key, val] of props) target[key] = val;
    return target;
}, arrow_down_vue_vue_type_script_lang_default = {
    name: "ArrowDown"
}, _hoisted_16 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_36 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
}, null, -1) ];

var arrow_down_default = export_helper_default(arrow_down_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_16, _hoisted_36);
} ], [ "__file", "arrow-down.vue" ] ]), arrow_up_vue_vue_type_script_lang_default = {
    name: "ArrowUp"
}, _hoisted_112 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_312 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
}, null, -1) ];

var arrow_up_default = export_helper_default(arrow_up_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_112, _hoisted_312);
} ], [ "__file", "arrow-up.vue" ] ]), back_vue_vue_type_script_lang_default = {
    name: "Back"
}, _hoisted_114 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_44 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
}, null, -1), createElementVNode("path", {
    fill: "currentColor",
    d: "m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
}, null, -1) ];

var back_default = export_helper_default(back_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_114, _hoisted_44);
} ], [ "__file", "back.vue" ] ]), camera_vue_vue_type_script_lang_default = {
    name: "Camera"
}, _hoisted_131 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_330 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M896 256H128v576h768V256zm-199.424-64-32.064-64h-304.96l-32 64h369.024zM96 192h160l46.336-92.608A64 64 0 0 1 359.552 64h304.96a64 64 0 0 1 57.216 35.328L768.192 192H928a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32zm416 512a160 160 0 1 0 0-320 160 160 0 0 0 0 320zm0 64a224 224 0 1 1 0-448 224 224 0 0 1 0 448z"
}, null, -1) ];

var camera_default = export_helper_default(camera_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_131, _hoisted_330);
} ], [ "__file", "camera.vue" ] ]), close_vue_vue_type_script_lang_default = {
    name: "Close"
}, _hoisted_156 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_355 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
}, null, -1) ];

var close_default = export_helper_default(close_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_156, _hoisted_355);
} ], [ "__file", "close.vue" ] ]), d_arrow_left_vue_vue_type_script_lang_default = {
    name: "DArrowLeft"
}, _hoisted_172 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_371 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
}, null, -1) ];

var d_arrow_left_default = export_helper_default(d_arrow_left_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_172, _hoisted_371);
} ], [ "__file", "d-arrow-left.vue" ] ]), d_arrow_right_vue_vue_type_script_lang_default = {
    name: "DArrowRight"
}, _hoisted_173 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_372 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
}, null, -1) ];

var d_arrow_right_default = export_helper_default(d_arrow_right_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_173, _hoisted_372);
} ], [ "__file", "d-arrow-right.vue" ] ]), delete_vue_vue_type_script_lang_default = {
    name: "Delete"
}, _hoisted_180 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_379 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
}, null, -1) ];

var delete_default = export_helper_default(delete_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_180, _hoisted_379);
} ], [ "__file", "delete.vue" ] ]), edit_pen_vue_vue_type_script_lang_default = {
    name: "EditPen"
}, _hoisted_193 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_392 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"
}, null, -1) ];

var edit_pen_default = export_helper_default(edit_pen_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_193, _hoisted_392);
} ], [ "__file", "edit-pen.vue" ] ]), full_screen_vue_vue_type_script_lang_default = {
    name: "FullScreen"
}, _hoisted_1118 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3117 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1) ];

var full_screen_default = export_helper_default(full_screen_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1118, _hoisted_3117);
} ], [ "__file", "full-screen.vue" ] ]), info_filled_vue_vue_type_script_lang_default = {
    name: "InfoFilled"
}, _hoisted_1143 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3142 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
}, null, -1) ];

var info_filled_default = export_helper_default(info_filled_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1143, _hoisted_3142);
} ], [ "__file", "info-filled.vue" ] ]), moon_night_vue_vue_type_script_lang_default = {
    name: "MoonNight"
}, _hoisted_1172 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_449 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M384 512a448 448 0 0 1 215.872-383.296A384 384 0 0 0 213.76 640h188.8A448.256 448.256 0 0 1 384 512zM171.136 704a448 448 0 0 1 636.992-575.296A384 384 0 0 0 499.328 704h-328.32z"
}, null, -1), createElementVNode("path", {
    fill: "currentColor",
    d: "M32 640h960q32 0 32 32t-32 32H32q-32 0-32-32t32-32zm128 128h384a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm160 127.68 224 .256a32 32 0 0 1 32 32V928a32 32 0 0 1-32 32l-224-.384a32 32 0 0 1-32-32v-.064a32 32 0 0 1 32-32z"
}, null, -1) ];

var moon_night_default = export_helper_default(moon_night_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1172, _hoisted_449);
} ], [ "__file", "moon-night.vue" ] ]), plus_vue_vue_type_script_lang_default = {
    name: "Plus"
}, _hoisted_1201 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3200 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
}, null, -1) ];

var plus_default = export_helper_default(plus_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1201, _hoisted_3200);
} ], [ "__file", "plus.vue" ] ]), refresh_vue_vue_type_script_lang_default = {
    name: "Refresh"
}, _hoisted_1217 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3216 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
}, null, -1) ];

var refresh_default = export_helper_default(refresh_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1217, _hoisted_3216);
} ], [ "__file", "refresh.vue" ] ]), right_vue_vue_type_script_lang_default = {
    name: "Right"
}, _hoisted_1221 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3220 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z"
}, null, -1) ];

var right_default = export_helper_default(right_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1221, _hoisted_3220);
} ], [ "__file", "right.vue" ] ]), search_vue_vue_type_script_lang_default = {
    name: "Search"
}, _hoisted_1225 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3224 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
}, null, -1) ];

var search_default = export_helper_default(search_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1225, _hoisted_3224);
} ], [ "__file", "search.vue" ] ]), setting_vue_vue_type_script_lang_default = {
    name: "Setting"
}, _hoisted_1231 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3230 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"
}, null, -1) ];

var setting_default = export_helper_default(setting_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1231, _hoisted_3230);
} ], [ "__file", "setting.vue" ] ]), sunny_vue_vue_type_script_lang_default = {
    name: "Sunny"
}, _hoisted_1253 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3252 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"
}, null, -1) ];

var sunny_default = export_helper_default(sunny_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1253, _hoisted_3252);
} ], [ "__file", "sunny.vue" ] ]), tools_vue_vue_type_script_lang_default = {
    name: "Tools"
}, _hoisted_1264 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3263 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z"
}, null, -1) ];

var tools_default = export_helper_default(tools_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1264, _hoisted_3263);
} ], [ "__file", "tools.vue" ] ]), view_vue_vue_type_script_lang_default = {
    name: "View"
}, _hoisted_1283 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
}, _hoisted_3282 = [ createElementVNode("path", {
    fill: "currentColor",
    d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
}, null, -1) ];

var view_default = export_helper_default(view_vue_vue_type_script_lang_default, [ [ "render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return openBlock(), createElementBlock("svg", _hoisted_1283, _hoisted_3282);
} ], [ "__file", "view.vue" ] ]), LayoutSetting = defineComponent({
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
                "active-icon": moon_night_default,
                "inactive-icon": sunny_default,
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

function _isSlot$7(s) {
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
                return createVNode(ElDropdownMenu, null, _isSlot$7(_slot = _languageDropdown.map((item => createVNode(ElDropdownItem, {
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
            }, null) : null, createVNode("span", null, [ createTextVNode("Admin") ]), createVNode(ElIcon, {
                class: "el-icon--right"
            }, {
                default: () => [ createVNode(arrow_down_default, null, null) ]
            }) ]),
            dropdown: () => createVNode(ElDropdownMenu, null, {
                default: () => [ _userDropdown?.map((item => {
                    let _slot2;
                    return createVNode(ElDropdownItem, {
                        command: item.value,
                        divided: !!item.divided
                    }, _isSlot$7(_slot2 = _t(item.label)) ? _slot2 : {
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
            default: () => [ createVNode(setting_default, null, null) ]
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
}), MenuItemTitle = defineComponent({
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
        return () => createVNode(Fragment, null, [ createVNode(Fragment, null, [ menuTree.map((item => item.children?.length ? createVNode(ElSubMenu, {
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
        }) : createVNode(ElMenuItem, {
            index: item.path
        }, {
            default: () => [ createVNode(MenuItemTitle, {
                meta: item.meta
            }, null) ]
        }))) ]) ]);
    }
}), ns$f = useNamespace("menu");

const NextMenu = withInstall(defineComponent({
    name: "NextMenu",
    props: {
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
        provide("ns", ns$f);
        const router = getCurrentInstance().appContext.config.globalProperties.$router, _menuTree = props.menuTree, currentPath = router.currentRoute?.value.fullPath, activePath = ref(currentPath);
        watch((() => router.currentRoute?.value), (to => {
            activePath.value = to.fullPath;
        }));
        return () => createVNode(Fragment, null, [ createVNode(ElMenu, {
            class: ns$f.b(),
            defaultActive: activePath.value,
            router: props.router,
            mode: props.mode,
            ellipsis: !0
        }, {
            default: () => [ createVNode(Fragment, null, [ _menuTree.map((item => item.children?.length ? createVNode(ElSubMenu, {
                "popper-class": ns$f.b("popper"),
                index: item.path || item.id,
                teleported: !0
            }, {
                title: () => createVNode(MenuItemTitle, {
                    meta: item.meta
                }, null),
                default: () => createVNode(NextMenuItem, {
                    menuData: item.children
                }, null)
            }) : createVNode(ElMenuItem, {
                "popper-class": ns$f.b("popper"),
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

const ns$e = useNamespace("layout-defaults");

var defaults = defineComponent({
    props: {},
    setup: () => (provide("ns", ns$e), {}),
    render() {
        const slots = this.$slots, _config = inject("options", {}), _emit = inject("__emit__", {});
        slots.menu;
        const isTabs = ref(!!slots.tabs);
        return void 0 === slots.tabs && _config.showTabs && (isTabs.value = !0), createVNode(ElContainer, {
            class: ns$e.b()
        }, {
            default: () => [ createVNode(Sidebar$2, null, null), createVNode("div", {
                class: [ ns$e.b("content") ]
            }, [ createVNode(Header$3, null, null), _config.showTabs ? slots.tabs ? slots.tabs?.() : createVNode(NextTabs, {
                tabs: _config.tabs,
                activeTab: _config.activeTab,
                onChange: (...arg) => _emit("tabsChange", ...arg),
                onSelect: (...arg) => _emit("tabsSelect", ...arg),
                onClose: (...arg) => _emit("tabsClose", ...arg)
            }, null) : null, createVNode("main", {
                class: [ ns$e.bf("main"), ns$e.is("layout-tabs", isTabs.value) ]
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
            menuTree: _config.menuTree
        }, null) ]), createVNode("div", {
            class: _ns.bf("header", "right")
        }, [ createVNode(HeaderTools, null, {
            default: () => [ slots[slots_config_headerToolsPrefix]?.(), slots[slots_config_headerToolsSuffix]?.() ]
        }) ]) ]) ]);
    }
});

const ns$d = useNamespace("layout-transverse");

var transverse = defineComponent({
    props: {},
    setup: () => (provide("ns", ns$d), {}),
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
            class: [ ns$d.b("main"), ns$d.is("layout-tabs", isTabs.value) ]
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

const ns$c = useNamespace("layout-columns");

var columns = defineComponent({
    props: {},
    setup: () => (provide("ns", ns$c), {}),
    render() {
        const slots = this.$slots, _config = inject("options", {}), _emit = inject("__emit__", {}), __slots_header = {};
        slots[slots_config_headerMenu] && (__slots_header[slots_config_headerMenu] = () => slots[slots_config_headerMenu]()), 
        slots[slots_config_headerToolsPrefix] && (__slots_header[slots_config_headerToolsPrefix] = () => slots[slots_config_headerToolsPrefix]()), 
        slots[slots_config_headerToolsSuffix] && (__slots_header[slots_config_headerToolsSuffix] = () => slots[slots_config_headerToolsSuffix]());
        const isTabs = ref(!!slots.tabs);
        return void 0 === slots.tabs && _config.showTabs && (isTabs.value = !0), createVNode(ElContainer, {
            class: ns$c.b()
        }, {
            default: () => {
                return [ createVNode(Sidebar$1, null, null), createVNode("div", {
                    class: [ ns$c.b("content") ]
                }, [ createVNode(Header$1, null, (s = __slots_header, "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s) ? __slots_header : {
                    default: () => [ __slots_header ]
                })), _config.showTabs ? slots.tabs ? slots.tabs?.() : createVNode(NextTabs, {
                    tabs: _config.tabs,
                    activeTab: _config.activeTab,
                    onChange: (...arg) => _emit("tabsChange", ...arg),
                    onSelect: (...arg) => _emit("tabsSelect", ...arg),
                    onClose: (...arg) => _emit("tabsClose", ...arg)
                }, null) : null, createVNode("main", {
                    class: [ ns$c.bf("main"), ns$c.is("layout-tabs", isTabs.value) ]
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

const ns$b = useNamespace("layout-classic");

var classic = defineComponent({
    props: {},
    setup: () => (provide("ns", ns$b), {
        ns: ns$b
    }),
    render() {
        const slots = this.$slots, _config = inject("options", {}), _emit = inject("__emit__", {});
        slots.menu;
        const isTabs = ref(!!slots.tabs);
        return void 0 === slots.tabs && _config.showTabs && (isTabs.value = !0), createVNode(Fragment, null, [ createVNode(Header, null, null), createVNode("div", {
            class: [ ns$b.b("content"), ns$b.is("layout-tabs", isTabs.value) ]
        }, [ createVNode(Sidebar, null, null), createVNode("div", {
            class: ns$b.b("container")
        }, [ _config.showTabs ? slots.tabs ? slots.tabs?.() : createVNode(NextTabs, {
            tabs: _config.tabs,
            activeTab: _config.activeTab,
            onChange: (...arg) => _emit("tabsChange", ...arg),
            onSelect: (...arg) => _emit("tabsSelect", ...arg),
            onClose: (...arg) => _emit("tabsClose", ...arg)
        }, null) : null, createVNode("main", {
            class: [ ns$b.b("main") ]
        }, [ slots.default?.() ]) ]) ]) ]);
    }
});

const ns$a = useNamespace("layout"), layouts = {
    defaults: markRaw(defaults),
    transverse: markRaw(transverse),
    columns: markRaw(columns),
    classic: markRaw(classic)
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
        const _config = ref(merge$1(defaultConfig$2, props.options)), options = computed((() => _config.value)).value;
        provide("options", options), provide("__ns__", ns$a), provide("__emit__", emit), 
        provide("__slots__", slots);
        const updateOptions = cfg => {
            _config.value = merge$1(options, cfg), emit("changeOptions", _config.value);
        };
        return provide("updateOptions", updateOptions), watch((() => props.options), (cfg => {
            updateOptions(cfg);
        }), {
            deep: !0
        }), {
            options: options,
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
            class: [ ns$a.b(), props.className ],
            style: props.style
        }, [ h(activeLayout.value, {}, {
            ..._activeSlots
        }) ]);
    }
})), ns$9 = useNamespace("tabs");

var Element$5 = defineComponent({
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
            class: ns$9.b()
        }, [ createVNode(ElScrollbar, null, {
            default: () => [ createVNode("ul", {
                class: ns$9.b("list")
            }, [ tabsView.value.map(((tab, index) => tab ? createVNode("li", {
                class: [ "tab-item", ns$9.is("active", activeIndex.value === index) ],
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
                default: () => [ createVNode(close_default, null, null) ]
            }) ]) ]) : null)) ]) ]
        }), createVNode(ElDropdown, {
            "show-timeout": 80,
            "hide-timeout": 80,
            onCommand: onChange
        }, {
            default: () => createVNode("span", {
                class: ns$9.b("tab-more")
            }, [ createVNode("i", {
                class: [ ns$9.be("tab-more", "box"), ns$9.be("tab-more", "top") ]
            }, null), createVNode("i", {
                class: [ ns$9.be("tab-more", "box"), ns$9.be("tab-more", "bottom") ]
            }, null) ]),
            dropdown: () => createVNode(ElDropdownMenu, null, {
                default: () => [ createVNode(ElDropdownItem, {
                    command: "other"
                }, {
                    default: () => [ createVNode(ElIcon, null, {
                        default: () => [ createVNode(close_default, null, null) ]
                    }), createVNode("span", null, [ t("next.layout.tabsOther") ]) ]
                }), createVNode(ElDropdownItem, {
                    command: "left"
                }, {
                    default: () => [ createVNode(ElIcon, null, {
                        default: () => [ createVNode(back_default, null, null) ]
                    }), createVNode("span", null, [ t("next.layout.tabsLeft") ]) ]
                }), createVNode(ElDropdownItem, {
                    command: "right"
                }, {
                    default: () => [ createVNode(ElIcon, null, {
                        default: () => [ createVNode(right_default, null, null) ]
                    }), createVNode("span", null, [ t("next.layout.tabsRight") ]) ]
                }), createVNode(ElDropdownItem, {
                    command: "all"
                }, {
                    default: () => [ createVNode(ElIcon, null, {
                        default: () => [ createVNode(close_default, null, null) ]
                    }), createVNode("span", null, [ t("next.layout.tabsAll") ]) ]
                }) ]
            })
        }) ]);
        return () => createVNode(Fragment, null, [ renderContent() ]);
    }
});

const NextTabs = withInstall(Element$5), ns$8 = useNamespace("container");

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
            class: [ ns$8.b(), props.className ],
            style: props.style
        }, {
            default: () => [ slots.default?.() ]
        }) : createVNode("div", {
            class: [ ns$8.b(), props.className ],
            style: {
                ...styles.value,
                ...props.style
            }
        }, [ props.card ? createVNode("div", {
            class: ns$8.b("card")
        }, [ slots.default?.() ]) : slots.default?.() ]);
    }
}));

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
};

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
    headerRowStyle: {
        type: Function,
        default: void 0
    },
    spanMethod: {
        type: Function,
        default: void 0
    }
};

const header_menu_solts_key = [ "menu-left-prefix", "menu-left-suffix", "menu-right-prefix", "menu-right-suffix" ];

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
    searchSpan: 4,
    searchGutter: 20,
    searchLabelWidth: "5em",
    searchColumnMinWidth: 300,
    searchColumn: [],
    searchMore: !0,
    addBtn: !0,
    viewBtn: !0,
    delBtn: !0,
    editBtn: !0,
    batchDelBtn: !1,
    refreshBtn: !0,
    settingBtn: !0,
    operations: !0,
    operationsBtnPlain: !1,
    operationsBtnText: !0,
    operationsWidth: 260,
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

const columnSlotName = prop => "column-" + prop, searchFormSlotName = prop => "search-" + prop, formSlotName = prop => "form-" + prop, ns$7 = useNamespace("spin-loading");

var SpinLoading = defineComponent({
    name: "NextSpinLoading",
    props: {
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
            class: ns$7.b()
        }, [ props.loading ? createVNode("div", {
            class: ns$7.b("mask")
        }, [ createVNode("span", {
            class: ns$7.b("mask-dot")
        }, [ createVNode("i", {
            class: ns$7.be("mask", "dot-item")
        }, null), createVNode("i", {
            class: ns$7.be("mask", "dot-item")
        }, null), createVNode("i", {
            class: ns$7.be("mask", "dot-item")
        }, null), createVNode("i", {
            class: ns$7.be("mask", "dot-item")
        }, null) ]), createVNode("span", {
            class: ns$7.be("mask", "text")
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
            if (slots[searchFormSlotName(col.prop)]) return slots[searchFormSlotName(col.prop)]({
                column: col
            });
            if ("input" === col.type || !col.type) {
                const placeholder = t("next.form.input") + (col.searchPlaceholder || col.searchLabel || col.label);
                return createVNode(ElInput, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                    clearable: !0,
                    disabled: col.disabled,
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
                    disabled: col.disabled,
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
                    disabled: col.disabled,
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
                    disabled: col.disabled,
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
                    disabled: col.disabled,
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
                disabled: col.disabled,
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
        };
        return () => createVNode(Fragment, null, [ createVNode(Fragment, null, [ columns.value.map((col => createVNode(ElCol, {
            span: props.searchSpan,
            class: ns.b("header-search-item")
        }, {
            default: () => [ createVNode(ElFormItem, null, {
                label: () => col.label ? createVNode(NextTextEllipsis, {
                    width: options.searchLabelWidth,
                    content: col.label,
                    textAlign: "right"
                }, null) : null,
                default: () => renderColItemContent(col)
            }) ]
        }))) ]) ]);
    }
});

function _isSlot$4(s) {
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
                }, _isSlot$4(searchFrom_slots) ? searchFrom_slots : {
                    default: () => [ searchFrom_slots ]
                }), isExpand.value ? createVNode(SearchColumn, {
                    searchSpan: searchSpan.value,
                    columns: moreColumns.value,
                    formParams: searchParams
                }, _isSlot$4(searchFrom_slots) ? searchFrom_slots : {
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
                                default: () => [ createVNode(search_default, null, null) ]
                            }),
                            default: () => t("next.table.search")
                        }), createVNode(ElButton, {
                            onClick: onClearSearch
                        }, {
                            icon: () => createVNode(ElIcon, null, {
                                default: () => [ createVNode(delete_default, null, null) ]
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
                            icon: () => isExpand.value ? createVNode(d_arrow_left_default, null, null) : createVNode(d_arrow_right_default, null, null)
                        }) : createVNode(ElButton, {
                            type: "primary",
                            text: !0,
                            bg: !0,
                            class: ns.b("header-search-expandBtn"),
                            onClick: onSwitchExpand
                        }, {
                            icon: () => isExpand.value ? createVNode(ElIcon, null, {
                                default: () => [ createVNode(arrow_up_default, null, null) ]
                            }) : createVNode(ElIcon, null, {
                                default: () => [ createVNode(arrow_down_default, null, null) ]
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
                default: () => [ createVNode(plus_default, null, null) ]
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
                default: () => [ createVNode(delete_default, null, null) ]
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
                default: () => [ createVNode(refresh_default, null, null) ]
            })
        }), options.settingBtn && createVNode(ElButton, {
            circle: !0,
            onClick: () => {
                drawerSettingRef.value.visible = !0;
            }
        }, {
            icon: () => createVNode(ElIcon, null, {
                default: () => [ createVNode(tools_default, null, null) ]
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
        const _options = inject("options", {}), options = isRef(_options) ? unref(_options) : _options, columnOption = props.columnOption, _formatterColumnValue = (value, dicData) => {
            const item = dicData.find((o => o.value == value));
            return item ? item.label : value;
        }, renderCustomItem = (row, $index) => columnOption.children?.length > 0 ? createVNode(Fragment, null, [ columnOption.children.map((column => {
            return createVNode(TableColumnDynamic, {
                columnOption: column
            }, "function" == typeof (s = column_slots) || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s) ? column_slots : {
                default: () => [ column_slots ]
            });
            var s;
        })) ]) : slots[columnSlotName(columnOption.prop)] ? slots[columnSlotName(columnOption.prop)]({
            row: row,
            index: $index
        }) : columnOption.dicData?.length > 0 ? createVNode("span", null, [ _formatterColumnValue(row[columnOption.prop], columnOption.dicData) ]) : null;
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
            showOverflowTooltip: !0
        }, {
            default: ({row: row, $index: $index}) => renderCustomItem(row, $index)
        }) ]);
    }
});

var TableColumnOperations = defineComponent({
    name: "TableColumnOperations",
    emits: [ "editRow", "viewRow", "deleteRow" ],
    setup(props, {emit: emit}) {
        const _options = inject("options"), options = isRef(_options) ? unref(_options) : _options, {t: t} = useLocale(), operationsShowText = computed((() => {
            const {operationsBtnPlain: operationsBtnPlain, operationsBtnText: operationsBtnText} = options;
            return operationsBtnText || operationsBtnPlain;
        })), renderContent = () => createVNode(ElTableColumn, {
            fixed: "right",
            label: t("next.table.operation"),
            width: options.operationsWidth,
            headerAlign: options.headerAlign,
            align: options.cellAlign
        }, {
            default: scoped => createVNode(Fragment, null, [ options.editBtn ? createVNode(ElTooltip, {
                enterable: !1,
                effect: "dark",
                content: t("next.table.edit"),
                placement: "top",
                disabled: operationsShowText.value
            }, {
                default: () => [ createVNode(ElButton, {
                    text: options.operationsBtnText,
                    plain: options.operationsBtnPlain,
                    class: operationsShowText.value ? "" : "operations-btn",
                    size: "small",
                    type: "primary",
                    onClick: () => (scoped => {
                        emit("editRow", scoped);
                    })(scoped)
                }, {
                    icon: () => createVNode(ElIcon, null, {
                        default: () => [ createVNode(edit_pen_default, null, null) ]
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
                    text: options.operationsBtnText,
                    plain: options.operationsBtnPlain,
                    class: operationsShowText.value ? "" : "operations-btn",
                    size: "small",
                    type: "primary",
                    onClick: () => (scoped => {
                        emit("viewRow", scoped);
                    })(scoped)
                }, {
                    icon: () => createVNode(ElIcon, null, {
                        default: () => [ createVNode(view_default, null, null) ]
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
                    text: options.operationsBtnText,
                    plain: options.operationsBtnPlain,
                    class: operationsShowText.value ? "" : "operations-btn",
                    size: "small",
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
                        default: () => [ createVNode(delete_default, null, null) ]
                    }),
                    default: () => t("next.table.delete")
                }) ]
            }) : null ])
        });
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
            "page-sizes": [ 10, 20, 30, 40, 50, 100 ],
            "onCurrent-change": handleCurrentChange,
            "onSize-change": handleSizeChange
        }, null) ]);
    }
});

const ns$6 = useNamespace("dialog");

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
            class: ns$6.b(),
            title: props.title,
            appendToBody: props.appendToBody,
            "destroy-on-close": !0,
            fullscreen: isFullscreen.value,
            "lock-scroll": !0,
            modal: !0,
            "show-close": !1,
            closeOnClickModal: props.closeOnClickModal,
            width: props.width,
            draggable: props.draggable,
            destroyOnClose: props.destroyOnClose,
            onClose: onClose
        }, {
            default: () => [ slots.default?.() ],
            header: ({close: close, titleId: titleId, titleClass: titleClass}) => createVNode("div", {
                class: ns$6.b("header")
            }, [ createVNode("h4", {
                id: titleId,
                class: titleClass
            }, [ props.title ]), createVNode("div", {
                class: ns$6.e("header-right")
            }, [ props.fullscreenBtn && createVNode("span", {
                class: "icon-fullscreen",
                onClick: () => isFullscreen.value = !isFullscreen.value
            }, [ createVNode(ElIcon, null, {
                default: () => [ createVNode(full_screen_default, null, null) ]
            }) ]), createVNode("span", {
                class: "icon-close",
                onClick: close
            }, [ createVNode(ElIcon, {
                size: "18"
            }, {
                default: () => [ createVNode(close_default, null, null) ]
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
    tableSelectConfig: tableSelectConfig
};

const ns$5 = useNamespace("form");

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
            class: ns$5.e("number-range")
        }, [ createVNode(ElInputNumber, {
            modelValue: startNumber.value,
            "onUpdate:modelValue": $event => startNumber.value = $event,
            min: minNumber.value,
            max: maxNumber.value,
            controls: controls.value,
            disabled: disabled,
            onChange: onChangeStart
        }, null), createVNode("span", {
            class: ns$5.em("number-range", "division")
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

function _isSlot$2(s) {
    return "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s);
}

const ns$4 = useNamespace("form"), InputTableSelect = defineComponent({
    name: "InputTableSelect",
    props: {
        modelValue: {
            type: [ Array, String, Number, Boolean, Object ],
            default: function() {
                return [ null, null ];
            }
        },
        column: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: !1
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
            tableReactive.loading = !0, _options.loadData?.(searchParams, (res => {
                tableReactive.data = res.data || [], tableReactive.page.total = res.total || 0, 
                tableReactive.loading = !1;
            }));
        }, multipleSelection = ref([]), sinleSelection = ref(""), _disabledSelect = computed((() => "radio" === _options.selectType ? !sinleSelection.value : 0 === multipleSelection.value.length)), isSelected = row => multipleSelection.value.includes(row), onResetTableSelect = () => {
            multipleSelection.value = [], sinleSelection.value = "";
        }, onConfirmSelect = () => {
            const rows = toRaw(multipleSelection.value);
            onCloseTableDialog(), emit("select", rows);
        }, onClickAddEdit = (row, formParams) => {
            _column.addEditData?.(row, formParams);
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
        }, renderContent = () => {
            let _slot, _slot2;
            return createVNode(Fragment, null, [ createVNode("div", {
                class: [ "el-input", ns$4.e("input-table"), ns$4.is("disabled", _disabled) ]
            }, [ createVNode("div", {
                class: "el-input__wrapper"
            }, [ props.modelValue ? createVNode("span", {
                class: ns$4.em("input-table", "value")
            }, [ props.modelValue ]) : createVNode("span", {
                class: ns$4.em("input-table", "placeholder")
            }, [ _placeholder ]) ]), createVNode(ElButton, {
                type: "primary",
                class: ns$4.em("input-table", "append"),
                disabled: _disabled,
                icon: search_default,
                onClick: onClickTableDialog
            }, null) ]), createVNode(NextDialog, {
                modelValue: tableSelectDialog.visible,
                "onUpdate:modelValue": $event => tableSelectDialog.visible = $event,
                title: tableSelectDialog.title,
                closeOnClickModal: _options.closeOnClickModal,
                width: _options.dialogWidth,
                onClose: onCloseTableDialog
            }, {
                default: () => [ createVNode("div", {
                    class: ns$4.em("input-table", "content")
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
                    class: ns$4.em("input-table", "footer")
                }, [ createVNode(ElButton, {
                    onClick: onResetTableSelect
                }, _isSlot$2(_slot = t("next.form.reset")) ? _slot : {
                    default: () => [ _slot ]
                }), createVNode(ElButton, {
                    type: "primary",
                    disabled: _disabledSelect.value,
                    onClick: onConfirmSelect
                }, _isSlot$2(_slot2 = t("next.form.confirm")) ? _slot2 : {
                    default: () => [ _slot2 ]
                }) ]) ]
            }) ]);
        };
        return () => createVNode(Fragment, null, [ renderContent() ]);
    }
});

function _isSlot$1(s) {
    return "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s);
}

const ns$3 = useNamespace("form");

var Element$3 = defineComponent({
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
        (() => {
            const columns = props.columns;
            _formColumns.value = columns;
            for (let i = 0; i < columns.length; i++) {
                const col = columns[i], value = formDatum[col.prop];
                isValueExist(value) ? formParams[col.prop] = value : formParams[col.prop] = isValueExist(col.defaultValue) ? col.defaultValue : "";
                const {label: label} = col;
                if (col.rules) formRules[col.prop] = col.rules; else if (col.required) {
                    const rule = [];
                    rule.push({
                        required: !0,
                        message: label + t("next.form.requiredInput"),
                        trigger: [ "blur", "change" ]
                    }), formRules[col.prop] = rule;
                }
                !col.dicData?.length && col.loadDicData && col.loadDicData(col);
            }
            "boolean" == typeof _isEditing.value && !1 === _isEditing.value && (_formColumns.value = _formColumns.value.map((col => (col.disabled = !0, 
            col))));
        })();
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
                    }));
                } else console.error("error submit!", fields);
            }));
        }, onResetForm = () => {
            const formInstance = ruleFormRef.value;
            formInstance && formInstance.resetFields();
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
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onChange: event => col.onChange?.(event, col)
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
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onInput: event => ((event, key) => {
                        const value = event.replace(/\D/g, "");
                        formParams[key] = value;
                    })(event, col.prop),
                    onChange: event => col.onChange?.(event, col)
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
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onInput: event => ((val, key) => {
                        let value = val;
                        value = value.replace(/[^0-9\.]/g, ""), value = value.replace(/^\./, "0."), value = value.replace(/\.{2,}/g, "."), 
                        value = value.replace(".", "DUMMY"), value = value.replace(/\./g, ""), value = value.replace("DUMMY", "."), 
                        formParams[key] = value;
                    })(event, col.prop),
                    onChange: event => col.onChange?.(event, col)
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
                    disabled: col.disabled,
                    placeholder: placeholder,
                    onChange: event => col.onChange?.(event, col)
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
                    onChange: event => col.onChange?.(event, col)
                }, {
                    default: () => [ col.dicData && col.dicData.map((item => createVNode(ElOption, {
                        key: item.value,
                        value: item.value,
                        label: item.label
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
                    onChange: event => col.onChange?.(event, col)
                }, {
                    prefix: () => col.prefix ? col.prefix(formParams, col) : null,
                    suffix: () => col.suffix ? col.suffix(formParams, col) : null
                });
            }
            if ("radio" === col.type) return createVNode(ElRadioGroup, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                disabled: col.disabled,
                onChange: event => col.onChange?.(event, col)
            }, {
                default: () => [ col.dicData && col.dicData.map((item => createVNode(ElRadio, {
                    key: item.value,
                    label: item.value
                }, {
                    default: () => [ item.label ]
                }))) ]
            });
            if ("date" === col.type) {
                const placeholder = col.placeholder || t("next.form.select") + col.label;
                return createVNode(ElDatePicker, {
                    modelValue: formParams[col.prop],
                    "onUpdate:modelValue": [ $event => formParams[col.prop] = $event, event => col.onChange?.(event, col) ],
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
                    "onUpdate:modelValue": [ $event => formParams[col.prop] = $event, event => col.onChange?.(event, col) ],
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
                    "onUpdate:modelValue": [ $event => formParams[col.prop] = $event, event => col.onChange?.(event, col) ],
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
                    void (formParams[key] = value);
                    var value, key;
                }
            }, null) : "inputTableSelect" === col.type ? createVNode(InputTableSelect, {
                modelValue: formParams[col.prop],
                "onUpdate:modelValue": $event => formParams[col.prop] = $event,
                column: col,
                disabled: col.disabled,
                onSelect: rows => ((rows, col) => {
                    const names = rows.map((o => o.name));
                    formParams[col.prop] = names.join(",");
                })(rows, col)
            }, null) : "upload" === col.type ? createVNode(NextUpload, {
                onChange: (...arg) => col.onChange?.(...arg, formParams, col)
            }, null) : void 0;
        };
        expose({
            formParams: toRaw(formParams),
            ruleFormRef: ruleFormRef
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
                }, _isSlot$1(_slot = formColumns.map((column => !column.hide && createVNode(ElCol, {
                    span: column.span || colSpan.value
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
                                default: () => [ createVNode(info_filled_default, null, null) ]
                            }) ]
                        }) : null ]) : null,
                        default: () => renderFormItem(column)
                    }) ]
                })))) ? _slot : {
                    default: () => [ _slot ]
                }), _isEditing.value && createVNode("div", {
                    class: ns$3.e("footer")
                }, [ createVNode(ElButton, {
                    type: "primary",
                    loading: submitLoading.value,
                    onClick: onSubmitAddEdit
                }, _isSlot$1(_slot2 = t("next.form.submit")) ? _slot2 : {
                    default: () => [ _slot2 ]
                }), createVNode(ElButton, {
                    onClick: onResetForm
                }, _isSlot$1(_slot3 = t("next.form.reset")) ? _slot3 : {
                    default: () => [ _slot3 ]
                }) ]) ]
            });
        };
        return () => createVNode(Fragment, null, [ renderContent() ]);
    }
});

const NextForm = withInstall(Element$3);

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
    setup(props, {slots: slots, emit: emit}) {
        inject("addEditFormSlots").value.forEach((slotName => {}));
        const _options = inject("options", {}), options = deepClone(isRef(_options) ? unref(_options) : _options);
        options.columnMinWidth = options.formColumnMinWidth, options.isEditing = props.isEditing;
        const formRef = ref(), formDatum = deepClone(isRef(props.formDatum) ? unref(props.formDatum) : props.formDatum), _columns = toRaw(props.columns), onSubmit = (...arg) => {
            emit("submit", ...arg);
        };
        return () => createVNode(Fragment, null, [ createVNode(NextForm, {
            ref: formRef,
            options: options,
            columns: _columns,
            formDatum: formDatum,
            onClose: () => emit("close"),
            onSubmit: onSubmit
        }, null) ]);
    }
});

function _isSlot(s) {
    return "function" == typeof s || "[object Object]" === Object.prototype.toString.call(s) && !isVNode(s);
}

const ns$2 = useNamespace("crud-table");

var Element$2 = defineComponent({
    name: "NextCrudTable",
    props: defaultPropsConfig,
    emits: [ "confirm-search", "clear-search", "change-pagination", "selection-change", "row-click", "click-add-edit", "close-add-edit", "delete-rows", "delete-row", "submit-form" ],
    setup(props, {emit: emit, slots: slots, expose: expose}) {
        const _config = deepClone(defaultConfig$1), _options = computed((() => {
            const cfg = unref(props.options);
            return merge$1(_config, cfg);
        })), options = unref(_options);
        provide("options", computed((() => _options.value))), provide("ns", ns$2);
        const {t: t} = useLocale(), _columns = ref(options.columns), _searchColumns = ref([]), _formColumns = ref([]);
        (async (options, cb) => {
            const _columns = reactive(options.columns), loopFormColumns = list => {
                let cols = [];
                return list.forEach((async col => {
                    !col.dicData?.length && col.loadDicData && await col.loadDicData(col, (data => {
                        data?.length && (col.dicData = data);
                    })), cols.push(col), col.children?.length && (cols.push(...loopFormColumns(col.children)), 
                    col.children && delete col.children);
                })), cols;
            }, evenColumns = await loopFormColumns(_columns), formColumns = options.formColumns, formColumnsLast = evenColumns.concat(formColumns).map((col => ({
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
                hide: valueExist(col.formHide, !1),
                disabled: valueExist(col.formDisabled, col.disabled, !1),
                span: valueExist(col.formSpan, col.span, null),
                dicData: valueExist(col.formDicData, col.dicData, []),
                loadDicData: valueExist(col.formLoadDicData, col.loadDicData, null),
                onChange: valueExist(col.onChangeForm, col.onChange, null),
                tableSelect: valueExist(col.tableSelect, {})
            }))).filter((o => o.sort && o.prop)).sort(((a, b) => a.sort - b.sort)), _formColumnsLast = deepClone(formColumnsLast), searchColumn = ref([]);
            searchColumn.value = options.searchColumn.map(((col, index) => ({
                ...col,
                sort: index
            })));
            const searchColumnLength = searchColumn.value.length, loopColumns = list => {
                let cols = [];
                return list.forEach(((col, index) => {
                    if (col.searchType) {
                        const item = {
                            prop: col.prop,
                            type: valueExist(col.searchType, col.type),
                            label: valueExist(col.searchLabel, col.label),
                            defaultValue: valueExist(col.searchDefaultValue, col.defaultValue, null),
                            placeholder: valueExist(col.searchPlaceholder, col.placeholder, null),
                            dicData: valueExist(col.searchDicData, col.dicData, []),
                            disabled: valueExist(col.searchDisabled, col.disabled, !1),
                            prefix: valueExist(col.searchPrefix, col.prefix, null),
                            suffix: valueExist(col.searchSuffix, col.suffix, null),
                            prepend: valueExist(col.searchPrepend, col.prepend, null),
                            append: valueExist(col.searchAppend, col.append, null),
                            sort: valueExist(col.searchSort, col.sort, searchColumnLength + index)
                        };
                        cols.push(item);
                    }
                    col.children?.length && cols.push(...loopColumns(col.children));
                })), cols;
            };
            searchColumn.value.push(...loopColumns(_columns)), searchColumn.value = arrayObjNoRepeat(searchColumn.value.sort(((a, b) => a.sort - b.sort)), "prop");
            const params = {
                formColumns: _formColumnsLast,
                searchColumns: searchColumn.value,
                columns: _columns
            };
            cb && cb(params);
        })(options, (({formColumns: formColumns, searchColumns: searchColumns, columns: columns}) => {
            _searchColumns.value = searchColumns, _formColumns.value = formColumns, _columns.value = columns;
        }));
        const tableData = ref(props.data), _searchFormParams = ref((() => {
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
        }), onClickHeaderAdd = () => {
            const {dialogTitle: dialogTitle} = options;
            addEditDialog.visible = !0, addEditDialog.isEditing = !0, addEditDialog.title = dialogTitle + " " + t("next.table.add"), 
            nextTick((() => {
                emit("click-add-edit", {});
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
            addEditDialog.visible = !0, addEditDialog.isEditing = !0, addEditDialog.title = dialogTitle + " " + t("next.table.edit"), 
            addEditDialog.rowInfo = scoped.row, nextTick((() => {
                emit("click-add-edit", scoped.row);
            }));
        }, onClickRowView = scoped => {
            const {dialogTitle: dialogTitle} = options;
            addEditDialog.visible = !0, addEditDialog.isEditing = !1, addEditDialog.title = dialogTitle + " " + t("next.table.view"), 
            addEditDialog.rowInfo = scoped.row;
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
        header_menu_solts_key.forEach((slotName => {
            headerMenu_solts[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
        })), expose({
            addEditFormRef: addEditFormRef
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
                "span-method": props.spanMethod,
                "onSelection-change": onSelectionChange,
                "onRow-click": (...arg) => emit("row-click", ...arg)
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
                }, null) : null ],
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

const NextCrudTable = withInstall(Element$2), NextSpinLoading = withInstall(SpinLoading), ns$1 = useNamespace("upload");

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
                default: () => [ createVNode(plus_default, null, null) ]
            }) : createVNode(ElButton, {
                link: !0,
                text: !0,
                type: "primary"
            }, {
                default: () => [ createVNode(ElIcon, null, {
                    default: () => [ createVNode(plus_default, null, null) ]
                }), createVNode("em", null, [ _t("next.form.selectFile") ]) ]
            })
        });
    }
})), ns = useNamespace("video-player");

var Element = defineComponent({
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
            default: "",
            required: !0
        },
        tensorflow: {
            type: Object,
            default: () => ({
                modelUrl: "",
                classNames: []
            })
        }
    },
    emits: [ "play", "error", "detector" ],
    setup(props, {emit: emit}) {
        const {lang: lang} = useLocale(), localeLang = {
            "zh-cn": zhCN,
            en: En,
            "zh-tw": zhTW
        };
        localeLang[lang.value] ? videojs.addLanguage("zh-CN", localeLang[lang.value]) : videojs.addLanguage("zh-CN", zhCN);
        const videoSrc = toRaw(props.src), videoBoxRef = ref(), player = ref(), playerFlv = ref(), playerMpgets = ref(), modelRef = ref(null), detectFrameCanvas = ref(null), _createScreenshotBtn = container => {
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
                    default: () => h(camera_default)
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
                const ctx = canvas.getContext("2d");
                video.ontimeupdate = () => {
                    const {videoWidth: videoWidth, videoHeight: videoHeight, offsetTop: offsetTop, offsetLeft: offsetLeft} = video;
                    canvas.width = videoWidth, canvas.height = videoHeight, canvas.style.top = offsetTop + "px", 
                    canvas.style.left = offsetLeft + "px", (async (video, model, ctx, tf, classNames) => {
                        const {videoWidth: videoWidth, videoHeight: videoHeight} = video;
                        if (!videoWidth || !videoHeight) return;
                        let [modelWeight, modelHeight] = model.inputs[0].shape.slice(1, 3), input = tf.tidy((() => tf.image.resizeBilinear(tf.browser.fromPixels(video), [ modelWeight, modelHeight ]).div(255).expandDims(0)));
                        ctx.clearRect(0, 0, videoWidth, videoHeight), await model.executeAsync(input).then((res => {
                            let [boxes, scores, classes, valid_detections] = res;
                            for (let i = 0; i < valid_detections.dataSync()[0]; ++i) {
                                let [x0, y0, x1, y1] = boxes.dataSync().slice(4 * i, 4 * (i + 1));
                                x0 = x0 < 0 || x0 > 1 ? parseInt(x0) : x0, x1 = x1 < 0 || x1 > 1 ? parseInt(x1) : x1, 
                                y0 = y0 < 0 || y0 > 1 ? parseInt(y0) : y0, y1 = y1 < 0 || y1 > 1 ? parseInt(y1) : y1, 
                                x0 = Math.round(Math.abs(x0) * videoWidth), x1 = Math.round(Math.abs(x1) * videoWidth), 
                                y0 = Math.round(Math.abs(y0) * videoHeight), y1 = Math.round(Math.abs(y1) * videoHeight);
                                const width = x1 - x0, height = y1 - y0, left = x0, top = y0;
                                let cls = classes.dataSync()[i], score = scores.dataSync()[i].toFixed(2);
                                if (score > .5) {
                                    const color = `#${(1 << 24 | Math.floor(256 * Math.random()) << 16 | Math.floor(256 * Math.random()) << 8 | Math.floor(256 * Math.random())).toString(16).slice(1)}`;
                                    ctx.strokeStyle = color, ctx.lineWidth = 3, ctx.beginPath(), ctx.rect(left, top, width, height), 
                                    ctx.stroke();
                                    const name = classNames[cls];
                                    ctx.font = "bold 20px Arial", ctx.fillStyle = color, ctx.fillText(`${name} 相似度：${(100 * score).toFixed(2)}%`, left + 10, top < 20 ? 20 : top - 10);
                                }
                            }
                            input.dispose(), tf.dispose(res);
                        }));
                    })(video, model, ctx, tf, classNames);
                }, modelRef.value = model, detectFrameCanvas.value = canvas;
            }));
        };
        onUnmounted((() => {
            modelRef.value && (tf.dispose(), modelRef.value.dispose(), modelRef.value = null), 
            player.value && (player.value.mse && (player.value.mse.endOfStream(), player.value.mse.unload(), 
            player.value.mse = null), player.value.pause(), player.value.dispose(), player.value = null), 
            playerFlv.value && (playerFlv.value.pause(), playerFlv.value.unload(), playerFlv.value.detachMediaElement(), 
            playerFlv.value.destroy(), playerFlv.value = null), videoBoxRef.value && render(null, videoBoxRef.value);
        }));
        const switchVideo = url => {
            const type = props.type;
            "m3u8" === type ? (url => {
                const container = videoBoxRef.value, video = document.createElement("video");
                video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                video.setAttribute("muted", "true"), container.appendChild(video);
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
                })), _createScreenshotBtn(container);
            })(url) : "mp4" === type ? (url => {
                const container = videoBoxRef.value, video = document.createElement("video");
                video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                video.setAttribute("muted", "true"), container.appendChild(video);
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
                })), _createScreenshotBtn(container);
            })(url) : "mpegts" === type ? (url => {
                const mpegts = window.mpegts;
                if (mpegts && mpegts.getFeatureList().mseLivePlayback) {
                    const container = videoBoxRef.value, video = document.createElement("video");
                    video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                    video.setAttribute("muted", "true"), container.appendChild(video);
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
                        type: "flv",
                        isLive: !0,
                        url: url
                    }), playerMpgets.value.attachMediaElement(video), playerMpgets.value.load(), playerMpgets.value.play(), 
                    playerMpgets.value.on("error", (() => {
                        emit("error", video);
                    })), _createScreenshotBtn(container);
                }
            })(url) : "flv" === type && (url => {
                const container = videoBoxRef.value, video = document.createElement("video");
                video.className = "video-js vjs-default-skin", video.setAttribute("autoplay", "true"), 
                video.setAttribute("muted", "true"), container.appendChild(video);
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
                })), _createScreenshotBtn(container);
            })(url);
        };
        onMounted((() => {
            nextTick((() => {
                switchVideo(videoSrc);
            }));
        }));
        return () => createVNode(Fragment, null, [ createVNode("div", {
            ref: videoBoxRef,
            class: [ ns.b(), props.className ],
            style: props.style
        }, null) ]);
    }
});

const NextVideoPlayer = withInstall(Element);

var components = Object.freeze({
    __proto__: null,
    NextContainer: NextContainer,
    NextCrudTable: NextCrudTable,
    NextDialog: NextDialog,
    NextForm: NextForm,
    NextLayout: NextLayout,
    NextMenu: NextMenu,
    NextSpinLoading: NextSpinLoading,
    NextTabs: NextTabs,
    NextTextEllipsis: NextTextEllipsis,
    NextUpload: NextUpload,
    NextVideoPlayer: NextVideoPlayer
});

const zoomDialog = app => {
    app.directive("zoom", {
        mounted(el, binding) {
            if (!binding.value) return !1;
            const zoomDomBindData = "string" == typeof (value = binding.value) || !isArray$1(value) && isObjectLike(value) && "[object String]" == baseGetTag(value) ? [ binding.value, ".el-dialog__body", !1, !0 ] : binding.value;
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
}, version = "0.1.3", install = function(app) {
    Object.keys(components).forEach((key => {
        const component = components[key];
        app.component(component.name, component);
    })), (app => {
        zoomDialog(app);
    })(app);
};

var index = {
    version: "0.1.3",
    install: install
};

export { NextContainer, NextCrudTable, NextDialog, NextForm, NextLayout, NextMenu, NextSpinLoading, NextTabs, NextTextEllipsis, NextUpload, NextVideoPlayer, buildLocaleContext, buildTranslator, index as default, defaultNamespace, install, localeContextKey, localeLang, namespaceContextKey, nextUseCssTheme, nextUseCssVar, translate, useGetDerivedNamespace, useLanguage, useLocale, useNamespace, version };
