
//TODO ============================ 初めに変数化するもの ==================================== */

// ダメージの範囲を微調整できるように定義する
const damageRange = 0.2,
  criticalHitRate = 0.1;
// logの番号をつけて行くための変数
let logIndex = 0;
// 現在倒した敵の数
nowKilledNumber = 0,
  // 目標とする倒す敵の数
  targetKilledNumber = 2;

//TODO ============================ プレイヤーと敵の情報を定義 ==================================== */

// プレイヤーの名前とHPを定義
const playerData = {
  name: "勇者",
  hp: 100,
  attack: 10,
  defence: 2,
  coin: 0,
  exp: 0,
  level: 1,
  img: 'image/braver.png'
}

// 敵の名前とHPを定義(複数用意)
const enemiesData = [
  {
    name: "スライム",
    hp: 50,
    attack: 4,
    defence: 1,
    coin: 10,
    img: 'image/slime.jpg',
    exp: 10
  },

  {
    name: "フェアリー",
    hp: 60,
    attack: 4,
    defence: 1,
    coin: 20,
    img: 'image/fairy.jpg',
    exp: 20
  },

  {
    name: "ガーゴイル",
    hp: 80,
    attack: 5,
    defence: 2,
    coin: 30,
    img: 'image/gargoyle.png',
    exp: 30
  }
]

// 2回戦以降も敵の最大HPを表示させる処理
enemiesData.forEach((value, index) => {
  enemiesData[index]["maxHp"] = enemiesData[index]["hp"];
});

// 敵の数分、乱数を生成してランダムに敵が表示されるように設定する
// enemyDataが敵１体分のデータとなり、以降で処理されていく
let enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];

/* 各Dataに最大のHPを定義する。この時点ではplayerData["hp"] 、enemyData["hp"] 
が最大のHPになる。その後の処理で["hp"]は書き変わっていく */
playerData["maxHp"] = playerData["hp"];
enemyData["maxHp"] = enemyData["hp"];


// アイテムAの個数を表示する要素を取得
const haveItemANumber = document.getElementById('haveItemANumber');

//TODO ============================ ショップ(アイテム)の情報 ==================================== */

const itemData = [
  {
    name: 'ポーション',
    price: 10,
    number: 1,
    img: 'portion.jpg'
  },

  {
    name: 'ハイポーション',
    price: 20,
    number: 1,
    img: 'hiPortion.jpg'
  }
]

//TODO =================================== 関数の定義 =============================================== */

/*=========== insertText(id, text): id要素にtextを入れる関数 ============*/

// 名前とHPをHTMLに表示するための関数を作る
function insertText(id, text) {
  document.getElementById(id).textContent = text;
}

/*=========== damageCalculation: 実際受けるダメージの計算 ================*/

// ダメージを計算する関数を作る。引数に攻撃力と防御力を定義
function damageCalculation(attack, defence) {
  // 最大の攻撃力を定義　
  const maxDamage = attack * (1 + damageRange);
  // 最小の攻撃力を定義　
  const minDamage = attack * (1 - damageRange);
  // 攻撃力を定義。最大の攻撃力から最小の攻撃力を引いて最小の攻撃力を足す。
  const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);

  // damageという変数を定義する（攻撃力 ー 防御力）
  const damage = attackDamage - defence;

  // damageが１以下の場合は０を返す
  if (damage < 1) {
    return 0
    // それ以外の場合はdamageを返す
  } else {
    return damage;
  }
}

/*================== insertLog: logを表示する関数 =======================*/

// textsを引数にして関数を使用
function insertLog(texts) {
  // logsの要素を取得
  const logsElement = document.getElementById("logs"),
    // liタグを生成
    createLog = document.createElement("li");
  // logインデックスを１ずつ増やす
  logIndex++
  // logインデックスとダメージについての文章を要素に入れ込む
  createLog.innerHTML = logIndex + ": " + texts;
  // 第１引数が入れたい要素、第２引数が入れ込む場所
  logsElement.insertBefore(createLog, logsElement.firstChild)
}

/*================== showModal: モーダルウィンドウを表示する関数 =======================*/

// モーダルウィンドウという関数へ第１引数にtitle=敵の名前、第２引数にhiddenNextButtonがfalseだった場合
function showModal(title, hiddenNextButton = false) {
  // mask要素を取得し、activeクラスを付与する
  document.getElementById("mask").classList.add("active");
  // modal要素を取得し、activeクラスを付与する
  document.getElementById("modal").classList.add("active");
  // modalTitle要素を取得して第１引数のtitleとしてテキスト表示させる
  document.getElementById("modalTitle").textContent = title;
  // もし第２引数にhiddenNextButtonがtrueだった場合
  if (hiddenNextButton) {
    // modalNextBotton要素にクラスhiddenが付与される
    document.getElementById("modalNextButton").classList.add("hidden");
  }
}

//TODO ================================ 画面の表示 ========================================== */
// セッティング ===============================================================================

// セッティングボタンの要素を取得しクリックしたら
document.getElementById('settingButton').addEventListener('click', function () {
  // セッティング画面の要素にactiveのクラス名をtoggleで付与する。
  document.getElementById('settingWindow').classList.toggle('active');
  // プレイヤーの今の名前を表示
  insertText("playerCurrentName", 'あなたの名前は : ' + playerData['name']);

  // 名前入力フォームの要素を取得
  const playerNameInput = document.getElementById('playerNameInput');
  // 入力された値（名前）を変数化
  let playerChangeName = playerNameInput.value;

  // 名前を変えたときの確認ボタンの要素を取得
  const playerNameConfiramationButton = document.getElementById('playerNameConfiramationButton')

  // 文字が入力された場合の処理
  playerNameInput.addEventListener('input', function () {
    // 名前変更の決定ボタンを押した時の処理
    document.getElementById('playerNameDecisionButton').addEventListener('click', function () {
      // 入力された値（名前）を再取得
      let playerChangeName = playerNameInput.value
      // プレイヤーの名前を変更する
      playerData['name'] = playerChangeName;
      // 名前の表示変更
      insertText("playerCurrentName", 'あなたの名前は : ' + playerData['name']);
      // 戦闘画面の名前の表示変更
      insertText("playerName", playerData["name"]);

      playerNameDecisionButton.style.opacity = 1;

      // マスクをかける
      document.getElementById('playerNameWindowMask').classList.add('show');
      // モーダルを表示
      document.getElementById('playerNameModal').classList.add('show');
    });
  })

  // 名前変更の確認ボタンを押した時の処理
  playerNameConfiramationButton.addEventListener('click', function () {
    // マスクを消す
    document.getElementById('playerNameWindowMask').classList.remove('show');
    // モーダルを消す
    document.getElementById('playerNameModal').classList.remove('show');
  });


})
//  ===========================================================================================



// プレイヤーの情報
insertText("playerName", playerData["name"]);
insertText("currentplayerHp", playerData["hp"]);
insertText("maxplayerHp", playerData["hp"]);
insertText("coin", playerData["coin"] + 'コイン');

// 画像を表示する要素を取得
const playerImg = document.getElementById('playerImg');
// srcで画像を表示させる
playerImg.src = playerData["img"];

// 経験値の表示
insertText('exp', '経験値 : ' + playerData['exp']);

// レベルの表示
insertText('level', 'レベル : ' + playerData['level']);

insertText('playerAttack', '攻撃力 : ' + playerData['attack']);
insertText('playerDefence', '防御力 : ' + playerData['defence']);



// コインの表示
let coinElement = document.getElementById('coin');
coinElement.textContent = playerData['coin'] + 'コイン'

// アイテムの表示



// 敵の情報
insertText("enemyName", enemyData["name"]);
insertText("currentEnemyHp", enemyData["hp"]);
insertText("maxEnemyHp", enemyData["hp"]);

// 画像を表示する要素を取得
const enemyImg = document.getElementById('enemyImg');
// srcで画像を表示させる
enemyImg.src = enemyData["img"];
// 現在の討伐数を表示する
insertText("nowKilledNumber", nowKilledNumber);
// 目標の討伐数を表示する
insertText("targetKilledNumber", targetKilledNumber);

// ショップボタン
const shopIn = document.getElementById('shopIn');



//TODO ============================ 攻撃のボタンを押した時の処理 ==================================== */

// ボタンを押した時の挙動を定義
document.getElementById("attack").addEventListener("click", function () {
  // 勝利と敗北、それぞれのフラグを立てておく
  let victory = false,
    defeat = false;
  // プレイヤーの名前playerData["name"]を変数化させ、spanタグで囲い、色を変える。
  const playerName = '<span style="color: blue;">' + playerData["name"] + "</span>",
    // 敵の名前をplayerData["name"]を変数化させ、spanタグで囲い、色を変える。
    enemyName = '<span style="color: red;">' + enemyData["name"] + "</span>"


  /* ==================================== 敵側の表示、処理 ======================================= */
  // プレイヤーの攻撃力
  let playerDamage = damageCalculation(playerData["attack"], enemyData["defence"]);
  // もしcriticalHitRateが生成された乱数より小さい場合
  if (Math.random() < criticalHitRate) {
    // playerDamageの2倍の攻撃力が出る
    playerDamage *= 2
    // クリティカルヒットのlog
    insertLog(playerName + "の攻撃!クリティカルヒット!" + enemyName + "に" + playerDamage + "のダメージ!")
  } else {
    // logの表示
    insertLog(playerName + "の攻撃!" + enemyName + "に" + playerDamage + "のダメージ!")
  }
  // 敵のHPがプレイヤーの攻撃力分ずつ減っていく
  enemyData["hp"] -= playerDamage;
  // 敵のHPを再び表示(現在のHP)
  insertText("currentEnemyHp", enemyData["hp"]);
  // 現在のHPゲージの要素を取得して変数で定義する。
  const currentEnemyHpGaugeValue = document.getElementById("currentEnemyHpGaugeValue")
  // cssでwidthを今のHPを最大のHPで割り、100をかけて％を出す。
  currentEnemyHpGaugeValue.style.width = (enemyData["hp"] / enemyData["maxHp"] * 100) + "%";
  // 現在のゲージのパーセンテージを表示
  let currentEnemyGaugePercentage = (enemyData["hp"] / enemyData["maxHp"] * 100);
  // もしゲージ50%以上の場合は青のゲージ
  if (50 < currentEnemyGaugePercentage) {
    currentEnemyHpGaugeValue.style.backgroundColor = "#6bf";
    // もしゲージ20%以上の場合は黄色のゲージ
  } else if (20 < currentEnemyGaugePercentage) {
    currentEnemyHpGaugeValue.style.backgroundColor = "yellow";
    // それ以外の場合は赤のゲージ
  } else {
    currentEnemyHpGaugeValue.style.backgroundColor = "red";
  }

  //TODO    敵が負けた時の処理 */

  // もし敵のHPが0になったら
  if (enemyData["hp"] <= 0) {
    // victoryがtrueとなる
    victory = true;
    // enemyDataのHPが0になれば0を表示
    // プレイヤーのコインに倒した敵のコイン分増やす
    playerData['coin'] += enemyData['coin']
    // そしてプレイヤーのコインを表示
    insertText("coin", playerData['coin'] + 'コイン');
    // 敵のHPを０にする
    enemyData["hp"] = 0;
    // 敵のゲージを０にする
    document.getElementById("currentEnemyHpGaugeValue").style.width = "0%"
    // 敵のHPを書き変える
    insertText("currentEnemyHp", enemyData["hp"]);
    // モーダルウィンドウに敵の名前と倒したこと表示する
    showModal(enemyData["name"] + "を倒した")
  }

  /* ============================================================================================== */


  /* =================================== プレイヤー側の表示、処理 ================================== */
  //TODO    敵に勝つまでの処理 */

  // もしvictoryがfalseのとき
  if (!victory) {
    // 敵の攻撃力
    let enemyDamage = damageCalculation(enemyData["attack"], playerData["defence"]);
    // もしcriticalHitRateが生成された乱数より小さい場合
    if (Math.random() < criticalHitRate) {
      // enemyDamageの2倍の攻撃力が出る
      enemyDamage *= 2;

      //TODO    logの表示

      // クリティカルヒットのlog
      insertLog(enemyName + "の攻撃!クリティカルヒット!" + playerName + "に" + enemyDamage + "のダメージ!")
    } else {
      // logの表示
      insertLog(enemyName + "の攻撃!" + playerName + "に" + enemyDamage + "のダメージ!")
    }
    // プレイヤーのHPが敵の攻撃力分ずつ減っていく
    playerData["hp"] -= enemyDamage;
    // プレイヤーのHPを再び表示(現在のHP)
    insertText("currentplayerHp", playerData["hp"]);
    // 現在のHPゲージの要素を取得して変数で定義する。
    const currentplayerHpGaugeValue = document.getElementById("currentplayerHpGaugeValue")
    // cssでwidthを今のHPを最大のHPで割り、100をかけて％を出す。
    currentPlayerHpGaugeValue.style.width = (playerData["hp"] / playerData["maxHp"] * 100) + "%";
    // 現在のゲージのパーセンテージを表示
    let currentplayerGugePercentage = (playerData["hp"] / playerData["maxHp"] * 100);
    // もしゲージ50%以上の場合は青のゲージ
    if (50 < currentplayerGugePercentage) {
      currentPlayerHpGaugeValue.style.backgroundColor = "#6bf";
      // もしゲージ20%以上の場合は黄色のゲージ
    } else if (20 < currentplayerGugePercentage) {
      currentPlayerHpGaugeValue.style.backgroundColor = "yellow";
      // それ以外の場合は赤のゲージ
    } else {
      currentPlayerHpGaugeValue.style.backgroundColor = "red";
    }

    //TODO    プレイヤーが負けた時の処理

    // もしプレイヤーのHPが0になったら
    if (playerData["hp"] <= 0) {
      // defeatがtrueとなる
      defeat = true;
      // playerDataのHPが0になれば0を表示
      playerData["hp"] = 0;
      // 味方のゲージを０にする
      document.getElementById("currentPlayerHpGaugeValue").style.width = "0%"
      // 敵のHPを書き変える
      insertText("currentplayerHp", playerData["hp"]);
      // モーダルウィンドウに敵の名前とプレイヤーが負けたこと表示する
      showModal(enemyData["name"] + "に負けた", true);
    }
  }

  //TODO ==================================・・敵に勝っても負けても行う処理・・============================= */

  // もしvictory か　defeatが　trueになったら
  if (victory || defeat) {
    // this = #atttack の要素にdeActiveが付与される
    this.classList.add("deActive")
    shopIn.classList.add('active')
  }

  //TODO ====================================・・敵に勝った時の処理・・===================================== */

  const levelUpExp = 20;

  // もしvictoryがtrueになったら
  if (victory) {
    // プレイヤーのレベルを定義（今後の処理によっては必要となる変数）
    const beforePlayerLevel = playerData['level'];
    // プレイヤーの経験値に敵を倒した時の経験値を足す
    playerData['exp'] += enemyData['exp']
    // 上記で増えた経験値を表示
    insertText('exp', '経験値 : ' + playerData['exp']);
    // プレイヤーの経験値を１レベルに必要な経験値で割り元々のレベル１に足す
    // それを現在のレベルとして定義する（小数点以下切り取り）
    playerData['level'] = Math.floor(playerData['exp'] / levelUpExp) + 1;
    // 上記の現在のレベルを表示
    insertText('level', 'レベル : ' + playerData['level']);
    // もしプレイヤーのレベルが１あがれば
    if (playerData['level']++) {
      // プレイヤーの攻撃力と防御力を２ずつ上げる。
      playerData['attack'] += 2
      insertText('playerAttack', '攻撃力 : ' + playerData['attack']);
      playerData['defence'] += 2
      insertText('playerDefence', '防御力 : ' + playerData['defence']);
    }

    // 現在の討伐数を１ずつ増やす
    nowKilledNumber++;
    // 再び今の討伐数を表示させる
    insertText("nowKilledNumber", nowKilledNumber);
    // もし目標討伐数と現在の討伐数が同じになった時に
    if (nowKilledNumber === targetKilledNumber) {
      // ゲームクリアの表示
      showModal("おめでとう!ゲームクリア!", true)
      // アイテムショップのボタンは表示させない
      shopIn.classList.remove('active')
    }
  }
});

//TODO ==================================・・ショップボタン押した後の処理・・==================================== */

const itemWindow = document.getElementById('itemWindow'),
  shopItemTable = document.getElementById('shopItemTable')
// ショップに入った時の処理
shopIn.addEventListener("click", function () {
  itemWindow.classList.add('show');
  shopItemTable.classList.add('show');
  // 現在のプレイヤーコインを表示させる
  insertText("playerCoinDisplay", '現在のコイン : ' + playerData["coin"] + '枚');

  switchBuyItems();
});

//TODO ==================================・・敵を倒した後の処理・・==================================== */

// 次へ進むボタンを押した時のイベント
document.getElementById("modalNextButton").addEventListener("click", function () {
  // 敵のHPを最大値に書き変える
  enemyData["hp"] = enemyData["maxHp"]
  // 次にどの敵が出るか選ばれる
  enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];
  // 敵の情報
  insertText("enemyName", enemyData["name"]);
  insertText("currentEnemyHp", enemyData["hp"]);
  insertText("maxEnemyHp", enemyData["hp"]);

  //　敵の画像を表示
  enemyImg.src = enemyData["img"];

  // 敵のHPゲージを100%にする
  document.getElementById("currentEnemyHpGaugeValue").style.width = "100%"
  // 敵のHPゲージの色を元の色に戻す
  document.getElementById("currentEnemyHpGaugeValue").style.backgroundColor = "#6bf";

  // mask要素のactiveクラスを消す
  document.getElementById("mask").classList.remove("active")
  // modal要素のactiveクラスを消す
  document.getElementById("modal").classList.remove("active")
  // 再び攻撃ボタンを押せるようにするためdeActiveクラスを消す
  document.getElementById("attack").classList.remove("deActive")
  // ショップボタン非表示へ
  shopIn.classList.remove('active')
});

//TODO ===================================================アイテム===================================== */

// 各アイテムを表示する関数 
function updateDisplayItems() {
  // 各アイテムの項目の要素を取得
  const haveItemList = document.getElementById('haveItemList');
  const shopItemImage = document.getElementById('shopItemImage');
  const shopItemName = document.getElementById('shopItemName');
  const shopItemPrice = document.getElementById('shopItemPrice');
  const shopItemNumber = document.getElementById('shopItemNumber');
  const shopItemTotalBuyCoin = document.getElementById('shopItemTotalBuyCoin');
  const shopItemBuy = document.getElementById('shopItemBuy');
  // 各アイテムのHTMLを一度『空』にする
  haveItemList.innerHTML = ''
  shopItemImage.innerHTML = ''
  shopItemName.innerHTML = ''
  shopItemPrice.innerHTML = ''
  shopItemNumber.innerHTML = ''
  shopItemTotalBuyCoin.innerHTML = ''
  shopItemBuy.innerHTML = ''

  // アイテムの数だけforEach文で回す
  itemData.forEach((item, itemIndex) => {
    // liタグの生成
    const haveItemListLi = document.createElement('li');
    // spanタグの生成
    const haveItemName = document.createElement('span');
    const haveItemNumber = document.createElement('span');
    // 
    haveItemName.textContent = `${item.name}：`;
    haveItemNumber.textContent = item.number;
    haveItemListLi.appendChild(haveItemName);
    haveItemListLi.appendChild(haveItemNumber);
    haveItemList.appendChild(haveItemListLi);

    // アイテムショップ
    const imageTd = document.createElement('td');
    const image = document.createElement('img');
    image.src = `image/${item.img}`
    imageTd.appendChild(image);
    shopItemImage.appendChild(imageTd);

    const nameTd = document.createElement('td');
    nameTd.textContent = item.name;
    shopItemName.appendChild(nameTd);

    const priceTd = document.createElement('td');
    priceTd.textContent = item.price;
    shopItemPrice.appendChild(priceTd);

    const numberTd = document.createElement('td');
    const numberLabel = document.createElement('label');
    numberLabel.for = `item${itemIndex}`
    numberLabel.textContent = '購入数：'
    const numberSelect = document.createElement('select');
    numberSelect.id = `item${itemIndex}`
    numberSelect.classList.add('numberOfItem');
    for (let i = 0; i < 5; i++) {
      const option = document.createElement('option');
      option.value = i + 1;
      option.textContent = i + 1;
      numberSelect.appendChild(option);
    }

    const totalBuyCoinTd = document.createElement('td');
    totalBuyCoinTd.textContent = `合計コイン：${item.price * item.number}`
    shopItemTotalBuyCoin.appendChild(totalBuyCoinTd);

    numberSelect.addEventListener('input', function (e) {
      shopItemTotalBuyCoin.innerHTML = '';
      // アイテムの値=アイテムの個数となる
      item.number = e.target.value
      itemData.forEach(value => {
        const totalBuyCoinTd = document.createElement('td');
        totalBuyCoinTd.textContent = `合計コイン：${value.price * value.number}`
        console.log(value)
        shopItemTotalBuyCoin.appendChild(totalBuyCoinTd);

        // アイテムAの値（個数）にアイテムの値段をかける
        // const total = numberOfItemA.value * itemData[0]['price'];
        // アイテムAの合計コインの表示
        // insertText('totalBuyCoinA', '合計コイン : ' + total);

      })
      // 購入ボタンを押せない処理
      switchBuyItems();
    })
    numberTd.appendChild(numberLabel);
    numberTd.appendChild(numberSelect);
    shopItemNumber.appendChild(numberTd);

    const itemBuyTd  = document.createElement('td');
    itemBuyTd.classList.add('itemBuy');
    const itemBuySpan = document.createElement('span');
    itemBuySpan.textContent = '購入';
    
    // itemBuy(購入ボタン)を押した時の処理
    itemBuySpan.addEventListener('click', function () {
      // itemBuy(購入ボタン)を半透明にする
      // itemBuy.style.opacity = 0.5

      // もしプレイヤーのコインがアイテムの値段より高ければ
      if (playerData['coin'] >= item.price * item.number) {
        // プレイヤーのコインからアイテムの値段分のコインを引く
        playerData['coin'] -= item.price * item.number;
        // 購入時の確認ボタン表示
        itemBuyWindowMaskOpen()
        // // もしitemDataのitemIndexが0の場合
        // if (item === itemData[0]) {
        //   // haveItemANumberに個数のデータが渡る
        //   insertText('haveItemANumber', item.number)
        //   // それ以外の場合は
        // } else {
        //   // haveItemBNumberに個数のデータが渡る
        //   insertText('haveItemBNumber', item.number)
        // }
        // コインが足りなければ
      } else {
        // アイテムモーダルの表示
        itemNotBuyModal.classList.add('show');
      }
    });
    itemBuyTd.appendChild(itemBuySpan);
    shopItemBuy.appendChild(itemBuyTd);

  });
}
updateDisplayItems();

// プレイヤーの現在のコインを表示
insertText("playerCoinDisplay", '現在のコインは' + playerData['coin'] + '枚');

// アイテムの画像を入れる要素の取得
// const itemImgA = document.getElementById('itemImgA'),
//   itemBuyA = document.getElementById('itemBuyA'),
//   itemImgB = document.getElementById('itemImgB'),
//   itemBuyB = document.getElementById('itemBuyB');

// // アイテムの画像を表示
// itemImgA.src = itemData[0]['img'];
// itemImgB.src = itemData[1]['img'];

// // アイテムの名前を表示
// insertText('itemNameA', itemData[0]['name']);
// insertText('itemNameB', itemData[1]['name']);

// // アイテムの価格を表示
// insertText('itemUnitPriceA', '１つ : ' + itemData[0]['price'] + 'コイン');
// insertText('itemUnitPriceB', '１つ : ' + itemData[1]['price'] + 'コイン');



// TODO　コインが足りないアイテムの購入ボタンを押せないようにする
function switchBuyItems() {
  // 購入ボタン全ての要素を取得
  const itemTypeButtons = document.querySelectorAll('#shopItemBuy span');
  console.log(itemTypeButtons)
  // 全てのactiveを消す
  itemTypeButtons.forEach(button => button.classList.remove('active'));
  // 買えるアイテムのボタンのみactiveを付ける
  itemData.forEach((item, index) => {
    // アイテムの値段と個数をかけた金額とプレイヤーの所持金と比較している
    if (item.price * item.number <= playerData['coin']) {
      // 条件が一致したindex番目にactiveをつける
      itemTypeButtons[index].classList.add('active')
    }
  });
}


// !　アイテムを購入した時にウィンドウを開く関数
function itemBuyWindowMaskOpen() {
  // 確認画面とマスクの設定
  const itemBuyModal = document.getElementById('itemBuyModal'),
    itemBuyWindowMask = document.getElementById('itemBuyWindowMask');
  // マスクの表示
  itemBuyWindowMask.classList.add('show');
  // アイテムモーダルの表示
  itemBuyModal.classList.add('show');
  // コインの残高を表示
  document.getElementById('coinBalance').textContent = '残り' + playerData['coin'] + 'コイン'
}

// TODO　     アイテムの複数購入　================================================

// アイテムの購入数を選択する要素の取得
// const numberOfItemA = document.getElementById('numberOfItemA')
// const numberOfItemB = document.getElementById('numberOfItemB')



// let totalBuyCoinA = 0
// // もしアイテムAに個数が選択されたら
// numberOfItemA.addEventListener('input', function () {
//   // アイテムAの値（個数）にアイテムの値段をかける
//   totalBuyCoinA = numberOfItemA.value * itemData[0]['price'];
//   // アイテムの値=アイテムの個数となる
//   itemData[0].number = numberOfItemA.value;
//   // アイテムAの合計コインの表示
//   insertText('totalBuyCoinA', '合計コイン : ' + totalBuyCoinA);
//   // 購入ボタンを押せない処理
//   switchBuyItems();
// })


// もしアイテムBに個数が選択されたら
// numberOfItemB.addEventListener('input', function () {
//   // アイテムBの値（個数）にアイテムの値段をかける
//   let totalBuyCoinB = numberOfItemB.value * itemData[1]['price'];
//   // アイテムBの合計コインの表示
//   insertText('totalBuyCoinB', '合計コイン : ' + totalBuyCoinB)
// })


// TODO　============================================================================


// !　アイテムの購入ボタンを押した時の処理を行う関数

// コインを計算して、確認画面を表示する関数
function pushBuyButton(itemBuy, itemIndex) {

  // itemBuy(購入ボタン)を押した時の処理
  itemBuy.addEventListener('click', function () {
    // itemBuy(購入ボタン)を半透明にする
    itemBuy.style.opacity = 0.5

    // もしプレイヤーのコインがアイテムの値段より高ければ
    if (playerData['coin'] >= itemData[itemIndex].price * itemData[itemIndex].number) {
      // プレイヤーのコインからアイテムの値段分のコインを引く
      playerData['coin'] -= itemData[itemIndex].price * itemData[itemIndex].number;
      // 購入時の確認ボタン表示
      itemBuyWindowMaskOpen()
      // もしitemDataのitemIndexが0の場合
      if (itemData[itemIndex] === itemData[0]) {
        // haveItemANumberに個数のデータが渡る
        insertText('haveItemANumber', itemData[itemIndex].number)
        // それ以外の場合は
      } else {
        // haveItemBNumberに個数のデータが渡る
        insertText('haveItemBNumber', itemData[itemIndex].number)
      }
      // コインが足りなければ
    } else {
      // アイテムモーダルの表示
      itemNotBuyModal.classList.add('show');
    }
  });
}

// !　アイテム購入ボタンを押した時の処理を行う関数の実行
// pushBuyButton(itemBuyA, 0, itemData[0]['price']);
// pushBuyButton(itemBuyB, 1, itemData[1]['price']);

// !　アイテムの確認ボタンを押した時の処理を行う関数の実行
// 全てのアイテム購入の確認ボタンの要素を取得
const itemBuyConfiramationButton = document.querySelectorAll('.itemBuyConfiramationButton');
// アイテム購入の確認ボタンの要素分for文を回す
for (let i = 0; i < itemBuyConfiramationButton.length; i++) {
  // 確認ボタンを押した時の処理
  itemBuyConfiramationButton[i].addEventListener('click', function () {
    // マスクの表示消す
    itemBuyWindowMask.classList.remove('show');
    // アイテムモーダルの表示消す
    itemBuyModal.classList.remove('show');
    // アイテムモーダルの表示消す
    itemNotBuyModal.classList.remove('show');
    // itemBuy(購入ボタン)の半透明を解除
    // itemBuyA.style.opacity = 1;
    // itemBuyB.style.opacity = 1;
    // 現在のプレイヤーのコインを表示
    insertText("playerCoinDisplay", '現在のコイン : ' + playerData["coin"] + '枚');
    switchBuyItems();
  })
}

//TODO===================ショップ出るボタンを押した後の処理===================================

// ショップ出るボタンの要素を取得
const shopOut = document.getElementById('shopOut');
// ショップ出るボタンをクリックすると
shopOut.addEventListener('click', function () {
  // itemWindowのクラスshowが外れる
  itemWindow.classList.remove('show');
  // itemTypeのクラスshowが外れる
  itemType.classList.remove('show');
  // mask要素のactiveクラスを消す
  document.getElementById("mask").classList.remove("active");
  // modal要素のactiveクラスを消す
  document.getElementById("modal").classList.remove("active");
  // 再び攻撃ボタンを押せるようにするためdeActiveクラスを消す
  document.getElementById("attack").classList.remove("deActive");
  // ショップボタン非表示へ
  shopIn.classList.remove('active');


  // 敵のHPをmaxHpに戻す
  enemyData["hp"] = enemyData["maxHp"];
  // 次にどの敵が出るか選ばれる
  enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];
  // 敵の情報
  insertText("enemyName", enemyData["name"]);
  insertText("currentEnemyHp", enemyData["hp"]);
  insertText("maxEnemyHp", enemyData["hp"]);
  //　敵の画像を表示
  enemyImg.src = enemyData["img"];
  // 敵のHPゲージを100%にする
  document.getElementById("currentEnemyHpGaugeValue").style.width = "100%";
  // 敵のHPゲージの色を元の色に戻す
  document.getElementById("currentEnemyHpGaugeValue").style.backgroundColor = "#6bf";


  // プレイヤーのHPゲージを100%にする
  document.getElementById("currentPlayerHpGaugeValue").style.width = "100%";
  // プレイヤーのHPゲージの色を元の色に戻す
  document.getElementById("currentPlayerHpGaugeValue").style.backgroundColor = "#6bf";
  // プレイヤーのHPゲージをmaxHpに戻す
  playerData["hp"] = playerData["maxHp"];
  // 上記で定義したHPを表示する
  insertText("currentplayerHp", playerData["hp"]);
  // プレイヤーのコインが０以上なら
  if (0 < playerData['coin']) {
    // 残りのコインを表示する
    coin.textContent = playerData['coin'] + 'コイン';
    // プレイヤーのコインが０以下（アイテムの最低価格）なら
  } else {
    // コインを０にして表示する
    coin.textContent = 0 + 'コイン';
  }

  // 現在の討伐数を表示する
  insertText("nowKilledNumber", nowKilledNumber);

});


//TODO===================アイテムを使用した時の処理===================================


// // 上記haveItemANumberの値を取得
// let haveItemANumberValue = haveItemANumber.value;
// // 初期値を0とする
// haveItemANumberValue = 0;

document.getElementById('useItem').addEventListener('click', function () {
  if (haveItemANumberValue === 0) {
    insertText("haveItemA", 'ポーション : ' + 0);
  } else {
    haveItemANumberValue -= 1
    insertText("haveItemA", 'ポーション : ' + haveItemANumberValue);
    // playerData["hp"] += 20;
  }
})


// itemData['number'] -= 1

