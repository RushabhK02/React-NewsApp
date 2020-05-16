import React, {Component} from 'react';
import Loader from './Loader';
import NewsArticle from './NewsArticle';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsChannel: this.props.newsChannel,
            homeData: [],
            flag: false,
        }
        this.loadHomeData = this.loadHomeData.bind(this);
        this.callback = this.props.callback;
    }

    loadHomeData() {
        if(this.state.flag) return;
        // fetch("http://localhost:5000/home", {
        fetch("https://wt-hw8-node-backend.appspot.com/home", {
          method: 'GET',
          headers: {
            'news-provider': this.state.newsChannel
          }
        })
          .then((response) => {
            return response.json();
          })
          .then((resData) => {
              let articleArray = resData.formattedArticles.slice(0, 10).map(a => { return { type: this.state.newsChannel, article: a } });
              this.setState({ homeData: articleArray, flag: true });
          });
      }

      componentDidUpdate(prevProps) {
        if(prevProps.newsChannel != this.props.newsChannel) {
          this.setState({newsChannel: this.props.newsChannel, flag: false, homeData:[]});
        }
      }


      handleClick = (e) => {
        this.props.toggleNavBar();
      }

      render() {
          this.loadHomeData();
          if (!this.state.homeData.length) {
                return (<div> <Loader /> </div>);
          } else { return (<div>
            { this.state.homeData.map((article, i) => (
            <NewsArticle handleClick={this.handleClick} shareCallback={this.displayArticleToast} className="article" data={article} key={i} /> 
          ))} </div>)
            }
        } 
}
export default Home;
