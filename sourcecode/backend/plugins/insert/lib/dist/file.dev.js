'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Path = require('path');

var Ammo = require('@hapi/ammo');

var Boom = require('@hapi/boom');

var Bounce = require('@hapi/bounce');

var Hoek = require('@hapi/hoek');

var Validate = require('@hapi/validate');

var Etag = require('./etag');

var Fs = require('./fs');

var internals = {};
internals.defaultMap = {
  gzip: '.gz'
};
internals.schema = Validate.alternatives([Validate.string(), Validate.func(), Validate.object({
  path: Validate.alternatives(Validate.string(), Validate.func()).required(),
  confine: Validate.alternatives(Validate.string(), Validate["boolean"]())["default"](true),
  filename: Validate.string(),
  mode: Validate.string().valid('attachment', 'inline').allow(false),
  lookupCompressed: Validate["boolean"](),
  lookupMap: Validate.object().min(1).pattern(/.+/, Validate.string()),
  etagMethod: Validate.string().valid('hash', 'simple').allow(false),
  start: Validate.number().integer().min(0)["default"](0),
  end: Validate.number().integer().min(Validate.ref('start'))
})["with"]('filename', 'mode')]);

exports.handler = function (route, options) {
  var settings = Validate.attempt(options, internals.schema, 'Invalid file handler options (' + route.path + ')');
  settings = _typeof(options) !== 'object' ? {
    path: options,
    confine: '.'
  } : settings;
  settings.confine = settings.confine === true ? '.' : settings.confine;
  Hoek.assert(typeof settings.path !== 'string' || settings.path[settings.path.length - 1] !== '/', 'File path cannot end with a \'/\':', route.path);

  var handler = function handler(request) {
    var path = typeof settings.path === 'function' ? settings.path(request) : settings.path;
    return exports.response(path, settings, request);
  };

  return handler;
};

exports.load = function (path, request, options) {
  var response = exports.response(path, options, request, true);
  return internals.prepare(response);
}; // return this.response(File.response(path, responseOptions, this.request));


exports.response = function (path, options, request, _preloaded) {
  Hoek.assert(!options.mode || ['attachment', 'inline'].indexOf(options.mode) !== -1, 'options.mode must be either false, attachment, or inline');

  if (options.confine) {
    var confineDir = Path.resolve(request.route.settings.files.relativeTo, options.confine);
    path = Path.isAbsolute(path) ? Path.normalize(path) : Path.join(confineDir, path); // Verify that resolved path is within confineDir

    if (path.lastIndexOf(confineDir, 0) !== 0) {
      path = null;
    }
  } else {
    path = Path.isAbsolute(path) ? Path.normalize(path) : Path.join(request.route.settings.files.relativeTo, path);
  }

  var source = {
    path: path,
    settings: options,
    stat: null,
    file: null
  };
  var prepare = _preloaded ? null : internals.prepare;
  return request.generateResponse(source, {
    variety: 'file',
    marshal: internals.marshal,
    prepare: prepare,
    close: internals.close
  });
};

internals.prepare = function _callee(response) {
  var path, file, stat, start, fileName;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          path = response.source.path;

          if (!(path === null)) {
            _context.next = 3;
            break;
          }

          throw Boom.forbidden(null, {
            code: 'EACCES'
          });

        case 3:
          file = response.source.file = new Fs.File(path);
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(file.openStat('r'));

        case 7:
          stat = _context.sent;
          start = response.source.settings.start || 0;

          if (response.source.settings.end !== undefined) {
            response.bytes(response.source.settings.end - start + 1);
          } else {
            response.bytes(stat.size - start);
          }

          if (!response.headers['content-type']) {
            response.type(response.request.server.mime.path(path).type || 'application/octet-stream');
          }

          response.header('last-modified', stat.mtime.toUTCString());

          if (response.source.settings.mode) {
            fileName = response.source.settings.filename || Path.basename(path);
            response.header('content-disposition', response.source.settings.mode + '; filename=' + encodeURIComponent(fileName));
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(Etag.apply(response, stat));

        case 15:
          return _context.abrupt("return", response);

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](4);
          internals.close(response);
          throw _context.t0;

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 18]]);
};

internals.marshal = function _callee2(response) {
  var lookupMap, encoding, extension, precompressed, stat;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(response.source.settings.lookupCompressed && !response.source.settings.start && response.source.settings.end === undefined && response.request.server.settings.compression !== false)) {
            _context2.next = 17;
            break;
          }

          lookupMap = response.source.settings.lookupMap || internals.defaultMap;
          encoding = response.request.info.acceptEncoding;
          extension = lookupMap.hasOwnProperty(encoding) ? lookupMap[encoding] : null;

          if (!extension) {
            _context2.next = 17;
            break;
          }

          precompressed = new Fs.File("".concat(response.source.path).concat(extension));
          _context2.prev = 6;
          _context2.next = 9;
          return regeneratorRuntime.awrap(precompressed.openStat('r'));

        case 9:
          stat = _context2.sent;
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](6);
          precompressed.close();
          Bounce.ignore(_context2.t0, 'boom');

        case 16:
          if (stat) {
            response.source.file.close();
            response.source.file = precompressed;
            response.bytes(stat.size);
            response.header('content-encoding', encoding);
            response.vary('accept-encoding');
          }

        case 17:
          return _context2.abrupt("return", internals.createStream(response));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[6, 12]]);
};

internals.addContentRange = function (response) {
  var request = response.request;
  var length = response.headers['content-length'];
  var range = null;

  if (request.route.settings.response.ranges) {
    if (request.headers.range && length) {
      // Check If-Range
      if (!request.headers['if-range'] || request.headers['if-range'] === response.headers.etag) {
        // Ignoring last-modified date (weak)
        // Check that response is not encoded once transmitted
        var mime = request.server.mime.type(response.headers['content-type'] || 'application/octet-stream');
        var encoding = request.server.settings.compression && mime.compressible && !response.headers['content-encoding'] ? request.info.acceptEncoding : null;

        if (encoding === 'identity' || !encoding) {
          // Parse header
          var ranges = Ammo.header(request.headers.range, length);

          if (!ranges) {
            var error = Boom.rangeNotSatisfiable();
            error.output.headers['content-range'] = 'bytes */' + length;
            throw error;
          } // Prepare transform


          if (ranges.length === 1) {
            // Ignore requests for multiple ranges
            range = ranges[0];
            response.code(206);
            response.bytes(range.to - range.from + 1);
            response.header('content-range', 'bytes ' + range.from + '-' + range.to + '/' + length);
          }
        }
      }
    }

    response.header('accept-ranges', 'bytes');
  }

  return range;
};

internals.createStream = function (response) {
  var source = response.source;
  Hoek.assert(source.file !== null);
  var range = internals.addContentRange(response);
  var options = {
    start: source.settings.start || 0,
    end: source.settings.end
  };

  if (range) {
    options.end = range.to + options.start;
    options.start = range.from + options.start;
  }

  return source.file.createReadStream(options);
};

internals.close = function (response) {
  if (response.source.file !== null) {
    response.source.file.close();
    response.source.file = null;
  }
};