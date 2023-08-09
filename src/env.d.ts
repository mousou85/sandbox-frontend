interface ImportMetaEnv {
  readonly VITE_SITE_NAME: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
