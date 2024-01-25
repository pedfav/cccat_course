import { validateCpf } from "./validateCpf";
import AccountRepository from "./AccountRepository";

export default class Signup {

	constructor (private accountRepository: AccountRepository) {
	}

	async execute (input: any): Promise<any> {
		const account = await this.accountRepository.getByEmail(input.email)
		if (account) throw new Error("Account already exists");
		if (this.isInvalidName(input.name)) throw new Error("Name is invalid");
		if (this.isInvalidEmail(input.email)) throw new Error("Email is invalid");
		if (!validateCpf(input.cpf)) throw new Error("Cpf is invalid");
		if (input.isDriver && this.isInvalidCarPlate(input.carPlate)) throw new Error("Car plate is invalid");

		const accountId = await this.accountRepository.save(input);
		
		return {
			accountId: accountId
		};
	}

	isInvalidName (name: string) {
		return !name.match(/[a-zA-Z] [a-zA-Z]+/);
	}
	
	isInvalidEmail (email: string) {
		return !email.match(/^(.+)@(.+)$/);
	}
	
	isInvalidCarPlate (carPlate: string) {
		return !carPlate.match(/[A-Z]{3}[0-9]{4}/);
	}
}