import React, { useEffect } from 'react'
import { useMoralisCloudFunction } from 'react-moralis';
import { SearchAlt } from 'styled-icons/boxicons-regular'
import ReactDOM from 'react-dom'
import {Link, useNavigate} from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { defaultImgs } from '../defaultimgs';

function Search() {
    let searchResults = null;
    let root;
    let container;

    const navigate = useNavigate();

    useEffect(() => {
        
    }, )

    async function ChangeText() {
        const value = document.getElementById('searchBox').value;
        if (value !== ''){
        const topFive = await fetch('https://xmwmmjtl4nof.usemoralis.com:2053/server/functions/searchUsers?_ApplicationId=2b2E4Epka26DcaMAYl47THoeoL43kPa3Zx3FUobQ&input=' + value)
        .then((result) => {return result.json()})
        ShowTopResults(topFive);
    }
    }

    function ShowTopResults(results) {
        if (root == null){
            container = document.getElementById('searchResultRoot')
        }
            if (results.result.length > 0){
            searchResults = <div className='bg-[#202020] outline-[#343536] outline outline-1 h-auto w-full p-5 space-y-5'>
            {results.result.map((user) => (
                    <button onClick={() => navigate('/u/' + user.ethAddress)} className='flex flex-row space-x-3 place-items-center'><img src={user.pfp ? user.pfp : defaultImgs[0]} className='w-6 h-6 rounded-full flex-none'/><span className='text-white text-lg'>{user.username.substr(0, 12)}{user.username.length > 12 ? '...' : ''}</span></button>
              ))}
              </div>
              }
              else {
                  searchResults = null;
              }
        ReactDOM.render(searchResults, container);
    }

  return (
        <div className='tracking-widest w-[300px] mt-10  space-y-2'>
            <div className='w-full bg-[#202020] outline-[#343536] outline outline-1 flex flex-row p-2 rounded-md'>
                <SearchAlt className='w-7 flex-none ml-4'/>
                <input placeholder='Search Users' className='p-2 bg-transparent w-full outline-none' id='searchBox' onChange={ChangeText}/>
            </div>
            <div id='searchResultRoot'/>
        </div>
  )
}

export default Search