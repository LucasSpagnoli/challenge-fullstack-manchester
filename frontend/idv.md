# Identidade Visual (IDV) — Daily.News

Guia de estilo, diretrizes visuais e especificações de design do ecossistema front-end **Daily.News**.

---

## 1. Conceito e Direção de Arte

A identidade do **Daily.News** posiciona-se na intersecção entre o **jornalismo financeiro de alta linhagem** (como *The Wall Street Journal* e *Financial Times*) e a **tecnologia de curadoria por IA**.

- **Atributos de Marca:** Sofisticação, precisão, sobriedade, prestígio e eficiência.
- **Linguagem Visual:** *Quiet Luxury* editorial. Uso extensivo de espaços negativos, tipografia serifada em títulos de grande escala, ausência de cantos arredondados (linhas retas arquitetônicas) e acentos pontuais em ouro nobre.
- **Tom:** Autoritativo, focado e objetivo, desenhado sob medida para o cotidiano de assessores de investimentos e clientes qualificados.

---

## 2. Paleta Cromática

### 2.1 Cores Principais

| Cor | Hex | Classe Tailwind | Aplicação / Semântica |
|---|---|---|---|
| **Ouro Imperial** | `#D4AF37` | `text-[#D4AF37]`, `bg-[#D4AF37]`, `border-[#D4AF37]` | Destaque primário, acento da marca (`.news`), linhas divisórias nobres, estados ativos e `hover`. |
| **Preto Absoluto** | `#000000` | `bg-black`, `text-black`, `border-black` | Textos de alto contraste, botões primários, hero no login e divisores estruturais. |
| **Branco Puro** | `#FFFFFF` | `bg-white`, `text-white` | Tela de fundo principal (*canvas*), cards, modais e superfícies limpas. |

### 2.2 Escala de Cinzas & Transparências (Black Alpha)

O sistema não utiliza tons de cinza fixos; em vez disso, aplica graduações de opacidade sobre a cor preta para manter harmonia ótica contínua:

- `text-black/70` — Subtítulos e avatares monocromáticos de clientes.
- `text-black/60` — Rótulos de campos (*labels*), preferências e botões secundários.
- `text-black/50` — Textos explicativos, números de telefone e links inativos de navegação.
- `text-black/40` a `text-black/35` — Metadados cronológicos, contadores de registros e estados de carregamento.
- `border-black/20` — Linhas de campos de formulário e inputs.
- `border-black/10` — Molduras de cartões, divisores horizontais e colunas de feed.
- `bg-black/5` a `bg-black/2` — Preenchimento sutil de itens de notícia e cartões esqueleto (*skeleton loading*).
- `bg-black/40` + `backdrop-blur-sm` — Camada de sobreposição (*overlay*) dos modais.

### 2.3 Cores de Suporte e Feedback

- **Alerta / Erro:** `text-red-600` / `text-red-700` com fundo `bg-red-50` e borda `border-red-200` ou indicador lateral `border-l-2 border-red-700`.

---

## 3. Tipografia

O projeto utiliza três famílias tipográficas complementares para estabelecer uma hierarquia de leitura clara e expressiva.

### 3.1 Famílias Tipográficas

1. **Serifada (`font-serif`) — Autoridade & Tradição:**
   - Empregada no logotipo (`Daily.News`), títulos de páginas (`h1`), títulos de cartões de clientes (`h2`) e manchetes de matérias jornalísticas.
   - Aplicações típicas: `font-light tracking-tight`.

2. **Sem Serifa (`font-sans`) — Legibilidade & Interface:**
   - Empregada em corpos de texto, formulários, botões, modais, mensagens do sistema e navegação principal.
   - Aplicações típicas: `text-xs`, `text-sm`, neutra e limpa.

3. **Monoespaçada (`font-mono`) — Precisão Técnica & Metadados:**
   - Empregada em datas formatadas, contadores de itens, identificadores de registros e indexadores numéricos (`Registro 01/10`, `01`, `02`).
   - Aplicações típicas: `text-[9px]`, `text-[10px]`, `uppercase tracking-[0.25em]`.

### 3.2 Hierarquia de Texto e Espaçamento (Tracking)

- **Título Hero / Apresentação:** `text-4xl lg:text-5xl font-light tracking-tight leading-tight`.
- **Título de Seção / Página:** `text-4xl font-serif font-light tracking-tight`.
- **Título de Cartão / Modal:** `text-xl` a `text-2xl font-serif font-light tracking-tight`.
- **Etiquetas de Metadados (*Overlines*):** `text-[9px]` a `text-xs uppercase tracking-[0.15em]` até `tracking-[0.35em]`.
- **Botões e Ações:** `text-[10px]` ou `text-xs uppercase tracking-[0.2em] font-medium`.
- **Corpo de Leitura:** `text-xs` a `text-sm leading-relaxed`.

---

## 4. Elementos Gráficos e Assinaturas Visuais

### 4.1 O "Duplo Traço Editorial"

Assinatura gráfica que delimita a introdução de todas as páginas internas da aplicação (`ClientPage`, `AdminPage`, etc.):

```html
<!-- Traço forte estrutural em preto -->
<div className="border-t-[3px] border-black" />
<!-- Linha fina de refino em ouro -->
<div className="border-t border-[#D4AF37] mt-0.75" />
```

### 4.2 Geometria Reta (*Zero Radius*)

Para preservar o aspecto editorial nobre de jornal impresso:
- **Botões, inputs, cartões e modais** não usam cantos arredondados (`rounded-none` por padrão).
- Todas as separações são feitas com linhas retas de espessuras calculadas (`1px` ou `3px`).

### 4.3 Campos de Formulário Minimalistas

Inputs não utilizam caixas completas; utilizam apenas uma linha de base sutil:
- **Estado Normal:** `border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30`
- **Estado Ativo (*Focus*):** `focus:outline-none focus:border-[#D4AF37]` com transição suave de 200ms.

---

## 5. Componentes Principais

### 5.1 Botões

- **Botão Primário (Black to Gold):**
  - Estilo: `bg-black text-white text-xs uppercase tracking-[0.2em] py-3.5 hover:bg-[#D4AF37] hover:text-black transition-colors duration-300`
  - Uso: Cadastrar, Entrar, Adicionar Cliente, Adicionar Funcionário.
- **Botão Secundário / Outline:**
  - Estilo: `border border-black/20 bg-transparent text-black text-[9px] uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300`
  - Uso: Ações secundárias como "Gerar Feed".
- **Botão de Ação Crítica / Resumo:**
  - Estilo: `bg-black text-white text-[10px] uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:scale-98 transition-all duration-300`
  - Uso: "Enviar Resumo" via WhatsApp.

### 5.2 Cartões de Clientes e Matérias

- **Moldura:** Borda `border border-black/10` sobre fundo branco.
- **Hover:** Transição cromática da borda para ouro (`hover:border-[#D4AF37]`) com elevação sutil em matérias (`hover:-translate-y-0.5`).
- **Avatar:** Caixa quadrada com borda fina (`border border-black/15`) contendo a inicial serifada do cliente.
- **Tags de Preferências:** Pequenos blocos retos com borda sutil (`border border-black/15 text-[11px]`), com botão de remoção que se destaca em hover.

### 5.3 Modais

- Centralizados em tela com profundidade `shadow-2xl`.
- Fundo escurecido semitransparente com desfoque de fundo (`bg-black/40 backdrop-blur-sm`).
- Cabeçalho com tipografia serifada e rodapé alinhado à direita com ações de cancelamento e confirmação.

---

## 6. Movimento e Micro-interações

### 6.1 Animação de Entrada (`fadeInUp`)

Os componentes e colunas de feed utilizam a animação suave `fadeInUp` configurada no CSS global:

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(6px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

- **Stagger Effect:** Delays progressivos em cascata (`animationDelay: ${idx * 60}ms` ou `${idx * 100}ms`) para listas e carrosséis.

### 6.2 Acessibilidade de Movimento

Em respeito a usuários com sensibilidade a movimento, o sistema desativa transições sob a preferência do sistema operacional:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}
```

### 6.3 Scrollbars Personalizadas

- Trilho imperceptível (`bg-transparent`).
- Barra discreta em repouso (`bg-black/10`) que ganha destaque dourado ao passar o mouse (`hover:bg-[#D4AF37]`).

---

## 7. Diretrizes de Uso da Marca (Daily.News)

1. **Grafia Oficial:** **Daily.News** (com ponto de conexão) ou **Daily News** em títulos formais.
2. **Distribuição de Cores do Logotipo:**
   - Palavra **"Daily"**: exibida em preto (no fundo claro) ou branco (no fundo escuro).
   - Extensão **".news"** / **".News"**: invariavelmente em ouro (`#D4AF37`).
3. **Proporção:** O logotipo deve manter a proporção com entrelinha elegante e kerning expandido (`tracking-[0.2em]`).
