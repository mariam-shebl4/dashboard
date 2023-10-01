import { Spin } from "antd";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div style={{position:'absolute',transform:"translate(-50%,-50%)",top:'40%',left:'50%'}}>

    <Spin size="large" />
      </div>
    )
  }