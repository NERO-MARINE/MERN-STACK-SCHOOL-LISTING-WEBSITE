import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// we created and used our own rows and columns
import { userColumns} from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";

import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from "react";
import axios from "axios";


/*
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // OR

    renderCell: (params) => {
      return (
        <>
          <span>{params.row.lastName}</span>
          <p>{params.row.age}</p>
        </>
      );
    },
  },
];

const rows = [
    // lets fetch data from or temporary database: datatablesource.js
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
*/

const Datatable = ({columns}) => {
  
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  // console.log(location)
  // console.log(path) --> This gives us "users" (we need to get the path so we can delete or fetch the right data cos this component is used by more than one page)

  const [list, setList] = useState([])
    // const [data, setData] = useState(userRows) 
  const {apiData} = useFetch(`http://localhost:5000/${path}/`)

  useEffect(()=>{
    setList(apiData)
  },[apiData])

  const handleDelete = async(id)=>{
    try{
      await axios.delete(`http://localhost:5000/${path}/${id}`)
      // return the other items except the one that was clicked/deleted
    setList(list.filter(item => item._id !== id))
    }

    catch(err){
      console.log(err)
    }
 }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/dynamicroute" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={()=>handleDelete(params.row._id)}>Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    // run npm install @mui/x-data-grid to use mui data-table
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link
          to="/users/new"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New User
        </Link>
      </div>
      <DataGrid
      className="datagrid"
        // rows={apiData}
        rows={list}
        // columns={columns.concat(actionColumn)}
        columns={columns === userColumns ? columns.concat(actionColumn) : columns}  //  deleting schools was causing an issue on the user side hence I did it this way. I only show the action column on the users page
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[9]}
        checkboxSelection
        // this line had to be added into to catch the id's of our data from mongodb
        getRowId={row => row._id}
      />
    </div>
  );
};

export default Datatable;
