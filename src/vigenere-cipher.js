const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {

  encrypt(text, key) {
    if (arguments !== undefined && arguments.length === 2) {
      const difLenght = Math.ceil(text.length / key.length);
      key = key.toUpperCase().repeat(difLenght);
      text = text.toUpperCase();

      const codeCharA = "A".charCodeAt(0);
      const charCount = 26;
      let res = "";
      let accDiffChar = 0;

      for (let i = 0; i < text.length; i++) {
        if (" !:,.1234)^".includes(text[i])) {
          res += text[i];
          accDiffChar += 1;
        } else {
          let letterCharIndex = text.charCodeAt(i) - codeCharA;
          let step = key.charCodeAt(i - accDiffChar) - codeCharA;

          res += String.fromCharCode(
            codeCharA + ((letterCharIndex + step) % charCount)
          );
        }
      }

      return res; 
    } else {
      throw new Error("Incorrect arguments!");
    }
  }

  decrypt(text, key) {
    if (arguments !== undefined || arguments.length === 2) {
      const difLenght = Math.ceil(text.length / key.length);
      key = key.toUpperCase().repeat(difLenght);
      text = text.toUpperCase();

      const codeCharA = "A".charCodeAt(0);
      const charCount = 26;
      let res = "";
      let accDiffChar = 0;

      for (let i = 0; i < text.length; i++) {
        if (" !:,.1234)^".includes(text[i])) {
          res += text[i];
          accDiffChar += 1;
        } else {
          let letterCharIndex = text.charCodeAt(i) - codeCharA;
          let step = key.charCodeAt(i - accDiffChar) - codeCharA;

          res += String.fromCharCode(
            codeCharA + ((letterCharIndex - step + charCount) % charCount)
          );
        }
      }

      return res;

    } else {
      throw new Error("Incorrect arguments!");
    }
  }
}

module.exports = {
  VigenereCipheringMachine
};
