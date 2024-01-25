import AccountRepository from "../src/AccountRepository"
import Signup from "../src/Signup";
import sinon from "sinon";

let signup: Signup;

beforeEach(() => {
	const accountRepository = new AccountRepository();
	signup = new Signup(accountRepository);
})


test("Test valid passagner signup", async function () {
	const stubAccountRepositorySave = sinon.stub(AccountRepository.prototype, "save").resolves();
	const stubAccountRepositoryGetByEmail = sinon.stub(AccountRepository.prototype, "getByEmail").resolves(null);
	const inputSignup = {
		name: "Michael Scott",
		email: `michael.scott${Math.random()}@gmail.com`,
		cpf: "70608788074",
		isPassenger: true,
		password: "123456"
	};

	const outputSignup = await signup.execute(inputSignup);

	expect(outputSignup).toHaveProperty('accountId');
	stubAccountRepositorySave.restore();
	stubAccountRepositoryGetByEmail.restore();
});

test("Test valid driver signup", async function () {
	const stubAccountRepositorySave = sinon.stub(AccountRepository.prototype, "save").resolves();
	const stubAccountRepositoryGetByEmail = sinon.stub(AccountRepository.prototype, "getByEmail").resolves(null);
	const inputSignup = {
		name: "Michael Scott",
		email: `michael.scott${Math.random()}@gmail.com`,
		cpf: "70608788074",
		isDriver: true,
		carPlate: "ABC1234",
		password: "123456"
	};

	const outputSignup = await signup.execute(inputSignup);

	expect(outputSignup).toHaveProperty('accountId');
	stubAccountRepositorySave.restore();
	stubAccountRepositoryGetByEmail.restore();
});

test("Test signup with wrong cpf", async function () {
	const stubAccountRepositoryGetByEmail = sinon.stub(AccountRepository.prototype, "getByEmail").resolves(null);
	const inputSignup = {
		name: "Michael Scott",
		email: `michael.scott${Math.random()}@gmail.com`,
		cpf: "706087880",
		isPassenger: true,
		password: "123456"
	};

	await expect(() => signup.execute(inputSignup)).rejects.toThrow(new Error("Cpf is invalid"));

	stubAccountRepositoryGetByEmail.restore();
});

test("Test signup with wrong email", async function () {
	const stubAccountRepositoryGetByEmail = sinon.stub(AccountRepository.prototype, "getByEmail").resolves(null);
	const inputSignup = {
		name: "Michael Scott",
		email: `michael.scott${Math.random()}gmail.com`,
		cpf: "70608788074",
		isPassenger: true,
		password: "123456"
	};

	await expect(() => signup.execute(inputSignup)).rejects.toThrow(new Error("Email is invalid"));

	stubAccountRepositoryGetByEmail.restore();
});

test("Test signup with wrong name", async function () {
	const stubAccountRepositoryGetByEmail = sinon.stub(AccountRepository.prototype, "getByEmail").resolves(null);
	const inputSignup = {
		name: "Michael 33 Scott",
		email: `michael.scott${Math.random()}@gmail.com`,
		cpf: "70608788074",
		isPassenger: true,
		password: "123456"
	};

	await expect(() => signup.execute(inputSignup)).rejects.toThrow(new Error("Name is invalid"));

	stubAccountRepositoryGetByEmail.restore();
});

test("Test driver signup with wrong carplate", async function () {
	const stubAccountRepositoryGetByEmail = sinon.stub(AccountRepository.prototype, "getByEmail").resolves(null);
	const inputSignup = {
		name: "Michael Scott",
		email: `michael.scott${Math.random()}@gmail.com`,
		cpf: "70608788074",
		isDriver: true,
		carPlate: "33ABC124",
		password: "123456"
	};

	await expect(() => signup.execute(inputSignup)).rejects.toThrow(new Error("Car plate is invalid"));	stubAccountRepositoryGetByEmail.restore();
});

test("test signup that already exists", async function () {
	const inputSignup = {
		name: "Michael Scott",
		email: `michael.scott${Math.random()}@gmail.com`,
		cpf: "70608788074",
		isPassenger: true,
		password: "123456"
	};
	const stubAccountRepositoryGetByEmail = sinon.stub(AccountRepository.prototype, "getByEmail").resolves(inputSignup);

	await expect(() => signup.execute(inputSignup)).rejects.toThrow(new Error("Account already exists"));

	stubAccountRepositoryGetByEmail.restore();
});