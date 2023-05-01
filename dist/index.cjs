var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module2) {
    module2.exports = function isBuffer2(obj) {
      return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    };
  }
});

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module2) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module2.exports = function extend2() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend2(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  Metamark: () => Metamark
});
module.exports = __toCommonJS(lib_exports);

// lib/metamark.ts
var import_fs = require("fs");
var import_gray_matter = __toESM(require("gray-matter"), 1);
var import_mdast_util_to_string = require("mdast-util-to-string");
var import_path2 = __toESM(require("path"), 1);
var import_remark_gfm2 = __toESM(require("remark-gfm"), 1);
var import_remark_obsidian_link2 = require("remark-obsidian-link");
var import_remark_parse2 = __toESM(require("remark-parse"), 1);

// node_modules/bail/index.js
function bail(error) {
  if (error) {
    throw error;
  }
}

// node_modules/unified/lib/index.js
var import_is_buffer2 = __toESM(require_is_buffer(), 1);
var import_extend = __toESM(require_extend(), 1);

// node_modules/is-plain-obj/index.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}

// node_modules/trough/index.js
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index2 = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2];
        }
      }
      values = output;
      if (fn) {
        wrap(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception = (
        /** @type {Error} */
        error
      );
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}

// node_modules/vfile/lib/index.js
var import_is_buffer = __toESM(require_is_buffer(), 1);

// node_modules/unist-util-stringify-position/index.js
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position(value.position);
  }
  if ("start" in value || "end" in value) {
    return position(value);
  }
  if ("line" in value || "column" in value) {
    return point(value);
  }
  return "";
}
function point(point2) {
  return index(point2 && point2.line) + ":" + index(point2 && point2.column);
}
function position(pos) {
  return point(pos && pos.start) + "-" + point(pos && pos.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}

// node_modules/vfile-message/index.js
var VFileMessage = class extends Error {
  /**
   * Constructor of a message for `reason` at `place` from `origin`.
   * When an error is passed in as `reason`, copies the `stack`.
   *
   * @param {string|Error} reason Reason for message (`string` or `Error`). Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place] Place at which the message occurred in a file (`Node`, `Position`, or `Point`, optional).
   * @param {string} [origin] Place in code the message originates from (`string`, optional).
   */
  constructor(reason, place, origin) {
    const parts = [null, null];
    let position2 = {
      // @ts-expect-error: we always follows the structure of `position`.
      start: { line: null, column: null },
      // @ts-expect-error: "
      end: { line: null, column: null }
    };
    super();
    if (typeof place === "string") {
      origin = place;
      place = void 0;
    }
    if (typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        parts[1] = origin;
      } else {
        parts[0] = origin.slice(0, index2);
        parts[1] = origin.slice(index2 + 1);
      }
    }
    if (place) {
      if ("type" in place || "position" in place) {
        if (place.position) {
          position2 = place.position;
        }
      } else if ("start" in place || "end" in place) {
        position2 = place;
      } else if ("line" in place || "column" in place) {
        position2.start = place;
      }
    }
    this.name = stringifyPosition(place) || "1:1";
    this.message = typeof reason === "object" ? reason.message : reason;
    this.stack = typeof reason === "object" ? reason.stack : "";
    this.reason = this.message;
    this.fatal;
    this.line = position2.start.line;
    this.column = position2.start.column;
    this.source = parts[0];
    this.ruleId = parts[1];
    this.position = position2;
    this.actual;
    this.expected;
    this.file;
    this.url;
    this.note;
  }
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.fatal = null;
VFileMessage.prototype.column = null;
VFileMessage.prototype.line = null;
VFileMessage.prototype.source = null;
VFileMessage.prototype.ruleId = null;
VFileMessage.prototype.position = null;

// node_modules/vfile/lib/minpath.js
var import_path = __toESM(require("path"), 1);

// node_modules/vfile/lib/minproc.js
var import_process = __toESM(require("process"), 1);

// node_modules/vfile/lib/minurl.js
var import_url = require("url");

// node_modules/vfile/lib/minurl.shared.js
function isUrl(fileURLOrPath) {
  return fileURLOrPath !== null && typeof fileURLOrPath === "object" && // @ts-expect-error: indexable.
  fileURLOrPath.href && // @ts-expect-error: indexable.
  fileURLOrPath.origin;
}

// node_modules/vfile/lib/index.js
var order = ["history", "path", "basename", "stem", "extname", "dirname"];
var VFile = class {
  /**
   * Create a new virtual file.
   *
   * If `options` is `string` or `Buffer`, it’s treated as `{value: options}`.
   * If `options` is a `URL`, it’s treated as `{path: options}`.
   * If `options` is a `VFile`, shallow copies its data over to the new file.
   * All fields in `options` are set on the newly created `VFile`.
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * It’s not possible to set either `dirname` or `extname` without setting
   * either `history`, `path`, `basename`, or `stem` as well.
   *
   * @param {Compatible} [value]
   */
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (typeof value === "string" || (0, import_is_buffer.default)(value)) {
      options = { value };
    } else if (isUrl(value)) {
      options = { path: value };
    } else {
      options = value;
    }
    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = import_process.default.cwd();
    this.value;
    this.stored;
    this.result;
    this.map;
    let index2 = -1;
    while (++index2 < order.length) {
      const prop2 = order[index2];
      if (prop2 in options && options[prop2] !== void 0) {
        this[prop2] = prop2 === "history" ? [...options[prop2]] : options[prop2];
      }
    }
    let prop;
    for (prop in options) {
      if (!order.includes(prop))
        this[prop] = options[prop];
    }
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   * @returns {string}
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   * @param {string|URL} path
   */
  set path(path2) {
    if (isUrl(path2)) {
      path2 = (0, import_url.fileURLToPath)(path2);
    }
    assertNonEmpty(path2, "path");
    if (this.path !== path2) {
      this.history.push(path2);
    }
  }
  /**
   * Get the parent path (example: `'~'`).
   */
  get dirname() {
    return typeof this.path === "string" ? import_path.default.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   * Cannot be set if there’s no `path` yet.
   */
  set dirname(dirname) {
    assertPath(this.basename, "dirname");
    this.path = import_path.default.join(dirname || "", this.basename);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   */
  get basename() {
    return typeof this.path === "string" ? import_path.default.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set basename(basename) {
    assertNonEmpty(basename, "basename");
    assertPart(basename, "basename");
    this.path = import_path.default.join(this.dirname || "", basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   */
  get extname() {
    return typeof this.path === "string" ? import_path.default.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   */
  set extname(extname) {
    assertPart(extname, "extname");
    assertPath(this.dirname, "extname");
    if (extname) {
      if (extname.charCodeAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = import_path.default.join(this.dirname, this.stem + (extname || ""));
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   */
  get stem() {
    return typeof this.path === "string" ? import_path.default.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = import_path.default.join(this.dirname || "", stem + (this.extname || ""));
  }
  /**
   * Serialize the file.
   *
   * @param {BufferEncoding} [encoding='utf8']
   *   When `value` is a `Buffer`, `encoding` is a character encoding to
   *   understand it as (default: `'utf8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    return (this.value || "").toString(encoding);
  }
  /**
   * Constructs a new `VFileMessage`, where `fatal` is set to `false`, and
   * associates it with the file by adding it to `vfile.messages` and setting
   * `message.file` to the current filepath.
   *
   * @param {string|Error} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  message(reason, place, origin) {
    const message = new VFileMessage(reason, place, origin);
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  /**
   * Like `VFile#message()`, but associates an informational message where
   * `fatal` is set to `null`.
   *
   * @param {string|Error} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  info(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = null;
    return message;
  }
  /**
   * Like `VFile#message()`, but associates a fatal message where `fatal` is
   * set to `true`, and then immediately throws it.
   *
   * > 👉 **Note**: a fatal error means that a file is no longer processable.
   *
   * @param {string|Error} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {never}
   *   Message.
   */
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = true;
    throw message;
  }
};
function assertPart(part, name) {
  if (part && part.includes(import_path.default.sep)) {
    throw new Error(
      "`" + name + "` cannot be a path: did not expect `" + import_path.default.sep + "`"
    );
  }
}
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error("`" + name + "` cannot be empty");
  }
}
function assertPath(path2, name) {
  if (!path2) {
    throw new Error("Setting `" + name + "` requires `path` to be set too");
  }
}

// node_modules/unified/lib/index.js
var unified = base().freeze();
var own = {}.hasOwnProperty;
function base() {
  const transformers = trough();
  const attachers = [];
  let namespace = {};
  let frozen;
  let freezeIndex = -1;
  processor.data = data;
  processor.Parser = void 0;
  processor.Compiler = void 0;
  processor.freeze = freeze;
  processor.attachers = attachers;
  processor.use = use;
  processor.parse = parse;
  processor.stringify = stringify;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;
  return processor;
  function processor() {
    const destination = base();
    let index2 = -1;
    while (++index2 < attachers.length) {
      destination.use(...attachers[index2]);
    }
    destination.data((0, import_extend.default)(true, {}, namespace));
    return destination;
  }
  function data(key, value) {
    if (typeof key === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", frozen);
        namespace[key] = value;
        return processor;
      }
      return own.call(namespace, key) && namespace[key] || null;
    }
    if (key) {
      assertUnfrozen("data", frozen);
      namespace = key;
      return processor;
    }
    return namespace;
  }
  function freeze() {
    if (frozen) {
      return processor;
    }
    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(processor, ...options);
      if (typeof transformer === "function") {
        transformers.use(transformer);
      }
    }
    frozen = true;
    freezeIndex = Number.POSITIVE_INFINITY;
    return processor;
  }
  function use(value, ...options) {
    let settings;
    assertUnfrozen("use", frozen);
    if (value === null || value === void 0) {
    } else if (typeof value === "function") {
      addPlugin(value, ...options);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value + "`");
    }
    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings);
    }
    return processor;
    function add(value2) {
      if (typeof value2 === "function") {
        addPlugin(value2);
      } else if (typeof value2 === "object") {
        if (Array.isArray(value2)) {
          const [plugin, ...options2] = value2;
          addPlugin(plugin, ...options2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value2 + "`");
      }
    }
    function addPreset(result) {
      addList(result.plugins);
      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings);
      }
    }
    function addList(plugins) {
      let index2 = -1;
      if (plugins === null || plugins === void 0) {
      } else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2];
          add(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, value2) {
      let index2 = -1;
      let entry;
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entry = attachers[index2];
          break;
        }
      }
      if (entry) {
        if (isPlainObject(entry[1]) && isPlainObject(value2)) {
          value2 = (0, import_extend.default)(true, entry[1], value2);
        }
        entry[1] = value2;
      } else {
        attachers.push([...arguments]);
      }
    }
  }
  function parse(doc) {
    processor.freeze();
    const file = vfile(doc);
    const Parser = processor.Parser;
    assertParser("parse", Parser);
    if (newable(Parser, "parse")) {
      return new Parser(String(file), file).parse();
    }
    return Parser(String(file), file);
  }
  function stringify(node, doc) {
    processor.freeze();
    const file = vfile(doc);
    const Compiler = processor.Compiler;
    assertCompiler("stringify", Compiler);
    assertNode(node);
    if (newable(Compiler, "compile")) {
      return new Compiler(node, file).compile();
    }
    return Compiler(node, file);
  }
  function run(node, doc, callback) {
    assertNode(node);
    processor.freeze();
    if (!callback && typeof doc === "function") {
      callback = doc;
      doc = void 0;
    }
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      transformers.run(node, vfile(doc), done);
      function done(error, tree, file) {
        tree = tree || node;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          callback(null, tree, file);
        }
      }
    }
  }
  function runSync(node, file) {
    let result;
    let complete;
    processor.run(node, file, done);
    assertDone("runSync", "run", complete);
    return result;
    function done(error, tree) {
      bail(error);
      result = tree;
      complete = true;
    }
  }
  function process(doc, callback) {
    processor.freeze();
    assertParser("process", processor.Parser);
    assertCompiler("process", processor.Compiler);
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      const file = vfile(doc);
      processor.run(processor.parse(file), file, (error, tree, file2) => {
        if (error || !tree || !file2) {
          done(error);
        } else {
          const result = processor.stringify(tree, file2);
          if (result === void 0 || result === null) {
          } else if (looksLikeAVFileValue(result)) {
            file2.value = result;
          } else {
            file2.result = result;
          }
          done(error, file2);
        }
      });
      function done(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve) {
          resolve(file2);
        } else {
          callback(null, file2);
        }
      }
    }
  }
  function processSync(doc) {
    let complete;
    processor.freeze();
    assertParser("processSync", processor.Parser);
    assertCompiler("processSync", processor.Compiler);
    const file = vfile(doc);
    processor.process(file, done);
    assertDone("processSync", "process", complete);
    return file;
    function done(error) {
      complete = true;
      bail(error);
    }
  }
}
function newable(value, name) {
  return typeof value === "function" && // Prototypes do exist.
  // type-coverage:ignore-next-line
  value.prototype && // A function with keys in its prototype is probably a constructor.
  // Classes’ prototype methods are not enumerable, so we check if some value
  // exists in the prototype.
  // type-coverage:ignore-next-line
  (keys(value.prototype) || name in value.prototype);
}
function keys(value) {
  let key;
  for (key in value) {
    if (own.call(value, key)) {
      return true;
    }
  }
  return false;
}
function assertParser(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Parser`");
  }
}
function assertCompiler(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Compiler`");
  }
}
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
  }
}
function assertNode(node) {
  if (!isPlainObject(node) || typeof node.type !== "string") {
    throw new TypeError("Expected node, got `" + node + "`");
  }
}
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name + "` finished async. Use `" + asyncName + "` instead"
    );
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(
    value && typeof value === "object" && "message" in value && "messages" in value
  );
}
function looksLikeAVFileValue(value) {
  return typeof value === "string" || (0, import_is_buffer2.default)(value);
}

// lib/getSlug.ts
var import_slugify = __toESM(require("@sindresorhus/slugify"), 1);
function getSlug(s) {
  return (0, import_slugify.default)(s, { decamelize: false });
}

// lib/getTocData.ts
var import_hast_util_from_html = require("hast-util-from-html");
var import_hast_util_heading = require("hast-util-heading");
var import_hast_util_to_text = require("hast-util-to-text");
var import_unist_util_visit = require("unist-util-visit");
function getTocData(html) {
  const hast = (0, import_hast_util_from_html.fromHtml)(html);
  const flatToc = [];
  (0, import_unist_util_visit.visit)(hast, import_hast_util_heading.heading, (node) => {
    var _a;
    const tagName = node == null ? void 0 : node.tagName;
    flatToc.push({
      title: (0, import_hast_util_to_text.toText)(node),
      depth: parseInt(tagName == null ? void 0 : tagName.at(1)) || -1,
      id: (_a = node == null ? void 0 : node.properties) == null ? void 0 : _a.id
    });
  });
  return flatToc;
}

// node_modules/highlight.js/es/languages/elixir.js
function elixir(hljs) {
  const regex = hljs.regex;
  const ELIXIR_IDENT_RE = "[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?";
  const ELIXIR_METHOD_RE = "[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";
  const KEYWORDS = [
    "after",
    "alias",
    "and",
    "case",
    "catch",
    "cond",
    "defstruct",
    "defguard",
    "do",
    "else",
    "end",
    "fn",
    "for",
    "if",
    "import",
    "in",
    "not",
    "or",
    "quote",
    "raise",
    "receive",
    "require",
    "reraise",
    "rescue",
    "try",
    "unless",
    "unquote",
    "unquote_splicing",
    "use",
    "when",
    "with|0"
  ];
  const LITERALS = [
    "false",
    "nil",
    "true"
  ];
  const KWS = {
    $pattern: ELIXIR_IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS
  };
  const SUBST = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: KWS
  };
  const NUMBER = {
    className: "number",
    begin: "(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[0-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",
    relevance: 0
  };
  const ESCAPES_RE = /\\[\s\S]/;
  const BACKSLASH_ESCAPE = {
    match: ESCAPES_RE,
    scope: "char.escape",
    relevance: 0
  };
  const SIGIL_DELIMITERS = `[/|([{<"']`;
  const SIGIL_DELIMITER_MODES = [
    {
      begin: /"/,
      end: /"/
    },
    {
      begin: /'/,
      end: /'/
    },
    {
      begin: /\//,
      end: /\//
    },
    {
      begin: /\|/,
      end: /\|/
    },
    {
      begin: /\(/,
      end: /\)/
    },
    {
      begin: /\[/,
      end: /\]/
    },
    {
      begin: /\{/,
      end: /\}/
    },
    {
      begin: /</,
      end: />/
    }
  ];
  const escapeSigilEnd = (end) => {
    return {
      scope: "char.escape",
      begin: regex.concat(/\\/, end),
      relevance: 0
    };
  };
  const LOWERCASE_SIGIL = {
    className: "string",
    begin: "~[a-z](?=" + SIGIL_DELIMITERS + ")",
    contains: SIGIL_DELIMITER_MODES.map((x) => hljs.inherit(
      x,
      { contains: [
        escapeSigilEnd(x.end),
        BACKSLASH_ESCAPE,
        SUBST
      ] }
    ))
  };
  const UPCASE_SIGIL = {
    className: "string",
    begin: "~[A-Z](?=" + SIGIL_DELIMITERS + ")",
    contains: SIGIL_DELIMITER_MODES.map((x) => hljs.inherit(
      x,
      { contains: [escapeSigilEnd(x.end)] }
    ))
  };
  const REGEX_SIGIL = {
    className: "regex",
    variants: [
      {
        begin: "~r(?=" + SIGIL_DELIMITERS + ")",
        contains: SIGIL_DELIMITER_MODES.map((x) => hljs.inherit(
          x,
          {
            end: regex.concat(x.end, /[uismxfU]{0,7}/),
            contains: [
              escapeSigilEnd(x.end),
              BACKSLASH_ESCAPE,
              SUBST
            ]
          }
        ))
      },
      {
        begin: "~R(?=" + SIGIL_DELIMITERS + ")",
        contains: SIGIL_DELIMITER_MODES.map(
          (x) => hljs.inherit(
            x,
            {
              end: regex.concat(x.end, /[uismxfU]{0,7}/),
              contains: [escapeSigilEnd(x.end)]
            }
          )
        )
      }
    ]
  };
  const STRING = {
    className: "string",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ],
    variants: [
      {
        begin: /"""/,
        end: /"""/
      },
      {
        begin: /'''/,
        end: /'''/
      },
      {
        begin: /~S"""/,
        end: /"""/,
        contains: []
        // override default
      },
      {
        begin: /~S"/,
        end: /"/,
        contains: []
        // override default
      },
      {
        begin: /~S'''/,
        end: /'''/,
        contains: []
        // override default
      },
      {
        begin: /~S'/,
        end: /'/,
        contains: []
        // override default
      },
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      }
    ]
  };
  const FUNCTION = {
    className: "function",
    beginKeywords: "def defp defmacro defmacrop",
    end: /\B\b/,
    // the mode is ended by the title
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: ELIXIR_IDENT_RE,
        endsParent: true
      })
    ]
  };
  const CLASS = hljs.inherit(FUNCTION, {
    className: "class",
    beginKeywords: "defimpl defmodule defprotocol defrecord",
    end: /\bdo\b|$|;/
  });
  const ELIXIR_DEFAULT_CONTAINS = [
    STRING,
    REGEX_SIGIL,
    UPCASE_SIGIL,
    LOWERCASE_SIGIL,
    hljs.HASH_COMMENT_MODE,
    CLASS,
    FUNCTION,
    { begin: "::" },
    {
      className: "symbol",
      begin: ":(?![\\s:])",
      contains: [
        STRING,
        { begin: ELIXIR_METHOD_RE }
      ],
      relevance: 0
    },
    {
      className: "symbol",
      begin: ELIXIR_IDENT_RE + ":(?!:)",
      relevance: 0
    },
    {
      // Usage of a module, struct, etc.
      className: "title.class",
      begin: /(\b[A-Z][a-zA-Z0-9_]+)/,
      relevance: 0
    },
    NUMBER,
    {
      className: "variable",
      begin: "(\\$\\W)|((\\$|@@?)(\\w+))"
    }
    // -> has been removed, capnproto always uses this grammar construct
  ];
  SUBST.contains = ELIXIR_DEFAULT_CONTAINS;
  return {
    name: "Elixir",
    aliases: [
      "ex",
      "exs"
    ],
    keywords: KWS,
    contains: ELIXIR_DEFAULT_CONTAINS
  };
}

// lib/presets.ts
var import_rehype_autolink_headings = __toESM(require("rehype-autolink-headings"), 1);
var import_rehype_highlight = __toESM(require("rehype-highlight"), 1);
var import_rehype_slug = __toESM(require("rehype-slug"), 1);
var import_rehype_stringify = __toESM(require("rehype-stringify"), 1);
var import_remark_gfm = __toESM(require("remark-gfm"), 1);
var import_remark_obsidian_link = require("remark-obsidian-link");
var import_remark_parse = __toESM(require("remark-parse"), 1);
var import_remark_rehype = __toESM(require("remark-rehype"), 1);
var import_remark_callouts = __toESM(require("remark-callouts"), 1);
var import_rehype_external_links = __toESM(require("rehype-external-links"), 1);
var presetBuilder = ({ toLink }) => {
  return {
    plugins: [
      import_remark_parse.default,
      import_remark_callouts.default,
      import_remark_gfm.default,
      [import_remark_obsidian_link.remarkObsidianLink, { toLink }],
      import_remark_rehype.default,
      [import_rehype_external_links.default, { rel: ["nofollow"], target: "_blank" }],
      import_rehype_slug.default,
      [import_rehype_autolink_headings.default, { behavior: "wrap" }],
      [import_rehype_highlight.default, { languages: { elixir } }],
      import_rehype_stringify.default
    ]
  };
};
var preset = {
  plugins: [
    import_remark_parse.default,
    import_remark_gfm.default,
    import_remark_obsidian_link.remarkObsidianLink,
    import_remark_rehype.default,
    import_rehype_slug.default,
    [import_rehype_autolink_headings.default, { behavior: "wrap" }],
    [import_rehype_highlight.default, { languages: { elixir } }],
    import_rehype_stringify.default
  ]
};

// lib/obsidianLinkBuilder.ts
var Regex = {
  Alias: /.+\|.+/,
  InternalHeader: /^#[^\^]+/,
  InternalBlock: /^#\^.+/,
  ExternalHeader: /.+#[^\^]+/,
  ExternalBlock: /.+#\^.+/
};
function parseWikiLinkString(wikiLinkString) {
  const content = wikiLinkString.slice(2, -2);
  if (Regex.Alias.test(content)) {
    let [value, alias] = content.split("|");
    return { value: value.trim(), alias: alias.trim() };
  } else {
    return { value: content.trim() };
  }
}
function obsidianLinkBuilder(wikiLink) {
  const { value, alias } = typeof wikiLink === "string" ? parseWikiLinkString(wikiLink) : wikiLink;
  let out = {};
  if (alias)
    out["alias"] = alias;
  if (Regex.InternalHeader.test(value)) {
    out["type"] = "header" /* Header */;
    out["header"] = value.slice(1);
  } else if (Regex.InternalBlock.test(value)) {
    out["type"] = "block" /* Block */;
    out["block"] = value.slice(2);
  } else if (Regex.ExternalHeader.test(value)) {
    const [page, header] = value.split("#");
    out["type"] = "page-header" /* PageHeader */;
    out["page"] = page;
    out["header"] = header;
  } else if (Regex.ExternalBlock.test(value)) {
    const [page, block] = value.split("#^");
    out["type"] = "page-block" /* PageBlock */;
    out["page"] = page;
    out["block"] = block;
  } else {
    out["type"] = "page" /* Page */;
    out["page"] = value;
  }
  return out;
}

// lib/toLinkBuilder.ts
function toLinkBuilder(pageAllowSet, getPageUri) {
  const toUri = function({ page, header }) {
    var _a;
    let headerPart = header ? `#${getSlug(header)}` : "";
    let pagePart = null;
    if (page) {
      const { uri: pageURI, slug: pageSlug } = (_a = getPageUri == null ? void 0 : getPageUri(page, getSlug)) != null ? _a : {
        uri: "/content",
        slug: getSlug(page)
      };
      pagePart = page ? `${pageURI}/${pageSlug}` : "";
    }
    if (pagePart && pageAllowSet.has(page)) {
      return header ? `${pagePart}${headerPart}` : pagePart;
    }
    return header ? headerPart : "";
  };
  const toLink = function(wikiLink) {
    const obLink = obsidianLinkBuilder(wikiLink);
    const link = obLinkToLink(obLink, toUri);
    return link;
  };
  return toLink;
}
function obLinkToLink(oLink, toUri) {
  switch (oLink.type) {
    case "page" /* Page */: {
      const { alias, page } = oLink;
      const value = alias || page;
      const uri = toUri({ page });
      return uri ? { value, uri } : value;
    }
    case "page-header" /* PageHeader */: {
      const { alias, page, header } = oLink;
      const value = alias || `${page}#${header}`;
      const uri = toUri({ page, header });
      return uri ? { value, uri } : value;
    }
    case "page-block" /* PageBlock */: {
      const { alias, page } = oLink;
      const value = alias || page;
      const uri = toUri({ page });
      return uri ? { value, uri } : value;
    }
    case "header" /* Header */: {
      const { alias, header } = oLink;
      const value = alias || header;
      const uri = toUri({ header });
      return { value, uri };
    }
    case "block" /* Block */: {
      const { alias } = oLink;
      return alias || "";
    }
  }
}

// lib/metamark.ts
function getFrontmatter(rawMd) {
  const { data: frontmatter } = (0, import_gray_matter.default)(rawMd);
  return frontmatter;
}
function getFirstParagraphText(md) {
  const mdast = unified().use(import_remark_parse2.default).use(import_remark_gfm2.default).use(import_remark_obsidian_link2.remarkObsidianLink).parse(md);
  const firstParagraph = mdast.children.find(
    (child) => child.type === "paragraph"
  );
  return (0, import_mdast_util_to_string.toString)(firstParagraph);
}
function toText2(md) {
  const mdast = unified().use(import_remark_parse2.default).use(import_remark_gfm2.default).use(import_remark_obsidian_link2.remarkObsidianLink).parse(md);
  return (0, import_mdast_util_to_string.toString)(mdast);
}
function toHtml(md, preset2) {
  return unified().use(preset2).processSync(md).toString();
}
function getPage(filePath) {
  const { name: page } = import_path2.default.parse(filePath);
  return page;
}
function getRawMd(filePath) {
  return (0, import_fs.readFileSync)(filePath, "utf8");
}
function getMdNoFrontmatter(rawMd) {
  const { content: md } = (0, import_gray_matter.default)(rawMd);
  return md;
}
function getMark(filePath, pageAllowSet, options) {
  var _a, _b;
  const rawMd = getRawMd(filePath);
  const page = getPage(filePath);
  const md = getMdNoFrontmatter(rawMd);
  const frontmatter = getFrontmatter(rawMd);
  const getPageUri = (_b = (_a = options == null ? void 0 : options.getPageUriBuilder) == null ? void 0 : _a.call(options, { frontmatter })) != null ? _b : void 0;
  const preset2 = presetBuilder({
    toLink: toLinkBuilder(pageAllowSet, getPageUri)
  });
  const html = toHtml(md, preset2);
  return {
    page,
    slug: getSlug(page),
    toc: getTocData(html),
    firstParagraphText: getFirstParagraphText(md),
    frontmatter,
    html,
    text: toText2(md)
  };
}
function getMarks(filePathList, pageAllowSet, options) {
  const marks = [];
  for (const filePath of filePathList) {
    const page = getPage(filePath);
    if (pageAllowSet.has(page)) {
      marks.push(getMark(filePath, pageAllowSet, options));
    }
  }
  return marks;
}
var Metamark = {
  getFirstParagraphText,
  getFrontmatter,
  getMark,
  getMarks,
  getMdNoFrontmatter,
  getRawMd,
  getSlug,
  getPage,
  getTocData,
  preset,
  presetBuilder,
  toHtml,
  toText: toText2
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Metamark
});
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/