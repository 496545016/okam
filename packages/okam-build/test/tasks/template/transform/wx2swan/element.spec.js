/**
 * @file The template processor test spec
 *
 * @author xiaohong8023@outlook.com
 */

'use strict';

const assert = require('assert');
const {readFile, fakeProcessorOptions} = require('../../../helper');
const wx2swanProcessor = require('okam/processor/wx2swan/index');

const syntax = require('okam/template/transform/plugins/wx2swan-syntax-plugin.js');


function readTpl(file, isExpect) {
    return readFile(
        `template/${file}`
        + (isExpect ? '.expect' : '')
        + (isExpect ? '.swan' : '.wxml')
    );
}

describe('wx2swan element tranform', function () {
    it('should wx: to s-', function () {
        const file = {
            extname: 'wxml',
            content: readTpl('element')
        };
        let result = wx2swanProcessor(file, fakeProcessorOptions([syntax]));
        assert.equal(result.content, readTpl('element', true));
    });
});
