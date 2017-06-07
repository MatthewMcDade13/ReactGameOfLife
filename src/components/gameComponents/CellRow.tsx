import * as React from 'react';

export interface ICellRowProps
{
    children?: any;
}

export function CellRow(props: ICellRowProps)
{
    return(
        <tr>
            {props.children}
        </tr>
    );
}