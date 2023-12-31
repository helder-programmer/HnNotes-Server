import { Request, Response } from "express";
import { NotFoundError } from "../helpers/errors";
import { INoteRepository } from "../repositories/types/INoteRepository";

export class NoteController {
    constructor(
        private repository: INoteRepository
    ) {
        this.repository = repository;
    }

    public async create(req: Request, res: Response) {

        const note = await this.repository.create({
            userId: req.user!.userId,
            ...req.body
        });

        return res.status(200).json(note);
    }

    public async getAll(req: Request, res: Response) {
        const searchedNotes = await this.repository.findAll({ userId: req.user!.userId });
        return res.status(200).json(searchedNotes);
    }

    public async getOne(req: Request, res: Response) {
        const { noteId } = req.params;
        const userId = req.user!.userId;

        const searchedNote = await this.repository.findById({ noteId, userId });

        if (!searchedNote) throw new NotFoundError('Note not found!');

        return res.status(200).json(searchedNote);

    }

    public async update(req: Request, res: Response) {
        const userId = req.user!.userId;
        const { noteId } = req.params;


        const noteToUpdate = await this.repository.findById({ noteId, userId });

        if (!noteToUpdate) throw new NotFoundError('Note not found!');

        const dataToUpdate = {
            noteToUpdate,
            ...req.body
        };

        const updatedNote = await this.repository.update(dataToUpdate);

        return res.status(200).json(updatedNote);

    }

    public async remove(req: Request, res: Response) {
        const { noteId } = req.params;
        const userId = req.user!.userId;

        const noteToRemove = await this.repository.findById({ noteId, userId });

        if (!noteToRemove) throw new NotFoundError('Note not found!');

        await this.repository.remove(noteToRemove);
        return res.status(200).json({ message: 'Note successfully deleted' });
    }

    public async searchNotes(req: Request, res: Response) {
        const { title } = req.query as { title: string };

        const searchedNotes = await this.repository.findByTitle(title);

        return res.status(200).json(searchedNotes);
    }
}