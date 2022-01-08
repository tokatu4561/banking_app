const config = {
  initialForm: document.getElementById("initial-form"),
  bankPage: document.getElementById("bankPage"),
};

class BankAccount {
  constructor(firstName, lastName, email, type, money) {
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
    form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
    form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
    form.querySelectorAll(`input[name="userEmail"]`)[0].value,
    getRandomInteger(1, Math.pow(10, 8)),
    form
      .querySelectorAll(`input[name="userAccountType"]:checked`)
      .item(0).value,
    parseInt(
      form.querySelectorAll(`input[name="userFirstDeposit"]`).item(0).value
    )
  );

  console.log(userBankAccount);

  // アカウント入力のページを非表示
  config.initialForm.classList.add("d-none");

  // ホームのページを表示
  config.bankPage.append(mainBankPage(userBankAccount));
}

//ユーザーアカウント作成後のメインのホームのページを出力する
function mainBankPage(BankAccount) {
  let userInfoContent = document.createElement("div");
  userInfoContent.classList.add("pb-2", "pb-md-4", "text-right");

  let name = document.createElement("p");
  let accountId = name.cloneNode(true);
  let initialDeposit = name.cloneNode(true);

  name.innerHTML = BankAccount.getFullName();
  accountId.innerHTML = BankAccount.accountNumber;
  initialDeposit.innerHTML = BankAccount.initialDeposit;

  userInfoContent.append(name, accountId, initialDeposit);
  return userInfoContent;
}
