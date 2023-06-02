# Full-Stack - Laravel and React

Projeto teste desenvolvido conforme os requisitos apresentados. O projeto foi feito com PHP 8.2, Laravel (back-end) e o front-end foi feito com React (Vite).
Como é um teste, subirei os arquivos .env também, para facilitar a execução do app.

## Autor

- [@lucasfernandescwb](https://github.com/lucasfernandescwb)


## Rodar projeto (Laravel | Back-end)

Clonar projeto

```bash
  git clone https://github.com/lucasfernandescwb/vaga-desenvolvedor.git
```

Fazendo o setup do docker

```bash
  cd project
  cd back
  docker-compose up -d
  docker-compose exec app bash
```

Instalando dependências

```bash
  composer install
```

Rodar migrations (seeding)

```bash
  php artisan migrate:fresh --seed
```

Rodar o servidor

```bash
  php artisan serve
```

O server back irá rodar na seguinte url -> [localhost:8000](http://localhost:8000) 

_URL -> http://localhost:8000/api/all-jobs (exemplo real de um endpoint)_


## Rodar projeto (React - Front-end)

### Com o back já rodando executar os passos abaixo 👇:

Fazendo o setup do front

```bash
  cd project
  cd front
```

Instalando dependências

```bash
  npm install  (caso esteja usando npm)
  yarn         (caso esteja usando yarn)
  pnpm install (caso esteja usando pnpm)
```

Rodando o projeto

```bash
  npm run dev  (caso esteja usando npm)
  yarn dev     (caso esteja usando yarn)
  pnpm run dev (caso esteja usando pnpm)
```

O projeto será aberto no [localhost:5173](http://localhost:5173).