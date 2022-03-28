/**
 * BASIC V1.0 - 2022
 * 
 * NOTES:
 * Internal/private functions are denoted with an underscore
 */
class BASIC {

    inputElem = document.getElementById('input');
    stackPointer = null;
    stack = [];
    vars = [];
    tokens = [];

    /**
     * Kick off script to run the interpreter
     */
    Run() {

        let inputString = inputElem.value;
        let commandsArray = inputString.value.replace(/\r\n/g,"\n").split("\n");

    }

    /**
     * 
     * @param {String} inputString The line that we need to lex. In this process we take a string
     * and break it into parts or tokens. This is then fed into the Parser, which takes the
     * instructions and runs them. Our tokens are held in an array.
     * 
     * We need to be able to identify:
     * Operators: +-/*><%=()"
     * Identifiers: strings with no whitespace
     * Whitespace: which we can just skip  
     * 
     * @param {String} inputString The line that we are lexing
     */
    Lexer(inputString) {
        
        this._emptyTokens();

        for (let i = 0; i < inputString.length; i++)
        {
            // If we hit an identifier, add it to a string,
            // and then keep adding strings until we don't anymore.
            if (this._lexIsIdentifier(inputString[i])) {
                let token = {
                    type: 'identifier',
                    value: ''
                };

                let tmpIdentifier = inputString[i];
                i++;

                while(this._lexIsIdentifier(inputString[i])) {

                    tmpIdentifier += inputString[i];
                    i++;
                }

                this._pushToken('identifier', tmpIdentifier);
            }

            // If we hit an digit, add it to a string,
            // and then keep adding strings until we don't anymore.
            if (this._lexIsDigit(inputString[i])) {

                let tmpNumeric = inputString[i];
                i++;

                while(this._lexIsDigit(inputString[i])) {

                    tmpNumeric += inputString[i];
                    i++;
                }

                this._pushToken('numeric', tmpNumeric);
            }

            // If we hit an opening quote, add subsequent 
            // characters to the string until we hit the
            // end quote.
            if (this._lexIsString(inputString[i])) {

                let tmpString = '';
                i++;

                while(!this._lexIsString(inputString[i])) {

                    tmpString += inputString[i];
                    i++;
                }

                this._pushToken('string', tmpString);
            }
        }
    }

    _pushToken(type, value) {
        this.tokens.push({'type': type, 'value': value});
    }

    _getTokens(){
        return this.tokens;
    }

    _emptyTokens() {
        this.tokens = [];
        return true;
    }
    /**
     * _lexIsOperator - Lexer function for checking if the character is an operator
     * we should only really ever get one of these at a time.
     * 
     * @param {String} char The character that we are testing against
     * @returns Boolean
     */
    _lexIsOperator(char)
    {
        return char.match(/\+|\-|\=|<|>|%|\(|\)|\*/i);
    }

    /**
     * _lexIsIdentifier - Lexer function for checking if the character
     * is an Identifier. We assume it's an identifier if its a string
     * character without a quote in front of it. If it is, then we
     * can just stick these things together until we hit something
     * that's not a string character.
     * @param {String} char The character we are testing
     * @returns boolean
     */
    _lexIsIdentifier(char)
    {
        return char.match(/[A-Z]/i);
    }

    /**
     * _lexIsString - here we test to see if the character is a quote.
     * Then, if it is, we can continue with a while not is quote and 
     * just add characters to the string.
     * @param {char} char The character we are testing against
     * @returns boolean
     */
    _lexIsString(char)
    {
        return char.match(/"/)
    }

    /**
     * _lexIsDigit - Here we are testing if our character is a
     * digit, either 0-9 or a decimal. We can just glue these
     * together until we hit a not digit.
     * 
     * @param {char} char The character we are testing against
     * @returns boolean
     */
    _lexIsDigit(char)
    {
        return char.match(/[0-9\.]/);
    }

    Parser(LexObj = null) {}
    /*************************************************************
     * BASIC COMMANDS
     * A subset of standard BASIC commands
     * taken from here:
     * https://en.wikipedia.org/wiki/BASIC#Typical_BASIC_keywords
     * 
     * We'll use these as our starting point.
     **************************************************************/

    /*****************
     * Data Structures
     *****************/
    /**
     * LET assign a variable
     * @param {varName} varName The name of the variable
     * @param {mixed} value The variable's value. Should be scalar
     */
    LET(varName = '', value = null){

        this.vars[varName] = value;
    }

    DATA(){}
    READ(){}
    RESTORE(){}
    DIM(){}

    /**************
     * Control flow
     **************/
    IF(){}
    THEN(){}
    FOR(){}
    TO(){}
    STEP(){}
    DO(){}
    UNTIL(){}
    GOTO(){}
    GOSUB(){}
    RETURN(){}

    /******************
     * Input and Output
     ******************/
    LIST(){}
    PRINT(){}
    INPUT(){}
    TAB(){}
    SPC(){}

    /*******
     * Math
     *******/
    ABS(){}
    ATN(){}
    COS(){}
    EXP(){}
    INT(){}
    LOG(){}
    RND(){}
    SIN(){}
    SQR(){}
    TAN(){}
}
