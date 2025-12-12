import React from 'react';
import { Shield, Lock, Activity, CheckCircle, ArrowRight, Award, Users, FileText } from 'lucide-react';
import { Button } from './Button';
import { PlanType } from '../types';

interface LandingPageProps {
  onStartTrial: (plan: PlanType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartTrial }) => {
  const presentationUrl = "https://www.canva.cn/design/DAG7MvKyxrU/x2Z9gBS2jfLBtGvEyw6yIA/view?utm_content=DAG7MvKyxrU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf36f68237e";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-24 px-4 md:px-8 relative overflow-hidden">
        {/* Abstract Gold Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-neutral-800/50 px-4 py-1.5 rounded-full text-amber-400 mb-8 text-xs uppercase tracking-widest font-semibold">
            <Award className="w-4 h-4" />
            <span>Premium Wealth Protection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight">
            Secure Your Legacy,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Maintain Your Dignity.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            The first exclusive smart contract platform bridging financial assets with real-time medical data.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="xl" variant="secondary" onClick={() => onStartTrial('family')}>
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="xl" 
              variant="primary" 
              className="border-amber-500/50 text-amber-400 hover:text-amber-300"
              onClick={() => window.open(presentationUrl, '_blank', 'noopener,noreferrer')}
            >
              Watch Presentation
            </Button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-10 shadow-lg border-t-4 border-amber-600">
              <div className="w-14 h-14 flex items-center justify-center mb-6 text-amber-600">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Anti-Fraud Protection</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Prevents unauthorized transfers. Large transactions require multi-signature approval from trusted guardians.
              </p>
            </div>
            <div className="bg-white p-10 shadow-lg border-t-4 border-neutral-900">
              <div className="w-14 h-14 flex items-center justify-center mb-6 text-neutral-900">
                <Activity className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Medical Oracle</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Automatically switches to "Protective Mode" if verified medical data detects cognitive decline.
              </p>
            </div>
            <div className="bg-white p-10 shadow-lg border-t-4 border-amber-600">
              <div className="w-14 h-14 flex items-center justify-center mb-6 text-amber-600">
                <Lock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Automated Execution</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Smart contracts ensure your monthly allowance is paid out automatically, reducing administrative burden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 bg-white" id="pricing">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-16 text-center">Membership Tiers</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Basic Plan */}
            <div className="bg-white border border-neutral-200 p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-neutral-300"></div>
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">Basic Plan</h3>
              <p className="text-neutral-500 mb-8">For Pension & Cash Management</p>
              
              <div className="text-5xl font-serif text-neutral-900 mb-4">
                $10<span className="text-lg text-neutral-500 font-sans font-normal">/mo</span>
              </div>
              
              <ul className="text-left space-y-4 mb-10 flex-grow">
                {[
                  "Single Asset (Cash/Pension)",
                  "1 Primary Guardian",
                  "Standard Medical Verification",
                  "Basic Automated Allowance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-600">
                    <CheckCircle className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant="outline" onClick={() => onStartTrial('basic')} className="w-full">
                Select Basic
              </Button>
            </div>

            {/* Family Trust Plan */}
            <div className="bg-neutral-900 text-white p-10 shadow-2xl relative flex flex-col transform md:-translate-y-4 border border-amber-500/30">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1 uppercase tracking-widest">
                Recommended
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-500 mb-2">Family Trust Plan</h3>
              <p className="text-neutral-400 mb-8">Full Wealth Spectrum Coverage</p>
              
              <div className="text-5xl font-serif text-white mb-4">
                $20<span className="text-lg text-neutral-500 font-sans font-normal">/mo + 0.1% fee</span>
              </div>
              
              <ul className="text-left space-y-4 mb-10 flex-grow">
                {[
                  "Multi-Asset (Stocks, Real Estate)",
                  "Guardian Council (Multi-Sig 3-of-5)",
                  "Priority Medical Oracle",
                  "Bank-Grade MPC Security",
                  "Legacy Succession Logic"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant="secondary" onClick={() => onStartTrial('family')} className="w-full">
                Start Family Trust
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};