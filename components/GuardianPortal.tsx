import React, { useState } from 'react';
import { TrustContract } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { AlertTriangle, Lock, FileText, Check, X, ShieldCheck, Eye, CheckCircle, Key, Network, Fingerprint, Server } from 'lucide-react';
import { MOCK_PENDING_TX } from '../constants';

interface GuardianPortalProps {
  contract: TrustContract;
  onApprove: () => void;
  onReject: () => void;
}

export const GuardianPortal: React.FC<GuardianPortalProps> = ({ contract, onApprove, onReject }) => {
  const [zkpVerifying, setZkpVerifying] = useState(false);
  const [zkpVerified, setZkpVerified] = useState(false);

  const handleVerifyZKP = () => {
    setZkpVerifying(true);
    // Simulate ZKP verification delay
    setTimeout(() => {
      setZkpVerifying(false);
      setZkpVerified(true);
    }, 2000);
  };

  const isProtectiveMode = contract.medicalStatus === 'cognitive_decline_detected';
  const isFamily = contract.planType === 'family';

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 pb-8">
        <div>
          <h1 className="text-4xl font-serif text-neutral-900">Guardian Portal</h1>
          <p className="text-neutral-500 mt-2 text-lg">Managing Trust for: <span className="font-semibold text-neutral-900">Mrs. Zhang (USR-8821)</span></p>
        </div>
        <div className={`flex items-center gap-3 px-6 py-2 rounded-full font-medium tracking-wide uppercase text-sm border ${isProtectiveMode ? (isFamily ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-red-50 border-red-200 text-red-900') : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
          {isProtectiveMode ? (
             isFamily ? <ShieldCheck className="w-4 h-4 animate-pulse" /> : <AlertTriangle className="w-4 h-4" />
          ) : <ShieldCheck className="w-4 h-4" />}
          
          {isProtectiveMode 
            ? (isFamily ? 'Institutional Security Active' : 'Protective Mode Active') 
            : 'Status: Normal'}
        </div>
      </div>

      {isProtectiveMode ? (
        // Risk Event Banner - Differentiated
        isFamily ? (
            <div className="bg-neutral-900 text-white p-8 shadow-2xl mb-8 relative overflow-hidden border-b-4 border-amber-500">
               <div className="absolute top-0 right-0 p-8 opacity-5"><Network className="w-32 h-32" /></div>
               <div className="relative z-10 flex items-start gap-6">
                 <div className="p-4 bg-amber-500/20 rounded-full text-amber-500">
                    <Server className="w-8 h-8" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-serif mb-2 text-amber-500">MPC Protocol Initiated</h3>
                   <p className="text-neutral-300 text-lg max-w-3xl leading-relaxed font-light">
                     Multi-Party Computation network activated. 3 of 5 Guardian Keys required to authorize transactions.
                     <span className="block mt-2 text-neutral-500 text-sm font-mono">Session ID: 0x82...19A // Nodes Online</span>
                   </p>
                 </div>
               </div>
            </div>
        ) : (
            <div className="bg-red-900 text-white p-8 shadow-lg mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Lock className="w-32 h-32" /></div>
              <div className="relative z-10 flex items-start gap-6">
                <Lock className="w-8 h-8 text-red-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-serif mb-2">Transaction Locked</h3>
                  <p className="text-red-100 text-lg max-w-3xl leading-relaxed font-light">
                    The smart contract has locked account privileges. Waiting for Primary Guardian approval.
                  </p>
                </div>
              </div>
            </div>
        )
      ) : (
        <div className="bg-white border-l-4 border-emerald-600 p-8 shadow-sm mb-8">
           <div className="flex items-start gap-6">
            <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-serif text-neutral-900 mb-2">System Secure</h3>
              <p className="text-neutral-600 text-lg font-light">
                No alerts detected. Routine allowance transfers are executing automatically.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pending Transaction Card */}
      {isProtectiveMode && (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Card title="Pending Transaction Request" icon={<Lock className="w-6 h-6" />} alert={true}>
              <div className="bg-neutral-50 border border-neutral-200 overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-neutral-200 border-b border-neutral-200">
                  <div className="p-6 bg-white text-neutral-400 font-bold text-xs uppercase tracking-widest">Recipient</div>
                  <div className="p-6 font-serif text-xl text-neutral-900">{MOCK_PENDING_TX.recipient}</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-neutral-200 border-b border-neutral-200">
                  <div className="p-6 bg-white text-neutral-400 font-bold text-xs uppercase tracking-widest">Amount</div>
                  <div className="p-6 font-serif text-3xl text-neutral-900">${MOCK_PENDING_TX.amount.toLocaleString()}</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-neutral-200">
                  <div className="p-6 bg-white text-neutral-400 font-bold text-xs uppercase tracking-widest">Reason</div>
                  <div className="p-6 text-neutral-700">Long-term care deposit (Flagged: High Value)</div>
                </div>
              </div>

              <div className="mt-8">
                 {zkpVerified ? (
                    // Logic Difference: Basic vs Family Approval Flow
                    isFamily ? (
                        <div className="bg-neutral-900 p-8 rounded-lg border border-amber-500/30">
                            <div className="flex justify-between items-center mb-6">
                               <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                                  <span className="text-amber-500 font-mono text-xs uppercase tracking-widest">MPC Secure Enclave</span>
                               </div>
                               <span className="text-neutral-400 text-xs font-mono">Consensus Progress: 33%</span>
                            </div>
                            
                            {/* Visual Progress Bar */}
                            <div className="w-full bg-neutral-800 rounded-full h-2 mb-8">
                                <div className="bg-amber-500 h-2 rounded-full relative" style={{ width: '33%' }}>
                                    <div className="absolute right-0 -top-1 w-4 h-4 bg-amber-200 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                               {[
                                 { id: 1, status: 'approved', label: 'Key 1' },
                                 { id: 2, status: 'pending', label: 'Key 2' },
                                 { id: 3, status: 'pending', label: 'Key 3' },
                                 { id: 4, status: 'waiting', label: 'Key 4' },
                                 { id: 5, status: 'waiting', label: 'Key 5' }
                               ].map(node => (
                                  <div key={node.id} className={`p-3 rounded border flex flex-col items-center ${node.status === 'approved' ? 'bg-amber-900/30 border-amber-500/50' : 'bg-neutral-800 border-neutral-700'}`}>
                                     <Key className={`w-4 h-4 mb-2 ${node.status === 'approved' ? 'text-amber-500' : 'text-neutral-600'}`} />
                                     <span className={`text-[10px] font-bold uppercase ${node.status === 'approved' ? 'text-amber-400' : 'text-neutral-500'}`}>{node.label}</span>
                                  </div>
                               ))}
                            </div>

                            <div className="flex gap-4">
                               <Button onClick={onApprove} className="w-full bg-amber-600 hover:bg-amber-700 text-white border-none h-12">
                                  <Fingerprint className="mr-2 w-5 h-5" /> Sign with Guardian Key
                               </Button>
                            </div>
                        </div>
                    ) : (
                        // Basic Plan Approval
                        <div className="flex flex-col md:flex-row gap-6">
                            <Button onClick={onApprove} className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white border-none h-12">
                                <Check className="mr-2 w-5 h-5" /> Approve Transfer
                            </Button>
                            <Button onClick={onReject} variant="danger" className="flex-1 h-12">
                                <X className="mr-2 w-5 h-5" /> Reject
                            </Button>
                        </div>
                    )
                 ) : (
                     <div className="w-full bg-neutral-100 p-6 text-center text-neutral-500 italic font-serif border border-neutral-200 rounded">
                         Privacy verification required before action
                     </div>
                 )}
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            {/* ZKP Verification Module */}
            <Card title="Privacy Verification" icon={<Eye className="w-6 h-6" />}>
              <p className="text-neutral-500 mb-6 font-light">
                Verify the beneficiary's current health status via Zero-Knowledge Proof (ZKP) without accessing raw medical records.
              </p>
              
              <div className="bg-neutral-50 p-8 border border-neutral-200 flex flex-col items-center justify-center min-h-[220px]">
                {zkpVerified ? (
                    <div className="text-center animate-in fade-in zoom-in duration-500">
                        <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-amber-600" />
                        </div>
                        <h4 className="text-amber-800 font-serif font-bold text-xl mb-1">ZKP Verified</h4>
                        <p className="text-amber-600 text-xs font-mono">Proof: 0x9f...2a1</p>
                    </div>
                ) : (
                    <div className="text-center w-full">
                        <Button 
                            onClick={handleVerifyZKP} 
                            isLoading={zkpVerifying}
                            variant="primary"
                            className="w-full"
                        >
                            {zkpVerifying ? 'Verifying Proof...' : 'Verify Status'}
                        </Button>
                        {!zkpVerifying && (
                            <p className="text-xs text-neutral-400 mt-4 uppercase tracking-widest">Powered by zk-SNARKs</p>
                        )}
                    </div>
                )}
              </div>
            </Card>

            <div className="bg-neutral-900 text-neutral-300 p-6 shadow-md border-l-4 border-amber-600">
                <h4 className="font-serif font-bold text-amber-500 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Legal Context
                </h4>
                <p className="text-sm font-light leading-relaxed">
                   {isFamily 
                    ? "Smart contract clause 4.2 activated: Distributed Key Generation (DKG) required for asset release. 3 Guardian signatures mandatory."
                    : "This transaction exceeds the configured allowance limit during Protective Mode. Primary Guardian signature required."}
                </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};