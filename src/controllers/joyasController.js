const { obtenerJoyas, filtrarJoyas } = require('../models/joyasModel.js');

// Obtener j HATEOAS
const getJoyas = async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
        const [orderField, orderDirection] = order_by.split('_');
        const offset = (page - 1) * limits;

        const joyas = await obtenerJoyas(limits, offset, orderField, orderDirection);

        const data = joyas.map(item => ({
            ...item,
            href: `/joyas/${item.id}`,
        }));

        res.json({
            total: data.length,
            joyas: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener joyas' });
    }
};

// Filtrar j
const getJoyasFiltradas = async (req, res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;

        const filters = [];
        const values = [];

        if (precio_max) {
            filters.push('precio <= $' + (values.length + 1));
            values.push(precio_max);
        }
        if (precio_min) {
            filters.push('precio >= $' + (values.length + 1));
            values.push(precio_min);
        }
        if (categoria) {
            filters.push('categoria = $' + (values.length + 1));
            values.push(categoria);
        }
        if (metal) {
            filters.push('metal = $' + (values.length + 1));
            values.push(metal);
        }

        const joyasFiltradas = await filtrarJoyas(filters, values);

        res.json(joyasFiltradas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al filtrar joyas' });
    }
};

module.exports = { getJoyas, getJoyasFiltradas };
