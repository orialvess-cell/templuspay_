/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileCode, Upload, CheckCircle, AlertCircle, RefreshCw, Landmark, 
  HelpCircle, Shield, FileSpreadsheet, Lock, ChevronRight, CheckSquare, Square, Check, ArrowUpRight,
  Calculator, Sparkles, Wallet
} from 'lucide-react';
import { Invoice } from '../types';
import Simulator from './Simulator';

export default function DashboardView() {
  // Pre-loaded realistic Brazilian invoices
  const initialInvoices: Invoice[] = [
    {
      id: 'inv-1',
      number: 'NF-e 4952',
      buyer: 'AMBEV S.A. (CNPJ: 07.526.557/0001-00)',
      value: 85000,
      dueDate: '15/08/2026',
      status: 'Pendente',
      discountRate: 1.55,
      netValue: 83200,
      xmlName: 'NFe_0004952_Ambev.xml'
    },
    {
      id: 'inv-2',
      number: 'NF-e 8241',
      buyer: 'LOJAS RENNER S.A. (CNPJ: 92.754.738/0001-62)',
      value: 42000,
      dueDate: '28/08/2026',
      status: 'Pendente',
      discountRate: 1.75,
      netValue: 40950,
      xmlName: 'NFe_0008241_Renner.xml'
    },
    {
      id: 'inv-3',
      number: 'NF-e 1109',
      buyer: 'MERCADO LIVRE S.A. (CNPJ: 03.007.331/0001-41)',
      value: 128000,
      dueDate: '10/09/2026',
      status: 'Pendente',
      discountRate: 1.45,
      netValue: 125850,
      xmlName: 'NFe_0001109_Meli.xml'
    }
  ];

  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [selectedIds, setSelectedIds] = useState<string[]>(['inv-1', 'inv-3']);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<'idle' | 'checking' | 'signing' | 'transferring' | 'completed'>('idle');
  const [simulationSuccessValue, setSimulationSuccessValue] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'carteira' | 'simulador'>('carteira');

  const handleOnAddSimulatedInvoice = (newInv: {
    number: string;
    buyer: string;
    value: number;
    days: number;
    dueDate: string;
    discountRate: number;
    netValue: number;
    xmlName: string;
  }) => {
    const invoice: Invoice = {
      id: `inv-sim-${Date.now()}`,
      number: newInv.number,
      buyer: newInv.buyer,
      value: newInv.value,
      dueDate: newInv.dueDate,
      status: 'Pendente',
      discountRate: newInv.discountRate,
      netValue: newInv.netValue,
      xmlName: newInv.xmlName
    };
    setInvoices((prev) => [invoice, ...prev]);
    setSelectedIds((prev) => [...prev, invoice.id]);
    setActiveTab('carteira');
  };

  // XML drag and drop simulator
  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        number: `NF-e ${Math.floor(Math.random() * 9000) + 1000}`,
        buyer: 'PETROBRAS S.A. (CNPJ: 33.000.167/0001-01)',
        value: 195000,
        dueDate: '30/09/2026',
        status: 'Pendente',
        discountRate: 1.35,
        netValue: 191800,
        xmlName: `NFe_0009412_Petrobras.xml`
      };
      setInvoices((prev) => [newInvoice, ...prev]);
      setSelectedIds((prev) => [...prev, newInvoice.id]);
      setIsUploading(false);
    }, 1200);
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    const pendings = invoices.filter(inv => inv.status === 'Pendente');
    if (selectedIds.length === pendings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendings.map(inv => inv.id));
    }
  };

  // Calculations
  const selectedInvoices = invoices.filter(inv => selectedIds.includes(inv.id) && inv.status === 'Pendente');
  const totalGross = selectedInvoices.reduce((acc, curr) => acc + curr.value, 0);
  const totalNet = selectedInvoices.reduce((acc, curr) => acc + curr.netValue, 0);
  const totalDiscount = totalGross - totalNet;

  const handleStartAnticipate = () => {
    if (selectedInvoices.length === 0) return;
    setSimulationSuccessValue(totalNet);
    setActiveStep('checking');
    
    // Step 1: Check SEFAZ validation
    setTimeout(() => {
      setActiveStep('signing');
    }, 2000);
  };

  const handleSignDigital = () => {
    setActiveStep('transferring');
    // Step 2: Simulate Transfer & Contract creation
    setTimeout(() => {
      // Mark selected invoices as Anticipated
      setInvoices(prev => 
        prev.map(inv => 
          selectedIds.includes(inv.id) 
            ? { ...inv, status: 'Antecipado' } 
            : inv
        )
      );
      setSelectedIds([]);
      setActiveStep('completed');
    }, 2500);
  };

  const handleResetFlow = () => {
    setActiveStep('idle');
  };

  const handleResetInvoices = () => {
    setInvoices(initialInvoices);
    setSelectedIds(['inv-1', 'inv-3']);
  };

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner/Header */}
        <div className="relative overflow-hidden rounded-3xl bg-primary-blue text-white p-8 sm:p-10 mb-8 shadow-xl border border-white/5">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-25">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
              alt="Ambiente Executivo de Negócios" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-blue via-primary-blue/80 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-accent-gold uppercase tracking-wider mb-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Modo Demonstração Ativo</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Área do Cliente <span className="text-accent-gold font-light">| Portal Templus Pay</span>
              </h1>
              <p className="font-sans text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Visualize na prática a facilidade de antecipar faturas na nossa plataforma segura e homologada. Suba ou simule as suas DANFEs para saques automáticos no mesmo dia.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button 
                onClick={handleResetInvoices}
                className="text-xs font-semibold text-white hover:text-primary-blue bg-white/10 hover:bg-white border border-white/15 px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Resetar Notas de Teste
              </button>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 flex items-center space-x-3 text-white">
                <div className="w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center text-primary-blue font-bold text-sm">
                  JS
                </div>
                <div>
                  <div className="text-xs font-bold">Silva Comercial Ltda</div>
                  <div className="text-[10px] text-slate-300 font-mono">CNPJ: 12.345.678/0001-90</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Widgets Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="premium-card p-6 rounded-2xl">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Limite de Crédito Aprovado
            </span>
            <div className="font-display font-bold text-2xl text-primary-blue">
              R$ 500.000,00
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
              <span>Disponível para saque:</span>
              <span className="font-bold text-emerald-600">R$ 480.000,00</span>
            </div>
          </div>

          <div className="premium-card p-6 rounded-2xl">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Taxa Média da Empresa
            </span>
            <div className="font-display font-bold text-2xl text-primary-blue flex items-baseline space-x-1">
              <span>1,55%</span>
              <span className="text-sm font-sans font-normal text-slate-400">/mês</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
              <span>Risco de crédito:</span>
              <span className="font-bold text-secondary-blue uppercase tracking-wider">Grau Excelente (A+)</span>
            </div>
          </div>

          <div className="premium-card p-6 rounded-2xl">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Total já Antecipado (Acumulado)
            </span>
            <div className="font-display font-bold text-2xl text-primary-blue">
              R$ 1.285.000,00
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
              <span>Economia gerada em juros:</span>
              <span className="font-bold text-emerald-600">~R$ 42.150,00</span>
            </div>
          </div>

          <div className="premium-card p-6 rounded-2xl">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Balanço Pendente de Cobrança
            </span>
            <div className="font-display font-bold text-2xl text-primary-blue">
              R$ 310.000,00
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
              <span>Vencimentos nos próximos:</span>
              <span className="font-bold text-slate-600">30 dias</span>
            </div>
          </div>

        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 mb-8 mt-6">
          <button
            onClick={() => setActiveTab('carteira')}
            className={`pb-4 px-6 font-display font-bold text-sm tracking-tight flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'carteira'
                ? 'border-accent-gold text-primary-blue'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Wallet className="w-4 h-4 text-accent-gold" />
            <span>Minha Carteira & Antecipações</span>
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`pb-4 px-6 font-display font-bold text-sm tracking-tight flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'simulador'
                ? 'border-accent-gold text-primary-blue'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Calculator className="w-4 h-4 text-accent-gold" />
            <span>Simulador de DANFE Inteligente (AI)</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full">
              Novo
            </span>
          </button>
        </div>

        {activeTab === 'simulador' ? (
          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-10 mb-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center space-x-2 text-xs font-semibold text-accent-gold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Análise de Danfe via Inteligência Artificial</span>
              </div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-primary-blue tracking-tight mb-2">
                Simulador Inteligente com Leitura de PDF
              </h2>
              <p className="font-sans text-sm text-slate-500 mb-8 max-w-3xl">
                Arraste um PDF da DANFE real ou ajuste os parâmetros manuais abaixo. O sistema lerá os campos e preencherá a simulação automaticamente. Após simular, você pode incluir o título diretamente na sua carteira de recebíveis para saque imediato!
              </p>
              <Simulator isDashboardMode={true} onAddSimulatedInvoice={handleOnAddSimulatedInvoice} />
            </div>
          </div>
        ) : (
          /* Dashboard Main layout: Grid 12 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - XML Upload & Notes Table (Span 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* XML Upload Simulated Zone */}
            <div 
              onClick={handleSimulateUpload}
              className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-accent-gold hover:bg-slate-50/50 transition-all text-center cursor-pointer relative group overflow-hidden"
              id="xml-uploader-zone"
            >
              {isUploading ? (
                <div className="py-6 flex flex-col items-center justify-center space-y-3">
                  <RefreshCw className="w-10 h-10 text-accent-gold animate-spin" />
                  <p className="font-sans font-semibold text-sm text-slate-700">Lendo arquivos XML e validando assinaturas...</p>
                  <p className="text-xs text-slate-400">Consultando integridade com a SEFAZ Nacional</p>
                </div>
              ) : (
                <div className="py-4">
                  <div className="w-14 h-14 bg-light-gold rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent-gold/20 group-hover:scale-105 transition-transform duration-200">
                    <Upload className="w-7 h-7 text-accent-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-primary-blue mb-1">
                    Arraste ou clique para enviar arquivos XML de NF-e
                  </h3>
                  <p className="font-sans text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Você pode subir arquivos individuais ou pastas inteiras de notas fiscais. Nosso motor inteligente analisa e lista as faturas instantaneamente.
                  </p>
                  <div className="inline-flex items-center space-x-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 mt-4 text-[10px] text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-accent-gold" />
                    <span>Ambiente criptografado AES-256 em conformidade com a LGPD</span>
                  </div>
                </div>
              )}
            </div>

            {/* Invoices List Table Card */}
            <div className="premium-card rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="font-display font-semibold text-base text-primary-blue">
                    Duplicatas e Notas Fiscais
                  </h3>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    Selecione as notas pendentes de análise para antecipar o crédito imediatamente.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={toggleSelectAll}
                    className="text-xs font-semibold text-slate-600 hover:text-primary-blue border border-slate-200 bg-white px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    {selectedIds.length === invoices.filter(inv => inv.status === 'Pendente').length ? 'Desmarcar Todas' : 'Selecionar Todas'}
                  </button>
                </div>
              </div>

              {/* Invoices List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse" id="invoices-table">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/20 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6 w-12 text-center">Sel.</th>
                      <th className="py-4 px-4">Nota / Emitente</th>
                      <th className="py-4 px-4">Sacado (Comprador)</th>
                      <th className="py-4 px-4 text-right">Valor Líquido</th>
                      <th className="py-4 px-4 text-center">Vencimento</th>
                      <th className="py-4 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv) => {
                      const isSelected = selectedIds.includes(inv.id);
                      const isPending = inv.status === 'Pendente';
                      
                      return (
                        <tr 
                          key={inv.id} 
                          className={`hover:bg-slate-50/50 transition-colors ${isSelected && isPending ? 'bg-light-gold/30' : ''}`}
                        >
                          {/* Selector */}
                          <td className="py-4 px-6 text-center">
                            {isPending ? (
                              <button 
                                onClick={() => toggleSelect(inv.id)}
                                className="text-primary-blue hover:text-secondary-blue transition-colors focus:outline-none cursor-pointer"
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-5 h-5 text-accent-gold fill-light-gold" />
                                ) : (
                                  <Square className="w-5 h-5 text-slate-300" />
                                )}
                              </button>
                            ) : (
                              <div className="w-5 h-5 mx-auto rounded-full bg-emerald-50 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              </div>
                            )}
                          </td>

                          {/* Note / Filename */}
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                <FileCode className="w-4 h-4 text-primary-blue" />
                              </div>
                              <div>
                                <span className="text-sm font-bold text-slate-800 block leading-tight">{inv.number}</span>
                                <span className="text-[10px] text-slate-400 block font-mono">{inv.xmlName}</span>
                              </div>
                            </div>
                          </td>

                          {/* Buyer */}
                          <td className="py-4 px-4">
                            <span className="text-xs font-semibold text-slate-700 max-w-xs block truncate" title={inv.buyer}>
                              {inv.buyer.split(' (')[0]}
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono block">
                              {inv.buyer.includes('CNPJ') ? inv.buyer.split('CNPJ: ')[1]?.replace(')', '') : 'CNPJ Privado'}
                            </span>
                          </td>

                          {/* Gross / Net value */}
                          <td className="py-4 px-4 text-right">
                            <span className="text-sm font-bold text-primary-blue block">{formatBRL(inv.netValue)}</span>
                            <span className="text-[10px] text-slate-400 block line-through">{formatBRL(inv.value)}</span>
                          </td>

                          {/* Due Date */}
                          <td className="py-4 px-4 text-center">
                            <span className="text-xs font-medium text-slate-600">{inv.dueDate}</span>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inv.status === 'Antecipado'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : inv.status === 'Pendente'
                                ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column - Summary & Execution Engine (Span 4) */}
          <div className="lg:col-span-4 premium-card p-6 rounded-2xl space-y-6">
            
            <h3 className="font-display font-semibold text-lg text-primary-blue flex items-center justify-between">
              <span>Resumo do Saque</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                {selectedInvoices.length} selecionada(s)
              </span>
            </h3>

            {/* Calculations Breakdown */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Valor Bruto Acumulado:</span>
                <span className="font-mono font-semibold text-slate-800">{formatBRL(totalGross)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Desconto de Taxa Média:</span>
                <span className="font-mono font-semibold text-rose-500">-{formatBRL(totalDiscount)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Impostos / IOF:</span>
                <span className="font-mono font-semibold text-rose-500">-R$ 0,00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Tarifa de Plataforma:</span>
                <span className="font-mono font-semibold text-slate-400">R$ 0,00 (Cortesia)</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">
                    Crédito Líquido Disponível:
                  </span>
                  <span className="font-display font-black text-2xl text-accent-gold" id="dashboard-total-net">
                    {formatBRL(totalNet)}
                  </span>
                </div>
                <div className="text-right text-[10px] text-slate-400 leading-tight">
                  Pago via <span className="font-bold text-emerald-600">PIX</span> hoje
                </div>
              </div>
            </div>

            {/* Dynamic Interactive Flow Simulation */}
            <div className="pt-4 border-t border-slate-100">
              {activeStep === 'idle' && (
                <button
                  onClick={handleStartAnticipate}
                  disabled={selectedInvoices.length === 0}
                  className={`w-full py-4 px-6 rounded-xl font-display font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all ${
                    selectedInvoices.length > 0
                      ? 'bg-primary-blue hover:bg-secondary-blue text-white cursor-pointer hover:scale-[1.01]'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                  id="btn-trigger-anticipation-dashboard"
                >
                  <span>Solicitar Antecipação</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}

              {/* Simulated active steps (Visual micro-interaction) */}
              {activeStep !== 'idle' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                  
                  {activeStep === 'checking' && (
                    <div className="flex flex-col items-center justify-center text-center py-4 space-y-3">
                      <RefreshCw className="w-8 h-8 text-accent-gold animate-spin" />
                      <div>
                        <h4 className="font-sans font-bold text-sm text-primary-blue">Validando com a SEFAZ...</h4>
                        <p className="text-xs text-slate-500 mt-1">Conectando ao banco de dados nacional das Notas Fiscais para certificar o aceite do sacado.</p>
                      </div>
                    </div>
                  )}

                  {activeStep === 'signing' && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-amber-600">
                        <Shield className="w-5 h-5 shrink-0" />
                        <h4 className="font-display font-bold text-sm">Assinatura Digital de Contrato</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        Um aditivo ao contrato de fomento foi gerado com segurança em seu e-CNPJ.
                      </p>
                      <button
                        onClick={handleSignDigital}
                        className="w-full bg-accent-gold text-primary-blue hover:bg-deep-gold hover:text-white py-3 rounded-lg font-sans font-bold text-xs transition-all cursor-pointer shadow-sm"
                        id="btn-sign-contract"
                      >
                        Assinar com Certificado e-CNPJ
                      </button>
                    </div>
                  )}

                  {activeStep === 'transferring' && (
                    <div className="flex flex-col items-center justify-center text-center py-4 space-y-3">
                      <RefreshCw className="w-8 h-8 text-accent-gold animate-spin" />
                      <div>
                        <h4 className="font-sans font-bold text-sm text-primary-blue">Liberando o Pix...</h4>
                        <p className="text-xs text-slate-500 mt-1">Nossos sistemas integrados de API do Banco Central estão efetuando a transferência instantânea de liquidez.</p>
                      </div>
                    </div>
                  )}

                  {activeStep === 'completed' && (
                    <div className="flex flex-col items-center justify-center text-center py-4 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-emerald-700">Operação Concluída com Sucesso!</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          O montante líquido de <span className="font-bold">{formatBRL(simulationSuccessValue)}</span> foi creditado com sucesso em sua conta bancária via Pix.
                        </p>
                      </div>
                      <button
                        onClick={handleResetFlow}
                        className="w-full text-xs font-semibold text-slate-600 hover:text-primary-blue border border-slate-200 bg-white py-2 rounded-lg cursor-pointer transition-colors"
                        id="btn-back-to-invoices"
                      >
                        Voltar para a Lista
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick stats on security */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-150 space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Garantias de Compliance</span>
              <div className="flex items-center space-x-2 text-xs text-slate-600">
                <Check className="w-4 h-4 text-accent-gold" />
                <span>Auditorias diárias de custódia</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-600">
                <Check className="w-4 h-4 text-accent-gold" />
                <span>Conexão direta SEFAZ (Nacional)</span>
              </div>
            </div>

          </div>

        </div>
        )}

      </div>
    </div>
  );
}
