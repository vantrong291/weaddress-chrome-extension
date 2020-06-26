import axios from 'axios';
import {BACKEND_IP} from "./constants";
import {getCookie} from './cookieHandler'

export default {
    get: function(_context, _path, _data, _success, _error) {
        const token = getCookie(_context, "bearerToken");
        if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const url = BACKEND_IP + _path;
        axios.get(url, {params: _data}).then((res) => {
            if(_success) _success(res.data);
            else console.log(res.data);
        }).catch((err) => {
            if(_error) _error(err);
            else console.log(err);
        })
    },
    post: function(_context, _path, _data, _success, _error) {
        const token = getCookie(_context, "bearerToken");
        if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const url = BACKEND_IP + _path;
        axios.post(url, _data).then((res) => {
            if(_success) _success(res.data);
            else console.log(res.data);
        }).catch((err) => {
            if(_error) _error(err);
            else console.log(err);
        })
    },
    put: function (_context, _path, _data, _success, _error) {
        // const token = getCookie(_context, "bearerToken");
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const url = BACKEND_IP + _path;
        axios.put(url, _data).then((res) => {
            if(_success) _success(res);
            else console.log(res.data);
        }).catch((err) => {
            if(_error) _error(err);
            else console.log(err);
        })
    },
    delete: function (_context, _path, _data, _success, _error) {
        // const token = getCookie(_context, "bearerToken");
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const url = BACKEND_IP + _path;
        axios.delete(url, {data: _data}).then((res) => {
            if(_success) _success(res);
            else console.log(res.data);
        }).catch((err) => {
            if(_error) _error(err);
            else console.log(err);
        })
    }
};
