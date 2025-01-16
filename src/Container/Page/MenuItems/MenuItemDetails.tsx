import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../../../Apis/menuItemApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Store/Redux/menuItemSlice";
import carrot from "../../../assets/pictures/carrot love.jpg";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "../Common";
import toastNotify from "../../../Helpers/toastNotify";
import { UserModel } from "../../../Interfaces/UserModel";
import { RootStore } from "../../../Store/Redux/store";

function MenuItemDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItemId = useParams();

  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const userData: UserModel = useSelector(
    (state: RootStore) => state.userAuthStore
  );


  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>();

  const { data, isLoading } = useGetMenuItemByIdQuery(
    Object.values(menuItemId)
  );

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity === 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(menuItemId));
    }
  }, [isLoading]);

  const handleAddToCart = async (menuItemId: number) => {
    if(!userData.id) {
      navigate('/login');
      return;
    }
    setIsAddingToCart(true);
    const response = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuntityBy: quantity,
      userId: userData.id,
    });

    if(response.data && response.data.isSuccess) {
      toastNotify("Item added to cart!")
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data?.result?.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data?.result?.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data?.result?.specialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data?.result?.description}
            </p>
            <span className="h3">{data?.result?.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                className="bi bi-dash p-1"
                onClick={() => handleQuantity(-1)}
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                onClick={() => handleQuantity(+1)}
                className="bi bi-plus p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MiniLoader />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(data.result.id)}
                    className="btn btn-success form-control"
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={carrot}
              width="100%"
              style={{ borderRadius: "50%" }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <MainLoader />
      )}
    </div>
  );
}

export default MenuItemDetails;
