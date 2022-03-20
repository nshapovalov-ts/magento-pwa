/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

/**
 * Added package to allow splitting targetables interceptors into separate files for each component
 * To do this, create a local-intercept.js in the folder of each intercepted component
 **/

const { ExtendLocalIntercept } = require('@larsroettig/component-targetables');
const { useSingleWishlistTarget } = require('./src/targets/wishlist');

function localIntercept(targets) {
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);

    const extendLocalIntercept = new ExtendLocalIntercept(targetables);
    extendLocalIntercept.allowCustomTargetables();
    extendLocalIntercept.allowCssOverwrites();

    useSingleWishlistTarget(targets);
}

module.exports = localIntercept;
