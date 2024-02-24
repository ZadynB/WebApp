import { DataGrid, useGridApiContext, gridPageCountSelector, GridPagination, useGridSelector } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { GridFilterPanel } from '@mui/x-data-grid';
import { GridFilterForm } from '@mui/x-data-grid';

// function Pagination({ page, onPageChange, className }) {
//     const apiRef = useGridApiContext();
//     const pageCount = useGridSelector(apiRef, gridPageCountSelector);

//     return (
//         <MuiPagination
//             color='primary'
//             className={className}
//             count={pageCount}
//             page={page + 1}
//             onChange={(event, newPage) => {
//                 onPageChange(event, newPage - 1);
//             }}
//         />
//     );
// }

// function CustomPagination(props) {
//     return <GridPagination ActionsComponent={Pagination} {...props}/>;
// }

function CustomDataGrid(props) {
    const dark = getComputedStyle(document.body).getPropertyValue('--dark');

    return (
        <Box className='dataGrid-box'>
            <DataGrid
                pagination
                slots={{
                    // pagination: CustomPagination,
                }}
                slotProps={{
                    filterPanel: {
                        columnsSort: 'asc',
                        filterFormProps: {
                            operatorInputProps:{
                                variant: 'outlined',
                                size: 'small',
                                sx: { display: 'none' }
                            },
                            columnInputProps: {
                                variant: 'outlined',
                                size: 'small',
                                sx: { mt: 'auto', width: '40%' }
                            },
                            valueInputProps: {
                                InputComponentProps:{
                                    variant: 'outlined',
                                    size: 'small',
                                }
                            }
                        }
                    }
                }}
                columns={props.columns}
                rows={props.rows}
                sx={{color: 'white', bgcolor: dark}}
                hideFooter
                // disableColumnFilter
            />
        </Box>
    )
}

// function CustomDataGrid() {
//     const apiRef = useGridApiContext();
//     const state = apiRef.current.state;


//     return (
//         <Pagination 
//             count={state.pagination.pageCount}
//             page={state.pagination.page + 1}
//             onChange={(event, value) => apiRef.current.setPage(value - 1)}
//         />
//     );
// };

export default CustomDataGrid;

