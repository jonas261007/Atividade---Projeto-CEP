# Consulta de Endereço por CEP

Este projeto permite a consulta de endereços a partir de um CEP informado pelo usuário. A aplicação utiliza React com TypeScript e integra uma API externa para obter os dados do endereço. O usuário pode adicionar novos endereços à lista de endereços consultados, visualizar as informações detalhadas e excluir endereços registrados.

## Funcionalidades

- **Consulta de endereço:** O usuário pode inserir um CEP no formato `XXXXX-XXX` e, ao clicar no botão "Obter endereço", a aplicação irá buscar os dados correspondentes.
- **Exibição de dados do endereço:** Após a consulta, o endereço será exibido em uma tabela, com as seguintes informações: Logradouro, Bairro, Cidade, UF, CEP e a data da última consulta.
- **Exclusão de endereço:** O usuário pode remover qualquer endereço da lista de endereços consultados.
- **Validação de CEP:** A aplicação verifica se o CEP inserido é válido antes de realizar a consulta.
- **Carregamento visual:** Durante a consulta, um indicador de carregamento (spinner) é exibido no botão.

## Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção da interface do usuário.
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática.
- **Date-fns** - Biblioteca para manipulação de datas, usada para formatar a data de consulta.
- **React Icons** - Biblioteca para ícones, utilizada para o ícone de exclusão.
- **Tailwind CSS** - Framework CSS utilitário para estilização rápida e responsiva.
- **API Externa de Consulta de CEP** - Usada para realizar a busca de dados de endereço a partir do CEP.

## Estrutura do Projeto

```plaintext
├── components/
│   └── AddressTable.tsx   # Componente responsável pela exibição da tabela de endereços.
├── get-address.ts         # Função para realizar a consulta do endereço pela API externa.
├── pages/
│   └── index.tsx          # Página principal da aplicação, contendo o formulário e a tabela de endereços.
├── public/
│   └── favicon.ico        # Ícone do site.
├── styles/
│   └── globals.css        # Estilos globais da aplicação.
├── .gitignore
├── package.json           # Dependências e scripts do projeto.
├── tsconfig.json          # Configurações do TypeScript.
├── README.md              # Este arquivo de documentação.
```

## Instalação e Execução

1. Clone o repositório para sua máquina:

```bash
git clone https://github.com/seu-usuario/consulta-cep.git
```

2. Navegue até o diretório do projeto:

```bash
cd consulta-cep
```

3. Instale as dependências do projeto:

```bash
npm install
```

4. Execute a aplicação:

```bash
npm run dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Como Usar

1. **Consulta de CEP:**
   - No campo "Digite o CEP", insira o CEP no formato `XXXXX-XXX`.
   - Clique no botão "Obter endereço".
   - A aplicação irá buscar os dados correspondentes ao CEP informado e exibi-los na tabela.

2. **Exclusão de Endereço:**
   - Na tabela de endereços consultados, clique no ícone de lixeira (`🗑️`) para remover um endereço da lista.

3. **Validação de CEP:**
   - A aplicação realiza a validação do CEP e só envia a consulta caso o CEP esteja no formato correto (`XXXXX-XXX`).

## Estilos e Design

A aplicação utiliza o **Tailwind CSS** para garantir um design limpo, moderno e responsivo. As principais classes aplicadas incluem:

- **Containers:** Utilização de `flex`, `items-center`, `justify-center`, `flex-col` para centralizar os elementos de maneira responsiva.
- **Inputs e Botões:** Inputs e botões são estilizados com classes como `px-4`, `py-3`, `bg-blue-600`, `rounded-lg`, garantindo que a interface seja intuitiva e visualmente agradável.
- **Tabelas:** A tabela de endereços é estilizada com `table-auto`, `w-full`, `bg-white` para garantir clareza na exibição dos dados.

## Funcionalidade de Carregamento

- Quando a consulta de endereço está em andamento, o botão de "Obter endereço" exibe um **spinner** indicando que a operação está sendo realizada. Isso é feito através de uma animação CSS personalizada com `@keyframes spin`.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
```

### Detalhes do README:

- **Funcionalidades**: Explica as principais funcionalidades da aplicação.
- **Tecnologias Utilizadas**: Descreve as tecnologias usadas para construir a aplicação.
- **Estrutura do Projeto**: Apresenta a estrutura de pastas e arquivos do projeto.
- **Instalação e Execução**: Passo a passo para rodar o projeto localmente.
- **Como Usar**: Explica como usar as funcionalidades principais.
- **Estilos e Design**: Explica as classes do Tailwind CSS usadas para estilizar a aplicação.
- **Licença**: Informações sobre a licença do projeto (caso você deseje adicionar uma).

Este README oferece uma explicação completa sobre o projeto, suas funcionalidades e como executar.