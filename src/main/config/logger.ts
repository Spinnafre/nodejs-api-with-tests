import { ENV } from "./env";

const LOG_LEVEL = ENV.NODE_ENV === 'test' ? 'debug' : 'info'

export {
    LOG_LEVEL
}