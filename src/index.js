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
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={hit.thumbnailImage} alt="logo" />
        <div className="ml-5">
          <div>
            <a href={hit.url} target="_blank">
              <p className="hover:text-blue cursor-pointer">{hit.name}</p>
            </a>
          </div>
          <div className="flex mt-4">
            <p>{hit.type}</p>
            <p className="ml-10">{hit.manufacturer}</p>
          </div>
        </div>
      </div>
      <div>
        <p>{hit.salePrice}</p>
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
