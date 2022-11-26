import React from "react";
import ReactDOM from "react-dom";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList
} from "react-instantsearch/dom";
import { connectRefinementList } from "react-instantsearch/connectors";
import "./styles.css";

const CustomRefinementList = connectRefinementList(({ attribute, items }) => {
  const fixedItems = [
    { label: "Movies & TV Shows" },
    { label: "Flat-Panel TVs" },
    { label: "Headphones" }
  ];
  return (
    <div>
      <ul className="mt-3 hidden">
        {fixedItems.map(item => (
          <li key={item.attribute}>
            {item.label}: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
});

const Hit = ({hit}) => {
  console.log("hit", hit);
  return(
    <div className="flex items-center">
      <img className="w-1/12 max-h-full h-full" src={hit.image} alt="logo" />
      <div>
        <div>
          <p>{hit.name}</p>
        </div>
        <div>
          <p>{hit.salePrice}</p>
          <p>{hit.manufacturer}</p>
        </div>
      </div>
      
    </div>
  )

}

const App = () => (
  <div className="bg-black flex justify-center" >
    <InstantSearch
      appId="latency"
      apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
      indexName="bestbuy"
    >
      <div className="bg-lightBlack p-10">
        <SearchBox 
          translations={{placeholder: "Search for jobs..." }}/>
        <CustomRefinementList attribute="category" limit={1000} operator="or" />
        <RefinementList attribute="category" />
      </div>
      
      <div className="bg-customBlack p-10">
        <Hits hitComponent={Hit} />
      </div>
      

    </InstantSearch>
  </div>
  
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
