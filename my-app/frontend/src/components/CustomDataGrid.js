import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

function CustomDataGrid(props) {
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
        sx={{ color: 'white', bgcolor: dark, '& .MuiDataGrid-columnHeaders': {bgcolor: blue2}}}
        onRowClick={(params) => {
          props.onRowClick(params)
        }}
        hideFooter
      />
    </Box>
  )
};

export default CustomDataGrid;

