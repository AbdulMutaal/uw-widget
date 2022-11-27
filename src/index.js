import React from "react";
import ReactDOM from "react-dom";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Highlight
} from "react-instantsearch/dom";
import { connectRefinementList } from "react-instantsearch/connectors";
import "./styles.css";

const CustomRefinement = ({item}) => {
  return(
    <div className="m-2 mr-4 w-fit border-2 border-white rounded-lg p-2 text-white cursor-pointer">
      {item.label}
    </div>
  )
}

const CustomSelectedRefinement = ({item}) => {
  return(
    <div className="m-2 mr-4 w-fit border-0 border-white rounded-lg p-2 text-white cursor-pointer bg-purple">
      {item.label}
    </div>
  )
}

const CustomRefinementList = connectRefinementList(({ 
  attribute, 
  items, 
  isFromSearch,
  refine,
  searchForItems,
  createURL,
}) => {

  const fixedItems = [
    { label: "Movies & TV Shows" },
    { label: "Flat-Panel TVs" },
    { label: "Headphones" }
  ];
  return (
    
    <ul className="text-white flex flex-wrap mt-5">
      <li>
        <input
          className="text-black hidden"
          type="search"
          onChange={event => searchForItems(event.currentTarget.value)}
        />
      </li>
      {items.map(item => (
        <li key={item.label} className="w-fit">
          <a
            href={createURL(item.value)}
            onClick={event => {
              event.preventDefault();
              refine(item.value);
            }}
          >
            {item.isRefined ? (
              <CustomSelectedRefinement item={item} />
            ) : (
              <CustomRefinement item={item} />
            )}{' '}
            {/* ({item.count}) */}
          </a>
        </li>
      ))}
    </ul>
  );
});

const Hit = ({hit}) => {
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
        <CustomRefinementList attribute="category" />
        {/* <RefinementList attribute="category" /> */}
      </div>
      
      <div className="bg-customBlack p-10">
        <Hits hitComponent={Hit} />
      </div>
      

    </InstantSearch>
  </div>
  
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
