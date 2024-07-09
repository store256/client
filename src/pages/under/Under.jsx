// List.js
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Product from '../../components/products/Product';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { fetchDataFromApi } from '../../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import loader from '../../assets/images/S268.gif'
const Under = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isOpenDropDown2, setisOpenDropDown2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);   
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  

  useEffect(() => {
      setTimeout(() => {
          setIsLoading(false);
      }, 3000);
  }, []);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = () => {
    fetchDataFromApi('/categories?populate=*').then(res => {
      setCategories(res.data);
    });
  };

  const getProducts = () => {
    fetchDataFromApi('/products?populate=*&filters[price][$lte]=300').then(res => {
      setProducts(res.data);
    });
  };
  

  
  const handleCategoryClick = (categoryId) => {
    // Check if "All" category is selected
    if (categoryId === 'all' || categoryId === null) {
      fetchDataFromApi('/products?populate=*&filters[price][$lte]=300')
        .then(res => {
          setProducts(res.data);
          setSelectedCategory(categoryId);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    } else {
      // Fetch products for the specific category
      fetchDataFromApi(`/products?populate=*&filters[categories][id][$eq]=${categoryId}&filters[price][$lte]=300`)
        .then(res => {
          setProducts(res.data);
          setSelectedCategory(categoryId);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  };
  


  const handlePriceChange = (priceRange) => {
    const [minPrice, maxPrice] = priceRange;
    const priceFilter = `&[filters][price][$gte]=${minPrice}&[filters][price][$lte]=${maxPrice}`;
    fetchDataFromApi(`/products?populate=*${priceFilter}`).then(res => {
      setProducts(res.data);
    });
};



const handleSortChange = (sectionName) => {
  const filteredProducts = products.filter((product) => 
    product.attributes.sections.data.some(section => 
      section.attributes.name.toLowerCase() === sectionName.toLowerCase()
    )
  );
  setProducts(filteredProducts); 
}

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };


  return (

  <>
    {isLoading && (
      <div className="loader">
          <img src={loader} alt="Loading..." />
      </div>
  )}

{!isLoading && (

<section className="listingPage">
      
      <div className="container-fluid">
        <div className="breadcrumb flex-column" style={{backgroundColor:"#D09C25"}}>
          <h2>Products Under GH₵300</h2>
          <ul className="list list-inline">
            <li className="list-inline-item">
              <Link to="">Home</Link>
            </li>
          </ul>
        </div>

        <div className="listData">
          <div className="row">
            <div className={`col-md-3 sidebarWrapper ${isOpenSidebar && 'click'}`}>
              <Sidebar 
              
              isOpen={isOpenSidebar} 
               categories={categories}
                onCategoryClick={handleCategoryClick}
                onPriceChange={handlePriceChange}
                handleSortChange={handleSortChange }
                
                />
            </div>

            <div className="col-md-9 rightContent homeProducts pt-0">
              
                                <div className="topStrip d-flex align-items-center">
                                <p className='mb-0'>We found <span className='text-primary'>({products.length})</span> items for you!</p>
                                <div className="showdropdown ml-auto d-flex align-items-center">
                                    <div className="tab_ position-relative">
                                    <Button className=''  onClick={() =>
                                                    setisOpenDropDown(!isOpenDropDown)}>Show:10</Button>
                                    {isOpenDropDown !== false && (
                                    <ul className="dropdownMenu-show">
                                                    <li> <Button className="align-item-center" onClick={() =>  setisOpenDropDown(false)}> 50 </Button></li>
                                                    <li> <Button className="align-item-center" onClick={() => setisOpenDropDown(false)}> 100 </Button></li>
                                                    
                                                    <li> <Button className="align-item-center" onClick={() => setisOpenDropDown(false)}>150</Button></li>
                                                    <li> <Button className="align-item-center" onClick={() => setisOpenDropDown(false)}>All</Button></li>
                                                    
                                    </ul>
                                    )}
                                    </div>
                                    {/* <div className="tab_ ml-5">
                                    <Button className='' onClick={() =>
                                                    setisOpenDropDown2(!isOpenDropDown2)}>Sort by:</Button>
                                                    {isOpenDropDown2 !== false && (
                                    <ul className="dropdownMenu-show">
                                                    <li> <Button className="align-item-center" onClick={() =>setisOpenDropDown2(false)}> Price: Low to High</Button></li>
                                                    <li> <Button className="align-item-center" onClick={() => setisOpenDropDown2(false)}> Price: High to Low</Button></li>
                                                    
                                                    <li> <Button className="align-item-center" onClick={() => setisOpenDropDown2(false)}> Release Date</Button></li>      
                                                    <li> <Button className="align-item-center" onClick={() => setisOpenDropDown2(false)}> Ave. Date</Button></li>
                                                    
                                    </ul>
                                    
                                    )}

                                    </div> */}
                                
                                    <div className="tab_ ml-5 filterBtn">
                                    {
                                    windowWidth < 992 &&  <Button className='btn-g btn-lg w-50 text-white ' onClick={toggleSidebar}>
                                        <FilterAltIcon/>
                                    </Button>
                                }
                                            

                                    </div>
                                </div>
                                </div>

              <div className="productRow pl-5 pr-3 cursor">
                {products.map(product => (
                  <div className="item" key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                    <Product
                      tag={product.attributes.product_states.data[0].attributes.title}
                      image={import.meta.env.VITE_REACT_UPLOAD_URL + product.attributes.img.data[0].attributes.url}
                      category={product.attributes.categories.data[0].attributes.title}
                      title={product.attributes.title.length > 30 ? product.attributes.title.substring(0, 20) + '...' : product.attributes.title}
                      rating={product.attributes.rating}
                      brand={product.attributes.vendor.data.attributes.title}
                      price={`GH₵ ${product.attributes.price}`}
                      oldPrice={`GH₵ ${product.attributes.old_price}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

)}
  </>
   
  );
};

export default Under;


