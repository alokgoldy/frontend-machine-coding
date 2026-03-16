const arr = [1,2,3];

if(!Array.prototype.myMap){
    Array.prototype.myMap = function(callback){
        let result = [];

        for(let i =0; i < this.length; i++){
            result.push(callback(this[i], i, this));
        }
        return result;
    }
}

const val = arr.myMap(i => 2 * i);

console.log(val);


var x = 10;

function test() {
  console.log(x);
  var x = 20;
}

test();

var a = 1;

function foo() {
  a = 10;
  return;
  function a() {}
}

foo();

console.log('aa', a);


console.log('typeof A->>', typeof foo);

var foo = function () {
  return "Hello";
};

console.log('typeof B->>', typeof foo);