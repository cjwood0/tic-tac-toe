import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, Grid } from '@material-ui/core';

const Board = () => {
  const newBoard = new Array(3).fill(" ").map(x => new Array(3).fill(" "))
  const [ turn, setTurn ] = useState("X");
  const [ squares, setSquare ] = useState(newBoard);
  const [ plays, setPlays ] = useState(0);

  const onClick = (e) => {
    const col = e.target.cellIndex;
    const row = e.target.parentElement.rowIndex;
    if(squares[row][col] !== " ") return;
    squares[row][col] = turn;
    setSquare(squares);
    setPlays(plays + 1);
    setTurn( turn === "X" ? "O" : "X");
  }

  useEffect(() => {
    var winner = checkForWin();
    if(winner) {
      alert(`${winner} Wins!`);
      resetGame();
    } else if (plays === 9) {
      alert("Draw");
      resetGame();
    }
  }, [plays]);

  const resetGame = () => {
    setSquare(newBoard);
    setPlays(0);
    setTurn("X");
  }

  const checkForWin = () => {
    if(plays < 5) return false;
    const spaces = squares.flat();
    return checkRows(spaces) || checkColumns(spaces) || checkDiagonals(spaces);
  }

  const checkRows = (spaces) => {
    for(var r = 0; r < 9; r+=3) {
      if(spaces[r] !== " " && spaces[r] === spaces[r+3] && spaces[r] === spaces[r+6]) return spaces[r];
    }
    return false;
  }

  const checkColumns = (spaces) => {
    for(var c = 0; c < 3; c++) {
      if(spaces[c] !== " " && spaces[c] === spaces[c+3] && spaces[c] === spaces[c+6]) return spaces[c];
    }
    return false;
  }

  const checkDiagonals = (s) => {
    if((s[4] !== " " && s[0] === s[4] && s[0] === s[8]) || (s[2] === s[4] && s[2] === s[6])) return s[4];
    return false;
  }

  const table = () => (
    <Table id="board" style={{width:"70%", marginTop: "2rem", marginBottom: "1.5  rem"}}>
      <TableBody>
        {rows(squares)}
      </TableBody>
    </Table>
  )

  const rows = (squares) => (
    squares.map((r, ri) => (
      <TableRow key={ri}>
        {rowCells(squares[ri])}
      </TableRow>
    ))
  );

  const rowCells = (row) => (
    row.map((c, ci) => (
      <TableCell key={ci} style={{ border: "5px solid rgba(0,0,0,0.2)", height:"25vh", width:"20%", fontSize:"5rem"}} onClick={onClick} align="center">
        {row[ci]}
      </TableCell>
    ))
  )

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '50vh' }}
    >
      {table()}
    </Grid>
  );
}


export default Board;
