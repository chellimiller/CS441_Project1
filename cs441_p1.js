window.x; window.y; window.bit; window.set;
window.data = [];
data.length = 7;
 /* Data Info:
  0 - BITS
  1 - Input (Binary - 1, Decimal - 2)
  2 - Multiplicand in decimal
  3 - Multiplicand in binary
  4 - Multiplier in decimal
  5 - Multiplier in binary
  6 - Negative multiplier
 */
window.steps = [];
function cs441p1_print(output) {
 document.getElementById("cs441p1_output").innerHTML = output;
}
function cs441p1_error(messages) {
 var output = "Please fix the following issues:</br>";
 for (i = 0; i < messages.length; i++) {
  output += messages[i] + "<br/>";
 }
 cs441p1_print(output); 
}
function cs441p1_prettyPrint() {
 var decbin;
 if (set == 1) {
  decbin = "Binary";
 } else {
  decbin = "Decimal";
 }
 var t = "<table>";
 var te = "</table>";
 var tr = "<tr>";
 var trn = "</tr><tr>";
 var tre = "</tr>";
 var br = "<br/>";
 var td = "<td>";
 var tdl = '<td id=".cs441p1_tleft">';
 var tdr = '<td id=".cs441p1_tright">';
 var tde = "</td>";
 var tdn = "</td><td>";
 
 var out1 = "<h1>-Output-</h1>" + t;
 var row1 = tr + tdl + "Input:" + tde + tdr + data[0] + "-bit" + br + decbin + tde + tre;
 
 var row2a = tr + tdl + "Multiplicand - " + tdn + tde + trn;
 var row2b = tdl + "Decimal:" + tde + tdr + data[2] + tde + trn;
 var row2c = tdl + "Binary:" + tde + tdr + data[3] + tde + tre;
 
 var row3a = tr + tdl + "Multiplier - " + tdn + tde + trn;
 var row3b = tdl + "Decimal:" + tde + tdr + data[4] + tde + trn;
 var row3c = tdl + "Binary:" + tde + tdr + data[5] + tde + trn;
 var row3d = tdl + "Two's Complement:" + tde + tdr + data[6] + tde + tre;
 
 var row45 = tr + trn + tdl + "Steps - " + tdn + tde;
 
 var rows15 = out1 + row1 + row2a + row2b + row2c + row3a + row3c + row3d + row45;
 
 var p = 0;
 var row6on = "";
 
 while (p < steps.length) {
  row6on += trn + tdl + steps[p] + tde + tdr + steps[p + 1] + tde;
  p = p + 2;
 }
 
 var output = rows15 + row6on + tre + te;
 
 cs441p1_print(output);
}   
function cs441p1_dec2bin(decimal) {
 var sign;
 var binary;
 if (decimal < 0) {
  sign = 1;
  decimal = Math.abs(decimal + 1);
 } else {
  sign = 0;
 }
 binary = (decimal).toString(2);
 while (binary.length < bit) {
  binary= "0" + binary;
 }
 if (sign == 1) {
  binary = cs441p1_twosComp(binary);
 }
 return binary;
}
function cs441p1_twosComp(originalBinary) {
 var convertedBinary = "";
 var binary = "";
 var i;
 for (i in originalBinary) {
  if (originalBinary[i] == "0") {
   convertedBinary += "1";
  } else {
   convertedBinary += "0";
  }
 }
 return convertedBinary;
}
function cs441p1_boothAdd(product, multiplier){
 var newProduct; 
 var endBit = bit - 1;
 var upper = product.substring(0, bit);
 var addU = parseInt(upper, 2);
 var addM = parseInt(multiplier, 2);
 var sumD = addU + addM;
 var sumB = cs441p1_dec2bin(sumD);
 if (sumB.length > bit) {
  newProduct = sumB.slice(1) + product.slice(bit);
 } else {
  newProduct = sumB + product.slice(bit);
 }
 return newProduct;
}
function cs441p1_boothsAlgorithm(){
 var i;
 var mX = data[3];
 var mY = data[5];
 var product = "";
 var boothBit = 0;
 var lastBit = bit + bit - 1;
 var negmY = data[6];
 // Setup binary for Booth's Algorithm (add 0's or 1's to front)
 for (i = 0; i < bit; i++) {
  product += "0";
 }
 product += mX;
 steps.push("Starting Out: ");
 steps.push(product);
 
 for (i = 0; i < bit; i++) {
  var lastChar = product.slice(-1);
  if (lastChar > boothBit) {
   product = cs441p1_boothAdd(product, negmY);
   steps.push("Subtract: ");
   steps.push(product);
  } else if (lastChar < boothBit) {
   product = cs441p1_boothAdd(product, mY)
   steps.push("Add: ");
   steps.push(product);
  }
  
  boothBit = lastChar;
  product = product[0] + product;
  product = product.slice(0, -1);
  steps.push("Shift: ");
  steps.push(product);
 }
  
 steps.push("Final Product (Binary): ");
 steps.push(product);
 if (product[0] == "1") {
  var dec = parseInt(cs441p1_twosComp(product), 2) + 1;
  dec = 0 - dec;
 } else {
  var dec = parseInt(product, 2);
 }
 steps.push("Final Product (Decimal): ");
 steps.push(dec);
} 
function cs441p1_verify() {
 var exp = bit - 1;
 var max = Math.pow(2, exp) - 1;
 var min = -1 * Math.pow(2, exp);
 var errors = [];
 if (set == 1) {
  //Code for determining binary or decimal input
  //Nothing here, return error
  errors.push("Please use decimal input");
 } else {
  data[0] = bit;
  data[1] = set;
  data[2] = x;
  data[4] = y;
 }
 if (!Number.isInteger(x)) {
  errors.push("The multiplicand should be an integer");
 }
 if (!Number.isInteger(y)) {
  errors.push("The multiplier should be an integer");
 }
 if (x < min || x > max) {
  errors.push("The multiplicand is out of range");
 }
 if (y < min || y > max) {
  errors.push("The multiplier is out of range");
 }
 if (errors.length > 0) {
  cs441p1_error(errors);
  return false;
 } else if (set == 0) {
  data[3] = cs441p1_dec2bin(x);    
  data[5] = cs441p1_dec2bin(y);
  data[6] = cs441p1_dec2bin(-y);
  return true;
 } else {
  //Code for determining binary or decimal input
  //Nothing here, return true anyway
  return true;
 }
}
function cs441p1_submit() {
 var input = document.getElementById("cs441p1_form").elements;
 var xIN = input[0].value;
 var yIN = input[1].value;
 x = parseInt(xIN, 10);
 y = parseInt(yIN, 10);
 bit = 8;
 set = 0;
 
 cs441p1_reset();
 
 if (cs441p1_verify() == true) {
  cs441p1_boothsAlgorithm();
  cs441p1_prettyPrint();
 }
}
function cs441p1_reset() {
 document.getElementById("cs441p1_form").reset();
 data = [];
 steps = [];
 cs441p1_print("");
}
