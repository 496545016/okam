/**
 * @file Component helper
 * @author sparklewhy@gmail.com
 */

'use strict';

import {normalizeProps} from '../../helper/props';
import {normalizeMethods} from '../../helper/methods';

/**
 * The extra methods to normalize for ant env
 *
 * @const
 * @type {Array.<string>}
 */
const EXTRA_NORMALIZE_METHODS = [
    'created', 'attached', 'ready', 'detached'
];

/**
 * Normalize the component or behavior attribute names to native
 *
 * @param {Object} componentInfo the component to normalize
 * @return {Object}
 */
export function normalizeAttributeNames(componentInfo) {
    let {props} = componentInfo;

    props && (componentInfo.props = normalizeProps(props));

    return componentInfo;
}

/**
 * Normalize component definition
 *
 * @param {Object} componentInfo the component info to normalize
 * @return {Object}
 */
export function normalizeComponent(componentInfo) {
    normalizeAttributeNames(componentInfo);
    normalizeMethods(componentInfo, EXTRA_NORMALIZE_METHODS);

    return componentInfo;
}
