/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ShieldCheck, LayoutDashboard, Landmark, Sparkles, LogOut } from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'login' | 'dashboard';
  setView: (view: 'landing' | 'login' | 'dashboard') => void;
  onOpenContact: () => void;
  onLogout?: () => void;
}

export default function Header({ currentView, setView, onOpenContact, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Como Funciona', href: '#how-it-works' },
    { name: 'Nossos Serviços', href: '#services' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Segurança', href: '#security' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      setView('landing');
      // Wait for view state update to scroll
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20" id="header-container">
          {/* Logo */}
          <div 
            onClick={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3 cursor-pointer group"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-blue flex items-center justify-center shadow-lg shadow-primary-blue/10 group-hover:scale-105 transition-transform">
              <span className="font-display font-bold text-lg text-accent-gold">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-primary-blue leading-none">
                TEMPLUS<span className="text-accent-gold">PAY</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                Fomento e Tecnologia
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {currentView === 'landing' && (
            <nav className="hidden md:flex space-x-8" id="desktop-nav">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="font-sans font-medium text-sm text-slate-600 hover:text-primary-blue transition-colors relative py-2 group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold transition-all duration-200 group-hover:w-full" />
                </button>
              ))}
            </nav>
          )}

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4" id="header-actions">
            {currentView === 'landing' ? (
              <>
                <button
                  onClick={() => setView('dashboard')}
                  className="flex items-center space-x-2 font-sans font-semibold text-sm text-primary-blue hover:text-secondary-blue px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                  id="btn-customer-portal"
                >
                  <LayoutDashboard className="w-4 h-4 text-accent-gold" />
                  <span>Área do Cliente</span>
                </button>
                <a
                  href="https://templuspay.grafeno.digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-sans font-semibold text-sm text-white bg-primary-blue hover:bg-secondary-blue px-5 py-2.5 rounded-xl shadow-md shadow-primary-blue/10 hover:shadow-lg transition-all cursor-pointer border border-primary-blue hover:border-secondary-blue"
                  id="btn-open-account"
                >
                  Internet Bank
                </a>
              </>
            ) : currentView === 'login' ? (
              <button
                onClick={() => setView('landing')}
                className="flex items-center space-x-2 font-sans font-semibold text-sm text-white bg-primary-blue hover:bg-secondary-blue px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                id="btn-back-home"
              >
                <Landmark className="w-4 h-4 text-accent-gold" />
                <span>Voltar ao Site</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setView('landing')}
                  className="flex items-center space-x-2 font-sans font-semibold text-sm text-slate-600 hover:text-primary-blue px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer animate-fade-in"
                  id="btn-back-home-auth"
                >
                  <Landmark className="w-4 h-4 text-accent-gold" />
                  <span>Voltar ao Site</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 font-sans font-semibold text-sm text-white bg-rose-600 hover:bg-rose-700 px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer border border-rose-600 hover:border-rose-700 animate-fade-in"
                  id="btn-logout"
                >
                  <LogOut className="w-4 h-4 text-white" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2" id="mobile-menu-toggle">
            {currentView === 'dashboard' && (
              <button
                onClick={() => setView('landing')}
                className="p-2 text-slate-600 hover:text-primary-blue bg-slate-50 rounded-xl"
                title="Voltar ao site"
              >
                <Landmark className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-primary-blue hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in fade-in slide-in-from-top-4 duration-200" id="mobile-drawer">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {currentView === 'landing' && (
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left px-3 py-3 rounded-xl font-sans font-semibold text-base text-slate-700 hover:bg-slate-50 hover:text-primary-blue transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            )}
            
            <div className="pt-4 border-t border-slate-100 space-y-3 px-3">
              {currentView === 'landing' ? (
                <>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setView('dashboard'); }}
                    className="flex w-full items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-slate-200 font-sans font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="w-4 h-4 text-accent-gold" />
                    <span>Acessar Área do Cliente</span>
                  </button>
                  <a
                    href="https://templuspay.grafeno.digital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center px-4 py-3 rounded-xl bg-primary-blue text-white font-sans font-semibold shadow-md shadow-primary-blue/10 hover:bg-secondary-blue text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Internet Bank
                  </a>
                </>
              ) : currentView === 'login' ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); setView('landing'); }}
                  className="flex w-full items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-primary-blue text-white font-sans font-semibold"
                >
                  <Landmark className="w-4 h-4 text-accent-gold" />
                  <span>Voltar para Home</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => { setMobileMenuOpen(false); setView('landing'); }}
                    className="flex w-full items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-slate-200 font-sans font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Landmark className="w-4 h-4 text-accent-gold" />
                    <span>Voltar para Home</span>
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); if (onLogout) onLogout(); }}
                    className="flex w-full items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-sans font-semibold"
                    id="btn-logout-mobile"
                  >
                    <LogOut className="w-4 h-4 text-white" />
                    <span>Sair da Área do Cliente</span>
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center space-x-2 pt-3 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-accent-gold" />
              <span>Ambiente 100% seguro certificado</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
