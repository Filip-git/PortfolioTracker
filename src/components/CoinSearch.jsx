import React, { useState } from 'react';
import CoinItem from './CoinItem';

const CoinSearch = ({ coins }) => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 20;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(coins.length / coinsPerPage)));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(coins.length / coinsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='rounded-div my-4'>
            <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
                <h1 className='text-2xl font-bold my-2'>Search Crypto</h1>
                <form>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl'
                        type='text'
                        placeholder='Search a coin'
                    />
                </form>
            </div>

            <table className='w-full border-collapse text-center'>
                <thead>
                    <tr className='border-b'>
                        <th></th>
                        <th className='px-4'>#</th>
                        <th className='text-left'>Coin</th>
                        <th></th>
                        <th>Price</th>
                        <th>24h % </th>
                        <th className='hidden sm:table-cell'>Market Cap</th>
                        <th className='hidden md:table-cell'>Volume (24h)</th>
                        <th>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    {coins
                        .slice((currentPage - 1) * coinsPerPage, currentPage * coinsPerPage)
                        .filter((value) => {
                            const searchTerm = searchText.toLowerCase();
                            return (
                                searchTerm === '' ||
                                value.name.toLowerCase().includes(searchTerm) ||
                                value.symbol.toLowerCase().includes(searchTerm)
                            );
                        })
                        .map((coin) => (
                            <CoinItem key={coin.id} coin={coin} />
                        ))}
                </tbody>
            </table>

            {coins.length > coinsPerPage && (
                <div className='flex justify-center mt-4'>
                    <button
                        onClick={handlePrevPage}
                        className={`m-2 p-2 bg-button text-btnText rounded-2xl shadow-xl text-text-primary cursor-pointer hover:shadow transition duration-300 ${currentPage === 1 && 'bg-gray-400 opacity-50 cursor-not-allowed'
                            }`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`m-2 p-2 bg-button text-btnText rounded-2xl shadow-xl text-text-primary cursor-pointer hover:shadow transition duration-300 ${currentPage === number && 'bg-gray-400'
                                }`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={handleNextPage}
                        className={`m-2 p-2 bg-button text-btnText rounded-2xl shadow-xl text-text-primary cursor-pointer hover:shadow transition duration-300 ${currentPage === Math.ceil(coins.length / coinsPerPage) &&
                            'opacity-50 cursor-not-allowed bg-gray-400'
                            }`}
                        disabled={currentPage === Math.ceil(coins.length / coinsPerPage)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CoinSearch;