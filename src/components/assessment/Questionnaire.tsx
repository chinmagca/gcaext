import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Server, Briefcase, TrendingUp, CheckCircle } from 'lucide-react';
import { type AssessmentResponses, type AssessmentResult } from '../../logic/scoring';
import { calculateScoreFromConfig } from '../../logic/scoringConfig';
import { getActiveQuestionnaireConfig, type QuestionnaireConfig } from '../../config/questionnaireSelector';
import type { StepConfig } from '../../config/questionnaireConfig';
import { cn } from '../../lib/utils';
import ResultSummary from '../result/ResultSummary';

// Get active questionnaire configuration
const config: QuestionnaireConfig = getActiveQuestionnaireConfig();

// Steps definition (firm-type + config steps + result)
const STEPS = [
    'firm-type',
    ...config.steps.map(s => s.id),
    'result'
] as const;

export default function Questionnaire() {
    const [currentStep, setCurrentStep] = useState<typeof STEPS[number]>('firm-type');
    const [answers, setAnswers] = useState<Partial<AssessmentResponses>>({});
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [assessmentCount, setAssessmentCount] = useState(0);
    const hasIncrementedRef = useRef(false);

    useEffect(() => {
        // Increment assessment count only once (prevent double increment in StrictMode)
        if (!hasIncrementedRef.current) {
            hasIncrementedRef.current = true;
            const currentCount = parseInt(localStorage.getItem('gca_assessment_count') || '0', 10);
            const newCount = currentCount + 1;
            localStorage.setItem('gca_assessment_count', newCount.toString());
            setAssessmentCount(newCount);
        }
    }, []);

    const handleNext = (data: Partial<AssessmentResponses>) => {
        const newAnswers = { ...answers, ...data };
        setAnswers(newAnswers);

        const currentIndex = STEPS.indexOf(currentStep);
        const nextIndex = currentIndex + 1;

        if (nextIndex < STEPS.length - 1) {
            // Move to next step
            setCurrentStep(STEPS[nextIndex]);
        } else {
            // Last step - calculate results
            const finalResult = calculateScoreFromConfig(newAnswers as AssessmentResponses, config);
            setResult(finalResult);
            setCurrentStep('result');
        }
    };

    if (currentStep === 'result' && result) {
        return <ResultSummary result={result} assessmentCount={assessmentCount} onReset={() => window.location.reload()} />;
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            {/* Assessment Counter Badge */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex justify-end"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-cyan" />
                    <span className="text-xs text-brand-cyan font-medium">
                        Assessment #{assessmentCount}
                    </span>
                </div>
            </motion.div>

            <div className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-brand-cyan mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="uppercase tracking-wider font-semibold">GCA Assessment Tool</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    {currentStep === 'firm-type' ? "Let's start with the basics." :
                        config.steps.find(s => s.id === currentStep)?.title || ''}
                </h1>
                <p className="text-slate-400">
                    {currentStep === 'firm-type' ? "Select the category that best describes your organization." :
                        config.steps.find(s => s.id === currentStep)?.description || ''}
                </p>
            </div>

            <AnimatePresence mode="wait">
                {currentStep === 'firm-type' && (
                    <FirmTypeStep key="firm-type" onNext={handleNext} />
                )}
                {config.steps.map(step => (
                    currentStep === step.id && (
                        <GenericQuestionStep
                            key={step.id}
                            stepConfig={step}
                            onNext={handleNext}
                            isLastStep={STEPS.indexOf(currentStep) === STEPS.length - 2}
                        />
                    )
                ))}
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

// Generic step component that renders questions from configuration
function GenericQuestionStep({
    stepConfig,
    onNext,
    isLastStep
}: {
    stepConfig: StepConfig;
    onNext: (data: Partial<AssessmentResponses>) => void;
    isLastStep: boolean;
}) {
    const [selection, setSelection] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        stepConfig.questions.forEach(q => {
            initial[q.id] = false;
        });
        return initial;
    });

    const toggle = (key: string) => {
        setSelection(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
        >
            {stepConfig.questions.map(question => (
                <ToggleCard
                    key={question.id}
                    title={question.title}
                    description={question.description}
                    icon={question.icon}
                    checked={selection[question.id]}
                    onChange={() => toggle(question.id)}
                />
            ))}

            <div className="pt-6 flex justify-end">
                <button
                    onClick={() => onNext(selection as Partial<AssessmentResponses>)}
                    className="bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors"
                >
                    {isLastStep ? 'View Analysis' : 'Continue'} <ArrowRight className="w-4 h-4" />
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
