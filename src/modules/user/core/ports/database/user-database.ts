

export interface IUserDatabase {
    save(data: AddUserDatabase.Input): Promise<AddUserDatabase.Output>;
    delete(id: string): Promise<any>;
    getByName(name: string): Promise<GetByNameDatabase.Output>;
}

export namespace AddUserDatabase {
    export type Input = any
    export type Output = number

    export interface Save {
        save(data: Input): Promise<Output>
    }
}

export namespace DeleteUserDatabase {
    export type Output = void
}

export namespace GetByNameDatabase {
    export type Output = any
}