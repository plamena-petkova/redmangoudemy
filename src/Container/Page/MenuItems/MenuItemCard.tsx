import { Link, useNavigate } from "react-router-dom";
import { MenuItemModel } from "../../../Interfaces";
import carrot from "../../../assets/pictures/carrot love.jpg";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { useState } from "react";
import { MiniLoader } from "../Common";
import toastNotify from "../../../Helpers/toastNotify";
import { UserModel } from "../../../Interfaces/UserModel";
import { RootStore } from "../../../Store/Redux/store";
import { useSelector } from "react-redux";

interface Props {
  menuItem: MenuItemModel;
}

function MenuItemCard(props: Props) {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>();

  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const userData: UserModel = useSelector(
    (state: RootStore) => state.userAuthStore
  );

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);
    const response = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart!");
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${props.menuItem.id}`}>
              <img
                src={carrot}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>
          {props.menuItem.specialTag && (
            <i
              className="bi bi-star btn btn-success"
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
            >
              &nbsp; {props.menuItem.specialTag}
            </i>
          )}
          {isAddingToCart ? (
            <div style={{ position: "absolute", top: "15px", right: "15px" }}>
              <MiniLoader />
            </div>
          ) : (
            <i
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
              onClick={() => handleAddToCart(props.menuItem.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              {" "}
              <Link
                to={`/menuItemDetails/${props.menuItem.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                {props.menuItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4>{props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
