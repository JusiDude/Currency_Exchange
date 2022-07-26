import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

export const Header = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Headers>
          {items.map((item) => (
            <span key={item.ccy}>
              {item.ccy} {item.buy} / {item.sale}
            </span>
          ))}
        </Headers>
      </>
    );
  }
};
const Headers = styled.div`
  width: 100%;
  height: 76px;
  background: #4f937e;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin: 0px 50px 0px 50px;
    font-family: "Tahoma";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    color: #ffffff;
  }
`;
