import React from "react";
import Board from "../Board/Board";
import Dictionary from '../Dictionary';
import { FaPlay, FaForward, FaRedoAlt } from 'react-icons/fa';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPlayers: 2, // Default (min) number of players possible
            gameStarted: false,
            gameEnded:false,
            word: "",
            indices:[]
        };
    }

    handleInputChange = (event) => {
        // Update the number of players when user changes the input
        const newValue = event.target.value;
        if (!isNaN(newValue) && newValue >= 2)
        {
            this.setState({ numPlayers: newValue });
        }
    }

    handleStartBtn = () => {
        this.setState({ gameStarted: true });
        this.generateRandWord();
    }

    handleNextWordBtn = () => {
        this.generateRandWord();
    }

    handleGameEnd = () => {
        this.setState({gameEnded: true});
    }

    generateRandWord = () => {
        const dictionaryCopy = [...Dictionary];
        const indices = this.state.indices;

        let randomIndex = Math.floor(Math.random() * dictionaryCopy.length);
        
        //generating a unique random index
        while(indices.includes(randomIndex))
        {
            randomIndex = Math.floor(Math.random() * dictionaryCopy.length);
        }
        const newIndices = [...indices, randomIndex];
        this.setState({ indices: newIndices });
        
        const word = dictionaryCopy[randomIndex];
        this.setState({ word: word});
    }

    render() {
        const { numPlayers } = this.state;
        const { gameStarted } = this.state;
        const { gameEnded } = this.state;
        const { word } = this.state;

        // Generate an array of player numbers based on numPlayers
        const playerNumbers = [];
        for (let i = 1; i <= numPlayers; i++) {
            playerNumbers.push(i);
        }
        //dynamic grid template
        let gridTemplateColumns;
        let gridTemplateRows;

        //when more than 2 players create more rows
        if (numPlayers <= 2) {
            gridTemplateColumns = `repeat(${numPlayers}, 1fr)`;
            gridTemplateRows = '1fr';
        } else {
            const numCols = 2;
            gridTemplateColumns = `repeat(${numCols}, 1fr)`;
            gridTemplateRows = `repeat(${Math.ceil(numPlayers / numCols)}, 1fr)`;
        }

        return(
            <div>
                <div className="menu-bar row">
                    <div className="input-group col input-group-custom">
                        <span className="player-label">Number of players: </span>
                        <input className="player-input rounded form-control" placeholder="Enter a number" type="number" value={numPlayers} onChange={this.handleInputChange} disabled={gameStarted}/>
                    </div>
                    <div className="col-auto row">
                        <div className="col">
                            <button className="btn btn-primary custom-btn" onClick={this.handleNextWordBtn} disabled={!gameStarted}>
                                <FaForward size={15} className="icon-style" />
                                Generate Next Word
                            </button>
                        </div>

                        <div className="col">
                            <button className="btn btn-primary custom-btn" onClick={this.handleStartBtn} disabled={gameStarted}>
                                <FaPlay size={15} className="icon-style" />
                                Start Game
                            </button>
                        </div>
                        
                        <div className="col">
                            <button className="btn btn-warning custom-btn" onClick={() => window.location.reload()}>
                                <FaRedoAlt size={15} className="icon-style" />
                                Restart
                            </button>
                        </div>
                    </div>
                    
                </div>

               <div className="game-bar row">
                <label className="word-display">{word}</label>
               </div>
                
                <div style={{ display: 'grid', gridTemplateRows, gridTemplateColumns }}>
                    {playerNumbers.map(playerNumber => (
                        <Board playerNumber={playerNumber} 
                                gameStarted={gameStarted} 
                                gameEnded={gameEnded}
                                onGameEnd={this.handleGameEnd}
                                word={word}
                                style={{ width: '100%', height: '100%' }}/>
                    ))}
                </div>
                
            </div>
        );
        
    }
}

export default Home;
