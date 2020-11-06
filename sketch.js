let radius;
let theta;
let toCalc = 100000;
let primes;
let size = 1;

function setup() {
  createCanvas(windowWidth, windowHeight * 0.7);
  primes = getPrimes(toCalc);
  //put origin point in center
  r = height * 0.45;
  theta = 0;
  noStroke();
  color(255,255,255)
  frameRate(60);
  background(10);
  translate(width/2, height/2);
  for(var i = 0; i < toCalc; i++)
  {
    current = primes[i];
    let x = current * cos(current);
    let y = current * sin(current);
    //the horrific (5/exp(size)*2) is something i threw together to get exponential           //scaling
    //with the zoom at roughly the right level
    circle(x, y, (5/exp(size))*6)

  }
}

function draw() {
  //even though draw does nothing, the code breaks if you remove it
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
  
  translate(width/2, height/2);
  scale(size);
  background(10);
  //i do this only when the canvas gets zoomed out instead of in draw for performance reasons
  for(var i = 0; i < toCalc; i++)
  {
    current = primes[i];
    let x = current * cos(current);
    let y = current * sin(current);
    //the horrific (5/exp(size)*2) is something i threw together to get exponential scaling
    //with the zoom at roughly the right level
    circle(x, y, (5/exp(size))*6)
  }
  //returning false to block page scrolling
  return false; 
  
}