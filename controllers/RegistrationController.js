import User from "../models/User.js";

export default class RegistrationController {
    static show(req, res) {
        res.render('pages/registration');
    }

    static save(req, res) {
        const data = req.body;
        if (User.validateUser(data)) {
            res.status(200).json({ message: 'Usuário salvo com sucesso!' })
        }
        res.status(400).json({ message: 'Parâmetros inválidos' })
    }
}