import React from "react";
import { Container, Grid, Typography } from "@mui/material";

const Title = ({ title, children }) => {
  return (
      <Container>
        <Grid container>
          <div className="page">
            {title && (
              <>
                <Typography variant="h4" className="heading">
                  {title}
                </Typography>
                <hr />
              </>
            )}
            {children}
          </div>
        </Grid>
      </Container>
  );
};

export default Title;
