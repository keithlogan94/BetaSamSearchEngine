"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _fs = _interopRequireDefault(require("fs"));

var _sequelize = _interopRequireWildcard(require("./sequelize"));

var _csvParser = _interopRequireDefault(require("csv-parser"));

var _sequelize2 = require("sequelize");

var _cors = _interopRequireDefault(require("cors"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_sequelize.ContractOpportunity.sync({
  force: true
});

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());

function saveToDB(stream) {
  var results = [];
  stream.pipe((0, _csvParser["default"])()).on('data', function (data) {
    return results.push(data);
  }).on('end', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var i, co, noticeId, title, solNumber, departmentAgency, cGac, subTier, fpdsCode, office, aacCode, postedDate, type, baseType, archiveType, archiveDate, setAsideCode, setAside, responseDeadline, naicsCode, classificationCode, popStreetAddress, popCity, popState, popZip, popCountry, active, awardNumber, awardDate, awardMoney, awardee, primaryContactTitle, primaryContactFullName, primaryContactEmail, primaryContactPhone, primaryContactFax, secondaryContactTitle, secondaryContactFullName, secondaryContactContactEmail, secondaryContactContactPhone, secondaryContactFax, organizationType, state, city, zip, countryCode, additionalInfoLink, link, description;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < 100)) {
              _context.next = 9;
              break;
            }

            co = results[i];
            noticeId = co.NoticeId, title = co.Title, solNumber = co['Sol#'], departmentAgency = co['Department/Ind.Agency'], cGac = co.CGAC, subTier = co['Sub-Tier'], fpdsCode = co['FPDS Code'], office = co.Office, aacCode = co['AAC Code'], postedDate = co.PostedDate, type = co.Type, baseType = co.BaseType, archiveType = co.ArchiveType, archiveDate = co.ArchiveDate, setAsideCode = co.SetAsideCode, setAside = co.SetAside, responseDeadline = co.ResponseDeadLine, naicsCode = co.NaicsCode, classificationCode = co.ClassificationCode, popStreetAddress = co.PopStreetAddress, popCity = co.PopCity, popState = co.PopState, popZip = co.PopZip, popCountry = co.PopCountry, active = co.Active, awardNumber = co.AwardNumber, awardDate = co.AwardDate, awardMoney = co['Award$'], awardee = co.Awardee, primaryContactTitle = co.PrimaryContactTitle, primaryContactFullName = co.PrimaryContactFullName, primaryContactEmail = co.PrimaryContactEmail, primaryContactPhone = co.PrimaryContactPhone, primaryContactFax = co.PrimaryContactFax, secondaryContactTitle = co.SecondaryContactTitle, secondaryContactFullName = co.SecondaryContactFullName, secondaryContactContactEmail = co.SecondaryContactEmail, secondaryContactContactPhone = co.SecondaryContactPhone, secondaryContactFax = co.SecondaryContactFax, organizationType = co.OrganizationType, state = co.State, city = co.City, zip = co.ZipCode, countryCode = co.CountryCode, additionalInfoLink = co.AdditionalInfoLink, link = co.Link, description = co.Description;
            _context.next = 6;
            return _sequelize.ContractOpportunity.create({
              noticeId: noticeId,
              title: title,
              solNumber: solNumber,
              departmentAgency: departmentAgency,
              cGac: cGac,
              subTier: subTier,
              fpdsCode: fpdsCode,
              office: office,
              aacCode: aacCode,
              postedDate: postedDate,
              type: type,
              baseType: baseType,
              archiveType: archiveType,
              archiveDate: archiveDate,
              setAsideCode: setAsideCode,
              setAside: setAside,
              responseDeadline: responseDeadline,
              naicsCode: naicsCode,
              classificationCode: classificationCode,
              popStreetAddress: popStreetAddress,
              popCity: popCity,
              popState: popState,
              popZip: popZip,
              popCountry: popCountry,
              active: active,
              awardNumber: awardNumber,
              awardDate: awardDate,
              awardMoney: awardMoney,
              awardee: awardee,
              primaryContactTitle: primaryContactTitle,
              primaryContactFullName: primaryContactFullName,
              primaryContactEmail: primaryContactEmail,
              primaryContactPhone: primaryContactPhone,
              primaryContactFax: primaryContactFax,
              secondaryContactTitle: secondaryContactTitle,
              secondaryContactFullName: secondaryContactFullName,
              secondaryContactContactEmail: secondaryContactContactEmail,
              secondaryContactContactPhone: secondaryContactContactPhone,
              secondaryContactFax: secondaryContactFax,
              organizationType: organizationType,
              state: state,
              city: city,
              zip: zip,
              countryCode: countryCode,
              additionalInfoLink: additionalInfoLink,
              link: link,
              description: description
            });

          case 6:
            i++;
            _context.next = 1;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
}

function saveTodaysOpportunities(_x) {
  return _saveTodaysOpportunities.apply(this, arguments);
}

function _saveTodaysOpportunities() {
  _saveTodaysOpportunities = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(saveToDB) {
    var todayFile, stream, data, _stream;

    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            todayFile = "".concat(getDate(), "contract-opportunities.csv");

            if (!_fs["default"].existsSync(todayFile)) {
              _context5.next = 6;
              break;
            }

            stream = _fs["default"].createReadStream(todayFile);
            saveToDB(stream);
            _context5.next = 12;
            break;

          case 6:
            _context5.next = 8;
            return _axios["default"].get("https://sam.gov/api/prod/fileextractservices/v1/api/download/Contract%20Opportunities/datagov/ContractOpportunitiesFullCSV.csv?privacy=Public");

          case 8:
            data = _context5.sent.data;

            _fs["default"].writeFileSync(todayFile, data);

            _stream = _fs["default"].createReadStream(todayFile);
            saveToDB(_stream);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _saveTodaysOpportunities.apply(this, arguments);
}

function getDate() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12

  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var newdate = year + "-" + month + "-" + day;
  return newdate;
}

app.get("/sync-opportunities", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return saveTodaysOpportunities(saveToDB);

          case 2:
            return _context2.abrupt("return", res.json({
              message: "Synced"
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}());
app.get("/contract-opportunities", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var offset, limit, _req$query, page, pageSize, activeSearches, whereObj, searches, i, search, searchWhere, searchKey, searchEquality, searchValue, cos;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            offset = 0;
            limit = 100;
            _req$query = req.query, page = _req$query.page, pageSize = _req$query.pageSize, activeSearches = _req$query.activeSearches;
            page = Number.parseInt(page);

            if (isNaN(page)) {
              page = 1;
            }

            if (page < 1) {
              page = 1;
            }

            pageSize = Number.parseInt(pageSize);

            if (isNaN(pageSize)) {
              pageSize = 10;
            }

            if (pageSize < 1) {
              pageSize = 10;
            }

            offset = (page - 1) * pageSize;
            limit = pageSize;
            whereObj = {};
            console.log(activeSearches);

            if (activeSearches) {
              searches = activeSearches.split('AND');

              for (i = 0; i < searches.length; i++) {
                search = searches[i];
                searchWhere = search.split(',');
                searchKey = searchWhere[0];
                searchEquality = searchWhere[1];

                if (searchEquality === 'equals') {
                  searchEquality = _sequelize2.Op.eq;
                } else if (searchEquality === 'like') {
                  searchEquality = _sequelize2.Op.like;
                  searchWhere[2] = '%' + searchWhere[2] + '%';
                } else if (searchEquality === 'greaterThan') {
                  searchEquality = _sequelize2.Op.gt;
                } else if (searchEquality === 'lessThan') {
                  searchEquality = _sequelize2.Op.lt;
                }

                searchValue = searchWhere[2];
                whereObj[searchKey] = _defineProperty({}, searchEquality, searchValue);
              }
            }

            _context3.next = 16;
            return _sequelize.ContractOpportunity.findAll({
              offset: offset,
              limit: limit,
              where: whereObj
            });

          case 16:
            cos = _context3.sent;
            return _context3.abrupt("return", res.json(cos));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/number-of-opportunities", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var cos;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _sequelize.ContractOpportunity.findAndCountAll();

          case 2:
            cos = _context4.sent;
            return _context4.abrupt("return", res.json({
              number: cos.count
            }));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}());
app.listen(3000, function () {
  return console.log("listening on port 3000");
});