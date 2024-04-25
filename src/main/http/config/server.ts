export const HTTP_PORT = Number(process.env.HTTP_PORT) || 8080
export const HTTP_HOST = process.env.HTTP_HOST || 'localhost'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'test' ? false : true
