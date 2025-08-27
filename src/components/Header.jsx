import { Link } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Header = (props) => {
  const { current, title = "Welcome To My Store" } = props;
  return (
    <Box
      sx={{
        py: 4,
        textAlign: "center",
        borderBottom: "1px solid #ddd",
        mb: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "700",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{ display: "flex", gap: "10px", justifyContent: "center", mt: 2 }}
      >
        <Button
          component={Link}
          to="/"
          variant={current === "home" ? "contained" : "outlined"}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/cart"
          variant={current === "cart" ? "contained" : "outlined"}
        >
          Cart
        </Button>
        <Button
          component={Link}
          to="/orders"
          variant={current === "orders" ? "contained" : "outlined"}
        >
          My Orders
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
