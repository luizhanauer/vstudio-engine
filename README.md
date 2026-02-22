# 🌌 VStudio Engine

O **VStudio Engine** é um estúdio de design vetorial (SVG) rodando inteiramente no navegador, focado em desenvolvedores e engenheiros de software. Ele permite a criação de banners, gráficos e arquiteturas visuais com fundos de **Arte Generativa** baseados em conceitos reais de infraestrutura e ciência da computação (Topologias BGP, Placas de Circuito, Matrizes de Atividade).

Acessível online via: [https://luizhanauer.github.io/vstudio-engine/](https://luizhanauer.github.io/vstudio-engine/)

---

## 🚀 Funcionalidades Principais

* **🎨 Arte Generativa Integrada:** 6 motores de renderização visual em SVG puro (Nexus Topology, Circuit Flow, Cyber Grid, Activity Matrix, Stream Pulse e Quantum Orbits).
* **🔗 Stateless & Compartilhável:** Não existe banco de dados. Todo o estado da sua arte é codificado em Base64 e injetado na URL. Copie o link e compartilhe seu design instantaneamente.
* **💻 Editor Bidirecional (View Source):** Alternância fluida entre a interface visual (GUI) e a edição manual do código XML/SVG gerado via CodeMirror.
* **📊 Tabelas e Matrizes Visuais:** Renderização matemática de tabelas no canvas SVG para exibição de dados e arquiteturas estruturadas.
* **💾 Exportação Nativa:** Casos de uso dedicados para conversão e download em `Vetor Animado (.svg)` ou `Bitmap Estático (.png)` renderizado nativamente via HTML5 Canvas.

---

## 🏛️ Arquitetura e Engenharia

Este projeto foi construído sob uma rígida disciplina de engenharia de software, utilizando **Clean Architecture**, **Domain-Driven Design (DDD)** e princípios de **Object Calisthenics**.

### Stack Tecnológica
* **Core:** Vue 3 (Composition API) + TypeScript (Modo Estrito / Strict Null Checks).
* **Estilização:** Tailwind CSS v4 (Glassmorphism & Dark-Neon aesthetics).
* **Build & Tooling:** Vite, Vitest e Vue Test Utils.

### Estrutura de Diretórios (Clean Arch)
A base de código isola regras de negócios, estado e interface:

```text
src/
 ├── domain/             # (Core) Entidades, Contratos e Tipagens Estritas (VStudioTypes.ts)
 ├── application/        # (Use Cases) Orquestração, Gerenciamento de Estado (Singleton Store) e Exportação
 ├── presentation/       # (UI) Componentes Vue, Templates SVG Generativos e Estilos Tailwind

```

### Padrões de Qualidade (Object Calisthenics & DRY)

* **Guard Clauses & Fail Fast:** Uso extensivo de *Type Narrowing* para evitar instabilidades ou `undefined` em runtime, satisfazendo a regra `noUncheckedIndexedAccess` do TypeScript.
* **Single Source of Truth (SSOT):** O estado da aplicação é um Singleton reativo centralizado, prevenindo problemas de *Two-Way Binding* entre o Canvas e o Painel de Controle.

---

## 🎨 Engines Generativas (Templates)

1. **Nexus (Topologia BGP):** Simula uma malha de rede descentralizada com nós pulsantes e transferência de dados interligada.
2. **Circuit Flow (PCB):** Desenha linhas rígidas (90º e 45º) simulando o tráfego de energia e informações em uma placa de circuito impresso.
3. **Cyber Grid (3D Synthwave):** Perspectiva geométrica com ponto de fuga, remetendo ao ciberespaço e realidade virtual.
4. **Activity Matrix (Git Graph):** Uma malha isométrica/bidimensional pulsante, inspirada no clássico gráfico de contribuições open-source.
5. **Stream Pulse:** Espectro de frequência ritmico (Audio Visualizer) animado via CSS.
6. **Quantum Orbits:** Astrolábio geométrico de anéis concêntricos perfeitos e "elétrons" orbitais.

---

## 🛠️ Instalação e Execução Local

### Pré-requisitos

* Node.js (v18+)
* NPM ou Yarn

### Passo a Passo

1. Clone o repositório:

```bash
git clone https://github.com/luizhanauer/vstudio-engine.git
cd vstudio-engine
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse em seu navegador: `http://localhost:5173/`

### Testes Automatizados

O projeto conta com uma suíte de testes (Vitest) cobrindo Casos de Uso (com Mocks de DOM nativos do JS), Store e Componentes da Apresentação.

```bash
npm run test
```

---

## 📦 Build e Deploy (GitHub Pages)

O projeto está configurado para publicação como uma SPA estática. Para compilar para produção:

```bash
npm run build
```

Os artefatos minificados e otimizados estarão disponíveis na pasta `/dist`.

### Configuração de Deploy Automático (GitHub Actions)

Para automatizar o deploy no GitHub Pages a cada push na branch `main`, você pode criar o arquivo `.github/workflows/deploy.yml` no seu repositório com o workflow padrão do Vite.

---

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorar a aplicação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

Se você gostou do meu trabalho e quer me agradecer, você pode me pagar um café :)

<a href="https://www.paypal.com/donate/?hosted_button_id=SFR785YEYHC4E" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 150px !important;" ></a>

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.

**Desenvolvido com ☕ e precisão por Luiz Hanauer.**