let radius;
let theta;
let toCalc = 50000
let primes;
let size = 1;

function setup() {
  createCanvas(800,800);
  primes = getPrimes(toCalc);
  //put origin point in center
  r = height * 0.45;
  theta = 0;
  noStroke();
  color(255,255,255)
  scale(0.01)
}

function draw() {
  translate(displayWidth, displayHeight);
  background(10);
  scale(size);
  //the for loop takes forever to fully create all of the circles, so it takes a really long time   //to fully generate so i might leave it overnight sometime
  for(var i = 0; i < toCalc; i++)
  {
    current = primes[i];
    let x = current * cos(current);
    let y = current * sin(current);
    //the horrific (5/exp(size)*2) is something i threw together to get exponential scaling
    //with the zoom at roughly the right level
    circle(x, y, (5/exp(size))*3)
  }
}

function getPrimes(max) {
  //i timed this code and apparently its actually really really performant, 
  //even up to a million primes. its the for loop that really kills performance.
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
  }
//measuring mousewheel for zoom
function mouseWheel(event) {
  //ternary to check if it was a scrolldown or scrollup
  //have to make zoom out by size/10 because size is represented by a value from 0 to 1
  event.delta >= 0 ? size-=size/10 : size+=size/10
  //returning false to block page scrolling
  return false; 
  
}