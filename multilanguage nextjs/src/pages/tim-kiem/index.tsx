import dynamic from 'next/dynamic';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import SearchCategory from '../../components/Search/SearchCategory';
import SearchInput from '../../components/Search/SearchInput';
import SearchKeyboard from '../../components/Search/SearchKeyboard';
import SearchResult from '../../components/Search/SearchResult';
import LayoutNoSidebar from '../../layouts/LayoutNoSidebar';
import { ComponentLayout } from '../../models/ComponentModel';
// import styles from './styles.module.scss';
import styles from '../../styles/tim-kiem';

const Device = dynamic(() => import('../../components/Device'), {
    ssr: false,
});

const TimKiem: ComponentLayout = () => {
    const renderSearchNavigation = () => {
        return (
            <Device>
                {() => {
                    if (isMobileOnly) return <> </>;
                    return (
                        <div className='SearchNavigationWrapper'>
                            <SearchKeyboard />
                            {/* <SearchRelated /> */}
                            <SearchCategory />
                            <style jsx>{styles}</style>
                        </div>
                    );
                }}
            </Device>
        );
    };
    return (
        <div className='SearchWrapper'>
            <div className='rowContainer'>
                <div className='layoutInner'>
                    {renderSearchNavigation()}
                    <div className='SearchContentWrapper'>
                        <SearchInput />
                        <SearchResult />
                    </div>
                </div>
            </div>
            <style jsx>{styles}</style>
        </div>
    );
};

TimKiem.Layout = LayoutNoSidebar;

export default TimKiem;
