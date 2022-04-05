const ANIMATIONS = require('../data/animations');

const PREFIX = '--venia-global-anim';

/**
 * create a custom property declaration for each animation
 * these declarations *write* values to custom properties
 *
 * @param {object} data animations data
 * @param {string} prefix custom property (variable) prefix
 *
 * @returns {object} a generated list of color definitions based on the data
 */
const declareAnimations = (data = ANIMATIONS, prefix = PREFIX) => {
    const declarations = {};

    for (const [key, value] of Object.entries(data)) {
        declarations[`${prefix}-${key}`] = value;
    }

    return declarations;
};

/**
 * create functions for export to `tailwind.preset.js`
 * these functions *read* values from custom properties
 *
 * @param {object} data animations definition data
 * @param {string} prefix custom property (variable) prefix
 *
 * @returns {object} animation configuration data for tailwind
 */
const getAnimations = (data = ANIMATIONS) => data;

module.exports = { declareAnimations, getAnimations };
