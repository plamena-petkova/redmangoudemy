import { useSelector } from "react-redux";
import { RootStore } from "../../../Store/Redux/store";
import { useGetAllOrdersQuery } from "../../../Apis/orderApi";
import { MainLoader } from "../Common";
import OrderHeader from "../../../Interfaces/orderHeader";
import withAuth from "../../../HoC/withAuth";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();

  const userId = useSelector((state: RootStore) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery(userId);
  console.log("data", data);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success">Orders List</h1>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-3">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Date</div>
              <div className="col-2"></div>
            </div>
            {data.result.map((orderItem: OrderHeader) => {
              return (
                <div key={orderItem.orderHeaderId} className="row border">
                  <div className="col-1">{orderItem.orderHeaderId}</div>
                  <div className="col-3">{orderItem.pickupName}</div>
                  <div className="col-2">{orderItem.pickupPhoneNumber}</div>
                  <div className="col-1">
                    $ {orderItem.orderTotal!.toFixed(2)}
                  </div>
                  <div className="col-1">{orderItem.totalItems}</div>
                  <div className="col-2">
                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                  </div>
                  <div className="col-2">
                    <button
                      onClick={() =>
                      navigate(
                          "/order/OrderDetails/" + orderItem.orderHeaderId
                        )
                      }
                      className="btn btn-success"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(MyOrders);
