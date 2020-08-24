# sampleapp

This is an example app that attempts to be an up-to-date implementation of the following patterns as well as an example of how to get up an running with VS Code dev containers quickly.

- Monorepo
- TypeScript
- React
- Next.JS
- GraphQL
- Apollo Client & Server
- GraphQL Codegen
- Postgres
- Knex
- Prettier pre-commit hook

More info:

- [VS Code - Developing inside a container](https://code.visualstudio.com/docs/remote/containers)
- [Setting the project name for Docker Compose](https://code.visualstudio.com/docs/remote/containers-advanced#_setting-the-project-name-for-docker-compose)

### Getting started

1. Install Docker and the Remote Containers extension for VS Code, then open this project.
1. When prompted to run in a container, do that.
  1. When the container is created, you may need to run `sudo chown -R node /workspace`
  1. Also, if the `/workspace` directory is empty, you'll need to re-clone the project in the current directory like `git clone git@github.com:statico/sampleapp.git .`
1. Run the `migrate:latest` and `seed:run` tasks in backend.
1. Choose "Run Task" and run the `all dev servers` task.
1. Go to http://localhost:3000

## Using a remote Docker host because your local dev box is too slow?

- If you're on Windows, uncomment the appropriate parts in `devcontainer.json` and `docker-compose.yml`

- Add a `.vscode/settings.json` file like:

```
{
  "docker.host": "ssh://me@devbox"
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
