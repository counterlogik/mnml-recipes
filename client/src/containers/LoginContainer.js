import { connect } from "react-redux";
import Login from "../components/Login";
// import Register from "../components/Register";
// import { authenticateUser } from "../actions/index";

const mapStateToProps = state => {
  return {
    // username: state.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // authenticateUser: () => {
    //   dispatch(authenticateUser());
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
