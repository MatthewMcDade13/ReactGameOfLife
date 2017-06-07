import * as React from 'react';
import { IGameOfLifeState } from '../GameOfLife';

export interface ICellProps
{
    isAlive: boolean;
    age: number;
    rowPos: number;
    colPos: number;
    gridSize: number;
    
    toggleLife(rowPos: number, colPos: number);
}


export class Cell extends React.Component<ICellProps, {}>
{

    constructor(props)
    {
        super(props);
    }

    toggleLife = () => {
        
        //this.props.toggleLife(this.props.rowPos, this.props.colPos);
        this.props.toggleLife(this.props.rowPos, this.props.colPos);
    }

   shouldComponentUpdate(nextProps, nextState)
   {
       if (this.props.isAlive === nextProps.isAlive &&
           this.props.age === nextProps.age)
       {
           return false;
       }

       return true;
   }


    render()    
    {
        
            return(
            <td className={this.props.gridSize === 120 ? "cell-small" : "cell"}
            onClick={this.toggleLife} 
            style={this.props.isAlive === true ? this.props.age >= 1 ? {"backgroundColor": "red"} : {"backgroundColor": "#ff6666"} : null}/>
        ); 
    }         
}