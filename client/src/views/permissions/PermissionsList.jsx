
    import React, { useEffect, useRef, useState } from 'react'
    import CommonTable from '../../components/commons/CommonTable'
    import {
        MoreOutlined,
        ReloadOutlined
    } from '@ant-design/icons';
    import { Button, Dropdown, Input } from 'antd';
    import styled from 'styled-components';
    import CommonModal from '../../components/commons/CommonModel';

    import permissionsService from './PermissionsService';
    import PermissionsEdit from './PermissionsEdit';
    import { NavLink, useSearchParams } from 'react-router-dom';
    import { SearchInputStyle } from '../../components/commons/CommonStyles';
    import CommonDeleteModal from '../../components/commons/CommonDeleteModal';
    import { useDispatch, useSelector } from 'react-redux';
    import { searchPermissions, updatePermissionsState, permissionsSearchText } from './PermissionsRedux';

    const PermissionsList = () => {
        const [permissionsData, setPermissionsData] = useState([])
        const [total, setTotal] = useState()

        const searchText = useSelector(permissionsSearchText);
        const [loading, setLoading] = useState();
        const [permissionsSelection, setPermissionsSelection] = useState([])
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

        const [modeID, setModeID] = useState('');
        const [searchParams, setSearchParams] = useSearchParams()

        const delayTimerRef = useRef(null);
        const dispatch = useDispatch();

        const getPaginationInfo = () => {

            return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
        }


        useEffect(() => {
            const [page, limit] = getPaginationInfo();
            dispatch(updatePermissionsState({ page: page, limit: limit }))
            // setSearchParams({ ...Object.fromEntries(searchParams), 'searchText': e.target.value })
            searchData()
        }, [])
        

    async function searchData() {
            try {
                setLoading(true)
                const { payload } = await dispatch(searchPermissions());
                setPermissionsData(payload.data)
                setTotal(payload.total)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }


        const searchHandler = (e) => {
            const { value } = e.target;
            const [page, limit] = getPaginationInfo();

            // setSearchParams({ page: page, limit: limit })
            dispatch(updatePermissionsState({ page: page, limit: limit, searchText: value }))
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = setTimeout(() => {


                searchData()
            }, 500);


        }

        const handlePagination = async (page, pageSize) => {
            // permmission exmple

            // if (!(await authService.checkPermmision('permissions', 'read'))) {
            //     return message.error('You have not a permmission');
            // }

            setSearchParams({ page: page, limit: pageSize })
            dispatch(updatePermissionsState({ page: page, limit: pageSize }))

            searchData()
        }

        const tableChange = (pagination, filters, sorter) => {
            const { field, order } = sorter;
            dispatch(updatePermissionsState({ sort: field, order: order }))

            searchData()
        }
        
        
        
        const handleReload = () => {
            const [page, limit] = getPaginationInfo();

            setSearchParams({ page: 1, limit: 5 })
            dispatch(updatePermissionsState({ page: 1, limit: 5, sort: '', order: '', searchText: '' }))


            searchData();
        }
        

        const handleDelete = async () => {
            try {
                setLoading(true)
                const data = await permissionsService.deletePermission(modeID);
                setIsDeleteModalOpen(false)

                searchData()
                setLoading(false)
            }catch (err) {
                setLoading(false)
            }
        }
        
        const onClick = ({ key }, record) => {
            if (key == 'edit') {

                setIsModalOpen(true)
            } else if (key === 'delete') {
                setIsDeleteModalOpen(true)
            }
        };
        
        
        const items = [
            {
                key: 'edit',
                label: (
                    <Button type="text">Edit</Button>
                ),


            },
            {
                key: 'delete',
                label: (
                    <Button type="text"> Delete</Button>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item
                    </a>
                ),
            },
        ];
        
        
        
    
    const columns = [
        
                {
                title: ' ',
                dataIndex: 'action',
                render: (_, recored) => {
                    return (
                        <Dropdown
                            menu={{
                                items,
                                onClick: (value) => onClick(value, recored)
                            }}
                            trigger={['click']}

                            placement="bottomLeft"
                        >
                            <Button type='text' icon={<MoreOutlined style={{ fontSize: 20 }} />} onClick={() => {
                                setModeID(recored._id)
                            }}>

                            </Button>
                        </Dropdown>
                    )
                },

            },
            
     
            {
                title: 'perm_name',
                dataIndex: 'perm_name',
                render: (text, recored) => {
                    return <NavLink style={{ color: "#2f1dca" }} state={recored} to={`${recored._id}`}>{text}</NavLink>
                },
                sorter: true




            },
            
    ];
    
    return (
            <div>

                {
                    isModalOpen ? <CommonModal 
                    title={"Access Control"}
                    width={1000} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
                    <PermissionsEdit permissionsData={permissionsData} searchData={searchData} setMode={setModeID} mode={modeID} isModelOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    </CommonModal> : ""
                }

                {
                    isDeleteModalOpen ?
                        <CommonDeleteModal setIsModalOpen={setIsDeleteModalOpen}
                            handleDelete={handleDelete}
                            loading={loading}
                            isModalOpen={isDeleteModalOpen}  >
                            <h1 className=' text-2xl'>Are you sure?</h1>
                        </CommonDeleteModal> : ""
                }



                <HeaderStyle>
                    <div className='header_left'>
                        <p>Permissions</p>
                    </div>

                    <Button onClick={handleReload} size='large' >
                        <ReloadOutlined size={25} style={{ color: 'white', fontSize: 20 }} />
                    </Button>


                    <div className='header_right'>
                        <Button onClick={() => {
                            setModeID('')
                            setIsModalOpen(true)
                        }} size='large' >Add</Button>

                    </div>

                </HeaderStyle>


                <div className='flex flex-row gap-6'>
                    <SearchInputStyle>
                        <Input onChange={searchHandler}
                            placeholder="Search"
                            value={searchText}
                            allowClear />
                    </SearchInputStyle>


                </div>

                <CommonTable
                    rowSelectionType={"checkbox"}
                    data={permissionsData}
                    columns={columns}
                    setSelection={setPermissionsSelection}
                    handlePagination={handlePagination}
                    total={total}
                    loadding={loading}
                    tableChange={tableChange}

                />
            </div>
        )
    }
    
    const HeaderStyle = styled.div`
    display: flex;
    margin: 0;
    padding:20px;
    margin-bottom: 40px;
    position: sticky;
    top: 0px;
    z-index: 100;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,217,217,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);
    .header_left{
        p{
            color: 1e2987;
            font-size: 20px;
        }
    }

    button{
        margin-left:15px;

    }
    .header_right{
                button{
                    margin-left:15px;
                    background: #096e30;
                    padding: 7px 30px !important;
                    color: wheat;
                }
                button:hover{
                    color: white;
                }
            }
    `

    export default PermissionsList
    