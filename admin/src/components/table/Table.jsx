import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
import { URL } from "../../App";

// This is the table in the homePage
const SalesList = () => {
  const { apiData, isLoading } = useFetch(
    `${URL}/schools/featuredSchools?featured=true`
  );
  // console.log(apiData);

  const rows = apiData.map((featuredSchool) => {
    return {
      id: featuredSchool._id,
      name: featuredSchool.name,
      img: "data:image/jpeg;base64,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",
      phone: featuredSchool.phone,
      // date: featuredSchool.createdAt, - No timestamps in db yet
      address: featuredSchool.address,
      lga: featuredSchool.lga,
      state: featuredSchool.state,
      email: featuredSchool.email,
      category: featuredSchool.category,
      status: featuredSchool.approved,
      website: featuredSchool.website,
      googleProfile: featuredSchool.googleProfile,
    };
  });

  return (
    // basic mui table
    <TableContainer
      component={Paper}
      className="table"
      style={{ overflowX: "scroll", width: "100%" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">School Name</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">lga</TableCell>
            <TableCell className="tableCell">State</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Category</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell style={{ color: "red" }}>
                Please wait, loading data
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.img} alt="" className="image" />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.phone}</TableCell>
                <TableCell className="tableCell">{row.address}</TableCell>
                <TableCell className="tableCell">{row.lga}</TableCell>
                <TableCell className="tableCell">{row.state}</TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className="tableCell">{row.category}</TableCell>
                <TableCell className="tableCell">
                  <span
                    className={`status ${
                      row.status ? "approved" : " not-approved"
                    }`}
                  >
                    {row.status ? "approved" : " not approved"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default SalesList;
