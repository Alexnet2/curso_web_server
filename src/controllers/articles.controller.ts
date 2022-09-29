import database from '@config/database';
import { RouterError } from '@errors';
import { existsOrError, notExistsOrError } from '@utils/validation.utils';
import { Request, Response } from 'express';

export const save = async (req: Request, res: Response) => {
    try {
        const arcticle = { ...req.body };
        if (req.params.id) arcticle.id = req.params.id;
        existsOrError(arcticle.name, 'Nome não informado');
        existsOrError(arcticle.description, 'Descrição não informada');
        existsOrError(arcticle.categoryId, 'Categoria não informada');
        existsOrError(arcticle.userId, 'Usuário não informado');
        existsOrError(arcticle.content, 'Conteúdo não informado');

        if (arcticle.id) {
            await database('arcticles')
                .update(arcticle)
                .where({ id: arcticle.id })
                .catch((err) => {
                    throw new RouterError(err).Error500;
                });
        } else {
            await database('arcticles')
                .insert(arcticle)
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
        const rowsDeleted = await database('articles')
            .where({ id: req.params.id })
            .delete()
            .catch((err) => {
                throw new RouterError(err).Error500;
            });

        notExistsOrError(rowsDeleted, 'Artigo não encontrado');

        res.status(204).send();
    } catch (err) {
        res.status((<ErrorCustom>err).status || 400).send(
            (<ErrorCustom>err).message,
        );
    }
};

const limit = 10;

export const findAll = async (req: Request, res: Response) => {
    try {
        const page = +(req.query.page || 1);
        const result = await database('articles').count('id').first();

        const articles = await database('articles')
            .select('id', 'name', 'description')
            .limit(limit)
            .offset(page * limit - limit)
            .catch((err) => {
                throw new RouterError(err).Error500;
            });

        res.json({
            data: articles,
            count: Number(result?.count),
            limit,
        });
    } catch (err) {
        res.status((<ErrorCustom>err).status || 400).send(
            (<ErrorCustom>err).message,
        );
    }
};

export const findById = async (req: Request, res: Response) => {
    try {
        const article = await database('articles')
            .where({ id: req.params.id })
            .first()
            .catch((err) => {
                throw new RouterError(err).Error500;
            });

        article.content = article.content.toString();

        res.json(article);
    } catch (err) {
        res.status((<ErrorCustom>err).status || 400).send(
            (<ErrorCustom>err).message,
        );
    }
};