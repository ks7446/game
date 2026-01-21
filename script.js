document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 8;
    const squares = [];
    let score = 0;

    const candyColors = ['red', 'yellow', 'orange', 'purple', 'green', 'blue'];

    // १. बोर्ड तयार करणे
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundColor = candyColors[randomColor];
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();

    // २. ड्रॅगिंग लॉजिक (Draggable logic)
    let colorBeingDragged, colorBeingReplaced, squareIdBeingDragged, squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragover', e => e.preventDefault()));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id);
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
        checkMatches();
    }

    // ३. ३ रंगांची जोडी तपासणे (Check for 3 matches)
    function checkMatches() {
        for (let i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundColor;
            
            // आडवी ओळ (Rows) तपासणे
            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor)) {
                score += 3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach(index => squares[index].style.backgroundColor = '');
            }
        }
    }

    // दर १०० मिलिसेकंदला चेक करत राहा
    window.setInterval(function(){
        checkMatches();
    }, 100);
});