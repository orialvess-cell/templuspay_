import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize GoogleGenAI client with key from environment variables
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set higher payload size limits to accommodate base64-encoded PDF/Image invoices
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ limit: '15mb', extended: true }));

  // API endpoint to parse the uploaded DANFE document
  app.post("/api/parse-danfe", async (req, res) => {
    try {
      const { fileData, mimeType, fileName } = req.body;

      if (!fileData || !mimeType) {
        return res.status(400).json({ error: "O arquivo e o tipo de mídia são obrigatórios." });
      }

      // Pre-calculate smart fallback values in case Gemini is not available or fails
      let simulatedValue = 125000.00;
      let simulatedDays = 45;
      
      if (fileName) {
        // Try to find numbers with 3 or more digits in the filename to make simulation highly realistic
        // e.g. "nota_15000.pdf" -> 15000
        const numbers = fileName.replace(/[^\d]/g, ' ');
        const matches = numbers.trim().split(/\s+/).map(Number).filter(n => n >= 100 && n < 10000000);
        if (matches.length > 0) {
          simulatedValue = matches[0];
        }
        
        // Try to find a potential days value (e.g. "30dias", "60d")
        const daysMatch = fileName.toLowerCase().match(/(\d+)\s*(dias|d\b)/);
        if (daysMatch) {
          const daysVal = parseInt(daysMatch[1]);
          if (daysVal > 0 && daysVal <= 360) {
            simulatedDays = daysVal;
          }
        }
      }

      const fallbackResult = {
        totalValue: simulatedValue,
        days: simulatedDays,
        emitterName: "Metalúrgica Força e Aço Brasil Ltda",
        emitterCnpj: "12.345.678/0001-90",
        recipientName: "TEMPLUS LOGISTICA E COMERCIO S/A",
        recipientCnpj: "45.678.901/0001-23",
        invoiceNumber: `000.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}`,
        isDemo: true
      };

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === "") {
        console.warn("Chave da API Gemini não configurada. Usando fallback inteligente de demonstração.");
        // Add a slight latency to simulate a real AI extraction beautifully
        await new Promise(resolve => setTimeout(resolve, 1500));
        return res.json(fallbackResult);
      }

      try {
        // Convert inline data part for @google/genai SDK
        const filePart = {
          inlineData: {
            mimeType: mimeType,
            data: fileData,
          },
        };

        const promptPart = {
          text: `Você é um assistente especialista em leitura e análise de DANFE (Documento Auxiliar de Nota Fiscal Eletrônica) brasileira.
Sua missão é extrair com extrema exatidão os dados do documento para popular uma simulação de antecipação de recebíveis.

Siga estas instruções rigorosamente:
1. "totalValue": Extraia o Valor Total da Nota (geralmente encontrado no bloco "CÁLCULO DO IMPOSTO" sob "VALOR TOTAL DA NOTA" ou similar). Deve ser retornado estritamente como um número flutuante (ex: 154320.50).
2. "days": Encontre a data de emissão da nota e as parcelas de vencimento/duplicatas (bloco "FATURA" ou "DUPLICATAS"). Se houver vencimentos específicos, retorne a diferença média ponderada em dias a partir da data de emissão. Se for pagamento à vista ou não houver vencimentos claros, retorne 30 ou 45 como valor padrão razoável.
3. "emitterName": Nome ou Razão Social do Emitente (fornecedor/vendedor).
4. "emitterCnpj": CNPJ do Emitente formatado (XX.XXX.XXX/XXXX-XX).
5. "recipientName": Nome ou Razão Social do Destinatário/Remetente (sacado/comprador).
6. "recipientCnpj": CNPJ do Destinatário formatado (XX.XXX.XXX/XXXX-XX).
7. "invoiceNumber": Número da Nota Fiscal (geralmente sob "Nº" ou "NÚMERO" perto de SÉRIE).`,
        };

        // Call Gemini 3.5 Flash for multimodal document extraction
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: [filePart, promptPart],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                totalValue: {
                  type: Type.NUMBER,
                  description: "Valor total bruto da nota fiscal em reais (exemplo: 125000.00).",
                },
                days: {
                  type: Type.INTEGER,
                  description: "Quantidade de dias de prazo médio até o vencimento a partir da data de emissão. Use 30 ou 45 por padrão.",
                },
                emitterName: {
                  type: Type.STRING,
                  description: "Razão social ou nome do emitente.",
                },
                emitterCnpj: {
                  type: Type.STRING,
                  description: "CNPJ do emitente formatado.",
                },
                recipientName: {
                  type: Type.STRING,
                  description: "Razão social ou nome do destinatário (sacado).",
                },
                recipientCnpj: {
                  type: Type.STRING,
                  description: "CNPJ do destinatário formatado.",
                },
                invoiceNumber: {
                  type: Type.STRING,
                  description: "Número de controle da nota fiscal.",
                },
              },
              required: ["totalValue", "days"],
            },
          },
        });

        const responseText = response.text;
        if (!responseText) {
          throw new Error("A API do Gemini retornou uma resposta vazia.");
        }

        const resultJson = JSON.parse(responseText.trim());
        return res.json({ ...resultJson, isDemo: false });
      } catch (geminiError: any) {
        console.error("Erro na API do Gemini. Usando fallback inteligente:", geminiError);
        // Fallback with visual log indicator
        await new Promise(resolve => setTimeout(resolve, 1500));
        return res.json({
          ...fallbackResult,
          note: "Lido no modo de contingência devido a limite ou erro de API."
        });
      }
    } catch (error: any) {
      console.error("Erro geral no endpoint de DANFE:", error);
      res.status(500).json({ error: error.message || "Erro desconhecido ao processar documento." });
    }
  });

  // Serve static assets / Vite middleware integrations
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

startServer();
