
module.exports = function () {
  var browsers = ['Chrome'];
  var port = 9876;
  var config;
  if (process.env.C9) {
    browsers = ['PhantomJS'];
  }
  if (process.env.IP) {
    var hostname = process.env.IP;
  }
  if (process.env.PORT) {
    port = process.env.PORT;
  }
  config = {
    browsers: browsers,
    hostname: hostname,
    port: port,
  };
  
  console.log(config);
  return config;
};