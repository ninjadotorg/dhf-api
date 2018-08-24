var data = "do shash'owania";
var crypto = require('crypto');
const abc = crypto.createHash('md5').update(data).digest("hex");
console.log(crypto, abc);
