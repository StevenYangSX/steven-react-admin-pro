import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"; 

// https://vitejs.dev/config/
export default defineConfig({
  // define:{
  //   'process.env':{
  //     APP_API_BASE_URL : JSON.stringify(process.env.API_BASE_URL)
  //   }
  // },
  plugins: [react(),
     // Custom plugin to load markdown files
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          // For .md files, get the raw content
          return `export default ${JSON.stringify(code)};`;
        }
      }
    }
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  }
})
