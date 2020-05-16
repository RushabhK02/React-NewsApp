import React, { Component } from 'react';
import Loader from './Loader';
import SearchArticle from './SearchArticle';
import './App-sm.css';
import './App.css';
import { toast } from 'react-toastify';
import ShareButtons from './ShareButtons';
import MediaQuery from 'react-responsive';

let keyword = '';

class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newsChannel: this.props.newsChannel,
          sectionData: [],
          searchKeyword: this.props.searchKeyword,
          shareToast: false,
          toastArticle: {},
          flag: false
        }
        keyword = this.props.searchKeyword;
        this.getResultsData = this.getResultsData.bind(this);
        this.callback = this.props.callback;
        this.displayArticleToast = this.displayArticleToast.bind(this);
    }

    handleClick = (e) => {
      this.props.toggleNavBar();
    }  

    getResultsData() {
        let url = "http://localhost:5000/search?keyword=" + this.props.searchKeyword;
        let prodUrl = "https://wt-hw8-node-backend.appspot.com/search?keyword="+this.props.searchKeyword;
        // fetch(url, {
        fetch(prodUrl, {
          method: 'GET',
          headers: {
            'news-provider': this.state.newsChannel
          }
        }).then(response => response.json())
          .then(resData => {
            let articleArray = [];
            // console.log(resData);
              articleArray = resData.formattedArticles.slice(0, 10).map(a => { return { type: this.state.newsChannel, article: a } });
              this.setState({
                sectionData: articleArray,
                flag: true
              });
              keyword = this.props.searchKeyword;
          });
      }

      componentDidUpdate(prevProps) {
        if(prevProps.newsChannel != this.props.newsChannel) {
          this.setState({newsChannel: this.props.newsChannel, sectionData:[]});
        }
        if(prevProps.searchKeyword != this.props.searchKeyword) {
          keyword = prevProps.searchKeyword;
          this.setState({ searchKeyword: this.props.searchKeyword, 
            sectionData:[],
            flag: false
          });
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
      this.getResultsData();
      let value = keyword != this.props.searchKeyword? true: false;
      if (value || !this.state.sectionData.length || this.state.sectionData.length<1 || !this.state.flag) {
        return <Loader />
      } else
        return (
            <div className="search-articles">
                
                <MediaQuery minDeviceWidth={650}>
                <h2 className="search-heading">Results</h2>
                <div className="search-section">
                {
                  this.state.sectionData.map((article, i) => (
                    <SearchArticle handleClick={this.handleClick} shareCallback={this.displayArticleToast} data={article} key={i} />
                  ))
                }
                </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={649}>
                <h2 className="search-heading-sm">Results</h2>
                <div className="search-section-sm">
                  {
                    this.state.sectionData.map((article, i) => (
                      <SearchArticle handleClick={this.handleClick} shareCallback={this.displayArticleToast} data={article} key={i} />
                    ))
                  }
                </div>
                </MediaQuery>
            </div>
        )
    }
}
export default SearchSection;