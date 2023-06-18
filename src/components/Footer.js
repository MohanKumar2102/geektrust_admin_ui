import { Button, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ReactPaginate from "react-paginate";
import "./Footer.css";
export default function Footer({ deleteRows, pageChangeHandler, noOfPages }) {
  return (
    <Stack direction="row" spacing={25}>
      <Button
        onClick={deleteRows}
        variant="outlined"
        className="delete-button"
        startIcon={<Delete />}
      >
        Delete Selected
      </Button>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={noOfPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={pageChangeHandler}
        containerClassName={"pagination"}
        subContainerClassName={"pages"}
        activeClassName={"active"}
      />
    </Stack>
  );
}
