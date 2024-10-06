1) Clonar Reposotorio
2) Agregar dependencias --> npm install
3) Agregar archivo .end (lo envie por wsp)
4) Levantar servidor --> npm run dev
5) Listo

---LOGIN---

[POST] http://localhost:4000/api/register
{
  "username": "username",
  "password": "password",
  "email": "email"
}

[POST] http://localhost:4000/api/login
{
  "password": "password",
  "email": "email"
}

[POST] http://localhost:4000/api/logout
{
}

[GET] http://localhost:4000/api/profile (retorna los datos del usuario logueado)

---MASCOTA---

[GET] http://localhost:4000/api/state

[GET] http://localhost:4000/api/feed

[GET] http://localhost:4000/api/sleep

[GET] http://localhost:4000/api/heal

[GET] http://localhost:4000/api/revive
