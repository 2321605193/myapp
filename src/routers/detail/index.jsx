import React, {Component} from 'react';

import request from '../../helpers/request';
import BaseInfo from "./components/BaseInfo";
import ScoreSummary from "./components/ScoreSummary";
import CollapsibleText from "../../components/CollapsibleText";
import Artist  from "./components/Artist";
import Comment from "./container/Comment";
import ImageSlider from './container/ImageSlide';

import LineLink from '../../components/LineLink';
import {Link} from 'react-router-dom';
import "./index.css";


class Detail extends Component {

  state = {
    artist:[],
    showImage:false
 }
  componentDidMount() {
    this.getArtist();
  }

  getArtist = async ()=>{
    const data = await request('/artist');
    if(data && data.length){
      this.setState({
        artist:data
      });
    }
  }

  taggleImage = ()=>{
    this.setState({
      showImage:!this.state.showImage
    });
  }

  render() {

    const {artist} = this.state;

    return (
      <div className="detail">
        <div className="detail__top">
          <div className="tOperator">
            <div className="tOperator__icon tOperator__icon--back" onClick={() =>{window.history.back();}}/>
            <div className="tOperator__icon tOperator__icon--share" />
          </div>
          <BaseInfo onShowImage={this.taggleImage}/>
        </div>
        <div className="detail__content">
         <div className="detail__module">
           <ScoreSummary />
         </div>

          <div className="detail__module">
            <CollapsibleText height={84}>

              <div className="detail__overview">
                《唐人街探案2》是唐人街探案系列电影的第二辑，由陈思诚执导，王宝强、刘昊然、肖央、王迅、刘承羽、尚语贤、元华、妻夫木聪、迈克尔·皮特主演的动作片。该片讲述了唐仁为巨额奖金欺骗秦风到纽约参加世界名侦探大赛，比赛的内容是寻找杀害唐人街教父七叔的孙子的凶手。两人再次组合侦破案件，并冒着生命危险闹翻纽约的故事。该片于2018年2月16日在中国大陆上映。
              </div>
            </CollapsibleText>
          </div>

          <div className="detail__module">
            <h3 className="detail__moduleTitle">演职人员</h3>
            <Artist data={artist}/>
          </div>
          <div className="detail__module">
            <h3 className="detail__moduleTitle">热门评论</h3>
            <Comment/>
          </div>
          <div className="detail__module">
            <h3 className="detail__moduleTitle">影片资料</h3>
            <div>
              <LineLink href="" title="幕后花絮"/>
              <LineLink href="" title="台词精选"/>
              <LineLink href="" title="出品发行"/>
            </div>

          </div>

        </div>
        <Link to='/seat' className="detail__buyBtn">选座购票</Link>
        {this.state.showImage && <ImageSlider  onClose={this.taggleImage}/>}

      </div>
    );
  }
}

Detail.propTypes = {};

export default Detail;
