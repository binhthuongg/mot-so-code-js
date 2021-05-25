import React from 'react';

// add kiểu Layout vào Component trong AppProps

// tạo kiểu mới từ kiểu cũ
// interface AppEx extends AppProps {
// 	Component: ComponentEx;
// }
// tạo thêm layout
// interface ComponentEx extends React.FC {
// 	Layout: React.FC;
// }

// khai báo Component Layout có PropType mặc định là {} (object rỗng) + layout là 1 Function Component
// truyền thêm ComponentLayout<PropType> để định dạng Function có props truyền vào? nếu ko có props thì ko cần, mà có props thì bắt buộc
// tức là: Component layout có truyền vào props {} thì FunctionComponent cũng có props {}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ComponentLayout<PropType = any>
    extends React.FunctionComponent<PropType> {
    Layout?: React.FunctionComponent;
}

// export interface ComponentLayout extends React.ReactElement {
// 	Layout: React.FunctionComponent;
// }
