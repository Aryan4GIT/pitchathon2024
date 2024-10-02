import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

const SearchResult = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:1337/api/items?query=${name}`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Ensure data is an array before setting results
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("Error fetching search results: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p="20px">
      <Typography variant="h4" gutterBottom>
        Search Results for: "{query}"
      </Typography>

      {loading && <CircularProgress />}

      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && results.length === 0 && (
        <Typography>No results found for "{query}". Please try a different search.</Typography>
      )}

      {!loading && results.length > 0 && (
        <Box>
          {results.map((result) => (
            <Box key={result.id} my="20px" sx={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
              <Typography variant="h5">{result.name}</Typography>
              <Typography>{result.description || "No description available."}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchResult;