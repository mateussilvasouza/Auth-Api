# Backend Authorization API

Este projeto é uma API backend desenvolvida em TypeScript com foco em autenticação e autorização, utilizando tecnologias como JWT, `dotenv` e criptografia. O objetivo é fornecer endpoints seguros para o registro, login e gerenciamento de recursos (como livros), garantindo a segurança dos dados e das operações realizadas pelos usuários.

---

## **Tecnologias Utilizadas**

- **Node.js**: Plataforma para execução do JavaScript no backend.
- **TypeScript**: Suporte para tipagem estática e recursos avançados do JavaScript.
- **Express**: Framework minimalista para criação de APIs.
- **JWT**: Geração e validação de tokens para autenticação.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **crypto**: Biblioteca nativa para operações de criptografia.

---

## **Instalação e Configuração**

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Navegue para o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente no arquivo `.env`:
   ```plaintext
   PORT=8000
   PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgk...
   PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w...
   ```

5. Inicie o servidor em ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## **Estrutura do Projeto**

```plaintext
src/
├── @types/
│   └── enviroment.d.ts
│   └── express.d.ts
├── controllers/
│   ├── auth/
│   │   ├── login.controller.ts
│   │   └── register.controller.ts
│   └── book/
│       └── createBook.controller.ts
├── middlewares/
│   └── auth.middleware.ts
├── model/
│   ├── user.model.ts
│   └── book.model.ts
├── utils/
│   ├── encrypt.ts
│   └── jwt.utils.ts
├── index.ts
├── routes/
│   └── routes.ts
```

---

## **Endpoints**

### **Autenticação**

#### **Registrar Usuário**
- **POST** `/register`
- **Descrição**: Registra um novo usuário.
- **Corpo da Requisição**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "role": "admin", //permissões aceitas: "admin" | "student"
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "User registration successful"
  }
  ```

#### **Login**
- **POST** `/auth/login`
- **Descrição**: Realiza login e retorna um token JWT.
- **Corpo da Requisição**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Resposta**:
  ```json
  {
    "token": "jwt-token",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

---

### **Recursos (Livros)**

#### **Criar Livro**
- **POST** `/books`
- **Descrição**: Cria um novo livro no sistema. Requer autenticação.
- **Headers**:
  ```plaintext
  Authorization: Bearer <jwt-token>
  ```
- **Corpo da Requisição**:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "year": 2023,
    "publisher": "Publisher Name"
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "Book created successfully"
  }
  ```

---

## RBAC (Role-Based Access Control)

Este projeto utiliza RBAC para gerenciar permissões com base nos papéis dos usuários. Cada usuário tem um papel atribuído, e esse papel é armazenado no JWT gerado durante o login. O backend valida os papéis dos usuários para controlar o acesso a recursos específicos.

#### Papéis Disponíveis:
- **Admin:** Permissão para registro de novos livros.
- **Studant:** Não possuí permições especiais.

#### Como funciona:
1. **Geração do Token:**
   O papel do usuário é incluído no payload do token JWT no momento do login.
   ```json
   {
     "sub": "userId",
     "role": "Admin",
     "iat": 1691234567,
     "exp": 1691238167
   }
   ```

2. **Autenticação:**
   O middleware de autenticação verifica o token JWT e adiciona o `role` do usuário no objeto `req.user`.

3. **Autorização:**
   Um middleware adicional valida se o usuário tem permissão para acessar um recurso com base no seu papel.

### Como Testar:
1. **Registro e Login como Admin:**
   - Gere um token com o papel `Admin` ao fazer login.
   - Use o token para acessar a rota de criação de livros.

2. **Registro e Login como User:**
   - Gere um token com o papel `User`.
   - Tente acessar rotas restritas para administradores e observe a resposta com status `403`.

---

## **Principais Funcionalidades**

1. **Registro e Login**:
   - Registro de novos usuários com senhas criptografadas e permissões.
   - Login com validação e geração de tokens JWT.

2. **Criação de Livros**:
   - Permite que usuários autenticados e com permissão de admin registrem novos livros.

3. **Criptografia e Segurança**:
   - Senhas são armazenadas como hash utilizando o módulo `crypto`.
   - Tokens JWT são assinados utilizando RS256.

---

## **Scripts Disponíveis**

- **Iniciar em Desenvolvimento**:
  ```bash
  npm run dev
  ```

---

## **Contribuição**

1. Faça um fork do repositório.
2. Crie um branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Envie suas alterações:
   ```bash
   git commit -m "Descrição das alterações"
   git push origin minha-feature
   ```
4. Abra um Pull Request.

---

## **Licença**

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.