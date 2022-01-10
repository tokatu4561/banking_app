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
        this.maxWithdrawPercent = 0.2;
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
    // 引き出せる限度額を計算する(残高の20%)
    BankAccount.prototype.calculateWithdrawMoney = function (withdrawMoney) {
        var maxWithdrawDeposit = Math.floor(this.money * this.maxWithdrawPercent);
        return withdrawMoney > maxWithdrawDeposit
            ? maxWithdrawDeposit
            : withdrawMoney;
    };
    // 料金を引き出して、残高を更新する
    BankAccount.prototype.updateDeposit = function (withdrawMoney) {
        this.money -= this.calculateWithdrawMoney(withdrawMoney);
        return this.calculateWithdrawMoney(withdrawMoney);
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
//メインのホームのページの内容(残高やアカウント情報など)
function mainBankPage(BankAccount) {
    // ユーザー情報部分のhtml作成
    var userInfoContainer = document.createElement("div");
    userInfoContainer.classList.add("pb-2", "pb-md-4", "text-right");
    var name = document.createElement("p");
    var accountId = name.cloneNode(true);
    var initialDeposit = name.cloneNode(true);
    name.innerHTML = BankAccount.getFullName();
    accountId.innerHTML = BankAccount.accountNumber.toString();
    initialDeposit.innerHTML = BankAccount.initialDeposit.toString();
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
        withdrawController(BankAccount);
    });
    menuConainer
        .querySelector("#depositBtn")
        .addEventListener("click", function () {
        depositController(BankAccount);
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
    container.innerHTML = "\n      <h2 class=\"pb-3\">".concat(title, "</h2>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw100\" class=\"col-2 col-form-label col-form-label-sm\">$100</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right bill-input\" data-bill=\"100\" id=\"moneyWithdraw100\" placeholder=\"5\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw50\" class=\"col-2 col-form-label col-form-label-sm\">$50</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right bill-input\" data-bill=\"50\" id=\"moneyWithdraw50\" placeholder=\"1\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw20\" class=\"col-2 col-form-label col-form-label-sm\">$20</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right bill-input\" data-bill=\"20\" id=\"moneyWithdraw20\" placeholder=\"2\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw10\" class=\"col-2 col-form-label col-form-label-sm\">$10</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right bill-input\" data-bill=\"10\" id=\"moneyWithdraw10\" placeholder=\"3\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw5\" class=\"col-2 col-form-label col-form-label-sm\">$5</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right bill-input\" data-bill=\"5\" id=\"moneyWithdraw5\" placeholder=\"1\">\n          </div>\n      </div>\n      <div class=\"form-group row\">\n          <label for=\"moneyWithdraw1\" class=\"col-2 col-form-label col-form-label-sm\">$1</label>\n          <div class=\"col-10\">\n              <input type=\"number\" class=\"form-control form-control-sm text-right bill-input\" data-bill=\"1\" id=\"moneyWithdraw1\" placeholder=\"4\">\n          </div>\n      </div>\n      <div class=\"text-center money-box p-3\">\n          <p id=\"totalBill\">$0.00</p>\n      </div>\n  ");
    return container;
}
function backNextBtn(backString, nextString) {
    var container = document.createElement("div");
    container.innerHTML = "\n  <div class=\"d-flex justify-content-between\">\n      <div class=\"col-6 pl-0\">\n          <button class=\"btn btn-outline-primary back-btn col-12\">".concat(backString, "</button>\n      </div>\n      <div class=\"col-6 pr-0\">\n          <button class=\"btn btn-primary next-btn col-12\">").concat(nextString, "</button>\n      </div>\n  </div>\n  ");
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
function withdrawController(BankAccount) {
    sideBankSwitch();
    config.sidePage.append(withdrawPage(BankAccount));
}
// 預金引き出しのページ
function withdrawPage(BankAccount) {
    var container = document.createElement("div");
    container.classList.add("p-5");
    var withdrawContainer = document.createElement("div");
    container.append(withdrawContainer);
    withdrawContainer.append(billInputSelector("引き出す金額を入力してください"));
    withdrawContainer.append(backNextBtn("戻る", "次へ"));
    //　戻るボタンで前のページを表示するイベントリスナー
    var backBtn = withdrawContainer.querySelector(".back-btn");
    backBtn.addEventListener("click", function () {
        sideBankSwitch();
        config.bankPage.append(mainBankPage(BankAccount));
    });
    var billInputs = withdrawContainer.querySelectorAll(".bill-input");
    for (var i = 0; i < billInputs.length; i++) {
        billInputs[i].addEventListener("change", function () {
            console.log("a");
            document.getElementById("totalBill").innerHTML = billSummation(billInputs, "data-bill").toString();
        });
    }
    //   預金引き出し画面で次へボタンをクリックした後に確認画面へ
    var nextBtn = withdrawContainer.querySelector(".next-btn");
    nextBtn.addEventListener("click", function () {
        BankAccount.calculateWithdrawMoney(billSummation(billInputs, "data-bill"));
        container.innerHTML = "";
        var confirmDialog = document.createElement("div");
        confirmDialog.append(billDialog("あなたが引き出そうとしている金額", billInputs, "data-bill"));
        container.append(confirmDialog);
        var total = billSummation(billInputs, "data-bill");
        confirmDialog.innerHTML += "\n            <div class=\"d-flex bg-danger py-1 py-md-2 mb-3 text-white\">\n                <p class=\"col-8 text-left rem1p5\">\u5F15\u304D\u51FA\u3059\u91D1\u984D: </p>\n                <p class=\"col-4 text-right rem1p5\">$".concat(BankAccount.calculateWithdrawMoney(total), "</p>\n            </div>\n        ");
        // Go Back、Confirmボタンを追加。
        var withdrawConfirmBtns = backNextBtn("戻る", "確定する");
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
function billSummation(inputElementNodeList, multiplierAttribute) {
    var summation = 0;
    for (var i = 0; i < inputElementNodeList.length; i++) {
        var currentEl = inputElementNodeList[i];
        var value = parseInt(currentEl.value);
        if (currentEl.hasAttribute(multiplierAttribute))
            value *= parseInt(currentEl.getAttribute(multiplierAttribute));
        // 入力が正の整数かどうか
        if (value > 0)
            summation += value;
    }
    return summation;
}
//預金引き出し確認画面
function billDialog(title, inputElementNodeList, multiplierAttribute) {
    var container = document.createElement("div");
    var billElements = "";
    for (var i = 0; i < inputElementNodeList.length; i++) {
        var value = parseInt(inputElementNodeList[i].value);
        if (value > 0) {
            var bill = "$" + inputElementNodeList[i].getAttribute(multiplierAttribute);
            billElements += "<p class=\"rem1p3 calculation-box mb-1 pr-2\">".concat(value, " \u00D7 ").concat(bill, "</p>");
        }
    }
    var totalString = "<p class=\"rem1p3 pr-2\">\u5408\u8A08: $".concat(billSummation(inputElementNodeList, multiplierAttribute), "</p>");
    container.innerHTML = "\n      <h2 class=\"pb-1\">".concat(title, "</h2>\n      <div class=\"d-flex justify-content-center\">\n          <div class=\"text-right col-8 px-1 calculation-box\">\n              ").concat(billElements, "\n              ").concat(totalString, "\n          </div>\n      </div>\n  ");
    return container;
}
// 預金するページを表示させる
function depositController(BankAccount) {
    sideBankSwitch();
    config.sidePage.append(withdrawPage(BankAccount));
}
// 預金するページ
function depositPage(BankAccount) {
    var container = document.createElement("div");
    container.classList.add("p-5");
    var depositContainer = document.createElement("div");
    container.append(depositContainer);
    depositContainer.append(billInputSelector("いくら預けますか？"));
    depositContainer.append(backNextBtn("戻る", "次へ"));
    var backBtn = depositContainer.querySelector(".back-btn");
    backBtn.addEventListener("click", function () {
        sideBankSwitch();
        config.bankPage.append(mainBankPage(BankAccount));
    });
    var billInputs = depositContainer.querySelectorAll(".bill-input");
    for (var i = 0; i < billInputs.length; i++) {
        billInputs[i].addEventListener("change", function () {
            document.getElementById("totalBill").innerHTML = billSummation(billInputs, "data-bill").toString();
        });
    }
    return container;
}
