import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Box from "components/Box";
import Button from "components/Button";
import useStore from "store/mapStore";
import { extractWords, test, tron } from "util/helpers";
import { handleBookmarkChange, alreadyBookmarked } from "util/bookmarks";
import { v4 as uuidv4 } from "uuid";

export default function PopupMarker() {
  const markerData = useStore((state) => state.markerData);
  const [popupContent, setPopupcontent] = useState(null);
  const [dmsDisplay, setDisplayDMS] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookMarkId, setBookMarkId] = useState();


  function handleBookMarkClick(e) {
    e.preventDefault();
    console.log(content);

    //handleBookmarkChange(!bookmarked, "bookmarks", bookmarkData);
    setBookmarked(!bookmarked);
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 300, bgcolor: "transparent", border: '1px dashed grey' }} py={1} px={1}>
      <List>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}> Atlanta, GA</span>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>Latitude: 33</span>
        </ListItem>
        <ListItem disablePadding>
          <span style={{ fontSize: "16px" }}>Longitude: 89</span>
        </ListItem>

        <ListItem disablePadding style={{ fontSize: "16px" }}>
      33 89 22

          {/*    <span style={{ fontSize: "16px" }}>{popupContent.dms.lat.display} {popupContent.dms.lng.display}</span> */}
        </ListItem>
      </List>
      <Divider />
      {/* ================= BOOKMARK ================= */}
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        {bookmarked ? (
          <Button color="info" size="small" onClick={handleBookMarkClick}>
            Bookmark
            <Icon sx={{ ml: 1 }}>bookmark</Icon>
          </Button>
        ) : (
          <Button color="info" size="small" variant="outlined" onClick={handleBookMarkClick}>
            Bookmark
            <Icon sx={{ ml: 1 }}>bookmark</Icon>
          </Button>
        )}
      </Stack>
    </Box>
  );
}
