import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import { setIn } from "final-form";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { customerApi } from "src/commons/API/customerApi";
import * as Yup from "yup";
import "./styles.scss";

/**
 * Search Header truyền data gọi từ api
 */
function SearchHeader(props) {
  const [resultText, setResultText] = useState(
    "Vui lòng chọn loại từ khóa và từ khóa tìm kiếm !"
  );
  // const [numberOfResult, setNumberOfResult] = useState(0);

  const onSubmit = (values) => {
    console.log("values", values);
    const { type, keyword } = values;
    customerApi
      .getUser(type, keyword)
      .then((response) => {
        const result = response.data.data.records;
        let numberOfResult = response.data.data.amount
          ? response.data.data.amount
          : 0;
        if (numberOfResult > 0) {
          setResultText(
            `${numberOfResult} khách hàng thỏa điều kiện tìm kiếm.`
          );
        }
        /**
         * truyền ra cho component cha
         */
        props.onReceiveData(result);
      })
      .catch((error) => {
        setResultText(`${error.message} !`);
      });
  };
  const validationSchema = Yup.object({
    type: Yup.string()
      .notOneOf(["0"], "*Vui lòng chọn loại từ khóa")
      .required("Required"),
    keyword: Yup.string().required("*Thiếu từ khóa tìm kiếm"),
  });
  const validate = (values) => {
    let error = {};
    if (values.bio && values.bio.length < 5) {
      error.bio = "too short 1";
    }
    return validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        return;
      })
      .catch((err) => {
        const errors = err.inner.reduce((formError, innerError) => {
          return setIn(formError, innerError.path, innerError.message);
        }, {});
        console.log("errors", errors);

        return errors;
      });
  };
  return (
    <div className="SearchHeader">
      <Form
        onSubmit={onSubmit}
        initialValues={{ type: "0", keyword: "" }}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <CRow className="alignBottom">
              <CCol sm="3">
                <CFormGroup>
                  <CLabel htmlFor="type">Loại từ khóa</CLabel>
                  <Field
                    name="type"
                    render={({ input, meta }) => (
                      <div>
                        <CSelect custom {...input}>
                          <option value="0" disabled>
                            Loại từ khóa
                          </option>
                          <option value="CIF_NUMBER">Mã CIF</option>
                          <option value="ID_CARD_NUMBER">Số ID của thẻ</option>
                          <option value="PHONE_NUMBER">Số điện thoại</option>
                        </CSelect>
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    )}
                  />
                </CFormGroup>
              </CCol>
              <CCol sm="4">
                <CFormGroup>
                  <CLabel>Từ khóa tìm kiếm</CLabel>
                  <Field
                    name="keyword"
                    render={({ input, meta }) => (
                      <>
                        <CInputGroup>
                          <CInput type="text" {...input} />
                          <CInputGroupAppend>
                            <CButton type="submit" color="primary">
                              Tìm
                            </CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </>
                    )}
                  />
                </CFormGroup>
              </CCol>
              <CCol sm="5">
                <CFormGroup>
                  <CButton type="button" color="primary">
                    Thêm mới
                  </CButton>
                </CFormGroup>
              </CCol>
            </CRow>
          </form>
        )}
      />
      <p className="result">{resultText}</p>
    </div>
  );
}

export default SearchHeader;
