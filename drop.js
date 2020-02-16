class Drop {
  constructor(c) {
    this.pos = createVector(c*100,-100)
    this.vel=createVector(0,15)
    this.target = createVector(c*100,dropTo[c]*100)
    this.c=c
  }

  show() {
    if (p1Turn) {
      fill(255, 0, 0)
    } else {
      fill(255, 255, 0)
    }
    ellipse(this.pos.x , this.pos.y , 90)
  }



  update() {
    this.pos.add(this.vel)
    if(this.pos.y>this.target.y){
      drops.splice(drops.indexOf(this),1)
      if(p1Turn){
        board[this.c][dropTo[this.c]]=1
      }else{
        board[this.c][dropTo[this.c]]=2
      }
      
    }
  }
}