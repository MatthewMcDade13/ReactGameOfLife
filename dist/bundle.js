/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Cell_1 = __webpack_require__(3);
var Cell_2 = __webpack_require__(6);
var CellRow_1 = __webpack_require__(4);
var ButtonMenu_1 = __webpack_require__(7);
var StatsNavbar_1 = __webpack_require__(8);
var GameOfLife = (function (_super) {
    __extends(GameOfLife, _super);
    function GameOfLife(props) {
        var _this = _super.call(this, props) || this;
        _this.interval = null;
        _this.setGameSpeed = function (event) {
            var buttonValue = event.target.value;
            var newSpeed = -1;
            if (buttonValue === "Slow") {
                newSpeed = 400;
            }
            else if (buttonValue === "Medium") {
                newSpeed = 250;
            }
            else if (buttonValue === "Fast") {
                newSpeed = 50;
            }
            else if (buttonValue === "Warp Speed") {
                newSpeed = 0;
            }
            _this.setState({
                speed: newSpeed
            }, function () {
                //If game is running after we set new speed,
                //pause the game(clear the current interval) and start the game again
                //with new interval
                if (_this.interval) {
                    _this.pauseGame();
                    _this.startGame();
                }
            });
        };
        _this.setGridSize = function (event) {
            var newGrid = [];
            var newGridCopy = [];
            var buttonValue = event.target.value;
            var gridSize = -1;
            if (_this.interval) {
                _this.pauseGame();
            }
            if (buttonValue === "Small") {
                gridSize = 25;
            }
            else if (buttonValue === "Medium") {
                gridSize = 40;
            }
            else if (buttonValue === "Large") {
                gridSize = 75;
            }
            else if (buttonValue === "Massive") {
                gridSize = 100;
            }
            for (var i = 0; i < gridSize; i++) {
                var row = [];
                var rowCopy = [];
                for (var j = 0; j < gridSize; j++) {
                    row.push(new Cell_2.CellModel());
                    rowCopy.push(new Cell_2.CellModel());
                }
                newGrid.push(row);
                newGridCopy.push(rowCopy);
            }
            _this.setState({
                grid: newGrid,
                gridCopy: newGridCopy,
                size: gridSize,
                generation: 0
            });
        };
        _this.pauseGame = function () {
            clearInterval(_this.interval);
            _this.interval = null;
        };
        _this.startGame = function () {
            if (_this.interval !== null) {
                return;
            }
            _this.interval = setInterval(function () {
                //Set a copy of the current grid
                var nextGenGrid = _this.state.gridCopy;
                //Iterate through all the cells on the grid
                for (var r = 0; r < _this.state.grid.length; r++) {
                    for (var c = 0; c < _this.state.grid[0].length; c++) {
                        nextGenGrid[r][c].updateCell(_this.state.grid, r, c);
                    }
                }
                var updatedGrid = _this.updateGrid(nextGenGrid);
                _this.setState({
                    grid: updatedGrid,
                    gridCopy: nextGenGrid,
                    generation: _this.state.generation + 1
                });
            }, _this.state.speed);
        };
        _this.updateGrid = function (gridCopy) {
            var newCurrentGrid = _this.state.grid;
            //Loop through the current copy of the grid and copy its values to the current grid
            for (var r = 0; r < newCurrentGrid.length; r++) {
                for (var c = 0; c < newCurrentGrid[0].length; c++) {
                    newCurrentGrid[r][c].isAlive = gridCopy[r][c].isAlive;
                    newCurrentGrid[r][c].age = gridCopy[r][c].age;
                }
            }
            return newCurrentGrid;
        };
        _this.clearBoard = function () {
            if (_this.interval) {
                _this.pauseGame();
            }
            var cleanGrid = _this.state.grid;
            var cleanGridCopy = _this.state.gridCopy;
            for (var r = 0; r < _this.state.size; r++) {
                for (var c = 0; c < _this.state.size; c++) {
                    //Reset grid and its copy to default values
                    cleanGrid[r][c].isAlive = false;
                    cleanGrid[r][c].age = 0;
                    cleanGridCopy[r][c].isAlive = false;
                    cleanGridCopy[r][c].age = 0;
                }
            }
            _this.setState({
                grid: cleanGrid,
                gridCopy: cleanGridCopy,
                generation: 0
            });
        };
        _this.randomizeBoard = function () {
            _this.clearBoard();
            var newBoard = _this.state.grid;
            var newBoardCopy = _this.state.gridCopy;
            for (var r = 0; r < _this.state.grid.length; r++) {
                for (var c = 0; c < _this.state.grid[r].length; c++) {
                    if (Math.random() < 0.4) {
                        newBoard[r][c].isAlive = true;
                        newBoardCopy[r][c].isAlive = true;
                    }
                }
            }
            _this.setState({
                grid: newBoard,
                gridCopy: newBoardCopy
            });
        };
        _this.toggleLife = function (rowPos, colPos) {
            var newGrid = _this.state.grid;
            var newGridCopy = _this.state.gridCopy;
            newGrid[rowPos][colPos].isAlive = !newGrid[rowPos][colPos].isAlive;
            newGridCopy[rowPos][colPos].isAlive = !newGridCopy[rowPos][colPos].isAlive;
            _this.setState({
                grid: newGrid,
                gridCopy: newGridCopy
            });
        };
        var newGrid = [];
        var newGridCopy = [];
        var defaultSize = 75;
        var defaultSpeed = 50;
        for (var i = 0; i < defaultSize; i++) {
            var row = [];
            var rowCopy = [];
            for (var j = 0; j < defaultSize; j++) {
                row.push(new Cell_2.CellModel());
                rowCopy.push(new Cell_2.CellModel());
            }
            newGrid.push(row);
            newGridCopy.push(rowCopy);
        }
        _this.state = {
            grid: newGrid,
            gridCopy: newGridCopy,
            speed: defaultSpeed,
            size: defaultSize,
            generation: 0
        };
        return _this;
    }
    GameOfLife.prototype.componentDidMount = function () {
        this.randomizeBoard();
        this.startGame();
    };
    GameOfLife.prototype.render = function () {
        var _this = this;
        var keyCounter = 0;
        return (React.createElement("div", { className: "container-fluid" },
            React.createElement(StatsNavbar_1.StatsNavbar, { generation: this.state.generation, size: this.state.size, speed: this.state.speed }),
            React.createElement("table", null,
                React.createElement("tbody", null, this.state.grid.map(function (rows, rowIndex) {
                    return React.createElement(CellRow_1.CellRow, { key: rowIndex + 1 }, rows.map(function (cell, colIndex) {
                        return React.createElement(Cell_1.Cell, __assign({ key: keyCounter++, toggleLife: _this.toggleLife, rowPos: rowIndex, colPos: colIndex, gridSize: _this.state.size }, cell));
                    }));
                }))),
            React.createElement(ButtonMenu_1.ButtonMenu, { startGame: this.startGame, pauseGame: this.pauseGame, setGridSize: this.setGridSize, setGameSpeed: this.setGameSpeed, clearBoard: this.clearBoard, randomizeBoard: this.randomizeBoard })));
    };
    return GameOfLife;
}(React.Component));
exports.GameOfLife = GameOfLife;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleLife = function () {
            //this.props.toggleLife(this.props.rowPos, this.props.colPos);
            _this.props.toggleLife(_this.props.rowPos, _this.props.colPos);
        };
        return _this;
    }
    Cell.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.props.isAlive === nextProps.isAlive &&
            this.props.age === nextProps.age) {
            return false;
        }
        return true;
    };
    Cell.prototype.render = function () {
        return (React.createElement("td", { className: this.props.gridSize === 120 ? "cell-small" : "cell", onClick: this.toggleLife, style: this.props.isAlive === true ? this.props.age >= 1 ? { "backgroundColor": "red" } : { "backgroundColor": "#ff6666" } : null }));
    };
    return Cell;
}(React.Component));
exports.Cell = Cell;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
function CellRow(props) {
    return (React.createElement("tr", null, props.children));
}
exports.CellRow = CellRow;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var GameOfLife_1 = __webpack_require__(1);
ReactDOM.render(React.createElement(GameOfLife_1.GameOfLife, null), document.getElementById("app"));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CellModel = (function () {
    function CellModel(isAlive) {
        if (isAlive === void 0) { isAlive = false; }
        this.isAlive = isAlive;
        this.age = 0;
    }
    CellModel.prototype.updateCellState = function (neighbors) {
        if (this.isAlive && (neighbors === 2 || neighbors == 3)) {
            this.age++;
            return;
        }
        if (!this.isAlive && neighbors === 3) {
            this.isAlive = true;
        }
        else if (neighbors > 3 || neighbors <= 1) {
            this.isAlive = false;
            this.age = 0;
        }
    };
    CellModel.prototype.updateCell = function (currentGrid, y, x) {
        var neighbors = 0;
        //Check right 
        try {
            if (currentGrid[y][x + 1].isAlive) {
                neighbors++;
            }
        }
        catch (exception) { }
        //Check top right
        try {
            if (currentGrid[y - 1][x + 1].isAlive) {
                neighbors++;
            }
        }
        catch (exception) { }
        //Check Top
        try {
            if (currentGrid[y - 1][x].isAlive) {
                neighbors++;
            }
        }
        catch (exception) { }
        //Check Top left
        try {
            if (currentGrid[y - 1][x - 1].isAlive) {
                neighbors++;
            }
        }
        catch (exception) { }
        //Check Bottom Right
        try {
            if (currentGrid[y + 1][x + 1].isAlive) {
                neighbors++;
            }
        }
        catch (exception) { }
        //Check Bottom
        try {
            if (currentGrid[y + 1][x].isAlive) {
                neighbors++;
            }
        }
        catch (exception) { }
        //Check Bottom Left
        try {
            if (currentGrid[y + 1][x - 1].isAlive) {
                neighbors++;
            }
        }
        catch (exception) { }
        //Check Left
        try {
            if (currentGrid[y][x - 1].isAlive) {
                neighbors++;
            }
        }
        catch (exception) { }
        this.updateCellState(neighbors);
    };
    return CellModel;
}());
exports.CellModel = CellModel;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
function ButtonMenu(props) {
    return (React.createElement("div", { id: "buttonArea", className: "row" },
        React.createElement("div", { className: "col-lg-3" },
            React.createElement("h6", null, "Start/Stop"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.startGame }, "Start"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.pauseGame }, "Pause")),
        React.createElement("div", { className: "col-lg-3" },
            React.createElement("h6", null, "Board Size"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.setGridSize, value: "Small" }, "Small"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.setGridSize, value: "Medium" }, "Medium"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.setGridSize, value: "Large" }, "Large"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.setGridSize, value: "Massive" }, "Massive")),
        React.createElement("div", { className: "col-lg-3" },
            React.createElement("h6", null, "Game Speed"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.setGameSpeed, value: "Slow" }, "Slow"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.setGameSpeed, value: "Medium" }, "Medium"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.setGameSpeed, value: "Fast" }, "Fast"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.setGameSpeed, value: "Warp Speed" }, "Warp Speed")),
        React.createElement("div", { className: "col-lg-3" },
            React.createElement("h6", null, "Clear/Randomize"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.clearBoard }, "Clear Board"),
            React.createElement("button", { className: "btn btn-secondary", onClick: props.randomizeBoard }, "Randomize"))));
}
exports.ButtonMenu = ButtonMenu;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
function StatsNavbar(props) {
    var speed = "";
    var size = "";
    switch (props.size) {
        //small
        case 25:
            size = "Small";
            break;
        //medium
        case 40:
            size = "Medium";
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
    switch (props.speed) {
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
    return (React.createElement("div", null,
        React.createElement("nav", { className: "navbar fixed-top navbar-toggleable-md navbar-inverse bg-inverse" },
            React.createElement("button", { className: "navbar-toggler navbar-toggler-right", type: "button", "data-toggle": "collapse", "data-target": "#navbarNavAltMarkup", "aria-controls": "navbarNavAltMarkup", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                React.createElement("span", { className: "navbar-toggler-icon" })),
            React.createElement("a", { className: "navbar-brand", href: "#" }, "Conway's Game of Life"),
            React.createElement("div", { className: "collapse navbar-collapse", id: "navbarNavAltMarkup" },
                React.createElement("ul", { className: "navbar-nav ml-auto" },
                    React.createElement("li", { className: "nav-item active" },
                        "Generation: ",
                        React.createElement("span", { className: "statValue" },
                            props.generation,
                            "\u00A0")),
                    React.createElement("li", { className: "nav-item active" },
                        "Game Size: ",
                        React.createElement("span", { className: "statValue" },
                            size,
                            "\u00A0")),
                    React.createElement("li", { className: "nav-item active" },
                        "Game Speed: ",
                        React.createElement("span", { className: "statValue" },
                            speed,
                            "\u00A0")))))));
}
exports.StatsNavbar = StatsNavbar;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map