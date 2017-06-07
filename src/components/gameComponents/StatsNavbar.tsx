import * as React from 'react';

export interface IStatsNavbarProps
{
    generation: number;
    size: number;
    speed: number;
}

export function StatsNavbar(props: IStatsNavbarProps)
{
    let speed: string = "";
    let size: string = "";

    switch (props.size)
    {
        //small
        case 25:
            size = "Small";
            break;
        //medium
        case 40:
            size = "Medium"
            break;
        //large
        case 75:
            size = "Large";
            break;
        //massive
        case 100:
            size = "Massive";
            break;
    }

    switch (props.speed)
    {
        //slow
        case 400:
            speed = "Slow";
            break;
        //medium
        case 250:
            speed = "Medium";
            break;
        //fast
        case 50:
            speed = "Fast";
            break;
        //warp speed
        case 0:
            speed = "Warp Speed";
            break;
    }

    return(
        <div>
            <nav className="navbar fixed-top navbar-toggleable-md navbar-inverse bg-inverse">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">Conway's Game of Life</a>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        Generation: <span className="statValue">{props.generation}&nbsp;</span>
                    </li>
                    <li className="nav-item active">
                        Game Size: <span className="statValue">{size}&nbsp;</span>
                    </li>
                    <li className="nav-item active">
                        Game Speed: <span className="statValue">{speed}&nbsp;</span>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
    );
}