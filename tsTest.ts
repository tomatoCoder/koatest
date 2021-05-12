/*
 * @Description: ts基础
 * @Author: qingyang
 * @Date: 2021-05-12 15:05:23
 * @LastEditors: qingyang
 * @LastEditTime: 2021-05-12 15:09:24
 */

import {Point} from './utils/point'   // 类和modules的使用
const num: number = 11111;
const arr: string[] = ['123','344']
interface User {
    test: string;
}
const type: User = {test:'1231'};
console.log(type.test);

let reslutType: 'as-number' |  'as-number';   //字面量类型的使用
reslutType = 'as-number'


// interface的使用
interface CatInfo {
    age: number;
    breed: string;
  }
  
  type CatName = "miffy" | "boris" | "mordred";
  
  const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
  }

 
  const point = new Point(11);
  console.log(point.X)
  console.log(point.Y)
  point.X = 200;
  point.drawPoint();
//   console.log(point.getDistance(point(10,20)));



// 泛型的使用
let lastInArray = <T>(arr:T[]) => {
    return arr[arr.length -1]
}
console.log(lastInArray(['1','2']))
console.log(lastInArray([1,'2']))