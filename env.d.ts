declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test'
      HTTP_PORT: string
      HTTP_HOST: string
      DB_USER: string
      DB_PASSWORD: string
      DB_PORT: string
      DB_HOST: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
