import { Link } from "react-router-dom";
import { MenuItemModel } from "../../../Interfaces";
import carrot from "../../../assets/pictures/carrot love.jpg";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";
import { useState } from "react";
import { MiniLoader } from "../Common";

interface Props {
  menuItem: MenuItemModel;
}

/*
import carrot from "../../../assets/pictures/carrot love.jpg";
import spring from "../../../assets/pictures/spring roll.jpg";
import idli from "../../../assets/pictures/idli.jpg";
import hakka from "../../../assets/pictures/hakka noodles.jpg";
import pani from "../../../assets/pictures/pani puri.jpg";
import malai from "../../../assets/pictures/malai kofta.jpg";
import panner from "../../../assets/pictures/paneer pizza.jpg";
*/

function MenuItemCard(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>();

  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleAddToCart = async (menuItemId: number) => {
    setIsAddingToCart(true);
    const response = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: 1,
      userId: "8402373c-a5a4-4218-8d5b-c22c5f9b6503",
    });
    
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
