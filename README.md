# 🎭 02-web-playwright | Automação Web E2E com Playwright, TypeScript & Page Object Model

Módulo de automação de testes Web End-to-End (E2E) estruturado segundo as melhores práticas de SDET / QA Automation Lead. Utiliza **Playwright**, **TypeScript** e o padrão arquitetural **Page Object Model (POM)** com seletores acessíveis e baseados em comportamento (`getByRole`, `getByTestId`, `getByPlaceholder`).

---

## 🎯 Aplicação Alvo
- **Nome:** SauceDemo (Swag Labs)
- **URL Base:** `https://www.saucedemo.com/`

---

## 🏗️ Arquitetura do Projeto

```text
02-web-playwright/
├── src/
│   ├── pages/            # Page Objects encapsulando elementos e ações
│   │   ├── base.page.ts      # Classe base com métodos comuns de navegação e esperas
│   │   ├── login.page.ts     # Mapeamento da tela de login e mensagens de erro
│   │   ├── inventory.page.ts # Catálogo de produtos, ordenação e manipulação do carrinho
│   │   ├── cart.page.ts      # Validação e remoção de itens do carrinho
│   │   └── checkout.page.ts  # Fluxo de checkout (Informações, Resumo e Confirmação)
│   ├── fixtures/         # Usuários e massas estáticas/dinâmicas
│   │   └── test-data.ts      # Credenciais, mensagens esperadas e dados de cliente
│   └── utils/            # Utilitários auxiliares
│       └── helpers.ts        # Conversão e cálculo de moedas/preços
├── tests/
│   └── e2e/              # Cenários de teste automatizados de ponta a ponta
│       ├── login.spec.ts         # Autenticação, bloqueios e validação de campos
│       └── checkout-flow.spec.ts # Jornada completa de compra e validação de regras
├── playwright.config.ts  # Configuração do Playwright (headless, retry, reports, traces)
├── tsconfig.json         # Configuração estrita do TypeScript
├── package.json          # Dependências e scripts de execução
└── README.md             # Documentação técnica do módulo
```

---

## 📋 Cenários de Teste Cobertos

### 🔐 Autenticação (`tests/e2e/login.spec.ts`)
| ID | Cenário | Objetivo |
|---|---|---|
| **TC-LOG01** | Login Válido | Realiza login com `standard_user` e valida redirecionamento para o catálogo de produtos |
| **TC-LOG02** | Usuário Bloqueado | Valida bloqueio de acesso para `locked_out_user` e mensagem de erro exibida |
| **TC-LOG03** | Credenciais Inválidas | Valida rejeição para usuário/senha inexistente |
| **TC-LOG04** | Username Obrigatório | Valida exibição de erro ao tentar submeter formulário sem usuário |
| **TC-LOG05** | Password Obrigatório | Valida exibição de erro ao tentar submeter formulário sem senha |

### 🛒 Compras e Checkout (`tests/e2e/checkout-flow.spec.ts`)
| ID | Cenário | Objetivo |
|---|---|---|
| **TC-CHK01** | Jornada Completa de Compra | Login ➡️ Ordenação por preço (low to high) ➡️ Adição de múltiplos produtos ➡️ Validação no Carrinho ➡️ Preenchimento de dados de entrega ➡️ Validação matemática de Subtotal, Taxa e Total ➡️ Finalização e confirmação do pedido |
| **TC-CHK02** | Gestão do Carrinho | Adição e remoção de itens via catálogo e tela de carrinho com conferência do badge |
| **TC-CHK03** | Validação de Dados de Entrega | Valida obrigatoriedade de First Name, Last Name e Postal Code na etapa 1 do Checkout |

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** (v18+)
- **TypeScript**
- **@playwright/test**
- **Chromium / Headless Engine**

---

## 🚀 Como Executar

### 1. Instalação das Dependências
```bash
cd 02-web-playwright
npm install
npx playwright install chromium
```

### 2. Execução dos Testes
- **Executar todos os testes em modo headless:**
  ```bash
  npm test
  ```

- **Executar testes em modo com navegador visível (headed):**
  ```bash
  npm run test:headed
  ```

- **Visualizar o relatório de execução:**
  ```bash
  npm run test:report
  ```
