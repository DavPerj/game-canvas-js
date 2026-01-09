# Instruções para baixar código
- Vá até seu Github e clique código (botão verde)
- Selecione a opção para clonar (HTTPS ou SSH)
- Vá até seu terminal do VisualStudio Code e digite
    - `git clone {cole aqui o que copiou do botão verde}`
- Abra a pasta do arquivo no seu vscode

# Dependências
- Baixe e instale as seguintes ferramentas:
    - git
    - node
    - vscode
- Caso esteja usando Windows, garanta que as variáveis de ambiente estão corretamente ajustadas

# Comandos para rodar
- Basta abrir no browser o seu arquivo html
    - Copie o caminho dele e cole no navegador. Ex: "C://Users/davi/projetos/game-canvas-js/v1/index.js"
- Para rodar o arquivo study.js use o node. Garanta que esteja na pasta do arquivo js
    - `node study.js`

# Comandos git
- Quando terminou de alterar algum arquivo e quer subir, siga os passos:
    - `git add {nome do arquivo}` ou `git add .` se quiser adicionar tudo
    - `git commit -m "{sua mensagem}"`, recomendo usar o padrão "feat: {sua mensagem}"
    - `git push` ou se for seu primeiro commit `git push -u origin main`