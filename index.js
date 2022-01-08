var config = {
    initialForm: document.getElementById("initial-form"),
    bankPage: document.getElementById("bankPage")
};
var BankAccount = /** @class */ (function () {
    function BankAccount(firstName, lastName, email, accountNumber, type, money) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.accountNumber = accountNumber;
        this.type = type;
        this.money = money;
        this.initialDeposit = money;
    }
    BankAccount.prototype.getFullName = function () {
        return this.firstName + " " + this.lastName;
    };
    return BankAccount;
}());
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// ユーザーのアカウントを初期化
function initializeUserAccount() {
    var form = document.getElementById("bank-form");
    var userBankAccount = new BankAccount(form.querySelector("input[name=\"userFirstName\"]").value, form.querySelector("input[name=\"userLastName\"]").value, form.querySelector("input[name=\"userEmail\"]").value, getRandomInteger(1, Math.pow(10, 8)), form.querySelector("input[name=\"userAccountType\"]:checked").value, parseInt(form.querySelector("input[name=\"userFirstDeposit\"]")
        .value));
    console.log(userBankAccount);
    // アカウント入力のページを非表示
    config.initialForm.classList.add("d-none");
    // ユーザーアカウント情報(ホームのページ)を表示
    config.bankPage.append(mainBankPage(userBankAccount));
}
//ユーザーアカウント作成後のメインのホームのページを出力する
function mainBankPage(BankAccount) {
    // ユーザー情報部分のhtml作成
    var userInfoContainer = document.createElement("div");
    userInfoContainer.classList.add("pb-2", "pb-md-4", "text-right");
    var name = document.createElement("p");
    var accountId = name.cloneNode(true);
    var initialDeposit = name.cloneNode(true);
    name.innerHTML = BankAccount.getFullName();
    accountId.innerHTML = BankAccount.accountNumber;
    initialDeposit.innerHTML = BankAccount.initialDeposit;
    userInfoContainer.append(name, accountId, initialDeposit);
    //　金額部分のHTML作成
    var balanceConainer = document.createElement("div");
    balanceConainer.classList.add("d-flex", "bg-danger", "py-1", "py-md-2");
    balanceConainer.innerHTML = "\n  <p class=\"col-8 text-left rem1p5\">Available Balance</p>\n  <p class=\"col-4 text-right rem1p5\">$".concat(BankAccount.money, "</p>\n  ");
    // メニュー部分のHTML作成
    var menuConainer = document.createElement("div");
    menuConainer.classList.add("d-flex", "justify-content-center", "flex-wrap", "text-center", "py-3", "mx-0");
    menuConainer.innerHTML = "\n        <div class=\"col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1\">\n            <div class=\"bg-blue hover p-3\">\n                <h5>WITHDRAWAL</h5>\n                <i class=\"fas fa-wallet fa-3x\"></i>\n            </div>\n        </div>\n        <div class=\"col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1\">\n            <div class=\"bg-blue hover p-3\">\n                <h5>DEPOSIT</h5>\n                <i class=\"fas fa-coins fa-3x\"></i>\n            </div>\n        </div>\n        <div class=\"col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1\">\n            <div class=\"bg-blue hover p-3\">\n                <h5>COME BACK LATER</h5>\n                <i class=\"fas fa-home fa-3x\"></i>\n            </div>\n        </div>\n    ";
    var container = document.createElement("div");
    container.append(userInfoContainer, balanceConainer, menuConainer);
    return container;
}
