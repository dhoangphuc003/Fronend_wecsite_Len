import { Spin } from 'antd';
import React from 'react';
const Loading = ({children, isLoading}) => {
    return (
        <Spin spinning={isLoading} tip="Loading...">
            {children}
        </Spin>
    )
}
export default Loading;