import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link, Location, useLocation } from "react-router-dom";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";

const BreadCrumb: React.FC = () => {
  let location = useLocation();
  const [items, setItems] = useState<Partial<BreadcrumbItemType>[]>();
  useEffect(() => {
    setItems(locationInfoToBreadcrumbItmesConverter(location));
  }, [location]);

  function locationInfoToBreadcrumbItmesConverter(
    location: Location<any>
  ): React.SetStateAction<Partial<BreadcrumbItemType>[] | undefined> {
    let breadCrumbItemsArray: Partial<BreadcrumbItemType>[] = [];
    let spiltArray = location.pathname.split("/").slice(1);

    spiltArray.map((item, index) => {
      if (item !== "") {
        breadCrumbItemsArray.push({
          title: index === spiltArray.length - 1 ? item : <Link to={`/${item}`}>{item}</Link>,
        });
      }
    });
    return breadCrumbItemsArray;
  }

  return (
    <>
      <Breadcrumb style={{ margin: "0 0 0 16px" }} items={items} />
    </>
  );
};

export default BreadCrumb;
