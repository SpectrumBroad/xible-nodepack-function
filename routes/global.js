'use strict';

module.exports = (ROUTER, SERVE_STATIC) => {
  ROUTER.use(
    '/ace-src-min-noconflict',
    SERVE_STATIC(`${__dirname}/../node_modules/ace-builds/src-min-noconflict`)
  );
};
