import {
  NoObjectGeneratedError,
  external_exports,
  generateText,
  google,
  output_exports
} from "../../chunk-JIILKC2K.mjs";
import "../../chunk-5HLUDUNX.mjs";
import {
  metadata,
  task
} from "../../chunk-RMXLWNCE.mjs";
import "../../chunk-RA6RHLTU.mjs";
import {
  __commonJS,
  __name,
  __require,
  __toESM,
  init_esm
} from "../../chunk-NKKWNCEX.mjs";

// node_modules/@stablelib/base64/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/@stablelib/base64/lib/base64.js"(exports) {
    "use strict";
    init_esm();
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var INVALID_BYTE = 256;
    var Coder = (
      /** @class */
      function() {
        function Coder2(_paddingCharacter) {
          if (_paddingCharacter === void 0) {
            _paddingCharacter = "=";
          }
          this._paddingCharacter = _paddingCharacter;
        }
        __name(Coder2, "Coder");
        Coder2.prototype.encodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
          }
          return (length + 2) / 3 * 4 | 0;
        };
        Coder2.prototype.encode = function(data) {
          var out = "";
          var i = 0;
          for (; i < data.length - 2; i += 3) {
            var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            out += this._encodeByte(c >>> 1 * 6 & 63);
            out += this._encodeByte(c >>> 0 * 6 & 63);
          }
          var left = data.length - i;
          if (left > 0) {
            var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            if (left === 2) {
              out += this._encodeByte(c >>> 1 * 6 & 63);
            } else {
              out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
          }
          return out;
        };
        Coder2.prototype.maxDecodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
          }
          return length / 4 * 3 | 0;
        };
        Coder2.prototype.decodedLength = function(s) {
          return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder2.prototype.decode = function(s) {
          if (s.length === 0) {
            return new Uint8Array(0);
          }
          var paddingLength = this._getPaddingLength(s);
          var length = s.length - paddingLength;
          var out = new Uint8Array(this.maxDecodedLength(length));
          var op = 0;
          var i = 0;
          var haveBad = 0;
          var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
          for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v0 << 2 | v1 >>> 4;
            out[op++] = v1 << 4 | v2 >>> 2;
            out[op++] = v2 << 6 | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = v0 << 2 | v1 >>> 4;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
          }
          if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = v1 << 4 | v2 >>> 2;
            haveBad |= v2 & INVALID_BYTE;
          }
          if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v2 << 6 | v3;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
          }
          return out;
        };
        Coder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
          result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
          return String.fromCharCode(result);
        };
        Coder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
          result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        Coder2.prototype._getPaddingLength = function(s) {
          var paddingLength = 0;
          if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
              if (s[i] !== this._paddingCharacter) {
                break;
              }
              paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
              throw new Error("Base64Coder: incorrect padding");
            }
          }
          return paddingLength;
        };
        return Coder2;
      }()
    );
    exports.Coder = Coder;
    var stdCoder = new Coder();
    function encode2(data) {
      return stdCoder.encode(data);
    }
    __name(encode2, "encode");
    exports.encode = encode2;
    function decode(s) {
      return stdCoder.decode(s);
    }
    __name(decode, "decode");
    exports.decode = decode;
    var URLSafeCoder = (
      /** @class */
      function(_super) {
        __extends(URLSafeCoder2, _super);
        function URLSafeCoder2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        __name(URLSafeCoder2, "URLSafeCoder");
        URLSafeCoder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
          result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
          return String.fromCharCode(result);
        };
        URLSafeCoder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
          result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        return URLSafeCoder2;
      }(Coder)
    );
    exports.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
      return urlSafeCoder.encode(data);
    }
    __name(encodeURLSafe, "encodeURLSafe");
    exports.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
      return urlSafeCoder.decode(s);
    }
    __name(decodeURLSafe, "decodeURLSafe");
    exports.decodeURLSafe = decodeURLSafe;
    exports.encodedLength = function(length) {
      return stdCoder.encodedLength(length);
    };
    exports.maxDecodedLength = function(length) {
      return stdCoder.maxDecodedLength(length);
    };
    exports.decodedLength = function(s) {
      return stdCoder.decodedLength(s);
    };
  }
});

// node_modules/fast-sha256/sha256.js
var require_sha256 = __commonJS({
  "node_modules/fast-sha256/sha256.js"(exports, module) {
    init_esm();
    (function(root, factory) {
      var exports2 = {};
      factory(exports2);
      var sha2562 = exports2["default"];
      for (var k in exports2) {
        sha2562[k] = exports2[k];
      }
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = sha2562;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return sha2562;
        });
      } else {
        root.sha256 = sha2562;
      }
    })(exports, function(exports2) {
      "use strict";
      exports2.__esModule = true;
      exports2.digestLength = 32;
      exports2.blockSize = 64;
      var K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function hashBlocks(w, v, p, pos, len) {
        var a, b, c, d, e, f, g2, h, u, i, j, t1, t2;
        while (len >= 64) {
          a = v[0];
          b = v[1];
          c = v[2];
          d = v[3];
          e = v[4];
          f = v[5];
          g2 = v[6];
          h = v[7];
          for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
          }
          for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
            u = w[i - 15];
            t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
          }
          for (i = 0; i < 64; i++) {
            t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g2) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
            h = g2;
            g2 = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          v[0] += a;
          v[1] += b;
          v[2] += c;
          v[3] += d;
          v[4] += e;
          v[5] += f;
          v[6] += g2;
          v[7] += h;
          pos += 64;
          len -= 64;
        }
        return pos;
      }
      __name(hashBlocks, "hashBlocks");
      var Hash = (
        /** @class */
        function() {
          function Hash2() {
            this.digestLength = exports2.digestLength;
            this.blockSize = exports2.blockSize;
            this.state = new Int32Array(8);
            this.temp = new Int32Array(64);
            this.buffer = new Uint8Array(128);
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            this.reset();
          }
          __name(Hash2, "Hash");
          Hash2.prototype.reset = function() {
            this.state[0] = 1779033703;
            this.state[1] = 3144134277;
            this.state[2] = 1013904242;
            this.state[3] = 2773480762;
            this.state[4] = 1359893119;
            this.state[5] = 2600822924;
            this.state[6] = 528734635;
            this.state[7] = 1541459225;
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            return this;
          };
          Hash2.prototype.clean = function() {
            for (var i = 0; i < this.buffer.length; i++) {
              this.buffer[i] = 0;
            }
            for (var i = 0; i < this.temp.length; i++) {
              this.temp[i] = 0;
            }
            this.reset();
          };
          Hash2.prototype.update = function(data, dataLength) {
            if (dataLength === void 0) {
              dataLength = data.length;
            }
            if (this.finished) {
              throw new Error("SHA256: can't update because hash was finished.");
            }
            var dataPos = 0;
            this.bytesHashed += dataLength;
            if (this.bufferLength > 0) {
              while (this.bufferLength < 64 && dataLength > 0) {
                this.buffer[this.bufferLength++] = data[dataPos++];
                dataLength--;
              }
              if (this.bufferLength === 64) {
                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
                this.bufferLength = 0;
              }
            }
            if (dataLength >= 64) {
              dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
              dataLength %= 64;
            }
            while (dataLength > 0) {
              this.buffer[this.bufferLength++] = data[dataPos++];
              dataLength--;
            }
            return this;
          };
          Hash2.prototype.finish = function(out) {
            if (!this.finished) {
              var bytesHashed = this.bytesHashed;
              var left = this.bufferLength;
              var bitLenHi = bytesHashed / 536870912 | 0;
              var bitLenLo = bytesHashed << 3;
              var padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this.buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) {
                this.buffer[i] = 0;
              }
              this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
              this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
              this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
              this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
              this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
              this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
              this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
              this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
              hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
              this.finished = true;
            }
            for (var i = 0; i < 8; i++) {
              out[i * 4 + 0] = this.state[i] >>> 24 & 255;
              out[i * 4 + 1] = this.state[i] >>> 16 & 255;
              out[i * 4 + 2] = this.state[i] >>> 8 & 255;
              out[i * 4 + 3] = this.state[i] >>> 0 & 255;
            }
            return this;
          };
          Hash2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          Hash2.prototype._saveState = function(out) {
            for (var i = 0; i < this.state.length; i++) {
              out[i] = this.state[i];
            }
          };
          Hash2.prototype._restoreState = function(from, bytesHashed) {
            for (var i = 0; i < this.state.length; i++) {
              this.state[i] = from[i];
            }
            this.bytesHashed = bytesHashed;
            this.finished = false;
            this.bufferLength = 0;
          };
          return Hash2;
        }()
      );
      exports2.Hash = Hash;
      var HMAC = (
        /** @class */
        function() {
          function HMAC2(key) {
            this.inner = new Hash();
            this.outer = new Hash();
            this.blockSize = this.inner.blockSize;
            this.digestLength = this.inner.digestLength;
            var pad = new Uint8Array(this.blockSize);
            if (key.length > this.blockSize) {
              new Hash().update(key).finish(pad).clean();
            } else {
              for (var i = 0; i < key.length; i++) {
                pad[i] = key[i];
              }
            }
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54;
            }
            this.inner.update(pad);
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54 ^ 92;
            }
            this.outer.update(pad);
            this.istate = new Uint32Array(8);
            this.ostate = new Uint32Array(8);
            this.inner._saveState(this.istate);
            this.outer._saveState(this.ostate);
            for (var i = 0; i < pad.length; i++) {
              pad[i] = 0;
            }
          }
          __name(HMAC2, "HMAC");
          HMAC2.prototype.reset = function() {
            this.inner._restoreState(this.istate, this.inner.blockSize);
            this.outer._restoreState(this.ostate, this.outer.blockSize);
            return this;
          };
          HMAC2.prototype.clean = function() {
            for (var i = 0; i < this.istate.length; i++) {
              this.ostate[i] = this.istate[i] = 0;
            }
            this.inner.clean();
            this.outer.clean();
          };
          HMAC2.prototype.update = function(data) {
            this.inner.update(data);
            return this;
          };
          HMAC2.prototype.finish = function(out) {
            if (this.outer.finished) {
              this.outer.finish(out);
            } else {
              this.inner.finish(out);
              this.outer.update(out, this.digestLength).finish(out);
            }
            return this;
          };
          HMAC2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          return HMAC2;
        }()
      );
      exports2.HMAC = HMAC;
      function hash(data) {
        var h = new Hash().update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      __name(hash, "hash");
      exports2.hash = hash;
      exports2["default"] = hash;
      function hmac2(key, data) {
        var h = new HMAC(key).update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      __name(hmac2, "hmac");
      exports2.hmac = hmac2;
      function fillBuffer(buffer, hmac3, info, counter) {
        var num = counter[0];
        if (num === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        hmac3.reset();
        if (num > 1) {
          hmac3.update(buffer);
        }
        if (info) {
          hmac3.update(info);
        }
        hmac3.update(counter);
        hmac3.finish(buffer);
        counter[0]++;
      }
      __name(fillBuffer, "fillBuffer");
      var hkdfSalt = new Uint8Array(exports2.digestLength);
      function hkdf(key, salt, info, length) {
        if (salt === void 0) {
          salt = hkdfSalt;
        }
        if (length === void 0) {
          length = 32;
        }
        var counter = new Uint8Array([1]);
        var okm = hmac2(salt, key);
        var hmac_ = new HMAC(okm);
        var buffer = new Uint8Array(hmac_.digestLength);
        var bufpos = buffer.length;
        var out = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
          if (bufpos === buffer.length) {
            fillBuffer(buffer, hmac_, info, counter);
            bufpos = 0;
          }
          out[i] = buffer[bufpos++];
        }
        hmac_.clean();
        buffer.fill(0);
        counter.fill(0);
        return out;
      }
      __name(hkdf, "hkdf");
      exports2.hkdf = hkdf;
      function pbkdf2(password, salt, iterations, dkLen) {
        var prf = new HMAC(password);
        var len = prf.digestLength;
        var ctr = new Uint8Array(4);
        var t = new Uint8Array(len);
        var u = new Uint8Array(len);
        var dk = new Uint8Array(dkLen);
        for (var i = 0; i * len < dkLen; i++) {
          var c = i + 1;
          ctr[0] = c >>> 24 & 255;
          ctr[1] = c >>> 16 & 255;
          ctr[2] = c >>> 8 & 255;
          ctr[3] = c >>> 0 & 255;
          prf.reset();
          prf.update(salt);
          prf.update(ctr);
          prf.finish(u);
          for (var j = 0; j < len; j++) {
            t[j] = u[j];
          }
          for (var j = 2; j <= iterations; j++) {
            prf.reset();
            prf.update(u).finish(u);
            for (var k = 0; k < len; k++) {
              t[k] ^= u[k];
            }
          }
          for (var j = 0; j < len && i * len + j < dkLen; j++) {
            dk[i * len + j] = t[j];
          }
        }
        for (var i = 0; i < len; i++) {
          t[i] = u[i] = 0;
        }
        for (var i = 0; i < 4; i++) {
          ctr[i] = 0;
        }
        prf.clean();
        return dk;
      }
      __name(pbkdf2, "pbkdf2");
      exports2.pbkdf2 = pbkdf2;
    });
  }
});

// node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/ws/lib/constants.js"(exports, module) {
    "use strict";
    init_esm();
    var BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"];
    var hasBlob = typeof Blob !== "undefined";
    if (hasBlob) BINARY_TYPES.push("blob");
    module.exports = {
      BINARY_TYPES,
      CLOSE_TIMEOUT: 3e4,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob,
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: /* @__PURE__ */ __name(() => {
      }, "NOOP")
    };
  }
});

// node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/ws/lib/buffer-util.js"(exports, module) {
    "use strict";
    init_esm();
    var { EMPTY_BUFFER } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    function concat(list2, totalLength) {
      if (list2.length === 0) return EMPTY_BUFFER;
      if (list2.length === 1) return list2[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list2.length; i++) {
        const buf = list2[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength) {
        return new FastBuffer(target.buffer, target.byteOffset, offset);
      }
      return target;
    }
    __name(concat, "concat");
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    __name(_mask, "_mask");
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    __name(_unmask, "_unmask");
    function toArrayBuffer(buf) {
      if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    __name(toArrayBuffer, "toArrayBuffer");
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data)) return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = new FastBuffer(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    __name(toBuffer, "toBuffer");
    module.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = __require("bufferutil");
        module.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48) _mask(source, mask, output, offset, length);
          else bufferUtil.mask(source, mask, output, offset, length);
        };
        module.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32) _unmask(buffer, mask);
          else bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/ws/lib/limiter.js"(exports, module) {
    "use strict";
    init_esm();
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      static {
        __name(this, "Limiter");
      }
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency) return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module.exports = Limiter;
  }
});

// node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/ws/lib/permessage-deflate.js"(exports, module) {
    "use strict";
    init_esm();
    var zlib = __require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate2 = class {
      static {
        __name(this, "PerMessageDeflate");
      }
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {Boolean} [options.isServer=false] Create the instance in either
       *     server or client mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       */
      constructor(options2) {
        this._options = options2 || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._maxPayload = this._options.maxPayload | 0;
        this._isServer = !!this._options.isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin) this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module.exports = PerMessageDeflate2;
    function deflateOnData(chunk2) {
      this[kBuffers].push(chunk2);
      this[kTotalLength] += chunk2.length;
    }
    __name(deflateOnData, "deflateOnData");
    function inflateOnData(chunk2) {
      this[kTotalLength] += chunk2.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk2);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    __name(inflateOnData, "inflateOnData");
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      if (this[kError]) {
        this[kCallback](this[kError]);
        return;
      }
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
    __name(inflateOnError, "inflateOnError");
  }
});

// node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/ws/lib/validation.js"(exports, module) {
    "use strict";
    init_esm();
    var { isUtf8 } = __require("buffer");
    var { hasBlob } = require_constants();
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    __name(isValidStatusCode, "isValidStatusCode");
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    __name(_isValidUTF8, "_isValidUTF8");
    function isBlob(value) {
      return hasBlob && typeof value === "object" && typeof value.arrayBuffer === "function" && typeof value.type === "string" && typeof value.stream === "function" && (value[Symbol.toStringTag] === "Blob" || value[Symbol.toStringTag] === "File");
    }
    __name(isBlob, "isBlob");
    module.exports = {
      isBlob,
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8) {
      module.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = __require("utf-8-validate");
        module.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/ws/lib/receiver.js"(exports, module) {
    "use strict";
    init_esm();
    var { Writable } = __require("stream");
    var PerMessageDeflate2 = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var FastBuffer = Buffer[Symbol.species];
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var DEFER_EVENT = 6;
    var Receiver2 = class extends Writable {
      static {
        __name(this, "Receiver");
      }
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options2 = {}) {
        super();
        this._allowSynchronousEvents = options2.allowSynchronousEvents !== void 0 ? options2.allowSynchronousEvents : true;
        this._binaryType = options2.binaryType || BINARY_TYPES[0];
        this._extensions = options2.extensions || {};
        this._isServer = !!options2.isServer;
        this._maxPayload = options2.maxPayload | 0;
        this._skipUTF8Validation = !!options2.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._errored = false;
        this._loop = false;
        this._state = GET_INFO;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk2, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO) return cb();
        this._bufferedBytes += chunk2.length;
        this._buffers.push(chunk2);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length) return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              this.getInfo(cb);
              break;
            case GET_PAYLOAD_LENGTH_16:
              this.getPayloadLength16(cb);
              break;
            case GET_PAYLOAD_LENGTH_64:
              this.getPayloadLength64(cb);
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              this.getData(cb);
              break;
            case INFLATING:
            case DEFER_EVENT:
              this._loop = false;
              return;
          }
        } while (this._loop);
        if (!this._errored) cb();
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @param {Function} cb Callback
       * @private
       */
      getInfo(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          const error3 = this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
          cb(error3);
          return;
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate2.extensionName]) {
          const error3 = this.createError(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          cb(error3);
          return;
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            const error3 = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error3);
            return;
          }
          if (!this._fragmented) {
            const error3 = this.createError(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error3);
            return;
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            const error3 = this.createError(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error3);
            return;
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            const error3 = this.createError(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
            cb(error3);
            return;
          }
          if (compressed) {
            const error3 = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error3);
            return;
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            const error3 = this.createError(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
            cb(error3);
            return;
          }
        } else {
          const error3 = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          cb(error3);
          return;
        }
        if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            const error3 = this.createError(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
            cb(error3);
            return;
          }
        } else if (this._masked) {
          const error3 = this.createError(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
          cb(error3);
          return;
        }
        if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
        else this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength16(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength64(cb) {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          const error3 = this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
          cb(error3);
          return;
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        this.haveLength(cb);
      }
      /**
       * Payload length has been read.
       *
       * @param {Function} cb Callback
       * @private
       */
      haveLength(cb) {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            const error3 = this.createError(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            cb(error3);
            return;
          }
        }
        if (this._masked) this._state = GET_MASK;
        else this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7) {
          this.controlMessage(data, cb);
          return;
        }
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        this.dataMessage(cb);
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err) return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              const error3 = this.createError(
                RangeError,
                "Max payload size exceeded",
                false,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
              cb(error3);
              return;
            }
            this._fragments.push(buf);
          }
          this.dataMessage(cb);
          if (this._state === GET_INFO) this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @param {Function} cb Callback
       * @private
       */
      dataMessage(cb) {
        if (!this._fin) {
          this._state = GET_INFO;
          return;
        }
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];
        if (this._opcode === 2) {
          let data;
          if (this._binaryType === "nodebuffer") {
            data = concat(fragments, messageLength);
          } else if (this._binaryType === "arraybuffer") {
            data = toArrayBuffer(concat(fragments, messageLength));
          } else if (this._binaryType === "blob") {
            data = new Blob(fragments);
          } else {
            data = fragments;
          }
          if (this._allowSynchronousEvents) {
            this.emit("message", data, true);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", data, true);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        } else {
          const buf = concat(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            const error3 = this.createError(
              Error,
              "invalid UTF-8 sequence",
              true,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            cb(error3);
            return;
          }
          if (this._state === INFLATING || this._allowSynchronousEvents) {
            this.emit("message", buf, false);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", buf, false);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        }
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data, cb) {
        if (this._opcode === 8) {
          if (data.length === 0) {
            this._loop = false;
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              const error3 = this.createError(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
              cb(error3);
              return;
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              const error3 = this.createError(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
              cb(error3);
              return;
            }
            this._loop = false;
            this.emit("conclude", code, buf);
            this.end();
          }
          this._state = GET_INFO;
          return;
        }
        if (this._allowSynchronousEvents) {
          this.emit(this._opcode === 9 ? "ping" : "pong", data);
          this._state = GET_INFO;
        } else {
          this._state = DEFER_EVENT;
          setImmediate(() => {
            this.emit(this._opcode === 9 ? "ping" : "pong", data);
            this._state = GET_INFO;
            this.startLoop(cb);
          });
        }
      }
      /**
       * Builds an error object.
       *
       * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
       * @param {String} message The error message
       * @param {Boolean} prefix Specifies whether or not to add a default prefix to
       *     `message`
       * @param {Number} statusCode The status code
       * @param {String} errorCode The exposed error code
       * @return {(Error|RangeError)} The error
       * @private
       */
      createError(ErrorCtor, message, prefix, statusCode, errorCode) {
        this._loop = false;
        this._errored = true;
        const err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        Error.captureStackTrace(err, this.createError);
        err.code = errorCode;
        err[kStatusCode] = statusCode;
        return err;
      }
    };
    module.exports = Receiver2;
  }
});

// node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/ws/lib/sender.js"(exports, module) {
    "use strict";
    init_esm();
    var { Duplex } = __require("stream");
    var { randomFillSync } = __require("crypto");
    var {
      types: { isUint8Array }
    } = __require("util");
    var PerMessageDeflate2 = require_permessage_deflate();
    var { EMPTY_BUFFER, kWebSocket, NOOP } = require_constants();
    var { isBlob, isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var RANDOM_POOL_SIZE = 8 * 1024;
    var randomPool;
    var randomPoolPointer = RANDOM_POOL_SIZE;
    var DEFAULT = 0;
    var DEFLATING = 1;
    var GET_BLOB_DATA = 2;
    var Sender2 = class _Sender {
      static {
        __name(this, "Sender");
      }
      /**
       * Creates a Sender instance.
       *
       * @param {Duplex} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._queue = [];
        this._state = DEFAULT;
        this.onerror = NOOP;
        this[kWebSocket] = void 0;
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options2) {
        let mask;
        let merge2 = false;
        let offset = 2;
        let skipMasking = false;
        if (options2.mask) {
          mask = options2.maskBuffer || maskBuffer;
          if (options2.generateMask) {
            options2.generateMask(mask);
          } else {
            if (randomPoolPointer === RANDOM_POOL_SIZE) {
              if (randomPool === void 0) {
                randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
              }
              randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
              randomPoolPointer = 0;
            }
            mask[0] = randomPool[randomPoolPointer++];
            mask[1] = randomPool[randomPoolPointer++];
            mask[2] = randomPool[randomPoolPointer++];
            mask[3] = randomPool[randomPoolPointer++];
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options2.mask || skipMasking) && options2[kByteLength] !== void 0) {
            dataLength = options2[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge2 = options2.mask && options2.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge2 ? dataLength + offset : offset);
        target[0] = options2.fin ? options2.opcode | 128 : options2.opcode;
        if (options2.rsv1) target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options2.mask) return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking) return [target, data];
        if (merge2) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else if (isUint8Array(data)) {
            buf.set(data, 2);
          } else {
            throw new TypeError("Second argument must be a string or a Uint8Array");
          }
        }
        const options2 = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, buf, false, options2, cb]);
        } else {
          this.sendFrame(_Sender.frame(buf, options2), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options2 = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options2, cb]);
          } else {
            this.getBlobData(data, false, options2, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options2, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options2), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options2 = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options2, cb]);
          } else {
            this.getBlobData(data, false, options2, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options2, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options2), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options2, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        let opcode = options2.binary ? 2 : 1;
        let rsv1 = options2.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options2.fin) this._firstFragment = true;
        const opts = {
          [kByteLength]: byteLength,
          fin: options2.fin,
          generateMask: this._generateMask,
          mask: options2.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
          } else {
            this.getBlobData(data, this._compress, opts, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      }
      /**
       * Gets the contents of a blob as binary data.
       *
       * @param {Blob} blob The blob
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     the data
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      getBlobData(blob, compress, options2, cb) {
        this._bufferedBytes += options2[kByteLength];
        this._state = GET_BLOB_DATA;
        blob.arrayBuffer().then((arrayBuffer) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while the blob was being read"
            );
            process.nextTick(callCallbacks, this, err, cb);
            return;
          }
          this._bufferedBytes -= options2[kByteLength];
          const data = toBuffer(arrayBuffer);
          if (!compress) {
            this._state = DEFAULT;
            this.sendFrame(_Sender.frame(data, options2), cb);
            this.dequeue();
          } else {
            this.dispatch(data, compress, options2, cb);
          }
        }).catch((err) => {
          process.nextTick(onError, this, err, cb);
        });
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options2, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options2), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        this._bufferedBytes += options2[kByteLength];
        this._state = DEFLATING;
        perMessageDeflate.compress(data, options2.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            callCallbacks(this, err, cb);
            return;
          }
          this._bufferedBytes -= options2[kByteLength];
          this._state = DEFAULT;
          options2.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options2), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (this._state === DEFAULT && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {(Buffer | String)[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list2, cb) {
        if (list2.length === 2) {
          this._socket.cork();
          this._socket.write(list2[0]);
          this._socket.write(list2[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list2[0], cb);
        }
      }
    };
    module.exports = Sender2;
    function callCallbacks(sender, err, cb) {
      if (typeof cb === "function") cb(err);
      for (let i = 0; i < sender._queue.length; i++) {
        const params = sender._queue[i];
        const callback = params[params.length - 1];
        if (typeof callback === "function") callback(err);
      }
    }
    __name(callCallbacks, "callCallbacks");
    function onError(sender, err, cb) {
      callCallbacks(sender, err, cb);
      sender.onerror(err);
    }
    __name(onError, "onError");
  }
});

// node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/ws/lib/event-target.js"(exports, module) {
    "use strict";
    init_esm();
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = Symbol("kCode");
    var kData = Symbol("kData");
    var kError = Symbol("kError");
    var kMessage = Symbol("kMessage");
    var kReason = Symbol("kReason");
    var kTarget = Symbol("kTarget");
    var kType = Symbol("kType");
    var kWasClean = Symbol("kWasClean");
    var Event = class {
      static {
        __name(this, "Event");
      }
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      static {
        __name(this, "CloseEvent");
      }
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options2 = {}) {
        super(type);
        this[kCode] = options2.code === void 0 ? 0 : options2.code;
        this[kReason] = options2.reason === void 0 ? "" : options2.reason;
        this[kWasClean] = options2.wasClean === void 0 ? false : options2.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      static {
        __name(this, "ErrorEvent");
      }
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options2 = {}) {
        super(type);
        this[kError] = options2.error === void 0 ? null : options2.error;
        this[kMessage] = options2.message === void 0 ? "" : options2.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent2 = class extends Event {
      static {
        __name(this, "MessageEvent");
      }
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options2 = {}) {
        super(type);
        this[kData] = options2.data === void 0 ? null : options2.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent2.prototype, "data", { enumerable: true });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options2 = {}) {
        for (const listener of this.listeners(type)) {
          if (!options2[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = /* @__PURE__ */ __name(function onMessage(data, isBinary) {
            const event = new MessageEvent2("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          }, "onMessage");
        } else if (type === "close") {
          wrapper = /* @__PURE__ */ __name(function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          }, "onClose");
        } else if (type === "error") {
          wrapper = /* @__PURE__ */ __name(function onError(error3) {
            const event = new ErrorEvent("error", {
              error: error3,
              message: error3.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          }, "onError");
        } else if (type === "open") {
          wrapper = /* @__PURE__ */ __name(function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          }, "onOpen");
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options2[kForOnEventAttribute];
        wrapper[kListener] = handler;
        if (options2.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent: MessageEvent2
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
    __name(callListener, "callListener");
  }
});

// node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/ws/lib/extension.js"(exports, module) {
    "use strict";
    init_esm();
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0) dest[name] = [elem];
      else dest[name].push(elem);
    }
    __name(push, "push");
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1) start = i;
            else if (!mustUnescape) mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1) start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1) end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    __name(parse, "parse");
    function format(extensions) {
      return Object.keys(extensions).map((extension2) => {
        let configurations = extensions[extension2];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations.map((params) => {
          return [extension2].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values)) values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    __name(format, "format");
    module.exports = { format, parse };
  }
});

// node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/ws/lib/websocket.js"(exports, module) {
    "use strict";
    init_esm();
    var EventEmitter = __require("events");
    var https = __require("https");
    var http = __require("http");
    var net = __require("net");
    var tls = __require("tls");
    var { randomBytes, createHash } = __require("crypto");
    var { Duplex, Readable } = __require("stream");
    var { URL: URL2 } = __require("url");
    var PerMessageDeflate2 = require_permessage_deflate();
    var Receiver2 = require_receiver();
    var Sender2 = require_sender();
    var { isBlob } = require_validation();
    var {
      BINARY_TYPES,
      CLOSE_TIMEOUT,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var kAborted = Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket3 = class _WebSocket extends EventEmitter {
      static {
        __name(this, "WebSocket");
      }
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options2) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._errorEmitted = false;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options2 = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options2);
        } else {
          this._autoPong = options2.autoPong;
          this._closeTimeout = options2.closeTimeout;
          this._isServer = true;
        }
      }
      /**
       * For historical reasons, the custom "nodebuffer" type is used by the default
       * instead of "blob".
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type)) return;
        this._binaryType = type;
        if (this._receiver) this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket) return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options2) {
        const receiver = new Receiver2({
          allowSynchronousEvents: options2.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options2.maxPayload,
          skipUTF8Validation: options2.skipUTF8Validation
        });
        const sender = new Sender2(socket, this._extensions, options2.generateMask);
        this._receiver = receiver;
        this._sender = sender;
        this._socket = socket;
        receiver[kWebSocket] = this;
        sender[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        sender.onerror = senderOnError;
        if (socket.setTimeout) socket.setTimeout(0);
        if (socket.setNoDelay) socket.setNoDelay();
        if (head.length > 0) socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate2.extensionName]) {
          this._extensions[PerMessageDeflate2.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = _WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err) return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        setCloseTimer(this);
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain) this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options2, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options2 === "function") {
          cb = options2;
          options2 = {};
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options2
        };
        if (!this._extensions[PerMessageDeflate2.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket3, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket3.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket3, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket3.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket3, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket3.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket3, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket3.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket3.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket3.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function") return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket3.prototype.addEventListener = addEventListener;
    WebSocket3.prototype.removeEventListener = removeEventListener;
    module.exports = WebSocket3;
    function initAsClient(websocket, address, protocols, options2) {
      const opts = {
        allowSynchronousEvents: true,
        autoPong: true,
        closeTimeout: CLOSE_TIMEOUT,
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options2,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      websocket._autoPong = opts.autoPong;
      websocket._closeTimeout = opts.closeTimeout;
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL2) {
        parsedUrl = address;
      } else {
        try {
          parsedUrl = new URL2(address);
        } catch {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      }
      if (parsedUrl.protocol === "http:") {
        parsedUrl.protocol = "ws:";
      } else if (parsedUrl.protocol === "https:") {
        parsedUrl.protocol = "wss:";
      }
      websocket._url = parsedUrl.href;
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = opts.createConnection || (isSecure ? tlsConnect : netConnect);
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate2({
          ...opts.perMessageDeflate,
          isServer: false,
          maxPayload: opts.maxPayload
        });
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate2.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options2 && options2.headers;
          options2 = { ...options2, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options2.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost) delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options2.headers.authorization) {
          options2.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted]) return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL2(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options2);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket3.CONNECTING) return;
        req = websocket._req = null;
        const upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt) websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate2.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate2.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          allowSynchronousEvents: opts.allowSynchronousEvents,
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      if (opts.finishRequest) {
        opts.finishRequest(req, websocket);
      } else {
        req.end();
      }
    }
    __name(initAsClient, "initAsClient");
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket3.CLOSING;
      websocket._errorEmitted = true;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    __name(emitErrorAndClose, "emitErrorAndClose");
    function netConnect(options2) {
      options2.path = options2.socketPath;
      return net.connect(options2);
    }
    __name(netConnect, "netConnect");
    function tlsConnect(options2) {
      options2.path = void 0;
      if (!options2.servername && options2.servername !== "") {
        options2.servername = net.isIP(options2.host) ? "" : options2.host;
      }
      return tls.connect(options2);
    }
    __name(tlsConnect, "tlsConnect");
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket3.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    __name(abortHandshake, "abortHandshake");
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = isBlob(data) ? data.size : toBuffer(data).length;
        if (websocket._socket) websocket._sender._bufferedBytes += length;
        else websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    __name(sendAfterClose, "sendAfterClose");
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0) return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005) websocket.close();
      else websocket.close(code, reason);
    }
    __name(receiverOnConclude, "receiverOnConclude");
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused) websocket._socket.resume();
    }
    __name(receiverOnDrain, "receiverOnDrain");
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    __name(receiverOnError, "receiverOnError");
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    __name(receiverOnFinish, "receiverOnFinish");
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    __name(receiverOnMessage, "receiverOnMessage");
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
      websocket.emit("ping", data);
    }
    __name(receiverOnPing, "receiverOnPing");
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    __name(receiverOnPong, "receiverOnPong");
    function resume(stream) {
      stream.resume();
    }
    __name(resume, "resume");
    function senderOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket.readyState === WebSocket3.CLOSED) return;
      if (websocket.readyState === WebSocket3.OPEN) {
        websocket._readyState = WebSocket3.CLOSING;
        setCloseTimer(websocket);
      }
      this._socket.end();
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    __name(senderOnError, "senderOnError");
    function setCloseTimer(websocket) {
      websocket._closeTimer = setTimeout(
        websocket._socket.destroy.bind(websocket._socket),
        websocket._closeTimeout
      );
    }
    __name(setCloseTimer, "setCloseTimer");
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket3.CLOSING;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && this._readableState.length !== 0) {
        const chunk2 = this.read(this._readableState.length);
        websocket._receiver.write(chunk2);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    __name(socketOnClose, "socketOnClose");
    function socketOnData(chunk2) {
      if (!this[kWebSocket]._receiver.write(chunk2)) {
        this.pause();
      }
    }
    __name(socketOnData, "socketOnData");
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket3.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    __name(socketOnEnd, "socketOnEnd");
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket3.CLOSING;
        this.destroy();
      }
    }
    __name(socketOnError, "socketOnError");
  }
});

// node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/ws/lib/stream.js"(exports, module) {
    "use strict";
    init_esm();
    var WebSocket3 = require_websocket();
    var { Duplex } = __require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    __name(emitClose, "emitClose");
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    __name(duplexOnEnd, "duplexOnEnd");
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    __name(duplexOnError, "duplexOnError");
    function createWebSocketStream2(ws, options2) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options2,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", /* @__PURE__ */ __name(function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data)) ws.pause();
      }, "message"));
      ws.once("error", /* @__PURE__ */ __name(function error3(err) {
        if (duplex.destroyed) return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      }, "error"));
      ws.once("close", /* @__PURE__ */ __name(function close() {
        if (duplex.destroyed) return;
        duplex.push(null);
      }, "close"));
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", /* @__PURE__ */ __name(function error3(err2) {
          called = true;
          callback(err2);
        }, "error"));
        ws.once("close", /* @__PURE__ */ __name(function close() {
          if (!called) callback(err);
          process.nextTick(emitClose, duplex);
        }, "close"));
        if (terminateOnDestroy) ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", /* @__PURE__ */ __name(function open() {
            duplex._final(callback);
          }, "open"));
          return;
        }
        if (ws._socket === null) return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted) duplex.destroy();
        } else {
          ws._socket.once("finish", /* @__PURE__ */ __name(function finish() {
            callback();
          }, "finish"));
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused) ws.resume();
      };
      duplex._write = function(chunk2, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", /* @__PURE__ */ __name(function open() {
            duplex._write(chunk2, encoding, callback);
          }, "open"));
          return;
        }
        ws.send(chunk2, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    __name(createWebSocketStream2, "createWebSocketStream");
    module.exports = createWebSocketStream2;
  }
});

// node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "node_modules/ws/lib/subprotocol.js"(exports, module) {
    "use strict";
    init_esm();
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1) end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    __name(parse, "parse");
    module.exports = { parse };
  }
});

// node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/ws/lib/websocket-server.js"(exports, module) {
    "use strict";
    init_esm();
    var EventEmitter = __require("events");
    var http = __require("http");
    var { Duplex } = __require("stream");
    var { createHash } = __require("crypto");
    var extension2 = require_extension();
    var PerMessageDeflate2 = require_permessage_deflate();
    var subprotocol2 = require_subprotocol();
    var WebSocket3 = require_websocket();
    var { CLOSE_TIMEOUT, GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer2 = class extends EventEmitter {
      static {
        __name(this, "WebSocketServer");
      }
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Boolean} [options.autoPong=true] Specifies whether or not to
       *     automatically send a pong in response to a ping
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to
       *     wait for the closing handshake to finish after `websocket.close()` is
       *     called
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options2, callback) {
        super();
        options2 = {
          allowSynchronousEvents: true,
          autoPong: true,
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          closeTimeout: CLOSE_TIMEOUT,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket3,
          ...options2
        };
        if (options2.port == null && !options2.server && !options2.noServer || options2.port != null && (options2.server || options2.noServer) || options2.server && options2.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options2.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options2.port,
            options2.host,
            options2.backlog,
            callback
          );
        } else if (options2.server) {
          this._server = options2.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: /* @__PURE__ */ __name((req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }, "upgrade")
          });
        }
        if (options2.perMessageDeflate === true) options2.perMessageDeflate = {};
        if (options2.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options2;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server) return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb) this.once("close", cb);
        if (this._state === CLOSING) return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path) return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const upgrade = req.headers.upgrade;
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (key === void 0 || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 13 && version !== 8) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
            "Sec-WebSocket-Version": "13, 8"
          });
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol2.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate2({
            ...this.options.perMessageDeflate,
            isServer: true,
            maxPayload: this.options.maxPayload
          });
          try {
            const offers = extension2.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate2.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate2.extensionName]);
              extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable) return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING) return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null, void 0, this.options);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate2.extensionName]) {
          const params = extensions[PerMessageDeflate2.extensionName].params;
          const value = extension2.format({
            [PerMessageDeflate2.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module.exports = WebSocketServer2;
    function addListeners(server, map) {
      for (const event of Object.keys(map)) server.on(event, map[event]);
      return /* @__PURE__ */ __name(function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      }, "removeListeners");
    }
    __name(addListeners, "addListeners");
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    __name(emitClose, "emitClose");
    function socketOnError() {
      this.destroy();
    }
    __name(socketOnError, "socketOnError");
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    __name(abortHandshake, "abortHandshake");
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message, headers) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message, headers);
      }
    }
    __name(abortHandshakeOrEmitwsClientError, "abortHandshakeOrEmitwsClientError");
  }
});

// trigger/design-agent.ts
init_esm();

// lib/liveblocks.ts
init_esm();

// node_modules/@liveblocks/node/dist/index.js
init_esm();

// node_modules/@liveblocks/core/dist/index.js
init_esm();
var __defProp = Object.defineProperty;
var __export = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
}, "__export");
var PKG_NAME = "@liveblocks/core";
var PKG_VERSION = "3.19.0";
var PKG_FORMAT = "esm";
var g = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
var crossLinkedDocs = "https://liveblocks.io/docs/errors/cross-linked";
var dupesDocs = "https://liveblocks.io/docs/errors/dupes";
var SPACE = " ";
function error(msg) {
  if (process.env.NODE_ENV === "production") {
    console.error(msg);
  } else {
    throw new Error(msg);
  }
}
__name(error, "error");
function detectDupes(pkgName, pkgVersion, pkgFormat) {
  const pkgId = Symbol.for(pkgName);
  const pkgBuildInfo = pkgFormat ? `${pkgVersion || "dev"} (${pkgFormat})` : pkgVersion || "dev";
  if (!g[pkgId]) {
    g[pkgId] = pkgBuildInfo;
  } else if (g[pkgId] === pkgBuildInfo) {
  } else {
    const msg = [
      `Multiple copies of Liveblocks are being loaded in your project. This will cause issues! See ${dupesDocs + SPACE}`,
      "",
      "Conflicts:",
      `- ${pkgName} ${g[pkgId]} (already loaded)`,
      `- ${pkgName} ${pkgBuildInfo} (trying to load this now)`
    ].join("\n");
    error(msg);
  }
  if (pkgVersion && PKG_VERSION && pkgVersion !== PKG_VERSION) {
    error(
      [
        `Cross-linked versions of Liveblocks found, which will cause issues! See ${crossLinkedDocs + SPACE}`,
        "",
        "Conflicts:",
        `- ${PKG_NAME} is at ${PKG_VERSION}`,
        `- ${pkgName} is at ${pkgVersion}`,
        "",
        "Always upgrade all Liveblocks packages to the same version number."
      ].join("\n")
    );
  }
}
__name(detectDupes, "detectDupes");
function makeEventSource() {
  const _observers = /* @__PURE__ */ new Set();
  function subscribe(callback) {
    _observers.add(callback);
    return () => _observers.delete(callback);
  }
  __name(subscribe, "subscribe");
  function subscribeOnce(callback) {
    const unsub = subscribe((event) => {
      unsub();
      return callback(event);
    });
    return unsub;
  }
  __name(subscribeOnce, "subscribeOnce");
  async function waitUntil(predicate) {
    let unsub;
    return new Promise((res) => {
      unsub = subscribe((event) => {
        if (predicate === void 0 || predicate(event)) {
          res(event);
        }
      });
    }).finally(() => unsub?.());
  }
  __name(waitUntil, "waitUntil");
  function notify(event) {
    let called = false;
    for (const callback of _observers) {
      callback(event);
      called = true;
    }
    return called;
  }
  __name(notify, "notify");
  function count() {
    return _observers.size;
  }
  __name(count, "count");
  return {
    // Private/internal control over event emission
    notify,
    subscribe,
    subscribeOnce,
    count,
    waitUntil,
    dispose() {
      _observers.clear();
    },
    // Publicly exposable subscription API
    observable: {
      subscribe,
      subscribeOnce,
      waitUntil
    }
  };
}
__name(makeEventSource, "makeEventSource");
function makeBufferableEventSource() {
  const eventSource2 = makeEventSource();
  let _buffer = null;
  function pause() {
    _buffer = [];
  }
  __name(pause, "pause");
  function unpause() {
    if (_buffer === null) {
      return;
    }
    for (const event of _buffer) {
      eventSource2.notify(event);
    }
    _buffer = null;
  }
  __name(unpause, "unpause");
  function notifyOrBuffer(event) {
    if (_buffer !== null) {
      _buffer.push(event);
      return false;
    } else {
      return eventSource2.notify(event);
    }
  }
  __name(notifyOrBuffer, "notifyOrBuffer");
  return {
    ...eventSource2,
    notify: notifyOrBuffer,
    pause,
    unpause,
    dispose() {
      eventSource2.dispose();
      if (_buffer !== null) {
        _buffer.length = 0;
      }
    }
  };
}
__name(makeBufferableEventSource, "makeBufferableEventSource");
var freeze = process.env.NODE_ENV === "production" ? (
  /* istanbul ignore next */
  (x) => x
) : Object.freeze;
function raise(msg) {
  throw new Error(msg);
}
__name(raise, "raise");
function entries(obj) {
  return Object.entries(obj);
}
__name(entries, "entries");
function create(obj, descriptors) {
  if (typeof descriptors !== "undefined") {
    return Object.create(obj, descriptors);
  }
  return Object.create(obj);
}
__name(create, "create");
function tryParseJson(rawMessage) {
  try {
    return JSON.parse(rawMessage);
  } catch {
    return void 0;
  }
}
__name(tryParseJson, "tryParseJson");
function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}
__name(deepClone, "deepClone");
function b64decode(b64value) {
  try {
    const formattedValue = b64value.replace(/-/g, "+").replace(/_/g, "/");
    const decodedValue = decodeURIComponent(
      atob(formattedValue).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join("")
    );
    return decodedValue;
  } catch {
    return atob(b64value);
  }
}
__name(b64decode, "b64decode");
function compact(items) {
  return items.filter(
    (item) => item !== null && item !== void 0
  );
}
__name(compact, "compact");
function compactObject(obj) {
  const newObj = { ...obj };
  Object.keys(obj).forEach((k) => {
    const key = k;
    if (newObj[key] === void 0) {
      delete newObj[key];
    }
  });
  return newObj;
}
__name(compactObject, "compactObject");
function wait(millis) {
  return new Promise((res) => setTimeout(res, millis));
}
__name(wait, "wait");
async function withTimeout(promise, millis, errmsg) {
  let timerID;
  const timer$ = new Promise((_, reject) => {
    timerID = setTimeout(() => {
      reject(new Error(errmsg));
    }, millis);
  });
  return Promise.race([promise, timer$]).finally(() => clearTimeout(timerID));
}
__name(withTimeout, "withTimeout");
function memoizeOnSuccess(factoryFn) {
  let cached = null;
  return () => {
    if (cached === null) {
      cached = factoryFn().catch((err) => {
        setTimeout(() => {
          cached = null;
        }, 5e3);
        throw err;
      });
    }
    return cached;
  };
}
__name(memoizeOnSuccess, "memoizeOnSuccess");
function findLastIndex(arr, predicate) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}
__name(findLastIndex, "findLastIndex");
function partition(iterable, predicate) {
  const good = [];
  const bad = [];
  let index = 0;
  for (const item of iterable) {
    if (predicate(item, index++)) {
      good.push(item);
    } else {
      bad.push(item);
    }
  }
  return [good, bad];
}
__name(partition, "partition");
var kSinks = /* @__PURE__ */ Symbol("kSinks");
var kTrigger = /* @__PURE__ */ Symbol("kTrigger");
var signalsToTrigger = null;
var trackedReads = null;
function batch(callback) {
  if (signalsToTrigger !== null) {
    callback();
    return;
  }
  signalsToTrigger = /* @__PURE__ */ new Set();
  try {
    callback();
  } finally {
    for (const signal of signalsToTrigger) {
      signal[kTrigger]();
    }
    signalsToTrigger = null;
  }
}
__name(batch, "batch");
function enqueueTrigger(signal) {
  if (!signalsToTrigger) raise("Expected to be in an active batch");
  signalsToTrigger.add(signal);
}
__name(enqueueTrigger, "enqueueTrigger");
function merge(target, patch) {
  let updated = false;
  const newValue = { ...target };
  Object.keys(patch).forEach((k) => {
    const key = k;
    const val = patch[key];
    if (newValue[key] !== val) {
      if (val === void 0) {
        delete newValue[key];
      } else {
        newValue[key] = val;
      }
      updated = true;
    }
  });
  return updated ? newValue : target;
}
__name(merge, "merge");
var AbstractSignal = class {
  static {
    __name(this, "AbstractSignal");
  }
  /** @internal */
  equals;
  #eventSource;
  /** @internal */
  [kSinks];
  constructor(equals) {
    this.equals = equals ?? Object.is;
    this.#eventSource = makeEventSource();
    this[kSinks] = /* @__PURE__ */ new Set();
    this.get = this.get.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.subscribeOnce = this.subscribeOnce.bind(this);
  }
  dispose() {
    this.#eventSource.dispose();
    this.#eventSource = "(disposed)";
    this.equals = "(disposed)";
  }
  get hasWatchers() {
    if (this.#eventSource.count() > 0) return true;
    for (const sink of this[kSinks]) {
      if (sink.hasWatchers) {
        return true;
      }
    }
    return false;
  }
  [kTrigger]() {
    this.#eventSource.notify();
    for (const sink of this[kSinks]) {
      enqueueTrigger(sink);
    }
  }
  subscribe(callback) {
    if (this.#eventSource.count() === 0) {
      this.get();
    }
    return this.#eventSource.subscribe(callback);
  }
  subscribeOnce(callback) {
    const unsub = this.subscribe(() => {
      unsub();
      return callback();
    });
    return unsub;
  }
  waitUntil() {
    throw new Error("waitUntil not supported on Signals");
  }
  markSinksDirty() {
    for (const sink of this[kSinks]) {
      sink.markDirty();
    }
  }
  addSink(sink) {
    this[kSinks].add(sink);
  }
  removeSink(sink) {
    this[kSinks].delete(sink);
  }
  asReadonly() {
    return this;
  }
};
var Signal = class extends AbstractSignal {
  static {
    __name(this, "Signal");
  }
  #value;
  constructor(value, equals) {
    super(equals);
    this.#value = freeze(value);
  }
  dispose() {
    super.dispose();
    this.#value = "(disposed)";
  }
  get() {
    trackedReads?.add(this);
    return this.#value;
  }
  set(newValue) {
    batch(() => {
      if (typeof newValue === "function") {
        newValue = newValue(this.#value);
      }
      if (!this.equals(this.#value, newValue)) {
        this.#value = freeze(newValue);
        this.markSinksDirty();
        enqueueTrigger(this);
      }
    });
  }
};
var PatchableSignal = class extends Signal {
  static {
    __name(this, "PatchableSignal");
  }
  constructor(data) {
    super(freeze(compactObject(data)));
  }
  set() {
    throw new Error("Don't call .set() directly, use .patch()");
  }
  /**
   * Patches the current object.
   */
  patch(patch) {
    super.set((old) => merge(old, patch));
  }
};
var INITIAL = /* @__PURE__ */ Symbol();
var DerivedSignal = class _DerivedSignal extends AbstractSignal {
  static {
    __name(this, "_DerivedSignal");
  }
  #prevValue;
  #dirty;
  // When true, the value in #value may not be up-to-date and needs re-checking
  #sources;
  #deps;
  #transform;
  // prettier-ignore
  static from(...args) {
    const last = args.pop();
    if (typeof last !== "function")
      raise("Invalid .from() call, last argument expected to be a function");
    if (typeof args[args.length - 1] === "function") {
      const equals = last;
      const transform = args.pop();
      return new _DerivedSignal(args, transform, equals);
    } else {
      const transform = last;
      return new _DerivedSignal(args, transform);
    }
  }
  constructor(deps, transform, equals) {
    super(equals);
    this.#dirty = true;
    this.#prevValue = INITIAL;
    this.#deps = deps;
    this.#sources = /* @__PURE__ */ new Set();
    this.#transform = transform;
  }
  dispose() {
    for (const src of this.#sources) {
      src.removeSink(this);
    }
    this.#prevValue = "(disposed)";
    this.#sources = "(disposed)";
    this.#deps = "(disposed)";
    this.#transform = "(disposed)";
  }
  get isDirty() {
    return this.#dirty;
  }
  #recompute() {
    const oldTrackedReads = trackedReads;
    let derived;
    trackedReads = /* @__PURE__ */ new Set();
    try {
      derived = this.#transform(...this.#deps.map((p) => p.get()));
    } finally {
      const oldSources = this.#sources;
      this.#sources = /* @__PURE__ */ new Set();
      for (const sig of trackedReads) {
        this.#sources.add(sig);
        oldSources.delete(sig);
      }
      for (const oldSource of oldSources) {
        oldSource.removeSink(this);
      }
      for (const newSource of this.#sources) {
        newSource.addSink(this);
      }
      trackedReads = oldTrackedReads;
    }
    this.#dirty = false;
    if (!this.equals(this.#prevValue, derived)) {
      this.#prevValue = derived;
      return true;
    }
    return false;
  }
  markDirty() {
    if (!this.#dirty) {
      this.#dirty = true;
      this.markSinksDirty();
    }
  }
  get() {
    if (this.#dirty) {
      this.#recompute();
    }
    trackedReads?.add(this);
    return this.#prevValue;
  }
  /**
   * Called by the Signal system if one or more of the dependent signals have
   * changed. In the case of a DerivedSignal, we'll only want to re-evaluate
   * the actual value if it's being watched, or any of their sinks are being
   * watched actively.
   */
  [kTrigger]() {
    if (!this.hasWatchers) {
      return;
    }
    const updated = this.#recompute();
    if (updated) {
      super[kTrigger]();
    }
  }
};
var MutableSignal = class extends AbstractSignal {
  static {
    __name(this, "MutableSignal");
  }
  #state;
  constructor(initialState) {
    super();
    this.#state = initialState;
  }
  dispose() {
    super.dispose();
    this.#state = "(disposed)";
  }
  get() {
    trackedReads?.add(this);
    return this.#state;
  }
  /**
   * Invokes a callback function that is allowed to mutate the given state
   * value. Do not change the value outside of the callback.
   *
   * If the callback explicitly returns `false`, it's assumed that the state
   * was not changed.
   */
  mutate(callback) {
    batch(() => {
      const result = callback ? callback(this.#state) : true;
      if (result !== null && typeof result === "object" && "then" in result) {
        raise("MutableSignal.mutate() does not support async callbacks");
      }
      if (result !== false) {
        this.markSinksDirty();
        enqueueTrigger(this);
      }
    });
  }
};
function bisectRight(arr, x, lt) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = lo + (hi - lo >> 1);
    if (lt(x, arr[mid])) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return lo;
}
__name(bisectRight, "bisectRight");
var SortedList = class _SortedList {
  static {
    __name(this, "_SortedList");
  }
  #data;
  #lt;
  constructor(alreadySortedList, lt) {
    this.#lt = lt;
    this.#data = alreadySortedList;
  }
  /**
   * Creates an empty SortedList with the given "less than" function.
   */
  static with(lt) {
    return _SortedList.fromAlreadySorted([], lt);
  }
  static from(arr, lt) {
    const sorted = new _SortedList([], lt);
    for (const item of arr) {
      sorted.add(item);
    }
    return sorted;
  }
  static fromAlreadySorted(alreadySorted, lt) {
    return new _SortedList(alreadySorted, lt);
  }
  /**
   * Clones the sorted list to a new instance.
   */
  clone() {
    return new _SortedList(this.#data.slice(), this.#lt);
  }
  /**
   * Adds a new item to the sorted list, such that it remains sorted.
   * Returns the index where the item was inserted.
   */
  add(value) {
    const idx = bisectRight(this.#data, value, this.#lt);
    this.#data.splice(idx, 0, value);
    return idx;
  }
  /**
   * Removes all values from the sorted list, making it empty again.
   * Returns whether the list was mutated or not.
   */
  clear() {
    const hadData = this.#data.length > 0;
    this.#data.length = 0;
    return hadData;
  }
  /**
   * Removes the first value matching the predicate.
   * Returns whether the list was mutated or not.
   */
  removeBy(predicate, limit = Number.POSITIVE_INFINITY) {
    let deleted = 0;
    for (let i = 0; i < this.#data.length; i++) {
      if (predicate(this.#data[i])) {
        this.#data.splice(i, 1);
        deleted++;
        if (deleted >= limit) {
          break;
        } else {
          i--;
        }
      }
    }
    return deleted > 0;
  }
  /**
   * Removes the given value from the sorted list, if it exists. The given
   * value must be `===` to one of the list items. Only the first entry will be
   * removed if the element exists in the sorted list multiple times.
   *
   * Returns whether the list was mutated or not.
   */
  remove(value) {
    const idx = this.#data.indexOf(value);
    if (idx >= 0) {
      this.#data.splice(idx, 1);
      return true;
    }
    return false;
  }
  /**
   * Removes the item at the given index.
   * Returns the removed item, or undefined if index is out of bounds.
   */
  removeAt(index) {
    if (index < 0 || index >= this.#data.length) {
      return void 0;
    }
    const [removed] = this.#data.splice(index, 1);
    return removed;
  }
  /**
   * Repositions an item to maintain sorted order after its sort key has
   * been mutated in-place. For example:
   *
   *   const item = sorted.at(3);
   *   item.updatedAt = new Date();  // mutate the item's sort key in-place
   *   sorted.reposition(item);      // restore sorted order
   *
   * Returns the new index of the item. Throws if the item is not in the list.
   *
   * Semantically equivalent to remove(value) + add(value), but optimized
   * to avoid array shifting when the item only moves a short distance.
   */
  reposition(value) {
    const oldIdx = this.#data.indexOf(value);
    if (oldIdx < 0) {
      throw new Error("Cannot reposition item that is not in the list");
    }
    const prev = this.#data[oldIdx - 1];
    const next = this.#data[oldIdx + 1];
    const validLeft = prev === void 0 || this.#lt(prev, value);
    const validRight = next === void 0 || this.#lt(value, next);
    if (validLeft && validRight) {
      return oldIdx;
    }
    let newIdx = oldIdx;
    while (newIdx > 0 && this.#lt(value, this.#data[newIdx - 1])) {
      this.#data[newIdx] = this.#data[newIdx - 1];
      newIdx--;
    }
    if (newIdx < oldIdx) {
      this.#data[newIdx] = value;
      return newIdx;
    }
    while (newIdx < this.#data.length - 1 && !this.#lt(value, this.#data[newIdx + 1])) {
      this.#data[newIdx] = this.#data[newIdx + 1];
      newIdx++;
    }
    if (newIdx !== oldIdx) {
      this.#data[newIdx] = value;
    }
    return newIdx;
  }
  at(index) {
    return this.#data[index];
  }
  get length() {
    return this.#data.length;
  }
  *filter(predicate) {
    for (const item of this.#data) {
      if (predicate(item)) {
        yield item;
      }
    }
  }
  // XXXX If we keep this, add unit tests. Or remove it.
  *findAllRight(predicate) {
    for (let i = this.#data.length - 1; i >= 0; i--) {
      const item = this.#data[i];
      if (predicate(item, i)) {
        yield item;
      }
    }
  }
  [Symbol.iterator]() {
    return this.#data[Symbol.iterator]();
  }
  *iterReversed() {
    for (let i = this.#data.length - 1; i >= 0; i--) {
      yield this.#data[i];
    }
  }
  /** Finds the leftmost item that matches the predicate. */
  find(predicate, start) {
    const idx = this.findIndex(predicate, start);
    return idx > -1 ? this.#data.at(idx) : void 0;
  }
  /** Finds the leftmost index that matches the predicate. */
  findIndex(predicate, start = 0) {
    for (let i = Math.max(0, start); i < this.#data.length; i++) {
      if (predicate(this.#data[i], i)) {
        return i;
      }
    }
    return -1;
  }
  /** Finds the rightmost item that matches the predicate. */
  findRight(predicate, start) {
    const idx = this.findIndexRight(predicate, start);
    return idx > -1 ? this.#data.at(idx) : void 0;
  }
  /** Finds the rightmost index that matches the predicate. */
  findIndexRight(predicate, start = this.#data.length - 1) {
    for (let i = Math.min(start, this.#data.length - 1); i >= 0; i--) {
      if (predicate(this.#data[i], i)) {
        return i;
      }
    }
    return -1;
  }
  get rawArray() {
    return this.#data;
  }
};
var AiChatDB = class {
  static {
    __name(this, "AiChatDB");
  }
  #byId;
  // A map of chat id to chat details
  #chats;
  // Sorted list of non-deleted chats, most recent first
  signal;
  constructor() {
    this.#byId = /* @__PURE__ */ new Map();
    this.#chats = SortedList.from([], (c1, c2) => {
      const d2 = c2.lastMessageAt ?? c2.createdAt;
      const d1 = c1.lastMessageAt ?? c1.createdAt;
      return d2 < d1 ? true : d2 === d1 ? c2.id < c1.id : false;
    });
    this.signal = new MutableSignal(this);
  }
  getEvenIfDeleted(chatId) {
    this.signal.get();
    return this.#byId.get(chatId);
  }
  markDeleted(chatId) {
    const chat = this.#byId.get(chatId);
    if (chat === void 0 || chat.deletedAt !== void 0) return;
    this.upsert({
      ...chat,
      deletedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  upsert(chat) {
    this.signal.mutate(() => {
      const existingThread = this.#byId.get(chat.id);
      if (existingThread !== void 0) {
        if (existingThread.deletedAt !== void 0) return false;
        this.#chats.remove(existingThread);
        this.#byId.delete(existingThread.id);
      }
      if (chat.deletedAt === void 0) {
        this.#chats.add(chat);
      }
      this.#byId.set(chat.id, chat);
      return true;
    });
  }
  findMany(query) {
    return Array.from(
      this.#chats.filter((chat) => {
        if (query.metadata === void 0) return true;
        for (const [key, value] of Object.entries(query.metadata)) {
          if (value === null) {
            if (key in chat.metadata) return false;
          } else if (typeof value === "string") {
            if (chat.metadata[key] !== value) return false;
          } else {
            const chatValue = chat.metadata[key];
            if (!Array.isArray(chatValue) || !value.every((v) => chatValue.includes(v))) {
              return false;
            }
          }
        }
        return true;
      })
    );
  }
};
function convertToCommentData(data) {
  const editedAt = data.editedAt ? new Date(data.editedAt) : void 0;
  const createdAt = new Date(data.createdAt);
  const reactions = data.reactions.map((reaction) => ({
    ...reaction,
    createdAt: new Date(reaction.createdAt)
  }));
  if (data.body) {
    return {
      ...data,
      reactions,
      createdAt,
      editedAt
    };
  } else {
    const deletedAt = new Date(data.deletedAt);
    return {
      ...data,
      reactions,
      createdAt,
      editedAt,
      deletedAt
    };
  }
}
__name(convertToCommentData, "convertToCommentData");
function convertToThreadData(data) {
  const createdAt = new Date(data.createdAt);
  const updatedAt = new Date(data.updatedAt);
  const comments = data.comments.map(
    (comment) => convertToCommentData(comment)
  );
  return {
    ...data,
    createdAt,
    updatedAt,
    comments
  };
}
__name(convertToThreadData, "convertToThreadData");
function convertToCommentUserReaction(data) {
  return {
    ...data,
    createdAt: new Date(data.createdAt)
  };
}
__name(convertToCommentUserReaction, "convertToCommentUserReaction");
function convertToInboxNotificationData(data) {
  const notifiedAt = new Date(data.notifiedAt);
  const readAt = data.readAt ? new Date(data.readAt) : null;
  if ("activities" in data) {
    const activities = data.activities.map((activity) => ({
      ...activity,
      createdAt: new Date(activity.createdAt)
    }));
    return {
      ...data,
      notifiedAt,
      readAt,
      activities
    };
  }
  return {
    ...data,
    notifiedAt,
    readAt
  };
}
__name(convertToInboxNotificationData, "convertToInboxNotificationData");
function convertToSubscriptionData(data) {
  const createdAt = new Date(data.createdAt);
  return {
    ...data,
    createdAt
  };
}
__name(convertToSubscriptionData, "convertToSubscriptionData");
function convertToUserSubscriptionData(data) {
  const createdAt = new Date(data.createdAt);
  return {
    ...data,
    createdAt
  };
}
__name(convertToUserSubscriptionData, "convertToUserSubscriptionData");
function convertToThreadDeleteInfo(data) {
  const deletedAt = new Date(data.deletedAt);
  return {
    ...data,
    deletedAt
  };
}
__name(convertToThreadDeleteInfo, "convertToThreadDeleteInfo");
function convertToInboxNotificationDeleteInfo(data) {
  const deletedAt = new Date(data.deletedAt);
  return {
    ...data,
    deletedAt
  };
}
__name(convertToInboxNotificationDeleteInfo, "convertToInboxNotificationDeleteInfo");
function convertToSubscriptionDeleteInfo(data) {
  const deletedAt = new Date(data.deletedAt);
  return {
    ...data,
    deletedAt
  };
}
__name(convertToSubscriptionDeleteInfo, "convertToSubscriptionDeleteInfo");
function convertToGroupData(data) {
  const createdAt = new Date(data.createdAt);
  const updatedAt = new Date(data.updatedAt);
  const members = data.members.map((member) => ({
    ...member,
    addedAt: new Date(member.addedAt)
  }));
  return {
    ...data,
    createdAt,
    updatedAt,
    members
  };
}
__name(convertToGroupData, "convertToGroupData");
function assertNever(_value, errmsg) {
  throw new Error(errmsg);
}
__name(assertNever, "assertNever");
function assert(condition, errmsg) {
  if (process.env.NODE_ENV !== "production") {
    if (!condition) {
      const err = new Error(errmsg);
      err.name = "Assertion failure";
      throw err;
    }
  }
}
__name(assert, "assert");
function nn(value, errmsg = "Expected value to be non-nullable") {
  assert(value !== null && value !== void 0, errmsg);
  return value;
}
__name(nn, "nn");
var fancy_console_exports = {};
__export(fancy_console_exports, {
  error: /* @__PURE__ */ __name(() => error2, "error"),
  errorWithTitle: /* @__PURE__ */ __name(() => errorWithTitle, "errorWithTitle"),
  warn: /* @__PURE__ */ __name(() => warn, "warn"),
  warnWithTitle: /* @__PURE__ */ __name(() => warnWithTitle, "warnWithTitle")
});
var badge = "background:#0e0d12;border-radius:9999px;color:#fff;padding:3px 7px;font-family:sans-serif;font-weight:600;";
var bold = "font-weight:600";
function wrap(method) {
  return typeof window === "undefined" || process.env.NODE_ENV === "test" ? console[method] : (
    /* istanbul ignore next */
    (message, ...args) => console[method]("%cLiveblocks", badge, message, ...args)
  );
}
__name(wrap, "wrap");
var warn = wrap("warn");
var error2 = wrap("error");
function wrapWithTitle(method) {
  return typeof window === "undefined" || process.env.NODE_ENV === "test" ? console[method] : (
    /* istanbul ignore next */
    (title, message, ...args) => console[method](
      `%cLiveblocks%c ${title}`,
      badge,
      bold,
      message,
      ...args
    )
  );
}
__name(wrapWithTitle, "wrapWithTitle");
var warnWithTitle = wrapWithTitle("warn");
var errorWithTitle = wrapWithTitle("error");
function isDefined(value) {
  return value !== null && value !== void 0;
}
__name(isDefined, "isDefined");
function isPlainObject(blob) {
  return blob !== null && typeof blob === "object" && Object.prototype.toString.call(blob) === "[object Object]";
}
__name(isPlainObject, "isPlainObject");
function isStartsWithOperator(blob) {
  return isPlainObject(blob) && typeof blob.startsWith === "string";
}
__name(isStartsWithOperator, "isStartsWithOperator");
function isNumberOperator(blob) {
  return isPlainObject(blob) && (typeof blob.lt === "number" || typeof blob.gt === "number" || typeof blob.lte === "number" || typeof blob.gte === "number");
}
__name(isNumberOperator, "isNumberOperator");
var HttpError = class _HttpError extends Error {
  static {
    __name(this, "_HttpError");
  }
  response;
  details;
  constructor(message, response, details) {
    super(message);
    this.name = "HttpError";
    this.response = response;
    this.details = details;
  }
  static async fromResponse(response) {
    let bodyAsText;
    try {
      bodyAsText = await response.text();
    } catch {
    }
    const bodyAsJson = bodyAsText ? tryParseJson(bodyAsText) : void 0;
    let bodyAsJsonObject;
    if (isPlainObject(bodyAsJson)) {
      bodyAsJsonObject = bodyAsJson;
    }
    let message = "";
    message ||= typeof bodyAsJsonObject?.message === "string" ? bodyAsJsonObject.message : "";
    message ||= typeof bodyAsJsonObject?.error === "string" ? bodyAsJsonObject.error : "";
    if (bodyAsJson === void 0) {
      message ||= bodyAsText || "";
    }
    message ||= response.statusText;
    let path;
    try {
      path = new URL(response.url).pathname;
    } catch {
    }
    message += path !== void 0 ? ` (got status ${response.status} from ${path})` : ` (got status ${response.status})`;
    const details = bodyAsJsonObject;
    return new _HttpError(message, response, details);
  }
  /**
   * Convenience accessor for response.status.
   */
  get status() {
    return this.response.status;
  }
};
var DONT_RETRY_4XX = /* @__PURE__ */ __name((x) => x instanceof HttpError && x.status >= 400 && x.status < 500, "DONT_RETRY_4XX");
async function autoRetry(promiseFn, maxTries, backoff, shouldStopRetrying = DONT_RETRY_4XX) {
  const fallbackBackoff = backoff.length > 0 ? backoff[backoff.length - 1] : 0;
  let attempt = 0;
  while (true) {
    attempt++;
    try {
      return await promiseFn();
    } catch (err) {
      if (shouldStopRetrying(err)) {
        throw err;
      }
      if (attempt >= maxTries) {
        throw new Error(`Failed after ${maxTries} attempts: ${String(err)}`);
      }
    }
    const delay = backoff[attempt - 1] ?? fallbackBackoff;
    warn(
      `Attempt ${attempt} was unsuccessful. Retrying in ${delay} milliseconds.`
    );
    await wait(delay);
  }
}
__name(autoRetry, "autoRetry");
function controlledPromise() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return [promise, resolve, reject];
}
__name(controlledPromise, "controlledPromise");
function Promise_withResolvers() {
  const [promise, resolve, reject] = controlledPromise();
  return { promise, resolve, reject };
}
__name(Promise_withResolvers, "Promise_withResolvers");
function replacer(_key, value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort().reduce((sorted, key) => {
    sorted[key] = value[key];
    return sorted;
  }, {}) : value;
}
__name(replacer, "replacer");
function stableStringify(value) {
  return JSON.stringify(value, replacer);
}
__name(stableStringify, "stableStringify");
function stringifyOrLog(value) {
  try {
    return JSON.stringify(value);
  } catch (err) {
    console.error(`Could not stringify: ${err.message}`);
    console.error(value);
    throw err;
  }
}
__name(stringifyOrLog, "stringifyOrLog");
var DEFAULT_SIZE = 50;
var BatchCall = class {
  static {
    __name(this, "BatchCall");
  }
  input;
  resolve;
  reject;
  promise;
  constructor(input) {
    this.input = input;
    const { promise, resolve, reject } = Promise_withResolvers();
    this.promise = promise;
    this.resolve = resolve;
    this.reject = reject;
  }
};
var Batch = class {
  static {
    __name(this, "Batch");
  }
  #queue = [];
  #callback;
  #size;
  #delay;
  #delayTimeoutId;
  error = false;
  constructor(callback, options2) {
    this.#callback = callback;
    this.#size = options2.size ?? DEFAULT_SIZE;
    this.#delay = options2.delay;
  }
  #clearDelayTimeout() {
    if (this.#delayTimeoutId !== void 0) {
      clearTimeout(this.#delayTimeoutId);
      this.#delayTimeoutId = void 0;
    }
  }
  #schedule() {
    if (this.#queue.length === this.#size) {
      void this.#flush();
    } else if (this.#queue.length === 1) {
      this.#clearDelayTimeout();
      this.#delayTimeoutId = setTimeout(() => void this.#flush(), this.#delay);
    }
  }
  async #flush() {
    if (this.#queue.length === 0) {
      return;
    }
    const calls = this.#queue.splice(0);
    const inputs = calls.map((call) => call.input);
    try {
      const results = await this.#callback(inputs);
      this.error = false;
      calls.forEach((call, index) => {
        const result = results?.[index];
        if (!Array.isArray(results)) {
          call.reject(new Error("Callback must return an array."));
        } else if (calls.length !== results.length) {
          call.reject(
            new Error(
              `Callback must return an array of the same length as the number of provided items. Expected ${calls.length}, but got ${results.length}.`
            )
          );
        } else if (result instanceof Error) {
          call.reject(result);
        } else {
          call.resolve(result);
        }
      });
    } catch (error3) {
      this.error = true;
      calls.forEach((call) => {
        call.reject(error3);
      });
    }
  }
  get(input) {
    const existingCall = this.#queue.find(
      (call2) => stableStringify(call2.input) === stableStringify(input)
    );
    if (existingCall) {
      return existingCall.promise;
    }
    const call = new BatchCall(input);
    this.#queue.push(call);
    this.#schedule();
    return call.promise;
  }
  clear() {
    this.#queue = [];
    this.error = false;
    this.#clearDelayTimeout();
  }
};
function createBatchStore(batch2) {
  const signal = new MutableSignal(/* @__PURE__ */ new Map());
  function getCacheKey(args) {
    return stableStringify(args);
  }
  __name(getCacheKey, "getCacheKey");
  function update(entryOrEntries) {
    signal.mutate((cache) => {
      if (Array.isArray(entryOrEntries)) {
        for (const entry of entryOrEntries) {
          cache.set(entry.key, entry.state);
        }
      } else {
        cache.set(entryOrEntries.key, entryOrEntries.state);
      }
    });
  }
  __name(update, "update");
  function invalidate(inputs) {
    signal.mutate((cache) => {
      if (Array.isArray(inputs)) {
        for (const input of inputs) {
          cache.delete(getCacheKey(input));
        }
      } else {
        cache.clear();
      }
    });
  }
  __name(invalidate, "invalidate");
  async function enqueue(input) {
    const cacheKey = getCacheKey(input);
    const cache = signal.get();
    if (cache.has(cacheKey)) {
      return;
    }
    try {
      update({ key: cacheKey, state: { isLoading: true } });
      const result = await batch2.get(input);
      update({ key: cacheKey, state: { isLoading: false, data: result } });
    } catch (error3) {
      update({
        key: cacheKey,
        state: { isLoading: false, error: error3 }
      });
    }
  }
  __name(enqueue, "enqueue");
  function setData(entries2) {
    update(
      entries2.map((entry) => ({
        key: getCacheKey(entry[0]),
        state: { isLoading: false, data: entry[1] }
      }))
    );
  }
  __name(setData, "setData");
  function getItemState(input) {
    const cacheKey = getCacheKey(input);
    const cache = signal.get();
    return cache.get(cacheKey);
  }
  __name(getItemState, "getItemState");
  function getData(input) {
    const cacheKey = getCacheKey(input);
    const cache = signal.get();
    return cache.get(cacheKey)?.data;
  }
  __name(getData, "getData");
  function _cacheKeys() {
    const cache = signal.get();
    return [...cache.keys()];
  }
  __name(_cacheKeys, "_cacheKeys");
  return {
    subscribe: signal.subscribe,
    enqueue,
    setData,
    getItemState,
    getData,
    invalidate,
    batch: batch2,
    _cacheKeys
  };
}
__name(createBatchStore, "createBatchStore");
function chunk(array, size) {
  const chunks = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
__name(chunk, "chunk");
var nanoid = /* @__PURE__ */ __name((t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce(
  (t2, e) => t2 += (e &= 63) < 36 ? e.toString(36) : e < 62 ? (e - 26).toString(36).toUpperCase() : e < 63 ? "_" : "-",
  ""
), "nanoid");
var THREAD_ID_PREFIX = "th";
var COMMENT_ID_PREFIX = "cm";
var COMMENT_ATTACHMENT_ID_PREFIX = "at";
function createOptimisticId(prefix) {
  return `${prefix}_${nanoid()}`;
}
__name(createOptimisticId, "createOptimisticId");
function createThreadId() {
  return createOptimisticId(THREAD_ID_PREFIX);
}
__name(createThreadId, "createThreadId");
function createCommentId() {
  return createOptimisticId(COMMENT_ID_PREFIX);
}
__name(createCommentId, "createCommentId");
function createCommentAttachmentId() {
  return createOptimisticId(COMMENT_ATTACHMENT_ID_PREFIX);
}
__name(createCommentAttachmentId, "createCommentAttachmentId");
var DefaultMap = class extends Map {
  static {
    __name(this, "DefaultMap");
  }
  #defaultFn;
  /**
   * If the default function is not provided to the constructor, it has to be
   * provided in each .getOrCreate() call individually.
   */
  constructor(defaultFn, entries2) {
    super(entries2);
    this.#defaultFn = defaultFn;
  }
  /**
   * Gets the value at the given key, or creates it.
   *
   * Difference from normal Map: if the key does not exist, it will be created
   * on the fly using the factory function, and that value will get returned
   * instead of `undefined`.
   */
  getOrCreate(key, defaultFn) {
    if (super.has(key)) {
      return super.get(key);
    } else {
      const fn = defaultFn ?? this.#defaultFn ?? raise("DefaultMap used without a factory function");
      const value = fn(key);
      this.set(key, value);
      return value;
    }
  }
};
var identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
function objectToQuery(obj) {
  let filterList = [];
  const entries2 = Object.entries(obj);
  const keyValuePairs = [];
  const keyValuePairsWithOperator = [];
  const indexedKeys = [];
  entries2.forEach(([key, value]) => {
    if (!identifierRegex.test(key)) {
      throw new Error("Key must only contain letters, numbers, _");
    }
    if (isSimpleValue(value)) {
      keyValuePairs.push([key, value]);
    } else if (isPlainObject(value)) {
      if (isStartsWithOperator(value) || isNumberOperator(value)) {
        keyValuePairsWithOperator.push([key, value]);
      } else {
        indexedKeys.push([key, value]);
      }
    }
  });
  filterList = [
    ...getFiltersFromKeyValuePairs(keyValuePairs),
    ...getFiltersFromKeyValuePairsWithOperator(keyValuePairsWithOperator)
  ];
  indexedKeys.forEach(([key, value]) => {
    const nestedEntries = Object.entries(value);
    const nKeyValuePairs = [];
    const nKeyValuePairsWithOperator = [];
    nestedEntries.forEach(([nestedKey, nestedValue]) => {
      if (isStringEmpty(nestedKey)) {
        throw new Error("Key cannot be empty");
      }
      if (isSimpleValue(nestedValue)) {
        nKeyValuePairs.push([formatFilterKey(key, nestedKey), nestedValue]);
      } else if (isStartsWithOperator(nestedValue) || isNumberOperator(nestedValue)) {
        nKeyValuePairsWithOperator.push([
          formatFilterKey(key, nestedKey),
          nestedValue
        ]);
      }
    });
    filterList = [
      ...filterList,
      ...getFiltersFromKeyValuePairs(nKeyValuePairs),
      ...getFiltersFromKeyValuePairsWithOperator(nKeyValuePairsWithOperator)
    ];
  });
  return filterList.map(({ key, operator, value }) => `${key}${operator}${quote(value)}`).join(" ");
}
__name(objectToQuery, "objectToQuery");
var getFiltersFromKeyValuePairs = /* @__PURE__ */ __name((keyValuePairs) => {
  const filters = [];
  keyValuePairs.forEach(([key, value]) => {
    filters.push({
      key,
      operator: ":",
      value
    });
  });
  return filters;
}, "getFiltersFromKeyValuePairs");
var getFiltersFromKeyValuePairsWithOperator = /* @__PURE__ */ __name((keyValuePairsWithOperator) => {
  const filters = [];
  keyValuePairsWithOperator.forEach(([key, value]) => {
    if ("startsWith" in value && typeof value.startsWith === "string") {
      filters.push({
        key,
        operator: "^",
        value: value.startsWith
      });
    }
    if ("lt" in value && typeof value.lt === "number") {
      filters.push({
        key,
        operator: "<",
        value: value.lt
      });
    }
    if ("gt" in value && typeof value.gt === "number") {
      filters.push({
        key,
        operator: ">",
        value: value.gt
      });
    }
    if ("gte" in value && typeof value.gte === "number") {
      filters.push({
        key,
        operator: ">=",
        value: value.gte
      });
    }
    if ("lte" in value && typeof value.lte === "number") {
      filters.push({
        key,
        operator: "<=",
        value: value.lte
      });
    }
  });
  return filters;
}, "getFiltersFromKeyValuePairsWithOperator");
var isSimpleValue = /* @__PURE__ */ __name((value) => {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null;
}, "isSimpleValue");
var formatFilterKey = /* @__PURE__ */ __name((key, nestedKey) => {
  if (nestedKey) {
    return `${key}[${quote(nestedKey)}]`;
  }
  return key;
}, "formatFilterKey");
var isStringEmpty = /* @__PURE__ */ __name((value) => {
  return !value || value.toString().trim() === "";
}, "isStringEmpty");
function quote(input) {
  const result = JSON.stringify(input);
  if (typeof input !== "string") {
    return result;
  }
  if (result.includes("'")) {
    return result;
  }
  return `'${result.slice(1, -1).replace(/\\"/g, '"')}'`;
}
__name(quote, "quote");
function toURLSearchParams(params) {
  const result = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && value !== null) {
      result.set(key, value.toString());
    }
  }
  return result;
}
__name(toURLSearchParams, "toURLSearchParams");
function urljoin(baseUrl, path, params) {
  const url2 = new URL(path, baseUrl);
  if (params !== void 0) {
    url2.search = (params instanceof URLSearchParams ? params : toURLSearchParams(params)).toString();
  }
  return url2.toString();
}
__name(urljoin, "urljoin");
function url(strings, ...values2) {
  return strings.reduce(
    (result, str, i) => result + encodeURIComponent(values2[i - 1] ?? "") + str
  );
}
__name(url, "url");
function createApiClient({
  baseUrl,
  authManager,
  currentUserId,
  fetchPolyfill: fetchPolyfill2
}) {
  const httpClient = new HttpClient(baseUrl, fetchPolyfill2);
  async function getThreadsSince(options2) {
    const result = await httpClient.get(
      url`/v2/c/rooms/${options2.roomId}/threads/delta`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      {
        since: options2.since.toISOString()
      },
      { signal: options2.signal }
    );
    return {
      threads: {
        updated: result.data.map(convertToThreadData),
        deleted: result.deletedThreads.map(convertToThreadDeleteInfo)
      },
      inboxNotifications: {
        updated: result.inboxNotifications.map(convertToInboxNotificationData),
        deleted: result.deletedInboxNotifications.map(
          convertToInboxNotificationDeleteInfo
        )
      },
      subscriptions: {
        updated: result.subscriptions.map(convertToSubscriptionData),
        deleted: result.deletedSubscriptions.map(
          convertToSubscriptionDeleteInfo
        )
      },
      requestedAt: new Date(result.meta.requestedAt),
      permissionHints: result.meta.permissionHints
    };
  }
  __name(getThreadsSince, "getThreadsSince");
  async function getThreads(options2) {
    let query;
    if (options2.query) {
      query = objectToQuery(options2.query);
    }
    const PAGE_SIZE = 50;
    try {
      const result = await httpClient.get(
        url`/v2/c/rooms/${options2.roomId}/threads`,
        await authManager.getAuthValue({
          requestedScope: "comments:read",
          roomId: options2.roomId
        }),
        {
          cursor: options2.cursor,
          query,
          limit: PAGE_SIZE
        }
      );
      return {
        threads: result.data.map(convertToThreadData),
        inboxNotifications: result.inboxNotifications.map(
          convertToInboxNotificationData
        ),
        subscriptions: result.subscriptions.map(convertToSubscriptionData),
        nextCursor: result.meta.nextCursor,
        requestedAt: new Date(result.meta.requestedAt),
        permissionHints: result.meta.permissionHints
      };
    } catch (err) {
      if (err instanceof HttpError && err.status === 404) {
        return {
          threads: [],
          inboxNotifications: [],
          subscriptions: [],
          nextCursor: null,
          //
          // HACK
          // requestedAt needs to be a *server* timestamp here. However, on
          // this 404 error response, there is no such timestamp. So out of
          // pure necessity we'll fall back to a local timestamp instead (and
          // allow for a possible 6 hour clock difference between client and
          // server).
          //
          requestedAt: new Date(Date.now() - 6 * 60 * 60 * 1e3),
          permissionHints: {}
        };
      }
      throw err;
    }
  }
  __name(getThreads, "getThreads");
  async function searchComments(options2, requestOptions) {
    const result = await httpClient.get(
      url`/v2/c/rooms/${options2.roomId}/threads/comments/search`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      {
        text: options2.query.text,
        query: objectToQuery({
          threadMetadata: options2.query.threadMetadata,
          threadResolved: options2.query.threadResolved,
          hasAttachments: options2.query.hasAttachments,
          hasMentions: options2.query.hasMentions
        })
      },
      { signal: requestOptions?.signal }
    );
    return result;
  }
  __name(searchComments, "searchComments");
  async function createThread(options2) {
    const commentId = options2.commentId ?? createCommentId();
    const threadId = options2.threadId ?? createThreadId();
    const thread = await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      {
        id: threadId,
        comment: {
          id: commentId,
          body: options2.body,
          metadata: options2.commentMetadata,
          attachmentIds: options2.attachmentIds
        },
        metadata: options2.metadata
      }
    );
    return convertToThreadData(thread);
  }
  __name(createThread, "createThread");
  async function deleteThread(options2) {
    await httpClient.delete(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(deleteThread, "deleteThread");
  async function getThread(options2) {
    const response = await httpClient.rawGet(
      url`/v2/c/rooms/${options2.roomId}/thread-with-notification/${options2.threadId}`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
    if (response.ok) {
      const json = await response.json();
      return {
        thread: convertToThreadData(json.thread),
        inboxNotification: json.inboxNotification ? convertToInboxNotificationData(json.inboxNotification) : void 0,
        subscription: json.subscription ? convertToSubscriptionData(json.subscription) : void 0
      };
    } else if (response.status === 404) {
      return {
        thread: void 0,
        inboxNotification: void 0,
        subscription: void 0
      };
    } else {
      throw new Error(
        `There was an error while getting thread ${options2.threadId}.`
      );
    }
  }
  __name(getThread, "getThread");
  async function editThreadMetadata(options2) {
    return await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/metadata`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      options2.metadata
    );
  }
  __name(editThreadMetadata, "editThreadMetadata");
  async function editCommentMetadata(options2) {
    return await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/comments/${options2.commentId}/metadata`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      options2.metadata
    );
  }
  __name(editCommentMetadata, "editCommentMetadata");
  async function createComment(options2) {
    const commentId = options2.commentId ?? createCommentId();
    const comment = await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/comments`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      {
        id: commentId,
        body: options2.body,
        metadata: options2.metadata,
        attachmentIds: options2.attachmentIds
      }
    );
    return convertToCommentData(comment);
  }
  __name(createComment, "createComment");
  async function editComment(options2) {
    const comment = await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/comments/${options2.commentId}`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      {
        body: options2.body,
        attachmentIds: options2.attachmentIds,
        metadata: options2.metadata
      }
    );
    return convertToCommentData(comment);
  }
  __name(editComment, "editComment");
  async function deleteComment(options2) {
    await httpClient.delete(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/comments/${options2.commentId}`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(deleteComment, "deleteComment");
  async function addReaction(options2) {
    const reaction = await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/comments/${options2.commentId}/reactions`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      { emoji: options2.emoji }
    );
    return convertToCommentUserReaction(reaction);
  }
  __name(addReaction, "addReaction");
  async function removeReaction(options2) {
    await httpClient.delete(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/comments/${options2.commentId}/reactions/${options2.emoji}`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(removeReaction, "removeReaction");
  async function markThreadAsResolved(options2) {
    await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/mark-as-resolved`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(markThreadAsResolved, "markThreadAsResolved");
  async function markThreadAsUnresolved(options2) {
    await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/mark-as-unresolved`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(markThreadAsUnresolved, "markThreadAsUnresolved");
  async function subscribeToThread(options2) {
    const subscription = await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/subscribe`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
    return convertToSubscriptionData(subscription);
  }
  __name(subscribeToThread, "subscribeToThread");
  async function unsubscribeFromThread(options2) {
    await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/threads/${options2.threadId}/unsubscribe`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(unsubscribeFromThread, "unsubscribeFromThread");
  async function uploadAttachment(options2) {
    const roomId = options2.roomId;
    const abortSignal = options2.signal;
    const attachment = options2.attachment;
    const abortError = abortSignal ? new DOMException(
      `Upload of attachment ${options2.attachment.id} was aborted.`,
      "AbortError"
    ) : void 0;
    if (abortSignal?.aborted) {
      throw abortError;
    }
    const handleRetryError = /* @__PURE__ */ __name((err) => {
      if (abortSignal?.aborted) {
        throw abortError;
      }
      if (err instanceof HttpError && err.status === 413) {
        throw err;
      }
      return false;
    }, "handleRetryError");
    const ATTACHMENT_PART_SIZE = 5 * 1024 * 1024;
    const RETRY_ATTEMPTS = 10;
    const RETRY_DELAYS = [
      2e3,
      2e3,
      2e3,
      2e3,
      2e3,
      2e3,
      2e3,
      2e3,
      2e3,
      2e3
    ];
    function splitFileIntoParts(file) {
      const parts = [];
      let start = 0;
      while (start < file.size) {
        const end = Math.min(start + ATTACHMENT_PART_SIZE, file.size);
        parts.push({
          partNumber: parts.length + 1,
          part: file.slice(start, end)
        });
        start = end;
      }
      return parts;
    }
    __name(splitFileIntoParts, "splitFileIntoParts");
    if (attachment.size <= ATTACHMENT_PART_SIZE) {
      return autoRetry(
        async () => httpClient.putBlob(
          url`/v2/c/rooms/${roomId}/attachments/${attachment.id}/upload/${encodeURIComponent(attachment.name)}`,
          await authManager.getAuthValue({
            requestedScope: "comments:read",
            roomId
          }),
          attachment.file,
          { fileSize: attachment.size },
          { signal: abortSignal }
        ),
        RETRY_ATTEMPTS,
        RETRY_DELAYS,
        handleRetryError
      );
    } else {
      let uploadId;
      const uploadedParts = [];
      const createMultiPartUpload = await autoRetry(
        async () => httpClient.post(
          url`/v2/c/rooms/${roomId}/attachments/${attachment.id}/multipart/${encodeURIComponent(attachment.name)}`,
          await authManager.getAuthValue({
            requestedScope: "comments:read",
            roomId
          }),
          void 0,
          { signal: abortSignal },
          { fileSize: attachment.size }
        ),
        RETRY_ATTEMPTS,
        RETRY_DELAYS,
        handleRetryError
      );
      try {
        uploadId = createMultiPartUpload.uploadId;
        const parts = splitFileIntoParts(attachment.file);
        if (abortSignal?.aborted) {
          throw abortError;
        }
        const batches = chunk(parts, 5);
        for (const parts2 of batches) {
          const uploadedPartsPromises = [];
          for (const { part, partNumber } of parts2) {
            uploadedPartsPromises.push(
              autoRetry(
                async () => httpClient.putBlob(
                  url`/v2/c/rooms/${roomId}/attachments/${attachment.id}/multipart/${createMultiPartUpload.uploadId}/${String(partNumber)}`,
                  await authManager.getAuthValue({
                    requestedScope: "comments:read",
                    roomId
                  }),
                  part,
                  void 0,
                  { signal: abortSignal }
                ),
                RETRY_ATTEMPTS,
                RETRY_DELAYS,
                handleRetryError
              )
            );
          }
          uploadedParts.push(...await Promise.all(uploadedPartsPromises));
        }
        if (abortSignal?.aborted) {
          throw abortError;
        }
        const sortedUploadedParts = uploadedParts.sort(
          (a, b) => a.partNumber - b.partNumber
        );
        return httpClient.post(
          url`/v2/c/rooms/${roomId}/attachments/${attachment.id}/multipart/${uploadId}/complete`,
          await authManager.getAuthValue({
            requestedScope: "comments:read",
            roomId
          }),
          { parts: sortedUploadedParts },
          { signal: abortSignal }
        );
      } catch (error3) {
        if (uploadId && error3?.name && (error3.name === "AbortError" || error3.name === "TimeoutError")) {
          try {
            await httpClient.rawDelete(
              url`/v2/c/rooms/${roomId}/attachments/${attachment.id}/multipart/${uploadId}`,
              await authManager.getAuthValue({
                requestedScope: "comments:read",
                roomId
              })
            );
          } catch {
          }
        }
        throw error3;
      }
    }
  }
  __name(uploadAttachment, "uploadAttachment");
  const attachmentUrlsBatchStoresByRoom = new DefaultMap((roomId) => {
    const batch2 = new Batch(
      async (batchedAttachmentIds) => {
        const attachmentIds = batchedAttachmentIds.flat();
        const { urls } = await httpClient.post(
          url`/v2/c/rooms/${roomId}/attachments/presigned-urls`,
          await authManager.getAuthValue({
            requestedScope: "comments:read",
            roomId
          }),
          { attachmentIds }
        );
        return urls.map(
          (url2) => url2 ?? new Error("There was an error while getting this attachment's URL")
        );
      },
      { delay: 50 }
    );
    return createBatchStore(batch2);
  });
  function getOrCreateAttachmentUrlsStore(roomId) {
    return attachmentUrlsBatchStoresByRoom.getOrCreate(roomId);
  }
  __name(getOrCreateAttachmentUrlsStore, "getOrCreateAttachmentUrlsStore");
  function getAttachmentUrl(options2) {
    const batch2 = getOrCreateAttachmentUrlsStore(options2.roomId).batch;
    return batch2.get(options2.attachmentId);
  }
  __name(getAttachmentUrl, "getAttachmentUrl");
  async function uploadChatAttachment(options2) {
    const { chatId, attachment, signal } = options2;
    const userId = currentUserId.get();
    if (userId === void 0) {
      throw new Error("Attachment upload requires an authenticated user.");
    }
    const ATTACHMENT_PART_SIZE = 5 * 1024 * 1024;
    if (options2.attachment.file.size <= ATTACHMENT_PART_SIZE) {
      await httpClient.putBlob(
        url`/v2/c/chats/${chatId}/attachments/${attachment.id}/upload/${encodeURIComponent(attachment.file.name)}`,
        await authManager.getAuthValue({ requestedScope: "comments:read" }),
        attachment.file,
        { fileSize: attachment.file.size },
        { signal }
      );
    } else {
      const multipartUpload = await httpClient.post(
        url`/v2/c/chats/${chatId}/attachments/${attachment.id}/multipart/${encodeURIComponent(attachment.file.name)}`,
        await authManager.getAuthValue({ requestedScope: "comments:read" }),
        void 0,
        { signal },
        { fileSize: attachment.file.size }
      );
      try {
        const uploadedParts = [];
        const parts = [];
        let start = 0;
        while (start < attachment.file.size) {
          const end = Math.min(
            start + ATTACHMENT_PART_SIZE,
            attachment.file.size
          );
          parts.push({
            number: parts.length + 1,
            part: attachment.file.slice(start, end)
          });
          start = end;
        }
        uploadedParts.push(
          ...await Promise.all(
            parts.map(async ({ number, part }) => {
              return await httpClient.putBlob(
                url`/v2/c/chats/${chatId}/attachments/${attachment.id}/multipart/${multipartUpload.uploadId}/${String(number)}`,
                await authManager.getAuthValue({
                  requestedScope: "comments:read"
                }),
                part,
                void 0,
                { signal }
              );
            })
          )
        );
        await httpClient.post(
          url`/v2/c/chats/${chatId}/attachments/${attachment.id}/multipart/${multipartUpload.uploadId}/complete`,
          await authManager.getAuthValue({ requestedScope: "comments:read" }),
          { parts: uploadedParts.sort((a, b) => a.number - b.number) },
          { signal }
        );
      } catch (err) {
        try {
          await httpClient.delete(
            url`/v2/c/chats/${chatId}/attachments/${attachment.id}/multipart/${multipartUpload.uploadId}`,
            await authManager.getAuthValue({ requestedScope: "comments:read" })
          );
        } catch {
        }
        throw err;
      }
    }
  }
  __name(uploadChatAttachment, "uploadChatAttachment");
  const attachmentUrlsBatchStoresByChat = new DefaultMap((chatId) => {
    const batch2 = new Batch(
      async (batchedAttachmentIds) => {
        const attachmentIds = batchedAttachmentIds.flat();
        const { urls } = await httpClient.post(
          url`/v2/c/chats/${chatId}/attachments/presigned-urls`,
          await authManager.getAuthValue({
            requestedScope: "comments:read"
          }),
          { attachmentIds }
        );
        return urls.map(
          (url2) => url2 ?? new Error("There was an error while getting this attachment's URL")
        );
      },
      { delay: 50 }
    );
    return createBatchStore(batch2);
  });
  function getOrCreateChatAttachmentUrlsStore(chatId) {
    return attachmentUrlsBatchStoresByChat.getOrCreate(chatId);
  }
  __name(getOrCreateChatAttachmentUrlsStore, "getOrCreateChatAttachmentUrlsStore");
  function getChatAttachmentUrl(options2) {
    const batch2 = getOrCreateChatAttachmentUrlsStore(options2.chatId).batch;
    return batch2.get(options2.attachmentId);
  }
  __name(getChatAttachmentUrl, "getChatAttachmentUrl");
  async function getSubscriptionSettings(options2) {
    return httpClient.get(
      url`/v2/c/rooms/${options2.roomId}/subscription-settings`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      void 0,
      {
        signal: options2.signal
      }
    );
  }
  __name(getSubscriptionSettings, "getSubscriptionSettings");
  async function updateSubscriptionSettings(options2) {
    return httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/subscription-settings`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      options2.settings
    );
  }
  __name(updateSubscriptionSettings, "updateSubscriptionSettings");
  const markAsReadBatchesByRoom = new DefaultMap(
    (roomId) => new Batch(
      async (batchedInboxNotificationIds) => {
        const inboxNotificationIds = batchedInboxNotificationIds.flat();
        await httpClient.post(
          url`/v2/c/rooms/${roomId}/inbox-notifications/read`,
          await authManager.getAuthValue({
            requestedScope: "comments:read",
            roomId
          }),
          { inboxNotificationIds }
        );
        return inboxNotificationIds;
      },
      { delay: 50 }
    )
  );
  async function markRoomInboxNotificationAsRead(options2) {
    const batch2 = markAsReadBatchesByRoom.getOrCreate(options2.roomId);
    return batch2.get(options2.inboxNotificationId);
  }
  __name(markRoomInboxNotificationAsRead, "markRoomInboxNotificationAsRead");
  async function createTextMention(options2) {
    if (options2.mention.kind !== "user" && options2.mention.kind !== "group") {
      return assertNever(options2.mention, "Unexpected mention kind");
    }
    await httpClient.rawPost(
      url`/v2/c/rooms/${options2.roomId}/text-mentions`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      {
        userId: options2.mention.kind === "user" ? options2.mention.id : void 0,
        groupId: options2.mention.kind === "group" ? options2.mention.id : void 0,
        userIds: options2.mention.kind === "group" ? options2.mention.userIds : void 0,
        mentionId: options2.mentionId
      }
    );
  }
  __name(createTextMention, "createTextMention");
  async function deleteTextMention(options2) {
    await httpClient.rawDelete(
      url`/v2/c/rooms/${options2.roomId}/text-mentions/${options2.mentionId}`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(deleteTextMention, "deleteTextMention");
  async function getTextVersion(options2) {
    return httpClient.rawGet(
      url`/v2/c/rooms/${options2.roomId}/y-version/${options2.versionId}`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(getTextVersion, "getTextVersion");
  async function createTextVersion(options2) {
    await httpClient.rawPost(
      url`/v2/c/rooms/${options2.roomId}/version`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
  }
  __name(createTextVersion, "createTextVersion");
  async function reportTextEditor(options2) {
    await httpClient.rawPost(
      url`/v2/c/rooms/${options2.roomId}/text-metadata`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      {
        type: options2.type,
        rootKey: options2.rootKey
      }
    );
  }
  __name(reportTextEditor, "reportTextEditor");
  async function executeContextualPrompt(options2) {
    const result = await httpClient.post(
      url`/v2/c/rooms/${options2.roomId}/ai/contextual-prompt`,
      await authManager.getAuthValue({
        requestedScope: "room:read",
        roomId: options2.roomId
      }),
      {
        prompt: options2.prompt,
        context: {
          beforeSelection: options2.context.beforeSelection,
          selection: options2.context.selection,
          afterSelection: options2.context.afterSelection
        },
        previous: options2.previous
      },
      { signal: options2.signal }
    );
    if (!result || result.content.length === 0) {
      throw new Error("No content returned from server");
    }
    return result.content[0].text;
  }
  __name(executeContextualPrompt, "executeContextualPrompt");
  async function listTextVersions(options2) {
    const result = await httpClient.get(
      url`/v2/c/rooms/${options2.roomId}/versions`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      })
    );
    return {
      versions: result.versions.map(({ createdAt, ...version }) => {
        return {
          createdAt: new Date(createdAt),
          ...version
        };
      }),
      requestedAt: new Date(result.meta.requestedAt)
    };
  }
  __name(listTextVersions, "listTextVersions");
  async function listTextVersionsSince(options2) {
    const result = await httpClient.get(
      url`/v2/c/rooms/${options2.roomId}/versions/delta`,
      await authManager.getAuthValue({
        requestedScope: "comments:read",
        roomId: options2.roomId
      }),
      { since: options2.since.toISOString() },
      { signal: options2.signal }
    );
    return {
      versions: result.versions.map(({ createdAt, ...version }) => {
        return {
          createdAt: new Date(createdAt),
          ...version
        };
      }),
      requestedAt: new Date(result.meta.requestedAt)
    };
  }
  __name(listTextVersionsSince, "listTextVersionsSince");
  async function streamStorage(options2) {
    const result = await httpClient.rawGet(
      url`/v2/c/rooms/${options2.roomId}/storage`,
      await authManager.getAuthValue({
        requestedScope: "room:read",
        roomId: options2.roomId
      })
    );
    return await result.json();
  }
  __name(streamStorage, "streamStorage");
  async function getInboxNotifications(options2) {
    const PAGE_SIZE = 50;
    let query;
    if (options2?.query) {
      query = objectToQuery(options2.query);
    }
    const json = await httpClient.get(
      url`/v2/c/inbox-notifications`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      {
        cursor: options2?.cursor,
        limit: PAGE_SIZE,
        query
      }
    );
    const groups = json.groups.map(convertToGroupData);
    groupsStore.setData(groups.map((group) => [group.id, group]));
    return {
      inboxNotifications: json.inboxNotifications.map(
        convertToInboxNotificationData
      ),
      threads: json.threads.map(convertToThreadData),
      subscriptions: json.subscriptions.map(convertToSubscriptionData),
      nextCursor: json.meta.nextCursor,
      requestedAt: new Date(json.meta.requestedAt)
    };
  }
  __name(getInboxNotifications, "getInboxNotifications");
  async function getInboxNotificationsSince(options2) {
    let query;
    if (options2?.query) {
      query = objectToQuery(options2.query);
    }
    const json = await httpClient.get(
      url`/v2/c/inbox-notifications/delta`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      { since: options2.since.toISOString(), query },
      { signal: options2.signal }
    );
    return {
      inboxNotifications: {
        updated: json.inboxNotifications.map(convertToInboxNotificationData),
        deleted: json.deletedInboxNotifications.map(
          convertToInboxNotificationDeleteInfo
        )
      },
      threads: {
        updated: json.threads.map(convertToThreadData),
        deleted: json.deletedThreads.map(convertToThreadDeleteInfo)
      },
      subscriptions: {
        updated: json.subscriptions.map(convertToSubscriptionData),
        deleted: json.deletedSubscriptions.map(convertToSubscriptionDeleteInfo)
      },
      requestedAt: new Date(json.meta.requestedAt)
    };
  }
  __name(getInboxNotificationsSince, "getInboxNotificationsSince");
  async function getUnreadInboxNotificationsCount(options2) {
    let query;
    if (options2?.query) {
      query = objectToQuery(options2.query);
    }
    const { count } = await httpClient.get(
      url`/v2/c/inbox-notifications/count`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      { query },
      { signal: options2?.signal }
    );
    return count;
  }
  __name(getUnreadInboxNotificationsCount, "getUnreadInboxNotificationsCount");
  async function markAllInboxNotificationsAsRead() {
    await httpClient.post(
      url`/v2/c/inbox-notifications/read`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      {
        inboxNotificationIds: "all"
      }
    );
  }
  __name(markAllInboxNotificationsAsRead, "markAllInboxNotificationsAsRead");
  async function markInboxNotificationsAsRead(inboxNotificationIds) {
    await httpClient.post(
      url`/v2/c/inbox-notifications/read`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      {
        inboxNotificationIds
      }
    );
  }
  __name(markInboxNotificationsAsRead, "markInboxNotificationsAsRead");
  const batchedMarkInboxNotificationsAsRead = new Batch(
    async (batchedInboxNotificationIds) => {
      const inboxNotificationIds = batchedInboxNotificationIds.flat();
      await markInboxNotificationsAsRead(inboxNotificationIds);
      return inboxNotificationIds;
    },
    { delay: 50 }
  );
  async function markInboxNotificationAsRead(inboxNotificationId) {
    await batchedMarkInboxNotificationsAsRead.get(inboxNotificationId);
  }
  __name(markInboxNotificationAsRead, "markInboxNotificationAsRead");
  async function deleteAllInboxNotifications() {
    await httpClient.delete(
      url`/v2/c/inbox-notifications`,
      await authManager.getAuthValue({ requestedScope: "comments:read" })
    );
  }
  __name(deleteAllInboxNotifications, "deleteAllInboxNotifications");
  async function deleteInboxNotification(inboxNotificationId) {
    await httpClient.delete(
      url`/v2/c/inbox-notifications/${inboxNotificationId}`,
      await authManager.getAuthValue({ requestedScope: "comments:read" })
    );
  }
  __name(deleteInboxNotification, "deleteInboxNotification");
  async function getNotificationSettings(options2) {
    return httpClient.get(
      url`/v2/c/notification-settings`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      void 0,
      { signal: options2?.signal }
    );
  }
  __name(getNotificationSettings, "getNotificationSettings");
  async function updateNotificationSettings(settings) {
    return httpClient.post(
      url`/v2/c/notification-settings`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      settings
    );
  }
  __name(updateNotificationSettings, "updateNotificationSettings");
  async function getUserThreads_experimental(options2) {
    let query;
    if (options2?.query) {
      query = objectToQuery(options2.query);
    }
    const PAGE_SIZE = 50;
    const json = await httpClient.get(
      url`/v2/c/threads`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      {
        cursor: options2?.cursor,
        query,
        limit: PAGE_SIZE
      }
    );
    return {
      threads: json.threads.map(convertToThreadData),
      inboxNotifications: json.inboxNotifications.map(
        convertToInboxNotificationData
      ),
      subscriptions: json.subscriptions.map(convertToSubscriptionData),
      nextCursor: json.meta.nextCursor,
      requestedAt: new Date(json.meta.requestedAt),
      permissionHints: json.meta.permissionHints
    };
  }
  __name(getUserThreads_experimental, "getUserThreads_experimental");
  async function getUserThreadsSince_experimental(options2) {
    const json = await httpClient.get(
      url`/v2/c/threads/delta`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      { since: options2.since.toISOString() },
      { signal: options2.signal }
    );
    return {
      threads: {
        updated: json.threads.map(convertToThreadData),
        deleted: json.deletedThreads.map(convertToThreadDeleteInfo)
      },
      inboxNotifications: {
        updated: json.inboxNotifications.map(convertToInboxNotificationData),
        deleted: json.deletedInboxNotifications.map(
          convertToInboxNotificationDeleteInfo
        )
      },
      subscriptions: {
        updated: json.subscriptions.map(convertToSubscriptionData),
        deleted: json.deletedSubscriptions.map(convertToSubscriptionDeleteInfo)
      },
      requestedAt: new Date(json.meta.requestedAt),
      permissionHints: json.meta.permissionHints
    };
  }
  __name(getUserThreadsSince_experimental, "getUserThreadsSince_experimental");
  const batchedGetGroups = new Batch(
    async (batchedGroupIds) => {
      const groupIds = batchedGroupIds.flat();
      const { groups: plainGroups } = await httpClient.post(
        url`/v2/c/groups/find`,
        await authManager.getAuthValue({
          requestedScope: "comments:read"
        }),
        { groupIds }
      );
      const groups = /* @__PURE__ */ new Map();
      for (const group of plainGroups) {
        groups.set(group.id, convertToGroupData(group));
      }
      return groupIds.map((groupId) => groups.get(groupId));
    },
    { delay: 50 }
  );
  const groupsStore = createBatchStore(batchedGetGroups);
  function getGroup(groupId) {
    return batchedGetGroups.get(groupId);
  }
  __name(getGroup, "getGroup");
  async function getUrlMetadata(_url) {
    const { metadata: metadata2 } = await httpClient.get(
      url`/v2/c/urls/metadata`,
      await authManager.getAuthValue({ requestedScope: "comments:read" }),
      { url: _url }
    );
    return metadata2;
  }
  __name(getUrlMetadata, "getUrlMetadata");
  return {
    // Room threads
    getThreads,
    getThreadsSince,
    searchComments,
    createThread,
    getThread,
    deleteThread,
    editThreadMetadata,
    createComment,
    editComment,
    editCommentMetadata,
    deleteComment,
    addReaction,
    removeReaction,
    markThreadAsResolved,
    markThreadAsUnresolved,
    subscribeToThread,
    unsubscribeFromThread,
    markRoomInboxNotificationAsRead,
    // Room subscription settings
    getSubscriptionSettings,
    updateSubscriptionSettings,
    // Room text editor
    createTextMention,
    deleteTextMention,
    getTextVersion,
    createTextVersion,
    reportTextEditor,
    listTextVersions,
    listTextVersionsSince,
    // Room attachments
    getAttachmentUrl,
    uploadAttachment,
    getOrCreateAttachmentUrlsStore,
    // User attachments
    uploadChatAttachment,
    getOrCreateChatAttachmentUrlsStore,
    getChatAttachmentUrl,
    // Room storage
    streamStorage,
    // Notifications
    getInboxNotifications,
    getInboxNotificationsSince,
    getUnreadInboxNotificationsCount,
    markAllInboxNotificationsAsRead,
    markInboxNotificationAsRead,
    deleteAllInboxNotifications,
    deleteInboxNotification,
    getNotificationSettings,
    updateNotificationSettings,
    // User threads
    getUserThreads_experimental,
    getUserThreadsSince_experimental,
    // Groups
    groupsStore,
    getGroup,
    // AI
    executeContextualPrompt,
    // URL metadata
    getUrlMetadata
  };
}
__name(createApiClient, "createApiClient");
function getBearerTokenFromAuthValue(authValue) {
  if (authValue.type === "public") {
    return authValue.publicApiKey;
  } else {
    return authValue.token.raw;
  }
}
__name(getBearerTokenFromAuthValue, "getBearerTokenFromAuthValue");
var HttpClient = class {
  static {
    __name(this, "HttpClient");
  }
  #baseUrl;
  #fetchPolyfill;
  constructor(baseUrl, fetchPolyfill2) {
    this.#baseUrl = baseUrl;
    this.#fetchPolyfill = fetchPolyfill2;
  }
  // ------------------------------------------------------------------
  // Public methods
  // ------------------------------------------------------------------
  /**
   * Constructs and makes the HTTP request, but does not handle the response.
   *
   * This is what .rawFetch() does:    👈 This method!
   *   1. Set Content-Type header
   *   2. Set Authorization header
   *   3. Call the callback to obtain the `authValue` to use in the Authorization header
   *
   * This is what .fetch() does ON TOP of that:
   *   4. Parse response body as Json
   *   5. ...but silently return `{}` if that parsing fails
   *   6. Throw HttpError if response is an error
   */
  async #rawFetch(endpoint, authValue, options2, params) {
    if (!endpoint.startsWith("/v2/c/")) {
      raise("This client can only be used to make /v2/c/* requests");
    }
    const url2 = urljoin(this.#baseUrl, endpoint, params);
    const response = await this.#fetchPolyfill(url2, {
      ...options2,
      headers: {
        // These headers are default, but can be overriden by custom headers
        "Content-Type": "application/json; charset=utf-8",
        // Possible header overrides
        ...options2?.headers,
        // Cannot be overriden by custom headers
        Authorization: `Bearer ${getBearerTokenFromAuthValue(authValue)}`,
        "X-LB-Client": PKG_VERSION || "dev"
      }
    });
    const xwarn2 = response.headers.get("X-LB-Warn");
    if (xwarn2) {
      const method = options2?.method?.toUpperCase() ?? "GET";
      const msg = `${xwarn2} (${method} ${endpoint})`;
      if (response.ok) {
        warn(msg);
      } else {
        error2(msg);
      }
    }
    return response;
  }
  /**
   * Constructs, makes the HTTP request, and handles the response by parsing
   * JSON and/or throwing an HttpError if it failed.
   *
   * This is what .rawFetch() does:
   *   1. Set Content-Type header
   *   2. Set Authorization header
   *   3. Call the callback to obtain the `authValue` to use in the Authorization header
   *
   * This is what .fetch() does ON TOP of that:   👈 This method!
   *   4. Parse response body as Json
   *   5. ...but silently return `{}` if that parsing fails (🤔)
   *   6. Throw HttpError if response is an error
   */
  async #fetch(endpoint, authValue, options2, params) {
    const response = await this.#rawFetch(endpoint, authValue, options2, params);
    if (!response.ok) {
      throw await HttpError.fromResponse(response);
    }
    let body;
    try {
      body = await response.json();
    } catch {
      body = {};
    }
    return body;
  }
  /**
   * Makes a GET request and returns the raw response.
   * Won't throw if the reponse is a non-2xx.
   * @deprecated Ideally, use .get() instead.
   */
  async rawGet(endpoint, authValue, params, options2) {
    return await this.#rawFetch(endpoint, authValue, options2, params);
  }
  /**
   * Makes a POST request and returns the raw response.
   * Won't throw if the reponse is a non-2xx.
   * @deprecated Ideally, use .post() instead.
   */
  async rawPost(endpoint, authValue, body) {
    return await this.#rawFetch(endpoint, authValue, {
      method: "POST",
      body: stringifyOrLog(body)
    });
  }
  /**
   * Makes a DELETE request and returns the raw response.
   * Won't throw if the reponse is a non-2xx.
   * @deprecated Ideally, use .delete() instead.
   */
  async rawDelete(endpoint, authValue) {
    return await this.#rawFetch(endpoint, authValue, { method: "DELETE" });
  }
  /**
   * Makes a GET request, and return the JSON response.
   * Will throw if the reponse is a non-2xx.
   */
  async get(endpoint, authValue, params, options2) {
    return await this.#fetch(endpoint, authValue, options2, params);
  }
  /**
   * Makes a POST request, and return the JSON response.
   * Will throw if the reponse is a non-2xx.
   */
  async post(endpoint, authValue, body, options2, params) {
    return await this.#fetch(
      endpoint,
      authValue,
      {
        ...options2,
        method: "POST",
        body: stringifyOrLog(body)
      },
      params
    );
  }
  /**
   * Makes a DELETE request, and return the JSON response.
   * Will throw if the reponse is a non-2xx.
   */
  async delete(endpoint, authValue) {
    return await this.#fetch(endpoint, authValue, { method: "DELETE" });
  }
  /**
   * Makes a PUT request for a Blob body, and return the JSON response.
   * Will throw if the reponse is a non-2xx.
   */
  async putBlob(endpoint, authValue, blob, params, options2) {
    return await this.#fetch(
      endpoint,
      authValue,
      {
        ...options2,
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream"
        },
        body: blob
      },
      params
    );
  }
};
function distance(state1, state2) {
  if (state1 === state2) {
    return [0, 0];
  }
  const chunks1 = state1.split(".");
  const chunks2 = state2.split(".");
  const minLen = Math.min(chunks1.length, chunks2.length);
  let shared = 0;
  for (; shared < minLen; shared++) {
    if (chunks1[shared] !== chunks2[shared]) {
      break;
    }
  }
  const up = chunks1.length - shared;
  const down = chunks2.length - shared;
  return [up, down];
}
__name(distance, "distance");
function patterns(targetState, levels) {
  const parts = targetState.split(".");
  if (levels < 1 || levels > parts.length + 1) {
    throw new Error("Invalid number of levels");
  }
  const result = [];
  if (levels > parts.length) {
    result.push("*");
  }
  for (let i = parts.length - levels + 1; i < parts.length; i++) {
    const slice = parts.slice(0, i);
    if (slice.length > 0) {
      result.push(slice.join(".") + ".*");
    }
  }
  result.push(targetState);
  return result;
}
__name(patterns, "patterns");
var SafeContext = class {
  static {
    __name(this, "SafeContext");
  }
  #curr;
  constructor(initialContext) {
    this.#curr = initialContext;
  }
  get current() {
    return this.#curr;
  }
  /**
   * Call a callback function that allows patching of the context, by
   * calling `context.patch()`. Patching is only allowed for the duration
   * of this window.
   */
  allowPatching(callback) {
    const self = this;
    let allowed = true;
    const patchableContext = {
      ...this.#curr,
      patch(patch) {
        if (allowed) {
          self.#curr = Object.assign({}, self.#curr, patch);
          for (const pair of Object.entries(patch)) {
            const [key, value] = pair;
            if (key !== "patch") {
              this[key] = value;
            }
          }
        } else {
          throw new Error("Can no longer patch stale context");
        }
      }
    };
    callback(patchableContext);
    allowed = false;
    return;
  }
};
var nextId = 1;
var FSM = class {
  static {
    __name(this, "FSM");
  }
  id;
  // Indicates whether this state machine is still being configured, has
  // started, or has terminated
  #runningState;
  #currentContext;
  #states;
  #currentStateOrNull;
  #allowedTransitions;
  #eventHub;
  events;
  //
  // The cleanup stack is a stack of (optional) callback functions that will
  // be run when exiting the current state. If a state (or state group) does
  // not have an exit handler, then the entry for that level may be
  // `undefined`, but there will be an explicit entry in the stack for it.
  //
  // This will always be true:
  //
  //   cleanupStack.length == currentState.split('.').length + 1
  //
  // Each stack level represents a different state "group".
  //
  // For example, if you are in a state named `foo.bar.qux`, then the stack
  // will contain the exit handler for `foo.bar.qux` (at the top), then
  // `foo.bar.*`, then `foo.*`, and finally, `*`.
  //
  #cleanupStack;
  //
  // The entry times stack tracks when each state level was entered, using
  // performance.now() timestamps. This parallels the cleanup stack structure.
  //
  // For example, if you are in state `foo.bar.qux`, the stack contains:
  // [timestamp for *, timestamp for foo.*, timestamp for foo.bar.*, timestamp for foo.bar.qux]
  //
  #entryTimesStack;
  #enterFns;
  // Used to provide better error messages
  #knownEventTypes;
  /**
   * Returns the initial state, which is defined by the first call made to
   * .addState().
   */
  get #initialState() {
    const result = this.#states.values()[Symbol.iterator]().next();
    if (result.done) {
      throw new Error("No states defined yet");
    } else {
      return result.value;
    }
  }
  get currentState() {
    if (this.#currentStateOrNull === null) {
      if (this.#runningState === 0) {
        throw new Error("Not started yet");
      } else {
        throw new Error("Already stopped");
      }
    }
    return this.#currentStateOrNull;
  }
  /**
   * Starts the machine by entering the initial state.
   */
  start() {
    if (this.#runningState !== 0) {
      throw new Error("State machine has already started");
    }
    this.#runningState = 1;
    this.#currentStateOrNull = this.#initialState;
    this.#enter(null);
    return this;
  }
  /**
   * Stops the state machine. Stopping the state machine will call exit
   * handlers for the current state, but not enter a new state.
   */
  stop() {
    if (this.#runningState !== 1) {
      throw new Error("Cannot stop a state machine that hasn't started yet");
    }
    this.#exit(null);
    this.#runningState = 2;
    this.#currentStateOrNull = null;
  }
  constructor(initialContext) {
    this.id = nextId++;
    this.#runningState = 0;
    this.#currentStateOrNull = null;
    this.#states = /* @__PURE__ */ new Set();
    this.#enterFns = /* @__PURE__ */ new Map();
    this.#cleanupStack = [];
    this.#entryTimesStack = [];
    this.#knownEventTypes = /* @__PURE__ */ new Set();
    this.#allowedTransitions = /* @__PURE__ */ new Map();
    this.#currentContext = new SafeContext(initialContext);
    this.#eventHub = {
      didReceiveEvent: makeEventSource(),
      willTransition: makeEventSource(),
      didIgnoreEvent: makeEventSource(),
      willExitState: makeEventSource(),
      didEnterState: makeEventSource(),
      didExitState: makeEventSource()
    };
    this.events = {
      didReceiveEvent: this.#eventHub.didReceiveEvent.observable,
      willTransition: this.#eventHub.willTransition.observable,
      didIgnoreEvent: this.#eventHub.didIgnoreEvent.observable,
      willExitState: this.#eventHub.willExitState.observable,
      didEnterState: this.#eventHub.didEnterState.observable,
      didExitState: this.#eventHub.didExitState.observable
    };
  }
  get context() {
    return this.#currentContext.current;
  }
  /**
   * Define an explicit finite state in the state machine.
   */
  addState(state) {
    if (this.#runningState !== 0) {
      throw new Error("Already started");
    }
    this.#states.add(state);
    return this;
  }
  onEnter(nameOrPattern, enterFn) {
    if (this.#runningState !== 0) {
      throw new Error("Already started");
    } else if (this.#enterFns.has(nameOrPattern)) {
      throw new Error(
        // TODO We _currently_ don't support multiple .onEnters() for the same
        // state, but this is not a fundamental limitation. Just not
        // implemented yet. If we wanted to, we could make this an array.
        `enter/exit function for ${nameOrPattern} already exists`
      );
    }
    this.#enterFns.set(nameOrPattern, enterFn);
    return this;
  }
  /**
   * Defines a promise-based state. When the state is entered, the promise is
   * created. When the promise resolves, the machine will transition to the
   * provided `onOK` target state. When the promise rejects, the machine will
   * transition to the `onError` target state.
   *
   * Optionally, a `maxTimeout` can be set. If the timeout happens before the
   * promise is settled, then the machine will also transition to the `onError`
   * target state.
   *
   * @param stateOrPattern  The state name, or state group pattern name.
   * @param promiseFn       The callback to be invoked when the state is entered.
   * @param onOK            The state to transition to when the promise resolves.
   * @param onError         The state to transition to when the promise
   *                        rejects, or when the timeout happens before the
   *                        promise has been settled.
   * @param maxTimeout      Optional timeout in milliseconds.
   *
   * When the promise callback function is invoked, it's provided with an
   * AbortSignal (2nd argument).
   * If a state transition happens while the promise is pending (for example,
   * an event, or a timeout happens), then an abort signal will be used to
   * indicate this. Implementers can use this abort signal to terminate the
   * in-flight promise, or ignore its results, etc.
   */
  onEnterAsync(nameOrPattern, promiseFn, onOK, onError, maxTimeout) {
    return this.onEnter(nameOrPattern, () => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      const timeoutId = maxTimeout ? setTimeout(() => {
        const reason = new Error("Timed out");
        this.#transition({ type: "ASYNC_ERROR", reason }, onError);
      }, maxTimeout) : void 0;
      let done = false;
      void promiseFn(this.#currentContext.current, signal).then(
        // On OK
        (data) => {
          if (!signal.aborted) {
            done = true;
            this.#transition({ type: "ASYNC_OK", data }, onOK);
          }
        },
        // On Error
        (reason) => {
          if (!signal.aborted) {
            done = true;
            this.#transition({ type: "ASYNC_ERROR", reason }, onError);
          }
        }
      );
      return () => {
        clearTimeout(timeoutId);
        if (!done) {
          abortController.abort();
        }
      };
    });
  }
  #getStatesMatching(nameOrPattern) {
    const matches = [];
    if (nameOrPattern === "*") {
      for (const state of this.#states) {
        matches.push(state);
      }
    } else if (nameOrPattern.endsWith(".*")) {
      const prefix = nameOrPattern.slice(0, -1);
      for (const state of this.#states) {
        if (state.startsWith(prefix)) {
          matches.push(state);
        }
      }
    } else {
      const name = nameOrPattern;
      if (this.#states.has(name)) {
        matches.push(name);
      }
    }
    if (matches.length === 0) {
      throw new Error(`No states match ${JSON.stringify(nameOrPattern)}`);
    }
    return matches;
  }
  /**
   * Define all allowed outgoing transitions for a state.
   *
   * The targets for each event can be defined as a function which returns the
   * next state to transition to. These functions can look at the `event` or
   * `context` params to conditionally decide which next state to transition
   * to.
   *
   * If you set it to `null`, then the transition will be explicitly forbidden
   * and throw an error. If you don't define a target for a transition, then
   * such events will get ignored.
   */
  addTransitions(nameOrPattern, mapping) {
    if (this.#runningState !== 0) {
      throw new Error("Already started");
    }
    for (const srcState of this.#getStatesMatching(nameOrPattern)) {
      let map = this.#allowedTransitions.get(srcState);
      if (map === void 0) {
        map = /* @__PURE__ */ new Map();
        this.#allowedTransitions.set(srcState, map);
      }
      for (const [type, target_] of Object.entries(mapping)) {
        if (map.has(type)) {
          throw new Error(
            `Trying to set transition "${type}" on "${srcState}" (via "${nameOrPattern}"), but a transition already exists there.`
          );
        }
        const target = target_;
        this.#knownEventTypes.add(type);
        if (target !== void 0) {
          const targetFn = typeof target === "function" ? target : () => target;
          map.set(type, targetFn);
        }
      }
    }
    return this;
  }
  /**
   * Like `.addTransition()`, but takes an (anonymous) transition whenever the
   * timer fires.
   *
   * @param stateOrPattern  The state name, or state group pattern name.
   * @param after           Number of milliseconds after which to take the
   *                        transition. If in the mean time, another transition
   *                        is taken, the timer will get cancelled.
   * @param target          The target state to go to.
   */
  addTimedTransition(stateOrPattern, after2, target) {
    return this.onEnter(stateOrPattern, () => {
      const ms = typeof after2 === "function" ? after2(this.#currentContext.current) : after2;
      const timeoutID = setTimeout(() => {
        this.#transition({ type: "TIMER" }, target);
      }, ms);
      return () => {
        clearTimeout(timeoutID);
      };
    });
  }
  #getTargetFn(eventName) {
    return this.#allowedTransitions.get(this.currentState)?.get(eventName);
  }
  /**
   * Exits the current state, and executes any necessary cleanup functions.
   * Call this before changing the current state to the next state.
   *
   * @param levels Defines how many "levels" of nesting will be
   * exited. For example, if you transition from `foo.bar.qux` to
   * `foo.bar.baz`, then the level is 1. But if you transition from
   * `foo.bar.qux` to `bla.bla`, then the level is 3.
   * If `null`, it will exit all levels.
   */
  #exit(levels) {
    this.#eventHub.willExitState.notify(this.currentState);
    const now2 = performance.now();
    const parts = this.currentState.split(".");
    this.#currentContext.allowPatching((patchableContext) => {
      levels = levels ?? this.#cleanupStack.length;
      for (let i = 0; i < levels; i++) {
        this.#cleanupStack.pop()?.(patchableContext);
        const entryTime = this.#entryTimesStack.pop();
        if (entryTime !== void 0 && // ...but avoid computing state names if nobody is listening
        this.#eventHub.didExitState.count() > 0) {
          const depth = this.#entryTimesStack.length;
          if (depth === 0) continue;
          const state = depth === parts.length ? this.currentState : `${parts.slice(0, depth).join(".")}.*`;
          this.#eventHub.didExitState.notify({
            state,
            durationMs: now2 - entryTime
          });
        }
      }
    });
  }
  /**
   * Enters the current state, and executes any necessary onEnter handlers.
   * Call this directly _after_ setting the current state to the next state.
   */
  #enter(levels) {
    const enterPatterns = patterns(
      this.currentState,
      levels ?? this.currentState.split(".").length + 1
    );
    const now2 = performance.now();
    this.#currentContext.allowPatching((patchableContext) => {
      for (const pattern of enterPatterns) {
        const enterFn = this.#enterFns.get(pattern);
        const cleanupFn = enterFn?.(patchableContext);
        if (typeof cleanupFn === "function") {
          this.#cleanupStack.push(cleanupFn);
        } else {
          this.#cleanupStack.push(null);
        }
        this.#entryTimesStack.push(now2);
      }
    });
    this.#eventHub.didEnterState.notify(this.currentState);
  }
  /**
   * Sends an event to the machine, which may cause an internal state
   * transition to happen. When that happens, will trigger side effects.
   */
  send(event) {
    if (!this.#knownEventTypes.has(event.type)) {
      throw new Error(`Invalid event ${JSON.stringify(event.type)}`);
    }
    if (this.#runningState === 2) {
      return;
    }
    const targetFn = this.#getTargetFn(event.type);
    if (targetFn !== void 0) {
      return this.#transition(event, targetFn);
    } else {
      this.#eventHub.didIgnoreEvent.notify(event);
    }
  }
  #transition(event, target) {
    this.#eventHub.didReceiveEvent.notify(event);
    const oldState = this.currentState;
    const targetFn = typeof target === "function" ? target : () => target;
    const nextTarget = targetFn(event, this.#currentContext.current);
    let nextState;
    let effects = void 0;
    if (nextTarget === null) {
      this.#eventHub.didIgnoreEvent.notify(event);
      return;
    }
    if (typeof nextTarget === "string") {
      nextState = nextTarget;
    } else {
      nextState = nextTarget.target;
      effects = Array.isArray(nextTarget.effect) ? nextTarget.effect : [nextTarget.effect];
    }
    if (!this.#states.has(nextState)) {
      throw new Error(`Invalid next state name: ${JSON.stringify(nextState)}`);
    }
    this.#eventHub.willTransition.notify({ from: oldState, to: nextState });
    const [up, down] = distance(this.currentState, nextState);
    if (up > 0) {
      this.#exit(up);
    }
    this.#currentStateOrNull = nextState;
    if (effects !== void 0) {
      const effectsToRun = effects;
      this.#currentContext.allowPatching((patchableContext) => {
        for (const effect of effectsToRun) {
          if (typeof effect === "function") {
            effect(patchableContext, event);
          } else {
            patchableContext.patch(effect);
          }
        }
      });
    }
    if (down > 0) {
      this.#enter(down);
    }
  }
};
var ServerMsgCode = Object.freeze({
  // For Presence
  UPDATE_PRESENCE: 100,
  USER_JOINED: 101,
  USER_LEFT: 102,
  BROADCASTED_EVENT: 103,
  ROOM_STATE: 104,
  // For Storage
  STORAGE_STATE_V7: 200,
  // Only sent in V7
  STORAGE_CHUNK: 210,
  // Used in V8+
  STORAGE_STREAM_END: 211,
  // Used in V8+
  UPDATE_STORAGE: 201,
  // For Yjs Docs
  UPDATE_YDOC: 300,
  // For Comments
  THREAD_CREATED: 400,
  THREAD_DELETED: 407,
  THREAD_METADATA_UPDATED: 401,
  THREAD_UPDATED: 408,
  COMMENT_CREATED: 402,
  COMMENT_EDITED: 403,
  COMMENT_DELETED: 404,
  COMMENT_REACTION_ADDED: 405,
  COMMENT_REACTION_REMOVED: 406,
  COMMENT_METADATA_UPDATED: 409,
  // For Feeds
  FEEDS_LIST: 500,
  FEEDS_ADDED: 501,
  FEEDS_UPDATED: 502,
  FEED_DELETED: 503,
  FEED_MESSAGES_LIST: 504,
  FEED_MESSAGES_ADDED: 505,
  FEED_MESSAGES_UPDATED: 506,
  FEED_MESSAGES_DELETED: 507,
  FEED_REQUEST_FAILED: 508,
  // Error codes
  REJECT_STORAGE_OP: 299
  // Sent if a mutation was not allowed on the server (i.e. due to permissions, limit exceeded, etc)
});
function shouldDisconnect(code) {
  return code === 4999 || code >= 4e3 && code < 4100;
}
__name(shouldDisconnect, "shouldDisconnect");
function shouldReauth(code) {
  return code >= 4100 && code < 4200;
}
__name(shouldReauth, "shouldReauth");
function shouldRetryWithoutReauth(code) {
  return code === 1013 || code >= 4200 && code < 4300;
}
__name(shouldRetryWithoutReauth, "shouldRetryWithoutReauth");
function isIdle(status) {
  return status === "initial" || status === "disconnected";
}
__name(isIdle, "isIdle");
function toNewConnectionStatus(machine) {
  const state = machine.currentState;
  switch (state) {
    case "@ok.connected":
    case "@ok.awaiting-pong":
      return "connected";
    case "@idle.initial":
      return "initial";
    case "@auth.busy":
    case "@auth.backoff":
    case "@connecting.busy":
    case "@connecting.backoff":
    case "@idle.zombie":
      return machine.context.successCount > 0 ? "reconnecting" : "connecting";
    case "@idle.failed":
      return "disconnected";
    // istanbul ignore next
    default:
      return assertNever(state, "Unknown state");
  }
}
__name(toNewConnectionStatus, "toNewConnectionStatus");
var BACKOFF_DELAYS = [250, 500, 1e3, 2e3, 4e3, 8e3, 1e4];
var RESET_DELAY = BACKOFF_DELAYS[0] - 1;
var BACKOFF_DELAYS_SLOW = [2e3, 3e4, 6e4, 3e5];
var HEARTBEAT_INTERVAL = 3e4;
var PONG_TIMEOUT = 2e3;
var AUTH_TIMEOUT = 1e4;
var SOCKET_CONNECT_TIMEOUT = 2e4;
var StopRetrying = class extends Error {
  static {
    __name(this, "StopRetrying");
  }
  constructor(reason) {
    super(reason);
  }
};
function nextBackoffDelay(currentDelay, delays) {
  return delays.find((delay) => delay > currentDelay) ?? delays[delays.length - 1];
}
__name(nextBackoffDelay, "nextBackoffDelay");
function increaseBackoffDelay(context) {
  context.patch({
    backoffDelay: nextBackoffDelay(context.backoffDelay, BACKOFF_DELAYS)
  });
}
__name(increaseBackoffDelay, "increaseBackoffDelay");
function increaseBackoffDelayAggressively(context) {
  context.patch({
    backoffDelay: nextBackoffDelay(context.backoffDelay, BACKOFF_DELAYS_SLOW)
  });
}
__name(increaseBackoffDelayAggressively, "increaseBackoffDelayAggressively");
function resetSuccessCount(context) {
  context.patch({ successCount: 0 });
}
__name(resetSuccessCount, "resetSuccessCount");
function log(level, message) {
  const logger = level === 2 ? error2 : level === 1 ? warn : (
    /* black hole */
    () => {
    }
  );
  return () => {
    logger(message);
  };
}
__name(log, "log");
function logPrematureErrorOrCloseEvent(e) {
  const conn = "Connection to Liveblocks websocket server";
  return (ctx) => {
    if (isCloseEvent(e)) {
      warn(
        `${conn} closed prematurely (code: ${e.code}). Retrying in ${ctx.backoffDelay}ms.`
      );
    } else {
      warn(`${conn} could not be established.`, e);
    }
  };
}
__name(logPrematureErrorOrCloseEvent, "logPrematureErrorOrCloseEvent");
function logCloseEvent(event) {
  const details = [`code: ${event.code}`];
  if (event.reason) {
    details.push(`reason: ${event.reason}`);
  }
  return (ctx) => {
    warn(
      `Connection to Liveblocks websocket server closed (${details.join(", ")}). Retrying in ${ctx.backoffDelay}ms.`
    );
  };
}
__name(logCloseEvent, "logCloseEvent");
var logPermanentClose = log(
  1,
  "Connection to WebSocket closed permanently. Won't retry."
);
function isCloseEvent(error3) {
  return !(error3 instanceof Error) && error3.type === "close";
}
__name(isCloseEvent, "isCloseEvent");
function enableTracing(machine) {
  function log2(...args) {
    warn(`[FSM #${machine.id}]`, ...args);
  }
  __name(log2, "log2");
  const unsubs = [
    machine.events.didReceiveEvent.subscribe((e) => log2(`Event ${e.type}`)),
    machine.events.willTransition.subscribe(
      ({ from, to }) => log2("Transitioning", from, "→", to)
    ),
    machine.events.didExitState.subscribe(
      ({ state, durationMs }) => log2(`Exited ${state} after ${durationMs.toFixed(0)}ms`)
    ),
    machine.events.didIgnoreEvent.subscribe(
      (e) => log2("Ignored event", e.type, e, "(current state won't handle it)")
    )
  ];
  return () => {
    for (const unsub of unsubs) {
      unsub();
    }
  };
}
__name(enableTracing, "enableTracing");
function defineConnectivityEvents(machine) {
  const statusDidChange = makeEventSource();
  const didConnect = makeEventSource();
  const didDisconnect = makeEventSource();
  let lastStatus = null;
  const unsubscribe = machine.events.didEnterState.subscribe(() => {
    const currStatus = toNewConnectionStatus(machine);
    if (currStatus !== lastStatus) {
      statusDidChange.notify(currStatus);
    }
    if (lastStatus === "connected" && currStatus !== "connected") {
      didDisconnect.notify();
    } else if (lastStatus !== "connected" && currStatus === "connected") {
      didConnect.notify();
    }
    lastStatus = currStatus;
  });
  return {
    statusDidChange: statusDidChange.observable,
    didConnect: didConnect.observable,
    didDisconnect: didDisconnect.observable,
    unsubscribe
  };
}
__name(defineConnectivityEvents, "defineConnectivityEvents");
var assign = /* @__PURE__ */ __name((patch) => (ctx) => ctx.patch(patch), "assign");
function createConnectionStateMachine(delegates, options2) {
  const onMessage = makeBufferableEventSource();
  onMessage.pause();
  const onConnectionError = makeEventSource();
  function fireErrorEvent(message, code) {
    return () => {
      onConnectionError.notify({ message, code });
    };
  }
  __name(fireErrorEvent, "fireErrorEvent");
  const initialContext = {
    successCount: 0,
    authValue: null,
    socket: null,
    backoffDelay: RESET_DELAY
  };
  const machine = new FSM(initialContext).addState("@idle.initial").addState("@idle.failed").addState("@idle.zombie").addState("@auth.busy").addState("@auth.backoff").addState("@connecting.busy").addState("@connecting.backoff").addState("@ok.connected").addState("@ok.awaiting-pong");
  machine.addTransitions("*", {
    RECONNECT: {
      target: "@auth.backoff",
      effect: [increaseBackoffDelay, resetSuccessCount]
    },
    DISCONNECT: "@idle.initial"
  });
  machine.onEnter("@idle.*", resetSuccessCount).addTransitions("@idle.*", {
    CONNECT: /* @__PURE__ */ __name((_, ctx) => (
      // If we still have a known authValue, try to reconnect to the socket directly,
      // otherwise, try to obtain a new authValue
      ctx.authValue !== null ? "@connecting.busy" : "@auth.busy"
    ), "CONNECT")
  });
  machine.addTransitions("@auth.backoff", {
    NAVIGATOR_ONLINE: {
      target: "@auth.busy",
      effect: assign({ backoffDelay: RESET_DELAY })
    }
  }).addTimedTransition(
    "@auth.backoff",
    (ctx) => ctx.backoffDelay,
    "@auth.busy"
  ).onEnterAsync(
    "@auth.busy",
    () => withTimeout(
      delegates.authenticate(),
      AUTH_TIMEOUT,
      "Timed out during auth"
    ),
    // On successful authentication
    (okEvent) => ({
      target: "@connecting.busy",
      effect: assign({
        authValue: okEvent.data
      })
    }),
    // Auth failed
    (failedEvent) => {
      if (failedEvent.reason instanceof StopRetrying) {
        return {
          target: "@idle.failed",
          effect: [
            log(2, failedEvent.reason.message),
            fireErrorEvent(failedEvent.reason.message, -1)
          ]
        };
      }
      return {
        target: "@auth.backoff",
        effect: [
          increaseBackoffDelay,
          log(
            2,
            `Authentication failed: ${failedEvent.reason instanceof Error ? failedEvent.reason.message : String(failedEvent.reason)}`
          )
        ]
      };
    }
  );
  const onSocketError = /* @__PURE__ */ __name((event) => machine.send({ type: "EXPLICIT_SOCKET_ERROR", event }), "onSocketError");
  const onSocketClose = /* @__PURE__ */ __name((event) => machine.send({ type: "EXPLICIT_SOCKET_CLOSE", event }), "onSocketClose");
  const onSocketMessage = /* @__PURE__ */ __name((event) => event.data === "pong" ? machine.send({ type: "PONG" }) : onMessage.notify(event), "onSocketMessage");
  function teardownSocket(socket) {
    if (socket) {
      socket.removeEventListener("error", onSocketError);
      socket.removeEventListener("close", onSocketClose);
      socket.removeEventListener("message", onSocketMessage);
      socket.close();
    }
  }
  __name(teardownSocket, "teardownSocket");
  machine.addTransitions("@connecting.backoff", {
    NAVIGATOR_ONLINE: {
      target: "@connecting.busy",
      effect: assign({ backoffDelay: RESET_DELAY })
    }
  }).addTimedTransition(
    "@connecting.backoff",
    (ctx) => ctx.backoffDelay,
    "@connecting.busy"
  ).onEnterAsync(
    "@connecting.busy",
    //
    // Use the "createSocket" delegate function (provided to the
    // ManagedSocket) to create the actual WebSocket connection instance.
    // Then, set up all the necessary event listeners, and wait for the
    // "open" event to occur.
    //
    // When the "open" event happens, we're ready to transition to the
    // OK state. This is done by resolving the Promise.
    //
    async (ctx, signal) => {
      const socketEpoch = performance.now();
      let socketOpenAt = null;
      let capturedPrematureEvent = null;
      let unconfirmedSocket = null;
      const connect$ = new Promise(
        (resolve, rej) => {
          if (ctx.authValue === null) {
            throw new Error("No auth authValue");
          }
          const socket = delegates.createSocket(ctx.authValue);
          unconfirmedSocket = socket;
          function reject(event) {
            capturedPrematureEvent = event;
            socket.removeEventListener("message", onSocketMessage);
            rej(event);
          }
          __name(reject, "reject");
          const [actor$, didReceiveActor] = controlledPromise();
          if (!options2.waitForActorId) {
            didReceiveActor();
          }
          function waitForActorId(event) {
            const serverMsg = tryParseJson(event.data);
            if (serverMsg?.type === ServerMsgCode.ROOM_STATE) {
              if (options2.enableDebugLogging && socketOpenAt !== null) {
                const elapsed = performance.now() - socketOpenAt;
                warn(
                  `[FSM #${machine.id}] Socket open → ROOM_STATE: ${elapsed.toFixed(0)}ms`
                );
              }
              didReceiveActor();
            }
          }
          __name(waitForActorId, "waitForActorId");
          socket.addEventListener("message", onSocketMessage);
          if (options2.waitForActorId) {
            socket.addEventListener("message", waitForActorId);
          }
          socket.addEventListener("error", reject);
          socket.addEventListener("close", reject);
          socket.addEventListener("open", () => {
            socketOpenAt = performance.now();
            if (options2.enableDebugLogging) {
              const elapsed = socketOpenAt - socketEpoch;
              warn(
                `[FSM #${machine.id}] Socket epoch → open: ${elapsed.toFixed(0)}ms`
              );
            }
            socket.addEventListener("error", onSocketError);
            socket.addEventListener("close", onSocketClose);
            const unsub = /* @__PURE__ */ __name(() => {
              socket.removeEventListener("error", reject);
              socket.removeEventListener("close", reject);
              socket.removeEventListener("message", waitForActorId);
            }, "unsub");
            void actor$.then(() => {
              resolve([socket, unsub]);
            });
          });
        }
      );
      return withTimeout(
        connect$,
        SOCKET_CONNECT_TIMEOUT,
        "Timed out during websocket connection"
      ).then(
        //
        // Part 3:
        // By now, our "open" event has fired, and the promise has been
        // resolved. Two possible scenarios:
        //
        // 1. The happy path. Most likely.
        // 2. Uh-oh. A premature close/error event has been observed. Let's
        //    reject the promise after all.
        //
        // Any close/error event that will get scheduled after this point
        // onwards, will be caught in the OK state, and dealt with
        // accordingly.
        //
        ([socket, unsub]) => {
          unsub();
          if (signal.aborted) {
            throw new Error("Aborted");
          }
          if (capturedPrematureEvent) {
            throw capturedPrematureEvent;
          }
          return socket;
        }
      ).catch((e) => {
        teardownSocket(unconfirmedSocket);
        throw e;
      });
    },
    // Only transition to OK state after a successfully opened WebSocket connection
    (okEvent) => ({
      target: "@ok.connected",
      effect: assign({
        socket: okEvent.data,
        backoffDelay: RESET_DELAY
      })
    }),
    // If the WebSocket connection cannot be established
    (failure) => {
      const err = failure.reason;
      if (err instanceof StopRetrying) {
        return {
          target: "@idle.failed",
          effect: [
            log(2, err.message),
            fireErrorEvent(err.message, -1)
          ]
        };
      }
      if (isCloseEvent(err)) {
        if (err.code === 4109) {
          return "@auth.busy";
        }
        if (shouldRetryWithoutReauth(err.code)) {
          return {
            target: "@connecting.backoff",
            effect: [
              increaseBackoffDelayAggressively,
              logPrematureErrorOrCloseEvent(err)
            ]
          };
        }
        if (shouldDisconnect(err.code)) {
          return {
            target: "@idle.failed",
            effect: [
              log(2, err.reason),
              fireErrorEvent(err.reason, err.code)
            ]
          };
        }
      }
      return {
        target: "@auth.backoff",
        effect: [increaseBackoffDelay, logPrematureErrorOrCloseEvent(err)]
      };
    }
  );
  const sendHeartbeat = {
    target: "@ok.awaiting-pong",
    effect: /* @__PURE__ */ __name((ctx) => {
      ctx.socket?.send("ping");
    }, "effect")
  };
  const maybeHeartbeat = /* @__PURE__ */ __name(() => {
    const doc = typeof document !== "undefined" ? document : void 0;
    const canZombie = doc?.visibilityState === "hidden" && delegates.canZombie();
    return canZombie ? "@idle.zombie" : sendHeartbeat;
  }, "maybeHeartbeat");
  machine.addTimedTransition("@ok.connected", HEARTBEAT_INTERVAL, maybeHeartbeat).addTransitions("@ok.connected", {
    NAVIGATOR_OFFLINE: maybeHeartbeat,
    // Don't take the browser's word for it when it says it's offline. Do a ping/pong to make sure.
    WINDOW_GOT_FOCUS: sendHeartbeat
  });
  machine.addTransitions("@idle.zombie", {
    WINDOW_GOT_FOCUS: "@connecting.backoff"
    // When in zombie state, the client will try to wake up automatically when the window regains focus
  });
  machine.onEnter("@ok.*", (ctx) => {
    ctx.patch({ successCount: ctx.successCount + 1 });
    const timerID = setTimeout(
      // On the next tick, start delivering all messages that have already
      // been received, and continue synchronous delivery of all future
      // incoming messages.
      onMessage.unpause,
      0
    );
    return (ctx2) => {
      teardownSocket(ctx2.socket);
      ctx2.patch({ socket: null });
      clearTimeout(timerID);
      onMessage.pause();
    };
  }).addTransitions("@ok.awaiting-pong", { PONG: "@ok.connected" }).addTimedTransition("@ok.awaiting-pong", PONG_TIMEOUT, {
    target: "@connecting.busy",
    // Log implicit connection loss and drop the current open socket
    effect: log(
      1,
      "Received no pong from server, assume implicit connection loss."
    )
  }).addTransitions("@ok.*", {
    // When a socket receives an error, this can cause the closing of the
    // socket, or not. So always check to see if the socket is still OPEN or
    // not. When still OPEN, don't transition.
    EXPLICIT_SOCKET_ERROR: /* @__PURE__ */ __name((_, context) => {
      if (context.socket?.readyState === 1) {
        return null;
      }
      return {
        target: "@connecting.backoff",
        effect: increaseBackoffDelay
      };
    }, "EXPLICIT_SOCKET_ERROR"),
    EXPLICIT_SOCKET_CLOSE: /* @__PURE__ */ __name((e) => {
      if (shouldDisconnect(e.event.code)) {
        return {
          target: "@idle.failed",
          effect: [
            logPermanentClose,
            fireErrorEvent(e.event.reason, e.event.code)
          ]
        };
      }
      if (shouldReauth(e.event.code)) {
        if (e.event.code === 4109) {
          return "@auth.busy";
        } else {
          return {
            target: "@auth.backoff",
            effect: [increaseBackoffDelay, logCloseEvent(e.event)]
          };
        }
      }
      if (shouldRetryWithoutReauth(e.event.code)) {
        return {
          target: "@connecting.backoff",
          effect: [increaseBackoffDelayAggressively, logCloseEvent(e.event)]
        };
      }
      return {
        target: "@connecting.backoff",
        effect: [increaseBackoffDelay, logCloseEvent(e.event)]
      };
    }, "EXPLICIT_SOCKET_CLOSE")
  });
  if (typeof document !== "undefined") {
    const doc = typeof document !== "undefined" ? document : void 0;
    const win = typeof window !== "undefined" ? window : void 0;
    const root = win ?? doc;
    machine.onEnter("*", (ctx) => {
      function onNetworkOffline() {
        machine.send({ type: "NAVIGATOR_OFFLINE" });
      }
      __name(onNetworkOffline, "onNetworkOffline");
      function onNetworkBackOnline() {
        machine.send({ type: "NAVIGATOR_ONLINE" });
      }
      __name(onNetworkBackOnline, "onNetworkBackOnline");
      function onVisibilityChange() {
        if (doc?.visibilityState === "visible") {
          machine.send({ type: "WINDOW_GOT_FOCUS" });
        }
      }
      __name(onVisibilityChange, "onVisibilityChange");
      win?.addEventListener("online", onNetworkBackOnline);
      win?.addEventListener("offline", onNetworkOffline);
      root?.addEventListener("visibilitychange", onVisibilityChange);
      return () => {
        root?.removeEventListener("visibilitychange", onVisibilityChange);
        win?.removeEventListener("online", onNetworkBackOnline);
        win?.removeEventListener("offline", onNetworkOffline);
        teardownSocket(ctx.socket);
      };
    });
  }
  const cleanups = [];
  const { statusDidChange, didConnect, didDisconnect, unsubscribe } = defineConnectivityEvents(machine);
  cleanups.push(unsubscribe);
  if (options2.enableDebugLogging) {
    cleanups.push(enableTracing(machine));
  }
  machine.start();
  return {
    machine,
    cleanups,
    // Observable events that will be emitted by this machine
    events: {
      statusDidChange,
      didConnect,
      didDisconnect,
      onMessage: onMessage.observable,
      onConnectionError: onConnectionError.observable
    }
  };
}
__name(createConnectionStateMachine, "createConnectionStateMachine");
var ManagedSocket = class {
  static {
    __name(this, "ManagedSocket");
  }
  #machine;
  #cleanups;
  events;
  constructor(delegates, enableDebugLogging = false, waitForActorId = true) {
    const { machine, events, cleanups } = createConnectionStateMachine(
      delegates,
      { waitForActorId, enableDebugLogging }
    );
    this.#machine = machine;
    this.events = events;
    this.#cleanups = cleanups;
  }
  getStatus() {
    try {
      return toNewConnectionStatus(this.#machine);
    } catch {
      return "initial";
    }
  }
  /**
   * Returns the current auth authValue.
   */
  get authValue() {
    return this.#machine.context.authValue;
  }
  /**
   * Call this method to try to connect to a WebSocket. This only has an effect
   * if the machine is idle at the moment, otherwise this is a no-op.
   */
  connect() {
    this.#machine.send({ type: "CONNECT" });
  }
  /**
   * If idle, will try to connect. Otherwise, it will attempt to reconnect to
   * the socket, potentially obtaining a new authValue first, if needed.
   */
  reconnect() {
    this.#machine.send({ type: "RECONNECT" });
  }
  /**
   * Call this method to disconnect from the current WebSocket. Is going to be
   * a no-op if there is no active connection.
   */
  disconnect() {
    this.#machine.send({ type: "DISCONNECT" });
  }
  /**
   * Call this to stop the machine and run necessary cleanup functions. After
   * calling destroy(), you can no longer use this instance. Call this before
   * letting the instance get garbage collected.
   */
  destroy() {
    this.#machine.stop();
    let cleanup;
    while (cleanup = this.#cleanups.pop()) {
      cleanup();
    }
  }
  /**
   * Safely send a message to the current WebSocket connection. Will emit a log
   * message if this is somehow impossible.
   */
  send(data) {
    const socket = this.#machine.context?.socket;
    if (socket === null) {
      warn("Cannot send: not connected yet", data);
    } else if (socket.readyState !== 1) {
      warn("Cannot send: WebSocket no longer open", data);
    } else {
      socket.send(data);
    }
  }
  /**
   * NOTE: Used by the E2E app only, to simulate explicit events.
   * Not ideal to keep exposed :(
   */
  _privateSendMachineEvent(event) {
    this.#machine.send(event);
  }
};
var kInternal = /* @__PURE__ */ Symbol();
var EMPTY_OBJECT = Object.freeze({});
var NULL_KEYWORD_CHARS = Array.from(new Set("null"));
var TRUE_KEYWORD_CHARS = Array.from(new Set("true"));
var FALSE_KEYWORD_CHARS = Array.from(new Set("false"));
var ALL_KEYWORD_CHARS = Array.from(new Set("nulltruefalse"));
function stripChar(str, chars) {
  const lastChar = str[str.length - 1];
  if (chars.includes(lastChar)) {
    return str.slice(0, -1);
  }
  return str;
}
__name(stripChar, "stripChar");
var IncrementalJsonParser = class {
  static {
    __name(this, "IncrementalJsonParser");
  }
  // Input
  #sourceText = "";
  // Output
  #cachedJson;
  /** How much we've already parsed */
  #scanIndex = 0;
  /** Whether the last char processed was a backslash */
  #escaped = false;
  /**
   * Start position of the last unterminated string, -1 if we're not inside
   * a string currently.
   *
   * Example: '{"a": "foo'
   *                 ^
   */
  #lastUnterminatedString = -1;
  /**
   * Start position of the last fully terminated string we've seen.
   *
   * Example: '{"a": "foo'
   *            ^
   */
  #lastTerminatedString = -1;
  /** The bracket stack of expected closing chars. For input '{"a": ["foo', the stack would be ['}', ']']. */
  #stack = [];
  constructor(text = "") {
    this.append(text);
  }
  get source() {
    return this.#sourceText;
  }
  get json() {
    if (this.#cachedJson === void 0) {
      this.#cachedJson = this.#parse();
    }
    return this.#cachedJson;
  }
  /** Whether we're currently inside an unterminated string, e.g. '{"hello' */
  get #inString() {
    return this.#lastUnterminatedString >= 0;
  }
  append(delta) {
    if (delta) {
      if (this.#sourceText === "") {
        delta = delta.trimStart();
      }
      this.#sourceText += delta;
      this.#cachedJson = void 0;
    }
  }
  #autocompleteTail(output) {
    if (this.#inString) {
      return "";
    }
    const lastChar = output.charAt(output.length - 1);
    if (lastChar === "") return "";
    if (lastChar === "-") {
      return "0";
    }
    if (!ALL_KEYWORD_CHARS.includes(lastChar)) return "";
    if (NULL_KEYWORD_CHARS.includes(lastChar)) {
      if (output.endsWith("nul")) return "l";
      if (output.endsWith("nu")) return "ll";
      if (output.endsWith("n")) return "ull";
    }
    if (TRUE_KEYWORD_CHARS.includes(lastChar)) {
      if (output.endsWith("tru")) return "e";
      if (output.endsWith("tr")) return "ue";
      if (output.endsWith("t")) return "rue";
    }
    if (FALSE_KEYWORD_CHARS.includes(lastChar)) {
      if (output.endsWith("fals")) return "e";
      if (output.endsWith("fal")) return "se";
      if (output.endsWith("fa")) return "lse";
      if (output.endsWith("f")) return "alse";
    }
    return "";
  }
  /**
   * Updates the internal parsing state by processing any new content
   * that has been appended since the last parse. This updates the state with
   * facts only. Any interpretation is left to the #parse() method.
   */
  #catchup() {
    const newContent = this.#sourceText.slice(this.#scanIndex);
    for (let i = 0; i < newContent.length; i++) {
      const ch = newContent[i];
      const absolutePos = this.#scanIndex + i;
      if (this.#inString) {
        if (this.#escaped) {
          this.#escaped = false;
        } else if (ch === "\\") {
          this.#escaped = true;
        } else if (ch === '"') {
          this.#lastTerminatedString = this.#lastUnterminatedString;
          this.#lastUnterminatedString = -1;
        }
      } else {
        if (ch === '"') {
          this.#lastUnterminatedString = absolutePos;
        } else if (ch === "{") {
          this.#stack.push("}");
        } else if (ch === "[") {
          this.#stack.push("]");
        } else if (ch === "}" && this.#stack.length > 0 && this.#stack[this.#stack.length - 1] === "}") {
          this.#stack.pop();
        } else if (ch === "]" && this.#stack.length > 0 && this.#stack[this.#stack.length - 1] === "]") {
          this.#stack.pop();
        }
      }
    }
    this.#scanIndex = this.#sourceText.length;
  }
  #parse() {
    this.#catchup();
    let result = this.#sourceText;
    if (result.charAt(0) !== "{") {
      return EMPTY_OBJECT;
    }
    if (result.endsWith("}")) {
      const quickCheck = tryParseJson(result);
      if (quickCheck) {
        return quickCheck;
      }
    }
    if (this.#inString) {
      if (this.#escaped) {
        result = result.slice(0, -1);
      }
      result += '"';
    }
    result = result.trimEnd();
    result = stripChar(result, ",.");
    result = result + this.#autocompleteTail(result);
    const suffix = this.#stack.reduceRight((acc, ch) => acc + ch, "");
    {
      const attempt = tryParseJson(result + suffix);
      if (attempt) {
        return attempt;
      }
    }
    if (this.#inString) {
      result = result.slice(0, this.#lastUnterminatedString);
    } else {
      result = stripChar(result, ":");
      if (result.endsWith('"')) {
        result = result.slice(0, this.#lastTerminatedString);
      }
    }
    result = stripChar(result, ",");
    result += suffix;
    return tryParseJson(result) ?? EMPTY_OBJECT;
  }
};
function shallowArray(xs, ys) {
  if (xs.length !== ys.length) {
    return false;
  }
  for (let i = 0; i < xs.length; i++) {
    if (!Object.is(xs[i], ys[i])) {
      return false;
    }
  }
  return true;
}
__name(shallowArray, "shallowArray");
function shallowObj(objA, objB) {
  if (!isPlainObject(objA) || !isPlainObject(objB)) {
    return false;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  return keysA.every(
    (key) => Object.prototype.hasOwnProperty.call(objB, key) && Object.is(objA[key], objB[key])
  );
}
__name(shallowObj, "shallowObj");
function shallow(a, b) {
  if (Object.is(a, b)) {
    return true;
  }
  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);
  if (isArrayA || isArrayB) {
    if (!isArrayA || !isArrayB) {
      return false;
    }
    return shallowArray(a, b);
  }
  return shallowObj(a, b);
}
__name(shallow, "shallow");
function shallow2(a, b) {
  if (!isPlainObject(a) || !isPlainObject(b)) {
    return shallow(a, b);
  }
  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) {
    return false;
  }
  return keysA.every(
    (key) => Object.prototype.hasOwnProperty.call(b, key) && shallow(a[key], b[key])
  );
}
__name(shallow2, "shallow2");
var TreePool = class {
  static {
    __name(this, "TreePool");
  }
  #_items;
  #_childrenOf;
  #_sorted;
  #_primaryKey;
  #_parentKeyFn;
  #_lt;
  constructor(primaryKey, parentKey, lt) {
    this.#_primaryKey = primaryKey;
    this.#_parentKeyFn = parentKey;
    this.#_lt = lt;
    this.#_items = /* @__PURE__ */ new Map();
    this.#_childrenOf = new DefaultMap(() => /* @__PURE__ */ new Set());
    this.#_sorted = SortedList.with(lt);
  }
  get(id) {
    return this.#_items.get(id);
  }
  getOrThrow(id) {
    return this.get(id) ?? raise(`Item with id ${id} not found`);
  }
  get sorted() {
    return this.#_sorted;
  }
  getParentId(id) {
    const item = this.getOrThrow(id);
    return this.#_parentKeyFn(item);
  }
  getParent(id) {
    const parentId = this.getParentId(id);
    return parentId ? this.getOrThrow(parentId) : null;
  }
  getChildren(id) {
    const childIds = this.#_childrenOf.get(id);
    if (!childIds) return [];
    return Array.from(childIds).map(
      (id2) => this.#_items.get(id2)
      // eslint-disable-line no-restricted-syntax
    );
  }
  *walkUp(id, predicate) {
    const includeSelf = true;
    let nodeId = id;
    do {
      const item = this.getOrThrow(nodeId);
      if (includeSelf || nodeId !== id) {
        if (!predicate || predicate(item)) {
          yield item;
        }
      }
      nodeId = this.#_parentKeyFn(item);
    } while (nodeId !== null);
  }
  // XXXX Generalize
  *walkLeft(id, predicate) {
    const self = this.getOrThrow(id);
    const siblings = SortedList.from(this.getSiblings(id), this.#_lt);
    for (const sibling of siblings.iterReversed()) {
      if (this.#_lt(self, sibling)) continue;
      if (!predicate || predicate(sibling)) {
        yield sibling;
      }
    }
  }
  // XXXX Generalize
  *walkRight(id, predicate) {
    const self = this.getOrThrow(id);
    const siblings = SortedList.from(this.getSiblings(id), this.#_lt);
    for (const sibling of siblings) {
      if (this.#_lt(sibling, self)) continue;
      if (!predicate || predicate(sibling)) {
        yield sibling;
      }
    }
  }
  // XXXX Generalize
  *walkDown(id, predicate) {
    const children = SortedList.from(this.getChildren(id), this.#_lt).rawArray;
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      yield* this.walkDown(
        this.#_primaryKey(child),
        predicate
        // "depth-first",
        // true
      );
      if (!predicate || predicate(child)) {
        yield child;
      }
    }
  }
  /** Returns all siblings, not including the item itself. */
  getSiblings(id) {
    const self = this.getOrThrow(id);
    const parentId = this.getParentId(id);
    return this.getChildren(parentId).filter((item) => item !== self);
  }
  [Symbol.iterator]() {
    return this.#_sorted[Symbol.iterator]();
  }
  upsert(item) {
    const pk = this.#_primaryKey(item);
    const existing = this.#_items.get(pk);
    if (existing) {
      if (this.#_parentKeyFn(existing) !== this.#_parentKeyFn(item)) {
        throw new Error(
          "Cannot upsert parent ID changes that change the tree structure. Remove the entry first, and recreate it"
        );
      }
      this.#_sorted.remove(existing);
    }
    this.#_items.set(pk, item);
    this.#_sorted.add(item);
    const parentId = this.#_parentKeyFn(item);
    this.#_childrenOf.getOrCreate(parentId).add(pk);
  }
  remove(pk) {
    const item = this.#_items.get(pk);
    if (!item) return false;
    const childIds = this.#_childrenOf.get(pk);
    if (childIds) {
      throw new Error(
        `Cannot remove item '${pk}' while it still has children. Remove children first.`
      );
    }
    const parentId = this.#_parentKeyFn(item);
    const siblings = this.#_childrenOf.get(parentId);
    if (siblings) {
      siblings.delete(pk);
      if (siblings.size === 0) {
        this.#_childrenOf.delete(parentId);
      }
    }
    this.#_sorted.remove(item);
    this.#_childrenOf.delete(pk);
    this.#_items.delete(pk);
    return true;
  }
  clear() {
    if (this.#_items.size === 0) return false;
    this.#_childrenOf.clear();
    this.#_items.clear();
    this.#_sorted.clear();
    return true;
  }
};
var DEFAULT_REQUEST_TIMEOUT = 4e3;
var KnowledgeStack = class {
  static {
    __name(this, "KnowledgeStack");
  }
  #_layers;
  #stack;
  //                 /                \
  //      knowledge key               "layer" key
  //      (random, or optionally      (one entry per mounted component)
  //       set by user)
  #_cache;
  constructor() {
    this.#_layers = /* @__PURE__ */ new Set();
    this.#stack = new DefaultMap(
      () => /* @__PURE__ */ new Map()
    );
    this.#_cache = void 0;
  }
  // Typically a useId()
  registerLayer(uniqueLayerId) {
    const layerKey = uniqueLayerId;
    if (this.#_layers.has(layerKey))
      raise(`Layer '${layerKey}' already exists, provide a unique layer id`);
    this.#_layers.add(layerKey);
    return layerKey;
  }
  deregisterLayer(layerKey) {
    this.#_layers.delete(layerKey);
    let deleted = false;
    for (const [key, knowledge] of this.#stack) {
      if (knowledge.delete(layerKey)) {
        deleted = true;
      }
      if (knowledge.size === 0)
        this.#stack.delete(key);
    }
    if (deleted) {
      this.invalidate();
    }
  }
  get() {
    return this.#_cache ??= this.#recompute();
  }
  invalidate() {
    this.#_cache = void 0;
  }
  #recompute() {
    return Array.from(this.#stack.values()).flatMap(
      (layer) => (
        // Return only the last item (returns [] when empty)
        Array.from(layer.values()).slice(-1).filter(isDefined)
      )
    );
  }
  updateKnowledge(layerKey, key, data) {
    if (!this.#_layers.has(layerKey)) raise(`Unknown layer key: ${layerKey}`);
    this.#stack.getOrCreate(key).set(layerKey, data);
    this.invalidate();
  }
};
function createStore_forKnowledge() {
  const knowledgeByChatId = new DefaultMap(
    (_chatId) => new KnowledgeStack()
  );
  function getKnowledgeStack(chatId) {
    return knowledgeByChatId.getOrCreate(chatId ?? kWILDCARD);
  }
  __name(getKnowledgeStack, "getKnowledgeStack");
  function getKnowledgeForChat(chatId) {
    const globalKnowledge = knowledgeByChatId.getOrCreate(kWILDCARD).get();
    const scopedKnowledge = knowledgeByChatId.get(chatId)?.get() ?? [];
    return [...globalKnowledge, ...scopedKnowledge];
  }
  __name(getKnowledgeForChat, "getKnowledgeForChat");
  return {
    getKnowledgeStack,
    getKnowledgeForChat
  };
}
__name(createStore_forKnowledge, "createStore_forKnowledge");
function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(now, "now");
var kWILDCARD = /* @__PURE__ */ Symbol("*");
function createStore_forTools() {
  const toolsByChatIdΣ = new DefaultMap(
    (_chatId) => {
      return new DefaultMap((_name) => {
        return new Signal(void 0);
      });
    }
  );
  const globalOrScopedToolΣ = new DefaultMap((nameAndChat) => {
    const [name, chatId] = tryParseJson(nameAndChat);
    return DerivedSignal.from(() => {
      return (
        // A tool that's registered and scoped to a specific chat ID...
        (chatId !== void 0 ? toolsByChatIdΣ.getOrCreate(chatId).getOrCreate(name) : void 0)?.get() ?? // ...or a globally registered tool
        toolsByChatIdΣ.getOrCreate(kWILDCARD).getOrCreate(name).get()
      );
    });
  });
  function getToolΣ(name, chatId) {
    const key = JSON.stringify(chatId !== void 0 ? [name, chatId] : [name]);
    return globalOrScopedToolΣ.getOrCreate(key);
  }
  __name(getToolΣ, "getToolΣ");
  function registerTool(name, tool, chatId) {
    if (!tool.execute && !tool.render) {
      throw new Error(
        "A tool definition must have an execute() function, a render() function, or both."
      );
    }
    const key = chatId ?? kWILDCARD;
    toolsByChatIdΣ.getOrCreate(key).getOrCreate(name).set(tool);
    return () => unregisterTool(key, name);
  }
  __name(registerTool, "registerTool");
  function unregisterTool(chatId, name) {
    const tools = toolsByChatIdΣ.get(chatId);
    if (tools === void 0) return;
    const tool = tools.get(name);
    if (tool === void 0) return;
    tool.set(void 0);
  }
  __name(unregisterTool, "unregisterTool");
  function getToolDescriptions(chatId) {
    const globalToolsΣ = toolsByChatIdΣ.get(kWILDCARD);
    const scopedToolsΣ = toolsByChatIdΣ.get(chatId);
    return Array.from([
      ...globalToolsΣ?.entries() ?? [],
      ...scopedToolsΣ?.entries() ?? []
    ]).flatMap(([name, toolΣ]) => {
      const tool = toolΣ.get();
      return tool && (tool.enabled ?? true) ? [{ name, description: tool.description, parameters: tool.parameters }] : [];
    });
  }
  __name(getToolDescriptions, "getToolDescriptions");
  return {
    getToolDescriptions,
    getToolΣ,
    registerTool
  };
}
__name(createStore_forTools, "createStore_forTools");
function createStore_forChatMessages(toolsStore, setToolResultFn) {
  const myMessages = /* @__PURE__ */ new Set();
  const handledInvocations = /* @__PURE__ */ new Set();
  const messagePoolByChatIdΣ = new DefaultMap(
    (_chatId) => new MutableSignal(
      new TreePool(
        (x) => x.id,
        (x) => x.parentId,
        (x, y) => x.createdAt < y.createdAt
      )
    )
  );
  const generatingMessagesΣ = new MutableSignal(
    /* @__PURE__ */ new Map()
  );
  function createOptimistically(chatId, role, parentId, third) {
    const id = `ms_${nanoid()}`;
    const createdAt = now();
    if (role === "user") {
      const content = third;
      upsert({
        id,
        chatId,
        role,
        parentId,
        createdAt,
        content,
        _optimistic: true
      });
    } else {
      const copilotId = third;
      upsert({
        id,
        chatId,
        role,
        parentId,
        createdAt,
        status: "generating",
        contentSoFar: [],
        copilotId,
        _optimistic: true
      });
    }
    return id;
  }
  __name(createOptimistically, "createOptimistically");
  function upsertMany(messages) {
    batch(() => {
      for (const message of messages) {
        upsert(message);
      }
    });
  }
  __name(upsertMany, "upsertMany");
  function remove(chatId, messageId) {
    const chatMsgsΣ = messagePoolByChatIdΣ.get(chatId);
    if (!chatMsgsΣ) return;
    const existing = chatMsgsΣ.get().get(messageId);
    if (!existing || existing.deletedAt) return;
    if (existing.role === "assistant" && existing.status !== "completed") {
      upsert({ ...existing, deletedAt: now(), contentSoFar: [] });
    } else {
      upsert({ ...existing, deletedAt: now(), content: [] });
    }
  }
  __name(remove, "remove");
  function removeByChatId(chatId) {
    const chatMsgsΣ = messagePoolByChatIdΣ.get(chatId);
    if (chatMsgsΣ === void 0) return;
    chatMsgsΣ.mutate((pool) => pool.clear());
  }
  __name(removeByChatId, "removeByChatId");
  function upsert(message) {
    batch(() => {
      const chatMsgsΣ = messagePoolByChatIdΣ.getOrCreate(message.chatId);
      chatMsgsΣ.mutate((pool) => pool.upsert(message));
      if (message.role === "assistant" && message.status === "generating") {
        generatingMessagesΣ.mutate((lut) => {
          lut.set(message.id, structuredClone(message));
        });
      } else {
        generatingMessagesΣ.mutate((lut) => {
          lut.delete(message.id);
        });
      }
      if (message.role === "assistant" && message.status === "awaiting-tool") {
        if (myMessages.has(message.id)) {
          for (const toolInvocation of message.contentSoFar.filter(
            (part) => part.type === "tool-invocation" && part.stage === "executing"
          )) {
            if (!handledInvocations.has(toolInvocation.invocationId)) {
              handledInvocations.add(toolInvocation.invocationId);
            } else {
              continue;
            }
            const executeFn = toolsStore.getToolΣ(toolInvocation.name, message.chatId).get()?.execute;
            if (executeFn) {
              (async () => {
                const result = await executeFn(toolInvocation.args, {
                  name: toolInvocation.name,
                  invocationId: toolInvocation.invocationId
                });
                return await setToolResultFn(
                  message.chatId,
                  message.id,
                  toolInvocation.invocationId,
                  result ?? { data: {} },
                  { copilotId: message.copilotId }
                  // TODO: Should we pass the other generation options (tools, knowledge) as well?
                );
              })().catch((err) => {
                error2(
                  `Error trying to respond to tool-call: ${String(err)} (in execute())`
                );
              });
            }
          }
        }
      } else {
        if (message.role === "assistant" && message.status === "generating") {
        } else {
          myMessages.delete(message.id);
        }
      }
    });
  }
  __name(upsert, "upsert");
  function addDelta(messageId, delta) {
    generatingMessagesΣ.mutate((lut) => {
      const message = lut.get(messageId);
      if (message === void 0) return false;
      patchContentWithDelta(message.contentSoFar, delta);
      lut.set(messageId, message);
      return true;
    });
  }
  __name(addDelta, "addDelta");
  function* iterGeneratingMessages() {
    for (const chatMsgsΣ of messagePoolByChatIdΣ.values()) {
      for (const m of chatMsgsΣ.get()) {
        if (m.role === "assistant" && m.status === "generating" && !m._optimistic) {
          yield m;
        }
      }
    }
  }
  __name(iterGeneratingMessages, "iterGeneratingMessages");
  function failAllPending() {
    batch(() => {
      generatingMessagesΣ.mutate((lut) => {
        let deleted = false;
        for (const [k, v] of lut) {
          if (!v._optimistic) {
            lut.delete(k);
            deleted = true;
          }
        }
        return deleted;
      });
      upsertMany(
        Array.from(iterGeneratingMessages()).map(
          (message) => ({
            ...message,
            status: "failed",
            errorReason: "Lost connection"
          })
        )
      );
    });
  }
  __name(failAllPending, "failAllPending");
  function getMessageById(messageId) {
    for (const messagesΣ of messagePoolByChatIdΣ.values()) {
      const message = messagesΣ.get().get(messageId);
      if (message) {
        return message;
      }
    }
    return void 0;
  }
  __name(getMessageById, "getMessageById");
  function first(iterable) {
    const result = iterable.next();
    return result.done ? void 0 : result.value;
  }
  __name(first, "first");
  function selectBranch(pool, preferredBranch) {
    function isAlive(message2) {
      if (!message2.deletedAt) {
        return true;
      }
      for (const _ of pool.walkDown(message2.id, (m) => !m.deletedAt)) {
        return true;
      }
      return false;
    }
    __name(isAlive, "isAlive");
    function selectSpine(leaf) {
      const spine = [];
      let lastVisitedMessage = null;
      for (const message2 of pool.walkUp(leaf.id)) {
        const prev = first(pool.walkLeft(message2.id, isAlive))?.id ?? null;
        const next = first(pool.walkRight(message2.id, isAlive))?.id ?? null;
        if (!message2.deletedAt || prev || next) {
          const node = {
            ...message2,
            navigation: { parent: null, prev, next }
          };
          if (lastVisitedMessage !== null) {
            lastVisitedMessage.navigation.parent = node.id;
          }
          lastVisitedMessage = node;
          spine.push(node);
        }
      }
      return spine.reverse();
    }
    __name(selectSpine, "selectSpine");
    function fallback() {
      const latest = pool.sorted.findRight((m) => !m.deletedAt);
      return latest ? selectSpine(latest) : [];
    }
    __name(fallback, "fallback");
    if (preferredBranch === null) {
      return fallback();
    }
    const message = pool.get(preferredBranch);
    if (!message) {
      return fallback();
    }
    for (const current of pool.walkUp(message.id)) {
      for (const desc of pool.walkDown(current.id, (m) => !m.deletedAt)) {
        return selectSpine(desc);
      }
      if (!current.deletedAt) {
        return selectSpine(current);
      }
    }
    return fallback();
  }
  __name(selectBranch, "selectBranch");
  const immutableMessagesByBranch = new DefaultMap((chatId) => {
    return new DefaultMap((branchId) => {
      const messagesΣ = DerivedSignal.from(() => {
        const pool = messagePoolByChatIdΣ.getOrCreate(chatId).get();
        return selectBranch(pool, branchId);
      }, shallow2);
      return DerivedSignal.from(() => {
        const generatingMessages = generatingMessagesΣ.get();
        return messagesΣ.get().map((message) => {
          if (message.role !== "assistant" || message.status !== "generating") {
            return message;
          }
          const generatingMessage = generatingMessages.get(message.id);
          if (generatingMessage === void 0) return message;
          return {
            ...message,
            contentSoFar: generatingMessage.contentSoFar
          };
        });
      }, shallow);
    });
  });
  function getChatMessagesForBranchΣ(chatId, branch) {
    return immutableMessagesByBranch.getOrCreate(chatId).getOrCreate(branch || null);
  }
  __name(getChatMessagesForBranchΣ, "getChatMessagesForBranchΣ");
  function getLastUsedCopilotId(chatId) {
    const pool = messagePoolByChatIdΣ.getOrCreate(chatId).get();
    const latest = pool.sorted.findRight(
      (m) => m.role === "assistant" && !m.deletedAt
    );
    return latest?.copilotId;
  }
  __name(getLastUsedCopilotId, "getLastUsedCopilotId");
  return {
    // Readers
    getMessageById,
    getChatMessagesForBranchΣ,
    getLastUsedCopilotId,
    // Mutations
    createOptimistically,
    upsert,
    upsertMany,
    remove,
    removeByChatId,
    addDelta,
    failAllPending,
    markMine(messageId) {
      myMessages.add(messageId);
    },
    /**
     * Iterates over all my auto-executing messages.
     *
     * These are messages that match all these conditions:
     * - The message is an assistant message
     * - The message is owned by this client ("mine")
     * - The message is currently in "awaiting-tool" status
     * - The message has at least one tool invocation in "executing" stage
     * - The tool invocation has an execute() function defined
     */
    *getAutoExecutingMessageIds() {
      for (const messageId of myMessages) {
        const message = getMessageById(messageId);
        if (message?.role === "assistant" && message.status === "awaiting-tool") {
          const isAutoExecuting = message.contentSoFar.some((part) => {
            if (part.type === "tool-invocation" && part.stage === "executing") {
              const tool = toolsStore.getToolΣ(part.name, message.chatId).get();
              return typeof tool?.execute === "function";
            }
            return false;
          });
          if (isAutoExecuting) {
            yield message.id;
          }
        }
      }
    }
  };
}
__name(createStore_forChatMessages, "createStore_forChatMessages");
function createStore_forUserAiChats() {
  const chatsDB = new AiChatDB();
  function upsertMany(chats) {
    batch(() => {
      for (const chat of chats) {
        chatsDB.upsert(chat);
      }
    });
  }
  __name(upsertMany, "upsertMany");
  function upsert(chat) {
    chatsDB.upsert(chat);
  }
  __name(upsert, "upsert");
  function markDeleted(chatId) {
    chatsDB.markDeleted(chatId);
  }
  __name(markDeleted, "markDeleted");
  function getChatById(chatId) {
    return chatsDB.getEvenIfDeleted(chatId);
  }
  __name(getChatById, "getChatById");
  function findMany(query) {
    return chatsDB.signal.get().findMany(query);
  }
  __name(findMany, "findMany");
  return {
    getChatById,
    findMany,
    // Mutations
    upsert,
    upsertMany,
    markDeleted
  };
}
__name(createStore_forUserAiChats, "createStore_forUserAiChats");
function createAi(config) {
  const managedSocket = new ManagedSocket(
    config.delegates,
    config.enableDebugLogging,
    false
    // AI doesn't have actors (yet, but it will)
  );
  const chatsStore = createStore_forUserAiChats();
  const toolsStore = createStore_forTools();
  const knowledgeStore = createStore_forKnowledge();
  const messagesStore = createStore_forChatMessages(toolsStore, setToolResult);
  const context = {
    staticSessionInfoSig: new Signal(null),
    dynamicSessionInfoSig: new Signal(null),
    pendingCmds: /* @__PURE__ */ new Map(),
    chatsStore,
    messagesStore,
    toolsStore,
    knowledgeStore
  };
  const statusΣ = new Signal("initial");
  const DELTA_THROTTLE = 25;
  let pendingDeltas = [];
  let deltaBatchTimer = null;
  function flushPendingDeltas() {
    const currentQueue = pendingDeltas;
    pendingDeltas = [];
    if (deltaBatchTimer !== null) {
      clearTimeout(deltaBatchTimer);
      deltaBatchTimer = null;
    }
    batch(() => {
      for (const { id, delta } of currentQueue) {
        context.messagesStore.addDelta(id, delta);
      }
    });
  }
  __name(flushPendingDeltas, "flushPendingDeltas");
  function enqueueDelta(id, delta) {
    pendingDeltas.push({ id, delta });
    if (deltaBatchTimer === null) {
      deltaBatchTimer = setTimeout(flushPendingDeltas, DELTA_THROTTLE);
    }
  }
  __name(enqueueDelta, "enqueueDelta");
  let lastTokenKey;
  function onStatusDidChange(newStatus) {
    const authValue = managedSocket.authValue;
    if (authValue !== null) {
      const tokenKey = getBearerTokenFromAuthValue(authValue);
      if (tokenKey !== lastTokenKey) {
        lastTokenKey = tokenKey;
        if (authValue.type === "secret") {
          const token = authValue.token.parsed;
          context.staticSessionInfoSig.set({
            userId: token.uid,
            userInfo: token.ui
          });
        } else {
          context.staticSessionInfoSig.set({
            userId: void 0,
            userInfo: void 0
          });
        }
      }
    }
    statusΣ.set(newStatus);
  }
  __name(onStatusDidChange, "onStatusDidChange");
  let _connectionLossTimerId;
  let _hasLostConnection = false;
  function handleConnectionLossEvent(newStatus) {
    if (newStatus === "reconnecting") {
      _connectionLossTimerId = setTimeout(() => {
        _hasLostConnection = true;
      }, config.lostConnectionTimeout);
    } else {
      clearTimeout(_connectionLossTimerId);
      if (_hasLostConnection) {
        _hasLostConnection = false;
      }
    }
  }
  __name(handleConnectionLossEvent, "handleConnectionLossEvent");
  function onDidConnect() {
  }
  __name(onDidConnect, "onDidConnect");
  function onDidDisconnect() {
    flushPendingDeltas();
  }
  __name(onDidDisconnect, "onDidDisconnect");
  function handleServerMessage(event) {
    if (typeof event.data !== "string")
      return;
    const msg = tryParseJson(event.data);
    if (!msg)
      return;
    const cmdId = "cmdId" in msg ? msg.cmdId : msg.event === "cmd-failed" ? msg.failedCmdId : void 0;
    const pendingCmd = context.pendingCmds.get(cmdId);
    if (cmdId && !pendingCmd) {
      warn("Ignoring unexpected command response. Already timed out, or not for us?", msg);
      return;
    }
    if ("event" in msg) {
      if (msg.event === "delta") {
        const { id, delta } = msg;
        enqueueDelta(id, delta);
      } else {
        batch(() => {
          flushPendingDeltas();
          switch (msg.event) {
            case "cmd-failed":
              pendingCmd?.reject(new Error(msg.error));
              break;
            case "settle": {
              context.messagesStore.upsert(msg.message);
              break;
            }
            case "warning":
              warn(msg.message);
              break;
            case "error":
              error2(msg.error);
              break;
            case "rebooted":
              context.messagesStore.failAllPending();
              break;
            case "sync":
              for (const m of msg["-messages"] ?? []) {
                context.messagesStore.remove(m.chatId, m.id);
              }
              for (const chatId of msg["-chats"] ?? []) {
                context.chatsStore.markDeleted(chatId);
                context.messagesStore.removeByChatId(chatId);
              }
              for (const chatId of msg.clear ?? []) {
                context.messagesStore.removeByChatId(chatId);
              }
              if (msg.chats) {
                context.chatsStore.upsertMany(msg.chats);
              }
              if (msg.messages) {
                context.messagesStore.upsertMany(msg.messages);
              }
              break;
            default:
              return assertNever(msg, "Unhandled case");
          }
        });
      }
    } else {
      switch (msg.cmd) {
        case "get-chats":
          context.chatsStore.upsertMany(msg.chats);
          break;
        case "get-or-create-chat":
          context.chatsStore.upsert(msg.chat);
          break;
        case "delete-chat":
          context.chatsStore.markDeleted(msg.chatId);
          context.messagesStore.removeByChatId(msg.chatId);
          break;
        case "get-message-tree":
          context.chatsStore.upsert(msg.chat);
          context.messagesStore.upsertMany(msg.messages);
          break;
        case "delete-message":
          context.messagesStore.remove(msg.chatId, msg.messageId);
          break;
        case "clear-chat":
          context.messagesStore.removeByChatId(msg.chatId);
          break;
        case "ask-in-chat":
          if (msg.sourceMessage) {
            context.messagesStore.upsert(msg.sourceMessage);
          }
          context.messagesStore.upsert(msg.targetMessage);
          break;
        case "abort-ai":
          break;
        case "set-tool-result":
          if (msg.ok) {
            context.messagesStore.upsert(msg.message);
          }
          break;
        default:
          return assertNever(msg, "Unhandled case");
      }
    }
    pendingCmd?.resolve(msg);
  }
  __name(handleServerMessage, "handleServerMessage");
  managedSocket.events.onMessage.subscribe(handleServerMessage);
  managedSocket.events.statusDidChange.subscribe(onStatusDidChange);
  managedSocket.events.statusDidChange.subscribe(handleConnectionLossEvent);
  managedSocket.events.didConnect.subscribe(onDidConnect);
  managedSocket.events.didDisconnect.subscribe(onDidDisconnect);
  managedSocket.events.onConnectionError.subscribe(({ message, code }) => {
    if (process.env.NODE_ENV !== "production") {
      error2(
        `Connection to websocket server closed. Reason: ${message} (code: ${code}).`
      );
    }
  });
  function connectInitially() {
    if (managedSocket.getStatus() === "initial") {
      managedSocket.connect();
    }
  }
  __name(connectInitially, "connectInitially");
  async function sendClientMsgWithResponse(msg) {
    connectInitially();
    if (managedSocket.getStatus() !== "connected") {
      await managedSocket.events.didConnect.waitUntil();
    }
    const { promise, resolve, reject } = Promise_withResolvers();
    const abortSignal = AbortSignal.timeout(DEFAULT_REQUEST_TIMEOUT);
    abortSignal.addEventListener("abort", () => reject(abortSignal.reason), {
      once: true
    });
    const cmdId = nanoid(7);
    context.pendingCmds.set(cmdId, { resolve, reject });
    sendClientMsg({ ...msg, cmdId });
    return promise.finally(() => {
      context.pendingCmds.delete(cmdId);
    }).catch((err) => {
      error2(err.message);
      throw err;
    });
  }
  __name(sendClientMsgWithResponse, "sendClientMsgWithResponse");
  function sendClientMsg(msg) {
    managedSocket.send(
      JSON.stringify({
        ...msg
      })
    );
  }
  __name(sendClientMsg, "sendClientMsg");
  function getChats(options2 = {}) {
    return sendClientMsgWithResponse({
      cmd: "get-chats",
      cursor: options2.cursor,
      query: options2.query
    });
  }
  __name(getChats, "getChats");
  function getOrCreateChat(id, options2) {
    return sendClientMsgWithResponse({
      cmd: "get-or-create-chat",
      id,
      options: options2
    });
  }
  __name(getOrCreateChat, "getOrCreateChat");
  function getMessageTree(chatId) {
    return sendClientMsgWithResponse({
      cmd: "get-message-tree",
      chatId
    });
  }
  __name(getMessageTree, "getMessageTree");
  async function setToolResult(chatId, messageId, invocationId, result, options2) {
    const knowledge = context.knowledgeStore.getKnowledgeForChat(chatId);
    const tools = context.toolsStore.getToolDescriptions(chatId);
    const resp = await sendClientMsgWithResponse({
      cmd: "set-tool-result",
      chatId,
      messageId,
      invocationId,
      result,
      generationOptions: {
        copilotId: options2?.copilotId,
        stream: options2?.stream,
        timeout: options2?.timeout,
        // Knowledge and tools aren't coming from the options, but retrieved
        // from the global context
        knowledge: knowledge.length > 0 ? knowledge : void 0,
        tools: tools.length > 0 ? tools : void 0
      }
    });
    if (resp.ok) {
      messagesStore.markMine(resp.message.id);
    }
  }
  __name(setToolResult, "setToolResult");
  function handleBeforeUnload() {
    for (const messageId of context.messagesStore.getAutoExecutingMessageIds()) {
      sendClientMsgWithResponse({ cmd: "abort-ai", messageId }).catch(() => {
      });
    }
  }
  __name(handleBeforeUnload, "handleBeforeUnload");
  const win = typeof window !== "undefined" ? window : void 0;
  win?.addEventListener("beforeunload", handleBeforeUnload, { once: true });
  return Object.defineProperty(
    {
      [kInternal]: {
        context
      },
      connectInitially,
      // reconnect: () => managedSocket.reconnect(),
      disconnect: /* @__PURE__ */ __name(() => managedSocket.disconnect(), "disconnect"),
      getChats,
      getOrCreateChat,
      deleteChat: /* @__PURE__ */ __name((chatId) => {
        return sendClientMsgWithResponse({ cmd: "delete-chat", chatId });
      }, "deleteChat"),
      getMessageTree,
      deleteMessage: /* @__PURE__ */ __name((chatId, messageId) => sendClientMsgWithResponse({ cmd: "delete-message", chatId, messageId }), "deleteMessage"),
      clearChat: /* @__PURE__ */ __name((chatId) => sendClientMsgWithResponse({ cmd: "clear-chat", chatId }), "clearChat"),
      askUserMessageInChat: /* @__PURE__ */ __name(async (chatId, userMessage, targetMessageId, options2) => {
        const knowledge = context.knowledgeStore.getKnowledgeForChat(chatId);
        const requestKnowledge = options2?.knowledge || [];
        const combinedKnowledge = [...knowledge, ...requestKnowledge];
        const tools = context.toolsStore.getToolDescriptions(chatId);
        messagesStore.markMine(targetMessageId);
        const resp = await sendClientMsgWithResponse({
          cmd: "ask-in-chat",
          chatId,
          sourceMessage: userMessage,
          targetMessageId,
          generationOptions: {
            copilotId: options2?.copilotId,
            stream: options2?.stream,
            timeout: options2?.timeout,
            // Combine global knowledge with request-specific knowledge
            knowledge: combinedKnowledge.length > 0 ? combinedKnowledge : void 0,
            tools: tools.length > 0 ? tools : void 0
          }
        });
        return resp;
      }, "askUserMessageInChat"),
      abort: /* @__PURE__ */ __name((messageId) => sendClientMsgWithResponse({ cmd: "abort-ai", messageId }), "abort"),
      setToolResult,
      getStatus: /* @__PURE__ */ __name(() => managedSocket.getStatus(), "getStatus"),
      signals: {
        getChatMessagesForBranchΣ: context.messagesStore.getChatMessagesForBranchΣ,
        getToolΣ: context.toolsStore.getToolΣ,
        statusΣ
      },
      getChatById: context.chatsStore.getChatById,
      queryChats: context.chatsStore.findMany,
      getLastUsedCopilotId: context.messagesStore.getLastUsedCopilotId,
      registerKnowledgeLayer: /* @__PURE__ */ __name((uniqueLayerId, chatId) => {
        const stack = context.knowledgeStore.getKnowledgeStack(chatId);
        const layerKey = stack.registerLayer(uniqueLayerId);
        const deregister = /* @__PURE__ */ __name(() => stack.deregisterLayer(layerKey), "deregister");
        return {
          layerKey,
          deregister
        };
      }, "registerKnowledgeLayer"),
      updateKnowledge: /* @__PURE__ */ __name((layerKey, data, key, chatId) => {
        context.knowledgeStore.getKnowledgeStack(chatId).updateKnowledge(layerKey, key ?? nanoid(), data);
      }, "updateKnowledge"),
      registerTool: context.toolsStore.registerTool
    },
    kInternal,
    { enumerable: false }
  );
}
__name(createAi, "createAi");
function makeCreateSocketDelegateForAi(baseUrl, WebSocketPolyfill) {
  return (authValue) => {
    const ws = WebSocketPolyfill ?? (typeof WebSocket === "undefined" ? void 0 : WebSocket);
    if (ws === void 0) {
      throw new StopRetrying(
        "To use Liveblocks client in a non-DOM environment, you need to provide a WebSocket polyfill."
      );
    }
    const url2 = new URL(baseUrl);
    url2.protocol = url2.protocol === "http:" ? "ws" : "wss";
    url2.pathname = "/ai/v7";
    if (authValue.type === "secret") {
      url2.searchParams.set("tok", authValue.token.raw);
    } else if (authValue.type === "public") {
      throw new Error("Public key not supported with AI Copilots");
    } else {
      return assertNever(authValue, "Unhandled case");
    }
    url2.searchParams.set("version", PKG_VERSION || "dev");
    return new ws(url2.toString());
  };
}
__name(makeCreateSocketDelegateForAi, "makeCreateSocketDelegateForAi");
function replaceOrAppend(content, newItem, keyFn, now2) {
  const existingIndex = findLastIndex(
    content,
    (item) => item.type === newItem.type && keyFn(item) === keyFn(newItem)
  );
  if (existingIndex > -1) {
    content[existingIndex] = newItem;
  } else {
    closePart(content[content.length - 1], now2);
    content.push(newItem);
  }
}
__name(replaceOrAppend, "replaceOrAppend");
function closePart(prevPart, endedAt) {
  if (prevPart?.type === "reasoning") {
    prevPart.endedAt ??= endedAt;
  }
}
__name(closePart, "closePart");
function patchContentWithDelta(content, delta) {
  if (delta === null)
    return;
  const parts = content.filter(
    (part) => part.type !== "sources"
  );
  const sources = content.filter((part) => part.type === "sources").flatMap((part) => part.sources);
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const lastPart = parts[parts.length - 1];
  switch (delta.type) {
    case "text-delta":
      if (lastPart?.type === "text") {
        lastPart.text += delta.textDelta;
      } else {
        closePart(lastPart, now2);
        parts.push({ type: "text", text: delta.textDelta });
      }
      break;
    case "reasoning-delta":
      if (lastPart?.type === "reasoning") {
        lastPart.text += delta.textDelta;
      } else {
        closePart(lastPart, now2);
        parts.push({
          type: "reasoning",
          text: delta.textDelta,
          startedAt: now2
        });
      }
      break;
    case "tool-stream": {
      const toolInvocation = createReceivingToolInvocation(
        delta.invocationId,
        delta.name
      );
      parts.push(toolInvocation);
      break;
    }
    case "tool-delta": {
      if (lastPart?.type === "tool-invocation" && lastPart.stage === "receiving") {
        lastPart.__appendDelta?.(delta.delta);
      }
      break;
    }
    case "tool-invocation":
      replaceOrAppend(parts, delta, (x) => x.invocationId, now2);
      break;
    case "retrieval":
      replaceOrAppend(parts, delta, (x) => x.id, now2);
      break;
    case "source": {
      sources.push(delta);
      break;
    }
    default:
      return assertNever(delta, "Unhandled case");
  }
  if (sources.length > 0) {
    parts.push({
      type: "sources",
      sources
    });
  }
  content.length = 0;
  content.push(...parts);
}
__name(patchContentWithDelta, "patchContentWithDelta");
function createReceivingToolInvocation(invocationId, name, partialArgsText = "") {
  const parser2 = new IncrementalJsonParser(partialArgsText);
  return {
    type: "tool-invocation",
    stage: "receiving",
    invocationId,
    name,
    // --- Alternative implementation for FRONTEND only ------------------------
    get partialArgsText() {
      return parser2.source;
    },
    // prettier-ignore
    get partialArgs() {
      return parser2.json;
    },
    // prettier-ignore
    __appendDelta(delta) {
      parser2.append(delta);
    }
    // prettier-ignore
    // ------------------------------------------------------------------------
  };
}
__name(createReceivingToolInvocation, "createReceivingToolInvocation");
function canWriteStorage(scopes) {
  return scopes.includes(
    "room:write"
    /* Write */
  );
}
__name(canWriteStorage, "canWriteStorage");
function canComment(scopes) {
  return scopes.includes(
    "comments:write"
    /* CommentsWrite */
  ) || scopes.includes(
    "room:write"
    /* Write */
  );
}
__name(canComment, "canComment");
function isValidAuthTokenPayload(data) {
  return isPlainObject(data) && (data.k === "acc" || data.k === "id");
}
__name(isValidAuthTokenPayload, "isValidAuthTokenPayload");
function parseAuthToken(rawTokenString) {
  const tokenParts = rawTokenString.split(".");
  if (tokenParts.length !== 3) {
    throw new Error("Authentication error: invalid JWT token");
  }
  const payload = tryParseJson(b64decode(tokenParts[1]));
  if (!(payload && isValidAuthTokenPayload(payload))) {
    throw new Error(
      "Authentication error: expected a valid token but did not get one. Hint: if you are using a callback, ensure the room is passed when creating the token. For more information: https://liveblocks.io/docs/api-reference/liveblocks-client#createClientCallback"
    );
  }
  return {
    raw: rawTokenString,
    parsed: payload
  };
}
__name(parseAuthToken, "parseAuthToken");
var NON_RETRY_STATUS_CODES = [
  400,
  401,
  403,
  404,
  405,
  410,
  412,
  414,
  422,
  431,
  451
];
function createAuthManager(authOptions, onAuthenticate) {
  const authentication = prepareAuthentication(authOptions);
  const seenTokens = /* @__PURE__ */ new Set();
  const tokens = [];
  const expiryTimes = [];
  const requestPromises = /* @__PURE__ */ new Map();
  function reset() {
    seenTokens.clear();
    tokens.length = 0;
    expiryTimes.length = 0;
    requestPromises.clear();
  }
  __name(reset, "reset");
  function hasCorrespondingScopes(requestedScope, scopes) {
    if (requestedScope === "comments:read") {
      return scopes.includes(
        "comments:read"
        /* CommentsRead */
      ) || scopes.includes(
        "comments:write"
        /* CommentsWrite */
      ) || scopes.includes(
        "room:read"
        /* Read */
      ) || scopes.includes(
        "room:write"
        /* Write */
      );
    } else if (requestedScope === "room:read") {
      return scopes.includes(
        "room:read"
        /* Read */
      ) || scopes.includes(
        "room:write"
        /* Write */
      );
    }
    return false;
  }
  __name(hasCorrespondingScopes, "hasCorrespondingScopes");
  function getCachedToken(requestOptions) {
    const now2 = Math.ceil(Date.now() / 1e3);
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];
      const expiresAt = expiryTimes[i];
      if (expiresAt <= now2) {
        tokens.splice(i, 1);
        expiryTimes.splice(i, 1);
        continue;
      }
      if (token.parsed.k === "id") {
        return token;
      } else if (token.parsed.k === "acc") {
        if (!requestOptions.roomId && Object.entries(token.parsed.perms).length === 0) {
          return token;
        }
        for (const [resource, scopes] of Object.entries(token.parsed.perms)) {
          if (!requestOptions.roomId) {
            if (resource.includes("*") && hasCorrespondingScopes(requestOptions.requestedScope, scopes)) {
              return token;
            }
          } else if (resource.includes("*") && requestOptions.roomId.startsWith(resource.replace("*", "")) || requestOptions.roomId === resource && hasCorrespondingScopes(requestOptions.requestedScope, scopes)) {
            return token;
          }
        }
      }
    }
    return void 0;
  }
  __name(getCachedToken, "getCachedToken");
  async function makeAuthRequest(options2) {
    const fetcher = authOptions.polyfills?.fetch ?? (typeof window === "undefined" ? void 0 : window.fetch);
    if (authentication.type === "private") {
      if (fetcher === void 0) {
        throw new StopRetrying(
          "To use Liveblocks client in a non-DOM environment with a url as auth endpoint, you need to provide a fetch polyfill."
        );
      }
      const response = await fetchAuthEndpoint(fetcher, authentication.url, {
        room: options2.roomId
      });
      const parsed = parseAuthToken(response.token);
      if (seenTokens.has(parsed.raw)) {
        throw new StopRetrying(
          "The same Liveblocks auth token was issued from the backend before. Caching Liveblocks tokens is not supported."
        );
      }
      onAuthenticate?.(parsed.parsed);
      return parsed;
    }
    if (authentication.type === "custom") {
      const response = await authentication.callback(options2.roomId);
      if (response && typeof response === "object") {
        if (typeof response.token === "string") {
          const parsed = parseAuthToken(response.token);
          onAuthenticate?.(parsed.parsed);
          return parsed;
        } else if (typeof response.error === "string") {
          const reason = `Authentication failed: ${"reason" in response && typeof response.reason === "string" ? response.reason : "Forbidden"}`;
          if (response.error === "forbidden") {
            throw new StopRetrying(reason);
          } else {
            throw new Error(reason);
          }
        }
      }
      throw new Error(
        'Your authentication callback function should return a token, but it did not. Hint: the return value should look like: { token: "..." }'
      );
    }
    throw new Error(
      "Unexpected authentication type. Must be private or custom."
    );
  }
  __name(makeAuthRequest, "makeAuthRequest");
  async function getAuthValue(requestOptions) {
    if (authentication.type === "public") {
      return { type: "public", publicApiKey: authentication.publicApiKey };
    }
    const cachedToken = getCachedToken(requestOptions);
    if (cachedToken !== void 0) {
      return { type: "secret", token: cachedToken };
    }
    let currentPromise;
    if (requestOptions.roomId) {
      currentPromise = requestPromises.get(requestOptions.roomId);
      if (currentPromise === void 0) {
        currentPromise = makeAuthRequest(requestOptions);
        requestPromises.set(requestOptions.roomId, currentPromise);
      }
    } else {
      currentPromise = requestPromises.get("liveblocks-user-token");
      if (currentPromise === void 0) {
        currentPromise = makeAuthRequest(requestOptions);
        requestPromises.set("liveblocks-user-token", currentPromise);
      }
    }
    try {
      const token = await currentPromise;
      const BUFFER = 30;
      const expiresAt = Math.floor(Date.now() / 1e3) + (token.parsed.exp - token.parsed.iat) - BUFFER;
      seenTokens.add(token.raw);
      tokens.push(token);
      expiryTimes.push(expiresAt);
      return { type: "secret", token };
    } finally {
      if (requestOptions.roomId) {
        requestPromises.delete(requestOptions.roomId);
      } else {
        requestPromises.delete("liveblocks-user-token");
      }
    }
  }
  __name(getAuthValue, "getAuthValue");
  return {
    reset,
    getAuthValue
  };
}
__name(createAuthManager, "createAuthManager");
function prepareAuthentication(authOptions) {
  const { publicApiKey, authEndpoint } = authOptions;
  if (authEndpoint !== void 0 && publicApiKey !== void 0) {
    throw new Error(
      "You cannot simultaneously use `publicApiKey` and `authEndpoint` options. Please pick one and leave the other option unspecified. For more information: https://liveblocks.io/docs/api-reference/liveblocks-client#createClient"
    );
  }
  if (typeof publicApiKey === "string") {
    if (publicApiKey.startsWith("sk_")) {
      throw new Error(
        "Invalid `publicApiKey` option. The value you passed is a secret key, which should not be used from the client. Please only ever pass a public key here. For more information: https://liveblocks.io/docs/api-reference/liveblocks-client#createClientPublicKey"
      );
    } else if (!publicApiKey.startsWith("pk_")) {
      throw new Error(
        "Invalid key. Please use the public key format: pk_<public key>. For more information: https://liveblocks.io/docs/api-reference/liveblocks-client#createClientPublicKey"
      );
    }
    return {
      type: "public",
      publicApiKey
    };
  }
  if (typeof authEndpoint === "string") {
    return {
      type: "private",
      url: authEndpoint
    };
  } else if (typeof authEndpoint === "function") {
    return {
      type: "custom",
      callback: authEndpoint
    };
  } else if (authEndpoint !== void 0) {
    throw new Error(
      "The `authEndpoint` option must be a string or a function. For more information: https://liveblocks.io/docs/api-reference/liveblocks-client#createClientAuthEndpoint"
    );
  }
  throw new Error(
    "Invalid Liveblocks client options. Please provide either a `publicApiKey` or `authEndpoint` option. They cannot both be empty. For more information: https://liveblocks.io/docs/api-reference/liveblocks-client#createClient"
  );
}
__name(prepareAuthentication, "prepareAuthentication");
async function fetchAuthEndpoint(fetch, endpoint, body) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: stringifyOrLog(body)
  });
  if (!res.ok) {
    const reason = `${(await res.text()).trim() || "reason not provided in auth response"} (${res.status} returned by POST ${endpoint})`;
    if (NON_RETRY_STATUS_CODES.includes(res.status)) {
      throw new StopRetrying(`Unauthorized: ${reason}`);
    } else {
      throw new Error(`Failed to authenticate: ${reason}`);
    }
  }
  let data;
  try {
    data = await res.json();
  } catch (er) {
    throw new Error(
      `Expected a JSON response when doing a POST request on "${endpoint}". ${String(
        er
      )}`
    );
  }
  if (!isPlainObject(data) || typeof data.token !== "string") {
    throw new Error(
      `Expected a JSON response of the form \`{ token: "..." }\` when doing a POST request on "${endpoint}", but got ${stringifyOrLog(
        data
      )}`
    );
  }
  const { token } = data;
  return { token };
}
__name(fetchAuthEndpoint, "fetchAuthEndpoint");
var DEFAULT_BASE_URL = "https://api.liveblocks.io";
var OpCode = Object.freeze({
  INIT: 0,
  SET_PARENT_KEY: 1,
  CREATE_LIST: 2,
  UPDATE_OBJECT: 3,
  CREATE_OBJECT: 4,
  DELETE_CRDT: 5,
  DELETE_OBJECT_KEY: 6,
  CREATE_MAP: 7,
  CREATE_REGISTER: 8
});
function isIgnoredOp(op) {
  return op.type === OpCode.DELETE_CRDT && op.id === "ACK";
}
__name(isIgnoredOp, "isIgnoredOp");
var CrdtType = Object.freeze({
  OBJECT: 0,
  LIST: 1,
  MAP: 2,
  REGISTER: 3
});
function isRootStorageNode(node) {
  return node[0] === "root";
}
__name(isRootStorageNode, "isRootStorageNode");
function isObjectStorageNode(node) {
  return node[1].type === CrdtType.OBJECT;
}
__name(isObjectStorageNode, "isObjectStorageNode");
function isListStorageNode(node) {
  return node[1].type === CrdtType.LIST;
}
__name(isListStorageNode, "isListStorageNode");
function isMapStorageNode(node) {
  return node[1].type === CrdtType.MAP;
}
__name(isMapStorageNode, "isMapStorageNode");
function isRegisterStorageNode(node) {
  return node[1].type === CrdtType.REGISTER;
}
__name(isRegisterStorageNode, "isRegisterStorageNode");
function isCompactRootNode(node) {
  return node[0] === "root";
}
__name(isCompactRootNode, "isCompactRootNode");
function* compactNodesToNodeStream(compactNodes) {
  for (const cnode of compactNodes) {
    if (isCompactRootNode(cnode)) {
      yield [cnode[0], { type: CrdtType.OBJECT, data: cnode[1] }];
      continue;
    }
    switch (cnode[1]) {
      case CrdtType.OBJECT:
        yield [cnode[0], { type: CrdtType.OBJECT, parentId: cnode[2], parentKey: cnode[3], data: cnode[4] }];
        break;
      case CrdtType.LIST:
        yield [cnode[0], { type: CrdtType.LIST, parentId: cnode[2], parentKey: cnode[3] }];
        break;
      case CrdtType.MAP:
        yield [cnode[0], { type: CrdtType.MAP, parentId: cnode[2], parentKey: cnode[3] }];
        break;
      case CrdtType.REGISTER:
        yield [cnode[0], { type: CrdtType.REGISTER, parentId: cnode[2], parentKey: cnode[3], data: cnode[4] }];
        break;
      default:
    }
  }
}
__name(compactNodesToNodeStream, "compactNodesToNodeStream");
var MIN_CODE = 32;
var MAX_CODE = 126;
var NUM_DIGITS = MAX_CODE - MIN_CODE + 1;
var ZERO = nthDigit(0);
var ONE = nthDigit(1);
var ZERO_NINE = ZERO + nthDigit(-1);
function nthDigit(n) {
  const code = MIN_CODE + (n < 0 ? NUM_DIGITS + n : n);
  if (code < MIN_CODE || code > MAX_CODE) {
    throw new Error(`Invalid n value: ${n}`);
  }
  return String.fromCharCode(code);
}
__name(nthDigit, "nthDigit");
function makePosition(x, y) {
  if (x !== void 0 && y !== void 0) {
    return between(x, y);
  } else if (x !== void 0) {
    return after(x);
  } else if (y !== void 0) {
    return before(y);
  } else {
    return ONE;
  }
}
__name(makePosition, "makePosition");
function before(pos) {
  const lastIndex = pos.length - 1;
  for (let i = 0; i <= lastIndex; i++) {
    const code = pos.charCodeAt(i);
    if (code <= MIN_CODE) {
      continue;
    }
    if (i === lastIndex) {
      if (code === MIN_CODE + 1) {
        return pos.substring(0, i) + ZERO_NINE;
      } else {
        return pos.substring(0, i) + String.fromCharCode(code - 1);
      }
    } else {
      return pos.substring(0, i + 1);
    }
  }
  return ONE;
}
__name(before, "before");
var VIEWPORT_START = 2;
var VIEWPORT_STEP = 3;
function after(pos) {
  for (let i = 0; i < pos.length; i++) {
    const code = pos.charCodeAt(i);
    if (code < MIN_CODE || code > MAX_CODE) {
      return pos + ONE;
    }
  }
  while (pos.length > 1 && pos.charCodeAt(pos.length - 1) === MIN_CODE) {
    pos = pos.slice(0, -1);
  }
  if (pos.length === 0 || pos === ZERO) {
    return ONE;
  }
  let viewport = VIEWPORT_START;
  if (pos.length > VIEWPORT_START) {
    viewport = VIEWPORT_START + Math.ceil((pos.length - VIEWPORT_START) / VIEWPORT_STEP) * VIEWPORT_STEP;
  }
  const result = incrementWithinViewport(pos, viewport);
  if (result !== null) {
    return result;
  }
  viewport += VIEWPORT_STEP;
  const extendedResult = incrementWithinViewport(pos, viewport);
  if (extendedResult !== null) {
    return extendedResult;
  }
  return pos + ONE;
}
__name(after, "after");
function incrementWithinViewport(pos, viewport) {
  const digits = [];
  for (let i = 0; i < viewport; i++) {
    if (i < pos.length) {
      digits.push(pos.charCodeAt(i) - MIN_CODE);
    } else {
      digits.push(0);
    }
  }
  let carry = 1;
  for (let i = viewport - 1; i >= 0 && carry; i--) {
    const sum = digits[i] + carry;
    if (sum >= NUM_DIGITS) {
      digits[i] = 0;
      carry = 1;
    } else {
      digits[i] = sum;
      carry = 0;
    }
  }
  if (carry) {
    return null;
  }
  let result = "";
  for (const d of digits) {
    result += String.fromCharCode(d + MIN_CODE);
  }
  while (result.length > 1 && result.charCodeAt(result.length - 1) === MIN_CODE) {
    result = result.slice(0, -1);
  }
  return result;
}
__name(incrementWithinViewport, "incrementWithinViewport");
function between(lo, hi) {
  if (lo < hi) {
    return _between(lo, hi);
  } else if (lo > hi) {
    return _between(hi, lo);
  } else {
    throw new Error("Cannot compute value between two equal positions");
  }
}
__name(between, "between");
function _between(lo, hi) {
  let index = 0;
  const loLen = lo.length;
  const hiLen = hi.length;
  while (true) {
    const loCode = index < loLen ? lo.charCodeAt(index) : MIN_CODE;
    const hiCode = index < hiLen ? hi.charCodeAt(index) : MAX_CODE;
    if (loCode === hiCode) {
      index++;
      continue;
    }
    if (hiCode - loCode === 1) {
      const size = index + 1;
      let prefix = lo.substring(0, size);
      if (prefix.length < size) {
        prefix += ZERO.repeat(size - prefix.length);
      }
      const suffix = lo.substring(size);
      const nines = "";
      return prefix + _between(suffix, nines);
    } else {
      return takeN(lo, index) + String.fromCharCode(hiCode + loCode >> 1);
    }
  }
}
__name(_between, "_between");
function takeN(pos, n) {
  return n < pos.length ? pos.substring(0, n) : pos + ZERO.repeat(n - pos.length);
}
__name(takeN, "takeN");
var MIN_NON_ZERO_CODE = MIN_CODE + 1;
function isPos(str) {
  if (str === "") {
    return false;
  }
  const lastIdx = str.length - 1;
  const last = str.charCodeAt(lastIdx);
  if (last < MIN_NON_ZERO_CODE || last > MAX_CODE) {
    return false;
  }
  for (let i = 0; i < lastIdx; i++) {
    const code = str.charCodeAt(i);
    if (code < MIN_CODE || code > MAX_CODE) {
      return false;
    }
  }
  return true;
}
__name(isPos, "isPos");
function convertToPos(str) {
  const codes = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    codes.push(code < MIN_CODE ? MIN_CODE : code > MAX_CODE ? MAX_CODE : code);
  }
  while (codes.length > 0 && codes[codes.length - 1] === MIN_CODE) {
    codes.length--;
  }
  return codes.length > 0 ? String.fromCharCode(...codes) : (
    // Edge case: the str was a 0-only string, which is invalid. Default back to .1
    ONE
  );
}
__name(convertToPos, "convertToPos");
function asPos(str) {
  return isPos(str) ? str : convertToPos(str);
}
__name(asPos, "asPos");
function createManagedPool(roomId, options2) {
  const {
    getCurrentConnectionId,
    onDispatch,
    isStorageWritable = /* @__PURE__ */ __name(() => true, "isStorageWritable")
  } = options2;
  let clock = 0;
  let opClock = 0;
  const nodes = /* @__PURE__ */ new Map();
  return {
    roomId,
    nodes,
    getNode: /* @__PURE__ */ __name((id) => nodes.get(id), "getNode"),
    addNode: /* @__PURE__ */ __name((id, node) => void nodes.set(id, node), "addNode"),
    deleteNode: /* @__PURE__ */ __name((id) => void nodes.delete(id), "deleteNode"),
    generateId: /* @__PURE__ */ __name(() => `${getCurrentConnectionId()}:${clock++}`, "generateId"),
    generateOpId: /* @__PURE__ */ __name(() => `${getCurrentConnectionId()}:${opClock++}`, "generateOpId"),
    dispatch(ops, reverse, storageUpdates) {
      onDispatch?.(ops, reverse, storageUpdates);
    },
    assertStorageIsWritable: /* @__PURE__ */ __name(() => {
      if (!isStorageWritable()) {
        throw new Error(
          "Cannot write to storage with a read only user, please ensure the user has write permissions"
        );
      }
    }, "assertStorageIsWritable")
  };
}
__name(createManagedPool, "createManagedPool");
function crdtAsLiveNode(value) {
  return value;
}
__name(crdtAsLiveNode, "crdtAsLiveNode");
function HasParent(node, key, pos = asPos(key)) {
  return Object.freeze({ type: "HasParent", node, key, pos });
}
__name(HasParent, "HasParent");
var NoParent = Object.freeze({ type: "NoParent" });
function Orphaned(oldKey, oldPos = asPos(oldKey)) {
  return Object.freeze({ type: "Orphaned", oldKey, oldPos });
}
__name(Orphaned, "Orphaned");
var AbstractCrdt = class {
  static {
    __name(this, "AbstractCrdt");
  }
  //                  ^^^^^^^^^^^^ TODO: Make this an interface
  #pool;
  #id;
  #parent = NoParent;
  /** @internal */
  _getParentKeyOrThrow() {
    switch (this.parent.type) {
      case "HasParent":
        return this.parent.key;
      case "NoParent":
        throw new Error("Parent key is missing");
      case "Orphaned":
        return this.parent.oldKey;
      default:
        return assertNever(this.parent, "Unknown state");
    }
  }
  /** @internal */
  get _parentPos() {
    switch (this.parent.type) {
      case "HasParent":
        return this.parent.pos;
      case "NoParent":
        throw new Error("Parent key is missing");
      case "Orphaned":
        return this.parent.oldPos;
      default:
        return assertNever(this.parent, "Unknown state");
    }
  }
  /** @internal */
  get _pool() {
    return this.#pool;
  }
  get roomId() {
    return this.#pool ? this.#pool.roomId : null;
  }
  /** @internal */
  get _id() {
    return this.#id;
  }
  /** @internal */
  get parent() {
    return this.#parent;
  }
  /** @internal */
  get _parentKey() {
    switch (this.parent.type) {
      case "HasParent":
        return this.parent.key;
      case "NoParent":
        return null;
      case "Orphaned":
        return this.parent.oldKey;
      default:
        return assertNever(this.parent, "Unknown state");
    }
  }
  /** @internal */
  _apply(op, _isLocal) {
    switch (op.type) {
      case OpCode.DELETE_CRDT: {
        if (this.parent.type === "HasParent") {
          return this.parent.node._detachChild(crdtAsLiveNode(this));
        }
        return { modified: false };
      }
    }
    return { modified: false };
  }
  /** @internal */
  _setParentLink(newParentNode, newParentKey) {
    switch (this.parent.type) {
      case "HasParent":
        if (this.parent.node !== newParentNode) {
          throw new Error("Cannot set parent: node already has a parent");
        } else {
          this.#parent = HasParent(newParentNode, newParentKey);
          return;
        }
      case "Orphaned":
      case "NoParent": {
        this.#parent = HasParent(newParentNode, newParentKey);
        return;
      }
      default:
        return assertNever(this.parent, "Unknown state");
    }
  }
  /** @internal */
  _attach(id, pool) {
    if (this.#id || this.#pool) {
      throw new Error("Cannot attach node: already attached");
    }
    pool.addNode(id, crdtAsLiveNode(this));
    this.#id = id;
    this.#pool = pool;
  }
  /** @internal */
  _detach() {
    if (this.#pool && this.#id) {
      this.#pool.deleteNode(this.#id);
    }
    switch (this.parent.type) {
      case "HasParent": {
        this.#parent = Orphaned(this.parent.key, this.parent.pos);
        break;
      }
      case "NoParent": {
        this.#parent = NoParent;
        break;
      }
      case "Orphaned": {
        break;
      }
      default:
        assertNever(this.parent, "Unknown state");
    }
    this.#pool = void 0;
  }
  /**
   * Serializes this CRDT and all its children into a list of creation ops
   * with opIds. Used for forward operations that will be sent over the wire
   * immediately. Each op gets a unique opId for server acknowledgement.
   *
   * @internal
   */
  _toOpsWithOpId(parentId, parentKey, pool) {
    return this._toOps(parentId, parentKey).map((op) => ({
      opId: pool.generateOpId(),
      ...op
    }));
  }
  /** This caches the result of the last .toJSON() call for this Live node. */
  #cachedJson;
  #cachedTreeNodeKey;
  /** This caches the result of the last .toTreeNode() call for this Live node. */
  #cachedTreeNode;
  /**
   * @internal
   *
   * Clear the cached snapshots, so that the next call to `.toJSON()` will
   * recompute. Call this after every mutation to the Live node.
   */
  invalidate() {
    if (this.#cachedJson !== void 0 || this.#cachedTreeNode !== void 0) {
      this.#cachedJson = void 0;
      this.#cachedTreeNode = void 0;
      if (this.parent.type === "HasParent") {
        this.parent.node.invalidate();
      }
    }
  }
  /**
   * @internal
   * Return an snapshot of this Live tree for use in DevTools.
   */
  toTreeNode(key) {
    if (this.#cachedTreeNode === void 0 || this.#cachedTreeNodeKey !== key) {
      this.#cachedTreeNodeKey = key;
      this.#cachedTreeNode = this._toTreeNode(key);
    }
    return this.#cachedTreeNode;
  }
  /**
   * @private
   * Returns true if the cached JSON snapshot exists and is reference-equal
   * to the given value. Does not trigger a recompute.
   */
  hasCache(value) {
    return this.#cachedJson !== void 0 && this.#cachedJson === value;
  }
  /**
   * Return a JSON-compatible snapshot of this Live node and its children.
   * LiveObject values become plain objects, LiveList values become arrays,
   * and LiveMap values also become plain objects (not Map instances).
   * The result is cached and only recomputed when the contents change.
   */
  toJSON() {
    if (this.#cachedJson === void 0) {
      this.#cachedJson = this._toJSON();
    }
    return this.#cachedJson;
  }
};
var LiveRegister = class _LiveRegister extends AbstractCrdt {
  static {
    __name(this, "_LiveRegister");
  }
  #data;
  constructor(data) {
    super();
    this.#data = data;
  }
  get data() {
    return this.#data;
  }
  /** @internal */
  static _deserialize([id, item], _parentToChildren, pool) {
    const register = new _LiveRegister(item.data);
    register._attach(id, pool);
    return register;
  }
  /** @internal */
  _toOps(parentId, parentKey) {
    if (this._id === void 0) {
      throw new Error(
        "Cannot serialize register if parentId or parentKey is undefined"
      );
    }
    return [
      {
        type: OpCode.CREATE_REGISTER,
        id: this._id,
        parentId,
        parentKey,
        data: this.data
      }
    ];
  }
  /** @internal */
  _serialize() {
    if (this.parent.type !== "HasParent") {
      throw new Error("Cannot serialize LiveRegister if parent is missing");
    }
    return {
      type: CrdtType.REGISTER,
      parentId: nn(this.parent.node._id, "Parent node expected to have ID"),
      parentKey: this.parent.key,
      data: this.data
    };
  }
  /** @internal */
  _attachChild(_op) {
    throw new Error("Method not implemented.");
  }
  /** @internal */
  _detachChild(_crdt) {
    throw new Error("Method not implemented.");
  }
  /** @internal */
  _apply(op, isLocal) {
    return super._apply(op, isLocal);
  }
  /** @internal */
  _toTreeNode(key) {
    return {
      type: "Json",
      id: this._id ?? nanoid(),
      key,
      payload: this.#data
    };
  }
  /** @internal */
  _toJSON() {
    return this.#data;
  }
  clone() {
    return deepClone(this.data);
  }
};
function childNodeLt(a, b) {
  return a._parentPos < b._parentPos;
}
__name(childNodeLt, "childNodeLt");
var LiveList = class _LiveList extends AbstractCrdt {
  static {
    __name(this, "_LiveList");
  }
  #items;
  #implicitlyDeletedItems;
  #unacknowledgedSets;
  constructor(items) {
    super();
    this.#implicitlyDeletedItems = /* @__PURE__ */ new WeakSet();
    this.#unacknowledgedSets = /* @__PURE__ */ new Map();
    const nodes = [];
    let lastPos;
    for (const item of items) {
      const pos = makePosition(lastPos);
      const node = lsonToLiveNode(item);
      node._setParentLink(this, pos);
      nodes.push(node);
      lastPos = pos;
    }
    this.#items = SortedList.fromAlreadySorted(nodes, childNodeLt);
  }
  /** @internal */
  static _deserialize([id, _], parentToChildren, pool) {
    const list2 = new _LiveList([]);
    list2._attach(id, pool);
    const children = parentToChildren.get(id);
    if (children === void 0) {
      return list2;
    }
    for (const node of children) {
      const crdt = node[1];
      const child = deserialize(node, parentToChildren, pool);
      child._setParentLink(list2, crdt.parentKey);
      list2.#insert(child);
    }
    return list2;
  }
  /**
   * @internal
   * This function assumes that the resulting ops will be sent to the server if they have an 'opId'
   * so we mutate _unacknowledgedSets to avoid potential flickering
   * https://github.com/liveblocks/liveblocks/pull/1177
   *
   * This is quite unintuitive and should disappear as soon as
   * we introduce an explicit LiveList.Set operation
   */
  _toOps(parentId, parentKey) {
    if (this._id === void 0) {
      throw new Error("Cannot serialize item is not attached");
    }
    const ops = [];
    const op = {
      id: this._id,
      type: OpCode.CREATE_LIST,
      parentId,
      parentKey
    };
    ops.push(op);
    for (const item of this.#items) {
      const parentKey2 = item._getParentKeyOrThrow();
      const childOps = HACK_addIntentAndDeletedIdToOperation(
        item._toOps(this._id, parentKey2),
        void 0
      );
      for (const childOp of childOps) {
        ops.push(childOp);
      }
    }
    return ops;
  }
  /**
   * Inserts a new child into the list in the correct location (binary search
   * finds correct position efficiently). Returns the insertion index.
   */
  #insert(childNode) {
    const index = this.#items.add(childNode);
    this.invalidate();
    return index;
  }
  /**
   * Updates an item's position and repositions it in the sorted list.
   * Encapsulates the remove -> mutate -> add cycle needed when changing sort keys.
   *
   * IMPORTANT: Item must exist in this list. List count remains unchanged.
   */
  #updateItemPosition(item, newKey) {
    item._setParentLink(this, newKey);
    this.#items.reposition(item);
    this.invalidate();
  }
  /**
   * Updates an item's position by index. Safer than #updateItemPosition when you have
   * an index, as it ensures the item exists and is from this list.
   */
  #updateItemPositionAt(index, newKey) {
    const item = nn(this.#items.at(index));
    this.#updateItemPosition(item, newKey);
  }
  /** @internal */
  _indexOfPosition(position) {
    return this.#items.findIndex(
      (item) => item._getParentKeyOrThrow() === position
    );
  }
  /** @internal */
  _attach(id, pool) {
    super._attach(id, pool);
    for (const item of this.#items) {
      item._attach(pool.generateId(), pool);
    }
  }
  /** @internal */
  _detach() {
    super._detach();
    for (const item of this.#items) {
      item._detach();
    }
  }
  #applySetRemote(op) {
    if (this._pool === void 0) {
      throw new Error("Can't attach child if managed pool is not present");
    }
    const { id, parentKey: key } = op;
    const child = creationOpToLiveNode(op);
    child._attach(id, this._pool);
    child._setParentLink(this, key);
    const deletedId = op.deletedId;
    const indexOfItemWithSamePosition = this._indexOfPosition(key);
    if (indexOfItemWithSamePosition !== -1) {
      const itemWithSamePosition = nn(
        this.#items.removeAt(indexOfItemWithSamePosition)
      );
      if (itemWithSamePosition._id === deletedId) {
        itemWithSamePosition._detach();
        this.#items.add(child);
        return {
          modified: makeUpdate(this, [
            setDelta(indexOfItemWithSamePosition, child)
          ]),
          reverse: []
        };
      } else {
        this.#implicitlyDeletedItems.add(itemWithSamePosition);
        this.#items.remove(itemWithSamePosition);
        this.#items.add(child);
        const delta = [
          setDelta(indexOfItemWithSamePosition, child)
        ];
        const deleteDelta2 = this.#detachItemAssociatedToSetOperation(
          op.deletedId
        );
        if (deleteDelta2) {
          delta.push(deleteDelta2);
        }
        return {
          modified: makeUpdate(this, delta),
          reverse: []
        };
      }
    } else {
      const updates = [];
      const deleteDelta2 = this.#detachItemAssociatedToSetOperation(
        op.deletedId
      );
      if (deleteDelta2) {
        updates.push(deleteDelta2);
      }
      this.#insert(child);
      updates.push(insertDelta(this._indexOfPosition(key), child));
      return {
        reverse: [],
        modified: makeUpdate(this, updates)
      };
    }
  }
  #applySetAck(op) {
    if (this._pool === void 0) {
      throw new Error("Can't attach child if managed pool is not present");
    }
    const delta = [];
    const deletedDelta = this.#detachItemAssociatedToSetOperation(op.deletedId);
    if (deletedDelta) {
      delta.push(deletedDelta);
    }
    const unacknowledgedOpId = this.#unacknowledgedSets.get(op.parentKey);
    if (unacknowledgedOpId !== void 0) {
      if (unacknowledgedOpId !== op.opId) {
        return delta.length === 0 ? { modified: false } : { modified: makeUpdate(this, delta), reverse: [] };
      } else {
        this.#unacknowledgedSets.delete(op.parentKey);
      }
    }
    const indexOfItemWithSamePosition = this._indexOfPosition(op.parentKey);
    const existingItem = this.#items.find((item) => item._id === op.id);
    if (existingItem !== void 0) {
      if (existingItem._parentKey === op.parentKey) {
        return {
          modified: delta.length > 0 ? makeUpdate(this, delta) : false,
          reverse: []
        };
      }
      if (indexOfItemWithSamePosition !== -1) {
        const itemAtPosition = nn(
          this.#items.removeAt(indexOfItemWithSamePosition)
        );
        this.#implicitlyDeletedItems.add(itemAtPosition);
        delta.push(deleteDelta(indexOfItemWithSamePosition, itemAtPosition));
      }
      const prevIndex = this.#items.findIndex((item) => item === existingItem);
      this.#updateItemPosition(existingItem, op.parentKey);
      const newIndex = this.#items.findIndex((item) => item === existingItem);
      if (newIndex !== prevIndex) {
        delta.push(moveDelta(prevIndex, newIndex, existingItem));
      }
      return {
        modified: delta.length > 0 ? makeUpdate(this, delta) : false,
        reverse: []
      };
    } else {
      const orphan = this._pool.getNode(op.id);
      if (orphan && this.#implicitlyDeletedItems.has(orphan)) {
        orphan._setParentLink(this, op.parentKey);
        this.#implicitlyDeletedItems.delete(orphan);
        const recreatedItemIndex = this.#insert(orphan);
        return {
          modified: makeUpdate(this, [
            // If there is an item at this position, update is a set, else it's an insert
            indexOfItemWithSamePosition === -1 ? insertDelta(recreatedItemIndex, orphan) : setDelta(recreatedItemIndex, orphan),
            ...delta
          ]),
          reverse: []
        };
      } else {
        if (indexOfItemWithSamePosition !== -1) {
          const displaced = nn(
            this.#items.removeAt(indexOfItemWithSamePosition)
          );
          this.#implicitlyDeletedItems.add(displaced);
        }
        const { newItem, newIndex } = this.#createAttachItemAndSort(
          op,
          op.parentKey
        );
        return {
          modified: makeUpdate(this, [
            // If there is an item at this position, update is a set, else it's an insert
            indexOfItemWithSamePosition === -1 ? insertDelta(newIndex, newItem) : setDelta(newIndex, newItem),
            ...delta
          ]),
          reverse: []
        };
      }
    }
  }
  /**
   * Returns the update delta of the deletion or null
   */
  #detachItemAssociatedToSetOperation(deletedId) {
    if (deletedId === void 0 || this._pool === void 0) {
      return null;
    }
    const deletedItem = this._pool.getNode(deletedId);
    if (deletedItem === void 0) {
      return null;
    }
    const result = this._detachChild(deletedItem);
    if (result.modified === false) {
      return null;
    }
    return result.modified.updates[0];
  }
  #applyRemoteInsert(op) {
    if (this._pool === void 0) {
      throw new Error("Can't attach child if managed pool is not present");
    }
    const key = asPos(op.parentKey);
    const existingItemIndex = this._indexOfPosition(key);
    if (existingItemIndex !== -1) {
      this.#shiftItemPosition(existingItemIndex, key);
    }
    const { newItem, newIndex } = this.#createAttachItemAndSort(op, key);
    return {
      modified: makeUpdate(this, [insertDelta(newIndex, newItem)]),
      reverse: []
    };
  }
  #applyInsertAck(op) {
    const existingItem = this.#items.find((item) => item._id === op.id);
    const key = asPos(op.parentKey);
    const itemIndexAtPosition = this._indexOfPosition(key);
    if (existingItem) {
      if (existingItem._parentKey === key) {
        return {
          modified: false
        };
      } else {
        const oldPositionIndex = this.#items.findIndex(
          (item) => item === existingItem
        );
        if (itemIndexAtPosition !== -1) {
          this.#shiftItemPosition(itemIndexAtPosition, key);
        }
        this.#updateItemPosition(existingItem, key);
        const newIndex = this._indexOfPosition(key);
        if (newIndex === oldPositionIndex) {
          return { modified: false };
        }
        return {
          modified: makeUpdate(this, [
            moveDelta(oldPositionIndex, newIndex, existingItem)
          ]),
          reverse: []
        };
      }
    } else {
      const orphan = nn(this._pool).getNode(op.id);
      if (orphan && this.#implicitlyDeletedItems.has(orphan)) {
        orphan._setParentLink(this, key);
        this.#implicitlyDeletedItems.delete(orphan);
        this.#insert(orphan);
        const newIndex = this._indexOfPosition(key);
        return {
          modified: makeUpdate(this, [insertDelta(newIndex, orphan)]),
          reverse: []
        };
      } else {
        if (itemIndexAtPosition !== -1) {
          this.#shiftItemPosition(itemIndexAtPosition, key);
        }
        const { newItem, newIndex } = this.#createAttachItemAndSort(op, key);
        return {
          modified: makeUpdate(this, [insertDelta(newIndex, newItem)]),
          reverse: []
        };
      }
    }
  }
  #applyInsertUndoRedo(op) {
    const { id, parentKey: key } = op;
    const child = creationOpToLiveNode(op);
    if (this._pool?.getNode(id) !== void 0) {
      return { modified: false };
    }
    child._attach(id, nn(this._pool));
    child._setParentLink(this, key);
    const existingItemIndex = this._indexOfPosition(key);
    let newKey = key;
    if (existingItemIndex !== -1) {
      const before2 = this.#items.at(existingItemIndex)?._parentPos;
      const after2 = this.#items.at(existingItemIndex + 1)?._parentPos;
      newKey = makePosition(before2, after2);
      child._setParentLink(this, newKey);
    }
    this.#insert(child);
    const newIndex = this._indexOfPosition(newKey);
    return {
      modified: makeUpdate(this, [insertDelta(newIndex, child)]),
      reverse: [{ type: OpCode.DELETE_CRDT, id }]
    };
  }
  #applySetUndoRedo(op) {
    const { id, parentKey: key } = op;
    const child = creationOpToLiveNode(op);
    if (this._pool?.getNode(id) !== void 0) {
      return { modified: false };
    }
    this.#unacknowledgedSets.set(key, nn(op.opId));
    const indexOfItemWithSameKey = this._indexOfPosition(key);
    child._attach(id, nn(this._pool));
    child._setParentLink(this, key);
    const newKey = key;
    if (indexOfItemWithSameKey !== -1) {
      const existingItem = this.#items.at(indexOfItemWithSameKey);
      existingItem._detach();
      this.#items.remove(existingItem);
      this.#items.add(child);
      const reverse = HACK_addIntentAndDeletedIdToOperation(
        existingItem._toOps(nn(this._id), key),
        op.id
      );
      const delta = [setDelta(indexOfItemWithSameKey, child)];
      const deletedDelta = this.#detachItemAssociatedToSetOperation(
        op.deletedId
      );
      if (deletedDelta) {
        delta.push(deletedDelta);
      }
      return {
        modified: makeUpdate(this, delta),
        reverse
      };
    } else {
      this.#insert(child);
      this.#detachItemAssociatedToSetOperation(op.deletedId);
      const newIndex = this._indexOfPosition(newKey);
      return {
        reverse: [{ type: OpCode.DELETE_CRDT, id }],
        modified: makeUpdate(this, [insertDelta(newIndex, child)])
      };
    }
  }
  /** @internal */
  _attachChild(op, source) {
    if (this._pool === void 0) {
      throw new Error("Can't attach child if managed pool is not present");
    }
    let result;
    if (op.intent === "set") {
      if (source === 1) {
        result = this.#applySetRemote(op);
      } else if (source === 2) {
        result = this.#applySetAck(op);
      } else {
        result = this.#applySetUndoRedo(op);
      }
    } else {
      if (source === 1) {
        result = this.#applyRemoteInsert(op);
      } else if (source === 2) {
        result = this.#applyInsertAck(op);
      } else {
        result = this.#applyInsertUndoRedo(op);
      }
    }
    if (result.modified !== false) {
      this.invalidate();
    }
    return result;
  }
  /** @internal */
  _detachChild(child) {
    if (child) {
      const parentKey = nn(child._parentKey);
      const reverse = child._toOps(nn(this._id), parentKey);
      const indexToDelete = this.#items.findIndex((item) => item === child);
      if (indexToDelete === -1) {
        return {
          modified: false
        };
      }
      const previousNode = this.#items.at(indexToDelete);
      this.#items.remove(child);
      this.invalidate();
      child._detach();
      return {
        modified: makeUpdate(this, [deleteDelta(indexToDelete, previousNode)]),
        reverse
      };
    }
    return { modified: false };
  }
  #applySetChildKeyRemote(newKey, child) {
    if (this.#implicitlyDeletedItems.has(child)) {
      this.#implicitlyDeletedItems.delete(child);
      child._setParentLink(this, newKey);
      const newIndex = this.#insert(child);
      return {
        modified: makeUpdate(this, [insertDelta(newIndex, child)]),
        reverse: []
      };
    }
    const previousKey = child._parentKey;
    if (newKey === previousKey) {
      return {
        modified: false
      };
    }
    const existingItemIndex = this._indexOfPosition(newKey);
    if (existingItemIndex === -1) {
      const previousIndex = this.#items.findIndex((item) => item === child);
      this.#updateItemPosition(child, newKey);
      const newIndex = this.#items.findIndex((item) => item === child);
      if (newIndex === previousIndex) {
        return {
          modified: false
        };
      }
      return {
        modified: makeUpdate(this, [moveDelta(previousIndex, newIndex, child)]),
        reverse: []
      };
    } else {
      this.#updateItemPositionAt(
        existingItemIndex,
        makePosition(newKey, this.#items.at(existingItemIndex + 1)?._parentPos)
      );
      const previousIndex = this.#items.findIndex((item) => item === child);
      this.#updateItemPosition(child, newKey);
      const newIndex = this.#items.findIndex((item) => item === child);
      if (newIndex === previousIndex) {
        return {
          modified: false
        };
      }
      return {
        modified: makeUpdate(this, [moveDelta(previousIndex, newIndex, child)]),
        reverse: []
      };
    }
  }
  #applySetChildKeyAck(newKey, child) {
    const previousKey = nn(child._parentKey);
    if (this.#implicitlyDeletedItems.has(child)) {
      const existingItemIndex = this._indexOfPosition(newKey);
      this.#implicitlyDeletedItems.delete(child);
      if (existingItemIndex !== -1) {
        const existingItem = this.#items.at(existingItemIndex);
        existingItem._setParentLink(
          this,
          makePosition(
            newKey,
            this.#items.at(existingItemIndex + 1)?._parentPos
          )
        );
        this.#items.reposition(existingItem);
      }
      child._setParentLink(this, newKey);
      const newIndex = this.#insert(child);
      return {
        modified: makeUpdate(this, [insertDelta(newIndex, child)]),
        reverse: []
      };
    } else {
      if (newKey === previousKey) {
        return {
          modified: false
        };
      }
      const previousIndex = this.#items.findIndex((item) => item === child);
      const existingItemIndex = this._indexOfPosition(newKey);
      if (existingItemIndex !== -1) {
        this.#updateItemPositionAt(
          existingItemIndex,
          makePosition(
            newKey,
            this.#items.at(existingItemIndex + 1)?._parentPos
          )
        );
      }
      this.#updateItemPosition(child, newKey);
      const newIndex = this.#items.findIndex((item) => item === child);
      if (previousIndex === newIndex) {
        return {
          modified: false
        };
      } else {
        return {
          modified: makeUpdate(this, [
            moveDelta(previousIndex, newIndex, child)
          ]),
          reverse: []
        };
      }
    }
  }
  #applySetChildKeyUndoRedo(newKey, child) {
    const previousKey = nn(child._parentKey);
    const previousIndex = this.#items.findIndex((item) => item === child);
    const existingItemIndex = this._indexOfPosition(newKey);
    let actualNewKey = newKey;
    if (existingItemIndex !== -1) {
      actualNewKey = makePosition(
        newKey,
        this.#items.at(existingItemIndex + 1)?._parentPos
      );
    }
    this.#updateItemPosition(child, actualNewKey);
    const newIndex = this.#items.findIndex((item) => item === child);
    if (previousIndex === newIndex) {
      return {
        modified: false
      };
    }
    return {
      modified: makeUpdate(this, [moveDelta(previousIndex, newIndex, child)]),
      reverse: [
        {
          type: OpCode.SET_PARENT_KEY,
          id: nn(child._id),
          parentKey: previousKey
        }
      ]
    };
  }
  /** @internal */
  _setChildKey(newKey, child, source) {
    if (source === 1) {
      return this.#applySetChildKeyRemote(newKey, child);
    } else if (source === 2) {
      return this.#applySetChildKeyAck(newKey, child);
    } else {
      return this.#applySetChildKeyUndoRedo(newKey, child);
    }
  }
  /** @internal */
  _apply(op, isLocal) {
    return super._apply(op, isLocal);
  }
  /** @internal */
  _serialize() {
    if (this.parent.type !== "HasParent") {
      throw new Error("Cannot serialize LiveList if parent is missing");
    }
    return {
      type: CrdtType.LIST,
      parentId: nn(this.parent.node._id, "Parent node expected to have ID"),
      parentKey: this.parent.key
    };
  }
  /**
   * Returns the number of elements.
   */
  get length() {
    return this.#items.length;
  }
  /**
   * Adds one element to the end of the LiveList.
   * @param element The element to add to the end of the LiveList.
   */
  push(element) {
    this._pool?.assertStorageIsWritable();
    return this.insert(element, this.length);
  }
  /**
   * Inserts one element at a specified index.
   * @param element The element to insert.
   * @param index The index at which you want to insert the element.
   */
  insert(element, index) {
    this._pool?.assertStorageIsWritable();
    if (index < 0 || index > this.#items.length) {
      throw new Error(
        `Cannot insert list item at index "${index}". index should be between 0 and ${this.#items.length}`
      );
    }
    const before2 = this.#items.at(index - 1)?._parentPos;
    const after2 = this.#items.at(index)?._parentPos;
    const position = makePosition(before2, after2);
    const value = lsonToLiveNode(element);
    value._setParentLink(this, position);
    this.#insert(value);
    if (this._pool && this._id) {
      const id = this._pool.generateId();
      value._attach(id, this._pool);
      this._pool.dispatch(
        value._toOpsWithOpId(this._id, position, this._pool),
        [{ type: OpCode.DELETE_CRDT, id }],
        /* @__PURE__ */ new Map([
          [this._id, makeUpdate(this, [insertDelta(index, value)])]
        ])
      );
    }
  }
  /**
   * Move one element from one index to another.
   * @param index The index of the element to move
   * @param targetIndex The index where the element should be after moving.
   */
  move(index, targetIndex) {
    this._pool?.assertStorageIsWritable();
    if (targetIndex < 0) {
      throw new Error("targetIndex cannot be less than 0");
    }
    if (targetIndex >= this.#items.length) {
      throw new Error(
        "targetIndex cannot be greater or equal than the list length"
      );
    }
    if (index < 0) {
      throw new Error("index cannot be less than 0");
    }
    if (index >= this.#items.length) {
      throw new Error("index cannot be greater or equal than the list length");
    }
    let beforePosition = null;
    let afterPosition = null;
    if (index < targetIndex) {
      afterPosition = targetIndex === this.#items.length - 1 ? void 0 : this.#items.at(targetIndex + 1)?._parentPos;
      beforePosition = this.#items.at(targetIndex)._parentPos;
    } else {
      afterPosition = this.#items.at(targetIndex)._parentPos;
      beforePosition = targetIndex === 0 ? void 0 : this.#items.at(targetIndex - 1)?._parentPos;
    }
    const position = makePosition(beforePosition, afterPosition);
    const item = this.#items.at(index);
    const previousPosition = item._getParentKeyOrThrow();
    this.#updateItemPositionAt(index, position);
    if (this._pool && this._id) {
      const storageUpdates = /* @__PURE__ */ new Map([
        [this._id, makeUpdate(this, [moveDelta(index, targetIndex, item)])]
      ]);
      this._pool.dispatch(
        [
          {
            type: OpCode.SET_PARENT_KEY,
            id: nn(item._id),
            opId: this._pool.generateOpId(),
            parentKey: position
          }
        ],
        [
          {
            type: OpCode.SET_PARENT_KEY,
            id: nn(item._id),
            parentKey: previousPosition
          }
        ],
        storageUpdates
      );
    }
  }
  /**
   * Deletes an element at the specified index
   * @param index The index of the element to delete
   */
  delete(index) {
    this._pool?.assertStorageIsWritable();
    if (index < 0 || index >= this.#items.length) {
      throw new Error(
        `Cannot delete list item at index "${index}". index should be between 0 and ${this.#items.length - 1}`
      );
    }
    const item = this.#items.at(index);
    item._detach();
    this.#items.remove(item);
    this.invalidate();
    if (this._pool) {
      const childRecordId = item._id;
      if (childRecordId) {
        const storageUpdates = /* @__PURE__ */ new Map();
        storageUpdates.set(
          nn(this._id),
          makeUpdate(this, [deleteDelta(index, item)])
        );
        this._pool.dispatch(
          [
            {
              id: childRecordId,
              opId: this._pool.generateOpId(),
              type: OpCode.DELETE_CRDT
            }
          ],
          item._toOps(nn(this._id), item._getParentKeyOrThrow()),
          storageUpdates
        );
      }
    }
  }
  clear() {
    this._pool?.assertStorageIsWritable();
    if (this._pool) {
      const ops = [];
      const reverseOps = [];
      const updateDelta = [];
      for (const item of this.#items) {
        item._detach();
        const childId = item._id;
        if (childId) {
          ops.push({
            type: OpCode.DELETE_CRDT,
            id: childId,
            opId: this._pool.generateOpId()
          });
          reverseOps.push(
            ...item._toOps(nn(this._id), item._getParentKeyOrThrow())
          );
          updateDelta.push(deleteDelta(0, item));
        }
      }
      this.#items.clear();
      this.invalidate();
      const storageUpdates = /* @__PURE__ */ new Map();
      storageUpdates.set(nn(this._id), makeUpdate(this, updateDelta));
      this._pool.dispatch(ops, reverseOps, storageUpdates);
    } else {
      for (const item of this.#items) {
        item._detach();
      }
      this.#items.clear();
      this.invalidate();
    }
  }
  set(index, item) {
    this._pool?.assertStorageIsWritable();
    if (index < 0 || index >= this.#items.length) {
      throw new Error(
        `Cannot set list item at index "${index}". index should be between 0 and ${this.#items.length - 1}`
      );
    }
    const existingItem = this.#items.at(index);
    const position = existingItem._getParentKeyOrThrow();
    const existingId = existingItem._id;
    existingItem._detach();
    const value = lsonToLiveNode(item);
    value._setParentLink(this, position);
    this.#items.remove(existingItem);
    this.#items.add(value);
    this.invalidate();
    if (this._pool && this._id) {
      const id = this._pool.generateId();
      value._attach(id, this._pool);
      const storageUpdates = /* @__PURE__ */ new Map();
      storageUpdates.set(this._id, makeUpdate(this, [setDelta(index, value)]));
      const ops = HACK_addIntentAndDeletedIdToOperation(
        value._toOpsWithOpId(this._id, position, this._pool),
        existingId
      );
      this.#unacknowledgedSets.set(position, nn(ops[0].opId));
      const reverseOps = HACK_addIntentAndDeletedIdToOperation(
        existingItem._toOps(this._id, position),
        id
      );
      this._pool.dispatch(ops, reverseOps, storageUpdates);
    }
  }
  #unwrap(node) {
    return liveNodeToLson(node);
  }
  /**
   * Tests whether all elements pass the test implemented by the provided function.
   * @param predicate Function to test for each element, taking two arguments (the element and its index).
   * @returns true if the predicate function returns a truthy value for every element. Otherwise, false.
   */
  every(predicate) {
    return this.#items.rawArray.every(
      (node, i) => predicate(this.#unwrap(node), i)
    );
  }
  /**
   * Creates an array with all elements that pass the test implemented by the provided function.
   * @param predicate Function to test each element of the LiveList. Return a value that coerces to true to keep the element, or to false otherwise.
   * @returns An array with the elements that pass the test.
   */
  filter(predicate) {
    const result = [];
    this.#items.rawArray.forEach((node, i) => {
      const item = this.#unwrap(node);
      if (predicate(item, i)) result.push(item);
    });
    return result;
  }
  /**
   * Returns the first element that satisfies the provided testing function.
   * @param predicate Function to execute on each value.
   * @returns The value of the first element in the LiveList that satisfies the provided testing function. Otherwise, undefined is returned.
   */
  find(predicate) {
    for (const [i, node] of this.#items.rawArray.entries()) {
      const item = this.#unwrap(node);
      if (predicate(item, i)) return item;
    }
    return void 0;
  }
  /**
   * Returns the index of the first element in the LiveList that satisfies the provided testing function.
   * @param predicate Function to execute on each value until the function returns true, indicating that the satisfying element was found.
   * @returns The index of the first element in the LiveList that passes the test. Otherwise, -1.
   */
  findIndex(predicate) {
    return this.#items.rawArray.findIndex(
      (node, i) => predicate(this.#unwrap(node), i)
    );
  }
  /**
   * Executes a provided function once for each element.
   * @param callbackfn Function to execute on each element.
   */
  forEach(callbackfn) {
    this.#items.rawArray.forEach(
      (node, i) => callbackfn(this.#unwrap(node), i)
    );
  }
  /**
   * Get the element at the specified index.
   * @param index The index on the element to get.
   * @returns The element at the specified index or undefined.
   */
  get(index) {
    const item = this.#items.at(index);
    return item !== void 0 ? this.#unwrap(item) : void 0;
  }
  /**
   * Returns the first index at which a given element can be found in the LiveList, or -1 if it is not present.
   * @param searchElement Element to locate.
   * @param fromIndex The index to start the search at.
   * @returns The first index of the element in the LiveList; -1 if not found.
   */
  indexOf(searchElement, fromIndex) {
    return this.#items.rawArray.findIndex(
      (node, i) => i >= (fromIndex ?? 0) && this.#unwrap(node) === searchElement
    );
  }
  /**
   * Returns the last index at which a given element can be found in the LiveList, or -1 if it is not present. The LiveList is searched backwards, starting at fromIndex.
   * @param searchElement Element to locate.
   * @param fromIndex The index at which to start searching backwards.
   * @returns The last index of the element in the LiveList; -1 if not found.
   */
  lastIndexOf(searchElement, fromIndex) {
    const arr = this.#items.rawArray;
    for (let i = fromIndex ?? arr.length - 1; i >= 0; i--) {
      if (this.#unwrap(arr[i]) === searchElement) return i;
    }
    return -1;
  }
  /**
   * Creates an array populated with the results of calling a provided function on every element.
   * @param callback Function that is called for every element.
   * @returns An array with each element being the result of the callback function.
   */
  map(callback) {
    return this.#items.rawArray.map(
      (node, i) => callback(this.#unwrap(node), i)
    );
  }
  /**
   * Tests whether at least one element in the LiveList passes the test implemented by the provided function.
   * @param predicate Function to test for each element.
   * @returns true if the callback function returns a truthy value for at least one element. Otherwise, false.
   */
  some(predicate) {
    return this.#items.rawArray.some(
      (node, i) => predicate(this.#unwrap(node), i)
    );
  }
  *[Symbol.iterator]() {
    for (const node of this.#items) {
      yield this.#unwrap(node);
    }
  }
  #createAttachItemAndSort(op, key) {
    const newItem = creationOpToLiveNode(op);
    newItem._attach(op.id, nn(this._pool));
    newItem._setParentLink(this, key);
    this.#insert(newItem);
    const newIndex = this._indexOfPosition(key);
    return { newItem, newIndex };
  }
  #shiftItemPosition(index, key) {
    const shiftedPosition = makePosition(
      key,
      this.#items.length > index + 1 ? this.#items.at(index + 1)?._parentPos : void 0
    );
    this.#updateItemPositionAt(index, shiftedPosition);
  }
  /** @internal */
  _toTreeNode(key) {
    const payload = [];
    let index = 0;
    for (const item of this.#items) {
      payload.push(item.toTreeNode(index.toString()));
      index++;
    }
    return {
      type: "LiveList",
      id: this._id ?? nanoid(),
      key,
      payload
    };
  }
  toJSON() {
    return super.toJSON();
  }
  /** @internal */
  _toJSON() {
    const result = Array.from(this.#items, (node) => node.toJSON());
    return freeze(result);
  }
  clone() {
    return new _LiveList(
      Array.from(this.#items, (item) => item.clone())
    );
  }
};
function makeUpdate(liveList, deltaUpdates) {
  return {
    node: liveList,
    type: "LiveList",
    updates: deltaUpdates
  };
}
__name(makeUpdate, "makeUpdate");
function setDelta(index, item) {
  return {
    index,
    type: "set",
    item: item instanceof LiveRegister ? item.data : item
  };
}
__name(setDelta, "setDelta");
function deleteDelta(index, deletedNode) {
  return {
    type: "delete",
    index,
    deletedItem: deletedNode instanceof LiveRegister ? deletedNode.data : deletedNode
  };
}
__name(deleteDelta, "deleteDelta");
function insertDelta(index, item) {
  return {
    index,
    type: "insert",
    item: item instanceof LiveRegister ? item.data : item
  };
}
__name(insertDelta, "insertDelta");
function moveDelta(previousIndex, index, item) {
  return {
    type: "move",
    index,
    item: item instanceof LiveRegister ? item.data : item,
    previousIndex
  };
}
__name(moveDelta, "moveDelta");
function HACK_addIntentAndDeletedIdToOperation(ops, deletedId) {
  return ops.map((op, index) => {
    if (index === 0) {
      const firstOp = op;
      return {
        ...firstOp,
        intent: "set",
        deletedId
      };
    } else {
      return op;
    }
  });
}
__name(HACK_addIntentAndDeletedIdToOperation, "HACK_addIntentAndDeletedIdToOperation");
var LiveMap = class _LiveMap extends AbstractCrdt {
  static {
    __name(this, "_LiveMap");
  }
  #map;
  #unacknowledgedSet;
  constructor(entries2) {
    super();
    this.#unacknowledgedSet = /* @__PURE__ */ new Map();
    if (entries2) {
      const mappedEntries = [];
      for (const [key, value] of entries2) {
        const node = lsonToLiveNode(value);
        node._setParentLink(this, key);
        mappedEntries.push([key, node]);
      }
      this.#map = new Map(mappedEntries);
    } else {
      this.#map = /* @__PURE__ */ new Map();
    }
  }
  /** @internal */
  _toOps(parentId, parentKey) {
    if (this._id === void 0) {
      throw new Error("Cannot serialize item is not attached");
    }
    const ops = [];
    const op = {
      id: this._id,
      type: OpCode.CREATE_MAP,
      parentId,
      parentKey
    };
    ops.push(op);
    for (const [key, value] of this.#map) {
      for (const childOp of value._toOps(this._id, key)) {
        ops.push(childOp);
      }
    }
    return ops;
  }
  /** @internal */
  static _deserialize([id, _item], parentToChildren, pool) {
    const map = new _LiveMap();
    map._attach(id, pool);
    const children = parentToChildren.get(id);
    if (children === void 0) {
      return map;
    }
    for (const node of children) {
      const crdt = node[1];
      const child = deserialize(node, parentToChildren, pool);
      child._setParentLink(map, crdt.parentKey);
      map.#map.set(crdt.parentKey, child);
      map.invalidate();
    }
    return map;
  }
  /** @internal */
  _attach(id, pool) {
    super._attach(id, pool);
    for (const [_key, value] of this.#map) {
      if (isLiveNode(value)) {
        value._attach(pool.generateId(), pool);
      }
    }
  }
  /** @internal */
  _attachChild(op, source) {
    if (this._pool === void 0) {
      throw new Error("Can't attach child if managed pool is not present");
    }
    const { id, parentKey, opId } = op;
    const key = parentKey;
    const child = creationOpToLiveNode(op);
    if (this._pool.getNode(id) !== void 0) {
      return { modified: false };
    }
    if (source === 2) {
      const lastUpdateOpId = this.#unacknowledgedSet.get(key);
      if (lastUpdateOpId === opId) {
        this.#unacknowledgedSet.delete(key);
        return { modified: false };
      } else if (lastUpdateOpId !== void 0) {
        return { modified: false };
      }
    } else if (source === 1) {
      this.#unacknowledgedSet.delete(key);
    }
    const previousValue = this.#map.get(key);
    let reverse;
    if (previousValue) {
      const thisId = nn(this._id);
      reverse = previousValue._toOps(thisId, key);
      previousValue._detach();
    } else {
      reverse = [{ type: OpCode.DELETE_CRDT, id }];
    }
    child._setParentLink(this, key);
    child._attach(id, this._pool);
    this.#map.set(key, child);
    this.invalidate();
    return {
      modified: {
        node: this,
        type: "LiveMap",
        updates: { [key]: { type: "update" } }
      },
      reverse
    };
  }
  /** @internal */
  _detach() {
    super._detach();
    for (const item of this.#map.values()) {
      item._detach();
    }
  }
  /** @internal */
  _detachChild(child) {
    const id = nn(this._id);
    const parentKey = nn(child._parentKey);
    const reverse = child._toOps(id, parentKey);
    for (const [key, value] of this.#map) {
      if (value === child) {
        this.#map.delete(key);
        this.invalidate();
      }
    }
    child._detach();
    const storageUpdate = {
      node: this,
      type: "LiveMap",
      updates: {
        [parentKey]: {
          type: "delete",
          deletedItem: liveNodeToLson(child)
        }
      }
    };
    return { modified: storageUpdate, reverse };
  }
  /** @internal */
  _serialize() {
    if (this.parent.type !== "HasParent") {
      throw new Error("Cannot serialize LiveMap if parent is missing");
    }
    return {
      type: CrdtType.MAP,
      parentId: nn(this.parent.node._id, "Parent node expected to have ID"),
      parentKey: this.parent.key
    };
  }
  /**
   * Returns a specified element from the LiveMap.
   * @param key The key of the element to return.
   * @returns The element associated with the specified key, or undefined if the key can't be found in the LiveMap.
   */
  get(key) {
    const value = this.#map.get(key);
    if (value === void 0) {
      return void 0;
    }
    return liveNodeToLson(value);
  }
  /**
   * Adds or updates an element with a specified key and a value.
   * @param key The key of the element to add. Should be a string.
   * @param value The value of the element to add. Should be serializable to JSON.
   */
  set(key, value) {
    this._pool?.assertStorageIsWritable();
    const oldValue = this.#map.get(key);
    if (oldValue) {
      oldValue._detach();
    }
    const item = lsonToLiveNode(value);
    item._setParentLink(this, key);
    this.#map.set(key, item);
    this.invalidate();
    if (this._pool && this._id) {
      const id = this._pool.generateId();
      item._attach(id, this._pool);
      const storageUpdates = /* @__PURE__ */ new Map();
      storageUpdates.set(this._id, {
        node: this,
        type: "LiveMap",
        updates: { [key]: { type: "update" } }
      });
      const ops = item._toOpsWithOpId(this._id, key, this._pool);
      this.#unacknowledgedSet.set(key, nn(ops[0].opId));
      this._pool.dispatch(
        ops,
        oldValue ? oldValue._toOps(this._id, key) : [{ type: OpCode.DELETE_CRDT, id }],
        storageUpdates
      );
    }
  }
  /**
   * Returns the number of elements in the LiveMap.
   */
  get size() {
    return this.#map.size;
  }
  /**
   * Returns a boolean indicating whether an element with the specified key exists or not.
   * @param key The key of the element to test for presence.
   */
  has(key) {
    return this.#map.has(key);
  }
  /**
   * Removes the specified element by key.
   * @param key The key of the element to remove.
   * @returns true if an element existed and has been removed, or false if the element does not exist.
   */
  delete(key) {
    this._pool?.assertStorageIsWritable();
    const item = this.#map.get(key);
    if (item === void 0) {
      return false;
    }
    item._detach();
    this.#map.delete(key);
    this.invalidate();
    if (this._pool && item._id) {
      const thisId = nn(this._id);
      const storageUpdates = /* @__PURE__ */ new Map();
      storageUpdates.set(thisId, {
        node: this,
        type: "LiveMap",
        updates: {
          [key]: {
            type: "delete",
            deletedItem: liveNodeToLson(item)
          }
        }
      });
      this._pool.dispatch(
        [
          {
            type: OpCode.DELETE_CRDT,
            id: item._id,
            opId: this._pool.generateOpId()
          }
        ],
        item._toOps(thisId, key),
        storageUpdates
      );
    }
    return true;
  }
  /**
   * Returns a new Iterator object that contains the [key, value] pairs for each element.
   */
  entries() {
    const innerIterator = this.#map.entries();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const iteratorValue = innerIterator.next();
        if (iteratorValue.done) {
          return {
            done: true,
            value: void 0
          };
        }
        const entry = iteratorValue.value;
        const key = entry[0];
        const value = liveNodeToLson(iteratorValue.value[1]);
        return {
          value: [key, value]
        };
      }
    };
  }
  /**
   * Same function object as the initial value of the entries method.
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Returns a new Iterator object that contains the keys for each element.
   */
  keys() {
    return this.#map.keys();
  }
  /**
   * Returns a new Iterator object that contains the values for each element.
   */
  values() {
    const innerIterator = this.#map.values();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const iteratorValue = innerIterator.next();
        if (iteratorValue.done) {
          return {
            done: true,
            value: void 0
          };
        }
        const value = liveNodeToLson(iteratorValue.value);
        return { value };
      }
    };
  }
  /**
   * Executes a provided function once per each key/value pair in the Map object, in insertion order.
   * @param callback Function to execute for each entry in the map.
   */
  forEach(callback) {
    for (const entry of this) {
      callback(entry[1], entry[0], this);
    }
  }
  /** @internal */
  _toTreeNode(key) {
    return {
      type: "LiveMap",
      id: this._id ?? nanoid(),
      key,
      payload: Array.from(this.#map.entries()).map(
        ([key2, val]) => val.toTreeNode(key2)
      )
    };
  }
  toJSON() {
    return super.toJSON();
  }
  /** @internal */
  _toJSON() {
    const result = {};
    for (const [key, value] of this.#map) {
      result[key] = value.toJSON();
    }
    return freeze(result);
  }
  clone() {
    return new _LiveMap(
      Array.from(this.#map).map(([key, node]) => [key, node.clone()])
    );
  }
};
function deepLiveify(value, config) {
  if (Array.isArray(value)) {
    return new LiveList(value.map((v) => deepLiveify(v, config)));
  } else if (isPlainObject(value)) {
    const init = {};
    const locals = {};
    for (const key in value) {
      const val = value[key];
      if (val === void 0) {
        continue;
      }
      const subConfig = isPlainObject(config) ? config[key] : config;
      if (subConfig === false) {
        locals[key] = val;
      } else if (subConfig === "atomic") {
        init[key] = val;
      } else {
        init[key] = deepLiveify(val, subConfig);
      }
    }
    const lo = new LiveObject(init);
    for (const key in locals) {
      lo.setLocal(key, locals[key]);
    }
    return lo;
  } else {
    return value;
  }
}
__name(deepLiveify, "deepLiveify");
function reconcile(live, json, config) {
  if (isLiveObject(live) && isPlainObject(json)) {
    return reconcileLiveObject(live, json, "full", config);
  } else if (isLiveList(live) && Array.isArray(json)) {
    return reconcileLiveList(live, json, config);
  } else if (isLiveMap(live) && isPlainObject(json)) {
    return reconcileLiveMap(live, config);
  } else {
    return deepLiveify(json, config);
  }
}
__name(reconcile, "reconcile");
function reconcileLiveMap(_liveMap, _config) {
  throw new Error("Reconciling a LiveMap is not supported yet");
}
__name(reconcileLiveMap, "reconcileLiveMap");
function reconcileLiveObject(liveObj, jsonObj, extent, config) {
  const currentKeys = liveObj.keys();
  for (const key in jsonObj) {
    currentKeys.delete(key);
    const newVal = jsonObj[key];
    if (newVal === void 0) {
      if (extent === "full") {
        liveObj.delete(key);
      }
      continue;
    }
    const subConfig = isPlainObject(config) ? config[key] : config;
    if (subConfig === false) {
      liveObj.setLocal(key, newVal);
    } else if (subConfig === "atomic") {
      const curVal = liveObj.get(key);
      if (curVal !== newVal) {
        liveObj.set(key, newVal);
      }
    } else {
      const curVal = liveObj.get(key);
      if (curVal === void 0) {
        liveObj.set(key, deepLiveify(newVal, subConfig));
      } else if (isLiveStructure(curVal)) {
        const next = reconcile(curVal, newVal, subConfig);
        if (next !== curVal) {
          liveObj.set(key, next);
        }
      } else if (curVal !== newVal) {
        liveObj.set(key, deepLiveify(newVal, subConfig));
      }
    }
  }
  if (extent === "full") {
    for (const key of currentKeys) {
      liveObj.delete(key);
    }
  }
  return liveObj;
}
__name(reconcileLiveObject, "reconcileLiveObject");
function reconcileLiveList(liveList, jsonArr, config) {
  const curLen = liveList.length;
  const newLen = jsonArr.length;
  for (let i = 0; i < Math.min(curLen, newLen); i++) {
    const curVal = liveList.get(i);
    const newVal = jsonArr[i];
    if (isLiveStructure(curVal)) {
      const next = reconcile(curVal, newVal, config);
      if (next !== curVal) {
        liveList.set(i, next);
      }
    } else if (curVal !== newVal) {
      liveList.set(i, deepLiveify(newVal, config));
    }
  }
  for (let i = curLen; i < newLen; i++) {
    liveList.push(deepLiveify(jsonArr[i], config));
  }
  for (let i = curLen - 1; i >= newLen; i--) {
    liveList.delete(i);
  }
  return liveList;
}
__name(reconcileLiveList, "reconcileLiveList");
var MAX_LIVE_OBJECT_SIZE = 128 * 1024;
var LiveObject = class _LiveObject extends AbstractCrdt {
  static {
    __name(this, "_LiveObject");
  }
  #synced;
  #local = /* @__PURE__ */ new Map();
  /**
   * Tracks unacknowledged local changes per property to preserve optimistic
   * updates. Maps property keys to their pending operation IDs.
   *
   * INVARIANT: Only locally-generated opIds are ever stored here. Remote opIds
   * are only compared against (to detect ACKs), never stored.
   *
   * When a local change is made, the opId is stored here. When a remote op
   * arrives for the same key:
   * - If no entry exists → apply remote op
   * - If opId matches → it's an ACK, clear the entry
   * - If opId differs → ignore remote op to preserve optimistic update
   */
  #unackedOpsByKey;
  /**
   * Enable or disable detection of too large LiveObjects.
   * When enabled, throws an error if LiveObject static data exceeds 128KB, which
   * is the maximum value the server will be able to accept.
   * By default, this behavior is disabled to avoid the runtime performance
   * overhead on every LiveObject.set() or LiveObject.update() call.
   *
   * @experimental
   */
  static detectLargeObjects = false;
  static #buildRootAndParentToChildren(nodes) {
    const parentToChildren = /* @__PURE__ */ new Map();
    let root = null;
    for (const node of nodes) {
      if (isRootStorageNode(node)) {
        root = node[1];
      } else {
        const crdt = node[1];
        const children = parentToChildren.get(crdt.parentId);
        if (children !== void 0) {
          children.push(node);
        } else {
          parentToChildren.set(crdt.parentId, [node]);
        }
      }
    }
    if (root === null) {
      throw new Error("Root can't be null");
    }
    return [root, parentToChildren];
  }
  /** @private Do not use this API directly */
  static _fromItems(nodes, pool) {
    const [root, parentToChildren] = _LiveObject.#buildRootAndParentToChildren(nodes);
    return _LiveObject._deserialize(
      ["root", root],
      parentToChildren,
      pool
    );
  }
  constructor(obj = {}) {
    super();
    this.#unackedOpsByKey = /* @__PURE__ */ new Map();
    const o = compactObject(obj);
    for (const key of Object.keys(o)) {
      const value = o[key];
      if (isLiveNode(value)) {
        value._setParentLink(this, key);
      }
    }
    this.#synced = new Map(Object.entries(o));
  }
  /** @internal */
  _toOps(parentId, parentKey) {
    if (this._id === void 0) {
      throw new Error("Cannot serialize item is not attached");
    }
    const ops = [];
    const op = {
      type: OpCode.CREATE_OBJECT,
      id: this._id,
      parentId,
      parentKey,
      data: {}
    };
    ops.push(op);
    for (const [key, value] of this.#synced) {
      if (isLiveNode(value)) {
        for (const childOp of value._toOps(this._id, key)) {
          ops.push(childOp);
        }
      } else {
        op.data[key] = value;
      }
    }
    return ops;
  }
  /** @internal */
  static _deserialize([id, item], parentToChildren, pool) {
    const liveObj = new _LiveObject(item.data);
    liveObj._attach(id, pool);
    return this._deserializeChildren(liveObj, parentToChildren, pool);
  }
  /** @internal */
  static _deserializeChildren(liveObj, parentToChildren, pool) {
    const children = parentToChildren.get(nn(liveObj._id));
    if (children === void 0) {
      return liveObj;
    }
    for (const node of children) {
      const child = deserializeToLson(node, parentToChildren, pool);
      const crdt = node[1];
      if (isLiveStructure(child)) {
        child._setParentLink(liveObj, crdt.parentKey);
      }
      liveObj.#synced.set(crdt.parentKey, child);
      liveObj.invalidate();
    }
    return liveObj;
  }
  /** @internal */
  _attach(id, pool) {
    super._attach(id, pool);
    for (const [_key, value] of this.#synced) {
      if (isLiveNode(value)) {
        value._attach(pool.generateId(), pool);
      }
    }
  }
  /** @internal */
  _attachChild(op, source) {
    if (this._pool === void 0) {
      throw new Error("Can't attach child if managed pool is not present");
    }
    const { id, opId, parentKey: key } = op;
    const child = creationOpToLson(op);
    if (this._pool.getNode(id) !== void 0) {
      if (this.#unackedOpsByKey.get(key) === opId) {
        this.#unackedOpsByKey.delete(key);
      }
      return { modified: false };
    }
    if (source === 0) {
      this.#unackedOpsByKey.set(key, nn(opId));
    } else if (this.#unackedOpsByKey.get(key) === void 0) {
    } else if (this.#unackedOpsByKey.get(key) === opId) {
      this.#unackedOpsByKey.delete(key);
      return { modified: false };
    } else {
      return { modified: false };
    }
    const thisId = nn(this._id);
    const previousValue = this.#synced.get(key);
    let reverse;
    if (isLiveNode(previousValue)) {
      reverse = previousValue._toOps(thisId, key);
      previousValue._detach();
    } else if (previousValue === void 0) {
      reverse = [{ type: OpCode.DELETE_OBJECT_KEY, id: thisId, key }];
    } else {
      reverse = [
        {
          type: OpCode.UPDATE_OBJECT,
          id: thisId,
          data: { [key]: previousValue }
        }
      ];
    }
    this.#local.delete(key);
    this.#synced.set(key, child);
    this.invalidate();
    if (isLiveStructure(child)) {
      child._setParentLink(this, key);
      child._attach(id, this._pool);
    }
    return {
      reverse,
      modified: {
        node: this,
        type: "LiveObject",
        updates: { [key]: { type: "update" } }
      }
    };
  }
  /** @internal */
  _detachChild(child) {
    if (child) {
      const id = nn(this._id);
      const parentKey = nn(child._parentKey);
      const reverse = child._toOps(id, parentKey);
      for (const [key, value] of this.#synced) {
        if (value === child) {
          this.#synced.delete(key);
          this.invalidate();
        }
      }
      child._detach();
      const storageUpdate = {
        node: this,
        type: "LiveObject",
        updates: {
          [parentKey]: { type: "delete" }
        }
      };
      return { modified: storageUpdate, reverse };
    }
    return { modified: false };
  }
  /** @internal */
  _detach() {
    super._detach();
    for (const value of this.#synced.values()) {
      if (isLiveNode(value)) {
        value._detach();
      }
    }
  }
  /** @internal */
  _apply(op, isLocal) {
    if (op.type === OpCode.UPDATE_OBJECT) {
      return this.#applyUpdate(op, isLocal);
    } else if (op.type === OpCode.DELETE_OBJECT_KEY) {
      return this.#applyDeleteObjectKey(op, isLocal);
    }
    return super._apply(op, isLocal);
  }
  /** @internal */
  _serialize() {
    const data = {};
    for (const [key, value] of this.#synced) {
      if (!isLiveNode(value)) {
        data[key] = value;
      }
    }
    if (this.parent.type === "HasParent" && this.parent.node._id) {
      return {
        type: CrdtType.OBJECT,
        parentId: this.parent.node._id,
        parentKey: this.parent.key,
        data
      };
    } else {
      return {
        type: CrdtType.OBJECT,
        data
      };
    }
  }
  #applyUpdate(op, isLocal) {
    let isModified = false;
    const id = nn(this._id);
    const reverse = [];
    const reverseUpdate = {
      type: OpCode.UPDATE_OBJECT,
      id,
      data: {}
    };
    for (const key in op.data) {
      const oldValue = this.#synced.get(key);
      if (isLiveNode(oldValue)) {
        for (const childOp of oldValue._toOps(id, key)) {
          reverse.push(childOp);
        }
        oldValue._detach();
      } else if (oldValue !== void 0) {
        reverseUpdate.data[key] = oldValue;
      } else if (oldValue === void 0) {
        reverse.push({ type: OpCode.DELETE_OBJECT_KEY, id, key });
      }
    }
    const updateDelta = {};
    for (const key in op.data) {
      const value = op.data[key];
      if (value === void 0) {
        continue;
      }
      if (isLocal) {
        this.#unackedOpsByKey.set(key, nn(op.opId));
      } else if (this.#unackedOpsByKey.get(key) === void 0) {
        isModified = true;
      } else if (this.#unackedOpsByKey.get(key) === op.opId) {
        this.#unackedOpsByKey.delete(key);
        continue;
      } else {
        continue;
      }
      const oldValue = this.#synced.get(key);
      if (isLiveNode(oldValue)) {
        oldValue._detach();
      }
      isModified = true;
      updateDelta[key] = { type: "update" };
      this.#local.delete(key);
      this.#synced.set(key, value);
      this.invalidate();
    }
    if (Object.keys(reverseUpdate.data).length !== 0) {
      reverse.unshift(reverseUpdate);
    }
    return isModified ? {
      modified: {
        node: this,
        type: "LiveObject",
        updates: updateDelta
      },
      reverse
    } : { modified: false };
  }
  #applyDeleteObjectKey(op, isLocal) {
    const key = op.key;
    const oldValue = this.#synced.get(key);
    if (oldValue === void 0) {
      return { modified: false };
    }
    if (!isLocal && this.#unackedOpsByKey.get(key) !== void 0) {
      return { modified: false };
    }
    const id = nn(this._id);
    let reverse = [];
    if (isLiveNode(oldValue)) {
      reverse = oldValue._toOps(id, op.key);
      oldValue._detach();
    } else if (oldValue !== void 0) {
      reverse = [
        {
          type: OpCode.UPDATE_OBJECT,
          id,
          data: { [key]: oldValue }
        }
      ];
    }
    this.#local.delete(key);
    this.#synced.delete(key);
    this.invalidate();
    return {
      modified: {
        node: this,
        type: "LiveObject",
        updates: {
          [op.key]: { type: "delete", deletedItem: oldValue }
        }
      },
      reverse
    };
  }
  /** @private */
  keys() {
    const result = new Set(this.#synced.keys());
    for (const key of this.#local.keys()) {
      result.add(key);
    }
    return result;
  }
  /**
   * Adds or updates a property with a specified key and a value.
   * @param key The key of the property to add
   * @param value The value of the property to add
   */
  set(key, value) {
    this.update({ [key]: value });
  }
  /**
   * @experimental
   *
   * Sets a local-only property that is not synchronized over the wire. The
   * value will be visible via get(), and toJSON() on this client only. Other
   * clients and the server will see `undefined` for this key.
   *
   * Caveat: this method will not add changes to the undo/redo stack.
   */
  setLocal(key, value) {
    this._pool?.assertStorageIsWritable();
    const deleteResult = this.#prepareDelete(key);
    this.#local.set(key, value);
    this.invalidate();
    if (this._pool !== void 0 && this._id !== void 0) {
      const ops = deleteResult?.[0] ?? [];
      const reverse = deleteResult?.[1] ?? [];
      const storageUpdates = deleteResult?.[2] ?? /* @__PURE__ */ new Map();
      const existing = storageUpdates.get(this._id);
      storageUpdates.set(this._id, {
        node: this,
        type: "LiveObject",
        updates: {
          ...existing?.updates,
          [key]: { type: "update" }
        }
      });
      this._pool.dispatch(ops, reverse, storageUpdates);
    }
  }
  /**
   * Returns a specified property from the LiveObject.
   * @param key The key of the property to get
   */
  get(key) {
    return this.#local.has(key) ? this.#local.get(key) : this.#synced.get(key);
  }
  /**
   * Removes a synced key, returning the ops, reverse ops, and storage updates
   * needed to notify the pool. Returns null if the key doesn't exist in
   * #synced or pool/id are unavailable. Does NOT dispatch.
   */
  #prepareDelete(key) {
    this._pool?.assertStorageIsWritable();
    const k = key;
    if (this.#local.has(k) && !this.#synced.has(k)) {
      const oldValue2 = this.#local.get(k);
      this.#local.delete(k);
      this.invalidate();
      if (this._pool !== void 0 && this._id !== void 0) {
        const storageUpdates2 = /* @__PURE__ */ new Map();
        storageUpdates2.set(this._id, {
          node: this,
          type: "LiveObject",
          updates: {
            [k]: {
              type: "delete",
              deletedItem: oldValue2
            }
          }
        });
        return [[], [], storageUpdates2];
      }
      return null;
    }
    this.#local.delete(k);
    const oldValue = this.#synced.get(k);
    if (oldValue === void 0) {
      return null;
    }
    if (this._pool === void 0 || this._id === void 0) {
      if (isLiveNode(oldValue)) {
        oldValue._detach();
      }
      this.#synced.delete(k);
      this.invalidate();
      return null;
    }
    const ops = [
      {
        type: OpCode.DELETE_OBJECT_KEY,
        key: k,
        id: this._id,
        opId: this._pool.generateOpId()
      }
    ];
    let reverse;
    if (isLiveNode(oldValue)) {
      oldValue._detach();
      reverse = oldValue._toOps(this._id, k);
    } else {
      reverse = [
        {
          type: OpCode.UPDATE_OBJECT,
          data: { [k]: oldValue },
          id: this._id
        }
      ];
    }
    this.#synced.delete(k);
    this.invalidate();
    const storageUpdates = /* @__PURE__ */ new Map();
    storageUpdates.set(this._id, {
      node: this,
      type: "LiveObject",
      updates: {
        [key]: { type: "delete", deletedItem: oldValue }
      }
    });
    return [ops, reverse, storageUpdates];
  }
  /**
   * Deletes a key from the LiveObject
   * @param key The key of the property to delete
   */
  delete(key) {
    const result = this.#prepareDelete(key);
    if (result) {
      const [ops, reverse, storageUpdates] = result;
      this._pool?.dispatch(ops, reverse, storageUpdates);
    }
  }
  /**
   * Adds or updates multiple properties at once with an object.
   * @param patch The object used to overrides properties
   */
  update(patch) {
    this._pool?.assertStorageIsWritable();
    if (_LiveObject.detectLargeObjects) {
      const data = {};
      for (const [key, value] of this.#synced) {
        if (!isLiveNode(value)) {
          data[key] = value;
        }
      }
      for (const key of Object.keys(patch)) {
        const value = patch[key];
        if (value === void 0) continue;
        if (!isLiveNode(value)) {
          data[key] = value;
        }
      }
      const jsonString = JSON.stringify(data);
      const upperBoundSize = jsonString.length * 4;
      if (upperBoundSize > MAX_LIVE_OBJECT_SIZE) {
        const preciseSize = new TextEncoder().encode(jsonString).length;
        if (preciseSize > MAX_LIVE_OBJECT_SIZE) {
          throw new Error(
            `LiveObject size exceeded limit: ${preciseSize} bytes > ${MAX_LIVE_OBJECT_SIZE} bytes. See https://liveblocks.io/docs/platform/limits#Liveblocks-Storage-limits`
          );
        }
      }
    }
    if (this._pool === void 0 || this._id === void 0) {
      for (const key in patch) {
        const newValue = patch[key];
        if (newValue === void 0) {
          continue;
        }
        const oldValue = this.#synced.get(key);
        if (isLiveNode(oldValue)) {
          oldValue._detach();
        }
        if (isLiveNode(newValue)) {
          newValue._setParentLink(this, key);
        }
        this.#local.delete(key);
        this.#synced.set(key, newValue);
        this.invalidate();
      }
      return;
    }
    const ops = [];
    const reverseOps = [];
    const opId = this._pool.generateOpId();
    const updatedProps = {};
    const reverseUpdateOp = {
      id: this._id,
      type: OpCode.UPDATE_OBJECT,
      data: {}
    };
    const updateDelta = {};
    for (const key in patch) {
      const newValue = patch[key];
      if (newValue === void 0) {
        continue;
      }
      const oldValue = this.#synced.get(key);
      if (oldValue === newValue) {
        continue;
      }
      if (isLiveNode(oldValue)) {
        for (const childOp of oldValue._toOps(this._id, key)) {
          reverseOps.push(childOp);
        }
        oldValue._detach();
      } else if (oldValue === void 0) {
        reverseOps.push({ type: OpCode.DELETE_OBJECT_KEY, id: this._id, key });
      } else {
        reverseUpdateOp.data[key] = oldValue;
      }
      if (isLiveNode(newValue)) {
        newValue._setParentLink(this, key);
        newValue._attach(this._pool.generateId(), this._pool);
        const newAttachChildOps = newValue._toOpsWithOpId(
          this._id,
          key,
          this._pool
        );
        const createCrdtOp = newAttachChildOps.find(
          (op) => op.parentId === this._id
        );
        if (createCrdtOp) {
          this.#unackedOpsByKey.set(key, nn(createCrdtOp.opId));
        }
        for (const childOp of newAttachChildOps) {
          ops.push(childOp);
        }
      } else {
        updatedProps[key] = newValue;
        this.#unackedOpsByKey.set(key, opId);
      }
      this.#local.delete(key);
      this.#synced.set(key, newValue);
      this.invalidate();
      updateDelta[key] = { type: "update" };
    }
    if (Object.keys(reverseUpdateOp.data).length !== 0) {
      reverseOps.unshift(reverseUpdateOp);
    }
    if (Object.keys(updatedProps).length !== 0) {
      ops.unshift({
        opId,
        id: this._id,
        type: OpCode.UPDATE_OBJECT,
        data: updatedProps
      });
    }
    if (ops.length === 0 && reverseOps.length === 0 && Object.keys(updateDelta).length === 0) {
      return;
    }
    const storageUpdates = /* @__PURE__ */ new Map();
    storageUpdates.set(this._id, {
      node: this,
      type: "LiveObject",
      updates: updateDelta
    });
    this._pool.dispatch(ops, reverseOps, storageUpdates);
  }
  static from(obj, config) {
    if (!isPlainObject(obj)) throw new Error("Expected a JSON object");
    const liveObj = new _LiveObject({});
    liveObj.reconcile(obj, config);
    return liveObj;
  }
  reconcile(jsonObj, config) {
    if (this.hasCache(jsonObj)) return;
    if (!isPlainObject(jsonObj))
      throw new Error(
        "Reconciling the document root expects a plain object value"
      );
    reconcileLiveObject(this, jsonObj, "full", config);
  }
  /**
   * Like reconcile(), but only touches the top-level keys present in
   * `partialObj`. Keys on this LiveObject that are absent from `partialObj`
   * are left untouched. Typically called on the storage root when
   * reconciling a subset of keys without affecting other keys on the root.
   *
   * Note: the partial behavior only applies to the top-level keys of this
   * object. Nested structures are always fully reconciled.
   *
   * @private
   */
  reconcilePartially(partialObj, config) {
    if (!isPlainObject(partialObj))
      throw new Error(
        "Reconciling the document root expects a plain object value"
      );
    reconcileLiveObject(this, partialObj, "partial", config);
  }
  /** @internal */
  toTreeNode(key) {
    return super.toTreeNode(key);
  }
  /** @internal */
  _toTreeNode(key) {
    const nodeId = this._id ?? nanoid();
    return {
      type: "LiveObject",
      id: nodeId,
      key,
      payload: Array.from(this.#synced.entries()).map(
        ([key2, value]) => isLiveNode(value) ? value.toTreeNode(key2) : { type: "Json", id: `${nodeId}:${key2}`, key: key2, payload: value }
      )
    };
  }
  toJSON() {
    return super.toJSON();
  }
  /** @internal */
  _toJSON() {
    const result = {};
    for (const [key, val] of this.#synced) {
      result[key] = isLiveStructure(val) ? val.toJSON() : val;
    }
    for (const [key, val] of this.#local) {
      result[key] = val;
    }
    return freeze(result);
  }
  clone() {
    const cloned = new _LiveObject(
      Object.fromEntries(
        Array.from(this.#synced).map(([key, value]) => [
          key,
          isLiveStructure(value) ? value.clone() : deepClone(value)
        ])
      )
    );
    for (const [key, value] of this.#local) {
      cloned.#local.set(key, deepClone(value));
    }
    return cloned;
  }
};
function creationOpToLiveNode(op) {
  return lsonToLiveNode(creationOpToLson(op));
}
__name(creationOpToLiveNode, "creationOpToLiveNode");
function creationOpToLson(op) {
  switch (op.type) {
    case OpCode.CREATE_REGISTER:
      return op.data;
    case OpCode.CREATE_OBJECT:
      return new LiveObject(op.data);
    case OpCode.CREATE_MAP:
      return new LiveMap();
    case OpCode.CREATE_LIST:
      return new LiveList([]);
    default:
      return assertNever(op, "Unknown creation Op");
  }
}
__name(creationOpToLson, "creationOpToLson");
function isSameNodeOrChildOf(node, parent) {
  if (node === parent) {
    return true;
  }
  if (node.parent.type === "HasParent") {
    return isSameNodeOrChildOf(node.parent.node, parent);
  }
  return false;
}
__name(isSameNodeOrChildOf, "isSameNodeOrChildOf");
function deserialize(node, parentToChildren, pool) {
  if (isObjectStorageNode(node)) {
    return LiveObject._deserialize(node, parentToChildren, pool);
  } else if (isListStorageNode(node)) {
    return LiveList._deserialize(node, parentToChildren, pool);
  } else if (isMapStorageNode(node)) {
    return LiveMap._deserialize(node, parentToChildren, pool);
  } else if (isRegisterStorageNode(node)) {
    return LiveRegister._deserialize(node, parentToChildren, pool);
  } else {
    throw new Error("Unexpected CRDT type");
  }
}
__name(deserialize, "deserialize");
function deserializeToLson(node, parentToChildren, pool) {
  if (isObjectStorageNode(node)) {
    return LiveObject._deserialize(node, parentToChildren, pool);
  } else if (isListStorageNode(node)) {
    return LiveList._deserialize(node, parentToChildren, pool);
  } else if (isMapStorageNode(node)) {
    return LiveMap._deserialize(node, parentToChildren, pool);
  } else if (isRegisterStorageNode(node)) {
    return node[1].data;
  } else {
    throw new Error("Unexpected CRDT type");
  }
}
__name(deserializeToLson, "deserializeToLson");
function isLiveStructure(value) {
  return isLiveList(value) || isLiveMap(value) || isLiveObject(value);
}
__name(isLiveStructure, "isLiveStructure");
function isLiveNode(value) {
  return isLiveStructure(value) || isLiveRegister(value);
}
__name(isLiveNode, "isLiveNode");
function isLiveList(value) {
  return value instanceof LiveList;
}
__name(isLiveList, "isLiveList");
function isLiveMap(value) {
  return value instanceof LiveMap;
}
__name(isLiveMap, "isLiveMap");
function isLiveObject(value) {
  return value instanceof LiveObject;
}
__name(isLiveObject, "isLiveObject");
function isLiveRegister(value) {
  return value instanceof LiveRegister;
}
__name(isLiveRegister, "isLiveRegister");
function cloneLson(value) {
  return value === void 0 ? void 0 : isLiveStructure(value) ? value.clone() : deepClone(value);
}
__name(cloneLson, "cloneLson");
function liveNodeToLson(obj) {
  if (obj instanceof LiveRegister) {
    return obj.data;
  } else if (obj instanceof LiveList || obj instanceof LiveMap || obj instanceof LiveObject) {
    return obj;
  } else {
    return assertNever(obj, "Unknown AbstractCrdt");
  }
}
__name(liveNodeToLson, "liveNodeToLson");
function lsonToLiveNode(value) {
  if (value instanceof LiveObject || value instanceof LiveMap || value instanceof LiveList) {
    return value;
  } else {
    return new LiveRegister(value);
  }
}
__name(lsonToLiveNode, "lsonToLiveNode");
function getTreesDiffOperations(currentItems, newItems) {
  const ops = [];
  currentItems.forEach((_, id) => {
    if (!newItems.get(id)) {
      ops.push({ type: OpCode.DELETE_CRDT, id });
    }
  });
  newItems.forEach((crdt, id) => {
    const currentCrdt = currentItems.get(id);
    if (currentCrdt) {
      if (crdt.type === CrdtType.OBJECT) {
        if (currentCrdt.type !== CrdtType.OBJECT || stringifyOrLog(crdt.data) !== stringifyOrLog(currentCrdt.data)) {
          ops.push({
            type: OpCode.UPDATE_OBJECT,
            id,
            data: crdt.data
          });
        }
      }
      if (crdt.parentKey !== currentCrdt.parentKey) {
        ops.push({
          type: OpCode.SET_PARENT_KEY,
          id,
          parentKey: nn(crdt.parentKey, "Parent key must not be missing")
        });
      }
    } else {
      switch (crdt.type) {
        case CrdtType.REGISTER:
          ops.push({
            type: OpCode.CREATE_REGISTER,
            id,
            parentId: crdt.parentId,
            parentKey: crdt.parentKey,
            data: crdt.data
          });
          break;
        case CrdtType.LIST:
          ops.push({
            type: OpCode.CREATE_LIST,
            id,
            parentId: crdt.parentId,
            parentKey: crdt.parentKey
          });
          break;
        case CrdtType.OBJECT:
          if (crdt.parentId === void 0 || crdt.parentKey === void 0) {
            throw new Error(
              "Internal error. Cannot serialize storage root into an operation"
            );
          }
          ops.push({
            type: OpCode.CREATE_OBJECT,
            id,
            parentId: crdt.parentId,
            parentKey: crdt.parentKey,
            data: crdt.data
          });
          break;
        case CrdtType.MAP:
          ops.push({
            type: OpCode.CREATE_MAP,
            id,
            parentId: crdt.parentId,
            parentKey: crdt.parentKey
          });
          break;
      }
    }
  });
  return ops;
}
__name(getTreesDiffOperations, "getTreesDiffOperations");
function mergeObjectStorageUpdates(first, second) {
  const updates = first.updates;
  for (const [key, value] of entries(second.updates)) {
    updates[key] = value;
  }
  return {
    ...second,
    updates
  };
}
__name(mergeObjectStorageUpdates, "mergeObjectStorageUpdates");
function mergeMapStorageUpdates(first, second) {
  const updates = first.updates;
  for (const [key, value] of entries(second.updates)) {
    updates[key] = value;
  }
  return {
    ...second,
    updates
  };
}
__name(mergeMapStorageUpdates, "mergeMapStorageUpdates");
function mergeListStorageUpdates(first, second) {
  const updates = first.updates;
  return {
    ...second,
    updates: updates.concat(second.updates)
  };
}
__name(mergeListStorageUpdates, "mergeListStorageUpdates");
function mergeStorageUpdates(first, second) {
  if (first === void 0) {
    return second;
  }
  if (first.type === "LiveObject" && second.type === "LiveObject") {
    return mergeObjectStorageUpdates(first, second);
  } else if (first.type === "LiveMap" && second.type === "LiveMap") {
    return mergeMapStorageUpdates(first, second);
  } else if (first.type === "LiveList" && second.type === "LiveList") {
    return mergeListStorageUpdates(first, second);
  } else {
  }
  return second;
}
__name(mergeStorageUpdates, "mergeStorageUpdates");
var _bridgeActive = false;
function activateBridge(allowed) {
  _bridgeActive = allowed;
}
__name(activateBridge, "activateBridge");
function sendToPanel(message, options2) {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") {
    return;
  }
  const fullMsg = {
    ...message,
    source: "liveblocks-devtools-client"
  };
  if (!(options2?.force || _bridgeActive)) {
    return;
  }
  window.postMessage(fullMsg, "*");
}
__name(sendToPanel, "sendToPanel");
var eventSource = makeEventSource();
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  window.addEventListener("message", (event) => {
    if (event.source === window && event.data?.source === "liveblocks-devtools-panel") {
      eventSource.notify(event.data);
    } else {
    }
  });
}
var onMessageFromPanel = eventSource.observable;
var VERSION = PKG_VERSION || "dev";
var _devtoolsSetupHasRun = false;
function setupDevTools(getAllRooms) {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") {
    return;
  }
  if (_devtoolsSetupHasRun) {
    return;
  }
  _devtoolsSetupHasRun = true;
  onMessageFromPanel.subscribe((msg) => {
    switch (msg.msg) {
      // When a devtool panel sends an explicit "connect" message back to this
      // live running client (in response to the "wake-up-devtools" message,
      // or when the devtool panel is opened for the first time), it means that it's okay to
      // start emitting messages.
      // Before this explicit acknowledgement, any call to sendToPanel() will
      // be a no-op.
      case "connect": {
        activateBridge(true);
        for (const roomId of getAllRooms()) {
          sendToPanel({
            msg: "room::available",
            roomId,
            clientVersion: VERSION
          });
        }
        break;
      }
    }
  });
  sendToPanel({ msg: "wake-up-devtools" }, { force: true });
}
__name(setupDevTools, "setupDevTools");
var unsubsByRoomId = /* @__PURE__ */ new Map();
function stopSyncStream(roomId) {
  const unsubs = unsubsByRoomId.get(roomId) ?? [];
  unsubsByRoomId.delete(roomId);
  for (const unsub of unsubs) {
    unsub();
  }
}
__name(stopSyncStream, "stopSyncStream");
function startSyncStream(room) {
  stopSyncStream(room.id);
  fullSync(room);
  unsubsByRoomId.set(room.id, [
    // When the connection status changes
    room.events.status.subscribe(() => partialSyncConnection(room)),
    // When storage initializes, send the update
    room.events.storageDidLoad.subscribeOnce(() => partialSyncStorage(room)),
    // Any time storage updates, send the new storage root
    room.events.storageBatch.subscribe(() => partialSyncStorage(room)),
    // Any time "me" or "others" updates, send the new values accordingly
    room.events.self.subscribe(() => partialSyncMe(room)),
    room.events.others.subscribe(() => partialSyncOthers(room)),
    // Any time ydoc is updated, forward the update
    room.events.ydoc.subscribe((update) => syncYdocUpdate(room, update)),
    // Any time a custom room event is received, forward it
    room.events.customEvent.subscribe(
      (eventData) => forwardEvent(room, eventData)
    )
  ]);
}
__name(startSyncStream, "startSyncStream");
function syncYdocUpdate(room, update) {
  sendToPanel({
    msg: "room::sync::ydoc",
    roomId: room.id,
    update
  });
}
__name(syncYdocUpdate, "syncYdocUpdate");
var loadedAt = Date.now();
var eventCounter = 0;
function nextEventId() {
  return `event-${loadedAt}-${eventCounter++}`;
}
__name(nextEventId, "nextEventId");
function forwardEvent(room, eventData) {
  sendToPanel({
    msg: "room::events::custom-event",
    roomId: room.id,
    event: {
      type: "CustomEvent",
      id: nextEventId(),
      key: "Event",
      connectionId: eventData.connectionId,
      payload: eventData.event
    }
  });
}
__name(forwardEvent, "forwardEvent");
function partialSyncConnection(room) {
  sendToPanel({
    msg: "room::sync::partial",
    roomId: room.id,
    status: room.getStatus()
  });
}
__name(partialSyncConnection, "partialSyncConnection");
function partialSyncStorage(room) {
  const root = room.getStorageSnapshot();
  if (root) {
    sendToPanel({
      msg: "room::sync::partial",
      roomId: room.id,
      storage: root.toTreeNode("root").payload
    });
  }
}
__name(partialSyncStorage, "partialSyncStorage");
function partialSyncMe(room) {
  const me = room[kInternal].getSelf_forDevTools();
  if (me) {
    sendToPanel({
      msg: "room::sync::partial",
      roomId: room.id,
      me
    });
  }
}
__name(partialSyncMe, "partialSyncMe");
function partialSyncOthers(room) {
  const others = room[kInternal].getOthers_forDevTools();
  if (others) {
    sendToPanel({
      msg: "room::sync::partial",
      roomId: room.id,
      others
    });
  }
}
__name(partialSyncOthers, "partialSyncOthers");
function fullSync(room) {
  const root = room.getStorageSnapshot();
  const me = room[kInternal].getSelf_forDevTools();
  const others = room[kInternal].getOthers_forDevTools();
  room.fetchYDoc("");
  sendToPanel({
    msg: "room::sync::full",
    roomId: room.id,
    status: room.getStatus(),
    storage: root?.toTreeNode("root").payload ?? null,
    me,
    others
  });
}
__name(fullSync, "fullSync");
var roomChannelListeners = /* @__PURE__ */ new Map();
function stopRoomChannelListener(roomId) {
  const listener = roomChannelListeners.get(roomId);
  roomChannelListeners.delete(roomId);
  if (listener) {
    listener();
  }
}
__name(stopRoomChannelListener, "stopRoomChannelListener");
function linkDevTools(roomId, room) {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") {
    return;
  }
  sendToPanel({ msg: "room::available", roomId, clientVersion: VERSION });
  stopRoomChannelListener(roomId);
  roomChannelListeners.set(
    roomId,
    // Returns the unsubscribe callback, that we store in the
    // roomChannelListeners registry
    onMessageFromPanel.subscribe((msg) => {
      switch (msg.msg) {
        // Sent by the devtool panel when it wants to receive the sync stream
        // for a room
        case "room::subscribe": {
          if (msg.roomId === roomId) {
            startSyncStream(room);
          }
          break;
        }
        case "room::unsubscribe": {
          if (msg.roomId === roomId) {
            stopSyncStream(roomId);
          }
          break;
        }
      }
    })
  );
}
__name(linkDevTools, "linkDevTools");
function unlinkDevTools(roomId) {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") {
    return;
  }
  stopSyncStream(roomId);
  stopRoomChannelListener(roomId);
  sendToPanel({
    msg: "room::unavailable",
    roomId
  });
}
__name(unlinkDevTools, "unlinkDevTools");
var _emittedWarnings = /* @__PURE__ */ new Set();
function warnOnce(message, key = message) {
  if (process.env.NODE_ENV !== "production") {
    if (!_emittedWarnings.has(key)) {
      _emittedWarnings.add(key);
      warn(message);
    }
  }
}
__name(warnOnce, "warnOnce");
function warnOnceIf(condition, message, key = message) {
  if (typeof condition === "function" ? condition() : condition) {
    warnOnce(message, key);
  }
}
__name(warnOnceIf, "warnOnceIf");
var kPlain = /* @__PURE__ */ Symbol("notification-settings-plain");
function createNotificationSettings(plain) {
  const channels = [
    "email",
    "slack",
    "teams",
    "webPush"
  ];
  const descriptors = {
    [kPlain]: {
      value: plain,
      enumerable: false
    }
  };
  for (const channel of channels) {
    descriptors[channel] = {
      enumerable: true,
      /**
       * In the TypeScript standard library definitions, the built-in interface for a property descriptor
       * does not include a specialized type for the “this” context in the getter or setter functions.
       * As a result, both the ⁠get and ⁠set methods implicitly have ⁠this: any.
       * The reason is that property descriptors in JavaScript are used across various objects with
       * no enforced shape for ⁠this. And so the standard library definitions have to remain as broad as possible
       * to support any valid JavaScript usage (e.g `Object.defineProperty`).
       *
       * So we can safely tells that this getter is typed as `this: NotificationSettings` because we're
       * creating a well known shaped object → `NotificationSettings`.
       */
      get() {
        const value = this[kPlain][channel];
        if (typeof value === "undefined") {
          error2(
            `In order to use the '${channel}' channel, please set up your project first. For more information: https://liveblocks.io/docs/errors/enable-a-notification-channel`
          );
          return null;
        }
        return value;
      }
    };
  }
  return create(null, descriptors);
}
__name(createNotificationSettings, "createNotificationSettings");
var OFFSET = "12px";
var injectBrandBadge = /* @__PURE__ */ __name((badgeLocation = "bottom-right") => {
  if (typeof document === "undefined") {
    return;
  }
  if (document.getElementById("liveblocks-badge")) {
    return;
  }
  const badgeDiv = document.createElement("div");
  badgeDiv.id = "liveblocks-badge";
  badgeDiv.style.position = "fixed";
  badgeDiv.style.opacity = "0";
  badgeDiv.style.transition = "opacity 300ms";
  badgeDiv.style.zIndex = "9999";
  switch (badgeLocation) {
    case "top-right":
      badgeDiv.style.top = OFFSET;
      badgeDiv.style.right = OFFSET;
      break;
    case "bottom-right":
      badgeDiv.style.bottom = OFFSET;
      badgeDiv.style.right = OFFSET;
      break;
    case "bottom-left":
      badgeDiv.style.bottom = OFFSET;
      badgeDiv.style.left = OFFSET;
      break;
    case "top-left":
      badgeDiv.style.top = OFFSET;
      badgeDiv.style.left = OFFSET;
      break;
  }
  badgeDiv.onmouseenter = () => {
    const hideButton2 = document.getElementById("liveblocks-badge-hide-button");
    if (hideButton2) {
      hideButton2.style.opacity = "0.3";
    }
  };
  badgeDiv.onmouseleave = () => {
    const hideButton2 = document.getElementById("liveblocks-badge-hide-button");
    if (hideButton2) {
      hideButton2.style.opacity = "0";
    }
  };
  const link2 = document.createElement("a");
  link2.href = "https://lblcks.io/badge";
  link2.target = "_blank";
  link2.rel = "noopener noreferrer";
  link2.title = "Liveblocks";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "111");
  svg.setAttribute("height", "38");
  svg.setAttribute("viewBox", "0 0 111 38");
  svg.setAttribute("fill", "none");
  const rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect1.setAttribute("x", "1");
  rect1.setAttribute("y", "1");
  rect1.setAttribute("width", "109");
  rect1.setAttribute("height", "36");
  rect1.setAttribute("rx", "8");
  rect1.setAttribute("fill", "white");
  svg.appendChild(rect1);
  const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect2.setAttribute("x", "0.5");
  rect2.setAttribute("y", "0.5");
  rect2.setAttribute("width", "110");
  rect2.setAttribute("height", "37");
  rect2.setAttribute("rx", "8.5");
  rect2.setAttribute("stroke", "black");
  rect2.setAttribute("stroke-opacity", "0.1");
  svg.appendChild(rect2);
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M39.8256 18.0832H38L38.0005 28.9009H39.8256V18.0832ZM43.213 21.1757H41.3879V28.9009H43.213V21.1757ZM43.213 18H41.3879V19.9688H43.213V18ZM45.8916 21.1757H43.9302L46.6915 28.9009H48.7283L51.4896 21.1757H49.5581L48.4039 24.8348C48.3739 24.93 48.2657 25.3024 48.0795 25.9511L47.7099 27.1959C47.4914 26.406 47.2626 25.6189 47.0237 24.8348L45.8916 21.1757ZM58.9659 23.59C58.8147 23.0721 58.5934 22.6317 58.3014 22.2694C57.9743 21.8628 57.5598 21.5482 57.0571 21.3268C56.5589 21.1004 56.0058 20.9877 55.3973 20.9877C54.2407 20.9877 53.3152 21.3495 52.6212 22.0735C52.275 22.4476 52.0103 22.8896 51.844 23.3715C51.6731 23.8691 51.5876 24.4199 51.5876 25.0233C51.5876 26.3157 51.9322 27.3142 52.6217 28.0184C53.3203 28.7323 54.2509 29.0894 55.4125 29.0894C56.4083 29.0894 57.2151 28.8658 57.8342 28.4181C58.453 27.9704 58.8628 27.3068 59.0638 26.4266L57.2834 26.2908C57.198 26.7685 57.0016 27.1257 56.6948 27.3618C56.3879 27.5933 55.9555 27.7093 55.3973 27.7093C54.1201 27.7093 53.4663 26.9899 53.4363 25.5514H59.1844L59.1922 25.295C59.1922 24.6763 59.1165 24.108 58.9659 23.59ZM53.8434 23.0471C54.1654 22.5943 54.6834 22.3679 55.3973 22.3679C55.7443 22.3679 56.0363 22.4155 56.2725 22.5111C56.509 22.6067 56.7128 22.7601 56.8837 22.9713C57.0167 23.1352 57.1189 23.3218 57.1855 23.5221C57.2605 23.731 57.3062 23.9493 57.3213 24.1708H53.451C53.4964 23.7231 53.6271 23.3484 53.8434 23.0471ZM66.2836 21.4779C65.7656 21.1406 65.1673 20.9724 64.4885 20.9724H64.4875C63.995 20.9724 63.5449 21.0727 63.1374 21.2742C62.7364 21.4696 62.3931 21.7659 62.1412 22.1341V18.0832H60.316V28.9009H62.1416V27.8373C62.373 28.2195 62.7008 28.5342 63.0921 28.7499C63.4996 28.9763 63.9497 29.0894 64.4422 29.0894C65.1266 29.0894 65.7324 28.9259 66.2614 28.5992C66.7891 28.2726 67.1989 27.8045 67.4905 27.1959C67.7871 26.5823 67.9359 25.8634 67.9359 25.0386C67.9359 24.2337 67.7895 23.5248 67.4984 22.9113C67.2115 22.2926 66.8066 21.8148 66.2836 21.4779ZM65.5064 27.0828C65.2148 27.5254 64.7172 27.7463 64.0125 27.7463C63.3786 27.7463 62.9013 27.5175 62.5797 27.0601C62.2576 26.6026 62.0968 25.9336 62.0968 25.0534C62.0968 24.2032 62.24 23.5397 62.5265 23.0619C62.8185 22.579 63.3088 22.3378 63.9978 22.3378C64.7019 22.3378 65.2023 22.5592 65.499 23.0013C65.7961 23.4389 65.944 24.1181 65.944 25.0386C65.944 25.9585 65.7985 26.6401 65.5064 27.0828ZM70.901 18.0832H69.0754V28.9009H70.901V18.0832ZM73.8582 28.6066C74.452 28.9286 75.1558 29.0894 75.9708 29.0894C76.7554 29.0894 77.4444 28.9208 78.0377 28.5844C78.6268 28.2569 79.1068 27.7637 79.4183 27.1659C79.745 26.5523 79.9086 25.843 79.9086 25.0386C79.9086 24.2642 79.7478 23.5697 79.4257 22.9565C79.117 22.3516 78.6404 21.8487 78.0529 21.508C77.4592 21.161 76.7652 20.9872 75.9708 20.9872C75.171 20.9872 74.4719 21.161 73.8735 21.508C73.2876 21.8472 72.811 22.3471 72.5002 22.9486C72.1837 23.5572 72.0252 24.254 72.0252 25.0386C72.0252 25.8735 72.181 26.5948 72.4929 27.2033C72.7962 27.798 73.2722 28.2871 73.8582 28.6066ZM77.4869 27.0906C77.18 27.5231 76.6746 27.7393 75.9708 27.7393C75.493 27.7393 75.1082 27.6437 74.8166 27.4524C74.5246 27.2565 74.3134 26.9621 74.1826 26.5699C74.0518 26.1725 73.9867 25.6619 73.9867 25.0381C73.9867 24.1029 74.1401 23.419 74.4469 22.9866C74.7588 22.5541 75.2667 22.3378 75.9708 22.3378C76.6699 22.3378 77.1727 22.5541 77.4795 22.9866C77.7914 23.419 77.9471 24.1029 77.9471 25.0386C77.9471 25.9738 77.7937 26.6576 77.4869 27.0906ZM82.3982 28.6066C82.9869 28.9286 83.6883 29.0894 84.5033 29.0894C85.1369 29.0894 85.7029 28.9791 86.2005 28.7577C86.6989 28.5364 87.1031 28.2272 87.4152 27.8299C87.7279 27.4249 87.9329 26.9471 88.0109 26.4414L86.2534 26.2607C86.1328 26.7431 85.9316 27.1031 85.6497 27.3392C85.3683 27.5757 84.9857 27.694 84.5033 27.694C84.0103 27.694 83.6232 27.5933 83.3413 27.3918C83.0598 27.1858 82.8635 26.8919 82.7531 26.5093C82.6422 26.1221 82.5872 25.6318 82.5872 25.0386C82.5872 24.455 82.6422 23.9722 82.7531 23.59C82.8635 23.2028 83.0571 22.9062 83.3339 22.6997C83.6157 22.4884 84.0053 22.3831 84.5033 22.3831C85.0362 22.3831 85.4312 22.5314 85.6877 22.8281C85.949 23.1196 86.1354 23.5193 86.2456 24.0276L87.9735 23.718C87.8078 22.8932 87.4326 22.232 86.8491 21.7344C86.2708 21.2363 85.489 20.9877 84.5033 20.9877C83.6985 20.9877 83.0021 21.1587 82.4134 21.5006C81.8322 21.8351 81.3625 22.3337 81.0633 22.9339C80.7514 23.5424 80.5952 24.2439 80.5952 25.0386C80.5952 25.8781 80.7486 26.6026 81.0554 27.2112C81.3673 27.8197 81.8151 28.285 82.3982 28.6066ZM90.8104 26.0343L91.6627 25.2192L93.9257 28.9009H96.0308L92.8999 24.0498L95.9328 21.1757H93.5634L90.8104 23.9976V18.0832H88.9845V28.9009H90.8104V26.0343ZM97.6304 28.8103C98.1436 28.9965 98.7142 29.0894 99.3428 29.0894C100.303 29.0894 101.095 28.8981 101.719 28.5165C102.348 28.1339 102.663 27.5101 102.663 26.6451C102.663 26.0818 102.516 25.6392 102.225 25.3176C101.933 24.9905 101.586 24.7566 101.184 24.6157C100.786 24.4702 100.245 24.3219 99.562 24.1707C99.1642 24.0853 98.8502 24.0049 98.6188 23.9295C98.3873 23.8538 98.201 23.7558 98.0604 23.6352C97.925 23.5141 97.8567 23.3584 97.8567 23.1676C97.8567 22.8858 97.9824 22.6723 98.2338 22.5263C98.4853 22.3803 98.7973 22.3073 99.1694 22.3073C99.6619 22.3073 100.047 22.4255 100.324 22.6621C100.605 22.8987 100.756 23.2531 100.776 23.7258L102.466 23.4467C102.385 22.5817 102.046 21.9556 101.447 21.568C100.854 21.1812 100.095 20.9872 99.1694 20.9872C98.6258 20.9872 98.1236 21.0699 97.6607 21.2362C97.2029 21.397 96.8335 21.6511 96.5517 21.9986C96.27 22.3451 96.1294 22.7827 96.1294 23.3109C96.1294 23.7988 96.25 24.1934 96.4911 24.4951C96.7368 24.8001 97.0527 25.0408 97.4118 25.1965C97.7838 25.3578 98.2512 25.5112 98.8147 25.6567L99.2828 25.7699C99.5949 25.844 99.9044 25.9295 100.211 26.0264C100.421 26.092 100.595 26.1826 100.731 26.2981C100.867 26.4136 100.935 26.5647 100.935 26.7509C100.935 27.0776 100.799 27.3294 100.527 27.505C100.261 27.6815 99.8708 27.7693 99.3583 27.7693C98.8347 27.7693 98.4176 27.6385 98.1055 27.377C97.7941 27.1154 97.6355 26.7384 97.6304 26.2454L95.9109 26.4413C95.9302 27.0351 96.094 27.5304 96.4009 27.9278C96.7129 28.3252 97.1223 28.619 97.6304 28.8103Z"
  );
  path1.setAttribute("fill", "black");
  svg.appendChild(path1);
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M37.6392 15V9.18182H39.7131C40.1657 9.18182 40.5407 9.2642 40.8381 9.42898C41.1354 9.59375 41.358 9.81913 41.5057 10.1051C41.6534 10.3892 41.7273 10.7093 41.7273 11.0653C41.7273 11.4233 41.6525 11.7453 41.5028 12.0312C41.3551 12.3153 41.1316 12.5407 40.8324 12.7074C40.535 12.8722 40.161 12.9545 39.7102 12.9545H38.2841V12.2102H39.6307C39.9167 12.2102 40.1487 12.161 40.3267 12.0625C40.5047 11.9621 40.6354 11.8258 40.7188 11.6534C40.8021 11.4811 40.8438 11.285 40.8438 11.0653C40.8438 10.8456 40.8021 10.6506 40.7188 10.4801C40.6354 10.3097 40.5038 10.1761 40.3239 10.0795C40.1458 9.98295 39.911 9.93466 39.6193 9.93466H38.517V15H37.6392ZM44.4716 15.0881C44.0625 15.0881 43.7055 14.9943 43.4006 14.8068C43.0956 14.6193 42.8589 14.357 42.6903 14.0199C42.5218 13.6828 42.4375 13.2888 42.4375 12.8381C42.4375 12.3854 42.5218 11.9896 42.6903 11.6506C42.8589 11.3116 43.0956 11.0483 43.4006 10.8608C43.7055 10.6733 44.0625 10.5795 44.4716 10.5795C44.8807 10.5795 45.2377 10.6733 45.5426 10.8608C45.8475 11.0483 46.0843 11.3116 46.2528 11.6506C46.4214 11.9896 46.5057 12.3854 46.5057 12.8381C46.5057 13.2888 46.4214 13.6828 46.2528 14.0199C46.0843 14.357 45.8475 14.6193 45.5426 14.8068C45.2377 14.9943 44.8807 15.0881 44.4716 15.0881ZM44.4744 14.375C44.7396 14.375 44.9593 14.3049 45.1335 14.1648C45.3078 14.0246 45.4366 13.8381 45.5199 13.6051C45.6051 13.3722 45.6477 13.1155 45.6477 12.8352C45.6477 12.5568 45.6051 12.3011 45.5199 12.0682C45.4366 11.8333 45.3078 11.6449 45.1335 11.5028C44.9593 11.3608 44.7396 11.2898 44.4744 11.2898C44.2074 11.2898 43.9858 11.3608 43.8097 11.5028C43.6354 11.6449 43.5057 11.8333 43.4205 12.0682C43.3371 12.3011 43.2955 12.5568 43.2955 12.8352C43.2955 13.1155 43.3371 13.3722 43.4205 13.6051C43.5057 13.8381 43.6354 14.0246 43.8097 14.1648C43.9858 14.3049 44.2074 14.375 44.4744 14.375ZM48.267 15L46.983 10.6364H47.8608L48.7159 13.8409H48.7585L49.6165 10.6364H50.4943L51.3466 13.8267H51.3892L52.2386 10.6364H53.1165L51.8352 15H50.9688L50.0824 11.8494H50.017L49.1307 15H48.267ZM55.6705 15.0881C55.2405 15.0881 54.8703 14.9962 54.5597 14.8125C54.2509 14.6269 54.0123 14.3665 53.8438 14.0312C53.6771 13.6941 53.5938 13.2992 53.5938 12.8466C53.5938 12.3996 53.6771 12.0057 53.8438 11.6648C54.0123 11.3239 54.2472 11.0578 54.5483 10.8665C54.8513 10.6752 55.2055 10.5795 55.6108 10.5795C55.857 10.5795 56.0956 10.6203 56.3267 10.7017C56.5578 10.7831 56.7652 10.911 56.9489 11.0852C57.1326 11.2595 57.2775 11.4858 57.3835 11.7642C57.4896 12.0407 57.5426 12.3769 57.5426 12.7727V13.0739H54.0739V12.4375H56.7102C56.7102 12.214 56.6648 12.0161 56.5739 11.8438C56.483 11.6695 56.3551 11.5322 56.1903 11.4318C56.0275 11.3314 55.8362 11.2812 55.6165 11.2812C55.3778 11.2812 55.1695 11.34 54.9915 11.4574C54.8153 11.5729 54.679 11.7244 54.5824 11.9119C54.4877 12.0975 54.4403 12.2992 54.4403 12.517V13.0142C54.4403 13.3059 54.4915 13.554 54.5938 13.7585C54.6979 13.9631 54.8428 14.1193 55.0284 14.2273C55.214 14.3333 55.4309 14.3864 55.679 14.3864C55.84 14.3864 55.9867 14.3636 56.1193 14.3182C56.2519 14.2708 56.3665 14.2008 56.4631 14.108C56.5597 14.0152 56.6335 13.9006 56.6847 13.7642L57.4886 13.9091C57.4242 14.1458 57.3087 14.3532 57.142 14.5312C56.9773 14.7074 56.7699 14.8447 56.5199 14.9432C56.2718 15.0398 55.9886 15.0881 55.6705 15.0881ZM58.4851 15V10.6364H59.3061V11.3295H59.3516C59.4311 11.0947 59.5713 10.91 59.772 10.7756C59.9747 10.6392 60.2038 10.571 60.4595 10.571C60.5125 10.571 60.575 10.5729 60.647 10.5767C60.7209 10.5805 60.7786 10.5852 60.8203 10.5909V11.4034C60.7862 11.3939 60.7256 11.3835 60.6385 11.3722C60.5514 11.3589 60.4643 11.3523 60.3771 11.3523C60.1764 11.3523 59.9974 11.3949 59.8402 11.4801C59.6849 11.5634 59.5618 11.6799 59.4709 11.8295C59.38 11.9773 59.3345 12.1458 59.3345 12.3352V15H58.4851ZM63.2798 15.0881C62.8499 15.0881 62.4796 14.9962 62.169 14.8125C61.8603 14.6269 61.6217 14.3665 61.4531 14.0312C61.2865 13.6941 61.2031 13.2992 61.2031 12.8466C61.2031 12.3996 61.2865 12.0057 61.4531 11.6648C61.6217 11.3239 61.8565 11.0578 62.1577 10.8665C62.4607 10.6752 62.8149 10.5795 63.2202 10.5795C63.4664 10.5795 63.705 10.6203 63.9361 10.7017C64.1671 10.7831 64.3745 10.911 64.5582 11.0852C64.742 11.2595 64.8868 11.4858 64.9929 11.7642C65.099 12.0407 65.152 12.3769 65.152 12.7727V13.0739H61.6832V12.4375H64.3196C64.3196 12.214 64.2741 12.0161 64.1832 11.8438C64.0923 11.6695 63.9645 11.5322 63.7997 11.4318C63.6368 11.3314 63.4455 11.2812 63.2259 11.2812C62.9872 11.2812 62.7789 11.34 62.6009 11.4574C62.4247 11.5729 62.2884 11.7244 62.1918 11.9119C62.0971 12.0975 62.0497 12.2992 62.0497 12.517V13.0142C62.0497 13.3059 62.1009 13.554 62.2031 13.7585C62.3073 13.9631 62.4522 14.1193 62.6378 14.2273C62.8234 14.3333 63.0402 14.3864 63.2884 14.3864C63.4493 14.3864 63.5961 14.3636 63.7287 14.3182C63.8613 14.2708 63.9759 14.2008 64.0724 14.108C64.169 14.0152 64.2429 13.9006 64.294 13.7642L65.098 13.9091C65.0336 14.1458 64.9181 14.3532 64.7514 14.5312C64.5866 14.7074 64.3793 14.8447 64.1293 14.9432C63.8812 15.0398 63.598 15.0881 63.2798 15.0881ZM67.728 15.0852C67.3757 15.0852 67.0613 14.9953 66.7848 14.8153C66.5102 14.6335 66.2943 14.375 66.1371 14.0398C65.9818 13.7027 65.9041 13.2983 65.9041 12.8267C65.9041 12.3551 65.9827 11.9517 66.1399 11.6165C66.299 11.2812 66.5168 11.0246 66.7933 10.8466C67.0698 10.6686 67.3833 10.5795 67.7337 10.5795C68.0045 10.5795 68.2223 10.625 68.3871 10.7159C68.5537 10.8049 68.6825 10.9091 68.7734 11.0284C68.8662 11.1477 68.9382 11.2528 68.9893 11.3438H69.0405V9.18182H69.8899V15H69.0604V14.321H68.9893C68.9382 14.4138 68.8643 14.5199 68.7678 14.6392C68.6731 14.7585 68.5424 14.8627 68.3757 14.9517C68.209 15.0407 67.9931 15.0852 67.728 15.0852ZM67.9155 14.3608C68.1598 14.3608 68.3662 14.2964 68.5348 14.1676C68.7053 14.0369 68.834 13.8561 68.9212 13.625C69.0102 13.3939 69.0547 13.125 69.0547 12.8182C69.0547 12.5152 69.0111 12.25 68.924 12.0227C68.8369 11.7955 68.709 11.6184 68.5405 11.4915C68.3719 11.3646 68.1636 11.3011 67.9155 11.3011C67.6598 11.3011 67.4467 11.3674 67.2763 11.5C67.1058 11.6326 66.977 11.8134 66.8899 12.0426C66.8047 12.2718 66.7621 12.5303 66.7621 12.8182C66.7621 13.1098 66.8056 13.3722 66.8928 13.6051C66.9799 13.8381 67.1087 14.0227 67.2791 14.1591C67.4515 14.2936 67.6636 14.3608 67.9155 14.3608ZM73.2876 15V9.18182H74.1371V11.3438H74.1882C74.2375 11.2528 74.3085 11.1477 74.4013 11.0284C74.4941 10.9091 74.6229 10.8049 74.7876 10.7159C74.9524 10.625 75.1702 10.5795 75.4411 10.5795C75.7933 10.5795 76.1077 10.6686 76.3842 10.8466C76.6607 11.0246 76.8776 11.2812 77.0348 11.6165C77.1939 11.9517 77.2734 12.3551 77.2734 12.8267C77.2734 13.2983 77.1948 13.7027 77.0376 14.0398C76.8804 14.375 76.6645 14.6335 76.3899 14.8153C76.1153 14.9953 75.8018 15.0852 75.4496 15.0852C75.1844 15.0852 74.9676 15.0407 74.799 14.9517C74.6323 14.8627 74.5017 14.7585 74.407 14.6392C74.3123 14.5199 74.2393 14.4138 74.1882 14.321H74.1172V15H73.2876ZM74.12 12.8182C74.12 13.125 74.1645 13.3939 74.2536 13.625C74.3426 13.8561 74.4714 14.0369 74.6399 14.1676C74.8085 14.2964 75.0149 14.3608 75.2592 14.3608C75.513 14.3608 75.7251 14.2936 75.8956 14.1591C76.0661 14.0227 76.1948 13.8381 76.282 13.6051C76.371 13.3722 76.4155 13.1098 76.4155 12.8182C76.4155 12.5303 76.3719 12.2718 76.2848 12.0426C76.1996 11.8134 76.0708 11.6326 75.8984 11.5C75.728 11.3674 75.5149 11.3011 75.2592 11.3011C75.013 11.3011 74.8047 11.3646 74.6342 11.4915C74.4657 11.6184 74.3378 11.7955 74.2507 12.0227C74.1636 12.25 74.12 12.5152 74.12 12.8182ZM78.6158 16.6364C78.4889 16.6364 78.3733 16.6259 78.2692 16.6051C78.165 16.5862 78.0874 16.5653 78.0362 16.5426L78.2408 15.8466C78.3961 15.8883 78.5343 15.9063 78.6555 15.9006C78.7768 15.8949 78.8838 15.8494 78.9766 15.7642C79.0713 15.679 79.1546 15.5398 79.2266 15.3466L79.3317 15.0568L77.7351 10.6364H78.6442L79.7493 14.0227H79.7947L80.8999 10.6364H81.8118L80.0135 15.5824C79.9302 15.8097 79.8241 16.0019 79.6953 16.1591C79.5665 16.3182 79.4131 16.4375 79.2351 16.517C79.0571 16.5966 78.8506 16.6364 78.6158 16.6364Z"
  );
  path2.setAttribute("fill", "black");
  path2.setAttribute("fill-opacity", "0.5");
  svg.appendChild(path2);
  const rect3 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect3.setAttribute("x", "7");
  rect3.setAttribute("y", "7");
  rect3.setAttribute("width", "24");
  rect3.setAttribute("height", "24");
  rect3.setAttribute("rx", "3");
  rect3.setAttribute("fill", "black");
  svg.appendChild(rect3);
  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute("fill-rule", "evenodd");
  path3.setAttribute("clip-rule", "evenodd");
  path3.setAttribute(
    "d",
    "M22.0455 15H12.2273L15.1364 17.9091V21.9091L22.0455 15Z"
  );
  path3.setAttribute("fill", "white");
  svg.appendChild(path3);
  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute("fill-rule", "evenodd");
  path4.setAttribute("clip-rule", "evenodd");
  path4.setAttribute(
    "d",
    "M16.9546 22.9999H26.7728L23.8637 20.0908V16.0908L16.9546 22.9999Z"
  );
  path4.setAttribute("fill", "white");
  svg.appendChild(path4);
  link2.appendChild(svg);
  badgeDiv.appendChild(link2);
  const hideButton = document.createElement("button");
  hideButton.id = "liveblocks-badge-hide-button";
  hideButton.style.position = "absolute";
  hideButton.style.top = "0";
  hideButton.style.right = "0";
  hideButton.style.border = "none";
  hideButton.style.padding = "0";
  hideButton.style.margin = "0";
  hideButton.style.background = "none";
  hideButton.style.font = "inherit";
  hideButton.style.cursor = "pointer";
  hideButton.style.outline = "none";
  hideButton.style.setProperty("-webkit-appearance", "none");
  hideButton.style.setProperty("-moz-appearance", "none");
  hideButton.style.setProperty("appearance", "none");
  hideButton.style.opacity = "0";
  hideButton.onclick = () => {
    const badge2 = document.getElementById("liveblocks-badge");
    if (badge2) {
      badge2.style.display = "none";
    }
  };
  hideButton.onmouseenter = () => {
    hideButton.style.opacity = "0.5";
  };
  hideButton.onmouseleave = () => {
    hideButton.style.opacity = "0.3";
  };
  const hideSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  hideSvg.setAttribute("width", "18");
  hideSvg.setAttribute("height", "18");
  hideSvg.setAttribute("viewBox", "0 0 18 18");
  hideSvg.setAttribute("fill", "none");
  const hidePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  hidePath.setAttribute("d", "M6 6L9 9M12 12L9 9M9 9L12 6M9 9L6 12");
  hidePath.setAttribute("stroke", "black");
  hideSvg.appendChild(hidePath);
  hideButton.appendChild(hideSvg);
  badgeDiv.appendChild(hideButton);
  document.body.appendChild(badgeDiv);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      badgeDiv.style.opacity = "1";
    });
  });
}, "injectBrandBadge");
var Deque = class {
  static {
    __name(this, "Deque");
  }
  #data;
  #front;
  #back;
  #size;
  constructor() {
    this.#data = {};
    this.#front = 0;
    this.#back = 1;
    this.#size = 0;
  }
  get length() {
    return this.#size;
  }
  *[Symbol.iterator]() {
    const size = this.#size;
    const front = this.#front;
    for (let i = 0; i < size; i++) {
      yield this.#data[front + i];
    }
  }
  push(value) {
    const values2 = Array.isArray(value) ? value : [value];
    if (this.#back > Number.MAX_SAFE_INTEGER - values2.length - 1)
      raise("Deque full");
    for (const value2 of values2) {
      this.#data[this.#back++ - 1] = value2;
    }
    this.#size += values2.length;
  }
  pop() {
    if (this.#size < 1) return void 0;
    this.#back--;
    const value = this.#data[this.#back - 1];
    delete this.#data[this.#back - 1];
    this.#size--;
    return value;
  }
  pushLeft(value) {
    const values2 = Array.isArray(value) ? value : [value];
    if (this.#front < Number.MIN_SAFE_INTEGER + values2.length)
      raise("Deque full");
    for (let i = values2.length - 1; i >= 0; i--) {
      this.#data[--this.#front] = values2[i];
    }
    this.#size += values2.length;
  }
  popLeft() {
    if (this.#size < 1) return void 0;
    const value = this.#data[this.#front];
    delete this.#data[this.#front];
    this.#front++;
    this.#size--;
    return value;
  }
};
function isJsonScalar(data) {
  return data === null || typeof data === "string" || typeof data === "number" || typeof data === "boolean";
}
__name(isJsonScalar, "isJsonScalar");
function isJsonArray(data) {
  return Array.isArray(data);
}
__name(isJsonArray, "isJsonArray");
function isJsonObject(data) {
  return !isJsonScalar(data) && !isJsonArray(data);
}
__name(isJsonObject, "isJsonObject");
function makeStopWatch() {
  let startTime = 0;
  let lastLapTime = 0;
  let laps;
  function start() {
    laps = [];
    startTime = performance.now();
    lastLapTime = startTime;
  }
  __name(start, "start");
  function lap(now2 = performance.now()) {
    laps.push(now2 - lastLapTime);
    lastLapTime = now2;
  }
  __name(lap, "lap");
  function stop() {
    const endTime = performance.now();
    lap(endTime);
    const total = endTime - startTime;
    return { total, laps };
  }
  __name(stop, "stop");
  return { start, lap, stop };
}
__name(makeStopWatch, "makeStopWatch");
var ClientMsgCode = Object.freeze({
  // For Presence
  UPDATE_PRESENCE: 100,
  BROADCAST_EVENT: 103,
  // For Storage
  FETCH_STORAGE: 200,
  UPDATE_STORAGE: 201,
  // For Yjs support
  FETCH_YDOC: 300,
  UPDATE_YDOC: 301,
  // For Feeds
  FETCH_FEEDS: 510,
  FETCH_FEED_MESSAGES: 511,
  ADD_FEED: 512,
  UPDATE_FEED: 513,
  DELETE_FEED: 514,
  ADD_FEED_MESSAGE: 515,
  UPDATE_FEED_MESSAGE: 516,
  DELETE_FEED_MESSAGE: 517
});
function makeUser(conn, presence) {
  const { connectionId, id, info } = conn;
  const canWrite = canWriteStorage(conn.scopes);
  return freeze(
    compactObject({
      connectionId,
      id,
      info,
      canWrite,
      canComment: canComment(conn.scopes),
      isReadOnly: !canWrite,
      // Deprecated, kept for backward-compatibility
      presence
    })
  );
}
__name(makeUser, "makeUser");
var ManagedOthers = class {
  static {
    __name(this, "ManagedOthers");
  }
  // Track mutable state internally, but signal to the outside when the
  // observable derived state changes only
  #internal;
  #userCache;
  // The "clean" signal that is exposed to the outside world
  signal;
  constructor() {
    this.#internal = new MutableSignal({
      connections: /* @__PURE__ */ new Map(),
      presences: /* @__PURE__ */ new Map()
    });
    this.signal = DerivedSignal.from(
      this.#internal,
      (_ignore) => compact(
        Array.from(this.#internal.get().presences.keys()).map(
          (connectionId) => this.getUser(Number(connectionId))
        )
      )
    );
    this.#userCache = /* @__PURE__ */ new Map();
  }
  // Shorthand for .signal.get()
  get() {
    return this.signal.get();
  }
  connectionIds() {
    return this.#internal.get().connections.keys();
  }
  clearOthers() {
    this.#internal.mutate((state) => {
      state.connections.clear();
      state.presences.clear();
      this.#userCache.clear();
    });
  }
  #_getUser(connectionId) {
    const state = this.#internal.get();
    const conn = state.connections.get(connectionId);
    const presence = state.presences.get(connectionId);
    if (conn !== void 0 && presence !== void 0) {
      return makeUser(conn, presence);
    }
    return void 0;
  }
  getUser(connectionId) {
    const cachedUser = this.#userCache.get(connectionId);
    if (cachedUser) {
      return cachedUser;
    }
    const computedUser = this.#_getUser(connectionId);
    if (computedUser) {
      this.#userCache.set(connectionId, computedUser);
      return computedUser;
    }
    return void 0;
  }
  #invalidateUser(connectionId) {
    this.#userCache.delete(connectionId);
  }
  /**
   * Records a known connection. This records the connection ID and the
   * associated metadata.
   */
  setConnection(connectionId, metaUserId, metaUserInfo, scopes) {
    this.#internal.mutate((state) => {
      state.connections.set(
        connectionId,
        freeze({
          connectionId,
          id: metaUserId,
          info: metaUserInfo,
          scopes
        })
      );
      if (!state.presences.has(connectionId)) {
        return false;
      }
      return this.#invalidateUser(connectionId);
    });
  }
  /**
   * Removes a known connectionId. Removes both the connection's metadata and
   * the presence information.
   */
  removeConnection(connectionId) {
    this.#internal.mutate((state) => {
      state.connections.delete(connectionId);
      state.presences.delete(connectionId);
      this.#invalidateUser(connectionId);
    });
  }
  /**
   * Stores a new user from a full presence update. If the user already exists,
   * its known presence data is overwritten.
   */
  setOther(connectionId, presence) {
    this.#internal.mutate((state) => {
      state.presences.set(connectionId, freeze(compactObject(presence)));
      if (!state.connections.has(connectionId)) {
        return false;
      }
      return this.#invalidateUser(connectionId);
    });
  }
  /**
   * Patches the presence data for an existing "other". If we don't know the
   * initial presence data for this user yet, discard this patch and await the
   * full .setOther() call first.
   */
  patchOther(connectionId, patch) {
    this.#internal.mutate((state) => {
      const oldPresence = state.presences.get(connectionId);
      if (oldPresence === void 0) {
        return false;
      }
      const newPresence = merge(oldPresence, patch);
      if (oldPresence === newPresence) {
        return false;
      }
      state.presences.set(connectionId, freeze(newPresence));
      return this.#invalidateUser(connectionId);
    });
  }
};
var LiveblocksError = class _LiveblocksError extends Error {
  static {
    __name(this, "_LiveblocksError");
  }
  context;
  constructor(message, context, cause) {
    super(message, { cause });
    this.context = context;
    this.name = "LiveblocksError";
  }
  /** Convenience accessor for error.context.roomId (if available) */
  get roomId() {
    return this.context.roomId;
  }
  /** @internal Use `context.code` instead, to enable type narrowing */
  get code() {
    return this.context.code;
  }
  /**
   * Creates a LiveblocksError from a generic error, by attaching Liveblocks
   * contextual information like room ID, thread ID, etc.
   */
  static from(context, cause) {
    return new _LiveblocksError(
      defaultMessageFromContext(context),
      context,
      cause
    );
  }
};
function defaultMessageFromContext(context) {
  switch (context.type) {
    case "ROOM_CONNECTION_ERROR": {
      switch (context.code) {
        case 4001:
          return "Not allowed to connect to the room";
        case 4005:
          return "Room is already full";
        case 4006:
          return "Kicked out of the room, because the room ID changed";
        default:
          return "Could not connect to the room";
      }
    }
    case "AI_CONNECTION_ERROR": {
      switch (context.code) {
        case 4001:
          return "Not allowed to connect to ai";
        default:
          return "Could not connect to the room";
      }
    }
    case "CREATE_THREAD_ERROR":
      return "Could not create new thread";
    case "DELETE_THREAD_ERROR":
      return "Could not delete thread";
    case "EDIT_THREAD_METADATA_ERROR":
      return "Could not edit thread metadata";
    case "EDIT_COMMENT_METADATA_ERROR":
      return "Could not edit comment metadata";
    case "MARK_THREAD_AS_RESOLVED_ERROR":
      return "Could not mark thread as resolved";
    case "MARK_THREAD_AS_UNRESOLVED_ERROR":
      return "Could not mark thread as unresolved";
    case "SUBSCRIBE_TO_THREAD_ERROR":
      return "Could not subscribe to thread";
    case "UNSUBSCRIBE_FROM_THREAD_ERROR":
      return "Could not unsubscribe from thread";
    case "CREATE_COMMENT_ERROR":
      return "Could not create new comment";
    case "EDIT_COMMENT_ERROR":
      return "Could not edit comment";
    case "DELETE_COMMENT_ERROR":
      return "Could not delete comment";
    case "ADD_REACTION_ERROR":
      return "Could not add reaction";
    case "REMOVE_REACTION_ERROR":
      return "Could not remove reaction";
    case "MARK_INBOX_NOTIFICATION_AS_READ_ERROR":
      return "Could not mark inbox notification as read";
    case "DELETE_INBOX_NOTIFICATION_ERROR":
      return "Could not delete inbox notification";
    case "MARK_ALL_INBOX_NOTIFICATIONS_AS_READ_ERROR":
      return "Could not mark all inbox notifications as read";
    case "DELETE_ALL_INBOX_NOTIFICATIONS_ERROR":
      return "Could not delete all inbox notifications";
    case "UPDATE_ROOM_SUBSCRIPTION_SETTINGS_ERROR":
      return "Could not update room subscription settings";
    case "UPDATE_NOTIFICATION_SETTINGS_ERROR":
      return "Could not update notification settings";
    case "LARGE_MESSAGE_ERROR":
      return "Could not send large message";
    case "FEED_REQUEST_ERROR":
      return context.reason ?? "Feed request failed";
    default:
      return assertNever(context, "Unhandled case");
  }
}
__name(defaultMessageFromContext, "defaultMessageFromContext");
var FEEDS_TIMEOUT = 5e3;
function makeIdFactory(connectionId) {
  let count = 0;
  return () => `${connectionId}:${count++}`;
}
__name(makeIdFactory, "makeIdFactory");
function userToTreeNode(key, user) {
  return {
    type: "User",
    id: `${user.connectionId}`,
    key,
    payload: {
      connectionId: user.connectionId,
      id: user.id,
      info: user.info,
      presence: user.presence,
      isReadOnly: !user.canWrite
    }
  };
}
__name(userToTreeNode, "userToTreeNode");
function installBackgroundTabSpy() {
  const doc = typeof document !== "undefined" ? document : void 0;
  const inBackgroundSince = { current: null };
  function onVisibilityChange() {
    if (doc?.visibilityState === "hidden") {
      inBackgroundSince.current = inBackgroundSince.current ?? Date.now();
    } else {
      inBackgroundSince.current = null;
    }
  }
  __name(onVisibilityChange, "onVisibilityChange");
  doc?.addEventListener("visibilitychange", onVisibilityChange);
  const unsub = /* @__PURE__ */ __name(() => {
    doc?.removeEventListener("visibilitychange", onVisibilityChange);
  }, "unsub");
  return [inBackgroundSince, unsub];
}
__name(installBackgroundTabSpy, "installBackgroundTabSpy");
function makeNodeMapBuffer() {
  let map = /* @__PURE__ */ new Map();
  return {
    /** Append a "page" of nodes to the current NodeMap buffer. */
    append(chunk2) {
      for (const [id, node] of chunk2) {
        map.set(id, node);
      }
    },
    /** Return the contents of the current NodeMap buffer, and create a fresh new one. */
    take() {
      const result = map;
      map = /* @__PURE__ */ new Map();
      return result;
    }
  };
}
__name(makeNodeMapBuffer, "makeNodeMapBuffer");
function createRoom(options2, config) {
  const roomId = config.roomId;
  const initialPresence = options2.initialPresence;
  const initialStorage = options2.initialStorage;
  const httpClient = config.roomHttpClient;
  const [inBackgroundSince, uninstallBgTabSpy] = installBackgroundTabSpy();
  const delegates = {
    ...config.delegates,
    // A connection is allowed to go into "zombie state" only if all of the
    // following conditions apply:
    //
    // - The `backgroundKeepAliveTimeout` client option is configured
    // - The browser window has been in the background for at least
    //   `backgroundKeepAliveTimeout` milliseconds
    // - There are no pending changes
    //
    canZombie() {
      return config.backgroundKeepAliveTimeout !== void 0 && inBackgroundSince.current !== null && Date.now() > inBackgroundSince.current + config.backgroundKeepAliveTimeout && getStorageStatus() !== "synchronizing";
    }
  };
  const managedSocket = new ManagedSocket(
    delegates,
    config.enableDebugLogging
  );
  const context = {
    buffer: {
      flushTimerID: void 0,
      lastFlushedAt: 0,
      presenceUpdates: (
        // Queue up the initial presence message as a Full Presence™ update
        {
          type: "full",
          data: initialPresence
        }
      ),
      messages: [],
      storageOperations: []
    },
    staticSessionInfoSig: new Signal(null),
    dynamicSessionInfoSig: new Signal(null),
    myPresence: new PatchableSignal(initialPresence),
    others: new ManagedOthers(),
    initialStorage,
    idFactory: null,
    // The Yjs provider associated to this room
    yjsProvider: void 0,
    yjsProviderDidChange: makeEventSource(),
    // Storage
    pool: createManagedPool(roomId, {
      getCurrentConnectionId,
      onDispatch,
      isStorageWritable
    }),
    root: void 0,
    undoStack: [],
    redoStack: [],
    pausedHistory: null,
    activeBatch: null,
    unacknowledgedOps: /* @__PURE__ */ new Map()
  };
  const nodeMapBuffer = makeNodeMapBuffer();
  const stopwatch = config.enableDebugLogging ? makeStopWatch() : void 0;
  let lastTokenKey;
  function onStatusDidChange(newStatus) {
    const authValue = managedSocket.authValue;
    if (authValue !== null) {
      const tokenKey = getBearerTokenFromAuthValue(authValue);
      if (tokenKey !== lastTokenKey) {
        lastTokenKey = tokenKey;
        if (authValue.type === "secret") {
          const token = authValue.token.parsed;
          context.staticSessionInfoSig.set({
            userId: token.uid,
            userInfo: token.ui
          });
        } else {
          context.staticSessionInfoSig.set({
            userId: void 0,
            userInfo: void 0
          });
        }
      }
    }
    eventHub.status.notify(newStatus);
    notifySelfChanged();
  }
  __name(onStatusDidChange, "onStatusDidChange");
  let _connectionLossTimerId;
  let _hasLostConnection = false;
  function handleConnectionLossEvent(newStatus) {
    if (newStatus === "reconnecting") {
      _connectionLossTimerId = setTimeout(() => {
        eventHub.lostConnection.notify("lost");
        _hasLostConnection = true;
        context.others.clearOthers();
        notify({ others: [{ type: "reset" }] });
      }, config.lostConnectionTimeout);
    } else {
      clearTimeout(_connectionLossTimerId);
      if (_hasLostConnection) {
        if (newStatus === "disconnected") {
          eventHub.lostConnection.notify("failed");
        } else {
          eventHub.lostConnection.notify("restored");
        }
        _hasLostConnection = false;
      }
    }
  }
  __name(handleConnectionLossEvent, "handleConnectionLossEvent");
  function onDidConnect() {
    context.buffer.presenceUpdates = {
      type: "full",
      data: (
        // Because context.me.current is a readonly object, we'll have to
        // make a copy here. Otherwise, type errors happen later when
        // "patching" my presence.
        { ...context.myPresence.get() }
      )
    };
    if (_getStorage$ !== null) {
      refreshStorage({ flush: false });
    }
    flushNowOrSoon();
  }
  __name(onDidConnect, "onDidConnect");
  function onDidDisconnect() {
    clearTimeout(context.buffer.flushTimerID);
  }
  __name(onDidDisconnect, "onDidDisconnect");
  managedSocket.events.onMessage.subscribe(handleServerMessage);
  managedSocket.events.statusDidChange.subscribe(onStatusDidChange);
  managedSocket.events.statusDidChange.subscribe(handleConnectionLossEvent);
  managedSocket.events.didConnect.subscribe(onDidConnect);
  managedSocket.events.didDisconnect.subscribe(onDidDisconnect);
  managedSocket.events.onConnectionError.subscribe(({ message, code }) => {
    const type = "ROOM_CONNECTION_ERROR";
    const err = new LiveblocksError(message, { type, code, roomId });
    const didNotify = config.errorEventSource.notify(err);
    if (!didNotify) {
      if (process.env.NODE_ENV !== "production") {
        error2(
          `Connection to websocket server closed. Reason: ${message} (code: ${code}).`
        );
      }
    }
  });
  function onDispatch(ops, reverse, storageUpdates) {
    if (context.activeBatch) {
      for (const op of ops) {
        context.activeBatch.ops.push(op);
      }
      for (const [key, value] of storageUpdates) {
        context.activeBatch.updates.storageUpdates.set(
          key,
          mergeStorageUpdates(
            context.activeBatch.updates.storageUpdates.get(key),
            value
          )
        );
      }
      context.activeBatch.reverseOps.pushLeft(reverse);
    } else {
      if (reverse.length > 0) {
        addToUndoStack(reverse);
      }
      if (ops.length > 0) {
        context.redoStack.length = 0;
        dispatchOps(ops);
      }
      notify({ storageUpdates });
    }
  }
  __name(onDispatch, "onDispatch");
  function isStorageWritable() {
    const scopes = context.dynamicSessionInfoSig.get()?.scopes;
    return scopes !== void 0 ? canWriteStorage(scopes) : true;
  }
  __name(isStorageWritable, "isStorageWritable");
  const eventHub = {
    status: makeEventSource(),
    // New/recommended API
    lostConnection: makeEventSource(),
    customEvent: makeEventSource(),
    self: makeEventSource(),
    myPresence: makeEventSource(),
    others: makeEventSource(),
    storageBatch: makeEventSource(),
    history: makeEventSource(),
    storageDidLoad: makeEventSource(),
    storageStatus: makeEventSource(),
    ydoc: makeEventSource(),
    comments: makeEventSource(),
    feeds: makeEventSource(),
    roomWillDestroy: makeEventSource()
  };
  async function createTextMention(mentionId, mention) {
    return httpClient.createTextMention({ roomId, mentionId, mention });
  }
  __name(createTextMention, "createTextMention");
  async function deleteTextMention(mentionId) {
    return httpClient.deleteTextMention({ roomId, mentionId });
  }
  __name(deleteTextMention, "deleteTextMention");
  async function reportTextEditor(type, rootKey) {
    await httpClient.reportTextEditor({ roomId, type, rootKey });
  }
  __name(reportTextEditor, "reportTextEditor");
  async function listTextVersions() {
    return httpClient.listTextVersions({ roomId });
  }
  __name(listTextVersions, "listTextVersions");
  async function listTextVersionsSince(options22) {
    return httpClient.listTextVersionsSince({
      roomId,
      since: options22.since,
      signal: options22.signal
    });
  }
  __name(listTextVersionsSince, "listTextVersionsSince");
  async function getTextVersion(versionId) {
    return httpClient.getTextVersion({ roomId, versionId });
  }
  __name(getTextVersion, "getTextVersion");
  async function createTextVersion() {
    return httpClient.createTextVersion({ roomId });
  }
  __name(createTextVersion, "createTextVersion");
  async function executeContextualPrompt(options22) {
    return httpClient.executeContextualPrompt({
      roomId,
      ...options22
    });
  }
  __name(executeContextualPrompt, "executeContextualPrompt");
  function sendMessages(messages) {
    managedSocket.send(stringifyOrLog(messages));
  }
  __name(sendMessages, "sendMessages");
  const self = DerivedSignal.from(
    context.staticSessionInfoSig,
    context.dynamicSessionInfoSig,
    context.myPresence,
    (staticSession, dynamicSession, myPresence) => {
      if (staticSession === null || dynamicSession === null) {
        return null;
      } else {
        const canWrite = canWriteStorage(dynamicSession.scopes);
        return {
          connectionId: dynamicSession.actor,
          id: staticSession.userId,
          info: staticSession.userInfo,
          presence: myPresence,
          canWrite,
          canComment: canComment(dynamicSession.scopes)
        };
      }
    }
  );
  let _lastSelf;
  function notifySelfChanged() {
    const currSelf = self.get();
    if (currSelf !== null && currSelf !== _lastSelf) {
      eventHub.self.notify(currSelf);
      _lastSelf = currSelf;
    }
  }
  __name(notifySelfChanged, "notifySelfChanged");
  const selfAsTreeNode = DerivedSignal.from(
    self,
    (me) => me !== null ? userToTreeNode("Me", me) : null
  );
  function createOrUpdateRootFromMessage(nodes) {
    if (nodes.size === 0) {
      throw new Error("Internal error: cannot load storage without items");
    }
    if (context.root !== void 0) {
      const currentItems = /* @__PURE__ */ new Map();
      for (const [id, crdt] of context.pool.nodes) {
        currentItems.set(id, crdt._serialize());
      }
      const ops = getTreesDiffOperations(currentItems, nodes);
      const result = applyRemoteOps(ops);
      notify(result.updates);
    } else {
      context.root = LiveObject._fromItems(
        nodes,
        context.pool
      );
    }
    const canWrite = self.get()?.canWrite ?? true;
    const root = context.root;
    disableHistory(() => {
      for (const key in context.initialStorage) {
        if (root.get(key) === void 0) {
          if (canWrite) {
            root.set(key, cloneLson(context.initialStorage[key]));
          } else {
            warn(
              `Attempted to populate missing storage key '${key}', but current user has no write access`
            );
          }
        }
      }
    });
  }
  __name(createOrUpdateRootFromMessage, "createOrUpdateRootFromMessage");
  function _addToRealUndoStack(frames) {
    if (context.undoStack.length >= 50) {
      context.undoStack.shift();
    }
    context.undoStack.push(frames);
    onHistoryChange();
  }
  __name(_addToRealUndoStack, "_addToRealUndoStack");
  function addToUndoStack(frames) {
    if (context.pausedHistory !== null) {
      context.pausedHistory.pushLeft(frames);
    } else {
      _addToRealUndoStack(frames);
    }
  }
  __name(addToUndoStack, "addToUndoStack");
  function notify(updates) {
    const storageUpdates = updates.storageUpdates;
    const othersUpdates = updates.others;
    if (othersUpdates !== void 0 && othersUpdates.length > 0) {
      const others = context.others.get();
      for (const event of othersUpdates) {
        eventHub.others.notify({ ...event, others });
      }
    }
    if (updates.presence ?? false) {
      notifySelfChanged();
      eventHub.myPresence.notify(context.myPresence.get());
    }
    if (storageUpdates !== void 0 && storageUpdates.size > 0) {
      const updates2 = Array.from(storageUpdates.values());
      eventHub.storageBatch.notify(updates2);
    }
    notifyStorageStatus();
  }
  __name(notify, "notify");
  function getCurrentConnectionId() {
    const info = context.dynamicSessionInfoSig.get();
    if (info) {
      return info.actor;
    }
    throw new Error(
      "Internal. Tried to get connection id but connection was never open"
    );
  }
  __name(getCurrentConnectionId, "getCurrentConnectionId");
  function applyLocalOps(frames) {
    const [pframes, ops] = partition(
      frames,
      (f) => f.type === "presence"
    );
    const opsWithOpIds = ops.map(
      (op) => op.opId === void 0 ? { ...op, opId: context.pool.generateOpId() } : op
    );
    const { reverse, updates } = applyOps(
      pframes,
      opsWithOpIds,
      /* isLocal */
      true
    );
    return { opsToEmit: opsWithOpIds, reverse, updates };
  }
  __name(applyLocalOps, "applyLocalOps");
  function applyRemoteOps(ops) {
    return applyOps(
      [],
      ops,
      /* isLocal */
      false
    );
  }
  __name(applyRemoteOps, "applyRemoteOps");
  function applyOps(pframes, ops, isLocal) {
    const output = {
      reverse: new Deque(),
      storageUpdates: /* @__PURE__ */ new Map(),
      presence: false
    };
    for (const pf of pframes) {
      const reverse = {
        type: "presence",
        data: {}
      };
      for (const key in pf.data) {
        reverse.data[key] = context.myPresence.get()[key];
      }
      context.myPresence.patch(pf.data);
      if (context.buffer.presenceUpdates === null) {
        context.buffer.presenceUpdates = { type: "partial", data: pf.data };
      } else {
        for (const key in pf.data) {
          context.buffer.presenceUpdates.data[key] = pf.data[key];
        }
      }
      output.reverse.pushLeft(reverse);
      output.presence = true;
    }
    const createdNodeIds = /* @__PURE__ */ new Set();
    for (const op of ops) {
      let source;
      if (isLocal) {
        source = 0;
      } else if (op.opId !== void 0) {
        context.unacknowledgedOps.delete(op.opId);
        source = 2;
      } else {
        source = 1;
      }
      const applyOpResult = applyOp(op, source);
      if (applyOpResult.modified) {
        const nodeId = applyOpResult.modified.node._id;
        if (!(nodeId && createdNodeIds.has(nodeId))) {
          output.storageUpdates.set(
            nn(applyOpResult.modified.node._id),
            mergeStorageUpdates(
              output.storageUpdates.get(nn(applyOpResult.modified.node._id)),
              applyOpResult.modified
            )
          );
          output.reverse.pushLeft(applyOpResult.reverse);
        }
        if (op.type === OpCode.CREATE_LIST || op.type === OpCode.CREATE_MAP || op.type === OpCode.CREATE_OBJECT) {
          createdNodeIds.add(op.id);
        }
      }
    }
    return {
      reverse: Array.from(output.reverse),
      updates: {
        storageUpdates: output.storageUpdates,
        presence: output.presence
      }
    };
  }
  __name(applyOps, "applyOps");
  function applyOp(op, source) {
    if (isIgnoredOp(op)) {
      return { modified: false };
    }
    switch (op.type) {
      case OpCode.DELETE_OBJECT_KEY:
      case OpCode.UPDATE_OBJECT:
      case OpCode.DELETE_CRDT: {
        const node = context.pool.nodes.get(op.id);
        if (node === void 0) {
          return { modified: false };
        }
        return node._apply(
          op,
          source === 0
          /* LOCAL */
        );
      }
      case OpCode.SET_PARENT_KEY: {
        const node = context.pool.nodes.get(op.id);
        if (node === void 0) {
          return { modified: false };
        }
        if (node.parent.type === "HasParent" && isLiveList(node.parent.node)) {
          return node.parent.node._setChildKey(
            asPos(op.parentKey),
            node,
            source
          );
        }
        return { modified: false };
      }
      case OpCode.CREATE_OBJECT:
      case OpCode.CREATE_LIST:
      case OpCode.CREATE_MAP:
      case OpCode.CREATE_REGISTER: {
        if (op.parentId === void 0) {
          return { modified: false };
        }
        const parentNode = context.pool.nodes.get(op.parentId);
        if (parentNode === void 0) {
          return { modified: false };
        }
        return parentNode._attachChild(op, source);
      }
    }
  }
  __name(applyOp, "applyOp");
  function updatePresence(patch, options22) {
    const oldValues = {};
    if (context.buffer.presenceUpdates === null) {
      context.buffer.presenceUpdates = {
        type: "partial",
        data: {}
      };
    }
    for (const key in patch) {
      const overrideValue = patch[key];
      if (overrideValue === void 0) {
        continue;
      }
      context.buffer.presenceUpdates.data[key] = overrideValue;
      oldValues[key] = context.myPresence.get()[key];
    }
    context.myPresence.patch(patch);
    if (context.activeBatch) {
      if (options22?.addToHistory) {
        context.activeBatch.reverseOps.pushLeft({
          type: "presence",
          data: oldValues
        });
      }
      context.activeBatch.updates.presence = true;
    } else {
      flushNowOrSoon();
      if (options22?.addToHistory) {
        addToUndoStack([{ type: "presence", data: oldValues }]);
      }
      notify({ presence: true });
    }
  }
  __name(updatePresence, "updatePresence");
  function onUpdatePresenceMessage(message) {
    if (message.targetActor !== void 0) {
      const oldUser = context.others.getUser(message.actor);
      context.others.setOther(message.actor, message.data);
      const newUser = context.others.getUser(message.actor);
      if (oldUser === void 0 && newUser !== void 0) {
        return { type: "enter", user: newUser };
      }
    } else {
      context.others.patchOther(message.actor, message.data), message;
    }
    const user = context.others.getUser(message.actor);
    if (user) {
      return {
        type: "update",
        updates: message.data,
        user
      };
    } else {
      return void 0;
    }
  }
  __name(onUpdatePresenceMessage, "onUpdatePresenceMessage");
  function onUserLeftMessage(message) {
    const user = context.others.getUser(message.actor);
    if (user) {
      context.others.removeConnection(message.actor);
      return { type: "leave", user };
    }
    return null;
  }
  __name(onUserLeftMessage, "onUserLeftMessage");
  function onRoomStateMessage(message) {
    context.dynamicSessionInfoSig.set({
      actor: message.actor,
      nonce: message.nonce,
      scopes: message.scopes,
      meta: message.meta
    });
    context.idFactory = makeIdFactory(message.actor);
    notifySelfChanged();
    if (message.meta.showBrand === true) {
      injectBrandBadge(config.badgeLocation ?? "bottom-right");
    }
    for (const connectionId of context.others.connectionIds()) {
      const user = message.users[connectionId];
      if (user === void 0) {
        context.others.removeConnection(connectionId);
      }
    }
    for (const key in message.users) {
      const user = message.users[key];
      const connectionId = Number(key);
      context.others.setConnection(
        connectionId,
        user.id,
        user.info,
        user.scopes
      );
    }
    return { type: "reset" };
  }
  __name(onRoomStateMessage, "onRoomStateMessage");
  function canUndo() {
    return context.undoStack.length > 0;
  }
  __name(canUndo, "canUndo");
  function canRedo() {
    return context.redoStack.length > 0;
  }
  __name(canRedo, "canRedo");
  function onHistoryChange() {
    if (historyDisabled > 0) return;
    eventHub.history.notify({ canUndo: canUndo(), canRedo: canRedo() });
  }
  __name(onHistoryChange, "onHistoryChange");
  function onUserJoinedMessage(message) {
    context.others.setConnection(
      message.actor,
      message.id,
      message.info,
      message.scopes
    );
    context.buffer.messages.push({
      type: ClientMsgCode.UPDATE_PRESENCE,
      data: context.myPresence.get(),
      targetActor: message.actor
    });
    flushNowOrSoon();
    const user = context.others.getUser(message.actor);
    return user ? { type: "enter", user } : void 0;
  }
  __name(onUserJoinedMessage, "onUserJoinedMessage");
  function parseServerMessage(data) {
    if (!isJsonObject(data)) {
      return null;
    }
    return data;
  }
  __name(parseServerMessage, "parseServerMessage");
  function parseServerMessages(text) {
    const data = tryParseJson(text);
    if (data === void 0) {
      return null;
    } else if (isJsonArray(data)) {
      return compact(data.map((item) => parseServerMessage(item)));
    } else {
      return compact([parseServerMessage(data)]);
    }
  }
  __name(parseServerMessages, "parseServerMessages");
  function applyAndSendOfflineOps(unackedOps) {
    if (unackedOps.size === 0) {
      return;
    }
    const messages = [];
    const inOps = Array.from(unackedOps.values());
    const result = applyLocalOps(inOps);
    messages.push({
      type: ClientMsgCode.UPDATE_STORAGE,
      ops: result.opsToEmit
    });
    notify(result.updates);
    sendMessages(messages);
  }
  __name(applyAndSendOfflineOps, "applyAndSendOfflineOps");
  function isFeedRequestFailedMsg(msg) {
    return msg.type === ServerMsgCode.FEED_REQUEST_FAILED;
  }
  __name(isFeedRequestFailedMsg, "isFeedRequestFailedMsg");
  function handleServerMessage(event) {
    if (typeof event.data !== "string") {
      return;
    }
    const messages = parseServerMessages(event.data);
    if (messages === null || messages.length === 0) {
      return;
    }
    const updates = {
      storageUpdates: /* @__PURE__ */ new Map(),
      others: []
    };
    for (const message of messages) {
      switch (message.type) {
        case ServerMsgCode.USER_JOINED: {
          const userJoinedUpdate = onUserJoinedMessage(message);
          if (userJoinedUpdate) {
            updates.others.push(userJoinedUpdate);
          }
          break;
        }
        case ServerMsgCode.UPDATE_PRESENCE: {
          const othersPresenceUpdate = onUpdatePresenceMessage(message);
          if (othersPresenceUpdate) {
            updates.others.push(othersPresenceUpdate);
          }
          break;
        }
        case ServerMsgCode.BROADCASTED_EVENT: {
          const others = context.others.get();
          eventHub.customEvent.notify({
            connectionId: message.actor,
            user: message.actor < 0 ? null : others.find((u) => u.connectionId === message.actor) ?? null,
            event: message.event
          });
          break;
        }
        case ServerMsgCode.USER_LEFT: {
          const event2 = onUserLeftMessage(message);
          if (event2) {
            updates.others.push(event2);
          }
          break;
        }
        case ServerMsgCode.UPDATE_YDOC: {
          eventHub.ydoc.notify(message);
          break;
        }
        case ServerMsgCode.ROOM_STATE: {
          updates.others.push(onRoomStateMessage(message));
          break;
        }
        case ServerMsgCode.STORAGE_CHUNK:
          stopwatch?.lap();
          nodeMapBuffer.append(compactNodesToNodeStream(message.nodes));
          break;
        case ServerMsgCode.STORAGE_STREAM_END: {
          const timing = stopwatch?.stop();
          if (timing) {
            const ms = /* @__PURE__ */ __name((v) => `${v.toFixed(1)}ms`, "ms");
            const rest = timing.laps.slice(1);
            warn(
              `Storage chunk arrival: ${[
                `total=${ms(timing.total)}`,
                `first=${ms(timing.laps[0])}`,
                `rest.n=${rest.length}`,
                `rest.avg=${ms(rest.reduce((a, b) => a + b, 0) / rest.length)}`,
                `rest.max=${ms(rest.reduce((a, b) => Math.max(a, b), 0))}`
              ].join(", ")}`
            );
          }
          processInitialStorage(nodeMapBuffer.take());
          break;
        }
        case ServerMsgCode.UPDATE_STORAGE: {
          const applyResult = applyRemoteOps(message.ops);
          for (const [key, value] of applyResult.updates.storageUpdates) {
            updates.storageUpdates.set(
              key,
              mergeStorageUpdates(updates.storageUpdates.get(key), value)
            );
          }
          break;
        }
        // Receiving a RejectedOps message in the client means that the server is no
        // longer in sync with the client. Trying to synchronize the client again by
        // rolling back particular Ops may be hard/impossible. It's fine to not try and
        // accept the out-of-sync reality and throw an error.
        case ServerMsgCode.REJECT_STORAGE_OP: {
          errorWithTitle(
            "Storage mutation rejection error",
            message.reason
          );
          if (process.env.NODE_ENV !== "production") {
            throw new Error(
              `Storage mutations rejected by server: ${message.reason}`
            );
          }
          break;
        }
        case ServerMsgCode.THREAD_CREATED:
        case ServerMsgCode.THREAD_DELETED:
        case ServerMsgCode.THREAD_METADATA_UPDATED:
        case ServerMsgCode.THREAD_UPDATED:
        case ServerMsgCode.COMMENT_REACTION_ADDED:
        case ServerMsgCode.COMMENT_REACTION_REMOVED:
        case ServerMsgCode.COMMENT_CREATED:
        case ServerMsgCode.COMMENT_EDITED:
        case ServerMsgCode.COMMENT_DELETED:
        case ServerMsgCode.COMMENT_METADATA_UPDATED: {
          eventHub.comments.notify(message);
          break;
        }
        case ServerMsgCode.FEEDS_LIST: {
          const feedsListMsg = message;
          const pending = pendingFeedsRequests.get(feedsListMsg.requestId);
          if (pending) {
            pending.resolve({
              feeds: feedsListMsg.feeds,
              nextCursor: feedsListMsg.nextCursor
            });
            pendingFeedsRequests.delete(feedsListMsg.requestId);
          }
          eventHub.feeds.notify(feedsListMsg);
          break;
        }
        case ServerMsgCode.FEEDS_ADDED: {
          const feedsAddedMsg = message;
          eventHub.feeds.notify(feedsAddedMsg);
          tryResolvePendingFeedMutationsFromFeedsEvent(feedsAddedMsg);
          break;
        }
        case ServerMsgCode.FEEDS_UPDATED: {
          const feedsUpdatedMsg = message;
          eventHub.feeds.notify(feedsUpdatedMsg);
          tryResolvePendingFeedMutationsFromFeedsEvent(feedsUpdatedMsg);
          break;
        }
        case ServerMsgCode.FEED_DELETED: {
          eventHub.feeds.notify(message);
          tryResolvePendingFeedMutationsFromFeedsEvent(message);
          break;
        }
        case ServerMsgCode.FEED_MESSAGES_LIST: {
          const feedMsgsListMsg = message;
          const pending = pendingFeedMessagesRequests.get(
            feedMsgsListMsg.requestId
          );
          if (pending) {
            pending.resolve({
              messages: feedMsgsListMsg.messages,
              nextCursor: feedMsgsListMsg.nextCursor
            });
            pendingFeedMessagesRequests.delete(feedMsgsListMsg.requestId);
          }
          eventHub.feeds.notify(feedMsgsListMsg);
          break;
        }
        case ServerMsgCode.FEED_MESSAGES_ADDED: {
          const feedMsgsAddedMsg = message;
          eventHub.feeds.notify(feedMsgsAddedMsg);
          tryResolvePendingFeedMutationsFromFeedsEvent(feedMsgsAddedMsg);
          break;
        }
        case ServerMsgCode.FEED_MESSAGES_UPDATED: {
          const feedMsgsUpdatedMsg = message;
          eventHub.feeds.notify(feedMsgsUpdatedMsg);
          tryResolvePendingFeedMutationsFromFeedsEvent(feedMsgsUpdatedMsg);
          break;
        }
        case ServerMsgCode.FEED_MESSAGES_DELETED: {
          eventHub.feeds.notify(message);
          tryResolvePendingFeedMutationsFromFeedsEvent(message);
          break;
        }
        case ServerMsgCode.FEED_REQUEST_FAILED: {
          if (!isFeedRequestFailedMsg(message)) {
            break;
          }
          const { requestId, code, reason } = message;
          const err = new LiveblocksError(reason ?? "Feed request failed", {
            type: "FEED_REQUEST_ERROR",
            roomId,
            requestId,
            code,
            reason
          });
          if (pendingFeedMutations.has(requestId)) {
            settleFeedMutation(requestId, "error", err);
          } else if (pendingFeedsRequests.has(requestId)) {
            const pending = pendingFeedsRequests.get(requestId);
            pendingFeedsRequests.delete(requestId);
            pending?.reject(err);
          } else if (pendingFeedMessagesRequests.has(requestId)) {
            const pending = pendingFeedMessagesRequests.get(requestId);
            pendingFeedMessagesRequests.delete(requestId);
            pending?.reject(err);
          }
          eventHub.feeds.notify(message);
          break;
        }
        case ServerMsgCode.STORAGE_STATE_V7:
        // No longer used in V8
        default:
          break;
      }
    }
    notify(updates);
  }
  __name(handleServerMessage, "handleServerMessage");
  function flushNowOrSoon() {
    const storageOps = context.buffer.storageOperations;
    if (storageOps.length > 0) {
      for (const op of storageOps) {
        context.unacknowledgedOps.set(op.opId, op);
      }
      notifyStorageStatus();
    }
    if (managedSocket.getStatus() !== "connected") {
      context.buffer.storageOperations = [];
      return;
    }
    const now2 = Date.now();
    const elapsedMillis = now2 - context.buffer.lastFlushedAt;
    if (elapsedMillis >= config.throttleDelay) {
      const messagesToFlush = serializeBuffer();
      if (messagesToFlush.length === 0) {
        return;
      }
      sendMessages(messagesToFlush);
      context.buffer = {
        flushTimerID: void 0,
        lastFlushedAt: now2,
        messages: [],
        storageOperations: [],
        presenceUpdates: null
      };
    } else {
      clearTimeout(context.buffer.flushTimerID);
      context.buffer.flushTimerID = setTimeout(
        flushNowOrSoon,
        config.throttleDelay - elapsedMillis
      );
    }
  }
  __name(flushNowOrSoon, "flushNowOrSoon");
  function serializeBuffer() {
    const messages = [];
    if (context.buffer.presenceUpdates) {
      messages.push(
        context.buffer.presenceUpdates.type === "full" ? {
          type: ClientMsgCode.UPDATE_PRESENCE,
          // Populating the `targetActor` field turns this message into
          // a Full Presence™ update message (not a patch), which will get
          // interpreted by other clients as such.
          targetActor: -1,
          data: context.buffer.presenceUpdates.data
        } : {
          type: ClientMsgCode.UPDATE_PRESENCE,
          data: context.buffer.presenceUpdates.data
        }
      );
    }
    for (const event of context.buffer.messages) {
      messages.push(event);
    }
    if (context.buffer.storageOperations.length > 0) {
      messages.push({
        type: ClientMsgCode.UPDATE_STORAGE,
        ops: context.buffer.storageOperations
      });
    }
    return messages;
  }
  __name(serializeBuffer, "serializeBuffer");
  function updateYDoc(update, guid, isV2) {
    const clientMsg = {
      type: ClientMsgCode.UPDATE_YDOC,
      update,
      guid,
      v2: isV2
    };
    context.buffer.messages.push(clientMsg);
    eventHub.ydoc.notify(clientMsg);
    flushNowOrSoon();
  }
  __name(updateYDoc, "updateYDoc");
  function broadcastEvent(event, options22 = {
    shouldQueueEventIfNotReady: false
  }) {
    if (managedSocket.getStatus() !== "connected" && !options22.shouldQueueEventIfNotReady) {
      return;
    }
    context.buffer.messages.push({
      type: ClientMsgCode.BROADCAST_EVENT,
      event
    });
    flushNowOrSoon();
  }
  __name(broadcastEvent, "broadcastEvent");
  function dispatchOps(ops) {
    const { storageOperations } = context.buffer;
    for (const op of ops) {
      storageOperations.push(op);
    }
    flushNowOrSoon();
  }
  __name(dispatchOps, "dispatchOps");
  let _getStorage$ = null;
  let _resolveStoragePromise = null;
  const pendingFeedsRequests = /* @__PURE__ */ new Map();
  const pendingFeedMessagesRequests = /* @__PURE__ */ new Map();
  const pendingFeedMutations = /* @__PURE__ */ new Map();
  const pendingAddMessageFifoByFeed = /* @__PURE__ */ new Map();
  function settleFeedMutation(requestId, outcome, error3) {
    const pending = pendingFeedMutations.get(requestId);
    if (pending === void 0) {
      return;
    }
    clearTimeout(pending.timeoutId);
    pendingFeedMutations.delete(requestId);
    if (pending.kind === "add-message" && !pending.expectedClientMessageId) {
      const q = pendingAddMessageFifoByFeed.get(pending.feedId);
      if (q !== void 0) {
        const idx = q.indexOf(requestId);
        if (idx >= 0) {
          q.splice(idx, 1);
        }
        if (q.length === 0) {
          pendingAddMessageFifoByFeed.delete(pending.feedId);
        }
      }
    }
    if (outcome === "ok") {
      pending.resolve();
    } else {
      pending.reject(error3 ?? new Error("Feed mutation failed"));
    }
  }
  __name(settleFeedMutation, "settleFeedMutation");
  function registerFeedMutation(requestId, kind, feedId, options22) {
    const { promise, resolve, reject } = Promise_withResolvers();
    const timeoutId = setTimeout(() => {
      if (pendingFeedMutations.has(requestId)) {
        settleFeedMutation(
          requestId,
          "error",
          new Error("Feed mutation timeout")
        );
      }
    }, FEEDS_TIMEOUT);
    pendingFeedMutations.set(requestId, {
      resolve,
      reject,
      timeoutId,
      kind,
      feedId,
      messageId: options22?.messageId,
      expectedClientMessageId: options22?.expectedClientMessageId
    });
    if (kind === "add-message" && options22?.expectedClientMessageId === void 0) {
      const q = pendingAddMessageFifoByFeed.get(feedId) ?? [];
      q.push(requestId);
      pendingAddMessageFifoByFeed.set(feedId, q);
    }
    return promise;
  }
  __name(registerFeedMutation, "registerFeedMutation");
  function tryResolvePendingFeedMutationsFromFeedsEvent(message) {
    switch (message.type) {
      case ServerMsgCode.FEEDS_ADDED: {
        for (const feed of message.feeds) {
          for (const [requestId, pending] of [...pendingFeedMutations]) {
            if (pending.kind === "add-feed" && pending.feedId === feed.feedId) {
              settleFeedMutation(requestId, "ok");
              break;
            }
          }
        }
        break;
      }
      case ServerMsgCode.FEEDS_UPDATED: {
        for (const feed of message.feeds) {
          for (const [requestId, pending] of [...pendingFeedMutations]) {
            if (pending.kind === "update-feed" && pending.feedId === feed.feedId) {
              settleFeedMutation(requestId, "ok");
            }
          }
        }
        break;
      }
      case ServerMsgCode.FEED_DELETED: {
        for (const [requestId, pending] of [...pendingFeedMutations]) {
          if (pending.kind === "delete-feed" && pending.feedId === message.feedId) {
            settleFeedMutation(requestId, "ok");
            break;
          }
        }
        break;
      }
      case ServerMsgCode.FEED_MESSAGES_ADDED: {
        for (const m of message.messages) {
          let matched = false;
          for (const [requestId, pending] of [...pendingFeedMutations]) {
            if (pending.kind === "add-message" && pending.feedId === message.feedId && pending.expectedClientMessageId === m.id) {
              settleFeedMutation(requestId, "ok");
              matched = true;
              break;
            }
          }
          if (!matched) {
            const q = pendingAddMessageFifoByFeed.get(message.feedId);
            const headId = q?.[0];
            if (headId !== void 0) {
              const pending = pendingFeedMutations.get(headId);
              if (pending?.kind === "add-message" && pending.expectedClientMessageId === void 0) {
                settleFeedMutation(headId, "ok");
              }
            }
          }
        }
        break;
      }
      case ServerMsgCode.FEED_MESSAGES_UPDATED: {
        for (const m of message.messages) {
          for (const [requestId, pending] of [...pendingFeedMutations]) {
            if (pending.kind === "update-message" && pending.feedId === message.feedId && pending.messageId === m.id) {
              settleFeedMutation(requestId, "ok");
            }
          }
        }
        break;
      }
      case ServerMsgCode.FEED_MESSAGES_DELETED: {
        for (const mid of message.messageIds) {
          for (const [requestId, pending] of [...pendingFeedMutations]) {
            if (pending.kind === "delete-message" && pending.feedId === message.feedId && pending.messageId === mid) {
              settleFeedMutation(requestId, "ok");
            }
          }
        }
        break;
      }
      default:
        break;
    }
  }
  __name(tryResolvePendingFeedMutationsFromFeedsEvent, "tryResolvePendingFeedMutationsFromFeedsEvent");
  function processInitialStorage(nodes) {
    const unacknowledgedOps = new Map(context.unacknowledgedOps);
    createOrUpdateRootFromMessage(nodes);
    applyAndSendOfflineOps(unacknowledgedOps);
    _resolveStoragePromise?.();
    notifyStorageStatus();
    eventHub.storageDidLoad.notify();
  }
  __name(processInitialStorage, "processInitialStorage");
  async function streamStorage() {
    if (!managedSocket.authValue) return;
    const nodes = new Map(
      await httpClient.streamStorage({ roomId })
    );
    processInitialStorage(nodes);
  }
  __name(streamStorage, "streamStorage");
  function refreshStorage(options22) {
    const messages = context.buffer.messages;
    if (config.unstable_streamData) {
      void streamStorage();
    } else if (!messages.some((msg) => msg.type === ClientMsgCode.FETCH_STORAGE)) {
      messages.push({ type: ClientMsgCode.FETCH_STORAGE });
      nodeMapBuffer.take();
      stopwatch?.start();
    }
    if (options22.flush) {
      flushNowOrSoon();
    }
  }
  __name(refreshStorage, "refreshStorage");
  function startLoadingStorage() {
    if (_getStorage$ === null) {
      refreshStorage({ flush: true });
      _getStorage$ = new Promise((resolve) => {
        _resolveStoragePromise = resolve;
      });
      notifyStorageStatus();
    }
    return _getStorage$;
  }
  __name(startLoadingStorage, "startLoadingStorage");
  function getStorageSnapshot() {
    const root = context.root;
    if (root !== void 0) {
      return root;
    } else {
      void startLoadingStorage();
      return null;
    }
  }
  __name(getStorageSnapshot, "getStorageSnapshot");
  async function getStorage() {
    if (context.root !== void 0) {
      return Promise.resolve({
        root: context.root
      });
    }
    await startLoadingStorage();
    return {
      root: nn(context.root)
    };
  }
  __name(getStorage, "getStorage");
  function fetchYDoc(vector, guid, isV2) {
    if (!context.buffer.messages.find((m) => {
      return m.type === ClientMsgCode.FETCH_YDOC && m.vector === vector && m.guid === guid && m.v2 === isV2;
    })) {
      context.buffer.messages.push({
        type: ClientMsgCode.FETCH_YDOC,
        vector,
        guid,
        v2: isV2
      });
    }
    flushNowOrSoon();
  }
  __name(fetchYDoc, "fetchYDoc");
  async function fetchFeeds(options22) {
    const requestId = nanoid();
    const { promise, resolve, reject } = Promise_withResolvers();
    pendingFeedsRequests.set(requestId, { resolve, reject });
    const message = {
      type: ClientMsgCode.FETCH_FEEDS,
      requestId,
      cursor: options22?.cursor,
      since: options22?.since,
      limit: options22?.limit,
      metadata: options22?.metadata
    };
    context.buffer.messages.push(message);
    flushNowOrSoon();
    setTimeout(() => {
      if (pendingFeedsRequests.has(requestId)) {
        pendingFeedsRequests.delete(requestId);
        reject(new Error("Feeds fetch timeout"));
      }
    }, FEEDS_TIMEOUT);
    return promise;
  }
  __name(fetchFeeds, "fetchFeeds");
  async function fetchFeedMessages(feedId, options22) {
    const requestId = nanoid();
    const { promise, resolve, reject } = Promise_withResolvers();
    pendingFeedMessagesRequests.set(requestId, { resolve, reject });
    const message = {
      type: ClientMsgCode.FETCH_FEED_MESSAGES,
      requestId,
      feedId,
      cursor: options22?.cursor,
      since: options22?.since,
      limit: options22?.limit
    };
    context.buffer.messages.push(message);
    flushNowOrSoon();
    setTimeout(() => {
      if (pendingFeedMessagesRequests.has(requestId)) {
        pendingFeedMessagesRequests.delete(requestId);
        reject(new Error("Feed messages fetch timeout"));
      }
    }, FEEDS_TIMEOUT);
    return promise;
  }
  __name(fetchFeedMessages, "fetchFeedMessages");
  function addFeed(feedId, options22) {
    const requestId = nanoid();
    const promise = registerFeedMutation(requestId, "add-feed", feedId);
    const message = {
      type: ClientMsgCode.ADD_FEED,
      requestId,
      feedId,
      metadata: options22?.metadata,
      createdAt: options22?.createdAt
    };
    context.buffer.messages.push(message);
    flushNowOrSoon();
    return promise;
  }
  __name(addFeed, "addFeed");
  function updateFeed(feedId, metadata2) {
    const requestId = nanoid();
    const promise = registerFeedMutation(requestId, "update-feed", feedId);
    const message = {
      type: ClientMsgCode.UPDATE_FEED,
      requestId,
      feedId,
      metadata: metadata2
    };
    context.buffer.messages.push(message);
    flushNowOrSoon();
    return promise;
  }
  __name(updateFeed, "updateFeed");
  function deleteFeed(feedId) {
    const requestId = nanoid();
    const promise = registerFeedMutation(requestId, "delete-feed", feedId);
    const message = {
      type: ClientMsgCode.DELETE_FEED,
      requestId,
      feedId
    };
    context.buffer.messages.push(message);
    flushNowOrSoon();
    return promise;
  }
  __name(deleteFeed, "deleteFeed");
  function addFeedMessage(feedId, data, options22) {
    const requestId = nanoid();
    const promise = registerFeedMutation(requestId, "add-message", feedId, {
      expectedClientMessageId: options22?.id
    });
    const message = {
      type: ClientMsgCode.ADD_FEED_MESSAGE,
      requestId,
      feedId,
      data,
      id: options22?.id,
      createdAt: options22?.createdAt
    };
    context.buffer.messages.push(message);
    flushNowOrSoon();
    return promise;
  }
  __name(addFeedMessage, "addFeedMessage");
  function updateFeedMessage(feedId, messageId, data, options22) {
    const requestId = nanoid();
    const promise = registerFeedMutation(requestId, "update-message", feedId, {
      messageId
    });
    const message = {
      type: ClientMsgCode.UPDATE_FEED_MESSAGE,
      requestId,
      feedId,
      messageId,
      data,
      updatedAt: options22?.updatedAt
    };
    context.buffer.messages.push(message);
    flushNowOrSoon();
    return promise;
  }
  __name(updateFeedMessage, "updateFeedMessage");
  function deleteFeedMessage(feedId, messageId) {
    const requestId = nanoid();
    const promise = registerFeedMutation(requestId, "delete-message", feedId, {
      messageId
    });
    const message = {
      type: ClientMsgCode.DELETE_FEED_MESSAGE,
      requestId,
      feedId,
      messageId
    };
    context.buffer.messages.push(message);
    flushNowOrSoon();
    return promise;
  }
  __name(deleteFeedMessage, "deleteFeedMessage");
  function undo() {
    if (context.activeBatch) {
      throw new Error("undo is not allowed during a batch");
    }
    const frames = context.undoStack.pop();
    if (frames === void 0) {
      return;
    }
    context.pausedHistory = null;
    const result = applyLocalOps(frames);
    notify(result.updates);
    context.redoStack.push(result.reverse);
    onHistoryChange();
    for (const op of result.opsToEmit) {
      context.buffer.storageOperations.push(op);
    }
    flushNowOrSoon();
  }
  __name(undo, "undo");
  function redo() {
    if (context.activeBatch) {
      throw new Error("redo is not allowed during a batch");
    }
    const frames = context.redoStack.pop();
    if (frames === void 0) {
      return;
    }
    context.pausedHistory = null;
    const result = applyLocalOps(frames);
    notify(result.updates);
    context.undoStack.push(result.reverse);
    onHistoryChange();
    for (const op of result.opsToEmit) {
      context.buffer.storageOperations.push(op);
    }
    flushNowOrSoon();
  }
  __name(redo, "redo");
  function clear() {
    context.undoStack.length = 0;
    context.redoStack.length = 0;
  }
  __name(clear, "clear");
  function batch2(callback) {
    if (context.activeBatch) {
      return callback();
    }
    let returnValue = void 0;
    context.activeBatch = {
      ops: [],
      updates: {
        storageUpdates: /* @__PURE__ */ new Map(),
        presence: false,
        others: []
      },
      reverseOps: new Deque(),
      scheduleHistoryResume: false
    };
    try {
      returnValue = callback();
    } finally {
      const currentBatch = context.activeBatch;
      context.activeBatch = null;
      if (currentBatch.reverseOps.length > 0) {
        addToUndoStack(Array.from(currentBatch.reverseOps));
      }
      if (currentBatch.scheduleHistoryResume) {
        commitPausedHistoryToUndoStack();
      }
      if (currentBatch.ops.length > 0) {
        context.redoStack.length = 0;
      }
      if (currentBatch.ops.length > 0) {
        dispatchOps(currentBatch.ops);
      }
      notify(currentBatch.updates);
      flushNowOrSoon();
    }
    return returnValue;
  }
  __name(batch2, "batch2");
  function pauseHistory() {
    if (context.pausedHistory === null) {
      context.pausedHistory = new Deque();
    }
  }
  __name(pauseHistory, "pauseHistory");
  function commitPausedHistoryToUndoStack() {
    const frames = context.pausedHistory;
    context.pausedHistory = null;
    if (frames !== null && frames.length > 0) {
      _addToRealUndoStack(Array.from(frames));
    }
  }
  __name(commitPausedHistoryToUndoStack, "commitPausedHistoryToUndoStack");
  function resumeHistory() {
    if (context.activeBatch !== null) {
      context.activeBatch.scheduleHistoryResume = true;
      return;
    }
    commitPausedHistoryToUndoStack();
  }
  __name(resumeHistory, "resumeHistory");
  let historyDisabled = 0;
  function disableHistory(fn) {
    const origUndo = context.undoStack;
    const origRedo = context.redoStack;
    const tempUndo = [];
    const tempRedo = [];
    context.undoStack = tempUndo;
    context.redoStack = tempRedo;
    historyDisabled++;
    try {
      return fn();
    } finally {
      historyDisabled--;
      if (context.undoStack !== tempUndo || context.redoStack !== tempRedo) {
        throw new Error("unexpected stack swap during history.disable()");
      }
      context.undoStack = origUndo;
      context.redoStack = origRedo;
    }
  }
  __name(disableHistory, "disableHistory");
  const syncSourceForStorage = config.createSyncSource();
  function getStorageStatus() {
    if (context.root === void 0) {
      return _getStorage$ === null ? "not-loaded" : "loading";
    } else {
      return context.unacknowledgedOps.size === 0 ? "synchronized" : "synchronizing";
    }
  }
  __name(getStorageStatus, "getStorageStatus");
  let _lastStorageStatus = getStorageStatus();
  function notifyStorageStatus() {
    const storageStatus = getStorageStatus();
    if (_lastStorageStatus !== storageStatus) {
      _lastStorageStatus = storageStatus;
      eventHub.storageStatus.notify(storageStatus);
    }
    syncSourceForStorage.setSyncStatus(
      storageStatus === "synchronizing" ? "synchronizing" : "synchronized"
    );
  }
  __name(notifyStorageStatus, "notifyStorageStatus");
  function isPresenceReady() {
    return self.get() !== null;
  }
  __name(isPresenceReady, "isPresenceReady");
  async function waitUntilPresenceReady() {
    while (!isPresenceReady()) {
      const { promise, resolve } = Promise_withResolvers();
      const unsub1 = events.self.subscribeOnce(resolve);
      const unsub2 = events.status.subscribeOnce(resolve);
      await promise;
      unsub1();
      unsub2();
    }
  }
  __name(waitUntilPresenceReady, "waitUntilPresenceReady");
  function isStorageReady() {
    return getStorageSnapshot() !== null;
  }
  __name(isStorageReady, "isStorageReady");
  async function waitUntilStorageReady() {
    while (!isStorageReady()) {
      await getStorage();
    }
  }
  __name(waitUntilStorageReady, "waitUntilStorageReady");
  const others_forDevTools = DerivedSignal.from(
    context.others.signal,
    (others) => others.map((other2, index) => userToTreeNode(`Other ${index}`, other2))
  );
  const events = {
    status: eventHub.status.observable,
    lostConnection: eventHub.lostConnection.observable,
    customEvent: eventHub.customEvent.observable,
    others: eventHub.others.observable,
    self: eventHub.self.observable,
    myPresence: eventHub.myPresence.observable,
    storageBatch: eventHub.storageBatch.observable,
    history: eventHub.history.observable,
    storageDidLoad: eventHub.storageDidLoad.observable,
    storageStatus: eventHub.storageStatus.observable,
    ydoc: eventHub.ydoc.observable,
    comments: eventHub.comments.observable,
    feeds: eventHub.feeds.observable,
    roomWillDestroy: eventHub.roomWillDestroy.observable
  };
  async function getThreadsSince(options22) {
    return httpClient.getThreadsSince({
      roomId,
      since: options22.since,
      signal: options22.signal
    });
  }
  __name(getThreadsSince, "getThreadsSince");
  async function getThreads(options22) {
    return httpClient.getThreads({
      roomId,
      query: options22?.query,
      cursor: options22?.cursor
    });
  }
  __name(getThreads, "getThreads");
  async function getThread(threadId) {
    return httpClient.getThread({ roomId, threadId });
  }
  __name(getThread, "getThread");
  async function createThread(options22) {
    return httpClient.createThread({
      roomId,
      threadId: options22.threadId,
      commentId: options22.commentId,
      metadata: options22.metadata,
      body: options22.body,
      commentMetadata: options22.commentMetadata,
      attachmentIds: options22.attachmentIds
    });
  }
  __name(createThread, "createThread");
  async function deleteThread(threadId) {
    return httpClient.deleteThread({ roomId, threadId });
  }
  __name(deleteThread, "deleteThread");
  async function editThreadMetadata({
    metadata: metadata2,
    threadId
  }) {
    return httpClient.editThreadMetadata({ roomId, threadId, metadata: metadata2 });
  }
  __name(editThreadMetadata, "editThreadMetadata");
  async function editCommentMetadata({
    threadId,
    commentId,
    metadata: metadata2
  }) {
    return httpClient.editCommentMetadata({
      roomId,
      threadId,
      commentId,
      metadata: metadata2
    });
  }
  __name(editCommentMetadata, "editCommentMetadata");
  async function markThreadAsResolved(threadId) {
    return httpClient.markThreadAsResolved({ roomId, threadId });
  }
  __name(markThreadAsResolved, "markThreadAsResolved");
  async function markThreadAsUnresolved(threadId) {
    return httpClient.markThreadAsUnresolved({
      roomId,
      threadId
    });
  }
  __name(markThreadAsUnresolved, "markThreadAsUnresolved");
  async function subscribeToThread(threadId) {
    return httpClient.subscribeToThread({ roomId, threadId });
  }
  __name(subscribeToThread, "subscribeToThread");
  async function unsubscribeFromThread(threadId) {
    return httpClient.unsubscribeFromThread({ roomId, threadId });
  }
  __name(unsubscribeFromThread, "unsubscribeFromThread");
  async function createComment(options22) {
    return httpClient.createComment({
      roomId,
      threadId: options22.threadId,
      commentId: options22.commentId,
      body: options22.body,
      metadata: options22.metadata,
      attachmentIds: options22.attachmentIds
    });
  }
  __name(createComment, "createComment");
  async function editComment(options22) {
    return httpClient.editComment({
      roomId,
      threadId: options22.threadId,
      commentId: options22.commentId,
      body: options22.body,
      metadata: options22.metadata,
      attachmentIds: options22.attachmentIds
    });
  }
  __name(editComment, "editComment");
  async function deleteComment({
    threadId,
    commentId
  }) {
    return httpClient.deleteComment({ roomId, threadId, commentId });
  }
  __name(deleteComment, "deleteComment");
  async function addReaction({
    threadId,
    commentId,
    emoji
  }) {
    return httpClient.addReaction({ roomId, threadId, commentId, emoji });
  }
  __name(addReaction, "addReaction");
  async function removeReaction({
    threadId,
    commentId,
    emoji
  }) {
    return await httpClient.removeReaction({
      roomId,
      threadId,
      commentId,
      emoji
    });
  }
  __name(removeReaction, "removeReaction");
  function prepareAttachment(file) {
    return {
      type: "localAttachment",
      status: "idle",
      id: createCommentAttachmentId(),
      name: file.name,
      size: file.size,
      mimeType: file.type,
      file
    };
  }
  __name(prepareAttachment, "prepareAttachment");
  async function uploadAttachment(attachment, options22 = {}) {
    return httpClient.uploadAttachment({
      roomId,
      attachment,
      signal: options22.signal
    });
  }
  __name(uploadAttachment, "uploadAttachment");
  function getAttachmentUrl(attachmentId) {
    return httpClient.getAttachmentUrl({ roomId, attachmentId });
  }
  __name(getAttachmentUrl, "getAttachmentUrl");
  function getSubscriptionSettings(options22) {
    return httpClient.getSubscriptionSettings({
      roomId,
      signal: options22?.signal
    });
  }
  __name(getSubscriptionSettings, "getSubscriptionSettings");
  function updateSubscriptionSettings(settings) {
    return httpClient.updateSubscriptionSettings({ roomId, settings });
  }
  __name(updateSubscriptionSettings, "updateSubscriptionSettings");
  async function markInboxNotificationAsRead(inboxNotificationId) {
    await httpClient.markRoomInboxNotificationAsRead({
      roomId,
      inboxNotificationId
    });
  }
  __name(markInboxNotificationAsRead, "markInboxNotificationAsRead");
  const syncSourceForYjs = config.createSyncSource();
  function yjsStatusDidChange(status) {
    return syncSourceForYjs.setSyncStatus(
      status === "synchronizing" || status === "loading" ? "synchronizing" : "synchronized"
    );
  }
  __name(yjsStatusDidChange, "yjsStatusDidChange");
  return Object.defineProperty(
    {
      [kInternal]: {
        get presenceBuffer() {
          return deepClone(context.buffer.presenceUpdates?.data ?? null);
        },
        // prettier-ignore
        get undoStack() {
          return deepClone(context.undoStack);
        },
        // prettier-ignore
        get nodeCount() {
          return context.pool.nodes.size;
        },
        // prettier-ignore
        getYjsProvider() {
          return context.yjsProvider;
        },
        setYjsProvider(newProvider) {
          context.yjsProvider?.off("status", yjsStatusDidChange);
          context.yjsProvider = newProvider;
          newProvider?.on("status", yjsStatusDidChange);
          context.yjsProviderDidChange.notify();
        },
        yjsProviderDidChange: context.yjsProviderDidChange.observable,
        // send metadata when using a text editor
        reportTextEditor,
        // create a text mention when using a text editor
        createTextMention,
        // delete a text mention when using a text editor
        deleteTextMention,
        // list versions of the document
        listTextVersions,
        // List versions of the document since the specified date
        listTextVersionsSince,
        // get a specific version
        getTextVersion,
        // create a version
        createTextVersion,
        // execute a contextual prompt
        executeContextualPrompt,
        // Support for the Liveblocks browser extension
        getSelf_forDevTools: /* @__PURE__ */ __name(() => selfAsTreeNode.get(), "getSelf_forDevTools"),
        getOthers_forDevTools: /* @__PURE__ */ __name(() => others_forDevTools.get(), "getOthers_forDevTools"),
        // prettier-ignore
        simulate: {
          // These exist only for our E2E testing app and unit tests
          explicitClose: /* @__PURE__ */ __name((event) => managedSocket._privateSendMachineEvent({ type: "EXPLICIT_SOCKET_CLOSE", event }), "explicitClose"),
          rawSend: /* @__PURE__ */ __name((data) => managedSocket.send(data), "rawSend"),
          incomingMessage: /* @__PURE__ */ __name((data) => handleServerMessage(new MessageEvent("message", { data })), "incomingMessage")
        },
        attachmentUrlsStore: httpClient.getOrCreateAttachmentUrlsStore(roomId)
      },
      id: roomId,
      subscribe: makeClassicSubscribeFn(
        roomId,
        eventHub,
        config.errorEventSource
      ),
      connect: /* @__PURE__ */ __name(() => managedSocket.connect(), "connect"),
      reconnect: /* @__PURE__ */ __name(() => managedSocket.reconnect(), "reconnect"),
      disconnect: /* @__PURE__ */ __name(() => managedSocket.disconnect(), "disconnect"),
      destroy: /* @__PURE__ */ __name(() => {
        pendingFeedsRequests.forEach(
          (request) => request.reject(new Error("Room destroyed"))
        );
        pendingFeedMessagesRequests.forEach(
          (request) => request.reject(new Error("Room destroyed"))
        );
        const { roomWillDestroy, ...eventsExceptDestroy } = eventHub;
        for (const source of Object.values(eventsExceptDestroy)) {
          source.dispose();
        }
        eventHub.roomWillDestroy.notify();
        context.yjsProvider?.off("status", yjsStatusDidChange);
        syncSourceForStorage.destroy();
        syncSourceForYjs.destroy();
        uninstallBgTabSpy();
        managedSocket.destroy();
        roomWillDestroy.dispose();
      }, "destroy"),
      // Presence
      updatePresence,
      updateYDoc,
      broadcastEvent,
      // Storage
      batch: batch2,
      history: {
        undo,
        redo,
        canUndo,
        canRedo,
        clear,
        pause: pauseHistory,
        resume: resumeHistory,
        disable: disableHistory
      },
      fetchYDoc,
      fetchFeeds,
      fetchFeedMessages,
      addFeed,
      updateFeed,
      deleteFeed,
      addFeedMessage,
      updateFeedMessage,
      deleteFeedMessage,
      getStorage,
      getStorageSnapshot,
      getStorageStatus,
      isPresenceReady,
      isStorageReady,
      waitUntilPresenceReady: memoizeOnSuccess(waitUntilPresenceReady),
      waitUntilStorageReady: memoizeOnSuccess(waitUntilStorageReady),
      events,
      // Core
      getStatus: /* @__PURE__ */ __name(() => managedSocket.getStatus(), "getStatus"),
      getSelf: /* @__PURE__ */ __name(() => self.get(), "getSelf"),
      // Presence
      getPresence: /* @__PURE__ */ __name(() => context.myPresence.get(), "getPresence"),
      getOthers: /* @__PURE__ */ __name(() => context.others.get(), "getOthers"),
      // Comments
      getThreads,
      getThreadsSince,
      getThread,
      createThread,
      deleteThread,
      editThreadMetadata,
      markThreadAsResolved,
      markThreadAsUnresolved,
      subscribeToThread,
      unsubscribeFromThread,
      createComment,
      editComment,
      editCommentMetadata,
      deleteComment,
      addReaction,
      removeReaction,
      prepareAttachment,
      uploadAttachment,
      getAttachmentUrl,
      // Notifications
      getNotificationSettings: getSubscriptionSettings,
      getSubscriptionSettings,
      updateNotificationSettings: updateSubscriptionSettings,
      updateSubscriptionSettings,
      markInboxNotificationAsRead
    },
    // Explictly make the internal field non-enumerable, to avoid aggressive
    // freezing when used with Immer
    kInternal,
    { enumerable: false }
  );
}
__name(createRoom, "createRoom");
function makeClassicSubscribeFn(roomId, events, errorEvents) {
  function subscribeToLiveStructureDeeply(node, callback) {
    return events.storageBatch.subscribe((updates) => {
      const relatedUpdates = updates.filter(
        (update) => isSameNodeOrChildOf(update.node, node)
      );
      if (relatedUpdates.length > 0) {
        callback(relatedUpdates);
      }
    });
  }
  __name(subscribeToLiveStructureDeeply, "subscribeToLiveStructureDeeply");
  function subscribeToLiveStructureShallowly(node, callback) {
    return events.storageBatch.subscribe((updates) => {
      for (const update of updates) {
        if (update.node._id === node._id) {
          callback(update.node);
        }
      }
    });
  }
  __name(subscribeToLiveStructureShallowly, "subscribeToLiveStructureShallowly");
  function subscribe(first, second, options2) {
    if (typeof first === "string" && isRoomEventName(first)) {
      if (typeof second !== "function") {
        throw new Error("Second argument must be a callback function");
      }
      const callback = second;
      switch (first) {
        case "event":
          return events.customEvent.subscribe(
            callback
          );
        case "my-presence":
          return events.myPresence.subscribe(callback);
        case "others": {
          const cb = callback;
          return events.others.subscribe((event) => {
            const { others, ...internalEvent } = event;
            return cb(others, internalEvent);
          });
        }
        case "error": {
          return errorEvents.subscribe((err) => {
            if (err.roomId === roomId) {
              return callback(err);
            }
          });
        }
        case "status":
          return events.status.subscribe(callback);
        case "lost-connection":
          return events.lostConnection.subscribe(
            callback
          );
        case "history":
          return events.history.subscribe(callback);
        case "storage-status":
          return events.storageStatus.subscribe(
            callback
          );
        case "comments":
          return events.comments.subscribe(
            callback
          );
        // istanbul ignore next
        default:
          return assertNever(
            first,
            `"${String(first)}" is not a valid event name`
          );
      }
    }
    if (second === void 0 || typeof first === "function") {
      if (typeof first === "function") {
        const storageCallback = first;
        return events.storageBatch.subscribe(storageCallback);
      } else {
        throw new Error("Please specify a listener callback");
      }
    }
    if (isLiveNode(first)) {
      const node = first;
      if (options2?.isDeep) {
        const storageCallback = second;
        return subscribeToLiveStructureDeeply(node, storageCallback);
      } else {
        const nodeCallback = second;
        return subscribeToLiveStructureShallowly(node, nodeCallback);
      }
    }
    throw new Error(
      `${String(first)} is not a value that can be subscribed to.`
    );
  }
  __name(subscribe, "subscribe");
  return subscribe;
}
__name(makeClassicSubscribeFn, "makeClassicSubscribeFn");
function isRoomEventName(value) {
  return value === "my-presence" || value === "others" || value === "event" || value === "error" || value === "history" || value === "status" || value === "storage-status" || value === "lost-connection" || value === "connection" || value === "comments";
}
__name(isRoomEventName, "isRoomEventName");
function makeAuthDelegateForRoom(roomId, authManager) {
  return async () => {
    return authManager.getAuthValue({ requestedScope: "room:read", roomId });
  };
}
__name(makeAuthDelegateForRoom, "makeAuthDelegateForRoom");
function makeCreateSocketDelegateForRoom(roomId, baseUrl, WebSocketPolyfill) {
  return (authValue) => {
    const ws = WebSocketPolyfill ?? (typeof WebSocket === "undefined" ? void 0 : WebSocket);
    if (ws === void 0) {
      throw new StopRetrying(
        "To use Liveblocks client in a non-DOM environment, you need to provide a WebSocket polyfill."
      );
    }
    const url2 = new URL(baseUrl);
    url2.protocol = url2.protocol === "http:" ? "ws" : "wss";
    url2.pathname = "/v8";
    url2.searchParams.set("roomId", roomId);
    if (authValue.type === "secret") {
      url2.searchParams.set("tok", authValue.token.raw);
    } else if (authValue.type === "public") {
      url2.searchParams.set("pubkey", authValue.publicApiKey);
    } else {
      return assertNever(authValue, "Unhandled case");
    }
    url2.searchParams.set("version", PKG_VERSION || "dev");
    return new ws(url2.toString());
  };
}
__name(makeCreateSocketDelegateForRoom, "makeCreateSocketDelegateForRoom");
var MIN_THROTTLE = 16;
var MAX_THROTTLE = 1e3;
var DEFAULT_THROTTLE = 100;
var MIN_BACKGROUND_KEEP_ALIVE_TIMEOUT = 15e3;
var MIN_LOST_CONNECTION_TIMEOUT = 200;
var RECOMMENDED_MIN_LOST_CONNECTION_TIMEOUT = 1e3;
var MAX_LOST_CONNECTION_TIMEOUT = 3e4;
var DEFAULT_LOST_CONNECTION_TIMEOUT = 5e3;
var RESOLVE_USERS_BATCH_DELAY = 50;
var RESOLVE_ROOMS_INFO_BATCH_DELAY = 50;
var RESOLVE_GROUPS_INFO_BATCH_DELAY = 50;
function getBaseUrl(baseUrl) {
  if (typeof baseUrl === "string" && baseUrl.startsWith("http")) {
    return baseUrl;
  } else {
    return DEFAULT_BASE_URL;
  }
}
__name(getBaseUrl, "getBaseUrl");
function isLocalhost(url2) {
  try {
    return new URL(url2).hostname === "localhost";
  } catch {
    return false;
  }
}
__name(isLocalhost, "isLocalhost");
function createClient(options2) {
  const clientOptions = options2;
  const baseUrl = getBaseUrl(clientOptions.baseUrl);
  const throttleDelay = process.env.NODE_ENV !== "production" && isLocalhost(baseUrl) && clientOptions.__DANGEROUSLY_disableThrottling ? 0 : getThrottle(clientOptions.throttle ?? DEFAULT_THROTTLE);
  const lostConnectionTimeout = getLostConnectionTimeout(
    clientOptions.lostConnectionTimeout ?? DEFAULT_LOST_CONNECTION_TIMEOUT
  );
  const backgroundKeepAliveTimeout = getBackgroundKeepAliveTimeout(
    clientOptions.backgroundKeepAliveTimeout
  );
  const currentUserId = new Signal(void 0);
  const authManager = createAuthManager(options2, (token) => {
    currentUserId.set(() => token.uid);
  });
  const fetchPolyfill2 = clientOptions.polyfills?.fetch || /* istanbul ignore next */
  globalThis.fetch?.bind(globalThis);
  const httpClient = createApiClient({
    baseUrl,
    fetchPolyfill: fetchPolyfill2,
    currentUserId,
    authManager
  });
  const roomsById = /* @__PURE__ */ new Map();
  const ai = createAi({
    userId: currentUserId.get(),
    lostConnectionTimeout,
    backgroundKeepAliveTimeout: getBackgroundKeepAliveTimeout(
      clientOptions.backgroundKeepAliveTimeout
    ),
    polyfills: clientOptions.polyfills,
    delegates: {
      createSocket: makeCreateSocketDelegateForAi(
        baseUrl,
        clientOptions.polyfills?.WebSocket
      ),
      authenticate: /* @__PURE__ */ __name(async () => {
        const resp = await authManager.getAuthValue({
          requestedScope: "room:read"
        });
        if (resp.type === "public") {
          throw new StopRetrying(
            "Cannot use AI Copilots with a public API key"
          );
        }
        return resp;
      }, "authenticate"),
      canZombie: /* @__PURE__ */ __name(() => false, "canZombie")
    }
  });
  function teardownRoom(room) {
    unlinkDevTools(room.id);
    roomsById.delete(room.id);
    room.destroy();
  }
  __name(teardownRoom, "teardownRoom");
  function leaseRoom(details) {
    const leave = /* @__PURE__ */ __name(() => {
      const self = leave;
      if (!details.unsubs.delete(self)) {
        warn(
          "This leave function was already called. Calling it more than once has no effect."
        );
      } else {
        if (details.unsubs.size === 0) {
          teardownRoom(details.room);
        }
      }
    }, "leave");
    details.unsubs.add(leave);
    return {
      room: details.room,
      leave
    };
  }
  __name(leaseRoom, "leaseRoom");
  function enterRoom(roomId, ...args) {
    const existing = roomsById.get(roomId);
    if (existing !== void 0) {
      return leaseRoom(existing);
    }
    const options22 = args[0] ?? {};
    const initialPresence = (typeof options22.initialPresence === "function" ? options22.initialPresence(roomId) : options22.initialPresence) ?? {};
    const rawStorage = (typeof options22.initialStorage === "function" ? options22.initialStorage(roomId) : options22.initialStorage) ?? {};
    let initialStorage;
    if (isLiveObject(rawStorage)) {
      const obj = {};
      for (const key of rawStorage.keys()) {
        obj[key] = rawStorage.get(key);
      }
      initialStorage = obj;
    } else {
      initialStorage = rawStorage;
    }
    const newRoom = createRoom(
      { initialPresence, initialStorage },
      {
        roomId,
        throttleDelay,
        lostConnectionTimeout,
        backgroundKeepAliveTimeout,
        polyfills: clientOptions.polyfills,
        delegates: clientOptions.mockedDelegates ?? {
          createSocket: makeCreateSocketDelegateForRoom(
            roomId,
            baseUrl,
            clientOptions.polyfills?.WebSocket
          ),
          authenticate: makeAuthDelegateForRoom(roomId, authManager)
        },
        enableDebugLogging: clientOptions.enableDebugLogging,
        baseUrl,
        errorEventSource: liveblocksErrorSource,
        unstable_streamData: !!clientOptions.unstable_streamData,
        roomHttpClient: httpClient,
        createSyncSource,
        badgeLocation: clientOptions.badgeLocation ?? "bottom-right"
      }
    );
    const newRoomDetails = {
      room: newRoom,
      unsubs: /* @__PURE__ */ new Set()
    };
    roomsById.set(roomId, newRoomDetails);
    setupDevTools(() => Array.from(roomsById.keys()));
    linkDevTools(roomId, newRoom);
    const shouldConnect = options22.autoConnect ?? true;
    if (shouldConnect) {
      if (typeof atob === "undefined") {
        if (clientOptions.polyfills?.atob === void 0) {
          throw new Error(
            "You need to polyfill atob to use the client in your environment. Please follow the instructions at https://liveblocks.io/docs/errors/liveblocks-client/atob-polyfill"
          );
        }
        global.atob = clientOptions.polyfills.atob;
      }
      newRoom.connect();
    }
    return leaseRoom(newRoomDetails);
  }
  __name(enterRoom, "enterRoom");
  function getRoom(roomId) {
    const room = roomsById.get(roomId)?.room;
    return room ? room : null;
  }
  __name(getRoom, "getRoom");
  function logout() {
    authManager.reset();
    currentUserId.set(() => void 0);
    for (const { room } of roomsById.values()) {
      if (!isIdle(room.getStatus())) {
        room.reconnect();
      }
    }
  }
  __name(logout, "logout");
  const resolveUsers = clientOptions.resolveUsers;
  const batchedResolveUsers = new Batch(
    async (batchedUserIds) => {
      const userIds = batchedUserIds.flat();
      const users = await resolveUsers?.({ userIds });
      warnOnceIf(
        !resolveUsers,
        "Set the resolveUsers option in createClient to specify user info."
      );
      return users ?? userIds.map(() => void 0);
    },
    { delay: RESOLVE_USERS_BATCH_DELAY }
  );
  const usersStore = createBatchStore(batchedResolveUsers);
  function invalidateResolvedUsers(userIds) {
    usersStore.invalidate(userIds);
  }
  __name(invalidateResolvedUsers, "invalidateResolvedUsers");
  const resolveRoomsInfo = clientOptions.resolveRoomsInfo;
  const batchedResolveRoomsInfo = new Batch(
    async (batchedRoomIds) => {
      const roomIds = batchedRoomIds.flat();
      const roomsInfo = await resolveRoomsInfo?.({ roomIds });
      warnOnceIf(
        !resolveRoomsInfo,
        "Set the resolveRoomsInfo option in createClient to specify room info."
      );
      return roomsInfo ?? roomIds.map(() => void 0);
    },
    { delay: RESOLVE_ROOMS_INFO_BATCH_DELAY }
  );
  const roomsInfoStore = createBatchStore(batchedResolveRoomsInfo);
  function invalidateResolvedRoomsInfo(roomIds) {
    roomsInfoStore.invalidate(roomIds);
  }
  __name(invalidateResolvedRoomsInfo, "invalidateResolvedRoomsInfo");
  const resolveGroupsInfo = clientOptions.resolveGroupsInfo;
  const batchedResolveGroupsInfo = new Batch(
    async (batchedGroupIds) => {
      const groupIds = batchedGroupIds.flat();
      const groupsInfo = await resolveGroupsInfo?.({ groupIds });
      warnOnceIf(
        !resolveGroupsInfo,
        "Set the resolveGroupsInfo option in createClient to specify group info."
      );
      return groupsInfo ?? groupIds.map(() => void 0);
    },
    { delay: RESOLVE_GROUPS_INFO_BATCH_DELAY }
  );
  const groupsInfoStore = createBatchStore(batchedResolveGroupsInfo);
  function invalidateResolvedGroupsInfo(groupIds) {
    groupsInfoStore.invalidate(groupIds);
  }
  __name(invalidateResolvedGroupsInfo, "invalidateResolvedGroupsInfo");
  const mentionSuggestionsCache = /* @__PURE__ */ new Map();
  function invalidateResolvedMentionSuggestions() {
    mentionSuggestionsCache.clear();
  }
  __name(invalidateResolvedMentionSuggestions, "invalidateResolvedMentionSuggestions");
  const syncStatusSources = [];
  const syncStatusSignal = new Signal("synchronized");
  const liveblocksErrorSource = makeEventSource();
  function getSyncStatus() {
    const status = syncStatusSignal.get();
    return status === "synchronizing" ? status : "synchronized";
  }
  __name(getSyncStatus, "getSyncStatus");
  function recompute() {
    syncStatusSignal.set(
      syncStatusSources.some((src) => src.get() === "synchronizing") ? "synchronizing" : syncStatusSources.some((src) => src.get() === "has-local-changes") ? "has-local-changes" : "synchronized"
    );
  }
  __name(recompute, "recompute");
  function createSyncSource() {
    const source = new Signal("synchronized");
    syncStatusSources.push(source);
    const unsub = source.subscribe(() => recompute());
    function setSyncStatus(status) {
      source.set(status);
    }
    __name(setSyncStatus, "setSyncStatus");
    function destroy() {
      unsub();
      const index = syncStatusSources.findIndex((item) => item === source);
      if (index > -1) {
        const [ref] = syncStatusSources.splice(index, 1);
        const wasStillPending = ref.get() !== "synchronized";
        if (wasStillPending) {
          recompute();
        }
      }
    }
    __name(destroy, "destroy");
    return { setSyncStatus, destroy };
  }
  __name(createSyncSource, "createSyncSource");
  {
    const maybePreventClose = /* @__PURE__ */ __name((e) => {
      if (clientOptions.preventUnsavedChanges && syncStatusSignal.get() !== "synchronized") {
        e.preventDefault();
      }
    }, "maybePreventClose");
    const win = typeof window !== "undefined" ? window : void 0;
    win?.addEventListener("beforeunload", maybePreventClose);
  }
  async function getNotificationSettings(options22) {
    const plainSettings = await httpClient.getNotificationSettings(options22);
    const settings = createNotificationSettings(plainSettings);
    return settings;
  }
  __name(getNotificationSettings, "getNotificationSettings");
  async function updateNotificationSettings(settings) {
    const plainSettings = await httpClient.updateNotificationSettings(settings);
    const settingsObject = createNotificationSettings(plainSettings);
    return settingsObject;
  }
  __name(updateNotificationSettings, "updateNotificationSettings");
  const client = Object.defineProperty(
    {
      enterRoom,
      getRoom,
      logout,
      // Public inbox notifications API
      getInboxNotifications: httpClient.getInboxNotifications,
      getInboxNotificationsSince: httpClient.getInboxNotificationsSince,
      getUnreadInboxNotificationsCount: httpClient.getUnreadInboxNotificationsCount,
      markAllInboxNotificationsAsRead: httpClient.markAllInboxNotificationsAsRead,
      markInboxNotificationAsRead: httpClient.markInboxNotificationAsRead,
      deleteAllInboxNotifications: httpClient.deleteAllInboxNotifications,
      deleteInboxNotification: httpClient.deleteInboxNotification,
      // Public notification settings API
      getNotificationSettings,
      updateNotificationSettings,
      // Advanced resolvers APIs
      resolvers: {
        invalidateUsers: invalidateResolvedUsers,
        invalidateRoomsInfo: invalidateResolvedRoomsInfo,
        invalidateGroupsInfo: invalidateResolvedGroupsInfo,
        invalidateMentionSuggestions: invalidateResolvedMentionSuggestions
      },
      getSyncStatus,
      events: {
        error: liveblocksErrorSource,
        syncStatus: syncStatusSignal
      },
      // Internal
      [kInternal]: {
        currentUserId,
        mentionSuggestionsCache,
        ai,
        resolveMentionSuggestions: clientOptions.resolveMentionSuggestions,
        usersStore,
        roomsInfoStore,
        groupsInfoStore,
        getRoomIds() {
          return Array.from(roomsById.keys());
        },
        httpClient,
        // Type-level helper only, it's effectively only an identity-function at runtime
        as: /* @__PURE__ */ __name(() => client, "as"),
        createSyncSource,
        emitError: /* @__PURE__ */ __name((context, cause) => {
          const error3 = LiveblocksError.from(context, cause);
          const didNotify = liveblocksErrorSource.notify(error3);
          if (!didNotify) {
            error2(error3.message);
          }
        }, "emitError")
      }
    },
    kInternal,
    {
      enumerable: false
    }
  );
  return client;
}
__name(createClient, "createClient");
function checkBounds(option, value, min, max, recommendedMin) {
  if (typeof value !== "number" || value < min || max !== void 0 && value > max) {
    throw new Error(
      max !== void 0 ? `${option} should be between ${recommendedMin ?? min} and ${max}.` : `${option} should be at least ${recommendedMin ?? min}.`
    );
  }
  return value;
}
__name(checkBounds, "checkBounds");
function getBackgroundKeepAliveTimeout(value) {
  if (value === void 0) return void 0;
  return checkBounds(
    "backgroundKeepAliveTimeout",
    value,
    MIN_BACKGROUND_KEEP_ALIVE_TIMEOUT
  );
}
__name(getBackgroundKeepAliveTimeout, "getBackgroundKeepAliveTimeout");
function getThrottle(value) {
  return checkBounds("throttle", value, MIN_THROTTLE, MAX_THROTTLE);
}
__name(getThrottle, "getThrottle");
function getLostConnectionTimeout(value) {
  return checkBounds(
    "lostConnectionTimeout",
    value,
    MIN_LOST_CONNECTION_TIMEOUT,
    MAX_LOST_CONNECTION_TIMEOUT,
    RECOMMENDED_MIN_LOST_CONNECTION_TIMEOUT
  );
}
__name(getLostConnectionTimeout, "getLostConnectionTimeout");
var htmlEscapables = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var htmlEscapablesRegex = new RegExp(
  Object.keys(htmlEscapables).map((entity) => `\\${entity}`).join("|"),
  "g"
);
var markdownEscapables = {
  _: "\\_",
  "*": "\\*",
  "#": "\\#",
  "`": "\\`",
  "~": "\\~",
  "!": "\\!",
  "|": "\\|",
  "(": "\\(",
  ")": "\\)",
  "{": "\\{",
  "}": "\\}",
  "[": "\\[",
  "]": "\\]"
};
var markdownEscapablesRegex = new RegExp(
  Object.keys(markdownEscapables).map((entity) => `\\${entity}`).join("|"),
  "g"
);
function makeAbortController(externalSignal) {
  const ctl = new AbortController();
  return {
    signal: externalSignal ? AbortSignal.any([ctl.signal, externalSignal]) : ctl.signal,
    abort: ctl.abort.bind(ctl)
  };
}
__name(makeAbortController, "makeAbortController");
detectDupes(PKG_NAME, PKG_VERSION, PKG_FORMAT);

// node_modules/marked/lib/marked.esm.js
init_esm();
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
__name(_getDefaults, "_getDefaults");
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
__name(changeDefaults, "changeDefaults");
var noopTest = { exec: /* @__PURE__ */ __name(() => null, "exec") };
function edit(regex, opt = "") {
  let source = typeof regex === "string" ? regex : regex.source;
  const obj = {
    replace: /* @__PURE__ */ __name((name, val) => {
      let valSource = typeof val === "string" ? val : val.source;
      valSource = valSource.replace(other.caret, "$1");
      source = source.replace(name, valSource);
      return obj;
    }, "replace"),
    getRegex: /* @__PURE__ */ __name(() => {
      return new RegExp(source, opt);
    }, "getRegex")
  };
  return obj;
}
__name(edit, "edit");
var other = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: /* @__PURE__ */ __name((bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`), "listItemRegex"),
  nextBulletRegex: /* @__PURE__ */ __name((indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), "nextBulletRegex"),
  hrRegex: /* @__PURE__ */ __name((indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), "hrRegex"),
  fencesBeginRegex: /* @__PURE__ */ __name((indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`), "fencesBeginRegex"),
  headingBeginRegex: /* @__PURE__ */ __name((indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`), "headingBeginRegex"),
  htmlBeginRegex: /* @__PURE__ */ __name((indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i"), "htmlBeginRegex")
};
var newline = /^(?:[ \t]*(?:\n|$))+/;
var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var lheading = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html = edit(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
var blockNormal = {
  blockquote,
  code: blockCode,
  def,
  fences,
  heading,
  hr,
  html,
  lheading,
  list,
  newline,
  paragraph,
  table: noopTest,
  text: blockText
};
var gfmTable = edit(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockGfm = {
  ...blockNormal,
  lheading: lheadingGfm,
  table: gfmTable,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
};
var blockPedantic = {
  ...blockNormal,
  html: edit(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = /[\p{P}\p{S}]/u;
var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
var emStrongRDelimUnd = edit(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
var inlineNormal = {
  _backpedal: noopTest,
  // only used for GFM url
  anyPunctuation,
  autolink,
  blockSkip,
  br,
  code: inlineCode,
  del: noopTest,
  emStrongLDelim,
  emStrongRDelimAst,
  emStrongRDelimUnd,
  escape,
  link,
  nolink,
  punctuation,
  reflink,
  reflinkSearch,
  tag,
  text: inlineText,
  url: noopTest
};
var inlinePedantic = {
  ...inlineNormal,
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
};
var inlineGfm = {
  ...inlineNormal,
  emStrongRDelimAst: emStrongRDelimAstGfm,
  emStrongLDelim: emStrongLDelimGfm,
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
var inlineBreaks = {
  ...inlineGfm,
  br: edit(br).replace("{2,}", "*").getRegex(),
  text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var block = {
  normal: blockNormal,
  gfm: blockGfm,
  pedantic: blockPedantic
};
var inline = {
  normal: inlineNormal,
  gfm: inlineGfm,
  breaks: inlineBreaks,
  pedantic: inlinePedantic
};
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = /* @__PURE__ */ __name((ch) => escapeReplacements[ch], "getEscapeReplacement");
function escape2(html2, encode2) {
  if (encode2) {
    if (other.escapeTest.test(html2)) {
      return html2.replace(other.escapeReplace, getEscapeReplacement);
    }
  } else {
    if (other.escapeTestNoEncode.test(html2)) {
      return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
__name(escape2, "escape2");
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(other.percentDecode, "%");
  } catch {
    return null;
  }
  return href;
}
__name(cleanUrl, "cleanUrl");
function splitCells(tableRow, count) {
  const row = tableRow.replace(other.findPipe, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(other.splitPipe);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells.at(-1)?.trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(other.slashPipe, "|");
  }
  return cells;
}
__name(splitCells, "splitCells");
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
__name(rtrim, "rtrim");
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  if (level > 0) {
    return -2;
  }
  return -1;
}
__name(findClosingBracket, "findClosingBracket");
function outputLink(cap, link2, raw, lexer2, rules) {
  const href = link2.href;
  const title = link2.title || null;
  const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
  lexer2.state.inLink = true;
  const token = {
    type: cap[0].charAt(0) === "!" ? "image" : "link",
    raw,
    href,
    title,
    text,
    tokens: lexer2.inlineTokens(text)
  };
  lexer2.state.inLink = false;
  return token;
}
__name(outputLink, "outputLink");
function indentCodeCompensation(raw, text, rules) {
  const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(rules.other.beginningSpace);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
__name(indentCodeCompensation, "indentCodeCompensation");
var _Tokenizer = class {
  static {
    __name(this, "_Tokenizer");
  }
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (this.rules.other.endingHash.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: rtrim(cap[0], "\n")
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      let lines = rtrim(cap[0], "\n").split("\n");
      let raw = "";
      let text = "";
      const tokens = [];
      while (lines.length > 0) {
        let inBlockquote = false;
        const currentLines = [];
        let i;
        for (i = 0; i < lines.length; i++) {
          if (this.rules.other.blockquoteStart.test(lines[i])) {
            currentLines.push(lines[i]);
            inBlockquote = true;
          } else if (!inBlockquote) {
            currentLines.push(lines[i]);
          } else {
            break;
          }
        }
        lines = lines.slice(i);
        const currentRaw = currentLines.join("\n");
        const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
        raw = raw ? `${raw}
${currentRaw}` : currentRaw;
        text = text ? `${text}
${currentText}` : currentText;
        const top = this.lexer.state.top;
        this.lexer.state.top = true;
        this.lexer.blockTokens(currentText, tokens, true);
        this.lexer.state.top = top;
        if (lines.length === 0) {
          break;
        }
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "code") {
          break;
        } else if (lastToken?.type === "blockquote") {
          const oldToken = lastToken;
          const newText = oldToken.raw + "\n" + lines.join("\n");
          const newToken = this.blockquote(newText);
          tokens[tokens.length - 1] = newToken;
          raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
          text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
          break;
        } else if (lastToken?.type === "list") {
          const oldToken = lastToken;
          const newText = oldToken.raw + "\n" + lines.join("\n");
          const newToken = this.list(newText);
          tokens[tokens.length - 1] = newToken;
          raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
          text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
          lines = newText.substring(tokens.at(-1).raw.length).split("\n");
          continue;
        }
      }
      return {
        type: "blockquote",
        raw,
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list2 = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = this.rules.other.listItemRegex(bull);
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        let raw = "";
        let itemContents = "";
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t) => " ".repeat(3 * t.length));
        let nextLine = src.split("\n", 1)[0];
        let blankLine = !line.trim();
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else if (blankLine) {
          indent = cap[1].length + 1;
        } else {
          indent = cap[2].search(this.rules.other.nonSpaceChar);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        if (blankLine && this.rules.other.blankLine.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
          const hrRegex = this.rules.other.hrRegex(indent);
          const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
          const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
          const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            let nextLineWithoutTabs;
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
              nextLineWithoutTabs = nextLine;
            } else {
              nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (htmlBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(nextLine)) {
              break;
            }
            if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLineWithoutTabs.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLineWithoutTabs.slice(indent);
          }
        }
        if (!list2.loose) {
          if (endsWithBlankLine) {
            list2.loose = true;
          } else if (this.rules.other.doubleBlankLine.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = this.rules.other.listIsTask.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
          }
        }
        list2.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list2.raw += raw;
      }
      const lastItem = list2.items.at(-1);
      if (lastItem) {
        lastItem.raw = lastItem.raw.trimEnd();
        lastItem.text = lastItem.text.trimEnd();
      } else {
        return;
      }
      list2.raw = list2.raw.trimEnd();
      for (let i = 0; i < list2.items.length; i++) {
        this.lexer.state.top = false;
        list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
        if (!list2.loose) {
          const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => this.rules.other.anyLine.test(t.raw));
          list2.loose = hasMultipleLineBreaks;
        }
      }
      if (list2.loose) {
        for (let i = 0; i < list2.items.length; i++) {
          list2.items[i].loose = true;
        }
      }
      return list2;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
      const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
      return {
        type: "def",
        tag: tag2,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (!cap) {
      return;
    }
    if (!this.rules.other.tableDelimiter.test(cap[2])) {
      return;
    }
    const headers = splitCells(cap[1]);
    const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
    const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
    const item = {
      type: "table",
      raw: cap[0],
      header: [],
      align: [],
      rows: []
    };
    if (headers.length !== aligns.length) {
      return;
    }
    for (const align of aligns) {
      if (this.rules.other.tableAlignRight.test(align)) {
        item.align.push("right");
      } else if (this.rules.other.tableAlignCenter.test(align)) {
        item.align.push("center");
      } else if (this.rules.other.tableAlignLeft.test(align)) {
        item.align.push("left");
      } else {
        item.align.push(null);
      }
    }
    for (let i = 0; i < headers.length; i++) {
      item.header.push({
        text: headers[i],
        tokens: this.lexer.inline(headers[i]),
        header: true,
        align: item.align[i]
      });
    }
    for (const row of rows) {
      item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
        return {
          text: cell,
          tokens: this.lexer.inline(cell),
          header: false,
          align: item.align[i]
        };
      }));
    }
    return item;
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: cap[1]
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
        if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex === -2) {
          return;
        }
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link2 = this.rules.other.pedanticHrefTitle.exec(href);
        if (link2) {
          href = link2[1];
          title = link2[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (this.rules.other.startAngleBracket.test(href)) {
        if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
        title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
      }, cap[0], this.lexer, this.rules);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
      const link2 = links[linkString.toLowerCase()];
      if (!link2) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link2, cap[0], this.lexer, this.rules);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrongLDelim.exec(src);
    if (!match) return;
    if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim) continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0) continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
      const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
      const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = cap[1];
        href = "mailto:" + text;
      } else {
        text = cap[1];
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = cap[0];
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
        } while (prevCapZero !== cap[0]);
        text = cap[0];
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      const escaped = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        escaped
      };
    }
  }
};
var _Lexer = class __Lexer {
  static {
    __name(this, "__Lexer");
  }
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      other,
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(other.carriageReturn, "\n");
    this.blockTokens(src, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const next = this.inlineQueue[i];
      this.inlineTokens(next.src, next.tokens);
    }
    this.inlineQueue = [];
    return this.tokens;
  }
  blockTokens(src, tokens = [], lastParagraphClipped = false) {
    if (this.options.pedantic) {
      src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
    }
    while (src) {
      let token;
      if (this.options.extensions?.block?.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (token.raw.length === 1 && lastToken !== void 0) {
          lastToken.raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue.at(-1).src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      let cutSrc = src;
      if (this.options.extensions?.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        const lastToken = tokens.at(-1);
        if (lastParagraphClipped && lastToken?.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let maskedSrc = src;
    let match = null;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    let keepPrevChar = false;
    let prevChar = "";
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      let token;
      if (this.options.extensions?.inline?.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (token.type === "text" && lastToken?.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      let cutSrc = src;
      if (this.options.extensions?.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var _Renderer = class {
  static {
    __name(this, "_Renderer");
  }
  options;
  parser;
  // set by the parser
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(token) {
    return "";
  }
  code({ text, lang, escaped }) {
    const langString = (lang || "").match(other.notSpaceStart)?.[0];
    const code = text.replace(other.endingNewline, "") + "\n";
    if (!langString) {
      return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape2(langString) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
  }
  blockquote({ tokens }) {
    const body = this.parser.parse(tokens);
    return `<blockquote>
${body}</blockquote>
`;
  }
  html({ text }) {
    return text;
  }
  heading({ tokens, depth }) {
    return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
  }
  hr(token) {
    return "<hr>\n";
  }
  list(token) {
    const ordered = token.ordered;
    const start = token.start;
    let body = "";
    for (let j = 0; j < token.items.length; j++) {
      const item = token.items[j];
      body += this.listitem(item);
    }
    const type = ordered ? "ol" : "ul";
    const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
  }
  listitem(item) {
    let itemBody = "";
    if (item.task) {
      const checkbox = this.checkbox({ checked: !!item.checked });
      if (item.loose) {
        if (item.tokens[0]?.type === "paragraph") {
          item.tokens[0].text = checkbox + " " + item.tokens[0].text;
          if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
            item.tokens[0].tokens[0].text = checkbox + " " + escape2(item.tokens[0].tokens[0].text);
            item.tokens[0].tokens[0].escaped = true;
          }
        } else {
          item.tokens.unshift({
            type: "text",
            raw: checkbox + " ",
            text: checkbox + " ",
            escaped: true
          });
        }
      } else {
        itemBody += checkbox + " ";
      }
    }
    itemBody += this.parser.parse(item.tokens, !!item.loose);
    return `<li>${itemBody}</li>
`;
  }
  checkbox({ checked }) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens }) {
    return `<p>${this.parser.parseInline(tokens)}</p>
`;
  }
  table(token) {
    let header = "";
    let cell = "";
    for (let j = 0; j < token.header.length; j++) {
      cell += this.tablecell(token.header[j]);
    }
    header += this.tablerow({ text: cell });
    let body = "";
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j];
      cell = "";
      for (let k = 0; k < row.length; k++) {
        cell += this.tablecell(row[k]);
      }
      body += this.tablerow({ text: cell });
    }
    if (body) body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow({ text }) {
    return `<tr>
${text}</tr>
`;
  }
  tablecell(token) {
    const content = this.parser.parseInline(token.tokens);
    const type = token.header ? "th" : "td";
    const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
    return tag2 + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens }) {
    return `<strong>${this.parser.parseInline(tokens)}</strong>`;
  }
  em({ tokens }) {
    return `<em>${this.parser.parseInline(tokens)}</em>`;
  }
  codespan({ text }) {
    return `<code>${escape2(text, true)}</code>`;
  }
  br(token) {
    return "<br>";
  }
  del({ tokens }) {
    return `<del>${this.parser.parseInline(tokens)}</del>`;
  }
  link({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + escape2(title) + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image({ href, title, text, tokens }) {
    if (tokens) {
      text = this.parser.parseInline(tokens, this.parser.textRenderer);
    }
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return escape2(text);
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${escape2(title)}"`;
    }
    out += ">";
    return out;
  }
  text(token) {
    return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape2(token.text);
  }
};
var _TextRenderer = class {
  static {
    __name(this, "_TextRenderer");
  }
  // no need for block level renderers
  strong({ text }) {
    return text;
  }
  em({ text }) {
    return text;
  }
  codespan({ text }) {
    return text;
  }
  del({ text }) {
    return text;
  }
  html({ text }) {
    return text;
  }
  text({ text }) {
    return text;
  }
  link({ text }) {
    return "" + text;
  }
  image({ text }) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var _Parser = class __Parser {
  static {
    __name(this, "__Parser");
  }
  options;
  renderer;
  textRenderer;
  constructor(options2) {
    this.options = options2 || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.renderer.parser = this;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];
      if (this.options.extensions?.renderers?.[anyToken.type]) {
        const genericToken = anyToken;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      const token = anyToken;
      switch (token.type) {
        case "space": {
          out += this.renderer.space(token);
          continue;
        }
        case "hr": {
          out += this.renderer.hr(token);
          continue;
        }
        case "heading": {
          out += this.renderer.heading(token);
          continue;
        }
        case "code": {
          out += this.renderer.code(token);
          continue;
        }
        case "table": {
          out += this.renderer.table(token);
          continue;
        }
        case "blockquote": {
          out += this.renderer.blockquote(token);
          continue;
        }
        case "list": {
          out += this.renderer.list(token);
          continue;
        }
        case "html": {
          out += this.renderer.html(token);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(token);
          continue;
        }
        case "text": {
          let textToken = token;
          let body = this.renderer.text(textToken);
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + this.renderer.text(textToken);
          }
          if (top) {
            out += this.renderer.paragraph({
              type: "paragraph",
              raw: body,
              text: body,
              tokens: [{ type: "text", raw: body, text: body, escaped: true }]
            });
          } else {
            out += body;
          }
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer = this.renderer) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];
      if (this.options.extensions?.renderers?.[anyToken.type]) {
        const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
          out += ret || "";
          continue;
        }
      }
      const token = anyToken;
      switch (token.type) {
        case "escape": {
          out += renderer.text(token);
          break;
        }
        case "html": {
          out += renderer.html(token);
          break;
        }
        case "link": {
          out += renderer.link(token);
          break;
        }
        case "image": {
          out += renderer.image(token);
          break;
        }
        case "strong": {
          out += renderer.strong(token);
          break;
        }
        case "em": {
          out += renderer.em(token);
          break;
        }
        case "codespan": {
          out += renderer.codespan(token);
          break;
        }
        case "br": {
          out += renderer.br(token);
          break;
        }
        case "del": {
          out += renderer.del(token);
          break;
        }
        case "text": {
          out += renderer.text(token);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var _Hooks = class {
  static {
    __name(this, "_Hooks");
  }
  options;
  block;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html2) {
    return html2;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? _Lexer.lex : _Lexer.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? _Parser.parse : _Parser.parseInline;
  }
};
var Marked = class {
  static {
    __name(this, "Marked");
  }
  defaults = _getDefaults();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = _Parser;
  Renderer = _Renderer;
  TextRenderer = _TextRenderer;
  Lexer = _Lexer;
  Tokenizer = _Tokenizer;
  Hooks = _Hooks;
  constructor(...args) {
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              const tokens2 = genericToken[childTokens].flat(Infinity);
              values = values.concat(this.walkTokens(tokens2, callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = { ...pack };
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          if (!(prop in renderer)) {
            throw new Error(`renderer '${prop}' does not exist`);
          }
          if (["options", "parser"].includes(prop)) {
            continue;
          }
          const rendererProp = prop;
          const rendererFunc = pack.renderer[rendererProp];
          const prevRenderer = renderer[rendererProp];
          renderer[rendererProp] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          if (!(prop in tokenizer)) {
            throw new Error(`tokenizer '${prop}' does not exist`);
          }
          if (["options", "rules", "lexer"].includes(prop)) {
            continue;
          }
          const tokenizerProp = prop;
          const tokenizerFunc = pack.tokenizer[tokenizerProp];
          const prevTokenizer = tokenizer[tokenizerProp];
          tokenizer[tokenizerProp] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          if (!(prop in hooks)) {
            throw new Error(`hook '${prop}' does not exist`);
          }
          if (["options", "block"].includes(prop)) {
            continue;
          }
          const hooksProp = prop;
          const hooksFunc = pack.hooks[hooksProp];
          const prevHook = hooks[hooksProp];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksProp] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksProp] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens2 = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens2) {
            values = values.concat(walkTokens2.call(this, token));
          }
          return values;
        };
      }
      this.defaults = { ...this.defaults, ...opts };
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = { ...this.defaults, ...opt };
    return this;
  }
  lexer(src, options2) {
    return _Lexer.lex(src, options2 ?? this.defaults);
  }
  parser(tokens, options2) {
    return _Parser.parse(tokens, options2 ?? this.defaults);
  }
  parseMarkdown(blockType) {
    const parse2 = /* @__PURE__ */ __name((src, options2) => {
      const origOpt = { ...options2 };
      const opt = { ...this.defaults, ...origOpt };
      const throwError = this.onError(!!opt.silent, !!opt.async);
      if (this.defaults.async === true && origOpt.async === false) {
        return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      }
      if (typeof src === "undefined" || src === null) {
        return throwError(new Error("marked(): input parameter is undefined or null"));
      }
      if (typeof src !== "string") {
        return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
      }
      if (opt.hooks) {
        opt.hooks.options = opt;
        opt.hooks.block = blockType;
      }
      const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
      const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
      if (opt.async) {
        return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
      }
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        let tokens = lexer2(src, opt);
        if (opt.hooks) {
          tokens = opt.hooks.processAllTokens(tokens);
        }
        if (opt.walkTokens) {
          this.walkTokens(tokens, opt.walkTokens);
        }
        let html2 = parser2(tokens, opt);
        if (opt.hooks) {
          html2 = opt.hooks.postprocess(html2);
        }
        return html2;
      } catch (e) {
        return throwError(e);
      }
    }, "parse2");
    return parse2;
  }
  onError(silent, async) {
    return (e) => {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (silent) {
        const msg = "<p>An error occurred:</p><pre>" + escape2(e.message + "", true) + "</pre>";
        if (async) {
          return Promise.resolve(msg);
        }
        return msg;
      }
      if (async) {
        return Promise.reject(e);
      }
      throw e;
    };
  }
};
var markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
__name(marked, "marked");
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = _Parser.parse;
var lexer = _Lexer.lex;

// node_modules/@liveblocks/node/dist/index.js
var base64 = __toESM(require_base64(), 1);
var sha256 = __toESM(require_sha256(), 1);
var PKG_NAME2 = "@liveblocks/node";
var PKG_VERSION2 = "3.19.0";
var PKG_FORMAT2 = "esm";
async function asyncConsume(iterable) {
  const result = [];
  for await (const item of iterable) {
    result.push(item);
  }
  return result;
}
__name(asyncConsume, "asyncConsume");
async function runConcurrently(iterable, fn, concurrency) {
  const queue = /* @__PURE__ */ new Set();
  for await (const item of iterable) {
    if (queue.size >= concurrency) {
      await Promise.race(queue);
    }
    const promise = (async () => {
      try {
        await fn(item);
      } finally {
        queue.delete(promise);
      }
    })();
    queue.add(promise);
  }
  if (queue.size > 0) {
    await Promise.all(queue);
  }
}
__name(runConcurrently, "runConcurrently");
var LineStream = class extends TransformStream {
  static {
    __name(this, "LineStream");
  }
  constructor() {
    let buffer = "";
    super({
      transform(chunk2, controller) {
        buffer += chunk2;
        if (buffer.includes("\n")) {
          const lines = buffer.split("\n");
          for (let i = 0; i < lines.length - 1; i++) {
            if (lines[i].length > 0) {
              controller.enqueue(lines[i]);
            }
          }
          buffer = lines[lines.length - 1];
        }
      },
      flush(controller) {
        if (buffer.length > 0) {
          controller.enqueue(buffer);
        }
      }
    });
  }
};
var NdJsonStream = class extends TransformStream {
  static {
    __name(this, "NdJsonStream");
  }
  constructor() {
    super({
      transform(line, controller) {
        const json = JSON.parse(line);
        controller.enqueue(json);
      }
    });
  }
};
function xwarn(resp, method, path) {
  const message = resp.headers.get("X-LB-Warn");
  if (message) {
    const msg = `  ⚠ [Liveblocks] ${message} (${method} ${path})`;
    if (resp.ok) {
      console.warn(msg);
    } else {
      console.error(msg);
    }
  }
}
__name(xwarn, "xwarn");
var DEFAULT_BASE_URL2 = "https://api.liveblocks.io";
var VALID_KEY_CHARS_REGEX = /^[\w-]+$/;
function getBaseUrl2(baseUrl) {
  if (typeof baseUrl === "string" && baseUrl.startsWith("http")) {
    return baseUrl;
  } else {
    return DEFAULT_BASE_URL2;
  }
}
__name(getBaseUrl2, "getBaseUrl");
async function fetchPolyfill() {
  return typeof globalThis.fetch !== "undefined" ? globalThis.fetch : (await import("../../lib-M7YRGYJZ.mjs")).default;
}
__name(fetchPolyfill, "fetchPolyfill");
function isString(value) {
  return typeof value === "string";
}
__name(isString, "isString");
function startsWith(value, prefix) {
  return isString(value) && value.startsWith(prefix);
}
__name(startsWith, "startsWith");
function isNonEmpty(value) {
  return isString(value) && value.length > 0;
}
__name(isNonEmpty, "isNonEmpty");
function assertNonEmpty(value, field) {
  if (!isNonEmpty(value)) {
    throw new Error(
      `Invalid value for field '${field}'. Please provide a non-empty string. For more information: https://liveblocks.io/docs/api-reference/liveblocks-node#authorize`
    );
  }
}
__name(assertNonEmpty, "assertNonEmpty");
function assertSecretKey(value, field) {
  if (!startsWith(value, "sk_")) {
    throw new Error(
      `Invalid value for field '${field}'. Secret keys must start with 'sk_'. Please provide the secret key from your Liveblocks dashboard at https://liveblocks.io/dashboard/apikeys.`
    );
  }
  if (!VALID_KEY_CHARS_REGEX.test(value)) {
    throw new Error(
      `Invalid chars found in field '${field}'. Please check that you correctly copied the secret key from your Liveblocks dashboard at https://liveblocks.io/dashboard/apikeys.`
    );
  }
}
__name(assertSecretKey, "assertSecretKey");
function normalizeStatusCode(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return 200;
  } else if (statusCode >= 500) {
    return 503;
  } else {
    return statusCode;
  }
}
__name(normalizeStatusCode, "normalizeStatusCode");
var ALL_PERMISSIONS = Object.freeze([
  "room:write",
  "room:read",
  "room:presence:write",
  "comments:write",
  "comments:read",
  "feeds:write"
]);
function isPermission(value) {
  return ALL_PERMISSIONS.includes(value);
}
__name(isPermission, "isPermission");
var MAX_PERMS_PER_SET = 10;
var READ_ACCESS = Object.freeze([
  "room:read",
  "room:presence:write",
  // TODO: Remove once backend no longer requires this
  "comments:read"
  // TODO: Remove — implied by room:read
]);
var FULL_ACCESS = Object.freeze(["room:write"]);
var roomPatternRegex = /^([*]|[^*]{1,128}[*]?)$/;
var Session = class {
  static {
    __name(this, "Session");
  }
  FULL_ACCESS = FULL_ACCESS;
  READ_ACCESS = READ_ACCESS;
  #postFn;
  #userId;
  #userInfo;
  #organizationId;
  /** Only used as a hint to produce better error messages. */
  #localDev;
  #sealed = false;
  #permissions = /* @__PURE__ */ new Map();
  /** @internal */
  constructor(postFn, userId, userInfo, organizationId, localDev) {
    assertNonEmpty(userId, "userId");
    this.#postFn = postFn;
    this.#userId = userId;
    this.#userInfo = userInfo;
    this.#organizationId = organizationId;
    this.#localDev = localDev ?? false;
  }
  #getOrCreate(roomId) {
    if (this.#sealed) {
      throw new Error("You can no longer change these permissions.");
    }
    let perms = this.#permissions.get(roomId);
    if (perms) {
      return perms;
    } else {
      if (this.#permissions.size >= MAX_PERMS_PER_SET) {
        throw new Error(
          "You cannot add permissions for more than 10 rooms in a single token"
        );
      }
      perms = /* @__PURE__ */ new Set();
      this.#permissions.set(roomId, perms);
      return perms;
    }
  }
  allow(roomIdOrPattern, newPerms) {
    if (typeof roomIdOrPattern !== "string") {
      throw new Error("Room name or pattern must be a string");
    }
    if (!roomPatternRegex.test(roomIdOrPattern)) {
      throw new Error("Invalid room name or pattern");
    }
    if (newPerms.length === 0) {
      throw new Error("Permission list cannot be empty");
    }
    const existingPerms = this.#getOrCreate(roomIdOrPattern);
    for (const perm of newPerms) {
      if (!isPermission(perm)) {
        throw new Error(`Not a valid permission: ${perm}`);
      }
      existingPerms.add(perm);
    }
    return this;
  }
  /** @internal - For unit tests only */
  hasPermissions() {
    return this.#permissions.size > 0;
  }
  /** @internal - For unit tests only */
  seal() {
    if (this.#sealed) {
      throw new Error(
        "You cannot reuse Session instances. Please create a new session every time."
      );
    }
    this.#sealed = true;
  }
  /** @internal - For unit tests only */
  serializePermissions() {
    return Object.fromEntries(
      Array.from(this.#permissions.entries()).map(([pat, perms]) => [
        pat,
        Array.from(perms)
      ])
    );
  }
  /**
   * Call this to authorize the session to access Liveblocks. Note that this
   * will return a Liveblocks "access token". Anyone that obtains such access
   * token will have access to the allowed resources.
   */
  async authorize() {
    this.seal();
    if (!this.hasPermissions()) {
      console.warn(
        "Access tokens without any permission will not be supported soon, you should use wildcards when the client requests a token for resources outside a room. See https://liveblocks.io/docs/errors/liveblocks-client/access-tokens-not-enough-permissions"
      );
    }
    try {
      const body = {
        // Required
        userId: this.#userId,
        permissions: this.serializePermissions(),
        // Optional metadata
        userInfo: this.#userInfo
      };
      if (this.#organizationId !== void 0) {
        body.organizationId = this.#organizationId;
      }
      const resp = await this.#postFn(url`/v2/authorize-user`, body);
      return {
        status: normalizeStatusCode(resp.status),
        body: await resp.text()
      };
    } catch (er) {
      return {
        status: 503,
        body: this.#localDev ? "Could not connect to your Liveblocks dev server. Is it running?" : 'Call to /v2/authorize-user failed. See "error" for more information.',
        error: er
      };
    }
  }
};
function inflateRoomData(room) {
  const createdAt = new Date(room.createdAt);
  const lastConnectionAt = room.lastConnectionAt ? new Date(room.lastConnectionAt) : void 0;
  return {
    ...room,
    createdAt,
    lastConnectionAt
  };
}
__name(inflateRoomData, "inflateRoomData");
function inflateAiCopilot(copilot) {
  return {
    ...copilot,
    createdAt: new Date(copilot.createdAt),
    updatedAt: new Date(copilot.updatedAt),
    lastUsedAt: copilot.lastUsedAt ? new Date(copilot.lastUsedAt) : void 0
  };
}
__name(inflateAiCopilot, "inflateAiCopilot");
function inflateKnowledgeSource(source) {
  return {
    ...source,
    createdAt: new Date(source.createdAt),
    updatedAt: new Date(source.updatedAt),
    lastIndexedAt: new Date(source.lastIndexedAt)
  };
}
__name(inflateKnowledgeSource, "inflateKnowledgeSource");
function inflateWebKnowledgeSourceLink(link2) {
  return {
    ...link2,
    createdAt: new Date(link2.createdAt),
    lastIndexedAt: new Date(link2.lastIndexedAt)
  };
}
__name(inflateWebKnowledgeSourceLink, "inflateWebKnowledgeSourceLink");
var Liveblocks = class {
  static {
    __name(this, "Liveblocks");
  }
  #secret;
  #baseUrl;
  /** Only used as a hint to produce better error messages. */
  #localDev;
  /**
   * Interact with the Liveblocks API from your Node.js backend.
   */
  constructor(options2) {
    const options_ = options2;
    const secret = options_.secret;
    assertSecretKey(secret, "secret");
    this.#secret = secret;
    this.#baseUrl = new URL(getBaseUrl2(options2.baseUrl));
    this.#localDev = !!options2.baseUrl && /^https?:\/\/localhost[:/]/.test(options2.baseUrl);
  }
  async #post(path, json, options2) {
    const url3 = urljoin(this.#baseUrl, path);
    const headers = {
      Authorization: `Bearer ${this.#secret}`,
      "Content-Type": "application/json"
    };
    const fetch = await fetchPolyfill();
    const res = await fetch(url3, {
      method: "POST",
      headers,
      body: JSON.stringify(json),
      signal: options2?.signal
    });
    xwarn(res, "POST", path);
    return res;
  }
  async #patch(path, json, options2) {
    const url3 = urljoin(this.#baseUrl, path);
    const headers = {
      Authorization: `Bearer ${this.#secret}`,
      "Content-Type": "application/json"
    };
    const fetch = await fetchPolyfill();
    const res = await fetch(url3, {
      method: "PATCH",
      headers,
      body: JSON.stringify(json),
      signal: options2?.signal
    });
    xwarn(res, "PATCH", path);
    return res;
  }
  async #putBinary(path, body, params, options2) {
    const url3 = urljoin(this.#baseUrl, path, params);
    const headers = {
      Authorization: `Bearer ${this.#secret}`,
      "Content-Type": "application/octet-stream"
    };
    const fetch = await fetchPolyfill();
    const res = await fetch(url3, {
      method: "PUT",
      headers,
      body,
      signal: options2?.signal
    });
    xwarn(res, "PUT", path);
    return res;
  }
  async #delete(path, params, options2) {
    const url3 = urljoin(this.#baseUrl, path, params);
    const headers = {
      Authorization: `Bearer ${this.#secret}`
    };
    const fetch = await fetchPolyfill();
    const res = await fetch(url3, {
      method: "DELETE",
      headers,
      signal: options2?.signal
    });
    xwarn(res, "DELETE", path);
    return res;
  }
  async #get(path, params, options2) {
    const url3 = urljoin(this.#baseUrl, path, params);
    const headers = {
      Authorization: `Bearer ${this.#secret}`
    };
    const fetch = await fetchPolyfill();
    const res = await fetch(url3, {
      method: "GET",
      headers,
      signal: options2?.signal
    });
    xwarn(res, "GET", path);
    return res;
  }
  /* -------------------------------------------------------------------------------------------------
   * Authentication
   * -----------------------------------------------------------------------------------------------*/
  /**
   * Prepares a new session to authorize a user to access Liveblocks.
   *
   * IMPORTANT:
   * Always make sure that you trust the user making the request to your
   * backend before calling .prepareSession()!
   *
   * @param userId Tell Liveblocks the user ID of the user to authorize. Must
   * uniquely identify the user account in your system. The uniqueness of this
   * value will determine how many MAUs will be counted/billed.
   *
   * @param options.organizationId (optional) The organization ID to authorize the user for.
   *
   * @param options.userInfo Custom metadata to attach to this user. Data you
   * add here will be visible to all other clients in the room, through the
   * `other.info` property.
   *
   */
  prepareSession(userId, ...rest) {
    const options2 = rest[0];
    return new Session(
      this.#post.bind(this),
      userId,
      options2?.userInfo,
      options2?.organizationId ?? options2?.tenantId,
      this.#localDev
    );
  }
  /**
   * Call this to authenticate the user as an actor you want to allow to use
   * Liveblocks.
   *
   * You should use this method only if you want to manage your permissions
   * through the Liveblocks Permissions API. This method is more complicated to
   * set up, but allows for finer-grained specification of permissions.
   *
   * Calling `.identifyUser()` only lets you securely identify a user (and what
   * groups they belong to). What permissions this user will end up having is
   * determined by whatever permissions you assign the user/group in your
   * Liveblocks account, through the Permissions API:
   * https://liveblocks.io/docs/rooms/permissions
   *
   * IMPORTANT:
   * Always verify that you trust the user making the request before calling
   * .identifyUser()!
   *
   * @param identity Tell Liveblocks the user ID of the user to authenticate.
   * Must uniquely identify the user account in your system. The uniqueness of
   * this value will determine how many MAUs will be counted/billed.
   *
   * If you also want to assign which groups this user belongs to, use the
   * object form and specify the `groupIds` property. Those `groupIds` should
   * match the groupIds you assigned permissions to via the Liveblocks
   * Permissions API, see
   * https://liveblocks.io/docs/rooms/permissions#permissions-levels-groups-accesses-example
   *
   * @param options.userInfo Custom metadata to attach to this user. Data you
   * add here will be visible to all other clients in the room, through the
   * `other.info` property.
   */
  // These fields define the security identity of the user. Whatever you pass in here will define which
  async identifyUser(identity, ...rest) {
    const options2 = rest[0];
    const path = url`/v2/identify-user`;
    const { userId, groupIds, tenantId, organizationId } = typeof identity === "string" ? {
      userId: identity,
      groupIds: void 0,
      tenantId: void 0,
      organizationId: void 0
    } : identity;
    assertNonEmpty(userId, "userId");
    const body = {
      userId,
      groupIds,
      userInfo: options2?.userInfo
    };
    if (organizationId !== void 0) {
      body.organizationId = organizationId;
    } else if (tenantId !== void 0) {
      body.organizationId = tenantId;
    }
    try {
      const resp = await this.#post(path, body);
      return {
        status: normalizeStatusCode(resp.status),
        body: await resp.text()
      };
    } catch (er) {
      return {
        status: 503,
        body: this.#localDev ? "Could not connect to your Liveblocks dev server. Is it running?" : `Call to ${urljoin(
          this.#baseUrl,
          path
        )} failed. See "error" for more information.`,
        error: er
      };
    }
  }
  /* -------------------------------------------------------------------------------------------------
   * Room
   * -----------------------------------------------------------------------------------------------*/
  /**
   * Returns a list of your rooms. The rooms are returned sorted by creation date, from newest to oldest. You can filter rooms by metadata, users accesses and groups accesses.
   * @param params.limit (optional) A limit on the number of rooms to be returned. The limit can range between 1 and 100, and defaults to 20.
   * @param params.startingAfter (optional) A cursor used for pagination. You get the value from the response of the previous page.
   * @param params.userId (optional) A filter on users accesses.
   * @param params.metadata (optional) A filter on metadata. Multiple metadata keys can be used to filter rooms.
   * @param params.groupIds (optional) A filter on groups accesses. Multiple groups can be used.
   * @param params.organizationId (optional) A filter on organization ID.
   * @param params.query (optional) A query to filter rooms by. It is based on our query language. You can filter by metadata and room ID.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A list of rooms.
   */
  async getRooms(params = {}, options2) {
    const path = url`/v2/rooms`;
    let query;
    if (typeof params.query === "string") {
      query = params.query;
    } else if (typeof params.query === "object") {
      query = objectToQuery(params.query);
    }
    const queryParams = {
      limit: params.limit,
      startingAfter: params.startingAfter,
      userId: params.userId,
      groupIds: params.groupIds ? params.groupIds.join(",") : void 0,
      query
    };
    if (params.organizationId !== void 0) {
      queryParams.organizationId = params.organizationId;
    } else if (params.tenantId !== void 0) {
      queryParams.organizationId = params.tenantId;
    }
    const res = await this.#get(path, queryParams, options2);
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const page = await res.json();
    const rooms = page.data.map(inflateRoomData);
    return {
      ...page,
      data: rooms
    };
  }
  /**
   * Iterates over all rooms that match the given criteria.
   *
   * The difference with .getRooms() is that pagination will happen
   * automatically under the hood, using the given `pageSize`.
   *
   * @param criteria.userId (optional) A filter on users accesses.
   * @param criteria.groupIds (optional) A filter on groups accesses. Multiple groups can be used.
   * @param criteria.query.roomId (optional) A filter by room ID.
   * @param criteria.query.metadata (optional) A filter by metadata.
   *
   * @param options.pageSize (optional) The page size to use for each request.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async *iterRooms(criteria, options2) {
    const { signal } = options2 ?? {};
    const pageSize = checkBounds("pageSize", options2?.pageSize ?? 40, 20);
    let cursor = void 0;
    while (true) {
      const { nextCursor, data } = await this.getRooms(
        { ...criteria, startingAfter: cursor, limit: pageSize },
        { signal }
      );
      for (const item of data) {
        yield item;
      }
      if (!nextCursor) {
        break;
      }
      cursor = nextCursor;
    }
  }
  /**
   * Creates a new room with the given id.
   * @param roomId The id of the room to create.
   * @param params.defaultAccesses The default accesses for the room.
   * @param params.groupsAccesses (optional) The group accesses for the room. Can contain a maximum of 100 entries. Key length has a limit of 40 characters.
   * @param params.usersAccesses (optional) The user accesses for the room. Can contain a maximum of 100 entries. Key length has a limit of 40 characters.
   * @param params.metadata (optional) The metadata for the room. Supports upto a maximum of 50 entries. Key length has a limit of 40 characters. Value length has a limit of 256 characters.
   * @param params.organizationId (optional) The organization ID to create the room for.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The created room.
   */
  async createRoom(roomId, params, options2) {
    const {
      defaultAccesses,
      groupsAccesses,
      usersAccesses,
      metadata: metadata2,
      tenantId,
      organizationId
    } = params;
    const body = {
      id: roomId,
      defaultAccesses,
      groupsAccesses,
      usersAccesses,
      metadata: metadata2
    };
    if (organizationId !== void 0) {
      body.organizationId = organizationId;
    } else if (tenantId !== void 0) {
      body.organizationId = tenantId;
    }
    const res = await this.#post(
      options2?.idempotent ? url`/v2/rooms?idempotent` : url`/v2/rooms`,
      body,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateRoomData(data);
  }
  /**
   * Returns a room with the given id, or creates one with the given creation
   * options if it doesn't exist yet.
   *
   * @param roomId The id of the room.
   * @param params.defaultAccesses The default accesses for the room if the room will be created.
   * @param params.groupsAccesses (optional) The group accesses for the room if the room will be created. Can contain a maximum of 100 entries. Key length has a limit of 40 characters.
   * @param params.usersAccesses (optional) The user accesses for the room if the room will be created. Can contain a maximum of 100 entries. Key length has a limit of 40 characters.
   * @param params.metadata (optional) The metadata for the room if the room will be created. Supports upto a maximum of 50 entries. Key length has a limit of 40 characters. Value length has a limit of 256 characters.
   * @param params.organizationId (optional) The organization ID to create the room for.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The room.
   */
  async getOrCreateRoom(roomId, params, options2) {
    return await this.createRoom(roomId, params, {
      ...options2,
      idempotent: true
    });
  }
  /**
   * Updates or creates a new room with the given properties.
   *
   * @param roomId The id of the room to update or create.
   * @param update The fields to update. These values will be updated when the room exists, or set when the room does not exist and gets created. Must specify at least one key.
   * @param create (optional) The fields to only use when the room does not exist and will be created. When the room already exists, these values are ignored.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The room.
   */
  async upsertRoom(roomId, params, options2) {
    const res = await this.#post(
      url`/v2/rooms/${roomId}/upsert`,
      params,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateRoomData(data);
  }
  /**
   * Returns a room with the given id.
   * @param roomId The id of the room to return.
   * @returns The room with the given id.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getRoom(roomId, options2) {
    const res = await this.#get(url`/v2/rooms/${roomId}`, void 0, options2);
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateRoomData(data);
  }
  /**
   * Updates specific properties of a room. It’s not necessary to provide the entire room’s information.
   * Setting a property to `null` means to delete this property.
   * @param roomId The id of the room to update.
   * @param params.defaultAccesses (optional) The default accesses for the room.
   * @param params.groupsAccesses (optional) The group accesses for the room. Can contain a maximum of 100 entries. Key length has a limit of 40 characters.
   * @param params.usersAccesses (optional) The user accesses for the room. Can contain a maximum of 100 entries. Key length has a limit of 40 characters.
   * @param params.metadata (optional) The metadata for the room. Supports upto a maximum of 50 entries. Key length has a limit of 40 characters. Value length has a limit of 256 characters.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The updated room.
   */
  async updateRoom(roomId, params, options2) {
    const { defaultAccesses, groupsAccesses, usersAccesses, metadata: metadata2 } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}`,
      {
        defaultAccesses,
        groupsAccesses,
        usersAccesses,
        metadata: metadata2
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateRoomData(data);
  }
  /**
   * Deletes a room with the given id. A deleted room is no longer accessible from the API or the dashboard and it cannot be restored.
   * @param roomId The id of the room to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteRoom(roomId, options2) {
    const res = await this.#delete(
      url`/v2/rooms/${roomId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Prepares a room for connectivity, making the eventual connection faster. Use this when you know you'll be loading a room but are not yet connected to it.
   * @param roomId The id of the room to prewarm.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async prewarmRoom(roomId, options2) {
    const res = await this.#get(
      url`/v2/rooms/${roomId}/prewarm`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Returns a list of users currently present in the requested room. For better performance, we recommand to call this endpoint every 10 seconds maximum. Duplicates can happen if a user is in the requested room with multiple browser tabs opened.
   * @param roomId The id of the room to get the users from.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A list of users currently present in the requested room.
   */
  async getActiveUsers(roomId, options2) {
    const res = await this.#get(
      url`/v2/rooms/${roomId}/active_users`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Boadcasts an event to a room without having to connect to it via the client from @liveblocks/client. The connectionId passed to event listeners is -1 when using this API.
   * @param roomId The id of the room to broadcast the event to.
   * @param message The message to broadcast. It can be any JSON serializable value.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async broadcastEvent(roomId, message, options2) {
    const res = await this.#post(
      url`/v2/rooms/${roomId}/broadcast_event`,
      message,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Sets ephemeral presence for a user in a room without requiring a WebSocket connection.
   * The presence data will automatically expire after the specified TTL.
   * This is useful for scenarios like showing an AI agent's presence in a room.
   *
   * @param roomId The id of the room to set presence in.
   * @param params.userId The ID of the user to set presence for.
   * @param params.data The presence data as a JSON object.
   * @param params.userInfo (optional) Metadata about the user or agent
   * @param params.ttl (optional) Time-to-live in seconds. If not specified, the default TTL is 60 seconds. (minimum: 2, maximum: 3599).
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async setPresence(roomId, params, options2) {
    const res = await this.#post(
      url`/v2/rooms/${roomId}/presence`,
      {
        userId: params.userId,
        data: params.data,
        userInfo: params.userInfo,
        ttl: params.ttl
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  async getStorageDocument(roomId, format = "plain-lson", options2) {
    const res = await this.#get(
      url`/v2/rooms/${roomId}/storage`,
      { format },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  async #requestStorageMutation(roomId, options2) {
    const resp = await this.#post(
      url`/v2/rooms/${roomId}/request-storage-mutation`,
      {},
      options2
    );
    if (!resp.ok) {
      throw await LiveblocksError2.from(resp);
    }
    if (resp.headers.get("content-type") !== "application/x-ndjson") {
      throw new Error("Unexpected response content type");
    }
    if (resp.body === null) {
      throw new Error("Unexpected null body in response");
    }
    const stream = resp.body.pipeThrough(new TextDecoderStream()).pipeThrough(new LineStream()).pipeThrough(new NdJsonStream());
    const iter = stream[Symbol.asyncIterator]();
    const first = (await iter.next()).value;
    if (!isPlainObject(first) || typeof first.actor !== "number") {
      throw new Error("Failed to obtain a unique session");
    }
    const nodes = await asyncConsume(iter);
    return { actor: first.actor, nodes };
  }
  /**
   * Initializes a room’s Storage. The room must already exist and have an empty Storage.
   * Calling this endpoint will disconnect all users from the room if there are any.
   *
   * @param roomId The id of the room to initialize the storage from.
   * @param document The document to initialize the storage with.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The initialized storage document. It is of the same format as the one passed in.
   */
  async initializeStorageDocument(roomId, document2, options2) {
    const res = await this.#post(
      url`/v2/rooms/${roomId}/storage`,
      document2,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Deletes all of the room’s Storage data and disconnect all users from the room if there are any. Note that this does not delete the Yjs document in the room if one exists.
   * @param roomId The id of the room to delete the storage from.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteStorageDocument(roomId, options2) {
    const res = await this.#delete(
      url`/v2/rooms/${roomId}/storage`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /* -------------------------------------------------------------------------------------------------
   * Yjs
   * -----------------------------------------------------------------------------------------------*/
  /**
   * Returns a JSON representation of the room’s Yjs document.
   * @param roomId The id of the room to get the Yjs document from.
   * @param params.format (optional) If true, YText will return formatting.
   * @param params.key (optional) If provided, returns only a single key’s value, e.g. doc.get(key).toJSON().
   * @param params.type (optional) Used with key to override the inferred type, i.e. "ymap" will return doc.get(key, Y.Map).
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A JSON representation of the room’s Yjs document.
   */
  async getYjsDocument(roomId, params = {}, options2) {
    const { format, key, type } = params;
    const path = url`v2/rooms/${roomId}/ydoc`;
    const res = await this.#get(
      path,
      { formatting: format ? "true" : void 0, key, type },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Send a Yjs binary update to the room’s Yjs document. You can use this endpoint to initialize Yjs data for the room or to update the room’s Yjs document.
   * @param roomId The id of the room to send the Yjs binary update to.
   * @param update The Yjs update to send. Typically the result of calling `Yjs.encodeStateAsUpdate(doc)`. Read the [Yjs documentation](https://docs.yjs.dev/api/document-updates) to learn how to create a binary update.
   * @param params.guid (optional) If provided, the binary update will be applied to the Yjs subdocument with the given guid. If not provided, the binary update will be applied to the root Yjs document.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async sendYjsBinaryUpdate(roomId, update, params = {}, options2) {
    const res = await this.#putBinary(
      url`/v2/rooms/${roomId}/ydoc`,
      update,
      { guid: params.guid },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Returns the room’s Yjs document encoded as a single binary update. This can be used by Y.applyUpdate(responseBody) to get a copy of the document in your backend.
   * See [Yjs documentation](https://docs.yjs.dev/api/document-updates) for more information on working with updates.
   * @param roomId The id of the room to get the Yjs document from.
   * @param params.guid (optional) If provided, returns the binary update of the Yjs subdocument with the given guid. If not provided, returns the binary update of the root Yjs document.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The room’s Yjs document encoded as a single binary update.
   */
  async getYjsDocumentAsBinaryUpdate(roomId, params = {}, options2) {
    const res = await this.#get(
      url`/v2/rooms/${roomId}/ydoc-binary`,
      { guid: params.guid },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return res.arrayBuffer();
  }
  /* -------------------------------------------------------------------------------------------------
   * Comments
   * -----------------------------------------------------------------------------------------------*/
  /**
   * Gets all the threads in a room.
   *
   * @param params.roomId The room ID to get the threads from.
   * @param params.query The query to filter threads by. It is based on our query language and can filter by metadata.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A list of threads.
   */
  async getThreads(params, options2) {
    const { roomId } = params;
    let query;
    if (typeof params.query === "string") {
      query = params.query;
    } else if (typeof params.query === "object") {
      query = objectToQuery(params.query);
    }
    const res = await this.#get(
      url`/v2/rooms/${roomId}/threads`,
      { query },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const { data } = await res.json();
    return {
      data: data.map((thread) => convertToThreadData(thread))
    };
  }
  /**
   * Gets a thread.
   *
   * @param params.roomId The room ID to get the thread from.
   * @param params.threadId The thread ID.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A thread.
   */
  async getThread(params, options2) {
    const { roomId, threadId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/threads/${threadId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToThreadData(await res.json());
  }
  /**
   * @deprecated Prefer using `getMentionsFromCommentBody` to extract mentions
   * from comments and threads, or `Liveblocks.getThreadSubscriptions` to get
   * the list of users who are subscribed to a thread.
   *
   * Gets a thread's participants.
   *
   * Participants are users who have commented on the thread
   * or users that have been mentioned in a comment.
   *
   * @param params.roomId The room ID to get the thread participants from.
   * @param params.threadId The thread ID to get the participants from.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns An object containing an array of participant IDs.
   */
  async getThreadParticipants(params, options2) {
    const { roomId, threadId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/threads/${threadId}/participants`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Gets a thread's subscriptions.
   *
   * @param params.roomId The room ID to get the thread subscriptions from.
   * @param params.threadId The thread ID to get the subscriptions from.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns An array of subscriptions.
   */
  async getThreadSubscriptions(params, options2) {
    const { roomId, threadId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/threads/${threadId}/subscriptions`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const { data } = await res.json();
    return {
      data: data.map(convertToUserSubscriptionData)
    };
  }
  /**
   * Gets a thread's comment.
   *
   * @param params.roomId The room ID to get the comment from.
   * @param params.threadId The thread ID to get the comment from.
   * @param params.commentId The comment ID.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A comment.
   */
  async getComment(params, options2) {
    const { roomId, threadId, commentId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/threads/${threadId}/comments/${commentId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToCommentData(await res.json());
  }
  /**
   * Creates a comment.
   *
   * @param params.roomId The room ID to create the comment in.
   * @param params.threadId The thread ID to create the comment in.
   * @param params.data.userId The user ID of the user who is set to create the comment.
   * @param params.data.createdAt (optional) The date the comment is set to be created.
   * @param params.data.body The body of the comment.
   * @param params.data.metadata (optional) The metadata for the comment.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The created comment.
   */
  async createComment(params, options2) {
    const { roomId, threadId, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/comments`,
      {
        ...data,
        createdAt: data.createdAt?.toISOString()
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToCommentData(await res.json());
  }
  /**
   * Edits a comment.
   * @param params.roomId The room ID to edit the comment in.
   * @param params.threadId The thread ID to edit the comment in.
   * @param params.commentId The comment ID to edit.
   * @param params.data.body The body of the comment.
   * @param params.data.metadata (optional) The metadata for the comment. Value must be a string, boolean or number. Use null to delete a key.
   * @param params.data.editedAt (optional) The date the comment was edited.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The edited comment.
   */
  async editComment(params, options2) {
    const { roomId, threadId, commentId, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/comments/${commentId}`,
      {
        body: data.body,
        editedAt: data.editedAt?.toISOString(),
        metadata: data.metadata
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToCommentData(await res.json());
  }
  /**
   * Deletes a comment. Deletes a comment. If there are no remaining comments in the thread, the thread is also deleted.
   * @param params.roomId The room ID to delete the comment in.
   * @param params.threadId The thread ID to delete the comment in.
   * @param params.commentId The comment ID to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteComment(params, options2) {
    const { roomId, threadId, commentId } = params;
    const res = await this.#delete(
      url`/v2/rooms/${roomId}/threads/${threadId}/comments/${commentId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Gets an attachment's metadata and a presigned download URL.
   *
   * @param params.roomId The room ID the attachment belongs to.
   * @param params.attachmentId The attachment ID (starts with "at_").
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The attachment metadata including a presigned download URL.
   */
  async getAttachment(params, options2) {
    const { roomId, attachmentId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/attachments/${attachmentId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Creates a new thread. The thread will be created with the specified comment as its first comment.
   * If the thread already exists, a `LiveblocksError` will be thrown with status code 409.
   * @param params.roomId The room ID to create the thread in.
   * @param params.thread.metadata (optional) The metadata for the thread. Supports upto a maximum of 10 entries. Value must be a string, boolean or number
   * @param params.thread.comment.userId The user ID of the user who created the comment.
   * @param params.thread.comment.createdAt (optional) The date the comment was created.
   * @param params.thread.comment.body The body of the comment.
   * @param params.thread.comment.metadata (optional) The metadata for the comment.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The created thread. The thread will be created with the specified comment as its first comment.
   */
  async createThread(params, options2) {
    const { roomId, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads`,
      {
        ...data,
        comment: {
          ...data.comment,
          createdAt: data.comment.createdAt?.toISOString()
        }
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToThreadData(await res.json());
  }
  /**
   * Deletes a thread and all of its comments.
   * @param params.roomId The room ID to delete the thread in.
   * @param params.threadId The thread ID to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteThread(params, options2) {
    const { roomId, threadId } = params;
    const res = await this.#delete(
      url`/v2/rooms/${roomId}/threads/${threadId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Mark a thread as resolved.
   * @param params.roomId The room ID of the thread.
   * @param params.threadId The thread ID to mark as resolved.
   * @param params.data.userId The user ID of the user who marked the thread as resolved.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The thread marked as resolved.
   */
  async markThreadAsResolved(params, options2) {
    const { roomId, threadId } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/mark-as-resolved`,
      { userId: params.data.userId },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToThreadData(await res.json());
  }
  /**
   * Mark a thread as unresolved.
   * @param params.roomId The room ID of the thread.
   * @param params.threadId The thread ID to mark as unresolved.
   * @param params.data.userId The user ID of the user who marked the thread as unresolved.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The thread marked as unresolved.
   */
  async markThreadAsUnresolved(params, options2) {
    const { roomId, threadId } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/mark-as-unresolved`,
      { userId: params.data.userId },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToThreadData(await res.json());
  }
  /**
   * Subscribes a user to a thread.
   * @param params.roomId The room ID of the thread.
   * @param params.threadId The thread ID to subscribe to.
   * @param params.data.userId The user ID of the user to subscribe to the thread.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The thread subscription.
   */
  async subscribeToThread(params, options2) {
    const { roomId, threadId } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/subscribe`,
      { userId: params.data.userId },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToSubscriptionData(
      await res.json()
    );
  }
  /**
   * Unsubscribes a user from a thread.
   * @param params.roomId The room ID of the thread.
   * @param params.threadId The thread ID to unsubscribe from.
   * @param params.data.userId The user ID of the user to unsubscribe from the thread.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async unsubscribeFromThread(params, options2) {
    const { roomId, threadId } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/unsubscribe`,
      { userId: params.data.userId },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Updates the metadata of the specified thread in a room.
   * @param params.roomId The room ID to update the thread in.
   * @param params.threadId The thread ID to update.
   * @param params.data.metadata The metadata for the thread. Value must be a string, boolean or number
   * @param params.data.userId The user ID of the user who updated the thread.
   * @param params.data.updatedAt (optional) The date the thread is set to be updated.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The updated thread metadata.
   */
  async editThreadMetadata(params, options2) {
    const { roomId, threadId, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/metadata`,
      {
        ...data,
        updatedAt: data.updatedAt?.toISOString()
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Updates the metadata of the specified comment in a room.
   * @param params.roomId The room ID to update the comment in.
   * @param params.threadId The thread ID to update the comment in.
   * @param params.commentId The comment ID to update.
   * @param params.data.metadata The metadata for the comment. Value must be a string, boolean or number. Use null to delete a key.
   * @param params.data.userId The user ID of the user who updated the comment.
   * @param params.data.updatedAt (optional) The date the comment metadata is set to be updated.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The updated comment metadata.
   */
  async editCommentMetadata(params, options2) {
    const { roomId, threadId, commentId, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/comments/${commentId}/metadata`,
      {
        ...data,
        updatedAt: data.updatedAt?.toISOString()
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Adds a new comment reaction to a comment.
   * @param params.roomId The room ID to add the comment reaction in.
   * @param params.threadId The thread ID to add the comment reaction in.
   * @param params.commentId The comment ID to add the reaction in.
   * @param params.data.emoji The (emoji) reaction to add.
   * @param params.data.userId The user ID of the user associated with the reaction.
   * @param params.data.createdAt (optional) The date the reaction is set to be created.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The created comment reaction.
   */
  async addCommentReaction(params, options2) {
    const { roomId, threadId, commentId, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/comments/${commentId}/add-reaction`,
      {
        ...data,
        createdAt: data.createdAt?.toISOString()
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const reaction = await res.json();
    return convertToCommentUserReaction(reaction);
  }
  /**
   * Removes a reaction from a comment.
   * @param params.roomId The room ID to remove the comment reaction from.
   * @param params.threadId The thread ID to remove the comment reaction from.
   * @param params.commentId The comment ID to remove the reaction from.
   * @param params.data.emoji The (emoji) reaction to remove.
   * @param params.data.userId The user ID of the user associated with the reaction.
   * @param params.data.removedAt (optional) The date the reaction is set to be removed.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async removeCommentReaction(params, options2) {
    const { roomId, threadId, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/threads/${threadId}/comments/${params.commentId}/remove-reaction`,
      {
        ...data,
        removedAt: data.removedAt?.toISOString()
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Returns the inbox notifications for a user.
   * @param params.userId The user ID to get the inbox notifications from.
   * @param params.inboxNotificationId The ID of the inbox notification to get.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getInboxNotification(params, options2) {
    const { userId, inboxNotificationId } = params;
    const res = await this.#get(
      url`/v2/users/${userId}/inbox-notifications/${inboxNotificationId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return convertToInboxNotificationData(
      await res.json()
    );
  }
  /**
   * Returns the inbox notifications for a user.
   * @param params.userId The user ID to get the inbox notifications from.
   * @param params.query The query to filter inbox notifications by. It is based on our query language and can filter by unread.
   * @param params.organizationId (optional) The organization ID to get the inbox notifications for.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getInboxNotifications(params, options2) {
    const { userId, tenantId, organizationId, limit, startingAfter } = params;
    let query;
    if (typeof params.query === "string") {
      query = params.query;
    } else if (typeof params.query === "object") {
      query = objectToQuery(params.query);
    }
    const queryParams = {
      query,
      limit,
      startingAfter
    };
    if (organizationId !== void 0) {
      queryParams.organizationId = organizationId;
    } else if (tenantId !== void 0) {
      queryParams.organizationId = tenantId;
    }
    const res = await this.#get(
      url`/v2/users/${userId}/inbox-notifications`,
      queryParams,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const page = await res.json();
    return {
      ...page,
      data: page.data.map(convertToInboxNotificationData)
    };
  }
  /**
   * Iterates over all inbox notifications for a user.
   *
   * The difference with .getInboxNotifications() is that pagination will
   * happen automatically under the hood, using the given `pageSize`.
   *
   * @param criteria.userId The user ID to get the inbox notifications from.
   * @param criteria.query The query to filter inbox notifications by. It is based on our query language and can filter by unread.
   * @param criteria.organizationId (optional) The organization ID to get the inbox notifications for.
   * @param options.pageSize (optional) The page size to use for each request.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async *iterInboxNotifications(criteria, options2) {
    const { signal } = options2 ?? {};
    const pageSize = checkBounds("pageSize", options2?.pageSize ?? 50, 10);
    let cursor = void 0;
    while (true) {
      const { nextCursor, data } = await this.getInboxNotifications(
        { ...criteria, startingAfter: cursor, limit: pageSize },
        { signal }
      );
      for (const item of data) {
        yield item;
      }
      if (!nextCursor) {
        break;
      }
      cursor = nextCursor;
    }
  }
  /**
   * Returns all room subscription settings for a user.
   * @param params.userId The user ID to get the room subscription settings from.
   * @param params.organizationId (optional) The organization ID to get the room subscription settings for.
   * @param params.startingAfter (optional) The cursor to start the pagination from.
   * @param params.limit (optional) The number of items to return.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getUserRoomSubscriptionSettings(params, options2) {
    const { userId, tenantId, organizationId, startingAfter, limit } = params;
    const queryParams = {
      startingAfter,
      limit
    };
    if (organizationId !== void 0) {
      queryParams.organizationId = organizationId;
    } else if (tenantId !== void 0) {
      queryParams.organizationId = tenantId;
    }
    const res = await this.#get(
      url`/v2/users/${userId}/room-subscription-settings`,
      queryParams,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Gets the user's room subscription settings.
   * @param params.userId The user ID to get the room subscription settings from.
   * @param params.roomId The room ID to get the room subscription settings from.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getRoomSubscriptionSettings(params, options2) {
    const { userId, roomId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/users/${userId}/subscription-settings`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Updates the user's room subscription settings.
   * @param params.userId The user ID to update the room subscription settings for.
   * @param params.roomId The room ID to update the room subscription settings for.
   * @param params.data The new room subscription settings for the user.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async updateRoomSubscriptionSettings(params, options2) {
    const { userId, roomId, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/users/${userId}/subscription-settings`,
      data,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Delete the user's room subscription settings.
   * @param params.userId The user ID to delete the room subscription settings from.
   * @param params.roomId The room ID to delete the room subscription settings from.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteRoomSubscriptionSettings(params, options2) {
    const { userId, roomId } = params;
    const res = await this.#delete(
      url`/v2/rooms/${roomId}/users/${userId}/subscription-settings`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Update a room ID.
   * @param params.roomId The current ID of the room.
   * @param params.newRoomId The new room ID.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async updateRoomId(params, options2) {
    const { currentRoomId, newRoomId } = params;
    const res = await this.#post(
      url`/v2/rooms/${currentRoomId}/update-room-id`,
      { newRoomId },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateRoomData(data);
  }
  /**
   * Triggers an inbox notification for a user.
   * @param params.userId The user ID to trigger the inbox notification for.
   * @param params.kind The kind of inbox notification to trigger.
   * @param params.subjectId The subject ID of the triggered inbox notification.
   * @param params.activityData The activity data of the triggered inbox notification.
   * @param params.roomId (optional) The room ID to trigger the inbox notification for.
   * @param params.organizationId (optional) The organization ID to trigger the inbox notification for.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async triggerInboxNotification(params, options2) {
    const { tenantId, organizationId, ...restParams } = params;
    const body = {
      ...restParams
    };
    if (organizationId !== void 0) {
      body.organizationId = organizationId;
    } else if (tenantId !== void 0) {
      body.organizationId = tenantId;
    }
    const res = await this.#post(
      url`/v2/inbox-notifications/trigger`,
      body,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Deletes an inbox notification for a user.
   * @param params.userId The user ID for which to delete the inbox notification.
   * @param params.inboxNotificationId The ID of the inbox notification to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteInboxNotification(params, options2) {
    const { userId, inboxNotificationId } = params;
    const res = await this.#delete(
      url`/v2/users/${userId}/inbox-notifications/${inboxNotificationId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Deletes all inbox notifications for a user.
   * @param params.userId The user ID for which to delete all the inbox notifications.
   * @param params.organizationId (optional) The organization ID to delete the inbox notifications for.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteAllInboxNotifications(params, options2) {
    const { userId, tenantId, organizationId } = params;
    const queryParams = {};
    if (organizationId !== void 0) {
      queryParams.organizationId = organizationId;
    } else if (tenantId !== void 0) {
      queryParams.organizationId = tenantId;
    }
    const res = await this.#delete(
      url`/v2/users/${userId}/inbox-notifications`,
      queryParams,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Get notification settings for a user for a project.
   * @param params.userId The user ID to get the notifications settings for.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getNotificationSettings(params, options2) {
    const { userId } = params;
    const res = await this.#get(
      url`/v2/users/${userId}/notification-settings`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const plainSettings = await res.json();
    const settings = createNotificationSettings(plainSettings);
    return settings;
  }
  /**
   * Update the user's notification settings.
   * @param params.userId The user ID to update the notification settings for.
   * @param params.data The new notification settings for the user.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async updateNotificationSettings(params, options2) {
    const { userId, data } = params;
    const res = await this.#post(
      url`/v2/users/${userId}/notification-settings`,
      data,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const plainSettings = await res.json();
    const settings = createNotificationSettings(plainSettings);
    return settings;
  }
  /**
   * Delete the user's notification settings
   * @param params.userId The user ID to update the notification settings for.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteNotificationSettings(params, options2) {
    const { userId } = params;
    const res = await this.#delete(
      url`/v2/users/${userId}/notification-settings`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Create a group
   * @param params.groupId The ID of the group to create.
   * @param params.memberIds The IDs of the members to add to the group.
   * @param params.organizationId (optional) The organization ID to create the group for.
   * @param params.scopes (optional) The scopes to grant to the group. The default is `{ mention: true }`.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async createGroup(params, options2) {
    const { tenantId, organizationId, ...restParams } = params;
    const body = {
      ...restParams,
      // The REST API uses `id` since a group is a resource,
      // but we use `groupId` here for consistency with the other methods.
      id: params.groupId
    };
    if (organizationId !== void 0) {
      body.organizationId = organizationId;
    } else if (tenantId !== void 0) {
      body.organizationId = tenantId;
    }
    const res = await this.#post(url`/v2/groups`, body, options2);
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const group = await res.json();
    return convertToGroupData(group);
  }
  /**
   * Get a group
   * @param params.groupId The ID of the group to get.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getGroup(params, options2) {
    const res = await this.#get(
      url`/v2/groups/${params.groupId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const group = await res.json();
    return convertToGroupData(group);
  }
  /**
   * Add members to a group
   * @param params.groupId The ID of the group to add members to.
   * @param params.memberIds The IDs of the members to add to the group.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async addGroupMembers(params, options2) {
    const res = await this.#post(
      url`/v2/groups/${params.groupId}/add-members`,
      { memberIds: params.memberIds },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const group = await res.json();
    return convertToGroupData(group);
  }
  /**
   * Remove members from a group
   * @param params.groupId The ID of the group to remove members from.
   * @param params.memberIds The IDs of the members to remove from the group.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async removeGroupMembers(params, options2) {
    const res = await this.#post(
      url`/v2/groups/${params.groupId}/remove-members`,
      { memberIds: params.memberIds },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const group = await res.json();
    return convertToGroupData(group);
  }
  /**
   * Delete a group
   * @param params.groupId The ID of the group to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteGroup(params, options2) {
    const res = await this.#delete(
      url`/v2/groups/${params.groupId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Get all groups
   * @param params.limit (optional) The number of groups to return.
   * @param params.startingAfter (optional) The cursor to start the pagination from.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getGroups(params, options2) {
    const res = await this.#get(
      url`/v2/groups`,
      { startingAfter: params?.startingAfter, limit: params?.limit },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const page = await res.json();
    return {
      ...page,
      data: page.data.map(convertToGroupData)
    };
  }
  /**
   * Returns all groups a user is a member of.
   * @param params.userId The user ID to get the groups for.
   * @param params.startingAfter (optional) The cursor to start the pagination from.
   * @param params.limit (optional) The number of items to return.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getUserGroups(params, options2) {
    const { userId, startingAfter, limit } = params;
    const res = await this.#get(
      url`/v2/users/${userId}/groups`,
      { startingAfter, limit },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const page = await res.json();
    return {
      ...page,
      data: page.data.map(convertToGroupData)
    };
  }
  /**
   * Retrieves the current Storage contents for the given room ID and calls the
   * provided callback function, in which you can mutate the Storage contents
   * at will.
   *
   * If you need to run the same mutation across multiple rooms, prefer using
   * `.massMutateStorage()` instead of looping over room IDs yourself.
   */
  async mutateStorage(roomId, callback, options2) {
    return this.#_mutateOneRoom(roomId, void 0, callback, options2);
  }
  /**
   * Retrieves the Storage contents for each room that matches the given
   * criteria and calls the provided callback function, in which you can mutate
   * the Storage contents at will.
   *
   * You can use the `criteria` parameter to select which rooms to process by
   * their metadata. If you pass `{}` (empty object), all rooms will be
   * selected and processed.
   *
   * This method will execute mutations in parallel, using the specified
   * `concurrency` value. If you which to run the mutations serially, set
   * `concurrency` to 1.
   */
  async massMutateStorage(criteria, callback, massOptions) {
    const concurrency = checkBounds(
      "concurrency",
      massOptions?.concurrency ?? 8,
      1,
      20
    );
    const pageSize = Math.max(20, concurrency * 4);
    const { signal } = massOptions ?? {};
    const rooms = this.iterRooms(criteria, { pageSize, signal });
    const options2 = { signal };
    await runConcurrently(
      rooms,
      (roomData) => this.#_mutateOneRoom(roomData.id, roomData, callback, options2),
      concurrency
    );
  }
  async #_mutateOneRoom(roomId, room, callback, options2) {
    const debounceInterval = 200;
    const { signal, abort } = makeAbortController(options2?.signal);
    let opsBuffer = [];
    let outstandingFlush$ = void 0;
    let lastFlush = performance.now();
    const flushIfNeeded = /* @__PURE__ */ __name((force) => {
      if (opsBuffer.length === 0)
        return;
      if (outstandingFlush$) {
        return;
      }
      const now2 = performance.now();
      if (!(force || now2 - lastFlush > debounceInterval)) {
        return;
      }
      lastFlush = now2;
      const ops = opsBuffer;
      opsBuffer = [];
      outstandingFlush$ = this.#sendMessage(
        roomId,
        [{ type: ClientMsgCode.UPDATE_STORAGE, ops }],
        { signal }
      ).catch((err) => {
        abort(err);
      }).finally(() => {
        outstandingFlush$ = void 0;
      });
    }, "flushIfNeeded");
    try {
      const resp = await this.#requestStorageMutation(roomId, { signal });
      const { actor, nodes } = resp;
      const pool = createManagedPool(roomId, {
        getCurrentConnectionId: /* @__PURE__ */ __name(() => actor, "getCurrentConnectionId"),
        onDispatch: /* @__PURE__ */ __name((ops, _reverse, _storageUpdates) => {
          if (ops.length === 0) return;
          for (const op of ops) {
            opsBuffer.push(op);
          }
          flushIfNeeded(
            /* force */
            false
          );
        }, "onDispatch")
      });
      const root = LiveObject._fromItems(nodes, pool);
      const callback$ = callback({ room, root });
      flushIfNeeded(
        /* force */
        true
      );
      await callback$;
    } catch (e) {
      abort();
      throw e;
    } finally {
      await outstandingFlush$;
      flushIfNeeded(
        /* force */
        true
      );
      await outstandingFlush$;
    }
  }
  async #sendMessage(roomId, messages, options2) {
    const res = await this.#post(
      url`/v2/rooms/${roomId}/send-message`,
      { messages },
      { signal: options2?.signal }
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Returns a paginated list of AI copilots. The copilots are returned sorted by creation date, from newest to oldest.
   * @param params.limit (optional) A limit on the number of copilots to return. The limit can range between 1 and 100, and defaults to 20.
   * @param params.startingAfter (optional) A cursor used for pagination. You get the value from the response of the previous page.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A paginated list of AI copilots.
   */
  async getAiCopilots(params = {}, options2) {
    const res = await this.#get(
      url`/v2/ai/copilots`,
      {
        limit: params.limit,
        startingAfter: params.startingAfter
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const page = await res.json();
    return {
      ...page,
      data: page.data.map(inflateAiCopilot)
    };
  }
  /**
   * Creates an AI copilot.
   * @param params The parameters to create the copilot with.
   * @returns The created copilot.
   */
  async createAiCopilot(params, options2) {
    const res = await this.#post(url`/v2/ai/copilots`, params, options2);
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateAiCopilot(data);
  }
  /**
   * Returns an AI copilot with the given id.
   * @param copilotId The id of the copilot to return.
   * @returns The copilot with the given id.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async getAiCopilot(copilotId, options2) {
    const res = await this.#get(
      url`/v2/ai/copilots/${copilotId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateAiCopilot(data);
  }
  /**
   * Updates an AI copilot with the given id.
   * @param copilotId The id of the copilot to update.
   * @param params The parameters to update the copilot with.
   * @returns The updated copilot.
   */
  async updateAiCopilot(copilotId, params, options2) {
    const res = await this.#post(
      url`/v2/ai/copilots/${copilotId}`,
      params,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateAiCopilot(data);
  }
  /**
   * Deletes an AI copilot with the given id. A deleted copilot is no longer accessible from the API or the dashboard and it cannot be restored.
   * @param copilotId The id of the copilot to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteAiCopilot(copilotId, options2) {
    const res = await this.#delete(
      url`/v2/ai/copilots/${copilotId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Creates a web knowledge source.
   * @param params.url The URL of the web knowledge source.
   * @param params.type The type of the web knowledge source: "individual_link", "crawl" or "sitemap".
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The id of the created web knowledge source.
   */
  async createWebKnowledgeSource(params, options2) {
    const res = await this.#post(
      url`/v2/ai/copilots/${params.copilotId}/knowledge/web`,
      params,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return data;
  }
  /**
   * Creates a file knowledge source.
   * @param params.copilotId The id of the copilot.
   * @param params.name The name of the file knowledge source.
   * @param params.file The file to create the knowledge source from.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The id of the created file knowledge source.
   */
  async createFileKnowledgeSource(params, options2) {
    const fetch = await fetchPolyfill();
    const res = await fetch(
      urljoin(
        this.#baseUrl,
        url`/v2/ai/copilots/${params.copilotId}/knowledge/file/${params.file.name}`
      ),
      {
        method: "PUT",
        body: params.file,
        headers: {
          Authorization: `Bearer ${this.#secret}`,
          "Content-Type": params.file.type,
          "Content-Length": String(params.file.size)
        },
        signal: options2?.signal
      }
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return data;
  }
  /**
   * Deletes a file knowledge source.
   * @param params.copilotId The id of the copilot.
   * @param params.knowledgeSourceId The id of the knowledge source to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteFileKnowledgeSource(params, options2) {
    const res = await this.#delete(
      url`/v2/ai/copilots/${params.copilotId}/knowledge/file/${params.knowledgeSourceId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Deletes a web knowledge source.
   * @param params.copilotId The id of the copilot.
   * @param params.knowledgeSourceId The id of the knowledge source to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteWebKnowledgeSource(params, options2) {
    const res = await this.#delete(
      url`/v2/ai/copilots/${params.copilotId}/knowledge/web/${params.knowledgeSourceId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Returns a paginated list of knowledge sources.
   * @param params.copilotId The id of the copilot.
   * @param params.limit (optional) A limit on the number of knowledge sources to return. The limit can range between 1 and 100, and defaults to 20.
   * @param params.startingAfter (optional) A cursor used for pagination. You get the value from the response of the previous page.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A paginated list of knowledge sources.
   */
  async getKnowledgeSources(params, options2) {
    const res = await this.#get(
      url`/v2/ai/copilots/${params.copilotId}/knowledge`,
      {
        limit: params.limit,
        startingAfter: params.startingAfter
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const page = await res.json();
    return {
      ...page,
      data: page.data.map(inflateKnowledgeSource)
    };
  }
  /**
   * Returns a knowledge source with the given id.
   * @param params.copilotId The id of the copilot.
   * @param params.knowledgeSourceId The id of the knowledge source to return.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The knowledge source.
   */
  async getKnowledgeSource(params, options2) {
    const res = await this.#get(
      url`/v2/ai/copilots/${params.copilotId}/knowledge/${params.knowledgeSourceId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return inflateKnowledgeSource(data);
  }
  /**
   * Returns the content of a file knowledge source.
   * @param params.copilotId The id of the copilot.
   * @param params.knowledgeSourceId The id of the knowledge source.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The content of the file knowledge source.
   */
  async getFileKnowledgeSourceMarkdown(params, options2) {
    const res = await this.#get(
      url`/v2/ai/copilots/${params.copilotId}/knowledge/file/${params.knowledgeSourceId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const data = await res.json();
    return data.content;
  }
  /**
   * Returns a paginated list of web knowledge source links.
   * @param params.copilotId The id of the copilot.
   * @param params.knowledgeSourceId The id of the knowledge source.
   * @param params.limit (optional) A limit on the number of links to return. The limit can range between 1 and 100, and defaults to 20.
   * @param params.startingAfter (optional) A cursor used for pagination. You get the value from the response of the previous page.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A paginated list of web knowledge source links.
   */
  async getWebKnowledgeSourceLinks(params, options2) {
    const res = await this.#get(
      url`/v2/ai/copilots/${params.copilotId}/knowledge/web/${params.knowledgeSourceId}/links`,
      {
        limit: params.limit,
        startingAfter: params.startingAfter
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    const page = await res.json();
    return {
      ...page,
      data: page.data.map(inflateWebKnowledgeSourceLink)
    };
  }
  /* -------------------------------------------------------------------------------------------------
   * Feeds
   * -----------------------------------------------------------------------------------------------*/
  /**
   * Returns a list of feeds in a room.
   * @param params.roomId The room ID to get the feeds from.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A list of feeds.
   */
  async getFeeds(params, options2) {
    const { roomId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/feeds`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Creates a new feed in a room.
   * @param params.roomId The room ID to create the feed in.
   * @param params.feedId The feed ID.
   * @param params.metadata (optional) The metadata for the feed.
   * @param params.createdAt (optional) Creation time in ms. Sent to the API as `timestamp`. If not provided, the server uses the current time.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The created feed.
   */
  async createFeed(params, options2) {
    const { roomId, feedId, metadata: metadata2, createdAt } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/feeds`,
      {
        feedId,
        ...metadata2 !== void 0 ? { metadata: metadata2 } : {},
        ...createdAt !== void 0 ? { timestamp: createdAt } : {}
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Returns a feed with the given id.
   * @param params.roomId The room ID to get the feed from.
   * @param params.feedId The feed ID.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The feed.
   */
  async getFeed(params, options2) {
    const { roomId, feedId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/feeds/${feedId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Updates the metadata of a feed.
   * @param params.roomId The room ID to update the feed in.
   * @param params.feedId The feed ID to update.
   * @param params.metadata The metadata for the feed.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The updated feed.
   */
  async updateFeed(params, options2) {
    const { roomId, feedId, metadata: metadata2 } = params;
    const res = await this.#patch(
      url`/v2/rooms/${roomId}/feeds/${feedId}`,
      { metadata: metadata2 },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Deletes a feed.
   * @param params.roomId The room ID to delete the feed from.
   * @param params.feedId The feed ID to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteFeed(params, options2) {
    const { roomId, feedId } = params;
    const res = await this.#delete(
      url`/v2/rooms/${roomId}/feeds/${feedId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
  /**
   * Returns a list of messages in a feed.
   * @param params.roomId The room ID to get the feed messages from.
   * @param params.feedId The feed ID to get the messages from.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns A list of feed messages.
   */
  async getFeedMessages(params, options2) {
    const { roomId, feedId } = params;
    const res = await this.#get(
      url`/v2/rooms/${roomId}/feeds/${feedId}/messages`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Creates a new message in a feed.
   * @param params.roomId The room ID to create the feed message in.
   * @param params.feedId The feed ID to create the message in.
   * @param params.id (optional) The message ID. If not provided, one will be generated.
   * @param params.createdAt (optional) Creation time in ms. Sent to the API as `timestamp`. If not provided, the server uses the current time.
   * @param params.data The message data.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The created feed message.
   */
  async createFeedMessage(params, options2) {
    const { roomId, feedId, id, createdAt, data } = params;
    const res = await this.#post(
      url`/v2/rooms/${roomId}/feeds/${feedId}/messages`,
      {
        data,
        ...id !== void 0 ? { id } : {},
        ...createdAt !== void 0 ? { timestamp: createdAt } : {}
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Updates a feed message.
   * @param params.roomId The room ID to update the feed message in.
   * @param params.feedId The feed ID to update the message in.
   * @param params.messageId The message ID to update.
   * @param params.data The message data.
   * @param params.updatedAt (optional) Update time in ms. Sent to the API as `timestamp`. If omitted, the server uses the current time.
   * @param options.signal (optional) An abort signal to cancel the request.
   * @returns The updated feed message.
   */
  async updateFeedMessage(params, options2) {
    const { roomId, feedId, messageId, data, updatedAt } = params;
    const res = await this.#patch(
      url`/v2/rooms/${roomId}/feeds/${feedId}/messages/${messageId}`,
      {
        data,
        ...updatedAt !== void 0 ? { timestamp: updatedAt } : {}
      },
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
    return await res.json();
  }
  /**
   * Deletes a feed message.
   * @param params.roomId The room ID to delete the feed message from.
   * @param params.feedId The feed ID to delete the message from.
   * @param params.messageId The message ID to delete.
   * @param options.signal (optional) An abort signal to cancel the request.
   */
  async deleteFeedMessage(params, options2) {
    const { roomId, feedId, messageId } = params;
    const res = await this.#delete(
      url`/v2/rooms/${roomId}/feeds/${feedId}/messages/${messageId}`,
      void 0,
      options2
    );
    if (!res.ok) {
      throw await LiveblocksError2.from(res);
    }
  }
};
var LiveblocksError2 = class _LiveblocksError2 extends Error {
  static {
    __name(this, "_LiveblocksError");
  }
  status;
  details;
  constructor(message, status, details) {
    super(message);
    this.name = "LiveblocksError";
    this.status = status;
    this.details = details;
  }
  toString() {
    let msg = `${this.name}: ${this.message} (status ${this.status})`;
    if (this.details) {
      msg += `
${this.details}`;
    }
    return msg;
  }
  static async from(res) {
    const origErrLocation = new Error();
    Error.captureStackTrace(origErrLocation, _LiveblocksError2.from);
    const FALLBACK = "An error happened without an error message";
    let text;
    try {
      text = await res.text();
    } catch {
      text = FALLBACK;
    }
    const obj = tryParseJson(text) ?? { message: text };
    const message = obj.message || FALLBACK;
    const details = [
      obj.suggestion ? `Suggestion: ${String(obj.suggestion)}` : void 0,
      obj.docs ? `See also: ${String(obj.docs)}` : void 0
    ].filter(Boolean).join("\n") || void 0;
    const err = new _LiveblocksError2(message, res.status, details);
    err.stack = origErrLocation.stack;
    return err;
  }
};
var WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
detectDupes(PKG_NAME2, PKG_VERSION2, PKG_FORMAT2);

// lib/liveblocks.ts
var liveblocks = null;
function getLiveblocks() {
  if (!liveblocks) {
    const secret = process.env.LIVEBLOCKS_SECRET_KEY;
    if (!secret) {
      throw new Error("LIVEBLOCKS_SECRET_KEY is not defined");
    }
    liveblocks = new Liveblocks({ secret });
  }
  return liveblocks;
}
__name(getLiveblocks, "getLiveblocks");

// node_modules/@liveblocks/client/dist/index.js
init_esm();
var PKG_NAME3 = "@liveblocks/client";
var PKG_VERSION3 = "3.19.0";
var PKG_FORMAT3 = "esm";
detectDupes(PKG_NAME3, PKG_VERSION3, PKG_FORMAT3);

// node_modules/ws/wrapper.mjs
init_esm();
var import_stream = __toESM(require_stream(), 1);
var import_extension = __toESM(require_extension(), 1);
var import_permessage_deflate = __toESM(require_permessage_deflate(), 1);
var import_receiver = __toESM(require_receiver(), 1);
var import_sender = __toESM(require_sender(), 1);
var import_subprotocol = __toESM(require_subprotocol(), 1);
var import_websocket = __toESM(require_websocket(), 1);
var import_websocket_server = __toESM(require_websocket_server(), 1);
var wrapper_default = import_websocket.default;

// types/canvas.ts
init_esm();
var NODE_SHAPES = [
  "rectangle",
  "diamond",
  "circle",
  "pill",
  "cylinder",
  "hexagon"
];
var NODE_COLORS = [
  { fill: "#1F1F1F", text: "#EDEDED", name: "Neutral" },
  { fill: "#10233D", text: "#52A8FF", name: "Blue" },
  { fill: "#2E1938", text: "#BF7AF0", name: "Purple" },
  { fill: "#331B00", text: "#FF990A", name: "Orange" },
  { fill: "#3C1618", text: "#FF6166", name: "Red" },
  { fill: "#3A1726", text: "#F75F8F", name: "Pink" },
  { fill: "#0F2E18", text: "#62C073", name: "Green" },
  { fill: "#062822", text: "#0AC7B4", name: "Teal" }
];

// trigger/design-agent.ts
var MODELS = [
  google("gemini-2.5-pro"),
  google("gemini-2.5-flash"),
  google("gemini-1.5-pro")
];
var ActionSchema = external_exports.discriminatedUnion("type", [
  external_exports.object({
    type: external_exports.literal("addNode"),
    id: external_exports.string(),
    shape: external_exports.enum(NODE_SHAPES),
    label: external_exports.string(),
    color: external_exports.string(),
    x: external_exports.number(),
    y: external_exports.number(),
    width: external_exports.number(),
    height: external_exports.number()
  }),
  external_exports.object({
    type: external_exports.literal("moveNode"),
    id: external_exports.string(),
    x: external_exports.number(),
    y: external_exports.number()
  }),
  external_exports.object({
    type: external_exports.literal("resizeNode"),
    id: external_exports.string(),
    width: external_exports.number(),
    height: external_exports.number()
  }),
  external_exports.object({
    type: external_exports.literal("updateNodeData"),
    id: external_exports.string(),
    label: external_exports.string().optional(),
    color: external_exports.string().optional(),
    shape: external_exports.enum(NODE_SHAPES).optional()
  }),
  external_exports.object({
    type: external_exports.literal("deleteNode"),
    id: external_exports.string()
  }),
  external_exports.object({
    type: external_exports.literal("addEdge"),
    id: external_exports.string(),
    source: external_exports.string(),
    target: external_exports.string(),
    label: external_exports.string().optional()
  }),
  external_exports.object({
    type: external_exports.literal("deleteEdge"),
    id: external_exports.string()
  })
]);
var designAgent = task({
  id: "design-agent",
  run: /* @__PURE__ */ __name(async (payload) => {
    const { prompt, roomId } = payload;
    const liveblocksNode = getLiveblocks();
    const session = liveblocksNode.prepareSession("ghost-ai", {
      userInfo: {
        name: "Ghost AI",
        avatar: "https://arch-ai.com/ghost-ai.png",
        color: "#6457f9"
      }
    });
    session.allow(roomId, session.FULL_ACCESS);
    const { body } = await session.authorize();
    const token = JSON.parse(body).token;
    const client = createClient({
      authEndpoint: /* @__PURE__ */ __name(async () => ({ token }), "authEndpoint"),
      polyfills: {
        WebSocket: wrapper_default
      }
    });
    const { room, leave } = client.enterRoom(roomId, {
      initialPresence: { cursor: null, thinking: false },
      initialStorage: {
        flow: new LiveObject({
          nodes: new LiveMap(),
          edges: new LiveMap()
        }),
        "ai-status-feed": new LiveList([]),
        "ai-chat": new LiveList([])
      }
    });
    try {
      const { root } = await room.getStorage();
      room.updatePresence({ cursor: { x: 0, y: 0 }, thinking: true });
      let statusFeed = root.get("ai-status-feed");
      if (!statusFeed) {
        root.set("ai-status-feed", new LiveList([]));
        statusFeed = root.get("ai-status-feed");
      }
      let chatFeed = root.get("ai-chat");
      if (!chatFeed) {
        root.set("ai-chat", new LiveList([]));
      }
      const addStatus = /* @__PURE__ */ __name((text, level = "info") => {
        statusFeed.push({
          text,
          level,
          timestamp: Date.now()
        });
        metadata.set("status", text);
      }, "addStatus");
      addStatus(`Ghost AI: Starting generation for "${prompt}"`);
      let flow = root.get("flow");
      if (!flow) {
        console.log("[AI_DESIGN_AGENT] Initializing root.flow Object");
        root.set("flow", new LiveObject({ nodes: new LiveMap(), edges: new LiveMap() }));
        flow = root.get("flow");
      }
      let nodesMap = flow.get("nodes");
      let edgesMap = flow.get("edges");
      console.log(`[AI_DESIGN_AGENT] Connected to room: ${roomId}`);
      addStatus(`Ghost AI: Connected to room ${roomId}. Storage ready.`, "info");
      const currentNodes = Array.from(nodesMap.entries()).map(([id, node]) => ({
        id,
        ...typeof node.toObject === "function" ? node.toObject() : node
      }));
      const currentEdges = Array.from(edgesMap.entries()).map(([id, edge]) => ({
        id,
        ...typeof edge.toObject === "function" ? edge.toObject() : edge
      }));
      console.log(`[AI_DESIGN_AGENT] Current state: ${currentNodes.length} nodes, ${currentEdges.length} edges`);
      addStatus("Ghost AI: Analyzing architecture...");
      let actions;
      let lastError;
      for (const model of MODELS) {
        try {
          console.log(`[AI_DESIGN_AGENT] Attempting generation with model...`);
          const result = await generateText({
            model,
            maxRetries: 1,
            output: output_exports.array({ element: ActionSchema }),
            system: `You are "Ghost AI", an expert system architect and visual designer.
Your goal is to design system architectures on a collaborative canvas.
You communicate by outputting a JSON array of actions that mutate the canvas.

CANVAS RULES:
- Coordinate system: (x, y). (0, 0) is the center of the viewport usually.
- Node Shapes: ${NODE_SHAPES.join(", ")}.
- Node Colors (Fill): ${NODE_COLORS.map((c) => c.fill).join(", ")}.
- Node Padding: Ensure labels have enough space.
- Connections: Use edges to show data flow or relationships.

AVAILABLE ACTIONS:
- addNode: { type: "addNode", id: string, shape: string, label: string, color: string, x: number, y: number, width: number, height: number }
- moveNode: { type: "moveNode", id: string, x: number, y: number }
- resizeNode: { type: "resizeNode", id: string, width: number, height: number }
- updateNodeData: { type: "updateNodeData", id: string, label?: string, color?: string, shape?: string }
- deleteNode: { type: "deleteNode", id: string }
- addEdge: { type: "addEdge", id: string, source: string, target: string, label?: string }
- deleteEdge: { type: "deleteEdge", id: string }

CURRENT STATE:
Nodes: ${JSON.stringify(currentNodes)}
Edges: ${JSON.stringify(currentEdges)}

INSTRUCTIONS:
1. Interpret the user's prompt carefully.
2. If they ask to "add" something, create new nodes and edges.
3. If they ask to "reorganize" or "move", use moveNode.
4. Always provide valid IDs for new elements (e.g., "node-1", "edge-1").
5. DO NOT generate an empty array if you can satisfy the request.`,
            prompt
          });
          actions = result.output;
          break;
        } catch (error3) {
          console.warn(`[AI_DESIGN_AGENT] Model failed:`, error3);
          lastError = error3;
        }
      }
      if (!actions) {
        throw lastError || new Error("All fallback models failed to generate actions.");
      }
      addStatus("Ghost AI: Applying changes to canvas...");
      const pushToChat = /* @__PURE__ */ __name((content) => {
        let chatFeed2 = root.get("ai-chat");
        if (!chatFeed2) {
          root.set("ai-chat", new LiveList([]));
          chatFeed2 = root.get("ai-chat");
        }
        chatFeed2.push({
          id: crypto.randomUUID(),
          content,
          sender: {
            id: "ghost-ai",
            name: "Ghost AI",
            avatar: "https://arch-ai.com/ghost-ai.png"
          },
          role: "assistant",
          timestamp: Date.now()
        });
      }, "pushToChat");
      const NODE_CONFIG = {
        selected: false,
        dragging: false,
        measured: false,
        resizing: false,
        position: "atomic",
        sourcePosition: "atomic",
        targetPosition: "atomic",
        extent: "atomic",
        origin: "atomic",
        handles: "atomic",
        data: "atomic"
      };
      const EDGE_CONFIG = {
        selected: false,
        markerStart: "atomic",
        markerEnd: "atomic",
        label: "atomic",
        labelBgPadding: "atomic",
        data: "atomic"
      };
      room.batch(() => {
        for (const action of actions) {
          console.log(`[AI_DESIGN_AGENT] Applying action: ${action.type}`, action);
          switch (action.type) {
            case "addNode": {
              const newNode = LiveObject.from({
                id: action.id,
                type: "canvasNode",
                position: { x: action.x, y: action.y },
                width: action.width,
                height: action.height,
                data: {
                  label: action.label,
                  shape: action.shape,
                  color: action.color,
                  width: action.width,
                  height: action.height
                }
              }, NODE_CONFIG);
              nodesMap.set(action.id, newNode);
              break;
            }
            case "moveNode": {
              const node = nodesMap.get(action.id);
              if (node && typeof node.set === "function") {
                node.set("position", { x: action.x, y: action.y });
              }
              break;
            }
            case "resizeNode": {
              const node = nodesMap.get(action.id);
              if (node && typeof node.set === "function") {
                const currentData = node.get("data");
                node.set("data", {
                  ...typeof currentData?.toObject === "function" ? currentData.toObject() : currentData,
                  width: action.width,
                  height: action.height
                });
                node.set("width", action.width);
                node.set("height", action.height);
              }
              break;
            }
            case "updateNodeData": {
              const node = nodesMap.get(action.id);
              if (node && typeof node.set === "function") {
                const currentData = node.get("data");
                const plainData = typeof currentData?.toObject === "function" ? currentData.toObject() : currentData;
                node.set("data", {
                  ...plainData,
                  ...action.label !== void 0 ? { label: action.label } : {},
                  ...action.color !== void 0 ? { color: action.color } : {},
                  ...action.shape !== void 0 ? { shape: action.shape } : {}
                });
              }
              break;
            }
            case "deleteNode":
              nodesMap.delete(action.id);
              for (const [edgeId, edge] of edgesMap.entries()) {
                const edgeObj = edge.toObject?.() || edge;
                if (edgeObj.source === action.id || edgeObj.target === action.id) {
                  edgesMap.delete(edgeId);
                }
              }
              break;
            case "addEdge": {
              const newEdge = LiveObject.from({
                id: action.id,
                source: action.source,
                target: action.target,
                type: "canvasEdge",
                animated: false,
                data: { label: action.label || "" }
              }, EDGE_CONFIG);
              edgesMap.set(action.id, newEdge);
              break;
            }
            case "deleteEdge":
              edgesMap.delete(action.id);
              break;
          }
        }
      });
      const finalNodesCount = nodesMap.size;
      const finalEdgesCount = edgesMap.size;
      addStatus(`Ghost AI: Successfully applied ${actions.length} changes. (Total: ${finalNodesCount} nodes, ${finalEdgesCount} edges)`, "success");
      pushToChat(`I've updated the canvas with ${actions.length} changes. The architecture now contains ${finalNodesCount} elements.`);
      return {
        success: true,
        actionsCount: actions.length
      };
    } catch (error3) {
      console.error("Design agent error:", error3);
      let errorMessage = error3.message || "Unknown error";
      if (NoObjectGeneratedError.isInstance(error3)) {
        errorMessage = `AI failed to generate valid canvas actions. ${error3.cause}`;
      }
      try {
        const { root } = await room.getStorage();
        const statusFeed = root.get("ai-status-feed");
        if (statusFeed) {
          statusFeed.push({
            text: `Ghost AI Error: ${errorMessage}`,
            level: "error",
            timestamp: Date.now()
          });
        }
      } catch (innerError) {
        console.error("Failed to push error status:", innerError);
      }
      throw error3;
    } finally {
      room.updatePresence({ thinking: false, cursor: null });
      await new Promise((resolve) => setTimeout(resolve, 5e3));
      leave();
    }
  }, "run")
});
export {
  designAgent
};
//# sourceMappingURL=design-agent.mjs.map
