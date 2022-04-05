const FONTS = require('../data/fonts');

const PREFIX = '--venia-global';

/**
 * create a custom property declaration for each fonts parameter
 * these declarations *write* values to custom properties
 *
 * currently doesn't work because post-css bug translate camelCase params to kebab_case
 *
 * @param {object} data fonts palette definition data
 * @param {string} prefix custom property (variable) prefix
 *
 * @returns {object} a generated list of fonts parameters definitions based on the data
 */
const declareFonts = (data = FONTS, prefix = PREFIX) => {
    const declarations = {};

    for (const [fontParam, definition] of Object.entries(data)) {
        if (typeof definition === 'string') {
            declarations[`${prefix}-${fontParam}`] = definition;
        } else {
            for (const [param, value] of Object.entries(definition)) {
                declarations[`${prefix}-${fontParam}-${param}`] = value;
            }
        }
    }

    return declarations;
};

module.exports = { declareFonts };
