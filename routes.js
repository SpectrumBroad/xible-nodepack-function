'use strict';

const express = require('express');

module.exports = (NODE, ROUTER) => {
  ROUTER.use('/ace-src-min-noconflict', express.static(`${__dirname}/node_modules/ace-builds/src-min-noconflict`));
};
