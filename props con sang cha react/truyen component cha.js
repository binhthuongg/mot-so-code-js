import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchHeader from "src/components/SearchHeader";
import "./styles.scss";

function CustomerInformation(props) {
  const history = useHistory();
  const [data, setData] = useState([]);

  const onReceiveData = (dataReceive) => {
    console.log("dataReceive", dataReceive);
    setData(dataReceive);
  };

  const renderButton = () => {
    return ">";
  };

  const handleClick = (event) => {
    const { cifNumber } = event.data;
    history.push(`/customer/customer-detail?cifNumber=${cifNumber}`);
  };

  return (
    <div className="customerInformation">
      <SearchHeader onReceiveData={onReceiveData} />
      <div className="content">
        <DataTable
          value={data}
          className="p-datatable-striped p-datatable-gridlines"
          onRowClick={handleClick}
        >
          <Column field="cifNumber" header="Mã khách hàng" sortable></Column>
          <Column field="fullName" header="Tên khách hàng" sortable></Column>
          <Column
            field="idCardNumber"
            header="Số giấy tờ tùy thân"
            sortable
          ></Column>
          <Column field="phoneNumber" header="Số điện thoại" sortable></Column>
          <Column body={renderButton}></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default CustomerInformation;
