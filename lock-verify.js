{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/create",
      "dest": "/create.html"
    },
    {
      "src": "/templates",
      "dest": "/templates.html"
    },
    {
      "src": "/demo/s1",
      "dest": "/demo/s1.html"
    },
    {
      "src": "/demo/t1",
      "dest": "/demo/t1.html"
    },
    {
      "src": "/demo/t2",
      "dest": "/demo/t2.html"
    },
    {
      "src": "/demo/t3",
      "dest": "/demo/t3.html"
    },
    {
      "src": "/demo/p1",
      "dest": "/demo/p1.html"
    },
    {
      "src": "/demo/p2",
      "dest": "/demo/p2.html"
    },
    {
      "src": "/demo/p3",
      "dest": "/demo/p3.html"
    },
    {
      "src": "/builder/(.*)",
      "dest": "/builder.html"
    },
    {
      "src": "/(.*)",
      "dest": "/slug.html"
    }
  ],
  "outputDirectory": "public"
}