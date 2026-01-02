import React, { useState, useEffect } from 'react';
import InteractiveGraph from './InteractiveGraph';
import LossHighlight from './LossHighlight';
import { simulateScenarios, calculateLoss } from '../utils/valuationLogic';
import { MOCK_ACQUISITIONS } from '../data/syntheticData';
import { Layers, Activity, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
    // State
    const [selectedScenario, setSelectedScenario] = useState(MOCK_ACQUISITIONS[0]);
    const [simulationData, setSimulationData] = useState([]);
    const [loss, setLoss] = useState(0);

    // Update simulation when scenario changes
    useEffect(() => {
        const data = simulateScenarios(
            selectedScenario.year,
            selectedScenario.compensation,
            selectedScenario.marketValue
        );
        setSimulationData(data);
        setLoss(calculateLoss(data));
    }, [selectedScenario]);

    return (
        <div className="min-h-screen bg-background text-white p-8 font-sans">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Counterfactual Land Valuation System
                    </h1>
                    <p className="text-gray-400 mt-1">Quantifying forced acquisition loss & simulating recovery pathts.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-gray-800">
                        <Layers size={18} className="text-emerald-400" />
                        <span className="text-sm font-medium">Scenario: {selectedScenario.project}</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Controls & Stats */}
                <div className="space-y-6">
                    <section className="bg-surface rounded-xl p-6 border border-gray-800">
                        <h2 className="text-lg font-semibold mb-4 text-gray-200 flex items-center gap-2">
                            <Activity size={20} className="text-blue-400" />
                            Acquisition Parameters
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Select Case Study</label>
                                <select
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={selectedScenario.id}
                                    onChange={(e) => {
                                        const id = parseInt(e.target.value);
                                        setSelectedScenario(MOCK_ACQUISITIONS.find(s => s.id === id));
                                    }}
                                >
                                    {MOCK_ACQUISITIONS.map(s => (
                                        <option key={s.id} value={s.id}>
                                            {s.project} ({s.year})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                                <label className="block text-sm text-gray-400 mb-2 flex justify-between">
                                    <span>Acquisition Year</span>
                                    <span className="text-emerald-400 font-mono">{selectedScenario.year}</span>
                                </label>
                                <input
                                    type="range"
                                    min="2000"
                                    max="2024"
                                    value={selectedScenario.year}
                                    onChange={(e) => setSelectedScenario({ ...selectedScenario, year: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>2000</span>
                                    <span>2024</span>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400 text-sm">Original Compensation</span>
                                    <span className="font-mono text-emerald-400">₹{selectedScenario.compensation.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">True Market Value</span>
                                    <span className="font-mono text-blue-400">₹{selectedScenario.marketValue.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <LossHighlight
                        lossAmount={loss}
                        percentage={Math.round((loss / (selectedScenario.marketValue * Math.pow(1.12, 2024 - selectedScenario.year))) * 100) || 50}
                    />
                </div>

                {/* Right Column: Visualization */}
                <div className="lg:col-span-2 space-y-6">
                    <InteractiveGraph data={simulationData} />

                    {/* Key Insights / Recovery Intelligence Placeholder */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface p-5 rounded-xl border border-gray-800 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldCheck size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-gray-200">Fairness Audit</h3>
                            </div>
                            <p className="text-sm text-gray-400">
                                Compare your compensation against verified peers in the region.
                            </p>
                        </div>
                        <div className="bg-surface p-5 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3 mb-2">
                                <Activity size={24} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-gray-200">Recovery Intelligence</h3>
                            </div>
                            <p className="text-sm text-gray-400">
                                Identify high-growth alternative parcels to recover lost wealth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
