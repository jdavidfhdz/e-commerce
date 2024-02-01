import { Service } from './Service';
import { API } from './Endpoints';

const getAppVersion = () => {
  return Service.get(API.app.version, {});
};

const getAppWelcome = () => {
    return Service.get(API.app.welcome, {});
};

const getProviderList = (page) => {
    return Service.get(`${API.providers.getAll}?per_page=5&page=${page}`, {});
}

const saveProvider = (params) => {
    return Service.post(API.providers.create, params);
}

const deleteProvider = (param) => {
    return Service.delete(`${API.providers.delete}/${param}`, {})
}

export { getAppVersion, getAppWelcome, getProviderList, saveProvider, deleteProvider }