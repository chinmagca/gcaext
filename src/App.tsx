import { useState } from 'react';
import Questionnaire from './components/assessment/Questionnaire';
import SalesPresentation from './components/SalesPresentation';
import { cn } from './lib/utils';
import { Presentation } from 'lucide-react';

function App() {
  const [showPresentation, setShowPresentation] = useState(false);

  if (showPresentation) {
    return <SalesPresentation />;
  }

  return (
    <div className={cn(
      "min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white",
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"
    )}>
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-lime/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 w-full min-h-screen flex flex-col">
        <header className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <span className="text-brand-cyan">GCA</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-100">CyberStats</span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-slate-400">
              <button
                onClick={() => setShowPresentation(true)}
                className="hidden md:flex items-center gap-2 hover:text-brand-cyan transition-colors"
              >
                <Presentation size={16} />
                Sales Deck
              </button>
              <a href="#" className="hover:text-brand-cyan transition-colors">Services</a>
              <a href="#" className="hover:text-brand-cyan transition-colors">About</a>
              <a href="#" className="hover:text-brand-cyan transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-center">
          <Questionnaire />
        </div>

        <footer className="border-t border-slate-800/50 py-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} GlobalCyberAssociates. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
