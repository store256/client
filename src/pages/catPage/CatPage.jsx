import { Button, Pagination } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Product from '../../components/products/Product';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../../utils/Context';
import { fetchDataFromApi } from '../../../utils/api';

const CatPage = () => {
    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const [isOpenDropDown2, setisOpenDropDown2] = useState(false);
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8); // Adjust the number of products per page here

    // category id
    const { id } = useParams();
    const [categoryName, setCategoryName] = useState('');
    const { products, setProducts, categories, setCategories } = useContext(Context);

    useEffect(() => {
        getProductsByCategory();
        getCategoryNameById();
        getCategories();
    }, [id]); // Reload products when ID changes

    // Fetch all categories
    const getCategories = () => {
        fetchDataFromApi('/categories?populate=*').then((res) => {
            setCategories(res.data);
        });
    };

    // Fetch products by category ID
    const getProductsByCategory = () => {
        fetchDataFromApi(`/products?populate=*&[filters][categories][id]=${id}`).then((res) => {
            setProducts(res.data);
        }).catch((error) => {
            console.error('Error fetching products:', error);
        });
    };

    // Fetch category name by ID
    const getCategoryNameById = () => {
        fetchDataFromApi(`/categories?populate=*&[filters][id]=${id}`).then((res) => {
            setCategoryName(res.data);
        }).catch((error) => {
            console.error('Error fetching category:', error);
        });
    };

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    // navigation

    const navigateToProduct = (productId) => {
        window.location.href = `/product/${productId}`;
      };

    // Calculate which products to display
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            <section className='listingPage'>
                <div className="container-fluid">
                    <div className="breadcrumb flex-column">
                        <h2>
                            {categoryName.length > 0 ? (
                                categoryName.map((item, index) => (
                                    <span key={index}>{item.attributes.title}</span>
                                ))
                            ) : (
                                <span>Loading...</span>
                            )}
                        </h2>

                        <ul className="breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li>
                                {categoryName.length > 0 ? (
                                    categoryName.map((item, index) => (
                                        <span key={index}>{item.attributes.title}</span>
                                    ))
                                ) : (
                                    <span>Loading...</span>
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className="listData">
                        <div className="row">
                            {/* <div className={`col sidebarWrapper ${isOpenSidebar === true && 'click'}`}>
                                <Sidebar isOpen={isOpenSidebar} categories={categories} />
                            </div> */}

                            <div className="col-md  homeProducts pt-0">
                                <div className="topStrip d-flex align-items-center">
                                    <p className='mb-0 m-4'>We found <span className='text-primary'>({products.length})</span> items for you!</p>
                                </div>

                                <div className="productRow pl-4 pr-3">
                                    {currentProducts.map(product => (
                                        <div className="item cursor" key={product.id} onClick={() => navigateToProduct(product.id)}>
                                           
                                                <Product
                                                    tag={product.attributes.product_states.data[0].attributes.title}
                                                    image={import.meta.env.VITE_REACT_UPLOAD_URL + product.attributes.img.data[0].attributes.url}
                                                    category={product.attributes.categories.data[0].attributes.title}
                                                    title={product.attributes.title.length > 30 ? product.attributes.title.substring(0, 20) + '...' : product.attributes.title}
                                                    rating={product.attributes.rating}
                                                    brand={product.attributes.vendor?.data?.attributes?.title || ""}
                                                    price={`GH₵ ${product.attributes.price}`}
                                                    oldPrice={`GH₵ ${product.attributes.old_price}`}
                                                />
                                           
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="pagination d-flex justify-content-center align-items-center">
                                    <Pagination
                                        count={Math.ceil(products.length / productsPerPage)}
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
        </>
    );
};

export default CatPage;
