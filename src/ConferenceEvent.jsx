import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux"; // The useSelector() function retrives venue items from the Redux store state.
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { decrementAvQuantity, incrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";
const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const venueItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealsItems = useSelector((state) => state.meals); // Step 4: Continued from store.js
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
          return; 
        }
        dispatch(incrementQuantity(index));
      };
    
      const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
      };
      /**After displaying items from the avItems using the map() method:
       * we need to dispatch the actions.
       */
    const handleIncrementAvQuantity = (index) => {
      dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
      dispatch(decrementAvQuantity(index));
    };

    // The func takes an index parameter of the meal item that triggered the selection.
    const handleMealSelection = (index) => {
      /**It retrieves the meal item object from the mealsItems array
       * using the provided index.
       */
       const item = mealsItems[index];
       /**It checks if the retrieved item is both selected,
        * item.selected === true and that its type is mealForPeople.
        */
       if(item.selected && item.type === "mealForPeople") {
        //Ensure numberOfPeople is set before toggling selection
        /**If these two conditions are met, it prepare to update the numberOfPeople state
         * variable before toggling the selection.
         * 
         * If the item is of type mealForPeople and already selected,
         * item.selected is true, it maintains the current numberOfPeople.
         * 
         * If not selected, it sets numberOfPeople to 0
         */
        const newNumberOfPeople = item.selected ? numberOfPeople : 0;
        /**It dispatches the toggleMealSelection action with the index of the
         * item and, if applicable, the new numberOfPeople.
         */
        dispatch(toggleMealSelection(index, newNumberOfPeople));
       }
       /**If the item is not of type mealForPeople or is not selected,
        * it dispatches an action to toggle the meal selection without
        * any additional considerations.
        */
       else {
        dispatch(toggleMealSelection(index));
       }
    };
    /**In the above handleMealSelection() func, we are dispatching
     * toggleMealSelection function from the mealsSlice.jsx file.
     * For this, let's make sure that we have imported toggleMealSelection
     * from './mealsSlice"; (STEP 6:)
     * STEP 7: We now create logic to calculate the total cost for selected
     * meal items based on the number of people within the
     * calculateTotalCost function.
     */

    const getItemsFromTotalCost = () => {
        const items = [];
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {

    };
    /**The arrow function is assigned to the constant calculateTotalCost
     * and takes one string parameter, section, that indicates the section is calculated.
     */
    const calculateTotalCost = (section) => {
        let totalCost = 0; // initialization of totalCost
        /**Conditional check:
         * The function checks if the section passed as an argument
         * equals the string "venu".
         */
        if (section === "venue") {
          /**If true, the total cost for the venue items will be calculated.
           * Iteration over venueItems:
           * The venueItems items array represents an item with properties
           * cost and quantity.
           * 
           * The forEach function iterates over each item in the venueItems array.
           * For each item, it multiplies item.cost by item.quantity
           * and adds the result to totalCost.
           */
          venueItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
          });
        } else if (section === "av") {
          avItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
          });
        }
        /**Code breakdown:
         * Condition Check (if (section === 'meals'))...: 
         * The code first checks if the variable section
         * is equal to the string "meals". If true, the code
         * inside the if block will execute.
         * 
         * Iterating through mealsItems: mealsItems is assumed to 
         * be an array of objects. The forEach method is used to iterate
         * over each element (referred to as item).
         * 
         * Checking if item is selected: for each item in the mealsItems
         * array, the code checks if the selected property of the item 
         * is true. If the item is selected, the code inside this block
         * will execute.
         */
        else if (section === "meals") {
          mealsItems.forEach((item) => {
            if (item.selected) {
              totalCost += item.cost * numberOfPeople;
            }
          })
        }
        /**After the loop it complete, the function returns the
         * calculated totalCost.
         */
        return totalCost;
      };
    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealsTotalCost = calculateTotalCost("meals"); // **STEP 8** What stood out for me in this project was that we can use the same function like calculateTotalCost() for different componets by just extending the function to handle to state of that component's action.


    const navigateToProducts = (idType) => {
        if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
          if (showItems) { // Check if showItems is false
            setShowItems(!showItems); // Toggle showItems to true only if it's currently false
          }
        }
      }

    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue" onClick={() => navigateToProducts("#venue")} >Venue</a>
                        <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                        <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
                    </div>
                    <button className="details_button" onClick={() => setShowItems(!showItems)}>
                        Show Details
                    </button>
                </div>
            </navbar>
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="venue" className="venue_container container_main">
        <div className="text">
 
          <h1>Venue Room Selection</h1>
        </div>
        <div className="venue_selection">
          {venueItems.map((item, index) => (
            <div className="venue_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
     <div className="button_container">
        {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (

          <>
          <button
            className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
            onClick={() => handleRemoveFromCart(index)}
          >
            &#8211;
          </button>
          <span className="selected_count">
            {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
          </span>
          <button
            className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
            onClick={() => handleAddToCart(index)}
          >
            &#43;
          </button>
        </>
        ) : (
          <div className="button_container">
           <button
              className={venueItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
              onClick={() => handleRemoveFromCart(index)}
            >
               &#8211;
            </button>
            <span className="selected_count">
              {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
            </span>
            <button
              className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
              onClick={() => handleAddToCart(index)}
            >
             &#43;
            </button>
            
            
          </div>
        )}
      </div>
            </div>
          ))}
        </div>
        {/* Function call:
        The function calculateTotalCost is called with the "venue" argument,
        which calculates the total cost for the items in the "venue" section.
        The result of this calculation is stored in the constant venueTotalCost*/}
        <div className="total_cost">Total Cost: ${venueTotalCost}</div>
      </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main">


                                <div className="text">

                                    <h1> Add-ons Selection</h1>

                                </div>
                                <div className="addons_selection">
                                  {/* This code uses the map() function to iterate over an array
                                  called avItems, which contains information about audio-visual
                                  items. */}
                                  {avItems.map((item, index) => (
                                    // Each item in the array creates a <div> element with
                                    // the class av_data venue_main.
                                    <div className="av_data venue_main" key={index}>
                                      {/* Inside the div:
                                          An <img> tag displays the item's image. */}
                                      <div className="img">
                                        <img src={item.img} alt={item.name} />
                                      </div>
                                      <div>
                                        <div className="text"> {item.name} </div>
                                        <div> R{item.cost} </div>
                                        <div className="addons_btn">
                                          <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}> &ndash; </button>
                                          <span className="quantity-value"> {item.quantity}</span>
                                          <button className="btn-success" onClick={() => handleIncrementAvQuantity(index)}> &#43; </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="total_cost">Total Cost: {avTotalCost}</div>

                            </div>

                            {/* Meal Section */}

                            <div id="meals" className="venue_container container_main">

                                <div className="text">

                                    <h1>Meals Selection</h1>
                                </div>

                                <div className="input-container venue_selection">
                                  <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
                                  <input type="number" className="input_box5" id="numberOfPeople" value={numberOfPeople}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value);

                                    if (isNaN(value) || value < 1) {
                                      setNumberOfPeople(1);
                                    } else {
                                      setNumberOfPeople(value);
                                    }
                                  }}
                                  min="1"
                                  />
                                   {/* The above code creates a labeled input field for
                                   specifying the number of people. It uses an <input> element
                                   of type number with a minimum value of 1 and updates the
                                   numberOfPeople state with the parsed integer value entered by the user. */}

                                </div>
                                {/* To display the meal items, we must traverse the array using map() within
                                <div> with the class name meal_selection, as we did for the add-ons. */}
                                <div className="meal_selection"> {/**This is a container for the list of meal items */}
                                  {/**This maps over an array of mealsItems and generates HTML
                                   * for each item using the provided function.
                                   */}
                                  {mealsItems.map((item, index) => (
                                    /**This is a container for each meal item. The key prop is necessary
                                     * for React to keep track of each item in the list.
                                     */
                                    <div className="meal_item" key={index} style={{ padding: 15 }}>
                                      <div className="inner">
                                        {/* This is a checkbox input element. The selected property
                                        of the current item controls its checked property. The 
                                        When the checkbox state changes, it triggers the handleMealsSelection() function
                                        with the current item's index. */}
                                        <input type="checkbox" id={ `meal_${index}` }
                                        checked={ item.selected }
                                        onChange={() => handleMealSelection(index)}
                                        />
                                        {/* This label is associated with the checkbox.
                                        Clicking on the label toggles the checkbox. */}
                                        <label htmlFor={ `meal_${index}` }> {item.name}</label>
                                      </div>
                                      {/* This displays the cost of each meal item. */}
                                      <div className="meal_cost">R{item.cost}</div>
                                    </div>
                                  ))} 
                                  {/* Step 5: we need to create logic for the handleMealSelection() 
                                  function in this Conferenence Event jsx file to calculate
                                  the meal subtotal based on the number of people. */}

                                </div>
                                {/* Before the closing tag of the last meal item, we have a div with the class total_cost. */}
                                <div className="total_cost">Total Cost: {mealsTotalCost} </div>
                                {/* STEP 9: Next we will write code to displau the user-selected items and cost details
                                in a table format. These details will appear when the user clicks on the Shpw Details button in the header. */}


                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>
                    )
                }




            </div>
        </>

    );
};

export default ConferenceEvent;
