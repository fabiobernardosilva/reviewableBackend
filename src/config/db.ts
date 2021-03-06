import { createConnection } from "typeorm";
import { Review } from "../entities/review";
import { School } from "../entities/school";

export async function createDbConnection() {
    const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "secret";
    const DATABASE_USER = process.env.DATABASE_USER || "postgres";
    const DATABASE_DB = process.env.DATABASE_DB || "demo";

    console.log(
        `
        host: ${DATABASE_HOST}
        password: ${DATABASE_PASSWORD}
        user: ${DATABASE_USER}
        db: ${DATABASE_DB}
        `
    );

    await createConnection({
        type: "postgres",
        host: DATABASE_HOST,
        port: 5432,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: [
          Review,
          School
        ],
        synchronize: true
    });
}