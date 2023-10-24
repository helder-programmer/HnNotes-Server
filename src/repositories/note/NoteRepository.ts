import { prismaClient } from "../../database";
import { INoteRepository } from "../types/INoteRepository";
import { ICreateNoteDTO } from "./dtos/ICreateNoteDTO";
import { IFindAllDTO } from "./dtos/IFindAllDTO";

export class NoteRepository implements INoteRepository {
    public async create({ userId, title }: ICreateNoteDTO) {

        const note = await prismaClient.note.create({
            data: {
                title,
                content: 'New Note',
                userId
            }
        });

        return note;
    }

    public async findAll({ userId }: IFindAllDTO) {
        const searchedNotes = await prismaClient.note.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        
        return searchedNotes;
    }
}