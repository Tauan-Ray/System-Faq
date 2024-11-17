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
Desenvolver um sistema completo de um sistema de FAQ que se assemelha a um forúm, que permite os usuários a se registrarem e fazer login no site, criar perguntas e também responder perguntas, consumindo a API que foi desenvolvida em NestJs.


# descrição detalhada <a name="id01.01"></a>
O objetivo deste projeto é desenvolver um Sistema de Faq utilizando os frameworks NestJs para o backend, com o prisma para a conexão ao banco de dados. Os endpoints definidos no backend permite a criação, visualização, atualização e exclusão de usuários, perguntas, respostas e categorias, todas com uma camada de proteção com a utilização do JWT(JSON Web Token) para validar os usuários autenticados, além de DTOs para garantir a integridade dos parâmetros. Todos os endpoints foram documentados utilizando Swagger, proporcionando uma interface clara e de fácil acesso. O frontend foi desenvolvido com o framework NextJs. Ele consome a API criada em NestJS, permitindo a visualização e gerenciamento de perguntas, respostas e usuários de forma intuitiva. A segurança da aplicação é mantida por meio da autenticação JWT, garantindo que apenas usuários autenticados possam acessar determinadas rotas do site.


# ferramenta/linguagem utilizada <a name="id02"></a>

<div  align='center'> 
  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Nest](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
<br>
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![NextJs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens)
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
```
$ git clone https://github.com/Tauan-Ray/System-Faq.git
$ cd System-Faq
$ cd api-server
```
<br>

Instale todas as dependências utilizando(Certifique-se de já possuir o node.js em sua máquina): 
```
npm install
```
<br>

Crie um arquivo .env para configurar a variável de ambiente para realizar a conexão com o banco de dados e a atribuição da Secret Key para o JWT:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome-do-banco?schema=public"
JWT_SECRET_KEY="suachavejwt"
```
<br>

Após configurar o arquivo .env, rode as migrações do Prisma para criar as tabelas no banco de dados:
```
npx prisma migrate dev
```

<br>

Agora, inicie o servidor de desenvolvimento:

```
npm run start:dev
```

Isso iniciará o servidor Nest.js em modo de desenvolvimento. Normalmente, ele estará acessível em http://localhost:3000<br>
Você pode usar ferramentas como Postman ou Insomnia para testar os endpoints disponíveis na API.
<br>
Para acessas documentação feita pelo swagger vá para http://localhost:3000/api
<hr>

## Ativando o projeto Next
Após realizar os passos acima, faço o seguinte para poder utilizar o Next.js
<br>
Abra outro terminal (estando na pasta System-Faq) e entre na pasta do frontend

```
$ cd client
```

<br>

Instale todas as dependências utilizando(Certifique-se de já possuir o node.js em sua máquina): 
```
npm install
```

<br>

Crie um arquivo .env para configurar a variável de ambiente para utilizar o valor da Secret Key do JWT:
```
JWT_SECRET_KEY="suachavejwt"
```
<br>

Agora, inicie o servidor:
```
npm run dev
```

O Next.js deve fornecer um url que vai direcionar para seu navegador com o projeto rodando.

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
