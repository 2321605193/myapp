import React from 'react';
import PropTypes from 'prop-types';
import  './TopBar.css';
/**
 *
 * @returns {*}
 * @constructor
 * class命名
 * BEM
 * Block 例如topBar
 * Element  topBar__city  topBar__search   topBar__scan
 * Modifier  假如二维码有两种颜色 red /blue   topBar__scan--red  topBar__scan--blue
 *
 */

const Topbar = ({city,showCityLayer}) => {
  return (
    <div className="topBar">
      <div className="topBar__city" onClick = {showCityLayer}>{city}</div>
      <div className="topBar__search" onClick = {showCityLayer}></div>
      <div className="topBar__scan"></div>
    </div>
  );
};
Topbar.propTypes = {
  city: PropTypes.string.isRequired,
  showCityLayer: PropTypes.func.isRequired
}
export default Topbar;
