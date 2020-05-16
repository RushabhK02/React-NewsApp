/* eslint-disable */
import React, { Component } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NewsToggle from './NewsToggle';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async'
import { OverlayTrigger, Tooltip, Container } from 'react-bootstrap'
import Home from './Home';
import WorldSection from './WorldSection';
import PoliticsSection from './PoliticsSection';
import BusinessSection from './BusinessSection';
import TechnologySection from './TechnologySection';
import SportsSection from './SportsSection';
import SearchSection from './SearchSection';
import BookmarkSection from './BookmarkSection';
import { ToastContainer, cssTransition } from 'react-toastify';
import DetailedArticle from './DetailedArticle';
import ls from 'local-storage';
import './App.css';

var favoriteData = {};
var selectOption = { label: 'Enter Keyword...', key: 0};

class App extends Component {
  
  constructor(props) {
    super(props);
    let news = ls.get('newsChannel')!=undefined? ls.get('newsChannel'): 'Guardian';
    this.state = {
      searchOptions: [],
      newsChannel: news,
      // newsChannel: 'Guardian',
      bookmark: false,
      bingKey: "f81f3d5657bb44d9a54392d44f7346f1",
      searchKeyword: '',
      loading: true,
    }
    this.clickInput = React.createRef();
    this.updateSearchOptions = this.debounce(this.updateSearchOptions.bind(this), 1000);
    this.searchResults = this.searchResults.bind(this);
    this.myRef = React.createRef();
    this.bookmarkRef = React.createRef();
    this.articleRef = React.createRef();

    favoriteData = ls.get('bookmarks') || {};
    ls.clear();
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  handleNewsToggle = (news) => {
    this.setState({ newsChannel: news });
  }

  bookmarkArticle = (article) => {
    if(favoriteData[article.id]){
      delete favoriteData[article.id];
      ls.set('bookmarks', favoriteData);
    } else {
       favoriteData[article.id] = article;
       ls.set('bookmarks', favoriteData);
    }
  }

  updateSearchOptions = (input, callback) => {
    let url = "https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=" + input;
    fetch(url, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': this.state.bingKey
      }
    }).then(response => response.json())
      .then(resData => {
        if (resData.suggestionGroups) {
          let data = resData.suggestionGroups["0"].searchSuggestions;
          let results = data.map((result, i) => ({ label: result.displayText, value: i }));
          this.setState({ searchOptions: results });
          callback(results);
        }
      });
  }

  toggleBookmark = () => {
    let currentComponent = this;
    currentComponent.setState({
      bookmark: !this.state.bookmark
    });
    // this.bookmarkRef.current.click();
    return;
  }

  toggleNavBar = () => {
    this.articleRef.current.click();
    return;
  }

  searchResults = (inputValue) => {
    if(inputValue == null) return;
    selectOption = inputValue;
    // console.log(inputValue.label);
    this.setState({
      searchKeyword: inputValue
    })
    // this.myRef.current.click();
    this.props.history.push("/search");
  }

  simulateClick(e) {
    e.click();
  }

  componentDidMount(){
    window.addEventListener("beforeunload", (ev) => 
    {  
      ls.set('bookmarks', favoriteData);
      ls.set('newsChannel', this.state.newsChannel);
    });
  }

  render() {
    let flag = true;
    let bookmark = true;
    let path = this.props.location.pathname;
    if (this.props.location.pathname == "/search" || this.props.location.pathname == "/article")
      flag = false;
    if (this.props.location.pathname != "/favorites")
      bookmark = false;

    let fade = cssTransition({
      enter: 'fadeIn',
      exit: 'fadeOut'
    });

    if(this.props.location.pathname != "/search") {
      selectOption = '';
    }

    // if(this.myRef.current) this.myRef.current.click();
    // console.log(this.myRef.current);

    return (
      // <Container fluid>
      <div>
      <div>
        <Navbar className="navbar navbar-custom" variant="dark" expand="lg">
          <Navbar.Brand>
          <AsyncSelect className="searchBox" placeholder="Enter Keyword .." 
            value={selectOption}
            loadOptions={this.updateSearchOptions} isClearable onChange={this.searchResults} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={this.props.location.pathname} >
            <Nav.Link active={path=="/"?true:false} as={Link} to="/">Home</Nav.Link>
            <Nav.Link active={path=="/world"?true:false} as={Link} to="/world">World</Nav.Link>
            <Nav.Link active={path=="/politics"?true:false} as={Link} to="/politics">Politics</Nav.Link>
            <Nav.Link active={path=="/business"?true:false} as={Link} to="/business">Business</Nav.Link>
            <Nav.Link active={path=="/technology"?true:false} as={Link} to="/technology">Technology</Nav.Link>
            <Nav.Link active={path=="/sports"?true:false} as={Link} to="/sports">Sports</Nav.Link>
            <Nav.Link active={path=="/search"?true:false} as={Link} to="/search" hidden>Search</Nav.Link>
            <Nav.Link ref={this.bookmarkRef} active={path=="/favorites"?true:false} as={Link} to="/favorites" hidden>Bookmark</Nav.Link>
            <Nav.Link ref={this.articleRef} active={path=="/article"?true:false} as={Link} to="/article"  hidden>Article</Nav.Link>
          </Nav>
          <div  className="BookmarkIcon">
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id="bookmarkTooltip">
                Bookmark
                </Tooltip>
            }
          >
            <Link to="/favorites" className="bookmark" onClick={this.toggleBookmark}>
              {bookmark ? <FaBookmark color="white" size={25} /> : <FaRegBookmark color="white" size={25} />}
            </Link>
          </OverlayTrigger>
          </div>
          {flag ? (<React.Fragment>
            <div className="ToggleHeading">NYTimes</div>
            <div className="Slider">
            <NewsToggle newsChannel={this.state.newsChannel} onToggleValue={this.handleNewsToggle} />
            </div>
            <div className="ToggleHeading">Guardian</div>
          </React.Fragment>)
            : (<React.Fragment></React.Fragment>)
          }
          </Navbar.Collapse>
        </Navbar>
        <ToastContainer transition={fade} />
        <div className="article-box">
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} newsChannel={this.state.newsChannel}
              toggleNavBar={this.toggleNavBar} />} />
            <Route exact path="/world" render={(props) => <WorldSection {...props} newsChannel={this.state.newsChannel}
              toggleNavBar={this.toggleNavBar} />} />
            <Route exact path="/politics" render={(props) => <PoliticsSection {...props} newsChannel={this.state.newsChannel}
              toggleNavBar={this.toggleNavBar} />} />
            <Route exact path="/business" render={(props) => <BusinessSection {...props} newsChannel={this.state.newsChannel}
              toggleNavBar={this.toggleNavBar} />} />
            <Route exact path="/technology" render={(props) => <TechnologySection {...props} newsChannel={this.state.newsChannel}
              toggleNavBar={this.toggleNavBar} />} />
            <Route exact path="/sports" render={(props) => <SportsSection {...props} newsChannel={this.state.newsChannel}
              toggleNavBar={this.toggleNavBar} />} />
            <Route exact path="/search" render={(props) => <SearchSection {...props} newsChannel={this.state.newsChannel}
              searchKeyword={this.state.searchKeyword?this.state.searchKeyword.label: ''} 
              toggleNavBar={this.toggleNavBar}/>} />
            <Route exact path="/favorites" render={(props) => <BookmarkSection {...props} toggleNavBar={this.toggleNavBar}
            articles={favoriteData} callback={this.bookmarkArticle} /> } />
            <Route path="/article" render={(props) => <DetailedArticle {...props} flag={false} callback={this.bookmarkArticle} 
              articles={favoriteData} newsChannel={this.state.newsChannel}/>} />
          </Switch>
        </div>
      </div >
      </div>
      // </Container>
    );
  }
}
export default withRouter(App);