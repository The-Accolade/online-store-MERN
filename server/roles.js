const AccessControl = require('accesscontrol');

const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('basic').createOwn('Product').readAny('Product');

  ac.grant('admin').extend('basic').updateAny('Product').deleteAny('Product');

  return ac;
})();
