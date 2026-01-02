/**
 * Synthetic Data Generator for CLVS
 */

export const generateMarketHistory = (startYear = 2000, endYear = 2024) => {
    const history = [];
    let currentPrice = 500; // Base price per sqft

    for (let year = startYear; year <= endYear; year++) {
        // Add some random variance to growth (5% to 20%)
        const growth = 0.05 + Math.random() * 0.15;
        currentPrice = currentPrice * (1 + growth);

        history.push({
            year,
            avgPrice: Math.round(currentPrice),
            location: 'Sector 42, Growth Corridor'
        });
    }
    return history;
};

export const MOCK_ACQUISITIONS = [
    { id: 1, year: 2010, project: 'Highway Expansion #44', compensation: 2500000, marketValue: 4000000, owner: 'Farmer A' },
    { id: 2, year: 2015, project: 'Industrial Zone Beta', compensation: 5000000, marketValue: 7500000, owner: 'Landowner B' },
    { id: 3, year: 2018, project: 'Airport Link Road', compensation: 8000000, marketValue: 11000000, owner: 'Estate C' },
];

export const RECOVERY_ZONES = [
    { id: 1, name: 'Western Periphery', currentPrice: 1200, growthPotential: 'High', risk: 'Low' },
    { id: 2, name: 'Southern Extension', currentPrice: 1150, growthPotential: 'Medium', risk: 'Medium' },
    { id: 3, name: 'New Township Block C', currentPrice: 1300, growthPotential: 'High', risk: 'Low' },
];
