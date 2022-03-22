const { declareColors } = require('../lib/colors');
const { declareAnimations } = require('../lib/animations');

const addRulesets = ({ addBase }) => {
    addBase({
        ':root': declareColors()
    });
    addBase({
        ':root': declareAnimations()
    });
    addBase({
        ':root': {
            '--max-width-desktop': '1200px',
            '--min-heigth-header': '5rem'
        }
    });
};

const ID = 'root';
module.exports = [ID, addRulesets];
