import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RefreshCw, FileText, CheckCircle, AlertTriangle, ShieldAlert, TrendingUp } from 'lucide-react';
import { type AssessmentResult } from '../../logic/scoring';
import { cn } from '../../lib/utils';

export default function ResultSummary({
    result,
    assessmentCount,
    onReset
}: {
    result: AssessmentResult;
    assessmentCount: number;
    onReset: () => void;
}) {
    const chartData = [
        { subject: 'External Exposure', A: result.breakdown.exposure, fullMark: 100 },
        { subject: 'Data Sensitivity', A: result.breakdown.dataSensitivity, fullMark: 100 },
        { subject: 'Regulatory', A: result.breakdown.regulatory, fullMark: 100 },
        { subject: 'Operational Criticality', A: result.breakdown.operational, fullMark: 100 },
    ];

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'Low': return 'text-brand-lime border-brand-lime';
            case 'Medium': return 'text-yellow-400 border-yellow-400';
            case 'High': return 'text-red-500 border-red-500';
            default: return 'text-slate-200 border-slate-200';
        }
    };

    const getScoreColor = (score: number) => {
        if (score < 30) return '#a3e635'; // Lime
        if (score < 70) return '#facc15'; // Yellow
        return '#ef4444'; // Red
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold text-white mb-2">Assessment Report</h2>
                <p className="text-slate-400">Based on your firm's profile and digital footprint.</p>

                {/* Assessment Counter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full"
                >
                    <TrendingUp className="w-4 h-4 text-brand-cyan" />
                    <span className="text-sm text-brand-cyan font-medium">
                        Assessment #{assessmentCount}
                    </span>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Score Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent pointer-events-none" />
                    <div className="relative z-10 text-center">
                        <span className="text-slate-400 text-sm uppercase tracking-wider mb-2 block">Security Risk Score</span>
                        <div className={cn("text-6xl font-black mb-2", getRiskColor(result.riskLevel).split(' ')[0])}>
                            {result.score}/100
                        </div>
                        <div className={cn("inline-block px-4 py-1 rounded-full border text-sm font-bold uppercase tracking-wide", getRiskColor(result.riskLevel))}>
                            {result.riskLevel} Risk
                        </div>
                        <p className="mt-6 text-slate-400 text-sm max-w-xs mx-auto">
                            {result.riskLevel === 'High' && "Your organization has critical exposure points that require immediate attention."}
                            {result.riskLevel === 'Medium' && "You have moderate protection but gaps exist in compliance or data handling."}
                            {result.riskLevel === 'Low' && "Good baseline, but maintain vigilance with employee training."}
                        </p>
                    </div>
                </motion.div>

                {/* Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 h-[300px] flex items-center justify-center"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Risk Profile"
                                dataKey="A"
                                stroke={getScoreColor(result.score)}
                                fill={getScoreColor(result.score)}
                                fillOpacity={0.3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Recommendations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-cyan" /> Recommended Actions
                </h3>

                <div className="grid gap-4">
                    {result.recommendations.map((rec, index) => (
                        <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-start gap-4 hover:border-slate-700 transition-colors">
                            <div className={cn("p-2 rounded-lg mt-1",
                                rec.priority === 'Critical' ? "bg-red-500/10 text-red-500" :
                                    rec.priority === 'Recommended' ? "bg-brand-cyan/10 text-brand-cyan" :
                                        "bg-brand-lime/10 text-brand-lime"
                            )}>
                                {rec.priority === 'Critical' ? <ShieldAlert className="w-5 h-5" /> :
                                    rec.priority === 'Recommended' ? <AlertTriangle className="w-5 h-5" /> :
                                        <CheckCircle className="w-5 h-5" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-lg font-medium text-white">{rec.service}</h4>
                                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded uppercase",
                                        rec.priority === 'Critical' ? "bg-red-500/10 text-red-500" :
                                            rec.priority === 'Recommended' ? "bg-brand-cyan/10 text-brand-cyan" :
                                                "bg-brand-lime/10 text-brand-lime"
                                    )}>
                                        {rec.priority}
                                    </span>
                                </div>
                                <p className="text-slate-400">{rec.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="mt-12 text-center">
                <button
                    onClick={onReset}
                    className="text-slate-500 hover:text-white flex items-center gap-2 mx-auto transition-colors"
                >
                    <RefreshCw className="w-4 h-4" /> Restart Assessment
                </button>
            </div>
        </div>
    );
}
