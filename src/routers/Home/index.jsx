import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import './index.css';
import TopBar from './components/TopBar';
import Slide from "./components/Slide";
import CityLayer from "./components/CityLayer";
import MovieItem from "./components/MovieItem";

import request from '../../helpers/request';
import TabMenu from "../../components/TabMenu";
import RenderToBody from "../../components/RenderToBody";


class Home extends Component {

  state ={
    city:' ', //当前城市
    poster:[],//slide 海报
    movie:[],//当前热映电影
    cityLayerVisible:false//城市浮层是否展现
  }



  componentWillMount() {
    this.getData();
    //this.getCity();  //点击之后再得到城市数据
  }

  getData = async () =>{//获取首页数据
    const data = await request('/index');
    const {city,poster,movie} =data;

    this.setState({
      city,
      poster,
      movie
    });

    console.log(data);
  }
  getCity = async () =>{//获取城市数据
    const data = await request('/City');
  }

  showCityLayer =()=>{ //打开城市浮层
    this.setState({
      cityLayerVisible:true
    });
  }

  hideCityLayer =() => {//关闭城市浮层
    this.setState({
      cityLayerVisible:false
    });
  }
  onChangeCity= (city) =>{
    this.setState({
      city,
    });
    this.hideCityLayer();
  }



  render() {
    const {city,poster,movie,cityLayerVisible}=this.state;


    return (
      <div className="home">
        <TopBar city={city} showCityLayer={this.showCityLayer} />
        {/*绑定事件*/}
        <div className="home__slide">
          <div className="home__slideWrap">
            <Slide data={poster}/>
          </div>

        </div>
        <ul className="home__content">
          {movie.map(item => <li key={item.name}><Link to='/detail'><MovieItem data={item}/></Link></li>)}
        </ul>
        <TabMenu current="movie"/>
        {cityLayerVisible && <RenderToBody><CityLayer onClose={this.hideCityLayer} onSelect={this.onChangeCity} /></RenderToBody>}
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;

