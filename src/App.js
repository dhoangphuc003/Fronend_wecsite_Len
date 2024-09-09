import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import routes from './routes'
import DefaultComponent from './components/Default/DefaultComponent'
import { isJsonString } from './utils'
import {jwtDecode} from 'jwt-decode'
import * as UserService from './service/UserService'
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/LoadingComponent'


function App() {

  const user = useSelector((state)=> state.user)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleGetDetailsUser = useCallback(async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false)
  }, [handleGetDetailsUser]);
  
  const handleDecoded =()=>{
    let storageData  =localStorage.getItem('access_token')
    let decoded ={}
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
        decoded = jwtDecode(storageData)
    }
    return {decoded,storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded}  = handleDecoded()
    if(decoded?.exp < (currentTime.getTime()/1000)){
      const data = await UserService.refreshToken();
      localStorage.setItem('access_token', data?.access_token);
      config.headers['token']= `Bearer ${data?.access_token}`
    }
    return config;
    },(error) => { 
      return Promise.reject(error);
    }
  );

  
  return (
    <div>
      <Loading isLoading={isLoading}>
        <BrowserRouter>
          <Routes>
            {routes.map((routes)=>{
              const Page = routes.page
              const isCheckAuth = !routes.isPrivate|| user.isAdmin
              // Nếu không đủ điều kiện, bỏ qua route này
              if (!isCheckAuth) return null;
              // nếu layout nào hiện header thì nó sẽ hiện 
              const Layout = routes.isShowHeader? DefaultComponent: Fragment
              return(
                <Route key={routes.path} path={isCheckAuth && routes.path} element={
                  <Layout >
                      <Page />
                  </Layout>
                }/>
              )
            })}
          </Routes>
        </BrowserRouter>
      </Loading>
    </div>
  )
}
export default App