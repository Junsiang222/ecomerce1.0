import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../utils/api_category";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const  editCategory = async (category) => {
    // prompt the user to update the new label for the selected category (pass in the current value)
    const newCategoryLabel = prompt(
      "Please enter the new label for the selected category.",
      category.label
    );
    // update category
    await updateCategory(category._id, newCategoryLabel);
    // get the latest categories again
    const newCategories = await getCategories();
    // update the categories state
    setCategories(newCategories);
    toast.info("Category has been updated");
  };

  const addCategory = async (event) => {
    // 1. check for error
    if (!label) {
      toast.error("Please fill up the required fields");
    }

    try {
      // 2. trigger the API to create new product
      await createCategory(label);
      const updateCategory = await getCategories();
      setCategories(updateCategory);

      // 3. if successful, redirect user back to home page and show success message
      toast.success("New product has been added");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handledeleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        await deleteCategory(id);
        // method #1: get new orders data
        const updateCategory = await getCategories();
        setCategories(updateCategory);
        // method #2:
        // setOrders(orders.filter((i) => i._id !== id));
        toast.info("Order has been deleted");
      }
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addCategory}>
          Add
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.label}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 1 }}
                    onClick={() => editCategory(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handledeleteCategory(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Categories;
