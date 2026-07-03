/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Landmark, BadgePercent } from 'lucide-react';

interface HeroProps {
  onStartSimulation: () => void;
  onOpenContact: () => void;
  onOpenDashboard: () => void;
}

export default function Hero({ onStartSimulation, onOpenContact, onOpenDashboard }: HeroProps) {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-white bg-grid-pattern overflow-hidden animate-fade-in">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-light-gold/40 rounded-full blur-3xl pointer-events-none -mr-48 -mt-24" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl pointer-events-none -ml-48 -mb-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copy Column (Span 6) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center space-x-2.5 bg-white border border-accent-gold/25 rounded-full px-4 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
              <span className="font-sans font-bold text-xs text-primary-blue uppercase tracking-wider">
                A Revolução em Antecipação B2B
              </span>
            </div>

            {/* Title / Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-primary-blue tracking-tight leading-none">
              Transforme faturas a prazo em <span className="text-accent-gold font-black">liquidez imediata</span>
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              O fluxo de caixa da sua empresa sem as barreiras dos bancos tradicionais. No <span className="font-bold text-primary-blue">TEMPLUS PAY - Fomento e Tecnologia</span>, você antecipa duplicatas, NF-es e contratos com taxas sob medida, de forma 100% digital e com dinheiro na conta no mesmo dia.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onStartSimulation}
                className="flex items-center justify-center space-x-2 bg-primary-blue hover:bg-secondary-blue text-white px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer border border-primary-blue hover:border-secondary-blue hover:scale-[1.01]"
                id="hero-btn-simulate"
              >
                <span>Simular Antecipação</span>
                <ArrowRight className="w-4 h-4 text-accent-gold" />
              </button>
              
              <button
                onClick={onOpenDashboard}
                className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-primary-blue border border-slate-200 hover:border-slate-300 px-8 py-4 rounded-xl font-display font-bold text-sm sm:text-base transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                id="hero-btn-dashboard"
              >
                <span>Experimentar o Portal</span>
              </button>
            </div>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center space-x-2 text-slate-600">
                <Zap className="w-5 h-5 text-accent-gold shrink-0" />
                <span className="font-sans font-semibold text-xs sm:text-sm">Pagamento no mesmo dia</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <BadgePercent className="w-5 h-5 text-accent-gold shrink-0" />
                <span className="font-sans font-semibold text-xs sm:text-sm">Taxas a partir de 1,45% a.m.</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <ShieldCheck className="w-5 h-5 text-accent-gold shrink-0" />
                <span className="font-sans font-semibold text-xs sm:text-sm">Plataforma 100% segura</span>
              </div>
            </div>
          </div>

          {/* Visual Illustration Column (Span 5) */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-[440px] rounded-3xl overflow-visible relative shadow-2xl group">
              {/* Background Business Center Photo */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" 
                  alt="Centro Empresarial Moderno - Templus Pay" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Deep gradient overlay for better text/card contrast */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue/80 via-primary-blue/20 to-black/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/90 via-transparent to-transparent" />
              </div>

              {/* Glassmorphic overlay card 1: Active Invoices preview */}
              <div className="absolute top-10 left-4 right-4 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl z-10 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-gold/25 flex items-center justify-center">
                      <Landmark className="w-4 h-4 text-primary-blue" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-xs text-primary-blue block">Balanço do Mês</span>
                      <span className="text-[9px] text-slate-500 font-sans block">Limites disponíveis</span>
                    </div>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Sincronizado SEFAZ</span>
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Líquido Liberado</span>
                  <div className="font-display font-extrabold text-2xl text-primary-blue">
                    R$ 384.500,00
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Nota: NF-e 4952 (Pendente)</span>
                  <span className="font-bold text-accent-gold hover:underline cursor-pointer">Simular desconto &gt;</span>
                </div>
              </div>

              {/* Micro success popup floating (Card 2) */}
              <div className="absolute -bottom-4 -left-6 bg-primary-blue text-white p-4 rounded-2xl border border-white/10 shadow-lg max-w-[210px] z-20 hover:scale-105 transition-transform duration-300 hidden sm:block">
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-accent-gold flex items-center justify-center text-primary-blue shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-blue" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/70 block font-semibold uppercase tracking-wider">TED Confirmado</span>
                    <span className="text-xs font-bold text-accent-gold font-mono block">R$ 125.850,00</span>
                  </div>
                </div>
              </div>

              {/* Trust Counter floating (Card 3) */}
              <div className="absolute -bottom-8 -right-6 bg-white border border-slate-100 text-slate-800 p-4 rounded-2xl shadow-xl z-20 max-w-[190px] hover:scale-105 transition-transform duration-300 hidden sm:block">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Fomento Homologado</span>
                <span className="font-display font-extrabold text-lg text-primary-blue block">R$ 500M+</span>
                <span className="text-[10px] text-slate-500 font-sans block leading-snug">antecipados para indústrias e comércio</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
