import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Product from '../../components/products/Product';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { fetchDataFromApi } from '../../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import loader from '../../assets/images/S268.gif';
import Pagination from '@mui/material/Pagination';

const List = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);  
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    getProducts();
    getCategories();
  }, [currentPage, itemsPerPage, selectedCategory]);

  const getCategories = () => {
    fetchDataFromApi('/categories?populate=*').then(res => {
      setCategories(res.data);
    });
  };

  const getProducts = () => {
    let apiUrl = `/products?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}`;
    if (selectedCategory && selectedCategory !== 'all') {
      apiUrl += `&filters[categories][id]=${selectedCategory}`;
    }

    fetchDataFromApi(apiUrl)
      .then(res => {
        let fetchedProducts = res.data;
        if (selectedCategory === 'all') {
          fetchedProducts = shuffleArray(fetchedProducts);
        }
        setProducts(fetchedProducts);
        setTotalProducts(res.meta.pagination.total); // Update total product count
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCategoryClick = (categoryId) => {
    setCurrentPage(1); // Reset to first page when category changes
    setSelectedCategory(categoryId);
    getProducts();
  };

  const handlePriceChange = (priceRange) => {
    const [minPrice, maxPrice] = priceRange;
    const priceFilter = `&filters[price][$gte]=${minPrice}&filters[price][$lte]=${maxPrice}`;
    fetchDataFromApi(`/products?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}${priceFilter}`).then(res => {
      setProducts(res.data);
      setTotalProducts(res.meta.pagination.total); // Update total product count
    });
  };

  const handleSortChange = (sectionName) => {
    const filteredProducts = products.filter((product) => 
      product.attributes.sections.data.some(section => 
        section.attributes.name.toLowerCase() === sectionName.toLowerCase()
      )
    );
    setProducts(filteredProducts); 
  };

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const navigateToProduct = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <>
      {isLoading && (
        <div className="loader">
          <img src={loader} alt="Loading..." />
          <p>Loading...</p>
        </div>
      )}

      {!isLoading && (
        <section className="listingPage">
          <div className="container-fluid">
            <div className="breadcrumb flex-column">
              <h2>Order any product</h2>
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
                    handleSortChange={handleSortChange}
                  />
                </div>

                <div className="col-md-9 rightContent homeProducts pt-0">
                  <div className="topStrip d-flex align-items-center">
                    <p className='mb-0'>We found <span className='text-primary'>({totalProducts})</span> items for you!</p>
                    <div className="showdropdown ml-auto d-flex align-items-center">
                      <div className="tab_ position-relative">
                        <Button className='' onClick={() => setisOpenDropDown(!isOpenDropDown)}>Show: {itemsPerPage}</Button>
                        {isOpenDropDown && (
                          <ul className="dropdownMenu-show">
                            <li><Button className="align-item-center" onClick={() => { setItemsPerPage(8); setisOpenDropDown(false); }}>10</Button></li>
                            <li><Button className="align-item-center" onClick={() => { setItemsPerPage(20); setisOpenDropDown(false); }}>20</Button></li>
                            <li><Button className="align-item-center" onClick={() => { setItemsPerPage(50); setisOpenDropDown(false); }}>50</Button></li>
                            <li><Button className="align-item-center" onClick={() => { setItemsPerPage(100); setisOpenDropDown(false); }}>100</Button></li>
                          </ul>
                        )}
                      </div>
                      <div className="tab_ ml-5 filterBtn">
                        {windowWidth < 992 && <Button className='btn-g btn-lg w-50 text-white ' onClick={toggleSidebar}><FilterAltIcon/></Button>}
                      </div>
                    </div>
                  </div>

                  <div className="productRow pl-5 pr-3 cursor">
                    {products.map(product => (
                      <div className="item" key={product.id} onClick={() => navigateToProduct(product.id)}>
                        <Product
                          tag={product.attributes.product_states.data[0].attributes.title}
                          image={import.meta.env.VITE_REACT_UPLOAD_URL + product.attributes.img.data[0].attributes.url}
                          category={product.attributes.categories.data[0].attributes.title}
                          title={product.attributes.title.length > 20 ? product.attributes.title.substring(0, 15) + '...' : product.attributes.title}
                          rating={product.attributes.rating}
                          brand={product.attributes.vendor?.data?.attributes?.title || ''}
                          price={`GH₵ ${product.attributes.price}`}
                          oldPrice={`GH₵ ${product.attributes.old_price}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="paginationContainer mt-4 d-flex justify-content-center align-items-center">
                      <Pagination 
                        count={Math.ceil(totalProducts / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined" 
                       
                        color="primary"
                      />
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

export default List;
