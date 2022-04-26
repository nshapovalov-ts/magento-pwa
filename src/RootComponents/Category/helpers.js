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

    const [from] = items[0].value.split('_');
    const [_, to] = items[items.length - 1].value.split('_');

    return { from, to };
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
