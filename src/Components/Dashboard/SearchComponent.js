import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Grid,
  Stack,
  Pagination,
} from "@mui/material";
import Images, { getRandomHouseImage } from "./../utils/images";

function SearchComponentResults({ searchResults }) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = searchResults.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Search Results:
      </h2>
      <Grid container spacing={2}>
        {currentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} marginX={10}>
            <Card sx={{ marginBottom: "10px" }}>
              <CardMedia
                component="img"
                height="200"
                image={getRandomHouseImage()}
                alt="House"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  City: {item.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Area: {item.area}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={item.page_url}>
                  <Button size="small">Link</Button>
                </a>
                <Button size="small">view Item</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Stack spacing={2} justifyContent="center" alignItems="center" mt={4}>
        <Pagination
          count={totalPages}
          shape="rounded"
          page={currentPage}
          onChange={(event, page) => goToPage(page)}
        />
      </Stack>
    </div>
  );
}

export default SearchComponentResults;
