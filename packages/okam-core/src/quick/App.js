/**
 * @file Create quick app instance
 * @author sparklewhy@gmail.com
 */

'use strict';

import createApp from '../App';
import appBase from './base/application';
import extendApi from './api';

export default createApp(appBase, extendApi);
