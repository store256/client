import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import DirectionsTransitFilledIcon from '@mui/icons-material/DirectionsTransitFilled';
import ClearIcon from '@mui/icons-material/Clear';
import HailIcon from '@mui/icons-material/Hail';
import AbcIcon from '@mui/icons-material/Abc';
const columns = [
    {
        name: "ID",
        label: "S.NO"
    },
    {
        name: "IMAGE",
        options: {
            customBodyRender: (value) => {
                return <img src={value} className='w-100 p-1 bg-secondary bg-opacity-25' style={{ height: "50px", width: '50px', borderRadius: '50%' }} />;
            },
            filter:false
        }
    },
    {
        name: "PRODUCT"
    },
    {
        name: "CONTACT",
        options: {
            customBodyRender: (value) => {
                return <p className={`capitalize px-3 py-1 inline-block text-white bg-secondary `} style={{ borderRadius: "20px" }}>{value}</p>;
            }
        }
    },
    {
        name: "FULLNAME"
    },
    {
        name: "REGION"
    },
    {
        name: "CITY/TOWN"
    },
    {
        name: "GENDER",
        options: {
            customBodyRender: (value) => {
                return <p className={`capitalize px-3 py-1 inline-block text-white ${value === "male" ? "bg-primary" : "bg-warning"}`} style={{ borderRadius: "20px" }}>{value}</p>;
            }
        }
    },
    {
        name: "STATUS",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                const handleStatusChange = async (event) => {
                    const newStatus = event.target.value;
                    const orderId = tableMeta.rowData[0]; // Assuming the first column is the order ID

                    // Update the status in the backend
                    try {
                        await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/${orderId}`, {
                            data: { status: newStatus }
                        }, {
                            headers: { Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}` }
                        });

                        // Update the status in the table
                        updateValue(newStatus);
                        toast.success("Status updated successfully")
                    } catch (error) {
                        console.error('Error updating status:', error);
                    }
                };

                // Map status values to colors
                const statusColors = {
                    pending: '#FFC107',
                    processing: '#17A2B8',
                    transit:"#c2cf22",
                    completed: '#28A745',
                    cancelled: '#DC3545'
                };

                return (
                    <TextField
                        select
                        value={value}
                        onChange={handleStatusChange}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiSelect-select': {
                                padding: '8px 32px 8px 8px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: statusColors[value] || '#ddd',
                                borderRadius: "20px"
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: statusColors[value] || '#aaa',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: statusColors[value] || '#007BFF',
                            }
                        }}
                    >
                        <MenuItem value="pending" sx={{ color: statusColors.pending }}>< PauseCircleOutlineIcon style={{ fontSize: 18, color:'#FFC107' }}/>Pending</MenuItem>
                        <MenuItem value="processing" sx={{ color: statusColors.processing }}><AbcIcon style={{ fontSize: 18, color:'#17A2B8' }}/> Processing</MenuItem>
                        <MenuItem value="In-transit" sx={{ color: statusColors.transit }}><DirectionsTransitFilledIcon style={{ fontSize: 18, color:'#000' }}/>In-Transit</MenuItem>
                        <MenuItem value="Delivered" sx={{ color: statusColors.completed }}><CheckCircleOutlinedIcon style={{ fontSize: 18, color:'#17A2B8' }}/>Delivered</MenuItem>
                        <MenuItem value="cancelled" sx={{ color: statusColors.cancelled }}><ClearIcon style={{ fontSize: 18, color:'#DC3545' }}/>Cancelled</MenuItem>
                    </TextField>
                );
            }
        }
    }
];

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const options = {
        filterType: 'multiselect',
        responsive: "standard",
        selectableRows: 'none'
    };

    const getMuiTheme = () => createTheme({
        typography: {
            fontFamily: 'Poppins'
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        padding: "10px 4px"
                    },
                    body: {
                        padding: "10px 10px"
                    }
                }
            }
        }
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/orders?populate=*`, {
                    headers: { Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}` }
                });

                const fetchedOrders = response.data.results.flatMap(order => {
                    // Map through each product in the order and create a new row for each product
                    return order.products.map(product => [
                        order.id,
                        product.img,
                        product.title,
                        order.user[0].phone,
                        order.user[0].fullname,
                        order.user[0].region,
                        order.user[0].town,
                        order.user[0].gender,
                        order.status // Ensure this matches the status field from the API
                    ]);
                });

                setOrders(fetchedOrders);
            } catch (error) {
                console.log({ error });
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Total Orders"}
                    data={orders}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </div>
    );
}

export default Orders;
