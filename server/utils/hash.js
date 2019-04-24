const crypto = require("crypto");
function hashFactory(type) {
  return function(str) {
    if (typeof str !== "string") {
      str += "";
    }
    let hash = crypto.createHash(type);
    hash.update(str);
    return hash.digest("hex");
  };
}
exports.md5 = hashFactory("md5");
exports.sha256 = hashFactory("sha256");
