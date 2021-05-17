### Recuperação de senha

**Requisitos Funcionais**

  - O usuário deve poder recuperar sua senha informado seu e-mail.
  - O usuário deve receber um e-mail com instruções de recuperação de senha.
  - O usuário deve poder resetar sua senha.

**Requisitos Não Funcionais**
  - Utilizar Mailtrap para testar envio em ambiente de desenvolvimento.
  - Utilizar o Amazon SES para envios em produção.
  - O envio de e-mails deve acontecer em segundo plano (background job).

**Regra de Negócio**
  - O link enviado por e-mail para resetar senha, deve expirar em 2 horas.
  - O usuário deve confirmar a nova senha escolhida.

### Atualização do perfil

**Requisitos Funcionais**
  - O usuário deve poder atualizar o seu perfil (nome, e-mail e senha).

**Requisitos Não Funcionais**

**Regra de Negócio**
  - O usuário não pode alterar seu e-mail para um e-mail já em uso.
  - Para atualizar sua senha, o usuário deve informar a senha antiga.
  - Para atualizar sua senha, o usuário deve confirmar a nova senha informada.

### Painel do Prestador

**Requisitos Funcionais**
  - O prestador deve poder listar todos os seus agendamentos de um determinado dia.
  - O prestador deve receber uma notificação sempre que houver um novo agendamento.
  - O prestador dever poder visualizar as notificações não lidas.

**Requisitos Não Funcionais**
  - Os agendamentos do dia devem ser armazenados em cache.
  - As notificações do prestador devem ser armazenadas no MongoDB.
  - As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io.

**Regra de Negócio**
  - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar.

### Agendamento de serviços

**Requisitos Funcionais**
  - O usuário deve poder listar todos os prestadores de serviços cadastrados.
  - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um determinado prestador.
  - O usuário deve poder listar horários disponíveis em um dia específico de um prestador.
  - O usuário deve poder realizar um novo agendamento com um prestador.

**Requisitos Não Funcionais**
  - A listagem de prestadores devem ser armazenadas em cache.

**Regra de Negócio**
  - Cada agendamento deve durar 1 hora.
  - Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro às 8h, último às 17h);
  - O usuário não pode agendar em um horário já ocupado.
  - O usuário não pode agendar em um horário que já passou.
  - O usuário não pode agendar um serviço consigo mesmo.

