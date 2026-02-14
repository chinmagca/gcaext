import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield, Lock, Activity, BarChart3, CheckCircle2 } from 'lucide-react';
import { Slide, SlideContent } from './presentation/Slide';
import { cn } from '../lib/utils';

// Placeholder images (can be replaced with generated ones when available)
const IMAGES = {
    market: "/assets/images/market_sizes.png",
    houses: "/assets/images/locked_houses.png",
    health: "/assets/images/health_checkup_comparison_v2.png",
    assessment: "/assets/images/cyber_assessment_comparison_v2.png",
    coverage: "/assets/images/assessment_coverage_v2.svg"
};

export default function SalesPresentation() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 6;

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) setCurrentSlide(curr => curr + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    return (
        <div className="fixed inset-0 bg-slate-950 text-slate-100 overflow-hidden z-[100]">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-cyan/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <AnimatePresence mode="wait">
                {currentSlide === 0 && (
                    <Slide key="hero" isActive={currentSlide === 0}>
                        <div className="flex flex-col items-center justify-center text-center gap-8 h-full">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-brand-cyan/20 blur-3xl rounded-full" />
                                <Shield className="w-24 h-24 text-brand-cyan relative z-10 mx-auto mb-6" />
                                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                                    Democratizing <br />
                                    <span className="text-brand-cyan">Cybersecurity</span>
                                </h1>
                            </motion.div>

                            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed">
                                Bringing enterprise-grade security posture assessment to every business, regardless of size.
                            </p>

                            <motion.button
                                onClick={nextSlide}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8 px-8 py-4 bg-brand-cyan text-slate-950 font-bold rounded-full text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-shadow"
                            >
                                Start the Journey
                            </motion.button>
                        </div>
                    </Slide>
                )}

                {currentSlide === 1 && (
                    <Slide key="market" isActive={currentSlide === 1}>
                        <SlideContent
                            title="Every Business is a Target"
                            subtitle="The digital landscape doesn't discriminate based on size."
                            image={IMAGES.market}
                            imageAlt="Market sizes comparison"
                        >
                            <div className="space-y-6 text-slate-300">
                                <p>
                                    Just as a city has skyscrapers, office buildings, and small shops, the digital world is populated by businesses of all sizes.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500 mt-1">
                                            <BarChart3 size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">Large Enterprises</h4>
                                            <p className="text-sm text-slate-400">Often have fortified defenses.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 mt-1">
                                            <Activity size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">MSMEs</h4>
                                            <p className="text-sm text-slate-400">Often the most vulnerable targets due to lack of resources.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </SlideContent>
                    </Slide>
                )}

                {currentSlide === 2 && (
                    <Slide key="security" isActive={currentSlide === 2}>
                        <SlideContent
                            title="Security is a Universal Need"
                            subtitle="Intensity and timing may change, but the need for protection is constant."
                            image={IMAGES.houses}
                            imageAlt="Locked houses analogy"
                        >
                            <div className="space-y-6 text-slate-300">
                                <p>
                                    Think of it like locking your doors.
                                </p>
                                <p>
                                    Whether you live in a massive estate, a suburban home, or a small apartment,
                                    <span className="text-brand-cyan font-bold"> you still lock your front door.</span>
                                </p>
                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                        <Lock className="text-brand-cyan" size={20} />
                                        The Reality
                                    </h4>
                                    <p className="text-slate-400">
                                        Small businesses often leave their digital doors wide open, not because they don't care, but because they believe security is a luxury.
                                    </p>
                                </div>
                            </div>
                        </SlideContent>
                    </Slide>
                )}

                {currentSlide === 3 && (
                    <Slide key="health-analogy" isActive={currentSlide === 3}>
                        <SlideContent
                            title="The Health Checkup Paradox"
                            subtitle="Why do small businesses skip the checkup?"
                            image={IMAGES.health}
                            imageAlt="Health checkup comparison"
                        >
                            <div className="space-y-6 text-slate-300">
                                <p>
                                    Every human needs a health checkup. But small business owners often skip comprehensive "Master Health Checkups" because they are:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                    <li>Too expensive</li>
                                    <li>Overwhelmingly complex</li>
                                    <li>Fear of "post-assessment revelation" (bad news they can't afford to fix)</li>
                                </ul>
                                <div className="mt-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">The Solution:</h3>
                                    <p className="text-brand-cyan text-xl font-medium">
                                        "Primary Health Checkup LITE"
                                    </p>
                                    <p className="text-slate-400">
                                        Affordable. Essential. Actionable.
                                    </p>
                                </div>
                            </div>
                        </SlideContent>
                    </Slide>
                )}

                {currentSlide === 4 && (
                    <Slide key="solution" isActive={currentSlide === 4}>
                        <SlideContent
                            title="Primary Cybersecurity Posture Assessment"
                            subtitle="Disrupting the market with accessibility."
                            image={IMAGES.assessment}
                            imageAlt="Cyber assessment comparison"
                        >
                            <div className="space-y-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <div className="relative bg-slate-900 border border-slate-700/50 p-8 rounded-xl">
                                        <div className="flex justify-between items-end mb-4">
                                            <h3 className="text-3xl font-bold text-white">Flat Rate</h3>
                                            <div className="text-right">
                                                <span className="text-4xl font-bold text-brand-cyan">₹5,000</span>
                                                <span className="text-slate-500 text-sm block">INR / Assessment</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-300">
                                            We've stripped away the "fluff" of enterprise auditing to provide exactly what MSMEs need to know to stay safe.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg text-slate-300">
                                    This isn't just a service; it's an inclusion movement. We are bringing cybersecurity to the 99%.
                                </p>
                            </div>
                        </SlideContent>
                    </Slide>
                )}

                {currentSlide === 5 && (
                    <Slide key="coverage" isActive={currentSlide === 5}>
                        <SlideContent
                            title="What's Covered?"
                            subtitle="The essentials for a secure digital posture."
                            image={IMAGES.coverage}
                            imageAlt="Assessment coverage"
                            layout="center"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl mt-8">
                                {[
                                    { icon: Shield, title: "Vuln Scan", desc: "External IP Check" },
                                    { icon: Lock, title: "Policy Review", desc: "Basic Access Control" },
                                    { icon: Activity, title: "Awareness", desc: "Phishing Readiness" },
                                    { icon: CheckCircle2, title: "Device Security", desc: "Endpoint Basics" },
                                    { icon: BarChart3, title: "Backup Check", desc: "Recovery Readiness" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-brand-cyan/50 hover:bg-slate-800/50 transition-colors group"
                                    >
                                        <item.icon className="w-10 h-10 text-brand-cyan mb-4 group-hover:scale-110 transition-transform" />
                                        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 flex gap-4">
                                <button
                                    onClick={() => setCurrentSlide(0)}
                                    className="px-6 py-3 border border-slate-700 hover:border-brand-cyan text-slate-300 hover:text-white rounded-full transition-colors"
                                >
                                    Restart Presentation
                                </button>
                                <button className="px-8 py-3 bg-brand-cyan text-slate-950 font-bold rounded-full hover:bg-brand-cyan/90 transition-colors">
                                    Contact Sales
                                </button>
                            </div>
                        </SlideContent>
                    </Slide>
                )}
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 flex gap-2 z-[110]">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur rounded-full disabled:opacity-30 transition-colors"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    className="p-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur rounded-full disabled:opacity-30 transition-colors"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>

            {/* Progress Indicator */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[110]">
                {Array.from({ length: totalSlides }).map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={cn(
                            "w-2 h-2 rounded-full cursor-pointer transition-all duration-300",
                            currentSlide === i ? "bg-brand-cyan h-8" : "bg-slate-700 hover:bg-slate-500"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
