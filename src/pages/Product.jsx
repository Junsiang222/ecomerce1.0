import { Link } from "react-router";
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
import { Typography } from "@mui/material";
import { getProducts , deleteProduct ,} from "../utils/api";
import { useState, useEffect } from "react";

import Swal from 'sweetalert2';
import { toast } from "sonner";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  // useEffect
  useEffect(() => {
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]);

   const handleProductCart =(product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find((item) => item._id === product._id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  toast.success("Product Added To Cart");
};

   const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        // delete product at the backend
        await deleteProduct(id);
        // delete product from the state
        setProducts(products.filter((p) => p._id !== id));
        toast.success("Product has been deleted");
      }
    });
  };
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
        <Box>
        <Button variant="contained" component={Link}to="/">Home</Button>
        <Button variant="outlined" component={Link}to="/cart">Cart</Button>
        </Box>
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
               onChange={(event) => {
                setCategory(event.target.value);
                // reset the page back to 1
                setPage(1);
              }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              <MenuItem value="Consoles">Consoles</MenuItem>
            </Select>
          </FormControl>
        </Box>
         <Button component={Link}to="/products/new" variant="contained" color="success">Add New</Button>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
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
                  <Button variant="contained" color="primary" fullWidth  onClick={() => handleProductCart(product)}> Add To Cart</Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                    marginLeft: "0px !important",
                  }}
                >
                   <Button
                      component={Link}
                      to={`/products/${product._id}/edit`}
                      variant="contained"
                      color="info"
                    >
                      Edit
                    </Button>
                     <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleProductDelete(product._id);
                      }}
                    >
                      Delete
                    </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       {products.length === 0 ? (
          <Typography variant="h5" align="center" py={3}>
            No more products found.
          </Typography>
        ) : null}
      <Box
        sx={{
          pt: 2,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          disabled={page === 1 ? true : false} // the button will be disabled if the page is 1
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span>Page: {page}</span>
        <Button
          variant="contained"
          disabled={products.length < 1 ? true : false} // the button will be disabled if no more products
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

/*import { Button } from "@mui/material";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { useState, useEffect } from "react";
import { getProducts } from "../utils/api_products";

const Products = () => {
  // to store the data from /products
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
            }}
          >
            Products
          </Typography>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Box>
        <Box
          sx={{
            paddingBottom: "10px",
          }}
        >
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ backgroundColor: "white", paddingRight: "5px" }}
            >
              Filter By Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Genre"
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={"Consoles"}>Consoles</MenuItem>
              <MenuItem value={"Games"}>Games</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={product._id}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ minHeight: "64px" }}>
                    {product.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pt: 2,
                    }}
                  >
                    <Chip label={product.price} color="success" />
                    <Chip label={product.category} color="primary" />
                  </Box>
                </CardContent>
                <CardActions sx={{ display: "block", px: 3, pb: 3 }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Add To Cart
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pt: 2,
                      marginLeft: "0px !important",
                    }}
                  >
                    <Button variant="contained" color="info">
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Products;

*/
