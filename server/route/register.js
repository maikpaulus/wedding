const mysql = require('mysql');
const config = require('config');
const EventEmitter = require('events');

module.exports = {
    getPersons: (request, response) => {
        request.check('token').notEmpty().matches(/^[A-Z0-9]{10}$/);

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
            let personGroupId = request.body.id || (request.query.id || request.params.id);

            connection.query('SELECT * from v_persons where personGroupId = ? and personGroupToken = ?', 
                [personGroupId, token], (err, results) => {
                    if (err || 0 === results.length) {
                        return response.status(400).send({
                            success: false,
                            message: "Das Token konnte nicht verifiziert werden."
                        });
                    }

                    let persons = results.map((person) => {
                        return { 
                            id: person['id'],
                            data: {
                                firstName: person['firstName'],
                                lastName: person['lastName'],
                                registered: !!person['isRegistered'],
                                mayHavePlusOne: !!person['mayHavePlusOne'],
                                plusOneFirstName: person['plusOneFirstName'] || null,
                                plusOneIsRegistered: !!person['plusOneIsRegistered']
                            }
                        }
                    });

                    return response.status(200).send({
                        success: true,
                        data: persons
                    });
            });
        });
    },

    updatePersons: (request, response) => {
        request.check('token').notEmpty().matches(/^[A-Z0-9]{10}$/);

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
            let personGroupId = request.body.id || (request.query.id || request.params.id);
            
            let persons =  request.body.persons || (request.query.persons || request.params.persons);
            persons = JSON.parse(persons);

            connection.query('SELECT * from v_persons where personGroupId = ? and personGroupToken = ?', 
                [personGroupId, token], (err, results) => {
                if (err || 0 === results.length) {
                    return response.status(400).send({
                        success: false,
                        message: "Das Token konnte nicht verifiziert werden."
                    });
                }

                let validPersons = results.map( (person) => {
                    return {
                        id: person['id'],
                        plusOneId: person['plusOneId']
                    }
                });

                let finishedEmitter = new EventEmitter();
                let personCounter = 0;   

                finishedEmitter.on('finished', () => {
                    if (0 === --personCounter) {
                        response.status(200).send({
                            success: true,
                            message: 'Update erfolgreich.'
                        });
                    }
                });

                let invalidCall = false;
                validPersons.forEach( (validPerson) => {
                    if (invalidCall) {
                        return;
                    }
                    let person = persons[validPerson.id] || null;

                    if (null === person) {
                        response.status(400).send({
                            success: false,
                            message: 'det geht net.'
                        });

                        invalidCall = true;
                        return;
                    }

                    let registered = !!JSON.parse(person['registered']);
                    let mayHavePlusOne = !!JSON.parse(person['mayHavePlusOne']);

                    personCounter++;
                    
                    connection.query('UPDATE person SET changed_at = CURRENT_TIMESTAMP, isRegistered = ? where id = ?', [registered, validPerson.id], (err, results) => {
                        if (err) {
                            return response.status(400).send({
                                success: false,
                                message: 'det geht net.'
                            });
                        }

                        // check for plus ones 
                        if (mayHavePlusOne) {
                            let plusOneIsRegistered = !!JSON.parse(person['plusOneIsRegistered']);
                            
                            if (registered && plusOneIsRegistered && person['plusOneFirstName']) {
                                if (null === validPerson.plusOneId) {
                                    connection.query('INSERT INTO person (firstname, isRegistered, persongroup_id, partner_id) VALUES (?, ?, ?, ?)', 
                                        [person['plusOneFirstName'], plusOneIsRegistered, personGroupId, validPerson.id], (err, results) => {
                                        if (err) {
                                            return response.status(400).send({
                                                success: false,
                                                message: 'det geht net.'
                                            });
                                        }

                                        finishedEmitter.emit('finished');
                                    });
                                }
                                else {
                                    connection.query('UPDATE person SET changed_at = CURRENT_TIMESTAMP, firstname = ?, isRegistered = ? WHERE id = ?', 
                                        [person['plusOneFirstName'], plusOneIsRegistered, validPerson.plusOneId], (err, results) => {
                                        if (err) {
                                            return response.status(400).send({
                                                success: false,
                                                message: 'det geht net.'
                                            });
                                        }
                                        
                                        finishedEmitter.emit('finished');
                                    });
                                }
                            }
                            else {
                                if (null !== validPerson.plusOneId) {
                                    connection.query('DELETE FROM person WHERE id = ?', 
                                        [validPerson.plusOneId], (err, results) => {
                                        if (err) {
                                            return response.status(400).send({
                                                success: false,
                                                message: 'det geht net.'
                                            });
                                        }
                                        
                                        finishedEmitter.emit('finished');
                                    });
                                }
                                else {
                                    finishedEmitter.emit('finished');    
                                }
                            }
                        }
                        else {
                            finishedEmitter.emit('finished');
                        }
                    });
                });
            });
        });
    }
};