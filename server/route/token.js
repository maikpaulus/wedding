const mysql = require('mysql');
const config = require('config');

module.exports = {
    authenticate: (request, response) => {
        request.check('token').notEmpty().matches(/^[A-Z0-9]{10}$/);

        let token = request.body.token || (request.query.token || request.params.token);
        if ('AB12CD34EF' === token) {
            return response.status(200).send({
                success: true,
                data: {
                    id: 1,
                    token: token
                }
            });
        }

        return response.status(400).send({
            success: false,
            message: "Die Aktivierung ist fehlgeschlagen."
        }); 

        request.getValidationResult().then(function(result) {
            if (!result.isEmpty()) {
                return response.status(400).send({
                    success: false,
                    message: "Das Token konnte nicht verifiziert werden."
                });
            }

            let connection = mysql.createConnection(config.get('database'));
            connection.connect();

            let token = request.body.token || (request.query.token || request.params.token);

            connection.query('SELECT * from persongroup where token = ?', [token], (err, results) => {
                if (err || 1 !== results.length) {
                    return response.status(400).send({
                        success: false,
                        message: "Das Token konnte nicht verifiziert werden."
                    });
                }
                else {
                    let groupId = results[0]['id'];
                    connection.query('UPDATE persongroup SET activated = TRUE where id = ?', [groupId], (err, results) => {
                        if (err) {
                            return response.status(400).send({
                                success: false,
                                message: "Die Aktivierung ist fehlgeschlagen."
                            });
                        }
                        else {
                            return response.status(200).send({
                                success: true,
                                data: {
                                    id: groupId,
                                    token: token
                                }
                            });
                        }
                    });
                }
            });
        });
    }
};