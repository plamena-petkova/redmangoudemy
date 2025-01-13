import {useEffect } from "react";
import { MenuItemCard } from "./index";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { setMenuItem } from "../../../Store/Redux/menuItemSlice";
import { useDispatch } from "react-redux";
import { MenuItemModel } from "../../../Interfaces";

function MenuItemList() {
  const dispatch = useDispatch();
  // const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);

  const {data, isLoading} = useGetMenuItemsQuery(null);

  useEffect(() => {
   if(!isLoading) {
    dispatch(setMenuItem(data.result));
   }
  }, [isLoading]);

  return (
    <div className="container row">
      {data?.result?.length > 0 &&
        data?.result.map((menuItem:MenuItemModel, index:number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
