#!/usr/bin/env node
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./cli.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bin/csv2json.js":
/*!*************************!*\
  !*** ./bin/csv2json.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_csv2json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/csv2json.js */ "./libs/csv2json.js");
/*!
 * Created by j on 18/10/1.
 */

/* harmony default export */ __webpack_exports__["default"] = (function (program) {
  program.command('csv').description('csv文件转为json文件, 使用: jhandy -s xx.txt').option('-s, --source <csv_file>', "csv文件").option('-d, --dist [json_file]', 'json文件').option('-c, --cols [cols]', '"0, 1, 3", 指定列, 默认所有列;').action(function (cmd) {
    var s = cmd.source;
    var d = cmd.dist;
    var c = cmd.cols && cmd.cols.split(/\D+/);

    if (!s) {
      return cmd.help ? cmd.help() : console.log('没有提供csv文件参数.', cmd);
    }

    if (!d) {
      if (s === 's.txt') {
        var distJson = '/Users/j/dev/shandy/data/csd/stocks.json';
        Object(_libs_csv2json_js__WEBPACK_IMPORTED_MODULE_0__["default"])(s, distJson, [0, 1]);
        return;
      }

      if (s === 't.txt') {
        Object(_libs_csv2json_js__WEBPACK_IMPORTED_MODULE_0__["default"])(s, '/Users/j/dev/crx-jhandy/js/data/T.js', [0, 1]);
        return;
      }

      Object(_libs_csv2json_js__WEBPACK_IMPORTED_MODULE_0__["default"])(s, s.replace(/\.\w+$/, '.json'), c);
      return;
    }

    Object(_libs_csv2json_js__WEBPACK_IMPORTED_MODULE_0__["default"])(s, d, c);
  });
});

/***/ }),

/***/ "./bin/fetch.js":
/*!**********************!*\
  !*** ./bin/fetch.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_stock_fetch_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/stock/fetch/index.js */ "./libs/stock/fetch/index.js");
/**
 * Created by j on 18/8/18.
 */

/* harmony default export */ __webpack_exports__["default"] = (function (program) {
  program.command('fetch').description('从网络爬取股票数据, example: jhandy fetch -s "ths_new ths_p" -c 300059').option('-s, --sources [source_id]', '要爬取的数据源网页id:ths_new, ths_p, ths_c, ycj, 默认爬取全部数据源').option('-i, --index [index]', '股票列表索引位置,主要用于上次爬取数据中断', function (val) {
    return val * 1;
  }).option('-c, --code [code]', '个股code').action(function (cmd) {
    var sources = cmd.sources,
        index = cmd.index,
        code = cmd.code;
    sources = sources ? sources.split(/\s+/img) : _libs_stock_fetch_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].SOURCES;
    var stocks = code ? /^\d{6}$/.test(cmd.code) ? [[code, '']] : undefined : undefined;
    var csdPath = '/Users/j/dev/shandy/data/csd';
    Object(_libs_stock_fetch_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(csdPath, stocks, index, sources);
  });
});

/***/ }),

/***/ "./bin/htm2txt.js":
/*!************************!*\
  !*** ./bin/htm2txt.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_htm2txt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/htm2txt.js */ "./libs/htm2txt.js");
/*!
 * Created by j on 18/10/27.
 */


/* harmony default export */ __webpack_exports__["default"] = (function (program) {
  program.command('h2t').description('html转为txt.').option('-p, --path [html文件 | 本地目录 | url地址]', 'html文件 | 本地目录 | url地址, 默认命令行所在目录').option('-q, --query [jquery选择符]', 'jquery选择符').action(function (cmd) {
    var p = cmd.path || process.cwd();
    var q = cmd.query || '#showcontent'; // 绝对路径 or 相对路径

    p = /^\//img.test(p) ? p : path__WEBPACK_IMPORTED_MODULE_0___default.a.join(process.cwd(), p);
    Object(_libs_htm2txt_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p, q);
  });
});

/***/ }),

/***/ "./bin/merge.js":
/*!**********************!*\
  !*** ./bin/merge.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_merge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/merge.js */ "./libs/merge.js");
/*!
 * Created by j on 18/10/1.
 */


/* harmony default export */ __webpack_exports__["default"] = (function (program) {
  program.command('merge').description('合并当前目录序列文本文件到一个文件').option('-p, --path [p]', "目标目录").action(function (cmd) {
    var p = cmd.path || process.cwd(); // 绝对路径 or 相对路径

    p = /^\//img.test(p) ? p : path__WEBPACK_IMPORTED_MODULE_0___default.a.join(process.cwd(), p);
    Object(_libs_merge_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p);
  });
});

/***/ }),

/***/ "./bin/tdx.js":
/*!********************!*\
  !*** ./bin/tdx.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_tdx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/tdx */ "./libs/tdx.js");
/**
 * Created by j on 18/8/18.
 */

/* harmony default export */ __webpack_exports__["default"] = (function (program) {
  program.command('tdx').description('通达信自定义数据输出, example: jhandy tdx;  jhandy tdx -c 业务;').option('-p, --csd-path [csd路径]', 'csd数据存储路径').option('-, --tdx-file [通达信自定义数据文件路径]', '通达信自定义数据文件路径').option('-c, --col [数据项]', "'概念', '概念y', '产品', '业务', 默认['概念', '概念y', '产品', '业务', '全名', '备注']").action(function (cmd) {
    var col = cmd.col || false;
    var csdPath = cmd['csd-path'] || '/Users/j/dev/shandy/data/csd';
    var tdxFile = cmd['tdx-file'] || '/Volumes/C/new_jyplug/T0002/signals/extern_user.txt';
    console.log('__dirname => ', __dirname, 'process.cwd() => ', process.cwd());
    Object(_libs_tdx__WEBPACK_IMPORTED_MODULE_0__["default"])(col, csdPath, tdxFile);
  });
});

/***/ }),

/***/ "./cli.js":
/*!****************!*\
  !*** ./cli.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var commander__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commander */ "commander");
/* harmony import */ var commander__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(commander__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bin_csv2json_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bin/csv2json.js */ "./bin/csv2json.js");
/* harmony import */ var _bin_fetch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bin/fetch.js */ "./bin/fetch.js");
/* harmony import */ var _bin_tdx_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bin/tdx.js */ "./bin/tdx.js");
/* harmony import */ var _bin_merge_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bin/merge.js */ "./bin/merge.js");
/* harmony import */ var _bin_htm2txt_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bin/htm2txt.js */ "./bin/htm2txt.js");
/**
 * Created by Julien on 2017/4/15.
 */






commander__WEBPACK_IMPORTED_MODULE_0___default.a.version('0.4', '-v, --version').usage('<sub-command>'); // 根据csv文件输出json文件

Object(_bin_csv2json_js__WEBPACK_IMPORTED_MODULE_1__["default"])(commander__WEBPACK_IMPORTED_MODULE_0___default.a); // 从网络获取股票数据, 比如同花顺概念资料

Object(_bin_fetch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(commander__WEBPACK_IMPORTED_MODULE_0___default.a); // 通达信自定义数据输出

Object(_bin_tdx_js__WEBPACK_IMPORTED_MODULE_3__["default"])(commander__WEBPACK_IMPORTED_MODULE_0___default.a); // html转为txt文件

Object(_bin_htm2txt_js__WEBPACK_IMPORTED_MODULE_5__["default"])(commander__WEBPACK_IMPORTED_MODULE_0___default.a); // 合并目录里的序列文本文件

Object(_bin_merge_js__WEBPACK_IMPORTED_MODULE_4__["default"])(commander__WEBPACK_IMPORTED_MODULE_0___default.a); // 解析命令行提供的参数

commander__WEBPACK_IMPORTED_MODULE_0___default.a.parse(process.argv); // 无参数, 输出帮助

if (!commander__WEBPACK_IMPORTED_MODULE_0___default.a.args.length) {
  commander__WEBPACK_IMPORTED_MODULE_0___default.a.help();
}

/***/ }),

/***/ "./libs/csv2json.js":
/*!**************************!*\
  !*** ./libs/csv2json.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! iconv-lite */ "iconv-lite");
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(iconv_lite__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Created by j on 18/3/10.
 */


/*
 * @todo 解析csv格式文本文件到json文件
 * @param csvFile {String}  csv文件名 必须
 * @param jsonFile  {String} json文件名  可选
 * @param cols  {Array}  要截取的列索引，默认所有列  可选
 * @returns {Promise<any>}
 */

/* harmony default export */ __webpack_exports__["default"] = (function (csvFile, jsonFile, cols) {
  if (!jsonFile) {
    jsonFile = csvFile.split('.').shift() + '.json';
    cols = [];
  } else if (Array.isArray(jsonFile)) {
    cols = jsonFile;
    jsonFile = csvFile.split('.').shift() + '.json';
  } else if (typeof jsonFile == 'string') {
    cols = cols || [];
  } // 文字类型数字转为数字类型数字


  cols = cols.map(function (v) {
    return v * 1;
  }); // 不同的分割正则

  var split_reg = /\s{3,}/; // (1:注意股票名称里包含多余的空格:'新 和 成')

  if (cols.join('') === '01') {
    // 主要处理股票列表csv: s.txt, 以退格键进行分割
    split_reg = /[\t]+/;
  }

  return new Promise(function (resolve, reject) {
    fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile(csvFile, function (err, data) {
      if (err) return reject(err); // 字符转码

      data = iconv_lite__WEBPACK_IMPORTED_MODULE_1___default.a.decode(data, 'GBK'); // 获取行并删除冗余行

      var rows = data.split('\r\n');
      console.log("".concat(csvFile, "\u884C\u6570\u662F=> "), rows.length); // 截取对应的列，默认全列

      var col_length = 1;
      var rows2 = [];
      rows.forEach(function (str) {
        var arr = str.split(split_reg);
        col_length = arr.length >= col_length ? arr.length : col_length;
        rows2.push(arr);
      });
      var rows3 = [];
      rows2.forEach(function (arr) {
        if (col_length - arr.length > 3) return console.log('冗余行 => ', arr); // 处理冗余行 (1:注意股票名称里包含多余的空格:'新 和 成')

        if (cols.length === 0) {
          rows3.push(arr);
        } else {
          rows3.push(arr.filter(function (v, i) {
            return cols.indexOf(i) >= 0;
          }));
        }
      }); // 删除列标题

      var th = rows3.shift();
      console.log('列标题是=> ', th);
      console.log('有效rows length => ', rows3.length); // 删除股票名称中的空白符

      if (cols.join('') === '01') {
        rows3.forEach(function (arr) {
          arr[1] = arr[1].replace(/\s+/img, '');
        });
      }

      var jsonStr = JSON.stringify(rows3); // 如果写入js文件而不是json文件

      if (/\.js$/.test(jsonFile)) {
        jsonStr = "STOCKS = ".concat(jsonStr, " ;");
      } // 解析后的数据写入新文件


      fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(jsonFile, jsonStr);
      console.log("\u6570\u636E\u6210\u529F\u5199\u5165".concat(jsonFile, ".")); // return json object

      resolve(rows3);
    });
  });
});

/***/ }),

/***/ "./libs/htm2txt.js":
/*!*************************!*\
  !*** ./libs/htm2txt.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chardet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chardet */ "chardet");
/* harmony import */ var chardet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chardet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconv-lite */ "iconv-lite");
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(iconv_lite__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheerio */ "cheerio");
/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cheerio_httpcli__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cheerio-httpcli */ "cheerio-httpcli");
/* harmony import */ var cheerio_httpcli__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cheerio_httpcli__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _walk_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./walk.js */ "./libs/walk.js");
/* harmony import */ var _walk_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_walk_js__WEBPACK_IMPORTED_MODULE_5__);
/*!
 * Created by j on 18/10/27.
 */






/**
 * 从html解析出完整的dom对象
 * @param html_path
 * @returns {*}
 */

function get$(html_path) {
  //let eo = chardet.detectFileAllSync(html_path); //console.log(eo);
  var buf = fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(html_path); // return buffer

  return cheerio__WEBPACK_IMPORTED_MODULE_3___default.a.load(iconv_lite__WEBPACK_IMPORTED_MODULE_2___default.a.decode(buf, 'utf8'));
}
/**
 * 从html解析出txt.
 * @param path html文件路径
 * @param query jquery选择符
 */


/* harmony default export */ __webpack_exports__["default"] = (function (path, query) {
  if (/^https?:/img.test(path)) {
    cheerio_httpcli__WEBPACK_IMPORTED_MODULE_4___default.a.fetch(path, {}, function (err, $, res, body) {});
  } else {
    _walk_js__WEBPACK_IMPORTED_MODULE_5___default()(path, function (file) {
      console.log(file);
      var reg = /\.html?$/; // 只处理html文件

      if (reg.test(file)) {
        var file_name = file.replace(reg, '.txt');
        var $ = get$(file);
        $(query).find('br').replaceWith('<p>^</p>');
        var str = $(query).text().replace(/\^+/img, '\r\n');
        fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(file_name, str);
      }
    });
  }
});

/***/ }),

/***/ "./libs/jsono.js":
/*!***********************!*\
  !*** ./libs/jsono.js ***!
  \***********************/
/*! exports provided: Jo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Jo", function() { return Jo; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*!
 * Created by j on 18/11/9.
 * 把json文件包装成对象进行增删改查
 */



var Jo =
/*#__PURE__*/
function () {
  /**
   *
   * @param jsonPath {String} json file path
   */
  function Jo(jsonPath) {
    _classCallCheck(this, Jo);

    console.log(jsonPath);
    jsonPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(__dirname, "".concat(jsonPath));
    this.jsonPath = jsonPath;

    if (!fs__WEBPACK_IMPORTED_MODULE_0___default.a.existsSync(jsonPath)) {
      //fs.createWriteStream(jsonPath)
      fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(jsonPath, '{}');
      this.json = {};
    } else {
      try {
        var str = fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(this.jsonPath, 'utf8');
        this.json = JSON.parse(str);
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  _createClass(Jo, [{
    key: "merge",
    value: function merge(obj) {
      Object.assign(this.json, obj);
    }
  }, {
    key: "save",
    value: function save() {
      fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(this.jsonPath, JSON.stringify(this.json, null, '\t'));
    }
  }, {
    key: "get",
    value: function get(key) {
      if (!key) return this.json;
      var keys = key.split('.');
      return function fx(namespace, keys) {
        var k = keys.shift();
        var o = namespace[k];
        if (o && keys.length) return fx(namespace[k], keys);
        return o;
      }(this.json, keys);
    }
  }, {
    key: "match",
    value: function match(key) {
      return this.get(key);
    }
  }]);

  return Jo;
}();


/* harmony default export */ __webpack_exports__["default"] = (function (jsonFile) {
  return new Jo(jsonFile);
});

/***/ }),

/***/ "./libs/merge.js":
/*!***********************!*\
  !*** ./libs/merge.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_walk_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/walk.js */ "./libs/walk.js");
/* harmony import */ var _libs_walk_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_libs_walk_js__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Created by Julien on 2017/2/27.
 */


/**
 * 根据文件名中包含的数字,字母ab, 上中下对文件进行比较,据此排序
 * @param a {String} file name
 * @param b {String} file name
 */

function x(a, b) {
  var reg = /(\d+)|[上中下]|[a-b]/img;
  var ar = a.match(reg);
  var br = b.match(reg);
}
/**
 * 从文件名里获取数字序号
 * @param file_name
 * @returns {*|Array}
 */


function get_d(file_name) {
  var arr = file_name.match(/\d+/g) || [];
  if (!arr.length) return;
  arr.length === 1 && arr.unshift(arr[0]);
  arr.push(file_name);
  return arr;
}

/* harmony default export */ __webpack_exports__["default"] = (function (path) {
  console.log(path);
  var dir_name = path.split('/');
  dir_name = dir_name.pop();
  console.log(dir_name);
  fs__WEBPACK_IMPORTED_MODULE_0___default.a.readdir(path, function (err, files) {
    if (err) {
      return console.error(err);
    }

    var arr = [];
    var item;

    for (var i = 0; i < files.length; i += 1) {
      item = files[i];

      if (/\.txt$/i.test(item)) {
        item = get_d(item);
        item && arr.push(item);
      }
    } //对文件进行排序
    //截取文件名里的最大序号


    arr.sort(function (a, b) {
      return a[1] * 1 - b[1] * 1;
    });
    console.log(arr);
    var new_txt = "".concat(dir_name, " ( ").concat(arr[0][0], "-").concat(arr[arr.length - 1][1], " ).txt"); // 创建新文本文件, 用于保存合并内容

    fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(new_txt, '');
    arr.forEach(function (v) {
      var str = fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(v[2]);
      fs__WEBPACK_IMPORTED_MODULE_0___default.a.appendFile(new_txt, str, function (err) {
        err && console.error(err);
      });
    });
  });
});

/***/ }),

/***/ "./libs/stock/fetch/fetch.js":
/*!***********************************!*\
  !*** ./libs/stock/fetch/fetch.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio-httpcli */ "cheerio-httpcli");
/* harmony import */ var cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ths_c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ths_c.js */ "./libs/stock/fetch/ths_c.js");
/* harmony import */ var _ths_c_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ths_c_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ths_new_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ths_new.js */ "./libs/stock/fetch/ths_new.js");
/* harmony import */ var _ths_new_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ths_new_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ths_p_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ths_p.js */ "./libs/stock/fetch/ths_p.js");
/* harmony import */ var _ths_p_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ths_p_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ycj_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ycj.js */ "./libs/stock/fetch/ycj.js");
/* harmony import */ var _ycj_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ycj_js__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Created by j on 18/8/16.
 * 从网页上获取股票信息
 */





var map = {
  ths_c: _ths_c_js__WEBPACK_IMPORTED_MODULE_1___default.a,
  ths_new: _ths_new_js__WEBPACK_IMPORTED_MODULE_2___default.a,
  ths_p: _ths_p_js__WEBPACK_IMPORTED_MODULE_3___default.a,
  ycj: _ycj_js__WEBPACK_IMPORTED_MODULE_4___default.a
};
cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default.a.set('gzip', true);
cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default.a.set('timeout', 7000);
cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default.a.set('headers', {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.34'
});
/**
 *
 * @param code
 * @param sourceId
 * @param delay
 * @returns {Promise<any>}
 */

function fetch(code, sourceId, delay) {
  var source = map[sourceId];
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      cheerio_httpcli__WEBPACK_IMPORTED_MODULE_0___default.a.fetch(source.url(code), function (err, $, res, body) {
        var result = source.parse($);
        resolve({
          result: result,
          source_id: sourceId,
          code: code
        });
      });
    }, delay || 30);
  });
} //fetch.SOURCES = ['ths_new', 'ths_p', 'ths_c', 'ycj']


/* harmony default export */ __webpack_exports__["default"] = (fetch);

/***/ }),

/***/ "./libs/stock/fetch/index.js":
/*!***********************************!*\
  !*** ./libs/stock/fetch/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch */ "./libs/stock/fetch/fetch.js");
/* harmony import */ var _jsono__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../jsono */ "./libs/jsono.js");
/**
 * Created by j on 18/8/18.
 */



var SOURCES = ['ths_new', 'ths_p', 'ths_c']; // 暂时移除 'ycj'

/**
 *
 * @param stocks
 * @param index
 * @param sources
 * @param csdPath
 */

function start(stocks, index, sources, csdPath) {
  var arr = stocks[index];
  if (!arr) return console.log('over', index);
  var code = arr[0];
  var name = arr[1];
  console.info('fetch => ', code, name, index);
  var promises = sources.map(function (id, index) {
    return Object(_fetch__WEBPACK_IMPORTED_MODULE_1__["default"])(code, id, index * (Math.random() + 0.1) * 3000);
  });
  Promise.all(promises).then(function (data) {
    // console.log(typeof data,  data[0]);
    var sjo = Object(_jsono__WEBPACK_IMPORTED_MODULE_2__["default"])(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(csdPath, "./s/".concat(code, ".json")));
    sjo.merge({
      "名称": name,
      "code": code
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;
        sjo.merge(v.result);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    sjo.save();
    index += 1;
    setTimeout(function () {
      start(stocks, index, sources, csdPath);
    }, (Math.random() + 0.1) * 3000);
  }).catch(function (err) {
    throw new Error(err);
  });
}
/**
 *
 * @param csdPath {String}
 * @param stocks {Array} [['300059', '东方财富']]
 * @param index {Number}
 * @param sources {Array}  ['ths_new', 'ths_p', 'ths_c']
 */


function f(csdPath, stocks, index, sources) {
  if (!csdPath) throw new Error('必须提供csd数据存储路径.');
  stocks = stocks || Object(_jsono__WEBPACK_IMPORTED_MODULE_2__["default"])(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(csdPath, './stocks.json')).json;
  index = index || 0;
  sources = sources || SOURCES;
  console.log("stocks.length is ".concat(stocks.length));
  start(stocks, index, sources, csdPath);
}

f.SOURCES = SOURCES;
/* harmony default export */ __webpack_exports__["default"] = (f);

/***/ }),

/***/ "./libs/stock/fetch/ths_c.js":
/*!***********************************!*\
  !*** ./libs/stock/fetch/ths_c.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Created by j on 18/11/25.
 * 同花顺概念页面资料解析: http://basic.10jqka.com.cn/000001/concept.html
 */
String.prototype.j_trim = function () {
  return this.replace(/\s+/img, '');
};

module.exports = {
  url: function url(code) {
    return "http://basic.10jqka.com.cn/".concat(code, "/concept.html");
  },
  parse: function parse($) {
    var $table = $('#concept table.gnContent');
    var $gnName = $table.find('tr td.gnName');
    var $extend_content = $table.find('tr.extend_content');
    var concept = {};
    $gnName.each(function (i) {
      var name = $(this).text().j_trim();
      concept[name] = $extend_content.eq(i).text().j_trim();
    });
    return {
      '概念详情': concept
    };
  }
};

/***/ }),

/***/ "./libs/stock/fetch/ths_new.js":
/*!*************************************!*\
  !*** ./libs/stock/fetch/ths_new.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Created by j on 18/8/13.
 * 同花顺动态页面解析 http://basic.10jqka.com.cn/000001/
 */
String.prototype.j_trim = function () {
  return this.replace(/\s+/img, '');
};

module.exports = {
  url: function url(code) {
    return "http://basic.10jqka.com.cn/".concat(code, "/");
  },
  parse: function parse($) {
    var $table = $('#profile table');
    var $td = $table.eq(0).find('td');
    var concept = $td.eq(2).text().replace('概念强弱排名：', '').replace('涉及概念：', '').replace('详情>>', '').j_trim();
    var finance = $td.eq(3).text().replace('财务分析：', '').j_trim();
    var type = $table.eq(1).find('td').eq(3).text().replace('分类：', '').j_trim();
    return {
      '概念': concept,
      '财务': finance,
      '分类': type
    };
  }
};

/***/ }),

/***/ "./libs/stock/fetch/ths_p.js":
/*!***********************************!*\
  !*** ./libs/stock/fetch/ths_p.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Created by j on 18/8/16.
 * 同花顺公司资料页面解析 http://basic.10jqka.com.cn/000001/company.html
 */
String.prototype.j_trim = function () {
  return this.replace(/\s+/img, '');
};

module.exports = {
  url: function url(code) {
    return "http://basic.10jqka.com.cn/".concat(code, "/company.html");
  },
  parse: function parse($) {
    var $td = $('#detail td');
    var full_name = $td.eq(1).text().replace('公司名称：', '').j_trim();
    var position = $td.eq(2).text().replace('所属地域：', '').j_trim();
    var business = $td.eq(4).text().replace('所属行业：', '').j_trim();
    var industry = $td.eq(7).text().replace('主营业务：', '').j_trim();
    var product = $td.eq(8).text().replace('产品名称：', '').j_trim();
    return {
      '全名': full_name,
      '地域': position,
      '行业': business,
      '业务': industry,
      '产品': product
    };
  }
};

/***/ }),

/***/ "./libs/stock/fetch/ycj.js":
/*!*********************************!*\
  !*** ./libs/stock/fetch/ycj.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Created by j on 18/8/16.
 * 云财经股票页面数据解析
 */
module.exports = {
  url: function url(code) {
    code = (/^6/.test(code) ? 'sh' : 'sz') + code;
    return "http://www.yuncaijing.com/quote/".concat(code, ".html");
  },
  parse: function parse($) {
    var arr = $('.ralate table tr').map(function () {
      var s = $(this).find('td a').text() || '';
      var s2 = $(this).find('td small').text() || '';
      return s.trim() + '-' + s2.trim();
    }).get().join('  ');
    return {
      //'news': $('.tab-panel.active').html(),
      '概念y': arr
    };
  }
};

/***/ }),

/***/ "./libs/tdx.js":
/*!*********************!*\
  !*** ./libs/tdx.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconv-lite */ "iconv-lite");
/* harmony import */ var iconv_lite__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(iconv_lite__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsono__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jsono */ "./libs/jsono.js");
/**
 * Created by j on 18/8/13.
 * 创建通达信自定义数据更新
 */




/**
 *
 * @param prop {String}
 * @param number {Number}
 * @param csdPath {String} csd文件夹路径
 * @param tempFile {String} 临时使用的通达信自定义数据文件
 */

function createPropFile(prop, number, csdPath, tempFile) {
  var propFile = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, "./".concat(prop, ".txt"));
  var stocks = Object(_jsono__WEBPACK_IMPORTED_MODULE_3__["default"])(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, './stocks.json')).json;
  var result = '';
  stocks.forEach(function (arr, i) {
    var code = arr[0];
    var szh = /^6/.test(code) ? 1 : 0;
    var sjo = Object(_jsono__WEBPACK_IMPORTED_MODULE_3__["default"])(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, "./s/".concat(code, ".json")));
    var data;

    switch (prop) {
      case '概念':
        data = sjo.get('概念').replace(/[，]/img, '  ') + '  ' + sjo.get('行业').replace(/^.+[—]/, '-') + '  ' + sjo.get('概念z') + '  ';
        break;

      case '概念y':
        data = sjo.get('概念y').replace(/[-]\d+[%]/img, '  ');
        break;

      case '产品':
        data = sjo.get('产品').replace(/[、]/img, '  ');
        break;

      case '业务':
        data = sjo.get('业务') + '  ';
        break;

      default:
        data = sjo.get(prop) + '  ';
    }

    result += [szh, code, number, data, '0.000'].join('|') + '\r\n';
  });
  fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(propFile, result);
  fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(tempFile, result, {
    encoding: 'utf8',
    flag: 'a'
  });
}
/**
 * @param props
 * @param csdPath
 * @param tdxFile {String} default: /Volumes/C/new_jyplug/T0002/signals/extern_user.txt
 */


/* harmony default export */ __webpack_exports__["default"] = (function (props, csdPath, tdxFile) {
  var absolutePathReg = /^\//;
  if (!absolutePathReg.test(csdPath) || !absolutePathReg.test(tdxFile)) throw new Error('必须提供csd数据存储路径和通达信自定义数据文件路径.');
  var tempFile = tdxFile.split(/[/\\]/).pop();
  tempFile = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(csdPath, tempFile);
  fs__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(tempFile, '');
  props = props ? [props] : ['概念', '概念y', '产品', '业务', '全名', '备注'];
  props.forEach(function (prop, index) {
    createPropFile(prop, index + 1, csdPath, tempFile);
  });
  if (props.length === 1) return true;
  fs__WEBPACK_IMPORTED_MODULE_0___default.a.createReadStream(tempFile).pipe(iconv_lite__WEBPACK_IMPORTED_MODULE_2___default.a.decodeStream('utf8')).pipe(iconv_lite__WEBPACK_IMPORTED_MODULE_2___default.a.encodeStream('GBK')).pipe(fs__WEBPACK_IMPORTED_MODULE_0___default.a.createWriteStream(tdxFile));
  console.log('****通达信自定义数据更新完成****');
  return true;
});

/***/ }),

/***/ "./libs/walk.js":
/*!**********************!*\
  !*** ./libs/walk.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Created by j on 18/9/14.
 */
var fs = __webpack_require__(/*! fs */ "fs");

var path = __webpack_require__(/*! path */ "path");
/**
 * 递归遍历目录
 * @param filePath
 * @param callback
 */


function recurve(filePath, callback) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.error(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename); //根据文件路径获取文件信息，返回一个fs.Stats对象

        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.error('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件

            var isDir = stats.isDirectory(); //是文件夹

            if (isFile) {
              callback(filedir);
            }

            if (isDir) {
              recurve(filedir, callback); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

module.exports = function (filePath, callback) {
  var stat = fs.statSync(filePath);

  if (stat.isFile()) {
    callback(filePath);
  } else if (stat.isDirectory()) {
    recurve(filePath, callback);
  }
};

/***/ }),

/***/ "chardet":
/*!**************************!*\
  !*** external "chardet" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chardet");

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),

/***/ "cheerio-httpcli":
/*!**********************************!*\
  !*** external "cheerio-httpcli" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cheerio-httpcli");

/***/ }),

/***/ "commander":
/*!****************************!*\
  !*** external "commander" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "iconv-lite":
/*!*****************************!*\
  !*** external "iconv-lite" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iconv-lite");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=cli.js.map