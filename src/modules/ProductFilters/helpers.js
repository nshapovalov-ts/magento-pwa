export const getPriceFromSearch = initialValue => {
    const params = new URLSearchParams(initialValue);
    const uniqueKeys = new Set(params.keys());
    const item = new Set();
    for (const key of uniqueKeys) {
        if (key.startsWith('price') && key.endsWith('[filter]')) {
            for (const value of params.getAll(key)) {
                const [first, second] = value.split(',');
                const priceItem = { title: first, value: second };

                item.add(priceItem);
            }
        }
    }

    return item;
};

export const getRangeFromFilterItems = items => {
    if (!Array.isArray(items) || items.length === 0) {
        return {};
    }

    const [min] = items[0].value.split('_');
    const [_, max] = items[items.length - 1].value.split('_');

    return { minValue: parseInt(min), maxValue: parseInt(max) };
};

export const getPriceValuesFromFilterState = filterState => {
    if (!filterState || !filterState.size) {
        return null;
    }

    try {
        const rangeString = Array.from(filterState)[0].value;

        const [from, to] = rangeString.split('_');

        return { from, to };
    } catch (e) {
        return null;
    }
};

export const getFilterLabelText = ({ defaultTitle, groupName }) => {
    if (defaultTitle === '0') {
        return 'No';
    }
    if (defaultTitle === '1') {
        return groupName || 'Yes';
    }

    return defaultTitle;
};

// All filters except yes/no displays to top
export const getTopFilters = filters => {
    const topFilters = new Map(filters);
    topFilters.forEach((item, key) => {
        if (['0', '1'].includes(item[0].title)) {
            topFilters.delete(key);
        }
    });

    return topFilters;
};

export const getSidebarFilters = filters => {
    const sidebar = new Map();

    filters.forEach((item, key) => {
        if (['0', '1'].includes(item[0].title) && item.length !== 1) {
            sidebar.set(key, item);
        }
    });

    return sidebar;
};

export const getCategoryFilters = filters => {
    const categoryFilters = filters.get('category_id');

    return categoryFilters;
};
