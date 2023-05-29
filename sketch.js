// let points = [[7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],[-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]]
let points = [[1, 11], [4, 10], [7, 10],[11,9],[13,8],[15,5],[15,3],[16,1],[16,-1],[15,-1],[11,1],[9,2],[7,1],[5,-1],[1,-1],[0,0],[3,1],[1,1],[-2,0],[-6,-2],[-9,-6],[-9,-7],[-7,-9],[-7,-11],[-8,-12],[-9,-11],[-11,-10],[-13,-11],[-15,-11],[-17,-12],[-17,-10],[-15,-7],[-12,-6],[-11,-6],[-10,-3],[-8,2],[-5,6],[-3,9],[-4,10],[-5,10],[-2,12],[1, 11]]; 

// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

// let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，



var stroke_colors = "9a8f97-c3baba-e9e3e6-b2b2b2-736f72".split("-").map(a=>"#"+a)
var fill_colors = "4f6d7a-c0d6df-dbe9ee-4a6fa5-166088".split("-").map(a=>"#"+a)

function preload(){  //最早執行的程式碼
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
  //  bg_sound = loadSound("sound/574197.wav")

}

var ball //大象物件，代表單一個物件，利用這個變數來做正在處裡的物件
var balls =[] //陣列，放所有的物件資料，物件倉庫，裡面儲存所有的物件資料
var bullet  //飛彈物件
var bullets =[]
var monster //怪物物件
var monsters =[] 
var score = 0
var shipP //設定砲台的位置
function setup() { //設定大象物件倉庫內的資料
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台的位置為視窗中間
  //產生幾個物件
  for(var j=0;j<30;j=j+1)
  {
    ball = new Obj({}) //產生一個新物件，"暫時"放入到ball變數中
    balls.push(ball) //把ball物件放入到balls物件群(陣列)中
  }
  for(var j=0;j<30;j=j+1)
  {
    monster = new Monster({}) //產生一個新物件，"暫時"放入到ball變數中
    monsters.push(monster) //把monster物件放入到monsters物件群(陣列)中
  }

  //bg_sound.play()
}

function draw() { //每秒會執行60次
  background("#D2E9FF");
  // for(var k=0;k<balls.length;k=k+1){
  //   ball = balls[k]
  //   ball.draw()
  //   ball.update()
  // }
  if(keyIsPressed){ //鍵盤是否被按下，如果有鍵盤被按下，keyIsPressed的值為true
    if(key=="ArrowLeft" || key=="a"){ //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key=="d"){ //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key=="w"){ //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key=="s"){ //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }
  }
  for(let ball of balls){ //針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()
    //++++++++++由此判斷，每隻大象有沒有接觸每一個飛彈++++++++++
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷ball與bullet有沒有碰觸
      {
        score = score - 1 //分數加一分
        elephant_sound.play()
        balls.splice(balls.indexOf(ball),1) //讓大象從大象倉庫內移除
        bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
      }
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  }


  for(let bullet of bullets){ //針對飛彈倉庫內的資料，一筆一筆的顯示出來
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters){ //針對飛彈倉庫內的資料，一筆一筆的顯示出來
    if(monster.IsDead && monster.timenum==3){
      monsters.splice(monsters.indexOf(monster),1) //讓怪物從怪物倉庫內移除
    }
    monster.draw()
    monster.update()
    //++++++++++由此判斷，每隻怪物有沒有接觸每一個飛彈++++++++++
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷monster與bullet有沒有碰觸
      {
        score = score + 1 //分數扣一分
        // elephant_sound.play()
        //  monsters.splice(monsters.indexOf(monster),1) //讓怪物從怪物資料倉庫內移除
        monster.IsDead = true //已經被打到了，準備執行爆炸後的畫面
        bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
      }
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  }

  textSize(50)
  text(score,50,50)
  //++++++++++劃出中間三角形的炮台++++++++++
  push()
    let dx = mouseX-width/2  //滑鼠座標到中心點座標的x軸距離
    let dy = mouseY-height/2  //滑鼠座標到中心點座標的y軸距離
    let angle = atan2(dy,dx)  //利用反tan算出角度

    
    //translate(width/2,height/2) //砲台的位置
    translate(shipP.x,shipP.y) //砲台的位置，使用shipP的向量值
    rotate(angle)  //讓三角形翻轉一個angle角度
    noStroke()
    fill("#9ff595")
    ellipse(0,0,50) //劃出中間的圓
    fill("#6f5165")
    triangle(50,0,-25,-25,-25,25) //劃出三角形
  pop()
  //+++++++++++++++++++++++++++++++++

}

function mousePressed(){
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  // 按下滑鼠產生一個程式碼
  // ball = new Obj({
  //   p:{x: mouseX, y:mouseY }
  //  p:createVector(mouseX,mouseY)
  // }) //產生一個新物件，"暫時"放入到ball變數中
  // balls.push(ball)
  // ++++++++++++++++++++++++++++++++++++++++++++++++++

  // //按下滑鼠後，刪除該物件
  // for(let ball of balls){
  //   if (ball.isBallInRanger(mouseX,mouseY)){
  //     // 把倉庫的這個物件刪除
  //     score = score + 1
  //     balls.splice(balls.indexOf(ball),1) //把倉庫內編號第幾個刪除，只刪除1個(indexOf()找出ball的編號)
  //   }
  // }

  //新增一筆飛彈資料(還沒有顯示)
  bullet = new Bullet({
    // r:random(10,30) //不一樣大小的飛彈
    // color:random(stroke_colors) //飛彈的顏色
  })
  bullets.push(bullet) //把這一筆資料放到飛彈倉庫
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){
  //新增一筆飛彈資料(還沒有顯示)
    bullet = new Bullet({})
    bullets.push(bullet) //把這一筆資料放到飛彈倉庫
  // bullet_sound.play()
  }
  
}
