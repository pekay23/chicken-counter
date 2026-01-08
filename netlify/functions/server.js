const { Client } = require('pg');

exports.handler = async (event, context) => {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    
    try {
        await client.connect();
        
        if (event.httpMethod === 'POST') {
            const data = JSON.parse(event.body);
            await client.query(
                `INSERT INTO chicken_counts (count_5, count_4, count_3, count_2, total) VALUES ($1, $2, $3, $4, $5)`,
                [data[5], data[4], data[3], data[2], data.total]
            );
            return { statusCode: 200, body: "Saved" };
        } else {
            const result = await client.query('SELECT * FROM chicken_counts ORDER BY created_at DESC LIMIT 10');
            return { statusCode: 200, body: JSON.stringify(result.rows) };
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    } finally {
        await client.end();
    }
};
