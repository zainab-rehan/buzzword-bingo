import React from "react";
import {Button} from "@mui/material";
import './Square.css';

class Square extends React.Component {
    render() {
        /*return (
            <Button
                className="square"
                onClick={() => this.props.onClick()}
                variant={this.props.value ? "contained":"outlined"}
            >
                "word"
            </Button>
        );*/
        const { value, onClick, word, className } = this.props;
        //console.log(value);
        //console.log(onClick);
        //console.log(className);
        return (
            <Button
            className={className}
            onClick={onClick}
            variant={value.clicked ? "contained" : "outlined"}
            disabled={value.clicked || className.includes("winner") ? true : false} // Disable button if square is already clicked or part of winning line
            >
                {word}
            </Button>
        );
    }
}

export default Square;




