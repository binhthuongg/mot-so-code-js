import React from 'react';
import { useDispatch } from 'react-redux';
import * as SearchResultType from '../../../constants/SearchResultType';
import {
    actionClickKeyBoardBackspace,
    actionClickKeyBoardToAddLetter,
} from '../../../features/Search/searchResultByInput';
import { actionSearchResultType } from '../../../features/Search/searchResultType';
import IconBackSpace from './images/IconBackSpace.svg';
import IconSpace from './images/IconSpace.svg';
import styles from './styles';

function SearchKeyboard(): React.ReactElement {
    const dispatch = useDispatch();
    const keyBoardLetter = [
        ['a', 'ă', 'â', 'b', 'c', 'd'],
        ['đ', 'e', 'ê', 'g', 'h', 'i'],
        // eslint-disable-next-line quotes
        ['`', '?', '~', "'", '.', 'k'],
        ['l', 'm', 'n', 'o', 'ô', 'ơ'],
        ['p', 'q', 'r', 's', 't', 'u'],
        ['ư', 'v', 'x', 'y', 'z', 'f'],
        ['j', 'w', '1', '2', '3', '4'],
        ['5', '6', '7', '8', '9', '0'],
    ];
    const handleChangeSearchInput = (letter: string) => {
        dispatch(
            actionSearchResultType(SearchResultType.SEARCH_RESULT_TYPE_INPUT),
        );
        dispatch(actionClickKeyBoardToAddLetter(letter));
    };
    const handleClickBackspace = () => {
        dispatch(
            actionSearchResultType(SearchResultType.SEARCH_RESULT_TYPE_INPUT),
        );
        dispatch(actionClickKeyBoardBackspace());
    };
    const renderKeyBoardRow = (row: string[]) => {
        const html = [];
        for (let i = 0; i < row.length; i += 1) {
            html.push(
                <td key={i} onClick={() => handleChangeSearchInput(row[i])}>
                    {row[i]}
                    <style jsx>{styles}</style>
                </td>,
            );
        }
        return html;
    };
    const renderKeyBoardLetter = (keyBoardLetter: string[][]) => {
        let html = null;
        html = keyBoardLetter.map((row: string[], index: number) => {
            return <tr key={index}>{renderKeyBoardRow(row)}</tr>;
        });
        return html;
    };
    return (
        <table className='SearchKeyBoard'>
            <tbody>
                <tr className='firstRow'>
                    <td
                        colSpan={3}
                        onClick={() => handleChangeSearchInput(' ')}
                    >
                        <img src={IconSpace} alt='' />
                    </td>
                    <td colSpan={3} onClick={() => handleClickBackspace()}>
                        <img src={IconBackSpace} alt='' />
                    </td>
                </tr>
                {renderKeyBoardLetter(keyBoardLetter)}
            </tbody>
            <style jsx>{styles}</style>
        </table>
    );
}
export default SearchKeyboard;
