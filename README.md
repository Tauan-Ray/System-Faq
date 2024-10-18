<h1 align="center">API Sistema Faq</h1>


<p align="center">
  <image
  src="https://img.shields.io/github/languages/count/Tauan-Ray/System-Faq"
  />
  <image
  src="https://img.shields.io/github/languages/top/Tauan-Ray/System-Faq"
  />
  <image
  src="https://img.shields.io/github/last-commit/Tauan-Ray/System-Faq"
  />
</p>

# sumário 

- [objetivos](#id01)
- [descrição detalhada](#id01.01)
- [tecnologias utilizadas/linguagens](#id02)
- [ambiente de codificação](#id03)
- [clonagem e instalação](#id04)
- [autoria](#id05)



# objetivos <a name="id01"></a>
Desenvolver um sistema de FAQ utilizando NestJS como back-end, que permita a criação, visualização, atualização e exclusão de usuários, perguntas, respostas e categorias, facilitando a gestão de informações e proporcionando uma experiência de usuário intuitiva.


# descrição detalhada <a name="id01.01"></a>
O objetivo deste projeto é desenvolver um sistema de FAQ utilizando o framework NestJS, com Prisma para conexão ao banco de dados. A aplicação permite a criação, visualização, atualização e exclusão de usuários, perguntas, respostas e categorias. O sistema foi estruturado para atender as operações de CRUD (Create, Read, Update, Delete), implementando rotas com validações utilizando DTOs para garantir a integridade dos parâmetros. Além disso, todas as rotas da API foram documentadas utilizando Swagger, proporcionando uma interface clara e de fácil acesso. O projeto busca oferecer um back-end eficiente para gestão do sistema de FAQs.


# ferramenta/linguagem utilizada <a name="id02"></a>

<div  align='center'> 
  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Nest](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
</div>

# ambiente de codificação <a name="id03"></a>

<div  align='center'> 

![vscode](https://img.shields.io/badge/VSCode-0D1117?style=for-the-badge&logo=visual%20studio%20code&logoColor=blue)
![git](https://img.shields.io/badge/GIT-0D1117?style=for-the-badge&logo=git&logoColor=red)
![github](https://img.shields.io/badge/Github-0D1117?style=for-the-badge&logo=github&logoColor=fff)
</div>


# clonagem e instalação <a name="id04"></a>

## Ativação da API
Clone este repositório usando o comando e entre na pasta do projeto:

```bash
$ git clone https://github.com/Tauan-Ray/System-Faq.git
$ cd System-Faq
$ cd Server
```
<br>

Instale todas as dependências utilizando(Certifique-se de já possuir o node.js em sua máquina): 
```bash
npm install
```
<br>

Crie um arquivo .env para configurar a variável de ambiente para realizar a conexão com o banco de dados:
```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome-do-banco?schema=public"
```
<br>

Após configurar o arquivo .env, rode as migrações do Prisma para criar as tabelas no banco de dados:
```bash
npx prisma migrate dev
```
<br>

Agora, inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```
Isso iniciará o servidor Nest.js em modo de desenvolvimento. Normalmente, ele estará acessível em http://localhost:3000<br>
Você pode usar ferramentas como Postman ou Insomnia para testar os endpoints disponíveis na API.
<br>
Para acessas documentação feita pelo swagger vá para http://localhost:3000/api


# autoria <a name="id05"></a>

<h3 align='center'> @Tauan-Ray • Desenvolvedor
 </h3>

#

<div  align='center'>

[![Linkedin](https://img.shields.io/badge/LinkedIn-0D1117?style=for-the-badge&logo=linkedin&logoColor=blue)](https://www.linkedin.com/in/tauan-ray-castro-venuto/)
<a href = "mailto:tauanray995@gmail.com">
![Gmail](https://img.shields.io/badge/Gmail-0D1117?style=for-the-badge&logo=gmail&logoColor=red)</a>
[![github](https://img.shields.io/badge/Github-0D1117?style=for-the-badge&logo=github&logoColor=fff)](https://www.github.com/Tauan-Ray)
</div>
