import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, TextField } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [proposedPrice, setProposedPrice] = useState(""); // New state for proposed price

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    try {
      const response = await fetch(
        `http://localhost:1337/api/items/${itemId}?populate=image`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const itemJson = await response.json();
      setItem(itemJson.data);
    } catch (error) {
      setError("Your proposal has been sumbitted.");
    }
  }

  async function getItems() {
    try {
      const response = await fetch(`http://localhost:1337/api/items?populate=image`, { method: 'GET' });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const itemsJson = await response.json();
      setItems(itemsJson.data);
    } catch (error) {
      setError("Your proposal has been sumbitted.");
    }
  }

  useEffect(() => {
    getItem();
    getItems(); 
  }, [itemId]);

  const renderRichText = (richText) => {
    if (!Array.isArray(richText)) return null;
    return richText.map((node, index) => {
      switch (node.type) {
        case "paragraph":
          return (
            <Typography
              key={index}
              sx={{ fontSize: "1.1rem", lineHeight: "1.6" }}
            >
              {node.children.map((child, i) => (
                <span
                  key={i}
                  style={{
                    fontWeight: child.bold ? "bold" : "normal",
                    fontStyle: child.italic ? "italic" : "normal",
                    textDecoration: child.underline ? "underline" : "none",
                  }}
                >
                  {child.text}
                </span>
              ))}
            </Typography>
          );
        case "heading":
          return React.createElement(
            `h${node.level}`, 
            { key: index }, 
            node.children.map((child, i) => (
              <Typography
                key={i}
                variant={`h${node.level}`}
                sx={{ fontWeight: child.bold ? "bold" : "normal", fontStyle: child.italic ? "italic" : "normal" }}
              >
                {child.text}
              </Typography>
            ))
          );
        default:
          return null;
      }
    });
  };

  const renderDescription = () => {
    const description = item?.attributes?.longDescription;
    return typeof description === "object" ? renderRichText(description) : description ?? "Description not available";
  };

  const handleProposePrice = async () => {
    if (!proposedPrice || isNaN(proposedPrice)) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:1337/api/items/${itemId}/negotiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proposedPrice: parseFloat(proposedPrice) }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      alert("Your proposed price has been submitted!");
      setProposedPrice(""); // Clear input field after submission
    } catch (error) {
      console.error("Error:", error);
      alert("Your proposal has been sumbitted.");
    }
  };

  return (
    <Box
      width="100%"
      sx={{
        background: 'url("/path/to/your/pattern.png") repeat', // Add your pattern image here
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '40px 0',
      }}
    >
      <Box width="80%" m="auto" bgcolor="#fff" borderRadius="8px" boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)" p="20px">
        {error && <Typography color="error">{error}</Typography>}
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGES */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={item?.attributes?.name}
              src={
                item?.attributes?.image?.data
                  ? `http://localhost:1337${item?.attributes?.image?.data?.attributes?.url}`
                  : "/path/to/placeholder-image.jpg"
              }
              style={{ objectFit: "contain", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
            />
          </Box>

          {/* ACTIONS */}
          <Box flex="1 1 50%" mb="40px">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">Home / Item</Typography>
              <Typography variant="body2" color="textSecondary">Prev Next</Typography>
            </Box>

            <Box mt="40px" mb="25px">
              <Typography variant="h4" fontWeight="bold">{item?.attributes?.name ?? "Name not available"}</Typography>
              <Typography variant="h6" color="textSecondary">₹{item?.attributes?.price ?? "Price not available"}</Typography>
              <Typography sx={{ mt: "20px" }}>{renderDescription()}</Typography>
            </Box>

            <Box display="flex" alignItems="center" minHeight="50px">
              <Button
                sx={{
                  backgroundColor: "#222",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "10px 30px",
                  "&:hover": {
                    backgroundColor: "#555"
                  }
                }}
                onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              >
                Applied
              </Button>
            </Box>

            {/* Bargaining Section */}
            <Box mt="20px">
              <Typography variant="h6" fontWeight="bold">Propose Your salary</Typography>
              <TextField
                label="INR"
                variant="outlined"
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                fullWidth
              />
              <Button
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#222",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "#555"
                  }
                }}
                onClick={handleProposePrice}
              >
                Submit Proposal
              </Button>
            </Box>

            <Box mt="20px">
              <Box display="flex" alignItems="center">
              
                
              </Box>
              <Typography variant="body2" color="textSecondary">CATEGORIES: {item?.attributes?.category ?? "Unknown"}</Typography>
            </Box>
          </Box>
        </Box>

        {/* INFORMATION */}
        <Box mt="20px">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
          <Box mt="20px">
            {value === "description" ? renderDescription() : "Reviews coming soon"}
          </Box>
        </Box>

        {/* RELATED ITEMS */}
        <Box mt="50px">
          <Typography variant="h5" fontWeight="bold">Related Products</Typography>
          <Box display="flex" flexWrap="wrap" mt="20px" gap="15px">
            {items.slice(0, 4).map((relatedItem, i) => (
              <Item key={`${relatedItem.attributes?.name}-${i}`} item={relatedItem} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
