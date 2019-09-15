
let a = 0;
//console.log((-3 >>> 0).toString(2));

function countBits(a) {

    const binary = a.toString(2);
    console.log(binary);
    console.log(binary.split(1));
   // return
}

countBits(9);

let helloText = "Hello My name is Nobin";

console.log(helloText.split(" ").filter(el=>el.toLowerCase()=='nobin').sort());


let x = [0,1,2,3];
Array.prototype.move = function(from,to){
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
};

console.log(x.join("-"));

