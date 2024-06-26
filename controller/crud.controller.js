const postgre = require('../database');
const generateString = require('../utils/utils')
const bookController = {
    verifyUser: async (req, res) => {
        console.log('GET ALL')
        try {
            const { rows } = await postgre.query("select * from users");
            /**
             * We can access data object from get request by using below code
             */
            console.log('rows', rows)
            console.log('req', req.body)
            if (rows[0].email === req.body.email && rows[0].password === req.body.password) {
                res.json({ msg: "OK", verified: true })
            }
            else {
                res.json({ msg: "OK", verified: false })
            }
        } catch (error) {
            console.log('Error:', error.message);
            res.json({ msg: error.msg })
        }
    },
    getAll: async (req, res) => {
        console.log('GET ALL')
        try {
            const { rows } = await postgre.query("select * from contacts");
            /**
             * We can access data object from get request by using below code
             */
            // console.log('rows', JSON.parse(rows[1].data)[0].name)
            res.json({ msg: "OK", data: rows })
        } catch (error) {
            console.log('Error:', error.message);
            res.json({ msg: error.msg })
        }
    },
    getById: async (req, res) => {
        try {
            const { rows } = await postgre.query("select * from contacts where book_id = $1", [req.params.id])

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows })
            }

            res.status(404).json({ msg: "not found" })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    create: async (req, res) => {
        console.log('req', req.body)
        try {
            const _id = generateString(10);
            console.log('_id', _id)
            const data = JSON.stringify(req.body);
            console.log('date', data)
            const sql = 'INSERT INTO contacts(_id, data) VALUES($1, $2) RETURNING *'

            const { rows } = await postgre.query(sql, [_id, data])

            res.json({ msg: "OK", data: rows[0] })

        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    updateById: async (req, res) => {
        try {
            const { name, price } = req.body

            const sql = 'UPDATE contacts set name = $1, price = $2 where book_id = $3 RETURNING *'

            const { rows } = await postgre.query(sql, [name, price, req.params.id])

            res.json({ msg: "OK", data: rows[0] })

        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    deleteById: async (req, res) => {
        try {
            const sql = 'DELETE FROM contacts where book_id = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows[0] })
            }

            return res.status(404).json({ msg: "not found" })


        } catch (error) {
            res.json({ msg: error.msg })
        }
    }
}

module.exports = bookController