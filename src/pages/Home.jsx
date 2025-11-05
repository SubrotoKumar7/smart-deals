import React from "react";
import Banner from "../components/banner/Banner";
import { Link, useLoaderData } from "react-router";
import Card from "../components/card/Card";

const Home = () => {
  const data = useLoaderData();
  const recentProducts = data.slice(0, 6);
  return (
    <div>
      <Banner></Banner>
      <div className="w-11/12 mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-10">
          Recent <span className="text-gradient">Products</span>
        </h1>
        <div className="grid grid-cols-3 gap-5">
          {recentProducts.map((product) => (
            <Card key={product._id} product={product}></Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/all-products"
            className="btn bg-gradient text-white font-bold"
          >
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
