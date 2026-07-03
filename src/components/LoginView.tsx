/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Fingerprint 
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export default function LoginView({ onLoginSuccess, onBackToHome }: LoginViewProps) {
  const [loginType, setLoginType] = useState<'cnpj' | 'email'>('cnpj');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Formatting helper for CNPJ: 00.000.000/0000-00
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatCNPJ(rawValue);
    setCnpj(formatted.slice(0, 18)); // Limit to CNPJ length
    setError(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (loginType === 'cnpj' && cnpj.replace(/\D/g, '').length < 14) {
      setError('Por favor, informe um CNPJ válido com 14 dígitos.');
      return;
    }
    if (loginType === 'email' && !email.includes('@')) {
      setError('Por favor, insira um endereço de e-mail corporativo válido.');
      return;
    }
    if (!password) {
      setError('A senha é obrigatória.');
      return;
    }

    // Check credentials (accepting demonstration credentials for a premium prototype feel)
    setLoading(true);

    setTimeout(() => {
      // Correct demo credentials: 
      // CNPJ: 12.345.678/0001-99 or Email: admin@templuspay.com
      // Senha: templus123
      const cleanCnpj = cnpj.replace(/\D/g, '');
      const isDemoCnpj = loginType === 'cnpj' && (cleanCnpj === '12345678000199' || cleanCnpj === '');
      const isDemoEmail = loginType === 'email' && (email === 'admin@templuspay.com' || email === '');
      
      if ((isDemoCnpj || isDemoEmail) && password === 'templus123') {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          onLoginSuccess();
        }, 1200);
      } else {
        setLoading(false);
        setError('Credenciais inválidas. Para testar o portal, use a senha de demonstração indicada abaixo.');
      }
    }, 1500);
  };

  const handleQuickFill = () => {
    setError(null);
    if (loginType === 'cnpj') {
      setCnpj('12.345.678/0001-99');
    } else {
      setEmail('admin@templuspay.com');
    }
    setPassword('templus123');
  };

  return (
    <section className="min-h-screen pt-32 pb-24 bg-slate-50/50 bg-grid-pattern flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md space-y-8">
        
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-500 hover:text-primary-blue transition-colors cursor-pointer group"
          id="btn-login-back-to-home"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Voltar para a Home</span>
        </button>

        {/* Login Container */}
        <div className="premium-card bg-white rounded-3xl p-8 sm:p-10 relative overflow-hidden" id="login-panel">
          
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-blue via-accent-gold to-secondary-blue" />
          
          {/* Logo and Brand Title */}
          <div className="text-center space-y-3 mb-8">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-primary-blue flex items-center justify-center shadow-lg shadow-primary-blue/10">
              <span className="font-display font-bold text-xl text-accent-gold">T</span>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-2xl text-primary-blue tracking-tight">
                Área do Cliente
              </h2>
              <p className="text-xs text-slate-400 font-sans tracking-wide uppercase mt-1">
                Portal de Antecipação de Recebíveis
              </p>
            </div>
          </div>

          {success ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
              <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-primary-blue">Acesso Autorizado</h3>
                <p className="text-sm text-slate-500 mt-1">Redirecionando para seu painel de controle...</p>
              </div>
              {/* Spinner */}
              <div className="flex justify-center pt-2">
                <div className="w-6 h-6 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Login Type Tab Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl" id="login-type-tabs">
                <button
                  type="button"
                  onClick={() => { setLoginType('cnpj'); setError(null); }}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    loginType === 'cnpj' 
                      ? 'bg-white text-primary-blue shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  id="tab-login-cnpj"
                >
                  <div className="flex items-center justify-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Acesso com CNPJ</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginType('email'); setError(null); }}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    loginType === 'email' 
                      ? 'bg-white text-primary-blue shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  id="tab-login-email"
                >
                  <div className="flex items-center justify-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Acesso com E-mail</span>
                  </div>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start space-x-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-rose-600 font-medium leading-relaxed">{error}</span>
                </div>
              )}

              {/* Form Input Fields */}
              <div className="space-y-4">
                {loginType === 'cnpj' ? (
                  <div className="space-y-1.5">
                    <label htmlFor="login-cnpj-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      CNPJ da Empresa
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        id="login-cnpj-input"
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={cnpj}
                        onChange={handleCnpjChange}
                        disabled={loading}
                        className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-accent-gold focus:bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-mono"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label htmlFor="login-email-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      E-mail Corporativo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="login-email-input"
                        type="email"
                        placeholder="nome@suaempresa.com.br"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={loading}
                        className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-accent-gold focus:bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="login-password-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Senha de Acesso
                    </label>
                    <a href="#forgot" className="text-xs text-accent-gold hover:text-primary-blue transition-colors font-semibold">
                      Esqueceu?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password-input"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      className="block w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 focus:border-accent-gold focus:bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-login-submit"
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-primary-blue hover:bg-secondary-blue text-white py-3.5 px-4 rounded-xl font-display font-bold text-sm transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verificando Credenciais...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4 text-accent-gold" />
                    <span>Entrar no Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Help Box for Demonstration credentials */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  🔐 Acesso Demonstrativo de Teste
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Para fins de teste, use os dados padrão e clique abaixo para preencher automaticamente:
                </p>
                <div className="space-y-1.5 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-150 font-mono">
                  <div><span className="font-sans font-semibold text-slate-400">CNPJ:</span> 12.345.678/0001-99</div>
                  <div><span className="font-sans font-semibold text-slate-400">E-mail:</span> admin@templuspay.com</div>
                  <div><span className="font-sans font-semibold text-slate-400">Senha:</span> templus123</div>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="w-full py-2 bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold font-sans font-bold text-xs rounded-lg transition-all cursor-pointer"
                  id="btn-login-quickfill"
                >
                  Preencher Credenciais de Teste
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Security Compliance Badges */}
        <div className="flex items-center justify-center space-x-4 text-slate-400 text-xs">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-accent-gold" />
            <span>SSL 256-bit</span>
          </div>
          <span className="text-slate-300">•</span>
          <span>LGPD Atendida</span>
          <span className="text-slate-300">•</span>
          <span>Banco Central Res. 4.935</span>
        </div>

      </div>
    </section>
  );
}
