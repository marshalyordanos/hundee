
    import { Divider } from 'antd'
    import React from 'react'
    import { useLocation } from 'react-router-dom'
    import styled from 'styled-components'


    
    const Group_usersDetail = () => {
    const {state} = useLocation();
    return (
    <DetailStyle>
        <h1>User Detail</h1>
        <Divider  style={{margin:'15px 0 25px 0'}} />

    
    
    
                <div className='detail_child'>
                <p className='detail_key'>fullname:</p>
                <p className='detail_value'>{state?.fullname}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>username:</p>
                <p className='detail_value'>{state?.username}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>email:</p>
                <p className='detail_value'>{state?.email}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>issystemadmin:</p>
                <p className='detail_value'>{state?.issystemadmin?'true':'false'}</p>  
            </div>
            

    </DetailStyle>
  )
}
    


    const DetailStyle = styled.div`
        border: 1px lightgray;
        margin: 30px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        h1{
            padding: 0;
            margin: 0;
            font-size: 16px;

        }
        .detail_child{
            margin-bottom: 15px;
        }
        .detail_key{
            font-size: 20px;
            font-weight: bold;
        }
        .detail_value{
            color: #106085;
            font-size: 20px;
        }

`

export default Group_usersDetail
    