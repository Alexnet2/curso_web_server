import { RouterError } from '@errors';
import bcrypt from 'bcrypt-nodejs';
import {
    equalsOrError,
    existsOrError,
    notExistsOrError,
} from '@utils/validation.utils';
import { Request, Response } from 'express';
import database from '@config/database';

const encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

export const save = async (req: Request, res: Response) => {
    const user = { ...req.body };

    if (req.params.id) user.id;

    try {
        existsOrError(user.name, 'Nome não informado');
        existsOrError(user.email, 'E-mail não informado');
        existsOrError(user.password, 'Senha não informada');
        existsOrError(user.confirmPassword, 'Confirmar senha não informada');
        equalsOrError(
            user.password,
            user.confirmPassword,
            'Senhas não conferem',
        );

        const userFromDB = await database('users')
            .where({ email: user.email })
            .first();

        if (!user.id) {
            notExistsOrError(userFromDB, 'Usuário já cadastrado');
        }

        user.password = encryptPassword(req.body.password);

        delete user.confirmPassword;

        if (user.id) {
            await database('users')
                .update(user)
                .where({ id: user.id })
                .catch((err) => {
                    throw new RouterError(err).Error500;
                });

            res.status(204).send();
        } else {
            await database('users')
                .insert(user)
                .catch((err) => {
                    throw new RouterError(err).Error500;
                });

            res.status(201).send();
        }
    } catch (err) {
        return res
            .status((<ErrorCustom>err).status || 400)
            .send((<ErrorCustom>err).message);
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        const users = await database('users').select(
            'id',
            'name',
            'email',
            'admin',
        );
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const findById = async (req: Request, res: Response) => {
    try {
        const user = await database('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .first();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
};
