## NOT A SOLAR SYSTEM

Restful api desenvolvida para o app **Not a solar system**,
o frontend pode ser encontrado [aqui](https://github.com/sdq-sts/not-a-solar-system-front).


### TECNOLOGIAS

Foi usado no projeto:

  - [Node](https://nodejs.org/en/)
  - [MongoDB](https://www.mongodb.com/)
  - [Express](https://expressjs.com/pt-br/)
  - [JWT](https://jwt.io/)
  - [Redis](https://redis.io/)
  - [AWS S3](https://aws.amazon.com/pt/s3/)


### VARIÁVEIS

As variáveis de ambiente podem ser adicionadas no arquivo `.env` (modificando o `.env.example`).

O MongoDB gratuito pode ser utilizado localmente ou criado no site [Mlab](https://mlab.com/).

O Redis é opcional mas pode ser utilizado localmente ou criado no site [RedisLabs](https://redislabs.com/).

O bucket para armazenamento de imagens pode ser criado em [AWS S3](https://aws.amazon.com/pt/s3/).


### COMO USAR

Depois de criar o arquivo `.env`:

```bash
$ npm install && npm run dev
```

A aplicação vai rodar por padrão na porta `7777`

### LINTER

O projeto usa `eslint` com a configuração `standard`.

Para rodar o linter é preciso executar o comando

```bash
$ npm run lint
```
