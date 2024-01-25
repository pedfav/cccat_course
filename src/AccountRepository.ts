import pgp from "pg-promise";
import crypto from "crypto";

const DATABASE_URL="postgres://postgres:cccat15_1@localhost:5432/postgres"

export default class AccountRepository {

    getConnection () {
        try {
            return pgp()(DATABASE_URL);
        } catch (error) {
            throw new Error("Cannot connect with DB");
        }
    }

    async save (account: any) {
        const connection = this.getConnection()
        const id = crypto.randomUUID();
        await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, account.name, account.email, account.cpf, account.carPlate, !!account.isPassenger, !!account.isDriver]);
        connection.$pool.end();
        return id;
    }

    async getByEmail (email: string) {
        const connection = this.getConnection()
		const [account] = await connection.query("select * from cccat15.account where email = $1", [email]);
		await connection.$pool.end();
		return account;
	}

    async getById (id: string) {
        const connection = this.getConnection()
		const [account] = await connection.query("select * from cccat15.account where account_id = $1", [id]);
		await connection.$pool.end();
		return account;
	}
}