import axios from "axios";
import { useFormik } from "formik";
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

  return (
    <div className="container">
      <form className="frm-search mt-2" onSubmit={formSearch.handleSubmit}>
        <div className="input-group mb-3">
          <button className="input-group-button btn btn-success">Search</button>
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
            <label htmlFor="keyword">search</label>
          </div>
        </div>
      </form>
      <h3 className="my-2">Search result</h3>
      <div className="row">
        {arrProduct.map((prod) => {
          return (
            <div class="col-md-4 mt-2" key={prod.id}>
              <div className="card">
                <img src={prod.image} alt="..." />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.price} $</p>
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
