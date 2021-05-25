import { configureStore } from '@reduxjs/toolkit';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
// Import Swiper styles
import 'swiper/swiper.scss';
import { isClientSide, isLogin } from '../commons/utils';
import LayoutMain from '../layouts/LayoutMain/index';
import { ComponentLayout } from '../models/ComponentModel';
import rootReducer from '../reducers/index';
import styles from '../styles/globals';

// create store
const store = configureStore({
    reducer: rootReducer,
});

const DEFAULT_LAYOUT = LayoutMain;

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
    // lấy thêm Component.layout, mặc định là LayoutMain
    const Layout =
        ((Component as unknown) as ComponentLayout).Layout || DEFAULT_LAYOUT;

    const renderContent = () => {
        const logInUrl = '/dang-nhap';
        if (!isLogin() && isClientSide && Router.pathname !== logInUrl) {
            Router.push('/dang-nhap');
            return;
        }
        return (
            <>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <style jsx global>
                    {styles}
                </style>
            </>
        );
    };
    return (
        <Provider store={store}>
            <div className='appWrapper'>
                <Head>
                    <title>Sunshine TV</title>
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='SunshineTv' />
                    <meta
                        property='og:description'
                        content='SunshineTv - Sunshine Group'
                    />
                    <link rel='shortcut icon' href='/favicon.svg' />
                    <meta property='og:url' content='https://sunshinetv.vn/' />
                    <meta property='og:site_name' content='SunshineTv' />
                    <meta
                        property='og:image'
                        content='https://apilibarybook.sunshinegroup.vn/swagger/img-book/avatar/lien_minh_cong_ly_11.jpg'
                    />
                    <link
                        rel='stylesheet'
                        type='text/css'
                        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
                    />
                    <meta property='og:image:width' content='1920' />
                    <meta property='og:image:height' content='1080' />
                </Head>
                {renderContent()}
            </div>
        </Provider>
    );
}

export default appWithTranslation(MyApp);
