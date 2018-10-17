/**
 * @file Test helper
 * @author sparklewhy@gmail.com
 */

'use strict';

const path = require('path');
const fs = require('fs');
const logger = require('okam/util').logger;

const initBuildOption = require('okam/build/init-build-options');
const swanSyntax = require('okam/template/transform/plugins/swan-syntax-plugin.js');
const wxSyntax = require('okam/template/transform/plugins/wx-syntax-plugin.js');
const html = require('okam/template/transform/plugins/html-plugin.js');
const ref = require('okam/template/transform/plugins/ref-plugin.js');

const defaultTags = {
    view: ['div', 'p', 'span'],
    navigator: {
        tag: 'a',
        href: 'url'
    },
    image: 'img'
};

/**
 * 构造模板标签配置
 * 将用户的  transformTags: {
 *             view: ['div', 'p', 'span'],
 *              navigator: {
 *                  tag: 'a',
 *                  href: 'url'
 *              },
 *              image: 'img'
 *          }
 * 转化为  transformTags: {
 *              div: 'view',
 *              p:  'view',
 *              span: 'view',
 *              a: {
 *                  tag:'navigator',
 *                  url:'href'
 *              },
 *              img:'image'
 *        }
 *
 * @param {Object} tagNames 用户标签配置
 * @param {string} appType  小程序类型
 * @return {Object} 构建标签配置
 */
function fakeTemplateTagOptions(tagNames, appType) {
    const templateConf = {
        component: {
            template: {
                transformTags: tagNames
            }
        }
    };
    const config = initBuildOption(appType, templateConf, {});
    return config.component.template;
}

/**
 * 获取默认的swan插件配置，使用函数形式避免缓存
 *
 * @return {Object} plugins config 默认swan的syntax-plugin,html-plugin,ref-plugin
 */
const getDefaultPlugins = function () {
    return [
        swanSyntax,
        html,
        ref
    ];
};

/**
 * 获取默认的swan插件配置，使用函数形式避免缓存
 *
 * @return {Object} plugins config
 */
const getDefaultWXPlugins = function () {
    return [
        wxSyntax,
        html,
        ref
    ];
};

/**
 * 构造模板解析器的配置
 *
 * @param {Object} tagNames  标签配置
 * @param {Object} myPlugins 处理器插件, 默认 swan的syntax-plugin,html-plugin,ref-plugin
 * @param {string} appType 小程序类型
 * @return {Object} 返回配置
 */
const fakeProcessorOptions = function (tagNames = defaultTags, myPlugins, appType = 'swan') {
    const initConfig = initBuildOption(appType, {}, {});

    let plugins = myPlugins ? myPlugins
        : (appType === 'wx' ? getDefaultWXPlugins() : getDefaultPlugins());

    return {
        appType,
        logger: logger.create({
            prefix: 'okam',
            level: 'debug'
        }),
        root: path.join(__dirname, '..'),
        config: {
            template: fakeTemplateTagOptions(tagNames, appType),
            plugins
        },
        output: initConfig.output
    };
};

exports.fakeProcessorOptions = fakeProcessorOptions;

exports.readFile = function (filePath) {
    return fs.readFileSync(path.join(__dirname, '../fixtures', filePath)).toString();
};

exports.writeFile = function (data, filePath) {
    fs.writeFileSync(path.join(__dirname, '../fixtures', filePath), data);
};
