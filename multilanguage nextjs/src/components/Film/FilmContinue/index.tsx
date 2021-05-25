import React from 'react';
import Image11 from './images/category1-1.jpg';
import Image12 from './images/category1-2.jpg';
import Image13 from './images/category1-3.jpg';
import Image14 from './images/category1-4.jpg';
import Image15 from './images/category1-5.jpg';
import Image16 from './images/category1-6.jpg';
import Image17 from './images/category1-7.jpg';
import Image18 from './images/category1-8.jpg';
import './styles.scss';

type categoryType = {
    id: number;
    name: string;
    list: {
        id: number;
        name: string;
        imageUrl: string;
    }[];
};
type categoryListType = categoryType[];
function FilmCategory(): React.ReactElement {
    const categoryList: categoryListType = [
        {
            id: 1,
            name: 'Phim Âu - Mỹ',
            list: [
                {
                    id: 1,
                    name: 'Phim 1',
                    imageUrl: Image11,
                },
                {
                    id: 2,
                    name: 'Phim 2',
                    imageUrl: Image12,
                },
                {
                    id: 3,
                    name: 'Phim 3',
                    imageUrl: Image13,
                },
                {
                    id: 4,
                    name: 'Phim 4',
                    imageUrl: Image14,
                },
                {
                    id: 5,
                    name: 'Phim 5',
                    imageUrl: Image15,
                },
                {
                    id: 6,
                    name: 'Phim 6',
                    imageUrl: Image16,
                },
                {
                    id: 7,
                    name: 'Phim 7',
                    imageUrl: Image17,
                },
                {
                    id: 8,
                    name: 'Phim 8',
                    imageUrl: Image18,
                },
            ],
        },
        {
            id: 2,
            name: 'Hành động',
            list: [
                {
                    id: 1,
                    name: 'Phim 1',
                    imageUrl: Image11,
                },
                {
                    id: 2,
                    name: 'Phim 2',
                    imageUrl: Image12,
                },
                {
                    id: 3,
                    name: 'Phim 3',
                    imageUrl: Image13,
                },
                {
                    id: 4,
                    name: 'Phim 4',
                    imageUrl: Image14,
                },
                {
                    id: 5,
                    name: 'Phim 5',
                    imageUrl: Image15,
                },
                {
                    id: 6,
                    name: 'Phim 6',
                    imageUrl: Image16,
                },
                {
                    id: 7,
                    name: 'Phim 7',
                    imageUrl: Image17,
                },
                {
                    id: 8,
                    name: 'Phim 8',
                    imageUrl: Image18,
                },
            ],
        },
    ];

    // const renderListFilm = (list) => {
    //     let html = null;
    //     html = list.map((url, index) => {
    //         return (
    //             <div className='item' key={index}>
    //                 <NavLink to='/chi-tiet-phim'>
    //                     <img src={url.imageUrl} alt='' />
    //                 </NavLink>
    //             </div>
    //         );
    //     });
    //     return html;
    // };

    const renderListCategory = (categoryList: categoryListType) => {
        let html = null;
        html = categoryList.map((category, index) => {
            return (
                <div className='listCategory' key={index}>
                    <h2 className='categoryName'>{category.name}</h2>
                    <div className='listFilm'>
                        {/* {renderListFilm(category.list)} */}
                    </div>
                </div>
            );
        });
        return html;
    };

    return (
        <div className='FilmCategoryWrapper'>
            {renderListCategory(categoryList)}
        </div>
    );
}

export default FilmCategory;
