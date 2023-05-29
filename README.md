# 409620191_529

# 第二個作業- Class 粒子系統與互動遊戲

### class的constructor定義內容

#### 執行後的圖片
![](https://hackmd.io/_uploads/SyueXQGL3.png)


#### 實際的程式碼(海豚)
```javascript=
class Obj{ 
  constructor(args){ //預設值，基本資料(包含有物件的顏色、位置、速度、大小...)
    // this.p = args.p || {x: random(width), y: random(height) } //一個物件開始的位置
    this.p = args.p || createVector(random(width),random(height))
    // this.v = {x: random(-1,1), y: random(-1,1) } //速度，x、y移動的速度為亂數產生-1，1之間的數字
    this.v = createVector(random(-1,1), random(-1,1)) //產生一個x座標值為random(-1,1),y座標值為random(-1,1)
    this.size = random(1,4) //放大倍率
    this.color = random(fill_colors) //充滿顏色
    this.stroke = random(stroke_colors) //線條顏色
  }
```
#### 實際的程式碼(怪物)
```javascript=
class Monster{
  constructor(args){ //預設值，基本資料(包含有物件的顏色、位置、速度、大小...)
    this.r = args.r || random(50,70) //怪物的外圓
    this.p = args.p || createVector(random(width),random(height)) //怪物起始的位置
    this.v = args.v || createVector(random(-1,1), random(-1,1)) //怪物的速度
    this.color = args.color || random(monster_colors) //怪物顏色
    this.mode = random(["happy","bad"])
    this.IsDead = false //false代表怪物還活著
    this.tomenum=0
  }
```
---

### class的畫圖程式碼

#### 執行後的圖片
![](https://hackmd.io/_uploads/BJ1_XmzI2.png)


#### 實際的程式碼(海豚)
```javascript=
let points = [[1, 11], [4, 10], [7, 10],[11,9],[13,8],[15,5],[15,3],[16,1],[16,-1],[15,-1],[11,1],[9,2],[7,1],[5,-1],[1,-1],[0,0],[3,1],[1,1],[-2,0],[-6,-2],[-9,-6],[-9,-7],[-7,-9],[-7,-11],[-8,-12],[-9,-11],[-11,-10],[-13,-11],[-15,-11],[-17,-12],[-17,-10],[-15,-7],[-12,-6],[-11,-6],[-10,-3],[-8,2],[-5,6],[-3,9],[-4,10],[-5,10],[-2,12],[1, 11]]; //list資料，

draw() //把物件畫出來的函數
  {
    push() //重新設定，設定新的原點與顏色設定
      translate(this.p.x,this.p.y) //原點設定在物件所在位置
      scale((this.v.x<0?1:-1),-1) //放大縮小的指令，this.v.x<0?1:-1 ==>this.v.x<0條件成立的話，則值為1，否則為-1
      fill(this.color)
      stroke(this.stroke)
      beginShape()
        for(var i =0;i<points.length-1;i=i+1){
          // line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
          // vertex(points[i][0]*this.size,points[i][1]*this.size) //直角的線
          curveVertex(points[i][0]*this.size,points[i][1]*this.size) //不是直角的線
        }
```
#### 執行後的圖片
![](https://hackmd.io/_uploads/HJGRXmGU2.png)


#### 實際的程式碼(怪物)
```javascript=
 draw(){ //畫怪物
    if(this.IsDead==false){ //活著時，畫的畫面
      push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke() //不要有框線
        ellipse(0,0,this.r)
        if(this.mode == "happy"){ //眼睛為全圓
          fill(255)
          ellipse(0,0,this.r/2)
          fill(0)
          ellipse(0,0,this.r/3)   
        }else{ //眼睛為半圓
          fill(255)
          arc(0,0,this.r/2,this.r/2,0,PI)
          fill(0)
          arc(0,0,this.r/3,this.r/3,0,PI)
            
        }
        //產生腳
        stroke(this.color)
        strokeWeight(4)
        // line(this.r/2,0,this.r,0)
        noFill();
        for(var j=0;j<8;j++){
          rotate(PI/4) //因為要產生八隻腳，一隻腳要旋轉45度，PI代表180，PI/4代表45度
          beginShape()
            for(var i=0;i<(this.r/2);i++){
              vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
            }
          endShape()   
        }    
      pop()
    }
```
#### 執行後的圖片
![](https://hackmd.io/_uploads/r1mG47GI2.png)


#### 實際的程式碼(砲台)
```javascript=
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
```
  
---
### 產生30個相同class的元件

#### 實際的程式碼

```javascript=
 for(var j=0;j<30;j=j+1)
  {
    ball = new Obj({}) //產生一個新物件(海豚)，"暫時"放入到ball變數中
    balls.push(ball) //把ball物件放入到balls物件群(陣列)中
  }
  for(var j=0;j<30;j=j+1)
  {
    monster = new Monster({}) //產生一個新物件(怪物)，"暫時"放入到ball變數中
    monsters.push(monster) //把monster物件放入到monsters物件群(陣列)中
  }
```
---

### 元件的大小，元件的左右移動，速度不一

#### 執行後的圖片
![](https://hackmd.io/_uploads/ryFLcQf82.gif)

#### 實際的程式碼(砲台)

```javascript=
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
```
#### 實際的程式碼(海豚)
```javascript=
this.v = createVector(random(-1,1), random(-1,1)) //產生一個x座標值為random(-1,1),y座標值為random(-1,1)
this.p = args.p || createVector(random(width),random(height))
this.size = random(5,20) //放大倍率
```
#### 實際的程式碼(怪物)
```javascript=
this.r = args.r || random(50,70) //怪物的外圓
this.p = args.p || createVector(random(width),random(height)) //怪物起始的位置
this.v = args.v || createVector(random(-1,1), random(-1,1)) //怪物的速度
```

---
## 發射子彈

#### 執行後的圖片
![](https://hackmd.io/_uploads/SySZ57MU3.gif)

```javascript=
function mousePressed(){ //按下滑鼠
  //新增一筆飛彈資料(還沒有顯示)
  bullet = new Bullet({
  })
  bullets.push(bullet) //把這一筆資料放到飛彈倉庫
  bullet_sound.play()
}

function keyPressed(){ //按下空白鍵
  if(key==" "){
  //新增一筆飛彈資料(還沒有顯示)
    bullet = new Bullet({})
    bullets.push(bullet) //把這一筆資料放到飛彈倉庫
  }
}
``` 
---

## 計算得分、滑鼠按下之後，物件消失不見

#### 執行後的圖片
![](https://hackmd.io/_uploads/SkBCF7MI3.gif)

```javascript=
//++++++++++由此判斷，每隻海豚有沒有接觸每一個飛彈++++++++++
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷ball與bullet有沒有碰觸
      {
        score = score - 1 //分數扣一分
        elephant_sound.play()
        balls.splice(balls.indexOf(ball),1) //讓海豚從海豚倉庫內移除
        bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
      }
    }
```
```javascript=
//++++++++++由此判斷，每隻怪物有沒有接觸每一個飛彈++++++++++
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷monster與bullet有沒有碰觸
      {
        score = score + 1 //分數加一分
        // elephant_sound.play()
        //  monsters.splice(monsters.indexOf(monster),1) //讓怪物從怪物資料倉庫內移除
        monster.IsDead = true //已經被打到了，準備執行爆炸後的畫面
        bullets.splice(bullets.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
      }
    }
```
---
