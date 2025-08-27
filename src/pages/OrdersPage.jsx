import { Link } from "react-router";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Container from "@mui/material/Container";
import { getOrders } from "../utils/api_orders";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
const OrdersPage = () => {
  // store orders data from API
  const [orders, setOrders] = useState([]);

  // call the API
  useEffect(() => {
    getOrders()
      .then((data) => {
        // putting the data into orders state
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when the page load

  console.log(orders);
  const removeOrders = (order) => {
    const updatedOrders = orders.filter((o) => o._id !== order._id);
    setOrders(updatedOrders);
  };

  return (
    <>
      <Header current="cart" title="Cart" />
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell align="right">Product</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">payment Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((orders) => (
                  <TableRow
                    key={orders._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {orders.customerName} ({orders.customerEmail})
                    </TableCell>
                    <TableCell>
                      {orders.products.map((p) => (
                        <div>
                          {p.id}
                          {p.name}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{orders.totalPrice}</TableCell>
                    <TableCell>
                      <FormControl disabled={orders.status === "pending"}>
                        <InputLabel id="demo-simple-select-label">
                          {orders.status}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-label"
                          label={orders.status}
                          
                        >
                          <MenuItem value={"failed"}>Failed</MenuItem>
                          <MenuItem value={"paid"}>Paid</MenuItem>
                          <MenuItem value={"completed"}>Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {orders.status !== "pending" && orders.paid_at
                        ? new Date(orders.paid_at).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          removeOrders(orders);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default OrdersPage;
