const pool = require('../db');

// Obtener j HATEOAS
const obtenerJoyas = async (limits, offset, orderField, orderDirection) => {
    const query = `
        SELECT * FROM inventario
        ORDER BY ${orderField} ${orderDirection}
        LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limits, offset]);
    return result.rows;
};

// Filtrar j
const filtrarJoyas = async (filters, values) => {
    const query = `
        SELECT * FROM inventario
        ${filters.length ? 'WHERE ' + filters.join(' AND ') : ''}
    `;
    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = {
    obtenerJoyas,
    filtrarJoyas,
};
