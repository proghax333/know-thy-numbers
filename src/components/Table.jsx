import React, { useState, useEffect , useMemo} from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import FilterData from "./FilterData";
import env from "../secrets.js";
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const { VITE_BACKEND_HOST } = env;

const DataListing = () => {
  const columnsDefaultStyle = {
    wrap: true
  }

  const columns = [
    { 
      ...columnsDefaultStyle, 
      name: 'ID', 
      selector: "id", 
      sortable: true 
    },
    { 
      ...columnsDefaultStyle, 
      name: 'Name', 
      selector: 'name', 
      sortable: true 
    },
    { 
      ...columnsDefaultStyle, name: 'Numerology Number', selector: 'numerologyNumber', sortable: true,
    },
    { 
      ...columnsDefaultStyle, name: 'What is Heading', selector: 'what_is_heading', sortable: true 
    },
    { ...columnsDefaultStyle, name: 'What is Description', selector: 'what_is_description', sortable: true },
    { ...columnsDefaultStyle, name: 'Heading', selector: 'heading', sortable: true },
    { ...columnsDefaultStyle, name: 'Description', selector: 'description', sortable: true },
    { ...columnsDefaultStyle, name: 'Add Description', selector: 'add_description', sortable: true },
    { ...columnsDefaultStyle, name: 'Suggestion', selector: 'suggestion', sortable: true },
  ];

  const customStyles = {
    rows: {
        style: {
            minHeight: '100px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
  };

  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [goToPage, setGoToPage] = useState(1);
  const [pending, setPending] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [filterOption, setFilterOption] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Fetch data from the backend using Axios
    const fetchData = async () => {
      try {
        const url = `${VITE_BACKEND_HOST}/openapi/prediction/findall`;
        let response = await axios({
          method: "post",
          url,
          data: { filterText, filterOption, currentPage, pageSize },
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        });

        console.log(response.data);

        setDataList(response.data.data); // Assuming the response is an array of data
        setTotal(response.data.totalPage);
        setPending(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData().then();
  }, [currentPage, filterText, filterOption, pageSize]);

  // const handleView = (item) => {
  //   setSelectedItem(item);
  //   setIsUpdating(false);
  // };

  // const handleUpdate = (item) => {
  //   setSelectedItem(item);
  //   setIsUpdating(true);
  // };

  const handleBack = () => {
    setSelectedItem(null);
    setIsUpdating(false);
    window.location.href = "/home/table"
  };

  const handleNextPage = (page) => {
    console.log("changed page: ", page)
    setCurrentPage(page);
  };

  const handleRowsPerPage = (pageSize, currentPage) => {
    console.log("changed rows per page: ", pageSize, currentPage)
    setCurrentPage(currentPage);
    setPageSize(pageSize);
  };

  // const handleGoToUpload = () => {
  //   navigate("/upload_data");
  // };

  // const handleGoToPage = () => {
  //   setCurrentPage(() =>
  //     Math.max(1, Math.min(goToPage, Math.ceil(total / pageSize)))
  //   );
  // };

  const onRowClickedHandler = (row, event) => {
    console.log(row, event)
    setSelectedItem(row)
    setIsUpdating(true)
  }

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText || filterOption) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        setFilterOption("");
        setCurrentPage(1)
        console.log("cleared")
      }
    };

    return (
      <FilterData
        onFilter={(text, option) => {
          console.log(text, option)
          setFilterText(text)
          setFilterOption(option)
        }}
        onClear={handleClear}
        filterText={filterText}
        filterOption={filterOption}
      />
    );
  }, [filterText, filterOption, resetPaginationToggle]);


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {
        isUpdating ? (
          <UpdateForm selectedItem={selectedItem} handleBack={handleBack} />
        ) : (
          // <div className="bg-white p-8 shadow-md rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          //   <h2 className="text-2xl font-bold mb-4 text-center">View Data</h2>
          //   {Object.entries(selectedItem).map(([key, value]) => (
          //     <div key={key} className="mb-4">
          //       <strong className="mr-2">{key}:</strong>
          //       <span>{value}</span>
          //     </div>
          //   ))}
          //   <div className="flex justify-end mt-4">
          //     <button
          //       type="button"
          //       onClick={handleBack}
          //       className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          //     >
          //       Back
          //     </button>
          //   </div>
          // </div>
          <div>
            {/* <h2 className="text-2xl font-bold mb-4 text-center">Data Listing</h2> */}
            {/* <ReactTooltip 
              id="tooltip" 
              className="w-4 z-40" 
              place="top" 
              type="dark" 
              effect="solid" 
              // multiline={true}
              isOpen={isOpen}
            /> */}
            <DataTable
              columns={columns.map(column => ({
                ...column,
                cell: row => {
                  // console.log(column, row)
                  return (<div 
                    data-tooltip-id="tooltip"
                    data-tooltip-content={row[column.selector] && row[column.selector].length > 100 ? row[column.selector] : ''}
                    onMouseEnter={() => setIsOpen(true)}
                    onClick={() => setIsOpen(false)}
                  >
                    {row[column.selector] && row[column.selector].length > 100
                      ? `${row[column.selector].slice(0, 100)}...`
                      : row[column.selector]}
                  </div>)
                },
              }))}
              // columns={columns}
              data={dataList}
              filter={true}
              onRowClicked={onRowClickedHandler}
              highlightOnHover={true}
              progressPending={pending}
              customStyles={customStyles}
              fixedHeader
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponent}
              // selectableRows
              persistTableHead
              paginationPerPage={pageSize} 
              paginationRowsPerPageOptions={[10, 20, 30]}
              paginationTotalRows={total}
              paginationServer={true}
              onChangePage={handleNextPage}
              onChangeRowsPerPage={handleRowsPerPage}
            />
          </div>
        )
      }
      
    </div>
  );
};

export default DataListing;
