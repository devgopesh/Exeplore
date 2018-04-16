function VictoryCelebrator(input_handler) {
  this.input_handler = input_handler;
}


VictoryCelebrator.prototype.on_victory = function() {
  this.input_handler.disable_input();
  clearInterval(id);
  var maxScore = document.querySelector('#maxScore');
  var v = document.getElementById('victory-notification');
  if (localStorage.getItem('t1') == 1) {
  	if (localStorage.mathT1) {
        localStorage.mathT1 = Number(localStorage.mathT1)+1;
    } else {
        localStorage.mathT1 = 1;
    }
    if (localStorage.mathT1 === 1) {
        localStorage.setItem('maxMathScoreT1', (80-p)*10);    
    } else {
        var q = localStorage.getItem('maxMathScoreT1');
        if ((80-p)*10 > q)
            localStorage.setItem('maxMathScoreT1', (80-p)*10);
    }
    maxScore.textContent = "Max Score: " + localStorage.getItem('maxMathScoreT1');
  }
  if (localStorage.getItem('t2') == 1) {
  	if (localStorage.mathT2) {
        localStorage.mathT2 = Number(localStorage.mathT2)+1;
    } else {
        localStorage.mathT2 = 1;
    }
    if (localStorage.mathT2 === 1) {
        localStorage.setItem('maxMathScoreT2', (250-p)*10);    
    } else {
        var q = localStorage.getItem('maxMathScoreT2');
        if ((250-p)*10 > q)
            localStorage.setItem('maxMathScoreT2', (250-p)*10);
    }
    maxScore.textContent = "Max Score: " + localStorage.getItem('maxMathScoreT2');
  }
  if (localStorage.getItem('t3') == 1) {
  	if (localStorage.mathT3) {
        localStorage.mathT3 = Number(localStorage.mathT3)+1;
    } else {
        localStorage.mathT3 = 1;
    }
    if (localStorage.mathT3 === 1) {
        localStorage.setItem('maxMathScoreT3', (500-p)*10);    
    } else {
        var q = localStorage.getItem('maxMathScoreT3');
        if ((500-p)*10 > q)
            localStorage.setItem('maxMathScoreT3', (500-p)*10);
    }
    maxScore.textContent = "Max Score: " + localStorage.getItem('maxMathScoreT3');
  }
  v.style.display = 'block';
}
