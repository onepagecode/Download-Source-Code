/*
This code is part of the Redux logic in a React application, specifically for the Body component.

In the Redux state management system, the mapStateToProps function is used to map portions of the state stored in the Redux store to the props of a component. In this case, the mapStateToProps function is mapping array, currentBubbleTwo, currentQuickTwo, pivot, currentSwappers, currentHeapThree, currentSorted, and currentMergeX from the state to the props of the Body component. These mapped props can then be accessed within the Body component and used as needed.

The mapDispatchToProps function is used to map dispatch actions to the props of a component. Dispatch actions are methods that the component can call to make changes to the Redux store. In this case, however, mapDispatchToProps doesn't map any dispatch actions—it's an empty function.

Finally, connect(mapStateToProps, mapDispatchToProps)(Body) uses the connect function from Redux to connect the Body component to the Redux store. This makes the specified parts of the state and the specified dispatch actions available to Body as props. In this case, the Body component will receive the parts of the state specified in mapStateToProps as props, but since mapDispatchToProps is empty, it will not receive any dispatch actions as props. The connected Body component is then exported for use elsewhere in the application.
*/
import { connect } from "react-redux";
import Body from "./Body.jsx";

const mapStateToProps = ({
  array,
  currentBubbleTwo,
  currentQuickTwo,
  pivot,
  currentSwappers,
  currentHeapThree,
  currentSorted,
  currentMergeX,
}) => ({
  array,
  currentBubbleTwo,
  currentQuickTwo,
  pivot,
  currentSwappers,
  currentHeapThree,
  currentSorted,
  currentMergeX,
});

const mapDispatchToProps = () => dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
