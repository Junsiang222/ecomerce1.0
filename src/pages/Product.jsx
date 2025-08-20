import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { Link } from "react-router";
import { Typography } from "@mui/material";
import { getProducts } from "../utils/api";
import { useState, useEffect } from "react";
export default function Product() {
  const [products, setProdcuts] = useState([]);
  const [category, setCategory] = useState("all");
  // useEffect
  useEffect(() => {
    getProducts(category).then((data) => {
      setProdcuts(data);
    });
  }, [category]);
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to My Store
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small" sx={{ mt: 4 }}>
            <InputLabel id="demo-simple-select-label">
              All Categories
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="All Categories"
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Consoles">Consoles</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button>Add New</Button>
      </Box>
      <Grid container spacing={3} >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Chip
                  label={`$${product.price}`}
                  color="success"
                  size="small"
                />
                <Chip
                  label={product.category}
                  color="warning"
                  size="small"
                  sx={{ ml: 5 }}
                />
                <Box mt={2}>
                  <Button variant="contained" color="primary" fullWidth>
                    Add To Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
