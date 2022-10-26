# Socketio com VueJs

## Recursos utilizados

- Socket.io
- JWT para validação da comunicação
- Middleware para barrar uma comunicação inválida
- Criação de uma biblioteca com padrão de projeto observer

## Rodar o VueJs

```bash
cd frontend-vue

yarn serve
```

## Rodar a API do NodeJs

```bash
cd api-node

node index.js
```

## Procediento

Rode os dois projetos acesse o endpoint:

```
http://localhost:3000/send

```

Acesse o front end: http://localhost:8080 e observe o objeto original

```js
// Objeto original
users: [
    { id: 100, name: 'Tiago', status: false },
    { id: 200, name: 'Cíntia', status: false },
    { id: 300, name: 'Liz', status: false },
],
```

Agora acesse o path do frontend: http://localhost:8080/send

Observe que o segundo objeto foi alterado, status: true

```js
// Objeto original
users: [
    { id: 100, name: 'Tiago', status: false },
    { id: 200, name: 'Cíntia', status: true },
    { id: 300, name: 'Liz', status: false },
],
```
