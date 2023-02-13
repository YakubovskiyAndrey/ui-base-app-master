import React, { useEffect, useState } from "react";
import {
    fetchBrands,
    deleteBrands,
} from '../../app/actions/brands';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as PAGES from 'constants/pages';

const ListBrandsComponent = () => {

    const [brands, setBrands] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        getAllBrands();
    }, [])

    const getAllBrands = () => {
        fetchBrands()(dispatch).then((response) => {
            setBrands(response.brands);
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteBrand = (brandId) => {
        deleteBrands({
            id: brandId
        })(dispatch).then(() => {
            getAllBrands();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-cener">Brands</h2>
            <Link to = {`/${PAGES.ADD_BRAND}`} className="btn btn-primary mb-2"> Add brand </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        brands.map(
                            brand =>
                                <tr key={brand.id}>
                                    <td> {brand.id} </td>
                                    <td> {brand.name} </td>
                                    <td> 
                                       <Link className="btn btn-info" to={`/${PAGES.EDIT_BRAND}/${brand.id}`}> Update </Link>
                                       <button className="btn btn-danger" onClick={() => deleteBrand(brand.id)}
                                       style = {{marginLeft: "10px"}}> Delete </button> 
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListBrandsComponent;