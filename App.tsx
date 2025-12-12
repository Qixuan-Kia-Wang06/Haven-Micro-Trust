import React, { useState } from 'react';
import { ViewState, TrustContract, PlanType } from './types';
import { MOCK_SENIOR, INITIAL_CONTRACT_STATE } from './constants';
import { LandingPage } from './components/LandingPage';
import { SeniorDashboard } from './components/SeniorDashboard';
import { GuardianPortal } from './components/GuardianPortal';
import { LayoutGrid, Users, LogOut, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [contract, setContract] = useState<TrustContract>(INITIAL_CONTRACT_STATE);
  
  // Navigation Handler
  const navigateTo = (view: ViewState) => setCurrentView(view);

  const handleStartTrial = (selectedPlan: PlanType) => {
    updateContract({ planType: selectedPlan });
    navigateTo('senior');
  };

  // Update Contract State Handler
  const updateContract = (updates: Partial<TrustContract>) => {
    setContract(prev => ({ ...prev, ...updates }));
  };

  // Demo: Simulate a medical event to trigger Protective Mode
  const toggleSimulation = () => {
    if (contract.medicalStatus === 'healthy') {
      updateContract({ 
        medicalStatus: 'cognitive_decline_detected',
        status: 'protective_mode'
      });
      // Logic update: Auto-navigate to Guardian portal to show the relevant UI changes immediately
      if (currentView === 'senior') {
        setTimeout(() => navigateTo('guardian'), 500); 
      }
    } else {
      updateContract({ 
        medicalStatus: 'healthy',
        status: 'active'
      });
    }
  };

  // Render Logic
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStartTrial={handleStartTrial} />;
      case 'senior':
        return (
          <SeniorDashboard 
            user={MOCK_SENIOR} 
            contract={contract} 
            updateContract={updateContract} 
          />
        );
      case 'guardian':
        return (
          <GuardianPortal 
            contract={contract} 
            onApprove={() => alert("Transaction Signed! (1/2 Signatures)")}
            onReject={() => alert("Transaction Rejected")}
          />
        );
      default:
        return <LandingPage onStartTrial={handleStartTrial} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-neutral-900 border-b border-amber-900/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => navigateTo('landing')}
              >
                <div className="bg-amber-600 p-2 group-hover:bg-amber-500 transition-colors">
                  <ShieldCheckIcon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                   <span className="text-xl font-serif font-bold text-white tracking-wide">Haven</span>
                   <span className="text-xs text-amber-500 uppercase tracking-widest">Micro-Trust</span>
                </div>
              </div>
            </div>

            {currentView !== 'landing' && (
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => navigateTo('senior')}
                  className={`flex items-center gap-2 px-3 py-1 transition-all ${currentView === 'senior' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-neutral-400 hover:text-white'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden md:inline text-sm font-medium uppercase tracking-wide">Dashboard</span>
                </button>
                <button 
                  onClick={() => navigateTo('guardian')}
                  className={`flex items-center gap-2 px-3 py-1 transition-all ${currentView === 'guardian' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-neutral-400 hover:text-white'}`}
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden md:inline text-sm font-medium uppercase tracking-wide">Guardian</span>
                </button>
                <div className="h-6 w-px bg-neutral-700 mx-2 hidden md:block"></div>
                <button 
                  onClick={() => navigateTo('landing')}
                  className="text-neutral-400 hover:text-red-500 p-2 transition-colors"
                  title="Log Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pb-24">
        {renderView()}
      </main>

      {/* Demo Simulation Controls */}
      {currentView !== 'landing' && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={toggleSimulation}
            className={`shadow-2xl flex items-center gap-3 px-6 py-4 font-bold text-white transition-all transform hover:scale-105 border border-white/10 ${contract.medicalStatus === 'healthy' ? 'bg-neutral-900 hover:bg-black' : 'bg-red-900 hover:bg-red-950'}`}
          >
            <Activity className={`w-5 h-5 ${contract.medicalStatus === 'healthy' ? 'text-amber-500' : 'text-white'}`} />
            <span className="tracking-wide">{contract.medicalStatus === 'healthy' ? 'Simulate Risk Event' : 'Reset System'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Helper Icon for Logo
const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default App;