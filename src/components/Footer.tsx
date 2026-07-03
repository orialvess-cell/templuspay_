/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, MessageSquare, Phone, Mail, Landmark } from 'lucide-react';

interface FooterProps {
  onNavClick: (href: string) => void;
  setView: (view: 'landing' | 'dashboard') => void;
}

export default function Footer({ onNavClick, setView }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Absolute design accents */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Company Bio (Span 4) */}
          <div className="md:col-span-4 space-y-6">
            <div 
              onClick={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-lg">
                <span className="font-display font-bold text-base text-primary-blue">T</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg tracking-tight text-white leading-none">
                  TEMPLUS<span className="text-accent-gold">PAY</span>
                </span>
                <span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400">
                  Fomento e Tecnologia
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              Plataforma tecnológica inovadora focada na simplificação de fluxos de caixa e antecipação inteligente de recebíveis B2B para indústrias, comércio e prestadores de serviços em todo o Brasil.
            </p>

            {/* Certifications and secure tags */}
            <div className="flex items-center space-x-3 text-slate-500 text-xs pt-2">
              <ShieldCheck className="w-4 h-4 text-accent-gold" />
              <span>Conexão certificada de alta segurança (SSL)</span>
            </div>
          </div>

          {/* Quick links 1 (Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-accent-gold">
              Soluções Digitais
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => onNavClick('#services')} className="hover:text-accent-gold transition-colors cursor-pointer text-left">
                  Antecipação de Recebíveis
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('#services')} className="hover:text-accent-gold transition-colors cursor-pointer text-left">
                  Risco Sacado (Confirming)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('#services')} className="hover:text-accent-gold transition-colors cursor-pointer text-left">
                  Fomento Mercantil Estruturado
                </button>
              </li>
              <li>
                <button onClick={() => setView('dashboard')} className="hover:text-accent-gold transition-colors cursor-pointer text-left font-semibold text-white">
                  Área do Cliente (Demonstração)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links 2 (Span 2) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-accent-gold">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => onNavClick('#about')} className="hover:text-accent-gold transition-colors cursor-pointer text-left">
                  Quem Somos
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('#how-it-works')} className="hover:text-accent-gold transition-colors cursor-pointer text-left">
                  Como Funciona
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('#security')} className="hover:text-accent-gold transition-colors cursor-pointer text-left">
                  Segurança e LGPD
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts (Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-accent-gold">
              Fale Conosco
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                <span className="font-mono">0800 123 1986</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-accent-gold shrink-0" />
                <span className="font-mono">0800 123 1986 (WhatsApp)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                <span className="font-sans">contato@templuspay.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle compliance and legal text */}
        <div className="py-10 text-[10px] text-slate-500 leading-relaxed border-b border-slate-800 space-y-4">
          <p>
            <span className="font-bold text-slate-400">INFORMAÇÃO REGULATÓRIA IMPORTANTE:</span> O TEMPLUS PAY - Fomento e Tecnologia (CNPJ 45.678.901/0001-23) não é uma instituição financeira bancária. Atuamos como uma plataforma digital de fomento comercial e correspondente bancário em estrita conformidade com as diretrizes da Resolução CMN nº 4.935 de 03 de dezembro de 2021 do Banco Central do Brasil.
          </p>
          <p>
            A taxa de desconto comercial (deságio) informada nas simulações do portal é uma estimativa de mercado pro-rata temporis e varia de acordo com o histórico de crédito do emitente, a solidez financeira e classificação de risco do comprador (sacado), além do prazo médio de liquidação das faturas enviadas. Toda e qualquer operação de crédito e fomento está sujeita a análise cadastral, verificação de integridade fiscal de notas (NFe) na SEFAZ e assinatura eletrônica qualificada.
          </p>
        </div>

        {/* Bottom footer bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {currentYear} TEMPLUS PAY - Fomento e Tecnologia. Todos os direitos reservados. Feito com rigor tecnológico e profissionalismo.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 font-semibold">
            <a href="#security" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#security" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
