export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

export const formatPercent = (percent: number): string => {
    const sign = percent > 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
};

export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
        notation: "compact",
        compactDisplay: "short"
    }).format(num);
};
