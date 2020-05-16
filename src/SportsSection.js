import React, { Component } from 'react';
import SectionArticle from './SectionArticle';
import Loader from './Loader';
import { toast } from 'react-toastify';
import ShareButtons from './ShareButtons';

class SportsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newsChannel: this.props.newsChannel,
          sectionData: [],
          flag: false,
          shareToast: false,
          toastArticle: {}
        }
        this.loadSportsData = this.loadSportsData.bind(this);
        this.callback = this.props.callback;
        this.displayArticleToast = this.displayArticleToast.bind(this);
    }

    loadSportsData() {
      if(this.state.flag) return;
      // fetch("http://localhost:5000/sports", {
      fetch("https://wt-hw8-node-backend.appspot.com/sports", {
        method: 'GET',
        headers: {
          'news-provider': this.state.newsChannel
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((resData) => {
          let articleArray = [];
          // console.log(resData);
            articleArray = resData.formattedArticles.slice(0, 10).map(a => { return { type: this.state.newsChannel, article: a } });
            this.setState({
              sectionData: articleArray,
              flag: true
            });
        });
  }

  handleClick = (e) => {
    this.props.toggleNavBar();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.newsChannel != this.props.newsChannel) {
      this.setState({newsChannel: this.props.newsChannel, flag: false, sectionData:[]});
    }
  }

  displayArticleToast(article){
    // console.log("I was called")
    if(this.state.shareToast) return;
    this.setState({
      toastArticle: article,
      shareToast: true
    })
    
    toast((<div>
      <h6 className="toast-heading">{article.article.title}</h6>
      <hr />
      <div>
        <h6 className="toast-share">Share via</h6>
        <ShareButtons article={article} styling="shareIcon-margins"/>
      </div>
    </div>), {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      className: 'share-toast',
      onClose: () => this.setState({shareToast: false, toastArticle: {}}) 
    });
    
  }

    render() {
      this.loadSportsData();
      if (!this.state.sectionData.length) {
        return <Loader />
      } else
        return (
            <div className="sports-section">
                {
                  this.state.sectionData.map((article, i) => (
                    <SectionArticle handleClick={this.handleClick} shareCallback={this.displayArticleToast} className="article" data={article} key={i} />
                  ))
                }
            </div>
        )
    }
}
export default SportsSection;