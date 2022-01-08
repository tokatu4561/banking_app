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
function mainBankPage(BankAccount): Node {
  // ユーザー情報部分のhtml作成
  let userInfoContainer = document.createElement("div") as HTMLDivElement;
  userInfoContainer.classList.add("pb-2", "pb-md-4", "text-right");

  let name = document.createElement("p");
  let accountId = name.cloneNode(true) as HTMLDivElement;
  let initialDeposit = name.cloneNode(true) as HTMLDivElement;

  name.innerHTML = BankAccount.getFullName();
  accountId.innerHTML = BankAccount.accountNumber;
  initialDeposit.innerHTML = BankAccount.initialDeposit;

  userInfoContainer.append(name, accountId, initialDeposit);

  //　金額部分のHTML作成
  let balanceConainer = document.createElement("div") as HTMLDivElement;
  balanceConainer.classList.add("d-flex", "bg-danger", "py-1", "py-md-2");

  balanceConainer.innerHTML = `
  <p class="col-8 text-left rem1p5">利用可能残高</p>
  <p class="col-4 text-right rem1p5">$${BankAccount.money}</p>
  `;

  // メニュー部分のHTML作成
  let menuConainer = document.createElement("div") as HTMLDivElement;
  menuConainer.classList.add(
    "d-flex",
    "justify-content-center",
    "flex-wrap",
    "text-center",
    "py-3",
    "mx-0"
  );

  menuConainer.innerHTML = `
        <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div class="bg-blue hover p-3">
                <h5>引き出す</h5>
                <i class="fas fa-wallet fa-3x"></i>
            </div>
        </div>
        <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div class="bg-blue hover p-3">
                <h5>預ける</h5>
                <i class="fas fa-coins fa-3x"></i>
            </div>
        </div>
        <div class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div class="bg-blue hover p-3">
                <h5>COME BACK LATER</h5>
                <i class="fas fa-home fa-3x"></i>
            </div>
        </div>
    `;

  let container = document.createElement("div");
  container.append(userInfoContainer, balanceConainer, menuConainer);

  return container;
}
