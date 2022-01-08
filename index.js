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
    var userInfoContent = document.createElement("div");
    userInfoContent.classList.add("pb-2", "pb-md-4", "text-right");
    var name = document.createElement("p");
    var accountId = name.cloneNode(true);
    var initialDeposit = name.cloneNode(true);
    name.innerHTML = BankAccount.getFullName();
    accountId.innerHTML = BankAccount.accountNumber;
    initialDeposit.innerHTML = BankAccount.initialDeposit;
    userInfoContent.append(name, accountId, initialDeposit);
    return userInfoContent;
}
