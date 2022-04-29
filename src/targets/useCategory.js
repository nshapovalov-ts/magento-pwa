const { Targetables } = require('@magento/pwa-buildpack');

const fixCrashOnWrongFilterUrl = targets => {
    const targetables = Targetables.using(targets);

    const useCategory = targetables.esModule(
        '@magento/peregrine/lib/talons/RootComponents/Category/useCategory.js'
    );

    useCategory.insertBeforeSource(
        'newFilters[key] = getFilterInput(values, filterTypeMap.get(key));',
        `try {\n`
    );

    useCategory.insertAfterSource(
        'newFilters[key] = getFilterInput(values, filterTypeMap.get(key));',
        `\n} catch (err) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(err.message);
            }
        }`
    );
};

exports.fixCrashOnWrongFilterUrl = fixCrashOnWrongFilterUrl;
