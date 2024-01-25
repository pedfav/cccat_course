import AccountRepository from "./AccountRepository";

export default class AccountService {

	constructor (readonly AccountRepository: AccountRepository) {
	}

	async execute (id: string) {
		const accountRepository = new AccountRepository();
		const account = await accountRepository.getById(id);

		return account;
	}
}