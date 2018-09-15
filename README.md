# Estudos Node Js

# Controle de versões
* `'mongoose' : ^4.1.3` => 4.x
* `'mongoose' : ~4.1.3` => 4.1.x

# Listando packages
`npm list`
**Defininindo os níveis**
`npm list --depth=0`

# Detalhes de um pacote
`npm view [nome do pacote]`
`npm view jquery`

**Suas dependências**
`npm view mongoose dependencies`

# Instalando uma versão específica
`npm i mongoose@2.4.2`
`npm i mongoose@^2.4.2`
`npm i mongoose@~2.4.2`

# Mostrar versões desatualizadas
`npm outdated`

# Variavel de ambiente
`set PORT=5000` windows
`set PORT=` excluindo
`set "PORT="` excluindo #2
`export PORT=5000` mac

Retornando a variável na aplicação
`proccess.env.[VARIAVEL]`

