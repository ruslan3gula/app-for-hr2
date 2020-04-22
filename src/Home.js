import React, { useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Formik } from "formik";
import { TableBody, TableCell } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import fire from "./config";
import MyStyledTable from "./MyStyledTable";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

export const Home = ({ data, signout, user }) => {
  const [application, setApplication] = useState(data);
  const [filteredData, setfilteredData] = useState(data);

  const history = useHistory();

  const handleSubmit = value => {
    setApplication(prevState => [...prevState, value]);
  };

  const handleOnChange = e => {
    const searchedText = e.target.value ? e.target.value.toLowerCase() : "";
    setfilteredData(() =>
      application.filter(a => a.firstName.toLowerCase().includes(searchedText))
    );
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });

  const classes = useStyles();
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="secondary"
          // className={classes.button}
          // startIcon={<DeleteIcon />}
          onClick={signout}
        >
          SIGNOUT
        </Button>
      </div>
      <h1>Application form</h1>
      <TextField id="standard-basic" label="Search" onChange={handleOnChange} />

      <Formik handleSubmit={handleSubmit} />

     
   
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>FIRTSNAME</StyledTableCell>
                <StyledTableCell align="right">SURNAME</StyledTableCell>
                <StyledTableCell align="right">PRIO</StyledTableCell>
                <StyledTableCell align="right">DOC TYPE</StyledTableCell>
              </TableRow>
            </TableHead> 
            <TableBody >

            {filteredData.map(v => (
              <StyledTableRow>
                 <StyledTableCell>{v.firstName}</StyledTableCell>
                 <StyledTableCell align="right">{v.surName}</StyledTableCell>
                 <StyledTableCell align="right">{v.prio}</StyledTableCell>
                 <StyledTableCell align="right">{v.docType}</StyledTableCell>
               </StyledTableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
     <p>{filteredData}</p>
    </>
  );
};
