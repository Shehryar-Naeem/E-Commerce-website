import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrderItems.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrorAction,
  myOrderItemsAction,
} from "../../Actions/orderItemAction";
import LoadingComp from "../Layout/Loader/Loading";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrderItems = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrderItems);
  const { user } = useSelector((state) => state.loginUser);
  const columns = [
    { 
      field: "id",
      headerName: "ID", 
      minWidth: 150, 
      flex: 0.5 
    },
    { 
      field: "status", 
      headerName: "Status", 
      minWidth: 150, 
      flex: 0.5 ,
      cellClassName:(params)=>{
        return (
          params.getValue(params.id,"status")==="delivered"?"greenColor":"redColor"
        )
      }
    },
    {
      field: "itemsQty",
      headerName: "Items QTY",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        return (
          <Link to={`/getsingleOrder/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItem.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorAction());
    }
    dispatch(myOrderItemsAction());
  }, [dispatch, error, alert]);
  return (
    <>
      <MetaData title={`${user.name} - orders`} />
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <div className="my_orders_pages">
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              className="my_order_table"
              pageSize={10}
              disableSelectionOnClick
            />
            <Typography id="my_orders_headings">
              {user.name}'s Orders
            </Typography>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrderItems;
