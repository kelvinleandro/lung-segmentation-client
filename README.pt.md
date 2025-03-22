# Aplicativo de Segmentação Pulmonar

## Visão Geral

Este projeto é um **aplicativo de segmentação pulmonar** desenvolvido com **React, TypeScript, TailwindCSS e ShadCN UI**. Ele permite que os usuários façam upload de **arquivos DICOM (.dcm)**, configurem parâmetros de segmentação e enviem os dados para uma [API](https://github.com/kelvinleandro/lung-segmentation-server) para pré-processamento, segmentação e pós-processamento. Os usuários também podem **editar segmentações manualmente**, ampliar imagens e **baixar os resultados**.

## Preview

![preview image](./public/images/preview.png)

## Funcionalidades

✅ Upload de **arquivos DICOM (.dcm)**\
✅ Seleção de **métodos de segmentação** (Otsu, Watershed, Sauvola, etc.)\
✅ Configuração de **parâmetros de pré-processamento, segmentação e pós-processamento**\
✅ Suporte ao modo **Claro/Escuro**\
✅ Suporte a **tradução Português/Inglês**\
✅ **Segmentação manual** (desenho sobre as imagens)\
✅ **Zoom in/out** para melhor visualização\
✅ Download dos **resultados da segmentação** como:

- **Contornos (CSV)**
- **Imagem segmentada (PNG)**

## Tecnologias Utilizadas

- **Frontend**: React Vite + TypeScript
- **Estilização**: TailwindCSS + ShadCN UI
- **Requisições HTTP**: Axios

## Integração com API

O aplicativo envia requisições para uma [**API backend separada**](https://github.com/kelvinleandro/lung-segmentation-server) com:

- **Arquivo DICOM**
- **Parâmetros de pré-processamento, segmentação e pós-processamento** (em JSON)
- **Método de segmentação** (passado como parâmetro na URL)

**Resposta da API:**

- **Imagem pré-processada** (antes da segmentação)
- **Todos os contornos detectados**
- **Contornos válidos** (ajustados pelos parâmetros de pós-processamento)

## Instalação e Configuração

1. **Clone o repositório**

   ```bash
   git clone https://github.com/kelvinleandro/lung-segmentation-client
   cd lung-segmentation-client
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

## Como Usar

1. Faça upload de um **arquivo DICOM (.dcm)**
2. Configure os **parâmetros de segmentação**
3. Selecione o **método de segmentação**
4. Visualize e baixe os **resultados da segmentação**
