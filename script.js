function operate(a, b, operator){
    if(typeof b != 'number') return a;

    if(operator=="+") return (a+b);
    else if(operator=="-") return (a-b);
    else if(operator=="*") return (a*b);
    else if(operator=="/") return (a/b).toFixed(2);
}

function convertDec(num){
    let pisah=num.indexOf('.');
    if(pisah!=-1){
        let base=parseInt(num.slice(0,pisah));
        let decimal=parseInt(num.slice(pisah+1))*Math.pow(10,-(num.slice(pisah+1).length));
        console.log(base);
        console.log(decimal);
        return (base+decimal);
    }
    else return parseInt(num);
}

function commit(equation){
    let size = equation.length, index = 0, operand='', operator;
    let meetOperator = false, result='';
    while(index < size){
        if(equation[index].match(/\d|\./) && !meetOperator){
            result+=equation[index];
            index++;
        }
        else if(equation[index].match(/\d|\./) && meetOperator){
            operand+=equation[index];
            index++;
        }
        else if(equation[index].match(/[+*/\-]/) && !meetOperator){
            operator = equation[index];
            meetOperator = true;
            index++;
        }
        else{
            result = operate(convertDec(result), convertDec(operand), operator);
            operand='';
            operator = equation[index];
            index++;
        }

        if(index == size) result = operate(convertDec(result), convertDec(operand), operator);
    }
    return result;
}

const choices = document.querySelectorAll('button');
let decimalEnable=true;
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        let variable = choice.id;
        let display = document.querySelector('.display');

        if(variable.match(/[\d\(\)]/)){
            display.textContent = display.textContent+variable;
        }
        else if(variable.match(/[+*/\-]/)){
            display.textContent = display.textContent+variable;
            decimalEnable=true;
        }
        else if(variable.match(/\./) && decimalEnable){
            display.textContent = display.textContent+variable;
            decimalEnable=false;
        }
        else if(variable.match(/=/)){
            const answer = document.createElement('div');
            answer.textContent = commit(display.textContent).toString();
            display.textContent = '';
            display.appendChild(answer);

        }
        else if(variable=="ac") display.textContent = '';
        else if(variable=="del") display.textContent= display.textContent.slice(0,-1);
    });
});