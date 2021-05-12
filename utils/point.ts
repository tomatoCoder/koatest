/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2021-05-12 14:06:26
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-12 15:19:38
 */
interface IPonit {
    drawPoint: () => void;
    getDistance: (p: IPonit) => number;
    X:number; // 私有变量
    Y:number
    // getX:() => number
    // getY:() => number

}
export class Point implements IPonit {
    constructor(private _x?: number, private _y: number = 10) {
      //   this.x = x;
      //   this.y = y
    }
    drawPoint = () => {
      console.log('x:',this._x,'y:',this._y);
    }
    getDistance = (p: IPonit) => {
        return Math.pow(p.X - this._x, 2) + Math.pow(p.Y - this._y, 2);
    }
    // setX = (value: number) => {
    //   this.x = value
    // }
    set X(value: number) {  // es5后才支持的语法
       this._x = value
    }
    // getX = () => {
    //   return this.x;
    // }
    get X() {
      return  this._x
    }
    set Y(value: number) {
      this._x = value
   }
   get Y() {
     return  this._y
   }
}