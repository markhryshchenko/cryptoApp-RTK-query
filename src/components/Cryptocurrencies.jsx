import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");
  //console.log(cryptos);
  useEffect(() => {
    //setCryptos(cryptoList?.data?.coins);
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) {
    return "Loading...";
  }
  
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          
          <Col xs={24} sm={12} lg={6} key={currency.uuid} className="crypto-card">
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                hoverable
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="img"
                  />
                }
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
