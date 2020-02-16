'use strict';

module.exports = (NODE, ROUTER, SERVE_STATIC) => {
  ROUTER.use('/ace-src-min-noconflict', SERVE_STATIC(`${__dirname}/node_modules/ace-builds/src-min-noconflict`));
};
