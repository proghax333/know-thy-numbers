import React, { useState, useEffect , useMemo} from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import FilterData from "./FilterData";
import env from "../secrets.js";
import { useNavigate, useLocation } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useFilter } from '../contexts/FilterContext';

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
      ...columnsDefaultStyle, name: 'Heading 1', selector: 'heading_1', sortable: true 
    },
    { ...columnsDefaultStyle, name: 'Description 1', selector: 'description_1', sortable: true },
    { ...columnsDefaultStyle, name: 'Heading 2', selector: 'heading_2', sortable: true },
    { ...columnsDefaultStyle, name: 'Description 2', selector: 'description_2', sortable: true },
    { ...columnsDefaultStyle, name: 'Heading 3', selector: 'heading_3', sortable: true },
    { ...columnsDefaultStyle, name: 'Description 3', selector: 'description_3', sortable: true },
    { ...columnsDefaultStyle, name: 'Heading 4', selector: 'heading_4', sortable: true },
    { ...columnsDefaultStyle, name: 'Description 4', selector: 'description_4', sortable: true },
    { ...columnsDefaultStyle, name: 'Heading 5', selector: 'heading_5', sortable: true },
    { ...columnsDefaultStyle, name: 'Description 5', selector: 'description_5', sortable: true },
    { ...columnsDefaultStyle, name: 'Heading Suggestion', selector: 'heading_suggestion', sortable: true },
    { ...columnsDefaultStyle, name: 'Description Suggestion', selector: 'description_suggestion', sortable: true },
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
  const location = useLocation();

  const { filterState, setFilterState } = useFilter();

  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [goToPage, setGoToPage] = useState(1);
  const [pending, setPending] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [filterText, setFilterText] = useState(filterState.filterText);
  const [filterOption, setFilterOption] = useState(filterState.filterOption);

  useEffect(() => {
    // Fetch data from the backend using Axios
    const fetchData = async () => {
      try {

        const params = new URLSearchParams(location.search)
        const text = params.get("filterText")
        const option = params.get("filterOption")

        const url = `${VITE_BACKEND_HOST}/openapi/prediction/findall`;
        let response = await axios({
          method: "post",
          url,
          data: { filterText: text ?? filterText, filterOption: option ?? filterOption, currentPage, pageSize },
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
  }, [currentPage, filterText, filterOption, pageSize, location]);

  useEffect(() => {
    setFilterState({ filterText, filterOption });
  }, [filterText, filterOption, setFilterState]);

  const handleBack = () => {
    setSelectedItem(null);
    setIsUpdating(false);
    // window.location.href = "/home/table"
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
          <div>
            <DataTable
              columns={columns.map(column => ({
                ...column,
                cell: row => {
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
              data={dataList}
              filter={true}
              onRowClicked={onRowClickedHandler}
              highlightOnHover={true}
              progressPending={pending}
              customStyles={customStyles}
              fixedHeader
              pagination
              paginationResetDefaultPage={resetPaginationToggle} 
              subHeader
              subHeaderComponent={subHeaderComponent}
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
