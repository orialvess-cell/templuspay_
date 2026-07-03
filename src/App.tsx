/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Simulator from './components/Simulator';
import Features from './components/Features';
import ContactForm from './components/ContactForm';
import DashboardView from './components/DashboardView';
import LoginView from './components/LoginView';
import Footer from './components/Footer';
import { MessageSquare, ArrowUp, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [simulatedAmount, setSimulatedAmount] = useState<number>(0);

  const handleSetView = (view: 'landing' | 'login' | 'dashboard') => {
    if (view === 'dashboard' && !isAuthenticated) {
      setView('login');
    } else {
      setView(view);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('landing');
  };

  const handleStartSimulationSignUp = (amount: number) => {
    setSimulatedAmount(amount);
    // Scroll smoothly to contact/about section
    const el = document.querySelector('#about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    setView('landing');
    setTimeout(() => {
      const el = document.querySelector('#about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavClick = (href: string) => {
    setView('landing');
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col justify-between" id="app-wrapper">
      
      {/* Universal Sticky Header */}
      <Header 
        currentView={currentView} 
        setView={handleSetView} 
        onOpenContact={handleOpenContact} 
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow animate-fade-in">
        {currentView === 'landing' ? (
          <div className="animate-in fade-in duration-300" id="landing-container">
            {/* 1. Hero Section */}
            <Hero 
              onStartSimulation={() => handleSetView('dashboard')} 
              onOpenContact={handleOpenContact}
              onOpenDashboard={() => handleSetView('dashboard')}
            />

            {/* Banner of client segments */}
            <div className="bg-slate-50 py-10 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-[10px] sm:text-xs font-bold text-center text-slate-400 uppercase tracking-widest mb-6">
                  Mais de 1.200 empresas já liberaram caixa com faturas antecipadas
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                  <div className="font-display font-black text-slate-700 text-sm tracking-tight">INDUSTRIAS VALE</div>
                  <div className="font-display font-black text-slate-700 text-sm tracking-tight">DISTRIBUIDORA SAO PAULO</div>
                  <div className="font-display font-black text-slate-700 text-sm tracking-tight">ALIMENTOS BRASIL</div>
                  <div className="font-display font-black text-slate-700 text-sm tracking-tight">TECH LOGISTICA</div>
                  <div className="font-display font-black text-slate-700 text-sm tracking-tight">SERVIÇOS GLOBO</div>
                </div>
              </div>
            </div>

            {/* 3. Services / Segment Targets / Step-by-Step Features */}
            <Features />

            {/* 4. Interactive Lead Generation / Custom Corporate Signup */}
            <ContactForm initialAmount={simulatedAmount} />
          </div>
        ) : currentView === 'login' ? (
          <div className="animate-in fade-in duration-300" id="login-container">
            <LoginView 
              onLoginSuccess={() => {
                setIsAuthenticated(true);
                setView('dashboard');
              }}
              onBackToHome={() => setView('landing')}
            />
          </div>
        ) : (
          <div className="animate-in fade-in duration-300" id="portal-container">
            {/* Interactive Customer Portal simulation */}
            <DashboardView />
          </div>
        )}
      </main>

      {/* Floating Action WhatsApp and Scroll Top Widgets */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3" id="floating-actions">
        {/* Help notification pill floating briefly */}
        {currentView === 'landing' && (
          <div className="bg-white border border-slate-150 p-3 rounded-2xl shadow-lg max-w-[240px] text-left animate-bounce hidden md:block">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 rounded-full bg-light-gold flex items-center justify-center mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-primary-blue block">Dúvidas na antecipação?</span>
                <span className="text-[11px] text-slate-500 font-medium block leading-snug">Chame no WhatsApp para simulação personalizada!</span>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/5511987654321?text=Olá,%20gostaria%20de%20conversar%20sobre%20antecipação%20de%20recebíveis%20no%20Templus%20Pay"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all"
          title="Fale no WhatsApp"
          id="btn-whatsapp-floating"
        >
          <MessageSquare className="w-7 h-7 fill-white" />
        </a>

        {/* Top Scroll */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-primary-blue rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all cursor-pointer"
          title="Voltar ao topo"
          id="btn-scroll-top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>

      {/* Universal Footer */}
      <Footer onNavClick={handleNavClick} setView={handleSetView} />
      
    </div>
  );
}
