import React, { useEffect, useState } from 'react';
import './profile.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DiamondIcon from '@mui/icons-material/Diamond';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import item from '../../assets/images/cat/fr.png';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tabs from '@mui/material/Tabs';

import avatar from '../../assets/images/img_avatar.png';
import { Button, TextareaAutosize, MenuItem, TextField, Grid, Tab} from '@mui/material';
import AffiliateChart from '../../components/chart/AffiliateChart';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Country, State, City }  from 'country-state-city';
import Orders from '../../components/order/Orders';
import Ratings from '../../components/rating/Rating';



const steps = [
  'Order Placed',
  'Processing',
  'In-transit',
  'Delivered',
];

const UserProfile = () => {

  const {user, token } = useSelector(state => state.user);
  const [userType, setUserType] = useState()
  const [isActiveTabs, setIsActiveTabs] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [products, setProducts] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null)
  const [isUserUpdated, setIsUserUpdated] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false);
  const [region, setRegion] = useState([]);
  const [city, setCity] = useState([]);
  const [orders, setOrders] =useState([])
  const navigate = useNavigate()
  const [value, setValue] = useState('1');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useAuth()

  

  const handleProductsChange = (event) => {
    setProducts(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };


  const handleChange = () => {
    setValue(newValue);
  };

  const Regions = () => {
      const ghanaRegions = State.getStatesOfCountry('GH');
      setRegion(ghanaRegions)
  };

  const citys = () => {
    const ghanaCity = City.getCitiesOfCountry('GH');
    setCity(ghanaCity)
};

  // console.log(region)

  useEffect(() => {
    Regions()
    citys()
    fetchOrderByUserId()
    fetchUserType()
    fetchUserDetails();
  
  }, [token]);

  useEffect(() => {
    if (isUserUpdated) {
      fetchUserDetails();
    }
  }, [isUserUpdated]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/me?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserDetails(response.data);
      setIsUserUpdated(false);
    } catch (error) {
      console.log({error})
    }
  };

  const fetchUserType = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/me?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserType(response.data.user_type);
       console.log("user Types",response.data.user_type)
    } catch (error) {
      console.log({error})
    }
  };

  // File upload
  const handleFileChange = async ({ target: { files } }) => {
    if (files?.length) {
      const { type } = files[0];
      if (type === 'image/jpeg' || type === 'image/png') {
        setFile(files[0]);
        await updateUserAvatarId(files[0]);  // Call the update function directly with the selected file
      } else {
        toast.error('Accept only png and jpeg image type only', {
          position: 'bottom-right',
        });
      }
    }
  };

  const updateUserAvatarId = async (file) => {
    if (!file) {
      toast.error("File is required", { hideProgressBar: true });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('name', `${userDetails.username} avatar`);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      // console.log("Upload response:", response);

      const { id, url } = response.data[0];  // Assuming the response format
      // console.log("Uploaded file ID:", id, "URL:", url);

      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userDetails.id}`,
        { avatarId: id, avatarUrl: url },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      setIsUserUpdated(true);
      toast.success('profile image is updated successfully', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Failed to update avatar');
      console.error('Error updating avatar:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const updateUser = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userDetails.id}`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Profile updated successfully!',{
        position: 'bottom-right',
      });
      setIsUserUpdated(true);
      
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  }

  const handleUpdate = async () => {
    try {
      setIsUpdating(true); // Set loading state to true
      await updateUser();
      setIsUpdating(false);
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  const fetchOrderByUserId = async () => {
    const user_id = user.id;
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_URL}/orders/${user_id}`, {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const { data } = response;
        console.log(data)
        if (Array.isArray(data)) {
            setOrders(data);
        } else if (data) {
            // Wrap the single order object in an array
            setOrders([data]);
         
        } else {
            console.log('No order found for the specified user');
            setOrders([]);
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        setOrders([]);
    }
};



  const statusIndex = (status) => {
    console.log("status", status)
    switch (status) {
      case 'Order Placed':
        return 1;
      case 'Processing':
        return 2;
      case 'In-transit':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };






  return (
    <div className="container-fluid">
      <div className="row justify-content-center profile">
        <div className="col-md-3 left">
          <div className="card">
            <div className="card-header">
              {
                userDetails.avatarUrl ? (
                  <img src={import.meta.env.VITE_REACT_UPLOAD_URL + userDetails.avatarUrl} alt="Profile" className="profile-img" />
                ) : (
                  <img src={avatar} alt="Profile" className="profile-img" />
                )
              }
              <div className="user-info">
                <h5 className="text-center">{userDetails.username}</h5>
              </div>
            </div>
            <div className="navTabs">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className={`${isActiveTabs === 0 && 'active'} nav-item`} onClick={() => setIsActiveTabs(0)}>
                  <DashboardIcon />
                  Dashboard
                </li>
                <li className={`${isActiveTabs === 1 && 'active'} nav-item`} onClick={() => setIsActiveTabs(1)}>
                  <PersonIcon />
                  User Details
                </li>
                {userType !== 'admin' &&
                <li className={`${isActiveTabs === 2 && 'active'} nav-item`} onClick={() => setIsActiveTabs(2)}>
                <BookmarkBorderIcon />
                 Track Orders
               </li>
                }
                
                {userType === 'admin' &&
                 <li className={`${isActiveTabs === 4 && 'active'} nav-item`} onClick={() => setIsActiveTabs(4)}>
                 <ListAltIcon/>  All Orders
               </li>
                }
                <li className={`${isActiveTabs === 5 && 'active'} nav-item`} onClick={() => setIsActiveTabs(5)}>
                  Become Affiliate
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9 right">
        {windowWidth < 992 && (
        <div className="mid-nav mb-3 my-3">
          <Tabs value={isActiveTabs} onChange={(e, newValue) => setIsActiveTabs(newValue)}  variant="scrollable"
            scrollButtons="auto">
            <Tab label="Dashboard" className={`nav-item ${isActiveTabs === 0 ? 'active' : ''}`} />
            <Tab label="User Details" className={`nav-item ${isActiveTabs === 1 ? 'active' : ''}`} />
            <Tab label=" Track Orders" className={`nav-item ${isActiveTabs === 2 ? 'active' : ''}`} />
            <Tab label="Become Affiliate" className={`${isActiveTabs === 5 && 'active'} nav-item`} onClick={() => setIsActiveTabs(5)} />
          </Tabs>
        </div>
      )}
          {/* Affiliate Market Dashboard */}
          {isActiveTabs === 0 && (
            <div className="card">
              <div className="card-header detail">
                <h4>Affiliate Market Dashboard</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="widget">
                      <h5>Attractions</h5>
                      <span>10</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="widget">
                      <h5>Orders</h5>
                      <span>5</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="widget">
                      <h5>Earnings</h5>
                      <span>10.00</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="widget">
                      <h5>Membership</h5>
                      <span>
                        <DiamondIcon className="" />
                      </span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    {/* the link */}
                    <div className="affiliate-link">
                      <div className="link">
                        http://localhost:5173/affiliate-link/affiliateId=store268U113
                      </div>
                      <Button className="ml-auto link-btn">
                        <ContentCopyIcon />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
                {/* charts */}
                <div className="col-md">
                  <div className="chart">
                    <AffiliateChart />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Profile Details */}
          {isActiveTabs === 1 && (
            <div className="card">
              <div className="card-header detail">
                <h4>Profile Details</h4>
              </div>
              <div className="card-body">
                <div className="profile-details">
                  {/* change profile image */}
                  <div className="profile-img">
                    <input type="file" id="file-upload" className="file-input" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="profile-pic-label rounded-full">
                      {
                        userDetails.avatarUrl ? (
                          <img src={import.meta.env.VITE_REACT_UPLOAD_URL + userDetails.avatarUrl} alt="Profile" className="profile-img" style={{borderRadius:'50%'}}/>
                        ) : (
                          <img src={avatar} alt="Profile" className="profile-img w-100" />
                        )
                      }
                      <div className="overlay flex flex-column">
                        <CameraAltIcon />
                        <p className="text-white text-bold">update</p>
                      </div>
                    </label>
                  </div>
                  {/* change profile image */}
                  <div className="info-details pt-3">
                    <div className="row">
                      {/* First Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField
                            id="outlined-basic-1"
                            label="Username"
                            name="username"
                            value={userDetails.username || ''}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            disabled
                          />
                        </div>
                      </div>
                      {/* Second Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField
                            id="outlined-basic-2"
                            label="Fullname"
                            name="fullname"
                            value={userDetails.fullname || ''}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* First Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField
                            id="outlined-basic-3"
                            label="Email"
                            name="email"
                            value={userDetails.email || ''}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            disabled
                          />
                        </div>
                      </div>
                      {/* Second Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField
                            id="outlined-basic-4"
                            label="Phone"
                            name="phone"
                            value={userDetails.phone || ''}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField
                            id="outlined-basic-6"
                            label="Gender"
                            name="gender"
                            value={userDetails.gender || ''}
                            onChange={handleInputChange}
                            variant="outlined"
                            select
                            fullWidth
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                          </TextField>
                        </div>
                      </div>
                      {/* First Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField
                            id="outlined-basic-6"
                            label="Region"
                            name="region"
                            value={userDetails.region || ''}
                            onChange={handleInputChange}
                            variant="outlined"
                            select
                            fullWidth
                            
                          >
                        {region.map((item) => (
                              <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                          ))}

                          </TextField>
                        </div>
                      </div>
                      {/* Second Column */}
                    </div>
                    <div className="row">
                      {/* First Column */}
                      <div className="col-md-12">
                        <div className="input-group mb-3">
                        <TextField
                            id="outlined-basic-6"
                            label="Town"
                            name="town"
                            value={userDetails.town || ''}
                            onChange={handleInputChange}
                            variant="outlined"
                            select
                            fullWidth
                          >
                        {city.map((item) => (
                              <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                          ))}

                          </TextField>
                          {/* <TextField
                            id="outlined-basic-5"
                            label="Town"
                            name="town"
                            value={userDetails.town || ''}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                          /> */}
                        </div>
                      </div>
                      {/* Second Column */}
                    </div>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="about" className="fw-bold">About you</label>
                        <TextareaAutosize
                          maxRows={4}
                          name="about"
                          value={userDetails.about || ''}
                          onChange={handleInputChange}
                          placeholder="Enter your text here"
                          style={{ width: '100%', height: '100px', padding: '20px', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="info-details pt-1 pb-3">
                  <Button className="btn-lg btn-g" onClick={handleUpdate}>
                    {isUpdating ? "Updating..." : "Update"}
                  </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Track Orders */}
          {isActiveTabs === 2 && (
    <div className="container my-2">
        <Card>
            <div className="card-header detail">
                <h4>Your Orders</h4>
            </div>
            <CardContent>
                {orders.length > 0 ? (
                    orders.filter(order => order.status !== 'Delivered').length > 0 ? (
                        orders
                            .filter(order => order.status !== 'Delivered')
                            .map(order => (
                                <Accordion key={order.id}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>
                                            Order ID: <span style={{ fontSize: '14px' }}>{order.paystackId}</span>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" style={{ marginLeft: 'auto' }}>
                                            Created At: {new Date(order.createdAt).toLocaleString()}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="card-body">
                                            {order.products.map(product => (
                                                <Grid container spacing={3} key={product.id} className="order-item mb-3 align-items-center">
                                                    <Grid item xs={12} md={2}>
                                                        <img src={product.img} alt={product.title} className="img-fluid rounded track" />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Typography variant="h6" className="mb-0">
                                                            {product.title}
                                                        </Typography>
                                                        <Typography variant="body1" className="price text-primary">
                                                            GHS{product.price}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Stepper activeStep={statusIndex(order.status)} alternativeLabel>
                                                            {steps.map(label => (
                                                                <Step key={label}>
                                                                    <StepLabel>{label}</StepLabel>
                                                                </Step>
                                                            ))}
                                                        </Stepper>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </div>
                                        {/* <div className="card-footer">
                                            <Typography variant="body1">Please Review the product</Typography>
                                            <Ratings />
                                        </div> */}
                                    </AccordionDetails>
                                </Accordion>
                            ))
                    ) : (
                        <Typography>No orders found</Typography>
                    )
                ) : (
                    <Typography>No orders found</Typography>
                )}
            </CardContent>
        </Card>
    </div>
)}

        {/* All orders */}
        {isActiveTabs === 4 && (
            <div className="card">
              <div className="card-header detail">
                <h4>All Orders</h4>
              </div>
              <div className="card-body">
                <div className="profile-details">
                  <div className="info-details pt-4">
                    
                      <Orders/>
                  
                  </div>
                 
                </div>
              </div>
            </div>
          )}
          {/* Register as an Affiliate */}
          {isActiveTabs === 5 && (
            <div className="card">
              <div className="card-header detail">
                <h4>Register as an Affiliate</h4>
              </div>
              <div className="card-body">
                <div className="profile-details">
                  <div className="info-details pt-5">
                    <label htmlFor="" className='fw-bold pb-2'>Personal Info</label>
                    <div className="row">
                      {/* First Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField id="outlined-basic-1" label="Fullname" variant="outlined" fullWidth />
                        </div>
                      </div>
                      {/* Second Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField id="outlined-basic-2" label="handle name @example" variant="outlined" fullWidth />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* First Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField id="outlined-basic-3" label="example@gmail.com" variant="outlined" fullWidth />
                        </div>
                      </div>
                      {/* Second Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField id="outlined-basic-4" label="mobile" variant="outlined" fullWidth />
                        </div>
                      </div>
                    </div>

                    <label htmlFor="" className='fw-bold pb-2'>Register Products</label>
                    <div className="row">
                      {/* First Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField
                            id="outlined-basic-6"
                            label="Select Category"
                            variant="outlined"
                            select
                            value={category}
                            onChange={handleCategoryChange}
                            fullWidth
                          >
                            <MenuItem value="Air Condition">Air Condition</MenuItem>
                            <MenuItem value="Iphone">Iphone</MenuItem>
                          </TextField>
                        </div>
                      </div>
                      {/* Second Column */}
                      <div className="col-md-6">
                        <div className="input-group mb-3">
                          <TextField
                            id="outlined-basic-6"
                            label="Select Products"
                            variant="outlined"
                            select
                            value={products}
                            onChange={handleProductsChange}
                            fullWidth
                          >
                            <MenuItem value="Air Condition">Air Condition</MenuItem>
                            <MenuItem value="Iphone">Iphone</MenuItem>
                          </TextField>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info-details pt-1 pb-3">
                    <Button className='btn-lg btn-g'>Register</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
