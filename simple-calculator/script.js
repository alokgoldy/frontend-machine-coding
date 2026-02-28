const resultBox = document.getElementById('result')

function calc(arg) {
    resultBox.value += arg;
}

function solve() {
    const val = resultBox.value;
    const res = eval(val);
    resultBox.value = res;
}
// / comment
function clr() {
    resultBox.value = '';
}