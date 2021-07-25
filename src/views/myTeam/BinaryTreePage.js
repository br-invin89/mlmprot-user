import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { callGetApiWithAuth } from 'utils/api'
import TreeView from './binaryTree/TreeView'
const plan = process.env.REACT_APP_COMPENSATION_PLAN

const BinaryTreePage = () => {
  const dispatch = useDispatch()
  const [nodeCount, setNodeCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const [treeData, setTreeData] = useState(undefined)
  const shouldSearchAgain = useSelector(state=>state.binaryTree.shouldSearchAgain)
  const searchingUserId = useSelector(state=>state.binaryTree.searchingUserId)  

  useEffect(() => {
    loadTreeData('')
    dispatch({ type: 'binaryTree.INIT' })
  }, [])
  useEffect(() => {
    if (shouldSearchAgain) {
      loadTreeData(searchingUserId)
    }
  }, [shouldSearchAgain])
  const loadTreeData = (userId) => {
    setIsLoading(true)
    setTreeData(undefined)
    let params = []
    params['user_id'] = userId
    params['nodes'] = nodeCount
    let queryParams = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth('myteam/unilevel/tree?'+queryParams, onGetTreeData, onFailTreeData)
  }
  const loadRoot = () => {
    loadTreeData('')
    dispatch({ type: 'binaryTree.INIT' })
  }
  const loadParent = () => {
    if (treeData.sponsor_id) {
      loadTreeData(treeData.sponsor_id)
    }
  }
  const search = (userId) => {
    loadTreeData(userId)
  }
  const onGetTreeData = (data) => {
    setIsLoading(false)
    let data_ = data.data
    
    setTreeData(data_)
    dispatch({ type: 'binaryTree.SEARCH_DONE' })
  }
  const onFailTreeData = () => {
    setIsLoading(false)
    dispatch({ type: 'binaryTree.SEARCH_DONE' })
  }

  return (
    <TreeView 
      treeData={treeData} 
      isLoading={isLoading} 
      loadRoot={loadRoot}
      loadParent={loadParent}
      search={search}
    />
  )
}

export default BinaryTreePage
