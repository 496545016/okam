/**
 * @file Mini program view template syntax transform plugin: okam syntax -> wx syntax
 * @author sparklewhy@gmail.com
 */

'use strict';

const {createSyntaxPlugin} = require('./helper');
const transformers = require('../wx');

module.exports = createSyntaxPlugin(transformers);
