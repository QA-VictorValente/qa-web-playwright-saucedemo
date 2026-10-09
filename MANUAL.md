# 📖 Manual Descomplicado: O Robô que Faz Compras na Internet

> **Para quem é este manual?**  
> Este documento explica como funciona a automação de testes de sites e telas visuais (Front-end). Se você não entende nada de programação, este guia foi feito especialmente para você entender tudo sem palavras difíceis!

---

## 🤖 O Cliente Invisível: O que é Automação Web?

Imagine que você contratou um funcionário robô. Você senta ele na frente de um computador e dá a seguinte instrução:

```text
  [ O ROBÔ RECEBE A ORDEM ]
             ⬇
  1. Abre o Google Chrome sozinho.
  2. Digita o site da loja (SauceDemo).
  3. Preenche login e senha.
  4. Clica nos produtos mais baratos e joga no carrinho.
  5. Vai até o caixa, digita o endereço e paga a conta.
  6. Se o recibo aparecer na tela em menos de 8 segundos, ele diz: "TUDO CERTO! ✅"
```

O **Playwright** é a tecnologia que dá vida a esse robô invisível. Ele mexe o mouse, digita no teclado e clica nas coisas muito mais rápido do que qualquer ser humano conseguiria!

---

## 🏬 A Analogia dos Cômodos da Loja: O que é o Page Object Model (POM)?

Imagine um shopping gigante. Se você disser para um turista: *"Ache uma camiseta preta no shopping"*, ele vai ficar perdido correndo pelos corredores sem saber para onde ir.

Mas se você der um mapa separado para cada cômodo:
- **Mapa 1:** A Portaria de Entrada.
- **Mapa 2:** A Seção de Roupas.
- **Mapa 3:** O Carrinho de Compras.
- **Mapa 4:** O Caixa de Pagamento.

Na programação, essa organização se chama **Page Object Model (POM)**. Cada tela do site tem o seu próprio "mapa". Se o dono da loja mudar o botão do caixa de lugar, a gente só atualiza o mapa do caixa, sem bagunçar o resto!

---

## 🗺️ Mapa do Projeto: O que faz cada pasta e arquivo?

```text
02-web-playwright/
├── src/
│   ├── pages/                   ➡️ "Os Mapas de Cada Tela da Loja"
│   │   ├── base.page.ts         ➡️ Regras gerais (como esperar e andar pela loja)
│   │   ├── login.page.ts        ➡️ A Portaria de Entrada
│   │   ├── inventory.page.ts    ➡️ As Prateleiras e Corredores de Produtos
│   │   ├── cart.page.ts         ➡️ O Carrinho de Compras
│   │   └── checkout.page.ts     ➡️ O Caixa Registrador e Pagamento
│   ├── fixtures/test-data.ts    ➡️ "A Carteira de Documentos do Robô"
│   └── utils/helpers.ts         ➡️ "A Calculadora de Bolso"
├── tests/e2e/                   ➡️ "As Missões de Teste"
│   ├── login.spec.ts            ➡️ Missões na Portaria
│   └── checkout-flow.spec.ts    ➡️ Missão de Compra Completa
├── playwright.config.ts         ➡️ "As Configurações do Navegador"
└── package.json                 ➡️ "As Peças e Ferramentas Instaladas"
```

---

## 🔍 Entendendo os Arquivos em Detalhes

### 1. `src/pages/login.page.ts` — A Portaria da Loja
Este arquivo ensina o robô a enxergar:
- A caixinha de texto onde digita o nome de usuário.
- A caixinha onde digita a senha.
- O botão verde de **Login**.
- A faixa vermelha que avisa quando a senha foi digitada errada.

---

### 2. `src/pages/inventory.page.ts` — As Prateleiras do Supermercado
Aqui o robô aprende a passear pelo catálogo de produtos:
- Ele sabe ler o nome e o preço de cada mochila, camiseta ou lanterna.
- Ele sabe clicar no menu para **organizar do mais barato para o mais caro**.
- Ele clica no botão **"Add to cart"** para colocar coisas no carrinho.
- Ele confere a bolinha vermelha no topo da tela (o contador do carrinho) para ter certeza de que o número aumentou!

---

### 3. `src/pages/cart.page.ts` — O Carrinho de Compras
Antes de pagar, o robô abre o carrinho para conferir:
- *"Os itens que eu escolhi na prateleira realmente vieram parar aqui dentro?"*
- Se ele desistir de comprar uma camiseta, ele clica em **Remove** e vê se o item sumiu da lista.

---

### 4. `src/pages/checkout.page.ts` — O Caixa Registrador
O caixa tem 3 etapas que o robô cumpre sem pestanejar:
1. **Etapa de Identificação:** Preenche Nome, Sobrenome e CEP de entrega.
2. **Etapa de Conferência:** O robô lê o preço dos itens, o valor do imposto e soma tudo para conferir se a loja não está cobrando 1 centavo a mais!
3. **Etapa de Sucesso:** Clica em **Finish** e espera a mensagem na tela: *"Thank you for your order!"* (Obrigado pelo seu pedido).

---

### 5. `src/fixtures/test-data.ts` — A Carteira de Documentos
Aqui guardamos os dados que o robô usa durante o teste:
- A senha válida do cliente comum (`standard_user`).
- A conta de um cliente bloqueado (`locked_out_user`) para testar se a portaria barra ele.
- O endereço e CEP que serão preenchidos na entrega.

---

## 🎯 As Missões Automatizadas (`tests/e2e/`)

1. **`login.spec.ts`:**
   - O robô tenta entrar com a senha certa ➡️ Deve conseguir entrar.
   - O robô tenta entrar com uma conta bloqueada ➡️ Deve aparecer o aviso vermelho de bloqueio.
   - O robô tenta clicar em entrar sem digitar nada ➡️ A loja deve avisar que falta preencher os campos.

2. **`checkout-flow.spec.ts`:**
   - O robô entra na loja, organiza por preço, pega dois itens, confere os valores, paga a compra e sai com o comprovante na mão. Tudo isso em menos de 5 segundos!
