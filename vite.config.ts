import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [reactRefresh(), svgr()],
  resolve: {
    alias: [
      {
        find: /^@material-ui\/icons\/(.*)/,
        replacement: "@material-ui/icons/esm/$1",
      },
      {
        find: /^@material-ui\/core\/(.+)/,
        replacement: "@material-ui/core/es/$1",
      },
      {
        find: /^@material-ui\/core$/,
        replacement: "@material-ui/core/es",
      },
      
    ],
  },
  build: {
    rollupOptions: {
      external: [
        "/@material-ui/icons/esm/$1",
        "/@material-ui/core/es/$1",
        "/@material-ui/core/es",
        "/jss-plugin-window"

      ],
    },
    brotliSize: false,
    chunkSizeWarningLimit: 1000
  },
  
  optimizeDeps: {
    include: ["@material-ui/core", "@material-ui/icons", "@material-ui/styles"],
  },
});

// export default defineConfig({
//   resolve: {
//     alias: {
//       "@material-ui/icons": "./node_modules/@material-ui/icons/esm",
//     },
//   },
// });
