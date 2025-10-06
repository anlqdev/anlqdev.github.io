import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

const {
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  GISCUS_MAPPING,
  GISCUS_STRICT,
  GISCUS_REACTIONS_ENABLED,
  GISCUS_EMIT_METADATA,
  GISCUS_LANG
} = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
const config = defineConfig({
  site: 'https://anlqdev.github.io',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'An',
      openGraph: {
        home: {
          title: 'An',
          description: 'Main Page.'
        },
        blog: {
          title: 'An - Blog',
          description: 'Blog Page.'
        },
        projects: {
          title: 'An - Projects'
        }
      },
      giscus: {
        repository: "anlqdev/anlqdev.github.io",
        repositoryId: "R_kgDOP9HVVQ",
        category: "General",
        categoryId: "DIC_kwDOP9HVVc4CwTpd",
        mapping: "pathname" as any,
        strict: GISCUS_STRICT === "true",
        reactionsEnabled: GISCUS_REACTIONS_ENABLED === "true",
        emitMetadata: GISCUS_EMIT_METADATA === "true",
        lang: "en",
      }
    })
  ],
  adapter: node({
    mode: 'standalone'
  })
});

export default config;
