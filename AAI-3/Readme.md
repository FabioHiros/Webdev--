<h1>Todo List</h1>

<p>Para executar o arquivo abra seu terminal de comando e digite  git clone url .
-> Digite cd backend/src<br>
-> Digite npm install<br>
-> digite npx nodemon server.ts<br>
-> abra outro terminal e vá para a pasta frontend/aa3<br>
-> npm install<br>
-> npm run dev

</p>

<h2>rotas</h2>
<p>
<h4>/todos</h4>
<span>GET: Recebe parâmetros sobre o status(boolean) das tarefas para filtragem, caso não seja fornecido ele será indefinido por padrão e retornará todas as tarefas</span><br>
<span>POST: Recebe o parâmetro (name:string) para criar a tarefa e o status por padrão da tarefa é false</span>

<h4>/todos/:id</h4>

<span>DELETE: Deleta a tarefa utilizando o ID da mesma</span>
<span>PATCH: Recebe o id(number) da tarefa,name(string)  e o status(boolean) para atualizações</span>

</p>