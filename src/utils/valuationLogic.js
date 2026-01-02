/**
 * Core Valuation Logic for CLVS
 */

// Defaults
const DEFAULT_GROWTH_RATE = 0.12; // 12% Annual Land Appreciation (Reality B)
const CONSERVATIVE_RATE = 0.06;   // 6% Bank Deposit (Reality A)
const OPTIMAL_RATE = 0.15;        // 15% Strategic Reinvestment (Reality C)

/**
 * Generates the three parallel realities for the simulation.
 * 
 * @param {number} acquisitionYear - Year land was taken
 * @param {number} compensationAmount - Amount paid by govt
 * @param {number} marketValueAtAcquisition - True market value at that time
 * @param {number} currentYear - End year for simulation
 * @returns {Array} Array of data points { year, realityA, realityB, realityC }
 */
export const simulateScenarios = (
    acquisitionYear,
    compensationAmount,
    marketValueAtAcquisition,
    currentYear = new Date().getFullYear()
) => {
    const data = [];

    // Initial values
    let valA = compensationAmount;      // Reality A: Cash in hand (growing conservatively)
    let valB = marketValueAtAcquisition; // Reality B: Land if kept (market growth)
    let valC = compensationAmount;      // Reality C: Reinvested in replacement land (optimal growth)

    for (let year = acquisitionYear; year <= currentYear; year++) {
        data.push({
            year,
            realityA: Math.round(valA),
            realityB: Math.round(valB),
            realityC: Math.round(valC),
        });

        // Apply growth for next year
        valA = valA * (1 + CONSERVATIVE_RATE);
        valB = valB * (1 + DEFAULT_GROWTH_RATE);
        valC = valC * (1 + OPTIMAL_RATE);
    }

    return data;
};

/**
 * Calculates the total wealth loss.
 * Loss = Reality B (What you would have) - Reality A (What you have)
 */
export const calculateLoss = (simulationData) => {
    if (!simulationData || simulationData.length === 0) return 0;
    const lastPoint = simulationData[simulationData.length - 1];
    return lastPoint.realityB - lastPoint.realityA;
};

/**
 * Formats currency in Indian Rupee
 */
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
};
