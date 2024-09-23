import axios from "axios"
import {
    axiosJWT
} from "./UserService"

export const getAllProduct = async (search = '', limit=39 , sort = '', type = '') => {
    try {
        // Cấu hình URL cơ bản
        let url = `${process.env.REACT_APP_API_URL}/product/getAll?limit=${limit}`;
        // Thêm tham số tìm kiếm nếu có
        if (search.length > 0) {
            url += `&filter=name&filter=${search}`;
        }
        
        if (type.length > 0) {
            url += `&filter=type&filter=${type}`;
        }
        
        // Thêm tham số sắp xếp nếu có
        if (sort.length > 0) {
            url += `&sort=${sort}`;
        }
        
        // Gửi request đến API
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        throw error;
    }
};

export const getAllProductByType = async (type, page, limit) => {
    try {
        if (type) {
            const  res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll?filter=type&`, {
                params: { filter: type, page: page, limit: limit}
            });
            return res.data;

        } 
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        throw error;
    }
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data
}
export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/detail/${id}`)
    return res.data
}
export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
export const deleteManyProduct = async (ids, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, ids, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`);
    return res.data;
};