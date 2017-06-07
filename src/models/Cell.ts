export class CellModel
{
     isAlive: boolean;
     age: number;

    constructor(isAlive: boolean = false)
    {
        this.isAlive = isAlive;
          
        this.age = 0;
    }


    private updateCellState(neighbors: number): void
    {
        if (this.isAlive && (neighbors === 2 || neighbors == 3))
        {
            this.age++;
            return;
        }
        if (!this.isAlive && neighbors === 3)
        {
            this.isAlive = true;
        }
        else if (neighbors > 3 || neighbors <= 1)
        {
            this.isAlive = false;
            this.age = 0;
        }
    }

    updateCell(currentGrid: Array<Array<CellModel>>, y: number, x: number): void
    {
        let neighbors: number = 0;

        //Check right 
        try
        {
            if (currentGrid[y][x + 1].isAlive)
            {
                neighbors++;
            }
        }
        catch (exception) {}           

        //Check top right
        try
        {
            if (currentGrid[y - 1][x + 1].isAlive)
            {
                neighbors++;
            }
        }
        catch (exception) {}        

        //Check Top
        try
        {
            if (currentGrid[y - 1][x].isAlive)
            {
                neighbors++;
            }
        }
        catch (exception) {}       

        //Check Top left
        try
        {
            if (currentGrid[y - 1][x - 1].isAlive)
            {
                neighbors++;
            }
        }
        catch (exception) {}
        
        //Check Bottom Right
        try
        {
            if (currentGrid[y + 1][x + 1].isAlive)
            {
                neighbors++;
            }
        }
        catch (exception) {}
        
        //Check Bottom
        try
        {
            if (currentGrid[y + 1][x].isAlive)
            {
                neighbors++;
            }
        }
        catch (exception) {}
        
        //Check Bottom Left
        try
        {
            if(currentGrid[y + 1][x - 1].isAlive)
            {
                neighbors++;
            }
        }
        catch (exception) {}
    
        //Check Left
        try
        {
            if (currentGrid[y][x - 1].isAlive)
            {
                neighbors++;
            }
        }
        catch (exception) {}
        
        this.updateCellState(neighbors);
    }
}