// 画面に表示するコンテンツの制御
function displayToggle(el: HTMLElement) {
  el.classList.toggle("d-none");
}

const config = {
  initialForm: document.getElementById("initial-form") as HTMLFormElement,
  bankPage: document.getElementById("bankPage"),
  sidePage: document.getElementById("sidePage"),
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

function getRandomInteger(min: number, max: number) {
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
        <div id="withdrawBtn" class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div class="bg-blue hover p-3">
                <h5>引き出す</h5>
                <i class="fas fa-wallet fa-3x"></i>
            </div>
        </div>
        <div id="depositBtn" class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div class="bg-blue hover p-3">
                <h5>預ける</h5>
                <i class="fas fa-coins fa-3x"></i>
            </div>
        </div>
        <div id="comeBackLater" class="col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1">
            <div id="" class="bg-blue hover p-3">
                <h5>COME BACK LATER</h5>
                <i class="fas fa-home fa-3x"></i>
            </div>
        </div>
    `;

  // 引き出す、預ける、come back laterに対してクリックイベント
  menuConainer
    .querySelector("#withdrawBtn")
    .addEventListener("click", function () {
      withdrawController();
    });
  menuConainer
    .querySelector("#depositBtn")
    .addEventListener("click", function () {
      alert("deposit");
    });
  menuConainer
    .querySelector("#comeBackLater")
    .addEventListener("click", function () {
      alert("comeback");
    });

  let container = document.createElement("div");
  container.append(userInfoContainer, balanceConainer, menuConainer);

  return container;
}

function billInputSelector(title) {
  let container = document.createElement("div");
  container.innerHTML = `
      <h2 class="pb-3">${title}</h2>
      <div class="form-group row">
          <label for="moneyWithdraw100" class="col-2 col-form-label col-form-label-sm">$100</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="100" id="moneyWithdraw100" placeholder="5">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw50" class="col-2 col-form-label col-form-label-sm">$50</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="50" id="moneyWithdraw50" placeholder="1">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw20" class="col-2 col-form-label col-form-label-sm">$20</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="20" id="moneyWithdraw20" placeholder="2">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw10" class="col-2 col-form-label col-form-label-sm">$10</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="10" id="moneyWithdraw10" placeholder="3">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw5" class="col-2 col-form-label col-form-label-sm">$5</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="5" id="moneyWithdraw5" placeholder="1">
          </div>
      </div>
      <div class="form-group row">
          <label for="moneyWithdraw1" class="col-2 col-form-label col-form-label-sm">$1</label>
          <div class="col-10">
              <input type="number" class="form-control form-control-sm text-right withdraw-bill" data-bill="1" id="moneyWithdraw1" placeholder="4">
          </div>
      </div>
      <div class="text-center money-box p-3">
          <p id="withdrawTotal">$0.00</p>
      </div>
  `;
  return container;
}

function backNextBtn(backString, nextString) {
  let container = document.createElement("div");
  container.innerHTML = `
  <div class="d-flex justify-content-between">
      <div class="col-6 pl-0">
          <button class="btn btn-outline-primary col-12">${backString}</button>
      </div>
      <div class="col-6 pr-0">
          <button class="btn btn-primary col-12">${nextString}</button>
      </div>
  </div>
  `;
  return container;
}

// 預金引き出しのページを表示させる
function withdrawController() {
  displayToggle(config.bankPage);
  displayToggle(config.sidePage);

  config.bankPage.innerHTML = "";
  config.sidePage.innerHTML = "";
  config.sidePage.append(withdrawPage());
}

// 預金引き出しのページ
function withdrawPage() {
  let container = document.createElement("div");
  container.classList.add("p-5");

  let withdrawContainer = document.createElement("div");
  container.append(withdrawContainer);

  withdrawContainer.append(billInputSelector("引き出す金額を入力してください"));
  withdrawContainer.append(backNextBtn("戻る", "次へ"));

  let billInputs = withdrawContainer.querySelectorAll(
    ".bill-input"
  ) as NodeListOf<HTMLInputElement>;

  for (let i = 0; i < billInputs.length; i++) {
    billInputs[i].addEventListener("change", function () {
      document.getElementById("withdrawTotal").innerHTML = this.value;
    });
  }

  return container;
}
