const { declareColors } = require('../lib/colors');
const { declareAnimations } = require('../lib/animations');
const { declareFonts } = require('../lib/fonts');

const addRulesets = ({ addBase }) => {
    addBase({
        ':root': declareColors()
    });
    addBase({
        ':root': declareAnimations()
    });
    addBase({
        ':root': declareFonts()
    });
    addBase({
        ':root': {
            '--venia-global-maxWidth': '1200px',
            '--venia-global-header-minHeight': '5rem'
        }
    });
};

const ID = 'root';
module.exports = [ID, addRulesets];
