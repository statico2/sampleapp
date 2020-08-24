# sampleapp

- Monorepo
- TypeScript
- React
- Next.JS
- GraphQL
- Apollo Client & Server
- GraphQL Codegen
- Postgres
- Knex

### Getting started

1. Get the Remote Containers extension for VS Code and Docker and open this project.
1. When prompted to run in a container, do that.
1. Run the `migrate:latest` and `seed:run` tasks in backend.
1. Run the `watch-types`, `frontend/dev` and `backend/dev` tasks simultaneously.

## Using a remote Docker host because your local dev box is too slow?

- If you're on Windows, uncomment the appropriate parts in `devcontainer.json` and `docker-compose.yml`

- Add a `.vscode/settings.json` file like:

```
{
  "docker.host": "ssh://ian@devbox"
}
```

- Create an entry in your local `~/.ssh/config` like this:

```
Host devbox
Hostname 192.168.100.123
User me
LocalForward 3000 localhost:3000
LocalForward 4000 localhost:4000
LocalForward 5432 localhost:5432
StrictHostKeyChecking no
```

- `ssh devbox` to open the ports
