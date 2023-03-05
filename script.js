const app = {
  //? データ ==========================================================
  data() {
    return {
      // toggle: false,
      // TODO 共通のデータ　=======================================
      // 攻撃ボタン 押せる押せない
      deActive: false,
      // 勝った時のフラグ
      victory: false,
      // 負けた時のフラグ
      defeat: false,
      
      // TODO 敵のデータ　=======================================

      encountEnemies: [],

      encountEnemiesNum: 0,

      enemyData: [
        {
          name: "",
          hp: "",
          attack: "",
          deffence: "",
          coin: "",
          img: "",
          exp: "",
          weakness: "",
          isDefeat: "",
          isVisible: "",
        }
      ],
      // 名前とHPを定義(複数用意)
      enemiesData: [
        {
          name: "スライム",
          hp: 50,
          maxHp: 50,
          attack: 4,
          deffence: 1,
          coin: 0,
          img: "image/slime.jpg",
          exp: 10,
          weakness: 'ファイア',
          isDefeat: true,
          isVisible: true,

        },
        {
          name: "フェアリー",
          hp: 60,
          maxHp: 60,
          attack: 5,
          deffence: 1,
          coin: 0,
          img: "image/fairy.jpg",
          exp: 20,
          weakness: 'ブリザード',
          isDefeat: true,
          isVisible: true,
        },
        {
          name: "ガーゴイル",
          hp: 80,
          maxHp: 80,
          attack: 10,
          deffence: 2,
          coin: 0,
          img: "image/gargoyle.png",
          exp: 30,
          weakness: 'サンダー',
          isDefeat: true,
          isVisible: true,

        }
      ],
      // 敵の攻撃によるプレイヤーのダメージ
      enemyDamege: "",

      // TODO プレイヤーのデータ　=======================================
      isSelectEnemyMask: false,

      isSelectEnemy: false,

      currentPlayerIndex: 0,

      selectAttackEnemiesIndex: 0,

      playerData: {
        coin: 10,
      },

      playersData: [
        {
          name: "勇者",
          hp: 100,
          maxHp: 100,
          mp: 20,
          maxMp: 20,
          attack: 10,
          deffence: 10,
          exp: 0,
          level: 1,
          img: "image/braver.png",
        },
        {
          name: "魔法使い",
          hp: 80,
          maxHp: 80,
          mp: 30,
          maxMp: 30,
          attack: 10,
          deffence: 200,
          exp: 0,
          level: 1,
          img: "image/wizard.jpg",
        },
      ],
      // プレイヤーの攻撃による敵のダメージ
      playerDamege: "",
      // レベルアップ
      levelUpExp: 10,
      // 攻撃力の上がり
      powerUpRate: 2,
      // 名前
      isNameActive: false,

      // TODO 攻撃に関してのデータ　=======================================
      // 実際のダメージ(攻撃力 - 防御力)
      damege: "",
      // クリティカルヒット
      creticalHit: false,
      // クリティカルヒットの確率(2分の1)
      creticalHitRate: 50,

      // TODO ログのデータ　=======================================
      // プレイヤー、敵のログが入る
      logs: [],

      // TODO 討伐数　=======================================
      // 現在の討伐数
      nowKilledNumber: 0,
      // 目標の討伐数
      goalKilledNumber: 5,

      // TODO モーダル　=======================================
      // モーダルとマスク
      isModalActive: false,
      // 次に進むボタン
      isNextButtonHidden: false,

      // TODO セッティング　=======================================
      // セッティングボタンの色変更
      isColorChange: false,

      // TODO ショップ　=======================================
      // ショップに入るボタンの表示・非表示
      isShopIn: false,
      // ショップに入る画面の表示・非表示
      isItemWindow: false,
      // アイテムイメージ
      items: [
        {
          itemsToRecover: true,
          image: "image/portion.jpg",
          name: "ポーション",
          price: 10,
          resilience: 10,
          number: 3,
        },
        {
          itemsToRecover: true,
          image: "image/hiPortion.jpg",
          name: "ハイポーション",
          price: 20,
          resilience: 20,
          number: 3,
        },
        {
          itemsToRecover: false,
          image: "image/bom.png",
          name: "ボム",
          price: 10,
          attack: 15,
          number: 3,
        },
      ],
      // TODO 魔法　=======================================
      magics: {
        
        fire: {
          name: "ファイア",
          attack: 1,
          mp: 5,
          img: 'image/magic/fire.png',
        },
        blizzard: {
          name: "ブリザード",
          attack: 2,
          mp: 6,
          img: 'image/magic/blizzard.jpg',
        },
        thunder: {
          name: "サンダー",
          attack: 3,
          mp: 7,
          img: 'image/magic/thunder.png',
        },
      }
    }
  },


  //? メソッド ==========================================================
  methods: {
    //TODO ダメージの計算=======================================
    damageCalculation(attack, deffence) {
      // 攻撃力の幅
      let damageRange = 0.5
      // 最大攻撃力と最小攻撃力の計算
      let maxDamage = attack * (1 + damageRange)
      let minDamage = attack * (1 - damageRange)
      // 攻撃力の計算(最大攻撃力 - 最小攻撃力)
      let attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage) + 1
      // 実際のダメージの計算(攻撃力 - 防御力)
      this.damege = attackDamage - deffence
      // 防御力が勝る場合は0を返す処理
      if (this.damege < 1) {
        return 0
      } else {
        return this.damege
      }
    },
    //TODO 魔法  ===============================================
    // 魔法使用時のログ
    useMagicLog(player, magics, enemy, attack) {
      this.logs.unshift(`${player}は${magics}を使用${enemy}に${attack}のダメージ`);
    },
    useMagic(magic) {
      console.log(magic.mp)
      // もしプレイヤーのMPが魔法の消費MPより大きければ
      if (this.playersData[this.currentPlayerIndex].mp >= magic.mp) {
        // MP消費
        this.playersData[this.currentPlayerIndex].mp -= magic.mp
        // 弱点属性の場合
        if (magic.name === this.enemyData.weakness) {
          this.encountEnemies[this.selectAttackEnemiesIndex].hp -= magic.attack * 2
          // ログ
          this.useMagicLog(this.playerName, magic.name, this.enemyName, magic.attack * 2);
          // 弱点属性でない場合
        } else {
          this.encountEnemies[this.selectAttackEnemiesIndex].hp -= magic.attack
          this.useMagicLog(this.playerName, magic.name, this.enemyName, magic.attack);
        }
        this.afterPlayerActionProcess()
      }
    },

    changeAttackEnemies(e) {
      // this.encountEnemies[this.selectAttackEnemiesIndex].isDefeat = false
    },

    //TODO ゲージについて================================================================

    //HPゲージ(引数enemyに敵の情報が入っている)
    enemyHpGaugeStyle(enemy) {
      // 
      currentEnemyGaugePercentage = enemy.hp / enemy.maxHp
      if (.9 < currentEnemyGaugePercentage) {
        gaugeColor = "#6bf";
      } else if (.2 < currentEnemyGaugePercentage) {
        gaugeColor = "yellow";
      } else {
        gaugeColor = "red";
      }
      return {
        width: `${enemy.hp / enemy.maxHp * 100}%`,
        backgroundColor: gaugeColor
      }
    },

    playerHpGaugeStyle() {
      currentPlayerGaugePercentage = this.playersData[this.currentPlayerIndex].hp / this.playersData[this.currentPlayerIndex].maxHp
      if (.9 < currentPlayerGaugePercentage) {
        gaugeColor = "#6bf";
      } else if (.2 < currentPlayerGaugePercentage) {
        gaugeColor = "yellow";
      } else {
        gaugeColor = "red";
      }
      return {
        width: `${this.playersData[this.currentPlayerIndex].hp / this.playersData[this.currentPlayerIndex].maxHp * 100}%`,
        backgroundColor: gaugeColor
      }
    },

    //MPゲージ
    mpGaugeStyle() {
      return {
        width: `${this.playersData[this.currentPlayerIndex].mp / this.playersData[this.currentPlayerIndex].maxMp * 100}%`,
      }
    },

    // 敵を選ぶ
    selectEnemy() {
      this.isSelectEnemyMask = true
      this.isSelectEnemy = true
    },

    // TODO 攻撃ボタンを押した時の処理　===============================================
    // 攻撃ボタン押した時の処理
    makeAnAttack() {
      // 攻撃した時の画面のフラッシュ
      const main = document.querySelector('.main')
      main.classList.add('active')
      setTimeout(() => { main.classList.remove('active') }, 100)
      // 攻撃音
      // const playerAttackSound = new Audio('sound/playerAttackSound.mp3')
      // playerAttackSound.play()

      // プレイヤーから敵側への処理　=======================================
      this.playerDamege = this.damageCalculation(this.playersData[this.currentPlayerIndex].attack, this.encountEnemies[this.selectAttackEnemiesIndex].deffence)
      // クリティカルヒットが出る確率
      if ((1 + Math.floor(Math.random() * 100)) < this.creticalHitRate) {
        // クリティカルヒットのフラグture
        this.creticalHit = true
        // プレイヤーの攻撃力2倍
        this.playerDamege *= 2
      }
      // 敵のHPからプレイヤーの攻撃力を引く
      this.encountEnemies[this.selectAttackEnemiesIndex].hp -= this.playerDamege

      // プレイヤーのログ =======================
      let playerLog
      if (this.creticalHit) {
        playerLog = `クリティカルヒット!${this.playerName}の攻撃!
        ${this.enemyName}に${this.playerDamege}のダメージ`;
        // クリティカルヒットfalseに戻す
        this.creticalHit = false
      } else {
        playerLog = `${this.playerName}の攻撃!${this.enemyName}${this.playerDamege}のダメージ`;
      }
      this.logs.unshift(playerLog)
      // 勝敗の処理
      this.afterPlayerActionProcess()
    },
    // TODO 勝敗の処理===============================================
    afterPlayerActionProcess() {

      // TODO もし敵のHPが0になったら ========================================
      // 勝ったとき
      if (this.encountEnemies[this.selectAttackEnemiesIndex].hp <= 0) {
        // 敵のHPを0以下にしない処理
        this.encountEnemies[this.selectAttackEnemiesIndex].hp = 0
        // 敗北のフラグ
        this.encountEnemies[this.selectAttackEnemiesIndex].isDefeat = false
        // 残った敵の配列をnewEncountEnemiesへ返す
        // const newEncountEnemies = this.encountEnemies.filter((remainingEnemy) => {
        //   return remainingEnemy.isDefeat === true
        // })
        // // 初めの敵の配列を残っている敵の配列に書き替える
        // this.encountEnemies = newEncountEnemies 
      }
      if(this.encountEnemies.length === 0) {
        this.victory = true
      }

      // TODO もしプレイヤーが勝ったら ========================================
      if (this.victory) {
        // 討伐数を増やす
        this.nowKilledNumber++
        // コインの追加
        this.playerData.coin += this.encountEnemies[this.selectAttackEnemiesIndex].coin
        // 経験値の追加
        this.playersData[this.currentPlayerIndex].exp += this.encountEnemies[this.selectAttackEnemiesIndex].exp
        // レベルの追加
        this.playersData[this.currentPlayerIndex].level = Math.floor(this.playersData[this.currentPlayerIndex].exp / this.levelUpExp) + 1

        //! 攻撃力アップ ==================================
        this.playersData[this.currentPlayerIndex].attack = this.playersData[this.currentPlayerIndex].attack + (this.playersData[this.currentPlayerIndex].level * 2) - 2

        // モーダルの表示
        this.showModal(`${this.encountEnemies[this.selectAttackEnemiesIndex].name}を倒した`)

        // TODO もし目標討伐数に達したら========================================
        if (this.nowKilledNumber === this.goalKilledNumber) {
          this.showModal(`おめでとうゲームクリア`, true)
        }
      }

      //TODO 敵側からプレイヤーへの処理　=======================================
      // もし勝ちのフラグがfalseだった場合
      if (!this.victory) {
        // 敵の数分攻撃の処理をする
        this.encountEnemies.forEach((el, index) => {
          // 敵の攻撃力計算(this.encountEnemies[index] = 表示されている敵１体)
          this.enemyDamege = this.damageCalculation(this.encountEnemies[index].attack, this.playersData[this.currentPlayerIndex].deffence)
          // プレイヤーのHPから敵の攻撃力を引く
          this.playersData[this.currentPlayerIndex].hp -= this.enemyDamege
          // 敵のログ =======================
          const enemyLog = `<span style="color:red">${this.encountEnemies[index].name}</span>の攻撃!${this.playerName}${this.enemyDamege}のダメージ`;
          // ログに表示
          this.logs.unshift(enemyLog)
        })

        // TODO もしプレイヤーが負けたら ========================================
        // もしプレイヤーのHPが0になったら
        if (this.playersData[this.currentPlayerIndex].hp <= 0) {
          // ゲーム終わりのフラグをtrue
          this.defeat = true
          // モーダルの表示
          this.showModal(`${this.playersData[this.currentPlayerIndex].name}の負け`, true)
          // プレイヤーのHPを0以下にしない処理
          this.playersData[this.currentPlayerIndex].hp = 0
        }
      }

      // TODO プレイヤーが勝っても負けても ========================================
      if (this.victory || this.defeat) {
        // 攻撃ボタンを押せなくする
        this.deActive = true
        // ショップボタン押せる処理
        this.isShopIn = true
        // 再びゲームができるようにfalseへ
        this.victory = false
        this.defeat = false
      }
    },

    // TODO モーダルボタン ========================================
    showModal(title, hiddenNextButton = false) {
      // マスクとモーダルにactiveクラス付与
      this.isModalActive = true;
      // modalTitle要素を取得して第１引数のtitleとしてテキスト表示させる
      document.getElementById("modalTitle").textContent = title;
      // もし第２引数にhiddenNextButtonがtrueだった場合
      if (hiddenNextButton) {
        // modalNextBotton要素にクラスhiddenが付与される
        document.getElementById("modalNextButton").classList.add("hidden");
      }
    },
    // TODO 次に進むボタン押した処理 ========================================
    clickModalNextButton() {
      // 敵のHPを元に戻す
      this.encountEnemies[this.selectAttackEnemiesIndex].hp = this.encountEnemies[this.selectAttackEnemiesIndex].maxHp
      // 敵が選ばれる
      let randomEnemy = Math.floor(Math.random() * this.enemiesData.length)
      this.enemyData = this.enemiesData[randomEnemy]
      // プレイヤーと敵のHPを元に戻す
      this.encountEnemies[this.selectAttackEnemiesIndex].hp = this.encountEnemies[this.selectAttackEnemiesIndex].maxHp
      // ログを空にする
      this.logs = []

      // モーダルとマスクを消す
      this.isModalActive = false
      this.deActive = false
    },
    // TODO  アイテムを使う ==================================================
    useTheItem(index) {
      // アイテムが0かどうかの判定
      if (this.items[index].number > 0) {
        // アイテムが0以下であれば
        if (this.items[index].number <= 0) {
          this.items[index].number === 0
        }
        // アイテムが回復系か攻撃系かかの判定
        if (this.items[index].itemsToRecover === true) {
          // HPが最大値ではない場合
          if (this.playersData[this.currentPlayerIndex].hp !== this.playersData[this.currentPlayerIndex].maxHp) {
            // 回復アイテム効果音
            // const RecoverySound = new Audio('sound/recovery.mp3')
            // RecoverySound.play()
            // 現在のHPが最大HPを下回っているかの判定
            if (this.playersData[this.currentPlayerIndex].hp < this.playersData[this.currentPlayerIndex].maxHp) {

              // 現在のHPと回復力を足したHPが最大HPより小さいか判定
              if (this.playersData[this.currentPlayerIndex].maxHp > (this.playersData[this.currentPlayerIndex].hp + this.items[index].resilience)) {
                // 回復のログ
                this.logs.unshift(`${this.playerName}${this.items[index].name}を使用${this.items[index].resilience}の回復`)
                // プレイヤーのHPに回復力を足す
                this.playersData[this.currentPlayerIndex].hp += this.items[index].resilience

                // 現在のHPと回復力を足したHPが最大HPより大きい場合
              } else {
                // 回復のログ
                this.logs.unshift(`${this.playerName}${this.items[index].name}を使用${this.playersData[this.currentPlayerIndex].maxHp - this.playersData[this.currentPlayerIndex].hp}の回復`)
                // プレイヤーのHPに回復力 = 最大HP - 現在のHP
                this.playersData[this.currentPlayerIndex].hp = this.playersData[this.currentPlayerIndex].maxHp
              }
              // アイテムを減らす
              this.items[index].number -= 1
              // ログ、勝敗の処理
              setTimeout(() => {
                this.afterPlayerActionProcess()
              }, 500)
            }
          }
          // 攻撃系アイテム使用
        } else {
          // 爆弾効果音
          // const bomSound = new Audio('sound/bomSound.mp3')
          // bomSound.play()
          // アイテムを減らす
          this.items[index].number -= 1

          // 敵のHPがアイテムの攻撃力より大きければ
          if (this.encountEnemies[this.selectAttackEnemiesIndex].hp > this.items[index].attack) {
            // 攻撃のログ
            this.logs.unshift(`${this.playerName}は${this.items[index].name}を使用${this.encountEnemies[this.selectAttackEnemiesIndex].name}に${this.items[index].attack}のダメージ`);
            // アイテムの攻撃力を引く
            this.encountEnemies[this.selectAttackEnemiesIndex].hp -= this.items[index].attack

            // 敵のHPがアイテムの攻撃力より小さければ
          } else {
            // 攻撃のログ
            this.logs.unshift(`${this.playerName}${this.items[index].name}を使用${this.encountEnemies[this.selectAttackEnemiesIndex].name}に${this.encountEnemies[this.selectAttackEnemiesIndex].hp}のダメージ`)
            // 敵のHPを0にする
            this.encountEnemies[this.selectAttackEnemiesIndex].hp = 0
          }
          // ログ、勝敗の処理
          setTimeout(() => {
            this.afterPlayerActionProcess()
          }, 500)
        }
      }
    },

    // TODO セッティングに関わる処理 ========================================
    //セッティングを行う
    toSet() {
      this.isNameActive = !this.isNameActive
      this.isColorChange = !this.isColorChange
    },
    //名前決定する
    playerNameDecision() {
      alert(`名前を${this.playersData[this.currentPlayerIndex].name}に変更しました`)
      this.isNameActive = !this.isNameActive
      this.isColorChange = !this.isColorChange
    },

    // TODO ショップに関わる処理 ========================================
    // ショップに入る
    shopIn() {
      this.isItemWindow = true
    },
    // アイテムを買う
    buyItem(itemIndex) {
    },
    // ショップを出る
    shopOut() {
      this.isItemWindow = false
    },
    // ディープコピー
    deepCopy(value) {
      return JSON.parse(JSON.stringify(value))
    },
  },

  //? computed　==========================================================
  computed: {
    playerName() {
      return `<span style="color:blue">${this.playersData[this.currentPlayerIndex].name}</span>`
    },
    // playerLogで使用
    enemyName() {
      return `<span style="color:red">${this.encountEnemies[this.selectAttackEnemiesIndex].name}</span>`
    },
  },

  //? mounted　==========================================================
  mounted() {
    // 敵を生成 =======================================
    // 敵の数1~3
    const randomEnemiesNum = Math.floor(Math.random() * this.enemiesData.length + 1)

    for (let i = 0; i < randomEnemiesNum; i++) {
      // ランダムに敵を生成
      this.encountEnemiesNum = Math.floor(Math.random() * this.enemiesData.length)
      // 敵を決める
      const enemyData = this.deepCopy(this.enemiesData[this.encountEnemiesNum])
      this.encountEnemies.push(enemyData)
    }
    // ================================================

    for (const key in this.playersData[0]) {
      this.playersData[key] = this.playersData[0][key]
    }

    // アイテムの個数の初期値を１にする
    this.items.forEach(item => {
      item.buyNum = 1
    })
  },

}
Vue.createApp(app).mount("#app")