const getRangePercentsForStyle = ({
    currentMin = 0,
    currentMax = 100,
    minValue = 0,
    maxValue = 100
}) => {
    const leftPercent = (((currentMin - minValue) / (maxValue - minValue)) * 100).toFixed(2);
    const rightPercent = ((currentMax / maxValue) * 100).toFixed(2);

    return { left: leftPercent, right: rightPercent };
};

export const getSliderBackground = ({ currentMin, currentMax, minValue, maxValue }) => {
    const { left, right } = getRangePercentsForStyle({
        currentMin,
        currentMax,
        minValue,
        maxValue
    });

    return `linear-gradient(to right, 
    rgb(var(--venia-global-color-gray-300)) ${left}%, 
    rgb(var(--venia-global-color-orange)) ${left}%, 
    rgb(var(--venia-global-color-orange)) ${right}%, 
    rgb(var(--venia-global-color-gray-300)) ${right}%)`;
};
