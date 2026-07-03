/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BadgePercent, Landmark, RefreshCw, Wallet, ShieldCheck, 
  UserCheck, Briefcase, Factory, FileCode2, Settings, Zap, Compass 
} from 'lucide-react';

export default function Features() {
  const services = [
    {
      title: 'Antecipação de Recebíveis',
      description: 'Transforme suas faturas, duplicatas, cheques e contratos em dinheiro imediato para o caixa. Tudo 100% online, sem burocracia.',
      icon: BadgePercent,
      tag: 'Mais procurado'
    },
    {
      title: 'Risco Sacado (Confirming)',
      description: 'Aproveite o excelente rating de crédito de seus grandes clientes compradores para conseguir taxas de desconto incrivelmente baixas.',
      icon: Landmark,
      tag: 'Grandes Cadeias'
    },
    {
      title: 'Fomento Mercantil & Factoring',
      description: 'Estruturação financeira de fomento comercial completa para apoiar a compra de matérias-primas e insumos de sua indústria.',
      icon: Wallet,
      tag: 'Corporativo'
    }
  ];

  const targetAudiences = [
    {
      title: 'Indústrias e Fábricas',
      description: 'Financie sua linha de produção adiantando notas de fornecimento e garanta a compra de matéria-prima no melhor momento.',
      icon: Factory,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Serviços e Tecnologia',
      description: 'Antecipe contratos de prestação de serviços continuados ou parcelas de projetos de tecnologia com rapidez.',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Comércio e Distribuidores',
      description: 'Mantenha os canais de abastecimento rodando e evite a falta de estoque aproveitando os recebíveis de vendas a prazo.',
      icon: UserCheck,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Cadastro Simples',
      description: 'Insira as informações da sua empresa de forma 100% digital e segura. Leva menos de 5 minutos.'
    },
    {
      step: '02',
      title: 'Upload das Notas XML',
      description: 'Sincronize ou suba os arquivos XML das suas NF-es autorizadas diretamente em nossa plataforma.'
    },
    {
      step: '03',
      title: 'Taxa Personalizada',
      description: 'Nosso motor de análise calcula o menor deságio possível de acordo com o sacado e o mercado.'
    },
    {
      step: '04',
      title: 'Pix na Conta',
      description: 'Assine o contrato eletronicamente com seu Certificado Digital e receba os fundos em minutos.'
    }
  ];

  return (
    <div className="space-y-24 py-20 bg-white">
      
      {/* Services Grid (Nossos Serviços) */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 Scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-accent-gold uppercase tracking-widest bg-light-gold px-3 py-1 rounded-full border border-accent-gold/20">
            Nossos Serviços Financeiros
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-blue tracking-tight mt-4 mb-3">
            Soluções completas de fomento para a sua empresa
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600">
            Oferecemos as ferramentas de antecipação de crédito ideais para cada porte de negócio, sem surpresas na taxa ou amarras bancárias tradicionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div 
              key={svc.title} 
              className="premium-card p-8 rounded-3xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors">
                    <svc.icon className="w-5 h-5 text-accent-gold" />
                  </div>
                  <span className="text-[10px] font-bold text-accent-gold bg-light-gold border border-accent-gold/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {svc.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-primary-blue mb-3">
                  {svc.title}
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed">
                  {svc.description}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-bold text-primary-blue">
                <span>Simular tarifas</span>
                <span className="group-hover:translate-x-1.5 transition-transform text-accent-gold">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target Segments Served (Para quem é) */}
      <section className="bg-slate-50/50 py-24 bg-grid-pattern border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
              Setores Atendidos
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-blue tracking-tight mt-4 mb-3">
              Estrutura de crédito sob medida para cada setor
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600">
              Facilitamos a negociação de recebíveis entre você e seus clientes comerciais in todos os maiores ramos de mercado nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudiences.map((target) => (
              <div 
                key={target.title} 
                className="premium-card rounded-3xl overflow-hidden flex flex-col group h-full shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-slate-100"
              >
                {/* Photo Header */}
                <div className="h-48 w-full overflow-hidden relative shrink-0">
                  <img 
                    src={target.image} 
                    alt={target.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle elegant gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-primary-blue/95 backdrop-blur-sm text-accent-gold flex items-center justify-center shadow-md border border-white/10">
                    <target.icon className="w-5 h-5 text-accent-gold" />
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-display font-bold text-lg text-primary-blue mb-2 group-hover:text-accent-gold transition-colors">
                      {target.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {target.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Step-by-Step (Como Funciona) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 Scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-accent-gold uppercase tracking-widest bg-light-gold px-3 py-1 rounded-full border border-accent-gold/20">
            Processo Ágil & Integrado
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-blue tracking-tight mt-4 mb-3">
            Sua antecipação de faturas em 4 passos simples
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600">
            Fomentamos as vendas da sua empresa sem que você precise enfrentar gerentes de bancos ou assinar calhamaços de papel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-1/3 left-1/8 right-1/8 h-0.5 bg-slate-100 -z-10" />

          {processSteps.map((step) => (
            <div key={step.step} className="premium-card p-6 rounded-2xl relative">
              {/* Step number circle */}
              <div className="w-10 h-10 rounded-full bg-primary-blue text-accent-gold font-display font-extrabold text-sm flex items-center justify-center absolute -top-5 left-6 shadow-md">
                {step.step}
              </div>
              <div className="pt-4">
                <h3 className="font-display font-bold text-base text-primary-blue mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Growth Showcase (Crescimento e Evolução) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photo Column - Executives Working */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop" 
                alt="Executivos analisando crescimento financeiro" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Overlay styling for modern dark blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/85 via-primary-blue/10 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
                <span className="text-[10px] font-bold text-accent-gold uppercase tracking-wider block mb-1">
                  Parceria de Confiança
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  "A agilidade de receber no mesmo dia transformou nossa relação com fornecedores. Reduzimos nosso ciclo de caixa pela metade."
                </p>
                <span className="text-[10px] text-slate-400 font-bold block mt-3">
                  — Roberto G., CFO de Indústria de Embalagens
                </span>
              </div>
            </div>
          </div>

          {/* Chart Column - Financial Evolution Graphic */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-light-gold px-3 py-1 rounded-full border border-accent-gold/20">
              <Compass className="w-4 h-4 text-accent-gold" />
              <span className="font-sans font-bold text-xs text-deep-gold uppercase tracking-wider">
                Evolução Financeira Planejada
              </span>
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-blue tracking-tight">
              Acelere o ciclo de capital de giro da sua empresa
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed">
              Empresas que aguardam 30, 60 ou 90 dias para receber de seus compradores enfrentam lacunas severas de fluxo de caixa. Com o <strong className="text-primary-blue">Templus Pay</strong>, o seu capital de giro é otimizado continuamente, permitindo compras de matéria-prima à vista com desconto e expansão imediata.
            </p>

            {/* Styled Financial Evolution Graphic Box */}
            <div className="bg-slate-50/70 border border-slate-200/50 p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Evolução do Caixa da Empresa</span>
                <span className="text-accent-gold flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Projeção de Ganho</span>
                </span>
              </div>

              {/* Graphic container (SVG) */}
              <div className="h-44 w-full relative pt-2">
                <svg viewBox="0 0 380 140" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="120" x2="380" y2="120" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="80" x2="380" y2="80" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="40" x2="380" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
                  
                  {/* Stagnant/Sawtooth Path (Without Templus) */}
                  <path 
                    d="M 10 120 L 50 80 L 50 120 L 110 85 L 110 120 L 180 90 L 180 120 L 260 95 L 260 120 L 370 100" 
                    fill="none" 
                    stroke="#EF4444" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Smooth Growth Path (With Templus) */}
                  <path 
                    d="M 10 120 Q 80 100 150 70 T 280 30 T 370 12" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />

                  {/* Exponential gradient fill below With Templus */}
                  <path 
                    d="M 10 120 Q 80 100 150 70 T 280 30 T 370 12 L 370 120 L 10 120 Z" 
                    fill="url(#emerald-gradient)" 
                    opacity="0.08"
                  />

                  {/* Definitions for Gradients */}
                  <defs>
                    <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Highlights/Dots */}
                  <circle cx="370" cy="12" r="5" fill="#10B981" />
                  <circle cx="370" cy="100" r="4" fill="#EF4444" />
                </svg>
              </div>

              {/* Graphic Legend */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] pt-2 border-t border-slate-200/50">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-1 bg-[#EF4444] rounded shrink-0" />
                  <span className="text-slate-500 font-medium">Bancos Tradicionais (Ciclo de 30-90 dias)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-1 bg-[#10B981] rounded shrink-0" />
                  <span className="text-primary-blue font-bold">Com Templus Pay (Liquidez diária)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Security Trust Block (Segurança) */}
      <section id="security" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 Scroll-mt-20">
        <div className="bg-gradient-to-r from-primary-blue to-[#082038] rounded-3xl p-8 sm:p-12 md:p-16 text-white relative overflow-hidden shadow-xl shadow-primary-blue/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 border border-white/5 text-accent-gold text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-accent-gold" />
                <span>Padrão Banco Central de Segurança</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
                Criptografia de ponta a ponta e total conformidade regulatória
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
                O Templus Pay opera sob as mais rígidas diretrizes regulatórias e de proteção de dados. Sincronização direta com a Receita Federal e barreira de segurança certificada para proteger todas as transações corporativas.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3.5 max-w-xs w-full">
                <span className="text-[10px] font-bold text-accent-gold uppercase tracking-wider block">Selos de Conformidade</span>
                <div className="flex items-center space-x-2 text-xs text-white/90 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                  <span>LGPD COMPLIANT</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-white/90 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                  <span>BANCO CENTRAL HOMOLOGADO</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-white/90 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                  <span>CRIPTOGRAFIA SSL 256-BIT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
