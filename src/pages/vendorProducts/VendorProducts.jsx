import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../../utils/Context';
import { fetchDataFromApi } from '../../../utils/api';
import Product from '../../components/products/Product';
import Pagination from '@mui/material/Pagination';

const VendorProducts = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { title } = useParams();
    const [categoryName, setCategoryName] = useState('');
    const { products, setProducts, categories, setCategories } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        getProductsByVendor();
        getCategoryNameById();
        getCategories();
    }, [title]);

    const getCategories = () => {
        fetchDataFromApi('/categories?populate=*')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    const getProductsByVendor = async () => {
        try {
            const query = `/products?populate=*&[filters][vendor][title]=${title}`;
            const encodedQuery = encodeURI(query);
            const res = await fetchDataFromApi(encodedQuery);
            console.log('Products by Vendor:', res); // Log the entire response object
            if (res && res.data) {
                setProducts(res.data);
            } else {
                console.error('No data found in response:', res);
            }
            setLoading(false);
        } catch (error) {
            console.error(`Error fetching products by vendor ID: ${error.message}`);
            setLoading(false);
        }
    };

    const getCategoryNameById = () => {
        fetchDataFromApi(`/vendors?populate=*&[filters][title]=${title}`)
            .then((res) => {
                setCategoryName(res.data);
            })
            .catch((error) => {
                console.error('Error fetching category:', error);
            });
    };

    const toggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);

    return (
        <>
            <section className="listingPage">
                <div className="container-fluid">
                    <div className="breadcrumb flex-column" style={{ backgroundColor: '#055f8c' }}>
                        <h2>
                            {categoryName.length > 0 ? (
                                categoryName.map((item, index) => {
                                    return <span key={index}>{item.attributes.title} Products</span>;
                                })
                            ) : (
                                <span>Loading...</span>
                            )}
                        </h2>

                        <ul className="breadcrumb" style={{ backgroundColor: '#055f8c' }}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                {categoryName.length > 0 ? (
                                    categoryName.map((item, index) => {
                                        return (
                                            <span key={index} style={{ color: '#c2c2c' }}>
                                                {item.attributes.title}{' '}
                                            </span>
                                        );
                                    })
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

                            {/* products list  */}
                            <div className="col-md homeProducts pt-0">
                                <div className="topStrip d-flex align-items-center">
                                    <p className="mb-0 m-4">
                                        We found{' '}
                                        <span className="text-primary">
                                            ({products.length})
                                        </span>{' '}
                                        items for you!
                                    </p>
                                </div>

                                <div className="productRow pl-4 pr-3">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        paginatedProducts.map((product) => (
                                            <div className="item" key={product.id}>
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="text-decoration-none"
                                                >
                                                    <Product
                                                        tag={
                                                            product.attributes
                                                                .product_states?.data?.[0]?.attributes?.title || ""
                                                        }
                                                        image={
                                                            product.attributes.img?.data?.[0]?.attributes?.url
                                                                ? `${import.meta.env.VITE_REACT_UPLOAD_URL}${product.attributes.img.data[0].attributes.url}`
                                                                : ""
                                                        }
                                                        category={
                                                            product.attributes.categories?.data?.[0]?.attributes?.title || ""
                                                        }
                                                        title={
                                                            product.attributes.title.length >
                                                            30
                                                                ? product.attributes.title.substring(
                                                                      0,
                                                                      20
                                                                  ) + '...'
                                                                : product.attributes.title
                                                        }
                                                        rating={
                                                            product.attributes.rating
                                                        }
                                                        brand={
                                                            product.attributes
                                                                .vendor?.data?.attributes?.title || ''
                                                        }
                                                        price={`GH₵ ${new Intl.NumberFormat().format(product.attributes.price)}`}
                                                        oldPrice={`GH₵ ${new Intl.NumberFormat().format(product.attributes.old_price || 0)}`}
                                                    />
                                                </Link>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <Pagination
                                    count={Math.ceil(products.length / productsPerPage)}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    className="mt-4"
                                />
                            </div>
                            {/* products list */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VendorProducts;
