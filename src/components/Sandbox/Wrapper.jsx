// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Input from "components/Input";
import Button from "components/Button";
import Typography from "components/Typography";

function Wrapper({children}) {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container spacing={3}>
         {children}
        
        </Grid>
      </Container>
    </Box>
  );
}

export default Wrapper;