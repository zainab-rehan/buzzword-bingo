import React from "react";
import Board from "../Board/Board";
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPlayers: 2, // Default (min) number of players possible
            gameStarted: false,
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

    handleStartBtn = (event) => {
        this.setState({ gameStarted: true });
    }

    render() {
        const { numPlayers } = this.state;

        // Generate an array of player numbers based on numPlayers
        const playerNumbers = Array.from({ length: numPlayers }, (_, index) => index + 1);

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
                    <div className="input-group flex-nowrap col">
                        <label className="player-label">Number of players: </label>
                        <input className="player-input rounded" type="number" value={numPlayers} onChange={this.handleInputChange} disabled={this.state.gameStarted}/>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary custom-btn" onClick={this.handleStartBtn} disabled={this.state.gameStarted}>
                            Start
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-warning custom-btn" onClick={() => window.location.reload()}>
                            Restart
                        </button>
                    </div>
                </div>
               
                
                <div style={{ display: 'grid', gridTemplateRows, gridTemplateColumns }}>
                    {playerNumbers.map(playerNumber => (
                        <Board key={playerNumber} playerNumber={playerNumber} style={{ width: '100%', height: '100%' }}/>
                    ))}
                </div>
                
            </div>
        );
        
    }
}

export default Home;
