/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Send, Phone, CheckCircle2, Building, ShieldCheck, Mail, User, Info, Sparkles } from 'lucide-react';
import { LeadInput } from '../types';

interface ContactFormProps {
  initialAmount?: number;
  onSuccessSubmit?: () => void;
}

export default function ContactForm({ initialAmount, onSuccessSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<LeadInput>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    cnpj: '',
    monthlyRevenue: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadInput, string>>>({});

  // Auto populate a customized message if an initial amount was simulated
  useEffect(() => {
    if (initialAmount && initialAmount > 0) {
      setFormData(prev => ({
        ...prev,
        message: `Gostaria de analisar uma proposta para antecipar aproximadamente R$ ${initialAmount.toLocaleString('pt-BR')},00 em notas fiscais.`
      }));
    }
  }, [initialAmount]);

  const validate = () => {
    const tempErrors: Partial<Record<keyof LeadInput, string>> = {};
    if (!formData.name) tempErrors.name = 'Nome completo é obrigatório.';
    if (!formData.email) {
      tempErrors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'E-mail inválido.';
    }
    if (!formData.phone) {
      tempErrors.phone = 'Telefone é obrigatório.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      tempErrors.phone = 'Insira um telefone/WhatsApp válido.';
    }
    if (!formData.companyName) tempErrors.companyName = 'Nome da empresa é obrigatório.';
    if (!formData.cnpj) {
      tempErrors.cnpj = 'CNPJ é obrigatório.';
    } else if (formData.cnpj.replace(/\D/g, '').length !== 14) {
      tempErrors.cnpj = 'CNPJ deve conter exatamente 14 dígitos.';
    }
    if (!formData.monthlyRevenue) tempErrors.monthlyRevenue = 'Selecione o faturamento mensal.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic mask for CNPJ: 00.000.000/0000-00
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 14) value = value.slice(0, 14);
    
    let formatted = value;
    if (value.length > 2) formatted = value.slice(0, 2) + '.' + value.slice(2);
    if (value.length > 5) formatted = formatted.slice(0, 6) + '.' + formatted.slice(6);
    if (value.length > 8) formatted = formatted.slice(0, 10) + '/' + formatted.slice(10);
    if (value.length > 12) formatted = formatted.slice(0, 15) + '-' + formatted.slice(15);
    
    setFormData(prev => ({ ...prev, cnpj: formatted }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic mask for Phone: (00) 00000-0000
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = value;
    if (value.length > 0) formatted = '(' + value;
    if (value.length > 2) formatted = formatted.slice(0, 3) + ') ' + formatted.slice(3);
    if (value.length > 7) {
      if (value.length === 11) {
        // Celular: (XX) 9XXXX-XXXX
        formatted = formatted.slice(0, 10) + '-' + formatted.slice(10);
      } else {
        // Fixo: (XX) XXXX-XXXX
        formatted = formatted.slice(0, 9) + '-' + formatted.slice(9);
      }
    }
    
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      if (onSuccessSubmit) onSuccessSubmit();
    }, 1500);
  };

  return (
    <section id="about" className="py-24 bg-slate-50 relative scroll-mt-20">
      {/* Background design accents */}
      <div className="absolute top-1/2 -right-64 w-96 h-96 bg-light-gold/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Descriptive Content Panel - Grid Span 5 */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div>
              <div className="inline-flex items-center space-x-2 bg-light-gold px-3.5 py-1.5 rounded-full mb-4 border border-accent-gold/20">
                <Sparkles className="w-4 h-4 text-accent-gold" />
                <span className="font-sans font-semibold text-xs text-deep-gold uppercase tracking-wider">
                  Abra sua Conta Grátis
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-blue tracking-tight mb-4">
                Fale com um especialista e comece a antecipar hoje
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Preencha o formulário e nossa equipe de análise criará sua conta PJ de fomento em minutos. Sem taxas ocultas, sem tarifas de manutenção.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-primary-blue">Atendimento Exclusivo</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Gerente de fomento dedicado para auxiliar as necessidades da sua empresa.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-primary-blue">Tarifas Justas</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Sem reciprocidades ou vendas casadas exigidas pelos grandes bancos tradicionais.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-primary-blue">Análise em 15 minutos</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Aprovação ágil para você receber o dinheiro no mesmo dia da emissão da nota.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="premium-card bg-white p-4 rounded-2xl flex items-center space-x-3.5">
              <ShieldCheck className="w-10 h-10 text-emerald-500 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Conexão Blindada</span>
                <span className="text-xs text-slate-600 block font-semibold leading-snug">Seus dados estão protegidos sob os rigorosos protocolos de criptografia da LGPD.</span>
              </div>
            </div>
          </div>

          {/* Form Interactive Panel - Grid Span 7 */}
          <div className="lg:col-span-7 premium-card p-6 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-center">
            
            {submitSuccess ? (
              <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-primary-blue tracking-tight">Proposta Recebida!</h3>
                  <p className="font-sans text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                    Nossos especialistas em crédito já receberam seus dados. Em menos de 15 minutos entraremos em contato via WhatsApp/Telefone para concluir sua ativação.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      companyName: '',
                      cnpj: '',
                      monthlyRevenue: '',
                      message: ''
                    });
                  }}
                  className="font-sans font-semibold text-xs text-slate-500 hover:text-primary-blue bg-slate-50 border border-slate-200 hover:border-slate-300 px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Enviar outra Proposta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="lead-generation-form">
                
                <h3 className="font-display font-semibold text-lg text-primary-blue flex items-center gap-2 mb-2">
                  <span>Preencha os Dados Corporativos</span>
                  <Info className="w-4 h-4 text-accent-gold" />
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Nome do Responsável</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: João da Silva"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:border-primary-blue ${errors.name ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 font-semibold">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-accent-gold" />
                      <span>E-mail Corporativo</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: joao@empresa.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:border-primary-blue ${errors.email ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 font-semibold">{errors.email}</p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-accent-gold" />
                      <span>WhatsApp / Telefone</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: (11) 99999-9999"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:border-primary-blue ${errors.phone ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    />
                    {errors.phone && <p className="text-[10px] text-rose-500 font-semibold">{errors.phone}</p>}
                  </div>

                  {/* Company Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Razão Social / Nome da Empresa</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Silva Comercial Ltda"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:border-primary-blue ${errors.companyName ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    />
                    {errors.companyName && <p className="text-[10px] text-rose-500 font-semibold">{errors.companyName}</p>}
                  </div>

                  {/* CNPJ field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-accent-gold" />
                      <span>CNPJ da Empresa</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 00.000.000/0000-00"
                      value={formData.cnpj}
                      onChange={handleCnpjChange}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:border-primary-blue ${errors.cnpj ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    />
                    {errors.cnpj && <p className="text-[10px] text-rose-500 font-semibold">{errors.cnpj}</p>}
                  </div>

                  {/* Monthly revenue select field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Faturamento Mensal Médio</span>
                    </label>
                    <select
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthlyRevenue: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:border-primary-blue bg-white ${errors.monthlyRevenue ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200'}`}
                    >
                      <option value="">Selecione uma faixa...</option>
                      <option value="Ate 50k">Até R$ 50.000 / mês</option>
                      <option value="50k a 150k">R$ 50.000 a R$ 150.000 / mês</option>
                      <option value="150k a 500k">R$ 150.000 a R$ 500.000 / mês</option>
                      <option value="500k a 1M">R$ 500.000 a R$ 1.000.000 / mês</option>
                      <option value="Mais de 1M">Mais de R$ 1.000.000 / mês</option>
                    </select>
                    {errors.monthlyRevenue && <p className="text-[10px] text-rose-500 font-semibold">{errors.monthlyRevenue}</p>}
                  </div>
                </div>

                {/* Optional Message */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <span>Mensagem Adicional / Detalhes (Opcional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Conte-nos brevemente o prazo das notas e sua principal necessidade comercial..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 font-sans text-sm focus:outline-none focus:border-primary-blue"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-blue hover:bg-secondary-blue text-white py-4 rounded-xl font-display font-bold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  id="btn-submit-lead-form"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enviando Dados...</span>
                    </div>
                  ) : (
                    <>
                      <span>Analisar meu Cadastro Grátis</span>
                      <Send className="w-4 h-4 text-accent-gold" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Ao enviar, você concorda com nossos termos de privacidade sob a lei Geral de Proteção de Dados (LGPD).
                  </span>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
