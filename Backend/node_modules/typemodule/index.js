'use strict';

const dirname = (__dirname.replace('/node_modules/typemodule', '')).replace('\\node_modules\\typemodule', '');

module.exports.__dirname = dirname;
