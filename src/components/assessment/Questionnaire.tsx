import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Server, Briefcase, Globe, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { calculateScore, type AssessmentResponses, type AssessmentResult } from '../../logic/scoring';
import { cn } from '../../lib/utils';
import ResultSummary from '../result/ResultSummary';

// Steps definition
const STEPS = [
    'firm-type',
    'digital-footprint',
    'risk-factors',
    'result'
] as const;

export default function Questionnaire() {
    const [currentStep, setCurrentStep] = useState<typeof STEPS[number]>('firm-type');
    const [answers, setAnswers] = useState<Partial<AssessmentResponses>>({});
    const [result, setResult] = useState<AssessmentResult | null>(null);

    const handleNext = (data: Partial<AssessmentResponses>) => {
        const newAnswers = { ...answers, ...data };
        setAnswers(newAnswers);

        if (currentStep === 'firm-type') {
            setCurrentStep('digital-footprint');
        } else if (currentStep === 'digital-footprint') {
            // Check if any digital presence
            const hasPresence = data.usesEmail || data.usesDigitalPayments || data.hasWebsiteOrApp;
            if (!hasPresence) {
                // Skip to end with 0 score
                const finalResult = calculateScore({ ...newAnswers, hasPublicIPs: false } as AssessmentResponses);
                setResult(finalResult);
                setCurrentStep('result');
            } else {
                setCurrentStep('risk-factors');
            }
        } else if (currentStep === 'risk-factors') {
            const finalResult = calculateScore(newAnswers as AssessmentResponses);
            setResult(finalResult);
            setCurrentStep('result');
        }
    };

    if (currentStep === 'result' && result) {
        return <ResultSummary result={result} onReset={() => window.location.reload()} />;
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <div className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-brand-cyan mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="uppercase tracking-wider font-semibold">GCA Assessment Tool</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    {currentStep === 'firm-type' && "Let's start with the basics."}
                    {currentStep === 'digital-footprint' && "Identify your digital footprint."}
                    {currentStep === 'risk-factors' && "Assess your risk exposure."}
                </h1>
                <p className="text-slate-400">
                    {currentStep === 'firm-type' && "Select the category that best describes your organization."}
                    {currentStep === 'digital-footprint' && "Select all that apply to your daily operations."}
                    {currentStep === 'risk-factors' && "Help us understand your operational risks."}
                </p>
            </div>

            <AnimatePresence mode="wait">
                {currentStep === 'firm-type' && (
                    <FirmTypeStep key="firm-type" onNext={handleNext} />
                )}
                {currentStep === 'digital-footprint' && (
                    <DigitalFootprintStep key="digital-footprint" onNext={handleNext} />
                )}
                {currentStep === 'risk-factors' && (
                    <RiskFactorsStep key="risk-factors" onNext={handleNext} />
                )}
            </AnimatePresence>
        </div>
    );
}

function FirmTypeStep({ onNext }: { onNext: (data: Partial<AssessmentResponses>) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <button
                onClick={() => onNext({ firmType: 'IT' })}
                className="group relative p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-brand-cyan transition-all text-left"
            >
                <Server className="w-8 h-8 text-brand-cyan mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">IT & Tech Services</h3>
                <p className="text-slate-400 text-sm">Software dev, SaaS, MSP, or digital-first businesses.</p>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-brand-cyan" />
                </div>
            </button>

            <button
                onClick={() => onNext({ firmType: 'Non-IT' })}
                className="group relative p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-brand-lime transition-all text-left"
            >
                <Briefcase className="w-8 h-8 text-brand-lime mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Manufacturing & Operations</h3>
                <p className="text-slate-400 text-sm">Retail, Manufacturing, Logistics, Healthcare, etc.</p>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-brand-lime" />
                </div>
            </button>
        </motion.div>
    );
}

function DigitalFootprintStep({ onNext }: { onNext: (data: Partial<AssessmentResponses>) => void }) {
    const [selection, setSelection] = useState({
        usesEmail: false,
        usesDigitalPayments: false,
        hasWebsiteOrApp: false,
    });

    const toggle = (key: keyof typeof selection) => {
        setSelection(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
        >
            <ToggleCard
                title="We use Business Email"
                description="Employees use email for internal or external communication."
                icon={Server}
                checked={selection.usesEmail}
                onChange={() => toggle('usesEmail')}
            />
            <ToggleCard
                title="We accept Digital Payments"
                description="UPI, Netbanking, Credit Cards, or Payment Gateways."
                icon={Lock}
                checked={selection.usesDigitalPayments}
                onChange={() => toggle('usesDigitalPayments')}
            />
            <ToggleCard
                title="We have a Website or Mobile App"
                description="A public-facing platform for customers or clients."
                icon={Globe}
                checked={selection.hasWebsiteOrApp}
                onChange={() => toggle('hasWebsiteOrApp')}
            />

            <div className="pt-6 flex justify-end">
                <button
                    onClick={() => onNext(selection)}
                    className="bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors"
                >
                    Continue <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}

function RiskFactorsStep({ onNext }: { onNext: (data: Partial<AssessmentResponses>) => void }) {
    const [selection, setSelection] = useState({
        hasPublicIPs: false,
        storesCustomerData: false,
        remoteWork: false,
        regulatoryMandates: false,
        criticalDowntime: false,
    });

    const toggle = (key: keyof typeof selection) => {
        setSelection(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
        >
            <ToggleCard
                title="Publicly Exposed Servers (IPs)"
                description="Do you host servers that are accessible from the internet?"
                icon={Globe}
                checked={selection.hasPublicIPs}
                onChange={() => toggle('hasPublicIPs')}
            />
            <ToggleCard
                title="Store Sensitive Customer Data"
                description="Do you store PII, Financial Records, or Health Data?"
                icon={Lock}
                checked={selection.storesCustomerData}
                onChange={() => toggle('storesCustomerData')}
            />
            <ToggleCard
                title="Remote Work / VPN Access"
                description="Do employees access systems from outside the office?"
                icon={Server}
                checked={selection.remoteWork}
                onChange={() => toggle('remoteWork')}
            />
            <ToggleCard
                title="Regulatory Compliance"
                description="Are you required to follow ISO, RBI, HIPAA, or GDPR norms?"
                icon={Shield}
                checked={selection.regulatoryMandates}
                onChange={() => toggle('regulatoryMandates')}
            />
            {/* Show Operational Dependency mainly for Non-IT or both */}
            <ToggleCard
                title="Critical Uptime Dependency"
                description="Does 1 hour of downtime cost you significant revenue?"
                icon={AlertTriangle}
                checked={selection.criticalDowntime}
                onChange={() => toggle('criticalDowntime')}
            />

            <div className="pt-6 flex justify-end">
                <button
                    onClick={() => onNext(selection)}
                    className="bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors"
                >
                    View Analysis <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}

function ToggleCard({ title, description, icon: Icon, checked, onChange }: any) {
    return (
        <div
            onClick={onChange}
            className={cn(
                "cursor-pointer p-4 rounded-xl border transition-all flex items-start gap-4",
                checked
                    ? "bg-slate-900 border-brand-cyan shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
            )}
        >
            <div className={cn(
                "p-2 rounded-lg",
                checked ? "bg-brand-cyan/20 text-brand-cyan" : "bg-slate-900 text-slate-500"
            )}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h3 className={cn("font-medium", checked ? "text-white" : "text-slate-300")}>{title}</h3>
                    {checked && <CheckCircle className="w-5 h-5 text-brand-cyan" />}
                </div>
                <p className="text-sm text-slate-500 mt-1">{description}</p>
            </div>
        </div>
    );
}
