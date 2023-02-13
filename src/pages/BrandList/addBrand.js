import React, { useState } from "react";
import {
    postBrands,
    fetchBrandById,
    putBrands,
} from '../../app/actions/brands';
import { useDispatch } from 'react-redux';
import { useHistory, Link, useParams } from "react-router-dom";
import * as PAGES from 'constants/pages';
import { useEffect } from "react";

const AddBrand = () => {

    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const saveOrUpdateBrand = (e) => {
        e.preventDefault();

        const brand = { name };

        if (id) {
            putBrands({
                id: id,
                brand: brand,
            })(dispatch).then(() => {
                history.push(`/${PAGES.BRAND_LIST}`);  
            }).catch(error => {
                console.log(error);
            });
        } else {
            postBrands({
                brand: brand,
            })(dispatch).then(() => {
                history.push(`/${PAGES.BRAND_LIST}`);  
            }).catch(error => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        fetchBrandById({
            id: id,
        })(dispatch).then((response) => {
            setName(response.brands.name);
        }).catch(error => {
            console.log(error);
        });
    }, [])

    const title = () => {
        if (id) {
            return <h2 className="text-center"> Update brand </h2>
        } else {
            return <h2 className="text-center"> Add brand </h2>
        }
    }

    return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Name: </label>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        name="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateBrand(e)}> Save </button>
                                <Link to={`/${PAGES.BRAND_LIST}`} className="btn btn-danger" style = {{marginLeft: "10px"}}> Back </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddBrand;