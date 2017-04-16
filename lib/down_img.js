var http = require('http');
var fs = require('fs');
var request = require('request');

function Mzitu(options) {
  this.id = 1;

  this.initialize.call(this, options);
  return this;
}

Mzitu.prototype = {
  constructor: Mzitu,
  initialize: function _initialize(options) {
    this.baseUrl = options.baseUrl;
    this.dir = options.dir || '';
    this.reg = options.reg;
    this.total = options.total;
    this.page = options.from || 1;
  },
  start: function _start() {
      var res = [];
      var url = 'http://img.diercun.com/hdmvs/Fetishkorea/MD-629/fk14_0619_0**.jpg';
      var url = 'http://tu.ppfzl.com/hdmvs/Fetishkorea/MD-629/fk14_0619_0**.jpg';
      var url = 'http://www.leg188.com/leg/upfile/2015-5/NO.157008-Leg188.com-dch-0**.jpg';
    for(var i = 1; i<= 38; i++){
        res.push(url.replace('**',i < 10 ? ('0' + i) : i));
      }
      console.log(res)
      this.download(res);
  },


  download: function _download(resource) {
    var self = this,
      currentPage = self.page;

    resource.forEach(function (src, idx) {
        setTimeout(function(){
            var filename = src.substring(src.lastIndexOf('/') + 1),
                writestream = fs.createWriteStream(self.dir + filename);

            var options = {
                url: src,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                }
            };

            return request(options).pipe(writestream);
        }, 1000);

  });
}

};
var mzitu = new Mzitu({
  baseUrl: 'http://img.diercun.com/hdmvs/Fetishkorea/MD-629/fk14_0619_0**.jpg',
  dir: 'a/',
  total: 82,
  from: 1
});
 
mzitu.start();