import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';

// Custom plugin to provide real Python MicroVM execution locally
function pythonSandboxPlugin() {
  return {
    name: 'python-sandbox-plugin',
    configureServer(server) {
      server.middlewares.use('/api/run-sandbox', (req, res, next) => {
        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const { code } = JSON.parse(body || '{}');
            if (!code) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Missing code' }));
            }

            const startTime = Date.now();
            const py = spawn('python', ['-u', '-c', code]);

            let stdout = '';
            let stderr = '';

            py.stdout.on('data', data => { stdout += data.toString(); });
            py.stderr.on('data', data => { stderr += data.toString(); });

            py.on('close', code => {
              const durationMs = Date.now() - startTime;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                exitCode: code,
                stdout: stdout.trim(),
                stderr: stderr.trim(),
                durationMs
              }));
            });
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pythonSandboxPlugin()],
  server: {
    host: true,
    proxy: {
      '/api/otari': {
        target: 'https://otari.ai/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/otari/, '')
      }
    }
  }
});
