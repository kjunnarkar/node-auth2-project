const db = require('../database/db-config');

module.exports = {
    add,
    findBy,
    get
}

function add(user) {
    return db('users').insert(user);
}

function findBy(user) {
    return db('users').where(user);
}

function get() {
    return db('users').select('users.id', 'users.username', 'users.department');
}

