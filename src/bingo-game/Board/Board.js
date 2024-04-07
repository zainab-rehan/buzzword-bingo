import React from "react";
import Square from "../Square/Square";
import Dictionary from '../Dictionary';

class Board extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.word);
        this.state = {
            squares: this.generateInitialSquares(),
            gameEnded: false,
            player: props.playerNumber,
            gameStarted: props.gameStarted,
            currentWord: props.word
        };
    }

    generateInitialSquares() {
        const squares = [];
        const dictionaryCopy = [...Dictionary];
        for (let i = 0; i < 25; i++) {
            const randomIndex = Math.floor(Math.random() * dictionaryCopy.length);
            const word = dictionaryCopy.splice(randomIndex, 1)[0];
            squares.push({ clicked: false, word });
        }
        return squares;
    }

    handleClick(i) {
        if (this.state.gameEnded) {
            // If the game has ended, do not handle further clicks
            return;
        }
        this.setState(prevState => {
            const squares = [...prevState.squares];
            if (squares[i].word != this.props.word) {
                // If the game has ended, do not handle further clicks
                return;
            }
            squares[i] = { ...squares[i], clicked: !squares[i].clicked };
            const winningLine = this.checkForBingo(squares, squares[i]);
            if (winningLine) {
                const updatedSquares = squares.map((square, index) => {
                    if (winningLine.includes(index)) {
                        return { ...square, winner: true };
                    }
                    return square;
                });
                this.setState({ gameEnded: true });
                return { squares: updatedSquares };
            } else {
                return { squares };
            }
        });
    }

    updateSquare = (index, newWord) => {
        const squaresCopy = [...this.state.squares];
        squaresCopy[index] = { ...squaresCopy[index], word: newWord };
        this.setState({ squares: squaresCopy });
    };

    renderSquare(i) {
        /*return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );*/
        const { squares } = this.state;
        const square = squares[i];
        const isWinner = square && square.winner;
        const classNames = ["square"];
        if (square && square.clicked) {
            classNames.push("clicked");
        }
        if (isWinner) {
            classNames.push("winner");
        }
        return (
            <Square
                key={i}
                value={this.state.squares[i]}
                word={square.word}
                onClick={() => this.handleClick(i)}
                className={classNames.join(" ")}
            />
        );
    }

    //function to check for bingo
    checkForBingo(squares,clickedSquare) {
        //const { squares } = this.state;
        const size = Math.sqrt(squares.length);
        
        /*const lines = [
            // Rows
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            // Columns
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            // Diagonals
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20],
        ];
        console.log(lines);
        */
        // Generate rows
         // Generate rows
        const lines = [];
            for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(i * size + j);
            }
            lines.push(row);
        }

        // Generate columns
        for (let i = 0; i < size; i++) {
            const col = [];
            for (let j = 0; j < size; j++) {
                col.push(j * size + i);
            }
            lines.push(col);
        }

        // Generate main diagonal
        const mainDiagonal = [];
        for (let i = 0; i < size; i++) {
            mainDiagonal.push(i * (size + 1));
        }
        lines.push(mainDiagonal);

        // Generate secondary diagonal
        const secondaryDiagonal = [];
        for (let i = 0; i < size; i++) {
            secondaryDiagonal.push((i + 1) * (size - 1));
        }
        lines.push(secondaryDiagonal);

        for (let line of lines) {
            //console.log(line);
            const clickedSquares = line.map(x => squares[x]);
            //console.log(clickedSquares)
            //const isBingo = clickedSquares.every(square => square.clicked);
            const isBingo = clickedSquares.every(square => square && square.clicked);
            if (isBingo) {
                console.log(line);
                return line;
            }
        }
        return null;
    }

    render() {
        //this.setState({gameStarted: this.props.gameStarted});
        const checkh = this.props.gameStarted;
        const { squares } = this.state;
        const size = 5;
        const rows = Array(size).fill(0).map((_, row) => {
            const columns = Array(size).fill(0).map((_, col) => {
                const index = row * size + col;
                return this.renderSquare(index);
            });
            return (
                <div key={row} className="board-row">
                    {columns}
                </div>
            );
        });
    
        return (
            <div>
                <div>
                {this.state.gameEnded && <h1>Bingo!</h1>}
                </div>
                <div>
                {!this.state.gameEnded && <h1>{this.state.player}</h1>}
                </div>
                <div>
                {rows}
                </div>
                
                
            </div>
        );
    }
}

export default Board;
