const { getColors } = require('./lib/colors');
const customPlugins = require('./plugins');
/**
 * This is the main tailwindcss theme file for the updated theme
 * Default theme parameters are overwritten here, if there is no parameter here
 * the default value from the venia theme is used from tokens.module.css file
 */

module.exports = {
    important: '#root',
    plugins: [customPlugins],
    theme: {
        backgroundColor: theme => theme('colors'),
        borderColor: theme => theme('colors'),
        colors: getColors(),
        fontFamily: {
            sans: ['Muli', 'sans-serif'],
            serif: ['Source Serif Pro', 'serif']
        },
        extend: {
            zIndex: {
                3: '3',
                11: '11'
            },
            spacing: {},
            gridTemplateColumns: {},
            gridTemplateRows: {
                header: '5rem'
            },
            lineHeight: {},
            maxHeight: {},
            minHeight: {
                header: '5rem'
            },
            maxWidth: {
                desktop: '1200px'
            }
        },
        transitionDuration: {}
    }
};
