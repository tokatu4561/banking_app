const config = {
  initialForm: document.getElementById("initial-form"),
  bankPage: document.getElementById("bankPage"),
};

class BankAccount {
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: number;
  type: string;
  money: number;
  initialDeposit: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    accountNumber: number,
    type: string,
    money: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.accountNumber = accountNumber;
    this.type = type;
    this.money = money;
    this.initialDeposit = money;
  }

  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// ユーザーのアカウントを初期化
function initializeUserAccount() {
  const form = document.getElementById("bank-form");
  let userBankAccount = new BankAccount(
    (
      form.querySelector(`input[name="userFirstName"]`) as HTMLInputElement
    ).value,
    (
      form.querySelector(`input[name="userLastName"]`) as HTMLInputElement
    ).value,
    (form.querySelector(`input[name="userEmail"]`) as HTMLInputElement).value,
    getRandomInteger(1, Math.pow(10, 8)),
    (
      form.querySelector(
        `input[name="userAccountType"]:checked`
      ) as HTMLInputElement
    ).value,
    parseInt(
      (form.querySelector(`input[name="userFirstDeposit"]`) as HTMLInputElement)
        .value
    )
  );

  console.log(userBankAccount);

  // アカウント入力のページを非表示
  config.initialForm.classList.add("d-none");

  // ユーザーアカウント情報(ホームのページ)を表示
  config.bankPage.append(mainBankPage(userBankAccount));
}

//ユーザーアカウント作成後のメインのホームのページを出力する
function mainBankPage(BankAccount) {
  let userInfoContent = document.createElement("div") as HTMLDivElement;
  userInfoContent.classList.add("pb-2", "pb-md-4", "text-right");

  let name = document.createElement("p");
  let accountId = name.cloneNode(true) as HTMLDivElement;
  let initialDeposit = name.cloneNode(true) as HTMLDivElement;

  name.innerHTML = BankAccount.getFullName();
  accountId.innerHTML = BankAccount.accountNumber;
  initialDeposit.innerHTML = BankAccount.initialDeposit;

  userInfoContent.append(name, accountId, initialDeposit);
  return userInfoContent;
}
