/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Calculator, CheckCircle2, Percent, TrendingUp, Sparkles, HelpCircle, FileText, Upload, Loader2, AlertCircle, Trash2 } from 'lucide-react';

interface SimulatorProps {
  onStartSignUp?: (simulatedAmount: number) => void;
  isDashboardMode?: boolean;
  onAddSimulatedInvoice?: (invoice: {
    number: string;
    buyer: string;
    value: number;
    days: number;
    dueDate: string;
    discountRate: number;
    netValue: number;
    xmlName: string;
  }) => void;
}

export default function Simulator({ onStartSignUp, isDashboardMode = false, onAddSimulatedInvoice }: SimulatorProps) {
  const [amount, setAmount] = useState<number>(150000);
  const [days, setDays] = useState<number>(45);
  
  // Dynamic monthly rate depending on amount (larger amount = better rate)
  const [monthlyRate, setMonthlyRate] = useState<number>(1.85);
  const [discountFee, setDiscountFee] = useState<number>(0);
  const [iofFee, setIofFee] = useState<number>(0);
  const [platformFee, setPlatformFee] = useState<number>(150);
  const [netReceive, setNetReceive] = useState<number>(0);

  // States for DANFE parsing and upload
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedDoc, setParsedDoc] = useState<{
    emitterName?: string;
    emitterCnpj?: string;
    recipientName?: string;
    recipientCnpj?: string;
    invoiceNumber?: string;
    totalValue?: number;
    days?: number;
  } | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Helper to read file to base64
  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Str = result.split(',')[1];
        resolve(base64Str);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Process the uploaded file
  const handleFile = async (file: File) => {
    if (!file) return;

    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setParseError('Formato inválido. Por favor, envie uma DANFE em PDF ou Imagem (PNG/JPG).');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setParseError('Arquivo muito grande. O limite máximo é de 12MB.');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setParsedDoc(null);

    try {
      const base64 = await toBase64(file);
      
      const response = await fetch('/api/parse-danfe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileData: base64,
          mimeType: file.type,
          fileName: file.name,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Erro ao processar o arquivo no servidor.');
      }

      const data = await response.json();
      
      if (data.totalValue && data.totalValue > 0) {
        setAmount(data.totalValue);
      }
      if (data.days && data.days > 0) {
        setDays(data.days);
      }
      
      setParsedDoc(data);
    } catch (err: any) {
      console.error(err);
      setParseError(err.message || 'Falha ao analisar a DANFE. Tente outro arquivo ou ajuste manualmente.');
    } finally {
      setIsParsing(false);
    }
  };

  // Process a high-fidelity demo invoice instantly for testing
  const handleLoadDemo = async () => {
    setIsParsing(true);
    setParseError(null);
    setParsedDoc(null);
    
    // Simulate processing delay for nice UX
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const demoData = {
      totalValue: 185450.00,
      days: 45,
      emitterName: "Indústria de Embalagens Progresso S/A",
      emitterCnpj: "44.123.456/0001-99",
      recipientName: "Alimentos Estrela do Sul Distribuidora Ltda",
      recipientCnpj: "10.987.654/0001-22",
      invoiceNumber: "000.324.912",
      isDemo: true
    };
    
    setAmount(demoData.totalValue);
    setDays(demoData.days);
    setParsedDoc(demoData);
    setIsParsing(false);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    // Calculate dynamic rate based on amount
    let rate = 2.35; // base rate
    if (amount >= 300000) {
      rate = 1.45;
    } else if (amount >= 150000) {
      rate = 1.75;
    } else if (amount >= 50000) {
      rate = 1.95;
    } else if (amount >= 20000) {
      rate = 2.15;
    }
    setMonthlyRate(rate);

    // Platform fee scales with ticket size
    const platform = amount >= 250000 ? 300 : amount >= 100000 ? 190 : 95;
    setPlatformFee(platform);

    // Calculate discount fee (simple pro-rata calculation)
    const dailyRate = (rate / 100) / 30;
    const discount = amount * dailyRate * days;
    setDiscountFee(discount);

    // Calculate Brazilian IOF (approximately 0.38% flat + 0.0041% per day for PJ credit)
    const iofFlat = amount * 0.0038;
    const iofDaily = amount * 0.000041 * days;
    const iof = iofFlat + iofDaily;
    setIofFee(iof);

    // Calculate final value
    const finalNet = amount - discount - iof - platform;
    setNetReceive(finalNet > 0 ? finalNet : 0);
  }, [amount, days]);

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className={isDashboardMode ? "w-full animate-in fade-in duration-300" : "py-24 bg-white relative overflow-hidden"}>
      {!isDashboardMode && (
        <>
          {/* Decorative ambient blobs */}
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-light-gold/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-slate-50 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className={isDashboardMode ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"}>
        {!isDashboardMode && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-light-gold px-3.5 py-1.5 rounded-full mb-4 border border-accent-gold/20">
              <Calculator className="w-4 h-4 text-accent-gold" />
              <span className="font-sans font-semibold text-xs text-deep-gold uppercase tracking-wider">
                Simulador Online em Tempo Real
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-blue tracking-tight mb-4">
              Simule e saiba o valor líquido de sua antecipação na hora
            </h2>
            <p className="font-sans text-base text-slate-600">
              Calculamos com base nas melhores taxas do mercado. Transparência total: você visualiza todos os custos antes de enviar sua proposta.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sliders / Inputs - Grid Span 7 */}
          <div className="lg:col-span-7 premium-card p-6 sm:p-10 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-xl text-primary-blue mb-8 flex items-center gap-2">
                <span>Parâmetros de Simulação</span>
                <Sparkles className="w-4 h-4 text-accent-gold" />
              </h3>

              {/* DANFE Upload / Reader Section */}
              <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans font-semibold text-sm text-primary-blue flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent-gold" />
                    <span>Importar DANFE Real para Teste</span>
                  </span>
                  <span className="text-[10px] bg-accent-gold/10 text-deep-gold font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-accent-gold/20 font-sans">
                    Tecnologia AI
                  </span>
                </div>

                {/* Drag and drop zone */}
                {!isParsing && !parsedDoc && (
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 transition-all text-center relative cursor-pointer group ${
                      dragActive 
                        ? 'border-accent-gold bg-light-gold/40' 
                        : 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <input 
                      type="file" 
                      id="danfe-upload-input" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      accept="application/pdf,image/png,image/jpeg,image/jpg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFile(e.target.files[0]);
                        }
                      }}
                    />
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-accent-gold mx-auto mb-2 transition-colors duration-200" />
                    <p className="font-sans text-sm text-slate-700 font-medium mb-1">
                      Arraste e solte o PDF/Imagem da DANFE aqui
                    </p>
                    <p className="font-sans text-xs text-slate-500">
                      ou <span className="text-primary-blue font-semibold underline group-hover:text-secondary-blue">clique para selecionar</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-3">
                      Suporta PDF, PNG ou JPEG (máx. 12MB)
                    </p>
                    <div className="relative my-3.5 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); }}>
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                      </div>
                      <span className="relative bg-white px-2 text-[10px] uppercase text-slate-400 font-bold">ou</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLoadDemo();
                      }}
                      className="relative z-10 font-sans text-xs font-bold text-deep-gold hover:text-white bg-accent-gold/15 hover:bg-primary-blue px-4 py-2 rounded-lg border border-accent-gold/30 hover:border-primary-blue transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accent-gold group-hover:text-white" />
                      Testar com DANFE de Exemplo
                    </button>
                  </div>
                )}

                {/* Parsing / Loading state */}
                {isParsing && (
                  <div className="border border-slate-200 rounded-xl p-8 bg-white text-center flex flex-col items-center justify-center space-y-4 animate-pulse">
                    <Loader2 className="w-10 h-10 text-accent-gold animate-spin" />
                    <div className="space-y-1">
                      <p className="font-sans text-sm text-primary-blue font-bold">
                        Lendo e interpretando DANFE...
                      </p>
                      <p className="font-sans text-xs text-slate-500 max-w-xs mx-auto">
                        O Gemini 3.5 Flash está processando o documento para preencher o simulador automaticamente.
                      </p>
                    </div>
                  </div>
                )}

                {/* Success / Parsed metadata */}
                {!isParsing && parsedDoc && (
                  <div className="border border-emerald-100 bg-emerald-50/40 rounded-xl p-5 relative animate-in fade-in duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span className="font-sans font-bold text-sm text-emerald-800">
                          DANFE Carregada com Sucesso!
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          setParsedDoc(null);
                          setParseError(null);
                        }}
                        className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title="Remover documento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2 bg-white p-4 rounded-xl border border-emerald-100/60 shadow-sm">
                      {parsedDoc.invoiceNumber && (
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Nº da Nota</span>
                          <span className="font-mono text-xs font-semibold text-slate-700">{parsedDoc.invoiceNumber}</span>
                        </div>
                      )}
                      {parsedDoc.totalValue && (
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Valor Total</span>
                          <span className="font-mono text-xs font-bold text-emerald-600">{formatBRL(parsedDoc.totalValue)}</span>
                        </div>
                      )}
                      {parsedDoc.emitterName && (
                        <div className="sm:col-span-2 border-t border-slate-100 pt-2.5">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Emitente</span>
                          <span className="font-sans text-xs font-medium text-slate-700 block truncate" title={parsedDoc.emitterName}>
                            {parsedDoc.emitterName}
                          </span>
                          {parsedDoc.emitterCnpj && (
                            <span className="font-mono text-[10px] text-slate-400 block mt-0.5">CNPJ: {parsedDoc.emitterCnpj}</span>
                          )}
                        </div>
                      )}
                      {parsedDoc.recipientName && (
                        <div className="sm:col-span-2 border-t border-slate-100 pt-2.5">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Destinatário (Sacado)</span>
                          <span className="font-sans text-xs font-medium text-slate-700 block truncate" title={parsedDoc.recipientName}>
                            {parsedDoc.recipientName}
                          </span>
                          {parsedDoc.recipientCnpj && (
                            <span className="font-mono text-[10px] text-slate-400 block mt-0.5">CNPJ: {parsedDoc.recipientCnpj}</span>
                          )}
                        </div>
                      )}
                      {parsedDoc.days && (
                        <div className="sm:col-span-2 border-t border-slate-100 pt-2.5">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Prazo Médio Estimado</span>
                          <span className="font-mono text-xs font-semibold text-slate-700">
                            {parsedDoc.days} dias de antecedência
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {!isParsing && parseError && (
                  <div className="border border-rose-150 bg-rose-50/50 rounded-xl p-4 mt-3 flex items-start gap-3 animate-in fade-in duration-300">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div className="flex-grow">
                      <p className="font-sans text-xs font-bold text-rose-800">Falha ao processar a DANFE</p>
                      <p className="font-sans text-[11px] text-rose-600 mt-1">{parseError}</p>
                      <button 
                        onClick={() => setParseError(null)}
                        className="text-[10px] text-rose-700 hover:text-rose-900 font-bold underline mt-2 block cursor-pointer"
                      >
                        Tentar Novamente
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Slider 1: Amount */}
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <label className="font-sans font-semibold text-slate-700 text-sm">
                    Valor total das Notas Fiscais (NF-e)
                  </label>
                  <span className="font-mono font-bold text-xl text-primary-blue bg-white px-4 py-1.5 rounded-xl border border-accent-gold/20 shadow-sm">
                    {formatBRL(amount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
                  id="range-amount"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>R$ 5 mil</span>
                  <span>R$ 250 mil</span>
                  <span>R$ 500 mil</span>
                </div>
              </div>

              {/* Slider 2: Term (Days) */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <label className="font-sans font-semibold text-slate-700 text-sm">
                    Prazo médio de recebimento (Dias)
                  </label>
                  <span className="font-mono font-bold text-xl text-primary-blue bg-white px-4 py-1.5 rounded-xl border border-accent-gold/20 shadow-sm">
                    {days} {days === 1 ? 'dia' : 'dias'}
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
                  id="range-days"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>15 dias</span>
                  <span>60 dias</span>
                  <span>120 dias</span>
                </div>
              </div>
            </div>

            {/* Quick selectors for user ease */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center">Atalhos rápidos:</span>
              {[20000, 50000, 150000, 300000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    amount === val 
                    ? 'bg-primary-blue text-white border-primary-blue' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {formatBRL(val).replace(',00', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Card - Grid Span 5 */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary-blue to-[#0e3152] text-white p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-xl shadow-primary-blue/10 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="pb-6 border-b border-white/10">
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-1">
                  Valor Estimado a Receber (Líquido)
                </span>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-accent-gold tracking-tight" id="simulated-net-receive">
                  {formatBRL(netReceive)}
                </div>
                <div className="text-[11px] text-white/50 flex items-center gap-1 mt-1">
                  <span>Sujeito a análise de crédito</span>
                  <HelpCircle className="w-3 h-3 cursor-help" title="Cálculo simulado conforme tarifas vigentes e risco PJ." />
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="py-6 space-y-4" id="simulated-breakdown">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <Percent className="w-4 h-4 text-accent-gold/80" />
                    <span>Taxa Aplicada</span>
                  </div>
                  <span className="font-mono font-bold text-sm bg-white/10 px-2.5 py-0.5 rounded-md text-accent-gold">
                    {monthlyRate.toFixed(2)}% a.m.
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/75">Valor Bruto Solicitado</span>
                  <span className="font-mono font-medium text-white/90">{formatBRL(amount)}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/75">Deságio Comercial (Juros)</span>
                  <span className="font-mono text-rose-300 font-medium">-{formatBRL(discountFee)}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/75 flex items-center gap-1">
                    IOF Federal PJ
                  </span>
                  <span className="font-mono text-rose-300 font-medium">-{formatBRL(iofFee)}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/75">Tarifa Operacional</span>
                  <span className="font-mono text-rose-300 font-medium">-{formatBRL(platformFee)}</span>
                </div>
              </div>

              {/* Confidence badges */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dinheiro pago no mesmo dia útil via Pix</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sem reciprocidade comercial exigida por bancos</span>
                </div>
              </div>
            </div>

            {/* Action Call */}
            <div className="pt-8 relative z-10">
              <button
                onClick={() => {
                  if (isDashboardMode && onAddSimulatedInvoice) {
                    // Calculate precise due date based on chosen days
                    const today = new Date();
                    const dueDate = new Date(today.setDate(today.getDate() + days));
                    const formattedDueDate = dueDate.toLocaleDateString('pt-BR');
                    
                    onAddSimulatedInvoice({
                      number: parsedDoc?.invoiceNumber || `NF-e ${Math.floor(1000 + Math.random() * 8999)}`,
                      buyer: parsedDoc?.recipientName 
                        ? `${parsedDoc.recipientName} (CNPJ: ${parsedDoc.recipientCnpj || '12.345.678/0001-00'})` 
                        : 'COMPRADOR PARCEIRO BRASIL S/A (CNPJ: 11.222.333/0001-44)',
                      value: amount,
                      days: days,
                      dueDate: formattedDueDate,
                      discountRate: monthlyRate,
                      netValue: netReceive,
                      xmlName: parsedDoc?.invoiceNumber ? `DANFE_Extraida_${parsedDoc.invoiceNumber}.pdf` : `Simulacao_${Math.floor(1000 + Math.random() * 9000)}.pdf`
                    });
                  } else if (onStartSignUp) {
                    onStartSignUp(amount);
                  }
                }}
                className="w-full flex items-center justify-center space-x-3 bg-accent-gold hover:bg-white text-primary-blue hover:text-primary-blue px-6 py-4 rounded-2xl font-display font-bold text-base transition-all duration-200 shadow-md hover:scale-[1.01] cursor-pointer group"
                id="btn-submit-simulation"
              >
                <span>{isDashboardMode ? 'Adicionar Nota ao Saque' : 'Antecipar Agora'}</span>
                <ArrowRight className="w-4 h-4 text-primary-blue group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-center mt-3">
                <span className="text-[10px] text-white/50 tracking-wide font-sans block max-w-sm mx-auto leading-relaxed">
                  Isso é apenas uma simulação os valores de taxas, tarifas e tributação podem variar conforme Estado.
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
