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
					6 - Upper Bits
				*/

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
				var bitset  = "- Settings -<br/>" + data[0] + "-bit Multiplier<br/>Input: " + decbin;
				var outputX = "- Multiplicand -<br/>Decimal: " + data[2] + "<br/>Binary: " + data[3];
				var outputY = "- Multiplier -<br/>Decimal: " + data[4] + "<br/>Binary: " + data[5];
				var outputZ = "- Upper bits: " + data[6];
				var e = "<br/><br/>";
				var output = bitset + e + outputX + e + outputY + e + outputZ;
				cs441p1_print(output);
			}

			function cs441p1_dec2bin(decimal, m) {
				var sign; var binary; var i;
				var upper = "";
				if (decimal < 0) {
					sign = 1;
					decimal = Math.abs(decimal + 1);
				} else {
					sign = 0;
				}
				binary = (decimal).toString(2);
				while (binary.length < bit) {
					binary = "0" + binary;
				}
				for (i = 0; i < bit; i++) {
					if (sign == 1) {
						if (binary[i] == "0") {
							binary[i] == "0";
						} else {
							binary[i] == "1";
						}
						upper += "1";
					} else {
						upper += "0";
					}
				}
				if (m !== undefined) {
					data[6] = upper;
				}
				return binary;
			}
			
			function cs441p1_verify() {
				var exp = bit - 1;
				var max = Math.pow(2, exp) - 1;
				var min = -1 * Math.pow(2, exp);
				var errors = [];
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
				} else {
					data[3] = cs441p1_dec2bin(x,1);
					data[5] = cs441p1_dec2bin(y);
					cs441p1_prettyPrint();
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
				data[0] = bit;
				data[1] = set;
				if (set == 1) {
					cs441p1_print("X");
				} else {
					data[2] = x;
					data[4] = y;
					cs441p1_verify();
				}
			}
			function cs441p1_reset() {
				document.getElementById("cs441p1_form").reset();
				var datalen = data.length;
				data.length = 0;
				data.length = datalen;
				cs441p1_print("");
			}
