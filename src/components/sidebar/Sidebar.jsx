import Slider from '@mui/material/Slider';
import banner from '../../assets/images/banner1.png';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import FilterAltOutLineIcon from '@mui/icons-material/FilterAltOutlined';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
function valuetext(value) {
    return `${value}°C`;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Sidebar = ({ isOpen, categories,onCategoryClick, onPriceChange,handleSortChange}) => {
    const [value, setValue] = useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onPriceChange(newValue);  // Invoke the function passed from parent
    };

    return (
        <>
            <div className={`sidebar ${isOpen && 'open'}`}>
                <div className="card border-0 shadow">
                    <h4>Category</h4>
                    <div className="sidelist">
                    <div className="catList">
                            <div className="catItem d-flex align-items-center" onClick={() => onCategoryClick('all')}>
                            <span className="img">
                               <AccountTreeIcon style={{color:'#0654A0'}}/>
                            </span>
                            <h5 className="mb-0 ml-3 mr-3" style={{marginLeft:'10px'}}> All</h5>
                            <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto num">all</span>
                            </div>
                        </div>
                        {categories?.map((item) => (
                            <div className="catList" key={item.id}>
                                <div className="catItem d-flex align-items-center" onClick={() => onCategoryClick(item.id)}>
                                    <span className="img">
                                        <img src={import.meta.env.VITE_REACT_UPLOAD_URL + item.attributes.img.data.attributes.url} alt="" width={30} />
                                    </span>
                                    <h5 className="mb-0 ml-3 mr-3">{item.attributes.title}</h5>
                                    <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto num">{item.attributes.products.data.length}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card border-0 shadow">
                    <h4>Filter by Price</h4>
                    <Slider
                        min={0}
                        step={1}
                        max={5000}
                        getAriaLabel={() => 'Price range'}
                        value={value}
                        onChange={handleChange}
                       
                    />
                    <div className="d-flex  priceRange">
                        <span>From: <strong className='text-primary'>GHS{value[0]}</strong></span>
                        <span className='ml-auto'>To: <strong className='text-primary'>GHS{value[1]}</strong></span>
                    </div>

                    <div className="filters">
                        <h5>Item Condition</h5>
                        <ul className='mb-0'>
                        <li><Checkbox {...label} color='primary' onClick={() => handleSortChange('recent')} />New</li>
                        <li><Checkbox {...label} color='primary' onClick={() => handleSortChange('featured')} />  Featured</li>
                        <li><Checkbox {...label} color='primary' onClick={() => handleSortChange('Popular')} /> Popular</li>
                       <li><Checkbox {...label} color='primary' onClick={() => handleSortChange('trending')} />Trending</li>
                       <li><Checkbox {...label} color='primary' onClick={() => handleSortChange('top_rated')} />Top Rated</li>
                       <li><Checkbox {...label} color='primary' onClick={() => handleSortChange('top_selling')} />Top Selling</li>
                            
                      
                        </ul>
                    </div>
                    <div className='d-flex d-none'>
                        <Button className='btn btn-g w-100'>
                            <FilterAltOutLineIcon />
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="d-flex align-items-center sidebar-info">
                    <img src={banner} alt="" className='w-100 display-none' />
                    <p className='info'>Buy Now <br /> Pay later</p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
