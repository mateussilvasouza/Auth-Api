declare global{
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PRIVATE_KEY: string;
      PUBLIC_KEY: string;
    }
  }
}
