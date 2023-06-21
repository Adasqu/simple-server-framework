export default function schema() {
    return {
        type: 'object',
        properties: {
            DATABASE_DIALECT: {
                type: 'string'
            },
            DATABASE_HOST: {
                type: 'string'
            },
            DATABASE_NAME: {
                type: 'string'
            },
            DATABASE_USER: {
                type: 'string'
            },
            DATABASE_PASSWORD: {
                type: 'string'
            },
            SECRET: {
                type: 'string'
            },
            PASSWORD_HASH: {
                type: 'string'
            },
            EMAIL_ADDRESS: {
                type: 'string'
            },
            EMAIL_PASSWORD: {
                type: 'string'
            },
            EMAIL_FROM: {
                type: 'string'
            },
            EMAIL_PROVIDER: {
                type: 'string'
            },
            EMAIL_PORT: {
                type: 'string'
            }
        },
        required: ['DATABASE_DIALECT', 'DATABASE_HOST', 'DATABASE_NAME', "DATABASE_PASSWORD"]
    }

}