export namespace WebController {
    export type IOutput = {
        statusCode: number
        body: any
    }

    export type IInput = {
        body: any
    }

    export interface IController<T = any> {
        handle: (request: T) => Promise<IOutput>
    }

    // 
    export class Controller {
        private controllerSpecs: any

        constructor(controllerSpecs: any) {
            this.controllerSpecs = controllerSpecs
        }

    }

    export const badRequest = (error: Error): IOutput => ({
        statusCode: 400,
        body: error
    })

    export const forbidden = (error: Error): IOutput => ({
        statusCode: 403,
        body: error
    })

    export const invalid = (error: Error): IOutput => ({
        statusCode: 422,
        body: error
    })

    export const notFound = (): IOutput => ({
        statusCode: 404,
        body: new Error("Resource not found")
    })

    export const conflict = (): IOutput => ({
        statusCode: 409,
        body: new Error("Conflict")
    })

    export const unauthorized = (): IOutput => ({
        statusCode: 401,
        body: new Error("Unauthorized")
    })

    export const serverError = (): IOutput => ({
        statusCode: 500,
        body: new Error("Internal server error")
    })

    export const unavailable = (): IOutput => ({
        statusCode: 503,
        body: new Error("Service Unavailable")
    })

    export const ok = (data: any): IOutput => ({
        statusCode: 200,
        body: data
    })
    export const created = (data: any): IOutput => ({
        statusCode: 201,
        body: data
    })

    export const noContent = (): IOutput => ({
        statusCode: 204,
        body: null
    })
}