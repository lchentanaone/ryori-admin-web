import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography, Grid } from "@mui/material";
interface Daily {
  _id: string;
  table: string;
  email: string;
  paymongo_pi_id: string;
  total: string;
  createdAt: string;
}

export default function ArchiveTransaction() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactionData, setTransactionData] = useState<Daily[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchEmpoyee = async () => {
    try {
      const token = localStorage.getItem("token");
      const branch_Id = localStorage.getItem("branch_Id");
      console.log({ token, branch_Id });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pos/transaction/nottoday?branch_Id=${branch_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const trasnData = await response.json();
      console.log({ trasnData });
      setTransactionData(trasnData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEmpoyee();

    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      window.location.href = "/admin/login";
    }
  }, []);

  return (
    <div style={{ marginTop: 10, paddingLeft: 50, paddingRight: 50 }}>
      <h2>Archive Transactions</h2>
      <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: 2 }}>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Table</TableCell>
                <TableCell>Pay ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell> {index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {item._id}
                      </TableCell>
                      <TableCell>{item.table}</TableCell>
                      <TableCell>{item.paymongo_pi_id}</TableCell>
                      <TableCell> {item.total}</TableCell>
                      <TableCell> {item.createdAt}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transactionData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
