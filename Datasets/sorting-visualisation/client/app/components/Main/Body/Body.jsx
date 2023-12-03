/*
This code defines a React component called Body. This component is primarily responsible for rendering an array of elements, with each element's attributes (like height, width, and color) depending on various conditions.

When the component is rendered, it first extracts several values from its props, including the main array that it will be rendering, and other arrays or values related to different sorting algorithms. It also calculates certain style properties for each array element based on the length of the array, including the width of each element, the margin around it, the color of the text within it, and the font size of that text. The precise calculations depend on the number of elements in the array, with larger arrays leading to smaller widths, margins, and font sizes.

After these calculations, the component returns a div with the id bodyContainer. Within this div, it maps over the array prop, creating a new div for each number in the array. Each of these divs has a class of arrayElement, a key corresponding to its index in the array, and a height that's three times its value (i.e., the actual number it represents).

The component also calculates a background color for each div based on whether its index is included in various arrays from the props. For example, if its index is in currentSwappers, the background color will be a shade of red. If its index is in currentBubbleTwo, currentQuickTwo, currentHeapThree, or currentMergeX, the background color will be a shade of green. If its index equals pivot, the background color will be yellow, and if its index is in currentSorted, the color will be a shade of purple. If none of these conditions are met, the background color will be a shade of blue.

The style properties calculated earlier (width, margin, color, and font size) are also applied to each div. Finally, the value of the number the div represents is included within it, which will be displayed on the element, unless the color has been set to 'transparent' because the element is too narrow.

If the array prop is empty, the Body component simply renders an empty div with the id bodyContainer. The rendered component is then exported for use elsewhere in the application.
*/
import React, { Component } from "react";
import "./Body.css";

class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      array,
      currentBubbleTwo,
      currentQuickTwo,
      pivot,
      currentSwappers,
      currentHeapThree,
      currentSorted,
      currentMergeX,
    } = this.props;

    const numWidth = Math.floor($(document).width() / (array.length * 3));
    const width = `${numWidth}px`;
    const numMargin = array.length < 5 ?
      10 : array.length < 8 ?
        8 : array.length < 11 ?
          6 : array.length < 20 ?
            4 : array.length < 50 ?
              3.5 : array.length < 100 ?
                3 : array.length < 130 ?
                  2.5 : 2;
    const margin = `${numMargin}px`;
    const color = numWidth > 20 ? "white" : "transparent";
    const numFont = numWidth > 70 ?
      20 : numWidth > 60 ?
        18 : numWidth > 50 ?
          16 : numWidth > 40 ?
            14 : numWidth > 30 ?
              12 : numWidth > 20 ?
                10 : 8;
    const fontSize = `${numFont}px`

    return (
      <div id="bodyContainer">
        { array.length ? array.map((number, index) => {
          const backgroundColor = currentSwappers.includes(index) ?
              "rgba(219, 57, 57, 0.8)" : currentBubbleTwo.includes(index) ||
              currentQuickTwo.includes(index) || currentHeapThree.includes(index) ||
              currentMergeX.includes(index) ?
                "rgba(78, 216, 96, 0.8)" : pivot === index ?
                  "rgba(237, 234, 59, 0.8)" : currentSorted.includes(index) ?
                    "rgba(169, 92, 232, 0.8)" : "rgba(66, 134, 244, 0.8)";
          return <div
            className="arrayElement"
            key={index}
            style={{height: `${number * 3}px`, width: width, marginLeft: margin, marginRigh: margin, backgroundColor: backgroundColor, color: color, fontSize: fontSize}}>
            {number}
          </div>
        }) : null
        }
      </div>
    )
  }
}

export default Body;
