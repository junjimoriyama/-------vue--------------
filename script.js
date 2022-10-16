const imageTotalNumber = 6,
      mainImageElement = document.getElementById('mainImage'),
      imageListElement = document.getElementById('imageList'),
      prevImageElement = document.getElementById('prevImage'),
      nextImageElement = document.getElementById('nextImage');
      
let currentSlideNumber = 1

/* if (currentSlideNumber === 1) {
  prevImageElement.classList.add('inActive')
}
 */
// setAttributeで属性と値を与えメインの画面を表示する
mainImageElement.setAttribute('src', 'img/img1.jpg')

function changeSlideStatus () {
  if (currentSlideNumber === 1) {
    prevImageElement.classList.add('inActive')
  }else {
    prevImageElement.classList.remove('inActive')
  }
  
  if (currentSlideNumber === imageTotalNumber) {
    nextImageElement.classList.add('inActive')
  }else {
    nextImageElement.classList.remove('inActive')
  }

  document.getElementById('currentSlideNumber').textContent = `${currentSlideNumber} / ${imageTotalNumber}`
}
changeSlideStatus ()

// 写真の枚数分、for文を回す。
for (let i = 0; i < imageTotalNumber; i++) {
// 変数をliElementとし、js上にliタグを作る
  const liElement = document.createElement('li')
// 変数liElementにbackgroundImageのurlで写真を枚数分取得する
  liElement.style.backgroundImage = `url(img/img${i + 1}.jpg)`
// 変数liElementをクリックした場合
  liElement.addEventListener('click', () => {
// メインの写真に枚数分、setAttributeで属性と値を与え表示できるようにする
  mainImageElement.setAttribute('src', `img/img${i + 1}.jpg`)
  currentSlideNumber = i + 1
  changeSlideStatus ()
  });

  imageListElement.appendChild(liElement)
};

// 上の記述とは別物として考える。


prevImageElement.addEventListener('click', () => {
  // 変数currentSlideNumberを「1」とする
  if (currentSlideNumber !== 1) {
    // 変数currentSlideNumberを「1」ずつ減らしていく
    currentSlideNumber--
    mainImageElement.setAttribute('src', `img/img${currentSlideNumber}.jpg`)
    changeSlideStatus ()
  }
})

nextImageElement.addEventListener('click', () => {
  // 変数currentSlideNumberをimageTotalNumber「6」とする
  if (currentSlideNumber !== imageTotalNumber) {
   // 変数currentSlideNumberを「1」ずつ増やしていく
    currentSlideNumber++
    mainImageElement.setAttribute('src', `img/img${currentSlideNumber}.jpg`)
    changeSlideStatus ()
  }
})


    /* someText.removeChild()
    console.log(someText)
    someText.innerHTML = currentSlideNumber */

// 画像名を配列にするex)a[]=名前。jpgなど

/* someTextCount = someText.content
    console.log(someTextCount) */