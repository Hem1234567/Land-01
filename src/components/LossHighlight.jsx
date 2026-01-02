import React from 'react';
import { formatCurrency } from '../utils/valuationLogic';
import { TrendingDown, AlertCircle } from 'lucide-react';

const LossHighlight = ({ lossAmount, percentage }) => {
    return (
        <div className="bg-gradient-to-br from-red-900/20 to-surface border border-red-900/50 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <div className="flex items-center gap-2 text-red-400 mb-2">
                <TrendingDown size={24} />
                <span className="text-sm font-semibold uppercase tracking-wider">Hidden Wealth Loss</span>
            </div>

            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 my-2">
                {formatCurrency(lossAmount)}
            </div>

            <div className="flex items-center gap-2 mt-2 bg-red-950/50 px-3 py-1 rounded-full border border-red-900/30">
                <AlertCircle size={16} className="text-red-400" />
                <p className="text-red-200 text-sm">
                    You lost <span className="font-bold">{percentage}%</span> of your potential wealth
                </p>
            </div>
        </div>
    );
};

export default LossHighlight;
