/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Invoice {
  id: string;
  number: string;
  buyer: string;
  value: number;
  dueDate: string;
  status: 'Pendente' | 'Processando' | 'Antecipado' | 'Recusado';
  discountRate: number;
  netValue: number;
  xmlName?: string;
}

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  cnpj: string;
  monthlyRevenue: string;
  message?: string;
}

export interface SimulatorState {
  amount: number;
  days: number;
  monthlyRate: number;
  netReceive: number;
  discountFee: number;
  platformFee: number;
}
