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

  maxWithdrawPercent: number = 0.2;
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

  // 引き出せる限度額を計算する(残高の20%)
  calculateWithdrawMoney(withdrawMoney: number): number {
    let maxWithdrawDeposit = Math.floor(this.money * this.maxWithdrawPercent);
    return withdrawMoney > maxWithdrawDeposit
      ? maxWithdrawDeposit
      : withdrawMoney;
  }

  // 料金を引き出して、残高を更新する
  updateDeposit(withdrawMoney: number): number {
    this.money -= this.calculateWithdrawMoney(withdrawMoney);
    return this.calculateWithdrawMoney(withdrawMoney);
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

//メインのホームのページの内容(残高やアカウント情報など)
function mainBankPage(BankAccount: BankAccount): Node {
  // ユーザー情報部分のhtml作成
  let userInfoContainer = document.createElement("div") as HTMLDivElement;
  userInfoContainer.classList.add("pb-2", "pb-md-4", "text-right");

  let name = document.createElement("p");
  let accountId = name.cloneNode(true) as HTMLDivElement;
  let initialDeposit = name.cloneNode(true) as HTMLDivElement;

  name.innerHTML = BankAccount.getFullName();
  accountId.innerHTML = BankAccount.accountNumber.toString();
  initialDeposit.innerHTML = BankAccount.initialDeposit.toString();

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
      withdrawController(BankAccount);
    });
  menuConainer
    .querySelector("#depositBtn")
    .addEventListener("click", function () {
      sideBankSwitch();
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

function billInputSelector(title: string): HTMLDivElement {
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

function backNextBtn(backString: string, nextString: string): HTMLDivElement {
  let container = document.createElement("div");
  container.innerHTML = `
  <div class="d-flex justify-content-between">
      <div class="col-6 pl-0">
          <button class="btn btn-outline-primary back-btn col-12">${backString}</button>
      </div>
      <div class="col-6 pr-0">
          <button class="btn btn-primary next-btn col-12">${nextString}</button>
      </div>
  </div>
  `;
  return container;
}

// 表示を切り替える際に毎回実行
function sideBankSwitch() {
  displayToggle(config.bankPage);
  displayToggle(config.sidePage);

  config.bankPage.innerHTML = "";
  config.sidePage.innerHTML = "";
}

// 預金引き出しのページを表示させる
function withdrawController(BankAccount: BankAccount): void {
  sideBankSwitch();
  config.sidePage.append(withdrawPage(BankAccount));
}

// 預金引き出しのページ
function withdrawPage(BankAccount: BankAccount): HTMLDivElement {
  let container = document.createElement("div");
  container.classList.add("p-5");

  let withdrawContainer = document.createElement("div");
  container.append(withdrawContainer);

  withdrawContainer.append(billInputSelector("引き出す金額を入力してください"));
  withdrawContainer.append(backNextBtn("戻る", "次へ"));

  //　戻るボタンで前のページを表示するイベントリスナー
  let backBtn = withdrawContainer.querySelector(".back-btn");
  backBtn.addEventListener("click", function () {
    sideBankSwitch();

    config.bankPage.append(mainBankPage(BankAccount));
  });

  let billInputs = withdrawContainer.querySelectorAll(
    ".withdraw-bill"
  ) as NodeListOf<HTMLInputElement>;

  for (let i = 0; i < billInputs.length; i++) {
    billInputs[i].addEventListener("change", function () {
      console.log("a");
      document.getElementById("withdrawTotal").innerHTML = billSummation(
        billInputs,
        "data-bill"
      ).toString();
    });
  }

  //   預金引き出し画面で次へボタンをクリックした後に確認画面へ
  let nextBtn = withdrawContainer.querySelector(".next-btn");
  nextBtn.addEventListener("click", function () {
    BankAccount.calculateWithdrawMoney(billSummation(billInputs, "data-bill"));
    container.innerHTML = "";

    let confirmDialog = document.createElement("div");
    confirmDialog.append(
      billDialog("あなたが引き出そうとしている金額", billInputs, "data-bill")
    );
    container.append(confirmDialog);

    let total = billSummation(billInputs, "data-bill");

    confirmDialog.innerHTML += `
            <div class="d-flex bg-danger py-1 py-md-2 mb-3 text-white">
                <p class="col-8 text-left rem1p5">引き出す金額: </p>
                <p class="col-4 text-right rem1p5">$${BankAccount.calculateWithdrawMoney(
                  total
                )}</p>
            </div>
        `;

    // Go Back、Confirmボタンを追加。
    let withdrawConfirmBtns = backNextBtn("戻る", "確定する");
    confirmDialog.append(withdrawConfirmBtns);

    //　確認画面で戻るボタンクリック後に前のページへ戻る
    confirmDialog
      .querySelector(".back-btn")
      .addEventListener("click", function () {
        container.innerHTML = "";
        container.append(withdrawContainer);
      });
    // 確認画面で確認ボタン押後にホームボタンへ
    confirmDialog
      .querySelector(".next-btn")
      .addEventListener("click", function () {
        BankAccount.updateDeposit(total);
        sideBankSwitch();

        config.bankPage.append(mainBankPage(BankAccount));
      });
  });

  return container;
}

// 明細の合計を算出する(預金引き出しのページ)
function billSummation(
  inputElementNodeList: NodeListOf<HTMLInputElement>,
  multiplierAttribute: string
): number {
  let summation = 0;

  for (let i = 0; i < inputElementNodeList.length; i++) {
    let currentEl = inputElementNodeList[i];
    let value = parseInt(currentEl.value);

    if (currentEl.hasAttribute(multiplierAttribute))
      value *= parseInt(currentEl.getAttribute(multiplierAttribute));
    // 入力が正の整数かどうか
    if (value > 0) summation += value;
  }

  return summation;
}

//預金引き出し確認画面
function billDialog(title, inputElementNodeList, multiplierAttribute) {
  let container = document.createElement("div");

  let billElements = "";
  for (let i = 0; i < inputElementNodeList.length; i++) {
    let value = parseInt(inputElementNodeList[i].value);

    if (value > 0) {
      let bill =
        "$" + inputElementNodeList[i].getAttribute(multiplierAttribute);
      billElements += `<p class="rem1p3 calculation-box mb-1 pr-2">${value} × ${bill}</p>`;
    }
  }

  let totalString = `<p class="rem1p3 pr-2">合計: $${billSummation(
    inputElementNodeList,
    multiplierAttribute
  )}</p>`;

  container.innerHTML = `
      <h2 class="pb-1">${title}</h2>
      <div class="d-flex justify-content-center">
          <div class="text-right col-8 px-1 calculation-box">
              ${billElements}
              ${totalString}
          </div>
      </div>
  `;
  return container;
}

// 預金するページ
function depositPage(BankAccount: BankAccount): HTMLDivElement {
  let container = document.createElement("div");
  container.classList.add("p-5");

  let depositContainer = document.createElement("div");
  container.append(depositContainer);

  depositContainer.append(billInputSelector("いくら預けますか？"));
  depositContainer.append(backNextBtn("戻る", "次へ"));

  let backBtn = depositContainer.querySelector(".back-btn");
  backBtn.addEventListener("click", function () {
    sideBankSwitch();
    config.bankPage.append(mainBankPage(BankAccount));
  });

  return container;
}
