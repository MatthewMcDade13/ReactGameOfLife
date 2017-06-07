import * as React from 'react';

export interface IButtonMenuProps
{
    startGame();
    pauseGame();
    setGridSize(event: any);
    setGameSpeed(event: any);
    clearBoard();
    randomizeBoard();
}

export function ButtonMenu(props: IButtonMenuProps)
{
    return(
            <div id="buttonArea" className="row">
                <div className="col-lg-3">
                    <h6>Start/Stop</h6>           
                    <button className="btn btn-secondary" onClick={props.startGame}>Start</button>
                    <button className="btn btn-secondary" onClick={props.pauseGame}>Pause</button>
                </div>
                <div className="col-lg-3">
                    <h6>Board Size</h6>
                    <button className="btn btn-secondary" onClick={props.setGridSize} value="Small">Small</button>
                    <button className="btn btn-secondary" onClick={props.setGridSize} value="Medium">Medium</button>
                    <button className="btn btn-secondary" onClick={props.setGridSize} value="Large">Large</button>
                    <button className="btn btn-secondary" onClick={props.setGridSize} value="Massive">Massive</button>
                </div>
                <div className="col-lg-3">
                    <h6>Game Speed</h6>
                    <button className="btn btn-secondary" onClick={props.setGameSpeed} value="Slow">Slow</button>
                    <button className="btn btn-secondary" onClick={props.setGameSpeed} value="Medium">Medium</button>
                    <button className="btn btn-secondary" onClick={props.setGameSpeed} value="Fast">Fast</button>
                    <button className="btn btn-secondary" onClick={props.setGameSpeed} value="Warp Speed">Warp Speed</button>
                </div>
                <div className="col-lg-3">
                    <h6>Clear/Randomize</h6>
                    <button className="btn btn-secondary" onClick={props.clearBoard}>Clear Board</button>
                    <button className="btn btn-secondary" onClick={props.randomizeBoard}>Randomize</button> 
                </div>                                                                
            </div>                           
    );
}