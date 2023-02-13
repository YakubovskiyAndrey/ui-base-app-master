import {
    getJson,
    postJson,
    putJson,
    deleteJson,
  } from 'requests';

const getBrands = () => {
    return getJson({
        url: `http://localhost:8080/api/brands/all`,
      });  
}

const getBrandById = (id) => {
    return getJson({
        url: `http://localhost:8080/api/brands/${id}`,
      });  
}

const saveBrands = (brand) => {
    return postJson({
        body: brand,
        url: `http://localhost:8080/api/brands`,
      });  
}

const fetchPutBrand = (id, brand) => {
    return putJson({
        body: brand,
        url: `http://localhost:8080/api/brands/${id}`,
      });  
}

const fetchDeleteBrand = (id) => {
    return deleteJson({
        url: `http://localhost:8080/api/brands/${id}`,
      });  
}

const receiveBrands = brands => ({
    brands, type: 'RECEIVE_BRANDS'
});

const requestBrands = () => ({
    type: 'REQUEST_BRANDS'
});

const errorReceiveBrands = () => ({
    type: 'ERROR_RECEIVE_BRANDS'
});

const requestAddBrand = () => ({
    type: 'REQUEST_ADD_BRAND'
  });

export const fetchBrands = () => async (dispatch) => {
    dispatch(requestBrands());

    try {
        const brands = await getBrands();
        return dispatch(receiveBrands(brands));
    } catch {
        return dispatch(errorReceiveBrands());
    }
};

export const fetchBrandById = ({id}) => async (dispatch) => {
    dispatch(requestBrands());

    try {
        const brand = await getBrandById(id);
        return dispatch(receiveBrands(brand));
    } catch {
        return dispatch(errorReceiveBrands());
    }
};

export const postBrands = ({brand}) => async (dispatch) => {
    dispatch(requestBrands());

    try {
        await saveBrands(brand);
        return dispatch(requestAddBrand());
    } catch {
        return dispatch(errorReceiveBrands());
    }
};

export const putBrands = ({id, brand}) => async (dispatch) => {
    dispatch(requestBrands());

    try {
        await fetchPutBrand(id, brand);
        return dispatch(requestAddBrand());
    } catch {
        return dispatch(errorReceiveBrands());
    }
};

export const deleteBrands = ({id}) => async (dispatch) => {
    dispatch(requestBrands());

    try {
        await fetchDeleteBrand(id);
        return dispatch(requestAddBrand());
    } catch {
        return dispatch(errorReceiveBrands());
    }
};