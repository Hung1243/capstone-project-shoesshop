import axios from "axios";
import { useFormik } from "formik";
import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

//Gõ text => url (setSearchParams)
//Get từ url => về component gọi api (searchParams.get('key'))
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [arrProduct, setArrProduct] = useState([]);
  const tuKhoa = searchParams.get("keyword");
  console.log(arrProduct);
  const formSearch = useFormik({
    initialValues: {
      keyword: tuKhoa,
    },
    onSubmit: ({ keyword }) => {
      console.log(keyword);
      //Đưa từ khoá lên url
      setSearchParams({
        keyword: keyword,
      });
    },
  });
  const [sortOrder, setSortOrder] = useState("asc");

  const getProductByKeyword = async () => {
    //Gọi api
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${tuKhoa}`,
      method: "GET",
    });

    setArrProduct(res.data.content);
  };
  useEffect(() => {
    // if (tuKhoa == '') {
    //     tuKhoa = searchParams.get('keyword')
    // }

    getProductByKeyword();
  }, [tuKhoa]);

  const handleSort = (order) => {
    setSortOrder(order);

    // Sort the array of products based on the selected order
    const sortedProducts = orderBy(arrProduct, ["price"], [order]);
    setArrProduct(sortedProducts);
  };

  return (
    <div className="container mt-5">
      <form className="frm-search mt-2" onSubmit={formSearch.handleSubmit}>
        <div className="input-group mb-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="keyword"
              placeholder="keyword"
              name="keyword"
              onChange={formSearch.handleChange}
              value={formSearch.keyword}
            />
          </div>
          <button className="input-group-button btn btn-dark">Search</button>
        </div>
      </form>
      <h3 className="my-2">Search result</h3>
      <div className="sorting-bar">
        <label className=" me-2" htmlFor="sortOrder">
          Sort by:{" "}
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className=""
          style={{
            fontSize: "14px",
            cursor: "pointer",
            padding: "5px 5px",
            borderRadius: "10px",
          }}
        >
          <option value="asc">Price, Low to High</option>
          <option value="desc">Price, High to Low</option>
        </select>
      </div>

      <div className="row">
        {arrProduct.map((prod) => {
          return (
            <div class="col-md-4 mt-2" key={prod.id}>
              <div className="card">
                <img src={prod.image} alt="..." />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>${prod.price}</p>
                  <NavLink className={"btn btn-dark"} to={`/detail/${prod.id}`}>
                    View detail
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
