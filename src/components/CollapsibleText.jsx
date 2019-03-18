import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import './CollpasibleText.css';

class CollapsibleText extends Component {

  state = {
    isCollapse: false,
    isNeedCollapse: false
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);//得到当前节点
    const value = this.props.height;

    if (dom.clientHeight > value) { //得到高度
      this.setState({
        isCollapse: true,
        isNeedCollapse: true
      });
    }
  }

 //  defaultProps={
 //    height:  84
 // }




  taggleStatus = ()=>{
    if(this.state.isNeedCollapse){
      this.setState((prevState) =>({
        isCollapse:!prevState.isCollapse  //因为异步 最好是通过函数根据上一个值来改变状态
      }));
    }
  }


  render() {

    const { isCollapse } =this.state;
    const cls = isCollapse ? "collapsibleText--collapse" : "";
    const maxHeight = isCollapse ? this.props.height : "none";

    return (
      <div className={`collapsibleText ${cls}`} style={{maxHeight:maxHeight}} onClick={this.taggleStatus}>
        {this.props.children}
        {this.state.isCollapse && <div className="collapsibleText__label">展开</div>}
      </div>
    );
  }
}

CollapsibleText.propTypes = {
  children:PropTypes.any,
  height: PropTypes.number
};

export default CollapsibleText;
