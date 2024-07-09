import { createContext, useState } from "react";

export const Context = createContext();


export const filterProductsByCategory = (products, categoryId) => {
    return products.filter((product) =>
      product.attributes.categories.data.some(
        (category) => category.id === categoryId
      )
    );
  };


const AppContext = ({ children }) => {
    const [banner, setBanner] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [smallBanner, setSmallBanner] = useState([]);
    const [promo, setPromo] = useState([]);
    const [singleProduct, setSingleProduct] = useState([]);
    const [section,setSection] =useState([])
    const [sec, setSec]= useState([])
    const [vendors, setVendors]= useState([])


    return (
        <Context.Provider 
            value={{
                banner,
                setBanner,
                categories,
                setCategories,
                products,
                setProducts,
                smallBanner,
                setSmallBanner,
                promo,
                setPromo,
                singleProduct, 
                setSingleProduct,
                sec,setSec,
                vendors,setVendors,
                section,setSection,
                filterProductsByCategory,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;
