import React from "react";
import {Button} from "@mui/material";
import './Square.css';

class Square extends React.Component {
    render() {
        //const { value, onClick, word, className } = this.props;
        
        const value = this.props.value;
        const onClick = this.props.onClick;
        const word = this.props.word;
        const className = this.props.className;
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




