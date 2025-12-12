import React, { useState } from 'react';
import { UserProfile, TrustContract, PlanType } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { Shield, Activity, DollarSign, CheckCircle, Building, TrendingUp, Users, Lock, AlertTriangle } from 'lucide-react';

interface SeniorDashboardProps {
  user: UserProfile;
  contract: TrustContract;
  updateContract: (updates: Partial<TrustContract>) => void;
}

export const SeniorDashboard: React.FC<SeniorDashboardProps> = ({ user, contract, updateContract }) => {
  const [editingAllowance, setEditingAllowance] = useState(false);
  const [tempAllowance, setTempAllowance] = useState(contract.monthlyAllowance);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleSaveAllowance = () => {
    updateContract({ monthlyAllowance: tempAllowance });
    setEditingAllowance(false);
    triggerToast();
  };

  const toggleMedicalTrigger = () => {
    updateContract({ medicalTriggerEnabled: !contract.medicalTriggerEnabled });
    triggerToast();
  };

  const switchPlan = (plan: PlanType) => {
    updateContract({ planType: plan });
    triggerToast();
  };

  const triggerToast = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const isFamilyPlan = contract.planType === 'family';

  // Dynamic Status Logic
  let statusDisplay = { 
    text: "Active & Secure", 
    color: "text-emerald-700", 
    icon: <CheckCircle className="w-5 h-5 text-emerald-700" />
  };

  if (contract.status === 'protective_mode') {
    if (isFamilyPlan) {
      statusDisplay = {
        text: "INSTITUTIONAL GRADE SECURITY ACTIVATED",
        color: "text-amber-600",
        icon: <Shield className="w-5 h-5 text-amber-600 animate-pulse" />
      };
    } else {
      statusDisplay = {
        text: "PROTECTED MODE",
        color: "text-red-700",
        icon: <Lock className="w-5 h-5 text-red-700" />
      };
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Header & Simulator Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-900">Welcome, {user.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg text-neutral-500 font-light">Status:</span>
            <span className={`font-semibold flex items-center gap-2 ${statusDisplay.color}`}>
              {statusDisplay.icon}
              {statusDisplay.text}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Simulate Plan:</span>
          <div className="flex bg-white rounded-md border border-neutral-300 overflow-hidden shadow-sm">
            <button 
              onClick={() => switchPlan('basic')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${!isFamilyPlan ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-50'}`}
            >
              Basic
            </button>
            <button 
              onClick={() => switchPlan('family')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${isFamilyPlan ? 'bg-amber-600 text-white' : 'text-neutral-500 hover:bg-neutral-50'}`}
            >
              Family Trust
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Asset View */}
      {isFamilyPlan ? (
        <div className="space-y-6">
           {/* Total Portfolio Hero */}
          <div className="relative overflow-hidden rounded-xl bg-neutral-900 text-white shadow-2xl p-8 border-b-4 border-amber-600">
            <div className="absolute top-0 right-0 p-12 opacity-5"><Shield className="w-64 h-64" /></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2 text-amber-500/80 uppercase tracking-widest text-sm font-semibold">
                <DollarSign className="w-5 h-5" />
                <span>Total Protected Assets</span>
              </div>
              <div className="text-5xl md:text-7xl font-serif text-white mb-4 tracking-tight">
                $170,000<span className="text-2xl text-neutral-500 font-sans font-light">.00</span>
              </div>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-neutral-800 rounded text-xs text-neutral-300 border border-neutral-700">Cash: $50k</span>
                <span className="px-3 py-1 bg-neutral-800 rounded text-xs text-neutral-300 border border-neutral-700">Stocks: $120k</span>
              </div>
            </div>
          </div>

          {/* Sub-Assets Grid */}
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-blue-50 text-blue-700 rounded-full"><TrendingUp className="w-6 h-6" /></div>
                   <div>
                      <h4 className="font-serif font-bold text-lg">Securities Portfolio</h4>
                      <p className="text-sm text-neutral-500">Managed Fund (Aggressive)</p>
                   </div>
                </div>
                <div className="text-right">
                   <div className="font-mono text-lg font-bold text-neutral-900">$120,000</div>
                   <div className="text-xs text-emerald-600">+4.2% YTD</div>
                </div>
             </div>
             
             <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-indigo-50 text-indigo-700 rounded-full"><Building className="w-6 h-6" /></div>
                   <div>
                      <h4 className="font-serif font-bold text-lg">Property Insurance</h4>
                      <p className="text-sm text-neutral-500">Deed #882-A (Escrow)</p>
                   </div>
                </div>
                <div className="text-right">
                   <div className="font-mono text-lg font-bold text-neutral-900">Linked</div>
                   <div className="text-xs text-amber-600">Smart Contract Active</div>
                </div>
             </div>
          </div>
        </div>
      ) : (
        /* Basic Plan View */
        <div className="relative overflow-hidden rounded-xl bg-neutral-800 text-white shadow-xl p-8 md:p-12 border-b-4 border-neutral-400">
          <div className="absolute top-0 right-0 p-12 opacity-5"><Shield className="w-64 h-64" /></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4 text-neutral-400 uppercase tracking-widest text-sm font-semibold">
                <DollarSign className="w-5 h-5" />
                <span>Cash Reserve</span>
              </div>
              <div className="text-6xl md:text-8xl font-serif text-white mb-2 tracking-tight">
                ${contract.balance.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <CheckCircle className="w-4 h-4 text-neutral-500" />
              <span>Basic Protection Plan</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Rule Configuration: Allowance */}
        <Card title="Monthly Allowance" icon={<DollarSign className="w-6 h-6" />}>
          <p className="mb-8 text-lg text-neutral-500">
            Amount automatically transferred to your checking account on the 1st of each month.
          </p>
          
          {editingAllowance ? (
            <div className="space-y-6 bg-neutral-50 p-8 border border-neutral-100">
              <label className="block text-sm font-bold text-neutral-900 uppercase tracking-wide">Set Amount (USD)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  value={tempAllowance}
                  onChange={(e) => setTempAllowance(Number(e.target.value))}
                  className="block w-full text-4xl font-serif text-neutral-900 p-4 border-b-2 border-amber-600 bg-transparent focus:outline-none focus:border-amber-700"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button onClick={handleSaveAllowance} variant="primary">Save Update</Button>
                <Button variant="outline" onClick={() => setEditingAllowance(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-neutral-50 p-8 border border-neutral-100">
              <span className="text-4xl font-serif text-neutral-900">${contract.monthlyAllowance.toLocaleString()}</span>
              <Button variant="outline" onClick={() => setEditingAllowance(true)}>Change</Button>
            </div>
          )}
        </Card>

        {/* Dynamic Guardian/Health Info */}
        <div className="space-y-8">
          <Card title="Guardian Network" icon={<Users className="w-6 h-6" />}>
            <div className="bg-neutral-50 p-6 border border-neutral-100 mb-6">
              {isFamilyPlan ? (
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="font-semibold text-neutral-900">Consensus Model:</span>
                       <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Multi-Sig 3/5</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-sm text-neutral-500">3 of 5 Guardians active. Council Ready.</p>
                 </div>
              ) : (
                 <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-900">Primary Guardian</h4>
                      <p className="text-sm text-neutral-500">1 Active Connection</p>
                    </div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                 </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
               <h4 className="text-sm font-bold uppercase text-neutral-400 tracking-wide">Authorized Personnel</h4>
               {isFamilyPlan ? (
                  <div className="flex -space-x-2 overflow-hidden py-2">
                     {[1,2,3,4,5].map(i => (
                       <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-neutral-800 flex items-center justify-center text-white text-xs font-serif">G{i}</div>
                     ))}
                  </div>
               ) : (
                  <div className="flex items-center gap-3 py-2">
                     <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center text-white text-xs font-serif">G1</div>
                     <span className="text-neutral-700">Robert Zhang (Son)</span>
                  </div>
               )}
            </div>
          </Card>
        </div>
      </div>

      {/* Settings Saved Toast */}
      {showSaveToast && (
        <div className="fixed bottom-10 right-10 bg-neutral-900 text-white px-8 py-4 shadow-2xl flex items-center gap-4 border-l-4 border-amber-500 animate-bounce z-50">
          <CheckCircle className="w-6 h-6 text-amber-500" />
          <span className="text-lg font-medium">System Updated</span>
        </div>
      )}
    </div>
  );
};