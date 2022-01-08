// 画面に表示するコンテンツの制御
function displayToggle(el) {
    el.classList.toggle("d-none");
}
var config = {
    initialForm: document.getElementById("initial-form"),
    bankPage: document.getElementById("bankPage"),
    sidePage: document.getElementById("sidePage")
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
    balanceConainer.innerHTML = "\n  <p class=\"col-8 text-left rem1p5\">\u5229\u7528\u53EF\u80FD\u6B8B\u9AD8</p>\n  <p class=\"col-4 text-right rem1p5\">$".concat(BankAccount.money, "</p>\n  ");
    // メニュー部分のHTML作成
    var menuConainer = document.createElement("div");
    menuConainer.classList.add("d-flex", "justify-content-center", "flex-wrap", "text-center", "py-3", "mx-0");
    menuConainer.innerHTML = "\n        <div id=\"withdrawBtn\" class=\"col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1\">\n            <div class=\"bg-blue hover p-3\">\n                <h5>\u5F15\u304D\u51FA\u3059</h5>\n                <i class=\"fas fa-wallet fa-3x\"></i>\n            </div>\n        </div>\n        <div id=\"depositBtn\" class=\"col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1\">\n            <div class=\"bg-blue hover p-3\">\n                <h5>\u9810\u3051\u308B</h5>\n                <i class=\"fas fa-coins fa-3x\"></i>\n            </div>\n        </div>\n        <div id=\"comeBackLater\" class=\"col-lg-4 col-12 py-1 py-md-3 px-0 px-md-1\">\n            <div id=\"\" class=\"bg-blue hover p-3\">\n                <h5>COME BACK LATER</h5>\n                <i class=\"fas fa-home fa-3x\"></i>\n            </div>\n        </div>\n    ";
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
    var container = document.createElement("div");
    container.append(userInfoContainer, balanceConainer, menuConainer);
    return container;
}
function billInputSelector(title) {
    var container = document.createElement("div");
    container.innerHTML = "\n      <h2 class=\"pb-3\">".concat(title, "</h2>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw100\" class=\"col-2 col-form-label col-form-label-sm\">$100</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right withdraw-bill\" data-bill=\"100\" id=\"moneyWithdraw100\" placeholder=\"5\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw50\" class=\"col-2 col-form-label col-form-label-sm\">$50</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right withdraw-bill\" data-bill=\"50\" id=\"moneyWithdraw50\" placeholder=\"1\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw20\" class=\"col-2 col-form-label col-form-label-sm\">$20</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right withdraw-bill\" data-bill=\"20\" id=\"moneyWithdraw20\" placeholder=\"2\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw10\" class=\"col-2 col-form-label col-form-label-sm\">$10</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right withdraw-bill\" data-bill=\"10\" id=\"moneyWithdraw10\" placeholder=\"3\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw5\" class=\"col-2 col-form-label col-form-label-sm\">$5</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right withdraw-bill\" data-bill=\"5\" id=\"moneyWithdraw5\" placeholder=\"1\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw1\" class=\"col-2 col-form-label col-form-label-sm\">$1</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right withdraw-bill\" data-bill=\"1\" id=\"moneyWithdraw1\" placeholder=\"4\">\n          </div>\n      </div>\n      <div class=\"text-center money-box p-3\">\n          <p id=\"withdrawTotal\">$0.00</p>\n      </div>\n  ");
    return container;
}
function backNextBtn(backString, nextString) {
    var container = document.createElement("div");
    container.innerHTML = "\n  <div class=\"d-flex justify-content-between\">\n      <div class=\"col-6 pl-0\">\n          <button class=\"btn btn-outline-primary col-12\">".concat(backString, "</button>\n      </div>\n      <div class=\"col-6 pr-0\">\n          <button class=\"btn btn-primary col-12\">").concat(nextString, "</button>\n      </div>\n  </div>\n  ");
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
    var container = document.createElement("div");
    container.classList.add("p-5");
    var withdrawContainer = document.createElement("div");
    container.append(withdrawContainer);
    withdrawContainer.append(billInputSelector("引き出す金額を入力してください"));
    withdrawContainer.append(backNextBtn("戻る", "次へ"));
    return container;
}
