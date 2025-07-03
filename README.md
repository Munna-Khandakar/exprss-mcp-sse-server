```
➜  app git:(dev-ops) ✗ pwd
/home/abdullah/Projects/exprss-mcp-sse-server/app
➜  app git:(dev-ops) ✗ tree
.
└── src
    └── main
        ├── docker
        │   └── Dockerfile
        ├── helm
        └── node
            ├── package.json
            ├── package-lock.json
            ├── src
            │   ├── index.ts
            │   ├── mcp-server.ts
            │   ├── sse-server.ts
            │   ├── types
            │   │   ├── Idea.ts
            │   │   └── User.ts
            │   └── utils
            │       ├── ApiClient.ts
            │       └── FormatResponse.ts
            └── tsconfig.json
```

> docker build --no-cache --progress=plain -t exprss-mcp-sse-node -f docker/Dockerfile .

> docker build -f Dockerfile -t exprss-mcp-sse-node .. 

> docker build --no-cache --progress=plain -t exprss-mcp-sse-node-v2 -f Dockerfile .. 

> docker run --rm exprss-mcp-sse-node-v2 node -v

> docker run -it --rm -p 3001:3001 exprss-mcp-sse-node-v4