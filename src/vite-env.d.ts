/// <reference types.ts="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FRONTEND_PORT: string;
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
