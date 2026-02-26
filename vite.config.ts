import { defineConfig, build as viteBuild } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const serviceSlugs = [
  "web-design-companies-egypt",
  "ecommerce-store-egypt",
  "seo-services-egypt",
  "real-estate-website-design",
  "medical-website-design",
  "dental-clinic-website-design",
  "corporate-website-design",
  "landing-page-design",
  "personal-portfolio-website",
  "restaurant-website-design",
  "school-website-design",
  "tourism-website-design",
  "law-firm-website-design",
  "construction-company-website",
  "car-showroom-website",
  "social-media-management",
  "facebook-ads-management",
  "branding-identity-design",
  "content-writing-services",
  "marketing-plan-creation",
  "website-redesign-services",
  "website-speed-optimization",
  "website-maintenance-services",
  "wordpress-development",
  "shopify-store-setup",
  "booking-system-website",
  "hospital-website-design",
  "startup-website-design",
  "company-profile-website",
  "website-cost-egypt",
];

const mainPages = ["contact", "about", "blog", "portfolio"];

const blogSlugs = [
  "website-cost-egypt-2025",
  "why-businesses-need-websites",
  "seo-tips-egypt",
  "getting-customers-online",
  "ecommerce-guide-egypt",
  "social-media-marketing-egypt",
];

const prerenderRoutes: string[] = ["/ar", "/en"];

mainPages.forEach((page) => {
  prerenderRoutes.push(`/ar/${page}`, `/en/${page}`);
});

serviceSlugs.forEach((slug) => {
  prerenderRoutes.push(`/ar/${slug}`, `/en/${slug}`);
});

blogSlugs.forEach((slug) => {
  prerenderRoutes.push(`/ar/blog/${slug}`, `/en/blog/${slug}`);
});

function prerenderPlugin() {
  let isSSRBuild = false;

  return {
    name: "vite-plugin-prerender-seo",
    apply: "build" as const,
    configResolved(config: any) {
      isSSRBuild = !!config.build.ssr;
    },
    async closeBundle() {
      if (isSSRBuild) return;

      try {
        const fs = await import("fs");
        const { pathToFileURL } = await import("url");

        console.log("\n🔨 Building SSR bundle for prerendering...");

        await viteBuild({
          plugins: [
            react(),
            {
              name: "ssr-asset-handler",
              enforce: "pre" as const,
              resolveId(source: string) {
                if (
                  /\.(jpg|jpeg|png|gif|svg|webp|avif|ico)(\?.*)?$/i.test(source)
                ) {
                  return `\0ssr-asset:${source}`;
                }
                if (/\.css(\?.*)?$/i.test(source)) {
                  return `\0ssr-css:${source}`;
                }
              },
              load(id: string) {
                if (id.startsWith("\0ssr-asset:")) {
                  return `export default "/placeholder.svg"`;
                }
                if (id.startsWith("\0ssr-css:")) {
                  return `export default ""`;
                }
              },
            },
          ],
          build: {
            ssr: path.resolve(__dirname, "src/entry-server.tsx"),
            outDir: path.resolve(__dirname, "dist/server"),
            rollupOptions: {
              output: { format: "esm" },
            },
            minify: false,
          },
          resolve: {
            alias: { "@": path.resolve(__dirname, "./src") },
          },
          logLevel: "warn",
        });

        const distDir = path.resolve(__dirname, "dist");
        const template = fs.readFileSync(
          path.join(distDir, "index.html"),
          "utf-8"
        );

        const serverPath = path.join(
          distDir,
          "server",
          "entry-server.js"
        );
        const serverUrl =
          pathToFileURL(serverPath).href + `?t=${Date.now()}`;
        const { render } = await import(/* @vite-ignore */ serverUrl);

        console.log(
          `📄 Prerendering ${prerenderRoutes.length} routes...`
        );

        let success = 0;
        for (const route of prerenderRoutes) {
          try {
            const { appHtml, headTags } = render(route);
            const html = template
              .replace("<!--app-html-->", appHtml)
              .replace("<!--head-tags-->", headTags);

            const filePath = path.join(distDir, `${route}/index.html`);
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, html);
            success++;
          } catch (err: any) {
            console.warn(`  ⚠️ ${route}: ${err.message}`);
          }
        }

        // Clean up server bundle
        fs.rmSync(path.join(distDir, "server"), {
          recursive: true,
          force: true,
        });
        console.log(
          `✅ Prerendered ${success}/${prerenderRoutes.length} routes\n`
        );
      } catch (err: any) {
        console.error("❌ Prerendering failed:", err.message);
        console.error(
          "   Client build is still valid. Prerendering skipped."
        );
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && prerenderPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // تأكد من أن manualChunks يتم تطبيقها فقط في حالة عدم وجود SSR
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui';
            }
          }
        },
      },
    },
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}));
