import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ScoreDistribute from '../components/ScoreDistribute';
import TagList from '../components/TagList';
import CommentList from '../components/CommentList';

import request from '../../../helpers/request';

class Comment extends Component {
  state={
    tags:[],
    comments:[],
    current:'' //当前选中的标签
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () =>{
    const {tags,list} =await request('/comment');
    this.setState({
      tags,
      comments:list,
      current:tags[0].text?tags[0].text : ""
    });
  }

  changeTag = value=>{
      this.setState({
        current:value
      });
  }

  taggleZan = id =>{
    this.setState((prevState)=>({ //从上一个状态得到下一个状态
      comments:prevState.comments.map(comment =>{
        if(comment.id === id){
          return {
            ...comment,
            isZan:!comment.isZan,
            zan:comment.isZan?--comment.zan: ++comment.zan
          };
        }
        return {...comment};
      })

    }));
  }

  render() {
    const {tags,comments,current}=this.state;
    console.log(current);

    const filterComments = comments.filter(comment => comment.tag === current);//过滤评论

    return (
      <div className="mCommennt">
        <ScoreDistribute />
        <div  style={{marginTop:16}}>
          <TagList data={tags} current={current} onClick={this.changeTag}/>
        </div>
        <div  style={{marginTop:16}}>
          <CommentList data={filterComments} onClickZan={this.taggleZan} />
        </div>

      </div>
    );
  }
}

Comment.propTypes = {};

export default Comment;
