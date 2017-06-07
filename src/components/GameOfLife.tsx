import * as React from 'react';
import { Cell } from './gameComponents/Cell';
import { CellModel } from '../models/Cell';
import { CellRow } from './gameComponents/CellRow';
import { ButtonMenu } from './gameComponents/ButtonMenu';
import { StatsNavbar } from './gameComponents/StatsNavbar';

export interface IGameOfLifeProps
{

}

export interface IGameOfLifeState
{
    grid: Array<Array<CellModel>>;
    gridCopy: Array<Array<CellModel>>;
    speed: number;  //In milliseconds
    size: number;
    generation: number;
}


export class GameOfLife extends React.Component<IGameOfLifeProps, IGameOfLifeState>
{
    interval: any = null;

    constructor(props)
    {
        super(props);

        let newGrid: Array<Array<CellModel>> = [];
        let newGridCopy: Array<Array<CellModel>> = [];
        let defaultSize: number = 75;
        let defaultSpeed: number = 50;

        for (let i = 0; i < defaultSize; i++)
        {
            let row: Array<CellModel> = [];
            let rowCopy: Array<CellModel> = [];

            for (let j = 0; j < defaultSize; j++)
            {
                row.push(new CellModel());
                rowCopy.push(new CellModel());
            }

            newGrid.push(row);
            newGridCopy.push(rowCopy);
        }

        this.state = {
            grid: newGrid,
            gridCopy: newGridCopy,
            speed: defaultSpeed,
            size: defaultSize,
            generation: 0
        };
    }


    componentDidMount()
    {
        this.randomizeBoard()
        this.startGame();
    }

    setGameSpeed = (event: any) => 
    {
        let buttonValue = event.target.value;
        let newSpeed: number = -1;

        if (buttonValue === "Slow")
        {
            newSpeed = 400;
        }
        else if (buttonValue === "Medium")
        {
            newSpeed = 250;
        }
        else if (buttonValue === "Fast")
        {
            newSpeed = 50;
        }
        else if (buttonValue === "Warp Speed")
        {
            newSpeed = 0;
        }

        this.setState({
            speed: newSpeed
        }, () => {
            //If game is running after we set new speed,
            //pause the game(clear the current interval) and start the game again
            //with new interval
            if (this.interval)
            {
                this.pauseGame();
                this.startGame();
            }
        });
    }

    setGridSize = (event: any) =>
    {
        let newGrid: Array<Array<CellModel>> = [];
        let newGridCopy: Array<Array<CellModel>> = [];
        let buttonValue = event.target.value;
        let gridSize: number = -1;

        if (this.interval)
        {
            this.pauseGame();
        }

        if (buttonValue === "Small")
        {
            gridSize = 25;
        }
        else if (buttonValue === "Medium")
        {
            gridSize = 40;
        }
        else if (buttonValue === "Large")
        {
            gridSize = 75;
        }
        else if (buttonValue === "Massive")
        {
            gridSize = 100;
        }

        for (let i = 0; i < gridSize; i++)
        {
            let row: Array<CellModel> = [];
            let rowCopy: Array<CellModel> = [];

            for (let j = 0; j < gridSize; j++)
            {
                row.push(new CellModel());
                rowCopy.push(new CellModel());
            }

            newGrid.push(row);
            newGridCopy.push(rowCopy);
        }

        this.setState({
                grid: newGrid,
                gridCopy: newGridCopy,
                size: gridSize,
                generation: 0
        });
    }

    pauseGame = () =>
    {
        clearInterval(this.interval);
        this.interval = null;
    }

    startGame = () =>
    {

        if (this.interval !== null)
        {
            return;
        }

        this.interval = setInterval(() => {
            //Set a copy of the current grid
             let nextGenGrid: Array<Array<CellModel>> = this.state.gridCopy;

            //Iterate through all the cells on the grid
            for (let r = 0; r < this.state.grid.length; r++)
            {
               for (let c = 0; c < this.state.grid[0].length; c++)
               {                  
                   nextGenGrid[r][c].updateCell(this.state.grid, r, c);                                  
               }
            }

            let updatedGrid: Array<Array<CellModel>> = this.updateGrid(nextGenGrid);

            this.setState({
                grid: updatedGrid,
                gridCopy: nextGenGrid,
                generation: this.state.generation + 1
            });

        }, this.state.speed);
    }

    updateGrid = (gridCopy: Array<Array<CellModel>>) => {
        let newCurrentGrid: Array<Array<CellModel>> = this.state.grid;

        //Loop through the current copy of the grid and copy its values to the current grid
        for (let r = 0; r < newCurrentGrid.length; r++)
        {
            for (let c = 0; c < newCurrentGrid[0].length; c++)
            {
                newCurrentGrid[r][c].isAlive = gridCopy[r][c].isAlive;
                newCurrentGrid[r][c].age = gridCopy[r][c].age;
            }
        }

        return newCurrentGrid;
    }

    clearBoard = () => 
    {
        if (this.interval)
        {
            this.pauseGame();
        }

        let cleanGrid: Array<Array<CellModel>> = this.state.grid;
        let cleanGridCopy: Array<Array<CellModel>> = this.state.gridCopy;

        for (let r = 0; r < this.state.size; r++)
        {
            for (let c = 0; c < this.state.size; c++)
            {
                //Reset grid and its copy to default values
                cleanGrid[r][c].isAlive = false;
                cleanGrid[r][c].age = 0;

                cleanGridCopy[r][c].isAlive = false;
                cleanGridCopy[r][c].age = 0;
            }
        }

        this.setState({
            grid: cleanGrid,
            gridCopy: cleanGridCopy,
            generation: 0
        });
    }

    randomizeBoard = () =>
    {
        this.clearBoard();
        
        let newBoard: Array<Array<CellModel>> = this.state.grid;
        let newBoardCopy: Array<Array<CellModel>> = this.state.gridCopy;

        for (let r = 0; r < this.state.grid.length; r++)
        {
            for (let c = 0; c < this.state.grid[r].length; c++)
            {
                if (Math.random() < 0.4)
                {
                    newBoard[r][c].isAlive = true;
                    newBoardCopy[r][c].isAlive = true;
                }
            }
        }

        this.setState({
            grid: newBoard,
            gridCopy: newBoardCopy
        });

    }

    toggleLife = (rowPos: number, colPos: number) =>
    {
        let newGrid = this.state.grid;
        let newGridCopy = this.state.gridCopy;

        newGrid[rowPos][colPos].isAlive = !newGrid[rowPos][colPos].isAlive;
        newGridCopy[rowPos][colPos].isAlive = !newGridCopy[rowPos][colPos].isAlive;

        this.setState({
            grid: newGrid,
            gridCopy: newGridCopy            
        });     
    }

    render() {

        let keyCounter = 0;

        return (
            <div className="container-fluid">
                <StatsNavbar generation={this.state.generation}
                             size={this.state.size}
                             speed={this.state.speed}/>
                <table>
                    <tbody>
                   {
                       this.state.grid.map((rows, rowIndex) => 
                               <CellRow key={rowIndex + 1}>{rows.map((cell, colIndex) => 
                                   <Cell key={keyCounter++} toggleLife={this.toggleLife}
                                    rowPos={rowIndex} colPos={colIndex}
                                    gridSize={this.state.size} {...cell}/>)}</CellRow>)
                   }
                   </tbody>
                </table>
                <ButtonMenu startGame={this.startGame}
                            pauseGame={this.pauseGame}
                            setGridSize={this.setGridSize}
                            setGameSpeed={this.setGameSpeed}
                            clearBoard={this.clearBoard}
                            randomizeBoard={this.randomizeBoard} />
            </div>
        );
    }
}