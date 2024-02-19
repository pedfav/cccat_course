import pgp from "pg-promise";

export default interface DatabaseConnection {
	query (statement: string, params: any): Promise<any>;
	close (): Promise<any>;
}

export class PgPromiseAdapter implements DatabaseConnection {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://postgres:cccat123@localhost:5432/postgres");
	}

	query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	async close(): Promise<any> {
		// detalhe traduzido no adapter
		return this.connection.$pool.end();
	}

}
