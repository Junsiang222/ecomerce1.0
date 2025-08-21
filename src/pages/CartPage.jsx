import { Link } from "react-router";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getCart  ,deleteItemFromCart} from "../utils/cart";


export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const removeFromCart = (_id) => {
    deleteItemFromCart(_id)
    setCart(getCart); 
    
  };

  

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Cart</Typography>
      <Box>
        <Button variant="contained" component={Link} to="/">Home</Button>
        <Button variant="outlined" component={Link} to="/cart">Cart</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table> 
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Product Add Yet!
                </TableCell>
              </TableRow>
            ) : (
              cart.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${(item.price * item.quantity)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: ${total.toFixed(2)}
      </Typography>
      <Box>
      <Button variant="outlined" component={Link} to="/">Checkout</Button>
      </Box>
    </div>
  );
}
