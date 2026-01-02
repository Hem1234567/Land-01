import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../utils/valuationLogic';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-surface border border-gray-700 p-4 rounded-lg shadow-xl">
                <p className="text-gray-400 mb-2">Year: <span className="text-white font-bold">{label}</span></p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
                        {entry.name}: {formatCurrency(entry.value)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const InteractiveGraph = ({ data }) => {
    return (
        <div className="w-full h-[400px] bg-surface rounded-xl p-4 border border-gray-800 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-200 mb-4 pl-4">Restoring the Timeline</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
                    <XAxis
                        dataKey="year"
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                        axisLine={{ stroke: '#4b5563' }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                        tickFormatter={(value) => `₹${value / 100000}L`}
                        axisLine={{ stroke: '#4b5563' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />

                    <Line
                        type="monotone"
                        dataKey="realityA"
                        name="Reality A: Actual (Comp.)"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="realityB"
                        name="Reality B: Market Growth"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="realityC"
                        name="Reality C: Optimal Recovery"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InteractiveGraph;
