/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import Box from "components/Box";
import Avatar from "components/Avatar";

// Images
import team4 from "assets/images/team-4.jpg";

function AvatarSize() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <Avatar src={team4} alt="xs" size="xs" />
            <Avatar src={team4} alt="sm" size="sm" />
            <Avatar src={team4} alt="md" size="md" />
            <Avatar src={team4} alt="lg" size="lg" />
            <Avatar src={team4} alt="xl" size="xl" />
            <Avatar src={team4} alt="xxl" size="xxl" />
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

export default AvatarSize;
