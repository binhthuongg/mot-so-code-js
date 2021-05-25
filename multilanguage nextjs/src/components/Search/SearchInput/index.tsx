import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import * as SearchResultType from '../../../constants/SearchResultType';
import { actionChangeInput } from '../../../features/Search/searchResultByInput';
import SearchRelated from '../SearchRelated';
import { actionSearchResultType } from '../../../features/Search/searchResultType';
import styles, { searchInputGlobalStyles } from './styles';

type stateType = {
    searchResultByInput: {
        inputText: string;
    };
};
function SearchInput(): React.ReactElement {
    const dispatch = useDispatch();
    const searchTerm = useSelector(
        (state: stateType) => state.searchResultByInput.inputText,
    );
    const formik = useFormik({
        initialValues: {
            input: searchTerm,
        },
        validationSchema: Yup.object({
            input: Yup.string(),
            // .min(2, 'too short')
            // .max(10, 'Must be 10 characters or less')
            // .required('Required'),
        }),
        onSubmit: () => {
            // console.log( values  );
        },
    });
    const [isInputActive, setIsInputActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // console.log('formik', formik);
    const { setFieldValue } = formik;

    const customHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(
            actionSearchResultType(SearchResultType.SEARCH_RESULT_TYPE_INPUT),
        );
        dispatch(actionChangeInput(value));
        setFieldValue('input', value);
        setIsInputActive(true);
    };
    /**
     * Tạo event khi click hiện mobileMenu rồi kích ra ngoài, mobileMenu sẽ ẩn
     * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
     */
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleClickOutside = (event: any) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsInputActive(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);

    const renderSearchRelated = () => {
        return <SearchRelated />;
    };
    return (
        <div
            className={`SearchInputWrapper ${
                isInputActive && searchTerm ? 'focus' : ''
            }`}
        >
            <form onSubmit={formik.handleSubmit}>
                <input
                    id='222'
                    name='input'
                    type='text'
                    onBlur={formik.handleBlur}
                    // value={formik.values.input}
                    value={searchTerm}
                    onChange={customHandleChange}
                    placeholder='Nhập tên phim, diễn viên, đạo diễn ...'
                    ref={inputRef}
                    autoComplete='off'
                    onClick={() => {
                        setIsInputActive(true);
                    }}
                />
                {formik.errors.input ? (
                    <div className='error'>{formik.errors.input}</div>
                ) : null}
            </form>
            {renderSearchRelated()}

            <style jsx>{styles}</style>
            <style jsx>{searchInputGlobalStyles}</style>
        </div>
    );
}
export default SearchInput;
