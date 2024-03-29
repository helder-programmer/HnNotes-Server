import { User } from "@prisma/client";
import { ICreateUserDTO } from "../user/dtos/ICreateUserDTO";
import { IFindByIdDTO } from "../user/dtos/IFindByIdDTO";
import { IUpdateUserDTO } from "../user/dtos/IUpdateUserDTO";

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(data: IFindByIdDTO): Promise<User | null>;
    update(data: IUpdateUserDTO): Promise<User>;
}