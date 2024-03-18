import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useState } from 'react';

function CustomDataGrid(props) {
  const [visibleColumns, setVisibleColumns] = useState(props.visibleColumns);

  const dark = getComputedStyle(document.body).getPropertyValue('--dark');
  const blue2 = getComputedStyle(document.body).getPropertyValue('--blue2');

  return (
    <Box className='dataGrid-box'>
      <DataGrid
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
        sx={{ 
          color: 'white',
          bgcolor: dark,
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: blue2,
          },
          '& .MuiDataGrid-columnHeader': {
            padding: '0 5px !important'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            whiteSpace: "normal",
            lineHeight: "normal"
          },
          '& .MuiDataGrid-menuIcon': {
            width: '20px !important'
          }
        }}
        onRowClick={(params) => {
          props.onRowClick(params)
        }}
        hideFooter
        columnVisibilityModel={visibleColumns}
        onColumnVisibilityModelChange={(model) => {
          setVisibleColumns(model)
        }}
      />
    </Box>
  )
};

export default CustomDataGrid;

