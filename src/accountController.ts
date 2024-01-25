import express, { Request, Response } from "express";
import AccountRepository from "./AccountRepository";
import AccountService from "./AccountService";
import Signup from "./Signup";

const app = express();
app.use(express.json());

app.post("/signup", async function (req: Request, res: Response) {
	try {
		const input = req.body;
		const accountRepository = new AccountRepository();
		const signup = new Signup(accountRepository);
		const output = await signup.execute(input);
		res.json(output);
	} catch (e: any) {
		res.status(422).json({
			message: e.message
		});
	}
});

app.get("/accounts/:accountId", async function (req: Request, res: Response) {
	const accountId = req.params.accountId;
	const accountRepository = new AccountRepository();
	const getAccount = new AccountService(accountRepository);
	const output = await getAccount.execute(accountId);
	res.json(output);
});

app.listen(3000);