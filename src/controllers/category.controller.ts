import { notExistsOrError } from '../utils/validation.utils';
import { RouterError } from '@errors';
import database from '@config/database';
import { existsOrError } from '@utils/validation.utils';
import { Request, Response } from 'express';
import { toTree, withPath } from '@utils/category.utils';

export const save = async (req: Request, res: Response) => {
    const category = { ...req.body };
    if (req.params.id) category.id = req.params.id;

    try {
        existsOrError(category.name, 'Nome não informado');
        if (category.id) {
            await database('categories')
                .update(category)
                .where({ id: category.id })
                .catch((err) => {
                    throw new RouterError(err).Error500;
                });
        } else {
            await database('categories')
                .insert(category)
                .catch((err) => {
                    throw new RouterError(err).Error500;
                });
        }

        res.status(204).send();
    } catch (err) {
        res.status((<ErrorCustom>err).status || 400).send(
            (<ErrorCustom>err).message,
        );
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        existsOrError(req.params.id, 'Código da Categoria não informado');

        const subcategory = await database('categories').where({
            parentId: req.params.id,
        });

        notExistsOrError(subcategory, 'Categoria possui subcategoria');

        const articles = await database('articles').where({
            categoryId: req.params.id,
        });
        notExistsOrError(articles, 'Categoria possui artigos');

        const rowsDeleted = await database('categories')
            .where({ id: req.params.id })
            .del();

        existsOrError(rowsDeleted, 'Categoria não encontrada');

        res.sendStatus(204);
    } catch (err) {
        res.status((<ErrorCustom>err).status || 400).send(
            (<ErrorCustom>err).message,
        );
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        const categories = await database('categories');
        res.json(withPath(categories));
    } catch (err) {
        res.status((<ErrorCustom>err).status || 400).send(
            (<ErrorCustom>err).message,
        );
    }
};

export const findById = async (req: Request, res: Response) => {
    try {
        const category = await database('categories')
            .where({ id: req.params.id })
            .first();

        res.json(category);
    } catch (err) {
        res.status((<ErrorCustom>err).status || 400).send(
            (<ErrorCustom>err).message,
        );
    }
};

export const getTree = async (req: Request, res: Response) => {
    try {
        const categories = await database('categories');
        res.json(toTree(withPath(categories)));
    } catch (err) {
        res.status((<ErrorCustom>err).status || 400).send(
            (<ErrorCustom>err).message,
        );
    }
};
