import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface SlideProps {
    children: ReactNode;
    className?: string;
    isActive?: boolean;
}

export const Slide = ({ children, className, isActive = true }: SlideProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 20,
                pointerEvents: isActive ? 'auto' : 'none'
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "w-full h-screen flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden",
                className
            )}
        >
            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full justify-center">
                {children}
            </div>
        </motion.div>
    );
};

interface SlideContentProps {
    title: string;
    subtitle?: string;
    image?: string;
    imageAlt?: string;
    children?: ReactNode;
    layout?: 'split' | 'center' | 'full';
}

export const SlideContent = ({
    title,
    subtitle,
    image,
    imageAlt,
    children,
    layout = 'split'
}: SlideContentProps) => {
    if (layout === 'center') {
        return (
            <div className="flex flex-col items-center text-center gap-8">
                <div className="space-y-4 max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
                {image && (
                    <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-brand-cyan/10 border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
                    </div>
                )}
                {children}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 order-2 lg:order-1">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className="prose prose-invert prose-lg">
                    {children}
                </div>
            </div>
            <div className="order-1 lg:order-2">
                {image ? (
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-brand-navy/50 border border-slate-700/50 bg-slate-800/20 backdrop-blur">
                        <img src={image} alt={imageAlt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                ) : (
                    <div className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-900/50">
                        <span className="text-slate-500">Image Placeholder</span>
                    </div>
                )}
            </div>
        </div>
    );
};
