import React from "react";
import { useLoaderData } from "react-router";
import Card from "../components/card/Card";

const AllProducts = () => {
  const data = useLoaderData();

  return (
    <div className="w-11/12 mx-auto py-20">
      <h1 className="text-5xl font-bold text-center mb-10">
        All <span className="text-gradient">Products</span>
      </h1>
      <div className="grid grid-cols-3 gap-5">
        {data.map((product) => (
          <Card key={product._id} product={product}></Card>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
