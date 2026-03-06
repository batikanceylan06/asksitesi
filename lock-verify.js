{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "cleanUrls": true,
  "outputDirectory": "public",
  "rewrites": [
    {
      "source": "/create",
      "destination": "/create.html"
    },
    {
      "source": "/templates",
      "destination": "/templates.html"
    },
    {
      "source": "/demo/s1",
      "destination": "/demo/s1.html"
    },
    {
      "source": "/demo/t1",
      "destination": "/demo/t1.html"
    },
    {
      "source": "/demo/t2",
      "destination": "/demo/t2.html"
    },
    {
      "source": "/demo/t3",
      "destination": "/demo/t3.html"
    },
    {
      "source": "/demo/p1",
      "destination": "/demo/p1.html"
    },
    {
      "source": "/demo/p2",
      "destination": "/demo/p2.html"
    },
    {
      "source": "/demo/p3",
      "destination": "/demo/p3.html"
    },
    {
      "source": "/builder/:slug*",
      "destination": "/builder.html"
    },
    {
      "source": "/:slug*",
      "destination": "/slug.html"
    }
  ]
}