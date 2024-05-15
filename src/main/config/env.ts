
import "dotenv/config"

type CONFIG = {
    NODE_ENV: string;
    IS_DEVELOPMENT: boolean;
    HTTP_HOST: string;
    HTTP_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: number;
    DB_HOST: string;
}
type ENV = {
    NODE_ENV: string;
    HTTP_HOST: string;
    HTTP_PORT: number;
    DB_USER_TEST?: string;
    DB_PASSWORD_TEST?: string;
    DB_PORT_TEST?: number;
    DB_HOST_TEST?: string;
    DB_NAME_TEST?: string;
    DB_USER_DEV?: string;
    DB_PASSWORD_DEV?: string;
    DB_PORT_DEV?: number;
    DB_HOST_DEV?: string;
    DB_NAME_DEV?: string;
    DB_USER_PROD?: string;
    DB_PASSWORD_PROD?: string;
    DB_PORT_PROD?: number;
    DB_HOST_PROD?: string;
    DB_NAME_PROD?: string;
}

const loadEnvironments = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV || 'development',

        HTTP_HOST: process.env.HTTP_HOST ? process.env.HTTP_HOST : "localhost",
        HTTP_PORT: process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 8080,

        DB_USER_TEST: process.env.DB_USER_TEST ? process.env.DB_USER_TEST : undefined,
        DB_PASSWORD_TEST: process.env.DB_PASSWORD_TEST ? process.env.DB_PASSWORD_TEST : undefined,
        DB_PORT_TEST: process.env.DB_PORT_TEST ? Number(process.env.DB_PORT_TEST) : undefined,
        DB_HOST_TEST: process.env.DB_HOST_TEST ? process.env.DB_HOST_TEST : undefined,
        DB_NAME_TEST: process.env.DB_NAME_TEST ? process.env.DB_NAME_TEST : undefined,

        DB_USER_DEV: process.env.DB_USER_DEV ? process.env.DB_USER_DEV : undefined,
        DB_PASSWORD_DEV: process.env.DB_PASSWORD_DEV ? process.env.DB_PASSWORD_DEV : undefined,
        DB_PORT_DEV: process.env.DB_PORT_DEV ? Number(process.env.DB_PORT_DEV) : undefined,
        DB_HOST_DEV: process.env.DB_HOST_DEV ? process.env.DB_HOST_DEV : undefined,
        DB_NAME_DEV: process.env.DB_NAME_DEV ? process.env.DB_NAME_DEV : undefined,

        DB_USER_PROD: process.env.DB_USER_PROD ? process.env.DB_USER_PROD : undefined,
        DB_PASSWORD_PROD: process.env.DB_PASSWORD_PROD ? process.env.DB_PASSWORD_PROD : undefined,
        DB_PORT_PROD: process.env.DB_PORT_PROD ? Number(process.env.DB_PORT_PROD) : undefined,
        DB_HOST_PROD: process.env.DB_HOST_PROD ? process.env.DB_HOST_PROD : undefined,
        DB_NAME_PROD: process.env.DB_NAME_PROD ? process.env.DB_NAME_PROD : undefined
    };
};

const getSanitizedConfig = (config: ENV): CONFIG => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }

    const DATABASE_SETUPS = new Map<string, {
        DB_USER: string;
        DB_PASSWORD: string;
        DB_PORT: number;
        DB_HOST: string;
        DB_NAME: string;
    }>([
        ["test", {
            DB_USER: config.DB_USER_TEST as string,
            DB_PASSWORD: config.DB_PASSWORD_TEST as string,
            DB_PORT: config.DB_PORT_TEST as number,
            DB_NAME: config.DB_NAME_TEST as string,
            DB_HOST: config.DB_HOST_TEST as string
        }],
        ["development", {
            DB_USER: config.DB_USER_DEV as string,
            DB_PASSWORD: config.DB_PASSWORD_DEV as string,
            DB_PORT: config.DB_PORT_DEV as number,
            DB_NAME: config.DB_NAME_TEST as string,
            DB_HOST: config.DB_HOST_DEV as string,
        }],
        ["production", {
            DB_USER: config.DB_USER_PROD as string,
            DB_PASSWORD: config.DB_PASSWORD_PROD as string,
            DB_PORT: config.DB_PORT_PROD as number,
            DB_NAME: config.DB_NAME_TEST as string,
            DB_HOST: config.DB_HOST_PROD as string
        }]
    ])

    const NODE_ENV = config.NODE_ENV

    const CURRENT_DATABASE_SETUP = DATABASE_SETUPS.get(NODE_ENV)

    return {
        NODE_ENV,
        IS_DEVELOPMENT: NODE_ENV === 'development',
        HTTP_HOST: config.HTTP_HOST,
        HTTP_PORT: config.HTTP_PORT,
        ...CURRENT_DATABASE_SETUP
    } as CONFIG
};

const config = loadEnvironments()
const ENV = getSanitizedConfig(config)
console.log(ENV);
export {
    ENV
}


