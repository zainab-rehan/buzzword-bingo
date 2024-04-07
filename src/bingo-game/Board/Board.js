import React from "react";
import Square from "../Square/Square";
import Dictionary from '../Dictionary';
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: this.generateInitialSquares(),
            player: props.playerNumber,
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

    handleClick(index) {
        if (!this.props.gameStarted || this.props.gameEnded) {
            // If the game has not yet started or has ended, do not handle further clicks
            console.log("game ended");
            return;
        }
        this.setState(prevState => {
            const squares = [...prevState.squares];
            /*if (squares[i].word !== this.props.word) {
                // If the clicked word doesnot match the word generator, do not handle further clicks
                return;
            }*/
            squares[index] = { ...squares[index], clicked: !squares[index].clicked };
            const winningLine = this.checkForBingo(squares);

            if (winningLine) {
                const updatedSquares = squares.map((square, index) => {
                    if (winningLine.includes(index)) {
                        return { ...square, winner: true };
                    }
                    return square;
                });
                //this.setState({ gameEnded: true });
                this.props.onGameEnd();
                return { squares: updatedSquares , gameEnded: true};
            } else {
                return { squares };
            }
        });
    }

    renderSquare(index) {
        const { squares } = this.state;
        const square = squares[index];
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
                key={index}
                value={this.state.squares[index]}
                word={square.word}
                onClick={() => this.handleClick(index)}
                className={classNames.join(" ")}
            />
        );
    }

    //function to check for bingo
    checkForBingo(squares) {
        const size = Math.sqrt(squares.length);
        
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

        for (const line of lines) {
            const clickedSquares = line.map(x => squares[x]);
            const isBingo = clickedSquares.every(square => square.clicked);
            if (isBingo) {
                return line;
            }
        }
        return null;
    }

    render() {
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
                    {this.state.gameEnded && <h1 className="bingo-heading">BINGO!</h1>}
                </div>
                <div>
                    {!this.state.gameEnded && <h1>{"Player "+this.state.player}</h1>}
                </div>
                <div>
                    {rows}
                </div>
            </div>
        );
    }
}

export default Board;
