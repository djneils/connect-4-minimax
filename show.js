class Show{
  constructor(row,col){
    this.row=row
    this.col = col
    this.life = 255
  }

  animate(){
    noFill()
    strokeWeight(15)
    stroke(255,255,0,this.life)
    ellipse(this.col*100,this.row*100,100,100)
     strokeWeight(1)
    this.life-=1
    if(this.life<0){
      shows.splice(shows.indexOf(this),2)
    }
  }
}